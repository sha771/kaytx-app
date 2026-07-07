import { z } from 'zod';
import { createTRPCRouter, permissionProcedure } from '../../create-context';
import { skillMDManagementService } from '../../../services/skill-md-management-service';
import { Permission } from '../../../lib/rbac';

const uploadSkillFileSchema = z.object({
  agentId: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  language: z.string().optional(),
  difficulty: z.string().optional(),
  processingOptions: z.object({
    extractTopics: z.boolean().optional(),
    extractEntities: z.boolean().optional(),
    extractKeywords: z.boolean().optional(),
    generateSummary: z.boolean().optional(),
    createKnowledgeGraph: z.boolean().optional(),
    chunkDocument: z.boolean().optional(),
    chunkSize: z.number().optional(),
    chunkOverlap: z.number().optional(),
  }).optional(),
});

const searchSkillFilesSchema = z.object({
  agentId: z.string().optional(),
  query: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  language: z.string().optional(),
  difficulty: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
  sortBy: z.enum(['relevance', 'created', 'accessed', 'name']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

const updateSkillFileSchema = z.object({
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  language: z.string().optional(),
  difficulty: z.string().optional(),
  relevanceScore: z.number().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// Upload skill file
export const uploadSkillFileProcedure = permissionProcedure(Permission.AI_AGENT_MANAGE)
  .input(uploadSkillFileSchema.extend({
    fileName: z.string(),
    mimeType: z.string(),
    fileData: z.string(), // Base64 encoded file data
  }))
  .mutation(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      // Decode base64 file data
      const fileBuffer = Buffer.from(input.fileData, 'base64');

      const skillFile = await skillMDManagementService.uploadSkillFile({
        organizationId: ctx.user.organizationId,
        agentId: input.agentId,
        userId: ctx.user.id,
        fileBuffer,
        fileName: input.fileName,
        mimeType: input.mimeType,
        category: input.category,
        tags: input.tags,
        language: input.language,
        difficulty: input.difficulty,
        processingOptions: input.processingOptions,
      });

      return {
        success: true,
        skillFile,
      };
    } catch (error: any) {
      console.error('Failed to upload skill file:', error);
      throw new Error(error.message || 'Failed to upload skill file');
    }
  });

// Get skill file by ID
export const getSkillFileProcedure = permissionProcedure(Permission.AI_AGENT_READ)
  .input(z.object({ skillFileId: z.string() }))
  .query(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const skillFile = await skillMDManagementService.getSkillFileById(
        input.skillFileId,
        ctx.user.organizationId
      );

      if (!skillFile) {
        throw new Error('Skill file not found');
      }

      return skillFile;
    } catch (error: any) {
      console.error('Failed to get skill file:', error);
      throw new Error(error.message || 'Failed to get skill file');
    }
  });

// Search skill files
export const searchSkillFilesProcedure = permissionProcedure(Permission.AI_AGENT_READ)
  .input(searchSkillFilesSchema)
  .query(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const result = await skillMDManagementService.searchSkillFiles({
        organizationId: ctx.user.organizationId,
        agentId: input.agentId,
        query: input.query,
        category: input.category,
        tags: input.tags,
        language: input.language,
        difficulty: input.difficulty,
        limit: input.limit,
        offset: input.offset,
        sortBy: input.sortBy,
        sortOrder: input.sortOrder,
      });

      return result;
    } catch (error: any) {
      console.error('Failed to search skill files:', error);
      throw new Error(error.message || 'Failed to search skill files');
    }
  });

// Semantic search skill files
export const semanticSearchSkillFilesProcedure = permissionProcedure(Permission.AI_AGENT_READ)
  .input(z.object({
    query: z.string(),
    agentId: z.string().optional(),
    limit: z.number().default(10),
  }))
  .query(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const result = await skillMDManagementService.semanticSearchSkillFiles(
        ctx.user.organizationId,
        input.query,
        input.agentId,
        input.limit
      );

      return result;
    } catch (error: any) {
      console.error('Failed to semantic search skill files:', error);
      throw new Error(error.message || 'Failed to semantic search skill files');
    }
  });

// Get skill file chunks
export const getSkillFileChunksProcedure = permissionProcedure(Permission.AI_AGENT_READ)
  .input(z.object({ skillFileId: z.string() }))
  .query(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const chunks = await skillMDManagementService.getSkillFileChunks(
        input.skillFileId,
        ctx.user.organizationId
      );

      return { chunks };
    } catch (error: any) {
      console.error('Failed to get skill file chunks:', error);
      throw new Error(error.message || 'Failed to get skill file chunks');
    }
  });

