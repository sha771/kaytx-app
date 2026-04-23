/**
 * Plugin / Extension System
 * AI Operating System - Core Component #2
 * 
 * Allows customers to add custom agents and third-party extensions
 * Provides marketplace, security scanning, and permission management
 */

import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { createHash, createVerify } from 'crypto';
import { createLogger } from '../lib/production-logger';
import { logAudit } from '../lib/audit';

const logger = createLogger('PluginSystem');

// Plugin Types
export type PluginType = 'agent' | 'tool' | 'integration' | 'workflow' | 'ui-extension';
export type PluginStatus = 'pending' | 'installing' | 'active' | 'error' | 'disabled' | 'uninstalling';
export type PluginPermission = 
  | 'read:agents' 
  | 'write:agents' 
  | 'read:data' 
  | 'write:data' 
  | 'execute:tools'
  | 'access:external'
  | 'manage:users'
  | 'billing:read';

export interface PluginManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  type: PluginType;
  permissions: PluginPermission[];
  dependencies: string[];
  entryPoint: string;
  icon?: string;
  screenshots?: string[];
  pricing?: {
    type: 'free' | 'paid' | 'subscription';
    price?: number;
    subscriptionPeriod?: 'monthly' | 'yearly';
  };
  categories: string[];
  tags: string[];
  minimumOsVersion: string;
  supportedRegions: string[];
  rating?: number;
  downloadCount?: number;
  lastUpdated: Date;
  size: number; // bytes
  checksum: string;
  signature?: string; // Code signing signature
}

export interface PluginPackage {
  manifest: PluginManifest;
  code: string; // JavaScript/TypeScript code
  assets: Map<string, Buffer>; // Images, config files, etc.
  schema?: string; // Database schema migrations
  webhooks?: string[]; // Required webhook endpoints
}

export interface InstalledPlugin {
  installationId: string;
  manifest: PluginManifest;
  organizationId: string;
  installedBy: string;
  installedAt: Date;
  status: PluginStatus;
  config: Record<string, any>;
  environment: Record<string, string>; // Env vars injected
  healthCheckUrl?: string;
  lastHealthCheck?: Date;
  errorMessage?: string;
  usageStats: {
    invocations: number;
    lastUsed: Date;
    totalExecutionTime: number;
    errors: number;
  };
  sandboxConfig: SandboxConfig;
}

export interface SandboxConfig {
  containerId?: string;
  memoryLimit: number;
  cpuLimit: number;
  allowedDomains: string[];
  allowedIPs: string[];
  fileSystemAccess: 'none' | 'read-only' | 'read-write';
  networkAccess: 'none' | 'limited' | 'full';
  secretAccess: string[]; // Which secrets can be accessed
}

export interface MarketplaceListing {
  pluginId: string;
  manifest: PluginManifest;
  publisher: {
    id: string;
    name: string;
    verified: boolean;
    rating: number;
    totalSales: number;
  };
  reviews: PluginReview[];
  revenue: {
    total: number;
    lastMonth: number;
  };
  featured: boolean;
  trending: boolean;
}

export interface PluginReview {
  id: string;
  userId: string;
  organizationId: string;
  rating: number;
  title: string;
  content: string;
  createdAt: Date;
  helpful: number;
  verifiedPurchase: boolean;
}

export interface SecurityScanResult {
  pluginId: string;
  scannedAt: Date;
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  findings: SecurityFinding[];
  malwareDetected: boolean;
  vulnerabilities: Vulnerability[];
  permissionRisks: string[];
  networkRisks: string[];
  dataAccessRisks: string[];
  passed: boolean;
}

export interface SecurityFinding {
  severity: 'info' | 'low' | 'medium' | 'high' | 'critical';
  category: 'malware' | 'vulnerability' | 'permission' | 'network' | 'data' | 'code-quality';
  message: string;
  line?: number;
  file?: string;
  recommendation: string;
}

export interface Vulnerability {
  id: string;
  cveId?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedComponent: string;
  fixedInVersion?: string;
}

export interface AgentTemplate {
  templateId: string;
  name: string;
  description: string;
  category: string;
  manifest: Partial<PluginManifest>;
  baseCode: string;
  configurationSchema: Record<string, any>;
  defaultConfig: Record<string, any>;
  examples: string[];
}

class PluginSystem extends EventEmitter {
  private marketplace: Map<string, MarketplaceListing> = new Map();
  private installed: Map<string, InstalledPlugin> = new Map();
  private templates: Map<string, AgentTemplate> = new Map();
  private securityCache: Map<string, SecurityScanResult> = new Map();
  private readonly SECURITY_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

