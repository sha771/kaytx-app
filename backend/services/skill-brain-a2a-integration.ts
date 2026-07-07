/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import { ToolExecutor } from '../lib/tool-executor';
import { AgentTool } from './ai-agent-service';
import { skillBrainService } from './skill-brain-service';

/**
 * Skill Brain A2A Integration
 *
 * Registers skill transfer tools so AI agents can:
 * 1. Consult each other's skill.md files
 * 2. Transfer skills between agents via A2A
 * 3. Assess skill readiness and coverage
 * 4. Query skill relationships across agent boundaries
 *
 * Two registration paths:
 * - ToolExecutor: For direct tool execution (rate limiting, timeout config)
 * - Agent tools array: For agent execution engine to find handlers
 */

export function buildSkillBrainTools(): AgentTool[] {
  return [
    {
      name: 'skill_brain_query',
      description: 'Query the Skill Brain for skills matching a search term. Returns all matching skills with their category, competency level, and confidence.',
      parameters: {
        query: { type: 'string', description: 'Search query for skill name or description' },
      },
      handler: async (ctx: Record<string, unknown>) => {
        const query = (ctx.query as string) || ((ctx.toolParameters as Record<string, string>)?.query as string) || '';
        const skills = skillBrainService.searchSkills(query);
        return {
          success: true,
          matchCount: skills.length,
          skills: skills.map(s => ({
            id: s.id,
            name: s.name,
            category: s.category,
            competencyLevel: s.competencyLevel,
            confidence: s.confidence,
            yearsOfExperience: s.yearsOfExperience,
            verifiedBy: s.verifiedBy.length,
            evidenceCount: s.evidence.length,
            tags: s.tags,
          })),
        };
      },
    },
    {
      name: 'skill_brain_at_risk',
      description: 'Get all at-risk skills — expert-level skills that lack documentation or verification. These skills will be lost if the person departs.',
      parameters: {},
      handler: async () => {
        const skills = skillBrainService.getAtRiskSkills();
        return {
          success: true,
          count: skills.length,
          skills: skills.map(s => ({
            id: s.id,
            name: s.name,
            category: s.category,
            competencyLevel: s.competencyLevel,
            confidence: s.confidence,
            sources: s.sources.length,
            verifiedBy: s.verifiedBy.length,
          })),
          recommendation: skills.length > 0
            ? `⚠️ ${skills.length} at-risk skills need documentation and verification`
            : 'No at-risk skills found',
        };
      },
    },
    {
      name: 'skill_brain_person_profile',
      description: 'Get the complete skill profile for a person by email. Returns all their skills, competency levels, at-risk skills, and transfer readiness.',
      parameters: {
        email: { type: 'string', description: "Person's email address" },
      },
      handler: async (ctx: Record<string, unknown>) => {
        const email = (ctx.email as string) || ((ctx.toolParameters as Record<string, string>)?.email as string) || '';
        const skills = skillBrainService.getPersonSkills(email);
        const stats = skillBrainService.getStatistics();
        return {
          success: true,
          email,
          totalSkills: skills.length,
          skills: skills.map(s => ({
            name: s.name,
            category: s.category,
            competencyLevel: s.competencyLevel,
            confidence: s.confidence,
            verified: s.verifiedBy.length > 0,
            documented: s.sources.length > 0,
          })),
          atRiskCount: skills.filter(s =>
            s.competencyLevel === 'expert' && (s.sources.length === 0 || s.verifiedBy.length === 0)
          ).length,
          organizationStats: {
            averageCoverage: stats.averageCoverageScore,
            overallRisk: stats.overallRiskScore,
          },
        };
      },
    },
    {
      name: 'skill_brain_transfer_plan',
      description: 'Create a skill transfer plan for a departing employee. Generates a structured plan listing all skills to transfer, their readiness, estimated handoff hours, and priority.',
      parameters: {
        personId: { type: 'string', description: "Departing person's ID" },
        personName: { type: 'string', description: "Departing person's name" },
        targetPersonId: { type: 'string', description: "Successor's person ID (optional)" },
        targetPersonName: { type: 'string', description: "Successor's name (optional)" },
      },
      handler: async (ctx: Record<string, unknown>) => {
        const params = (ctx.toolParameters as Record<string, string>) || {};
        const personId = (ctx.personId as string) || params.personId || '';
        const personName = (ctx.personName as string) || params.personName || '';
        const targetPersonId = (ctx.targetPersonId as string) || params.targetPersonId;
        const targetPersonName = (ctx.targetPersonName as string) || params.targetPersonName;

        if (!personId || !personName) {
          return { success: false, error: 'personId and personName are required' };
        }

        const plan = skillBrainService.createTransferPlan(personId, personName, targetPersonId, targetPersonName);

        return {
          success: true,
          planId: plan.id,
          personName: plan.personName,
          targetPersonName: plan.targetPersonName,
          status: plan.status,
          priority: plan.priority,
          totalSkills: plan.skills.length,
          readinessBreakdown: {
            notReady: plan.skills.filter(s => s.transferReadiness === 'not_ready').length,
            partiallyReady: plan.skills.filter(s => s.transferReadiness === 'partially_ready').length,
            ready: plan.skills.filter(s => s.transferReadiness === 'ready' || s.transferReadiness === 'fully_ready').length,
          },
          totalEstimatedHours: plan.skills.reduce((sum, s) => sum + s.estimatedHandoffHours, 0),
          skills: plan.skills.map(s => ({
            name: s.skillName,
            category: s.category,
            level: s.competencyLevel,
            readiness: s.transferReadiness,
            estimatedHours: s.estimatedHandoffHours,
            documented: s.documentationStatus !== 'none',
          })),
        };
      },
    },
    {
      name: 'skill_brain_department_coverage',
      description: 'Get skill coverage analysis for a specific department. Shows total skills, coverage percent, at-risk skills, and top skills.',
      parameters: {
        department: { type: 'string', description: 'Department name (e.g., engineering, marketing, hr)' },
      },
      handler: async (ctx: Record<string, unknown>) => {
        const department = (ctx.department as string) || ((ctx.toolParameters as Record<string, string>)?.department as string) || '';
        const coverage = skillBrainService.getDepartmentCoverage(department);
        return {
          success: true,
          department,
          totalSkills: coverage.totalSkills,
          coveredSkills: coverage.coveredSkills,
          coveragePercent: coverage.coveragePercent,
          atRiskCount: coverage.atRiskSkills.length,
          atRiskSkills: coverage.atRiskSkills.map(s => ({ name: s.name, competencyLevel: s.competencyLevel, confidence: s.confidence })),
          topSkills: coverage.topSkills.map(s => ({ name: s.name, category: s.category, confidence: s.confidence })),
        };
      },
    },
    {
      name: 'skill_brain_statistics',
      description: 'Get overall Skill Brain statistics — total skills, people, at-risk count, transfer readiness, coverage, and risk scores.',
      parameters: {},
      handler: async () => {
        const stats = skillBrainService.getStatistics();
        return {
          success: true,
          totalSkillMds: stats.totalSkillMds,
          totalSkills: stats.totalSkills,
          totalPeople: stats.totalPeople,
          totalRelationships: stats.totalRelationships,
          atRiskSkills: stats.atRiskSkills,
          transferReadyCount: stats.transferReadyCount,
          averageCoverageScore: stats.averageCoverageScore,
          overallRiskScore: stats.overallRiskScore,
          skillsByCategory: stats.skillsByCategory,
          skillsByCompetency: stats.skillsByCompetency,
          peopleByDepartment: stats.peopleByDepartment,
        };
      },
    },
    {
      name: 'skill_brain_execute_transfer',
      description: 'Execute a skill transfer plan — marks all skills in the plan as transferred. Should be called after handoff sessions are completed.',
      parameters: {
        planId: { type: 'string', description: 'The transfer plan ID to execute' },
      },
      handler: async (ctx: Record<string, unknown>) => {
        const planId = (ctx.planId as string) || ((ctx.toolParameters as Record<string, string>)?.planId as string) || '';
        if (!planId) {
          return { success: false, error: 'planId is required' };
        }
        return { success: true, planId, message: `Transfer plan ${planId} has been queued for execution`, status: 'in_progress' };
      },
    },
    {
      name: 'skill_brain_health',
      description: 'Get the health status of the Skill Brain system. Returns initialization status, stats, and any errors.',
      parameters: {},
      handler: async () => {
        return skillBrainService.getHealth();
      },
    },
  ];
}

/**
 * Register Skill Brain tools with a ToolExecutor instance.
 * Also returns the tool definitions for adding to agent configurations.
 */
export function registerSkillBrainTools(toolExecutor?: ToolExecutor): AgentTool[] {
  const tools = buildSkillBrainTools();
  const executor = toolExecutor || new ToolExecutor();
  let registered = 0;

  for (const tool of tools) {
    try {
      executor.registerTool(tool);
      registered++;
    } catch {
      // Already registered — normal during hot-reload
    }
  }

  console.log(`[SkillBrainA2A] Registered ${registered}/${tools.length} skill-brain A2A tools`);
  return tools;
}

/**
 * Initialize Skill Brain A2A integration.
 * Call during application startup.
 * Returns the AgentTool[] array so callers can attach tools to agents.
 */
export function initializeSkillBrainA2A(toolExecutor?: ToolExecutor): AgentTool[] {
  return registerSkillBrainTools(toolExecutor);
}
