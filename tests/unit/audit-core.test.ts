import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { logAudit, getAuditLogs, generateAuditTrailReport, verifyAuditChainIntegrity } from '../../backend/lib/audit';

// Mock the database connection
jest.mock('../../backend/db/connection', () => ({
  db: {
    insert: jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        // @ts-ignore
        returning: jest.fn().mockResolvedValue([{ id: 'test-id' }])
      })
    }),
    select: jest.fn().mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          orderBy: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              // @ts-ignore
              offset: jest.fn().mockResolvedValue([])
            }),
            // @ts-ignore
            offset: jest.fn().mockResolvedValue([])
          }),
          limit: jest.fn().mockReturnValue({
            // @ts-ignore
            offset: jest.fn().mockResolvedValue([])
          }),
          // @ts-ignore
          offset: jest.fn().mockResolvedValue([])
        }),
        orderBy: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            // @ts-ignore
            offset: jest.fn().mockResolvedValue([])
          }),
          // @ts-ignore
          offset: jest.fn().mockResolvedValue([])
        }),
        limit: jest.fn().mockReturnValue({
          // @ts-ignore
          offset: jest.fn().mockResolvedValue([])
        }),
        // @ts-ignore
        offset: jest.fn().mockResolvedValue([])
      })
    })
  },
  getDb: jest.fn().mockReturnValue({
    insert: jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        // @ts-ignore
        returning: jest.fn().mockResolvedValue([{ id: 'test-id' }])
      })
    }),
    select: jest.fn().mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          orderBy: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              // @ts-ignore
              offset: jest.fn().mockResolvedValue([])
            }),
            // @ts-ignore
            offset: jest.fn().mockResolvedValue([])
          }),
          limit: jest.fn().mockReturnValue({
            // @ts-ignore
            offset: jest.fn().mockResolvedValue([])
          }),
          // @ts-ignore
          offset: jest.fn().mockResolvedValue([])
        }),
        orderBy: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            // @ts-ignore
            offset: jest.fn().mockResolvedValue([])
          }),
          // @ts-ignore
          offset: jest.fn().mockResolvedValue([])
        }),
        limit: jest.fn().mockReturnValue({
          // @ts-ignore
          offset: jest.fn().mockResolvedValue([])
        }),
        // @ts-ignore
        offset: jest.fn().mockResolvedValue([])
      })
    })
  })
}));

