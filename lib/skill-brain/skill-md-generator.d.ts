import { SkillMd, SkillEntry, SkillPerson } from './types';
export declare class SkillMdGenerator {
    /**
     * Generate a skill.md markdown string from a SkillMd object
     */
    generate(skillMd: SkillMd): string;
    /**
     * Parse a skill.md markdown string back into a SkillMd object
     */
    parse(raw: string): Partial<SkillMd>;
    /**
     * Generate a skill.md from extracted data
     */
    fromExtraction(data: Partial<SkillMd>): SkillMd;
    /**
     * Update an existing skill.md with new data
     */
    update(existing: SkillMd, updates: Partial<SkillMd>): SkillMd;
    /**
     * Render a skill entry as markdown
     */
    renderSkillEntry(skill: SkillEntry, index: number): string;
    /**
     * Render a person entry as markdown
     */
    renderPerson(person: SkillPerson): string;
    private generateFrontmatter;
    private generateBody;
    private addMetadataSection;
    private addSkillsSection;
    private addPeopleSection;
    private addRelationshipsSection;
    private addTransferReadinessSection;
    private parseFrontmatter;
    private parseBody;
    private calculateOverallReadiness;
    private mergeSkills;
    private mergePeople;
    private mergeRelationships;
}
export declare const skillMdGenerator: SkillMdGenerator;
//# sourceMappingURL=skill-md-generator.d.ts.map