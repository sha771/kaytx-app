/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import { Hono } from 'hono';
import { z } from 'zod';
import { 
  companyBrainChatChannels, 
  companyBrainChatConversationsExtended, 
  companyBrainChatMessagesExtended,
  companyBrainChatThreads,
  companyBrainAIConversations,
  companyBrainAIMessages,
  companyBrainChatTypingIndicators,
  companyBrainChatReadReceipts,
  users,
  organizations
} from '../../db/drizzle-schema';
import { eq, desc, and, or } from 'drizzle-orm';
import { companyBrainIngestionService } from '../../services/company-brain-ingestion';
import { companyBrainDepartureService } from '../../services/company-brain-departure';
import { companyBrainSuccessionService } from '../../services/company-brain-succession';
import { documentProcessorService } from '../../services/company-brain-document-processor';
import { integrationService } from '../../services/company-brain-integrations';
import { knowledgeGraphService } from '../../services/company-brain-graph';
import { enhancedSearchService } from '../../services/company-brain-search';
import { analyticsDashboardService } from '../../services/company-brain-analytics';
import { companyBrainChatService } from '../../services/company-brain-chat';
import { SearchQuery, SearchFilters } from '../../services/company-brain-search';
import { companyBrainChatArchivingService } from '../../services/company-brain-chat-archiving';
import { companyBrainMeetingTranscriptionService } from '../../services/company-brain-meeting-transcription';
import { companyBrainEmailMappingService } from '../../services/company-brain-email-mapping';
import { companyBrainSOPExtractionService } from '../../services/company-brain-sop-extraction';
import { companyBrainExpertiseProfilingService } from '../../services/company-brain-expertise-profiling';
import { companyBrainProjectLinkingService } from '../../services/company-brain-project-linking';
import { companyBrainAccessRevocationService } from '../../services/company-brain-access-revocation';
import { companyBrainOwnershipTransferService } from '../../services/company-brain-ownership-transfer';
import { companyBrainOnboardingSearchService } from '../../services/company-brain-onboarding-search';
import { companyBrainInternalChatService } from '../../services/company-brain-internal-chat';
import { companyBrainAIAssistantChatService } from '../../services/company-brain-ai-assistant-chat';
import type { RouteContext } from './route-types';
import { companyBrainChatCollaborationService } from '../../services/company-brain-chat-collaboration';
import { companyBrainChannelThreadManagementService } from '../../services/company-brain-channel-thread-management';
import { companyBrainChatKnowledgeIntegrationService } from '../../services/company-brain-chat-knowledge-integration';
import crypto from 'crypto';

const companyBrainRouter = new Hono<{ Variables: RouteContext['env']['Variables'] }>();

type AppContext = RouteContext;

const createKnowledgeNodeSchema = z.object({
  title: z.string().min(1).max(500),
  content: z.string().min(1),
  type: z.enum(['process', 'decision', 'client', 'project', 'technical', 'tribal', 'sop', 'workflow', 'playbook', 'document', 'person', 'product', 'policy']),
  sourceType: z.string().optional(),
  sourceId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  authorId: z.string(),
  departmentId: z.string().optional(),
  projectIds: z.array(z.string()).optional(),
  organizationId: z.string().optional(),
});

const updateKnowledgeNodeSchema = z.object({
  title: z.string().min(1).max(500).optional(),
  content: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'verified', 'outdated', 'archived']).optional(),
});

const searchQuerySchema = z.object({
  query: z.string().min(1),
  filters: z.object({
    sourceType: z.array(z.string()).optional(),
    type: z.array(z.string()).optional(),
    departmentId: z.string().optional(),
    projectId: z.string().optional(),
    dateRange: z.object({
      start: z.string().optional(),
      end: z.string().optional(),
    }).optional(),
  }).optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
  searchMode: z.enum(['hybrid', 'vector', 'keyword']).optional().default('hybrid'),
  rerank: z.boolean().optional().default(false),
});

// Knowledge Nodes Endpoints

// GET /api/company-brain/knowledge-nodes - List all knowledge nodes
companyBrainRouter.get('/knowledge-nodes', async (c: AppContext) => {
  try {
    const limit = parseInt(c.req.query('limit') || '20');
    const offset = parseInt(c.req.query('offset') || '0');
    const type = c.req.query('type');
    const organizationId = c.req.query('organizationId');

    let nodes = await knowledgeGraphService.getAllNodes(organizationId);
    
    if (type) {
      nodes = nodes.filter(n => n.type === type);
    }

    const paginatedNodes = nodes.slice(offset, offset + limit);
    
    return c.json({ 
      success: true, 
      data: paginatedNodes,
      pagination: { limit, offset, total: nodes.length }
    });
  } catch (error) {
    console.error('Error fetching knowledge nodes:', error);
    return c.json({ success: false, error: 'Failed to fetch knowledge nodes' }, 500);
  }
});

// GET /api/company-brain/knowledge-nodes/:id - Get a specific knowledge node
companyBrainRouter.get('/knowledge-nodes/:id', async (c: AppContext) => {
  try {
    const id = c.req.param('id');
    
    const node = await knowledgeGraphService.getNode(id);
    
    if (!node) {
      return c.json({ success: false, error: 'Knowledge node not found' }, 404);
    }
    
    return c.json({ success: true, data: node });
  } catch (error) {
    console.error('Error fetching knowledge node:', error);
    return c.json({ success: false, error: 'Failed to fetch knowledge node' }, 500);
  }
});

// POST /api/company-brain/knowledge-nodes - Create a new knowledge node
companyBrainRouter.post('/knowledge-nodes', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const validatedData = createKnowledgeNodeSchema.parse(body);

    // Use knowledgeGraphService instead of direct DB
    const newNode = await knowledgeGraphService.addNode({
      organizationId: validatedData.organizationId || c.req.query('organizationId') || 'default',
      type: validatedData.type,
      label: validatedData.title,
      content: validatedData.content,
      sourceType: validatedData.sourceType,
      sourceId: validatedData.sourceId,
      tags: validatedData.tags || [],
      createdBy: validatedData.authorId,
      departmentId: validatedData.departmentId,
      projectIds: validatedData.projectIds || [],
      properties: {
        status: 'draft',
        confidenceScore: 0.85,
      },
    });
    
    return c.json({ success: true, data: newNode }, 201);
  } catch (error) {
    console.error('Error creating knowledge node:', error);
    return c.json({ success: false, error: 'Failed to create knowledge node' }, 500);
  }
});

// PUT /api/company-brain/knowledge-nodes/:id - Update a knowledge node
companyBrainRouter.put('/knowledge-nodes/:id', async (c: AppContext) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const validatedData = updateKnowledgeNodeSchema.parse(body);

    const updatedNode = await knowledgeGraphService.updateNode(id, {
      ...validatedData,
    });

    if (!updatedNode) {
      return c.json({ success: false, error: 'Knowledge node not found' }, 404);
    }
    
    return c.json({ success: true, data: updatedNode });
  } catch (error) {
    console.error('Error updating knowledge node:', error);
    return c.json({ success: false, error: 'Failed to update knowledge node' }, 500);
  }
});

// DELETE /api/company-brain/knowledge-nodes/:id - Delete a knowledge node
companyBrainRouter.delete('/knowledge-nodes/:id', async (c: AppContext) => {
  try {
    const id = c.req.param('id');
    
    const deleted = await knowledgeGraphService.deleteNode(id);
    
    if (!deleted) {
      return c.json({ success: false, error: 'Knowledge node not found' }, 404);
    }
    
    return c.json({ success: true, message: 'Knowledge node deleted' });
  } catch (error) {
    console.error('Error deleting knowledge node:', error);
    return c.json({ success: false, error: 'Failed to delete knowledge node' }, 500);
  }
});

// Search Endpoints

// POST /api/company-brain/search - Semantic search for knowledge
companyBrainRouter.post('/search', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const validatedData = searchQuerySchema.parse(body);

    // Use enhancedSearchService instead of direct DB
    const searchQuery: SearchQuery = {
      query: validatedData.query,
      filters: validatedData.filters as SearchFilters | undefined,
      limit: validatedData.limit,
      offset: validatedData.offset,
      searchMode: validatedData.searchMode || 'hybrid',
      rerank: validatedData.rerank || false,
      organizationId: c.req.query('organizationId') || 'default',
    };
    
    const searchResult = await enhancedSearchService.search(searchQuery);

    return c.json({ 
      success: true, 
      data: searchResult.results,
      query: validatedData.query,
      total: searchResult.total,
      pagination: { limit: validatedData.limit, offset: validatedData.offset }
    });
  } catch (error) {
    console.error('Error searching knowledge:', error);
    return c.json({ success: false, error: 'Search failed' }, 500);
  }
});

// Knowledge Graph Endpoints

// GET /api/company-brain/graph - Get knowledge graph data
companyBrainRouter.get('/graph', async (c: AppContext) => {
  try {
    const limit = parseInt(c.req.query('limit') || '100');
    const type = c.req.query('type');

    // Get nodes from knowledgeGraphService
    let nodes = await knowledgeGraphService.getAllNodes();
    
    if (type) {
      nodes = nodes.filter((node: any) => node.type === type);
    }
    
    const limitedNodes = nodes.slice(0, limit);
    
    // Get edges
    let edges = await knowledgeGraphService.getAllEdges();
    const limitedEdges = edges.slice(0, limit * 2);

    return c.json({ 
      success: true, 
      data: {
        nodes: limitedNodes,
        edges: limitedEdges
      }
    });
  } catch (error) {
    console.error('Error fetching knowledge graph:', error);
    return c.json({ success: false, error: 'Failed to fetch knowledge graph' }, 500);
  }
});

// Analytics Endpoints

// GET /api/company-brain/analytics/health - Get knowledge health metrics
companyBrainRouter.get('/analytics/health', async (c: AppContext) => {
  try {
    // Use knowledgeGraphService for metrics
    const allNodes = await knowledgeGraphService.getAllNodes();
    const verifiedNodes = allNodes.filter(n => n.properties.status === 'verified');
    const outdatedNodes = allNodes.filter(n => n.properties.status === 'outdated');

    const coverage = allNodes.length > 0 ? (verifiedNodes.length / allNodes.length) * 100 : 0;
    const outdatedPercentage = allNodes.length > 0 ? (outdatedNodes.length / allNodes.length) * 100 : 0;

    const healthMetrics = {
      coverage: Math.round(coverage),
      outdated: Math.round(outdatedPercentage),
      duplicates: 8,
      totalNodes: allNodes.length,
      lastUpdated: new Date().toISOString(),
    };

    return c.json({ success: true, data: healthMetrics });
  } catch (error) {
    console.error('Error fetching health metrics:', error);
    return c.json({ success: false, error: 'Failed to fetch health metrics' }, 500);
  }
});

// GET /api/company-brain/analytics/usage - Get usage analytics
companyBrainRouter.get('/analytics/usage', async (c: AppContext) => {
  try {
    const timeRange = c.req.query('range') || '30d';

    // Use knowledgeGraphService for mock data
    const allNodes = await knowledgeGraphService.getAllNodes();
    const totalNodes = allNodes.length;

    const uniqueUsers = Math.max(1, Math.floor(totalNodes * 0.3));
    const totalSearches = totalNodes * 2;

    const usageMetrics = {
      totalSearches,
      uniqueUsers,
      avgSessionDuration: '8m 32s',
      successRate: 87,
      timeRange,
    };

    return c.json({ success: true, data: usageMetrics });
  } catch (error) {
    console.error('Error fetching usage metrics:', error);
    return c.json({ success: false, error: 'Failed to fetch usage metrics' }, 500);
  }
});

// GET /api/company-brain/analytics/risks - Get risk assessment
companyBrainRouter.get('/analytics/risks', async (c: AppContext) => {
  try {
    // Use knowledgeGraphService for mock data
    const allNodes = await knowledgeGraphService.getAllNodes();
    const atRiskDepartures = Math.floor(allNodes.length * 0.05);
    const singlePointOfFailure = 3;

    const riskAssessment = {
      singlePointOfFailure,
      atRiskDepartures,
      complianceGaps: 1,
      overallRisk: atRiskDepartures > 2 ? 'high' : atRiskDepartures > 0 ? 'medium' : 'low',
    };

    return c.json({ success: true, data: riskAssessment });
  } catch (error) {
    console.error('Error fetching risk assessment:', error);
    return c.json({ success: false, error: 'Failed to fetch risk assessment' }, 500);
  }
});

// Team Knowledge Endpoints

// GET /api/company-brain/team/experts - Get knowledge experts
companyBrainRouter.get('/team/experts', async (c: AppContext) => {
  try {
    const departmentId = c.req.query('departmentId');

    // Use knowledgeGraphService for mock experts
    const allNodes = await knowledgeGraphService.getAllNodes();
    const experts = allNodes
      .filter(n => n.properties.authorId)
      .slice(0, 20)
      .map(node => ({
        id: node.id,
        name: `Expert ${node.id.slice(0, 8)}`,
        department: departmentId || node.properties.departmentId || 'Engineering',
        knowledgeContributionScore: node.properties.confidenceScore * 100 || 85,
        areas: [node.type],
      }));

    return c.json({ success: true, data: experts });
  } catch (error) {
    console.error('Error fetching experts:', error);
    return c.json({ success: false, error: 'Failed to fetch experts' }, 500);
  }
});

// GET /api/company-brain/team/coverage - Get department knowledge coverage
companyBrainRouter.get('/team/coverage', async (c: AppContext) => {
  try {
    // Placeholder implementation - would calculate actual coverage per department
    const departmentCoverage = [
      { id: 'engineering', name: 'Engineering', coverage: 92, contributions: 234, searchActivity: 456 },
      { id: 'product', name: 'Product', coverage: 85, contributions: 156, searchActivity: 312 },
      { id: 'sales', name: 'Sales', coverage: 78, contributions: 98, searchActivity: 234 },
      { id: 'marketing', name: 'Marketing', coverage: 71, contributions: 87, searchActivity: 198 },
      { id: 'hr', name: 'HR', coverage: 88, contributions: 65, searchActivity: 145 },
    ];

    return c.json({ success: true, data: departmentCoverage });
  } catch (error) {
    console.error('Error fetching department coverage:', error);
    return c.json({ success: false, error: 'Failed to fetch department coverage' }, 500);
  }
});

// Onboarding Endpoints

// GET /api/company-brain/onboarding/progress - Get onboarding progress
companyBrainRouter.get('/onboarding/progress', async (c: AppContext) => {
  try {
    const userId = c.req.query('userId');

    // Use onboarding service instead of direct DB
    // const onboardingData = await companyBrainOnboardingSearchService.getProgress(userId);
    
    // Return mock data since service isn't fully implemented
    return c.json({ 
      success: true, 
      data: {
        role: 'New Employee',
        department: 'General',
        progress: 0,
        modulesCompleted: 0,
        totalModules: 12,
        daysOnboarded: 0,
        estimatedCompletion: 21,
      }
    });
  } catch (error) {
    console.error('Error fetching onboarding progress:', error);
    return c.json({ success: false, error: 'Failed to fetch onboarding progress' }, 500);
  }
});

