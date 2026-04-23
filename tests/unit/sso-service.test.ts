import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { SSOService } from '../../backend/services/sso-service';
import * as auth from '../../backend/lib/auth';
import { db as pgDb } from '../../backend/db/connection';
import { organizations, users } from '../../backend/db/drizzle-schema';
import { eq } from 'drizzle-orm';

jest.mock('../../backend/lib/auth', () => ({
  createSession: jest.fn(async () => ({ token: 'session-token', refreshToken: 'refresh-token' })),
  hashPassword: jest.fn(async () => 'test-password-hash'),
}));

// Mock the database
jest.mock('../../backend/db/connection', () => ({
  db: {
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
  },
}));

jest.mock('../../backend/db/drizzle-schema', () => ({
  organizations: {
    id: 'organizations',
  },
  users: {
    id: 'users',
  },
}));

// Mock samlify
jest.mock('samlify', () => ({
  ServiceProvider: jest.fn(),
  IdentityProvider: jest.fn(),
  setSchemaValidator: jest.fn(),
}));

// Mock global fetch
global.fetch = jest.fn();

describe('SSOService', () => {
  let ssoService: SSOService;
  let mockSelect: any;
  let mockInsert: any;
  let mockUpdate: any;

  beforeEach(() => {
    jest.clearAllMocks();
    ssoService = new SSOService();

    mockSelect = {
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      limit: jest.fn(),
    };

    mockInsert = {
      values: jest.fn().mockReturnThis(),
      returning: jest.fn(),
    };

    mockUpdate = {
      set: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
    };

    (pgDb.select as jest.Mock) = jest.fn(() => mockSelect);
    (pgDb.insert as jest.Mock) = jest.fn(() => mockInsert);
    (pgDb.update as jest.Mock) = jest.fn(() => mockUpdate);
  });

  describe('SAML Metadata Generation', () => {
    it('should generate SAML SP metadata', async () => {
      const mockOrg = {
        id: 'org-123',
        slug: 'test-org',
        metadata: {
          sso: {
            saml: {
              idpMetadataXml: '<IDPSSODescriptor>...</IDPSSODescriptor>'
            }
          }
        }
      };

      mockSelect.limit.mockResolvedValue([mockOrg]);

      const mockSp = {
        getMetadata: jest.fn().mockReturnValue('<EntityDescriptor>...</EntityDescriptor>')
      };

      const samlify = require('samlify') as any;
      (samlify.ServiceProvider as jest.Mock).mockReturnValue(mockSp);

      const result = await ssoService.getSamlSpMetadata('test-org', 'https://example.com');

      expect(result).toBe('<EntityDescriptor>...</EntityDescriptor>');
      expect(samlify.ServiceProvider).toHaveBeenCalledWith({
        metadata: expect.stringContaining('test-org')
      });
    });

    it('should throw error for non-existent organization', async () => {
      mockSelect.limit.mockResolvedValue([]);

      await expect(
        ssoService.getSamlSpMetadata('non-existent', 'https://example.com')
      ).rejects.toThrow('Organization not found');
    });

    it('should throw error when SAML not configured', async () => {
      const mockOrg = {
        id: 'org-123',
        slug: 'test-org',
        metadata: {}
      };

      mockSelect.limit.mockResolvedValue([mockOrg]);

      await expect(
        ssoService.getSamlSpMetadata('test-org', 'https://example.com')
      ).rejects.toThrow('SAML not configured for organization');
    });
  });

  describe('SAML Auth URL Generation', () => {
    it('should build SAML auth URL', async () => {
      const mockOrg = {
        id: 'org-123',
        slug: 'test-org',
        metadata: {
          sso: {
            saml: {
              idpMetadataXml: '<IDPSSODescriptor>...</IDPSSODescriptor>'
            }
          }
        }
      };

      mockSelect.limit.mockResolvedValue([mockOrg]);

      const mockSp = {
        createLoginRequest: jest.fn().mockReturnValue({
          context: 'https://idp.example.com/sso'
        })
      };

      const mockIdp = {};

      const samlify = require('samlify') as any;
      (samlify.ServiceProvider as jest.Mock).mockReturnValue(mockSp);
      (samlify.IdentityProvider as jest.Mock).mockReturnValue(mockIdp);

      const result = await ssoService.buildSamlAuthUrl('test-org', 'https://example.com');

      expect(result.url).toBe('https://idp.example.com/sso');
    });
  });

  describe('SAML Callback Handling', () => {
    it('should handle SAML callback successfully', async () => {
      const mockOrg = {
        id: 'org-123',
        slug: 'test-org',
        metadata: {
          sso: {
            saml: {
              idpMetadataXml: '<IDPSSODescriptor>...</IDPSSODescriptor>',
              emailAttribute: 'emailAddress'
            }
          }
        }
      };

      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        organizationId: 'org-123'
      };

      mockSelect.limit
        .mockResolvedValueOnce([mockOrg])
        .mockResolvedValueOnce([mockOrg])
        .mockResolvedValueOnce([mockUser]);

      const mockSp = {
        parseLoginResponse: jest.fn().mockReturnValue({
          extract: {
            nameID: 'test@example.com',
            attribute: {
              emailAddress: 'test@example.com',
              firstName: 'John',
              lastName: 'Doe'
            }
          }
        })
      };

      const mockIdp = {};

      const mockSamlify = {
        ServiceProvider: jest.fn().mockReturnValue(mockSp),
        IdentityProvider: jest.fn().mockReturnValue(mockIdp),
        setSchemaValidator: jest.fn(),
      };

      const samlify = require('samlify') as any;
      (samlify.ServiceProvider as jest.Mock).mockReturnValue(mockSp);
      (samlify.IdentityProvider as jest.Mock).mockReturnValue(mockIdp);
      (samlify.setSchemaValidator as jest.Mock).mockImplementation(mockSamlify.setSchemaValidator);

      (auth.createSession as jest.Mock).mockResolvedValue({ token: 'session-token', refreshToken: 'refresh-token' } as any);
      (auth.hashPassword as jest.Mock).mockResolvedValue('hashed-password' as any);

      const result = await ssoService.handleSamlCallback({
        orgSlug: 'test-org',
        baseUrl: 'https://example.com',
        samlResponse: 'mock-saml-response'
      });

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('refreshToken');
      expect(result).toHaveProperty('userId');
      expect(result).toHaveProperty('email', 'test@example.com');
    });

    it('should create new user if not exists', async () => {
      const mockOrg = {
        id: 'org-123',
        slug: 'test-org',
        metadata: {
          sso: {
            saml: {
              idpMetadataXml: '<IDPSSODescriptor>...</IDPSSODescriptor>'
            }
          }
        }
      };

      mockSelect.limit.mockResolvedValueOnce([mockOrg]);
      mockSelect.limit.mockResolvedValueOnce([]); // User not found

      const mockSp = {
        parseLoginResponse: jest.fn().mockReturnValue({
          extract: {
            nameID: 'newuser@example.com',
            attribute: {
              firstName: 'New',
              lastName: 'User'
            }
          }
        })
      };

      const mockIdp = {};

      const mockSamlify = {
        ServiceProvider: jest.fn().mockReturnValue(mockSp),
        IdentityProvider: jest.fn().mockReturnValue(mockIdp),
        setSchemaValidator: jest.fn(),
      };

      const samlify = require('samlify') as any;
      (samlify.ServiceProvider as jest.Mock).mockReturnValue(mockSp);
      (samlify.IdentityProvider as jest.Mock).mockReturnValue(mockIdp);
      (samlify.setSchemaValidator as jest.Mock).mockImplementation(mockSamlify.setSchemaValidator);

      mockInsert.returning.mockResolvedValue([{ id: 'new-user-id' }]);

      (auth.createSession as jest.Mock).mockResolvedValue({ token: 'session-token', refreshToken: 'refresh-token' } as any);
      (auth.hashPassword as jest.Mock).mockResolvedValue('hashed-password' as any);

      const result = await ssoService.handleSamlCallback({
        orgSlug: 'test-org',
        baseUrl: 'https://example.com',
        samlResponse: 'mock-saml-response'
      });

      expect(mockInsert.values).toHaveBeenCalled();
      expect(result).toHaveProperty('userId');
    });
  });

  describe('OIDC Auth URL Generation', () => {
    it('should build OIDC auth URL', async () => {
      const mockOrg = {
        id: 'org-123',
        slug: 'test-org',
        metadata: {
          sso: {
            oidc: {
              issuer: 'https://oidc.example.com',
              clientId: 'client-123',
              redirectUri: 'https://example.com/callback',
              scopes: ['openid', 'email', 'profile']
            }
          }
        }
      };

      mockSelect.limit.mockResolvedValue([mockOrg]);

      const mockDiscovery = {
        authorization_endpoint: 'https://oidc.example.com/auth',
        token_endpoint: 'https://oidc.example.com/token'
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockDiscovery)
      });

      const result = await ssoService.buildOidcAuthUrl('test-org');

      expect(result.url).toContain('https://oidc.example.com/auth');
      expect(result.url).toContain('client_id=client-123');
      expect(result.url).toContain('redirect_uri=https%3A%2F%2Fexample.com%2Fcallback');
      expect(result.state).toBeDefined();
    });

    it('should throw error when OIDC not configured', async () => {
      const mockOrg = {
        id: 'org-123',
        slug: 'test-org',
        metadata: {}
      };

      mockSelect.limit.mockResolvedValue([mockOrg]);

      await expect(
        ssoService.buildOidcAuthUrl('test-org')
      ).rejects.toThrow('OIDC not configured for organization');
    });
  });

  describe('OIDC Callback Handling', () => {
    it('should handle OIDC callback successfully', async () => {
      const mockOrg = {
        id: 'org-123',
        slug: 'test-org',
        metadata: {
          sso: {
            oidc: {
              issuer: 'https://oidc.example.com',
              clientId: 'client-123',
              redirectUri: 'https://example.com/callback'
            }
          }
        }
      };

      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        organizationId: 'org-123'
      };

      mockSelect.limit
        .mockResolvedValueOnce([mockOrg])
        .mockResolvedValueOnce([mockOrg])
        .mockResolvedValueOnce([mockUser]);

      const mockDiscovery1 = {
        authorization_endpoint: 'https://oidc.example.com/auth',
        token_endpoint: 'https://oidc.example.com/token',
      };

      const mockDiscovery2 = {
        authorization_endpoint: 'https://oidc.example.com/auth',
        token_endpoint: 'https://oidc.example.com/token',
        userinfo_endpoint: 'https://oidc.example.com/userinfo',
      };

      const mockTokenResponse = {
        access_token: 'access-token-123'
      };

      const mockUserinfo = {
        email: 'test@example.com',
        given_name: 'John',
        family_name: 'Doe'
      };

      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue(mockDiscovery1)
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue(mockDiscovery2)
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue(mockTokenResponse)
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue(mockUserinfo)
        } as Response);

      const authUrl = await ssoService.buildOidcAuthUrl('test-org');

      const result = await ssoService.handleOidcCallback({
        code: 'auth-code-123',
        state: authUrl.state
      });

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('refreshToken');
      expect(result).toHaveProperty('email', 'test@example.com');
    });

    it('should throw error for invalid state', async () => {
      await expect(
        ssoService.handleOidcCallback({
          code: 'auth-code-123',
          state: 'invalid-state'
        })
      ).rejects.toThrow('Invalid or expired state');
    });
  });

  describe('User Provisioning', () => {
    it('should update existing user without organization', async () => {
      const mockOrg = {
        id: 'org-123',
        slug: 'test-org',
        metadata: {
          sso: {
            saml: {
              idpMetadataXml: '<IDPSSODescriptor>...</IDPSSODescriptor>'
            }
          }
        }
      };

      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        organizationId: null // No organization assigned
      };

      mockSelect.limit.mockResolvedValueOnce([mockOrg]);
      mockSelect.limit.mockResolvedValueOnce([mockUser]);

      const mockSp = {
        parseLoginResponse: jest.fn().mockReturnValue({
          extract: {
            nameID: 'test@example.com',
            attribute: {
              firstName: 'John',
              lastName: 'Doe'
            }
          }
        })
      };

      const mockIdp = {};

      const mockSamlify = {
        ServiceProvider: jest.fn().mockReturnValue(mockSp),
        IdentityProvider: jest.fn().mockReturnValue(mockIdp),
        setSchemaValidator: jest.fn(),
      };

      const samlify = require('samlify') as any;
      (samlify.ServiceProvider as jest.Mock).mockReturnValue(mockSp);
      (samlify.IdentityProvider as jest.Mock).mockReturnValue(mockIdp);
      (samlify.setSchemaValidator as jest.Mock).mockImplementation(mockSamlify.setSchemaValidator);

      (auth.createSession as jest.Mock).mockResolvedValue({ token: 'session-token', refreshToken: 'refresh-token' } as any);

      await ssoService.handleSamlCallback({
        orgSlug: 'test-org',
        baseUrl: 'https://example.com',
        samlResponse: 'mock-saml-response'
      });

      expect(mockUpdate.set).toHaveBeenCalledWith(
        expect.objectContaining({
          organizationId: 'org-123'
        })
      );
    });
  });
});
