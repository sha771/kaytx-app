import { ContentType, SkillEntry, SkillRelation, SkillMd } from './types';
export interface ExtractionOptions {
    sourceTitle?: string;
    sourcePath?: string;
    sourceUrl?: string;
    confidence?: number;
    personName?: string;
    personEmail?: string;
}
export declare class SkillExtractor {
    /**
     * Extract skills from text content using heuristic pattern matching
     * This provides a baseline extraction without requiring an LLM call.
     */
    extractFromText(text: string, contentType: ContentType, options?: ExtractionOptions): Partial<SkillMd>;
    /**
     * Analyze skill entry for transfer readiness
     */
    analyzeTransferReadiness(skill: SkillEntry): {
        readiness: 'not_ready' | 'partially_ready' | 'ready' | 'fully_ready';
        gaps: string[];
    };
    /**
     * Extract skill relationships from a set of skills
     */
    extractSkillRelationships(skills: SkillEntry[]): SkillRelation[];
    /**
     * Merge two partial skill MDs into one
     */
    mergeSkillMds(existing: Partial<SkillMd>, incoming: Partial<SkillMd>): Partial<SkillMd>;
    private extractTechnicalSkills;
    private extractPeople;
    private extractRelationships;
    private generateSummary;
    private calculateCoverage;
    private calculateRisk;
    private normalizeName;
    private generateId;
}
export declare const skillExtractor: SkillExtractor;
//# sourceMappingURL=extractor.d.ts.map