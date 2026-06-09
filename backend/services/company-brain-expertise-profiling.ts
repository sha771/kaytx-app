/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import OpenAI from 'openai';

/**
 * Company Brain Expertise Profiling Service
 * Maps out who worked on what for expertise tracking
 * Enables new employees to trace project history without handover meetings
 */

export interface ExpertiseProfile {
  id: string;
  organizationId: string;
  userId: string;
  userName: string;
  skills: Array<{
    name: string;
    level: 'beginner' | 'intermediate' | 'expert';
    confidence: number;
    lastUsed: Date;
    sources: string[];
  }>;
  domains: Array<{
    name: string;
    expertise: number;
    projects: string[];
    contributions: number;
  }>;
  projects: Array<{
    id: string;
    name: string;
    role: string;
    contribution: string;
    startDate: Date;
    endDate?: Date;
  }>;
  contributions: Array<{
    type: 'code' | 'document' | 'decision' | 'review' | 'mentorship';
    description: string;
    date: Date;
    impact: number;
  }>;
  activityScore: number;
  expertiseScore: number;
  lastActiveAt: Date;
  availability: 'available' | 'busy' | 'unavailable' | 'unknown';
  mentorshipTopics: string[];
  embeddingVector?: number[];
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExpertiseProfilingConfig {
  organizationId: string;
  autoUpdate: boolean;
  sources: {
    gitCommits: boolean;
    codeReviews: boolean;
    documents: boolean;
    chatLogs: boolean;
    meetingTranscriptions: boolean;
    emailThreads: boolean;
  };
  updateFrequency: number; // hours
  minActivityThreshold: number;
}

export class CompanyBrainExpertiseProfilingService {
  private openai: OpenAI;
  private configs: Map<string, ExpertiseProfilingConfig> = new Map();

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Configure expertise profiling for an organization
   */
  configureProfiling(config: ExpertiseProfilingConfig): void {
    this.configs.set(config.organizationId, config);
  }

  /**
   * Get configuration for an organization
   */
  getConfig(organizationId: string): ExpertiseProfilingConfig | undefined {
    return this.configs.get(organizationId);
  }

