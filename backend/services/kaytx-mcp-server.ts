/**
 * Kaytx MCP Server - Model Context Protocol Implementation
 * 
 * Exposes Kaytx AI Agents as MCP tools for Claude Desktop, Cursor, and other MCP clients.
 * Makes Kaytx the "enterprise brain" for personal AI assistants.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types';
import { createLogger } from '../lib/production-logger.js';
import { logAudit } from '../lib/audit.js';
import { AIAgentService, AgentConfig, AgentTool } from './ai-agent-service.js';
import { aiEmployees } from '../../constants/aiEmployees.js';
import { customerExperienceSubAgents, salesRevenueSubAgents, marketingGrowthSubAgents } from '../../constants/aiEmployeesEnhanced.js';

const logger = createLogger('KaytxMCPServer');

/**
 * MCP Tool Definition for a Kaytx Agent
 */
export interface KaytxAgentTool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
  agentId: string;
  agentCategory: string;
  agentType: 'employee' | 'agent' | 'subagent';
  capabilities: string[];
}

/**
 * MCP Resource Definition for Agent Information
 */
export interface KaytxAgentResource {
  uri: string;
  name: string;
  description: string;
  mimeType: string;
  agentId?: string;
}

/**
 * Kaytx MCP Server Configuration
 */
export interface KaytxMCPServerConfig {
  name: string;
  version: string;
  apiEndpoint: string;
  apiKey: string;
  organizationId: string;
  transport: 'stdio' | 'sse';
  ssePort?: number;
  enableAllAgents: boolean;
  enabledAgentCategories?: string[];
  maxConcurrentCalls: number;
  requestTimeout: number;
}

/**
 * Default MCP Server Configuration
 */
export const defaultMCPServerConfig: KaytxMCPServerConfig = {
  name: 'kaytx-enterprise-ai',
  version: '2.0.0',
  apiEndpoint: process.env.KAYTX_API_URL || 'https://api.kaytx.ai',
  apiKey: process.env.KAYTX_API_KEY || '',
  organizationId: process.env.KAYTX_ORG_ID || '',
  transport: 'stdio',
  ssePort: 3001,
  enableAllAgents: true,
  enabledAgentCategories: [
    'customer_experience',
    'sales_revenue',
    'marketing_growth',
    'operations_management',
    'data_intelligence',
  ],
  maxConcurrentCalls: 10,
  requestTimeout: 60000,
};

/**
 * Kaytx MCP Server - Enterprise AI Workforce exposed via MCP
 */
export class KaytxMCPServer {
  private server: Server;
  private config: KaytxMCPServerConfig;
  private agentTools: Map<string, KaytxAgentTool> = new Map();
  private agentResources: Map<string, KaytxAgentResource> = new Map();
  private aiAgentService: AIAgentService;
  private activeCalls: number = 0;

  constructor(config: Partial<KaytxMCPServerConfig> = {}) {
    this.config = { ...defaultMCPServerConfig, ...config };
    this.aiAgentService = new AIAgentService();

    this.server = new Server(
      {
        name: this.config.name,
        version: this.config.version,
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupResourceHandlers();
    this.registerAllAgents();

    logger.info(`Kaytx MCP Server initialized: ${this.config.name} v${this.config.version}`);
  }

  /**
   * Register all Kaytx agents as MCP tools
   */
  private registerAllAgents(): void {
    // Register AI Employees
    aiEmployees.forEach((employee) => {
      if (this.shouldRegisterAgent(employee.category)) {
        this.registerAgentAsTool(employee, 'employee');
      }
    });

    // Register Customer Experience Sub-agents
    customerExperienceSubAgents.forEach((agent) => {
      if (this.shouldRegisterAgent(agent.category)) {
        this.registerAgentAsTool(agent, 'subagent');
      }
    });

    // Register Sales & Revenue Sub-agents
    salesRevenueSubAgents.forEach((agent) => {
      if (this.shouldRegisterAgent(agent.category)) {
        this.registerAgentAsTool(agent, 'subagent');
      }
    });

    // Register Marketing & Growth Sub-agents
    marketingGrowthSubAgents.forEach((agent) => {
      if (this.shouldRegisterAgent(agent.category)) {
        this.registerAgentAsTool(agent, 'subagent');
      }
    });

    logger.info(`Registered ${this.agentTools.size} agents as MCP tools`);
  }

  /**
   * Check if agent category should be registered
   */
  private shouldRegisterAgent(category: string): boolean {
    if (this.config.enableAllAgents) return true;
    return this.config.enabledAgentCategories?.includes(category) ?? false;
  }

  /**
   * Register a single agent as an MCP tool
   */
  private registerAgentAsTool(
    agent: any,
    agentType: 'employee' | 'agent' | 'subagent'
  ): void {
    const toolName = this.sanitizeToolName(agent.name);
    
    const tool: KaytxAgentTool = {
      name: toolName,
      description: this.generateToolDescription(agent),
      inputSchema: this.generateInputSchema(agent),
      agentId: agent.id,
      agentCategory: agent.category,
      agentType,
      capabilities: agent.capabilities || [],
    };

    this.agentTools.set(toolName, tool);

    // Register corresponding resource
    const resource: KaytxAgentResource = {
      uri: `kaytx://agents/${agent.id}`,
      name: `${agent.name} Information`,
      description: `Details and capabilities of ${agent.name}`,
      mimeType: 'application/json',
      agentId: agent.id,
    };

    this.agentResources.set(resource.uri, resource);

    logger.debug(`Registered agent tool: ${toolName} (${agent.id})`);
  }

  /**
   * Sanitize agent name for use as MCP tool name
   */
  private sanitizeToolName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 64);
  }

