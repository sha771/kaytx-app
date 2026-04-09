#!/usr/bin/env ts-node

/**
 * RBAC Enforcement Script
 * 
 * This script identifies and fixes routes that lack proper RBAC enforcement.
 * It scans all route files and ensures they have appropriate authorization.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { glob } from 'glob';
import { logger } from '../lib/production-logger';

interface RouteInfo {
  filePath: string;
  procedureName: string;
  currentAuth: 'public' | 'protected' | 'admin' | 'permission' | 'none';
  requiredPermission?: string;
  line: number;
}

class RBACEnforcer {
  private routes: RouteInfo[] = [];
  private baseDir = join(__dirname, '..');

  async scanAndFix(): Promise<void> {
    logger.info('🔒 Starting RBAC Enforcement Scan...\n');

    // 1. Scan all route files
    await this.scanRoutes();

    // 2. Identify issues
    const issues = this.identifyIssues();
    
    // 3. Generate report
    this.generateReport(issues);

    // 4. Apply fixes (dry run by default)
    const shouldFix = process.argv.includes('--fix');
    if (shouldFix) {
      await this.applyFixes(issues);
    } else {
      logger.info('\n📝 Dry run complete. Use --fix to apply changes.');
    }
  }

  private async scanRoutes(): Promise<void> {
    const routeFiles = await glob('**/routes/**/route.ts', { 
      cwd: this.baseDir,
      absolute: true 
    });

    logger.info(`📁 Scanning ${routeFiles.length} route files...`);

    for (const filePath of routeFiles) {
      this.analyzeFile(filePath);
    }

    logger.info(`✅ Found ${this.routes.length} procedures\n`);
  }

  private analyzeFile(filePath: string): void {
    try {
      const content = readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');

      // Find all procedure definitions
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Match procedure exports
        const procedureMatch = line.match(/export\s+const\s+(\w+)\s*=\s*(publicProcedure|protectedProcedure|adminProcedure|permissionProcedure)/);
        
        if (procedureMatch) {
          const [, procedureName, authType] = procedureMatch;
          
          let requiredPermission: string | undefined;
          
          // For permissionProcedure, extract the permission
          if (authType === 'permissionProcedure') {
            const permissionMatch = line.match(/permissionProcedure\(([^)]+)\)/);
            if (permissionMatch) {
              requiredPermission = permissionMatch[1].trim();
            }
          }

          this.routes.push({
            filePath: filePath.replace(this.baseDir, ''),
            procedureName,
            currentAuth: authType as any,
            requiredPermission,
            line: i + 1
          });
        }
      }
    } catch (error) {
      logger.warn(`⚠️  Failed to analyze ${filePath}:`, error);
    }
  }

  private identifyIssues(): RouteInfo[] {
    const issues: RouteInfo[] = [];

    for (const route of this.routes) {
      // Check for public procedures that should be protected
      if (route.currentAuth === 'public') {
        if (this.shouldBeProtected(route.procedureName)) {
          issues.push({
            ...route,
            currentAuth: 'none' // Mark as issue
          });
        }
      }

      // Check for protected procedures that need specific permissions
      if (route.currentAuth === 'protected' && !route.requiredPermission) {
        if (this.needsSpecificPermission(route.procedureName)) {
          issues.push(route);
        }
      }
    }

    return issues;
  }

  private shouldBeProtected(procedureName: string): boolean {
    const publicAllowedPatterns = [
      'login',
      'register', 
      'refreshToken',
      'verifyEmail',
      'sso',
      'passwordReset',
      'hi' // example route
    ];

    return !publicAllowedPatterns.some(pattern => 
      procedureName.toLowerCase().includes(pattern.toLowerCase())
    );
  }

  private needsSpecificPermission(procedureName: string): boolean {
    const sensitiveOperations = [
      'delete',
      'update',
      'create',
      'invite',
      'revoke',
      'manage',
      'admin',
      'billing',
      'payment',
      'export',
      'backup',
      'restore',
      'permissions',
      'roles',
      'webhooks',
      'integrations',
      'apiKeys',
      'compliance',
      'audit'
    ];

    return sensitiveOperations.some(pattern => 
      procedureName.toLowerCase().includes(pattern.toLowerCase())
    );
  }

  private generateReport(issues: RouteInfo[]): void {
    logger.info('🔍 RBAC Security Issues Found:\n');

    if (issues.length === 0) {
      logger.info('✅ No RBAC issues found!');
      return;
    }

    // Group by severity
    const critical = issues.filter(r => r.currentAuth === 'none');
    const warnings = issues.filter(r => r.currentAuth !== 'none');

    if (critical.length > 0) {
      logger.info('🚨 CRITICAL - Public procedures that should be protected:');
      critical.forEach(issue => {
        logger.info(`  ❌ ${issue.filePath}:${issue.line} - ${issue.procedureName}`);
        logger.info(`     Current: publicProcedure → Should be: protectedProcedure`);
      });
      logger.info('');
    }

    if (warnings.length > 0) {
      logger.info('⚠️  WARNINGS - Protected procedures missing specific permissions:');
      warnings.forEach(issue => {
        const suggestedPermission = this.suggestPermission(issue.procedureName);
        logger.info(`  ⚠️  ${issue.filePath}:${issue.line} - ${issue.procedureName}`);
        logger.info(`     Current: protectedProcedure → Should be: permissionProcedure(${suggestedPermission})`);
      });
      logger.info('');
    }

    logger.info(`📊 Summary: ${critical.length} critical, ${warnings.length} warnings`);
  }

  private suggestPermission(procedureName: string): string {
    const name = procedureName.toLowerCase();
    
    // Map procedure patterns to permissions
    if (name.includes('user') && name.includes('delete')) return 'Permission.USER_DELETE';
    if (name.includes('user') && name.includes('update')) return 'Permission.USER_UPDATE';
    if (name.includes('user') && name.includes('create')) return 'Permission.USER_CREATE';
    if (name.includes('billing')) return 'Permission.BILLING_UPDATE';
    if (name.includes('payment')) return 'Permission.BILLING_UPDATE';
    if (name.includes('webhook')) {
      if (name.includes('delete')) return 'Permission.WEBHOOK_DELETE';
      if (name.includes('update')) return 'Permission.WEBHOOK_UPDATE';
      if (name.includes('create')) return 'Permission.WEBHOOK_CREATE';
      return 'Permission.WEBHOOK_READ';
    }
    if (name.includes('integration')) {
      if (name.includes('delete')) return 'Permission.INTEGRATION_DELETE';
      if (name.includes('update')) return 'Permission.INTEGRATION_UPDATE';
      if (name.includes('create')) return 'Permission.INTEGRATION_CREATE';
      return 'Permission.INTEGRATION_READ';
    }
    if (name.includes('apikey')) {
      if (name.includes('delete')) return 'Permission.API_KEY_DELETE';
      if (name.includes('create')) return 'Permission.API_KEY_CREATE';
      return 'Permission.API_KEY_READ';
    }
    if (name.includes('export')) return 'Permission.ANALYTICS_EXPORT';
    if (name.includes('backup')) return 'Permission.BACKUP_TRIGGER';
    if (name.includes('audit')) return 'Permission.AUDIT_READ';
    if (name.includes('compliance')) return 'Permission.COMPLIANCE_READ';
    if (name.includes('permission')) return 'Permission.PERMISSIONS_MANAGE';
    if (name.includes('role')) return 'Permission.PERMISSIONS_MANAGE';
    
    return 'Permission.SETTINGS_READ'; // Default fallback
  }

  private async applyFixes(issues: RouteInfo[]): Promise<void> {
    logger.info('🔧 Applying RBAC fixes...\n');

    let fixedCount = 0;

    for (const issue of issues) {
      try {
        const filePath = join(this.baseDir, issue.filePath);
        const content = readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');

        const lineIndex = issue.line - 1;
        const originalLine = lines[lineIndex];

        let newLine: string;

        if (issue.currentAuth === 'none') {
          // Change publicProcedure to protectedProcedure
          newLine = originalLine.replace('publicProcedure', 'protectedProcedure');
          logger.info(`🔒 Securing: ${issue.procedureName} (public → protected)`);
        } else {
          // Add specific permission
          const permission = this.suggestPermission(issue.procedureName);
          newLine = originalLine.replace('protectedProcedure', `permissionProcedure(${permission})`);
          logger.info(`🎯 Adding permission: ${issue.procedureName} (${permission})`);
        }

        lines[lineIndex] = newLine;
        writeFileSync(filePath, lines.join('\n'));
        fixedCount++;

      } catch (error) {
        logger.error(`❌ Failed to fix ${issue.filePath}:`, error);
      }
    }

    logger.info(`\n✅ Successfully fixed ${fixedCount} RBAC issues!`);
  }
}

// Run the enforcer
if (require.main === module) {
  const enforcer = new RBACEnforcer();
  enforcer.scanAndFix().catch(logger.error);
}

export { RBACEnforcer };
