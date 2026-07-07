/**
 * Agent Seed Script
 * Run this script to register all agents into the database.
 * Usage: npx tsx scripts/seed-agents.ts [organizationId]
 */

import { registerAllAgents, seedDefaultAgents, getAgentCount } from '../backend/services/agent-registration-service';
import { agentRegistry } from '../constants/aiAgentRegistry';
import { getAllDepartmentConfigs } from '../constants/agent-configurations';

const DEFAULT_ORG_ID = process.env.DEFAULT_ORGANIZATION_ID || '00000000-0000-0000-0000-000000000001';

async function main() {
  const orgId = process.argv[2] || DEFAULT_ORG_ID;

  console.log('========================================');
  console.log('  KayTX Agent Registration Script');
  console.log('========================================');
  console.log(`Organization ID: ${orgId}`);
  console.log(`Registry entries: ${agentRegistry.length}`);
  console.log(`Department configs: ${getAllDepartmentConfigs().length}`);
  console.log('');

  // Step 1: Seed default agents
  console.log('Step 1: Seeding default agents...');
  await seedDefaultAgents(orgId);
  console.log('');

  // Step 2: Register all agents from registry
  console.log('Step 2: Registering all agents...');
  const result = await registerAllAgents(orgId);
  console.log('');

  // Step 3: Report
  console.log('========================================');
  console.log('  Registration Complete');
  console.log('========================================');
  console.log(`Total in registry: ${result.total}`);
  console.log(`Created: ${result.created}`);
  console.log(`Updated: ${result.updated}`);
  console.log(`Errors: ${result.errors}`);

  if (result.errors > 0) {
    console.log('');
    console.log('Error details:');
    result.errorDetails.forEach(e => console.log(`  - ${e}`));
  }

  // Step 4: Count total
  const totalCount = await getAgentCount(orgId);
  console.log('');
  console.log(`Total agents in database: ${totalCount}`);
  console.log('');
  console.log('All agents are now registered and ready to use!');
  console.log('Each agent has:');
  console.log('  - System prompt with department-specific instructions');
  console.log('  - Level-appropriate capabilities');
  console.log('  - Tools configured for their role');
  console.log('  - Full LLM integration via the backend');
}

main().catch(error => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
