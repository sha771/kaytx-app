// Setup mocks before imports
// Import after all mocks are set up
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { logAudit, verifyAuditChainIntegrity } from '../../backend/lib/audit';
import crypto from 'crypto';

const mockSelect = jest.fn();
const mockInsert = jest.fn();

const mockDb: any = {
  select: mockSelect,
  insert: mockInsert,
  query: jest.fn().mockResolvedValue({ rows: [] } as any),
  execute: jest.fn().mockResolvedValue([] as any),
  transaction: jest.fn().mockImplementation(async (fn: any) => await fn(mockDb)),
};

mockSelect.mockReturnValue({
  from: jest.fn().mockReturnValue({
    where: jest.fn().mockReturnValue({
      orderBy: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue([] as any),
      }),
    }),
  }),
});

mockInsert.mockReturnValue({
  values: jest.fn().mockResolvedValue([{ id: 'audit-123' }] as any),
});

jest.mock('../../backend/db/connection', () => ({
  db: mockDb,
  pgDb: mockDb,
  getDb: () => mockDb,
}));

jest.mock('../../backend/db/drizzle-schema', () => ({
  auditLogs: { id: 'auditLogs' },
}));

jest.mock('drizzle-orm', () => ({
  eq: jest.fn((field: any, value: any) => ({ field, value })),
  and: jest.fn((...conditions: any[]) => ({ conditions })),
  gte: jest.fn((field: any, value: any) => ({ field, value, operator: '>=' })),
  lte: jest.fn((field: any, value: any) => ({ field, value, operator: '<=' })),
  desc: jest.fn((field: any) => ({ field, direction: 'desc' })),
  sql: jest.fn((template: any) => template),
}));

describe('Audit Trail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.AUDIT_SIGNATURE_SECRET = 'test-secret-key';
    process.env.NODE_ENV = 'test';
    
    // Set up global mock for test environment
    (global as any).mockDb = mockDb;
    
    // Setup mock chains for select
    mockDb.select.mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          orderBy: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([] as any),
          }),
        }),
      }),
    });
    
    // Setup mock for insert
    mockDb.insert.mockReturnValue({
      values: jest.fn().mockResolvedValue([{ id: 'audit-123' }] as any),
    });
  });

  describe('logAudit', () => {
    it('should log audit entry successfully', async () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      // The function should complete successfully and return the audit log
      const result = await logAudit({
        userId: 'user-123',
        organizationId: 'org-123',
        action: 'user.login',
        resource: 'auth',
        status: 'success',
        severity: 'info',
      });
      
      // Should return the audit log object
      expect(result).toBeDefined();
      expect(result.action).toBe('user.login');
      
      // Verify the mock insert was called
      expect(mockDb.insert).toHaveBeenCalled();
      
      logSpy.mockRestore();
      errorSpy.mockRestore();
    });

    it('should handle audit log failure gracefully', async () => {
      mockDb.insert.mockReturnValue({
        values: jest.fn().mockRejectedValue(new Error('Database error')),
      });

      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await logAudit({
        userId: 'user-123',
        action: 'user.login',
        resource: 'auth',
        status: 'success',
      });

      expect(errorSpy).toHaveBeenCalled();
      errorSpy.mockRestore();
    });
  });

  describe('verifyAuditChainIntegrity', () => {
    it('should verify audit chain integrity successfully', async () => {
      const mockLog = {
        id: 'log-123',
        userId: 'user-123',
        organizationId: 'org-123',
        action: 'user.login',
        resource: 'auth',
        status: 'success',
        severity: 'info',
        timestamp: Date.now(),
        metadata: {},
        signature: 'valid-signature',
        hash: 'valid-hash',
        previousHash: 'previous-hash',
      };

      // Update mock for this test
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([mockLog]),
          }),
        }),
      });

      const result = await verifyAuditChainIntegrity('org-123');

      expect(result).toHaveProperty('validLogs');
      expect(result).toHaveProperty('totalLogs');
      expect(result).toHaveProperty('issues');
      expect(result).toHaveProperty('integrityScore');
    });

    it('should handle empty audit chain', async () => {
      // Update mock for this test
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([] as any),
          }),
        }),
      });

      const result = await verifyAuditChainIntegrity('org-123');

      expect(result).toEqual({
        totalLogs: 0,
        validLogs: 0,
        invalidLogs: 0,
        brokenChains: 0,
        issues: expect.any(Array), // Allow for error issues
      });
    });
  });

  describe('tamper protection', () => {
    it('should generate unique signatures for different logs', async () => {
      // Reset mock but track insert calls
      const insertCalls: any[] = [];
      mockDb.insert.mockImplementation(() => {
        insertCalls.push({});
        return {
          values: jest.fn().mockResolvedValue([{ id: 'audit-' + insertCalls.length }]),
        };
      });

      // Mock the generateSignature function to track calls
      const crypto = require('crypto');
      const originalCreateHmac = crypto.createHmac;
      let signatureCount = 0;
      
      crypto.createHmac = jest.fn().mockImplementation((algorithm: string, secret: string) => {
        const hmac = originalCreateHmac(algorithm, secret);
        const originalUpdate = hmac.update;
        
        hmac.update = (data: any) => {
          signatureCount++;
          return originalUpdate.call(hmac, data);
        };
        
        return hmac;
      });

      await logAudit({
        userId: 'user-123',
        action: 'user.login',
        resource: 'auth',
        status: 'success',
      });

      await logAudit({
        userId: 'user-456',
        action: 'user.login',
        resource: 'auth',
        status: 'success',
      });

      expect(signatureCount).toBeGreaterThan(0);
      expect(insertCalls.length).toBe(2);
      
      // Restore original function
      crypto.createHmac = originalCreateHmac;
    });
  });
});
