#!/usr/bin/env node
/**
 * Kaytx MCP Server CLI
 * Entry point for running the Kaytx MCP Server
 * 
 * Usage:
 *   kaytx-mcp-server [options]
 * 
 * Environment Variables:
 *   KAYTX_API_KEY       - API key for Kaytx API
 *   KAYTX_API_URL       - Kaytx API endpoint (default: https://api.kaytx.ai)
 *   KAYTX_ORG_ID        - Organization ID for agent access
 *   MCP_TRANSPORT        - Transport type: 'stdio' or 'sse' (default: stdio)
 *   MCP_SSE_PORT         - Port for SSE transport (default: 3001)
 */

import { KaytxMCPServer, defaultMCPServerConfig } from '../services/kaytx-mcp-server.js';
import { createLogger } from '../lib/production-logger.js';

const logger = createLogger('KaytxMCPCLI');

/**
 * Parse command line arguments
 */
function parseArgs(): { transport: 'stdio' | 'sse'; port?: number; help: boolean } {
  const args = process.argv.slice(2);
  
  let transport: 'stdio' | 'sse' = (process.env.MCP_TRANSPORT as 'stdio' | 'sse') || 'stdio';
  let port: number | undefined = process.env.MCP_SSE_PORT ? parseInt(process.env.MCP_SSE_PORT) : 3001;
  let help = false;

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--help':
      case '-h':
        help = true;
        break;
      case '--transport':
      case '-t':
        const t = args[++i];
        if (t === 'stdio' || t === 'sse') {
          transport = t;
        }
        break;
      case '--port':
      case '-p':
        port = parseInt(args[++i]);
        break;
      case '--sse':
        transport = 'sse';
        break;
    }
  }

  return { transport, port, help };
}

/**
 * Print help message
 */
function printHelp(): void {
  console.log(`
Kaytx MCP Server - Enterprise AI Workforce for Claude Desktop, Cursor, and more

Usage: kaytx-mcp-server [options]

Options:
  -h, --help           Show this help message
  -t, --transport      Transport type: 'stdio' or 'sse' (default: stdio)
  -p, --port           Port for SSE transport (default: 3001)
  --sse                Use SSE transport (shorthand)

Environment Variables:
  KAYTX_API_KEY       Required. API key for Kaytx API
  KAYTX_API_URL       Optional. Kaytx API endpoint (default: https://api.kaytx.ai)
  KAYTX_ORG_ID        Required. Organization ID for agent access
  MCP_TRANSPORT        Optional. Transport type (stdio|sse)
  MCP_SSE_PORT         Optional. Port for SSE transport

Examples:
  # Run with stdio transport (for Claude Desktop)
  KAYTX_API_KEY=xxx KAYTX_ORG_ID=xxx kaytx-mcp-server

  # Run with SSE transport
  KAYTX_API_KEY=xxx KAYTX_ORG_ID=xxx kaytx-mcp-server --sse --port 3001

  # Run with explicit transport
  KAYTX_API_KEY=xxx KAYTX_ORG_ID=xxx kaytx-mcp-server --transport sse --port 3001

Claude Desktop Configuration:
  Add to ~/Library/Application Support/Claude/claude_desktop_config.json:
  {
    "mcpServers": {
      "kaytx": {
        "command": "kaytx-mcp-server",
        "env": {
          "KAYTX_API_KEY": "your-api-key",
          "KAYTX_ORG_ID": "your-org-id"
        }
      }
    }
  }

Cursor Configuration:
  Add to ~/.cursor/mcp.json:
  {
    "mcpServers": {
      "kaytx": {
        "command": "kaytx-mcp-server",
        "env": {
          "KAYTX_API_KEY": "your-api-key",
          "KAYTX_ORG_ID": "your-org-id"
        }
      }
    }
  }
`);
}

/**
 * Validate environment configuration
 */
function validateConfig(): boolean {
  const missing: string[] = [];

  if (!process.env.KAYTX_API_KEY) {
    missing.push('KAYTX_API_KEY');
  }

  if (!process.env.KAYTX_ORG_ID) {
    missing.push('KAYTX_ORG_ID');
  }

  if (missing.length > 0) {
    console.error('Error: Missing required environment variables:');
    missing.forEach((v) => console.error(`  - ${v}`));
    console.error('\nRun with --help for configuration instructions.');
    return false;
  }

  return true;
}

/**
 * Main entry point
 */
async function main(): Promise<void> {
  const args = parseArgs();

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  if (!validateConfig()) {
    process.exit(1);
  }

  // Update config from environment
  const config = {
    ...defaultMCPServerConfig,
    apiKey: process.env.KAYTX_API_KEY!,
    apiEndpoint: process.env.KAYTX_API_URL || defaultMCPServerConfig.apiEndpoint,
    organizationId: process.env.KAYTX_ORG_ID!,
    transport: args.transport,
    ssePort: args.port,
  };

  logger.info('Starting Kaytx MCP Server...');
  logger.info(`Transport: ${config.transport}`);
  logger.info(`API Endpoint: ${config.apiEndpoint}`);
  logger.info(`Organization: ${config.organizationId}`);

  const server = new KaytxMCPServer(config);

  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    logger.info('Shutting down...');
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    logger.info('Shutting down...');
    process.exit(0);
  });

  // Start server
  try {
    await server.start();
    
    const stats = server.getStats();
    logger.info(`Server ready with ${stats.registeredTools} agent tools`);
    
    // Keep process alive
    await new Promise(() => {});
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Run main
main().catch((error) => {
  logger.error('Unhandled error:', error);
  process.exit(1);
});
