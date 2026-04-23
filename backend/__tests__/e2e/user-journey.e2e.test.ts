import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import app from '../../hono';

/**
 * End-to-End (E2E) Tests
 * Tests complete user workflows from registration through platform operations
 */

describe('E2E: Complete User Journey', () => {
  let authToken: string;
  let userId: string;
  let csrfToken: string;

  beforeAll(() => {
    console.log('🚀 Starting E2E user journey tests');
  });

  afterAll(() => {
    console.log('✅ E2E tests completed');
  });

  describe('E2E: User Signup and Onboarding', () => {
    it('should complete full signup flow', async () => {
      const email = `e2e-user-${Date.now()}@example.com`;
      const password = 'E2ETestPassword123!';

      // Step 1: Register
      console.log('  Step 1: User registration');
      const registerRes = await app.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          firstName: 'E2E',
          lastName: 'User',
          companyName: 'Test Company',
          industry: 'Technology',
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(registerRes.status).toBe(201);
      const registerData = await registerRes.json();
      userId = registerData.userId;
      const verificationCode = registerData.verificationCode;

      // Step 2: Verify email
      console.log('  Step 2: Email verification');
      const verifyRes = await app.request('/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ userId, verificationCode }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(verifyRes.status).toBe(200);

      // Step 3: Login
      console.log('  Step 3: User login');
      const loginRes = await app.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(loginRes.status).toBe(200);
      const loginData = await loginRes.json();
      authToken = loginData.token;

      // Step 4: Get CSRF token
      console.log('  Step 4: Get CSRF token');
      const csrfRes = await app.request('/csrf-token', {
        method: 'POST',
        headers: { 'x-session-id': userId },
      });

      const csrfData = await csrfRes.json();
      csrfToken = csrfData.csrfToken;

      // Step 5: Setup user profile
      console.log('  Step 5: Setup user profile');
      const profileRes = await app.request('/api/trpc/user.updateProfile', {
        method: 'POST',
        body: JSON.stringify({
          firstName: 'E2E',
          lastName: 'User',
          profileImage: 'https://example.com/avatar.jpg',
          timezone: 'America/New_York',
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'x-csrf-token': csrfToken,
        },
      });

      expect(profileRes.status).toBe(200);

      // Step 6: Enable 2FA
      console.log('  Step 6: Enable 2FA');
      const twoFARes = await app.request('/api/trpc/security.enable2FA', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'x-csrf-token': csrfToken,
        },
      });

      expect(twoFARes.status).toBe(200);
      const twoFAData = await twoFARes.json();
      expect(twoFAData).toHaveProperty('qrCode');
      expect(twoFAData).toHaveProperty('backupCodes');

      console.log('✅ Full signup flow completed successfully');
    });
  });

  describe('E2E: Platform Connection', () => {
    it('should connect and sync WhatsApp platform', async () => {
      // Step 1: Initiate QR code connection
      console.log('  Step 1: Initiate WhatsApp QR connection');
      const qrRes = await app.request('/api/trpc/platforms.connectQR', {
        method: 'POST',
        body: JSON.stringify({ platformName: 'whatsapp' }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'x-csrf-token': csrfToken,
        },
      });

      expect(qrRes.status).toBe(200);
      const qrData = await qrRes.json();
      expect(qrData).toHaveProperty('qrCode');
      expect(qrData).toHaveProperty('connectionId');

      // Step 2: Verify QR connection
      console.log('  Step 2: Verify QR connection');
      const verifyRes = await app.request('/api/trpc/platforms.verifyQR', {
        method: 'POST',
        body: JSON.stringify({
          connectionId: qrData.connectionId,
          verificationCode: 'MOCK_VERIFICATION', // Mock for testing
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'x-csrf-token': csrfToken,
        },
      });

      expect(verifyRes.status).toBe(200);

      // Step 3: Sync platform data
      console.log('  Step 3: Sync platform data');
      const syncRes = await app.request('/api/trpc/platforms.sync', {
        method: 'POST',
        body: JSON.stringify({ platformName: 'whatsapp' }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'x-csrf-token': csrfToken,
        },
      });

      expect(syncRes.status).toBe(200);
      const syncData = await syncRes.json();
      expect(syncData).toHaveProperty('syncStatus');
      expect(syncData).toHaveProperty('lastSync');

      console.log('✅ WhatsApp connection completed successfully');
    });

    it('should connect multiple platforms (OAuth flow)', async () => {
      const platforms = ['instagram', 'facebook', 'telegram'];

      for (const platform of platforms) {
        console.log(`  Connecting ${platform}...`);

        // OAuth redirect
        const oauthRes = await app.request('/api/trpc/platforms.connectOAuth', {
          method: 'POST',
          body: JSON.stringify({
            platformName: platform,
            redirectUri: 'https://app.example.com/callback',
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'x-csrf-token': csrfToken,
          },
        });

        expect(oauthRes.status).toBe(200);
        const oauthData = await oauthRes.json();
        expect(oauthData).toHaveProperty('authUrl');
      }

      console.log('✅ Multi-platform OAuth flow completed');
    });
  });

  describe('E2E: AI Agent Configuration', () => {
    it('should setup and configure AI receptionist', async () => {
      // Step 1: Get receptionist config template
      console.log('  Step 1: Load receptionist template');
      const templateRes = await app.request('/api/trpc/ai-assistant.getReceptionistConfig', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect(templateRes.status).toBe(200);

      // Step 2: Save custom configuration
      console.log('  Step 2: Save custom configuration');
      const configRes = await app.request('/api/trpc/ai-assistant.saveReceptionistConfig', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Main Receptionist',
          voiceLanguage: 'en-US',
          tone: 'professional',
          systemPrompt: 'You are a helpful receptionist...',
          maxWaitTime: 300,
          transferPhoneNumber: '+1-555-0123',
          businessHours: {
            monday: { start: '09:00', end: '17:00' },
            tuesday: { start: '09:00', end: '17:00' },
            wednesday: { start: '09:00', end: '17:00' },
            thursday: { start: '09:00', end: '17:00' },
            friday: { start: '09:00', end: '17:00' },
          },
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'x-csrf-token': csrfToken,
        },
      });

      expect(configRes.status).toBe(200);
      const configData = await configRes.json();
      expect(configData).toHaveProperty('receptionistId');
      expect(configData).toHaveProperty('createdAt');

      console.log('✅ AI receptionist configured successfully');
    });
  });

  describe('E2E: Analytics and Monitoring', () => {
    it('should retrieve analytics data through complete flow', async () => {
      // Step 1: Get dashboard metrics
      console.log('  Step 1: Fetch dashboard metrics');
      const metricsRes = await app.request('/api/trpc/analytics.getMetrics', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect(metricsRes.status).toBe(200);
      const metrics = await metricsRes.json();
      expect(metrics).toHaveProperty('totalCalls');
      expect(metrics).toHaveProperty('totalMessages');
      expect(metrics).toHaveProperty('averageResponseTime');

      // Step 2: Get detailed usage report
      console.log('  Step 2: Fetch usage report');
      const reportRes = await app.request('/api/trpc/analytics.getUsageReport', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect(reportRes.status).toBe(200);
      const report = await reportRes.json();
      expect(report).toHaveProperty('period');
      expect(report).toHaveProperty('usage');

      // Step 3: Export analytics
      console.log('  Step 3: Export analytics');
      const exportRes = await app.request('/api/trpc/analytics.export', {
        method: 'POST',
        body: JSON.stringify({
          format: 'csv',
          dateRange: { start: Date.now() - 30 * 24 * 60 * 60 * 1000, end: Date.now() },
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'x-csrf-token': csrfToken,
        },
      });

      expect(exportRes.status).toBe(200);

      console.log('✅ Analytics flow completed successfully');
    });
  });

  describe('E2E: Security and Privacy', () => {
    it('should manage privacy settings and data export', async () => {
      // Step 1: Get privacy settings
      console.log('  Step 1: Fetch privacy settings');
      const settingsRes = await app.request('/api/trpc/privacy.getSettings', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect(settingsRes.status).toBe(200);

      // Step 2: Update privacy preferences
      console.log('  Step 2: Update privacy preferences');
      const updateRes = await app.request('/api/trpc/privacy.updateSettings', {
        method: 'POST',
        body: JSON.stringify({
          dataRetention: 90,
          allowAnalytics: false,
          allowMarketing: false,
          allowThirdPartySharing: false,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'x-csrf-token': csrfToken,
        },
      });

      expect(updateRes.status).toBe(200);

      // Step 3: Export personal data
      console.log('  Step 3: Export personal data (GDPR)');
      const exportRes = await app.request('/api/trpc/privacy.exportData', {
        method: 'POST',
        body: JSON.stringify({ format: 'json' }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'x-csrf-token': csrfToken,
        },
      });

      expect(exportRes.status).toBe(200);
      const exportData = await exportRes.json();
      expect(exportData).toHaveProperty('exportId');
      expect(exportData).toHaveProperty('downloadUrl');

      // Step 4: View audit logs
      console.log('  Step 4: View audit logs');
      const auditRes = await app.request('/api/trpc/privacy.getAccessLogs', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect(auditRes.status).toBe(200);
      const auditData = await auditRes.json();
      expect(Array.isArray(auditData.logs)).toBe(true);

      console.log('✅ Privacy and security flow completed successfully');
    });
  });

  describe('E2E: Error Handling and Recovery', () => {
    it('should handle network errors gracefully', async () => {
      console.log('  Testing network error resilience');

      // Make multiple concurrent requests to test resilience
      const requests = Array(10).fill(null).map(() =>
        app.request('/api/trpc/analytics.getMetrics', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${authToken}` },
        })
      );

      const results = await Promise.allSettled(requests);
      const successful = results.filter(r => r.status === 'fulfilled' && r.value.status === 200).length;

      // At least 90% should succeed
      expect(successful / results.length).toBeGreaterThan(0.9);

      console.log(`✅ ${successful}/${results.length} concurrent requests succeeded`);
    });

    it('should enforce rate limits across E2E flows', async () => {
      console.log('  Testing rate limit enforcement');

      let rateLimitHit = false;

      // Make rapid requests
      for (let i = 0; i < 150; i++) {
        const res = await app.request('/api/trpc/analytics.getMetrics', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${authToken}` },
        });

        if (res.status === 429) {
          rateLimitHit = true;
          break;
        }
      }

      expect(rateLimitHit).toBe(true);
      console.log('✅ Rate limiting triggered as expected');
    });
  });

  describe('E2E: Session Management', () => {
    it('should manage session lifecycle', async () => {
      // Step 1: Create session
      console.log('  Step 1: Create session');
      expect(authToken).toBeDefined();

      // Step 2: Use session across multiple requests
      console.log('  Step 2: Make multiple authenticated requests');
      for (let i = 0; i < 5; i++) {
        const res = await app.request('/api/trpc/user.me', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${authToken}` },
        });
        expect(res.status).toBe(200);
      }

      // Step 3: Logout and invalidate session
      console.log('  Step 3: Logout');
      const logoutRes = await app.request('/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect(logoutRes.status).toBe(200);

      // Step 4: Verify token is no longer valid
      console.log('  Step 4: Verify session is invalid');
      const invalidRes = await app.request('/api/trpc/user.me', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect(invalidRes.status).toBe(401);

      console.log('✅ Session lifecycle completed successfully');
    });
  });
});
