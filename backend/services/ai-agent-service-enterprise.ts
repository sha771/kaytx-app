/**
 * AI Agent Service with AI OS Integration
 * Enterprise-grade agent management with full operating system capabilities
 * 
 * This extends the base AIAgentService with AI OS infrastructure integration,
 * providing resource management, sandboxing, distributed execution, and more.
 */

import { EventEmitter } from 'events';
import crypto from 'crypto';
import { db } from '../db/connection';
import { aiAgents, aiAgentEvents, aiConversations } from '../db/drizzle-schema';
import { eq, sql } from 'drizzle-orm';
import { createLogger } from '../lib/production-logger';
import { logAudit } from '../lib/audit';
import { consolidatedMemoryService } from './consolidated-memory-service';
import { agentExecutionEngine } from '../lib/agent-execution';
import { BaseService, ServiceContext, ServiceResponse } from './base-service';

// AI OS Infrastructure Integration
import {
  aiosInfrastructureService,
  EnterpriseAgentConfig,
  DeployedAgent,
  InfrastructureHealth
} from './ai-os-infrastructure';

// AI Provider imports
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

const logger = createLogger('AIAgentServiceEnterprise');

// Types
export enum AgentType {
  VOICE_ASSISTANT = 'voice_assistant',
  CHAT_BOT = 'chat_bot',
  PROCESS_AUTOMATOR = 'process_automation',
  ANALYTICS_AGENT = 'analytics_agent',
  RESEARCH_ASSISTANT = 'research_assistant'
}

export interface AgentTool {
  name: string;
  description: string;
  parameters: Record<string, string | number | boolean | unknown[] | Record<string, unknown> | null>;
  category?: string;
  enabled?: boolean;
  timeout?: number;
  retryAttempts?: number;
  handler?: (ctx: Record<string, unknown>) => Promise<unknown>;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

interface ConversationState {
  sessionId: string;
  agentId: string;
  organizationId: string;
  userId?: string;
  messages: Message[];
  timestamp: number;
}

export interface AgentConfig {
  id: string;
  name: string;
  type: string | AgentType;
  model?: string;
  status?: 'active' | 'inactive' | 'archived' | 'deployed';
  capabilities?: string[];
  tools?: AgentTool[];
  config?: Record<string, string | number | boolean | null>;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  userId?: string;
  organizationId?: string;
  
  // AI OS Enterprise Fields
  deploymentId?: string;
  resources?: {
    cpu: number;
    memory: number;
    gpu?: number;
  };
  securityLevel?: 'low' | 'medium' | 'high' | 'maximum';
  deploymentStrategy?: 'blue-green' | 'rolling' | 'canary' | 'recreate';
  replicated?: boolean;
  replicaCount?: number;
}

export interface AgentToAgentConsultRequest {
  fromAgentId: string;
  query: string;
  domain?: string;
  targetAgentId?: string;
  targetAgentName?: string;
  context?: Record<string, unknown>;
}

export interface AgentToAgentConsultResult {
  consultingAgentId: string;
  targetAgentId: string;
  response: string;
  execution?: unknown;
}

export interface AgentDeploymentStatus {
  agentId: string;
  deploymentId?: string;
  status: 'not_deployed' | 'provisioning' | 'deploying' | 'running' | 'failed' | 'stopped';
  health: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
  resources?: {
    cpu: number;
    memory: number;
    gpu?: number;
  };
  nodeId?: string;
  region?: string;
  version?: string;
  endpoint?: string;
  replicas?: number;
  lastUpdated: Date;
}

export class AIAgentServiceEnterprise extends BaseService {
  private agentCache: Map<string, AgentConfig> = new Map();
  private conversationCache: Map<string, ConversationState> = new Map();
  private models: Map<string, unknown> = new Map();
  private baseUrl: string;
  private readonly conversationCacheTTL = 30 * 60 * 1000; // 30 minutes
  private cleanupInterval: NodeJS.Timeout;
  private openai: OpenAI | null = null;
  private anthropic: Anthropic | null = null;

  constructor(context?: ServiceContext) {
    super(context);
    this.baseUrl = process.env.AI_API_BASE_URL || 'https://api.openai.com/v1';
    
    // Initialize AI providers if API keys are available
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    if (process.env.ANTHROPIC_API_KEY) {
      this.anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    }
    
    logger.info('Enterprise AI Agent Service initialized with AI OS integration');
    this.loadAgentsFromDatabase();
    
    // Set up periodic cleanup for conversation cache
    this.cleanupInterval = setInterval(() => {
      this.cleanupExpiredConversations();
    }, 15 * 60 * 1000); // Every 15 minutes
  }

