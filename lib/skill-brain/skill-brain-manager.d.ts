import { SkillBrainConfig, SkillMd, SkillEntry, SkillManifest, SkillBrainStats, ContentType, CompetencyLevel, SkillCategory, TransferPlan, SkillExtractResult } from './types';
interface FileSystemOps {
    exists: (path: string) => boolean;
    mkdir: (path: string, options?: {
        recursive: boolean;
    }) => void;
    readFile: (path: string, encoding: string) => string;
    writeFile: (path: string, content: string, encoding: string) => void;
    readdir: (path: string) => string[];
    unlink: (path: string) => void;
}
export declare class SkillBrainManager {
    private static instance;
    private config;
    private extractor;
    private generator;
    private fs;
    private manifests;
    private skillMds;
    private constructor();
    static getInstance(config?: Partial<SkillBrainConfig>, fs?: FileSystemOps): SkillBrainManager;
    /**
     * Initialize the skill brain system
     */
    initialize(): Promise<void>;
    /**
     * Extract skills from text content and create/update a skill.md
     */
    extractAndSave(text: string, contentType: ContentType, options?: {
        sourceTitle?: string;
        sourcePath?: string;
        sourceUrl?: string;
        skillMdId?: string;
        personName?: string;
        personEmail?: string;
    }): Promise<SkillExtractResult>;
    /**
     * Extract skills from a code file
     */
    extractFromCode(code: string, language: string, options?: {
        sourceTitle?: string;
        sourcePath?: string;
        personName?: string;
        personEmail?: string;
    }): Promise<SkillExtractResult>;
    /**
     * Get a skill.md by ID
     */
    getSkillMd(id: string): SkillMd | undefined;
    /**
     * Get all skill.md files
     */
    getAllSkillMds(): SkillMd[];
    /**
     * Get all skills across all skill.md files
     */
    getAllSkills(): SkillEntry[];
    /**
     * Search skills by name, tag, or category
     */
    searchSkills(query: string): SkillEntry[];
    /**
     * Get skills by category
     */
    getSkillsByCategory(category: SkillCategory): SkillEntry[];
    /**
     * Get skills by competency level
     */
    getSkillsByCompetency(level: CompetencyLevel): SkillEntry[];
    /**
     * Get at-risk skills (expert-level skills with low documentation coverage)
     */
    getAtRiskSkills(): SkillEntry[];
    /**
     * Get transfer-ready skills
     */
    getTransferReadySkills(): SkillEntry[];
    /**
     * Create a transfer plan for a departing person
     */
    createTransferPlan(personId: string, personName: string, targetPersonId?: string, targetPersonName?: string): TransferPlan;
    /**
     * Get skill brain statistics
     */
    getStatistics(): SkillBrainStats;
    /**
     * Export all skill brain data
     */
    export(): Promise<{
        manifest: SkillManifest;
        skillMds: SkillMd[];
        statistics: SkillBrainStats;
    }>;
    /**
     * Import skill brain data
     */
    import(data: {
        manifest?: SkillManifest;
        skillMds?: SkillMd[];
    }): Promise<void>;
    /**
     * Reset skill brain (clear all data)
     */
    reset(): Promise<void>;
    /**
     * Get the total number of skill entries
     */
    getTotalSkillsCount(): Promise<number>;
    /**
     * Generate skill index markdown
     */
    generateIndex(): Promise<string>;
    private classifyTransferReadiness;
    private estimateHandoffHours;
    private calculateTransferPriority;
    private persistSkillMd;
    private loadSkillMd;
    private loadAllSkillMds;
    private loadManifest;
    private saveManifest;
    private updateManifest;
    private createEmptyManifest;
    private collectAllPeople;
    private ensureDir;
    private removeDir;
    private log;
    private createNodeFs;
}
export declare const skillBrainManager: typeof SkillBrainManager.getInstance;
export {};
//# sourceMappingURL=skill-brain-manager.d.ts.map