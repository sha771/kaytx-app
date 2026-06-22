/**
 * Agent Brain Manager
 * Manages brain initialization and data ingestion for AI agents
 * Automatically initializes brains for agents and ingests relevant data
 */

import { BrainSystem } from './index';
import { BrainLLMClient } from './llm-client';
import fs from 'fs';
import path from 'path';

export interface AgentBrainConfig {
  agentId: string;
  agentType: string;
  department: string;
  autoInitialize: boolean;
  dataSources: string[];
  enableAutoIngest: boolean;
  ingestInterval?: number; // seconds
}

export class AgentBrainManager {
  private static instance: AgentBrainManager;
  private brainSystems: Map<string, BrainSystem> = new Map();
  private llmClient: BrainLLMClient;
  private autoIngestTimers: Map<string, NodeJS.Timeout> = new Map();

  private constructor() {
    try {
      this.llmClient = BrainLLMClient.fromEnvironment();
    } catch (error) {
      console.error('Failed to initialize LLM client for brain manager:', error);
      // Create a fallback client
      this.llmClient = new BrainLLMClient({
        provider: 'openai',
        apiKey: '',
        model: 'gpt-4o-mini'
      });
    }
  }

  static getInstance(): AgentBrainManager {
    if (!AgentBrainManager.instance) {
      AgentBrainManager.instance = new AgentBrainManager();
    }
    return AgentBrainManager.instance;
  }

  /**
   * Initialize brain for a specific agent
   */
  async initializeAgentBrain(config: AgentBrainConfig): Promise<BrainSystem> {
    const { agentId, autoInitialize, dataSources, enableAutoIngest, ingestInterval } = config;

    console.log(`Initializing brain for agent: ${agentId}`);

    // Create brain system for this agent
    const brainSystem = new BrainSystem(undefined, agentId, this.llmClient);
    
    // Initialize the brain
    await brainSystem.initialize();
    
    // Cache the brain system
    this.brainSystems.set(agentId, brainSystem);

    // Auto-initialize with data sources if configured
    if (autoInitialize && dataSources.length > 0) {
      console.log(`Auto-initializing brain for ${agentId} with ${dataSources.length} data sources`);
      
      // Add raw sources
      for (const sourcePath of dataSources) {
        if (fs.existsSync(sourcePath)) {
          const content = fs.readFileSync(sourcePath, 'utf-8');
          await brainSystem.addRawSource(sourcePath, content);
        }
      }

      // Ingest the sources
      await brainSystem.ingest(dataSources);
    }

    // Set up auto-ingest if configured
    if (enableAutoIngest && ingestInterval) {
      this.setupAutoIngest(agentId, brainSystem, dataSources, ingestInterval);
    }

    return brainSystem;
  }

  /**
   * Get brain system for an agent
   */
  getAgentBrain(agentId: string): BrainSystem | undefined {
    return this.brainSystems.get(agentId);
  }

  /**
   * Setup automatic ingestion for an agent
   */
  private setupAutoIngest(
    agentId: string,
    brainSystem: BrainSystem,
    dataSources: string[],
    interval: number
  ): void {
    // Clear existing timer if any
    const existingTimer = this.autoIngestTimers.get(agentId);
    if (existingTimer) {
      clearInterval(existingTimer);
    }

    // Set up new timer
    const timer = setInterval(async () => {
      console.log(`Auto-ingesting for agent: ${agentId}`);
      try {
        await brainSystem.ingest(dataSources);
      } catch (error) {
        console.error(`Auto-ingest failed for agent ${agentId}:`, error);
      }
    }, interval * 1000);

    this.autoIngestTimers.set(agentId, timer);
    console.log(`Auto-ingest setup for agent ${agentId} with interval ${interval}s`);
  }

  /**
   * Stop auto-ingest for an agent
   */
  stopAutoIngest(agentId: string): void {
    const timer = this.autoIngestTimers.get(agentId);
    if (timer) {
      clearInterval(timer);
      this.autoIngestTimers.delete(agentId);
      console.log(`Auto-ingest stopped for agent: ${agentId}`);
    }
  }

  /**
   * Initialize brains for multiple agents
   */
  async initializeMultipleAgents(configs: AgentBrainConfig[]): Promise<Map<string, BrainSystem>> {
    const results = new Map<string, BrainSystem>();

    for (const config of configs) {
      try {
        const brainSystem = await this.initializeAgentBrain(config);
        results.set(config.agentId, brainSystem);
      } catch (error) {
        console.error(`Failed to initialize brain for agent ${config.agentId}:`, error);
      }
    }

    return results;
  }

  /**
   * Get statistics for all agent brains
   */
  async getAllAgentStatistics(): Promise<Map<string, any>> {
    const statistics = new Map<string, any>();

    for (const [agentId, brainSystem] of this.brainSystems) {
      try {
        const stats = await brainSystem.getStatistics();
        statistics.set(agentId, stats);
      } catch (error) {
        console.error(`Failed to get statistics for agent ${agentId}:`, error);
      }
    }

    return statistics;
  }

  /**
   * Shutdown all brain systems
   */
  async shutdown(): Promise<void> {
    // Clear all auto-ingest timers
    for (const [agentId, timer] of this.autoIngestTimers) {
      clearInterval(timer);
    }
    this.autoIngestTimers.clear();

    // Clear brain systems cache
    this.brainSystems.clear();

    console.log('Agent Brain Manager shutdown complete');
  }

  /**
   * Create agent brain configuration from agent metadata
   */
  static createConfigFromAgent(agent: {
    id: string;
    type?: string;
    department?: string;
    dataSources?: string[];
  }): AgentBrainConfig {
    return {
      agentId: agent.id,
      agentType: agent.type || 'general',
      department: agent.department || 'general',
      autoInitialize: true,
      dataSources: agent.dataSources || [],
      enableAutoIngest: false, // Disabled by default
      ingestInterval: 3600, // 1 hour default
    };
  }

  /**
   * Get default data sources for different agent types
   */
  static getDefaultDataSources(agentType: string, department: string): string[] {
    const baseDir = '/agents-brain/raw';
    
    const typeSources: Record<string, string[]> = {
      marketing: [
        path.join(baseDir, 'marketing/campaigns'),
        path.join(baseDir, 'marketing/brand-guidelines'),
        path.join(baseDir, 'marketing/customer-research'),
      ],
      sales: [
        path.join(baseDir, 'sales/playbooks'),
        path.join(baseDir, 'sales/product-info'),
        path.join(baseDir, 'sales/pricing'),
      ],
      hr: [
        path.join(baseDir, 'hr/policies'),
        path.join(baseDir, 'hr/onboarding'),
        path.join(baseDir, 'hr/training-materials'),
      ],
      finance: [
        path.join(baseDir, 'finance/reports'),
        path.join(baseDir, 'finance/budgets'),
        path.join(baseDir, 'finance/compliance'),
      ],
      operations: [
        path.join(baseDir, 'operations/workflows'),
        path.join(baseDir, 'operations/sops'),
        path.join(baseDir, 'operations/processes'),
      ],
    };

    return typeSources[agentType] || [path.join(baseDir, 'general')];
  }
}
