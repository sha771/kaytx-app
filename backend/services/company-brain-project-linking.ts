/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import OpenAI from 'openai';

/**
 * Company Brain Historical Project Linking Service
 * Ties all files, edits, decisions, and communications to project timelines
 * Enables comprehensive project history tracking
 */

export interface ProjectTimeline {
  id: string;
  organizationId: string;
  projectId: string;
  projectName: string;
  startDate: Date;
  endDate?: Date;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  teamMembers: Array<{
    userId: string;
    userName: string;
    role: string;
    joinDate: Date;
    leaveDate?: Date;
  }>;
  milestones: Array<{
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    completedDate?: Date;
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  }>;
  decisions: Array<{
    id: string;
    decision: string;
    madeBy: string;
    date: Date;
    rationale: string;
    impact: string;
  }>;
  files: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
    createdBy: string;
    createdAt: Date;
    modifiedBy?: string;
    modifiedAt?: Date;
    version: number;
  }>;
  edits: Array<{
    id: string;
    fileId: string;
    fileName: string;
    editedBy: string;
    editedAt: Date;
    changes: string;
    reason?: string;
  }>;
  communications: Array<{
    id: string;
    type: 'chat' | 'email' | 'meeting' | 'document';
    sourceId: string;
    title: string;
    participants: string[];
    date: Date;
    summary: string;
  }>;
  dependencies: Array<{
    projectId: string;
    projectName: string;
    type: 'blocks' | 'depends-on' | 'related';
    description: string;
  }>;
  risks: Array<{
    id: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    status: 'open' | 'mitigated' | 'closed';
    identifiedBy: string;
    identifiedAt: Date;
  }>;
  lessonsLearned: Array<{
    lesson: string;
    category: string;
    learnedFrom: string;
    date: Date;
  }>;
  embeddingVector?: number[];
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectLinkingConfig {
  organizationId: string;
  autoLink: boolean;
  sources: {
    git: boolean;
    documents: boolean;
    chatLogs: boolean;
    emails: boolean;
    meetings: boolean;
    tasks: boolean;
  };
  linkRules: Array<{
    condition: string;
    action: string;
  }>;
}

export class CompanyBrainProjectLinkingService {
  private openai: OpenAI;
  private configs: Map<string, ProjectLinkingConfig> = new Map();

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Configure project linking for an organization
   */
  configureLinking(config: ProjectLinkingConfig): void {
    this.configs.set(config.organizationId, config);
  }

  /**
   * Get configuration for an organization
   */
  getConfig(organizationId: string): ProjectLinkingConfig | undefined {
    return this.configs.get(organizationId);
  }