  constructor() {
    super();
    this.initializeDefaultTemplates();
    this.initializeMarketplace();
  }

  // Initialize default agent templates
  private initializeDefaultTemplates(): void {
    const templates: AgentTemplate[] = [
      {
        templateId: 'template-custom-sales-agent',
        name: 'Custom Sales Agent',
        description: 'Base template for creating custom sales agents with your own logic',
        category: 'sales',
        manifest: {
          type: 'agent',
          permissions: ['read:agents', 'read:data', 'execute:tools'],
          minimumOsVersion: '1.0.0',
          supportedRegions: ['us-east-1', 'eu-west-1']
        },
        baseCode: this.generateBaseAgentCode('sales'),
        configurationSchema: {
          type: 'object',
          properties: {
            salesScript: { type: 'string' },
            productKnowledge: { type: 'array', items: { type: 'string' } },
            objectionHandling: { type: 'array', items: { type: 'string' } },
            pricingStrategy: { type: 'string' }
          },
          required: ['salesScript']
        },
        defaultConfig: {
          salesScript: 'Hello! I\'d love to help you find the perfect solution.',
          productKnowledge: [],
          objectionHandling: ['Price too high', 'Need to think about it', 'Talk to my boss']
        },
        examples: [
          'Real Estate Sales Agent',
          'SaaS Product Specialist',
          'Enterprise Software Sales'
        ]
      },
      {
        templateId: 'template-custom-support-agent',
        name: 'Custom Support Agent',
        description: 'Base template for creating custom customer support agents',
        category: 'support',
        manifest: {
          type: 'agent',
          permissions: ['read:agents', 'read:data', 'write:data', 'execute:tools'],
          minimumOsVersion: '1.0.0',
          supportedRegions: ['us-east-1', 'eu-west-1', 'ap-southeast-1']
        },
        baseCode: this.generateBaseAgentCode('support'),
        configurationSchema: {
          type: 'object',
          properties: {
            knowledgeBase: { type: 'array', items: { type: 'string' } },
            escalationRules: { type: 'array', items: { type: 'string' } },
            responseTone: { type: 'string', enum: ['professional', 'friendly', 'casual'] },
            maxResponseTime: { type: 'number' }
          },
          required: ['knowledgeBase']
        },
        defaultConfig: {
          knowledgeBase: [],
          escalationRules: ['Technical issue → Escalate to Tech Support'],
          responseTone: 'professional',
          maxResponseTime: 300
        },
        examples: [
          'Technical Support Agent',
          'Billing Support Specialist',
          'Returns & Refunds Agent'
        ]
      },
      {
        templateId: 'template-custom-analytics-agent',
        name: 'Custom Analytics Agent',
        description: 'Base template for creating custom data analytics agents',
        category: 'analytics',
        manifest: {
          type: 'agent',
          permissions: ['read:agents', 'read:data', 'access:external'],
          minimumOsVersion: '1.0.0',
          supportedRegions: ['us-east-1', 'us-west-1']
        },
        baseCode: this.generateBaseAgentCode('analytics'),
        configurationSchema: {
          type: 'object',
          properties: {
            dataSources: { type: 'array', items: { type: 'string' } },
            analysisTypes: { type: 'array', items: { type: 'string' } },
            visualization: { type: 'boolean' },
            alertThresholds: { type: 'object' }
          },
          required: ['dataSources', 'analysisTypes']
        },
        defaultConfig: {
          dataSources: ['sales_data', 'customer_data'],
          analysisTypes: ['trend', 'forecast', 'anomaly'],
          visualization: true,
          alertThresholds: {}
        },
        examples: [
          'Sales Forecasting Agent',
          'Churn Prediction Agent',
          'Revenue Analytics Agent'
        ]
      },
      {
        templateId: 'template-integration-webhook',
        name: 'Webhook Integration',
        description: 'Template for creating custom webhook integrations',
        category: 'integration',
        manifest: {
          type: 'integration',
          permissions: ['read:data', 'write:data', 'access:external'],
          minimumOsVersion: '1.0.0'
        },
        baseCode: this.generateIntegrationCode('webhook'),
        configurationSchema: {
          type: 'object',
          properties: {
            webhookUrl: { type: 'string', format: 'uri' },
            events: { type: 'array', items: { type: 'string' } },
            headers: { type: 'object' },
            retryPolicy: { type: 'object' },
            authentication: { type: 'object' }
          },
          required: ['webhookUrl', 'events']
        },
        defaultConfig: {
          events: ['lead.created', 'deal.won', 'invoice.paid'],
          headers: { 'Content-Type': 'application/json' },
          retryPolicy: { maxRetries: 3, backoff: 'exponential' },
          authentication: { type: 'bearer' }
        },
        examples: [
          'Slack Notifications',
          'CRM Sync Integration',
          'Analytics Webhook'
        ]
      },
      {
        templateId: 'template-workflow-automation',
        name: 'Custom Workflow',
        description: 'Template for creating custom workflow automations',
        category: 'workflow',
        manifest: {
          type: 'workflow',
          permissions: ['read:agents', 'write:agents', 'execute:tools'],
          minimumOsVersion: '1.0.0'
        },
        baseCode: this.generateWorkflowCode(),
        configurationSchema: {
          type: 'object',
          properties: {
            trigger: { type: 'object' },
            actions: { type: 'array', items: { type: 'object' } },
            conditions: { type: 'array', items: { type: 'object' } },
            schedule: { type: 'object' }
          },
          required: ['trigger', 'actions']
        },
        defaultConfig: {
          trigger: { type: 'event', event: 'lead.created' },
          actions: [{ type: 'send_email', template: 'welcome' }],
          conditions: []
        },
        examples: [
          'Lead Nurturing Workflow',
          'Deal Approval Workflow',
          'Onboarding Automation'
        ]
      }
    ];

    templates.forEach(t => this.templates.set(t.templateId, t));
    logger.info(`Initialized ${templates.length} agent templates`);
  }

