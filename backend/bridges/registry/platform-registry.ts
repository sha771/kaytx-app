import { Protocol } from '../types';

export interface PlatformDefinition {
  id: string;
  name: string;
  category: 'messaging' | 'social' | 'business' | 'ai' | 'email' | 'support' | 'other';
  protocols: Protocol[];
  connectionMethods: ('qr' | 'oauth' | 'credentials' | 'api_key' | 'phone' | 'webhook')[];
  regions: ('NA' | 'EU' | 'AS' | 'MENA' | 'LATAM' | 'AF' | 'GLOBAL')[];
  features: string[];
  requiresTLS: boolean;
  supportsE2E: boolean;
  bridgeType: 'cloud' | 'local' | 'hybrid';
  officialAPI: boolean;
  rateLimit?: {
    requests: number;
    period: number;
  };
}

export class PlatformRegistry {
  private platforms: Map<string, PlatformDefinition> = new Map();

  constructor() {
    this.initializePlatforms();
  }

  private initializePlatforms(): void {
    this.registerMessagingPlatforms();
    this.registerSocialPlatforms();
    this.registerBusinessPlatforms();
    this.registerAIPlatforms();
    this.registerEmailPlatforms();
    this.registerSupportPlatforms();
  }

  private registerMessagingPlatforms(): void {
    const messagingPlatforms: PlatformDefinition[] = [
      {
        id: 'whatsapp',
        name: 'WhatsApp',
        category: 'messaging',
        protocols: ['websocket', 'local'],
        connectionMethods: ['qr', 'phone'],
        regions: ['GLOBAL'],
        features: ['text', 'media', 'voice', 'video', 'groups', 'status'],
        requiresTLS: true,
        supportsE2E: true,
        bridgeType: 'hybrid',
        officialAPI: true,
        rateLimit: { requests: 1000, period: 86400 },
      },
      {
        id: 'telegram',
        name: 'Telegram',
        category: 'messaging',
        protocols: ['rest', 'websocket'],
        connectionMethods: ['api_key', 'phone'],
        regions: ['GLOBAL'],
        features: ['text', 'media', 'voice', 'video', 'groups', 'channels', 'bots'],
        requiresTLS: true,
        supportsE2E: true,
        bridgeType: 'cloud',
        officialAPI: true,
        rateLimit: { requests: 30, period: 1 },
      },
      {
        id: 'signal',
        name: 'Signal',
        category: 'messaging',
        protocols: ['local', 'websocket'],
        connectionMethods: ['phone', 'qr'],
        regions: ['GLOBAL'],
        features: ['text', 'media', 'voice', 'video', 'groups'],
        requiresTLS: true,
        supportsE2E: true,
        bridgeType: 'local',
        officialAPI: false,
      },
      {
        id: 'wechat',
        name: 'WeChat',
        category: 'messaging',
        protocols: ['websocket', 'local'],
        connectionMethods: ['qr', 'credentials'],
        regions: ['AS', 'GLOBAL'],
        features: ['text', 'media', 'voice', 'video', 'groups', 'moments', 'payments'],
        requiresTLS: true,
        supportsE2E: false,
        bridgeType: 'hybrid',
        officialAPI: true,
      },
      {
        id: 'messenger',
        name: 'Facebook Messenger',
        category: 'messaging',
        protocols: ['graphql', 'websocket'],
        connectionMethods: ['oauth', 'credentials'],
        regions: ['GLOBAL'],
        features: ['text', 'media', 'voice', 'video', 'groups', 'stories'],
        requiresTLS: true,
        supportsE2E: true,
        bridgeType: 'cloud',
        officialAPI: true,
      },
    ];

    messagingPlatforms.forEach(p => this.platforms.set(p.id, p));
  }

