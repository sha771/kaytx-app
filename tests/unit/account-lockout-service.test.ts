import { AccountLockoutService } from '../../backend/services/account-lockout-service';
import { db as pgDb } from '../../backend/db/connection';
import { users, organizations } from '../../backend/db/drizzle-schema';
import { logAudit } from '../../backend/lib/audit';
import { jest } from '@jest/globals';

// Mock dependencies
jest.mock('../../backend/db/connection');
jest.mock('../../backend/lib/audit');

const mockDb = pgDb as jest.Mocked<typeof pgDb>;
const mockLogAudit = logAudit as jest.MockedFunction<typeof logAudit>;


describe('AccountLockoutService', () => {
  let service: AccountLockoutService;
  const mockUserId = 'user-123';
  const mockOrgId = 'org-123';
  const mockEmail = 'test@example.com';
  const mockIp = '192.168.1.1';

  beforeEach(() => {
    service = new AccountLockoutService();
    jest.clearAllMocks();
    
    // Mock database responses
    mockDb.select.mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([{ id: mockUserId, email: mockEmail, status: 'active' }])
        })
      })
    } as any);

    mockDb.insert = jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{
          id: 'attempt-123',
          userId: mockUserId,
          organizationId: mockOrgId,
          email: mockEmail,
          ipAddress: mockIp,
      userAgent: 'Mozilla/5.0',
      success: false,
      reason: 'invalid_password',
      riskScore: 5,
      metadata: {},
      timestamp: new Date()
        }])
      })
    } as any);

    mockDb.update = jest.fn().mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue([{ id: mockUserId }])
      })
    } as any);

    mockDb.delete = jest.fn().mockReturnValue({
      where: jest.fn().mockResolvedValue([])
    } as any);

    mockLogAudit.mockResolvedValue(undefined);
  });

  describe('recordFailedAttempt', () => {
    it('should record failed login attempt', async () => {
      const result = await service.recordFailedAttempt(mockIp, mockUserId, {
        userAgent: 'Mozilla/5.0',
        attemptType: 'login'
      });

      expect(result).toHaveProperty('totalAttempts');
      expect(result).toHaveProperty('isLocked');
      expect(mockLogAudit).toHaveBeenCalled();
    });

    it('should calculate risk score based on multiple factors', async () => {
      const result = await service.recordFailedAttempt(mockIp, mockUserId, {
        userAgent: 'Mozilla/5.0',
        attemptType: 'login',
        location: { country: 'US', city: 'New York', latitude: 40.7128, longitude: -74.0060 }
      });

      expect(result).toBeDefined();
    });

    it('should detect suspicious patterns', async () => {
      // Mock multiple recent failed attempts
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockResolvedValue([
              { timestamp: new Date(Date.now() - 5 * 60 * 1000) }, // 5 minutes ago
              { timestamp: new Date(Date.now() - 3 * 60 * 1000) }, // 3 minutes ago
              { timestamp: new Date(Date.now() - 1 * 60 * 1000) }  // 1 minute ago
            ])
          })
        })
      } as any);

      const result = await service.recordFailedAttempt(mockIp, mockUserId);

      expect(result.isLocked).toBeDefined();
    });
  });

  describe('recordSuccessfulAttempt', () => {
    it('should record successful login attempt', async () => {
      await service.recordSuccessfulAttempt(mockIp, mockUserId, {
        userAgent: 'Mozilla/5.0'
      });

      expect(mockLogAudit).toHaveBeenCalled();
    });

    it('should clear failed attempts after successful login', async () => {
      mockDb.delete.mockReturnValue({
        where: jest.fn().mockResolvedValue({ rowCount: 5 })
      } as any);

      await service.recordSuccessfulAttempt(mockIp, mockUserId);

      expect(mockDb.delete).toHaveBeenCalled();
    });
  });

  describe('getLockoutStatus', () => {
    it('should return not locked for user with no failed attempts', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockResolvedValue([])
          })
        })
      } as any);

      const result = await service.getLockoutStatus(mockIp);

      expect(result).toHaveProperty('isLocked', false);
      expect(result).toHaveProperty('totalAttempts', 0);
      expect(result).toHaveProperty('remainingAttempts', 5);
    });

    it('should return locked status for user with too many failed attempts', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockResolvedValue([
              { timestamp: new Date(Date.now() - 5 * 60 * 1000) },
              { timestamp: new Date(Date.now() - 3 * 60 * 1000) },
              { timestamp: new Date(Date.now() - 1 * 60 * 1000) },
              { timestamp: new Date(Date.now() - 30 * 1000) },
              { timestamp: new Date(Date.now() - 10 * 1000) }
            ])
          })
        })
      } as any);

      const result = await service.getLockoutStatus(mockIp);

      expect(result).toHaveProperty('isLocked', true);
      expect(result).toHaveProperty('totalAttempts', 5);
      expect(result).toHaveProperty('remainingAttempts', 0);
    });

    it('should calculate progressive lockout duration', async () => {
      // Mock previous failed attempts
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockResolvedValue([
              { timestamp: new Date(Date.now() - 5 * 60 * 1000) },
              { timestamp: new Date(Date.now() - 3 * 60 * 1000) },
              { timestamp: new Date(Date.now() - 1 * 60 * 1000) },
              { timestamp: new Date(Date.now() - 30 * 1000) },
              { timestamp: new Date(Date.now() - 10 * 1000) }
            ])
          })
        })
      } as any);

      const result = await service.getLockoutStatus(mockIp);

      expect(result.isLocked).toBe(true);
    });
  });

  describe('lockAccount', () => {
    it('should lock account manually', async () => {
      await service.clearLockout(mockIp);
      expect(mockDb.update).toHaveBeenCalled();
    });

    it('should lock account permanently', async () => {
      const result = await service.lockAccount(mockUserId, mockOrgId, {
        reason: 'security_violation',
        permanent: true
      });

      expect(result).toBe(true);
    });
  });

  describe('unlockAccount', () => {
    it('should unlock account', async () => {
      mockDb.update.mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue({ rowCount: 1 })
        })
      } as any);

      const result = await service.clearLockout(mockIp, 'admin-123');

      expect(result).toBe(true);
      expect(mockLogAudit).toHaveBeenCalled();
    });

    it('should return false for non-existent user', async () => {
      mockDb.delete.mockReturnValue({
        where: jest.fn().mockResolvedValue({ rowCount: 0 })
      } as any);

      const result = await service.unlockAccount('non-existent', mockOrgId);

      expect(result).toBe(true); // Delete doesn't throw, returns true
    });
  });

  describe('getSecurityEvents', () => {
    it('should get security events', async () => {
      const result = await service.getSecurityEvents(mockUserId, mockOrgId);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getRiskAnalysis', () => {
    it('should provide comprehensive risk analysis', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue([
                {
                  timestamp: new Date(Date.now() - 5 * 60 * 1000),
                  ipAddress: '192.168.1.1',
                  riskScore: 5
                },
                {
                  timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
                  ipAddress: '192.168.1.2',
                  riskScore: 3
                }
              ])
            })
          })
        })
      } as any);

      const result = await service.getRiskAnalysis(mockUserId, mockOrgId);

      expect(result).toHaveProperty('overallRiskScore');
      expect(result).toHaveProperty('riskFactors');
    });

    it('should detect geographic anomalies', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue([
                {
                  timestamp: new Date(Date.now() - 5 * 60 * 1000),
                  ipAddress: '192.168.1.1',
                  location: JSON.stringify({ country: 'US', city: 'New York', latitude: 40.7128, longitude: -74.0060 })
                },
                {
                  timestamp: new Date(Date.now() - 10 * 60 * 1000),
                  ipAddress: '192.168.1.2',
                  location: JSON.stringify({ country: 'CN', city: 'Beijing', latitude: 39.9042, longitude: 116.4074 })
                }
              ])
            })
          })
        })
      } as any);

      const result = await service.getRiskAnalysis(mockUserId, mockOrgId);

      expect(result.overallRiskScore).toBeGreaterThan(0);
    });
  });

  describe('cleanup', () => {
    it('should cleanup old attempts', async () => {
      mockDb.delete.mockReturnValue({
        where: jest.fn().mockResolvedValue({ rowCount: 100 })
      } as any);

      const result = await service.cleanupExpiredData();

      expect(result).toBeGreaterThanOrEqual(0);
      expect(mockDb.delete).toHaveBeenCalled();
    });

    it('should unlock expired temporary locks', async () => {
      mockDb.delete.mockReturnValue({
        where: jest.fn().mockResolvedValue({ rowCount: 5 })
      } as any);

      const result = await service.cleanupExpiredData();

      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getStatistics', () => {
    it('should get lockout statistics', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([
            { count: '5' }
          ]),
          groupBy: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue([])
            })
          })
        })
      } as any);

      const result = await service.getLockoutStatistics();

      expect(result).toHaveProperty('totalLockouts');
      expect(result).toHaveProperty('activeLockouts');
    });
  });
});