  // Generate base agent code
  private generateBaseAgentCode(type: string): string {
    return `
import { BaseAgent } from 'kaytx-os';

class Custom${type.charAt(0).toUpperCase() + type.slice(1)}Agent extends BaseAgent {
  constructor(config) {
    super(config);
    this.type = '${type}';
  }

  async initialize() {
    // Load your custom configuration
    await this.loadKnowledgeBase(this.config.knowledgeBase);
    
    // Register custom tools
    this.registerTools([
      this.customTool1,
      this.customTool2
    ]);
  }

  async process(input) {
    // Your custom processing logic
    const context = await this.getContext(input);
    const response = await this.generateResponse(input, context);
    
    return response;
  }

  async customTool1(args) {
    // Implement your custom tool
  }

  async customTool2(args) {
    // Implement your custom tool
  }
}

export default Custom${type.charAt(0).toUpperCase() + type.slice(1)}Agent;
    `.trim();
  }

  // Generate integration code
  private generateIntegrationCode(type: string): string {
    return `
import { IntegrationBase } from 'kaytx-os';

class Custom${type.charAt(0).toUpperCase() + type.slice(1)}Integration extends IntegrationBase {
  constructor(config) {
    super(config);
  }

  async initialize() {
    // Setup webhook endpoint
    this.webhook = await this.createWebhookEndpoint();
    
    // Configure event handlers
    this.config.events.forEach(event => {
      this.on(event, this.handleEvent);
    });
  }

  async handleEvent(event, data) {
    // Transform data to target format
    const payload = this.transform(data);
    
    // Send to external system
    await this.send(payload);
  }

  async transform(data) {
    // Your data transformation logic
    return data;
  }

  async send(payload) {
    // Your delivery logic
    return await fetch(this.config.webhookUrl, {
      method: 'POST',
      headers: this.config.headers,
      body: JSON.stringify(payload)
    });
  }
}

export default Custom${type.charAt(0).toUpperCase() + type.slice(1)}Integration;
    `.trim();
  }

  // Generate workflow code
  private generateWorkflowCode(): string {
    return `
import { WorkflowEngine } from 'kaytx-os';

class CustomWorkflow extends WorkflowEngine {
  constructor(config) {
    super(config);
  }

  async define() {
    // Define workflow steps
    this.step('trigger', this.config.trigger);
    
    this.config.conditions.forEach((condition, idx) => {
      this.step(\`condition_\${idx}\`, {
        type: 'condition',
        if: condition.if,
        then: condition.then,
        else: condition.else
      });
    });
    
    this.config.actions.forEach((action, idx) => {
      this.step(\`action_\${idx}\`, action);
    });
  }

  async execute(context) {
    await this.define();
    return await this.run(context);
  }
}

export default CustomWorkflow;
    `.trim();
  }

