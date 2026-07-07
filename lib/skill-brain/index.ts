/**
 * Skill Brain System
 * Enterprise skill capture, documentation, and transfer system
 *
 * Three-layer architecture:
 * 1. Raw Content → Extractor extracts skills, people, and relationships
 * 2. Skill.md Generator → Creates structured skill.md markdown files
 * 3. Skill Brain Manager → Orchestrates storage, query, and transfer
 *
 * Key capabilities:
 * - Extract skills from any content type (documents, code, conversations, etc.)
 * - Generate skill.md files with frontmatter and structured body
 * - Track skill transfer readiness for departure/succession planning
 * - Search and query skills across the entire skill brain
 * - Create transfer plans for employee departure handoff
 */

import { SkillBrainManager } from './skill-brain-manager';
import {
  SkillBrainConfig,
  SkillMd,
  SkillEntry,
  SkillPerson,
  SkillRelation,
  SkillManifest,
  SkillBrainStats,
  TransferPlan,
  SkillExtractResult,
  SkillQueryResult,
  CompetencyLevel,
  TransferReadiness,
  ContentType,
  SkillCategory,
  SkillRelationshipType,
  SkillSource,
} from './types';
import { SkillExtractor } from './extractor';
import { SkillMdGenerator } from './skill-md-generator';
import {
  DEFAULT_SKILL_BRAIN_CONFIG,
  getPersonSkillBrainConfig,
  getAgentSkillBrainConfig,
} from './config';

export class SkillBrain {
  private manager: SkillBrainManager;

  constructor(config?: Partial<SkillBrainConfig>) {
    this.manager = SkillBrainManager.getInstance(config);
  }

  async initialize(): Promise<void> {
    await this.manager.initialize();
  }

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
    return await this.manager.extractAndSave(text, contentType, options || {});
  }

  async extractFromCode(
    code: string,
    language: string,
    options?: {
      sourceTitle?: string;
      sourcePath?: string;
      personName?: string;
      personEmail?: string;
    }
  ): Promise<SkillExtractResult> {
    return await this.manager.extractFromCode(code, language, options || {});
  }

  getSkillMd(id: string): SkillMd | undefined {
    return this.manager.getSkillMd(id);
  }

  getAllSkillMds(): SkillMd[] {
    return this.manager.getAllSkillMds();
  }

  getAllSkills(): SkillEntry[] {
    return this.manager.getAllSkills();
  }

  searchSkills(query: string): SkillEntry[] {
    return this.manager.searchSkills(query);
  }

  getSkillsByCategory(category: SkillCategory): SkillEntry[] {
    return this.manager.getSkillsByCategory(category);
  }

  getSkillsByCompetency(level: CompetencyLevel): SkillEntry[] {
    return this.manager.getSkillsByCompetency(level);
  }

  getAtRiskSkills(): SkillEntry[] {
    return this.manager.getAtRiskSkills();
  }

  getTransferReadySkills(): SkillEntry[] {
    return this.manager.getTransferReadySkills();
  }

  createTransferPlan(
    personId: string,
    personName: string,
    targetPersonId?: string,
    targetPersonName?: string
  ): TransferPlan {
    return this.manager.createTransferPlan(
      personId,
      personName,
      targetPersonId,
      targetPersonName
    );
  }

  getStatistics(): SkillBrainStats {
    return this.manager.getStatistics();
  }

  async generateIndex(): Promise<string> {
    return await this.manager.generateIndex();
  }

  async export(): Promise<{
    manifest: SkillManifest;
    skillMds: SkillMd[];
    statistics: SkillBrainStats;
  }> {
    return await this.manager.export();
  }

  async import(data: {
    manifest?: SkillManifest;
    skillMds?: SkillMd[];
  }): Promise<void> {
    return await this.manager.import(data);
  }

  async reset(): Promise<void> {
    return await this.manager.reset();
  }
}

export * from './types';
export * from './config';
export { SkillBrainManager } from './skill-brain-manager';
export { SkillExtractor } from './extractor';
export { SkillMdGenerator } from './skill-md-generator';

export default SkillBrain;
