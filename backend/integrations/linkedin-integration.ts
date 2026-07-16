/**
 * LinkedIn Integration Service
 * Handles LinkedIn OAuth 2.0, profile access, posts, and engagement via LinkedIn API v2
 */

export interface LinkedInPost {
  id: string;
  author: string;
  text: string;
  createdTime: string;
  likes: number;
  comments: number;
  visibility: 'PUBLIC' | 'CONNECTIONS';
  urn: string;
}

export interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  avatarUrl: string;
  vanityName: string;
}

export interface LinkedInComment {
  id: string;
  author: string;
  text: string;
  createdTime: string;
}

export interface LinkedInConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  accessToken: string;
  organizationId?: string;
  memberId: string;
}

export class LinkedInIntegrationService {
  private config: LinkedInConfig | null = null;
  private baseUrl = 'https://api.linkedin.com';
  private isInitialized = false;

  /** Build OAuth authorization URL */
  getAuthUrl(scopes = ['r_liteprofile', 'r_emailaddress', 'w_member_social', 'r_organization_social']): string {
    return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${this.config?.clientId}&redirect_uri=${encodeURIComponent(this.config?.redirectUri || '')}&scope=${scopes.join(' ')}&state=${Date.now()}`;
  }

  /** Exchange authorization code for access token */
  async exchangeCodeForToken(code: string): Promise<{ accessToken: string; expiresIn: number; refreshToken?: string }> {
    if (!this.config) throw new Error('Not configured');
    const res = await fetch(
      `${this.baseUrl}/oauth/v2/accessToken`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.config.redirectUri,
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`LinkedIn OAuth failed: ${data.error_description}`);
    return { accessToken: data.access_token, expiresIn: data.expires_in, refreshToken: data.refresh_token };
  }

  async initialize(config: LinkedInConfig): Promise<void> {
    this.config = config;
    this.isInitialized = true;
    console.log(`LinkedIn integration initialized for member: ${config.memberId}`);
  }

  /** Fetch the authenticated member's profile */
  async getProfile(): Promise<LinkedInProfile> {
    this.ensureInitialized();
    const res = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${this.config!.accessToken}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`LinkedIn profile fetch failed: ${data.error}`);
    return {
      id: data.sub,
      firstName: data.given_name || '',
      lastName: data.family_name || '',
      headline: data.name || '',
      avatarUrl: data.picture || '',
      vanityName: '',
    };
  }

  /** Create a post (as member) */
  async createPost(text: string, options?: { visibility?: 'PUBLIC' | 'CONNECTIONS'; article?: { title: string; url: string } }): Promise<{ postId: string }> {
    this.ensureInitialized();
    const body: Record<string, unknown> = {
      author: `urn:li:person:${this.config!.memberId}`,
      commentary: text,
      visibility: options?.visibility || 'PUBLIC',
      distribution: { feedDistribution: 'MAIN_FEED' },
      lifecycleState: 'PUBLISHED',
    };
    if (options?.article) {
      body['content'] = { article: { title: options.article.title, source: options.article.url } };
    }

    const res = await fetch(`${this.baseUrl}/v2/ugcPosts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.config!.accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`LinkedIn post creation failed: ${data.message}`);
    return { postId: data.id };
  }

  /** Get comments on a post */
  async getComments(postUrn: string, limit = 25): Promise<LinkedInComment[]> {
    this.ensureInitialized();
    const res = await fetch(
      `${this.baseUrl}/v2/socialActions/${postUrn}/comments?count=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${this.config!.accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
        },
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`LinkedIn comments fetch failed: ${data.message}`);
    return (data.elements || []).map((c: Record<string, unknown>) => {
      const message = c['message'] as Record<string, unknown> | undefined;
      const created = c['created'] as Record<string, unknown> | undefined;
      return {
        id: String(c['actor'] ?? ''),
        author: String(c['actor'] ?? ''),
        text: (message?.['text'] as string) || '',
        createdTime: (created?.['time'] as string) || '',
      };
    });
  }

  /** Reply to a social action (post/comment) */
  async replyToPost(parentSocialUrn: string, text: string): Promise<{ commentId: string }> {
    this.ensureInitialized();
    const res = await fetch(`${this.baseUrl}/v2/socialActions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.config!.accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify({
        actor: `urn:li:person:${this.config!.memberId}`,
        object: parentSocialUrn,
        message: { text },
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`LinkedIn reply failed: ${data.message}`);
    return { commentId: data.id };
  }

  /** Fetch organization posts (requires r_organization_social) */
  async getOrganizationPosts(limit = 10): Promise<LinkedInPost[]> {
    this.ensureInitialized();
    if (!this.config!.organizationId) throw new Error('Organization ID not configured');

    const res = await fetch(
      `${this.baseUrl}/v2/ugcPosts?q=authors&authors=urn:li:organization:${this.config!.organizationId}&count=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${this.config!.accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
        },
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`LinkedIn org posts fetch failed: ${data.message}`);
    return (data.elements || []).map((p: Record<string, unknown>) => {
      const commentary = p['commentary'] as Record<string, unknown> | undefined;
      const created = p['created'] as Record<string, unknown> | undefined;
      return {
        id: String(p['id'] ?? ''),
        author: String(p['author'] ?? ''),
        text: (commentary?.['text'] as string) || '',
        createdTime: (created?.['time'] as string) || '',
        likes: 0,
        comments: 0,
        visibility: 'PUBLIC',
        urn: String(p['id'] ?? ''),
      };
    });
  }

  private ensureInitialized(): void {
    if (!this.isInitialized || !this.config) {
      throw new Error('LinkedIn integration not initialized');
    }
  }
}
