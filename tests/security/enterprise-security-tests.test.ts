import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import request from 'supertest';
import { app } from '../../backend/server';
import { db } from '../../backend/db/connection';
import { encrypt, decrypt, hashData } from '../../backend/lib/encryption';
import { logAudit } from '../../backend/lib/audit';

describe('Enterprise Security Tests', () => {
  let authToken: string;
  let organizationId: string;
  let adminUserId: string;

  beforeEach(async () => {
    // Create test organization with enterprise security settings
    const orgResult = await db.insert({
      name: 'Enterprise Security Test Org',
      domain: 'enterprise-test.com',
      settings: {
        securityLevel: 'enterprise',
        mfaRequired: true,
        sessionTimeout: 30, // minutes
        passwordPolicy: {
          minLength: 12,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: true,
          maxAge: 90, // days
        },
        ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
        auditRetention: 2555, // 7 years in days
      },
    }).returning();
    organizationId = orgResult[0].id;

    // Create admin user
    const adminResult = await db.insert({
      email: 'admin@enterprise-test.com',
      name: 'Enterprise Admin',
      organizationId,
      role: 'admin',
      status: 'active',
    }).returning();
    adminUserId = adminResult[0].id;

    // Get auth token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@enterprise-test.com',
        password: 'EnterpriseAdmin123!',
      });

    authToken = loginResponse.body.token;
  });

  describe('Advanced Authentication Security', () => {
    it('should enforce enterprise password policies', async () => {
      const weakPasswords = [
        'password',           // Too common
        '12345678',           // Only numbers
        'abcdefgh',           // Only letters
        'Abc123',             // Too short
        'Password123',        // No special chars
        'PASSWORD123!',       // No lowercase
        'password123!',       // No uppercase
      ];

      for (const password of weakPasswords) {
        const response = await request(app)
          .post('/api/users/register')
          .send({
            email: `test${Date.now()}@enterprise-test.com`,
            name: 'Test User',
            password,
            organizationId,
          });

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('password policy');
      }

      // Test strong password acceptance
      const strongPassword = 'Str0ng!P@ssw0rd#2024';
      const strongResponse = await request(app)
        .post('/api/users/register')
        .send({
          email: `strong${Date.now()}@enterprise-test.com`,
          name: 'Strong User',
          password: strongPassword,
          organizationId,
        });

      expect(strongResponse.status).toBe(201);
    });

    it('should implement adaptive authentication based on risk', async () => {
      // Normal login from trusted IP
      const normalLoginResponse = await request(app)
        .post('/api/auth/login')
        .set('X-Forwarded-For', '192.168.1.100') // Trusted IP
        .send({
          email: 'admin@enterprise-test.com',
          password: 'EnterpriseAdmin123!',
        });

      expect(normalLoginResponse.status).toBe(200);
      expect(normalLoginResponse.body.requireMfa).toBe(false);

      // Login from untrusted IP (should require additional verification)
      const riskyLoginResponse = await request(app)
        .post('/api/auth/login')
        .set('X-Forwarded-For', '203.0.113.1') // Untrusted IP
        .send({
          email: 'admin@enterprise-test.com',
          password: 'EnterpriseAdmin123!',
        });

      expect(riskyLoginResponse.status).toBe(200);
      expect(riskyLoginResponse.body.requireMfa).toBe(true);
      expect(riskyLoginResponse.body.riskScore).toBeGreaterThan(0.5);
    });

    it('should detect and prevent credential stuffing attacks', async () => {
      const commonCredentials = [
        { email: 'admin@enterprise-test.com', password: 'admin123' },
        { email: 'admin@enterprise-test.com', password: 'password' },
        { email: 'admin@enterprise-test.com', password: '123456' },
        { email: 'admin@enterprise-test.com', password: 'qwerty' },
        { email: 'admin@enterprise-test.com', password: 'letmein' },
      ];

      let blockedCount = 0;
      for (const creds of commonCredentials) {
        const response = await request(app)
          .post('/api/auth/login')
          .send(creds);

        if (response.status === 429) { // Too Many Requests
          blockedCount++;
        }
      }

      // Should detect and block credential stuffing attempts
      expect(blockedCount).toBeGreaterThan(0);
    });
  });

  describe('Data Protection and Encryption', () => {
    it('should encrypt sensitive data at rest', async () => {
      const sensitiveData = {
        ssn: '123-45-6789',
        creditCard: '4532-1234-5678-9012',
        bankAccount: '987654321',
        medicalRecord: 'MRN-001234567',
      };

      // Store sensitive data
      const storeResponse = await request(app)
        .post('/api/data/sensitive')
        .set('Authorization', `Bearer ${authToken}`)
        .send(sensitiveData);

      expect(storeResponse.status).toBe(201);

      // Verify data is encrypted in database
      const dbRecord = await db.select()
        .from('sensitive_data')
        .where(eq('userId', adminUserId))
        .limit(1);

      expect(dbRecord[0].encrypted_ssn).not.toBe(sensitiveData.ssn);
      expect(dbRecord[0].encrypted_credit_card).not.toBe(sensitiveData.creditCard);

      // Verify decryption works correctly
      const retrieveResponse = await request(app)
        .get(`/api/data/sensitive/${storeResponse.body.data.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(retrieveResponse.status).toBe(200);
      expect(retrieveResponse.body.data.ssn).toBe(sensitiveData.ssn);
      expect(retrieveResponse.body.data.creditCard).toBe(sensitiveData.creditCard);
    });

    it('should implement field-level encryption for PII', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john.doe@enterprise-test.com',
        phone: '+1-555-0123',
        address: '123 Main St, Anytown, USA',
        dateOfBirth: '1980-01-01',
        ssn: '111-22-3333',
      };

      // Store user profile with PII
      const profileResponse = await request(app)
        .post('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send(userData);

      expect(profileResponse.status).toBe(200);

      // Verify PII fields are encrypted
      const encryptedProfile = await db.select()
        .from('user_profiles')
        .where(eq('userId', adminUserId))
        .limit(1);

      // Non-PII fields should be readable
      expect(encryptedProfile[0].name).toBe(userData.name);
      
      // PII fields should be encrypted
      expect(encryptedProfile[0].encrypted_phone).not.toBe(userData.phone);
      expect(encryptedProfile[0].encrypted_ssn).not.toBe(userData.ssn);
    });

    it('should handle encryption key rotation', async () => {
      // Create data with old encryption key
      const oldKeyData = { secret: 'confidential-data-v1' };
      
      const createResponse = await request(app)
        .post('/api/data/encrypted')
        .set('Authorization', `Bearer ${authToken}`)
        .send(oldKeyData);

      expect(createResponse.status).toBe(201);

      // Simulate key rotation
      const rotateResponse = await request(app)
        .post('/api/security/rotate-keys')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          keyId: 'new-key-2024',
          reencrypt: true,
        });

      expect(rotateResponse.status).toBe(200);
      expect(rotateResponse.body.data.rotated).toBe(true);

      // Verify data can still be accessed with new key
      const accessResponse = await request(app)
        .get(`/api/data/encrypted/${createResponse.body.data.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(accessResponse.status).toBe(200);
      expect(accessResponse.body.data.secret).toBe(oldKeyData.secret);
    });
  });

  describe('Network and Infrastructure Security', () => {
    it('should enforce IP whitelisting for enterprise access', async () => {
      // Access from whitelisted IP
      const whitelistResponse = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Forwarded-For', '192.168.1.100'); // Whitelisted IP

      expect(whitelistResponse.status).toBe(200);

      // Access from non-whitelisted IP
      const blacklistResponse = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Forwarded-For', '203.0.113.1'); // Non-whitelisted IP

      expect(blacklistResponse.status).toBe(403);
      expect(blacklistResponse.body.error).toContain('IP not authorized');
    });

    it('should implement DDoS protection and rate limiting', async () => {
      const concurrentRequests = 100;
      const promises = [];

      // Send many concurrent requests
      for (let i = 0; i < concurrentRequests; i++) {
        promises.push(
          request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${authToken}`)
        );
      }

      const results = await Promise.allSettled(promises);
      const rejectedCount = results.filter(r => 
        r.status === 'rejected' || 
        (r.status === 'fulfilled' && r.value.status === 429)
      ).length;

      // Should reject or rate limit excessive requests
      expect(rejectedCount).toBeGreaterThan(concurrentRequests * 0.1); // At least 10% rejected
    });

    it('should enforce secure headers and CSP', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);

      // Check security headers
      expect(response.headers['x-frame-options']).toBe('DENY');
      expect(response.headers['x-content-type-options']).toBe('nosniff');
      expect(response.headers['x-xss-protection']).toBe('1; mode=block');
      expect(response.headers['strict-transport-security']).toContain('max-age');
      expect(response.headers['content-security-policy']).toBeDefined();
    });
  });

  describe('Advanced Threat Detection', () => {
    it('should detect anomalous user behavior patterns', async () => {
      // Simulate unusual login patterns
      const unusualLocations = [
        '203.0.113.1', // USA
        '198.51.100.1', // Europe
        '192.0.2.1', // Asia
      ];

      for (const location of unusualLocations) {
        await request(app)
          .post('/api/auth/login')
          .set('X-Forwarded-For', location)
          .send({
            email: 'admin@enterprise-test.com',
            password: 'EnterpriseAdmin123!',
          });
      }

      // Check security alerts
      const alertsResponse = await request(app)
        .get('/api/security/alerts')
        .set('Authorization', `Bearer ${authToken}`);

      expect(alertsResponse.status).toBe(200);
      expect(alertsResponse.body.data.length).toBeGreaterThan(0);

      const suspiciousActivity = alertsResponse.body.data.find(
        alert => alert.type === 'unusual_location_pattern'
      );
      expect(suspiciousActivity).toBeDefined();
      expect(suspiciousActivity.severity).toBe('high');
    });

    it('should detect data exfiltration attempts', async () => {
      // Simulate large data export
      const exportResponse = await request(app)
        .post('/api/data/export')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          format: 'csv',
          includeAll: true,
          fields: ['ssn', 'credit_card', 'bank_account'], // Sensitive fields
        });

      expect(exportResponse.status).toBe(403);
      expect(exportResponse.body.error).toContain('data export policy');

      // Check security alerts for exfiltration attempt
      const alertsResponse = await request(app)
        .get('/api/security/alerts')
        .set('Authorization', `Bearer ${authToken}`);

      const exfiltrationAlert = alertsResponse.body.data.find(
        alert => alert.type === 'data_exfiltration_attempt'
      );
      expect(exfiltrationAlert).toBeDefined();
      expect(exfiltrationAlert.severity).toBe('critical');
    });

    it('should detect privilege escalation attempts', async () => {
      // Create regular user
      const userResponse = await request(app)
        .post('/api/users/register')
        .send({
          email: 'regular@enterprise-test.com',
          name: 'Regular User',
          password: 'RegularUser123!',
          organizationId,
        });

      const userToken = userResponse.body.token;

      // Attempt to access admin functions
      const adminAccessResponse = await request(app)
        .post('/api/users/register')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          email: 'fake-admin@enterprise-test.com',
          name: 'Fake Admin',
          password: 'FakeAdmin123!',
          role: 'admin', // Attempt to create admin user
        });

      expect(adminAccessResponse.status).toBe(403);

      // Check security alerts
      const alertsResponse = await request(app)
        .get('/api/security/alerts')
        .set('Authorization', `Bearer ${authToken}`);

      const escalationAlert = alertsResponse.body.data.find(
        alert => alert.type === 'privilege_escalation_attempt'
      );
      expect(escalationAlert).toBeDefined();
      expect(escalationAlert.severity).toBe('high');
    });
  });

  describe('Compliance and Audit', () => {
    it('should maintain comprehensive audit trails', async () => {
      // Perform various actions
      await request(app)
        .post('/api/users/register')
        .send({
          email: 'audit@enterprise-test.com',
          name: 'Audit User',
          password: 'AuditUser123!',
          organizationId,
        });

      await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Audit Test Project' });

      await request(app)
        .put(`/api/users/${adminUserId}/profile`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Updated Admin Name' });

      // Check audit trail
      const auditResponse = await request(app)
        .get('/api/audit/trail')
        .set('Authorization', `Bearer ${authToken}`)
        .query({
          startDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
          endDate: new Date(),
        });

      expect(auditResponse.status).toBe(200);
      expect(auditResponse.body.data.length).toBeGreaterThan(0);

      const auditEntries = auditResponse.body.data;
      expect(auditEntries.some(e => e.action === 'user.create')).toBe(true);
      expect(auditEntries.some(e => e.action === 'project.create')).toBe(true);
      expect(auditEntries.some(e => e.action === 'user.update')).toBe(true);

      // Verify audit entry structure
      const auditEntry = auditEntries[0];
      expect(auditEntry).toHaveProperty('timestamp');
      expect(auditEntry).toHaveProperty('userId');
      expect(auditEntry).toHaveProperty('action');
      expect(auditEntry).toHaveProperty('resource');
      expect(auditEntry).toHaveProperty('ipAddress');
      expect(auditEntry).toHaveProperty('userAgent');
    });

    it('should generate compliance reports', async () => {
      // Generate SOX compliance report
      const soxResponse = await request(app)
        .post('/api/compliance/reports')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          type: 'SOX',
          dateRange: {
            start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
            end: new Date(),
          },
          includeViolations: true,
        });

      expect(soxResponse.status).toBe(200);
      expect(soxResponse.body.data.type).toBe('SOX');
      expect(soxResponse.body.data.complianceScore).toBeGreaterThanOrEqual(0);
      expect(soxResponse.body.data.violations).toBeInstanceOf(Array);

      // Generate GDPR compliance report
      const gdprResponse = await request(app)
        .post('/api/compliance/reports')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          type: 'GDPR',
          dateRange: {
            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            end: new Date(),
          },
        });

      expect(gdprResponse.status).toBe(200);
      expect(gdprResponse.body.data.type).toBe('GDPR');
      expect(gdprResponse.body.data.dataRetentionCompliance).toBeDefined();
    });

    it('should handle data subject requests (GDPR)', async () => {
      // Create user with personal data
      const userResponse = await request(app)
        .post('/api/users/register')
        .send({
          email: 'gdpr@enterprise-test.com',
          name: 'GDPR User',
          password: 'GDPRUser123!',
          organizationId,
          personalData: {
            phone: '+1-555-0123',
            address: '123 Privacy St',
            dateOfBirth: '1990-01-01',
          },
        });

      const userId = userResponse.body.data.id;

      // Submit data access request
      const accessRequestResponse = await request(app)
        .post(`/api/users/${userId}/gdpr/access-request`)
        .send({
          type: 'data_access',
          reason: 'Exercise my right to access',
        });

      expect(accessRequestResponse.status).toBe(200);
      expect(accessRequestResponse.body.data.requestId).toBeDefined();

      // Process data access request
      const processResponse = await request(app)
        .post(`/api/gdpr/requests/${accessRequestResponse.body.data.requestId}/process`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ approved: true });

      expect(processResponse.status).toBe(200);
      expect(processResponse.body.data.exportUrl).toBeDefined();

      // Submit data deletion request
      const deletionRequestResponse = await request(app)
        .post(`/api/users/${userId}/gdpr/deletion-request`)
        .send({
          type: 'data_deletion',
          reason: 'Exercise my right to be forgotten',
        });

      expect(deletionRequestResponse.status).toBe(200);
    });
  });

  describe('Incident Response', () => {
    it('should handle security incident workflow', async () => {
      // Create security incident
      const incidentResponse = await request(app)
        .post('/api/security/incidents')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          type: 'data_breach',
          severity: 'high',
          description: 'Suspicious data access detected',
          affectedSystems: ['user_database', 'auth_service'],
          initialAssessment: 'Potential unauthorized access to user data',
        });

      expect(incidentResponse.status).toBe(201);
      const incidentId = incidentResponse.body.data.id;

      // Update incident status
      const updateResponse = await request(app)
        .put(`/api/security/incidents/${incidentId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          status: 'investigating',
          assignedTo: 'security-team',
          priority: 'high',
          actions: ['Isolate affected systems', 'Review access logs'],
        });

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.data.status).toBe('investigating');

      // Add incident evidence
      const evidenceResponse = await request(app)
        .post(`/api/security/incidents/${incidentId}/evidence`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          type: 'log_file',
          description: 'Authentication logs showing suspicious activity',
          content: 'base64-encoded-log-content',
          timestamp: new Date(),
        });

      expect(evidenceResponse.status).toBe(201);

      // Close incident
      const closeResponse = await request(app)
        .patch(`/api/security/incidents/${incidentId}/close`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          resolution: 'False positive - no actual breach occurred',
          lessonsLearned: 'Improve anomaly detection thresholds',
          preventiveActions: ['Update detection rules', 'Additional monitoring'],
        });

      expect(closeResponse.status).toBe(200);
      expect(closeResponse.body.data.status).toBe('resolved');
    });

    it('should trigger automated containment procedures', async () => {
      // Simulate critical security event
      const criticalEventResponse = await request(app)
        .post('/api/security/events/critical')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          event: 'ransomware_detection',
          source: 'endpoint-protection',
          affectedHosts: ['server-01', 'server-02'],
          immediateAction: true,
        });

      expect(criticalEventResponse.status).toBe(202); // Accepted for processing

      // Verify containment actions were triggered
      const actionsResponse = await request(app)
        .get('/api/security/containment-actions')
        .set('Authorization', `Bearer ${authToken}`);

      expect(actionsResponse.status).toBe(200);
      expect(actionsResponse.body.data.length).toBeGreaterThan(0);

      const containmentActions = actionsResponse.body.data;
      expect(containmentActions.some(a => a.type === 'isolate_hosts')).toBe(true);
      expect(containmentActions.some(a => a.type === 'disable_accounts')).toBe(true);
      expect(containmentActions.some(a => a.type === 'backup_critical_data')).toBe(true);
    });
  });

  describe('Security Monitoring and Analytics', () => {
    it('should provide real-time security dashboard', async () => {
      const dashboardResponse = await request(app)
        .get('/api/security/dashboard')
        .set('Authorization', `Bearer ${authToken}`);

      expect(dashboardResponse.status).toBe(200);
      expect(dashboardResponse.body.data).toHaveProperty('threatLevel');
      expect(dashboardResponse.body.data).toHaveProperty('activeIncidents');
      expect(dashboardResponse.body.data).toHaveProperty('recentAlerts');
      expect(dashboardResponse.body.data).toHaveProperty('securityScore');
      expect(dashboardResponse.body.data).toHaveProperty('complianceStatus');
    });

    it('should generate security analytics reports', async () => {
      const analyticsResponse = await request(app)
        .get('/api/security/analytics')
        .set('Authorization', `Bearer ${authToken}`)
        .query({
          dateRange: '30d',
          metrics: ['threat_trends', 'vulnerability_scan', 'compliance_gaps', 'incident_response'],
        });

      expect(analyticsResponse.status).toBe(200);
      expect(analyticsResponse.body.data).toHaveProperty('threatTrends');
      expect(analyticsResponse.body.data).toHaveProperty('vulnerabilityScan');
      expect(analyticsResponse.body.data).toHaveProperty('complianceGaps');
      expect(analyticsResponse.body.data).toHaveProperty('incidentResponse');
    });
  });
});
