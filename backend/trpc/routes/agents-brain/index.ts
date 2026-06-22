import { router } from '../trpc';
import { z } from 'zod';
import { BrainSystem } from '@/lib/agents-brain';
import { BrainLLMClient } from '@/lib/agents-brain/llm-client';
import { AgentBrainManager, AgentBrainConfig } from '@/lib/agents-brain/agent-brain-manager';

// Brain system instances cache (per-agent)
const brainSystemsCache = new Map<string, BrainSystem>();
let sharedBrainSystem: BrainSystem | null = null;
let sharedLLMClient: BrainLLMClient | null = null;
let brainManager: AgentBrainManager | null = null;

function getLLMClient(): BrainLLMClient {
  if (!sharedLLMClient) {
    try {
      sharedLLMClient = BrainLLMClient.fromEnvironment();
    } catch (error) {
      console.error('Failed to initialize LLM client:', error);
      // Return a mock client if environment variables are not set
      sharedLLMClient = new BrainLLMClient({
        provider: 'openai',
        apiKey: '',
        model: 'gpt-4o-mini'
      });
    }
  }
  return sharedLLMClient;
}

function getBrainManager(): AgentBrainManager {
  if (!brainManager) {
    brainManager = AgentBrainManager.getInstance();
  }
  return brainManager;
}

function getBrainSystem(agentId?: string): BrainSystem {
  if (agentId) {
    // Return agent-specific brain
    if (!brainSystemsCache.has(agentId)) {
      const llmClient = getLLMClient();
      brainSystemsCache.set(agentId, new BrainSystem(undefined, agentId, llmClient));
    }
    return brainSystemsCache.get(agentId)!;
  } else {
    // Return shared brain
    if (!sharedBrainSystem) {
      const llmClient = getLLMClient();
      sharedBrainSystem = new BrainSystem(undefined, undefined, llmClient);
    }
    return sharedBrainSystem;
  }
}