  // Initialize marketplace with sample plugins
  private initializeMarketplace(): void {
    const samplePlugins: MarketplaceListing[] = [
      {
        pluginId: 'plugin-legal-contract-reviewer',
        manifest: {
          id: 'plugin-legal-contract-reviewer',
          name: 'Legal Contract Reviewer',
          version: '1.2.0',
          description: 'AI agent specialized in reviewing and analyzing legal contracts',
          author: 'LegalAI Inc',
          type: 'agent',
          permissions: ['read:data', 'access:external'],
          dependencies: [],
          entryPoint: 'index.js',
          pricing: { type: 'subscription', price: 49, subscriptionPeriod: 'monthly' },
          categories: ['legal', 'compliance'],
          tags: ['contracts', 'legal', 'review'],
          minimumOsVersion: '1.0.0',
          supportedRegions: ['us-east-1', 'eu-west-1'],
          rating: 4.7,
          downloadCount: 1250,
          lastUpdated: new Date('2026-02-15'),
          size: 15 * 1024 * 1024, // 15 MB
          checksum: 'sha256:abc123...'
        },
        publisher: {
          id: 'publisher-legalai',
          name: 'LegalAI Inc',
          verified: true,
          rating: 4.8,
          totalSales: 5000
        },
        reviews: [],
        revenue: { total: 61250, lastMonth: 8500 },
        featured: true,
        trending: true
      },
      {
        pluginId: 'plugin-medical-billing',
        manifest: {
          id: 'plugin-medical-billing',
          name: 'Medical Billing Specialist',
          version: '2.0.1',
          description: 'HIPAA-compliant agent for medical billing and coding',
          author: 'HealthTech Solutions',
          type: 'agent',
          permissions: ['read:data', 'write:data', 'access:external'],
          dependencies: ['plugin-hipaa-compliance-base'],
          entryPoint: 'index.js',
          pricing: { type: 'subscription', price: 99, subscriptionPeriod: 'monthly' },
          categories: ['healthcare', 'billing'],
          tags: ['medical', 'billing', 'hipaa', 'coding'],
          minimumOsVersion: '1.0.0',
          supportedRegions: ['us-east-1', 'us-west-1'],
          rating: 4.9,
          downloadCount: 890,
          lastUpdated: new Date('2026-03-01'),
          size: 25 * 1024 * 1024,
          checksum: 'sha256:def456...'
        },
        publisher: {
          id: 'publisher-healthtech',
          name: 'HealthTech Solutions',
          verified: true,
          rating: 4.9,
          totalSales: 3200
        },
        reviews: [],
        revenue: { total: 88110, lastMonth: 12000 },
        featured: true,
        trending: false
      }
    ];

    samplePlugins.forEach(p => this.marketplace.set(p.pluginId, p));
    logger.info(`Initialized marketplace with ${samplePlugins.length} plugins`);
  }

  // Get available templates
  getTemplates(category?: string): AgentTemplate[] {
    const templates = Array.from(this.templates.values());
    if (category) {
      return templates.filter(t => t.category === category);
    }
    return templates;
  }

  // Create custom agent from template
  async createFromTemplate(
    templateId: string,
    organizationId: string,
    userId: string,
    customizations: {
      name: string;
      description: string;
      config: Record<string, any>;
      codeModifications?: string;
    }
  ): Promise<PluginPackage> {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    const pluginId = `custom-${uuidv4()}`;
    
    // Merge configurations
    const finalConfig = { ...template.defaultConfig, ...customizations.config };
    
    // Generate unique code with customizations
    let code = template.baseCode;
    if (customizations.codeModifications) {
      code = this.applyCodeModifications(code, customizations.codeModifications);
    }

    // Create manifest
    const manifest: PluginManifest = {
      id: pluginId,
      name: customizations.name,
      version: '1.0.0',
      description: customizations.description,
      author: organizationId,
      type: template.manifest.type || 'agent',
      permissions: template.manifest.permissions || ['read:data'],
      dependencies: template.manifest.dependencies || [],
      entryPoint: 'index.js',
      categories: [template.category],
      tags: [],
      minimumOsVersion: template.manifest.minimumOsVersion || '1.0.0',
      supportedRegions: template.manifest.supportedRegions || ['us-east-1'],
      lastUpdated: new Date(),
      size: Buffer.byteLength(code, 'utf8'),
      checksum: this.calculateChecksum(code)
    };

    const package_: PluginPackage = {
      manifest,
      code,
      assets: new Map()
    };

    await logAudit({
      userId,
      organizationId,
      action: 'custom_agent_created',
      resource: 'plugin',
      resourceId: pluginId,
      details: { templateId, name: customizations.name }
    });

    this.emit('customAgentCreated', { pluginId, organizationId, templateId });
    logger.info(`Created custom agent ${pluginId} from template ${templateId}`);

    return package_;
  }