// Document Upload Endpoints

// POST /api/company-brain/documents/upload - Upload and process document
companyBrainRouter.post('/documents/upload', async (c: AppContext) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const authorId = formData.get('authorId') as string;

    if (!file) {
      return c.json({ success: false, error: 'No file provided' }, 400);
    }

    // Process document (placeholder - would use OCR and AI extraction in production)
    const content = await file.text();
    
    // Create knowledge node from document
    const newNode = {
      id: crypto.randomUUID(),
      title: file.name,
      content: content.substring(0, 10000), // Truncate for demo
      type: 'document' as const,
      sourceType: 'document' as const,
      sourceId: file.name,
      tags: ['document', 'uploaded'],
      authorId,
      embeddingVector: Array(1536).fill(0).map(() => Math.random()),
      confidenceScore: 0.75,
      status: 'draft' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Use knowledgeGraphService instead of direct DB
    const createdNode = knowledgeGraphService.addNode({
      id: newNode.id,
      type: newNode.type,
      label: newNode.title,
      properties: {
        content: newNode.content,
        tags: newNode.tags,
        authorId: newNode.authorId,
        sourceType: newNode.sourceType,
        sourceId: newNode.sourceId,
        confidenceScore: newNode.confidenceScore,
        status: newNode.status,
      },
    });

    return c.json({ success: true, data: createdNode }, 201);
  } catch (error) {
    console.error('Error uploading document:', error);
    return c.json({ success: false, error: 'Failed to upload document' }, 500);
  }
});

// Settings Endpoints

// GET /api/company-brain/settings/integrations - Get integration status
companyBrainRouter.get('/settings/integrations', async (c: AppContext) => {
  try {
    // Placeholder implementation - would fetch actual integration status
    const integrations = [
      { id: 'slack', name: 'Slack', status: 'connected', lastSync: '2 hours ago' },
      { id: 'gmail', name: 'Gmail', status: 'connected', lastSync: '1 hour ago' },
      { id: 'jira', name: 'Jira', status: 'disconnected', lastSync: null },
      { id: 'github', name: 'GitHub', status: 'disconnected', lastSync: null },
    ];

    return c.json({ success: true, data: integrations });
  } catch (error) {
    console.error('Error fetching integrations:', error);
    return c.json({ success: false, error: 'Failed to fetch integrations' }, 500);
  }
});

// POST /api/company-brain/settings/integrations/:id/connect - Connect an integration
companyBrainRouter.post('/settings/integrations/:id/connect', async (c: AppContext) => {
  try {
    const integrationId = c.req.param('id');
    const body = await c.req.json();

    // Placeholder implementation - would handle OAuth flow
    return c.json({ 
      success: true, 
      message: `${integrationId} integration connected`,
      data: { id: integrationId, status: 'connected', ...body }
    });
  } catch (error) {
    console.error('Error connecting integration:', error);
    return c.json({ success: false, error: 'Failed to connect integration' }, 500);
  }
});

// DELETE /api/company-brain/settings/integrations/:id/disconnect - Disconnect an integration
companyBrainRouter.delete('/settings/integrations/:id/disconnect', async (c: AppContext) => {
  try {
    const integrationId = c.req.param('id');

    // Placeholder implementation
    return c.json({ 
      success: true, 
      message: `${integrationId} integration disconnected` 
    });
  } catch (error) {
    console.error('Error disconnecting integration:', error);
    return c.json({ success: false, error: 'Failed to disconnect integration' }, 500);
  }
});

// Ingestion Endpoints

// POST /api/company-brain/ingestion/configure - Configure automated ingestion
companyBrainRouter.post('/ingestion/configure', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    
    companyBrainIngestionService.configureIngestion(body);
    
    return c.json({ success: true, message: 'Ingestion configured successfully' });
  } catch (error) {
    console.error('Error configuring ingestion:', error);
    return c.json({ success: false, error: 'Failed to configure ingestion' }, 500);
  }
});

// POST /api/company-brain/ingestion/start - Start automated ingestion
companyBrainRouter.post('/ingestion/start', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const { companyId } = body;
    
    await companyBrainIngestionService.startIngestion(companyId);
    
    return c.json({ success: true, message: 'Ingestion started successfully' });
  } catch (error) {
    console.error('Error starting ingestion:', error);
    return c.json({ success: false, error: 'Failed to start ingestion' }, 500);
  }
});

// POST /api/company-brain/ingestion/stop - Stop automated ingestion
companyBrainRouter.post('/ingestion/stop', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const { companyId } = body;
    
    companyBrainIngestionService.stopIngestion(companyId);
    
    return c.json({ success: true, message: 'Ingestion stopped successfully' });
  } catch (error) {
    console.error('Error stopping ingestion:', error);
    return c.json({ success: false, error: 'Failed to stop ingestion' }, 500);
  }
});

// GET /api/company-brain/ingestion/status - Get ingestion status
companyBrainRouter.get('/ingestion/status', async (c: AppContext) => {
  try {
    const companyId = c.req.query('companyId') || 'default';
    
    const status = companyBrainIngestionService.getIngestionStatus(companyId);
    
    return c.json({ success: true, data: status });
  } catch (error) {
    console.error('Error getting ingestion status:', error);
    return c.json({ success: false, error: 'Failed to get ingestion status' }, 500);
  }
});

// Employee Departure Endpoints

// POST /api/company-brain/departure/configure - Configure departure detection
companyBrainRouter.post('/departure/configure', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    
    companyBrainDepartureService.configureDetection(body);
    
    return c.json({ success: true, message: 'Departure detection configured successfully' });
  } catch (error) {
    console.error('Error configuring departure detection:', error);
    return c.json({ success: false, error: 'Failed to configure departure detection' }, 500);
  }
});

// POST /api/company-brain/departure/register - Register employee for monitoring
companyBrainRouter.post('/departure/register', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    
    companyBrainDepartureService.registerEmployee(body);
    
    return c.json({ success: true, message: 'Employee registered for monitoring' });
  } catch (error) {
    console.error('Error registering employee:', error);
    return c.json({ success: false, error: 'Failed to register employee' }, 500);
  }
});

// POST /api/company-brain/departure/update-status - Update employee departure status
companyBrainRouter.post('/departure/update-status', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const { employeeId, status, departureDate } = body;
    
    await companyBrainDepartureService.updateEmployeeStatus(employeeId, status, departureDate);
    
    return c.json({ success: true, message: 'Employee status updated successfully' });
  } catch (error) {
    console.error('Error updating employee status:', error);
    return c.json({ success: false, error: 'Failed to update employee status' }, 500);
  }
});

// GET /api/company-brain/departure/status - Get departure detection status
companyBrainRouter.get('/departure/status', async (c: AppContext) => {
  try {
    const status = companyBrainDepartureService.getDetectionStatus();
    
    return c.json({ success: true, data: status });
  } catch (error) {
    console.error('Error getting departure status:', error);
    return c.json({ success: false, error: 'Failed to get departure status' }, 500);
  }
});

// GET /api/company-brain/departure/at-risk - Get employees at risk
companyBrainRouter.get('/departure/at-risk', async (c: AppContext) => {
  try {
    const employeesAtRisk = companyBrainDepartureService.getEmployeesAtRisk();
    
    return c.json({ success: true, data: employeesAtRisk });
  } catch (error) {
    console.error('Error getting employees at risk:', error);
    return c.json({ success: false, error: 'Failed to get employees at risk' }, 500);
  }
});

// GET /api/company-brain/departure/preservation/:employeeId - Get preservation plan
companyBrainRouter.get('/departure/preservation/:employeeId', async (c: AppContext) => {
  try {
    const employeeId = c.req.param('employeeId');
    
    const plan = companyBrainDepartureService.getPreservationPlan(employeeId);
    
    return c.json({ success: true, data: plan });
  } catch (error) {
    console.error('Error getting preservation plan:', error);
    return c.json({ success: false, error: 'Failed to get preservation plan' }, 500);
  }
});

// Succession Planning Endpoints

// POST /api/company-brain/succession/create-workflow - Create knowledge transfer workflow
companyBrainRouter.post('/succession/create-workflow', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const { fromEmployeeId, fromEmployeeName, toEmployeeId, toEmployeeName, knowledgeAreas, targetDate } = body;
    
    const workflow = await companyBrainSuccessionService.createTransferWorkflow(
      fromEmployeeId,
      fromEmployeeName,
      toEmployeeId,
      toEmployeeName,
      knowledgeAreas,
      new Date(targetDate)
    );
    
    return c.json({ success: true, data: workflow });
  } catch (error) {
    console.error('Error creating transfer workflow:', error);
    return c.json({ success: false, error: 'Failed to create transfer workflow' }, 500);
  }
});

// POST /api/company-brain/succession/start-workflow - Start transfer workflow
companyBrainRouter.post('/succession/start-workflow', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const { workflowId } = body;
    
    await companyBrainSuccessionService.startTransferWorkflow(workflowId);
    
    return c.json({ success: true, message: 'Transfer workflow started successfully' });
  } catch (error) {
    console.error('Error starting transfer workflow:', error);
    return c.json({ success: false, error: 'Failed to start transfer workflow' }, 500);
  }
});

// POST /api/company-brain/succession/complete-checklist-item - Complete checklist item
companyBrainRouter.post('/succession/complete-checklist-item', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const { checklistId, itemId } = body;
    
    companyBrainSuccessionService.completeChecklistItem(checklistId, itemId);
    
    return c.json({ success: true, message: 'Checklist item completed successfully' });
  } catch (error) {
    console.error('Error completing checklist item:', error);
    return c.json({ success: false, error: 'Failed to complete checklist item' }, 500);
  }
});

// POST /api/company-brain/succession/update-session - Update transfer session
companyBrainRouter.post('/succession/update-session', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const { workflowId, sessionId, status, notes, recordingUrl } = body;
    
    companyBrainSuccessionService.updateTransferSession(workflowId, sessionId, status, notes, recordingUrl);
    
    return c.json({ success: true, message: 'Transfer session updated successfully' });
  } catch (error) {
    console.error('Error updating transfer session:', error);
    return c.json({ success: false, error: 'Failed to update transfer session' }, 500);
  }
});

// GET /api/company-brain/succession/workflow/:workflowId - Get transfer workflow
companyBrainRouter.get('/succession/workflow/:workflowId', async (c: AppContext) => {
  try {
    const workflowId = c.req.param('workflowId');
    
    const workflow = companyBrainSuccessionService.getWorkflow(workflowId);
    
    return c.json({ success: true, data: workflow });
  } catch (error) {
    console.error('Error getting transfer workflow:', error);
    return c.json({ success: false, error: 'Failed to get transfer workflow' }, 500);
  }
});

// GET /api/company-brain/succession/workflow/:workflowId/checklist - Get workflow checklist
companyBrainRouter.get('/succession/workflow/:workflowId/checklist', async (c: AppContext) => {
  try {
    const workflowId = c.req.param('workflowId');
    
    const checklist = companyBrainSuccessionService.getWorkflowChecklist(workflowId);
    
    return c.json({ success: true, data: checklist });
  } catch (error) {
    console.error('Error getting workflow checklist:', error);
    return c.json({ success: false, error: 'Failed to get workflow checklist' }, 500);
  }
});

// GET /api/company-brain/succession/workflow/:workflowId/readiness - Get transfer readiness score
companyBrainRouter.get('/succession/workflow/:workflowId/readiness', async (c: AppContext) => {
  try {
    const workflowId = c.req.param('workflowId');
    
    const readiness = companyBrainSuccessionService.getTransferReadinessScore(workflowId);
    
    return c.json({ success: true, data: readiness });
  } catch (error) {
    console.error('Error getting transfer readiness:', error);
    return c.json({ success: false, error: 'Failed to get transfer readiness' }, 500);
  }
});

// GET /api/company-brain/succession/active - Get all active workflows
companyBrainRouter.get('/succession/active', async (c: AppContext) => {
  try {
    const workflows = companyBrainSuccessionService.getActiveWorkflows();
    
    return c.json({ success: true, data: workflows });
  } catch (error) {
    console.error('Error getting active workflows:', error);
    return c.json({ success: false, error: 'Failed to get active workflows' }, 500);
  }
});

// GET /api/company-brain/succession/employee/:employeeId - Get employee workflows
companyBrainRouter.get('/succession/employee/:employeeId', async (c: AppContext) => {
  try {
    const employeeId = c.req.param('employeeId');
    
    const workflows = companyBrainSuccessionService.getEmployeeWorkflows(employeeId);
    
    return c.json({ success: true, data: workflows });
  } catch (error) {
    console.error('Error getting employee workflows:', error);
    return c.json({ success: false, error: 'Failed to get employee workflows' }, 500);
  }
});

// Document Processing Endpoints

// POST /api/company-brain/documents/process - Process uploaded document
companyBrainRouter.post('/documents/process', async (c: AppContext) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const authorId = formData.get('authorId') as string;
    const departmentId = formData.get('departmentId') as string;
    const projectIds = formData.get('projectIds') as string;
    const tags = formData.get('tags') as string;

    if (!file) {
      return c.json({ success: false, error: 'No file provided' }, 400);
    }

    const result = await documentProcessorService.processDocument(
      file,
      authorId,
      departmentId,
      projectIds ? projectIds.split(',') : undefined,
      tags ? tags.split(',') : undefined
    );

    return c.json({ success: true, data: result });
  } catch (error) {
    console.error('Error processing document:', error);
    return c.json({ success: false, error: 'Failed to process document' }, 500);
  }
});

// GET /api/company-brain/documents - Get all documents
companyBrainRouter.get('/documents', async (c: AppContext) => {
  try {
    const documents = documentProcessorService.getAllDocuments();
    return c.json({ success: true, data: documents });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return c.json({ success: false, error: 'Failed to fetch documents' }, 500);
  }
});

// GET /api/company-brain/documents/:id - Get document metadata
companyBrainRouter.get('/documents/:id', async (c: AppContext) => {
  try {
    const documentId = c.req.param('id');
    const document = documentProcessorService.getDocumentMetadata(documentId);
    
    if (!document) {
      return c.json({ success: false, error: 'Document not found' }, 404);
    }

    return c.json({ success: true, data: document });
  } catch (error) {
    console.error('Error fetching document:', error);
    return c.json({ success: false, error: 'Failed to fetch document' }, 500);
  }
});

// DELETE /api/company-brain/documents/:id - Delete document
companyBrainRouter.delete('/documents/:id', async (c: AppContext) => {
  try {
    const documentId = c.req.param('id');
    const deleted = await documentProcessorService.deleteDocument(documentId);
    
    return c.json({ success: true, deleted });
  } catch (error) {
    console.error('Error deleting document:', error);
    return c.json({ success: false, error: 'Failed to delete document' }, 500);
  }
});

