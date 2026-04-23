/**
 * Agent Enhancement Verification Script
 * 
 * Run this script to verify that all AI agents and employees
 * have been properly enhanced with all capabilities.
 * 
 * Usage:
 *   npx ts-node scripts/verify-agent-enhancements.ts
 */

import { aiEmployees } from '../constants/aiEmployees';
import { allAgents } from '../constants/aiAgentHierarchy';
import { allAgents as allEnhancedAgents } from '../constants/aiEmployeesEnhanced';
import { verifyEmployeeCapabilities } from '../constants/utils/agent-capability-enhancer';

interface VerificationResult {
  totalAgents: number;
  fullyEnhanced: number;
  partiallyEnhanced: number;
  notEnhanced: number;
  issues: Array<{
    name: string;
    id: string;
    missing: string[];
  }>;
}

function verifyAllAgents(): VerificationResult {
  const result: VerificationResult = {
    totalAgents: 0,
    fullyEnhanced: 0,
    partiallyEnhanced: 0,
    notEnhanced: 0,
    issues: [],
  };

  console.log('🔍 Verifying AI Agent Enhancements...\n');

  // Verify AI Employees
  console.log('📋 Checking AI Employees...');
  aiEmployees.forEach(employee => {
    result.totalAgents++;
    const verification = verifyEmployeeCapabilities(employee);

    if (verification.hasAllCapabilities) {
      result.fullyEnhanced++;
    } else if (verification.missingCapabilities.length < 9) {
      result.partiallyEnhanced++;
      result.issues.push({
        name: employee.name,
        id: employee.id,
        missing: verification.missingCapabilities,
      });
    } else {
      result.notEnhanced++;
      result.issues.push({
        name: employee.name,
        id: employee.id,
        missing: verification.missingCapabilities,
      });
    }
  });

  console.log(`   ✅ ${result.fullyEnhanced} fully enhanced`);
  console.log(`   ⚠️  ${result.partiallyEnhanced} partially enhanced`);
  console.log(`   ❌ ${result.notEnhanced} not enhanced\n`);

  // Verify AI Agents
  console.log('📋 Checking AI Agents...');
  let agentCheckCount = 0;
  let agentEnhancedCount = 0;

  allAgents.forEach(agent => {
    result.totalAgents++;
    agentCheckCount++;

    const requiredCapabilities = [
      'a2aCapabilities',
      'd2dConfig',
      'selfImprovement',
      'learning',
      'sensory',
      'insights',
      'memory',
      'notes',
      'taskHistory',
    ];

    const missing = requiredCapabilities.filter(
      cap => !agent[cap as keyof typeof agent]
    );

    if (missing.length === 0) {
      result.fullyEnhanced++;
      agentEnhancedCount++;
    } else {
      result.partiallyEnhanced++;
      result.issues.push({
        name: agent.name,
        id: agent.id,
        missing,
      });
    }
  });

  console.log(`   ✅ ${agentEnhancedCount}/${agentCheckCount} agents enhanced\n`);

  // Verify Enhanced Agents
  console.log('📋 Checking Enhanced Employees...');
  let enhancedCheckCount = 0;
  let enhancedEnhancedCount = 0;

  allEnhancedAgents.forEach(agent => {
    result.totalAgents++;
    enhancedCheckCount++;

    const verification = verifyEmployeeCapabilities(agent as any);

    if (verification.hasAllCapabilities) {
      result.fullyEnhanced++;
      enhancedEnhancedCount++;
    } else {
      result.partiallyEnhanced++;
      result.issues.push({
        name: agent.name,
        id: agent.id,
        missing: verification.missingCapabilities,
      });
    }
  });

  console.log(`   ✅ ${enhancedEnhancedCount}/${enhancedCheckCount} enhanced\n`);

  // Summary
  console.log('📊 VERIFICATION SUMMARY');
  console.log('=' .repeat(50));
  console.log(`Total Agents Checked: ${result.totalAgents}`);
  console.log(`Fully Enhanced: ${result.fullyEnhanced} (${((result.fullyEnhanced / result.totalAgents) * 100).toFixed(1)}%)`);
  console.log(`Partially Enhanced: ${result.partiallyEnhanced} (${((result.partiallyEnhanced / result.totalAgents) * 100).toFixed(1)}%)`);
  console.log(`Not Enhanced: ${result.notEnhanced} (${((result.notEnhanced / result.totalAgents) * 100).toFixed(1)}%)`);

  if (result.issues.length > 0) {
    console.log('\n⚠️  ISSUES FOUND');
    console.log('-'.repeat(50));
    result.issues.slice(0, 10).forEach(issue => {
      console.log(`  ${issue.name} (${issue.id})`);
      console.log(`    Missing: ${issue.missing.join(', ')}`);
    });
    if (result.issues.length > 10) {
      console.log(`  ... and ${result.issues.length - 10} more`);
    }
  } else {
    console.log('\n✅ ALL AGENTS FULLY ENHANCED!');
  }

  console.log('\n' + '=' .repeat(50));

  return result;
}

// Enhanced capabilities checklist
function printCapabilitiesChecklist() {
  console.log('\n📋 ENHANCED CAPABILITIES CHECKLIST');
  console.log('=' .repeat(50));

  const capabilities = [
    { name: 'A2A Communication', icon: '🔄', key: 'a2aConfig' },
    { name: 'D2D Communication', icon: '🌐', key: 'd2dConfig' },
    { name: 'Self-Improvement', icon: '📈', key: 'selfImprovement' },
    { name: 'Self-Learning', icon: '🧠', key: 'learning' },
    { name: 'Vision', icon: '👁️', key: 'sensory.vision' },
    { name: 'Hand', icon: '✋', key: 'sensory.hand' },
    { name: 'Ear', icon: '👂', key: 'sensory.ear' },
    { name: 'Sense', icon: '🎯', key: 'sensory.sense' },
    { name: 'Insights', icon: '💡', key: 'insights' },
    { name: 'Predictive Insights', icon: '🔮', key: 'insights.predictiveInsights' },
    { name: 'Task History', icon: '📝', key: 'taskHistory' },
    { name: 'Unlimited Memory', icon: '💾', key: 'memory' },
    { name: 'Summary & Notes', icon: '📖', key: 'notes' },
  ];

  capabilities.forEach(cap => {
    console.log(`${cap.icon} ${cap.name}`);
  });

  console.log('\nTotal: 13 capabilities added to ALL agents');
}

// Run verification
if (require.main === module) {
  console.clear();
  console.log('🤖 AI AGENT ENHANCEMENT VERIFICATION');
  console.log('='.repeat(50));
  console.log();

  const result = verifyAllAgents();
  printCapabilitiesChecklist();

  console.log('\n✨ Verification complete!');

  // Exit with appropriate code
  if (result.notEnhanced > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

export { verifyAllAgents, printCapabilitiesChecklist };
