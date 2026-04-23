import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import request from 'supertest';
import { app } from '../../backend/server';
import { db } from '../../backend/db/connection';

describe('Advanced Security Tests', () => {
  let organizationId: string;
  let userId: string;
  let authToken: string;
  let adminToken: string;

  beforeEach(async () => {
    // Create test organization
    const orgResult = await db.insert({
      into: 'organizations',
      values: {
        name: 'Advanced Security Test Organization',
        domain: 'advanced-security-test.com',
        plan: 'enterprise',
        settings: {
          enforce_mfa: true,
          session_timeout: 3600,
          ip_whitelist: ['127.0.0.1', '::1'],
        },
        created_at: new Date(),
        updated_at: new Date(),
      },
      returning: ['id'],
    });

    organizationId = orgResult[0].id;

    // Create regular user
    const userResult = await db.insert({
      into: 'users',
      values: {
        organization_id: organizationId,
        email: 'user@advanced-security.com',
        name: 'Regular User',
        role: 'user',
        is_active: true,
        mfa_enabled: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      returning: ['id'],
    });

    userId = userResult[0].id;

    // Create admin user
    const adminResult = await db.insert({
      into: 'users',
      values: {
        organization_id: organizationId,
        email: 'admin@advanced-security.com',
        name: 'Admin User',
        role: 'admin',
        is_active: true,
        mfa_enabled: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      returning: ['id'],
    });

    const adminId = adminResult[0].id;

    // Get auth tokens
    const userLoginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'user@advanced-security.com',
        password: 'testpassword',
        mfa_code: '123456',
      });

    authToken = userLoginResponse.body.token;

    const adminLoginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@advanced-security.com',
        password: 'adminpassword',
        mfa_code: '123456',
      });

    adminToken = adminLoginResponse.body.token;
  });

  afterEach(async () => {
    // Clean up test data
    await db.delete().from('audit_trail').where('organization_id', '=', organizationId);
    await db.delete().from('users').where('organization_id', '=', organizationId);
    await db.delete().from('organizations').where('id', '=', organizationId);
  });

  describe('Multi-Factor Authentication Security', () => {
    it('should enforce MFA for sensitive operations', async () => {
      // Test sensitive operations without MFA
      const sensitiveOperations = [
        { method: 'post', path: '/api/users', data: { email: 'new@example.com', name: 'New User' } },
        { method: 'put', path: `/api/users/${userId}`, data: { role: 'admin' } },
        { method: 'delete', path: `/api/users/${userId}` },
        { method: 'post', path: '/api/payments/refund', data: { amount: 1000 } },
      ];

      for (const operation of sensitiveOperations) {
        await request(app)[operation.method](operation.path)
          .set('Authorization', `Bearer ${authToken}`)
          .send(operation.data)
          .expect(401); // Should require MFA
      }

      // Test with MFA token
      const mfaTokenResponse = await request(app)
        .post('/api/auth/mfa/verify')
        .send({
          email: 'user@advanced-security.com',
          mfa_code: '123456',
        })
        .expect(200);

      const mfaAuthToken = mfaTokenResponse.body.mfa_token;

      // Should succeed with MFA token
      await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${mfaAuthToken}`)
        .expect(200);
    });

    it('should handle MFA backup codes', async () => {
      // Generate backup codes
      const backupCodesResponse = await request(app)
        .post('/api/auth/mfa/backup-codes')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(backupCodesResponse.body).toMatchObject({
        backup_codes: expect.arrayContaining([expect.stringMatching(/^\d{6}$/)]),
        generated_at: expect.any(String),
      });

      const backupCode = backupCodesResponse.body.backup_codes[0];

      // Test login with backup code
      const backupLoginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'user@advanced-security.com',
          password: 'testpassword',
          backup_code: backupCode,
        })
        .expect(200);

      expect(backupLoginResponse.body).toHaveProperty('token');
      expect(backupLoginResponse.body.auth_method).toBe('backup_code');
    });

    it('should detect and prevent MFA bypass attempts', async () => {
      const bypassAttempts = [
        { mfa_code: '000000' }, // Invalid code
        { mfa_code: '1234567' }, // Wrong length
        { mfa_code: 'abcdef' }, // Non-numeric
        { backup_code: 'invalid' }, // Invalid backup code
        { mfa_code: null }, // Missing MFA
      ];

      for (const attempt of bypassAttempts) {
        await request(app)
          .post('/api/auth/login')
          .send({
            email: 'user@advanced-security.com',
            password: 'testpassword',
            ...attempt,
          })
          .expect(401);
      }

      // Check for account lockout after multiple failed attempts
      await request(app)
        .post('/api/auth/login')
        .send({
          email: 'user@advanced-security.com',
          password: 'testpassword',
          mfa_code: '000000',
        })
        .expect(423); // Account locked
    });
  });

  describe('Session Security', () => {
    it('should enforce session timeout', async () => {
      // Create a session
      const sessionResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'user@advanced-security.com',
          password: 'testpassword',
          mfa_code: '123456',
        })
        .expect(200);

      const sessionToken = sessionResponse.body.token;

      // Simulate session expiration by manipulating token
      const expiredToken = sessionToken.replace(/exp:\d+/, `exp:${Math.floor(Date.now() / 1000) - 3600}`);

      await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${expiredToken}`)
        .expect(401); // Session expired
    });

    it('should handle concurrent session limits', async () => {
      // Create multiple sessions
      const sessions = [];
      for (let i = 0; i < 5; i++) {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            email: 'user@advanced-security.com',
            password: 'testpassword',
            mfa_code: '123456',
          })
          .expect(200);
        sessions.push(response.body.token);
      }

      // Should only allow configured number of concurrent sessions
      const activeSessionsResponse = await request(app)
        .get('/api/auth/sessions')
        .set('Authorization', `Bearer ${sessions[0]}`)
        .expect(200);

      expect(activeSessionsResponse.body.sessions.length).toBeLessThanOrEqual(3); // Assuming 3 session limit
    });

    it('should invalidate all sessions on password change', async () => {
      // Create initial session
      const sessionResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'user@advanced-security.com',
          password: 'testpassword',
          mfa_code: '123456',
        })
        .expect(200);

      const sessionToken = sessionResponse.body.token;

      // Change password
      await request(app)
        .put('/api/auth/password')
        .set('Authorization', `Bearer ${sessionToken}`)
        .send({
          current_password: 'testpassword',
          new_password: 'newpassword',
        })
        .expect(200);

      // Previous session should be invalidated
      await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${sessionToken}`)
        .expect(401); // Session invalidated
    });
  });

  describe('IP and Geolocation Security', () => {
    it('should enforce IP whitelist restrictions', async () => {
      // Test from whitelisted IP
      await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Forwarded-For', '127.0.0.1')
        .expect(200);

      // Test from non-whitelisted IP
      await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Forwarded-For', '192.168.1.100')
        .expect(403); // IP not whitelisted
    });

    it('should detect suspicious login patterns', async () => {
      // Simulate rapid login attempts from different locations
      const locations = ['US', 'CN', 'RU', 'BR', 'IN'];
      
      for (const location of locations) {
        await request(app)
          .post('/api/auth/login')
          .set('X-Forwarded-For', `1.2.3.${Math.floor(Math.random() * 255)}`)
          .set('X-Country-Code', location)
          .send({
            email: 'user@advanced-security.com',
            password: 'wrongpassword',
          })
          .expect(401);
      }

      // Should trigger security alert
      const securityAlertsResponse = await request(app)
        .get('/api/security/alerts')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(securityAlertsResponse.body.alerts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'suspicious_login_pattern',
            severity: 'high',
          }),
        ])
      );
    });

    it('should handle geolocation-based access control', async () => {
      // Restrict access to certain countries
      await request(app)
        .put('/api/organizations/security')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          allowed_countries: ['US', 'CA', 'GB'],
          block_high_risk_countries: true,
        })
        .expect(200);

      // Test from allowed country
      await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Country-Code', 'US')
        .expect(200);

      // Test from blocked country
      await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Country-Code', 'KP') // North Korea - high risk
        .expect(403); // Country blocked
    });
  });

  describe('Advanced Input Validation', () => {
    it('should prevent LDAP injection attacks', async () => {
      const ldapPayloads = [
        '*)(&',
        '*)(|(objectClass=*)',
        '*)(|(password=*',
        '*))%00',
        'admin)(&(password=*))',
      ];

      for (const payload of ldapPayloads) {
        await request(app)
          .post('/api/auth/login')
          .send({
            email: payload,
            password: 'anypassword',
          })
          .expect(401);
      }
    });

    it('should prevent XXE (XML External Entity) attacks', async () => {
      const maliciousXML = `<?xml version="1.0" encoding="ISO-8859-1"?>
        <!DOCTYPE foo [
          <!ELEMENT foo ANY >
          <!ENTITY xxe SYSTEM "file:///etc/passwd" >]>
        <foo>&xxe;</foo>`;

      await request(app)
        .post('/api/import/xml')
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/xml')
        .send(maliciousXML)
        .expect(400); // Should reject XXE attempts
    });

    it('should prevent deserialization attacks', async () => {
      const maliciousPayloads = [
        'O:8:"stdClass":0:{}',
        'a:1:{i:0;O:8:"stdClass":0:{}}',
        '{"__proto__":{"admin":true}}',
        '{"constructor":{"prototype":{"admin":true}}}',
      ];

      for (const payload of maliciousPayloads) {
        await request(app)
          .post('/api/data/process')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ data: payload })
          .expect(400);
      }
    });

    it('should prevent template injection attacks', async () => {
      const templatePayloads = [
        '{{7*7}}',
        '${7*7}',
        '#{7*7}',
        '{{config}}',
        '${java.lang.Runtime}',
        '{{self.__init__.__globals__}}',
      ];

      for (const payload of templatePayloads) {
        await request(app)
          .post('/api/templates/render')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ template: payload })
          .expect(400);
      }
    });
  });

  describe('File Upload Security', () => {
    it('should prevent malicious file uploads', async () => {
      const maliciousFiles = [
        { filename: 'malware.exe', content: Buffer.from('fake malware'), mimetype: 'application/octet-stream' },
        { filename: 'script.php', content: Buffer.from('<?php system($_GET["cmd"]); ?>'), mimetype: 'application/x-php' },
        { filename: 'shell.jsp', content: Buffer.from('<% Runtime.getRuntime().exec(request.getParameter("cmd")); %>'), mimetype: 'application/x-jsp' },
        { filename: 'exploit.html', content: Buffer.from('<script>alert("XSS")</script>'), mimetype: 'text/html' },
      ];

      for (const file of maliciousFiles) {
        await request(app)
          .post('/api/files/upload')
          .set('Authorization', `Bearer ${authToken}`)
          .attach('file', file.content, file.filename)
          .expect(400); // Should reject malicious files
      }
    });

    it('should enforce file size limits', async () => {
      const largeFile = Buffer.alloc(50 * 1024 * 1024); // 50MB file

      await request(app)
        .post('/api/files/upload')
        .set('Authorization', `Bearer ${authToken}`)
        .attach('file', largeFile, 'large.txt')
        .expect(413); // Request entity too large
    });

    it('should scan uploaded files for malware', async => {
      // Simulate malware scan
      const suspiciousFile = Buffer.from('X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*');

      await request(app)
        .post('/api/files/upload')
        .set('Authorization', `Bearer ${authToken}`)
        .attach('file', suspiciousFile, 'eicar.txt')
        .expect(400); // Should detect EICAR test signature
    });
  });

  describe('API Security Headers', () => {
    it('should include comprehensive security headers', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      const headers = response.headers;

      // Check essential security headers
      expect(headers).toHaveProperty('x-frame-options', 'DENY');
      expect(headers).toHaveProperty('x-content-type-options', 'nosniff');
      expect(headers).toHaveProperty('x-xss-protection', '1; mode=block');
      expect(headers).toHaveProperty('referrer-policy', 'strict-origin-when-cross-origin');
      expect(headers).toHaveProperty('permissions-policy');
      expect(headers).toHaveProperty('strict-transport-security');
      
      // Check CSP header
      const csp = headers['content-security-policy'];
      expect(csp).toContain("default-src 'self'");
      expect(csp).toContain("script-src 'self'");
      expect(csp).toContain("style-src 'self'");
      expect(csp).toContain("img-src 'self' data:");
    });

    it('should handle CORS securely', async () => {
      // Test preflight request
      const optionsResponse = await request(app)
        .options('/api/users/profile')
        .set('Origin', 'https://malicious-site.com')
        .set('Access-Control-Request-Method', 'GET')
        .expect(403); // Should reject unauthorized origins

      // Test authorized origin
      const authorizedResponse = await request(app)
        .options('/api/users/profile')
        .set('Origin', 'https://app.kaytx.com')
        .set('Access-Control-Request-Method', 'GET')
        .expect(204);

      expect(authorizedResponse.headers).toHaveProperty('access-control-allow-origin', 'https://app.kaytx.com');
    });
  });

  describe('Rate Limiting and DDoS Protection', () => {
    it('should implement progressive rate limiting', async () => {
      // First few requests should succeed
      for (let i = 0; i < 10; i++) {
        await request(app)
          .get('/api/users/profile')
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200);
      }

      // Should start rate limiting
      for (let i = 0; i < 5; i++) {
        await request(app)
          .get('/api/users/profile')
          .set('Authorization', `Bearer ${authToken}`)
          .expect(429); // Too many requests
      }
    });

    it('should handle DDoS attack patterns', async () => {
      // Simulate DDoS attack from multiple IPs
      const promises = [];
      for (let i = 0; i < 1000; i++) {
        const ip = `192.168.1.${i % 255}`;
        promises.push(
          request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${authToken}`)
            .set('X-Forwarded-For', ip)
        );
      }

      const results = await Promise.allSettled(promises);
      const rejected = results.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && r.value.status === 429));
      
      // Should reject most requests due to rate limiting
      expect(rejected.length).toBeGreaterThan(500);
    });

    it('should implement intelligent rate limiting based on user behavior', async () => {
      // Normal user behavior should have higher limits
      for (let i = 0; i < 50; i++) {
        await request(app)
          .get('/api/users/profile')
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200);
      }

      // Suspicious behavior should trigger stricter limits
      const suspiciousPromises = [];
      for (let i = 0; i < 20; i++) {
        suspiciousPromises.push(
          request(app)
            .post('/api/auth/login')
            .send({
              email: 'user@advanced-security.com',
              password: 'wrongpassword',
            })
        );
      }

      const suspiciousResults = await Promise.allSettled(suspiciousPromises);
      const rejected = suspiciousResults.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && r.value.status >= 400));
      
      expect(rejected.length).toBeGreaterThan(15);
    });
  });

  describe('Security Monitoring and Alerting', () => {
    it('should detect and log security events', async () => {
      // Trigger various security events
      await request(app)
        .post('/api/auth/login')
        .send({ email: 'user@advanced-security.com', password: 'wrongpassword' })
        .expect(401);

      await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(403);

      await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ email: 'test@example.com', name: 'Test' })
        .expect(401);

      // Check security events
      const eventsResponse = await request(app)
        .get('/api/security/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(eventsResponse.body.events).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'failed_login' }),
          expect.objectContaining({ type: 'access_denied' }),
          expect.objectContaining({ type: 'unauthorized_access_attempt' }),
        ])
      );
    });

    it('should generate security alerts for critical events', async () => {
      // Trigger critical security event
      for (let i = 0; i < 10; i++) {
        await request(app)
          .post('/api/auth/login')
          .send({ email: 'admin@advanced-security.com', password: 'wrongpassword' })
          .expect(401);
      }

      // Check for security alerts
      const alertsResponse = await request(app)
        .get('/api/security/alerts')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(alertsResponse.body.alerts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'brute_force_attempt',
            severity: 'critical',
            target: 'admin@advanced-security.com',
          }),
        ])
      );
    });

    it('should provide security dashboard metrics', async () => {
      const dashboardResponse = await request(app)
        .get('/api/security/dashboard')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(dashboardResponse.body).toMatchObject({
        security_score: expect.any(Number),
        active_threats: expect.any(Number),
        blocked_attempts: expect.any(Number),
        security_events: expect.any(Object),
        risk_level: expect.any(String),
        recommendations: expect.any(Array),
      });
    });
  });
});