// GET /api/company-brain/documents/stats - Get processing statistics
companyBrainRouter.get('/documents/stats', async (c: AppContext) => {
  try {
    const stats = documentProcessorService.getProcessingStats();
    return c.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching document stats:', error);
    return c.json({ success: false, error: 'Failed to fetch document stats' }, 500);
  }
});

// Integration Endpoints

// POST /api/company-brain/integrations/register - Register new integration
companyBrainRouter.post('/integrations/register', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const { type, credentials, settings } = body;

    const integration = await integrationService.registerIntegration(type, credentials, settings);
    
    return c.json({ success: true, data: integration });
  } catch (error) {
    console.error('Error registering integration:', error);
    return c.json({ success: false, error: 'Failed to register integration' }, 500);
  }
});

// GET /api/company-brain/integrations - Get all integrations
companyBrainRouter.get('/integrations', async (c: AppContext) => {
  try {
    const integrations = integrationService.getIntegrations();
    return c.json({ success: true, data: integrations });
  } catch (error) {
    console.error('Error fetching integrations:', error);
    return c.json({ success: false, error: 'Failed to fetch integrations' }, 500);
  }
});

// GET /api/company-brain/integrations/:id - Get integration by ID
companyBrainRouter.get('/integrations/:id', async (c: AppContext) => {
  try {
    const integrationId = c.req.param('id');
    const integration = integrationService.getIntegration(integrationId);
    
    if (!integration) {
      return c.json({ success: false, error: 'Integration not found' }, 404);
    }

    return c.json({ success: true, data: integration });
  } catch (error) {
    console.error('Error fetching integration:', error);
    return c.json({ success: false, error: 'Failed to fetch integration' }, 500);
  }
});

// PUT /api/company-brain/integrations/:id - Update integration
companyBrainRouter.put('/integrations/:id', async (c: AppContext) => {
  try {
    const integrationId = c.req.param('id');
    const body = await c.req.json();
    
    integrationService.updateIntegration(integrationId, body);
    
    return c.json({ success: true, message: 'Integration updated' });
  } catch (error) {
    console.error('Error updating integration:', error);
    return c.json({ success: false, error: 'Failed to update integration' }, 500);
  }
});

// POST /api/company-brain/integrations/:id/sync - Trigger manual sync
companyBrainRouter.post('/integrations/:id/sync', async (c: AppContext) => {
  try {
    const integrationId = c.req.param('id');
    const result = await integrationService.syncIntegration(integrationId);
    
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error('Error syncing integration:', error);
    return c.json({ success: false, error: 'Failed to sync integration' }, 500);
  }
});

// DELETE /api/company-brain/integrations/:id - Delete integration
companyBrainRouter.delete('/integrations/:id', async (c: AppContext) => {
  try {
    const integrationId = c.req.param('id');
    const deleted = await integrationService.deleteIntegration(integrationId);
    
    return c.json({ success: true, deleted });
  } catch (error) {
    console.error('Error deleting integration:', error);
    return c.json({ success: false, error: 'Failed to delete integration' }, 500);
  }
});

// GET /api/company-brain/integrations/stats - Get integration statistics
companyBrainRouter.get('/integrations/stats', async (c: AppContext) => {
  try {
    const stats = integrationService.getIntegrationStats();
    return c.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching integration stats:', error);
    return c.json({ success: false, error: 'Failed to fetch integration stats' }, 500);
  }
});

// Knowledge Graph Endpoints

// POST /api/company-brain/graph/nodes - Add node to graph
companyBrainRouter.post('/graph/nodes', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const node = knowledgeGraphService.addNode(body);
    
    return c.json({ success: true, data: node });
  } catch (error) {
    console.error('Error adding node:', error);
    return c.json({ success: false, error: 'Failed to add node' }, 500);
  }
});

// POST /api/company-brain/graph/edges - Add edge to graph
companyBrainRouter.post('/graph/edges', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const edge = knowledgeGraphService.addEdge(body);
    
    return c.json({ success: true, data: edge });
  } catch (error) {
    console.error('Error adding edge:', error);
    return c.json({ success: false, error: 'Failed to add edge' }, 500);
  }
});

// GET /api/company-brain/graph/nodes - Get all nodes
companyBrainRouter.get('/graph/nodes', async (c: AppContext) => {
  try {
    const nodes = knowledgeGraphService.getAllNodes();
    return c.json({ success: true, data: nodes });
  } catch (error) {
    console.error('Error fetching nodes:', error);
    return c.json({ success: false, error: 'Failed to fetch nodes' }, 500);
  }
});

// GET /api/company-brain/graph/edges - Get all edges
companyBrainRouter.get('/graph/edges', async (c: AppContext) => {
  try {
    const edges = knowledgeGraphService.getAllEdges();
    return c.json({ success: true, data: edges });
  } catch (error) {
    console.error('Error fetching edges:', error);
    return c.json({ success: false, error: 'Failed to fetch edges' }, 500);
  }
});

// GET /api/company-brain/graph/visualization - Get graph data for visualization
companyBrainRouter.get('/graph/visualization', async (c: AppContext) => {
  try {
    const limit = parseInt(c.req.query('limit') || '100');
    const nodeTypes = c.req.query('nodeTypes')?.split(',');
    
    const data = knowledgeGraphService.getVisualizationData(limit, nodeTypes);
    return c.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching visualization data:', error);
    return c.json({ success: false, error: 'Failed to fetch visualization data' }, 500);
  }
});

// GET /api/company-brain/graph/path/:from/:to - Find shortest path
companyBrainRouter.get('/graph/path/:from/:to', async (c: AppContext) => {
  try {
    const from = c.req.param('from');
    const to = c.req.param('to');
    const edgeTypes = c.req.query('edgeTypes')?.split(',');
    
    const path = knowledgeGraphService.findShortestPath(from, to, edgeTypes);
    
    return c.json({ success: true, data: path });
  } catch (error) {
    console.error('Error finding path:', error);
    return c.json({ success: false, error: 'Failed to find path' }, 500);
  }
});

// GET /api/company-brain/graph/subgraph/:centerId - Get subgraph around node
companyBrainRouter.get('/graph/subgraph/:centerId', async (c: AppContext) => {
  try {
    const centerId = c.req.param('centerId');
    const depth = parseInt(c.req.query('depth') || '2');
    const edgeTypes = c.req.query('edgeTypes')?.split(',');
    
    const subgraph = knowledgeGraphService.getSubgraph(centerId, depth, edgeTypes);
    return c.json({ success: true, data: subgraph });
  } catch (error) {
    console.error('Error fetching subgraph:', error);
    return c.json({ success: false, error: 'Failed to fetch subgraph' }, 500);
  }
});

// GET /api/company-brain/graph/statistics - Get graph statistics
companyBrainRouter.get('/graph/statistics', async (c: AppContext) => {
  try {
    const stats = knowledgeGraphService.getStatistics();
    return c.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching graph statistics:', error);
    return c.json({ success: false, error: 'Failed to fetch graph statistics' }, 500);
  }
});

// Enhanced Search Endpoints

// POST /api/company-brain/search/enhanced - Perform enhanced hybrid search
companyBrainRouter.post('/search/enhanced', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    
    const searchQuery = {
      query: body.query || '',
      filters: body.filters,
      limit: body.limit || 20,
      offset: body.offset || 0,
      searchMode: body.searchMode || 'hybrid',
      rerank: body.rerank || false,
    };
    
    const result = enhancedSearchService.search(searchQuery);
    
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error('Error performing enhanced search:', error);
    return c.json({ success: false, error: 'Search failed' }, 500);
  }
});

// GET /api/company-brain/search/suggestions - Get search suggestions
companyBrainRouter.get('/search/suggestions', async (c: AppContext) => {
  try {
    const query = c.req.query('q') || '';
    const limit = parseInt(c.req.query('limit') || '10');
    
    const suggestions = await enhancedSearchService.getSearchSuggestions(query, limit);
    return c.json({ success: true, data: suggestions });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return c.json({ success: false, error: 'Failed to fetch suggestions' }, 500);
  }
});

// GET /api/company-brain/search/popular - Get popular search queries
companyBrainRouter.get('/search/popular', async (c: AppContext) => {
  try {
    const limit = parseInt(c.req.query('limit') || '10');
    const popular = enhancedSearchService.getPopularQueries(limit);
    
    return c.json({ success: true, data: popular });
  } catch (error) {
    console.error('Error fetching popular queries:', error);
    return c.json({ success: false, error: 'Failed to fetch popular queries' }, 500);
  }
});

// GET /api/company-brain/search/stats - Get search statistics
companyBrainRouter.get('/search/stats', async (c: AppContext) => {
  try {
    const stats = enhancedSearchService.getSearchStats();
    return c.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching search stats:', error);
    return c.json({ success: false, error: 'Failed to fetch search stats' }, 500);
  }
});

// Analytics Dashboard Endpoints

// GET /api/company-brain/analytics/metrics - Get all analytics metrics
companyBrainRouter.get('/analytics/metrics', async (c: AppContext) => {
  try {
    const metrics = analyticsDashboardService.getMetrics();
    return c.json({ success: true, data: metrics });
  } catch (error) {
    console.error('Error fetching analytics metrics:', error);
    return c.json({ success: false, error: 'Failed to fetch analytics metrics' }, 500);
  }
});

// GET /api/company-brain/analytics/summary - Get dashboard summary
companyBrainRouter.get('/analytics/summary', async (c: AppContext) => {
  try {
    const summary = analyticsDashboardService.getDashboardSummary();
    return c.json({ success: true, data: summary });
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
    return c.json({ success: false, error: 'Failed to fetch dashboard summary' }, 500);
  }
});

// GET /api/company-brain/analytics/insights - Get insights
companyBrainRouter.get('/analytics/insights', async (c: AppContext) => {
  try {
    const type = c.req.query('type') as any;
    const severity = c.req.query('severity') as any;
    const actionable = c.req.query('actionable') === 'true';
    
    const insights = analyticsDashboardService.getInsights({
      type,
      severity,
      actionable,
    });
    
    return c.json({ success: true, data: insights });
  } catch (error) {
    console.error('Error fetching insights:', error);
    return c.json({ success: false, error: 'Failed to fetch insights' }, 500);
  }
});

// GET /api/company-brain/analytics/trends/:metric - Get trend data for metric
companyBrainRouter.get('/analytics/trends/:metric', async (c: AppContext) => {
  try {
    const metric = c.req.param('metric');
    const days = parseInt(c.req.query('days') || '30');
    
    const trendData = analyticsDashboardService.getTrendData(metric, days);
    return c.json({ success: true, data: trendData });
  } catch (error) {
    console.error('Error fetching trend data:', error);
    return c.json({ success: false, error: 'Failed to fetch trend data' }, 500);
  }
});

// PUT /api/company-brain/analytics/knowledge-health - Update knowledge health metrics
companyBrainRouter.put('/analytics/knowledge-health', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    analyticsDashboardService.updateKnowledgeHealth(body);
    
    return c.json({ success: true, message: 'Knowledge health metrics updated' });
  } catch (error) {
    console.error('Error updating knowledge health:', error);
    return c.json({ success: false, error: 'Failed to update knowledge health' }, 500);
  }
});

// PUT /api/company-brain/analytics/usage - Update usage metrics
companyBrainRouter.put('/analytics/usage', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    analyticsDashboardService.updateUsageMetrics(body);
    
    return c.json({ success: true, message: 'Usage metrics updated' });
  } catch (error) {
    console.error('Error updating usage metrics:', error);
    return c.json({ success: false, error: 'Failed to update usage metrics' }, 500);
  }
});

// PUT /api/company-brain/analytics/risk - Update risk assessment
companyBrainRouter.put('/analytics/risk', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    analyticsDashboardService.updateRiskAssessment(body);
    
    return c.json({ success: true, message: 'Risk assessment updated' });
  } catch (error) {
    console.error('Error updating risk assessment:', error);
    return c.json({ success: false, error: 'Failed to update risk assessment' }, 500);
  }
});

// GET /api/company-brain/analytics/report/:format - Export analytics report
companyBrainRouter.get('/analytics/report/:format', async (c: AppContext) => {
  try {
    const format = c.req.param('format') as 'json' | 'csv';
    const report = analyticsDashboardService.exportReport(format);
    
    return c.json({ success: true, data: report });
  } catch (error) {
    console.error('Error exporting report:', error);
    return c.json({ success: false, error: 'Failed to export report' }, 500);
  }
});

// Chat Endpoints

// POST /api/company-brain/chat/conversations - Create a new conversation
companyBrainRouter.post('/chat/conversations', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const { userId, title, context } = body;
    
    if (!userId) {
      return c.json({ success: false, error: 'userId is required' }, 400);
    }
    
    const conversation = companyBrainChatService.createConversation(userId, title, context);
    
    return c.json({ success: true, data: conversation }, 201);
  } catch (error) {
    console.error('Error creating conversation:', error);
    return c.json({ success: false, error: 'Failed to create conversation' }, 500);
  }
});

// GET /api/company-brain/chat/conversations - Get all conversations for a user
companyBrainRouter.get('/chat/conversations', async (c: AppContext) => {
  try {
    const userId = c.req.query('userId');
    
    if (!userId) {
      return c.json({ success: false, error: 'userId is required' }, 400);
    }
    
    const conversations = companyBrainChatService.getUserConversations(userId);
    
    return c.json({ success: true, data: conversations });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return c.json({ success: false, error: 'Failed to fetch conversations' }, 500);
  }
});

// GET /api/company-brain/chat/conversations/:id - Get a specific conversation
companyBrainRouter.get('/chat/conversations/:id', async (c: AppContext) => {
  try {
    const conversationId = c.req.param('id');
    const conversation = companyBrainChatService.getConversation(conversationId);
    
    if (!conversation) {
      return c.json({ success: false, error: 'Conversation not found' }, 404);
    }
    
    return c.json({ success: true, data: conversation });
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return c.json({ success: false, error: 'Failed to fetch conversation' }, 500);
  }
});

// PUT /api/company-brain/chat/conversations/:id/archive - Archive a conversation
companyBrainRouter.put('/chat/conversations/:id/archive', async (c: AppContext) => {
  try {
    const conversationId = c.req.param('id');
    companyBrainChatService.archiveConversation(conversationId);
    
    return c.json({ success: true, message: 'Conversation archived' });
  } catch (error) {
    console.error('Error archiving conversation:', error);
    return c.json({ success: false, error: 'Failed to archive conversation' }, 500);
  }
});

// DELETE /api/company-brain/chat/conversations/:id - Delete a conversation
companyBrainRouter.delete('/chat/conversations/:id', async (c: AppContext) => {
  try {
    const conversationId = c.req.param('id');
    companyBrainChatService.deleteConversation(conversationId);
    
    return c.json({ success: true, message: 'Conversation deleted' });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    return c.json({ success: false, error: 'Failed to delete conversation' }, 500);
  }
});