  private registerSocialPlatforms(): void {
    const socialPlatforms: PlatformDefinition[] = [
      {
        id: 'instagram',
        name: 'Instagram',
        category: 'social',
        protocols: ['graphql', 'rest'],
        connectionMethods: ['oauth', 'credentials'],
        regions: ['GLOBAL'],
        features: ['posts', 'stories', 'reels', 'dm', 'comments', 'likes'],
        requiresTLS: true,
        supportsE2E: false,
        bridgeType: 'cloud',
        officialAPI: true,
      },
      {
        id: 'twitter',
        name: 'Twitter/X',
        category: 'social',
        protocols: ['rest', 'websocket'],
        connectionMethods: ['oauth', 'api_key'],
        regions: ['GLOBAL'],
        features: ['tweets', 'dm', 'mentions', 'retweets', 'likes', 'spaces'],
        requiresTLS: true,
        supportsE2E: false,
        bridgeType: 'cloud',
        officialAPI: true,
      },
      {
        id: 'linkedin',
        name: 'LinkedIn',
        category: 'social',
        protocols: ['rest'],
        connectionMethods: ['oauth', 'api_key'],
        regions: ['GLOBAL'],
        features: ['posts', 'messages', 'connections', 'jobs', 'articles'],
        requiresTLS: true,
        supportsE2E: false,
        bridgeType: 'cloud',
        officialAPI: true,
      },
      {
        id: 'discord',
        name: 'Discord',
        category: 'social',
        protocols: ['websocket', 'rest'],
        connectionMethods: ['oauth', 'api_key', 'qr'],
        regions: ['GLOBAL'],
        features: ['text', 'voice', 'video', 'servers', 'threads', 'bots'],
        requiresTLS: true,
        supportsE2E: false,
        bridgeType: 'cloud',
        officialAPI: true,
      },
    ];

    socialPlatforms.forEach(p => this.platforms.set(p.id, p));
  }

  private registerBusinessPlatforms(): void {
    const businessPlatforms: PlatformDefinition[] = [
      {
        id: 'slack',
        name: 'Slack',
        category: 'business',
        protocols: ['websocket', 'rest'],
        connectionMethods: ['oauth', 'api_key', 'webhook'],
        regions: ['GLOBAL'],
        features: ['channels', 'dm', 'threads', 'files', 'apps', 'workflows'],
        requiresTLS: true,
        supportsE2E: false,
        bridgeType: 'cloud',
        officialAPI: true,
      },
      {
        id: 'teams',
        name: 'Microsoft Teams',
        category: 'business',
        protocols: ['rest', 'websocket'],
        connectionMethods: ['oauth', 'api_key'],
        regions: ['GLOBAL'],
        features: ['chat', 'calls', 'meetings', 'files', 'apps'],
        requiresTLS: true,
        supportsE2E: false,
        bridgeType: 'cloud',
        officialAPI: true,
      },
      {
        id: 'zoom',
        name: 'Zoom',
        category: 'business',
        protocols: ['rest', 'websocket'],
        connectionMethods: ['oauth', 'api_key'],
        regions: ['GLOBAL'],
        features: ['meetings', 'webinars', 'chat', 'phone', 'rooms'],
        requiresTLS: true,
        supportsE2E: true,
        bridgeType: 'cloud',
        officialAPI: true,
      },
      {
        id: 'salesforce',
        name: 'Salesforce',
        category: 'business',
        protocols: ['rest', 'graphql'],
        connectionMethods: ['oauth', 'api_key'],
        regions: ['GLOBAL'],
        features: ['crm', 'sales', 'service', 'marketing', 'analytics'],
        requiresTLS: true,
        supportsE2E: false,
        bridgeType: 'cloud',
        officialAPI: true,
      },
    ];

    businessPlatforms.forEach(p => this.platforms.set(p.id, p));
  }

  private registerAIPlatforms(): void {
    const aiPlatforms: PlatformDefinition[] = [
      {
        id: 'chatgpt',
        name: 'ChatGPT',
        category: 'ai',
        protocols: ['rest', 'websocket'],
        connectionMethods: ['api_key'],
        regions: ['GLOBAL'],
        features: ['chat', 'completion', 'embeddings', 'moderation'],
        requiresTLS: true,
        supportsE2E: false,
        bridgeType: 'cloud',
        officialAPI: true,
      },
      {
        id: 'claude',
        name: 'Claude',
        category: 'ai',
        protocols: ['rest'],
        connectionMethods: ['api_key'],
        regions: ['GLOBAL'],
        features: ['chat', 'completion', 'analysis'],
        requiresTLS: true,
        supportsE2E: false,
        bridgeType: 'cloud',
        officialAPI: true,
      },
      {
        id: 'gemini',
        name: 'Google Gemini',
        category: 'ai',
        protocols: ['rest', 'grpc'],
        connectionMethods: ['api_key', 'oauth'],
        regions: ['GLOBAL'],
        features: ['chat', 'completion', 'vision', 'multimodal'],
        requiresTLS: true,
        supportsE2E: false,
        bridgeType: 'cloud',
        officialAPI: true,
      },
    ];

    aiPlatforms.forEach(p => this.platforms.set(p.id, p));
  }

