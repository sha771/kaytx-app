/**
 * Agent Deployment Verification Script
 * Run this to verify all 4,469 agents are properly configured and ready for LLM calls.
 * Usage: npx tsx scripts/verify-agents.ts
 */

import { agentRegistry } from '../constants/aiAgentRegistry';
import { getAllDepartmentConfigs, getAgentSystemPrompt, getAgentTools, getAgentCapabilities } from '../constants/agent-configurations';

interface VerificationResult {
  total: number;
  withSystemPrompt: number;
  withTools: number;
  withCapabilities: number;
  withRoute: number;
  withDepartment: number;
  errors: string[];
}

function verifyAgents(): VerificationResult {
  const result: VerificationResult = {
    total: agentRegistry.length,
    withSystemPrompt: 0,
    withTools: 0,
    withCapabilities: 0,
    withRoute: 0,
    withDepartment: 0,
    errors: [],
  };

  const depts = getAllDepartmentConfigs();
  console.log(`\n📦 Department Configurations: ${depts.length}`);

  for (const entry of agentRegistry) {
    try {
      // Check system prompt
      const prompt = getAgentSystemPrompt(entry.departmentId, entry.level, entry.title);
      if (prompt && prompt.length > 50) {
        result.withSystemPrompt++;
      } else {
        result.errors.push(`${entry.uid}: Empty or too short system prompt`);
      }

      // Check tools
      const tools = getAgentTools(entry.departmentId, entry.level);
      if (tools && tools.length > 0) {
        result.withTools++;
      }

      // Check capabilities
      const caps = getAgentCapabilities(entry.departmentId, entry.level);
      if (caps && caps.length > 0) {
        result.withCapabilities++;
      }

      // Check route
      if (entry.route && entry.route.startsWith('/ai-agent/')) {
        result.withRoute++;
      }

      // Check department
      if (entry.department && entry.departmentId >= 0) {
        result.withDepartment++;
      }
    } catch (error) {
      result.errors.push(`${entry.uid}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return result;
}

function main() {
  console.log('========================================');
  console.log('  KayTX Agent Verification Report');
  console.log('========================================\n');

  const result = verifyAgents();

  console.log(`📊 Registry Statistics:`);
  console.log(`   Total agents:        ${result.total}`);
  console.log(`   With system prompt:  ${result.withSystemPrompt} (${((result.withSystemPrompt / result.total) * 100).toFixed(1)}%)`);
  console.log(`   With tools:          ${result.withTools} (${((result.withTools / result.total) * 100).toFixed(1)}%)`);
  console.log(`   With capabilities:   ${result.withCapabilities} (${((result.withCapabilities / result.total) * 100).toFixed(1)}%)`);
  console.log(`   With route:          ${result.withRoute} (${((result.withRoute / result.total) * 100).toFixed(1)}%)`);
  console.log(`   With department:     ${result.withDepartment} (${((result.withDepartment / result.total) * 100).toFixed(1)}%)`);
  console.log(`   Errors:              ${result.errors.length}`);

  if (result.errors.length > 0) {
    console.log('\n❌ Errors:');
    result.errors.slice(0, 10).forEach(e => console.log(`   - ${e}`));
    if (result.errors.length > 10) {
      console.log(`   ... and ${result.errors.length - 10} more`);
    }
  }

  // Check environment
  console.log('\n🔑 Environment Check:');
  console.log(`   OPENAI_API_KEY:      ${process.env.OPENAI_API_KEY ? '✅ Set' : '❌ Not set'}`);
  console.log(`   ANTHROPIC_API_KEY:   ${process.env.ANTHROPIC_API_KEY ? '✅ Set' : '❌ Not set'}`);
  console.log(`   DATABASE_URL:        ${process.env.DATABASE_URL ? '✅ Set' : '❌ Not set'}`);
  console.log(`   ENCRYPTION_KEY:      ${process.env.ENCRYPTION_KEY ? '✅ Set' : '❌ Not set'}`);

  // Overall verdict
  const score =
    (result.withSystemPrompt / result.total) * 30 +
    (result.withTools / result.total) * 25 +
    (result.withCapabilities / result.total) * 25 +
    (result.withRoute / result.total) * 10 +
    (result.withDepartment / result.total) * 10;

  console.log(`\n📈 Configuration Score: ${score.toFixed(1)}%`);

  if (score >= 95 && result.errors.length === 0) {
    console.log('✅ ALL AGENTS READY FOR LLM CALLS');
  } else if (score >= 80) {
    console.log('⚠️  Most agents ready, minor issues to fix');
  } else {
    console.log('❌ Significant issues remain');
  }

  console.log('\n========================================');
  console.log('  Deployment Steps:');
  console.log('========================================');
  console.log('1. Set OPENAI_API_KEY in .env');
  console.log('2. docker-compose up -d postgres redis');
  console.log('3. npm run seed:agents');
  console.log('4. npm run backend:prod');
  console.log('5. npm run start');
  console.log('');
}

main();
