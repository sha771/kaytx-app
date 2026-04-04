import crypto from 'crypto';
import axios, { AxiosInstance } from 'axios';

export type PlatformType = 'whatsapp' | 'instagram' | 'facebook' | 'linkedin' | 'twitter' | 'telegram' | 'signal' | 'slack';

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
  };

  constructor() {
    this.encryptionKey = process.env.ENCRYPTION_KEY || 'default-encryption-key-please-set-env-var';
    this.initializeApiClients();
  }

  private initializeApiClients() {
    const platforms: PlatformType[] = ['whatsapp', 'instagram', 'facebook', 'linkedin', 'twitter', 'telegram', 'signal', 'slack'];

    platforms.forEach(platform => {
      const config = this.oauthConfigs[platform];
      this.apiClients.set(
        platform,
        axios.create({
          baseURL: `https://api.${platform}.com/v1`,
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
      const response = await axios.post(config.tokenUrl, {
        grant_type: 'authorization_code',
        code,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: config.redirectUri,
      });

      this.oauthStates.delete(state);

      console.log(`[PlatformAuthService] OAuth exchange successful for ${platform}`);

      return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresIn: response.data.expires_in || 3600,
        scope: response.data.scope || config.scopes.join(' '),
      };
    } catch (error) {
      console.error(`[PlatformAuthService] OAuth exchange failed for ${platform}:`, error);
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
    credentials: any
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

      console.log(`[PlatformAuthService] Credentials stored for ${platform} (${userId})`);
      return true;
    } catch (error) {
      console.error('[PlatformAuthService] Failed to store credentials:', error);
      return false;
    }
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
        console.log(`[PlatformAuthService] Credentials expired for ${platformId}`);
      }

      const decryptedData = this.decryptCredentials(creds.encryptedData);
      return decryptedData;
    } catch (error) {
      console.error('[PlatformAuthService] Failed to retrieve credentials:', error);
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
      };

      const response = await client.get(validationEndpoints[platform], {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log(`[PlatformAuthService] Credentials validated for ${platform}`);
      return !!response.data;
    } catch (error) {
      console.error(`[PlatformAuthService] Credential validation failed for ${platform}:`, error);
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
      const response = await axios.post(config.tokenUrl, {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: config.clientId,
        client_secret: config.clientSecret,
      });

      console.log(`[PlatformAuthService] Token refreshed for ${platform}`);

      return {
        accessToken: response.data.access_token,
        expiresIn: response.data.expires_in || 3600,
      };
    } catch (error) {
      console.error(`[PlatformAuthService] Token refresh failed for ${platform}:`, error);
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

      console.log(`[PlatformAuthService] Disconnected ${platformId} for user ${userId}`);
      return true;
    } catch (error) {
      console.error('[PlatformAuthService] Failed to disconnect:', error);
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
      const key = crypto.createHash('sha256').update(this.encryptionKey).digest();
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

      const jsonData = JSON.stringify(data);
      let encrypted = cipher.update(jsonData, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      return iv.toString('hex') + ':' + encrypted;
    } catch (error) {
      console.error('[PlatformAuthService] Encryption failed:', error);
      throw error;
    }
  }

  private decryptCredentials(encryptedData: string): any {
    try {
      const [ivHex, encrypted] = encryptedData.split(':');
      const key = crypto.createHash('sha256').update(this.encryptionKey).digest();
      const iv = Buffer.from(ivHex, 'hex');
      const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return JSON.parse(decrypted);
    } catch (error) {
      console.error('[PlatformAuthService] Decryption failed:', error);
      throw error;
    }
  }
}

export const platformAuthService = new PlatformAuthService();