// PUT /api/company-brain/chat/conversations/:id/title - Update conversation title
companyBrainRouter.put('/chat/conversations/:id/title', async (c: AppContext) => {
  try {
    const conversationId = c.req.param('id');
    const body = await c.req.json();
    const { title } = body;
    
    if (!title) {
      return c.json({ success: false, error: 'title is required' }, 400);
    }
    
    companyBrainChatService.updateConversationTitle(conversationId, title);
    
    return c.json({ success: true, message: 'Conversation title updated' });
  } catch (error) {
    console.error('Error updating conversation title:', error);
    return c.json({ success: false, error: 'Failed to update conversation title' }, 500);
  }
});

// POST /api/company-brain/chat/conversations/:id/tags - Add tags to conversation
companyBrainRouter.post('/chat/conversations/:id/tags', async (c: AppContext) => {
  try {
    const conversationId = c.req.param('id');
    const body = await c.req.json();
    const { tags } = body;
    
    if (!tags || !Array.isArray(tags)) {
      return c.json({ success: false, error: 'tags array is required' }, 400);
    }
    
    companyBrainChatService.addConversationTags(conversationId, tags);
    
    return c.json({ success: true, message: 'Tags added to conversation' });
  } catch (error) {
    console.error('Error adding tags:', error);
    return c.json({ success: false, error: 'Failed to add tags' }, 500);
  }
});

// POST /api/company-brain/chat/messages - Send a message
companyBrainRouter.post('/chat/messages', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const { conversationId, userId, content, context } = body;
    
    if (!conversationId || !userId || !content) {
      return c.json({ success: false, error: 'conversationId, userId, and content are required' }, 400);
    }
    
    const response = await companyBrainChatService.sendMessage(conversationId, userId, content, context);
    
    return c.json({ success: true, data: response });
  } catch (error) {
    console.error('Error sending message:', error);
    return c.json({ success: false, error: 'Failed to send message' }, 500);
  }
});

// GET /api/company-brain/chat/conversations/:id/messages - Get messages for a conversation
companyBrainRouter.get('/chat/conversations/:id/messages', async (c: AppContext) => {
  try {
    const conversationId = c.req.param('id');
    const limit = parseInt(c.req.query('limit') || '50');
    
    const messages = companyBrainChatService.getMessages(conversationId, limit);
    
    return c.json({ success: true, data: messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return c.json({ success: false, error: 'Failed to fetch messages' }, 500);
  }
});

// GET /api/company-brain/chat/search - Search conversations
companyBrainRouter.get('/chat/search', async (c: AppContext) => {
  try {
    const userId = c.req.query('userId');
    const query = c.req.query('query');
    
    if (!userId || !query) {
      return c.json({ success: false, error: 'userId and query are required' }, 400);
    }
    
    const conversations = companyBrainChatService.searchConversations(userId, query);
    
    return c.json({ success: true, data: conversations });
  } catch (error) {
    console.error('Error searching conversations:', error);
    return c.json({ success: false, error: 'Failed to search conversations' }, 500);
  }
});

// GET /api/company-brain/chat/conversations/:id/export - Export conversation
companyBrainRouter.get('/chat/conversations/:id/export', async (c: AppContext) => {
  try {
    const conversationId = c.req.param('id');
    const exportData = companyBrainChatService.exportConversation(conversationId);
    
    return c.json({ success: true, data: exportData });
  } catch (error) {
    console.error('Error exporting conversation:', error);
    return c.json({ success: false, error: 'Failed to export conversation' }, 500);
  }
});

// GET /api/company-brain/chat/stats - Get chat statistics for a user
companyBrainRouter.get('/chat/stats', async (c: AppContext) => {
  try {
    const userId = c.req.query('userId');
    
    if (!userId) {
      return c.json({ success: false, error: 'userId is required' }, 400);
    }
    
    const stats = companyBrainChatService.getUserChatStats(userId);
    
    return c.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching chat stats:', error);
    return c.json({ success: false, error: 'Failed to fetch chat stats' }, 500);
  }
});

// ==================== Chat Archiving Endpoints ====================

// POST /api/company-brain/chat-archiving/configure - Configure chat archiving
companyBrainRouter.post('/chat-archiving/configure', async (c: AppContext) => {
  try {
    const config = await c.req.json();
    companyBrainChatArchivingService.configureArchiving(config);
    return c.json({ success: true, message: 'Chat archiving configured' });
  } catch (error) {
    console.error('Error configuring chat archiving:', error);
    return c.json({ success: false, error: 'Failed to configure chat archiving' }, 500);
  }
});

// POST /api/company-brain/chat-archiving/start - Start real-time archiving
companyBrainRouter.post('/chat-archiving/start', async (c: AppContext) => {
  try {
    const { organizationId } = await c.req.json();
    await companyBrainChatArchivingService.startRealtimeArchiving(organizationId);
    return c.json({ success: true, message: 'Real-time archiving started' });
  } catch (error) {
    console.error('Error starting archiving:', error);
    return c.json({ success: false, error: 'Failed to start archiving' }, 500);
  }
});

// POST /api/company-brain/chat-archiving/stop - Stop real-time archiving
companyBrainRouter.post('/chat-archiving/stop', async (c: AppContext) => {
  try {
    const { organizationId } = await c.req.json();
    companyBrainChatArchivingService.stopRealtimeArchiving(organizationId);
    return c.json({ success: true, message: 'Real-time archiving stopped' });
  } catch (error) {
    console.error('Error stopping archiving:', error);
    return c.json({ success: false, error: 'Failed to stop archiving' }, 500);
  }
});

// POST /api/company-brain/chat-archiving/process - Process a chat message
companyBrainRouter.post('/chat-archiving/process', async (c: AppContext) => {
  try {
    const { organizationId, platform, messageData } = await c.req.json();
    const log = await companyBrainChatArchivingService.processMessage(organizationId, platform, messageData);
    return c.json({ success: true, data: log });
  } catch (error) {
    console.error('Error processing message:', error);
    return c.json({ success: false, error: 'Failed to process message' }, 500);
  }
});

// GET /api/company-brain/chat-archiving/search - Search chat logs
companyBrainRouter.get('/chat-archiving/search', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const query = c.req.query('query');
    const filters = c.req.query('filters') ? JSON.parse(c.req.query('filters')) : undefined;
    
    if (!organizationId || !query) {
      return c.json({ success: false, error: 'organizationId and query are required' }, 400);
    }
    
    const results = await companyBrainChatArchivingService.searchChatLogs(organizationId, query, filters);
    return c.json({ success: true, data: results });
  } catch (error) {
    console.error('Error searching chat logs:', error);
    return c.json({ success: false, error: 'Failed to search chat logs' }, 500);
  }
});

// GET /api/company-brain/chat-archiving/stats - Get chat statistics
companyBrainRouter.get('/chat-archiving/stats', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    
    const stats = await companyBrainChatArchivingService.getChatStatistics(organizationId);
    return c.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching chat statistics:', error);
    return c.json({ success: false, error: 'Failed to fetch chat statistics' }, 500);
  }
});

// ==================== Meeting Transcription Endpoints ====================

// POST /api/company-brain/meeting-transcription/configure - Configure transcription
companyBrainRouter.post('/meeting-transcription/configure', async (c: AppContext) => {
  try {
    const config = await c.req.json();
    companyBrainMeetingTranscriptionService.configureTranscription(config);
    return c.json({ success: true, message: 'Meeting transcription configured' });
  } catch (error) {
    console.error('Error configuring transcription:', error);
    return c.json({ success: false, error: 'Failed to configure transcription' }, 500);
  }
});

// POST /api/company-brain/meeting-transcription/start - Start recording
companyBrainRouter.post('/meeting-transcription/start', async (c: AppContext) => {
  try {
    const { organizationId, platform, meetingId } = await c.req.json();
    const result = await companyBrainMeetingTranscriptionService.startRecording(organizationId, platform, meetingId);
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error('Error starting recording:', error);
    return c.json({ success: false, error: 'Failed to start recording' }, 500);
  }
});

// POST /api/company-brain/meeting-transcription/stop - Stop recording
companyBrainRouter.post('/meeting-transcription/stop', async (c: AppContext) => {
  try {
    const { organizationId, platform, recordingId } = await c.req.json();
    const result = await companyBrainMeetingTranscriptionService.stopRecording(organizationId, platform, recordingId);
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error('Error stopping recording:', error);
    return c.json({ success: false, error: 'Failed to stop recording' }, 500);
  }
});

// POST /api/company-brain/meeting-transcription/process - Process meeting
companyBrainRouter.post('/meeting-transcription/process', async (c: AppContext) => {
  try {
    const { organizationId, platform, meetingData } = await c.req.json();
    const transcription = await companyBrainMeetingTranscriptionService.processMeeting(organizationId, platform, meetingData);
    return c.json({ success: true, data: transcription });
  } catch (error) {
    console.error('Error processing meeting:', error);
    return c.json({ success: false, error: 'Failed to process meeting' }, 500);
  }
});

// GET /api/company-brain/meeting-transcription/:id - Get transcription
companyBrainRouter.get('/meeting-transcription/:id', async (c: AppContext) => {
  try {
    const transcriptionId = c.req.param('id');
    const transcription = await companyBrainMeetingTranscriptionService.getTranscription(transcriptionId);
    
    if (!transcription) {
      return c.json({ success: false, error: 'Transcription not found' }, 404);
    }
    
    return c.json({ success: true, data: transcription });
  } catch (error) {
    console.error('Error fetching transcription:', error);
    return c.json({ success: false, error: 'Failed to fetch transcription' }, 500);
  }
});

// GET /api/company-brain/meeting-transcription/search - Search transcriptions
companyBrainRouter.get('/meeting-transcription/search', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const query = c.req.query('query');
    const filters = c.req.query('filters') ? JSON.parse(c.req.query('filters')) : undefined;
    
    if (!organizationId || !query) {
      return c.json({ success: false, error: 'organizationId and query are required' }, 400);
    }
    
    const results = await companyBrainMeetingTranscriptionService.searchTranscriptions(organizationId, query, filters);
    return c.json({ success: true, data: results });
  } catch (error) {
    console.error('Error searching transcriptions:', error);
    return c.json({ success: false, error: 'Failed to search transcriptions' }, 500);
  }
});

// ==================== Email Mapping Endpoints ====================

// POST /api/company-brain/email-mapping/configure - Configure email mapping
companyBrainRouter.post('/email-mapping/configure', async (c: AppContext) => {
  try {
    const config = await c.req.json();
    companyBrainEmailMappingService.configureMapping(config);
    return c.json({ success: true, message: 'Email mapping configured' });
  } catch (error) {
    console.error('Error configuring email mapping:', error);
    return c.json({ success: false, error: 'Failed to configure email mapping' }, 500);
  }
});

// POST /api/company-brain/email-mapping/process - Process email
companyBrainRouter.post('/email-mapping/process', async (c: AppContext) => {
  try {
    const { organizationId, emailData } = await c.req.json();
    const result = await companyBrainEmailMappingService.processEmail(organizationId, emailData);
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error('Error processing email:', error);
    return c.json({ success: false, error: 'Failed to process email' }, 500);
  }
});

// GET /api/company-brain/email-mapping/thread/:id - Get email thread
companyBrainRouter.get('/email-mapping/thread/:id', async (c: AppContext) => {
  try {
    const threadId = c.req.param('id');
    const thread = await companyBrainEmailMappingService.getThread(threadId);
    
    if (!thread) {
      return c.json({ success: false, error: 'Thread not found' }, 404);
    }
    
    return c.json({ success: true, data: thread });
  } catch (error) {
    console.error('Error fetching thread:', error);
    return c.json({ success: false, error: 'Failed to fetch thread' }, 500);
  }
});

// GET /api/company-brain/email-mapping/search - Search email threads
companyBrainRouter.get('/email-mapping/search', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const query = c.req.query('query');
    const filters = c.req.query('filters') ? JSON.parse(c.req.query('filters')) : undefined;
    
    if (!organizationId || !query) {
      return c.json({ success: false, error: 'organizationId and query are required' }, 400);
    }
    
    const results = await companyBrainEmailMappingService.searchThreads(organizationId, query, filters);
    return c.json({ success: true, data: results });
  } catch (error) {
    console.error('Error searching email threads:', error);
    return c.json({ success: false, error: 'Failed to search email threads' }, 500);
  }
});

// ==================== SOP Extraction Endpoints ====================

// POST /api/company-brain/sop-extraction/configure - Configure SOP extraction
companyBrainRouter.post('/sop-extraction/configure', async (c: AppContext) => {
  try {
    const config = await c.req.json();
    companyBrainSOPExtractionService.configureExtraction(config);
    return c.json({ success: true, message: 'SOP extraction configured' });
  } catch (error) {
    console.error('Error configuring SOP extraction:', error);
    return c.json({ success: false, error: 'Failed to configure SOP extraction' }, 500);
  }
});

// POST /api/company-brain/sop-extraction/extract-from-chats - Extract SOPs from chat logs
companyBrainRouter.post('/sop-extraction/extract-from-chats', async (c: AppContext) => {
  try {
    const { organizationId, chatLogs } = await c.req.json();
    const sops = await companyBrainSOPExtractionService.extractFromChatLogs(organizationId, chatLogs);
    return c.json({ success: true, data: sops });
  } catch (error) {
    console.error('Error extracting SOPs from chats:', error);
    return c.json({ success: false, error: 'Failed to extract SOPs from chats' }, 500);
  }
});

// POST /api/company-brain/sop-extraction/extract-from-meeting - Extract SOP from meeting
companyBrainRouter.post('/sop-extraction/extract-from-meeting', async (c: AppContext) => {
  try {
    const { organizationId, meetingTranscription } = await c.req.json();
    const sop = await companyBrainSOPExtractionService.extractFromMeeting(organizationId, meetingTranscription);
    return c.json({ success: true, data: sop });
  } catch (error) {
    console.error('Error extracting SOP from meeting:', error);
    return c.json({ success: false, error: 'Failed to extract SOP from meeting' }, 500);
  }
});

// GET /api/company-brain/sop-extraction/search - Search SOPs
companyBrainRouter.get('/sop-extraction/search', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const query = c.req.query('query');
    const filters = c.req.query('filters') ? JSON.parse(c.req.query('filters')) : undefined;
    
    if (!organizationId || !query) {
      return c.json({ success: false, error: 'organizationId and query are required' }, 400);
    }
    
    const results = await companyBrainSOPExtractionService.searchSOPs(organizationId, query, filters);
    return c.json({ success: true, data: results });
  } catch (error) {
    console.error('Error searching SOPs:', error);
    return c.json({ success: false, error: 'Failed to search SOPs' }, 500);
  }
});

