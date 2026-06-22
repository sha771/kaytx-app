/**
 * Test Brain Query Functionality
 * This script tests the brain system query functionality with sample data
 */

import { BrainSystem } from '../lib/agents-brain';
import { BrainLLMClient } from '../lib/agents-brain/llm-client';
import fs from 'fs';
import path from 'path';

async function testBrainQuery() {
  console.log('🧠 Testing Brain Query Functionality...\n');

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

    // Create brain system for marketing agent
    console.log('📝 Creating brain system for marketing-brand agent...');
    const brainSystem = new BrainSystem(
      {
        brainPath: '/agents-brain/agents/marketing-brand',
        rawSourcesPath: '/agents-brain/agents/marketing-brand/raw',
        wikiPath: '/agents-brain/agents/marketing-brand/wiki',
        schemaPath: '/agents-brain/agents/marketing-brand/schema',
        indexPath: '/agents-brain/agents/marketing-brand/index.md',
        manifestPath: '/agents-brain/agents/marketing-brand/.manifest.json',
        logPath: '/agents-brain/agents/marketing-brand/log.md',
        maxContextWindow: 128000,
        enableSemanticSearch: true,
      },
      'marketing-brand',
      llmClient
    );

    // Initialize brain
    console.log('🔧 Initializing brain...');
    await brainSystem.initialize();
    console.log('✅ Brain initialized\n');

    // Add sample data sources
    const sampleSources = [
      '/agents-brain/raw/marketing/brand-guidelines.md',
      '/agents-brain/raw/marketing/campaign-strategies.md',
      '/agents-brain/raw/marketing/social-media-strategy.md',
    ];

    console.log('📄 Adding sample data sources...');
    for (const sourcePath of sampleSources) {
      const fullPath = path.join(process.cwd(), sourcePath);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        await brainSystem.addRawSource(sourcePath, content);
        console.log(`   ✅ Added: ${path.basename(sourcePath)}`);
      } else {
        console.log(`   ⚠️  Not found: ${sourcePath}`);
      }
    }

    // Ingest sources
    console.log('\n🔄 Ingesting sources...');
    const ingestResult = await brainSystem.ingest();
    console.log(`   ✅ Ingestion complete`);
    console.log(`   📊 Sources processed: ${ingestResult.sourcesProcessed}`);
    console.log(`   📊 Wiki pages created: ${ingestResult.wikiPagesCreated}`);
    console.log(`   ⏱️  Duration: ${ingestResult.duration}ms\n`);

    // Get statistics
    console.log('📈 Brain Statistics:');
    const stats = await brainSystem.getStatistics();
    console.log(`   Wiki Pages: ${stats.totalWikiPages}`);
    console.log(`   Sources: ${stats.totalSources}`);
    console.log(`   Token Savings: ${((stats.tokenSavings || 0) / 1000).toFixed(1)}k\n`);

    // Test queries
    console.log('🔍 Testing Queries...\n');

    const testQueries = [
      'brand guidelines',
      'campaign strategy',
      'social media marketing',
      'marketing channels',
      'brand identity',
    ];

    for (const query of testQueries) {
      console.log(`📝 Query: "${query}"`);
      const result = await brainSystem.query(query, { limit: 3 });
      
      if (result.success) {
        console.log(`   ✅ Found ${result.pages.length} pages`);
        console.log(`   💰 Token Savings: ${result.tokenSavings.toLocaleString()}`);
        
        if (result.pages.length > 0) {
          console.log('   📄 Top Results:');
          result.pages.forEach((page, index) => {
            console.log(`      ${index + 1}. ${page.frontmatter.title}`);
            console.log(`         Relevance: ${(result.relevanceScores[index] * 100).toFixed(0)}%`);
          });
        }
      } else {
        console.log(`   ❌ Query failed: ${result.error}`);
      }
      console.log('');
    }

    // Test token savings
    console.log('💰 Token Savings Analysis:');
    const tokenSavings = await brainSystem.getTokenSavings();
    console.log(`   Total Token Savings: ${tokenSavings.toLocaleString()}`);
    console.log(`   Estimated Cost Savings: $${(tokenSavings / 1000 * 0.002).toFixed(2)} (assuming $0.002/1k tokens)\n`);

    // Test health status
    console.log('🏥 Brain Health Status:');
    const health = await brainSystem.getHealthStatus();
    console.log(`   Status: ${health.status}`);
    console.log(`   Wiki Pages: ${health.wikiPages}`);
    console.log(`   Sources: ${health.sources}`);
    console.log(`   Index Size: ${health.indexSize}\n`);

    console.log('🎉 Brain Query Test Complete!');

  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run test
if (require.main === module) {
  testBrainQuery()
    .then(() => {
      console.log('\n✅ Test completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Test failed:', error);
      process.exit(1);
    });
}

export { testBrainQuery };
