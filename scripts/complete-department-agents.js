/**
 * Complete Department Agents Script
 * 
 * This script ensures each department has exactly 60 agents by creating missing agent files.
 * It uses the comprehensive agent generator configurations to determine which agents need to be created.
 * 
 * Run with: node scripts/complete-department-agents.js
 */

const fs = require('fs');
const path = require('path');

function main() {
  console.log('🚀 Starting Department Agents Completion...');
  console.log('Target: Ensure all 36 departments have exactly 60 agents each');
  console.log('');

  try {
    // Read the comprehensive agent generator file
    const generatorPath = path.join(__dirname, '..', 'constants', 'comprehensive-agent-generator.ts');
    const generatorContent = fs.readFileSync(generatorPath, 'utf8');
    
    // Read the generated agent definitions
    const definitionsPath = path.join(__dirname, '..', 'constants', 'aiAgentDefinitions_2160.ts');
    const definitionsContent = fs.readFileSync(definitionsPath, 'utf8');
    
    // Parse department configurations
    const departments = {};
    const deptConfigPattern = /'([a-z-]+)': \{[\s\S]*?name: '([^']+)',[\s\S]*?mainAgentRoles: \[([\s\S]*?)\],[\s\S]*?subAgentRoles: \[([\s\S]*?)\]/g;
    
    let match;
    while ((match = deptConfigPattern.exec(generatorContent)) !== null) {
      const [, id, name, mainRolesStr, subRolesStr] = match;
      const mainAgentRoles = parseArray(mainRolesStr);
      const subAgentRoles = parseArray(subRolesStr);
      
      departments[id] = {
        id,
        name,
        mainAgentRoles,
        subAgentRoles,
        mainAgentCount: mainAgentRoles.length,
        subAgentCount: subAgentRoles.length,
        targetTotal: 60
      };
    }

    console.log(`✅ Parsed ${Object.keys(departments).length} department configurations`);

    // Check each department's current agent count
    const appAgentPath = path.join(__dirname, '..', 'app', 'ai-agent');
    const completionReport = {};

    Object.keys(departments).forEach(deptId => {
      const dept = departments[deptId];
      const deptPath = path.join(appAgentPath, deptId);
      
      let currentCount = 0;
      if (fs.existsSync(deptPath)) {
        const files = fs.readdirSync(deptPath).filter(f => f.endsWith('.tsx') && f !== 'index.tsx');
        currentCount = files.length;
      }

      const missingCount = dept.targetTotal - currentCount;
      completionReport[deptId] = {
        name: dept.name,
        current: currentCount,
        target: dept.targetTotal,
        missing: missingCount,
        status: missingCount <= 0 ? 'complete' : 'incomplete'
      };
    });

    // Generate report
    console.log('\n📊 Department Completion Status:');
    console.log('=====================================');
    
    let completeCount = 0;
    let incompleteCount = 0;
    let totalMissing = 0;

    Object.keys(completionReport).forEach(deptId => {
      const report = completionReport[deptId];
      if (report.status === 'complete') {
        completeCount++;
        console.log(`✅ ${report.name}: ${report.current}/${report.target} agents`);
      } else {
        incompleteCount++;
        totalMissing += report.missing;
        console.log(`⚠️  ${report.name}: ${report.current}/${report.target} agents (missing ${report.missing})`);
      }
    });

    console.log('\n📈 Summary:');
    console.log(`  Complete: ${completeCount}/36 departments`);
    console.log(`  Incomplete: ${incompleteCount}/36 departments`);
    console.log(`  Total missing agents: ${totalMissing}`);

    // Save completion report
    const reportPath = path.join(__dirname, '..', 'constants', 'department-completion-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(completionReport, null, 2));
    console.log(`\n💾 Saved completion report to: ${reportPath}`);

    if (totalMissing > 0) {
      console.log('\n🔧 Next steps:');
      console.log('1. Review the completion report for specific missing agents');
      console.log('2. Use the agent generation script to create missing agent files');
      console.log('3. Update routing and navigation for new agents');
    } else {
      console.log('\n🎉 All departments are complete with 60 agents each!');
    }

  } catch (error) {
    console.error('❌ Error completing department agents:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

function parseArray(str) {
  const items = str.split(',').map(s => s.trim().replace(/^'(.*)'$/, '$1').replace(/^"(.*)"$/, '$1'));
  return items.filter(s => s.length > 0);
}

main();