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
import { SkillBrainConfig, SkillMd, SkillEntry, SkillManifest, SkillBrainStats, TransferPlan, SkillExtractResult, CompetencyLevel, ContentType, SkillCategory } from './types';
export declare class SkillBrain {
    private manager;
    constructor(config?: Partial<SkillBrainConfig>);
    initialize(): Promise<void>;
    extractFromText(text: string, contentType: ContentType, options?: {
        sourceTitle?: string;
        sourcePath?: string;
        sourceUrl?: string;
        skillMdId?: string;
        personName?: string;
        personEmail?: string;
    }): Promise<SkillExtractResult>;
    extractFromCode(code: string, language: string, options?: {
        sourceTitle?: string;
        sourcePath?: string;
        personName?: string;
        personEmail?: string;
    }): Promise<SkillExtractResult>;
    getSkillMd(id: string): SkillMd | undefined;
    getAllSkillMds(): SkillMd[];
    getAllSkills(): SkillEntry[];
    searchSkills(query: string): SkillEntry[];
    getSkillsByCategory(category: SkillCategory): SkillEntry[];
    getSkillsByCompetency(level: CompetencyLevel): SkillEntry[];
    getAtRiskSkills(): SkillEntry[];
    getTransferReadySkills(): SkillEntry[];
    createTransferPlan(personId: string, personName: string, targetPersonId?: string, targetPersonName?: string): TransferPlan;
    getStatistics(): SkillBrainStats;
    generateIndex(): Promise<string>;
    export(): Promise<{
        manifest: SkillManifest;
        skillMds: SkillMd[];
        statistics: SkillBrainStats;
    }>;
    import(data: {
        manifest?: SkillManifest;
        skillMds?: SkillMd[];
    }): Promise<void>;
    reset(): Promise<void>;
}
export * from './types';
export * from './config';
export { SkillBrainManager } from './skill-brain-manager';
export { SkillExtractor } from './extractor';
export { SkillMdGenerator } from './skill-md-generator';
export default SkillBrain;
//# sourceMappingURL=index.d.ts.map