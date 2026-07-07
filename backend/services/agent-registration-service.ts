/**
 * Agent Registration Service
 * Auto-registers all agents from the registry into the database with their
 * system prompts, tools, capabilities, and configurations.
 * This makes ALL 4,469 agents immediately callable through the backend.
 */

import { eq, sql } from 'drizzle-orm';
import { aiAgents, aiAgentEvents } from '../db/drizzle-schema';
import { db } from '../db/connection';
import { agentRegistry } from '../../constants/aiAgentRegistry';
import {
  getDepartmentConfig,
  getAgentSystemPrompt,
  getAgentCapabilities,
  getAgentTools,
  getAllAgentTools,
} from '../../constants/agent-configurations';
import { v4 as uuidv4 } from 'uuid';

interface RegistrationResult {
  total: number;
  created: number;
  updated: number;
  errors: number;
  errorDetails: string[];
}

/**
 * Register all agents from the registry into the database.
 * Skips agents that already exist (by uid).
 */
export async function registerAllAgents(organizationId: string): Promise<RegistrationResult> {
  const result: RegistrationResult = {
    total: agentRegistry.length,
    created: 0,
    updated: 0,
    errors: 0,
    errorDetails: [],
  };

  console.log(`[AgentRegistration] Starting registration of ${result.total} agents...`);

  // Process in batches of 100 for efficiency
  const batchSize = 100;
  for (let i = 0; i < agentRegistry.length; i += batchSize) {
    const batch = agentRegistry.slice(i, i + batchSize);

    for (const entry of batch) {
      try {
        const deptConfig = getDepartmentConfig(entry.departmentId);
        const systemPrompt = getAgentSystemPrompt(entry.departmentId, entry.level, entry.title);
        const capabilities = getAgentCapabilities(entry.departmentId, entry.level);
        const tools = getAgentTools(entry.departmentId, entry.level);

        // Check if agent already exists
        const existing = await db
          .select({ id: aiAgents.id })
          .from(aiAgents)
          .where(eq(aiAgents.name, entry.title))
          .limit(1);

        const agentConfig = {
          systemPrompt,
          capabilities,
          tools: tools.map(t => ({
            name: t.name,
            description: t.description,
            parameters: t.parameters,
            category: t.category,
            enabled: true,
          })),
          model: entry.level === 'c_level' ? 'gpt-4-turbo' : entry.level === 'vp_director' ? 'gpt-4' : 'gpt-4-turbo',
          temperature: entry.level === 'c_level' ? 0.3 : entry.level === 'specialist' ? 0.7 : 0.5,
          maxTokens: entry.level === 'c_level' ? 4096 : 2048,
          department: entry.department,
          departmentId: entry.departmentId,
          level: entry.level,
          type: entry.type,
          parentId: entry.parentId,
          route: entry.route,
          sidebarId: entry.sidebarId,
          uid: entry.uid,
          hierarchyId: entry.hierarchyId,
        };

        if (existing.length > 0) {
          // Update existing agent
          await db
            .update(aiAgents)
            .set({
              config: agentConfig,
              systemPrompt,
              capabilities,
              status: 'active',
              updatedAt: new Date(),
            })
            .where(eq(aiAgents.id, existing[0].id));
          result.updated++;
        } else {
          // Create new agent
          const agentId = uuidv4();
          await db.insert(aiAgents).values({
            id: agentId,
            organizationId,
            name: entry.title,
            type: `department-${entry.departmentId}`,
            description: deptConfig
              ? `${entry.title} - ${deptConfig.department}`
              : entry.title,
            model: agentConfig.model,
            status: 'active',
            config: agentConfig,
            systemPrompt,
            capabilities,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          // Log creation event
          await db.insert(aiAgentEvents).values({
            id: uuidv4(),
            organizationId,
            agentId,
            agentType: `department-${entry.departmentId}`,
            eventType: 'agent_registered',
            status: 'success',
            action: 'auto_registration',
            details: JSON.stringify({
              uid: entry.uid,
              department: entry.department,
              level: entry.level,
              toolCount: tools.length,
              capabilityCount: capabilities.length,
            }),
            timestamp: new Date(),
          });

          result.created++;
        }
      } catch (error) {
        result.errors++;
        result.errorDetails.push(
          `${entry.uid}: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    }

    // Log progress every batch
    console.log(
      `[AgentRegistration] Progress: ${Math.min(i + batchSize, agentRegistry.length)}/${result.total} ` +
      `(created: ${result.created}, updated: ${result.updated}, errors: ${result.errors})`
    );
  }

  console.log(`[AgentRegistration] Complete: ${result.created} created, ${result.updated} updated, ${result.errors} errors`);
  return result;
}

/**
 * Get agent configuration by agent UID from the database.
 * Falls back to registry-based configuration if not in DB.
 */
export async function getAgentConfig(uid: string, organizationId?: string): Promise<{
  systemPrompt: string;
  capabilities: string[];
  tools: any[];
  config: any;
} | null> {
  // Try database first
  if (organizationId) {
    const dbAgent = await db
      .select()
      .from(aiAgents)
      .where(eq(aiAgents.name, uid))
      .limit(1);

    if (dbAgent.length > 0 && dbAgent[0].systemPrompt) {
      return {
        systemPrompt: dbAgent[0].systemPrompt || '',
        capabilities: (dbAgent[0].capabilities as string[]) || [],
        tools: ((dbAgent[0].config as any)?.tools) || [],
        config: dbAgent[0].config || {},
      };
    }
  }

  // Fallback to registry
  const entry = agentRegistry.find(a => a.uid === uid || a.sidebarId === uid);
  if (!entry) return null;

  return {
    systemPrompt: getAgentSystemPrompt(entry.departmentId, entry.level, entry.title),
    capabilities: getAgentCapabilities(entry.departmentId, entry.level),
    tools: getAgentTools(entry.departmentId, entry.level),
    config: {
      department: entry.department,
      departmentId: entry.departmentId,
      level: entry.level,
      type: entry.type,
      route: entry.route,
    },
  };
}

/**
 * Get all registered agents for an organization.
 */
export async function getRegisteredAgents(organizationId: string): Promise<any[]> {
  return db
    .select()
    .from(aiAgents)
    .where(eq(aiAgents.organizationId, organizationId))
    .orderBy(aiAgents.createdAt);
}

/**
 * Seed default consulting agents (the 8 that existed before).
 * Now enhanced with full configurations.
 */
export async function seedDefaultAgents(organizationId: string): Promise<void> {
  const defaultAgents = [
    { uid: 'main-agent', title: 'Main Agent', departmentId: 0, level: 'c_level' },
    { uid: 'agent-consulting', title: 'Agent Consulting', departmentId: 0, level: 'c_level' },
    { uid: 'cx-ai', title: 'Customer Experience AI', departmentId: 1, level: 'c_level' },
    { uid: 'sales-ai', title: 'Sales & Revenue AI', departmentId: 2, level: 'c_level' },
    { uid: 'marketing-ai', title: 'Marketing & Growth AI', departmentId: 3, level: 'c_level' },
    { uid: 'operations-ai', title: 'Operations & Management AI', departmentId: 4, level: 'c_level' },
    { uid: 'data-ai', title: 'Data & Intelligence AI', departmentId: 9, level: 'c_level' },
    { uid: 'analytics-ai', title: 'Analytics & Insights AI', departmentId: 9, level: 'vp_director' },
  ];

  for (const agent of defaultAgents) {
    try {
      const existing = await db
        .select({ id: aiAgents.id })
        .from(aiAgents)
        .where(eq(aiAgents.name, agent.title))
        .limit(1);

      if (existing.length === 0) {
        const systemPrompt = getAgentSystemPrompt(agent.departmentId, agent.level, agent.title);
        const capabilities = getAgentCapabilities(agent.departmentId, agent.level);
        const tools = getAgentTools(agent.departmentId, agent.level);

        await db.insert(aiAgents).values({
          id: uuidv4(),
          organizationId,
          name: agent.title,
          type: 'default',
          description: `${agent.title} - Core AI agent`,
          model: 'gpt-4-turbo',
          status: 'active',
          config: {
            systemPrompt,
            capabilities,
            tools: tools.map(t => ({
              name: t.name,
              description: t.description,
              parameters: t.parameters,
              category: t.category,
              enabled: true,
            })),
            uid: agent.uid,
          },
          systemPrompt,
          capabilities,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log(`[AgentRegistration] Seeded default agent: ${agent.title}`);
      }
    } catch (error) {
      console.error(`[AgentRegistration] Failed to seed ${agent.title}:`, error);
    }
  }
}

/**
 * Get the total count of registered agents.
 */
export async function getAgentCount(organizationId: string): Promise<number> {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(aiAgents)
    .where(eq(aiAgents.organizationId, organizationId));
  return result[0]?.count || 0;
}
