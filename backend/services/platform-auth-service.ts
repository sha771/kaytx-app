import crypto from 'crypto';
import axios, { AxiosInstance } from 'axios';
import { db as pgDb } from '../db/connection';
import { platformConnections } from '../db/drizzle-schema';
import { and, eq } from 'drizzle-orm';
import { encrypt as encryptGcm, decrypt as decryptGcm } from '../lib/encryption';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

export type PlatformType = 'whatsapp' | 'instagram' | 'facebook' | 'linkedin' | 'twitter' | 'telegram' | 'signal' | 'slack' | 'salesforce' | 'hubspot' | 'microsoft_teams' | 'google_workspace' | 'zoom' | 'calendly' | 'stripe' | 'zendesk' | 'shopify';

interface PlatformCredentials {
  platformId: string;
  userId: string;
  email: string;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
  phoneNumber?: string;
  businessAccountId?: string;
  webhookUrl?: string;
  encryptedData: string;
  createdAt: Date;
  lastValidated: Date;
}

interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  authorizationUrl: string;
  tokenUrl: string;
  scopes: string[];
}

interface OAuthState {
  state: string;
  platformId: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
}

export class PlatformAuthService {
  private credentialsStore: Map<string, PlatformCredentials> = new Map();
  private oauthStates: Map<string, OAuthState> = new Map();
  private apiClients: Map<PlatformType, AxiosInstance> = new Map();
  private encryptionKey: string;