  // ============================================
  // Enterprise AI OS Deployment Methods
  // ============================================

  /**
   * Deploy an agent with full AI OS enterprise capabilities
   * Integrates all 7 OS components: scheduler, sandbox, kernel, quotas, hot-swap, distributed mesh
   */
  async deployAgent(
    agentId: string,
    organizationId: string,
    userId: string,
    deploymentConfig: {
      resources?: { cpu?: number; memory?: number; gpu?: number };
      securityLevel?: 'low' | 'medium' | 'high' | 'maximum';
      strategy?: 'blue-green' | 'rolling' | 'canary' | 'recreate';
      replicate?: boolean;
      replicaCount?: number;
      preferredRegion?: string;
    } = {}
  ): Promise<ServiceResponse<AgentDeploymentStatus>> {
    return this.handleServiceOperation(
      async () => {
        const agent = await this.getAgent(agentId);
        if (!agent) {
          throw new Error('Agent not found');
        }

        // Build enterprise deployment configuration
        const enterpriseConfig: EnterpriseAgentConfig = {
          agentId,
          name: agent.name,
          description: agent.systemPrompt,
          type: 'ai-agent',
          version: '1.0.0',
          organizationId,
          userId,
          resources: {
            cpuCores: deploymentConfig.resources?.cpu || 1,
            memoryGb: deploymentConfig.resources?.memory || 2,
            gpuCount: deploymentConfig.resources?.gpu || 0,
            priority: 'normal'
          },
          security: {
            level: deploymentConfig.securityLevel || 'medium',
            sandboxType: 'docker',
            networkPolicy: {
              allowedDomains: ['api.openai.com', 'api.anthropic.com'],
              allowedPorts: [443, 80],
              allowOutbound: true
            },
            secrets: ['AI_API_KEYS']
          },
          deployment: {
            strategy: deploymentConfig.strategy || 'blue-green',
            replicate: deploymentConfig.replicate || false,
            replicaCount: deploymentConfig.replicaCount || 1,
            preferredRegion: deploymentConfig.preferredRegion
          },
          code: agent.systemPrompt || '',
          config: {
            model: agent.model,
            temperature: agent.temperature,
            maxTokens: agent.maxTokens,
            ...agent.config
          },
          capabilities: agent.capabilities,
          tools: agent.tools?.map(t => t.name)
        };

        // Deploy via AI OS Infrastructure
        const deployment = await aiosInfrastructureService.deployAgent(enterpriseConfig);

        if (!deployment.success || !deployment.data) {
          throw new Error(deployment.error || 'Deployment failed');
        }

        const deployedAgent = deployment.data;

        // Update agent record with deployment info
        await this.updateAgent(agentId, {
          status: 'deployed',
          deploymentId: deployedAgent.deploymentId,
          resources: {
            cpu: enterpriseConfig.resources.cpuCores,
            memory: enterpriseConfig.resources.memoryGb,
            gpu: enterpriseConfig.resources.gpuCount
          },
          securityLevel: enterpriseConfig.security.level,
          deploymentStrategy: enterpriseConfig.deployment.strategy,
          replicated: enterpriseConfig.deployment.replicate,
          replicaCount: deployedAgent.replicas?.length || 1
        }, organizationId, userId);

        // Build deployment status
        const status: AgentDeploymentStatus = {
          agentId,
          deploymentId: deployedAgent.deploymentId,
          status: 'running',
          health: deployedAgent.health,
          resources: {
            cpu: enterpriseConfig.resources.cpuCores,
            memory: enterpriseConfig.resources.memoryGb,
            gpu: enterpriseConfig.resources.gpuCount
          },
          nodeId: deployedAgent.nodeId,
          region: deployedAgent.replicas?.[0]?.region || 'default',
          version: deployedAgent.deployment.version,
          endpoint: deployedAgent.endpoints.external,
          replicas: deployedAgent.replicas?.length || 1,
          lastUpdated: new Date()
        };

        return status;
      },
      'DEPLOY_AGENT',
      'ai_agent',
      agentId
    );
  }

