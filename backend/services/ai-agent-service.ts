import axios, { AxiosInstance } from 'axios';
import { EventEmitter } from 'events';

export type AgentType = 'voice-assistant' | 'receptionist' | 'negotiator' | 'workflow-automator' | 'data-analyst';
export type AgentStatus = 'idle' | 'initializing' | 'listening' | 'processing' | 'speaking' | 'error' | 'offline';

export interface AgentConfig {
  id: string;
  name: string;
  type: AgentType;
  systemPrompt: string;
  model: string; // e.g., 'gpt-4', 'claude-3', 'llama-2'
  temperature: number;
  maxTokens: number;
  tools: AgentTool[];
  knowledgeBase?: string[];
  voiceProfile?: {
    provider: string; // 'eleven-labs', 'google-cloud', 'azure'
    voiceId: string;
    language: string;
    speed: number;
  };
  capabilities: string[];
}

export interface AgentTool {
  name: string;
  description: string;
  parameters: Record<string, any>;
  handler?: (params: any) => Promise<any>;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface ConversationContext {
  sessionId: string;
  agentId: string;
  messages: Message[];
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentResponse {
  message: string;
  action?: string;
  actionParams?: Record<string, any>;
  confidence: number;
  nextSteps?: string[];
}

export class AIAgentService extends EventEmitter {
  private apiClient: AxiosInstance;
  private agents: Map<string, AgentConfig> = new Map();
  private conversations: Map<string, ConversationContext> = new Map();
  private openaiApiKey: string;
  private anthropicApiKey: string;
  private elevenLabsApiKey: string;
  private baseUrl: string;

  constructor() {
    super();
    this.openaiApiKey = process.env.OPENAI_API_KEY || '';
    this.anthropicApiKey = process.env.ANTHROPIC_API_KEY || '';
    this.elevenLabsApiKey = process.env.ELEVEN_LABS_API_KEY || '';
    this.baseUrl = process.env.AI_API_BASE_URL || 'https://api.openai.com/v1';

    this.apiClient = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.openaiApiKey}`,
      },
    });

    console.log('[AIAgentService] initialized');
    this.initializeDefaultAgents();
  }

  /**
   * Initialize default AI agents
   */
  private initializeDefaultAgents(): void {
    const defaultAgents: AgentConfig[] = [
      {
        id: 'voice-assistant-1',
        name: 'Voice Assistant',
        type: 'voice-assistant',
        systemPrompt: `You are a professional voice assistant. Your role is to handle incoming calls, 
          provide information, schedule appointments, and assist with customer inquiries. 
          Be polite, concise, and professional. Always confirm important information.`,
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 2000,
        tools: [
          {
            name: 'schedule_appointment',
            description: 'Schedule an appointment or meeting',
            parameters: {
              date: { type: 'string' },
              time: { type: 'string' },
              duration: { type: 'number' },
              title: { type: 'string' },
            },
          },
          {
            name: 'create_task',
            description: 'Create a task or reminder',
            parameters: {
              title: { type: 'string' },
              dueDate: { type: 'string' },
              priority: { type: 'string' },
            },
          },
          {
            name: 'fetch_info',
            description: 'Fetch customer or business information',
            parameters: {
              query: { type: 'string' },
              type: { type: 'string' },
            },
          },
        ],
        voiceProfile: {
          provider: 'eleven-labs',
          voiceId: 'EXAVITQu4vr4xnSDxMaL',
          language: 'en-US',
          speed: 1.0,
        },
        capabilities: ['call-handling', 'appointment-scheduling', 'information-retrieval', 'task-creation'],
      },
      {
        id: 'receptionist-1',
        name: 'AI Receptionist',
        type: 'receptionist',
        systemPrompt: `You are an intelligent business receptionist. Your duties include:
          - Greeting callers professionally
          - Routing calls to appropriate departments
          - Scheduling appointments
          - Taking messages
          - Providing business hours and location information
          Always be courteous and efficient.`,
        model: 'gpt-4',
        temperature: 0.6,
        maxTokens: 1500,
        tools: [
          {
            name: 'transfer_call',
            description: 'Transfer call to another extension or department',
            parameters: {
              extension: { type: 'string' },
              department: { type: 'string' },
            },
          },
          {
            name: 'record_message',
            description: 'Record a voicemail message',
            parameters: {
              recipientName: { type: 'string' },
              message: { type: 'string' },
            },
          },
        ],
        voiceProfile: {
          provider: 'eleven-labs',
          voiceId: '21m00Tcm4TlvDq8ikWAM',
          language: 'en-US',
          speed: 0.95,
        },
        capabilities: ['call-routing', 'appointment-booking', 'message-taking', 'information-providing'],
      },
      {
        id: 'negotiator-1',
        name: 'Negotiation Assistant',
        type: 'negotiator',
        systemPrompt: `You are an expert negotiation assistant. Your role is to:
          - Analyze negotiation scenarios
          - Suggest optimal strategies
          - Provide counter-offer recommendations
          - Track negotiation progress
          - Generate negotiation scripts
          Use data-driven insights and industry best practices.`,
        model: 'gpt-4',
        temperature: 0.8,
        maxTokens: 3000,
        tools: [
          {
            name: 'analyze_offer',
            description: 'Analyze a business offer',
            parameters: {
              offer: { type: 'object' },
              market_data: { type: 'object' },
            },
          },
          {
            name: 'suggest_strategy',
            description: 'Suggest negotiation strategy',
            parameters: {
              negotiationType: { type: 'string' },
              objectives: { type: 'array' },
            },
          },
        ],
        capabilities: ['offer-analysis', 'strategy-suggestion', 'script-generation', 'progress-tracking'],
      },
      {
        id: 'workflow-automator-1',
        name: 'Workflow Automator',
        type: 'workflow-automator',
        systemPrompt: `You are a workflow automation expert. Your responsibilities include:
          - Automating repetitive tasks
          - Optimizing business processes
          - Managing workflows and pipelines
          - Monitoring automation health
          Focus on efficiency and error reduction.`,
        model: 'gpt-4',
        temperature: 0.5,
        maxTokens: 2000,
        tools: [
          {
            name: 'create_workflow',
            description: 'Create a new automation workflow',
            parameters: {
              name: { type: 'string' },
              triggers: { type: 'array' },
              actions: { type: 'array' },
            },
          },
          {
            name: 'execute_workflow',
            description: 'Execute a workflow',
            parameters: {
              workflowId: { type: 'string' },
              parameters: { type: 'object' },
            },
          },
        ],
        capabilities: ['workflow-creation', 'process-automation', 'task-scheduling', 'error-handling'],
      },
      {
        id: 'data-analyst-1',
        name: 'Data Analytics Agent',
        type: 'data-analyst',
        systemPrompt: `You are a data analytics specialist. Your expertise includes:
          - Data analysis and interpretation
          - Report generation
          - Trend identification
          - Predictive analytics
          - Data visualization recommendations
          Provide actionable insights from data.`,
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 2500,
        tools: [
          {
            name: 'analyze_data',
            description: 'Analyze provided data',
            parameters: {
              data: { type: 'array' },
              analysisType: { type: 'string' },
            },
          },
          {
            name: 'generate_report',
            description: 'Generate analytics report',
            parameters: {
              dataSource: { type: 'string' },
              reportType: { type: 'string' },
              timeframe: { type: 'string' },
            },
          },
        ],
        capabilities: ['data-analysis', 'report-generation', 'trend-analysis', 'predictive-modeling'],
      },
    ];

    defaultAgents.forEach(agent => {
      this.agents.set(agent.id, agent);
    });

    console.log(`[AIAgentService] Initialized ${defaultAgents.length} default agents`);
  }

  /**
   * Start a conversation with an AI agent
   */
  async startConversation(
    agentId: string,
    initialMessage?: string,
    metadata?: Record<string, any>
  ): Promise<ConversationContext | null> {
    try {
      const agent = this.agents.get(agentId);

      if (!agent) {
        console.error(`[AIAgentService] Agent not found: ${agentId}`);
        return null;
      }

      const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const conversation: ConversationContext = {
        sessionId,
        agentId,
        messages: [],
        metadata: metadata || {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      if (initialMessage) {
        conversation.messages.push({
          id: `msg-${Date.now()}`,
          role: 'user',
          content: initialMessage,
          timestamp: new Date(),
        });
      }

      this.conversations.set(sessionId, conversation);

      console.log(`[AIAgentService] Conversation started: ${sessionId} with agent ${agentId}`);
      this.emit('conversation:started', { sessionId, agentId });

      return conversation;
    } catch (error) {
      console.error('[AIAgentService] Failed to start conversation:', error);
      return null;
    }
  }

  /**
   * Send message to AI agent
   */
  async sendMessage(sessionId: string, userMessage: string): Promise<AgentResponse | null> {
    try {
      const conversation = this.conversations.get(sessionId);

      if (!conversation) {
        console.error(`[AIAgentService] Conversation not found: ${sessionId}`);
        return null;
      }

      const agent = this.agents.get(conversation.agentId);

      if (!agent) {
        console.error(`[AIAgentService] Agent not found: ${conversation.agentId}`);
        return null;
      }

      // Add user message to history
      const userMsg: Message = {
        id: `msg-${Date.now()}`,
        role: 'user',
        content: userMessage,
        timestamp: new Date(),
      };
      conversation.messages.push(userMsg);

      // Prepare messages for API call
      const messages = [
        { role: 'system', content: agent.systemPrompt },
        ...conversation.messages.map(msg => ({
          role: msg.role as 'user' | 'assistant' | 'system',
          content: msg.content,
        })),
      ];

      // Call AI API
      const response = await this.apiClient.post('/chat/completions', {
        model: agent.model,
        messages,
        temperature: agent.temperature,
        max_tokens: agent.maxTokens,
        tools: agent.tools.map(tool => ({
          type: 'function',
          function: {
            name: tool.name,
            description: tool.description,
            parameters: {
              type: 'object',
              properties: tool.parameters,
            },
          },
        })),
      });

      const aiMessage = response.data.choices?.[0]?.message?.content || '';
      const toolUse = response.data.choices?.[0]?.message?.tool_calls?.[0];

      // Add assistant message to history
      const assistantMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: aiMessage,
        timestamp: new Date(),
        metadata: toolUse ? { toolCall: toolUse } : undefined,
      };
      conversation.messages.push(assistantMsg);
      conversation.updatedAt = new Date();

      const agentResponse: AgentResponse = {
        message: aiMessage,
        confidence: 0.9, // Could be enhanced with model confidence scores
        action: toolUse?.function?.name,
        actionParams: toolUse?.function?.arguments
          ? JSON.parse(toolUse.function.arguments)
          : undefined,
      };

      console.log(`[AIAgentService] Message processed for session ${sessionId}`);
      this.emit('message:processed', { sessionId, response: agentResponse });

      return agentResponse;
    } catch (error) {
      console.error('[AIAgentService] Failed to process message:', error);
      return null;
    }
  }

  /**
   * Execute agent tool/action
   */
  async executeTool(agentId: string, toolName: string, parameters: any): Promise<any> {
    try {
      const agent = this.agents.get(agentId);

      if (!agent) {
        throw new Error(`Agent not found: ${agentId}`);
      }

      const tool = agent.tools.find(t => t.name === toolName);

      if (!tool) {
        throw new Error(`Tool not found: ${toolName}`);
      }

      if (tool.handler) {
        return await tool.handler(parameters);
      }

      console.log(`[AIAgentService] Tool executed: ${toolName} for agent ${agentId}`);
      this.emit('tool:executed', { agentId, toolName, parameters });

      return { success: true, data: null };
    } catch (error) {
      console.error('[AIAgentService] Tool execution failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Get agent configuration
   */
  getAgent(agentId: string): AgentConfig | null {
    return this.agents.get(agentId) || null;
  }

  /**
   * Get all available agents
   */
  getAllAgents(): AgentConfig[] {
    return Array.from(this.agents.values());
  }

  /**
   * Get agents by type
   */
  getAgentsByType(type: AgentType): AgentConfig[] {
    return Array.from(this.agents.values()).filter(agent => agent.type === type);
  }

  /**
   * Get conversation
   */
  getConversation(sessionId: string): ConversationContext | null {
    return this.conversations.get(sessionId) || null;
  }

  /**
   * End conversation
   */
  endConversation(sessionId: string): boolean {
    try {
      const conversation = this.conversations.get(sessionId);

      if (!conversation) {
        return false;
      }

      console.log(`[AIAgentService] Conversation ended: ${sessionId}`);
      this.emit('conversation:ended', { sessionId });

      // Keep conversation in history but mark as ended
      conversation.updatedAt = new Date();

      return true;
    } catch (error) {
      console.error('[AIAgentService] Failed to end conversation:', error);
      return false;
    }
  }

  /**
   * Register custom agent
   */
  registerAgent(config: AgentConfig): boolean {
    try {
      this.agents.set(config.id, config);
      console.log(`[AIAgentService] Custom agent registered: ${config.id}`);
      this.emit('agent:registered', config);
      return true;
    } catch (error) {
      console.error('[AIAgentService] Failed to register agent:', error);
      return false;
    }
  }

  /**
   * Get agent status
   */
  getAgentStatus(agentId: string): AgentStatus {
    const agent = this.agents.get(agentId);

    if (!agent) {
      return 'offline';
    }

    // Check if API is accessible
    // This is a simplified implementation
    return 'idle';
  }

  /**
   * Get conversation history
   */
  getConversationHistory(sessionId: string): Message[] {
    const conversation = this.conversations.get(sessionId);
    return conversation?.messages || [];
  }
}

export const aiAgentService = new AIAgentService();