  private oauthConfigs: Record<PlatformType, OAuthConfig> = {
    whatsapp: {
      clientId: process.env.WHATSAPP_CLIENT_ID || '',
      clientSecret: process.env.WHATSAPP_CLIENT_SECRET || '',
      redirectUri: process.env.WHATSAPP_REDIRECT_URI || 'https://api.rork.app/oauth/whatsapp/callback',
      authorizationUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
      tokenUrl: 'https://graph.instagram.com/v18.0/oauth/access_token',
      scopes: ['whatsapp_business_messaging', 'whatsapp_business_management'],
    },
    instagram: {
      clientId: process.env.INSTAGRAM_CLIENT_ID || '',
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || '',
      redirectUri: process.env.INSTAGRAM_REDIRECT_URI || 'https://api.rork.app/oauth/instagram/callback',
      authorizationUrl: 'https://api.instagram.com/oauth/authorize',
      tokenUrl: 'https://graph.instagram.com/v18.0/oauth/access_token',
      scopes: ['user_profile', 'user_media', 'instagram_basic', 'instagram_graph_user_profile'],
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
      redirectUri: process.env.FACEBOOK_REDIRECT_URI || 'https://api.rork.app/oauth/facebook/callback',
      authorizationUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
      tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
      scopes: ['email', 'public_profile', 'pages_manage_metadata', 'pages_read_engagement'],
    },
    linkedin: {
      clientId: process.env.LINKEDIN_CLIENT_ID || '',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
      redirectUri: process.env.LINKEDIN_REDIRECT_URI || 'https://api.rork.app/oauth/linkedin/callback',
      authorizationUrl: 'https://www.linkedin.com/oauth/v2/authorization',
      tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
      scopes: ['openid', 'profile', 'email', 'r_basicprofile', 'r_emailaddress'],
    },
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID || '',
      clientSecret: process.env.TWITTER_CLIENT_SECRET || '',
      redirectUri: process.env.TWITTER_REDIRECT_URI || 'https://api.rork.app/oauth/twitter/callback',
      authorizationUrl: 'https://twitter.com/i/oauth2/authorize',
      tokenUrl: 'https://twitter.com/2/oauth2/token',
      scopes: ['tweet.read', 'tweet.write', 'users.read', 'follows.read', 'follows.write'],
    },
    telegram: {
      clientId: process.env.TELEGRAM_CLIENT_ID || '',
      clientSecret: process.env.TELEGRAM_CLIENT_SECRET || '',
      redirectUri: process.env.TELEGRAM_REDIRECT_URI || 'https://api.rork.app/oauth/telegram/callback',
      authorizationUrl: 'https://oauth.telegram.org/login',
      tokenUrl: 'https://oauth.telegram.org/token',
      scopes: ['user:email'],
    },
    signal: {
      clientId: process.env.SIGNAL_CLIENT_ID || '',
      clientSecret: process.env.SIGNAL_CLIENT_SECRET || '',
      redirectUri: process.env.SIGNAL_REDIRECT_URI || 'https://api.rork.app/oauth/signal/callback',
      authorizationUrl: 'https://signal.org/oauth/authorize',
      tokenUrl: 'https://signal.org/oauth/token',
      scopes: ['messaging', 'contacts'],
    },
    slack: {
      clientId: process.env.SLACK_CLIENT_ID || '',
      clientSecret: process.env.SLACK_CLIENT_SECRET || '',
      redirectUri: process.env.SLACK_REDIRECT_URI || 'https://api.rork.app/oauth/slack/callback',
      authorizationUrl: 'https://slack.com/oauth_authorize',
      tokenUrl: 'https://slack.com/api/oauth.v2.access',
      scopes: ['chat:write', 'users:read', 'channels:read', 'groups:read', 'im:read'],
    },
    salesforce: {
      clientId: process.env.SALESFORCE_CLIENT_ID || '',
      clientSecret: process.env.SALESFORCE_CLIENT_SECRET || '',
      redirectUri: process.env.SALESFORCE_REDIRECT_URI || 'https://api.rork.app/oauth/salesforce/callback',
      authorizationUrl: 'https://login.salesforce.com/services/oauth2/authorize',
      tokenUrl: 'https://login.salesforce.com/services/oauth2/token',
      scopes: ['api', 'refresh_token', 'web'],
    },
    hubspot: {
      clientId: process.env.HUBSPOT_CLIENT_ID || '',
      clientSecret: process.env.HUBSPOT_CLIENT_SECRET || '',
      redirectUri: process.env.HUBSPOT_REDIRECT_URI || 'https://api.rork.app/oauth/hubspot/callback',
      authorizationUrl: 'https://app.hubspot.com/oauth/authorize',
      tokenUrl: 'https://api.hubapi.com/oauth/v1/token',
      scopes: ['crm.objects.contacts.read', 'crm.objects.companies.read', 'crm.objects.deals.read', 'crm.lists.read', 'crm.lists.write'],
    },
    microsoft_teams: {
      clientId: process.env.MICROSOFT_TEAMS_CLIENT_ID || '',
      clientSecret: process.env.MICROSOFT_TEAMS_CLIENT_SECRET || '',
      redirectUri: process.env.MICROSOFT_TEAMS_REDIRECT_URI || 'https://api.rork.app/oauth/microsoft_teams/callback',
      authorizationUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      scopes: ['https://graph.microsoft.com/Chat.ReadWrite', 'https://graph.microsoft.com/User.Read', 'https://graph.microsoft.com/Team.ReadBasic.All'],
    },
    google_workspace: {
      clientId: process.env.GOOGLE_WORKSPACE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_WORKSPACE_CLIENT_SECRET || '',
      redirectUri: process.env.GOOGLE_WORKSPACE_REDIRECT_URI || 'https://api.rork.app/oauth/google_workspace/callback',
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenUrl: 'https://oauth2.googleapis.com/token',
      scopes: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/drive.readonly'],
    },
    zoom: {
      clientId: process.env.ZOOM_CLIENT_ID || '',
      clientSecret: process.env.ZOOM_CLIENT_SECRET || '',
      redirectUri: process.env.ZOOM_REDIRECT_URI || 'https://api.rork.app/oauth/zoom/callback',
      authorizationUrl: 'https://zoom.us/oauth/authorize',
      tokenUrl: 'https://zoom.us/oauth/token',
      scopes: ['user:read', 'meeting:read', 'webinar:read', 'user_info:read'],
    },
    calendly: {
      clientId: process.env.CALENDLY_CLIENT_ID || '',
      clientSecret: process.env.CALENDLY_CLIENT_SECRET || '',
      redirectUri: process.env.CALENDLY_REDIRECT_URI || 'https://api.rork.app/oauth/calendly/callback',
      authorizationUrl: 'https://auth.calendly.com/oauth/authorize',
      tokenUrl: 'https://auth.calendly.com/oauth/token',
      scopes: ['default'],
    },
    stripe: {
      clientId: process.env.STRIPE_CLIENT_ID || '',
      clientSecret: process.env.STRIPE_CLIENT_SECRET || '',
      redirectUri: process.env.STRIPE_REDIRECT_URI || 'https://api.rork.app/oauth/stripe/callback',
      authorizationUrl: 'https://connect.stripe.com/oauth/authorize',
      tokenUrl: 'https://connect.stripe.com/oauth/token',
      scopes: ['read_write'],
    },
  };

  constructor() {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const isProduction = nodeEnv === 'production';
    const envKey = process.env.ENCRYPTION_KEY || '';
    if (isProduction && !envKey) {
      throw new Error('ENCRYPTION_KEY is required in production');
    }
    if (!envKey) {
      this.encryptionKey = crypto.randomBytes(32).toString('hex');
      logger.warn('[PlatformAuthService] ENCRYPTION_KEY not set; using generated key for non-production environment');
    } else {
      this.encryptionKey = envKey;
    }
    this.initializeApiClients();
  }

  private getDerivedEncryptionKeyHex(): string {
    return crypto.createHash('sha256').update(this.encryptionKey).digest('hex');
  }

  private async withRetry<T>(fn: () => Promise<T>, options?: { retries?: number; baseDelayMs?: number }): Promise<T> {
    const retries = options?.retries ?? 3;
    const baseDelayMs = options?.baseDelayMs ?? 500;

    let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (error: any) {
        lastError = error;
        const status = error?.response?.status;
        const retriable = status === 429 || (typeof status === 'number' && status >= 500);
        if (!retriable || attempt === retries) {
          throw error;
        }

        const retryAfterHeader = error?.response?.headers?.['retry-after'];
        const retryAfterSeconds = retryAfterHeader ? Number(retryAfterHeader) : NaN;
        const retryAfterMs = Number.isFinite(retryAfterSeconds) ? retryAfterSeconds * 1000 : 0;
        const backoffMs = baseDelayMs * Math.pow(2, attempt);
        const delayMs = Math.max(retryAfterMs, backoffMs);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }

    throw lastError instanceof Error ? lastError : new Error('Request failed after retries');
  }

  private initializeApiClients() {
    const platforms: PlatformType[] = ['whatsapp', 'instagram', 'facebook', 'linkedin', 'twitter', 'telegram', 'signal', 'slack', 'salesforce', 'hubspot', 'microsoft_teams', 'google_workspace', 'zoom', 'calendly', 'stripe'];

    platforms.forEach(platform => {
      const config = this.oauthConfigs[platform];
      let baseURL: string;

      // Set platform-specific base URLs
      switch (platform) {
        case 'salesforce':
          baseURL = 'https://login.salesforce.com/services/data/v56.0';
          break;
        case 'hubspot':
          baseURL = 'https://api.hubapi.com';
          break;
        case 'microsoft_teams':
          baseURL = 'https://graph.microsoft.com/v1.0';
          break;
        case 'google_workspace':
          baseURL = 'https://www.googleapis.com';
          break;
        case 'zoom':
          baseURL = 'https://api.zoom.us/v2';
          break;
        case 'calendly':
          baseURL = 'https://api.calendly.com';
          break;
        case 'stripe':
          baseURL = 'https://api.stripe.com/v1';
          break;
        default:
          baseURL = `https://api.${platform}.com/v1`;
      }

      this.apiClients.set(
        platform,
        axios.create({
          baseURL,
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
    });
  }

  /**
   * Generate OAuth URL for platform authentication
   */
  generateOAuthUrl(platform: PlatformType, userId: string): string {
    const config = this.oauthConfigs[platform];
    const state = this.generateOAuthState(platform, userId);

    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: 'code',
      state,
      scope: config.scopes.join(' '),
    });

    return `${config.authorizationUrl}?${params.toString()}`;
  }

  /**
   * Exchange OAuth code for tokens
   */
  async exchangeOAuthCode(platform: PlatformType, code: string, state: string): Promise<{
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;
    scope: string;
  }> {
    try {
      const oauthState = this.oauthStates.get(state);

      if (!oauthState || oauthState.expiresAt < new Date()) {
        throw new Error('Invalid or expired OAuth state');
      }

      const config = this.oauthConfigs[platform];
      const response = await this.withRetry(() => axios.post(config.tokenUrl, {
        grant_type: 'authorization_code',
        code,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: config.redirectUri,
      }));

      this.oauthStates.delete(state);

      logger.info(`OAuth exchange successful for ${platform}`);

      return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresIn: response.data.expires_in || 3600,
        scope: response.data.scope || config.scopes.join(' '),
      };
    } catch (error) {
      logger.error(`OAuth exchange failed for ${platform}:`, error);
      throw new Error(`Failed to exchange OAuth code for ${platform}`);
    }
  }

  /**
   * Store encrypted platform credentials
   */
  async storeCredentials(
    platformId: string,
    platform: PlatformType,
    userId: string,
    credentials: any,
    options?: { organizationId?: string }
  ): Promise<boolean> {
    try {
      const encryptedData = this.encryptCredentials(credentials);
      const key = `${userId}:${platformId}`;

      const platformCreds: PlatformCredentials = {
        platformId,
        userId,
        email: credentials.email || '',
        accessToken: credentials.accessToken,
        refreshToken: credentials.refreshToken,
        expiresAt: credentials.expiresAt || new Date(Date.now() + 3600000),
        phoneNumber: credentials.phoneNumber,
        businessAccountId: credentials.businessAccountId,
        encryptedData,
        createdAt: new Date(),
        lastValidated: new Date(),
      };

      this.credentialsStore.set(key, platformCreds);

      if (options?.organizationId) {
        const [existing] = await pgDb
          .select()
          .from(platformConnections)
          .where(and(eq(platformConnections.organizationId, options.organizationId as any), eq(platformConnections.platform, platform)))
          .limit(1);

        const existingMetadata = (existing as any)?.metadata || {};
        const mergedMetadata = {
          ...existingMetadata,
          credentialRef: key,
          encryptedCredentials: encryptedData,
          expiresAt: platformCreds.expiresAt ? platformCreds.expiresAt.toISOString() : undefined,
          lastValidated: platformCreds.lastValidated.toISOString(),
        };

        await pgDb
          .insert(platformConnections)
          .values({
            organizationId: options.organizationId as any,
            platform,
            isActive: Boolean((existing as any)?.isActive),
            metadata: mergedMetadata,
            lastSyncAt: (existing as any)?.lastSyncAt || null,
          } as any)
          .onConflictDoUpdate({
            target: [platformConnections.organizationId, platformConnections.platform],
            set: {
              metadata: mergedMetadata,
              updatedAt: new Date(),
            },
          });
      }

      logger.info(`Credentials stored for ${platform} (${userId})`);
      return true;
    } catch (error) {
      logger.error('[PlatformAuthService] Failed to store credentials:', error);
      return false;
    }
  }

  async retrieveCredentialsForOrg(organizationId: string, platform: PlatformType): Promise<any> {
    const [row] = await pgDb
      .select()
      .from(platformConnections)
      .where(and(eq(platformConnections.organizationId, organizationId as any), eq(platformConnections.platform, platform)))
      .limit(1);

    const meta = (row as any)?.metadata || {};
    const encryptedCredentials = meta.encryptedCredentials;
    if (!encryptedCredentials || typeof encryptedCredentials !== 'string') {
      return null;
    }

    const decrypted = this.decryptCredentials(encryptedCredentials);
    return decrypted;
  }

  async ensureValidCredentialsForOrg(organizationId: string, platform: PlatformType): Promise<any> {
    const [row] = await pgDb
      .select()
      .from(platformConnections)
      .where(and(eq(platformConnections.organizationId, organizationId as any), eq(platformConnections.platform, platform)))
      .limit(1);

    if (!row) return null;

    const meta = (row as any).metadata || {};
    const encryptedCredentials = meta.encryptedCredentials;
    if (!encryptedCredentials || typeof encryptedCredentials !== 'string') {
      return null;
    }

    const decrypted = this.decryptCredentials(encryptedCredentials);
    const expiresAtIso = decrypted?.expiresAt || meta?.expiresAt;
    const expiresAtMs = expiresAtIso ? Date.parse(String(expiresAtIso)) : NaN;

    if (Number.isFinite(expiresAtMs) && expiresAtMs > Date.now() + 30_000) {
      return decrypted;
    }

    const refreshToken = decrypted?.refreshToken;
    if (!refreshToken) {
      const mergedMetadata = { ...meta, status: 'reauth_required' };
      await pgDb
        .update(platformConnections)
        .set({ isActive: false, metadata: mergedMetadata as any, updatedAt: new Date() } as any)
        .where(and(eq(platformConnections.organizationId, organizationId as any), eq(platformConnections.platform, platform)));
      return null;
    }

    const refreshed = await this.refreshAccessToken(platform, refreshToken);
    if (!refreshed) {
      const mergedMetadata = { ...meta, status: 'reauth_required' };
      await pgDb
        .update(platformConnections)
        .set({ isActive: false, metadata: mergedMetadata as any, updatedAt: new Date() } as any)
        .where(and(eq(platformConnections.organizationId, organizationId as any), eq(platformConnections.platform, platform)));
      return null;
    }

    const newCreds = {
      ...decrypted,
      accessToken: refreshed.accessToken,
      expiresAt: new Date(Date.now() + refreshed.expiresIn * 1000).toISOString(),
    };

    const reEncrypted = this.encryptCredentials(newCreds);
    const mergedMetadata = {
      ...meta,
      status: 'active',
      encryptedCredentials: reEncrypted,
      expiresAt: newCreds.expiresAt,
      lastValidated: new Date().toISOString(),
    };

    await pgDb
      .update(platformConnections)
      .set({ isActive: true, metadata: mergedMetadata as any, updatedAt: new Date() } as any)
      .where(and(eq(platformConnections.organizationId, organizationId as any), eq(platformConnections.platform, platform)));

    return newCreds;
  }

  /**
   * Retrieve decrypted platform credentials
   */
  async retrieveCredentials(userId: string, platformId: string): Promise<any> {
    try {
      const key = `${userId}:${platformId}`;
      const creds = this.credentialsStore.get(key);

      if (!creds) {
        return null;
      }

      // Check if token is expired
      if (creds.expiresAt && creds.expiresAt < new Date()) {
        // Token expired, might need refresh
        logger.info(`Credentials expired for ${platformId}`);
      }

      const decryptedData = this.decryptCredentials(creds.encryptedData);
      return decryptedData;
    } catch (error) {
      logger.error('[PlatformAuthService] Failed to retrieve credentials:', error);
      return null;
    }
  }

  /**
   * Validate platform credentials with a test API call
   */
  async validateCredentials(platform: PlatformType, accessToken: string): Promise<boolean> {
    try {
      const client = this.apiClients.get(platform);
      if (!client) return false;

      // Each platform has different validation endpoints
      const validationEndpoints: Record<PlatformType, string> = {
        whatsapp: '/me',
        instagram: '/me',
        facebook: '/me',
        linkedin: '/me',
        twitter: '/2/users/me',
        telegram: '/getMe',
        signal: '/profile',
        slack: '/auth.test',
        salesforce: '/sobjects/user/info',
        hubspot: '/crm/v3/objects/contacts',
        microsoft_teams: '/me',
        google_workspace: '/oauth2/v2/userinfo',
        zoom: '/users/me',
        calendly: '/users/me',
        stripe: '/account',
      };

      const response = await this.withRetry(() => client.get(validationEndpoints[platform], {
        headers: { Authorization: `Bearer ${accessToken}` },
      }));

      logger.info(`Credentials validated for ${platform}`);
      return !!response.data;
    } catch (error) {
      logger.error(`Credential validation failed for ${platform}:`, error);
      return false;
    }
  }

  /**
   * Refresh access token
   */
  async refreshAccessToken(
    platform: PlatformType,
    refreshToken: string
  ): Promise<{ accessToken: string; expiresIn: number } | null> {
    try {
      const config = this.oauthConfigs[platform];
      const response = await this.withRetry(() => axios.post(config.tokenUrl, {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: config.clientId,
        client_secret: config.clientSecret,
      }));

      logger.info(`Token refreshed for ${platform}`);

      return {
        accessToken: response.data.access_token,
        expiresIn: response.data.expires_in || 3600,
      };
    } catch (error) {
      logger.error(`Token refresh failed for ${platform}:`, error);
      return null;
    }
  }

  /**
   * Disconnect platform account
   */
  async disconnect(userId: string, platformId: string): Promise<boolean> {
    try {
      const key = `${userId}:${platformId}`;
      this.credentialsStore.delete(key);

      logger.info(`Disconnected ${platformId} for user ${userId}`);
      return true;
    } catch (error) {
      logger.error('[PlatformAuthService] Failed to disconnect:', error);
      return false;
    }
  }

  /**
   * Get list of connected platforms for user
   */
  getConnectedPlatforms(userId: string): string[] {
    const platforms: string[] = [];

    this.credentialsStore.forEach((creds, key) => {
      const [storedUserId] = key.split(':');
      if (storedUserId === userId) {
        platforms.push(creds.platformId);
      }
    });

    return platforms;
  }

  // Private helper methods

  private generateOAuthState(platform: PlatformType, userId: string): string {
    const state = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    this.oauthStates.set(state, {
      state,
      platformId: platform,
      userId,
      createdAt: new Date(),
      expiresAt,
    });

    // Auto-cleanup expired states
    setTimeout(() => {
      this.oauthStates.delete(state);
    }, 10 * 60 * 1000);

    return state;
  }

  private encryptCredentials(data: any): string {
    try {
      const jsonData = JSON.stringify(data);

      const derivedKeyHex = this.getDerivedEncryptionKeyHex();
      const { encrypted, iv, authTag } = encryptGcm(jsonData, derivedKeyHex);
      return `${iv}:${authTag}:${encrypted}`;
    } catch (error) {
      logger.error('[PlatformAuthService] Encryption failed:', error);
      throw new Error('Failed to encrypt credentials');
    }
  }

  private decryptCredentials(encryptedData: string): any {
    try {
      const parts = encryptedData.split(':');

      if (parts.length === 3) {
        const ivHex = parts[0];
        const authTagHex = parts[1];
        const encrypted = parts[2];

        if (!ivHex || !authTagHex || !encrypted) {
          throw new Error('Invalid encrypted credentials format');
        }

        const derivedKeyHex = this.getDerivedEncryptionKeyHex();
        const decrypted = decryptGcm(encrypted, derivedKeyHex, ivHex, authTagHex);
        return JSON.parse(decrypted);
      }

      if (parts.length === 2) {
        const ivHex = parts[0];
        const encrypted = parts[1];

        if (!ivHex || !encrypted) {
          throw new Error('Invalid encrypted credentials format');
        }

        const key = crypto.createHash('sha256').update(this.encryptionKey).digest();
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return JSON.parse(decrypted);
      }

      throw new Error('Invalid encrypted credentials format');
    } catch (error) {
      logger.error('[PlatformAuthService] Decryption failed:', error);
      throw new Error('Failed to decrypt credentials');
    }
  }
}

export const platformAuthService = new PlatformAuthService();