// POST /api/company-brain/sop-extraction/:id/approve - Approve SOP
companyBrainRouter.post('/sop-extraction/:id/approve', async (c: AppContext) => {
  try {
    const sopId = c.req.param('id');
    const { approvedBy } = await c.req.json();
    await companyBrainSOPExtractionService.approveSOP(sopId, approvedBy);
    return c.json({ success: true, message: 'SOP approved' });
  } catch (error) {
    console.error('Error approving SOP:', error);
    return c.json({ success: false, error: 'Failed to approve SOP' }, 500);
  }
});

// ==================== Expertise Profiling Endpoints ====================

// POST /api/company-brain/expertise/configure - Configure expertise profiling
companyBrainRouter.post('/expertise/configure', async (c: AppContext) => {
  try {
    const config = await c.req.json();
    companyBrainExpertiseProfilingService.configureProfiling(config);
    return c.json({ success: true, message: 'Expertise profiling configured' });
  } catch (error) {
    console.error('Error configuring expertise profiling:', error);
    return c.json({ success: false, error: 'Failed to configure expertise profiling' }, 500);
  }
});

// POST /api/company-brain/expertise/update - Update user profile
companyBrainRouter.post('/expertise/update', async (c: AppContext) => {
  try {
    const { organizationId, userId, userName, activityData } = await c.req.json();
    const profile = await companyBrainExpertiseProfilingService.updateProfile(organizationId, userId, userName, activityData);
    return c.json({ success: true, data: profile });
  } catch (error) {
    console.error('Error updating profile:', error);
    return c.json({ success: false, error: 'Failed to update profile' }, 500);
  }
});

// GET /api/company-brain/expertise/profile - Get user profile
companyBrainRouter.get('/expertise/profile', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const userId = c.req.query('userId');
    
    if (!organizationId || !userId) {
      return c.json({ success: false, error: 'organizationId and userId are required' }, 400);
    }
    
    const profile = await companyBrainExpertiseProfilingService.getProfile(organizationId, userId);
    return c.json({ success: true, data: profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return c.json({ success: false, error: 'Failed to fetch profile' }, 500);
  }
});

// GET /api/company-brain/expertise/search - Search experts
companyBrainRouter.get('/expertise/search', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const query = c.req.query('query');
    const filters = c.req.query('filters') ? JSON.parse(c.req.query('filters')) : undefined;
    
    if (!organizationId || !query) {
      return c.json({ success: false, error: 'organizationId and query are required' }, 400);
    }
    
    const results = await companyBrainExpertiseProfilingService.searchExperts(organizationId, query, filters);
    return c.json({ success: true, data: results });
  } catch (error) {
    console.error('Error searching experts:', error);
    return c.json({ success: false, error: 'Failed to search experts' }, 500);
  }
});

// GET /api/company-brain/expertise/mentorship - Get mentorship recommendations
companyBrainRouter.get('/expertise/mentorship', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const topic = c.req.query('topic');
    
    if (!organizationId || !topic) {
      return c.json({ success: false, error: 'organizationId and topic are required' }, 400);
    }
    
    const recommendations = await companyBrainExpertiseProfilingService.getMentorshipRecommendations(organizationId, topic);
    return c.json({ success: true, data: recommendations });
  } catch (error) {
    console.error('Error getting mentorship recommendations:', error);
    return c.json({ success: false, error: 'Failed to get mentorship recommendations' }, 500);
  }
});

// ==================== Project Linking Endpoints ====================

// POST /api/company-brain/project-linking/configure - Configure project linking
companyBrainRouter.post('/project-linking/configure', async (c: AppContext) => {
  try {
    const config = await c.req.json();
    companyBrainProjectLinkingService.configureLinking(config);
    return c.json({ success: true, message: 'Project linking configured' });
  } catch (error) {
    console.error('Error configuring project linking:', error);
    return c.json({ success: false, error: 'Failed to configure project linking' }, 500);
  }
});

// POST /api/company-brain/project-linking/update - Update project timeline
companyBrainRouter.post('/project-linking/update', async (c: AppContext) => {
  try {
    const { organizationId, projectId, projectName, projectData } = await c.req.json();
    const timeline = await companyBrainProjectLinkingService.updateProjectTimeline(organizationId, projectId, projectName, projectData);
    return c.json({ success: true, data: timeline });
  } catch (error) {
    console.error('Error updating project timeline:', error);
    return c.json({ success: false, error: 'Failed to update project timeline' }, 500);
  }
});

// GET /api/company-brain/project-linking/:projectId - Get project timeline
companyBrainRouter.get('/project-linking/:projectId', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const projectId = c.req.param('projectId');
    
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    
    const timeline = await companyBrainProjectLinkingService.getProjectTimeline(organizationId, projectId);
    return c.json({ success: true, data: timeline });
  } catch (error) {
    console.error('Error fetching project timeline:', error);
    return c.json({ success: false, error: 'Failed to fetch project timeline' }, 500);
  }
});

// GET /api/company-brain/project-linking/search - Search project timelines
companyBrainRouter.get('/project-linking/search', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const query = c.req.query('query');
    const filters = c.req.query('filters') ? JSON.parse(c.req.query('filters')) : undefined;
    
    if (!organizationId || !query) {
      return c.json({ success: false, error: 'organizationId and query are required' }, 400);
    }
    
    const results = await companyBrainProjectLinkingService.searchProjectTimelines(organizationId, query, filters);
    return c.json({ success: true, data: results });
  } catch (error) {
    console.error('Error searching project timelines:', error);
    return c.json({ success: false, error: 'Failed to search project timelines' }, 500);
  }
});

// POST /api/company-brain/project-linking/:projectId/decision - Add decision
companyBrainRouter.post('/project-linking/:projectId/decision', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const projectId = c.req.param('projectId');
    const decision = await c.req.json();
    
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    
    await companyBrainProjectLinkingService.addDecision(organizationId, projectId, decision);
    return c.json({ success: true, message: 'Decision added' });
  } catch (error) {
    console.error('Error adding decision:', error);
    return c.json({ success: false, error: 'Failed to add decision' }, 500);
  }
});

// ==================== Access Revocation Endpoints ====================

// POST /api/company-brain/access-revocation/configure - Configure access revocation
companyBrainRouter.post('/access-revocation/configure', async (c: AppContext) => {
  try {
    const config = await c.req.json();
    companyBrainAccessRevocationService.configureRevocation(config);
    return c.json({ success: true, message: 'Access revocation configured' });
  } catch (error) {
    console.error('Error configuring access revocation:', error);
    return c.json({ success: false, error: 'Failed to configure access revocation' }, 500);
  }
});

// POST /api/company-brain/access-revocation/initiate - Initiate revocation
companyBrainRouter.post('/access-revocation/initiate', async (c: AppContext) => {
  try {
    const { organizationId, userId, userName, userEmail, revokedBy, reason } = await c.req.json();
    const revocation = await companyBrainAccessRevocationService.initiateRevocation(organizationId, userId, userName, userEmail, revokedBy, reason);
    return c.json({ success: true, data: revocation });
  } catch (error) {
    console.error('Error initiating revocation:', error);
    return c.json({ success: false, error: 'Failed to initiate revocation' }, 500);
  }
});

// GET /api/company-brain/access-revocation/:id - Get revocation
companyBrainRouter.get('/access-revocation/:id', async (c: AppContext) => {
  try {
    const revocationId = c.req.param('id');
    const revocation = await companyBrainAccessRevocationService.getRevocation(revocationId);
    
    if (!revocation) {
      return c.json({ success: false, error: 'Revocation not found' }, 404);
    }
    
    return c.json({ success: true, data: revocation });
  } catch (error) {
    console.error('Error fetching revocation:', error);
    return c.json({ success: false, error: 'Failed to fetch revocation' }, 500);
  }
});

// GET /api/company-brain/access-revocation/search - Search preserved data
companyBrainRouter.get('/access-revocation/search', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const userId = c.req.query('userId');
    const query = c.req.query('query');
    
    if (!organizationId || !userId || !query) {
      return c.json({ success: false, error: 'organizationId, userId, and query are required' }, 400);
    }
    
    const results = await companyBrainAccessRevocationService.searchPreservedData(organizationId, userId, query);
    return c.json({ success: true, data: results });
  } catch (error) {
    console.error('Error searching preserved data:', error);
    return c.json({ success: false, error: 'Failed to search preserved data' }, 500);
  }
});

// POST /api/company-brain/access-revocation/:id/restore - Restore access
companyBrainRouter.post('/access-revocation/:id/restore', async (c: AppContext) => {
  try {
    const revocationId = c.req.param('id');
    const { restoredBy, reason } = await c.req.json();
    await companyBrainAccessRevocationService.restoreAccess(revocationId, restoredBy, reason);
    return c.json({ success: true, message: 'Access restored' });
  } catch (error) {
    console.error('Error restoring access:', error);
    return c.json({ success: false, error: 'Failed to restore access' }, 500);
  }
});

// ==================== Ownership Transfer Endpoints ====================

// POST /api/company-brain/ownership-transfer/configure - Configure ownership transfer
companyBrainRouter.post('/ownership-transfer/configure', async (c: AppContext) => {
  try {
    const config = await c.req.json();
    companyBrainOwnershipTransferService.configureTransfer(config);
    return c.json({ success: true, message: 'Ownership transfer configured' });
  } catch (error) {
    console.error('Error configuring ownership transfer:', error);
    return c.json({ success: false, error: 'Failed to configure ownership transfer' }, 500);
  }
});

// POST /api/company-brain/ownership-transfer/initiate - Initiate transfer
companyBrainRouter.post('/ownership-transfer/initiate', async (c: AppContext) => {
  try {
    const { organizationId, fromUserId, toUserId, fromUserName, toUserName, initiatedBy } = await c.req.json();
    const transfer = await companyBrainOwnershipTransferService.initiateTransfer(organizationId, fromUserId, toUserId, fromUserName, toUserName, initiatedBy);
    return c.json({ success: true, data: transfer });
  } catch (error) {
    console.error('Error initiating transfer:', error);
    return c.json({ success: false, error: 'Failed to initiate transfer' }, 500);
  }
});

// GET /api/company-brain/ownership-transfer/:id - Get transfer
companyBrainRouter.get('/ownership-transfer/:id', async (c: AppContext) => {
  try {
    const transferId = c.req.param('id');
    const transfer = await companyBrainOwnershipTransferService.getTransfer(transferId);
    
    if (!transfer) {
      return c.json({ success: false, error: 'Transfer not found' }, 404);
    }
    
    return c.json({ success: true, data: transfer });
  } catch (error) {
    console.error('Error fetching transfer:', error);
    return c.json({ success: false, error: 'Failed to fetch transfer' }, 500);
  }
});

// POST /api/company-brain/ownership-transfer/:id/retry - Retry failed transfer
companyBrainRouter.post('/ownership-transfer/:id/retry', async (c: AppContext) => {
  try {
    const transferId = c.req.param('id');
    await companyBrainOwnershipTransferService.retryFailedTransfer(transferId);
    return c.json({ success: true, message: 'Transfer retry initiated' });
  } catch (error) {
    console.error('Error retrying transfer:', error);
    return c.json({ success: false, error: 'Failed to retry transfer' }, 500);
  }
});

// POST /api/company-brain/ownership-transfer/:id/cancel - Cancel transfer
companyBrainRouter.post('/ownership-transfer/:id/cancel', async (c: AppContext) => {
  try {
    const transferId = c.req.param('id');
    const { cancelledBy, reason } = await c.req.json();
    await companyBrainOwnershipTransferService.cancelTransfer(transferId, cancelledBy, reason);
    return c.json({ success: true, message: 'Transfer cancelled' });
  } catch (error) {
    console.error('Error cancelling transfer:', error);
    return c.json({ success: false, error: 'Failed to cancel transfer' }, 500);
  }
});

// ==================== Onboarding Search Endpoints ====================

// POST /api/company-brain/onboarding/search - Conversational search
companyBrainRouter.post('/onboarding/search', async (c: AppContext) => {
  try {
    const query = await c.req.json();
    const response = await companyBrainOnboardingSearchService.search(query);
    return c.json({ success: true, data: response });
  } catch (error) {
    console.error('Error performing onboarding search:', error);
    return c.json({ success: false, error: 'Failed to perform onboarding search' }, 500);
  }
});

// DELETE /api/company-brain/onboarding/history/:userId - Clear conversation history
companyBrainRouter.delete('/onboarding/history/:userId', async (c: AppContext) => {
  try {
    const userId = c.req.param('userId');
    companyBrainOnboardingSearchService.clearConversationHistory(userId);
    return c.json({ success: true, message: 'Conversation history cleared' });
  } catch (error) {
    console.error('Error clearing conversation history:', error);
    return c.json({ success: false, error: 'Failed to clear conversation history' }, 500);
  }
});

// GET /api/company-brain/onboarding/learning-path - Get learning path
companyBrainRouter.get('/onboarding/learning-path', async (c: AppContext) => {
  try {
    const role = c.req.query('role');
    const department = c.req.query('department');
    
    if (!role || !department) {
      return c.json({ success: false, error: 'role and department are required' }, 400);
    }
    
    const learningPath = await companyBrainOnboardingSearchService.getLearningPath(role, department);
    return c.json({ success: true, data: learningPath });
  } catch (error) {
    console.error('Error getting learning path:', error);
    return c.json({ success: false, error: 'Failed to get learning path' }, 500);
  }
});

// ==================== Internal Chat System Endpoints ====================

// POST /api/company-brain/chat/channels - Create channel
companyBrainRouter.post('/chat/channels', async (c: AppContext) => {
  try {
    const channel = await c.req.json();
    const result = await companyBrainInternalChatService.createChannel(channel);
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error('Error creating channel:', error);
    return c.json({ success: false, error: 'Failed to create channel' }, 500);
  }
});

// GET /api/company-brain/chat/channels - List channels
companyBrainRouter.get('/chat/channels', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const type = c.req.query('type');
    const isArchived = c.req.query('isArchived');
    
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    
    const filters: any = {};
    if (type) filters.type = type;
    if (isArchived !== undefined) filters.isArchived = isArchived === 'true';
    
    const channels = await companyBrainInternalChatService.listChannels(organizationId, filters);
    return c.json({ success: true, data: channels });
  } catch (error) {
    console.error('Error listing channels:', error);
    return c.json({ success: false, error: 'Failed to list channels' }, 500);
  }
});

// GET /api/company-brain/chat/channels/:id - Get channel
companyBrainRouter.get('/chat/channels/:id', async (c: AppContext) => {
  try {
    const channelId = c.req.param('id');
    const channel = await companyBrainInternalChatService.getChannel(channelId);
    
    if (!channel) {
      return c.json({ success: false, error: 'Channel not found' }, 404);
    }
    
    return c.json({ success: true, data: channel });
  } catch (error) {
    console.error('Error getting channel:', error);
    return c.json({ success: false, error: 'Failed to get channel' }, 500);
  }
});

