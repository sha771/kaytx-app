import { db as pgDb } from '../db/connection';
import { eq, and, desc, ilike } from 'drizzle-orm';
import crypto from 'crypto';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

// Content types
export type ContentType = 'blog' | 'article' | 'landing_page' | 'email_template' | 'social_media' | 'video' | 'podcast' | 'infographic';

export interface Content {
  id: string;
  organizationId: string;
  title: string;
  slug: string;
  type: ContentType;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  authorId?: string;
  status: 'draft' | 'review' | 'published' | 'archived';
  publishedAt?: Date;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  tags: string[];
  categories: string[];
  readingTime?: number;
  viewCount: number;
  shareCount: number;
  likeCount: number;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentVersion {
  id: string;
  contentId: string;
  organizationId: string;
  version: number;
  title: string;
  content: string;
  authorId?: string;
  changeLog?: string;
  createdAt: Date;
}

export interface ContentAnalytics {
  contentId: string;
  views: number;
  uniqueViews: number;
  averageReadTime: number;
  bounceRate: number;
  shares: number;
  likes: number;
  comments: number;
  conversions: number;
  revenue: number;
}

export class ContentManagementService {
  async createContent(organizationId: string, content: Omit<Content, 'id' | 'slug' | 'viewCount' | 'shareCount' | 'likeCount' | 'createdAt' | 'updatedAt'>): Promise<Content> {
    const id = crypto.randomUUID();
    const now = new Date();
    const slug = this.generateSlug(content.title);

    const newContent: Content = {
      ...content,
      id,
      slug,
      viewCount: 0,
      shareCount: 0,
      likeCount: 0,
      createdAt: now,
      updatedAt: now
    };

    // Calculate reading time
    if (content.content) {
      newContent.readingTime = this.calculateReadingTime(content.content);
    }

    // Store in database (using a generic content table or creating one)
    // For now, we'll simulate storage
    logger.info(`Created content: ${newContent.title}`);

    return newContent;
  }