  /**
   * Stop/undeploy an agent
   */
  async undeployAgent(
    agentId: string,
    organizationId: string,
    userId: string,
    force: boolean = false
  ): Promise<ServiceResponse<void>> {
    return this.handleServiceOperation(
      async () => {
        const agent = await this.getAgent(agentId);
        if (!agent || !agent.deploymentId) {
          throw new Error('Agent not deployed');
        }

        // Stop via AI OS Infrastructure
        const result = await aiosInfrastructureService.stopAgent(
          agent.deploymentId,
          userId,
          force
        );

        if (!result.success) {
          throw new Error(result.error || 'Undeploy failed');
        }

        // Update agent record
        await this.updateAgent(agentId, {
          status: 'inactive',
          deploymentId: undefined
        }, organizationId, userId);

        return undefined;
      },
      'UNDEPLOY_AGENT',
      'ai_agent',
      agentId
    );
  }

  /**
   * Get deployment status for an agent
   */
  async getDeploymentStatus(
    agentId: string,
    organizationId: string
  ): Promise<ServiceResponse<AgentDeploymentStatus>> {
    return this.handleServiceOperation(
      async () => {
        const agent = await this.getAgent(agentId);
        if (!agent) {
          throw new Error('Agent not found');
        }

        if (!agent.deploymentId) {
          return {
            agentId,
            status: 'not_deployed',
            health: 'unknown',
            lastUpdated: agent.updatedAt || new Date()
          };
        }

        const deployedAgent = aiosInfrastructureService.getDeployedAgent(agent.deploymentId);
        if (!deployedAgent) {
          return {
            agentId,
            status: 'stopped',
            health: 'unknown',
            lastUpdated: new Date()
          };
        }

        const status: AgentDeploymentStatus = {
          agentId,
          deploymentId: deployedAgent.deploymentId,
          status: deployedAgent.status,
          health: deployedAgent.health,
          resources: deployedAgent.resources.allocated ? {
            cpu: deployedAgent.resources.allocated.cpuQuota,
            memory: deployedAgent.resources.allocated.memoryLimit / 1024,
            gpu: deployedAgent.resources.allocated.gpuShares
          } : undefined,
          nodeId: deployedAgent.nodeId,
          region: deployedAgent.replicas?.[0]?.region,
          version: deployedAgent.deployment.version,
          endpoint: deployedAgent.endpoints.external,
          replicas: deployedAgent.replicas?.length || 1,
          lastUpdated: deployedAgent.deployment.updatedAt
        };

        return status;
      },
      'GET_DEPLOYMENT_STATUS',
      'ai_agent',
      agentId
    );
  }

  /**
   * Scale an agent deployment
   */
  async scaleAgent(
    agentId: string,
    organizationId: string,
    userId: string,
    targetReplicaCount: number
  ): Promise<ServiceResponse<{ previousCount: number; newCount: number }>> {
    return this.handleServiceOperation(
      async () => {
        const agent = await this.getAgent(agentId);
        if (!agent || !agent.deploymentId) {
          throw new Error('Agent not deployed');
        }

        const result = await aiosInfrastructureService.scaleAgent(
          agent.deploymentId,
          targetReplicaCount,
          userId
        );

        if (!result.success || !result.data) {
          throw new Error(result.error || 'Scaling failed');
        }

        // Update agent record
        await this.updateAgent(agentId, {
          replicaCount: result.data.newCount
        }, organizationId, userId);

        return result.data;
      },
      'SCALE_AGENT',
      'ai_agent',
      agentId
    );
  }

  /**
   * Upgrade an agent to a new version
   */
  async upgradeAgent(
    agentId: string,
    organizationId: string,
    userId: string,
    newVersion: string,
    strategy: 'blue-green' | 'rolling' | 'canary' | 'recreate' = 'blue-green'
  ): Promise<ServiceResponse<any>> {
    return this.handleServiceOperation(
      async () => {
        const agent = await this.getAgent(agentId);
        if (!agent || !agent.deploymentId) {
          throw new Error('Agent not deployed');
        }

        // Get current agent code/config
        const newCode = agent.systemPrompt || '';

        const result = await aiosInfrastructureService.upgradeAgent(
          agent.deploymentId,
          newVersion,
          newCode,
          userId,
          strategy
        );

        if (!result.success || !result.data) {
          throw new Error(result.error || 'Upgrade failed');
        }

        return result.data;
      },
      'UPGRADE_AGENT',
      'ai_agent',
      agentId
    );
  }

