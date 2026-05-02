import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { logAudit, AuditActions, getAuditLogs, clearAuditLogs } from '../audit';

// Mock console methods to avoid noise in tests
const mockConsole = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
};

describe('Audit Logging', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clearAuditLogs();
    // Mock console methods
    Object.assign(console, mockConsole);
  });

  afterEach(() => {
    clearAuditLogs();
  });

  describe('Basic Audit Logging', () => {
    it('should log basic audit event', () => {
      const eventData = {
        action: AuditActions.USER_LOGIN,
        userId: 'user123',
        resource: 'auth',
        details: { ip: '192.168.1.1' },
      };

      logAudit(eventData);

      expect(mockConsole.info).toHaveBeenCalledWith(
        expect.stringContaining('AUDIT'),
        expect.objectContaining({
          action: AuditActions.USER_LOGIN,
          userId: 'user123',
          resource: 'auth',
          details: { ip: '192.168.1.1' },
          timestamp: expect.any(Number),
          id: expect.any(String),
        })
      );
    });

    it('should generate unique IDs for each audit event', () => {
      const event1 = { action: AuditActions.USER_LOGIN, userId: 'user1' };
      const event2 = { action: AuditActions.USER_LOGOUT, userId: 'user1' };

      logAudit(event1);
      logAudit(event2);

      const calls = mockConsole.info.mock.calls;
      const id1 = calls[0][1].id;
      const id2 = calls[1][1].id;

      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^[a-f0-9-]{36}$/); // UUID format
      expect(id2).toMatch(/^[a-f0-9-]{36}$/);
    });

    it('should include timestamp in audit events', () => {
      const beforeTime = Date.now();
      
      logAudit({
        action: AuditActions.USER_LOGIN,
        userId: 'user123',
      });

      const afterTime = Date.now();
      const auditCall = mockConsole.info.mock.calls[0][1];
      
      expect(auditCall.timestamp).toBeGreaterThanOrEqual(beforeTime);
      expect(auditCall.timestamp).toBeLessThanOrEqual(afterTime);
    });

    it('should handle minimal audit data', () => {
      logAudit({
        action: AuditActions.USER_LOGIN,
      });

      expect(mockConsole.info).toHaveBeenCalledWith(
        expect.stringContaining('AUDIT'),
        expect.objectContaining({
          action: AuditActions.USER_LOGIN,
          timestamp: expect.any(Number),
          id: expect.any(String),
        })
      );
    });
  });

  describe('Audit Actions', () => {
    it('should support all predefined audit actions', () => {
      const actions = [
        AuditActions.USER_LOGIN,
        AuditActions.USER_LOGOUT,
        AuditActions.USER_REGISTER,
        AuditActions.USER_UPDATE,
        AuditActions.USER_DELETE,
        AuditActions.PASSWORD_CHANGE,
        AuditActions.PASSWORD_RESET,
        AuditActions.SESSION_CREATED,
        AuditActions.SESSION_DESTROYED,
        AuditActions.PERMISSION_GRANTED,
        AuditActions.PERMISSION_REVOKED,
        AuditActions.ROLE_CREATED,
        AuditActions.ROLE_UPDATED,
        AuditActions.ROLE_DELETED,
        AuditActions.DATA_ACCESS,
        AuditActions.DATA_CREATE,
        AuditActions.DATA_UPDATE,
        AuditActions.DATA_DELETE,
        AuditActions.API_KEY_CREATED,
        AuditActions.API_KEY_UPDATED,
        AuditActions.API_KEY_DELETED,
        AuditActions.API_ACCESS,
        AuditActions.SECURITY_BREACH,
        AuditActions.SUSPICIOUS_ACTIVITY,
        AuditActions.RATE_LIMIT_EXCEEDED,
        AuditActions.INVALID_LOGIN_ATTEMPT,
        AuditActions.SYSTEM_ERROR,
        AuditActions.CONFIGURATION_CHANGE,
      ];

      actions.forEach(action => {
        expect(() => {
          logAudit({
            action,
            userId: 'test-user',
          });
        }).not.toThrow();
      });

      expect(mockConsole.info).toHaveBeenCalledTimes(actions.length);
    });

    it('should handle custom audit actions', () => {
      const customAction = 'CUSTOM_ACTION' as any;
      
      logAudit({
        action: customAction,
        userId: 'user123',
      });

      expect(mockConsole.info).toHaveBeenCalledWith(
        expect.stringContaining('AUDIT'),
        expect.objectContaining({
          action: customAction,
        })
      );
    });
  });

  describe('Audit Event Details', () => {
    it('should include resource information', () => {
      logAudit({
        action: AuditActions.DATA_ACCESS,
        userId: 'user123',
        resource: 'user-profile',
        resourceId: 'profile123',
      });

      const auditCall = mockConsole.info.mock.calls[0][1];
      expect(auditCall.resource).toBe('user-profile');
      expect(auditCall.resourceId).toBe('profile123');
    });

    it('should include organization context', () => {
      logAudit({
        action: AuditActions.USER_LOGIN,
        userId: 'user123',
        organizationId: 'org456',
      });

      const auditCall = mockConsole.info.mock.calls[0][1];
      expect(auditCall.organizationId).toBe('org456');
    });

    it('should include IP address and user agent', () => {
      logAudit({
        action: AuditActions.USER_LOGIN,
        userId: 'user123',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0...',
      });

      const auditCall = mockConsole.info.mock.calls[0][1];
      expect(auditCall.ipAddress).toBe('192.168.1.1');
      expect(auditCall.userAgent).toBe('Mozilla/5.0...');
    });

    it('should include severity level', () => {
      logAudit({
        action: AuditActions.SECURITY_BREACH,
        userId: 'user123',
        severity: 'high',
      });

      const auditCall = mockConsole.info.mock.calls[0][1];
      expect(auditCall.severity).toBe('high');
    });

    it('should include correlation ID', () => {
      logAudit({
        action: AuditActions.USER_LOGIN,
        userId: 'user123',
        correlationId: 'req-123',
      });

      const auditCall = mockConsole.info.mock.calls[0][1];
      expect(auditCall.correlationId).toBe('req-123');
    });
  });

  describe('Audit Log Retrieval', () => {
    it('should retrieve audit logs', () => {
      const event1 = {
        action: AuditActions.USER_LOGIN,
        userId: 'user1',
      };
      const event2 = {
        action: AuditActions.USER_LOGOUT,
        userId: 'user1',
      };

      logAudit(event1);
      logAudit(event2);

      const logs = getAuditLogs();
      expect(logs).toHaveLength(2);
      expect(logs[0].action).toBe(AuditActions.USER_LOGIN);
      expect(logs[1].action).toBe(AuditActions.USER_LOGOUT);
    });

    it('should Filter logs by user ID', () => {
      logAudit({ action: AuditActions.USER_LOGIN, userId: 'user1' });
      logAudit({ action: AuditActions.USER_LOGIN, userId: 'user2' });
      logAudit({ action: AuditActions.USER_LOGOUT, userId: 'user1' });

      const user1Logs = getAuditLogs({ userId: 'user1' });
      expect(user1Logs).toHaveLength(2);
      expect(user1Logs.every(log => log.userId === 'user1')).toBe(true);
    });

    it('should Filter logs by action', () => {
      logAudit({ action: AuditActions.USER_LOGIN, userId: 'user1' });
      logAudit({ action: AuditActions.USER_LOGOUT, userId: 'user1' });
      logAudit({ action: AuditActions.USER_LOGIN, userId: 'user2' });

      const loginLogs = getAuditLogs({ action: AuditActions.USER_LOGIN });
      expect(loginLogs).toHaveLength(2);
      expect(loginLogs.every(log => log.action === AuditActions.USER_LOGIN)).toBe(true);
    });

    it('should Filter logs by date range', () => {
      const now = Date.now();
      const oneHourAgo = now - (60 * 60 * 1000);

      logAudit({ action: AuditActions.USER_LOGIN, userId: 'user1' });
      
      // Mock time for second event
      jest.spyOn(Date, 'now').mockReturnValue(oneHourAgo);
      logAudit({ action: AuditActions.USER_LOGOUT, userId: 'user1' });
      jest.restoreAllMocks();

      const recentLogs = getAuditLogs({
        startDate: now - (30 * 60 * 1000), // Last 30 minutes
      });
      
      expect(recentLogs).toHaveLength(1);
      expect(recentLogs[0].action).toBe(AuditActions.USER_LOGIN);
    });

    it('should limit number of returned logs', () => {
      for (let i = 0; i < 10; i++) {
        logAudit({
          action: AuditActions.USER_LOGIN,
          userId: `user${i}`,
        });
      }

      const limitedLogs = getAuditLogs({ limit: 5 });
      expect(limitedLogs).toHaveLength(5);
    });
  });

  describe('Audit Log Management', () => {
    it('should clear audit logs', () => {
      logAudit({ action: AuditActions.USER_LOGIN, userId: 'user1' });
      logAudit({ action: AuditActions.USER_LOGOUT, userId: 'user1' });

      expect(getAuditLogs()).toHaveLength(2);

      clearAuditLogs();
      expect(getAuditLogs()).toHaveLength(0);
    });

    it('should handle clearing empty logs', () => {
      expect(() => {
        clearAuditLogs();
      }).not.toThrow();
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid audit data gracefully', () => {
      expect(() => {
        logAudit(null as any);
      }).not.toThrow();

      expect(() => {
        logAudit(undefined as any);
      }).not.toThrow();
    });

    it('should handle circular references in details', () => {
      const circular: any = { name: 'test' };
      circular.self = circular;

      expect(() => {
        logAudit({
          action: AuditActions.USER_LOGIN,
          userId: 'user123',
          details: circular,
        });
      }).not.toThrow();
    });

    it('should handle very large details objects', () => {
      const largeDetails = {
        data: 'x'.repeat(10000), // 10KB of data
      };

      expect(() => {
        logAudit({
          action: AuditActions.DATA_ACCESS,
          userId: 'user123',
          details: largeDetails,
        });
      }).not.toThrow();
    });
  });

  describe('Performance', () => {
    it('should handle high volume of audit events efficiently', () => {
      const startTime = Date.now();
      const eventCount = 1000;

      for (let i = 0; i < eventCount; i++) {
        logAudit({
          action: AuditActions.USER_LOGIN,
          userId: `user${i}`,
          details: { index: i },
        });
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should handle 1000 events quickly (less than 1 second)
      expect(duration).toBeLessThan(1000);
      expect(mockConsole.info).toHaveBeenCalledTimes(eventCount);
    });

    it('should not block on log retrieval', () => {
      // Add many events
      for (let i = 0; i < 1000; i++) {
        logAudit({
          action: AuditActions.USER_LOGIN,
          userId: `user${i}`,
        });
      }

      const startTime = Date.now();
      const logs = getAuditLogs();
      const endTime = Date.now();

      expect(logs).toHaveLength(1000);
      expect(endTime - startTime).toBeLessThan(100); // Should be very fast
    });
  });

  describe('Security Considerations', () => {
    it('should not log sensitive data in plain text', () => {
      logAudit({
        action: AuditActions.PASSWORD_CHANGE,
        userId: 'user123',
        details: {
          password: 'secret123',
          oldPassword: 'oldsecret',
        },
      });

      const auditCall = mockConsole.info.mock.calls[0][1];
      expect(auditCall.details.password).toBe('[REDACTED]');
      expect(auditCall.details.oldPassword).toBe('[REDACTED]');
    });

    it('should sanitize PII in audit details', () => {
      logAudit({
        action: AuditActions.USER_UPDATE,
        userId: 'user123',
        details: {
          email: 'user@example.com',
          ssn: '123-45-6789',
          creditCard: '4111-1111-1111-1111',
        },
      });

      const auditCall = mockConsole.info.mock.calls[0][1];
      expect(auditCall.details.email).toBe('[REDACTED]');
      expect(auditCall.details.ssn).toBe('[REDACTED]');
      expect(auditCall.details.creditCard).toBe('[REDACTED]');
    });

    it('should maintain audit trail integrity', () => {
      const events = [
        { action: AuditActions.USER_LOGIN, userId: 'user1' },
        { action: AuditActions.DATA_ACCESS, userId: 'user1' },
        { action: AuditActions.USER_LOGOUT, userId: 'user1' },
      ];

      events.forEach(event => logAudit(event));

      const logs = getAuditLogs();
      
      // Logs should be in chronological order
      expect(logs[0].timestamp).toBeLessThanOrEqual(logs[1].timestamp);
      expect(logs[1].timestamp).toBeLessThanOrEqual(logs[2].timestamp);
      
      // All events should be present
      expect(logs.map(l => l.action)).toEqual([
        AuditActions.USER_LOGIN,
        AuditActions.DATA_ACCESS,
        AuditActions.USER_LOGOUT,
      ]);
    });
  });
});
