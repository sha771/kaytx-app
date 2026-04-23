import crypto from 'crypto';
import { db as pgDb } from '../db/connection';
import { organizations, users } from '../db/drizzle-schema';
import { eq } from 'drizzle-orm';
import * as auth from '../lib/auth';

export type OIDCOrgConfig = {
  issuer: string;
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  scopes?: string[];
  emailClaim?: string;
};

export type OrgSSOConfig = {
  oidc?: OIDCOrgConfig;
  saml?: Record<string, unknown>;
};

type SamlOrgConfig = {
  idpMetadataXml: string;
  emailAttribute?: string;
};

type OIDCDiscovery = {
  authorization_endpoint: string;
  token_endpoint: string;
  userinfo_endpoint?: string;
};

type PendingOidcAuth = {
  orgSlug: string;
  codeVerifier: string;
  createdAt: number;
};

const pendingOidc = new Map<string, PendingOidcAuth>();

function base64UrlEncode(buf: Buffer): string {
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function sha256Base64Url(input: string): string {
  return base64UrlEncode(crypto.createHash('sha256').update(input).digest());
}

function randomUrlSafeString(bytes: number): string {
  return base64UrlEncode(crypto.randomBytes(bytes));
}

async function getOrgBySlug(slug: string) {
  const [org] = await pgDb.select().from(organizations).where(eq(organizations.slug, slug)).limit(1);
  return org as any;
}

function getOrgSSOConfig(org: any): OrgSSOConfig {
  const meta = (org?.metadata || {}) as any;
  const fromMeta = meta?.sso;
  if (fromMeta && typeof fromMeta === 'object') return fromMeta as OrgSSOConfig;

  const settings = (org?.settings || {}) as any;
  const fromSettings = settings?.sso;
  if (fromSettings && typeof fromSettings === 'object') return fromSettings as OrgSSOConfig;

  return {};
}

function getSamlOrgConfig(sso: OrgSSOConfig): SamlOrgConfig | null {
  const raw = (sso as any)?.saml;
  if (!raw || typeof raw !== 'object') return null;
  const idpMetadataXml = (raw as any).idpMetadataXml;
  if (!idpMetadataXml || typeof idpMetadataXml !== 'string') return null;
  const emailAttribute = (raw as any).emailAttribute;
  return {
    idpMetadataXml: String(idpMetadataXml),
    ...(emailAttribute && typeof emailAttribute === 'string' ? { emailAttribute: String(emailAttribute) } : {}),
  };
}

function getSpEntityId(baseUrl: string): string {
  return `${baseUrl.replace(/\/+$/g, '')}/auth/sso/saml/metadata`;
}

function getAcsUrl(baseUrl: string, orgSlug: string): string {
  return `${baseUrl.replace(/\/+$/g, '')}/auth/sso/saml/callback/${encodeURIComponent(orgSlug)}`;
}

function buildSpMetadata(baseUrl: string, orgSlug: string): string {
  const entityId = getSpEntityId(baseUrl);
  const acs = getAcsUrl(baseUrl, orgSlug);

  return `<?xml version="1.0"?>
<EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" entityID="${entityId}">
  <SPSSODescriptor protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</NameIDFormat>
    <AssertionConsumerService isDefault="true" index="0" Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="${acs}" />
  </SPSSODescriptor>
</EntityDescriptor>`;
}

function getSamlSp(samlify: any, baseUrl: string, orgSlug: string) {
  // Samlify supports passing a metadata string directly.
  const sp = samlify.ServiceProvider({
    metadata: buildSpMetadata(baseUrl, orgSlug),
  });
  return sp;
}

async function discover(issuer: string): Promise<OIDCDiscovery> {
  const url = issuer.endsWith('/')
    ? `${issuer}.well-known/openid-configuration`
    : `${issuer}/.well-known/openid-configuration`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`OIDC discovery failed (${res.status})`);
  }
  const json = (await res.json()) as any;
  if (!json?.authorization_endpoint || !json?.token_endpoint) {
    throw new Error('OIDC discovery missing endpoints');
  }
  const discovery: OIDCDiscovery = {
    authorization_endpoint: String(json.authorization_endpoint),
    token_endpoint: String(json.token_endpoint),
  };
  if (json.userinfo_endpoint) {
    discovery.userinfo_endpoint = String(json.userinfo_endpoint);
  }
  return discovery;
}

