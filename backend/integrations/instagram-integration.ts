/**
 * Instagram Business Integration
 * Handles Instagram OAuth, media management, and engagement via Meta Graph API
 */

export interface InstagramPost {
  id: string;
  caption?: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' | 'REEL';
  mediaUrl: string;
  permalink: string;
  timestamp: string;
  likeCount: number;
  commentCount: number;
}

export interface InstagramComment {
  id: string;
  text: string;
  username: string;
  timestamp: string;
  replyTo?: string;
  likeCount: number;
}

export interface InstagramInsights {
  metric: string;
  value: number;
  previousValue?: number;
  period: 'day' | 'week' | 'days_28';
}

export interface InstagramConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  accessToken: string;
  businessAccountId: string;
}

export class InstagramIntegrationService {
  private config: InstagramConfig | null = null;
  private baseUrl = 'https://graph.facebook.com';
  private apiVersion = 'v21.0';
  private isInitialized = false;

  /** Build OAuth authorization URL */
  getAuthUrl(scopes = ['instagram_basic', 'instagram_content_publish', 'instagram_manage_comments']): string {
    return `https://api.instagram.com/oauth/authorize?client_id=${this.config?.clientId}&redirect_uri=${this.config?.redirectUri}&scope=${scopes.join(',')}&response_type=code`;
  }

  /** Exchange authorization code for access token */
  async exchangeCodeForToken(code: string): Promise<{ accessToken: string; userId: string; expiresIn: number }> {
    if (!this.config) throw new Error('Not configured');
    const res = await fetch(
      `https://api.instagram.com/oauth/access_token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          grant_type: 'authorization_code',
          redirect_uri: this.config.redirectUri,
          code,
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`Instagram OAuth failed: ${data.error_message}`);
    return { accessToken: data.access_token, userId: data.user_id, expiresIn: data.expires_in };
  }

  /** Initialize with existing access token */
  async initialize(config: InstagramConfig): Promise<void> {
    this.config = config;
    this.isInitialized = true;
    console.log(`Instagram integration initialized for account: ${config.businessAccountId}`);
  }

  /** Fetch recent media posts */
  async getRecentPosts(limit = 10): Promise<InstagramPost[]> {
    this.ensureInitialized();
    const res = await fetch(
      `${this.baseUrl}/${this.apiVersion}/${this.config!.businessAccountId}/media?fields=id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count&limit=${limit}&access_token=${this.config!.accessToken}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`Instagram fetch failed: ${data.error?.message}`);
    return (data.data || []).map((p: Record<string, unknown>) => ({
      id: p.id as string,
      caption: p.caption as string,
      mediaType: p.media_type as InstagramPost['mediaType'],
      mediaUrl: p.media_url as string,
      permalink: p.permalink as string,
      timestamp: p.timestamp as string,
      likeCount: p.like_count as number || 0,
      commentCount: p.comments_count as number || 0,
    }));
  }

  /** Fetch comments for a media post */
  async getComments(mediaId: string, limit = 20): Promise<InstagramComment[]> {
    this.ensureInitialized();
    const res = await fetch(
      `${this.baseUrl}/${this.apiVersion}/${mediaId}/comments?fields=id,text,username,timestamp,replies_to{id,text,username,timestamp},like_count&limit=${limit}&access_token=${this.config!.accessToken}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`Instagram comments fetch failed: ${data.error?.message}`);
    return (data.data || []).map((c: Record<string, unknown>) => ({
      id: c.id as string,
      text: c.text as string,
      username: c.username as string,
      timestamp: c.timestamp as string,
      replyTo: (c.replies_to as Record<string, unknown>)?.id as string,
      likeCount: c.like_count as number || 0,
    }));
  }

  /** Reply to a comment */
  async replyToComment(mediaId: string, commentId: string, message: string): Promise<{ id: string }> {
    this.ensureInitialized();
    const res = await fetch(
      `${this.baseUrl}/${this.apiVersion}/${mediaId}/comments`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token: this.config!.accessToken,
          message,
          reply_to_comment_id: commentId,
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`Instagram reply failed: ${data.error?.message}`);
    return { id: data.id };
  }

  /** Fetch account insights */
  async getInsights(metrics = ['impressions', 'reach', 'follower_count', 'profile_views']): Promise<InstagramInsights[]> {
    this.ensureInitialized();
    const res = await fetch(
      `${this.baseUrl}/${this.apiVersion}/${this.config!.businessAccountId}/insights?metric=${metrics.join(',')}&period=days_28&access_token=${this.config!.accessToken}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`Instagram insights fetch failed: ${data.error?.message}`);
    return (data.data || []).map((i: Record<string, unknown>) => ({
      metric: i.name as string,
      value: (i.values as Array<Record<string, unknown>>)?.[0]?.value as number || 0,
      previousValue: (i.values as Array<Record<string, unknown>>)?.[1]?.value as number,
      period: (i.values as Array<Record<string, unknown>>)?.[0]?.end_time ? 'days_28' : 'day',
    }));
  }

  /** Publish a media item (requires instagram_content_publish permission) */
  async publishMedia(caption: string, imageUrl: string): Promise<{ id: string }> {
    this.ensureInitialized();
    // Step 1: Create container
    const containerRes = await fetch(
      `${this.baseUrl}/${this.apiVersion}/${this.config!.businessAccountId}/media`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: imageUrl,
          caption,
          access_token: this.config!.accessToken,
        }),
      }
    );
    const containerData = await containerRes.json();
    if (!containerRes.ok) throw new Error(`Instagram media container failed: ${containerData.error?.message}`);

    // Step 2: Publish container
    const publishRes = await fetch(
      `${this.baseUrl}/${this.apiVersion}/${this.config!.businessAccountId}/media_publish`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creation_id: containerData.id,
          access_token: this.config!.accessToken,
        }),
      }
    );
    const publishData = await publishRes.json();
    if (!publishRes.ok) throw new Error(`Instagram publish failed: ${publishData.error?.message}`);
    return { id: publishData.id };
  }

  private ensureInitialized(): void {
    if (!this.isInitialized || !this.config) {
      throw new Error('Instagram integration not initialized');
    }
  }
}
