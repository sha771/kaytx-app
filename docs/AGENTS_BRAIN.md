# Agents Brain System

A structured knowledge base system for AI agents and employees, inspired by [LLM Wiki](https://github.com/nashsu/llm_wiki) and [Obsidian Wiki](https://github.com/ar9av/obsidian-wiki) patterns.

## Overview

The Agents Brain System allows AI agents to:
- **Scan raw data and documents once** - Ingest raw sources into a structured brain
- **Create a structured brain** - Transform raw data into organized, interlinked wiki pages
- **Query only the structured brain** - Agents read structured wiki pages instead of raw files
- **Save token usage** - Dramatically reduce token costs by avoiding repeated raw file processing

## Quick Start

### For a Single Agent

```typescript
import { createAgentBrainContext } from '@/lib/agents-brain/agent-integration';

// 1. Create brain context for your agent
const brain = createAgentBrainContext('my-agent-id', 'marketing');

// 2. Initialize the brain
await brain.initialize();

// 3. Ingest documents
await brain.ingest(['./documents/report.pdf', './documents/strategy.docx']);

// 4. Query the brain
const result = await brain.query('Q4 marketing strategy');
console.log(`Found ${result.pages.length} pages, saved ${result.tokenSavings} tokens`);
```

### For Multiple Agents

```typescript
// Marketing agent brain
const marketingBrain = createAgentBrainContext('marketing-agent-1', 'marketing');
await marketingBrain.initialize();
await marketingBrain.ingest(['./marketing-docs/']);

// Sales agent brain
const salesBrain = createAgentBrainContext('sales-agent-1', 'sales');
await salesBrain.initialize();
await salesBrain.ingest(['./sales-docs/']);

// Each agent has their own isolated brain
const marketingResult = await marketingBrain.query('brand strategy');
const salesResult = await salesBrain.query('sales pipeline');
```

## Architecture

### Per-Agent Brain Architecture

Each AI agent and employee gets their own isolated brain:

```
/agents-brain/
├── agents/
│   ├── agent-1/
│   │   ├── raw/           # Agent-1's raw sources
│   │   ├── wiki/          # Agent-1's structured wiki
│   │   ├── schema/        # Agent-1's schema
│   │   ├── index.md       # Agent-1's catalog
│   │   ├── .manifest.json # Agent-1's manifest
│   │   └── log.md         # Agent-1's operation log
│   ├── agent-2/
│   │   └── ...
│   └── agent-3/
│       └── ...
└── (optional shared brain for common knowledge)
```

### Three-Layer Architecture

Based on the three-layer architecture from LLM Wiki:

```
Raw Sources (immutable) → Wiki (LLM-generated) → Schema (rules & config)
```

### Core Components

1. **Storage System** (`lib/agents-brain/storage.ts`)
   - File system operations for brain data
   - Manifest tracking for sources
   - Wiki page management
   - Index and log management

2. **Ingestion System** (`lib/agents-brain/ingestion.ts`)
   - Two-Step Chain-of-Thought Ingest
   - Analyzes sources with LLM
   - Generates structured wiki pages
   - Merges with existing knowledge

3. **Query System** (`lib/agents-brain/query.ts`)
   - Search and retrieval
   - Relevance scoring
   - Token usage tracking
   - Category and tag search

4. **Main Brain System** (`lib/agents-brain/index.ts`)
   - Ties all components together
   - Provides unified API
   - Health monitoring
   - Export/import functionality

## Directory Structure

### Per-Agent Brain Structure

Each agent has their own isolated brain directory:

```
/agents-brain/agents/{agent-id}/
├── raw/           # Agent's raw source documents (immutable)
├── wiki/          # Agent's structured wiki pages (LLM-generated)
├── schema/        # Agent's rules and configuration
├── index.md       # Agent's content catalog
├── .manifest.json # Agent's source tracking and metadata
└── log.md         # Agent's operation records
```

### Shared Brain Structure (Optional)

A shared brain can be used for common knowledge across all agents:

```
/agents-brain/
├── raw/           # Shared raw source documents
├── wiki/          # Shared structured wiki pages
├── schema/        # Shared rules and configuration
├── index.md       # Shared content catalog
├── .manifest.json # Shared source tracking
└── log.md         # Shared operation records
```

## Installation

The system is already integrated into the codebase. No additional installation required.

## Usage

### For AI Agents

Use the integration utilities in `lib/agents-brain/agent-integration.ts`:

```typescript
import { queryBrain, createAgentBrainContext } from '@/lib/agents-brain/agent-integration';

// Simple query (shared brain)
const result = await queryBrain("marketing strategies for Q4");
console.log(`Found ${result.pages.length} pages, saved ${result.tokenSavings} tokens`);

// Agent-specific context (default - creates agent-specific brain)
const brainContext = createAgentBrainContext('agent-123', 'marketing');
const knowledge = await brainContext.getKnowledgeForTask('campaign optimization');

// Agent-specific context with shared brain
const sharedBrainContext = createAgentBrainContext('agent-123', 'marketing', true);
const sharedKnowledge = await sharedBrainContext.getKnowledgeForTask('campaign optimization');
```

### Per-Agent Brain Usage

Each agent gets their own isolated brain by default:

```typescript
import { createAgentBrainContext } from '@/lib/agents-brain/agent-integration';

// Create agent-specific brain (default)
const agentBrain = createAgentBrainContext('marketing-agent-1', 'marketing');

// Initialize the agent's brain
await agentBrain.initialize();

// Ingest documents specific to this agent
await agentBrain.ingest(['./documents/marketing-q4-report.pdf']);

// Query the agent's brain
const result = await agentBrain.query('Q4 marketing performance');

// Get statistics for this agent's brain
const stats = await agentBrain.getStatistics();
console.log(`Agent has ${stats.statistics.totalWikiPages} pages in brain`);
```

### For Backend Operations

```typescript
import { BrainSystem } from '@/lib/agents-brain';

// Shared brain
const sharedBrain = new BrainSystem();

// Initialize shared brain
await sharedBrain.initialize();

// Ingest sources into shared brain
const result = await sharedBrain.ingest(['./documents/report.pdf']);

// Query shared brain
const queryResult = await sharedBrain.query('financial analysis');

// Get statistics for shared brain
const stats = await sharedBrain.getStatistics();

// Agent-specific brain
const agentBrain = new BrainSystem(undefined, 'marketing-agent-1');

// Initialize agent's brain
await agentBrain.initialize();

// Ingest sources into agent's brain
const agentResult = await agentBrain.ingest(['./documents/marketing-report.pdf']);

// Query agent's brain
const agentQueryResult = await agentBrain.query('marketing strategy');

// Get statistics for agent's brain
const agentStats = await agentBrain.getStatistics();
```

### Via API (tRPC)

The brain system is exposed through tRPC routes at `api.agentsBrain.*`:

```typescript
// Query shared brain
const result = await api.agentsBrain.query.mutate({
  query: "marketing strategies",
  limit: 10,
  minRelevance: 0.5
});

// Query agent-specific brain
const agentResult = await api.agentsBrain.query.mutate({
  query: "marketing strategies",
  limit: 10,
  minRelevance: 0.5,
  agentId: 'marketing-agent-1'
});

// Get shared brain statistics
const stats = await api.agentsBrain.getStatistics.query();

// Get agent-specific brain statistics
const agentStats = await api.agentsBrain.getStatistics.query({
  agentId: 'marketing-agent-1'
});

// Ingest into shared brain
const ingestResult = await api.agentsBrain.ingest.mutate({});

// Ingest into agent-specific brain
const agentIngestResult = await api.agentsBrain.ingest.mutate({
  agentId: 'marketing-agent-1'
});

// List all agent brains
const agentBrains = await api.agentsBrain.listAgentBrains.query();
console.log('Agent brains:', agentBrains.agentIds);
```

## API Endpoints

All endpoints accept an optional `agentId` parameter for agent-specific brains. If not provided, they operate on the shared brain.

### Management

- `initialize` - Initialize brain system (accepts `agentId`)
- `getStatistics` - Get brain statistics (accepts `agentId`)
- `getHealthStatus` - Get health status (accepts `agentId`)
- `getManifest` - Get brain manifest (accepts `agentId`)
- `getIndex` - Get brain index (accepts `agentId`)
- `getLog` - Get operation log (accepts `agentId`)
- `listAgentBrains` - List all agent brains (new)

### Ingestion

- `ingest` - Ingest raw sources into brain (accepts `agentId`)
- `addRawSource` - Add a raw source file (accepts `agentId`)
- `getRawSources` - Get all raw sources (accepts `agentId`)
- `reingestSource` - Re-ingest a specific source (accepts `agentId`)

### Query

- `query` - Query brain for information (accepts `agentId`)
- `searchByTag` - Search by tag (accepts `agentId`)
- `searchByCategory` - Search by category (accepts `agentId`)
- `getPage` - Get specific page (accepts `agentId`)
- `getAllPages` - Get all pages (accepts `agentId`)
- `getRelatedPages` - Get related pages (accepts `agentId`)

### Maintenance

- `export` - Export brain data (accepts `agentId`)
- `import` - Import brain data (accepts `agentId`)
- `reset` - Reset brain (accepts `agentId`, dangerous)

## Token Savings

The brain system provides significant token savings by:

1. **One-time processing** - Raw files are processed once during ingestion
2. **Structured output** - Wiki pages are concise and focused
3. **Incremental updates** - Only changed sources are re-processed
4. **Smart caching** - Manifest tracking avoids duplicate work
5. **Per-agent isolation** - Each agent only processes their own documents, avoiding redundant processing

Estimated savings: 70-90% reduction in token usage compared to reading raw files on every query.

With per-agent brains, each agent only processes documents relevant to their domain, further optimizing token usage across the system.

## Wiki Page Format

Each wiki page follows this structure:

```markdown
---
title: Page Title
summary: Brief summary
created: 2024-01-01T00:00:00.000Z
updated: 2024-01-01T00:00:00.000Z
sources: ["source1.pdf", "source2.md"]
tags: ["tag1", "tag2"]
categories: ["category1"]
related: ["related-page-id"]
confidence: 0.9
---

## Summary
Page summary...

## Key Concepts
- [[concept-1]]
- [[concept-2]]

## Content
Structured content...
```

## Cross-References

Use `[[wikilink]]` syntax for cross-references between pages:

```markdown
See [[marketing-strategy]] for more details.
Related: [[customer-segmentation]], [[campaign-optimization]]
```

## Manifest Tracking

The `.manifest.json` file tracks:

- All ingested sources with checksums
- Which wiki pages each source generated
- Ingestion status and timestamps
- Statistics on total sources, pages, concepts, relationships

This enables:
- Incremental updates (only process changed files)
- Source traceability (know which sources produced which pages)
- Rollback capabilities (track what changed when)

## Best Practices

### For Ingestion

1. **Organize raw sources** - Keep raw files in a structured directory
2. **Use meaningful filenames** - Helps with automatic title generation
3. **Batch similar documents** - Group related documents together
4. **Regular ingestion** - Set up scheduled ingestion for new documents

### For Querying

1. **Use specific queries** - More specific queries yield better results
2. **Leverage tags and categories** - Use tag/category search when appropriate
3. **Check relevance scores** - Filter by relevance to get quality results
4. **Follow related pages** - Use cross-references to discover related knowledge

### For AI Agents

1. **Create agent-specific contexts** - Use `AgentBrainContext` for agent-specific queries
2. **Log usage** - Track brain usage for analytics and optimization
3. **Cache results** - Cache frequently accessed brain pages
4. **Combine with other tools** - Use brain knowledge alongside other agent capabilities

## UI Interface

Access the brain management UI at `/agents-brain`:

- **View Mode Toggle** - Switch between Shared Brain and Agent Brains
- **Agent Selection** - Select specific agent brain to view/manage
- **Overview** - View statistics and perform actions
- **Query** - Search the brain interactively
- **Pages** - Browse all wiki pages
- **Settings** - Export/import and reset brain

### Shared Brain vs Agent Brains

The UI supports two modes:

1. **Shared Brain** - A single brain shared across all agents for common knowledge
2. **Agent Brains** - Individual brains for each agent, isolated and domain-specific

Switch between modes using the toggle buttons in the header. When in Agent Brains mode, select an agent from the dropdown or enter a new agent ID to create/manage their brain.

## Integration with Existing Agents

To integrate the brain system with existing AI agents:

1. Import integration utilities:
```typescript
import { createAgentBrainContext } from '@/lib/agents-brain/agent-integration';
```

2. Create brain context for the agent (agent-specific brain by default):
```typescript
const brainContext = createAgentBrainContext(agentId, agentType);
// Or use shared brain:
// const brainContext = createAgentBrainContext(agentId, agentType, true);
```

3. Initialize the agent's brain:
```typescript
await brainContext.initialize();
```

4. Ingest documents specific to this agent:
```typescript
await brainContext.ingest(['./documents/agent-specific-data.pdf']);
```

5. Query brain before processing:
```typescript
const knowledge = await brainContext.getKnowledgeForTask(task);
// Use knowledge to inform agent decisions
```

6. Log brain usage:
```typescript
await brainContext.logUsage(query, tokenSavings);
```

## Demo Prompts

### Prompt 1: Initial Brain Setup

```
You are an AI assistant helping set up the Agents Brain System for a marketing team.

Context:
- We have multiple marketing agents that need to access shared knowledge
- Each agent should have their own brain for specialized knowledge
- We want to save tokens by avoiding repeated document processing

Task:
1. Initialize brains for 3 marketing agents: brand-strategy, digital-marketing, content-creation
2. Ingest the following documents into each agent's brain:
   - brand-strategy: brand-guidelines.pdf, brand-voice.docx
   - digital-marketing: seo-guide.pdf, social-media-strategy.docx
   - content-creation: content-calendar.xlsx, writing-style-guide.pdf
3. Query each brain to verify setup
4. Report total token savings achieved

Expected output:
- Confirmation that all 3 brains are initialized
- Document ingestion results for each brain
- Query results showing structured knowledge
- Total token savings estimate
```

### Prompt 2: Knowledge Retrieval Demo

```
You are demonstrating the Agents Brain System to a marketing team.

Context:
- The marketing-brand agent has been set up with its brain
- The brain contains brand guidelines, marketing strategies, and campaign data
- A user wants to query the brain for Q4 campaign planning

Task:
1. Query the marketing-brand brain for "Q4 campaign strategy"
2. Query for "brand voice guidelines"
3. Query for "past campaign performance"
4. Show the results with relevance scores and token savings
5. Explain how this is more efficient than reading raw documents

Expected output:
- Query results for each search
- Relevance scores showing quality of matches
- Token savings compared to reading raw PDFs
- Explanation of efficiency gains
```

### Prompt 3: Multi-Agent Collaboration Demo

```
You are demonstrating how multiple agents can use their brains to collaborate.

Context:
- We have 3 agents: marketing-brand, sales-lead, customer-support
- Each has their own brain with domain-specific knowledge
- They need to collaborate on a customer onboarding project

Task:
1. Query marketing-brand brain for "onboarding messaging"
2. Query sales-lead brain for "onboarding sales process"
3. Query customer-support brain for "onboarding common issues"
4. Synthesize the results into a comprehensive onboarding plan
5. Calculate total token savings across all queries

Expected output:
- Results from each agent's brain
- Synthesized onboarding plan
- Token savings from using brains vs raw documents
- Demonstration of how agents can collaborate efficiently
```

### Prompt 4: Brain Maintenance Demo

```
You are demonstrating brain maintenance and update procedures.

Context:
- The marketing-brand brain has been running for a month
- New documents need to be added
- Some documents have been updated
- We need to ensure the brain stays current

Task:
1. Check brain statistics (pages, sources, last updated)
2. Ingest new documents: q4-results.pdf, 2025-strategy.docx
3. Re-ingest updated documents: brand-guidelines.pdf (updated version)
4. Verify manifest tracking shows changes
5. Query to verify new knowledge is accessible
6. Report on brain health and token savings

Expected output:
- Current brain statistics
- Ingestion results for new/updated documents
- Manifest changes showing what was updated
- Query results confirming new knowledge
- Brain health status
```

### Prompt 5: Token Savings Analysis Demo

```
You are analyzing the token savings achieved by the Agents Brain System.

Context:
- The marketing team has 5 agents using brains
- Each agent processes ~100 documents monthly
- Without brains, each query would re-read all relevant documents
- With brains, documents are processed once and queried efficiently

Task:
1. Calculate monthly token usage without brains (raw document reads)
2. Calculate monthly token usage with brains (structured wiki reads)
3. Compute percentage savings
4. Project annual savings for the team
5. Identify additional optimization opportunities

Expected output:
- Monthly token usage comparison (with vs without brains)
- Percentage savings calculation
- Annual savings projection
- Optimization recommendations
```

## Example Use Cases

### Use Case 1: Marketing Campaign Planning

**Scenario:** Marketing team needs to plan Q4 campaigns based on historical data and brand guidelines.

**Without Brain:**
- Read 50+ PDF documents (brand guidelines, past campaigns, market research)
- Each query re-reads all documents
- High token costs, slow response times

**With Brain:**
- Documents ingested once into marketing-brand brain
- Queries search structured wiki pages
- 80% token savings, instant responses

**Implementation:**
```typescript
const marketingBrain = createAgentBrainContext('marketing-brand', 'marketing');
await marketingBrain.ingest(['./campaign-docs/']);
const strategy = await marketingBrain.query('Q4 campaign strategy based on past performance');
```

### Use Case 2: Sales Agent Knowledge Base

**Scenario:** Sales agents need quick access to product information, pricing, and objection handling.

**Without Brain:**
- Each sales agent reads product manuals, pricing sheets, objection guides
- Redundant processing across agents
- Inconsistent knowledge access

**With Brain:**
- Each sales agent has their own brain with sales knowledge
- Shared brain for common product information
- Consistent, fast access to knowledge

**Implementation:**
```typescript
// Individual agent brain for personal notes
const agentBrain = createAgentBrainContext('sales-agent-1', 'sales');
await agentBrain.ingest(['./personal-notes/']);

// Shared brain for product info
const sharedBrain = createAgentBrainContext('sales-agent-1', 'sales', true);
const productInfo = await sharedBrain.query('product pricing');
```

### Use Case 3: Customer Support Knowledge

**Scenario:** Support agents need access to troubleshooting guides, FAQs, and customer history.

**Without Brain:**
- Support agents read knowledge base articles on each ticket
- Slow response times
- High token costs

**With Brain:**
- Knowledge ingested into support agent brains
- Instant retrieval of relevant troubleshooting steps
- Significant token savings

**Implementation:**
```typescript
const supportBrain = createAgentBrainContext('support-agent-1', 'support');
await supportBrain.ingest(['./knowledge-base/']);
const solution = await supportBrain.query('troubleshooting login issues');
```

## Troubleshooting

### Brain not initialized

Run the initialization:
```typescript
await brain.initialize();
```

Or via UI: Click "Initialize Brain" button

### No pages found

Ensure sources have been ingested:
```typescript
await brain.ingest();
```

Or via UI: Click "Ingest Sources" button

### Poor query results

- Try more specific queries
- Adjust `minRelevance` threshold
- Check that relevant sources have been ingested
- Verify tags and categories are properly set

### Token savings not showing

- Ensure sources have been ingested
- Check that wiki pages are being generated
- Verify manifest tracking is working
- Review log for ingestion errors

## Future Enhancements

Planned features:

1. **Semantic Search** - Vector embeddings for better semantic matching
2. **Knowledge Graph Visualization** - Interactive graph view of concepts and relationships
3. **Multi-modal Ingestion** - Support for images, audio, video
4. **Collaborative Editing** - Human-in-the-loop review and editing
5. **Advanced Analytics** - Usage patterns, knowledge gaps, quality metrics
6. **Real-time Updates** - Watch source directories for automatic re-ingestion
7. **Distributed Brain** - Share brains across multiple instances
8. **Version Control** - Track changes to wiki pages over time

## References

- [LLM Wiki](https://github.com/nashsu/llm_wiki) - Desktop application for document-to-wiki conversion
- [Obsidian Wiki](https://github.com/ar9av/obsidian-wiki) - Framework for AI agents to build digital brains
- [Karpathy's LLM Wiki Pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) - Original methodology

## License

Part of the Kaytx Full App project.
