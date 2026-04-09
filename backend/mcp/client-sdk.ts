/**
 * Kaytx MCP Client SDK
 * 
 * Client-side SDK for connecting to Kaytx MCP Server
 * Enables applications to interact with Kaytx AI agents via MCP
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';
import {
  ListToolsResult,
  CallToolResult,
  ListResourcesResult,
  ReadResourceResult,
} from '@modelcontextprotocol/sdk/types.js';

export interface KaytxMCPClientConfig {
  transport: 'stdio' | 'sse';
  // For stdio transport
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  // For SSE transport
  url?: string;
}

export interface AgentTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export interface AgentResource {
  uri: string;
  name: string;
  description: string;
  mimeType: string;
}

export interface AgentExecutionOptions {
  streamResponse?: boolean;
  maxTokens?: number;
  temperature?: number;
  requireApproval?: boolean;
}

export interface AgentExecutionContext {
  userId?: string;
  organizationId?: string;
  sessionId?: string;
  previousMessages?: string[];
}

export interface AgentExecutionRequest {
  query: string;
  context?: AgentExecutionContext;
  options?: AgentExecutionOptions;
}

export interface AgentExecutionResponse {
  text: string;
  isError?: boolean;
}

/**
 * Kaytx MCP Client
 * 
 * Client for interacting with Kaytx AI agents via MCP protocol
 */
export class KaytxMCPClient {
  private client: Client;
  private transport: StdioClientTransport | SSEClientTransport | null = null;
  private config: KaytxMCPClientConfig;

  constructor(config: KaytxMCPClientConfig) {
    this.config = config;
    
    this.client = new Client(
      {
        name: 'kaytx-mcp-client',
        version: '2.0.0',
      },
      {
        capabilities: {},
      }
    );
  }

  /**
   * Connect to MCP server
   */
  async connect(): Promise<void> {
    if (this.config.transport === 'stdio') {
      this.transport = new StdioClientTransport({
        command: this.config.command || 'kaytx-mcp-server',
        args: this.config.args || [],
        env: this.config.env || {},
      });
    } else {
      this.transport = new SSEClientTransport(
        new URL(this.config.url || 'http://localhost:3001/sse')
      );
    }

    await this.client.connect(this.transport);
  }

  /**
   * Disconnect from MCP server
   */
  async disconnect(): Promise<void> {
    await this.client.close();
    this.transport = null;
  }

  /**
   * List all available agent tools
   */
  async listAgentTools(): Promise<AgentTool[]> {
    const result: ListToolsResult = await this.client.listTools();
    
    return result.tools.map((tool) => ({
      name: tool.name,
      description: tool.description || '',
      inputSchema: tool.inputSchema as Record<string, unknown>,
    }));
  }

  /**
   * Execute an agent tool
   */
  async executeAgent(
    agentName: string,
    request: AgentExecutionRequest
  ): Promise<AgentExecutionResponse> {
    const result: CallToolResult = await this.client.callTool({
      name: agentName,
      arguments: {
        query: request.query,
        context: request.context || {},
        options: request.options || {},
      },
    });

    const textContent = result.content.find((c) => c.type === 'text');
    
    return {
      text: textContent?.text || '',
      isError: result.isError,
    };
  }

  /**
   * List all available agent resources
   */
  async listAgentResources(): Promise<AgentResource[]> {
    const result: ListResourcesResult = await this.client.listResources();
    
    return result.resources.map((resource) => ({
      uri: resource.uri,
      name: resource.name,
      description: resource.description || '',
      mimeType: resource.mimeType || 'application/json',
    }));
  }

  /**
   * Get agent resource content
   */
  async getAgentResource(uri: string): Promise<string> {
    const result: ReadResourceResult = await this.client.readResource({
      uri,
    });

    const textContent = result.contents.find(
      (c): c is { uri: string; mimeType: string; text: string } => 
        'text' in c && typeof c.text === 'string'
    );

    return textContent?.text || '';
  }

  /**
   * Quick execute - list tools and execute in one call
   */
  async quickExecute(
    query: string,
    agentName?: string,
    options?: AgentExecutionOptions,
    context?: AgentExecutionContext
  ): Promise<AgentExecutionResponse> {
    // If agent name not specified, find best matching agent
    if (!agentName) {
      const tools = await this.listAgentTools();
      
      // Simple keyword matching - in production, use embeddings
      const keywords = query.toLowerCase().split(' ');
      const scored = tools.map((tool) => {
        const score = keywords.filter((kw) => 
          tool.name.includes(kw) || 
          tool.description.toLowerCase().includes(kw)
        ).length;
        return { tool, score };
      });

      scored.sort((a, b) => b.score - a.score);
      
      if (scored.length === 0 || scored[0].score === 0) {
        throw new Error('No matching agent found for query');
      }

      agentName = scored[0].tool.name;
    }

    return this.executeAgent(agentName, {
      query,
      options,
      context,
    });
  }
}

export default KaytxMCPClient;
