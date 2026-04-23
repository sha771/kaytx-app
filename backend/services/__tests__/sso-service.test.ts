import { SSOService } from '../sso-service';

jest.mock('../../lib/auth', () => {
  return {
    createSession: jest.fn(async () => ({
      id: 'session-1',
      userId: 'user-1',
      token: 'token-1',
      refreshToken: 'refresh-1',
      expiresAt: new Date(Date.now() + 60_000),
      refreshExpiresAt: new Date(Date.now() + 60_000),
      ipAddress: null,
      userAgent: null,
      deviceId: null,
      createdAt: new Date(),
      lastActivityAt: new Date(),
    })),
    hashPassword: jest.fn(async () => 'hash'),
  };
});

jest.mock('../../db/connection', () => {
  const { organizations, users } = require('../../db/drizzle-schema');

  const org = {
    id: 'org-1',
    slug: 'acme',
    settings: {
      sso: {
        oidc: {
          issuer: 'https://issuer.example.com',
          clientId: 'client-123',
          redirectUri: 'https://app.example.com/auth/sso/oidc/callback',
          emailClaim: 'email',
        },
      },
    },
  };

  const user = {
    id: 'user-1',
    email: 'employee@acme.com',
    organizationId: 'org-1',
  };

  const makeSelectChain = (table: any) => ({
    where: () => ({
      limit: async () => {
        if (table === organizations) return [org];
        if (table === users) return [user];
        return [];
      },
    }),
  });

  const db = {
    select: () => ({
      from: (table: any) => makeSelectChain(table),
    }),
    update: () => ({
      set: () => ({
        where: async () => undefined,
      }),
    }),
    insert: () => ({
      values: async () => undefined,
    }),
  };

  return { db };
});

describe('SSOService (OIDC)', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockReset();
  });

  test('buildOidcAuthUrl returns a valid authorization URL and state', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        authorization_endpoint: 'https://issuer.example.com/oauth2/v2.0/authorize',
        token_endpoint: 'https://issuer.example.com/oauth2/v2.0/token',
      }),
    });

    const service = new SSOService();
    const { url, state } = await service.buildOidcAuthUrl('acme');

    expect(state).toBeTruthy();
    expect(url).toContain('https://issuer.example.com/oauth2/v2.0/authorize?');
    expect(url).toContain('client_id=client-123');
    expect(url).toContain('response_type=code');
    expect(url).toContain('code_challenge_method=S256');
    expect(url).toContain(`state=${encodeURIComponent(state)}`);
  });

  test('handleOidcCallback exchanges code and provisions session', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          authorization_endpoint: 'https://issuer.example.com/oauth2/v2.0/authorize',
          token_endpoint: 'https://issuer.example.com/oauth2/v2.0/token',
          userinfo_endpoint: 'https://issuer.example.com/oauth2/v2.0/userinfo',
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          authorization_endpoint: 'https://issuer.example.com/oauth2/v2.0/authorize',
          token_endpoint: 'https://issuer.example.com/oauth2/v2.0/token',
          userinfo_endpoint: 'https://issuer.example.com/oauth2/v2.0/userinfo',
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: 'access-1' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ email: 'employee@acme.com', given_name: 'Emp', family_name: 'Loyee' }),
      });

    const service = new SSOService();
    const { state } = await service.buildOidcAuthUrl('acme');

    const session = await service.handleOidcCallback({ code: 'code-1', state });
    expect(session).toMatchObject({
      token: 'token-1',
      refreshToken: 'refresh-1',
      userId: 'user-1',
      organizationId: 'org-1',
      email: 'employee@acme.com',
    });
  });
});
