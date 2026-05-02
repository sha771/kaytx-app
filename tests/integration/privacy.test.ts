import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { setupTestApp, cleanupTestApp } from '../setup/test-setup';
import { createTestUser, createTestOrganization } from '../setup/test-helpers';

describe('Privacy Features Integration Tests', () => {
  let testOrg: any;
  let testUser: any;
  let authToken: string;

  beforeAll(async () => {
    await setupTestApp();
    testOrg = await createTestOrganization();
    testUser = await createTestUser({ organizationId: testOrg.id, role: 'user' });
    authToken = `Bearer ${testUser.sessionToken}`;
  });

  afterAll(async () => {
    await cleanupTestApp();
  });

  describe('Consent Management', () => {
    it('should create consent records', async () => {
      const consentData = {
        consentType: 'marketing_emails',
        granted: true,
        version: '1.0.0'
      };

      const response = await fetch('http://localhost:3000/api/trpc/privacy.updateConsent', {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(consentData)
      });

      expect(response.ok).toBe(true);
      const result = await response.json();
      expect(result.result.data).toMatchObject({
        consentType: consentData.consentType,
        granted: consentData.granted,
        version: consentData.version
      });
    });

    it('should retrieve consent records', async () => {
      const response = await fetch('http://localhost:3000/api/trpc/privacy.getConsents', {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });

      expect(response.ok).toBe(true);
      const result = await response.json();
      expect(Array.isArray(result.result.data.consents)).toBe(true);
    });

    it('should Filter consents by type', async () => {
      const response = await fetch('http://localhost:3000/api/trpc/privacy.getConsents', {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ consentType: 'marketing_emails' })
      });

      expect(response.ok).toBe(true);
      const result = await response.json();
      expect(result.result.data.consents.every((c: any) => c.consentType === 'marketing_emails')).toBe(true);
    });
  });

  describe('Privacy Settings', () => {
    it('should get privacy settings', async () => {
      const response = await fetch('http://localhost:3000/api/trpc/privacy.getSettings', {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });

      expect(response.ok).toBe(true);
      const result = await response.json();
      expect(result.result.data).toHaveProperty('settings');
      expect(result.result.data.success).toBe(true);
    });

    it('should update privacy settings', async () => {
      const settingsData = {
        dataRetention: {
          enabled: true,
          periodDays: 365
        },
        communications: {
          email: true,
          sms: false
        }
      };

      const response = await fetch('http://localhost:3000/api/trpc/privacy.updateSettings', {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settingsData)
      });

      expect(response.ok).toBe(true);
      const result = await response.json();
      expect(result.result.data.success).toBe(true);
    });
  });

  describe('Data Export', () => {
    it('should export user data', async () => {
      const response = await fetch('http://localhost:3000/api/trpc/privacy.exportData', {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });

      expect(response.ok).toBe(true);
      const result = await response.json();
      expect(result.result.data).toHaveProperty('exportId');
      expect(result.result.data).toHaveProperty('status');
    });
  });

  describe('Breach Check', () => {
    it('should check for data breaches', async () => {
      const response = await fetch('http://localhost:3000/api/trpc/privacy.breachCheck', {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });

      expect(response.ok).toBe(true);
      const result = await response.json();
      expect(result.result.data).toHaveProperty('success');
      expect(result.result.data).toHaveProperty('breachesFound');
      expect(result.result.data).toHaveProperty('breaches');
      expect(Array.isArray(result.result.data.breaches)).toBe(true);
    });

    it('should check breaches for specific email', async () => {
      const response = await fetch('http://localhost:3000/api/trpc/privacy.breachCheck', {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: 'test@example.com' })
      });

      expect(response.ok).toBe(true);
      const result = await response.json();
      expect(result.result.data.success).toBe(true);
    });
  });

  describe('Access Logs', () => {
    it('should retrieve access logs', async () => {
      const response = await fetch('http://localhost:3000/api/trpc/privacy.accessLogs', {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date().toISOString()
        })
      });

      expect(response.ok).toBe(true);
      const result = await response.json();
      expect(Array.isArray(result.result.data.logs)).toBe(true);
    });
  });
});