// PUT /api/company-brain/chat/channels/:id - Update channel
companyBrainRouter.put('/chat/channels/:id', async (c: AppContext) => {
  try {
    const channelId = c.req.param('id');
    const updates = await c.req.json();
    const channel = await companyBrainInternalChatService.updateChannel(channelId, updates);
    return c.json({ success: true, data: channel });
  } catch (error) {
    console.error('Error updating channel:', error);
    return c.json({ success: false, error: 'Failed to update channel' }, 500);
  }
});

// POST /api/company-brain/chat/channels/:id/members - Add member to channel
companyBrainRouter.post('/chat/channels/:id/members', async (c: AppContext) => {
  try {
    const channelId = c.req.param('id');
    const { userId } = await c.req.json();
    await companyBrainInternalChatService.addChannelMember(channelId, userId);
    return c.json({ success: true, message: 'Member added' });
  } catch (error) {
    console.error('Error adding member:', error);
    return c.json({ success: false, error: 'Failed to add member' }, 500);
  }
});

// DELETE /api/company-brain/chat/channels/:id/members/:userId - Remove member from channel
companyBrainRouter.delete('/chat/channels/:id/members/:userId', async (c: AppContext) => {
  try {
    const channelId = c.req.param('id');
    const userId = c.req.param('userId');
    await companyBrainInternalChatService.removeChannelMember(channelId, userId);
    return c.json({ success: true, message: 'Member removed' });
  } catch (error) {
    console.error('Error removing member:', error);
    return c.json({ success: false, error: 'Failed to remove member' }, 500);
  }
});

// POST /api/company-brain/chat/conversations - Create conversation
companyBrainRouter.post('/chat/conversations', async (c: AppContext) => {
  try {
    const conversation = await c.req.json();
    const result = await companyBrainInternalChatService.createConversation(conversation);
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error('Error creating conversation:', error);
    return c.json({ success: false, error: 'Failed to create conversation' }, 500);
  }
});

// GET /api/company-brain/chat/conversations - List user conversations
companyBrainRouter.get('/chat/conversations', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const userId = c.req.query('userId');
    
    if (!organizationId || !userId) {
      return c.json({ success: false, error: 'organizationId and userId are required' }, 400);
    }
    
    const conversations = await companyBrainInternalChatService.listUserConversations(organizationId, userId);
    return c.json({ success: true, data: conversations });
  } catch (error) {
    console.error('Error listing conversations:', error);
    return c.json({ success: false, error: 'Failed to list conversations' }, 500);
  }
});

// GET /api/company-brain/chat/conversations/:id - Get conversation
companyBrainRouter.get('/chat/conversations/:id', async (c: AppContext) => {
  try {
    const conversationId = c.req.param('id');
    const conversation = await companyBrainInternalChatService.getConversation(conversationId);
    
    if (!conversation) {
      return c.json({ success: false, error: 'Conversation not found' }, 404);
    }
    
    return c.json({ success: true, data: conversation });
  } catch (error) {
    console.error('Error getting conversation:', error);
    return c.json({ success: false, error: 'Failed to get conversation' }, 500);
  }
});

// POST /api/company-brain/chat/messages - Send message
companyBrainRouter.post('/chat/messages', async (c: AppContext) => {
  try {
    const message = await c.req.json();
    const result = await companyBrainInternalChatService.sendMessage(message);
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error('Error sending message:', error);
    return c.json({ success: false, error: 'Failed to send message' }, 500);
  }
});

// GET /api/company-brain/chat/conversations/:id/messages - Get conversation messages
companyBrainRouter.get('/chat/conversations/:id/messages', async (c: AppContext) => {
  try {
    const conversationId = c.req.param('id');
    const limit = c.req.query('limit') ? parseInt(c.req.query('limit') as string) : undefined;
    const offset = c.req.query('offset') ? parseInt(c.req.query('offset') as string) : undefined;
    
    const messages = await companyBrainInternalChatService.getConversationMessages(conversationId, limit, offset);
    return c.json({ success: true, data: messages });
  } catch (error) {
    console.error('Error getting messages:', error);
    return c.json({ success: false, error: 'Failed to get messages' }, 500);
  }
});

// PUT /api/company-brain/chat/messages/:id - Edit message
companyBrainRouter.put('/chat/messages/:id', async (c: AppContext) => {
  try {
    const messageId = c.req.param('id');
    const { content } = await c.req.json();
    const message = await companyBrainInternalChatService.editMessage(messageId, content);
    return c.json({ success: true, data: message });
  } catch (error) {
    console.error('Error editing message:', error);
    return c.json({ success: false, error: 'Failed to edit message' }, 500);
  }
});

// DELETE /api/company-brain/chat/messages/:id - Delete message
companyBrainRouter.delete('/chat/messages/:id', async (c: AppContext) => {
  try {
    const messageId = c.req.param('id');
    await companyBrainInternalChatService.deleteMessage(messageId);
    return c.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    console.error('Error deleting message:', error);
    return c.json({ success: false, error: 'Failed to delete message' }, 500);
  }
});

// POST /api/company-brain/chat/messages/:id/reactions - Add reaction
companyBrainRouter.post('/chat/messages/:id/reactions', async (c: AppContext) => {
  try {
    const messageId = c.req.param('id');
    const { emoji, userId } = await c.req.json();
    await companyBrainInternalChatService.addReaction(messageId, emoji, userId);
    return c.json({ success: true, message: 'Reaction added' });
  } catch (error) {
    console.error('Error adding reaction:', error);
    return c.json({ success: false, error: 'Failed to add reaction' }, 500);
  }
});

// DELETE /api/company-brain/chat/messages/:id/reactions - Remove reaction
companyBrainRouter.delete('/chat/messages/:id/reactions', async (c: AppContext) => {
  try {
    const messageId = c.req.param('id');
    const { emoji, userId } = await c.req.json();
    await companyBrainInternalChatService.removeReaction(messageId, emoji, userId);
    return c.json({ success: true, message: 'Reaction removed' });
  } catch (error) {
    console.error('Error removing reaction:', error);
    return c.json({ success: false, error: 'Failed to remove reaction' }, 500);
  }
});

// POST /api/company-brain/chat/messages/:id/pin - Pin message
companyBrainRouter.post('/chat/messages/:id/pin', async (c: AppContext) => {
  try {
    const messageId = c.req.param('id');
    await companyBrainInternalChatService.pinMessage(messageId);
    return c.json({ success: true, message: 'Message pinned' });
  } catch (error) {
    console.error('Error pinning message:', error);
    return c.json({ success: false, error: 'Failed to pin message' }, 500);
  }
});

// POST /api/company-brain/chat/threads - Create thread
companyBrainRouter.post('/chat/threads', async (c: AppContext) => {
  try {
    const thread = await c.req.json();
    const result = await companyBrainInternalChatService.createThread(thread);
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error('Error creating thread:', error);
    return c.json({ success: false, error: 'Failed to create thread' }, 500);
  }
});

// GET /api/company-brain/chat/threads/:id - Get thread
companyBrainRouter.get('/chat/threads/:id', async (c: AppContext) => {
  try {
    const threadId = c.req.param('id');
    const thread = await companyBrainInternalChatService.getThread(threadId);
    
    if (!thread) {
      return c.json({ success: false, error: 'Thread not found' }, 404);
    }
    
    return c.json({ success: true, data: thread });
  } catch (error) {
    console.error('Error getting thread:', error);
    return c.json({ success: false, error: 'Failed to get thread' }, 500);
  }
});

// GET /api/company-brain/chat/threads/:id/messages - Get thread messages
companyBrainRouter.get('/chat/threads/:id/messages', async (c: AppContext) => {
  try {
    const threadId = c.req.param('id');
    const messages = await companyBrainInternalChatService.getThreadMessages(threadId);
    return c.json({ success: true, data: messages });
  } catch (error) {
    console.error('Error getting thread messages:', error);
    return c.json({ success: false, error: 'Failed to get thread messages' }, 500);
  }
});

// POST /api/company-brain/chat/threads/:id/resolve - Resolve thread
companyBrainRouter.post('/chat/threads/:id/resolve', async (c: AppContext) => {
  try {
    const threadId = c.req.param('id');
    const { resolvedBy } = await c.req.json();
    await companyBrainInternalChatService.resolveThread(threadId, resolvedBy);
    return c.json({ success: true, message: 'Thread resolved' });
  } catch (error) {
    console.error('Error resolving thread:', error);
    return c.json({ success: false, error: 'Failed to resolve thread' }, 500);
  }
});

// GET /api/company-brain/chat/messages/search - Search messages
companyBrainRouter.get('/chat/messages/search', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const query = c.req.query('query');
    const conversationId = c.req.query('conversationId');
    const senderId = c.req.query('senderId');
    
    if (!organizationId || !query) {
      return c.json({ success: false, error: 'organizationId and query are required' }, 400);
    }
    
    const filters: any = {};
    if (conversationId) filters.conversationId = conversationId;
    if (senderId) filters.senderId = senderId;
    
    const messages = await companyBrainInternalChatService.searchMessages(organizationId, query, filters);
    return c.json({ success: true, data: messages });
  } catch (error) {
    console.error('Error searching messages:', error);
    return c.json({ success: false, error: 'Failed to search messages' }, 500);
  }
});

// ==================== AI Assistant Chat Endpoints ====================

// POST /api/company-brain/chat/ai/conversations - Create AI conversation
companyBrainRouter.post('/chat/ai/conversations', async (c: AppContext) => {
  try {
    const conversation = await c.req.json();
    const result = await companyBrainAIAssistantChatService.createConversation(conversation);
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error('Error creating AI conversation:', error);
    return c.json({ success: false, error: 'Failed to create AI conversation' }, 500);
  }
});

// GET /api/company-brain/chat/ai/conversations - List user AI conversations
companyBrainRouter.get('/chat/ai/conversations', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const userId = c.req.query('userId');
    const assistantType = c.req.query('assistantType');
    
    if (!organizationId || !userId) {
      return c.json({ success: false, error: 'organizationId and userId are required' }, 400);
    }
    
    const conversations = await companyBrainAIAssistantChatService.listUserConversations(organizationId, userId, assistantType);
    return c.json({ success: true, data: conversations });
  } catch (error) {
    console.error('Error listing AI conversations:', error);
    return c.json({ success: false, error: 'Failed to list AI conversations' }, 500);
  }
});

// POST /api/company-brain/chat/ai/conversations/:id/messages - Send message to AI
companyBrainRouter.post('/chat/ai/conversations/:id/messages', async (c: AppContext) => {
  try {
    const conversationId = c.req.param('id');
    const { message } = await c.req.json();
    const response = await companyBrainAIAssistantChatService.sendMessage(conversationId, message);
    return c.json({ success: true, data: response });
  } catch (error) {
    console.error('Error sending AI message:', error);
    return c.json({ success: false, error: 'Failed to send AI message' }, 500);
  }
});

// GET /api/company-brain/chat/ai/conversations/:id/messages - Get AI conversation messages
companyBrainRouter.get('/chat/ai/conversations/:id/messages', async (c: AppContext) => {
  try {
    const conversationId = c.req.param('id');
    const limit = c.req.query('limit') ? parseInt(c.req.query('limit') as string) : undefined;
    const messages = await companyBrainAIAssistantChatService.getConversationMessages(conversationId, limit);
    return c.json({ success: true, data: messages });
  } catch (error) {
    console.error('Error getting AI messages:', error);
    return c.json({ success: false, error: 'Failed to get AI messages' }, 500);
  }
});

// DELETE /api/company-brain/chat/ai/conversations/:id - Delete AI conversation
companyBrainRouter.delete('/chat/ai/conversations/:id', async (c: AppContext) => {
  try {
    const conversationId = c.req.param('id');
    await companyBrainAIAssistantChatService.deleteConversation(conversationId);
    return c.json({ success: true, message: 'AI conversation deleted' });
  } catch (error) {
    console.error('Error deleting AI conversation:', error);
    return c.json({ success: false, error: 'Failed to delete AI conversation' }, 500);
  }
});

// POST /api/company-brain/chat/ai/conversations/:id/archive - Archive AI conversation
companyBrainRouter.post('/chat/ai/conversations/:id/archive', async (c: AppContext) => {
  try {
    const conversationId = c.req.param('id');
    await companyBrainAIAssistantChatService.archiveConversation(conversationId);
    return c.json({ success: true, message: 'AI conversation archived' });
  } catch (error) {
    console.error('Error archiving AI conversation:', error);
    return c.json({ success: false, error: 'Failed to archive AI conversation' }, 500);
  }
});

// ==================== Chat Collaboration Endpoints ====================

// POST /api/company-brain/chat/collaboration/typing - Set typing indicator
companyBrainRouter.post('/chat/collaboration/typing', async (c: AppContext) => {
  try {
    const { organizationId, conversationId, userId, isTyping } = await c.req.json();
    await companyBrainChatCollaborationService.setTypingIndicator(organizationId, conversationId, userId, isTyping);
    return c.json({ success: true, message: 'Typing indicator set' });
  } catch (error) {
    console.error('Error setting typing indicator:', error);
    return c.json({ success: false, error: 'Failed to set typing indicator' }, 500);
  }
});

// GET /api/company-brain/chat/collaboration/typing/:conversationId - Get typing indicators
companyBrainRouter.get('/chat/collaboration/typing/:conversationId', async (c: AppContext) => {
  try {
    const conversationId = c.req.param('conversationId');
    const indicators = await companyBrainChatCollaborationService.getTypingIndicators(conversationId);
    return c.json({ success: true, data: indicators });
  } catch (error) {
    console.error('Error getting typing indicators:', error);
    return c.json({ success: false, error: 'Failed to get typing indicators' }, 500);
  }
});

// POST /api/company-brain/chat/collaboration/read - Mark message as read
companyBrainRouter.post('/chat/collaboration/read', async (c: AppContext) => {
  try {
    const { organizationId, messageId, userId } = await c.req.json();
    await companyBrainChatCollaborationService.markMessageAsRead(organizationId, messageId, userId);
    return c.json({ success: true, message: 'Message marked as read' });
  } catch (error) {
    console.error('Error marking message as read:', error);
    return c.json({ success: false, error: 'Failed to mark message as read' }, 500);
  }
});

// GET /api/company-brain/chat/collaboration/read/:messageId - Get read receipts
companyBrainRouter.get('/chat/collaboration/read/:messageId', async (c: AppContext) => {
  try {
    const messageId = c.req.param('messageId');
    const receipts = await companyBrainChatCollaborationService.getReadReceipts(messageId);
    return c.json({ success: true, data: receipts });
  } catch (error) {
    console.error('Error getting read receipts:', error);
    return c.json({ success: false, error: 'Failed to get read receipts' }, 500);
  }
});

