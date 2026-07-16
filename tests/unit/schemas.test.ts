import { describe, it, expect } from '@jest/globals';
import {
  loginSchema,
  registerSchema,
  createAgentSchema,
  updateAgentSchema,
  sendMessageSchema,
  connectPlatformSchema,
  inviteMemberSchema,
  paginationSchema,
  slugSchema,
  emailSchema,
} from '../../backend/schemas/agent-schemas';

describe('Auth Schemas', () => {
  describe('loginSchema', () => {
    it('should accept valid login input', () => {
      const result = loginSchema.safeParse({
        email: 'user@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('should lowercase email', () => {
      const result = loginSchema.safeParse({
        email: 'USER@EXAMPLE.COM',
        password: 'password123',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('user@example.com');
      }
    });

    it('should reject invalid email', () => {
      const result = loginSchema.safeParse({
        email: 'not-an-email',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty password', () => {
      const result = loginSchema.safeParse({
        email: 'user@example.com',
        password: '',
      });
      expect(result.success).toBe(false);
    });

    it('should accept optional MFA code', () => {
      const result = loginSchema.safeParse({
        email: 'user@example.com',
        password: 'password123',
        mfaCode: '123456',
      });
      expect(result.success).toBe(true);
    });

    it('should default rememberMe to false', () => {
      const result = loginSchema.safeParse({
        email: 'user@example.com',
        password: 'password123',
      });
      if (result.success) {
        expect(result.data.rememberMe).toBe(false);
      }
    });
  });

  describe('registerSchema', () => {
    it('should accept valid registration', () => {
      const result = registerSchema.safeParse({
        email: 'new@example.com',
        password: 'StrongPass1',
        firstName: 'John',
        lastName: 'Doe',
        acceptTerms: true,
      });
      expect(result.success).toBe(true);
    });

    it('should reject weak password (no uppercase)', () => {
      const result = registerSchema.safeParse({
        email: 'new@example.com',
        password: 'weakpass1',
        firstName: 'John',
        lastName: 'Doe',
        acceptTerms: true,
      });
      expect(result.success).toBe(false);
    });

    it('should reject weak password (too short)', () => {
      const result = registerSchema.safeParse({
        email: 'new@example.com',
        password: 'Ab1',
        firstName: 'John',
        lastName: 'Doe',
        acceptTerms: true,
      });
      expect(result.success).toBe(false);
    });

    it('should reject if terms not accepted', () => {
      const result = registerSchema.safeParse({
        email: 'new@example.com',
        password: 'StrongPass1',
        firstName: 'John',
        lastName: 'Doe',
        acceptTerms: false,
      });
      expect(result.success).toBe(false);
    });
  });
});

describe('Agent Schemas', () => {
  const validAgent = {
    name: 'Sales Agent',
    slug: 'sales-agent',
    description: 'Handles sales inquiries',
    department: 'sales',
  };

  describe('createAgentSchema', () => {
    it('should accept valid agent', () => {
      const result = createAgentSchema.safeParse(validAgent);
      expect(result.success).toBe(true);
    });

    it('should default status to draft', () => {
      const result = createAgentSchema.safeParse(validAgent);
      if (result.success) {
        expect(result.data.status).toBe('draft');
      }
    });

    it('should default capabilities to empty array', () => {
      const result = createAgentSchema.safeParse(validAgent);
      if (result.success) {
        expect(result.data.capabilities).toEqual([]);
      }
    });

    it('should reject invalid slug (uppercase)', () => {
      const result = createAgentSchema.safeParse({
        ...validAgent,
        slug: 'Sales-Agent',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid status', () => {
      const result = createAgentSchema.safeParse({
        ...validAgent,
        status: 'invalid',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('updateAgentSchema', () => {
    it('should accept partial update', () => {
      const result = updateAgentSchema.safeParse({ name: 'Updated Name' });
      expect(result.success).toBe(true);
    });

    it('should accept empty object', () => {
      const result = updateAgentSchema.safeParse({});
      expect(result.success).toBe(true);
    });
  });
});

describe('Chat Schemas', () => {
  describe('sendMessageSchema', () => {
    it('should accept valid message', () => {
      const result = sendMessageSchema.safeParse({ message: 'Hello there' });
      expect(result.success).toBe(true);
    });

    it('should default stream to true', () => {
      const result = sendMessageSchema.safeParse({ message: 'Hello' });
      if (result.success) {
        expect(result.data.stream).toBe(true);
      }
    });

    it('should reject empty message', () => {
      const result = sendMessageSchema.safeParse({ message: '' });
      expect(result.success).toBe(false);
    });

    it('should reject message over 10k chars', () => {
      const result = sendMessageSchema.safeParse({ message: 'a'.repeat(10001) });
      expect(result.success).toBe(false);
    });
  });
});

describe('Platform Schemas', () => {
  describe('connectPlatformSchema', () => {
    it('should accept valid WhatsApp connection', () => {
      const result = connectPlatformSchema.safeParse({
        platform: 'whatsapp',
        credentials: { token: 'abc123' },
      });
      expect(result.success).toBe(true);
    });

    it('should reject unsupported platform', () => {
      const result = connectPlatformSchema.safeParse({
        platform: 'myspace',
        credentials: {},
      });
      expect(result.success).toBe(false);
    });
  });
});

describe('Enterprise Schemas', () => {
  describe('inviteMemberSchema', () => {
    it('should accept valid invite', () => {
      const result = inviteMemberSchema.safeParse({
        email: 'member@example.com',
        role: 'member',
      });
      expect(result.success).toBe(true);
    });

    it('should default role to member', () => {
      const result = inviteMemberSchema.safeParse({
        email: 'member@example.com',
      });
      if (result.success) {
        expect(result.data.role).toBe('member');
      }
    });

    it('should reject invalid role', () => {
      const result = inviteMemberSchema.safeParse({
        email: 'member@example.com',
        role: 'superadmin',
      });
      expect(result.success).toBe(false);
    });
  });
});

describe('Common Schemas', () => {
  describe('paginationSchema', () => {
    it('should apply defaults', () => {
      const result = paginationSchema.safeParse({});
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(20);
        expect(result.data.sortOrder).toBe('desc');
      }
    });

    it('should coerce string numbers', () => {
      const result = paginationSchema.safeParse({ page: '3', limit: '50' });
      if (result.success) {
        expect(result.data.page).toBe(3);
        expect(result.data.limit).toBe(50);
      }
    });

    it('should reject limit over 100', () => {
      const result = paginationSchema.safeParse({ limit: 200 });
      expect(result.success).toBe(false);
    });
  });

  describe('slugSchema', () => {
    it('should accept valid slug', () => {
      expect(slugSchema.safeParse('sales-agent').success).toBe(true);
      expect(slugSchema.safeParse('hr-2026').success).toBe(true);
    });

    it('should reject uppercase', () => {
      expect(slugSchema.safeParse('SalesAgent').success).toBe(false);
    });

    it('should reject spaces', () => {
      expect(slugSchema.safeParse('sales agent').success).toBe(false);
    });

    it('should reject special chars', () => {
      expect(slugSchema.safeParse('sales_agent!').success).toBe(false);
    });
  });

  describe('emailSchema', () => {
    it('should accept valid email', () => {
      expect(emailSchema.safeParse('user@example.com').success).toBe(true);
    });

    it('should reject invalid email', () => {
      expect(emailSchema.safeParse('not-an-email').success).toBe(false);
    });
  });
});