  /**
   * Rollback agent to previous version
   */
  async rollbackAgent(
    agentId: string,
    organizationId: string,
    userId: string,
    reason: string
  ): Promise<ServiceResponse<any>> {
    return this.handleServiceOperation(
      async () => {
        const agent = await this.getAgent(agentId);
        if (!agent || !agent.deploymentId) {
          throw new Error('Agent not deployed');
        }

        const result = await aiosInfrastructureService.rollbackAgent(
          agent.deploymentId,
          userId,
          reason
        );

        if (!result.success || !result.data) {
          throw new Error(result.error || 'Rollback failed');
        }

        return result.data;
      },
      'ROLLBACK_AGENT',
      'ai_agent',
      agentId
    );
  }

  /**
   * Get infrastructure health status
   */
  getInfrastructureHealth(): ServiceResponse<InfrastructureHealth> {
    return {
      success: true,
      data: aiosInfrastructureService.getInfrastructureHealth()
    };
  }

  /**
   * Get resource usage report
   */
  getResourceReport(
    organizationId: string,
    period: { start: Date; end: Date }
  ): ServiceResponse<any> {
    return {
      success: true,
      data: aiosInfrastructureService.getResourceReport(organizationId, period)
    };
  }

  // ============================================
  // BaseService Abstract Method Implementations
  // ============================================

