/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import { SkillBrain, SkillBrainManager } from '../../lib/skill-brain';
import {
  SkillMd,
  SkillEntry,
  SkillPerson,
  SkillBrainStats,
  SkillExtractResult,
  ContentType,
  CompetencyLevel,
  SkillCategory,
  TransferReadiness,
  TransferPlan,
  SkillManifest,
} from '../../lib/skill-brain/types';
import { companyBrainWebSocketService } from './company-brain-websocket';

/**
 * Skill Brain Service
 * Enterprise skill capture, documentation, and transfer system
 * Wraps the core SkillBrain library with backend-specific functionality
 * Integrates with Company Brain departure and succession services
 */

export class SkillBrainService {
  private skillBrain: SkillBrain;
  private manager: SkillBrainManager;
  private initialized: boolean = false;

  constructor() {
    this.skillBrain = new SkillBrain();
    this.manager = SkillBrainManager.getInstance();
  }

  /**
   * Initialize the skill brain service
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;
    await this.skillBrain.initialize();
    this.initialized = true;
    console.log('[SkillBrainService] Initialized');
  }

  /**
   * Extract skills from text content
   */
  async extractFromText(
    text: string,
    contentType: ContentType,
    options?: {
      sourceTitle?: string;
      sourcePath?: string;
      sourceUrl?: string;
      skillMdId?: string;
      personName?: string;
      personEmail?: string;
    }
  ): Promise<SkillExtractResult> {
    await this.ensureInitialized();
    return await this.skillBrain.extractFromText(text, contentType, options);
  }

  /**
   * Extract skills from a document
   */
  async extractFromDocument(
    content: string,
    filename: string,
    authorName?: string,
    authorEmail?: string
  ): Promise<SkillExtractResult> {
    return this.extractFromText(content, ContentType.DOCUMENT, {
      sourceTitle: filename,
      sourcePath: filename,
      personName: authorName,
      personEmail: authorEmail,
    });
  }

  /**
   * Extract skills from a conversation
   */
  async extractFromConversation(
    messages: Array<{ text: string; user: string; timestamp: string }>,
    channelName: string,
    participants: Array<{ name: string; email: string }>
  ): Promise<SkillExtractResult[]> {
    const results: SkillExtractResult[] = [];

    for (const participant of participants) {
      const participantMessages = messages.filter(m => m.user === participant.name);
      if (participantMessages.length === 0) continue;

      const combinedText = participantMessages.map(m => m.text).join('\n');
      const result = await this.extractFromText(combinedText, ContentType.CONVERSATION, {
        sourceTitle: `Slack: ${channelName}`,
        personName: participant.name,
        personEmail: participant.email,
      });

      results.push(result);
    }

    return results;
  }

  /**
   * Extract skills from code
   */
  async extractFromCode(
    code: string,
    language: string,
    sourcePath?: string,
    authorName?: string,
    authorEmail?: string
  ): Promise<SkillExtractResult> {
    return await this.skillBrain.extractFromCode(code, language, {
      sourceTitle: sourcePath || `Code: ${language}`,
      sourcePath,
      personName: authorName,
      personEmail: authorEmail,
    });
  }

  /**
   * Get skill.md by ID
   */
  getSkillMd(id: string): SkillMd | undefined {
    return this.skillBrain.getSkillMd(id);
  }

  /**
   * Get all skill.md files
   */
  getAllSkillMds(): SkillMd[] {
    return this.skillBrain.getAllSkillMds();
  }

  /**
   * Get all skills across the system
   */
  getAllSkills(): SkillEntry[] {
    return this.skillBrain.getAllSkills();
  }

  /**
   * Search skills by query
   */
  searchSkills(query: string): SkillEntry[] {
    return this.skillBrain.searchSkills(query);
  }

  /**
   * Get skills by category
   */
  getSkillsByCategory(category: SkillCategory): SkillEntry[] {
    return this.skillBrain.getSkillsByCategory(category);
  }

  /**
   * Get skills by competency level
   */
  getSkillsByCompetency(level: CompetencyLevel): SkillEntry[] {
    return this.skillBrain.getSkillsByCompetency(level);
  }

  /**
   * Get at-risk skills
   */
  getAtRiskSkills(): SkillEntry[] {
    return this.skillBrain.getAtRiskSkills();
  }

  /**
   * Get transfer-ready skills
   */
  getTransferReadySkills(): SkillEntry[] {
    return this.skillBrain.getTransferReadySkills();
  }

  /**
   * Get skills for a person
   */
  getPersonSkills(email: string): SkillEntry[] {
    return this.getAllSkills().filter(s =>
      s.verifiedBy.includes(email) ||
      s.sources.some(src =>
        src.path?.includes(email) ||
        src.title?.includes(email)
      )
    );
  }

