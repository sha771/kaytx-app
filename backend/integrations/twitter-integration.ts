/**
 * Twitter (X) Integration Service
 * Handles Twitter OAuth 2.0, tweets, timelines, and engagement via Twitter API v2
 */

export interface TwitterTweet {
  id: string;
  text: string;
  authorId: string;
  createdAt: string;
  publicMetrics: {
    likeCount: number;
    retweetCount: number;
    replyCount: number;
    quoteCount: number;
    impressionCount: number;
  };
  conversationId?: string;
  inReplyToUserId?: string;
  attachments?: { media_keys: string[] };
}

export interface TwitterUser {
  id: string;
  name: string;
  username: string;
  description: string;
  profileImageUrl: string;
  publicMetrics: { followersCount: number; followingCount: number; tweetCount: number };
  verified: boolean;
}

export interface TwitterConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  accessToken: string;
  refreshToken?: string;
}

export class TwitterIntegrationService {
  private config: TwitterConfig | null = null;
  private baseUrl = 'https://api.twitter.com/2';
  private isInitialized = false;

  /** Build OAuth 2.0 authorization URL (code flow) */
  getAuthUrl(scopes = ['tweet.read', 'tweet.write', 'users.read', 'offline.access']): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.config?.clientId || '',
      redirect_uri: this.config?.redirectUri || '',
      scope: scopes.join(' '),
      state: String(Date.now()),
      code_challenge: 'challenge',
      code_challenge_method: 'plain',
    });
    return `https://twitter.com/i/oauth2/authorize?${params.toString()}`;
  }

  /** Exchange authorization code for access token */
  async exchangeCodeForToken(code: string): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }> {
    if (!this.config) throw new Error('Not configured');
    const res = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(`${this.config.clientId}:${this.config.clientSecret}`).toString('base64'),
      },
      body: new URLSearchParams({
        code,
        grant_type: 'authorization_code',
        redirect_uri: this.config.redirectUri,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`Twitter OAuth failed: ${data.error_description}`);
    return { accessToken: data.access_token, refreshToken: data.refresh_token, expiresIn: data.expires_in };
  }

  async initialize(config: TwitterConfig): Promise<void> {
    this.config = config;
    this.isInitialized = true;
    console.log('Twitter integration initialized');
  }

  /** Get authenticated user info */
  async getMe(): Promise<TwitterUser> {
    this.ensureInitialized();
    const res = await fetch(`${this.baseUrl}/users/me?user.fields=description,profile_image_url,public_metrics,verified`, {
      headers: { Authorization: `Bearer ${this.config!.accessToken}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`Twitter user fetch failed: ${data.detail || data.title}`);
    const user = data.data;
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      description: user.description || '',
      profileImageUrl: user.profile_image_url || '',
      publicMetrics: user.public_metrics || { followersCount: 0, followingCount: 0, tweetCount: 0 },
      verified: user.verified || false,
    };
  }

  /** Create a tweet */
  async createTweet(text: string, options?: { replyTo?: string; media?: { media_ids: string[] } }): Promise<{ tweetId: string }> {
    this.ensureInitialized();
    const body: Record<string, unknown> = { text };
    if (options?.replyTo) body.reply = { in_reply_to_tweet_id: options.replyTo };
    if (options?.media) body.media = options.media;

    const res = await fetch(`${this.baseUrl}/tweets`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.config!.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`Tweet creation failed: ${data.detail || data.title}`);
    return { tweetId: data.data?.id || data.id };
  }

  /** Delete a tweet */
  async deleteTweet(tweetId: string): Promise<void> {
    this.ensureInitialized();
    const res = await fetch(`${this.baseUrl}/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${this.config!.accessToken}` },
    });
    if (!res.ok && res.status !== 204) {
      throw new Error(`Tweet deletion failed: ${res.status}`);
    }
  }

  /** Get user's recent tweets */
  async getMyTweets(limit = 10): Promise<TwitterTweet[]> {
    this.ensureInitialized();
    const me = await this.getMe();
    const res = await fetch(
      `${this.baseUrl}/users/${me.id}/tweets?max_results=${limit}&tweet.fields=created_at,public_metrics,conversation_id,in_reply_to_user_id,attachments&expansions=author_id&user.fields=username`,
      {
        headers: { Authorization: `Bearer ${this.config!.accessToken}` },
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`Twitter tweets fetch failed: ${data.detail || data.title}`);
    return (data.data || []).map((t: Record<string, unknown>) => ({
      id: t.id as string,
      text: t.text as string,
      authorId: t.author_id as string,
      createdAt: t.created_at as string,
      publicMetrics: (t.public_metrics as TwitterTweet['publicMetrics']) || { likeCount: 0, retweetCount: 0, replyCount: 0, quoteCount: 0, impressionCount: 0 },
      conversationId: t.conversation_id as string,
    }));
  }

  /** Search recent tweets */
  async searchTweets(query: string, limit = 10): Promise<TwitterTweet[]> {
    this.ensureInitialized();
    const res = await fetch(
      `${this.baseUrl}/tweets/search/recent?query=${encodeURIComponent(query)}&max_results=${limit}&tweet.fields=created_at,public_metrics,author_id,conversation_id`,
      {
        headers: { Authorization: `Bearer ${this.config!.accessToken}` },
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`Twitter search failed: ${data.detail || data.title}`);
    return (data.data || []).map((t: Record<string, unknown>) => ({
      id: t.id as string,
      text: t.text as string,
      authorId: t.author_id as string,
      createdAt: t.created_at as string,
      publicMetrics: (t.public_metrics as TwitterTweet['publicMetrics']) || { likeCount: 0, retweetCount: 0, replyCount: 0, quoteCount: 0, impressionCount: 0 },
    }));
  }

  /** Like a tweet */
  async likeTweet(tweetId: string): Promise<void> {
    this.ensureInitialized();
    const me = await this.getMe();
    const res = await fetch(`${this.baseUrl}/users/${me.id}/likes`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.config!.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tweet_id: tweetId }),
    });
    if (!res.ok) throw new Error(`Twitter like failed: ${res.status}`);
  }

  private ensureInitialized(): void {
    if (!this.isInitialized || !this.config) {
      throw new Error('Twitter integration not initialized');
    }
  }
}