export const agentsBrainRouter = router({
  // Initialize brain system
  initialize: router.procedure
    .input(z.object({
      agentId: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const brain = getBrainSystem(input.agentId);
      await brain.initialize();
      return { 
        success: true, 
        message: input.agentId 
          ? `Brain system initialized for agent ${input.agentId}` 
          : 'Shared brain system initialized' 
      };
    }),

  // Ingest sources into brain
  ingest: router.procedure
    .input(z.object({
      sourcePaths: z.array(z.string()).optional(),
      agentId: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const brain = getBrainSystem(input.agentId);
      const result = await brain.ingest(input.sourcePaths);
      return result;
    }),

  // Query brain
  query: router.procedure
    .input(z.object({
      query: z.string(),
      limit: z.number().optional(),
      minRelevance: z.number().optional(),
      agentId: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const brain = getBrainSystem(input.agentId);
      const result = await brain.query(input.query, {
        limit: input.limit,
        minRelevance: input.minRelevance,
      });
      return result;
    }),

  // Search by tag
  searchByTag: router.procedure
    .input(z.object({
      tag: z.string(),
      agentId: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const brain = getBrainSystem(input.agentId);
      const result = await brain.searchByTag(input.tag);
      return result;
    }),

  // Search by category
  searchByCategory: router.procedure
    .input(z.object({
      category: z.string(),
      agentId: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const brain = getBrainSystem(input.agentId);
      const result = await brain.searchByCategory(input.category);
      return result;
    }),

  // Get page by ID
  getPage: router.procedure
    .input(z.object({
      pageId: z.string(),
      agentId: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const brain = getBrainSystem(input.agentId);
      const result = await brain.getPage(input.pageId);
      return result;
    }),

  // Get all pages
  getAllPages: router.procedure
    .input(z.object({
      agentId: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const brain = getBrainSystem(input.agentId);
      const result = await brain.getAllPages();
      return result;
    }),

  // Get related pages
  getRelatedPages: router.procedure
    .input(z.object({
      pageId: z.string(),
      agentId: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const brain = getBrainSystem(input.agentId);
      const result = await brain.getRelatedPages(input.pageId);
      return result;
    }),

  // Get statistics
  getStatistics: router.procedure
    .input(z.object({
      agentId: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const brain = getBrainSystem(input.agentId);
      const result = await brain.getStatistics();
      return result;
    }),

  // Get manifest
  getManifest: router.procedure
    .input(z.object({
      agentId: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const brain = getBrainSystem(input.agentId);
      const result = await brain.getManifest();
      return result;
    }),

  // Get index
  getIndex: router.procedure
    .input(z.object({
      agentId: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const brain = getBrainSystem(input.agentId);
      const result = await brain.getIndex();
      return result;
    }),

  // Get log
  getLog: router.procedure
    .input(z.object({
      agentId: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const brain = getBrainSystem(input.agentId);
      const result = await brain.getLog();
      return result;
    }),

  // Add raw source
  addRawSource: router.procedure
    .input(z.object({
      filePath: z.string(),
      content: z.string(),
      agentId: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const brain = getBrainSystem(input.agentId);
      await brain.addRawSource(input.filePath, input.content);
      return { success: true };
    }),

  // Get raw sources
  getRawSources: router.procedure
    .input(z.object({
      agentId: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const brain = getBrainSystem(input.agentId);
      const result = await brain.getRawSources();
      return result;
    }),

  // Re-ingest source
  reingestSource: router.procedure
    .input(z.object({
      sourcePath: z.string(),
      agentId: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const brain = getBrainSystem(input.agentId);
      const result = await brain.reingestSource(input.sourcePath);
      return result;
    }),

  // Get token savings
  getTokenSavings: router.procedure
    .input(z.object({
      agentId: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const brain = getBrainSystem(input.agentId);
      const result = await brain.getTokenSavings();
      return { tokenSavings: result };
    }),

  // Get health status
  getHealthStatus: router.procedure
    .input(z.object({
      agentId: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const brain = getBrainSystem(input.agentId);
      const result = await brain.getHealthStatus();
      return result;
    }),

  // Export brain
  export: router.procedure
    .input(z.object({
      agentId: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const brain = getBrainSystem(input.agentId);
      const result = await brain.export();
      return result;
    }),

  // Import brain
  import: router.procedure
    .input(z.object({
      data: z.any(),
      agentId: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const brain = getBrainSystem(input.agentId);
      await brain.import(input.data);
      return { success: true };
    }),

  // Reset brain
  reset: router.procedure
    .input(z.object({
      agentId: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const brain = getBrainSystem(input.agentId);
      await brain.reset();
      return { 
        success: true, 
        message: input.agentId 
          ? `Brain system reset for agent ${input.agentId}` 
          : 'Shared brain system reset' 
      };
    }),

  // List all agent brains
  listAgentBrains: router.procedure.query(async () => {
    const fs = require('fs');
    const path = require('path');
    const agentsBase = '/agents-brain/agents';
    
    try {
      if (!fs.existsSync(agentsBase)) {
        return { agentIds: [] };
      }
      
      const agentDirs = fs.readdirSync(agentsBase, { withFileTypes: true });
      const agentIds = agentDirs
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
      
      return { agentIds };
    } catch (error) {
      console.error('Error listing agent brains:', error);
      return { agentIds: [] };
    }
  }),

  // Initialize agent brain with configuration
  initializeAgentBrain: router.procedure
    .input(z.object({
      agentId: z.string(),
      agentType: z.string().optional(),
      department: z.string().optional(),
      autoInitialize: z.boolean().optional(),
      dataSources: z.array(z.string()).optional(),
      enableAutoIngest: z.boolean().optional(),
      ingestInterval: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const manager = getBrainManager();
      
      const config: AgentBrainConfig = {
        agentId: input.agentId,
        agentType: input.agentType || 'general',
        department: input.department || 'general',
        autoInitialize: input.autoInitialize ?? true,
        dataSources: input.dataSources || [],
        enableAutoIngest: input.enableAutoIngest ?? false,
        ingestInterval: input.ingestInterval || 3600,
      };

      const brainSystem = await manager.initializeAgentBrain(config);
      
      return {
        success: true,
        agentId: input.agentId,
        message: `Brain initialized for agent ${input.agentId}`,
      };
    }),

  // Get all agent brain statistics
  getAllAgentStatistics: router.procedure.query(async () => {
    const manager = getBrainManager();
    const statistics = await manager.getAllAgentStatistics();
    
    return {
      success: true,
      statistics: Object.fromEntries(statistics),
    };
    }),

  // Stop auto-ingest for an agent
  stopAutoIngest: router.procedure
    .input(z.object({
      agentId: z.string(),
    }))
    .mutation(async ({ input }) => {
      const manager = getBrainManager();
      manager.stopAutoIngest(input.agentId);
      
      return {
        success: true,
        message: `Auto-ingest stopped for agent ${input.agentId}`,
      };
    }),
});