  /**
   * Register a person in the skill brain
   */
  registerPerson(person: {
    name: string;
    email: string;
    role: string;
    department: string;
  }): void {
    // We extract skills for this person from their known contributions
    console.log(`[SkillBrainService] Person registered: ${person.name} (${person.email})`);
  }

  /**
   * Create transfer plan for departing employee
   */
  createTransferPlan(
    personId: string,
    personName: string,
    targetPersonId?: string,
    targetPersonName?: string
  ): TransferPlan {
    const plan = this.skillBrain.createTransferPlan(
      personId,
      personName,
      targetPersonId,
      targetPersonName
    );

    companyBrainWebSocketService.broadcastRiskAlert({
      type: 'skill_transfer_plan_created',
      personId,
      personName,
      planId: plan.id,
      skillCount: plan.skills.length,
      priority: plan.priority,
      message: `Skill transfer plan created for ${personName} with ${plan.skills.length} skills to transfer`,
    });

    return plan;
  }

  /**
   * Execute skill transfer plan — generate skill.md files for each skill
   */
  async executeTransferPlan(plan: TransferPlan): Promise<{
    completed: number;
    failed: number;
    total: number;
  }> {
    let completed = 0;
    let failed = 0;

    for (const skill of plan.skills) {
      try {
        const existingMd = this.skillBrain.getSkillMd(skill.skillId);
        if (existingMd) {
          existingMd.metadata.transferReadiness = TransferReadiness.TRANSFERRED;
          completed++;
        } else {
          failed++;
        }
      } catch {
        failed++;
      }
    }

    plan.status = completed > 0 ? 'in_progress' : 'cancelled';
    plan.updatedAt = new Date().toISOString();
    if (completed === plan.skills.length) {
      plan.status = 'completed';
      plan.completedAt = new Date().toISOString();
    }

    companyBrainWebSocketService.broadcastAnalyticsUpdate({
      type: 'skill_transfer_executed',
      planId: plan.id,
      completed,
      failed,
      total: plan.skills.length,
    });

    return { completed, failed, total: plan.skills.length };
  }

  /**
   * Get statistics
   */
  getStatistics(): SkillBrainStats {
    return this.skillBrain.getStatistics();
  }

  /**
   * Generate skill brain index
   */
  async generateIndex(): Promise<string> {
    return await this.skillBrain.generateIndex();
  }

  /**
   * Export all skill brain data
   */
  async export(): Promise<{
    manifest: SkillManifest;
    skillMds: SkillMd[];
    statistics: SkillBrainStats;
  }> {
    return await this.skillBrain.export();
  }

  /**
   * Import skill brain data
   */
  async import(data: {
    manifest?: SkillManifest;
    skillMds?: SkillMd[];
  }): Promise<void> {
    return await this.skillBrain.import(data);
  }

  /**
   * Get department skill coverage
   */
  getDepartmentCoverage(department: string): {
    totalSkills: number;
    coveredSkills: number;
    coveragePercent: number;
    atRiskSkills: SkillEntry[];
    topSkills: SkillEntry[];
  } {
    const allSkills = this.getAllSkills();
    const stats = this.getStatistics();
    const departmentPeople = stats.peopleByDepartment[department] || 0;

    const coveredSkills = allSkills.filter(s =>
      s.sources.length > 0 && s.verifiedBy.length > 0
    );

    const departmentSkills = allSkills.filter(s =>
      s.tags.includes(department.toLowerCase())
    );

    const atRisk = departmentSkills.filter(s =>
      s.competencyLevel === CompetencyLevel.EXPERT &&
      (s.sources.length === 0 || s.verifiedBy.length === 0)
    );

    return {
      totalSkills: departmentSkills.length,
      coveredSkills: coveredSkills.length,
      coveragePercent: departmentSkills.length > 0
        ? Math.round((coveredSkills.length / departmentSkills.length) * 100)
        : 0,
      atRiskSkills: atRisk.slice(0, 10),
      topSkills: departmentSkills
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 10),
    };
  }

  /**
   * Health check
   */
  getHealth(): {
    status: 'healthy' | 'degraded' | 'unhealthy';
    initialized: boolean;
    stats: SkillBrainStats;
    errors: string[];
  } {
    const errors: string[] = [];
    if (!this.initialized) errors.push('Service not initialized');

    const stats = this.skillBrain.getStatistics();

    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    if (errors.length > 0) status = 'degraded';
    if (stats.overallRiskScore > 80) {
      errors.push('Critical risk level detected');
      status = 'degraded';
    }

    return { status, initialized: this.initialized, stats, errors };
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }
  }
}

export const skillBrainService = new SkillBrainService();
