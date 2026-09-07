import { SkillBrainConfig } from './types';
export declare const DEFAULT_SKILL_BRAIN_CONFIG: SkillBrainConfig;
export declare function getPersonSkillBrainConfig(personId: string): SkillBrainConfig;
export declare function getAgentSkillBrainConfig(agentId: string): SkillBrainConfig;
export declare const SKILL_MD_FILENAME = "skill.md";
export declare const SKILL_INDEX_HEADER = "# Skill Brain Index\n\nThis index tracks all skill.md files in the skill brain system.\n\n## Summary\n\n- Total Skill MD files:\n- Total Skills:\n- Total People:\n- At-Risk Skills:\n- Transfer Ready:\n\n## By Category\n\n## By Competency Level\n\n## By Department\n\n---\n\n*Last updated:";
export declare const SKILL_MD_TEMPLATE = "---\ntitle: \"\"\ncontentType: \"document\"\ngeneratedAt: \"\"\nupdatedAt: \"\"\nversion: \"1.0.0\"\nsourceCount: 0\nskillCount: 0\npersonCount: 0\ntransferReadiness: \"not_ready\"\ncoverageScore: 0\nriskScore: 100\n---\n\n# Skill: {{TITLE}}\n\n## Summary\n\n{{SUMMARY}}\n\n## Skills\n\n## People\n\n## Relationships\n\n## Transfer Readiness\n\n**Status:** {{TRANSFER_READINESS}}\n**Coverage:** {{COVERAGE_SCORE}}%\n**Risk:** {{RISK_SCORE}}%\n\n## Source Documents\n\n## Evidence\n\n";
export declare const SUPPORTED_CONTENT_TYPES: readonly ["document", "file", "conversation", "meeting", "email", "chat", "code", "decision", "project", "tribal", "sop", "workflow", "playbook", "note"];
export declare const TRANSFER_READINESS_THRESHOLDS: {
    critical: {
        coverageMin: number;
        documentationRequired: boolean;
        verifiedRequired: boolean;
    };
    high: {
        coverageMin: number;
        documentationRequired: boolean;
        verifiedRequired: boolean;
    };
    medium: {
        coverageMin: number;
        documentationRequired: boolean;
        verifiedRequired: boolean;
    };
    low: {
        coverageMin: number;
        documentationRequired: boolean;
        verifiedRequired: boolean;
    };
};
//# sourceMappingURL=config.d.ts.map