  // Apply code modifications
  private applyCodeModifications(baseCode: string, modifications: string): string {
    // Simple implementation - in production would use AST parsing
    return `${baseCode}\n\n// Custom Modifications\n${modifications}`;
  }

  // Calculate checksum for code verification
  private calculateChecksum(code: string): string {
    return createHash('sha256').update(code).digest('hex');
  }

  // Search marketplace
  searchMarketplace(query: string, filters?: {
    category?: string;
    type?: PluginType;
    priceRange?: { min: number; max: number };
    rating?: number;
    verifiedOnly?: boolean;
  }): MarketplaceListing[] {
    let results = Array.from(this.marketplace.values());

    // Text search
    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(p => 
        p.manifest.name.toLowerCase().includes(lowerQuery) ||
        p.manifest.description.toLowerCase().includes(lowerQuery) ||
        p.manifest.tags.some(t => t.toLowerCase().includes(lowerQuery))
      );
    }

    // Apply filters
    if (filters?.category) {
      results = results.filter(p => p.manifest.categories.includes(filters.category!));
    }
    if (filters?.type) {
      results = results.filter(p => p.manifest.type === filters.type);
    }
    if (filters?.priceRange) {
      results = results.filter(p => {
        const price = p.manifest.pricing?.price || 0;
        return price >= filters.priceRange!.min && price <= filters.priceRange!.max;
      });
    }
    if (filters?.rating) {
      results = results.filter(p => (p.manifest.rating || 0) >= filters.rating!);
    }
    if (filters?.verifiedOnly) {
      results = results.filter(p => p.publisher.verified);
    }

