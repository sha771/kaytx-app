# Agents Brain System Documentation

## Overview

The Agents Brain System is a structured knowledge base system inspired by [LLM Wiki](https://github.com/nashsu/llm_wiki) and [Obsidian Wiki](https://github.com/ar9av/obsidian-wiki). It allows AI agents and employees to scan raw data once, create a structured brain, and then read only the structured version to save tokens.

## Architecture

### Three-Layer Architecture

1. **Raw Sources** (Immutable) - Original documents and data files
2. **Wiki** (LLM-generated) - Structured, analyzed knowledge pages
3. **Schema** (Rules & Config) - Metadata, relationships, and organization

### Core Components

- **BrainSystem** (`lib/agents-brain/index.ts`) - Main orchestrator
- **BrainStorage** (`lib/agents-brain/storage.ts`) - File system operations
- **BrainIngestion** (`lib/agents-brain/ingestion.ts`) - Data processing with LLM
- **BrainQuery** (`lib/agents-brain/query.ts`) - Search and retrieval
- **BrainLLMClient** (`lib/agents-brain/llm-client.ts`) - LLM integration
- **AgentBrainManager** (`lib/agents-brain/agent-brain-manager.ts`) - Multi-agent management

## Features

### Token Savings

- Raw files are scanned once and converted to structured wiki pages
- AI agents query the structured brain instead of reading raw files
- Estimated token savings: ~90% reduction (raw files are ~10x larger than structured wiki)

### Per-Agent Brains

- Each AI agent can have its own isolated brain
- Shared brain for common knowledge
- Agent-specific brains for specialized knowledge

### Automatic Ingestion

- Two-Step Chain-of-Thought Ingest:
  1. Analyze source with LLM
  2. Generate wiki pages from analysis
- Incremental updates (only processes changed files)
- Checksum-based change detection

### Knowledge Extraction

- Key concepts and entities
- Categories and tags
- Related concepts/topics
- Important claims and facts
- Confidence scoring

## Configuration

### Environment Variables

Add these to your `.env` file:

```bash
# LLM Provider Configuration
BRAIN_LLM_PROVIDER=openai  # openai, anthropic, gemini, groq
BRAIN_LLM_MODEL=gpt-4o-mini
BRAIN_ENABLE_AUTO_INGEST=true
BRAIN_AUTO_INGEST_INTERVAL=3600  # seconds
BRAIN_MAX_CONTEXT_WINDOW=128000
BRAIN_ENABLE_SEMANTIC_SEARCH=true

# API Keys (from existing config)
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
```

### Directory Structure

```
/agents-brain/
├── raw/                    # Raw source files
├── wiki/                   # Generated wiki pages
├── schema/                 # Schema and rules
├── index.md               # Content catalog
├── .manifest.json         # Source tracking
├── log.md                 # Operation log
└── agents/                # Per-agent brains
    ├── {agent-id}/
    │   ├── raw/
    │   ├── wiki/
    │   ├── schema/
    │   ├── index.md
    │   ├── .manifest.json
    │   └── log.md
```

## Usage

### React Hook

```typescript
import { useAgentBrain } from '@/hooks/useAgentBrain';

function MyAgentComponent({ agentId }: { agentId: string }) {
  const {
    isInitialized,
    statistics,
    query,
    initialize,
    ingest,
    getTokenSavings,
  } = useAgentBrain(agentId);

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  const handleQuery = async () => {
    const results = await query('marketing strategy', { limit: 5 });
    console.log('Found pages:', results.pages);
    console.log('Token savings:', results.estimatedTokenSavings);
  };

  return (
    <div>
      <button onClick={handleQuery}>Query Brain</button>
      <p>Token Savings: {getTokenSavings()}</p>
    </div>
  );
}
```

### Backend API

```typescript
import { api } from '@/lib/trpc';

// Initialize brain for an agent
await api.agentsBrain.initializeAgentBrain.mutate({
  agentId: 'marketing-agent-1',
  agentType: 'marketing',
  department: 'marketing',
  autoInitialize: true,
  dataSources: ['/agents-brain/raw/marketing'],
  enableAutoIngest: false,
});

// Query the brain
const results = await api.agentsBrain.query.mutate({
  query: 'campaign optimization',
  limit: 10,
  minRelevance: 0.5,
  agentId: 'marketing-agent-1',
});

// Get statistics
const stats = await api.agentsBrain.getStatistics.query({
  agentId: 'marketing-agent-1',
});
```

### Direct Brain System Usage

```typescript
import { BrainSystem } from '@/lib/agents-brain';
import { BrainLLMClient } from '@/lib/agents-brain/llm-client';

// Create LLM client
const llmClient = BrainLLMClient.fromEnvironment();

// Create brain system for an agent
const brain = new BrainSystem(undefined, 'marketing-agent-1', llmClient);

// Initialize
await brain.initialize();

// Add raw sources
await brain.addRawSource('campaign-strategy.md', content);

// Ingest sources
await brain.ingest();

// Query the brain
const results = await brain.query('marketing strategy');

// Get statistics
const stats = await brain.getStatistics();
console.log('Token savings:', stats.tokenSavings);
```

### Agent Brain Manager

```typescript
import { AgentBrainManager } from '@/lib/agents-brain/agent-brain-manager';

const manager = AgentBrainManager.getInstance();

// Initialize multiple agents
await manager.initializeMultipleAgents([
  {
    agentId: 'marketing-agent-1',
    agentType: 'marketing',
    department: 'marketing',
    autoInitialize: true,
    dataSources: ['/agents-brain/raw/marketing'],
    enableAutoIngest: true,
    ingestInterval: 3600,
  },
  {
    agentId: 'sales-agent-1',
    agentType: 'sales',
    department: 'sales',
    autoInitialize: true,
    dataSources: ['/agents-brain/raw/sales'],
    enableAutoIngest: true,
    ingestInterval: 3600,
  },
]);

// Get all statistics
const allStats = await manager.getAllAgentStatistics();

// Stop auto-ingest for specific agent
manager.stopAutoIngest('marketing-agent-1');
```

## API Endpoints

### Brain Operations

- `initialize` - Initialize brain system
- `ingest` - Ingest raw sources into brain
- `query` - Query brain for relevant information
- `searchByTag` - Search brain by tag
- `searchByCategory` - Search brain by category
- `getPage` - Get specific page by ID
- `getAllPages` - Get all wiki pages
- `getRelatedPages` - Get related pages
- `getStatistics` - Get brain statistics
- `getManifest` - Get brain manifest
- `getIndex` - Get brain index
- `getLog` - Get operation log
- `addRawSource` - Add raw source file
- `getRawSources` - Get all raw sources
- `reingestSource` - Re-ingest specific source
- `getTokenSavings` - Get token savings estimate
- `getHealthStatus` - Get brain health status
- `export` - Export brain data
- `import` - Import brain data
- `reset` - Reset brain (delete all data)
- `listAgentBrains` - List all agent brains

### Agent Management

- `initializeAgentBrain` - Initialize agent brain with configuration
- `getAllAgentStatistics` - Get statistics for all agent brains
- `stopAutoIngest` - Stop automatic ingestion for an agent

## Wiki Page Format

Each wiki page follows this format:

```markdown
---
title: "Page Title"
summary: "1-2 sentence summary"
created: "2024-01-01T00:00:00Z"
updated: "2024-01-01T00:00:00Z"
sources: ["source-file-1.md", "source-file-2.md"]
tags: ["tag1", "tag2"]
categories: ["category1", "category2"]
related: ["related-page-1", "related-page-2"]
confidence: 0.95
---

## Summary

Page summary content...

## Key Concepts

- [[concept-1]]
- [[concept-2]]

## Categories

- category1
- category2

## Content

Structured content extracted from raw sources...
```

## Token Savings Calculation

The system estimates token savings by comparing:

- **Raw file tokens**: Total characters in raw files / 4 (approximate tokens per character)
- **Wiki page tokens**: Total characters in wiki pages / 4
- **Savings**: Raw tokens - Wiki tokens

Typical savings: 80-95% reduction in token usage

## Supported LLM Providers

- **OpenAI**: GPT-4o-mini, GPT-4o, GPT-4-turbo
- **Anthropic**: Claude 3 Haiku, Claude 3 Sonnet, Claude 3 Opus
- **Google Gemini**: Gemini Pro, Gemini Ultra
- **Groq**: Mixtral 8x7b, Llama 3 70b

## Best Practices

### For AI Agents

1. **Initialize brains on startup** - Call `initialize()` when agent starts
2. **Query before reading raw files** - Always check brain first
3. **Use domain-specific queries** - Tailor queries to agent's domain
4. **Monitor token savings** - Track savings to optimize usage

### For Data Sources

1. **Organize by domain** - Keep related documents together
2. **Use consistent naming** - Helps with categorization
3. **Update incrementally** - Only add new/changed files
4. **Provide context** - Include relevant metadata in documents

### For Brain Management

1. **Regular ingestion** - Set up auto-ingest for frequently changing data
2. **Monitor health status** - Check brain health regularly
3. **Backup important brains** - Use export/import for backup
4. **Clean up unused brains** - Remove old agent brains when no longer needed

## Troubleshooting

### LLM Client Initialization Fails

**Error**: `Failed to initialize LLM client`

**Solution**: Ensure API keys are set in environment variables:
```bash
OPENAI_API_KEY=your_key
ANTHROPIC_API_KEY=your_key
```

### Brain Not Initializing

**Error**: `Brain manifest not found or corrupted`

**Solution**: Reset the brain:
```typescript
await brain.reset();
await brain.initialize();
```

### No Results from Query

**Issue**: Query returns empty results

**Solutions**:
1. Check if brain has been ingested: `await brain.getStatistics()`
2. Lower relevance threshold: `query('term', { minRelevance: 0.2 })`
3. Ingest more sources: `await brain.ingest()`
4. Check query terms match tags/categories

### High Memory Usage

**Issue**: Brain system using too much memory

**Solutions**:
1. Use per-agent brains instead of shared brain
2. Limit ingestion to essential sources
3. Regularly reset and re-ingest
4. Monitor brain size and clean up old data

## Integration Examples

### Marketing Agent

```typescript
import { useAgentBrain } from '@/hooks/useAgentBrain';

function MarketingAgent() {
  const { query, initialize, getTokenSavings } = useAgentBrain('marketing-agent-1');

  const getCampaignStrategy = async () => {
    const results = await query('campaign strategy optimization', { limit: 5 });
    return results.pages.map(page => ({
      title: page.frontmatter.title,
      summary: page.frontmatter.summary,
      content: page.content,
    }));
  };

  useEffect(() => {
    initialize();
  }, []);

  return <div>{/* Agent UI */}</div>;
}
```

### Sales Agent

```typescript
import { AgentBrainManager } from '@/lib/agents-brain/agent-brain-manager';

async function setupSalesAgent() {
  const manager = AgentBrainManager.getInstance();
  
  await manager.initializeAgentBrain({
    agentId: 'sales-agent-1',
    agentType: 'sales',
    department: 'sales',
    autoInitialize: true,
    dataSources: [
      '/agents-brain/raw/sales/playbooks',
      '/agents-brain/raw/sales/product-info',
      '/agents-brain/raw/sales/pricing',
    ],
    enableAutoIngest: true,
    ingestInterval: 1800, // 30 minutes
  });
}
```

## Performance Considerations

### Ingestion Performance

- **Large files**: Files > 10MB are truncated for LLM analysis
- **Batch processing**: Process multiple files in parallel
- **Incremental updates**: Only process changed files
- **Caching**: LLM responses can be cached for similar content

### Query Performance

- **Index-based search**: Uses pre-built index for fast lookups
- **Relevance scoring**: Efficient scoring algorithm
- **Result limiting**: Limit results to reduce processing time
- **Caching**: Query results can be cached

### Memory Usage

- **Per-agent isolation**: Each agent has separate brain
- **Lazy loading**: Pages loaded on demand
- **Memory limits**: Configurable max context window
- **Cleanup**: Old data can be removed

## Future Enhancements

- [ ] Semantic search with vector embeddings
- [ ] Knowledge graph visualization
- [ ] Real-time collaboration on brains
- [ ] Advanced relationship extraction
- [ ] Multi-modal content support (images, videos)
- [ ] Distributed brain storage
- [ ] Brain-to-brain communication
- [ ] Automated brain optimization

## References

- [LLM Wiki](https://github.com/nashsu/llm_wiki) - Original inspiration
- [Obsidian Wiki](https://github.com/ar9av/obsidian-wiki) - Agent integration pattern
- [Karpathy's LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) - Core methodology

## Support

For issues or questions:
1. Check this documentation
2. Review the code comments in `lib/agents-brain/`
3. Check the brain health status: `await brain.getHealthStatus()`
4. Review the operation log: `await brain.getLog()`
