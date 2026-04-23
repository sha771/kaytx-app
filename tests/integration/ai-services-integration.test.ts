import { describe, it, expect, beforeEach, jest, afterAll } from '@jest/globals';
import { AIAgentService , AgentType } from '../../../backend/services/ai-agent-service';
import { agentMemoryService } from '../../../backend/services/agent-memory-service';
import { platformDataSyncService } from '../../../backend/services/platform-data-sync-service';

describe('AI Services Integration Tests', () => {
  let aiAgentService: AIAgentService;
  let mockOrganizationId: string;
  let mockUserId: string;

  beforeEach(() => {
    jest.clearAllMocks();
    aiAgentService = new AIAgentService();
    mockOrganizationId = 'test-org-id';
    mockUserId = 'test-user-id';

    process.env.OPENAI_API_KEY = 'test-openai-key';
    process.env.ANTHROPIC_API_KEY = 'test-anthropic-key';
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('AI Agent + Memory Integration', () => {
    beforeEach(() => {
      const agentConfig = {
        id: 'memory-agent',
        name: 'Memory Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You remember conversations.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [],
        capabilities: ['memory'],
      };
      aiAgentService.registerAgent(agentConfig);
    });

    it('should integrate with memory service during conversation', async () => {
      // Mock memory service
      const mockGetMemories = jest.spyOn(agentMemoryService, 'getMemories')
        .mockResolvedValue([{
          id: 'memory-1',
          type: 'preference',
          content: 'User prefers concise responses',
          userId: mockUserId,
          organizationId: mockOrganizationId,
          createdAt: new Date(),
          updatedAt: new Date()
        }]);

      const mockStoreMemory = jest.spyOn(agentMemoryService, 'storeMemory')
        .mockResolvedValue();

      const conversation = await aiAgentService.startConversation(
        'memory-agent',
        'Hello, I need help.',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      await aiAgentService.sendMessage(
        conversation.sessionId,
        'Please give me a brief answer',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(mockGetMemories).toHaveBeenCalledWith(
        mockOrganizationId,
        mockUserId,
        10
      );

      expect(mockStoreMemory).toHaveBeenCalledTimes(2); // Once for user message, once for response
    });
  });

  describe('AI Agent + Platform Sync Integration', () => {
    beforeEach(() => {
      const agentConfig = {
        id: 'platform-agent',
        name: 'Platform Agent',
        type: AgentType.SALES_ASSISTANT,
        systemPrompt: 'You help with platform data.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [{
          name: 'sync_platform_data',
          description: 'Sync platform data',
          handler: async (params: any) => {
            const result = await platformDataSyncService.syncPlatform(
              params.organizationId,
              params.platform,
              params.connectionId
            );
            return result;
          },
          enabled: true,
          retryAttempts: 3,
          timeout: 30000
        }],
        capabilities: ['platform_sync'],
      };
      aiAgentService.registerAgent(agentConfig);
    });

    it('should integrate with platform sync service', async () => {
      const mockSyncPlatform = jest.spyOn(platformDataSyncService, 'syncPlatform')
        .mockResolvedValue({
          success: true,
          messageCount: 10,
          recordsProcessed: 25,
          errors: [],
          lastSyncAt: new Date()
        });

      const result = await aiAgentService.executeTool(
        'platform-agent',
        'sync_platform_data',
        {
          organizationId: mockOrganizationId,
          platform: 'salesforce',
          connectionId: 'conn-123'
        }
      );

      expect(result.success).toBe(true);
      expect(mockSyncPlatform).toHaveBeenCalledWith(
        mockOrganizationId,
        'salesforce',
        'conn-123'
      );
    });
  });

  describe('Multi-Agent Workflow Integration', () => {
    beforeEach(() => {
      const salesAgent = {
        id: 'sales-agent',
        name: 'Sales Agent',
        type: AgentType.SALES_ASSISTANT,
        systemPrompt: 'You handle sales inquiries.',
        model: 'gpt-4',
        temperature: 0.8,
        maxTokens: 1000,
        tools: [{
          name: 'create_lead',
          description: 'Create a new lead',
          handler: jest.fn().mockResolvedValue({ leadId: 'lead-123' }),
          enabled: true,
          retryAttempts: 3,
          timeout: 5000
        }],
        capabilities: ['lead_management'],
      };

      const workflowAgent = {
        id: 'workflow-agent',
        name: 'Workflow Agent',
        type: AgentType.WORKFLOW_AUTOMATOR,
        systemPrompt: 'You automate workflows.',
        model: 'gpt-4',
        temperature: 0.5,
        maxTokens: 1500,
        tools: [{
          name: 'trigger_workflow',
          description: 'Trigger a workflow',
          handler: jest.fn().mockResolvedValue({ workflowId: 'wf-456' }),
          enabled: true,
          retryAttempts: 3,
          timeout: 5000
        }],
        capabilities: ['workflow_automation'],
      };

      aiAgentService.registerAgent(salesAgent);
      aiAgentService.registerAgent(workflowAgent);
    });

    it('should handle multi-agent workflow', async () => {
      // Start with sales agent
      const salesConversation = await aiAgentService.startConversation(
        'sales-agent',
        'I want to create a new lead',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      const salesResponse = await aiAgentService.sendMessage(
        salesConversation.sessionId,
        'Create a lead for John Doe at john@example.com',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(salesResponse.message).toBeDefined();

      // Continue with workflow agent
      const workflowConversation = await aiAgentService.startConversation(
        'workflow-agent',
        'I need to automate the lead process',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      const workflowResponse = await aiAgentService.sendMessage(
        workflowConversation.sessionId,
        'Trigger the welcome workflow for new leads',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(workflowResponse.message).toBeDefined();
    });
  });

  describe('Streaming + Memory Integration', () => {
    beforeEach(() => {
      const agentConfig = {
        id: 'streaming-memory-agent',
        name: 'Streaming Memory Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You stream responses and remember.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [],
        capabilities: ['streaming', 'memory'],
      };
      aiAgentService.registerAgent(agentConfig);
    });

    it('should integrate streaming with memory storage', async () => {
      const mockGetMemories = jest.spyOn(agentMemoryService, 'getMemories')
        .mockResolvedValue([]);

      const mockStoreMemory = jest.spyOn(agentMemoryService, 'storeMemory')
        .mockResolvedValue();

      const conversation = await aiAgentService.startConversation(
        'streaming-memory-agent',
        'Start streaming',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      const chunks = [];
      for await (const chunk of aiAgentService.sendMessageStream(
        conversation.sessionId,
        'Please provide a detailed response about your capabilities',
        { organizationId: mockOrganizationId, userId: mockUserId }
      )) {
        chunks.push(chunk);
      }

      expect(chunks.length).toBeGreaterThan(0);
      expect(mockStoreMemory).toHaveBeenCalled();
    });
  });

  describe('Error Recovery Integration', () => {
    beforeEach(() => {
      const agentConfig = {
        id: 'error-recovery-agent',
        name: 'Error Recovery Agent',
        type: AgentType.WORKFLOW_AUTOMATOR,
        systemPrompt: 'You handle errors gracefully.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [{
          name: 'flaky_tool',
          description: 'A tool that sometimes fails',
          handler: jest.fn()
            .mockRejectedValueOnce(new Error('Temporary failure'))
            .mockRejectedValueOnce(new Error('Another failure'))
            .mockResolvedValue({ success: true }),
          enabled: true,
          retryAttempts: 3,
          timeout: 5000
        }],
        capabilities: ['error_recovery'],
      };
      aiAgentService.registerAgent(agentConfig);
    });

    it('should recover from tool failures and continue', async () => {
      const result = await aiAgentService.executeTool(
        'error-recovery-agent',
        'flaky_tool',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(result.success).toBe(true);
    });
  });

  describe('Context Window + Memory Integration', () => {
    beforeEach(() => {
      const agentConfig = {
        id: 'context-memory-agent',
        name: 'Context Memory Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You manage context and memory.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [],
        capabilities: ['context', 'memory'],
      };
      aiAgentService.registerAgent(agentConfig);
    });

    it('should use memory to enhance compressed context', async () => {
      const mockGetMemories = jest.spyOn(agentMemoryService, 'getMemories')
        .mockResolvedValue([{
          id: 'memory-1',
          type: 'conversation',
          content: 'User prefers technical explanations',
          userId: mockUserId,
          organizationId: mockOrganizationId,
          createdAt: new Date(),
          updatedAt: new Date()
        }]);

      const conversation = await aiAgentService.startConversation(
        'context-memory-agent',
        'Hello',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      // Add many messages to trigger context compression
      for (let i = 0; i < 20; i++) {
        await aiAgentService.sendMessage(
          conversation.sessionId,
          `Question ${i}: How does this work?`,
          { organizationId: mockOrganizationId, userId: mockUserId }
        );
      }

      expect(mockGetMemories).toHaveBeenCalled();
    });
  });
});
