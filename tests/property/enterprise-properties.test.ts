import { describe, it, expect } from '@jest/globals';
import * as fc from 'fast-check';
import { enterpriseGenerators, advancedPropertyTestUtils } from './enhanced-generators';

describe('Enterprise Property-Based Tests', () => {
  describe('Multi-Tenant Organization Properties', () => {
    it('should maintain organization data consistency', () => {
      fc.assert(
        fc.property(
          enterpriseGenerators.multiTenantOrg,
          (org) => {
            // Verify required fields
            expect(org.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
            expect(org.name.length).toBeGreaterThanOrEqual(1);
            expect(org.name.length).toBeLessThanOrEqual(100);
            
            // Verify domain format
            expect(org.domain).toMatch(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
            
            // Verify plan hierarchy
            const validPlans = ['free', 'starter', 'pro', 'enterprise'];
            expect(validPlans).toContain(org.plan);

            // Verify settings constraints
            expect(org.settings.sessionTimeout).toBeGreaterThanOrEqual(300);
            expect(org.settings.sessionTimeout).toBeLessThanOrEqual(86400);
            expect(org.settings.maxUsers).toBeGreaterThanOrEqual(1);
            expect(org.settings.maxUsers).toBeLessThanOrEqual(10000);
            expect(org.settings.auditRetention).toBeGreaterThanOrEqual(30);
            expect(org.settings.auditRetention).toBeLessThanOrEqual(2555);

            // Verify billing consistency
            expect(org.billing.amount).toBeGreaterThanOrEqual(0);
            expect(org.billing.amount).toBeLessThanOrEqual(100000);
            expect(org.billing.currency).toMatch(/^(usd|eur|gbp)$/);

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should enforce plan-based feature limits', () => {
      fc.assert(
        fc.property(
          enterpriseGenerators.multiTenantOrg,
          (org) => {
            // Free plans should have lower limits
            if (org.plan === 'free') {
              expect(org.settings.maxUsers).toBeLessThanOrEqual(5);
              expect(org.billing.amount).toBe(0);
            }

            // Enterprise plans should have higher limits
            if (org.plan === 'enterprise') {
              expect(org.settings.maxUsers).toBeGreaterThan(100);
              expect(org.settings.enableSSO).toBe(true);
              expect(org.settings.enforceMFA).toBe(true);
            }

            // Compliance requirements for enterprise
            if (org.plan === 'enterprise') {
              expect(org.compliance.gdprCompliant).toBe(true);
              expect(org.compliance.encryptionAtRest).toBe(true);
              expect(org.compliance.encryptionInTransit).toBe(true);
            }

            return true;
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Role-Based Access Control Properties', () => {
    it('should maintain RBAC consistency', () => {
      fc.assert(
        fc.property(
          enterpriseGenerators.rbacRole,
          (role) => {
            // Verify role structure
            expect(role.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
            expect(role.name.length).toBeGreaterThanOrEqual(1);
            expect(role.name.length).toBeLessThanOrEqual(50);

            // Verify permissions structure
            expect(role.permissions.length).toBeGreaterThanOrEqual(1);
            
            role.permissions.forEach(permission => {
              const validResources = [
                'users', 'agents', 'conversations', 'workflows', 'integrations',
                'billing', 'analytics', 'settings', 'audit_logs', 'api_keys'
              ];
              const validActions = ['create', 'read', 'update', 'delete', 'execute', 'manage', 'admin'];

              expect(validResources).toContain(permission.resource);
              expect(permission.actions.length).toBeGreaterThanOrEqual(1);
              
              permission.actions.forEach(action => {
                expect(validActions).toContain(action);
              });
            });

            // System roles should not be deletable
            if (role.isSystem) {
              expect(role.isActive).toBe(true);
            }

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should enforce permission hierarchy', () => {
      fc.assert(
        fc.property(
          enterpriseGenerators.rbacRole,
          (role) => {
            // Check for admin permissions
            const hasAdminPermission = role.permissions.some(p => 
              p.actions.includes('admin') || p.resource === 'users' && p.actions.includes('delete')
            );

            // If has admin permissions, should have read permissions for all resources
            if (hasAdminPermission) {
              const allResources = [
                'users', 'agents', 'conversations', 'workflows', 'integrations',
                'billing', 'analytics', 'settings', 'audit_logs', 'api_keys'
              ];

              allResources.forEach(resource => {
                const resourcePermission = role.permissions.find(p => p.resource === resource);
                if (resourcePermission) {
                  expect(resourcePermission.actions).toContain('read');
                }
              });
            }

            return true;
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('API Key Properties', () => {
    it('should maintain API key security properties', () => {
      fc.assert(
        fc.property(
          enterpriseGenerators.apiKey,
          (apiKey) => {
            // Verify key structure
            expect(apiKey.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
            expect(apiKey.name.length).toBeGreaterThanOrEqual(1);
            expect(apiKey.name.length).toBeLessThanOrEqual(100);

            // Verify key hash is valid SHA256
            expect(apiKey.keyHash).toMatch(/^[a-f0-9]{64}$/);
            expect(apiKey.keyPrefix.length).toBeGreaterThanOrEqual(3);
            expect(apiKey.keyPrefix.length).toBeLessThanOrEqual(10);

            // Verify permissions
            expect(apiKey.permissions.length).toBeGreaterThanOrEqual(1);
            const validPermissions = [
              'read', 'write', 'admin', 'agents:execute', 'conversations:read',
              'workflows:manage', 'analytics:view', 'billing:read'
            ];
            
            apiKey.permissions.forEach(permission => {
              expect(validPermissions).toContain(permission);
            });

            // Verify restrictions
            expect(apiKey.restrictions.rateLimitPerHour).toBeGreaterThanOrEqual(100);
            expect(apiKey.restrictions.rateLimitPerHour).toBeLessThanOrEqual(100000);

            // If key has expiration, it should be in the future
            if (apiKey.restrictions.expiresAt) {
              expect(apiKey.restrictions.expiresAt.getTime()).toBeGreaterThan(Date.now());
            }

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should enforce API key usage patterns', () => {
      fc.assert(
        fc.property(
          enterpriseGenerators.apiKey,
          (apiKey) => {
            // Verify delivery stats consistency
            expect(apiKey.deliveryStats.totalSent).toBeGreaterThanOrEqual(0);
            expect(apiKey.deliveryStats.successful).toBeGreaterThanOrEqual(0);
            expect(apiKey.deliveryStats.failed).toBeGreaterThanOrEqual(0);
            expect(apiKey.deliveryStats.averageDeliveryTime).toBeGreaterThanOrEqual(0);

            // Successful + failed should equal total
            expect(apiKey.deliveryStats.successful + apiKey.deliveryStats.failed)
              .toBeLessThanOrEqual(apiKey.deliveryStats.totalSent);

            // If key has been used, last used should be set
            if (apiKey.deliveryStats.totalSent > 0) {
              expect(apiKey.lastUsedAt).toBeDefined();
              expect(apiKey.lastUsedAt!.getTime()).toBeLessThanOrEqual(Date.now());
            }

            return true;
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Audit Log Properties', () => {
    it('should maintain audit log integrity', () => {
      fc.assert(
        fc.property(
          enterpriseGenerators.auditLog,
          (auditLog) => {
            // Verify log structure
            expect(auditLog.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
            
            const validActions = [
              'login', 'logout', 'create', 'read', 'update', 'delete',
              'execute', 'export', 'import', 'configure', 'integrate'
            ];
            const validResources = [
              'user', 'agent', 'conversation', 'workflow', 'api_key',
              'organization', 'role', 'integration', 'billing', 'audit_log'
            ];
            const validSeverities = ['info', 'warning', 'error', 'critical'];
            const validCategories = ['authentication', 'authorization', 'data_access', 'configuration', 'security'];

            expect(validActions).toContain(auditLog.action);
            expect(validResources).toContain(auditLog.resource);
            expect(validSeverities).toContain(auditLog.severity);
            expect(validCategories).toContain(auditLog.category);

            // Verify signature is valid SHA256
            expect(auditLog.signature).toMatch(/^[a-f0-9]{64}$/);

            // Verify metadata structure
            expect(auditLog.details.metadata).toHaveProperty('userAgent');
            expect(auditLog.details.metadata).toHaveProperty('ipAddress');
            expect(auditLog.details.metadata).toHaveProperty('sessionId');
            expect(auditLog.details.metadata).toHaveProperty('requestId');
            expect(auditLog.details.metadata).toHaveProperty('apiVersion');

            // Verify IP address format
            expect(auditLog.details.metadata.ipAddress).toMatch(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$|^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/);

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain audit log consistency', () => {
      fc.assert(
        fc.property(
          enterpriseGenerators.auditLog,
          (auditLog) => {
            // Critical events should have complete before/after states
            if (auditLog.severity === 'critical' || auditLog.action === 'delete') {
              expect(auditLog.details.before).toBeDefined();
              expect(auditLog.details.after).toBeDefined();
            }

            // Authentication events should be in auth category
            if (auditLog.action === 'login' || auditLog.action === 'logout') {
              expect(auditLog.category).toBe('authentication');
            }

            // Authorization events should be in auth category
            if (auditLog.action === 'create' || auditLog.action === 'update' || auditLog.action === 'delete') {
              expect(['authorization', 'data_access']).toContain(auditLog.category);
            }

            // Verify timestamp is reasonable
            expect(auditLog.timestamp.getTime()).toBeLessThanOrEqual(Date.now());
            expect(auditLog.timestamp.getTime()).toBeGreaterThan(Date.now() - 365 * 24 * 60 * 60 * 1000); // Within last year

            return true;
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Enterprise Security Properties', () => {
    it('should enforce security invariants across operations', () => {
      fc.assert(
        fc.property(
          fc.tuple(
            enterpriseGenerators.multiTenantOrg,
            enterpriseGenerators.rbacRole,
            enterpriseGenerators.apiKey
          ),
          ([org, role, apiKey]) => {
            // Verify cross-entity security consistency
            
            // Organization compliance should affect role permissions
            if (org.compliance.hipaaCompliant) {
              // HIPAA compliant orgs should have audit logging enabled
              expect(org.settings.auditRetention).toBeGreaterThan(365);
            }

            // API keys should respect organization settings
            if (org.settings.ipWhitelist.length > 0) {
              // If org has IP whitelist, API keys should have IP restrictions
              expect(apiKey.restrictions.allowedIPs.length).toBeGreaterThan(0);
            }

            // Role permissions should be consistent with organization plan
            if (org.plan === 'free') {
              // Free plans shouldn't have admin roles
              expect(role.permissions.every(p => !p.actions.includes('admin'))).toBe(true);
            }

            return true;
          }
        ),
        { numRuns: 30 }
      );
    });

    it('should maintain data isolation between tenants', () => {
      fc.assert(
        fc.property(
          fc.array(enterpriseGenerators.multiTenantOrg, { minLength: 2, maxLength: 5 }),
          (organizations) => {
            // Verify each organization has unique IDs
            const orgIds = organizations.map(org => org.id);
            const uniqueIds = new Set(orgIds);
            expect(uniqueIds.size).toBe(orgIds.length);

            // Verify each organization has unique domains
            const domains = organizations.map(org => org.domain);
            const uniqueDomains = new Set(domains);
            expect(uniqueDomains.size).toBe(domains.length);

            // Verify billing isolation
            organizations.forEach(org => {
              expect(org.billing.customerId).toBeDefined();
              expect(org.billing.subscriptionId).toBeDefined();
            });

            const customerIds = organizations.map(org => org.billing.customerId);
            const uniqueCustomerIds = new Set(customerIds);
            expect(uniqueCustomerIds.size).toBe(customerIds.length);

            return true;
          }
        ),
        { numRuns: 20 }
      );
    });
  });
});
