import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import request from 'supertest';
import { app } from '../../backend/server';
import { db } from '../../backend/db/connection';

describe('Security Tests', () => {
  let organizationId: string;
  let userId: string;
  let authToken: string;

  beforeEach(async () => {
    // Create test organization and user
    const orgResult = await db.insert({
      into: 'organizations',
      values: {
        name: 'Security Test Organization',
        domain: 'security-test.com',
        plan: 'pro',
        settings: {},
        created_at: new Date(),
        updated_at: new Date(),
      },
      returning: ['id'],
    });

    organizationId = orgResult[0].id;

    const userResult = await db.insert({
      into: 'users',
      values: {
        organization_id: organizationId,
        email: 'security@example.com',
        name: 'Security User',
        role: 'admin',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      returning: ['id'],
    });

    userId = userResult[0].id;

    // Get auth token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'security@example.com',
        password: 'testpassword',
      });

    authToken = loginResponse.body.token;
  });

  afterEach(async () => {
    // Clean up test data
    await db.delete().from('audit_trail').where('organization_id', '=', organizationId);
    await db.delete().from('users').where('id', '=', userId);
    await db.delete().from('organizations').where('id', '=', organizationId);
  });

  describe('SQL Injection Prevention', () => {
    it('should prevent SQL injection in login endpoint', async () => {
      const maliciousPayloads = [
        "'; DROP TABLE users; --",
        "' OR '1'='1",
        "admin'--",
        "' UNION SELECT * FROM users --",
        "'; INSERT INTO users (email) VALUES ('hacker@evil.com'); --",
      ];

      for (const payload of maliciousPayloads) {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            email: payload,
            password: 'anypassword',
          })
          .expect(401);

        expect(response.body).not.toHaveProperty('token');
        expect(response.body.error).toContain('Invalid');
      }
    });

    it('should prevent SQL injection in search endpoints', async () => {
      const maliciousQueries = [
        "'; DROP TABLE campaigns; --",
        "' OR '1'='1",
        "admin'--",
        "' UNION SELECT * FROM audit_trail --",
      ];

      for (const query of maliciousQueries) {
        const response = await request(app)
          .get(`/api/campaigns?search=${encodeURIComponent(query)}`)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(400);

        expect(response.body.error).toContain('Invalid');
      }
    });

    it('should prevent SQL injection in filter parameters', async () => {
      const maliciousFilters = [
        "status='; DROP TABLE users; --",
        "name' OR '1'='1",
        "id'--",
        "created_at' UNION SELECT password FROM users --",
      ];

      for (const filter of maliciousFilters) {
        const response = await request(app)
          .get(`/api/leads?filter=${encodeURIComponent(filter)}`)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(400);

        expect(response.body.error).toContain('Invalid');
      }
    });
  });

  describe('XSS Prevention', () => {
    it('should prevent XSS in user input', async () => {
      const xssPayloads = [
        '<script>alert("xss")</script>',
        'javascript:alert("xss")',
        '<img src="x" onerror="alert(\'xss\')">',
        '<svg onload="alert(\'xss\')">',
        '"><script>alert("xss")</script>',
      ];

      for (const payload of xssPayloads) {
        // Test in campaign creation
        const campaignResponse = await request(app)
          .post('/api/campaigns')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            name: payload,
            subject: payload,
            content: payload,
          })
          .expect(400);

        expect(campaignResponse.body.error).toContain('Invalid');

        // Test in lead creation
        const leadResponse = await request(app)
          .post('/api/leads')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            email: 'test@example.com',
            first_name: payload,
            last_name: payload,
            company: payload,
          })
          .expect(400);

        expect(leadResponse.body.error).toContain('Invalid');
      }
    });

    it('should sanitize HTML content in email campaigns', async () => {
      const maliciousHtml = `
        <script>alert('xss')</script>
        <img src="x" onerror="alert('xss')">
        <svg onload="alert('xss')">
        <iframe src="javascript:alert('xss')">
      `;

      const response = await request(app)
        .post('/api/campaigns')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Campaign',
          subject: 'Test Subject',
          content: maliciousHtml,
        })
        .expect(201);

      // Content should be sanitized
      expect(response.body.content).not.toContain('<script>');
      expect(response.body.content).not.toContain('onerror');
      expect(response.body.content).not.toContain('onload');
      expect(response.body.content).not.toContain('javascript:');
    });
  });

  describe('CSRF Protection', () => {
    it('should require CSRF token for state-changing requests', async () => {
      // Test without CSRF token
      const response = await request(app)
        .post('/api/campaigns')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Campaign',
          subject: 'Test Subject',
          content: 'Test content',
        })
        .expect(403); // Should be forbidden without CSRF token

      expect(response.body.error).toContain('CSRF');
    });

    it('should validate CSRF token', async () => {
      // Get CSRF token
      const csrfResponse = await request(app)
        .get('/api/csrf-token')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const csrfToken = csrfResponse.body.token;

      // Test with invalid CSRF token
      const invalidResponse = await request(app)
        .post('/api/campaigns')
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-CSRF-Token', 'invalid-token')
        .send({
          name: 'Test Campaign',
          subject: 'Test Subject',
          content: 'Test content',
        })
        .expect(403);

      expect(invalidResponse.body.error).toContain('CSRF');

      // Test with valid CSRF token
      await request(app)
        .post('/api/campaigns')
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-CSRF-Token', csrfToken)
        .send({
          name: 'Test Campaign',
          subject: 'Test Subject',
          content: 'Test content',
        })
        .expect(201);
    });
  });

  describe('Authentication and Authorization', () => {
    it('should reject requests without authentication', async () => {
      const endpoints = [
        { method: 'get', path: '/api/campaigns' },
        { method: 'post', path: '/api/campaigns' },
        { method: 'get', path: '/api/leads' },
        { method: 'post', path: '/api/leads' },
        { method: 'get', path: '/api/users' },
        { method: 'post', path: '/api/email-campaigns' },
      ];

      for (const endpoint of endpoints) {
        await request(app)[endpoint.method](endpoint.path)
          .expect(401);
      }
    });

    it('should reject requests with invalid tokens', async () => {
      const invalidTokens = [
        'invalid.token.here',
        'Bearer invalid',
        'malformed-token',
        '',
      ];

      for (const token of invalidTokens) {
        await request(app)
          .get('/api/campaigns')
          .set('Authorization', token)
          .expect(401);
      }
    });

    it('should enforce role-based access control', async () => {
      // Create user with viewer role
      const viewerUserResult = await db.insert({
        into: 'users',
        values: {
          organization_id: organizationId,
          email: 'viewer@example.com',
          name: 'Viewer User',
          role: 'viewer',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        returning: ['id'],
      });

      const viewerUserId = viewerUserResult[0].id;

      // Get viewer auth token
      const viewerLoginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'viewer@example.com',
          password: 'testpassword',
        });

      const viewerToken = viewerLoginResponse.body.token;

      // Viewer should be able to read but not write
      await request(app)
        .get('/api/campaigns')
        .set('Authorization', `Bearer ${viewerToken}`)
        .expect(200);

      await request(app)
        .post('/api/campaigns')
        .set('Authorization', `Bearer ${viewerToken}`)
        .send({
          name: 'Unauthorized Campaign',
          subject: 'Test Subject',
          content: 'Test content',
        })
        .expect(403);

      await request(app)
        .delete('/api/campaigns/test-id')
        .set('Authorization', `Bearer ${viewerToken}`)
        .expect(403);

      // Clean up
      await db.delete().from('users').where('id', '=', viewerUserId);
    });

    it('should prevent cross-organization data access', async () => {
      // Create another organization
      const otherOrgResult = await db.insert({
        into: 'organizations',
        values: {
          name: 'Other Organization',
          domain: 'other-org.com',
          plan: 'pro',
          settings: {},
          created_at: new Date(),
          updated_at: new Date(),
        },
        returning: ['id'],
      });

      const otherOrgId = otherOrgResult[0].id;

      // Create user in other organization
      const otherUserResult = await db.insert({
        into: 'users',
        values: {
          organization_id: otherOrgId,
          email: 'other@example.com',
          name: 'Other User',
          role: 'admin',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        returning: ['id'],
      });

      const otherUserId = otherUserResult[0].id;

      // Get other user auth token
      const otherLoginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'other@example.com',
          password: 'testpassword',
        });

      const otherToken = otherLoginResponse.body.token;

      // Other user should not be able to access original organization's data
      await request(app)
        .get(`/api/campaigns?organization_id=${organizationId}`)
        .set('Authorization', `Bearer ${otherToken}`)
        .expect(403);

      await request(app)
        .get(`/api/leads/${userId}`)
        .set('Authorization', `Bearer ${otherToken}`)
        .expect(403);

      // Clean up
      await db.delete().from('users').where('id', '=', otherUserId);
      await db.delete().from('organizations').where('id', '=', otherOrgId);
    });
  });

  describe('Input Validation', () => {
    it('should validate email formats', async () => {
      const invalidEmails = [
        'invalid-email',
        '@domain.com',
        'user@',
        'user..name@domain.com',
        'user@.domain.com',
        'user@domain.',
        '',
        null,
        undefined,
      ];

      for (const email of invalidEmails) {
        await request(app)
          .post('/api/leads')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            email: email,
            first_name: 'Test',
            last_name: 'User',
          })
          .expect(400);
      }
    });

    it('should validate phone number formats', async () => {
      const invalidPhones = [
        '123',
        'abc123',
        '1-800-INVALID',
        '',
        null,
        undefined,
      ];

      for (const phone of invalidPhones) {
        await request(app)
          .post('/api/leads')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            email: 'test@example.com',
            first_name: 'Test',
            last_name: 'User',
            phone: phone,
          })
          .expect(400);
      }
    });

    it('should validate UUID formats', async () => {
      const invalidUUIDs = [
        'invalid-uuid',
        '123-456-789',
        'not-a-uuid',
        '',
        null,
        undefined,
      ];

      for (const uuid of invalidUUIDs) {
        await request(app)
          .get(`/api/campaigns/${uuid}`)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(400);
      }
    });

    it('should prevent buffer overflow attacks', async () => {
      const largeString = 'a'.repeat(10000); // Very large string

      await request(app)
        .post('/api/campaigns')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: largeString,
          subject: 'Test Subject',
          content: 'Test content',
        })
        .expect(400);

      await request(app)
        .post('/api/leads')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'test@example.com',
          first_name: largeString,
          last_name: 'User',
        })
        .expect(400);
    });
  });

  describe('Rate Limiting', () => {
    it('should rate limit login attempts', async () => {
      const loginData = {
        email: 'security@example.com',
        password: 'wrongpassword',
      };

      // Make multiple failed login attempts
      for (let i = 0; i < 5; i++) {
        await request(app)
          .post('/api/auth/login')
          .send(loginData)
          .expect(401);
      }

      // Should be rate limited on 6th attempt
      await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(429);
    });

    it('should rate limit API requests', async () => {
      // Make many rapid requests
      const promises = [];
      for (let i = 0; i < 100; i++) {
        promises.push(
          request(app)
            .get('/api/campaigns')
            .set('Authorization', `Bearer ${authToken}`)
        );
      }

      const results = await Promise.all(promises);
      
      // Some requests should be rate limited
      const rateLimitedResponses = results.filter(res => res.status === 429);
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });
  });

  describe('Security Headers', () => {
    it('should include security headers', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.headers).toHaveProperty('x-frame-options', 'DENY');
      expect(response.headers).toHaveProperty('x-content-type-options', 'nosniff');
      expect(response.headers).toHaveProperty('x-xss-protection', '1; mode=block');
      expect(response.headers).toHaveProperty('strict-transport-security');
      expect(response.headers).toHaveProperty('content-security-policy');
    });
  });

  describe('Data Encryption', () => {
    it('should encrypt sensitive data at rest', async () => {
      // Create lead with PII
      await request(app)
        .post('/api/leads')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'encrypted@example.com',
          first_name: 'Encrypted',
          last_name: 'User',
          phone: '+1234567890',
          ssn: '123-45-6789',
        })
        .expect(201);

      // Check database directly to verify encryption
      const leadData = await db.select()
        .from('leads')
        .where('email', '=', 'encrypted@example.com')
        .limit(1);

      expect(leadData[0].phone).toMatch(/^encrypted:/);
      expect(leadData[0].ssn).toMatch(/^encrypted:/);
    });
  });

  describe('Audit Trail Security', () => {
    it('should log all security-relevant actions', async () => {
      // Perform various actions
      await request(app)
        .post('/api/campaigns')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Audit Test Campaign',
          subject: 'Test Subject',
          content: 'Test content',
        })
        .expect(201);

      await request(app)
        .post('/api/leads')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'audit@example.com',
          first_name: 'Audit',
          last_name: 'User',
        })
        .expect(201);

      // Check audit trail
      const auditLogs = await db.select()
        .from('audit_trail')
        .where('organization_id', '=', organizationId)
        .orderBy('created_at', 'desc')
        .limit(10);

      expect(auditLogs.length).toBeGreaterThan(0);
      
      // Should have entries for campaign creation and lead creation
      const campaignLog = auditLogs.find(log => log.action === 'create' && log.resource === 'campaign');
      const leadLog = auditLogs.find(log => log.action === 'create' && log.resource === 'lead');

      expect(campaignLog).toBeDefined();
      expect(leadLog).toBeDefined();

      // Audit logs should have integrity signatures
      expect(campaignLog.signature).toMatch(/^[a-f0-9]{64}$/);
      expect(leadLog.signature).toMatch(/^[a-f0-9]{64}$/);
    });

    it('should detect audit trail tampering', async () => {
      // Create an audit log
      await request(app)
        .post('/api/campaigns')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Tamper Test Campaign',
          subject: 'Test Subject',
          content: 'Test content',
        })
        .expect(201);

      // Get the audit log
      const auditLog = await db.select()
        .from('audit_trail')
        .where('organization_id', '=', organizationId)
        .orderBy('created_at', 'desc')
        .limit(1);

      // Tamper with the audit log
      await db.update()
        .table('audit_trail')
        .set({ details: { tampered: true } })
        .where('id', '=', auditLog[0].id);

      // Should detect tampering
      const integrityCheck = await request(app)
        .get('/api/audit/integrity')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(integrityCheck.body.tampered_logs).toBeGreaterThan(0);
    });
  });
});