  /**
   * Create or update expertise profile for a user
   */
  async updateProfile(
    organizationId: string,
    userId: string,
    userName: string,
    activityData: any[]
  ): Promise<ExpertiseProfile> {
    const config = this.configs.get(organizationId);
    
    // Get existing profile or create new
    const existingProfile = await this.getProfile(organizationId, userId);
    
    const profile: ExpertiseProfile = existingProfile || {
      id: crypto.randomUUID(),
      organizationId,
      userId,
      userName,
      skills: [],
      domains: [],
      projects: [],
      contributions: [],
      activityScore: 0,
      expertiseScore: 0,
      lastActiveAt: new Date(),
      availability: 'unknown',
      mentorshipTopics: [],
      metadata: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Extract skills from activity data
    if (config?.autoUpdate) {
      profile.skills = await this.extractSkills(activityData, profile.skills);
      profile.domains = await this.extractDomains(activityData, profile.domains);
      profile.projects = await this.extractProjects(activityData, profile.projects);
      profile.contributions = await this.extractContributions(activityData, profile.contributions);
    }

    // Calculate scores
    profile.activityScore = this.calculateActivityScore(activityData);
    profile.expertiseScore = this.calculateExpertiseScore(profile);
    profile.lastActiveAt = this.getLastActiveDate(activityData);
    profile.updatedAt = new Date();

    // Generate embedding
    const profileText = this.buildProfileText(profile);
    profile.embeddingVector = await this.generateEmbedding(profileText);

    // Save profile
    await this.saveProfile(profile);

    return profile;
  }

  /**
   * Extract skills from activity data
   */
  private async extractSkills(
    activityData: any[],
    existingSkills: ExpertiseProfile['skills']
  ): Promise<ExpertiseProfile['skills']> {
    // Aggregate skill mentions from activities
    const skillMentions: Record<string, { count: number; sources: string[] }> = {};

    for (const activity of activityData) {
      const skills = activity.skills || [];
      for (const skill of skills) {
        if (!skillMentions[skill]) {
          skillMentions[skill] = { count: 0, sources: [] };
        }
        skillMentions[skill].count++;
        skillMentions[skill].sources.push(activity.id);
      }
    }

    // Merge with existing skills
    const updatedSkills: ExpertiseProfile['skills'] = [];

    for (const [skillName, data] of Object.entries(skillMentions)) {
      const existing = existingSkills.find(s => s.name === skillName);
      const level = this.determineSkillLevel(data.count);
      
      updatedSkills.push({
        name: skillName,
        level,
        confidence: Math.min(data.count / 10, 1),
        lastUsed: new Date(),
        sources: [...(existing?.sources || []), ...data.sources].slice(0, 20),
      });
    }

    // Keep existing skills not mentioned recently
    for (const existing of existingSkills) {
      if (!skillMentions[existing.name]) {
        updatedSkills.push(existing);
      }
    }

    return updatedSkills.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Extract domains from activity data
   */
  private async extractDomains(
    activityData: any[],
    existingDomains: ExpertiseProfile['domains']
  ): Promise<ExpertiseProfile['domains']> {
    const domainActivity: Record<string, { count: number; projects: Set<string> }> = {};

    for (const activity of activityData) {
      const domains = activity.domains || [activity.domain];
      for (const domain of domains) {
        if (!domain) continue;
        
        if (!domainActivity[domain]) {
          domainActivity[domain] = { count: 0, projects: new Set() };
        }
        domainActivity[domain].count++;
        if (activity.projectId) {
          domainActivity[domain].projects.add(activity.projectId);
        }
      }
    }

    const updatedDomains: ExpertiseProfile['domains'] = [];

    for (const [domainName, data] of Object.entries(domainActivity)) {
      const existing = existingDomains.find(d => d.name === domainName);
      
      updatedDomains.push({
        name: domainName,
        expertise: Math.min(data.count / 5, 1),
        projects: Array.from(data.projects),
        contributions: data.count,
      });
    }

    return updatedDomains.sort((a, b) => b.expertise - a.expertise);
  }

  /**
   * Extract projects from activity data
   */
  private async extractProjects(
    activityData: any[],
    existingProjects: ExpertiseProfile['projects']
  ): Promise<ExpertiseProfile['projects']> {
    const projectActivity: Record<string, { activities: any[]; role?: string }> = {};

    for (const activity of activityData) {
      if (!activity.projectId) continue;

      if (!projectActivity[activity.projectId]) {
        projectActivity[activity.projectId] = { activities: [] };
      }
      projectActivity[activity.projectId].activities.push(activity);
      if (activity.role) {
        projectActivity[activity.projectId].role = activity.role;
      }
    }

    const updatedProjects: ExpertiseProfile['projects'] = [];

    for (const [projectId, data] of Object.entries(projectActivity)) {
      const existing = existingProjects.find(p => p.id === projectId);
      const activities = data.activities;
      const firstActivity = activities[0];
      const lastActivity = activities[activities.length - 1];

      updatedProjects.push({
        id: projectId,
        name: firstActivity.projectName || projectId,
        role: data.role || existing?.role || 'contributor',
        contribution: `${activities.length} contributions`,
        startDate: existing?.startDate || new Date(firstActivity.timestamp),
        endDate: lastActivity.timestamp && lastActivity.timestamp < new Date() 
          ? new Date(lastActivity.timestamp) 
          : undefined,
      });
    }

    // Merge with existing projects
    for (const existing of existingProjects) {
      if (!projectActivity[existing.id]) {
        updatedProjects.push(existing);
      }
    }

    return updatedProjects.sort((a, b) => (b.endDate?.getTime() || Date.now()) - (a.endDate?.getTime() || Date.now()));
  }

  /**
   * Extract contributions from activity data
   */
  private async extractContributions(
    activityData: any[],
    existingContributions: ExpertiseProfile['contributions']
  ): Promise<ExpertiseProfile['contributions']> {
    const contributions: ExpertiseProfile['contributions'] = [];

    for (const activity of activityData) {
      const contribution: ExpertiseProfile['contributions'][0] = {
        type: activity.type || 'code',
        description: activity.description || activity.message || activity.subject || '',
        date: new Date(activity.timestamp || activity.sentDate || activity.createdAt),
        impact: activity.impact || 0.5,
      };
      contributions.push(contribution);
    }

    // Merge with existing, keep top 100
    const merged = [...contributions, ...existingContributions]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 100);

    return merged;
  }

  /**
   * Determine skill level based on usage count
   */
  private determineSkillLevel(count: number): 'beginner' | 'intermediate' | 'expert' {
    if (count >= 20) return 'expert';
    if (count >= 5) return 'intermediate';
    return 'beginner';
  }

  /**
   * Calculate activity score
   */
  private calculateActivityScore(activityData: any[]): number {
    if (activityData.length === 0) return 0;

    const now = new Date();
    const recentActivity = activityData.filter(
      a => new Date(a.timestamp || a.sentDate || a.createdAt) > new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    );

    return Math.min(recentActivity.length / 50, 1);
  }

  /**
   * Calculate expertise score
   */
  private calculateExpertiseScore(profile: ExpertiseProfile): number {
    const skillScore = profile.skills.reduce((sum, skill) => sum + skill.confidence, 0) / (profile.skills.length || 1);
    const domainScore = profile.domains.reduce((sum, domain) => sum + domain.expertise, 0) / (profile.domains.length || 1);
    const contributionScore = Math.min(profile.contributions.length / 100, 1);

    return (skillScore * 0.4 + domainScore * 0.3 + contributionScore * 0.3);
  }

  /**
   * Get last active date
   */
  private getLastActiveDate(activityData: any[]): Date {
    if (activityData.length === 0) return new Date();

    const dates = activityData.map(a => new Date(a.timestamp || a.sentDate || a.createdAt));
    return new Date(Math.max(...dates.map(d => d.getTime())));
  }

  /**
   * Build profile text for embedding
   */
  private buildProfileText(profile: ExpertiseProfile): string {
    const skills = profile.skills.map(s => s.name).join(', ');
    const domains = profile.domains.map(d => d.name).join(', ');
    const projects = profile.projects.map(p => p.name).join(', ');

    return `Skills: ${skills}\nDomains: ${domains}\nProjects: ${projects}`;
  }

  /**
   * Generate embedding
   */
  private async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
      });

      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      return [];
    }
  }

  /**
   * Save profile to database
   */
  private async saveProfile(profile: ExpertiseProfile): Promise<void> {
    // In production, save to database using drizzle
    console.log('Saving expertise profile:', profile.id);
  }

  /**
   * Get profile for a user
   */
  async getProfile(organizationId: string, userId: string): Promise<ExpertiseProfile | null> {
    // In production, query database
    return null;
  }

  /**
   * Search for experts by skill or domain
   */
  async searchExperts(
    organizationId: string,
    query: string,
    filters?: {
      skill?: string;
      domain?: string;
      minExpertiseScore?: number;
      availability?: string;
    }
  ): Promise<ExpertiseProfile[]> {
    // In production, perform vector search with filters
    console.log(`Searching experts for ${organizationId}: ${query}`);
    
    return [];
  }

  /**
   * Find experts for a specific project
   */
  async findProjectExperts(
    organizationId: string,
    projectId: string
  ): Promise<ExpertiseProfile[]> {
    // In production, query database
    console.log(`Finding experts for project ${projectId}`);
    
    return [];
  }

  /**
   * Get mentorship recommendations
   */
  async getMentorshipRecommendations(
    organizationId: string,
    topic: string
  ): Promise<Array<{ profile: ExpertiseProfile; relevance: number }>> {
    // In production, search for experts with relevant skills
    console.log(`Getting mentorship recommendations for ${topic}`);
    
    return [];
  }

  /**
   * Update user availability
   */
  async updateAvailability(
    organizationId: string,
    userId: string,
    availability: ExpertiseProfile['availability']
  ): Promise<void> {
    // In production, update database
    console.log(`Updating availability for ${userId} to ${availability}`);
  }

  /**
   * Get expertise statistics
   */
  async getExpertiseStatistics(organizationId: string): Promise<{
    totalExperts: number;
    topSkills: Array<{ skill: string; count: number }>;
    topDomains: Array<{ domain: string; count: number }>;
    avgExpertiseScore: number;
    availableExperts: number;
  }> {
    // In production, query database
    return {
      totalExperts: 0,
      topSkills: [],
      topDomains: [],
      avgExpertiseScore: 0,
      availableExperts: 0,
    };
  }

  /**
   * Batch update profiles for organization
   */
  async batchUpdateProfiles(organizationId: string): Promise<{ updated: number; failed: number }> {
    const config = this.configs.get(organizationId);
    if (!config) {
      throw new Error('No configuration found');
    }

    // In production, fetch all users and update their profiles
    console.log(`Batch updating profiles for ${organizationId}`);
    
    return { updated: 0, failed: 0 };
  }
}

// Export singleton instance
export const companyBrainExpertiseProfilingService = new CompanyBrainExpertiseProfilingService();
