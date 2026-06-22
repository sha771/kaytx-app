/**
 * Agents Brain Integration Utilities
 * Helper functions for AI agents to use the brain system
 * This allows agents to query structured knowledge instead of reading raw files
 * 
 * Supports both shared brain and per-agent brains
 */

import { api } from '@/lib/trpc';

/**
 * Query the brain for relevant information
 * Use this instead of reading raw documents to save tokens
 * 
 * @param query - The search query
 * @param options - Query options
 * @param agentId - Optional agent ID for agent-specific brain
 */
export async function queryBrain(query: string, options?: {
  limit?: number;
  minRelevance?: number;
  agentId?: string;
}) {
  try {
    const result = await api.agentsBrain.query.mutate({
      query,
      limit: options?.limit || 10,
      minRelevance: options?.minRelevance || 0.3,
      agentId: options?.agentId,
    });
    
    return {
      success: true,
      pages: result.pages,
      concepts: result.concepts,
      relevanceScores: result.relevanceScores,
      tokenSavings: result.estimatedTokenSavings,
      totalTokensUsed: result.totalTokensUsed,
    };
  } catch (error) {
    console.error('Error querying brain:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Search brain by tag
 * 
 * @param tag - Tag to search for
 * @param agentId - Optional agent ID for agent-specific brain
 */
export async function searchBrainByTag(tag: string, agentId?: string) {
  try {
    const result = await api.agentsBrain.searchByTag.query({ tag, agentId });
    return {
      success: true,
      pages: result,
    };
  } catch (error) {
    console.error('Error searching brain by tag:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Search brain by category
 * 
 * @param category - Category to search for
 * @param agentId - Optional agent ID for agent-specific brain
 */
export async function searchBrainByCategory(category: string, agentId?: string) {
  try {
    const result = await api.agentsBrain.searchByCategory.query({ category, agentId });
    return {
      success: true,
      pages: result,
    };
  } catch (error) {
    console.error('Error searching brain by category:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get a specific page from the brain
 * 
 * @param pageId - Page ID to retrieve
 * @param agentId - Optional agent ID for agent-specific brain
 */
export async function getBrainPage(pageId: string, agentId?: string) {
  try {
    const result = await api.agentsBrain.getPage.query({ pageId, agentId });
    return {
      success: true,
      page: result,
    };
  } catch (error) {
    console.error('Error getting brain page:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get related pages from the brain
 * 
 * @param pageId - Page ID to get related pages for
 * @param agentId - Optional agent ID for agent-specific brain
 */
export async function getRelatedBrainPages(pageId: string, agentId?: string) {
  try {
    const result = await api.agentsBrain.getRelatedPages.query({ pageId, agentId });
    return {
      success: true,
      pages: result,
    };
  } catch (error) {
    console.error('Error getting related brain pages:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get brain statistics
 * 
 * @param agentId - Optional agent ID for agent-specific brain
 */
export async function getBrainStatistics(agentId?: string) {
  try {
    const result = await api.agentsBrain.getStatistics.query({ agentId });
    return {
      success: true,
      statistics: result,
    };
  } catch (error) {
    console.error('Error getting brain statistics:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get token savings estimate
 * 
 * @param agentId - Optional agent ID for agent-specific brain
 */
export async function getTokenSavings(agentId?: string) {
  try {
    const result = await api.agentsBrain.getTokenSavings.query({ agentId });
    return {
      success: true,
      tokenSavings: result.tokenSavings,
    };
  } catch (error) {
    console.error('Error getting token savings:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Add a raw source to the brain
 * 
 * @param filePath - File path for the source
 * @param content - Content of the source
 * @param agentId - Optional agent ID for agent-specific brain
 */
export async function addRawSourceToBrain(filePath: string, content: string, agentId?: string) {
  try {
    await api.agentsBrain.addRawSource.mutate({ filePath, content, agentId });
    return {
      success: true,
    };
  } catch (error) {
    console.error('Error adding raw source to brain:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Ingest sources into the brain
 * 
 * @param sourcePaths - Optional list of source paths to ingest
 * @param agentId - Optional agent ID for agent-specific brain
 */
export async function ingestIntoBrain(sourcePaths?: string[], agentId?: string) {
  try {
    const result = await api.agentsBrain.ingest.mutate({ sourcePaths, agentId });
    return {
      success: true,
      result,
    };
  } catch (error) {
    console.error('Error ingesting into brain:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Initialize brain for an agent
 * 
 * @param agentId - Optional agent ID for agent-specific brain
 */
export async function initializeBrain(agentId?: string) {
  try {
    await api.agentsBrain.initialize.mutate({ agentId });
    return {
      success: true,
    };
  } catch (error) {
    console.error('Error initializing brain:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * List all agent brains
 */
export async function listAgentBrains() {
  try {
    const result = await api.agentsBrain.listAgentBrains.query();
    return {
      success: true,
      agentIds: result.agentIds,
    };
  } catch (error) {
    console.error('Error listing agent brains:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Agent Brain Context Provider
 * Provides brain context to AI agents for their operations
 * Each agent gets their own isolated brain
 */
export class AgentBrainContext {
  private agentId: string;
  private agentType: string;
  private useSharedBrain: boolean;

  constructor(agentId: string, agentType: string, useSharedBrain: boolean = false) {
    this.agentId = agentId;
    this.agentType = agentType;
    this.useSharedBrain = useSharedBrain;
  }

  /**
   * Get the agent ID
   */
  getAgentId(): string {
    return this.agentId;
  }

  /**
   * Get the agent type
   */
  getAgentType(): string {
    return this.agentType;
  }

  /**
   * Check if using shared brain
   */
  isUsingSharedBrain(): boolean {
    return this.useSharedBrain;
  }

  /**
   * Query brain with agent context
   * Uses agent-specific brain unless useSharedBrain is true
   */
  async query(query: string, options?: { limit?: number; minRelevance?: number }) {
    const contextualQuery = `[${this.agentType} Agent ${this.agentId}] ${query}`;
    const agentId = this.useSharedBrain ? undefined : this.agentId;
    return await queryBrain(contextualQuery, { ...options, agentId });
  }

  /**
   * Get relevant knowledge for a task
   */
  async getKnowledgeForTask(task: string) {
    return await this.query(task, { limit: 5, minRelevance: 0.5 });
  }

  /**
   * Get domain-specific knowledge based on agent type
   */
  async getDomainKnowledge() {
    const domainQueries: Record<string, string[]> = {
      marketing: ['marketing strategy', 'campaign optimization', 'customer segmentation'],
      sales: ['sales techniques', 'lead generation', 'closing deals'],
      hr: ['hiring practices', 'employee management', 'performance reviews'],
      finance: ['financial analysis', 'budgeting', 'reporting'],
      operations: ['process optimization', 'workflow management', 'efficiency'],
    };

    const queries = domainQueries[this.agentType] || ['general knowledge'];
    const results = await Promise.all(
      queries.map(q => this.query(q, { limit: 3 }))
    );

    return {
      success: true,
      knowledge: results.flatMap(r => r.success ? r.pages : []),
    };
  }

  /**
   * Initialize the agent's brain
   */
  async initialize() {
    const agentId = this.useSharedBrain ? undefined : this.agentId;
    return await initializeBrain(agentId);
  }

  /**
   * Ingest sources into the agent's brain
   */
  async ingest(sourcePaths?: string[]) {
    const agentId = this.useSharedBrain ? undefined : this.agentId;
    return await ingestIntoBrain(sourcePaths, agentId);
  }

  /**
   * Add a raw source to the agent's brain
   */
  async addRawSource(filePath: string, content: string) {
    const agentId = this.useSharedBrain ? undefined : this.agentId;
    return await addRawSourceToBrain(filePath, content, agentId);
  }

  /**
   * Get statistics for the agent's brain
   */
  async getStatistics() {
    const agentId = this.useSharedBrain ? undefined : this.agentId;
    return await getBrainStatistics(agentId);
  }

  /**
   * Get token savings for the agent's brain
   */
  async getTokenSavings() {
    const agentId = this.useSharedBrain ? undefined : this.agentId;
    return await getTokenSavings(agentId);
  }

  /**
   * Log brain usage for analytics
   */
  async logUsage(query: string, tokenSavings: number) {
    // This could be extended to log to a database for analytics
    const brainType = this.useSharedBrain ? 'shared' : 'agent-specific';
    console.log(`[Agent ${this.agentId} (${brainType} brain)] Query: "${query}", Token Savings: ${tokenSavings}`);
  }
}

/**
 * Create a brain context for an agent
 * By default, creates an agent-specific brain
 * 
 * @param agentId - The agent's ID
 * @param agentType - The agent's type (e.g., 'marketing', 'sales')
 * @param useSharedBrain - If true, uses shared brain instead of agent-specific brain
 */
export function createAgentBrainContext(agentId: string, agentType: string, useSharedBrain: boolean = false) {
  return new AgentBrainContext(agentId, agentType, useSharedBrain);
}

/**
 * Hook for React components to use the brain
 * 
 * @param agentId - The agent's ID
 * @param agentType - The agent's type
 * @param useSharedBrain - If true, uses shared brain instead of agent-specific brain
 */
export function useAgentBrain(agentId: string, agentType: string, useSharedBrain: boolean = false) {
  const context = createAgentBrainContext(agentId, agentType, useSharedBrain);
  
  return {
    query: context.query.bind(context),
    getKnowledgeForTask: context.getKnowledgeForTask.bind(context),
    getDomainKnowledge: context.getDomainKnowledge.bind(context),
    initialize: context.initialize.bind(context),
    ingest: context.ingest.bind(context),
    addRawSource: context.addRawSource.bind(context),
    getStatistics: context.getStatistics.bind(context),
    getTokenSavings: context.getTokenSavings.bind(context),
    logUsage: context.logUsage.bind(context),
    getAgentId: context.getAgentId.bind(context),
    getAgentType: context.getAgentType.bind(context),
    isUsingSharedBrain: context.isUsingSharedBrain.bind(context),
  };
}