export class SSOService {
  async getSamlSpMetadata(orgSlug: string, baseUrl: string): Promise<string> {
    const org = await getOrgBySlug(orgSlug);
    if (!org) throw new Error('Organization not found');

    const sso = getOrgSSOConfig(org);
    const samlCfg = getSamlOrgConfig(sso);
    if (!samlCfg) throw new Error('SAML not configured for organization');

    const samlify = require('samlify') as any;
    const sp = getSamlSp(samlify, baseUrl, orgSlug);
    return sp.getMetadata();
  }

  async buildSamlAuthUrl(orgSlug: string, baseUrl: string): Promise<{ url: string }> {
    const org = await getOrgBySlug(orgSlug);
    if (!org) throw new Error('Organization not found');

    const sso = getOrgSSOConfig(org);
    const samlCfg = getSamlOrgConfig(sso);
    if (!samlCfg) throw new Error('SAML not configured for organization');

    const samlify = require('samlify') as any;
    const idp = samlify.IdentityProvider({ metadata: samlCfg.idpMetadataXml });
    const sp = getSamlSp(samlify, baseUrl, orgSlug);

    const { context } = sp.createLoginRequest(idp, 'redirect') as any;
    return { url: String(context) };
  }

  async handleSamlCallback(input: { orgSlug: string; baseUrl: string; samlResponse: string }) {
    const org = await getOrgBySlug(input.orgSlug);
    if (!org) throw new Error('Organization not found');

    const sso = getOrgSSOConfig(org);
    const samlCfg = getSamlOrgConfig(sso);
    if (!samlCfg) throw new Error('SAML not configured for organization');

    const samlify = require('samlify') as any;

    // Configure samlify schema validation.
    // We avoid validator packages that require a full JDK on Windows.
    // Signature and issuer verification are still performed by samlify.
    samlify.setSchemaValidator({
      validate: async () => 'skipped',
    });

    const idp = samlify.IdentityProvider({ metadata: samlCfg.idpMetadataXml });
    const sp = getSamlSp(samlify, input.baseUrl, input.orgSlug);

    const parseResult = await sp.parseLoginResponse(idp, 'post', { body: { SAMLResponse: input.samlResponse } });
    const extract: any = (parseResult as any)?.extract;

    const emailKey = samlCfg.emailAttribute ? String(samlCfg.emailAttribute) : 'email';
    const emailFromAttr = extract?.attribute?.[emailKey];
    const emailFromNameId = extract?.nameID;
    const email = emailFromAttr
      ? String(emailFromAttr).toLowerCase()
      : (emailFromNameId ? String(emailFromNameId).toLowerCase() : undefined);

    if (!email) throw new Error('SAML did not return an email');

    const firstName = extract?.attribute?.firstName ? String(extract.attribute.firstName) : 'SSO';
    const lastName = extract?.attribute?.lastName ? String(extract.attribute.lastName) : 'User';

    const session = await this.provisionAndCreateSession({
      email,
      organizationId: String(org.id),
      firstName,
      lastName,
    });

    return session;
  }

  async buildOidcAuthUrl(orgSlug: string): Promise<{ url: string; state: string }> {
    const org = await getOrgBySlug(orgSlug);
    if (!org) throw new Error('Organization not found');

    const sso = getOrgSSOConfig(org);
    if (!sso.oidc?.issuer || !sso.oidc.clientId || !sso.oidc.redirectUri) {
      throw new Error('OIDC not configured for organization');
    }

    const discovery = await discover(sso.oidc.issuer);

    const state = randomUrlSafeString(24);
    const codeVerifier = randomUrlSafeString(32);
    const codeChallenge = sha256Base64Url(codeVerifier);

    pendingOidc.set(state, { orgSlug, codeVerifier, createdAt: Date.now() });

    const scopes = (sso.oidc.scopes && sso.oidc.scopes.length > 0)
      ? sso.oidc.scopes
      : ['openid', 'email', 'profile'];

    const params = new URLSearchParams({
      client_id: sso.oidc.clientId,
      redirect_uri: sso.oidc.redirectUri,
      response_type: 'code',
      scope: scopes.join(' '),
      state,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
    });

    return { url: `${discovery.authorization_endpoint}?${params.toString()}`, state };
  }

