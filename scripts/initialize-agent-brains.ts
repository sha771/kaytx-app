/**
 * Initialize Agent Brains with Sample Data
 * This script ingests sample data sources into agent brains
 */

import { AgentBrainManager } from '../lib/agents-brain/agent-brain-manager';
import { BrainLLMClient } from '../lib/agents-brain/llm-client';
import fs from 'fs';
import path from 'path';

// Sample data sources by department
const DEPARTMENT_DATA_SOURCES = {
  marketing: [
    '/agents-brain/raw/marketing/brand-guidelines.md',
    '/agents-brain/raw/marketing/campaign-strategies.md',
    '/agents-brain/raw/marketing/social-media-strategy.md',
  ],
  sales: [
    '/agents-brain/raw/sales/sales-playbook.md',
  ],
  hr: [
    '/agents-brain/raw/hr/hr-policies.md',
  ],
  finance: [
    '/agents-brain/raw/finance/financial-reports.md',
  ],
  operations: [
    '/agents-brain/raw/operations/standard-operating-procedures.md',
  ],
};

// Agent configurations by department
const AGENT_CONFIGS = [
  {
    agentId: 'marketing-brand',
    agentType: 'marketing',
    department: 'Marketing',
    dataSources: DEPARTMENT_DATA_SOURCES.marketing,
    autoInitialize: true,
    enableAutoIngest: false,
  },
  {
    agentId: 'sales-executive',
    agentType: 'sales',
    department: 'Sales',
    dataSources: DEPARTMENT_DATA_SOURCES.sales,
    autoInitialize: true,
    enableAutoIngest: false,
  },
  {
    agentId: 'hr-manager',
    agentType: 'hr',
    department: 'Human Resources',
    dataSources: DEPARTMENT_DATA_SOURCES.hr,
    autoInitialize: true,
    enableAutoIngest: false,
  },
  {
    agentId: 'finance-analyst',
    agentType: 'finance',
    department: 'Finance',
    dataSources: DEPARTMENT_DATA_SOURCES.finance,
    autoInitialize: true,
    enableAutoIngest: false,
  },
  {
    agentId: 'operations-manager',
    agentType: 'operations',
    department: 'Operations',
    dataSources: DEPARTMENT_DATA_SOURCES.operations,
    autoInitialize: true,
    enableAutoIngest: false,
  },
];

async function initializeAgentBrains() {
  console.log('🧠 Initializing Agent Brains with Sample Data...\n');

  try {
    // Initialize LLM client
    let llmClient: BrainLLMClient;
    try {
      llmClient = BrainLLMClient.fromEnvironment();
      console.log('✅ LLM Client initialized from environment');
    } catch (error) {
      console.warn('⚠️  Could not initialize LLM client from environment, using fallback');
      llmClient = new BrainLLMClient({
        provider: 'openai',
        apiKey: '',
        model: 'gpt-4o-mini',
      });
    }

    // Get brain manager
    const manager = AgentBrainManager.getInstance();
    console.log('✅ Brain Manager initialized\n');

    // Initialize each agent brain
    for (const config of AGENT_CONFIGS) {
      console.log(`📝 Initializing brain for: ${config.agentId} (${config.department})`);
      
      try {
        // Check if data sources exist
        const existingSources = config.dataSources.filter(source => {
          const fullPath = path.join(process.cwd(), source);
          return fs.existsSync(fullPath);
        });

        if (existingSources.length === 0) {
          console.log(`   ⚠️  No data sources found for ${config.agentId}`);
          continue;
        }

        console.log(`   📄 Found ${existingSources.length} data sources`);

        // Initialize brain
        const brainSystem = await manager.initializeAgentBrain({
          ...config,
          dataSources: existingSources,
        });

        console.log(`   ✅ Brain initialized for ${config.agentId}`);

        // Get statistics
        const stats = await brainSystem.getStatistics();
        console.log(`   📊 Wiki Pages: ${stats.totalWikiPages}`);
        console.log(`   📊 Sources: ${stats.totalSources}`);
        console.log(`   📊 Token Savings: ${((stats.tokenSavings || 0) / 1000).toFixed(1)}k\n`);

      } catch (error) {
        console.error(`   ❌ Failed to initialize brain for ${config.agentId}:`, error);
        console.log('');
      }
    }

    console.log('🎉 Agent Brain Initialization Complete!\n');

    // Get all agent statistics
    console.log('📈 All Agent Brain Statistics:');
    const allStats = await manager.getAllAgentStatistics();
    
    let totalWikiPages = 0;
    let totalSources = 0;
    let totalTokenSavings = 0;

    for (const [agentId, stats] of allStats) {
      totalWikiPages += stats.totalWikiPages || 0;
      totalSources += stats.totalSources || 0;
      totalTokenSavings += stats.tokenSavings || 0;
      
      console.log(`   ${agentId}:`);
      console.log(`     Wiki Pages: ${stats.totalWikiPages}`);
      console.log(`     Sources: ${stats.totalSources}`);
      console.log(`     Token Savings: ${((stats.tokenSavings || 0) / 1000).toFixed(1)}k`);
    }

    console.log('\n📊 Totals:');
    console.log(`   Total Wiki Pages: ${totalWikiPages}`);
    console.log(`   Total Sources: ${totalSources}`);
    console.log(`   Total Token Savings: ${((totalTokenSavings || 0) / 1000).toFixed(1)}k`);

  } catch (error) {
    console.error('❌ Fatal error during brain initialization:', error);
    process.exit(1);
  }
}

// Run initialization
if (require.main === module) {
  initializeAgentBrains()
    .then(() => {
      console.log('\n✅ Initialization script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Initialization script failed:', error);
      process.exit(1);
    });
}

export { initializeAgentBrains, AGENT_CONFIGS, DEPARTMENT_DATA_SOURCES };