  /**
   * Generate tool description from agent info
   */
  private generateToolDescription(agent: any): string {
    return `
${agent.description}

**Role:** ${agent.title}
**Type:** ${agent.type}
**Category:** ${agent.category}
**Replaces:** ${agent.replacesRole || 'N/A'}

**Capabilities:**
${(agent.capabilities || []).slice(0, 5).map((cap: string) => `- ${cap}`).join('\n')}

**Efficiency:** ${agent.efficiency}
**Human Cost:** ${agent.humanCost}
**AI Cost:** ${agent.aiCost}
    `.trim();
  }

  /**
   * Generate input schema for agent tool
   */
  private generateInputSchema(agent: any): KaytxAgentTool['inputSchema'] {
    return {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: `The task or question for ${agent.name}`,
        },
        context: {
          type: 'object',
          description: 'Additional context for the agent',
          properties: {
            userId: { type: 'string' },
            organizationId: { type: 'string' },
            sessionId: { type: 'string' },
            previousMessages: {
              type: 'array',
              items: { type: 'string' },
            },
          },
        },
        options: {
          type: 'object',
          description: 'Execution options',
          properties: {
            streamResponse: { type: 'boolean', default: false },
            maxTokens: { type: 'number', default: 4096 },
            temperature: { type: 'number', default: 0.7 },
            requireApproval: { type: 'boolean', default: false },
          },
        },
      },
      required: ['query'],
    };
  }

  /**
   * Setup MCP tool handlers
   */
  private setupToolHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: Array.from(this.agentTools.values()).map((tool) => ({
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema,
        })),
      };
    });

    // Execute tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      
      if (!this.agentTools.has(name)) {
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${name}`
        );
      }

      return this.executeAgentTool(name, args);
    });
  }

  /**
   * Setup MCP resource handlers
   */
  private setupResourceHandlers(): void {
    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: Array.from(this.agentResources.values()).map((resource) => ({
          uri: resource.uri,
          name: resource.name,
          description: resource.description,
          mimeType: resource.mimeType,
        })),
      };
    });

    // Read resource content
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;
      
      if (!this.agentResources.has(uri)) {
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Unknown resource: ${uri}`
        );
      }

      return this.getAgentResourceContent(uri);
    });
  }

  /**
   * Execute an agent tool call
   */
  private async executeAgentTool(
    toolName: string,
    args: any
  ): Promise<{ content: { type: string; text: string }[]; isError?: boolean }> {
    const tool = this.agentTools.get(toolName);
    if (!tool) {
      throw new McpError(ErrorCode.InvalidRequest, `Tool not found: ${toolName}`);
    }

    if (this.activeCalls >= this.config.maxConcurrentCalls) {
      throw new McpError(ErrorCode.InvalidRequest, 'Max concurrent calls exceeded');
    }

    this.activeCalls++;
    const startTime = Date.now();

    try {
      logger.info(`Executing agent tool: ${toolName} (${tool.agentId})`);

      // Log audit
      await logAudit({
        userId: args.context?.userId || 'mcp-client',
        organizationId: this.config.organizationId,
        action: 'mcp_tool_execute',
        resource: 'ai_agent',
        resourceId: tool.agentId,
        details: {
          toolName,
          query: args.query?.substring(0, 200),
          category: tool.agentCategory,
        },
      });

      // Call the AI Agent Service
      const result = await this.callAgentService(tool, args);

      const duration = Date.now() - startTime;
      logger.info(`Agent tool completed: ${toolName} (${duration}ms)`);

      return {
        content: [
          {
            type: 'text',
            text: result,
          },
        ],
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      logger.error(`Agent tool failed: ${toolName} (${duration}ms)`, error);

      // Log error audit
      await logAudit({
        userId: args.context?.userId || 'mcp-client',
        organizationId: this.config.organizationId,
        action: 'mcp_tool_error',
        resource: 'ai_agent',
        resourceId: tool.agentId,
        details: {
          toolName,
          error: (error as Error).message,
        },
      });

      return {
        content: [
          {
            type: 'text',
            text: `Error executing ${toolName}: ${(error as Error).message}`,
          },
        ],
        isError: true,
      };
    } finally {
      this.activeCalls--;
    }
  }

  /**
   * Call the AI Agent Service
   */
  private async callAgentService(tool: KaytxAgentTool, args: any): Promise<string> {
    // Build the request to AI Agent Service
    const agentConfig: AgentConfig = {
      id: tool.agentId,
      name: tool.name,
      type: tool.agentType,
      capabilities: tool.capabilities,
      systemPrompt: this.buildSystemPrompt(tool),
      temperature: args.options?.temperature || 0.7,
      maxTokens: args.options?.maxTokens || 4096,
    };

    // Execute agent consultation
    const result = await this.aiAgentService.consultAgent(
      this.config.organizationId,
      args.context?.userId || 'mcp-client',
      {
        fromAgentId: 'mcp-client',
        query: args.query,
        targetAgentId: tool.agentId,
        context: {
          ...args.context,
          capabilities: tool.capabilities,
          category: tool.agentCategory,
        },
      }
    );

    return result.response;
  }

  /**
   * Build system prompt for agent
   */
  private buildSystemPrompt(tool: KaytxAgentTool): string {
    return `You are ${tool.name}, an AI ${tool.agentType} specializing in ${tool.agentCategory}.

Your capabilities include:
${tool.capabilities.map((cap) => `- ${cap}`).join('\n')}

Execute the user's request professionally and efficiently. If you need to escalate or consult with another agent, indicate this clearly.`;
  }

  /**
   * Get agent resource content
   */
  private async getAgentResourceContent(uri: string): Promise<{ contents: { uri: string; mimeType: string; text: string }[] }> {
    const resource = this.agentResources.get(uri);
    if (!resource || !resource.agentId) {
      throw new McpError(ErrorCode.InvalidRequest, 'Resource not found');
    }

    const tool = Array.from(this.agentTools.values()).find(
      (t) => t.agentId === resource.agentId
    );

    if (!tool) {
      throw new McpError(ErrorCode.InvalidRequest, 'Agent not found');
    }

    const content = {
      id: tool.agentId,
      name: tool.name,
      category: tool.agentCategory,
      type: tool.agentType,
      capabilities: tool.capabilities,
      description: tool.description,
      inputSchema: tool.inputSchema,
    };

    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(content, null, 2),
        },
      ],
    };
  }

  /**
   * Start the MCP server with stdio transport
   */
  async startStdio(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    logger.info('Kaytx MCP Server running on stdio transport');
  }

  /**
   * Start the MCP server with SSE transport
   */
  async startSSE(port: number = this.config.ssePort || 3001): Promise<void> {
    import('express').then(({ default: express }) => {
      const app = express();

      app.get('/sse', async (req, res) => {
        const transport = new SSEServerTransport('/messages', res);
        await this.server.connect(transport);
      });

      app.post('/messages', async (req, res) => {
        // Handle messages - SSE transport manages this internally
        res.status(200).send('OK');
      });

      app.listen(port, () => {
        logger.info(`Kaytx MCP Server SSE transport running on port ${port}`);
      });
    });
  }

  /**
   * Start server with configured transport
   */
  async start(): Promise<void> {
    if (this.config.transport === 'sse') {
      await this.startSSE();
    } else {
      await this.startStdio();
    }
  }

  /**
   * Get server statistics
   */
  getStats(): {
    registeredTools: number;
    registeredResources: number;
    activeCalls: number;
    maxConcurrentCalls: number;
  } {
    return {
      registeredTools: this.agentTools.size,
      registeredResources: this.agentResources.size,
      activeCalls: this.activeCalls,
      maxConcurrentCalls: this.config.maxConcurrentCalls,
    };
  }
}

export default KaytxMCPServer;