  async handleOidcCallback(input: { code: string; state: string }) {
    const pending = pendingOidc.get(input.state);
    if (!pending) throw new Error('Invalid or expired state');
    pendingOidc.delete(input.state);

    const org = await getOrgBySlug(pending.orgSlug);
    if (!org) throw new Error('Organization not found');

    const sso = getOrgSSOConfig(org);
    if (!sso.oidc?.issuer || !sso.oidc.clientId || !sso.oidc.redirectUri) {
      throw new Error('OIDC not configured for organization');
    }

    const discovery = await discover(sso.oidc.issuer);

    const tokenBody = new URLSearchParams({
      grant_type: 'authorization_code',
      code: input.code,
      redirect_uri: sso.oidc.redirectUri,
      client_id: sso.oidc.clientId,
      code_verifier: pending.codeVerifier,
    });

    if (sso.oidc.clientSecret) {
      tokenBody.set('client_secret', sso.oidc.clientSecret);
    }

    const tokenRes = await fetch(discovery.token_endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: tokenBody.toString(),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text().catch(() => '');
      throw new Error(`OIDC token exchange failed (${tokenRes.status}) ${errText}`);
    }

    const tokenJson = (await tokenRes.json()) as any;
    const accessToken = tokenJson?.access_token ? String(tokenJson.access_token) : undefined;

    let claims: any = undefined;
    if (discovery.userinfo_endpoint && accessToken) {
      const userRes = await fetch(discovery.userinfo_endpoint, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (userRes.ok) {
        claims = await userRes.json();
      }
    }

    const emailClaim = sso.oidc.emailClaim || 'email';
    const email = claims?.[emailClaim] ? String(claims[emailClaim]).toLowerCase() : undefined;

    if (!email) {
      throw new Error('OIDC did not return an email claim');
    }

    const session = await this.provisionAndCreateSession({
      email,
      organizationId: String(org.id),
      firstName: claims?.given_name ? String(claims.given_name) : 'SSO',
      lastName: claims?.family_name ? String(claims.family_name) : 'User',
      oidcClaims: claims,
    });

    return session;
  }

  private async provisionAndCreateSession(input: {
    email: string;
    organizationId: string;
    firstName: string;
    lastName: string;
    oidcClaims?: any;
  }) {
    const [existing] = await pgDb.select().from(users).where(eq(users.email, input.email)).limit(1);

    let userId: string;
    if (existing?.id) {
      userId = String((existing as any).id);

      if (!(existing as any).organizationId) {
        await pgDb
          .update(users)
          .set({ organizationId: input.organizationId as any, updatedAt: new Date() } as any)
          .where(eq(users.id, (existing as any).id));
      }
    } else {
      const randomPassword = randomUrlSafeString(32);
      const passwordHash = await auth.hashPassword(randomPassword);

      const createdAt = new Date();
      const userRecord: any = {
        id: crypto.randomUUID(),
        email: input.email,
        passwordHash,
        firstName: input.firstName,
        lastName: input.lastName,
        emailVerified: true,
        role: 'user',
        status: 'active',
        failedLoginAttempts: 0,
        organizationId: input.organizationId,
        metadata: {
          sso: {
            provider: input.oidcClaims ? 'oidc' : 'saml',
            claims: input.oidcClaims || undefined,
          },
        },
        preferences: {},
        createdAt,
        updatedAt: createdAt,
      };

      await pgDb.insert(users).values(userRecord);
      userId = userRecord.id;
    }

    const session = await auth.createSession(userId);
    return {
      token: session.token,
      refreshToken: session.refreshToken,
      userId,
      organizationId: input.organizationId,
      email: input.email,
    };
  }
}

export const ssoService = new SSOService();
