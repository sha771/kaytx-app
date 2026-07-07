import { SkillBrainConfig } from './types';

export const DEFAULT_SKILL_BRAIN_CONFIG: SkillBrainConfig = {
  basePath: '/skill-brain',
  skillMdDir: '/skill-brain/skills',
  skillIndexPath: '/skill-brain/index.md',
  skillManifestPath: '/skill-brain/.manifest.json',
  skillLogPath: '/skill-brain/log.md',
  maxContextWindow: 128000,
  enableAutoExtract: true,
  enableTransferTracking: true,
};

export function getPersonSkillBrainConfig(personId: string): SkillBrainConfig {
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

export function getAgentSkillBrainConfig(agentId: string): SkillBrainConfig {
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

export const SKILL_MD_FILENAME = 'skill.md';

export const SKILL_INDEX_HEADER = `# Skill Brain Index

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

export const SKILL_MD_TEMPLATE = `---
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

export const SUPPORTED_CONTENT_TYPES = [
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
] as const;

export const TRANSFER_READINESS_THRESHOLDS = {
  critical: { coverageMin: 90, documentationRequired: true, verifiedRequired: true },
  high: { coverageMin: 75, documentationRequired: true, verifiedRequired: false },
  medium: { coverageMin: 60, documentationRequired: false, verifiedRequired: false },
  low: { coverageMin: 0, documentationRequired: false, verifiedRequired: false },
};