// POST /api/company-brain/chat/collaboration/presence - Set user presence
companyBrainRouter.post('/chat/collaboration/presence', async (c: AppContext) => {
  try {
    const presence = await c.req.json();
    const result = await companyBrainChatCollaborationService.setUserPresence(presence);
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error('Error setting user presence:', error);
    return c.json({ success: false, error: 'Failed to set user presence' }, 500);
  }
});

// GET /api/company-brain/chat/collaboration/presence/:userId - Get user presence
companyBrainRouter.get('/chat/collaboration/presence/:userId', async (c: AppContext) => {
  try {
    const userId = c.req.param('userId');
    const presence = await companyBrainChatCollaborationService.getUserPresence(userId);
    return c.json({ success: true, data: presence });
  } catch (error) {
    console.error('Error getting user presence:', error);
    return c.json({ success: false, error: 'Failed to get user presence' }, 500);
  }
});

// GET /api/company-brain/chat/collaboration/presence/online/:organizationId - Get online users
companyBrainRouter.get('/chat/collaboration/presence/online/:organizationId', async (c: AppContext) => {
  try {
    const organizationId = c.req.param('organizationId');
    const users = await companyBrainChatCollaborationService.getOnlineUsers(organizationId);
    return c.json({ success: true, data: users });
  } catch (error) {
    console.error('Error getting online users:', error);
    return c.json({ success: false, error: 'Failed to get online users' }, 500);
  }
});

// POST /api/company-brain/chat/collaboration/notifications - Create notification
companyBrainRouter.post('/chat/collaboration/notifications', async (c: AppContext) => {
  try {
    const notification = await c.req.json();
    const result = await companyBrainChatCollaborationService.createNotification(notification);
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error('Error creating notification:', error);
    return c.json({ success: false, error: 'Failed to create notification' }, 500);
  }
});

// GET /api/company-brain/chat/collaboration/notifications - Get user notifications
companyBrainRouter.get('/chat/collaboration/notifications', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const userId = c.req.query('userId');
    const unreadOnly = c.req.query('unreadOnly') === 'true';
    
    if (!organizationId || !userId) {
      return c.json({ success: false, error: 'organizationId and userId are required' }, 400);
    }
    
    const notifications = await companyBrainChatCollaborationService.getUserNotifications(organizationId, userId, unreadOnly);
    return c.json({ success: true, data: notifications });
  } catch (error) {
    console.error('Error getting notifications:', error);
    return c.json({ success: false, error: 'Failed to get notifications' }, 500);
  }
});

// PUT /api/company-brain/chat/collaboration/notifications/:id/read - Mark notification as read
companyBrainRouter.put('/chat/collaboration/notifications/:id/read', async (c: AppContext) => {
  try {
    const notificationId = c.req.param('id');
    await companyBrainChatCollaborationService.markNotificationAsRead(notificationId);
    return c.json({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return c.json({ success: false, error: 'Failed to mark notification as read' }, 500);
  }
});

// PUT /api/company-brain/chat/collaboration/notifications/read-all - Mark all notifications as read
companyBrainRouter.put('/chat/collaboration/notifications/read-all', async (c: AppContext) => {
  try {
    const { organizationId, userId } = await c.req.json();
    await companyBrainChatCollaborationService.markAllNotificationsAsRead(organizationId, userId);
    return c.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return c.json({ success: false, error: 'Failed to mark all notifications as read' }, 500);
  }
});

// ==================== Channel & Thread Management Endpoints ====================

// POST /api/company-brain/chat/channels/:id/settings - Update channel settings
companyBrainRouter.post('/chat/channels/:id/settings', async (c: AppContext) => {
  try {
    const channelId = c.req.param('id');
    const settings = await c.req.json();
    await companyBrainChannelThreadManagementService.updateChannelSettings(channelId, settings);
    return c.json({ success: true, message: 'Channel settings updated' });
  } catch (error) {
    console.error('Error updating channel settings:', error);
    return c.json({ success: false, error: 'Failed to update channel settings' }, 500);
  }
});

// GET /api/company-brain/chat/channels/:id/settings - Get channel settings
companyBrainRouter.get('/chat/channels/:id/settings', async (c: AppContext) => {
  try {
    const channelId = c.req.param('id');
    const settings = await companyBrainChannelThreadManagementService.getChannelSettings(channelId);
    return c.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error getting channel settings:', error);
    return c.json({ success: false, error: 'Failed to get channel settings' }, 500);
  }
});

// POST /api/company-brain/chat/channels/:id/permissions - Set channel permission
companyBrainRouter.post('/chat/channels/:id/permissions', async (c: AppContext) => {
  try {
    const channelId = c.req.param('id');
    const { userId, role, permissions } = await c.req.json();
    await companyBrainChannelThreadManagementService.setChannelPermission(channelId, userId, role, permissions);
    return c.json({ success: true, message: 'Channel permission set' });
  } catch (error) {
    console.error('Error setting channel permission:', error);
    return c.json({ success: false, error: 'Failed to set channel permission' }, 500);
  }
});

// GET /api/company-brain/chat/channels/:id/permissions/:userId - Get channel permission
companyBrainRouter.get('/chat/channels/:id/permissions/:userId', async (c: AppContext) => {
  try {
    const channelId = c.req.param('id');
    const userId = c.req.param('userId');
    const permission = await companyBrainChannelThreadManagementService.getChannelPermission(channelId, userId);
    return c.json({ success: true, data: permission });
  } catch (error) {
    console.error('Error getting channel permission:', error);
    return c.json({ success: false, error: 'Failed to get channel permission' }, 500);
  }
});

// POST /api/company-brain/chat/channels/:id/members/bulk - Bulk add members
companyBrainRouter.post('/chat/channels/:id/members/bulk', async (c: AppContext) => {
  try {
    const channelId = c.req.param('id');
    const { userIds, role } = await c.req.json();
    await companyBrainChannelThreadManagementService.bulkAddMembers(channelId, userIds, role);
    return c.json({ success: true, message: 'Members added' });
  } catch (error) {
    console.error('Error bulk adding members:', error);
    return c.json({ success: false, error: 'Failed to bulk add members' }, 500);
  }
});

// POST /api/company-brain/chat/channels/:id/resolve-thread - Resolve thread
companyBrainRouter.post('/chat/channels/:id/resolve-thread', async (c: AppContext) => {
  try {
    const channelId = c.req.param('id');
    const { threadId, resolvedBy, resolution, tags } = await c.req.json();
    await companyBrainChannelThreadManagementService.resolveThread(threadId, resolvedBy, resolution, tags);
    return c.json({ success: true, message: 'Thread resolved' });
  } catch (error) {
    console.error('Error resolving thread:', error);
    return c.json({ success: false, error: 'Failed to resolve thread' }, 500);
  }
});

// POST /api/company-brain/chat/channels/:id/link-project - Link channel to project
companyBrainRouter.post('/chat/channels/:id/link-project', async (c: AppContext) => {
  try {
    const channelId = c.req.param('id');
    const { projectId } = await c.req.json();
    await companyBrainChannelThreadManagementService.linkChannelToProject(channelId, projectId);
    return c.json({ success: true, message: 'Channel linked to project' });
  } catch (error) {
    console.error('Error linking channel to project:', error);
    return c.json({ success: false, error: 'Failed to link channel to project' }, 500);
  }
});

// POST /api/company-brain/chat/channels/:id/link-sop - Link channel to SOP
companyBrainRouter.post('/chat/channels/:id/link-sop', async (c: AppContext) => {
  try {
    const channelId = c.req.param('id');
    const { sopId } = await c.req.json();
    await companyBrainChannelThreadManagementService.linkChannelToSOP(channelId, sopId);
    return c.json({ success: true, message: 'Channel linked to SOP' });
  } catch (error) {
    console.error('Error linking channel to SOP:', error);
    return c.json({ success: false, error: 'Failed to link channel to SOP' }, 500);
  }
});

// ==================== Chat Knowledge Integration Endpoints ====================

// POST /api/company-brain/chat/knowledge/process - Process message for knowledge
companyBrainRouter.post('/chat/knowledge/process', async (c: AppContext) => {
  try {
    const { organizationId, messageId, conversationId, channelId, content, senderId } = await c.req.json();
    const context = await companyBrainChatKnowledgeIntegrationService.processMessage(organizationId, messageId, conversationId, channelId, content, senderId);
    return c.json({ success: true, data: context });
  } catch (error) {
    console.error('Error processing message for knowledge:', error);
    return c.json({ success: false, error: 'Failed to process message for knowledge' }, 500);
  }
});

// GET /api/company-brain/chat/knowledge/:messageId - Get knowledge context
companyBrainRouter.get('/chat/knowledge/:messageId', async (c: AppContext) => {
  try {
    const messageId = c.req.param('messageId');
    const context = await companyBrainChatKnowledgeIntegrationService.getKnowledgeContext(messageId);
    return c.json({ success: true, data: context });
  } catch (error) {
    console.error('Error getting knowledge context:', error);
    return c.json({ success: false, error: 'Failed to get knowledge context' }, 500);
  }
});

// POST /api/company-brain/chat/knowledge/:messageId/link-sop - Link to SOP
companyBrainRouter.post('/chat/knowledge/:messageId/link-sop', async (c: AppContext) => {
  try {
    const messageId = c.req.param('messageId');
    const { sopId, confidence } = await c.req.json();
    await companyBrainChatKnowledgeIntegrationService.linkToSOP(messageId, sopId, confidence);
    return c.json({ success: true, message: 'Linked to SOP' });
  } catch (error) {
    console.error('Error linking to SOP:', error);
    return c.json({ success: false, error: 'Failed to link to SOP' }, 500);
  }
});

// POST /api/company-brain/chat/knowledge/:messageId/link-project - Link to project
companyBrainRouter.post('/chat/knowledge/:messageId/link-project', async (c: AppContext) => {
  try {
    const messageId = c.req.param('messageId');
    const { projectId, confidence } = await c.req.json();
    await companyBrainChatKnowledgeIntegrationService.linkToProject(messageId, projectId, confidence);
    return c.json({ success: true, message: 'Linked to project' });
  } catch (error) {
    console.error('Error linking to project:', error);
    return c.json({ success: false, error: 'Failed to link to project' }, 500);
  }
});

// POST /api/company-brain/chat/knowledge/suggest-sop - Generate SOP suggestion
companyBrainRouter.post('/chat/knowledge/suggest-sop', async (c: AppContext) => {
  try {
    const { conversationId } = await c.req.json();
    const suggestion = await companyBrainChatKnowledgeIntegrationService.generateSOPSuggestion(conversationId);
    return c.json({ success: true, data: suggestion });
  } catch (error) {
    console.error('Error generating SOP suggestion:', error);
    return c.json({ success: false, error: 'Failed to generate SOP suggestion' }, 500);
  }
});

// POST /api/company-brain/chat/knowledge/extract-action-items - Extract action items
companyBrainRouter.post('/chat/knowledge/extract-action-items', async (c: AppContext) => {
  try {
    const { conversationId } = await c.req.json();
    const actionItems = await companyBrainChatKnowledgeIntegrationService.extractActionItems(conversationId);
    return c.json({ success: true, data: actionItems });
  } catch (error) {
    console.error('Error extracting action items:', error);
    return c.json({ success: false, error: 'Failed to extract action items' }, 500);
  }
});

// GET /api/company-brain/chat/knowledge/search - Search knowledge contexts
companyBrainRouter.get('/chat/knowledge/search', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const query = c.req.query('query');
    const topic = c.req.query('topic');
    const entityType = c.req.query('entityType');
    const resourceType = c.req.query('resourceType');
    
    if (!organizationId || !query) {
      return c.json({ success: false, error: 'organizationId and query are required' }, 400);
    }
    
    const filters: any = {};
    if (topic) filters.topic = topic;
    if (entityType) filters.entityType = entityType;
    if (resourceType) filters.resourceType = resourceType;
    
    const contexts = await companyBrainChatKnowledgeIntegrationService.searchKnowledgeContexts(organizationId, query, filters);
    return c.json({ success: true, data: contexts });
  } catch (error) {
    console.error('Error searching knowledge contexts:', error);
    return c.json({ success: false, error: 'Failed to search knowledge contexts' }, 500);
  }
});

// GET /api/company-brain/chat/stats - Get chat statistics
companyBrainRouter.get('/chat/stats', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    
    const stats = await companyBrainInternalChatService.getChatStatistics(organizationId);
    return c.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching chat statistics:', error);
    return c.json({ success: false, error: 'Failed to fetch chat statistics' }, 500);
  }
});

// ==================== MEMORY SYSTEM ENDPOINTS ====================

import { companyBrainMemoryService } from '../../services/company-brain-memory';
import { companyBrainReasoningService } from '../../services/company-brain-reasoning';
import { companyBrainContextService } from '../../services/company-brain-context';
import { companyBrainIntelligenceService } from '../../services/company-brain-intelligence';
import { companyBrainUnderstandingService } from '../../services/company-brain-understanding';
import { companyBrainDashboardService } from '../../services/company-brain-dashboard';

// POST /api/company-brain/memory/store - Store a memory
companyBrainRouter.post('/memory/store', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const memory = await companyBrainMemoryService.store(body);
    return c.json({ success: true, data: memory });
  } catch (error) {
    console.error('Error storing memory:', error);
    return c.json({ success: false, error: 'Failed to store memory' }, 500);
  }
});

// POST /api/company-brain/memory/recall - Recall memories
companyBrainRouter.post('/memory/recall', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const memories = await companyBrainMemoryService.recall(body);
    return c.json({ success: true, data: memories });
  } catch (error) {
    console.error('Error recalling memories:', error);
    return c.json({ success: false, error: 'Failed to recall memories' }, 500);
  }
});

// POST /api/company-brain/memory/consolidate - Consolidate memories
companyBrainRouter.post('/memory/consolidate', async (c: AppContext) => {
  try {
    const { organizationId, userId } = await c.req.json();
    const count = await companyBrainMemoryService.consolidate(organizationId, userId);
    return c.json({ success: true, data: { memoriesConsolidated: count } });
  } catch (error) {
    console.error('Error consolidating memories:', error);
    return c.json({ success: false, error: 'Failed to consolidate memories' }, 500);
  }
});

// POST /api/company-brain/memory/forget - Forget expired memories
companyBrainRouter.post('/memory/forget', async (c: AppContext) => {
  try {
    const { organizationId, userId, type } = await c.req.json();
    const count = await companyBrainMemoryService.forget(organizationId, userId, type);
    return c.json({ success: true, data: { memoriesForgotten: count } });
  } catch (error) {
    console.error('Error forgetting memories:', error);
    return c.json({ success: false, error: 'Failed to forget memories' }, 500);
  }
});

// GET /api/company-brain/memory/stats - Get memory statistics
companyBrainRouter.get('/memory/stats', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const userId = c.req.query('userId');
    if (!organizationId || !userId) {
      return c.json({ success: false, error: 'organizationId and userId are required' }, 400);
    }
    const stats = await companyBrainMemoryService.getStats(organizationId, userId);
    return c.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching memory stats:', error);
    return c.json({ success: false, error: 'Failed to fetch memory stats' }, 500);
  }
});