  async create(data: AgentConfig): Promise<ServiceResponse<AgentConfig>> {
    return this.handleServiceOperation(
      async () => {
        const agent: AgentConfig = {
          ...data,
          id: data.id || crypto.randomUUID(),
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        this.agentCache.set(agent.id, agent);
        await this.saveAgentToDatabase(agent, data.organizationId || 'default');

        return agent;
      },
      'CREATE',
      'ai_agent'
    );
  }

  async findById(id: string): Promise<ServiceResponse<AgentConfig>> {
    return this.handleServiceOperation(
      async () => {
        const agent = await this.getAgent(id);
        if (!agent) {
          throw new Error('Agent not found');
        }
        return agent;
      },
      'FIND_BY_ID',
      'ai_agent',
      id
    );
  }

  async update(id: string, data: Partial<AgentConfig>, organizationId?: string, userId?: string): Promise<ServiceResponse<AgentConfig>> {
    return this.handleServiceOperation(
      async () => {
        const existing = await this.getAgent(id);
        if (!existing) {
          throw new Error('Agent not found');
        }

        const updated: AgentConfig = {
          ...existing,
          ...data,
          updatedAt: new Date(),
          updatedBy: userId || data.updatedBy
        };

        this.agentCache.set(id, updated);
        await this.saveAgentToDatabase(updated, organizationId || existing.organizationId || 'default');

        return updated;
      },
      'UPDATE',
      'ai_agent',
      id
    );
  }

  async delete(id: string, organizationId?: string, userId?: string): Promise<ServiceResponse<void>> {
    return this.handleServiceOperation(
      async () => {
        // If deployed, undeploy first
        const agent = await this.getAgent(id);
        if (agent?.deploymentId && organizationId) {
          await this.undeployAgent(id, organizationId, userId || 'system', true);
        }

        this.agentCache.delete(id);
        await db.delete(aiAgents).where(eq(aiAgents.id, id));

        return undefined;
      },
      'DELETE',
      'ai_agent',
      id
    );
  }

  async list(options: { 
    pagination?: { page?: number; limit?: number }; 
    filters?: { organizationId?: string; status?: string; type?: string } 
  }): Promise<ServiceResponse<AgentConfig[]>> {
    return this.handleServiceOperation(
      async () => {
        const { organizationId, status, type } = options.filters || {};
        
        let agents = await this.getAgents(organizationId || 'default', { type, status });

        // Apply pagination
        const page = options.pagination?.page || 1;
        const limit = options.pagination?.limit || 20;
        const start = (page - 1) * limit;
        const paginated = agents.slice(start, start + limit);

        return paginated;
      },
      'LIST',
      'ai_agent'
    );
  }

  // ============================================
  // Original AIAgentService Methods
  // ============================================

  async consultAgent(
    organizationId: string,
    userId: string,
    req: AgentToAgentConsultRequest
  ): Promise<AgentToAgentConsultResult> {
    // Implementation from original service
    const { consultingAgent, targetAgent } = await this.resolveConsultingTarget(organizationId, req);

    const sessionId = `a2a_${req.fromAgentId}_${consultingAgent.id}_${Date.now()}`;
    const consultingPrompt =
      (consultingAgent.systemPrompt || '') +
      `\n\nYou are consulting another agent.\n` +
      `FromAgentId: ${req.fromAgentId}\n` +
      `TargetAgentId: ${targetAgent.id}\n` +
      `TargetAgentName: ${targetAgent.name}\n` +
      `Domain: ${this.normalizeDomain(req.domain) || 'unspecified'}\n` +
      `Return a concise actionable answer. If you need to ask clarifying questions, ask at most 2.\n`;

    const targetPrompt =
      (targetAgent.systemPrompt || '') +
      `\n\nYou are responding to an internal agent consultation.\n` +
      `Provide structured, actionable guidance.\n`;

    const targetExec = await agentExecutionEngine.executeAgent(
      { ...targetAgent, systemPrompt: targetPrompt },
      {
        agentId: targetAgent.id,
        sessionId,
        organizationId,
        userId,
        metadata: { ...req.context, a2a: true, fromAgentId: req.fromAgentId, consultingAgentId: consultingAgent.id }
      },
      req.query,
      targetAgent.tools
    );

    const consultingInput =
      `Question:\n${req.query}\n\n` +
      `Target agent response:\n${targetExec.result?.message || targetExec.result?.fallbackResponse || targetExec.error || ''}`;

    const consultingExec = await agentExecutionEngine.executeAgent(
      { ...consultingAgent, systemPrompt: consultingPrompt },
      {
        agentId: consultingAgent.id,
        sessionId,
        organizationId,
        userId,
        metadata: { ...req.context, a2a: true, fromAgentId: req.fromAgentId, targetAgentId: targetAgent.id }
      },
      consultingInput,
      consultingAgent.tools
    );

    await logAudit({
      userId,
      organizationId,
      action: 'agent_consulted',
      resource: 'ai_agent',
      resourceId: consultingAgent.id,
      status: consultingExec.success ? 'success' : 'failure',
      details: {
        fromAgentId: req.fromAgentId,
        consultingAgentId: consultingAgent.id,
        targetAgentId: targetAgent.id,
        domain: this.normalizeDomain(req.domain)
      }
    });

    return {
      consultingAgentId: consultingAgent.id,
      targetAgentId: targetAgent.id,
      response: consultingExec.result?.message || consultingExec.result?.fallbackResponse || consultingExec.error || 'No response',
      execution: {
        consulting: consultingExec,
        target: targetExec
      }
    };
  }

  // Include all other original AIAgentService methods...
  // (Keeping implementations from original service)

  private normalizeDomain(domain?: string): string | undefined {
    const d = (domain || '').trim().toLowerCase();
    if (!d) return undefined;
    const map: Record<string, string> = {
      'cx': 'customer_experience',
      'customer experience': 'customer_experience',
      'customer_experience': 'customer_experience',
      'support': 'customer_experience',
      'sales': 'sales_revenue',
      'revenue': 'sales_revenue',
      'sales & revenue': 'sales_revenue',
      'marketing': 'marketing_growth',
      'growth': 'marketing_growth',
      'operations': 'operations_management',
      'ops': 'operations_management',
      'data': 'data_intelligence',
      'intelligence': 'data_intelligence',
      'analysis': 'analysis_performance',
      'performance': 'analysis_performance'
    };
    return map[d] || d.replace(/\s+/g, '_');
  }

  private async findAgentByName(organizationId: string, name: string): Promise<AgentConfig | null> {
    const agents = await this.getAgents(organizationId);
    const needle = name.trim().toLowerCase();
    return agents.find(a => (a.name || '').trim().toLowerCase() === needle) || null;
  }

  private async resolveConsultingTarget(
    organizationId: string,
    req: AgentToAgentConsultRequest
  ): Promise<{ consultingAgent: AgentConfig; targetAgent: AgentConfig }> {
    const consultingAgent =
      (await this.findAgentByName(organizationId, 'Agent Consulting')) ||
      (await this.findAgentByName(organizationId, 'AI Strategy Advisor')) ||
      (await this.findAgentByName(organizationId, 'Executive Intelligence AI (AI Strategy Advisor)'));

    if (!consultingAgent) {
      throw new Error('Consulting agent not found. Seed default agents or create an agent named "Agent Consulting".');
    }

    if (req.targetAgentId) {
      const target = await this.getAgent(req.targetAgentId);
      if (!target) throw new Error('Target agent not found');
      return { consultingAgent, targetAgent: target };
    }

    if (req.targetAgentName) {
      const target = await this.findAgentByName(organizationId, req.targetAgentName);
      if (!target) throw new Error('Target agent not found');
      return { consultingAgent, targetAgent: target };
    }

    const normalizedDomain = this.normalizeDomain(req.domain);
    const domainAgentNameByDomain: Record<string, string> = {
      customer_experience: 'Customer Experience AI',
      sales_revenue: 'Sales & Revenue AI',
      marketing_growth: 'Marketing & Growth AI',
      operations_management: 'Operations & Management AI',
      data_intelligence: 'Data & Intelligence AI',
      analysis_performance: 'Analysis, Insights & Performance AI'
    };

    const domainName = normalizedDomain ? domainAgentNameByDomain[normalizedDomain] : undefined;
    const target = domainName ? await this.findAgentByName(organizationId, domainName) : null;
    if (!target) {
      const fallback = await this.findAgentByName(organizationId, 'Customer Experience AI');
      if (!fallback) throw new Error('No domain agents found. Seed default agents first.');
      return { consultingAgent, targetAgent: fallback };
    }

    return { consultingAgent, targetAgent: target };
  }

  private async getAgent(agentId: string): Promise<AgentConfig | null> {
    const cached = this.agentCache.get(agentId);
    if (cached) return cached;

    try {
      const result = await db.select()
        .from(aiAgents)
        .where(eq(aiAgents.id, agentId))
        .limit(1);
      
      const row = result[0];
      if (!row) return null;
      
      const agent = row.config as AgentConfig;
      this.agentCache.set(agentId, agent);
      return agent;
    } catch (error) {
      logger.error('Failed to get agent', error as Error);
      return null;
    }
  }

  private async getAgents(organizationId: string, filters?: { type?: string; status?: string }): Promise<AgentConfig[]> {
    try {
      const agents = await db.select()
        .from(aiAgents)
        .where(eq(aiAgents.organizationId, organizationId));

      const agentsArray = Array.isArray(agents) ? agents : [];
      
      let filteredAgents = agentsArray.map(row => row.config as AgentConfig);

      if (filters?.type) {
        filteredAgents = filteredAgents.filter(agent => agent.type === filters.type);
      }

      if (filters?.status) {
        filteredAgents = filteredAgents.filter(agent => agent.status === filters.status);
      }

      return filteredAgents;
    } catch (error) {
      logger.error('Failed to get agents', error as Error);
      return [];
    }
  }

  private async saveAgentToDatabase(agent: AgentConfig, organizationId: string): Promise<void> {
    try {
      const existingAgent = await db.select()
        .from(aiAgents)
        .where(eq(aiAgents.id, agent.id))
        .limit(1);

      if (existingAgent.length > 0) {
        await db.update(aiAgents)
          .set({
            name: agent.name,
            type: agent.type as string,
            config: agent,
            updatedAt: new Date()
          })
          .where(eq(aiAgents.id, agent.id));
      } else {
        await db.insert(aiAgents).values({
          id: agent.id,
          organizationId,
          name: agent.name,
          type: agent.type as string,
          status: 'active',
          config: agent,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    } catch (error) {
      logger.error('Failed to save agent to database', error as Error);
      throw error;
    }
  }

  private async loadAgentsFromDatabase(): Promise<void> {
    try {
      const agents = await db.select().from(aiAgents);
      const agentsArray = Array.isArray(agents) ? agents : [];
      
      for (const agentRow of agentsArray) {
        const agentConfig = agentRow.config as AgentConfig;
        this.agentCache.set(agentConfig.id, agentConfig);
      }
      logger.info(`Loaded ${agentsArray.length} agents from database`);
    } catch (error) {
      logger.error('Failed to load agents from database', error as Error);
    }
  }

  private cleanupExpiredConversations(): void {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [id, state] of this.conversationCache.entries()) {
      if (now - state.timestamp > this.conversationCacheTTL) {
        this.conversationCache.delete(id);
        cleaned++;
      }
    }
    
    if (cleaned > 0) {
      logger.debug(`Cleaned ${cleaned} expired conversations from cache`);
    }
  }

  // Cleanup
  destroy(): void {
    clearInterval(this.cleanupInterval);
    this.agentCache.clear();
    this.conversationCache.clear();
    logger.info('AI Agent Service Enterprise destroyed');
  }
}

// Export singleton instance
export const aiAgentServiceEnterprise = new AIAgentServiceEnterprise();
