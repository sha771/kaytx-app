import { describe, it, expect, beforeEach, jest, beforeAll, afterAll } from '@jest/globals';
import { AIAgentService, AgentType } from '../../backend/services/ai-agent-service';
import { agentMemoryService } from '../../backend/services/consolidated-memory-service';
import { db as pgDb } from '../../backend/db/connection';

describe('Enhanced AI Workflow Integration Tests', () => {
  let aiAgentService: AIAgentService;
  let mockOrganizationId: string;
  let mockUserId: string;

  beforeAll(async () => {
    console.log('Setting up enhanced AI workflow integration test environment');
  });

  afterAll(async () => {
    console.log('Cleaning up enhanced AI workflow integration test environment');
  });

  beforeEach(() => {
    jest.clearAllMocks();
    aiAgentService = new AIAgentService();
    mockOrganizationId = 'enhanced-integration-test-org';
    mockUserId = 'enhanced-integration-test-user';

    process.env.OPENAI_API_KEY = 'test-enhanced-integration-key';
    process.env.ANTHROPIC_API_KEY = 'test-enhanced-integration-key';
    process.env.GOOGLE_API_KEY = 'test-enhanced-integration-key';
  });

  describe('Complex Multi-Step Workflow Integration', () => {
    it('should handle end-to-end customer service workflow', async () => {
      // Create comprehensive customer service agent
      const customerServiceAgent = {
        id: 'customer-service-enhanced',
        name: 'Enhanced Customer Service Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: `You are a comprehensive customer service agent that can:
        1. Handle customer inquiries
        2. Process orders and returns
        3. Escalate complex issues
        4. Provide product recommendations
        5. Schedule follow-ups`,
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 2000,
        tools: [
          {
            name: 'lookup_customer',
            description: 'Look up customer information',
            parameters: { customerId: 'string', lookupType: 'string' },
            category: 'customer',
            handler: async (params: any) => ({
              success: true,
              customer: {
                id: params.customerId,
                name: 'John Doe',
                email: 'john@example.com',
                tier: 'premium',
                orders: [
                  { id: 'ORD-001', status: 'delivered', total: 299.99 },
                  { id: 'ORD-002', status: 'processing', total: 199.99 }
                ]
              }
            })
          },
          {
            name: 'process_return',
            description: 'Process product return',
            parameters: { orderId: 'string', reason: 'string', items: 'array' },
            category: 'order',
            handler: async (params: any) => ({
              success: true,
              returnId: `RET-${Date.now()}`,
              refundAmount: 149.99,
              estimatedRefundDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            })
          },
          {
            name: 'escalate_issue',
            description: 'Escalate complex issue to specialist',
            parameters: { issueType: 'string', priority: 'string', details: 'object' },
            category: 'escalation',
            handler: async (params: any) => ({
              success: true,
              escalationId: `ESC-${Date.now()}`,
              assignedTo: 'specialist-team',
              expectedResponseTime: '2 hours'
            })
          },
          {
            name: 'schedule_followup',
            description: 'Schedule customer follow-up',
            parameters: { customerId: 'string', followupType: 'string', scheduledTime: 'string' },
            category: 'scheduling',
            handler: async (params: any) => ({
              success: true,
              followupId: `FLW-${Date.now()}`,
              scheduledTime: params.scheduledTime,
              method: 'email'
            })
          }
        ],
        capabilities: ['conversation', 'memory', 'analysis', 'workflow', 'escalation'],
      };

      aiAgentService.registerAgent(customerServiceAgent);

      // Mock memory service for customer context
      const mockCustomerMemories = [
        {
          id: 'mem-customer-1',
          type: 'customer' as const,
          content: 'Customer prefers email communication over phone',
          importance: 0.9,
          tags: ['preference', 'communication'],
          metadata: { source: 'previous-interaction' },
          createdAt: new Date(),
          updatedAt: new Date(),
          organizationId: mockOrganizationId,
          userId: mockUserId
        },
        {
          id: 'mem-customer-2',
          type: 'order' as const,
          content: 'Customer had previous return due to sizing issues',
          importance: 0.8,
          tags: ['order', 'return'],
          metadata: { source: 'order-history' },
          createdAt: new Date(),
          updatedAt: new Date(),
          organizationId: mockOrganizationId,
          userId: mockUserId
        }
      ];

      jest.spyOn(agentMemoryService, 'getMemories').mockResolvedValue(mockCustomerMemories);
      jest.spyOn(agentMemoryService, 'storeMemory').mockResolvedValue({} as any);

      // Step 1: Customer initiates contact about order issue
      const conversation = await aiAgentService.startConversation(
        'customer-service-enhanced',
        'Hi, I need help with my recent order. The item doesn\'t fit correctly.',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(conversation.sessionId).toBeDefined();
      expect(conversation.messages).toHaveLength(1);

      // Step 2: Agent looks up customer information
      const lookupResponse = await aiAgentService.sendMessage(
        conversation.sessionId,
        'Can you look up my account using my email john@example.com?',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(lookupResponse.message).toBeDefined();
      expect(lookupResponse.message).toContain('John Doe');

      // Step 3: Agent processes return request
      const returnResponse = await aiAgentService.sendMessage(
        conversation.sessionId,
        'I\'d like to return order ORD-002 because the sizing is wrong.',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(returnResponse.message).toBeDefined();
      expect(returnResponse.confidence).toBeGreaterThan(0);

      // Step 4: Agent schedules follow-up
      const followupResponse = await aiAgentService.sendMessage(
        conversation.sessionId,
        'Can you follow up with me next week to check on the refund?',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(followupResponse.message).toBeDefined();

      // Verify memory integration throughout workflow
      expect(agentMemoryService.getMemories).toHaveBeenCalled();
      expect(agentMemoryService.storeMemory).toHaveBeenCalledTimes(4); // Each user message

      // Verify conversation state is maintained
      const finalConversation = aiAgentService.getConversation(
        conversation.sessionId,
        mockOrganizationId
      );

      expect(finalConversation).not.toBeNull();
      expect(finalConversation?.messages.length).toBeGreaterThan(5);
    });

    it('should handle complex sales workflow with multiple stakeholders', async () => {
      // Create sales agent with B2B capabilities
      const salesAgent = {
        id: 'b2b-sales-enhanced',
        name: 'Enhanced B2B Sales Agent',
        type: AgentType.NEGOTIATOR,
        systemPrompt: `You are a B2B sales specialist that can:
        1. Qualify leads and assess needs
        2. Prepare custom quotes and proposals
        3. Coordinate with technical team for demos
        4. Handle negotiations and objections
        5. Manage contract discussions`,
        model: 'gpt-4',
        temperature: 0.6,
        maxTokens: 2500,
        tools: [
          {
            name: 'qualify_lead',
            description: 'Qualify B2B lead',
            parameters: { companySize: 'string', industry: 'string', budget: 'number', timeline: 'string' },
            category: 'qualification',
            handler: async (params: any) => ({
              success: true,
              qualificationScore: 85,
              tier: 'hot-lead',
              recommendedActions: ['schedule-demo', 'prepare-proposal'],
              estimatedDealSize: params.budget || 50000
            })
          },
          {
            name: 'create_quote',
            description: 'Create custom quote',
            parameters: { products: 'array', discount: 'number', terms: 'string', validity: 'number' },
            category: 'pricing',
            handler: async (params: any) => ({
              success: true,
              quoteId: `QTE-${Date.now()}`,
              totalAmount: 45000,
              discountApplied: params.discount || 0,
              validUntil: new Date(Date.now() + (params.validity || 30) * 24 * 60 * 60 * 1000)
            })
          },
          {
            name: 'schedule_demo',
            description: 'Schedule product demo',
            parameters: { attendees: 'array', demoType: 'string', scheduledTime: 'string', technicalContact: 'string' },
            category: 'coordination',
            handler: async (params: any) => ({
              success: true,
              demoId: `DEMO-${Date.now()}`,
              meetingLink: 'https://meet.company.com/demo123',
              duration: '60 minutes',
              technicalContactAssigned: params.technicalContact
            })
          },
          {
            name: 'calculate_roi',
            description: 'Calculate ROI for customer',
            parameters: { currentCosts: 'number', expectedSavings: 'number', implementationCost: 'number' },
            category: 'analysis',
            handler: async (params: any) => ({
              success: true,
              roi: {
                paybackPeriod: '18 months',
                annualSavings: params.expectedSavings - params.currentCosts,
                totalROI: ((params.expectedSavings - params.currentCosts) / params.implementationCost * 100).toFixed(1) + '%'
              }
            })
          }
        ],
        capabilities: ['negotiation', 'qualification', 'pricing', 'coordination', 'analysis'],
      };

      aiAgentService.registerAgent(salesAgent);

      // Mock B2B context memories
      const mockB2BMemories = [
        {
          id: 'mem-b2b-1',
          type: 'company' as const,
          content: 'TechCorp Inc. is a mid-sized software company with 200 employees',
          importance: 0.9,
          tags: ['company', 'prospect'],
          metadata: { source: 'crm' },
          createdAt: new Date(),
          updatedAt: new Date(),
          organizationId: mockOrganizationId,
          userId: mockUserId
        }
      ];

      jest.spyOn(agentMemoryService, 'getMemories').mockResolvedValue(mockB2BMemories);
      jest.spyOn(agentMemoryService, 'storeMemory').mockResolvedValue({} as any);

      // B2B sales workflow
      const conversation = await aiAgentService.startConversation(
        'b2b-sales-enhanced',
        'We\'re a 200-employee software company looking for AI solutions. Our budget is around $50k.',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      // Step 1: Qualify the lead
      const qualificationResponse = await aiAgentService.sendMessage(
        conversation.sessionId,
        'Can you help us understand if we\'re a good fit for your enterprise solution?',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(qualificationResponse.message).toBeDefined();
      expect(qualificationResponse.confidence).toBeGreaterThan(0.7);

      // Step 2: Create custom quote
      const quoteResponse = await aiAgentService.sendMessage(
        conversation.sessionId,
        'We need a quote for your enterprise AI platform with 15% discount for annual billing.',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(quoteResponse.message).toBeDefined();

      // Step 3: Schedule technical demo
      const demoResponse = await aiAgentService.sendMessage(
        conversation.sessionId,
        'Our CTO wants to see a technical demo. Can you schedule it for next week?',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(demoResponse.message).toBeDefined();

      // Step 4: Calculate ROI
      const roiResponse = await aiAgentService.sendMessage(
        conversation.sessionId,
        'We currently spend $20k on manual processes. What\'s the expected ROI?',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(roiResponse.message).toBeDefined();

      // Verify comprehensive workflow execution
      expect(agentMemoryService.storeMemory).toHaveBeenCalledTimes(4);
      
      const finalConversation = aiAgentService.getConversation(
        conversation.sessionId,
        mockOrganizationId
      );

      expect(finalConversation?.messages.length).toBeGreaterThan(5);
    });
  });

  describe('Real-Time Collaboration Integration', () => {
    it('should handle multi-agent collaboration on complex tasks', async () => {
      // Create specialized agents for collaboration
      const researchAgent = {
        id: 'research-specialist',
        name: 'Research Specialist',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You are a research specialist that gathers and analyzes information.',
        model: 'gpt-4',
        temperature: 0.3,
        maxTokens: 1500,
        tools: [
          {
            name: 'research_topic',
            description: 'Research specific topics',
            parameters: { topic: 'string', depth: 'string', sources: 'array' },
            category: 'research',
            handler: async (params: any) => ({
              success: true,
              findings: [
                'Market size: $10B and growing 15% annually',
                'Key competitors: Company A, Company B',
                'Customer pain points: High costs, complexity'
              ],
              confidence: 0.9,
              sourcesAnalyzed: params.sources.length
            })
          }
        ],
        capabilities: ['research', 'analysis', 'data-gathering'],
      };

      const strategyAgent = {
        id: 'strategy-specialist',
        name: 'Strategy Specialist',
        type: AgentType.WORKFLOW_AUTOMATOR,
        systemPrompt: 'You are a strategy specialist that develops business strategies.',
        model: 'gpt-4',
        temperature: 0.5,
        maxTokens: 2000,
        tools: [
          {
            name: 'develop_strategy',
            description: 'Develop business strategy',
            parameters: { objectives: 'array', constraints: 'array', timeline: 'string' },
            category: 'strategy',
            handler: async (params: any) => ({
              success: true,
              strategy: {
                vision: 'Become market leader in AI solutions',
                initiatives: ['Product innovation', 'Market expansion', 'Partnership development'],
                kpis: ['Revenue growth', 'Market share', 'Customer satisfaction'],
                risks: ['Competition', 'Technology changes', 'Regulatory']
              },
              feasibilityScore: 0.8
            })
          }
        ],
        capabilities: ['strategy', 'planning', 'analysis'],
      };

      const executionAgent = {
        id: 'execution-specialist',
        name: 'Execution Specialist',
        type: AgentType.WORKFLOW_AUTOMATOR,
        systemPrompt: 'You are an execution specialist that implements strategies and manages projects.',
        model: 'gpt-4',
        temperature: 0.4,
        maxTokens: 1800,
        tools: [
          {
            name: 'create_project_plan',
            description: 'Create detailed project plan',
            parameters: { strategy: 'object', resources: 'array', milestones: 'array' },
            category: 'execution',
            handler: async (params: any) => ({
              success: true,
              projectPlan: {
                phases: ['Research', 'Planning', 'Development', 'Launch'],
                timeline: '6 months',
                budget: '$500k',
                team: ['Project Manager', 'Developers', 'Marketing', 'Sales'],
                risks: ['Timeline delays', 'Budget overruns', 'Resource constraints']
              }
            })
          }
        ],
        capabilities: ['execution', 'project-management', 'coordination'],
      };

      // Register all agents
      aiAgentService.registerAgent(researchAgent);
      aiAgentService.registerAgent(strategyAgent);
      aiAgentService.registerAgent(executionAgent);

      // Mock memory for shared context
      jest.spyOn(agentMemoryService, 'getMemories').mockResolvedValue([]);
      jest.spyOn(agentMemoryService, 'storeMemory').mockResolvedValue({} as any);

      // Step 1: Research phase
      const researchConversation = await aiAgentService.startConversation(
        'research-specialist',
        'Research the AI market for enterprise solutions',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      const researchResponse = await aiAgentService.sendMessage(
        researchConversation.sessionId,
        'Analyze market trends, competitors, and customer needs',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(researchResponse.message).toBeDefined();

      // Step 2: Strategy phase (using research findings)
      const strategyConversation = await aiAgentService.startConversation(
        'strategy-specialist',
        'Based on market research, develop a growth strategy',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      const strategyResponse = await aiAgentService.sendMessage(
        strategyConversation.sessionId,
        'Create a 3-year strategy considering market size of $10B and growing 15% annually',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(strategyResponse.message).toBeDefined();

      // Step 3: Execution phase
      const executionConversation = await aiAgentService.startConversation(
        'execution-specialist',
        'Create implementation plan for the growth strategy',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      const executionResponse = await aiAgentService.sendMessage(
        executionConversation.sessionId,
        'Develop a 6-month project plan with budget and resource allocation',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(executionResponse.message).toBeDefined();

      // Verify all agents worked independently but cohesively
      const researchConv = aiAgentService.getConversation(researchConversation.sessionId, mockOrganizationId);
      const strategyConv = aiAgentService.getConversation(strategyConversation.sessionId, mockOrganizationId);
      const executionConv = aiAgentService.getConversation(executionConversation.sessionId, mockOrganizationId);

      expect(researchConv?.messages.length).toBeGreaterThan(2);
      expect(strategyConv?.messages.length).toBeGreaterThan(2);
      expect(executionConv?.messages.length).toBeGreaterThan(2);

      // Verify all session IDs are unique
      const sessionIds = [
        researchConversation.sessionId,
        strategyConversation.sessionId,
        executionConversation.sessionId
      ];
      const uniqueSessionIds = new Set(sessionIds);
      expect(uniqueSessionIds.size).toBe(3);
    });
  });

  describe('Advanced Error Recovery Integration', () => {
    it('should handle cascading failures with intelligent recovery', async () => {
      const resilientAgent = {
        id: 'resilient-enhanced',
        name: 'Enhanced Resilient Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You are a highly resilient agent that handles failures gracefully.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1500,
        tools: [
          {
            name: 'primary_api',
            description: 'Primary API that may fail',
            parameters: { data: 'object' },
            category: 'api',
            retryAttempts: 3,
            fallbackStrategy: 'secondary_api',
            handler: jest.fn()
              .mockRejectedValueOnce(new Error('Rate limit exceeded'))
              .mockRejectedValueOnce(new Error('Service temporarily unavailable'))
              .mockResolvedValueOnce({ success: true, data: 'Primary API success' })
          },
          {
            name: 'secondary_api',
            description: 'Fallback API',
            parameters: { data: 'object' },
            category: 'api',
            handler: jest.fn()
              .mockResolvedValueOnce({ success: true, data: 'Secondary API success' })
          },
          {
            name: 'cache_service',
            description: 'Cache service for degraded functionality',
            parameters: { key: 'string' },
            category: 'cache',
            handler: async (params: any) => ({
              success: true,
              cachedData: 'Cached response from previous successful call',
              timestamp: new Date().toISOString()
            })
          }
        ],
        capabilities: ['error-recovery', 'resilience', 'fallback', 'caching'],
      };

      aiAgentService.registerAgent(resilientAgent);

      const conversation = await aiAgentService.startConversation(
        'resilient-enhanced',
        'Test error recovery mechanisms',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      // Test primary API with retries
      const primaryResult = await aiAgentService.executeTool(
        'resilient-enhanced',
        'primary_api',
        { data: 'test data' },
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(primaryResult.success).toBe(true);
      expect(resilientAgent.tools[0].handler).toHaveBeenCalledTimes(3);

      // Test fallback to secondary API
      const mockPrimaryFailure = jest.fn().mockRejectedValue(new Error('Complete failure'));
      resilientAgent.tools[0].handler = mockPrimaryFailure;

      const fallbackResult = await aiAgentService.executeTool(
        'resilient-enhanced',
        'primary_api',
        { data: 'test data' },
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(fallbackResult.success).toBe(true);
      expect(resilientAgent.tools[1].handler).toHaveBeenCalled();

      // Test cache service degradation
      const cacheResult = await aiAgentService.executeTool(
        'resilient-enhanced',
        'cache_service',
        { key: 'test-key' },
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(cacheResult.success).toBe(true);
      expect(cacheResult.data).toHaveProperty('cachedData');
    });
  });

  describe('Performance and Scalability Integration', () => {
    it('should handle high-volume concurrent workflows', async () => {
      const scalableAgent = {
        id: 'scalable-enhanced',
        name: 'Enhanced Scalable Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You handle high-volume requests efficiently.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [
          {
            name: 'process_request',
            description: 'Process user requests efficiently',
            parameters: { requestType: 'string', data: 'object' },
            category: 'processing',
            handler: async (params: any) => ({
              success: true,
              requestId: `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              processedAt: new Date().toISOString(),
              processingTime: Math.floor(Math.random() * 100) + 50 // 50-150ms
            })
          }
        ],
        capabilities: ['concurrency', 'performance', 'scalability'],
      };

      aiAgentService.registerAgent(scalableAgent);

      // Create 20 concurrent conversations
      const conversationPromises = [];
      for (let i = 0; i < 20; i++) {
        conversationPromises.push(
          aiAgentService.startConversation(
            'scalable-enhanced',
            `High volume test ${i}`,
            { organizationId: mockOrganizationId, userId: `user-${i}` }
          )
        );
      }

      const startTime = Date.now();
      const conversations = await Promise.all(conversationPromises);
      const conversationTime = Date.now() - startTime;

      expect(conversations).toHaveLength(20);
      expect(conversationTime).toBeLessThan(5000); // Should complete within 5 seconds

      // Send messages to all conversations concurrently
      const messagePromises = conversations.map((conv, index) =>
        aiAgentService.sendMessage(
          conv.sessionId,
          `Process request ${index} with data: { type: 'test', priority: ${index % 3 + 1} }`,
          { organizationId: mockOrganizationId, userId: `user-${index}` }
        )
      );

      const messageStartTime = Date.now();
      const responses = await Promise.all(messagePromises);
      const messageTime = Date.now() - messageStartTime;

      expect(responses).toHaveLength(20);
      expect(messageTime).toBeLessThan(10000); // Should complete within 10 seconds

      // Verify all responses are valid
      responses.forEach((response, index) => {
        expect(response.message).toBeDefined();
        expect(response.confidence).toBeGreaterThan(0);
      });

      // Verify performance metrics
      const avgConversationTime = conversationTime / 20;
      const avgMessageTime = messageTime / 20;

      expect(avgConversationTime).toBeLessThan(250); // < 250ms per conversation
      expect(avgMessageTime).toBeLessThan(500); // < 500ms per message
    });
  });
});
