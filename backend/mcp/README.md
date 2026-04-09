# Kaytx MCP Server

**Enterprise AI Workforce for Claude Desktop, Cursor, and other MCP clients**

The Kaytx MCP Server exposes your 80+ AI agents as MCP (Model Context Protocol) tools, allowing Claude Desktop, Cursor, and other MCP-compatible applications to leverage your enterprise AI workforce.

## What is MCP?

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io) is an open standard that enables AI applications to connect to external data sources and tools. Kaytx MCP Server makes your AI agents available as MCP tools, effectively turning Claude or Cursor into an interface for your enterprise AI workforce.

## Features

- **80+ Agent Tools**: Access all your Kaytx AI employees and agents as MCP tools
- **Hierarchical Agent Access**: Main agents, sub-agents, and specialized task agents
- **A2A Consulting**: Agents can consult each other through MCP
- **Multiple Transports**: Support for stdio (Claude Desktop) and SSE (web-based clients)
- **Enterprise Security**: Full audit trails and secure API access
- **ROI Tracking**: Cost savings and efficiency metrics for all agent interactions

## Quick Start

### Installation

```bash
npm install -g @kaytx/mcp-server
```

### Configuration

Set environment variables:

```bash
export KAYTX_API_KEY="your-api-key"
export KAYTX_ORG_ID="your-organization-id"
export KAYTX_API_URL="https://api.kaytx.ai"  # Optional, uses production by default
```

### Run the Server

```bash
# For Claude Desktop (stdio transport)
kaytx-mcp-server

# For web-based clients (SSE transport)
kaytx-mcp-server --sse --port 3001
```

## Client Configuration

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
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
```

### Cursor

Add to `~/.cursor/mcp.json`:

```json
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
```

### Claude Code

```bash
# Add to Claude Code
claude mcp add kaytx npx -y @kaytx/mcp-server

# Configure with your credentials
claude config set mcp.kaytx.env.KAYTX_API_KEY your-api-key
claude config set mcp.kaytx.env.KAYTX_ORG_ID your-org-id
```

## Available Agent Tools

The MCP server exposes all your Kaytx agents as tools:

### Customer Experience AI
- `ai_receptionist` - Front desk & call management
- `ai_customer_support_agent` - Tier 1 & 2 support
- `ai_ticket_resolution_agent` - Automated ticket solving
- `ai_complaint_handling_agent` - Complaint resolution
- `ai_retention_specialist` - Customer retention & success

### Sales & Revenue AI
- `ai_sales_rep` - SDR + Junior AE
- `ai_sales_executive` - Full sales cycle manager
- `ai_lead_development_rep` - Lead generation specialist
- `ai_crm_assistant` - CRM management & automation
- `ai_negotiator` - Deal negotiation expert

### Marketing & Growth AI
- `ai_cmo` - Chief Marketing Officer AI
- `ai_campaign_optimizer` - Campaign performance expert
- `ai_social_media_manager` - Social media strategy & execution
- `ai_content_creator` - Content marketing specialist

### Operations & Management AI
- `ai_product_manager` - Product strategy & roadmap
- `ai_operations_manager` - Ops manager & team lead
- `ai_manager` - The "Most Dangerous One" - execution enforcer
- `ai_recruiter` - Talent acquisition specialist

### Data & Intelligence AI
- `ai_data_analyst_agent` - Analytics & insights
- `ai_competitive_intelligence_agent` - Market & competitor analysis
- `ai_sales_data_analyst` - Sales intelligence

## Usage Examples

### In Claude Desktop

Once configured, you can ask Claude:

```
"Use the AI Sales Rep to qualify this lead: {lead information}"

"Ask the AI Customer Support Agent to draft a response to this ticket"

"Have the AI CMO analyze our Q3 marketing performance"

"Get the AI Data Analyst to create a churn prediction report"
```

### In Cursor

Use in Cursor's AI chat:

```
"@kaytx Use the AI Product Manager to prioritize these feature requests"

"@kaytx Ask the AI Operations Manager to optimize our deployment workflow"
```

## Advanced Configuration

### Category Filtering

Limit which agent categories are exposed:

```json
{
  "mcpServers": {
    "kaytx": {
      "command": "kaytx-mcp-server",
      "env": {
        "KAYTX_API_KEY": "your-api-key",
        "KAYTX_ORG_ID": "your-org-id"
      },
      "args": [
        "--categories", "sales_revenue,marketing_growth"
      ]
    }
  }
}
```

### Custom API Endpoint

For on-premise deployments:

```bash
export KAYTX_API_URL="https://your-kaytx-instance.company.com"
kaytx-mcp-server
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `KAYTX_API_KEY` | Yes | - | Your Kaytx API key |
| `KAYTX_ORG_ID` | Yes | - | Your organization ID |
| `KAYTX_API_URL` | No | `https://api.kaytx.ai` | Kaytx API endpoint |
| `MCP_TRANSPORT` | No | `stdio` | Transport type: `stdio` or `sse` |
| `MCP_SSE_PORT` | No | `3001` | Port for SSE transport |

## Command Line Options

```
kaytx-mcp-server [options]

Options:
  -h, --help       Show help message
  -t, --transport  Transport type: 'stdio' or 'sse'
  -p, --port       Port for SSE transport (default: 3001)
  --sse            Use SSE transport (shorthand)
```

## API Reference

### Tool Schema

Each agent is exposed as an MCP tool with the following schema:

```json
{
  "name": "ai_sales_rep",
  "description": "SDR + Junior AE - Prospects, qualifies leads...",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "The task or question for AI Sales Rep"
      },
      "context": {
        "type": "object",
        "description": "Additional context",
        "properties": {
          "userId": { "type": "string" },
          "organizationId": { "type": "string" },
          "previousMessages": { "type": "array" }
        }
      },
      "options": {
        "type": "object",
        "properties": {
          "streamResponse": { "type": "boolean", "default": false },
          "maxTokens": { "type": "number", "default": 4096 },
          "temperature": { "type": "number", "default": 0.7 }
        }
      }
    },
    "required": ["query"]
  }
}
```

### Response Format

```json
{
  "content": [
    {
      "type": "text",
      "text": "Agent response here..."
    }
  ]
}
```

## Troubleshooting

### Server Not Starting

1. Verify API key and org ID are set correctly
2. Check network connectivity to Kaytx API
3. Review logs with `DEBUG=kaytx* kaytx-mcp-server`

### Agents Not Available

1. Ensure your organization has agents configured
2. Check that agents are active in Kaytx dashboard
3. Verify organization ID matches your subscription

### Claude/Cursor Can't Connect

1. Restart Claude/Cursor after configuration changes
2. Check MCP server logs for connection errors
3. Verify the command path is correct (`which kaytx-mcp-server`)

## Security

- API keys are never logged or exposed
- All communications use HTTPS
- Audit trails for all agent interactions
- PII encryption for sensitive data
- RBAC controls for agent access

## Support

- **Documentation**: https://docs.kaytx.ai/mcp
- **Support**: support@kaytx.ai
- **Issues**: https://github.com/kaytx/kaytx-mcp-server/issues

## License

MIT License - see LICENSE file for details

---

**Made with ❤️ by Kaytx** - Enterprise AI Workforce Platform