  /**
   * Create or update project timeline
   */
  async updateProjectTimeline(
    organizationId: string,
    projectId: string,
    projectName: string,
    projectData: any
  ): Promise<ProjectTimeline> {
    const config = this.configs.get(organizationId);
    
    // Get existing timeline or create new
    const existingTimeline = await this.getProjectTimeline(organizationId, projectId);
    
    const timeline: ProjectTimeline = existingTimeline || {
      id: crypto.randomUUID(),
      organizationId,
      projectId,
      projectName,
      startDate: new Date(projectData.startDate || Date.now()),
      status: projectData.status || 'active',
      teamMembers: [],
      milestones: [],
      decisions: [],
      files: [],
      edits: [],
      communications: [],
      dependencies: [],
      risks: [],
      lessonsLearned: [],
      metadata: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Update basic info
    if (projectData.endDate) timeline.endDate = new Date(projectData.endDate);
    if (projectData.status) timeline.status = projectData.status;

    // Link team members
    if (config?.autoLink && projectData.teamMembers) {
      timeline.teamMembers = await this.linkTeamMembers(projectData.teamMembers, timeline.teamMembers);
    }

    // Link milestones
    if (projectData.milestones) {
      timeline.milestones = await this.linkMilestones(projectData.milestones, timeline.milestones);
    }

    // Link decisions
    if (config?.autoLink) {
      timeline.decisions = await this.extractDecisionsFromSources(organizationId, projectId, timeline.decisions);
    }

    // Link files
    if (config?.autoLink && config.sources.git) {
      timeline.files = await this.linkGitFiles(organizationId, projectId, timeline.files);
    }

    // Link edits
    if (config?.autoLink && config.sources.git) {
      timeline.edits = await this.linkGitEdits(organizationId, projectId, timeline.edits);
    }

    // Link communications
    if (config?.autoLink) {
      timeline.communications = await this.linkCommunications(organizationId, projectId, timeline.communications);
    }

    // Link dependencies
    if (projectData.dependencies) {
      timeline.dependencies = await this.linkDependencies(projectData.dependencies, timeline.dependencies);
    }

    // Extract risks
    if (config?.autoLink) {
      timeline.risks = await this.extractRisksFromCommunications(organizationId, projectId, timeline.risks);
    }

    // Generate embedding
    const timelineText = this.buildTimelineText(timeline);
    timeline.embeddingVector = await this.generateEmbedding(timelineText);

    timeline.updatedAt = new Date();

    // Save timeline
    await this.saveProjectTimeline(timeline);

    return timeline;
  }

  /**
   * Link team members
   */
  private async linkTeamMembers(
    newMembers: any[],
    existingMembers: ProjectTimeline['teamMembers']
  ): Promise<ProjectTimeline['teamMembers']> {
    const memberMap = new Map(existingMembers.map(m => [m.userId, m]));

    for (const member of newMembers) {
      memberMap.set(member.userId, {
        userId: member.userId,
        userName: member.userName,
        role: member.role,
        joinDate: new Date(member.joinDate || Date.now()),
        leaveDate: member.leaveDate ? new Date(member.leaveDate) : undefined,
      });
    }

    return Array.from(memberMap.values());
  }

  /**
   * Link milestones
   */
  private async linkMilestones(
    newMilestones: any[],
    existingMilestones: ProjectTimeline['milestones']
  ): Promise<ProjectTimeline['milestones']> {
    const milestoneMap = new Map(existingMilestones.map(m => [m.id, m]));

    for (const milestone of newMilestones) {
      milestoneMap.set(milestone.id || crypto.randomUUID(), {
        id: milestone.id || crypto.randomUUID(),
        title: milestone.title,
        description: milestone.description,
        dueDate: new Date(milestone.dueDate),
        completedDate: milestone.completedDate ? new Date(milestone.completedDate) : undefined,
        status: milestone.status || 'pending',
      });
    }

    return Array.from(milestoneMap.values());
  }

  /**
   * Extract decisions from sources
   */
  private async extractDecisionsFromSources(
    organizationId: string,
    projectId: string,
    existingDecisions: ProjectTimeline['decisions']
  ): Promise<ProjectTimeline['decisions']> {
    // In production, query chat logs, emails, meetings for decisions
    // For now, return existing
    return existingDecisions;
  }

  /**
   * Link git files
   */
  private async linkGitFiles(
    organizationId: string,
    projectId: string,
    existingFiles: ProjectTimeline['files']
  ): Promise<ProjectTimeline['files']> {
    // In production, query git repository for files
    return existingFiles;
  }

  /**
   * Link git edits
   */
  private async linkGitEdits(
    organizationId: string,
    projectId: string,
    existingEdits: ProjectTimeline['edits']
  ): Promise<ProjectTimeline['edits']> {
    // In production, query git history for edits
    return existingEdits;
  }

  /**
   * Link communications
   */
  private async linkCommunications(
    organizationId: string,
    projectId: string,
    existingCommunications: ProjectTimeline['communications']
  ): Promise<ProjectTimeline['communications']> {
    // In production, query chat logs, emails, meetings related to project
    return existingCommunications;
  }

  /**
   * Link dependencies
   */
  private async linkDependencies(
    newDependencies: any[],
    existingDependencies: ProjectTimeline['dependencies']
  ): Promise<ProjectTimeline['dependencies']> {
    const depMap = new Map(existingDependencies.map(d => [d.projectId, d]));

    for (const dep of newDependencies) {
      depMap.set(dep.projectId, {
        projectId: dep.projectId,
        projectName: dep.projectName,
        type: dep.type || 'related',
        description: dep.description,
      });
    }

    return Array.from(depMap.values());
  }

  /**
   * Extract risks from communications
   */
  private async extractRisksFromCommunications(
    organizationId: string,
    projectId: string,
    existingRisks: ProjectTimeline['risks']
  ): Promise<ProjectTimeline['risks']> {
    // In production, analyze communications for risk mentions
    return existingRisks;
  }

  /**
   * Build timeline text for embedding
   */
  private buildTimelineText(timeline: ProjectTimeline): string {
    const decisions = timeline.decisions.map(d => d.decision).join('. ');
    const milestones = timeline.milestones.map(m => m.title).join(', ');
    const team = timeline.teamMembers.map(m => m.userName).join(', ');

    return `Project: ${timeline.projectName}\nTeam: ${team}\nMilestones: ${milestones}\nDecisions: ${decisions}`;
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
   * Save project timeline to database
   */
  private async saveProjectTimeline(timeline: ProjectTimeline): Promise<void> {
    // In production, save to database using drizzle
    console.log('Saving project timeline:', timeline.id);
  }

  /**
   * Get project timeline
   */
  async getProjectTimeline(organizationId: string, projectId: string): Promise<ProjectTimeline | null> {
    // In production, query database
    return null;
  }

  /**
   * Search project timelines
   */
  async searchProjectTimelines(
    organizationId: string,
    query: string,
    filters?: {
      status?: string;
      startDate?: Date;
      endDate?: Date;
      teamMember?: string;
    }
  ): Promise<ProjectTimeline[]> {
    // In production, perform vector search with filters
    console.log(`Searching project timelines for ${organizationId}: ${query}`);
    
    return [];
  }

  /**
   * Get project history for a user
   */
  async getUserProjectHistory(
    organizationId: string,
    userId: string
  ): Promise<ProjectTimeline[]> {
    // In production, query database
    console.log(`Getting project history for user ${userId}`);
    
    return [];
  }

  /**
   * Add decision to timeline
   */
  async addDecision(
    organizationId: string,
    projectId: string,
    decision: Omit<ProjectTimeline['decisions'][0], 'id'>
  ): Promise<void> {
    const timeline = await this.getProjectTimeline(organizationId, projectId);
    if (!timeline) {
      throw new Error('Project timeline not found');
    }

    timeline.decisions.push({
      id: crypto.randomUUID(),
      ...decision,
    });

    timeline.updatedAt = new Date();
    await this.saveProjectTimeline(timeline);
  }

  /**
   * Add lesson learned
   */
  async addLessonLearned(
    organizationId: string,
    projectId: string,
    lesson: Omit<ProjectTimeline['lessonsLearned'][0], 'date'>
  ): Promise<void> {
    const timeline = await this.getProjectTimeline(organizationId, projectId);
    if (!timeline) {
      throw new Error('Project timeline not found');
    }

    timeline.lessonsLearned.push({
      ...lesson,
      date: new Date(),
    });

    timeline.updatedAt = new Date();
    await this.saveProjectTimeline(timeline);
  }

  /**
   * Get project statistics
   */
  async getProjectStatistics(organizationId: string): Promise<{
    totalProjects: number;
    projectsByStatus: Record<string, number>;
    totalDecisions: number;
    totalFiles: number;
    totalCommunications: number;
    avgProjectDuration: number;
  }> {
    // In production, query database
    return {
      totalProjects: 0,
      projectsByStatus: {},
      totalDecisions: 0,
      totalFiles: 0,
      totalCommunications: 0,
      avgProjectDuration: 0,
    };
  }

  /**
   * Export project timeline
   */
  async exportProjectTimeline(projectId: string): Promise<ProjectTimeline | null> {
    // In production, query database
    return null;
  }
}

// Export singleton instance
export const companyBrainProjectLinkingService = new CompanyBrainProjectLinkingService();