  async getContent(organizationId: string, contentId: string): Promise<Content | null> {
    // Mock implementation - in production, this would query the database
    const mockContent: Content = {
      id: contentId,
      organizationId,
      title: 'Sample Blog Post',
      slug: 'sample-blog-post',
      type: 'blog',
      content: 'This is a sample blog post content...',
      excerpt: 'A brief excerpt of the blog post',
      featuredImage: 'https://example.com/image.jpg',
      authorId: 'user-123',
      status: 'published',
      publishedAt: new Date(),
      seoTitle: 'Sample Blog Post - SEO Title',
      seoDescription: 'SEO description for the blog post',
      seoKeywords: ['blog', 'sample', 'content'],
      tags: ['blog', 'marketing', 'content'],
      categories: ['Marketing', 'Content'],
      readingTime: 5,
      viewCount: 150,
      shareCount: 25,
      likeCount: 30,
      metadata: {},
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return mockContent;
  }

  async getContentBySlug(organizationId: string, slug: string): Promise<Content | null> {
    // Mock implementation
    return this.getContent(organizationId, 'mock-id');
  }

  async getContents(organizationId: string, filters: {
    type?: ContentType;
    status?: Content['status'];
    authorId?: string;
    tags?: string[];
    categories?: string[];
    search?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<{ contents: Content[]; total: number }> {
    // Mock implementation
    const mockContents: Content[] = [
      {
        id: '1',
        organizationId,
        title: 'Getting Started with Content Marketing',
        slug: 'getting-started-content-marketing',
        type: 'blog',
        content: 'Comprehensive guide to content marketing...',
        excerpt: 'Learn the basics of content marketing',
        status: 'published',
        publishedAt: new Date(),
        tags: ['marketing', 'content', 'guide'],
        categories: ['Marketing'],
        readingTime: 8,
        viewCount: 500,
        shareCount: 45,
        likeCount: 67,
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        organizationId,
        title: 'SEO Best Practices for 2024',
        slug: 'seo-best-practices-2024',
        type: 'article',
        content: 'Latest SEO strategies and techniques...',
        excerpt: 'Stay ahead with these SEO tips',
        status: 'published',
        publishedAt: new Date(),
        tags: ['seo', 'optimization', '2024'],
        categories: ['SEO', 'Marketing'],
        readingTime: 12,
        viewCount: 750,
        shareCount: 89,
        likeCount: 120,
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Apply filters
    let filteredContents = mockContents;

    if (filters.type) {
      filteredContents = filteredContents.filter(c => c.type === filters.type);
    }

    if (filters.status) {
      filteredContents = filteredContents.filter(c => c.status === filters.status);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredContents = filteredContents.filter(c => 
        c.title.toLowerCase().includes(searchLower) ||
        c.content.toLowerCase().includes(searchLower)
      );
    }

    return {
      contents: filteredContents,
      total: filteredContents.length
    };
  }

  async updateContent(organizationId: string, contentId: string, updates: Partial<Omit<Content, 'id' | 'organizationId' | 'createdAt' | 'updatedAt'>>): Promise<Content | null> {
    const existingContent = await this.getContent(organizationId, contentId);
    if (!existingContent) return null;

    const updatedContent = { 
      ...existingContent, 
      ...updates, 
      updatedAt: new Date() 
    };

    // Update slug if title changed
    if (updates.title && updates.title !== existingContent.title) {
      updatedContent.slug = this.generateSlug(updates.title);
    }

    // Recalculate reading time if content changed
    if (updates.content) {
      updatedContent.readingTime = this.calculateReadingTime(updates.content);
    }

    logger.info(`Updated content: ${updatedContent.title}`);
    return updatedContent;
  }

  async publishContent(organizationId: string, contentId: string, authorId?: string): Promise<boolean> {
    const content = await this.getContent(organizationId, contentId);
    if (!content) return false;

    await this.updateContent(organizationId, contentId, {
      status: 'published',
      publishedAt: new Date()
    });

    // Create version history
    await this.createVersion(organizationId, contentId, content, 'Published content', authorId);

    return true;
  }

  async deleteContent(organizationId: string, contentId: string): Promise<boolean> {
    const content = await this.getContent(organizationId, contentId);
    if (!content) return false;

    logger.info(`Deleted content: ${content.title}`);
    return true;
  }

  async createVersion(
    organizationId: string, 
    contentId: string, 
    content: Content, 
    changeLog?: string, 
    authorId?: string
  ): Promise<ContentVersion> {
    const id = crypto.randomUUID();
    
    // Get latest version number
    const latestVersion = await this.getLatestVersion(organizationId, contentId);
    const versionNumber = latestVersion ? latestVersion.version + 1 : 1;

    const version: ContentVersion = {
      id,
      contentId,
      organizationId,
      version: versionNumber,
      title: content.title,
      content: content.content,
      authorId,
      changeLog,
      createdAt: new Date()
    };

    logger.info(`Created version ${versionNumber} for content: ${content.title}`);
    return version;
  }

  async getVersions(organizationId: string, contentId: string): Promise<ContentVersion[]> {
    // Mock implementation
    return [
      {
        id: 'v1',
        contentId,
        organizationId,
        version: 1,
        title: 'Original Title',
        content: 'Original content...',
        authorId: 'user-123',
        changeLog: 'Initial version',
        createdAt: new Date()
      }
    ];
  }

  async getAnalytics(organizationId: string, contentId: string): Promise<ContentAnalytics | null> {
    // Mock analytics data
    return {
      contentId,
      views: 500,
      uniqueViews: 350,
      averageReadTime: 4.5,
      bounceRate: 35.2,
      shares: 45,
      likes: 67,
      comments: 12,
      conversions: 8,
      revenue: 800
    };
  }

  async updateViewCount(organizationId: string, contentId: string): Promise<void> {
    const content = await this.getContent(organizationId, contentId);
    if (content) {
      await this.updateContent(organizationId, contentId, {
        viewCount: content.viewCount + 1
      });
    }
  }

  async searchContent(organizationId: string, query: string, filters: {
    type?: ContentType;
    tags?: string[];
    categories?: string[];
  } = {}): Promise<Content[]> {
    const { contents } = await this.getContents(organizationId, { search: query });
    
    // Apply additional filters
    let filteredContents = contents;

    if (filters.type) {
      filteredContents = filteredContents.filter(c => c.type === filters.type);
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredContents = filteredContents.filter(c => 
        filters.tags!.some(tag => c.tags.includes(tag))
      );
    }

    if (filters.categories && filters.categories.length > 0) {
      filteredContents = filteredContents.filter(c => 
        filters.categories!.some(category => c.categories.includes(category))
      );
    }

    return filteredContents;
  }

  async getContentCalendar(organizationId: string, startDate: Date, endDate: Date): Promise<{
    date: string;
    contents: Content[];
  }[]> {
    const { contents } = await this.getContents(organizationId, { status: 'published' });
    
    const calendar: Record<string, Content[]> = {};
    
    contents.forEach(content => {
      if (content.publishedAt) {
        const dateKey = content.publishedAt.toISOString().split('T')[0];
        if (!calendar[dateKey]) {
          calendar[dateKey] = [];
        }
        calendar[dateKey].push(content);
      }
    });

    return Object.entries(calendar).map(([date, contents]) => ({
      date,
      contents
    }));
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  private async getLatestVersion(organizationId: string, contentId: string): Promise<ContentVersion | null> {
    const versions = await this.getVersions(organizationId, contentId);
    return versions.length > 0 ? versions[versions.length - 1] : null;
  }
}

export const contentManagementService = new ContentManagementService();