// ==================== AI REASONING ENDPOINTS ====================

// POST /api/company-brain/reasoning/compare - Compare documents
companyBrainRouter.post('/reasoning/compare', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const result = await companyBrainReasoningService.compare(body);
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error('Error comparing documents:', error);
    return c.json({ success: false, error: 'Failed to compare documents' }, 500);
  }
});

// POST /api/company-brain/reasoning/summarize - Summarize content
companyBrainRouter.post('/reasoning/summarize', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const result = await companyBrainReasoningService.summarize(body);
    return c.json({ success: true, data: { summary: result } });
  } catch (error) {
    console.error('Error summarizing:', error);
    return c.json({ success: false, error: 'Failed to summarize' }, 500);
  }
});

// POST /api/company-brain/reasoning/contradictions - Detect contradictions
companyBrainRouter.post('/reasoning/contradictions', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const result = await companyBrainReasoningService.detectContradictions(body);
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error('Error detecting contradictions:', error);
    return c.json({ success: false, error: 'Failed to detect contradictions' }, 500);
  }
});

// POST /api/company-brain/reasoning/recommend - Generate recommendations
companyBrainRouter.post('/reasoning/recommend', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const result = await companyBrainReasoningService.recommend(body);
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return c.json({ success: false, error: 'Failed to generate recommendations' }, 500);
  }
});

// POST /api/company-brain/reasoning/report - Generate report
companyBrainRouter.post('/reasoning/report', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const result = await companyBrainReasoningService.generateReport(body);
    return c.json({ success: true, data: { report: result } });
  } catch (error) {
    console.error('Error generating report:', error);
    return c.json({ success: false, error: 'Failed to generate report' }, 500);
  }
});

// POST /api/company-brain/reasoning/ask - Ask a question with RAG
companyBrainRouter.post('/reasoning/ask', async (c: AppContext) => {
  try {
    const { question, context } = await c.req.json();
    const result = await companyBrainReasoningService.answerQuestion(question, context || []);
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error('Error answering question:', error);
    return c.json({ success: false, error: 'Failed to answer question' }, 500);
  }
});

// GET /api/company-brain/reasoning/history - Get reasoning history
companyBrainRouter.get('/reasoning/history', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    const history = await companyBrainReasoningService.getReasoningHistory(organizationId);
    return c.json({ success: true, data: history });
  } catch (error) {
    console.error('Error fetching reasoning history:', error);
    return c.json({ success: false, error: 'Failed to fetch reasoning history' }, 500);
  }
});

// ==================== CONTEXT ENGINE ENDPOINTS ====================

// GET /api/company-brain/context - Get user context
companyBrainRouter.get('/context', async (c: AppContext) => {
  try {
    const userId = c.req.query('userId');
    const organizationId = c.req.query('organizationId');
    if (!userId || !organizationId) {
      return c.json({ success: false, error: 'userId and organizationId are required' }, 400);
    }
    const context = await companyBrainContextService.getContext(userId, organizationId);
    return c.json({ success: true, data: context });
  } catch (error) {
    console.error('Error getting context:', error);
    return c.json({ success: false, error: 'Failed to get context' }, 500);
  }
});

// POST /api/company-brain/context/enrich - Enrich a query with context
companyBrainRouter.post('/context/enrich', async (c: AppContext) => {
  try {
    const { query, context } = await c.req.json();
    const enriched = await companyBrainContextService.enrichQuery(query, context);
    return c.json({ success: true, data: enriched });
  } catch (error) {
    console.error('Error enriching query:', error);
    return c.json({ success: false, error: 'Failed to enrich query' }, 500);
  }
});

// POST /api/company-brain/context/session - Create session
companyBrainRouter.post('/context/session', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const sessionId = await companyBrainContextService.createSession(body);
    return c.json({ success: true, data: { sessionId } });
  } catch (error) {
    console.error('Error creating session:', error);
    return c.json({ success: false, error: 'Failed to create session' }, 500);
  }
});

// PUT /api/company-brain/context/session/:id - Update session
companyBrainRouter.put('/context/session/:id', async (c: AppContext) => {
  try {
    const sessionId = c.req.param('id');
    const { context } = await c.req.json();
    await companyBrainContextService.updateSession(sessionId, context);
    return c.json({ success: true, message: 'Session updated' });
  } catch (error) {
    console.error('Error updating session:', error);
    return c.json({ success: false, error: 'Failed to update session' }, 500);
  }
});

// GET /api/company-brain/context/session/:id - Get session
companyBrainRouter.get('/context/session/:id', async (c: AppContext) => {
  try {
    const sessionId = c.req.param('id');
    const session = await companyBrainContextService.getSession(sessionId);
    if (!session) return c.json({ success: false, error: 'Session not found' }, 404);
    return c.json({ success: true, data: session });
  } catch (error) {
    console.error('Error getting session:', error);
    return c.json({ success: false, error: 'Failed to get session' }, 500);
  }
});

// GET /api/company-brain/context/sessions - Get active sessions
companyBrainRouter.get('/context/sessions', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const userId = c.req.query('userId');
    if (!organizationId || !userId) {
      return c.json({ success: false, error: 'organizationId and userId are required' }, 400);
    }
    const sessions = await companyBrainContextService.getActiveSessions(organizationId, userId);
    return c.json({ success: true, data: sessions });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return c.json({ success: false, error: 'Failed to fetch sessions' }, 500);
  }
});

// ==================== INTELLIGENCE ENDPOINTS ====================

// GET /api/company-brain/intelligence/faqs - Discover FAQs
companyBrainRouter.get('/intelligence/faqs', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    const faqs = await companyBrainIntelligenceService.discoverFAQs(organizationId);
    return c.json({ success: true, data: faqs });
  } catch (error) {
    console.error('Error discovering FAQs:', error);
    return c.json({ success: false, error: 'Failed to discover FAQs' }, 500);
  }
});

// GET /api/company-brain/intelligence/experts - Discover experts
companyBrainRouter.get('/intelligence/experts', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    const experts = await companyBrainIntelligenceService.discoverExperts(organizationId);
    return c.json({ success: true, data: experts });
  } catch (error) {
    console.error('Error discovering experts:', error);
    return c.json({ success: false, error: 'Failed to discover experts' }, 500);
  }
});

// GET /api/company-brain/intelligence/risks - Discover risks
companyBrainRouter.get('/intelligence/risks', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    const risks = await companyBrainIntelligenceService.discoverRisks(organizationId);
    return c.json({ success: true, data: risks });
  } catch (error) {
    console.error('Error discovering risks:', error);
    return c.json({ success: false, error: 'Failed to discover risks' }, 500);
  }
});

// GET /api/company-brain/intelligence/trends - Discover trends
companyBrainRouter.get('/intelligence/trends', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    const trends = await companyBrainIntelligenceService.discoverTrends(organizationId);
    return c.json({ success: true, data: trends });
  } catch (error) {
    console.error('Error discovering trends:', error);
    return c.json({ success: false, error: 'Failed to discover trends' }, 500);
  }
});

// POST /api/company-brain/intelligence/insight - Generate insight
companyBrainRouter.post('/intelligence/insight', async (c: AppContext) => {
  try {
    const { organizationId, type } = await c.req.json();
    const insight = await companyBrainIntelligenceService.generateInsight(organizationId, type);
    return c.json({ success: true, data: insight });
  } catch (error) {
    console.error('Error generating insight:', error);
    return c.json({ success: false, error: 'Failed to generate insight' }, 500);
  }
});

// GET /api/company-brain/intelligence/insights - Get stored insights
companyBrainRouter.get('/intelligence/insights', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    const insights = await companyBrainIntelligenceService.getInsights(organizationId, {
      type: c.req.query('type') as any,
      severity: c.req.query('severity') as any,
      actionable: c.req.query('actionable') === 'true' ? true : undefined,
      limit: parseInt(c.req.query('limit') || '50'),
    });
    return c.json({ success: true, data: insights });
  } catch (error) {
    console.error('Error fetching insights:', error);
    return c.json({ success: false, error: 'Failed to fetch insights' }, 500);
  }
});

// ==================== COMPANY UNDERSTANDING ENDPOINTS ====================

// GET /api/company-brain/company/profile - Get company profile
companyBrainRouter.get('/company/profile', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    const profile = await companyBrainUnderstandingService.getProfile(organizationId);
    return c.json({ success: true, data: profile });
  } catch (error) {
    console.error('Error fetching company profile:', error);
    return c.json({ success: false, error: 'Failed to fetch company profile' }, 500);
  }
});

// GET /api/company-brain/company/metrics - Get company metrics
companyBrainRouter.get('/company/metrics', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    const metrics = await companyBrainUnderstandingService.getMetrics(organizationId);
    return c.json({ success: true, data: metrics });
  } catch (error) {
    console.error('Error fetching company metrics:', error);
    return c.json({ success: false, error: 'Failed to fetch company metrics' }, 500);
  }
});

// GET /api/company-brain/company/departments - Get departments
companyBrainRouter.get('/company/departments', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    const departments = await companyBrainUnderstandingService.getDepartments(organizationId);
    return c.json({ success: true, data: departments });
  } catch (error) {
    console.error('Error fetching departments:', error);
    return c.json({ success: false, error: 'Failed to fetch departments' }, 500);
  }
});

// POST /api/company-brain/company/departments - Add department
companyBrainRouter.post('/company/departments', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const department = await companyBrainUnderstandingService.addDepartment(body.organizationId, body);
    return c.json({ success: true, data: department });
  } catch (error) {
    console.error('Error adding department:', error);
    return c.json({ success: false, error: 'Failed to add department' }, 500);
  }
});

// GET /api/company-brain/company/products - Get products
companyBrainRouter.get('/company/products', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    const products = await companyBrainUnderstandingService.getProducts(organizationId);
    return c.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return c.json({ success: false, error: 'Failed to fetch products' }, 500);
  }
});

// POST /api/company-brain/company/products - Add product
companyBrainRouter.post('/company/products', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const product = await companyBrainUnderstandingService.addProduct(body.organizationId, body);
    return c.json({ success: true, data: product });
  } catch (error) {
    console.error('Error adding product:', error);
    return c.json({ success: false, error: 'Failed to add product' }, 500);
  }
});

// GET /api/company-brain/company/goals - Get goals
companyBrainRouter.get('/company/goals', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    const goals = await companyBrainUnderstandingService.getGoals(organizationId);
    return c.json({ success: true, data: goals });
  } catch (error) {
    console.error('Error fetching goals:', error);
    return c.json({ success: false, error: 'Failed to fetch goals' }, 500);
  }
});

// POST /api/company-brain/company/goals - Add goal
companyBrainRouter.post('/company/goals', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const goal = await companyBrainUnderstandingService.addGoal(body.organizationId, body);
    return c.json({ success: true, data: goal });
  } catch (error) {
    console.error('Error adding goal:', error);
    return c.json({ success: false, error: 'Failed to add goal' }, 500);
  }
});

// PUT /api/company-brain/company/goals/:id/progress - Update goal progress
companyBrainRouter.put('/company/goals/:id/progress', async (c: AppContext) => {
  try {
    const goalId = c.req.param('id');
    const { progress } = await c.req.json();
    const success = await companyBrainUnderstandingService.updateGoalProgress(goalId, progress);
    return c.json({ success, data: { goalId, progress } });
  } catch (error) {
    console.error('Error updating goal progress:', error);
    return c.json({ success: false, error: 'Failed to update goal progress' }, 500);
  }
});

// ==================== DASHBOARD ENDPOINTS ====================

// GET /api/company-brain/dashboard - Get full dashboard
companyBrainRouter.get('/dashboard', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    const dashboard = await companyBrainDashboardService.getDashboard(organizationId);
    return c.json({ success: true, data: dashboard });
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    return c.json({ success: false, error: 'Failed to fetch dashboard' }, 500);
  }
});

// GET /api/company-brain/dashboard/health - Get health summary
companyBrainRouter.get('/dashboard/health', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    const health = await companyBrainDashboardService.getHealthSummary(organizationId);
    return c.json({ success: true, data: health });
  } catch (error) {
    console.error('Error fetching health summary:', error);
    return c.json({ success: false, error: 'Failed to fetch health summary' }, 500);
  }
});

// GET /api/company-brain/dashboard/report/:format - Export dashboard report
companyBrainRouter.get('/dashboard/report/:format', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const format = c.req.param('format') as 'json' | 'csv';
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    const report = await companyBrainDashboardService.exportReport(organizationId, format);
    return c.json({ success: true, data: { report } });
  } catch (error) {
    console.error('Error exporting report:', error);
    return c.json({ success: false, error: 'Failed to export report' }, 500);
  }
});

// ==================== KNOWLEDGE GRAPH AUTO-LINK ENDPOINTS ====================

// POST /api/company-brain/graph/auto-link - Auto-link nodes
companyBrainRouter.post('/graph/auto-link', async (c: AppContext) => {
  try {
    const { organizationId } = await c.req.json();
    const linksCreated = await knowledgeGraphService.autoLinkNodes(organizationId);
    return c.json({ success: true, data: { linksCreated } });
  } catch (error) {
    console.error('Error auto-linking nodes:', error);
    return c.json({ success: false, error: 'Failed to auto-link nodes' }, 500);
  }
});

// GET /api/company-brain/graph/search - Search graph nodes
companyBrainRouter.get('/graph/search', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    const query = c.req.query('query') || '';
    const type = c.req.query('type');
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    const nodes = await knowledgeGraphService.searchNodes(organizationId, query as string, type as string | undefined);
    return c.json({ success: true, data: nodes });
  } catch (error) {
    console.error('Error searching graph:', error);
    return c.json({ success: false, error: 'Failed to search graph' }, 500);
  }
});

// ==================== INGESTION DOCUMENT ENDPOINTS ====================

// POST /api/company-brain/ingestion/document - Ingest a document
companyBrainRouter.post('/ingestion/document', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const count = await companyBrainIngestionService.ingestDocument(body.organizationId, body);
    return c.json({ success: true, data: { itemsCreated: count } });
  } catch (error) {
    console.error('Error ingesting document:', error);
    return c.json({ success: false, error: 'Failed to ingest document' }, 500);
  }
});

// GET /api/company-brain/ingestion/syncs - Get sync history
companyBrainRouter.get('/ingestion/syncs', async (c: AppContext) => {
  try {
    const organizationId = c.req.query('organizationId');
    if (!organizationId) {
      return c.json({ success: false, error: 'organizationId is required' }, 400);
    }
    const syncs = await companyBrainIngestionService.getSyncHistory(organizationId);
    return c.json({ success: true, data: syncs });
  } catch (error) {
    console.error('Error fetching sync history:', error);
    return c.json({ success: false, error: 'Failed to fetch sync history' }, 500);
  }
});

export default companyBrainRouter;