    // Sort by relevance (featured first, then rating, then downloads)
    results.sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      if (a.trending !== b.trending) return a.trending ? -1 : 1;
      return (b.manifest.rating || 0) - (a.manifest.rating || 0);
    });

    return results;
  }

  // Get marketplace listing
  getMarketplaceListing(pluginId: string): MarketplaceListing | undefined {
    return this.marketplace.get(pluginId);
  }

  // Security scan a plugin
  async securityScan(pluginPackage: PluginPackage): Promise<SecurityScanResult> {
    const cacheKey = pluginPackage.manifest.checksum;
    const cached = this.securityCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.scannedAt.getTime()) < this.SECURITY_CACHE_TTL) {
      logger.info(`Using cached security scan for ${pluginPackage.manifest.id}`);
      return cached;
    }

    const findings: SecurityFinding[] = [];
    const vulnerabilities: Vulnerability[] = [];

    // Scan code for patterns
    const code = pluginPackage.code;

    // Check for dangerous patterns
    const dangerousPatterns = [
      { pattern: /eval\s*\(/, message: 'Use of eval() detected - dangerous code execution' },
      { pattern: /Function\s*\(/, message: 'Dynamic function constructor detected' },
      { pattern: /child_process/, message: 'Process spawning capability detected' },
      { pattern: /fs\.unlink\s*\(/, message: 'File deletion capability detected' },
      { pattern: /require\s*\(\s*['"]http/, message: 'HTTP server creation detected' },
      { pattern: /require\s*\(\s*['"]net/, message: 'Raw network access detected' },
      { pattern: /process\.env/, message: 'Environment variable access detected' },
      { pattern: /XMLHttpRequest|fetch\s*\(/, message: 'External network requests detected' }
    ];

    dangerousPatterns.forEach(({ pattern, message }) => {
      if (pattern.test(code)) {
        findings.push({
          severity: 'high',
          category: 'code-quality',
          message,
          recommendation: 'Review if this capability is necessary and properly sandboxed'
        });
      }
    });

    // Check permissions against actual code capabilities
    const declaredPermissions = pluginPackage.manifest.permissions;
    
    if (code.includes('fetch') || code.includes('XMLHttpRequest')) {
      if (!declaredPermissions.includes('access:external')) {
        findings.push({
          severity: 'critical',
          category: 'permission',
          message: 'Plugin makes external requests but does not declare access:external permission',
          recommendation: 'Add access:external permission or remove external calls'
        });
      }
    }

    if (code.includes('db.') || code.includes('query')) {
      if (!declaredPermissions.includes('read:data') && !declaredPermissions.includes('write:data')) {
        findings.push({
          severity: 'critical',
          category: 'permission',
          message: 'Plugin accesses database but lacks data permissions',
          recommendation: 'Add appropriate data permissions'
        });
      }
    }

    // Check dependencies for known vulnerabilities
    for (const dep of pluginPackage.manifest.dependencies) {
      const vuln = await this.checkDependencyVulnerabilities(dep);
      if (vuln) {
        vulnerabilities.push(vuln);
      }
    }

    // Calculate overall risk
    let overallRisk: 'low' | 'medium' | 'high' | 'critical' = 'low';
    if (findings.some(f => f.severity === 'critical')) {
      overallRisk = 'critical';
    } else if (findings.some(f => f.severity === 'high')) {
      overallRisk = 'high';
    } else if (findings.some(f => f.severity === 'medium')) {
      overallRisk = 'medium';
    }

    const passed = overallRisk !== 'critical' && overallRisk !== 'high';

    const result: SecurityScanResult = {
      pluginId: pluginPackage.manifest.id,
      scannedAt: new Date(),
      overallRisk,
      findings,
      malwareDetected: false, // Would integrate with actual malware scanner
      vulnerabilities,
      permissionRisks: findings.filter(f => f.category === 'permission').map(f => f.message),
      networkRisks: findings.filter(f => f.category === 'network').map(f => f.message),
      dataAccessRisks: findings.filter(f => f.category === 'data').map(f => f.message),
      passed
    };

    // Cache result
    this.securityCache.set(cacheKey, result);

    this.emit('securityScanCompleted', { pluginId: pluginPackage.manifest.id, result });
    logger.info(`Security scan completed for ${pluginPackage.manifest.id}: ${overallRisk} risk`);

    return result;
  }

  // Check dependency vulnerabilities (mock implementation)
  private async checkDependencyVulnerabilities(dependency: string): Promise<Vulnerability | null> {
    // In production, integrate with npm audit, Snyk, or similar
    // For now, return mock data
    const knownVulns: Record<string, Vulnerability> = {
      'lodash@<4.17.21': {
        id: 'vuln-001',
        cveId: 'CVE-2021-23337',
        severity: 'high',
        description: 'Command injection vulnerability in lodash',
        affectedComponent: 'lodash',
        fixedInVersion: '4.17.21'
      }
    };

    return knownVulns[dependency] || null;
  }

  // Install a plugin
  async installPlugin(
    pluginPackage: PluginPackage,
    organizationId: string,
    userId: string,
    config: Record<string, any> = {}
  ): Promise<InstalledPlugin> {
    // 1. Security scan
    const securityResult = await this.securityScan(pluginPackage);
    if (!securityResult.passed) {
      throw new Error(
        `Security scan failed for ${pluginPackage.manifest.id}: ${securityResult.overallRisk} risk`
      );
    }

    // 2. Check dependencies
    for (const dep of pluginPackage.manifest.dependencies) {
      const hasDep = this.installed.has(dep) || this.marketplace.has(dep);
      if (!hasDep) {
        throw new Error(`Missing dependency: ${dep}`);
      }
    }

    // 3. Create installation record
    const installationId = uuidv4();
    const installed: InstalledPlugin = {
      installationId,
      manifest: pluginPackage.manifest,
      organizationId,
      installedBy: userId,
      installedAt: new Date(),
      status: 'installing',
      config,
      environment: this.generateEnvironmentVariables(pluginPackage.manifest),
      usageStats: {
        invocations: 0,
        lastUsed: new Date(),
        totalExecutionTime: 0,
        errors: 0
      },
      sandboxConfig: this.generateSandboxConfig(pluginPackage.manifest, securityResult)
    };

    this.installed.set(installationId, installed);

    // 4. Setup sandbox
    try {
      await this.setupSandbox(installed);
      installed.status = 'active';
    } catch (error) {
      installed.status = 'error';
      installed.errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw error;
    }

    // 5. Register with orchestration layer
    this.emit('pluginInstalled', { installationId, pluginId: pluginPackage.manifest.id });

    await logAudit({
      userId,
      organizationId,
      action: 'plugin_installed',
      resource: 'plugin',
      resourceId: pluginPackage.manifest.id,
      details: { installationId, version: pluginPackage.manifest.version }
    });

    logger.info(`Plugin ${pluginPackage.manifest.id} installed for ${organizationId}`);

    return installed;
  }

  // Generate environment variables for plugin
  private generateEnvironmentVariables(manifest: PluginManifest): Record<string, string> {
    const env: Record<string, string> = {
      'KAYTX_PLUGIN_ID': manifest.id,
      'KAYTX_PLUGIN_VERSION': manifest.version,
      'KAYTX_PLUGIN_TYPE': manifest.type,
      'KAYTX_NODE_ENV': 'production'
    };

    // Inject secrets based on permissions
    if (manifest.permissions.includes('access:external')) {
      // Would fetch from secrets manager
      env['KAYTX_API_KEY'] = '[REDACTED]';
    }

    return env;
  }

  // Generate sandbox configuration based on security scan
  private generateSandboxConfig(manifest: PluginManifest, securityScan: SecurityScanResult): SandboxConfig {
    const baseConfig: SandboxConfig = {
      memoryLimit: 512, // 512 MB default
      cpuLimit: 1,
      allowedDomains: [],
      allowedIPs: [],
      fileSystemAccess: 'none',
      networkAccess: 'none',
      secretAccess: []
    };

    // Adjust based on permissions
    if (manifest.permissions.includes('access:external')) {
      baseConfig.networkAccess = 'limited';
      baseConfig.allowedDomains = ['api.openai.com', 'api.anthropic.com']; // Whitelist
    }

    if (manifest.permissions.includes('read:data') || manifest.permissions.includes('write:data')) {
      baseConfig.fileSystemAccess = 'read-only';
    }

    if (manifest.permissions.includes('access:external')) {
      baseConfig.secretAccess.push('API_KEYS');
    }

    // Adjust based on risk level
    if (securityScan.overallRisk === 'high' || securityScan.overallRisk === 'critical') {
      baseConfig.memoryLimit = Math.min(baseConfig.memoryLimit, 256);
      baseConfig.cpuLimit = Math.min(baseConfig.cpuLimit, 0.5);
    }

    return baseConfig;
  }

  // Setup sandbox for plugin
  private async setupSandbox(installed: InstalledPlugin): Promise<void> {
    // In production, this would:
    // 1. Create Docker container
    // 2. Setup network policies
    // 3. Mount volumes
    // 4. Configure cgroups for resource limits
    
    logger.info(`Setting up sandbox for plugin ${installed.manifest.id}`);
    
    // Simulate sandbox creation
    installed.sandboxConfig.containerId = `sandbox-${uuidv4()}`;
    installed.healthCheckUrl = `/health/plugins/${installed.installationId}`;
    
    // Start health monitoring
    installed.lastHealthCheck = new Date();
  }

  // Uninstall a plugin
  async uninstallPlugin(installationId: string, userId: string): Promise<void> {
    const installed = this.installed.get(installationId);
    if (!installed) {
      throw new Error(`Plugin installation ${installationId} not found`);
    }

    installed.status = 'uninstalling';

    // Cleanup sandbox
    if (installed.sandboxConfig.containerId) {
      await this.destroySandbox(installed.sandboxConfig.containerId);
    }

    this.installed.delete(installationId);

    await logAudit({
      userId,
      organizationId: installed.organizationId,
      action: 'plugin_uninstalled',
      resource: 'plugin',
      resourceId: installed.manifest.id,
      details: { installationId }
    });

    this.emit('pluginUninstalled', { installationId, pluginId: installed.manifest.id });
    logger.info(`Plugin ${installed.manifest.id} uninstalled`);
  }

  // Destroy sandbox
  private async destroySandbox(containerId: string): Promise<void> {
    logger.info(`Destroying sandbox ${containerId}`);
    // In production: docker rm -f containerId
  }

  // Get installed plugins for organization
  getInstalledPlugins(organizationId: string): InstalledPlugin[] {
    return Array.from(this.installed.values())
      .filter(p => p.organizationId === organizationId);
  }

  // Get plugin by installation ID
  getInstalledPlugin(installationId: string): InstalledPlugin | undefined {
    return this.installed.get(installationId);
  }

  // Update plugin configuration
  async updatePluginConfig(
    installationId: string,
    newConfig: Record<string, any>,
    userId: string
  ): Promise<void> {
    const installed = this.installed.get(installationId);
    if (!installed) {
      throw new Error(`Plugin installation ${installationId} not found`);
    }

    installed.config = { ...installed.config, ...newConfig };

    await logAudit({
      userId,
      organizationId: installed.organizationId,
      action: 'plugin_config_updated',
      resource: 'plugin',
      resourceId: installed.manifest.id,
      details: { installationId, configKeys: Object.keys(newConfig) }
    });
  }

  // Enable/disable plugin
  async setPluginStatus(
    installationId: string,
    status: 'active' | 'disabled',
    userId: string
  ): Promise<void> {
    const installed = this.installed.get(installationId);
    if (!installed) {
      throw new Error(`Plugin installation ${installationId} not found`);
    }

    installed.status = status;

    await logAudit({
      userId,
      organizationId: installed.organizationId,
      action: `plugin_${status}`,
      resource: 'plugin',
      resourceId: installed.manifest.id
    });

    this.emit('pluginStatusChanged', { installationId, pluginId: installed.manifest.id, status });
  }

  // Record plugin usage
  recordUsage(installationId: string, executionTime: number, error: boolean): void {
    const installed = this.installed.get(installationId);
    if (!installed) return;

    installed.usageStats.invocations++;
    installed.usageStats.lastUsed = new Date();
    installed.usageStats.totalExecutionTime += executionTime;
    if (error) {
      installed.usageStats.errors++;
    }
  }

  // Get plugin usage statistics
  getPluginStats(installationId: string): InstalledPlugin['usageStats'] | undefined {
    return this.installed.get(installationId)?.usageStats;
  }

  // Submit plugin to marketplace
  async submitToMarketplace(
    pluginPackage: PluginPackage,
    publisherId: string,
    pricing: MarketplaceListing['manifest']['pricing']
  ): Promise<MarketplaceListing> {
    // Security scan
    const securityResult = await this.securityScan(pluginPackage);
    if (securityResult.overallRisk === 'critical') {
      throw new Error('Cannot submit plugin with critical security risk');
    }

    // Update manifest with pricing
    pluginPackage.manifest.pricing = pricing;

    const listing: MarketplaceListing = {
      pluginId: pluginPackage.manifest.id,
      manifest: pluginPackage.manifest,
      publisher: {
        id: publisherId,
        name: 'Publisher', // Would fetch from publisher profile
        verified: false,
        rating: 0,
        totalSales: 0
      },
      reviews: [],
      revenue: { total: 0, lastMonth: 0 },
      featured: false,
      trending: false
    };

    this.marketplace.set(pluginPackage.manifest.id, listing);

    await logAudit({
      userId: publisherId,
      organizationId: 'marketplace',
      action: 'plugin_submitted',
      resource: 'plugin',
      resourceId: pluginPackage.manifest.id,
      details: { pricing }
    });

    this.emit('pluginSubmitted', { pluginId: pluginPackage.manifest.id, publisherId });
    logger.info(`Plugin ${pluginPackage.manifest.id} submitted to marketplace`);

    return listing;
  }

  // Add review to plugin
  async addReview(
    pluginId: string,
    review: Omit<PluginReview, 'id' | 'createdAt' | 'helpful'>,
    userId: string
  ): Promise<PluginReview> {
    const listing = this.marketplace.get(pluginId);
    if (!listing) {
      throw new Error(`Plugin ${pluginId} not found in marketplace`);
    }

    const newReview: PluginReview = {
      ...review,
      id: uuidv4(),
      createdAt: new Date(),
      helpful: 0
    };

    listing.reviews.push(newReview);

    // Update average rating
    const avgRating = listing.reviews.reduce((sum, r) => sum + r.rating, 0) / listing.reviews.length;
    listing.manifest.rating = Math.round(avgRating * 10) / 10;

    await logAudit({
      userId,
      organizationId: review.organizationId,
      action: 'plugin_review_added',
      resource: 'plugin',
      resourceId: pluginId,
      details: { reviewId: newReview.id, rating: review.rating }
    });

    return newReview;
  }

  // Verify publisher
  async verifyPublisher(publisherId: string): Promise<void> {
    // Update all listings by this publisher
    for (const listing of this.marketplace.values()) {
      if (listing.publisher.id === publisherId) {
        listing.publisher.verified = true;
      }
    }

    await logAudit({
      userId: 'system',
      organizationId: 'marketplace',
      action: 'publisher_verified',
      resource: 'publisher',
      resourceId: publisherId
    });
  }
}

// Singleton instance
export const pluginSystem = new PluginSystem();

// Export types
export type { PluginSystem };
