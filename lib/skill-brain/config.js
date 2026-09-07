"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRANSFER_READINESS_THRESHOLDS = exports.SUPPORTED_CONTENT_TYPES = exports.SKILL_MD_TEMPLATE = exports.SKILL_INDEX_HEADER = exports.SKILL_MD_FILENAME = exports.DEFAULT_SKILL_BRAIN_CONFIG = void 0;
exports.getPersonSkillBrainConfig = getPersonSkillBrainConfig;
exports.getAgentSkillBrainConfig = getAgentSkillBrainConfig;
exports.DEFAULT_SKILL_BRAIN_CONFIG = {
    basePath: '/skill-brain',
    skillMdDir: '/skill-brain/skills',
    skillIndexPath: '/skill-brain/index.md',
    skillManifestPath: '/skill-brain/.manifest.json',
    skillLogPath: '/skill-brain/log.md',
    maxContextWindow: 128000,
    enableAutoExtract: true,
    enableTransferTracking: true,
};
function getPersonSkillBrainConfig(personId) {
    const basePath = `/skill-brain/people/${personId}`;
    return {
        basePath,
        skillMdDir: `${basePath}/skills`,
        skillIndexPath: `${basePath}/index.md`,
        skillManifestPath: `${basePath}/.manifest.json`,
        skillLogPath: `${basePath}/log.md`,
        maxContextWindow: 128000,
        enableAutoExtract: true,
        enableTransferTracking: true,
    };
}
function getAgentSkillBrainConfig(agentId) {
    const basePath = `/skill-brain/agents/${agentId}`;
    return {
        basePath,
        skillMdDir: `${basePath}/skills`,
        skillIndexPath: `${basePath}/index.md`,
        skillManifestPath: `${basePath}/.manifest.json`,
        skillLogPath: `${basePath}/log.md`,
        maxContextWindow: 128000,
        enableAutoExtract: true,
        enableTransferTracking: true,
    };
}
exports.SKILL_MD_FILENAME = 'skill.md';
exports.SKILL_INDEX_HEADER = `# Skill Brain Index

This index tracks all skill.md files in the skill brain system.

## Summary

- Total Skill MD files:
- Total Skills:
- Total People:
- At-Risk Skills:
- Transfer Ready:

## By Category

## By Competency Level

## By Department

---

*Last updated:`;
exports.SKILL_MD_TEMPLATE = `---
title: ""
contentType: "document"
generatedAt: ""
updatedAt: ""
version: "1.0.0"
sourceCount: 0
skillCount: 0
personCount: 0
transferReadiness: "not_ready"
coverageScore: 0
riskScore: 100
---

# Skill: {{TITLE}}

## Summary

{{SUMMARY}}

## Skills

## People

## Relationships

## Transfer Readiness

**Status:** {{TRANSFER_READINESS}}
**Coverage:** {{COVERAGE_SCORE}}%
**Risk:** {{RISK_SCORE}}%

## Source Documents

## Evidence

`;
exports.SUPPORTED_CONTENT_TYPES = [
    'document',
    'file',
    'conversation',
    'meeting',
    'email',
    'chat',
    'code',
    'decision',
    'project',
    'tribal',
    'sop',
    'workflow',
    'playbook',
    'note',
];
exports.TRANSFER_READINESS_THRESHOLDS = {
    critical: { coverageMin: 90, documentationRequired: true, verifiedRequired: true },
    high: { coverageMin: 75, documentationRequired: true, verifiedRequired: false },
    medium: { coverageMin: 60, documentationRequired: false, verifiedRequired: false },
    low: { coverageMin: 0, documentationRequired: false, verifiedRequired: false },
};
//# sourceMappingURL=config.js.map