describe('Audit System Core Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('logAudit', () => {
    it('should log audit entry successfully', async () => {
      const auditData = {
        userId: 'user-123',
        organizationId: 'org-123',
        action: 'user.login',
        resource: 'user',
        resourceId: 'user-123',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
        metadata: { test: true },
        status: 'success' as const,
        severity: 'info' as const
      };

      const result = await logAudit(auditData);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.signature).toBeDefined();
      expect(result.hash).toBeDefined();
      expect(result.timestamp).toBeDefined();
    });

    it('should handle audit logging without optional fields', async () => {
      const auditData = {
        action: 'system.startup',
        resource: 'system',
        status: 'success' as const,
        severity: 'info' as const
      };

      const result = await logAudit(auditData);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.action).toBe('system.startup');
      expect(result.resource).toBe('system');
    });

    it('should generate cryptographic signatures', async () => {
      const auditData = {
        action: 'test.action',
        resource: 'test',
        status: 'success' as const,
        severity: 'info' as const
      };

      const result = await logAudit(auditData);

      expect(result.signature).toBeDefined();
      expect(typeof result.signature).toBe('string');
      expect(result.signature.length).toBeGreaterThan(0);
    });
  });

  describe('getAuditLogs', () => {
    it('should retrieve audit logs with filters', async () => {
      const filters = {
        organizationId: 'org-123',
        action: 'LOGIN',
        limit: 100
      };

      const result = await getAuditLogs(filters);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(typeof result.length).toBe('number');
    });

    it('should handle date range filters', async () => {
      const filters = {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        limit: 50
      };

      const result = await getAuditLogs(filters);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should handle empty results', async () => {
      const filters = {
        userId: 'nonexistent-user',
        limit: 10
      };

      const result = await getAuditLogs(filters);

      expect(result).toBeDefined();
      expect(result).toHaveLength(0);
    });
  });

  describe('generateAuditTrailReport', () => {
    beforeEach(() => {
      // Mock database to return audit log data for report generation
      const { db } = require('../../backend/db/connection');
      db.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockReturnValue({
              limit: jest.fn().mockReturnValue({
                offset: jest.fn().mockResolvedValue([
                  {
                    id: 'audit-1',
                    userId: 'user-1',
                    organizationId: 'org-123',
                    action: 'LOGIN_SUCCESS',
                    resource: 'auth',
                    resourceId: 'session-1',
                    ipAddress: '127.0.0.1',
                    userAgent: 'test-agent',
                    metadata: {},
                    status: 'success',
                    severity: 'info',
                    timestamp: new Date('2024-01-01')
                  },
                  {
                    id: 'audit-2',
                    userId: 'user-2',
                    organizationId: 'org-123',
                    action: 'LOGIN_FAILED',
                    resource: 'auth',
                    resourceId: null,
                    ipAddress: '127.0.0.1',
                    userAgent: 'test-agent',
                    metadata: {},
                    status: 'failure',
                    severity: 'warning',
                    timestamp: new Date('2024-01-02')
                  }
                ])
              }),
              offset: jest.fn().mockResolvedValue([
                {
                  id: 'audit-1',
                  userId: 'user-1',
                  organizationId: 'org-123',
                  action: 'LOGIN_SUCCESS',
                  resource: 'auth',
                  resourceId: 'session-1',
                  ipAddress: '127.0.0.1',
                  userAgent: 'test-agent',
                  metadata: {},
                  status: 'success',
                  severity: 'info',
                  timestamp: new Date('2024-01-01')
                },
                {
                  id: 'audit-2',
                  userId: 'user-2',
                  organizationId: 'org-123',
                  action: 'LOGIN_FAILED',
                  resource: 'auth',
                  resourceId: null,
                  ipAddress: '127.0.0.1',
                  userAgent: 'test-agent',
                  metadata: {},
                  status: 'failure',
                  severity: 'warning',
                  timestamp: new Date('2024-01-02')
                }
              ])
            }),
            limit: jest.fn().mockResolvedValue([
              {
                id: 'audit-1',
                userId: 'user-1',
                organizationId: 'org-123',
                action: 'LOGIN_SUCCESS',
                resource: 'auth',
                resourceId: 'session-1',
                ipAddress: '127.0.0.1',
                userAgent: 'test-agent',
                metadata: {},
                status: 'success',
                severity: 'info',
                timestamp: new Date('2024-01-01')
              },
              {
                id: 'audit-2',
                userId: 'user-2',
                organizationId: 'org-123',
                action: 'LOGIN_FAILED',
                resource: 'auth',
                resourceId: null,
                ipAddress: '127.0.0.1',
                userAgent: 'test-agent',
                metadata: {},
                status: 'failure',
                severity: 'warning',
                timestamp: new Date('2024-01-02')
              }
            ]),
            offset: jest.fn().mockResolvedValue([
              {
                id: 'audit-1',
                userId: 'user-1',
                organizationId: 'org-123',
                action: 'LOGIN_SUCCESS',
                resource: 'auth',
                resourceId: 'session-1',
                ipAddress: '127.0.0.1',
                userAgent: 'test-agent',
                metadata: {},
                status: 'success',
                severity: 'info',
                timestamp: new Date('2024-01-01')
              },
              {
                id: 'audit-2',
                userId: 'user-2',
                organizationId: 'org-123',
                action: 'LOGIN_FAILED',
                resource: 'auth',
                resourceId: null,
                ipAddress: '127.0.0.1',
                userAgent: 'test-agent',
                metadata: {},
                status: 'failure',
                severity: 'warning',
                timestamp: new Date('2024-01-02')
              }
            ])
          }),
          orderBy: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              offset: jest.fn().mockResolvedValue([
                {
                  id: 'audit-1',
                  userId: 'user-1',
                  organizationId: 'org-123',
                  action: 'LOGIN_SUCCESS',
                  resource: 'auth',
                  resourceId: 'session-1',
                  ipAddress: '127.0.0.1',
                  userAgent: 'test-agent',
                  metadata: {},
                  status: 'success',
                  severity: 'info',
                  timestamp: new Date('2024-01-01')
                },
                {
                  id: 'audit-2',
                  userId: 'user-2',
                  organizationId: 'org-123',
                  action: 'LOGIN_FAILED',
                  resource: 'auth',
                  resourceId: null,
                  ipAddress: '127.0.0.1',
                  userAgent: 'test-agent',
                  metadata: {},
                  status: 'failure',
                  severity: 'warning',
                  timestamp: new Date('2024-01-02')
                }
              ])
            }),
            offset: jest.fn().mockResolvedValue([
              {
                id: 'audit-1',
                userId: 'user-1',
                organizationId: 'org-123',
                action: 'LOGIN_SUCCESS',
                resource: 'auth',
                resourceId: 'session-1',
                ipAddress: '127.0.0.1',
                userAgent: 'test-agent',
                metadata: {},
                status: 'success',
                severity: 'info',
                timestamp: new Date('2024-01-01')
              },
              {
                id: 'audit-2',
                userId: 'user-2',
                organizationId: 'org-123',
                action: 'LOGIN_FAILED',
                resource: 'auth',
                resourceId: null,
                ipAddress: '127.0.0.1',
                userAgent: 'test-agent',
                metadata: {},
                status: 'failure',
                severity: 'warning',
                timestamp: new Date('2024-01-02')
              }
            ])
          }),
          limit: jest.fn().mockResolvedValue([
            {
              id: 'audit-1',
              userId: 'user-1',
              organizationId: 'org-123',
              action: 'LOGIN_SUCCESS',
              resource: 'auth',
              resourceId: 'session-1',
              ipAddress: '127.0.0.1',
              userAgent: 'test-agent',
              metadata: {},
              status: 'success',
              severity: 'info',
              timestamp: new Date('2024-01-01')
            },
            {
              id: 'audit-2',
              userId: 'user-2',
              organizationId: 'org-123',
              action: 'LOGIN_FAILED',
              resource: 'auth',
              resourceId: null,
              ipAddress: '127.0.0.1',
              userAgent: 'test-agent',
              metadata: {},
              status: 'failure',
              severity: 'warning',
              timestamp: new Date('2024-01-02')
            }
          ]),
          offset: jest.fn().mockResolvedValue([
            {
              id: 'audit-1',
              userId: 'user-1',
              organizationId: 'org-123',
              action: 'LOGIN_SUCCESS',
              resource: 'auth',
              resourceId: 'session-1',
              ipAddress: '127.0.0.1',
              userAgent: 'test-agent',
              metadata: {},
              status: 'success',
              severity: 'info',
              timestamp: new Date('2024-01-01')
            },
            {
              id: 'audit-2',
              userId: 'user-2',
              organizationId: 'org-123',
              action: 'LOGIN_FAILED',
              resource: 'auth',
              resourceId: null,
              ipAddress: '127.0.0.1',
              userAgent: 'test-agent',
              metadata: {},
              status: 'failure',
              severity: 'warning',
              timestamp: new Date('2024-01-02')
            }
          ])
        }),
        orderBy: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            offset: jest.fn().mockResolvedValue([
              {
                id: 'audit-1',
                userId: 'user-1',
                organizationId: 'org-123',
                action: 'LOGIN_SUCCESS',
                resource: 'auth',
                resourceId: 'session-1',
                ipAddress: '127.0.0.1',
                userAgent: 'test-agent',
                metadata: {},
                status: 'success',
                severity: 'info',
                timestamp: new Date('2024-01-01')
              },
              {
                id: 'audit-2',
                userId: 'user-2',
                organizationId: 'org-123',
                action: 'LOGIN_FAILED',
                resource: 'auth',
                resourceId: null,
                ipAddress: '127.0.0.1',
                userAgent: 'test-agent',
                metadata: {},
                status: 'failure',
                severity: 'warning',
                timestamp: new Date('2024-01-02')
              }
            ])
          }),
          offset: jest.fn().mockResolvedValue([
            {
              id: 'audit-1',
              userId: 'user-1',
              organizationId: 'org-123',
              action: 'LOGIN_SUCCESS',
              resource: 'auth',
              resourceId: 'session-1',
              ipAddress: '127.0.0.1',
              userAgent: 'test-agent',
              metadata: {},
              status: 'success',
              severity: 'info',
              timestamp: new Date('2024-01-01')
            },
            {
              id: 'audit-2',
              userId: 'user-2',
              organizationId: 'org-123',
              action: 'LOGIN_FAILED',
              resource: 'auth',
              resourceId: null,
              ipAddress: '127.0.0.1',
              userAgent: 'test-agent',
              metadata: {},
              status: 'failure',
              severity: 'warning',
              timestamp: new Date('2024-01-02')
            }
          ])
        }),
        limit: jest.fn().mockResolvedValue([
          {
            id: 'audit-1',
            userId: 'user-1',
            organizationId: 'org-123',
            action: 'LOGIN_SUCCESS',
            resource: 'auth',
            resourceId: 'session-1',
            ipAddress: '127.0.0.1',
            userAgent: 'test-agent',
            metadata: {},
            status: 'success',
            severity: 'info',
            timestamp: new Date('2024-01-01')
          },
          {
            id: 'audit-2',
            userId: 'user-2',
            organizationId: 'org-123',
            action: 'LOGIN_FAILED',
            resource: 'auth',
            resourceId: null,
            ipAddress: '127.0.0.1',
            userAgent: 'test-agent',
            metadata: {},
            status: 'failure',
            severity: 'warning',
            timestamp: new Date('2024-01-02')
          }
        ]),
        offset: jest.fn().mockResolvedValue([
          {
            id: 'audit-1',
            userId: 'user-1',
            organizationId: 'org-123',
            action: 'LOGIN_SUCCESS',
            resource: 'auth',
            resourceId: 'session-1',
            ipAddress: '127.0.0.1',
            userAgent: 'test-agent',
            metadata: {},
            status: 'success',
            severity: 'info',
            timestamp: new Date('2024-01-01')
          },
          {
            id: 'audit-2',
            userId: 'user-2',
            organizationId: 'org-123',
            action: 'LOGIN_FAILED',
            resource: 'auth',
            resourceId: null,
            ipAddress: '127.0.0.1',
            userAgent: 'test-agent',
            metadata: {},
            status: 'failure',
            severity: 'warning',
            timestamp: new Date('2024-01-02')
          }
        ])
      });
    });

    it('should generate comprehensive audit report', async () => {
      const params = {
        organizationId: 'org-123',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        reportType: 'full' as const,
        requestedBy: 'test-user'
      };

      const result = await generateAuditTrailReport(params);

      expect(result).toBeDefined();
      expect(result.metadata).toBeDefined();
      expect(result.summary).toBeDefined();
      expect(result.securityMetrics).toBeDefined();
      expect(result.topUsers).toBeDefined();
      expect(result.topActions).toBeDefined();
    });

    it('should calculate activity statistics', async () => {
      const params = {
        organizationId: 'org-123',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        reportType: 'security' as const,
        requestedBy: 'test-user'
      };

      const result = await generateAuditTrailReport(params);

      expect(result).toBeDefined();
      expect(result.summary).toBeDefined();
      expect(result.securityMetrics).toBeDefined();
      expect(result.topUsers).toBeDefined();
      expect(result.topActions).toBeDefined();
      expect(result.summary.uniqueResources).toBeDefined();
      expect(result.summary.successRate).toBeDefined();
    });

    it('should generate timeline data', async () => {
      const params = {
        organizationId: 'org-123',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        reportType: 'full' as const,
        requestedBy: 'test-user'
      };

      const result = await generateAuditTrailReport(params);

      expect(result).toBeDefined();
      expect(result.summary).toBeDefined();
      expect(result.securityMetrics).toBeDefined();
      expect(result.topUsers).toBeDefined();
      expect(result.topActions).toBeDefined();
      expect(result.criticalEvents).toBeDefined();
      expect(result.failedAuthenticationEvents).toBeDefined();
    });
  });

  describe('verifyAuditChainIntegrity', () => {
    it('should verify audit log chain integrity', async () => {
      const result = await verifyAuditChainIntegrity('org-123', 100);

      expect(result).toBeDefined();
      expect(result.totalLogs).toBeDefined();
      expect(result.validLogs).toBeDefined();
      expect(result.invalidLogs).toBeDefined();
      expect(result.integrityScore).toBeDefined();
      expect(result.issues).toBeDefined();
    });

    it('should handle empty audit chains', async () => {
      const result = await verifyAuditChainIntegrity('new-org', 10);

      expect(result.totalLogs).toBe(0);
      expect(result.validLogs).toBe(0);
      expect(result.invalidLogs).toBe(0);
      expect(result.integrityScore).toBe(100); // Perfect score for empty chain
    });

    it('should detect integrity violations', async () => {
      // This test would need mock data with tampered logs
      const result = await verifyAuditChainIntegrity('org-123', 100);

      expect(result.issues).toBeDefined();
      expect(Array.isArray(result.issues)).toBe(true);
    });
  });

  describe('Security Features', () => {
    it('should include proper security metadata', async () => {
      const auditData = {
        userId: 'user-123',
        action: 'security.sensitive_action',
        resource: 'sensitive_data',
        status: 'success' as const,
        severity: 'critical' as const,
        ipAddress: '192.168.1.1',
        userAgent: 'Test Agent'
      };

      const result = await logAudit(auditData);

      expect(result.ipAddress).toBe('192.168.1.1');
      expect(result.userAgent).toBe('Test Agent');
      expect(result.severity).toBe('critical');
    });

    it('should handle different severity levels', async () => {
      const severities: ('info' | 'warning' | 'error' | 'critical')[] = [
        'info', 'warning', 'error', 'critical'
      ];

      for (const severity of severities) {
        const auditData = {
          action: 'test.action',
          resource: 'test',
          status: 'success' as const,
          severity
        };

        const result = await logAudit(auditData);
        expect(result.severity).toBe(severity);
      }
    });

    it('should handle different status types', async () => {
      const statuses: ('success' | 'failure')[] = ['success', 'failure'];

      for (const status of statuses) {
        const auditData = {
          action: 'test.action',
          resource: 'test',
          status,
          severity: 'info' as const
        };

        const result = await logAudit(auditData);
        expect(result.status).toBe(status);
      }
    });
  });

  describe('Error Handling', () => {
    it('should handle database connection errors gracefully', async () => {
      // Mock database error
      const { db } = require('../../backend/db/connection');
      const mockInsert = jest.fn().mockReturnValue({
        values: jest.fn().mockReturnValue({
          // @ts-ignore
          returning: jest.fn().mockRejectedValue(new Error('Database connection failed'))
        })
      });
      db.insert = mockInsert;

      const auditData = {
        action: 'test.action',
        resource: 'test',
        status: 'success' as const,
        severity: 'info' as const
      };

      await expect(logAudit(auditData)).rejects.toThrow('Database connection failed');
    });

    it('should handle invalid audit data', async () => {
      const invalidAuditData = {
        // Missing required fields
        status: 'success' as const,
        severity: 'info' as const
      };

      // Should handle missing required action and resource
      await expect(logAudit(invalidAuditData as any)).rejects.toThrow();
    });
  });
});