  private registerEmailPlatforms(): void {
    const emailPlatforms: PlatformDefinition[] = [
      {
        id: 'gmail',
        name: 'Gmail',
        category: 'email',
        protocols: ['rest', 'graphql'],
        connectionMethods: ['oauth', 'api_key'],
        regions: ['GLOBAL'],
        features: ['send', 'receive', 'labels', 'filters', 'attachments'],
        requiresTLS: true,
        supportsE2E: false,
        bridgeType: 'cloud',
        officialAPI: true,
      },
      {
        id: 'outlook',
        name: 'Outlook',
        category: 'email',
        protocols: ['rest', 'graphql'],
        connectionMethods: ['oauth', 'api_key'],
        regions: ['GLOBAL'],
        features: ['send', 'receive', 'folders', 'rules', 'attachments'],
        requiresTLS: true,
        supportsE2E: false,
        bridgeType: 'cloud',
        officialAPI: true,
      },
    ];

    emailPlatforms.forEach(p => this.platforms.set(p.id, p));
  }

  private registerSupportPlatforms(): void {
    const supportPlatforms: PlatformDefinition[] = [
      {
        id: 'zendesk',
        name: 'Zendesk',
        category: 'support',
        protocols: ['rest', 'websocket'],
        connectionMethods: ['oauth', 'api_key'],
        regions: ['GLOBAL'],
        features: ['tickets', 'chat', 'calls', 'knowledge', 'analytics'],
        requiresTLS: true,
        supportsE2E: false,
        bridgeType: 'cloud',
        officialAPI: true,
      },
      {
        id: 'intercom',
        name: 'Intercom',
        category: 'support',
        protocols: ['rest', 'websocket'],
        connectionMethods: ['oauth', 'api_key'],
        regions: ['GLOBAL'],
        features: ['chat', 'messages', 'articles', 'bots', 'analytics'],
        requiresTLS: true,
        supportsE2E: false,
        bridgeType: 'cloud',
        officialAPI: true,
      },
    ];

    supportPlatforms.forEach(p => this.platforms.set(p.id, p));
  }

  getPlatform(id: string): PlatformDefinition | undefined {
    return this.platforms.get(id);
  }

  getAllPlatforms(): PlatformDefinition[] {
    return Array.from(this.platforms.values());
  }

  getPlatformsByCategory(category: PlatformDefinition['category']): PlatformDefinition[] {
    return this.getAllPlatforms().filter(p => p.category === category);
  }

  getPlatformsByProtocol(protocol: Protocol): PlatformDefinition[] {
    return this.getAllPlatforms().filter(p => p.protocols.includes(protocol));
  }

  getPlatformsByRegion(region: string): PlatformDefinition[] {
    return this.getAllPlatforms().filter(p => 
      p.regions.includes(region as any) || p.regions.includes('GLOBAL')
    );
  }

  searchPlatforms(query: string): PlatformDefinition[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllPlatforms().filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.id.toLowerCase().includes(lowerQuery) ||
      p.features.some(f => f.toLowerCase().includes(lowerQuery))
    );
  }

  getPlatformCount(): number {
    return this.platforms.size;
  }

  getCategoryStats(): Record<string, number> {
    const stats: Record<string, number> = {};
    
    for (const platform of this.platforms.values()) {
      stats[platform.category] = (stats[platform.category] || 0) + 1;
    }
    
    return stats;
  }
}

export const platformRegistry = new PlatformRegistry();