// Get knowledge graph
export const getKnowledgeGraphProcedure = permissionProcedure(Permission.AI_AGENT_READ)
  .input(z.object({ agentId: z.string().optional() }))
  .query(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const nodes = await skillMDManagementService.getKnowledgeGraph(
        ctx.user.organizationId,
        input.agentId
      );

      return { nodes };
    } catch (error: any) {
      console.error('Failed to get knowledge graph:', error);
      throw new Error(error.message || 'Failed to get knowledge graph');
    }
  });

// Update skill file
export const updateSkillFileProcedure = permissionProcedure(Permission.AI_AGENT_MANAGE)
  .input(z.object({
    skillFileId: z.string(),
    updates: updateSkillFileSchema,
  }))
  .mutation(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const skillFile = await skillMDManagementService.updateSkillFile(
        input.skillFileId,
        ctx.user.organizationId,
        input.updates
      );

      if (!skillFile) {
        throw new Error('Skill file not found or update failed');
      }

      return {
        success: true,
        skillFile,
      };
    } catch (error: any) {
      console.error('Failed to update skill file:', error);
      throw new Error(error.message || 'Failed to update skill file');
    }
  });

// Delete skill file
export const deleteSkillFileProcedure = permissionProcedure(Permission.AI_AGENT_MANAGE)
  .input(z.object({ skillFileId: z.string() }))
  .mutation(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const success = await skillMDManagementService.deleteSkillFile(
        input.skillFileId,
        ctx.user.organizationId
      );

      if (!success) {
        throw new Error('Failed to delete skill file');
      }

      return {
        success: true,
        skillFileId: input.skillFileId,
      };
    } catch (error: any) {
      console.error('Failed to delete skill file:', error);
      throw new Error(error.message || 'Failed to delete skill file');
    }
  });

// Get skill files by agent
export const getSkillFilesByAgentProcedure = permissionProcedure(Permission.AI_AGENT_READ)
  .input(z.object({ agentId: z.string() }))
  .query(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const files = await skillMDManagementService.getSkillFilesByAgent(
        input.agentId,
        ctx.user.organizationId
      );

      return {
        files,
        count: files.length,
      };
    } catch (error: any) {
      console.error('Failed to get skill files by agent:', error);
      throw new Error(error.message || 'Failed to get skill files by agent');
    }
  });

// Get skill file statistics
export const getSkillFileStatsProcedure = permissionProcedure(Permission.AI_AGENT_ANALYTICS_READ)
  .input(z.object({ agentId: z.string().optional() }))
  .query(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const stats = await skillMDManagementService.getSkillFileStats(
        ctx.user.organizationId,
        input.agentId
      );

      return stats;
    } catch (error: any) {
      console.error('Failed to get skill file stats:', error);
      throw new Error(error.message || 'Failed to get skill file stats');
    }
  });

// Reprocess skill file
export const reprocessSkillFileProcedure = permissionProcedure(Permission.AI_AGENT_MANAGE)
  .input(z.object({ skillFileId: z.string() }))
  .mutation(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const success = await skillMDManagementService.reprocessSkillFile(
        input.skillFileId,
        ctx.user.organizationId
      );

      if (!success) {
        throw new Error('Failed to reprocess skill file');
      }

      return {
        success: true,
        skillFileId: input.skillFileId,
      };
    } catch (error: any) {
      console.error('Failed to reprocess skill file:', error);
      throw new Error(error.message || 'Failed to reprocess skill file');
    }
  });

export const skillMDRouter = createTRPCRouter({
  uploadSkillFile: uploadSkillFileProcedure,
  getSkillFile: getSkillFileProcedure,
  searchSkillFiles: searchSkillFilesProcedure,
  semanticSearchSkillFiles: semanticSearchSkillFilesProcedure,
  getSkillFileChunks: getSkillFileChunksProcedure,
  getKnowledgeGraph: getKnowledgeGraphProcedure,
  updateSkillFile: updateSkillFileProcedure,
  deleteSkillFile: deleteSkillFileProcedure,
  getSkillFilesByAgent: getSkillFilesByAgentProcedure,
  getSkillFileStats: getSkillFileStatsProcedure,
  reprocessSkillFile: reprocessSkillFileProcedure,
});
