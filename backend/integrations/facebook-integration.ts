/**
 * Facebook Business Integration
 * Handles Facebook pages, posts, comments, and messaging via Meta Graph API
 */

export interface FacebookPost {
  id: string;
  message?: string;
  createdTime: string;
  fullUrl: string;
  likes: { count: number };
  comments: { count: number };
  shares?: { count: number };
}

export interface FacebookPage {
  id: string;
  name: string;
  category: string;
  accessToken: string;
  fanCount: number;
}

export interface FacebookConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  pageAccessToken: string;
  pageId: string;
  verifyToken: string;
  appId: string;
}

export class FacebookIntegrationService {
  private config: FacebookConfig | null = null;
  private baseUrl = 'https://graph.facebook.com';
  private apiVersion = 'v21.0';
  private isInitialized = false;

  /** Build OAuth URL for page permissions */
  getAuthUrl(scopes = ['pages_manage_posts', 'pages_read_engagement', 'pages_messaging']): string {
    return `https://www.facebook.com/${this.apiVersion}/dialog/oauth?client_id=${this.config?.appId}&redirect_uri=${this.config?.redirectUri}&scope=${scopes.join(',')}&response_type=code`;
  }

  /** Exchange code for page access token */
  async exchangeCodeForToken(code: string): Promise<{ accessToken: string; expiresIn: number }> {
    if (!this.config) throw new Error('Not configured');
    const res = await fetch(
      `${this.baseUrl}/${this.apiVersion}/oauth/access_token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          redirect_uri: this.config.redirectUri,
          code,
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`Facebook OAuth failed: ${data.error?.message}`);
    return { accessToken: data.access_token, expiresIn: data.expires_in };
  }

  async initialize(config: FacebookConfig): Promise<void> {
    this.config = config;
    this.isInitialized = true;
    console.log(`Facebook integration initialized for page: ${config.pageId}`);
  }

  /** Verify webhook subscription */
  verifyWebhook(mode: string, token: string, challenge: string): string | null {
    if (!this.config) return null;
    if (mode === 'subscribe' && token === this.config.verifyToken) {
      return challenge;
    }
    return null;
  }

  /** Fetch recent page posts */
  async getRecentPosts(limit = 10): Promise<FacebookPost[]> {
    this.ensureInitialized();
    const res = await fetch(
      `${this.baseUrl}/${this.apiVersion}/${this.config!.pageId}/posts?fields=id,message,created_time,permalink_url,likes.limit(0).summary(true),comments.limit(0).summary(true),shares&limit=${limit}&access_token=${this.config!.pageAccessToken}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`Facebook posts fetch failed: ${data.error?.message}`);
    return (data.data || []).map((p: Record<string, unknown>) => ({
      id: p.id as string,
      message: p.message as string,
      createdTime: p.created_time as string,
      fullUrl: p.permalink_url as string,
      likes: { count: (p.likes as Record<string, unknown>)?.summary?.total_count as number || 0 },
      comments: { count: (p.comments as Record<string, unknown>)?.summary?.total_count as number || 0 },
      shares: p.shares ? { count: (p.shares as Record<string, unknown>).count as number } : undefined,
    }));
  }

  /** Create a new page post */
  async createPost(message: string, options?: { link?: string; imageUrl?: string; published?: boolean }): Promise<{ postId: string }> {
    this.ensureInitialized();
    const body: Record<string, unknown> = {
      message,
      access_token: this.config!.pageAccessToken,
      published: options?.published !== false,
    };
    if (options?.link) body.link = options.link;
    if (options?.imageUrl) body.url = options.imageUrl;

    const res = await fetch(
      `${this.baseUrl}/${this.apiVersion}/${this.config!.pageId}/feed`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`Facebook post creation failed: ${data.error?.message}`);
    return { postId: data.id };
  }

  /** Get comments on a post */
  async getComments(postId: string, limit = 25): Promise<Array<{ id: string; message: string; from: { name: string; id: string }; createdTime: string }>> {
    this.ensureInitialized();
    const res = await fetch(
      `${this.baseUrl}/${this.apiVersion}/${postId}/comments?fields=id,message,from,created_time&limit=${limit}&access_token=${this.config!.pageAccessToken}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`Facebook comments fetch failed: ${data.error?.message}`);
    return data.data || [];
  }

  /** Reply to a comment */
  async replyToComment(commentId: string, message: string): Promise<{ id: string }> {
    this.ensureInitialized();
    const res = await fetch(
      `${this.baseUrl}/${this.apiVersion}/${commentId}/comments`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, access_token: this.config!.pageAccessToken }),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`Facebook reply failed: ${data.error?.message}`);
    return { id: data.id };
  }

  /** Get page insights */
  async getPageInsights(metrics = ['page_impressions', 'page_engaged_users', 'page_followers']): Promise<Array<{ metric: string; values: Array<{ value: number; endTime: string }> }>> {
    this.ensureInitialized();
    const res = await fetch(
      `${this.baseUrl}/${this.apiVersion}/${this.config!.pageId}/insights?metric=${metrics.join(',')}&period=days_28&access_token=${this.config!.pageAccessToken}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`Facebook insights fetch failed: ${data.error?.message}`);
    return data.data || [];
  }

  /** Parse incoming webhook for page messages */
  parseWebhookPayload(body: unknown): Array<{ senderId: string; message: string; timestamp: string }> {
    const payload = body as Record<string, unknown>;
    const entries = payload?.entry as Array<Record<string, unknown>> | undefined;
    if (!entries) return [];

    const messages: Array<{ senderId: string; message: string; timestamp: string }> = [];
    for (const entry of entries) {
      const messaging = entry?.messaging as Array<Record<string, unknown>> | undefined;
      for (const msg of messaging || []) {
        const sender = msg.sender as Record<string, unknown> | undefined;
        const message = msg.message as Record<string, unknown> | undefined;
        if (sender && message) {
          messages.push({
            senderId: sender.id as string,
            message: (message.text || message.attachments || '') as string,
            timestamp: String(msg.timestamp || Date.now()),
          });
        }
      }
    }
    return messages;
  }

  private ensureInitialized(): void {
    if (!this.isInitialized || !this.config) {
      throw new Error('Facebook integration not initialized');
    }
  }
}
