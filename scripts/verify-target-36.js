/**
 * Verify Target 36 Departments Script
 * 
 * This script verifies that the 36 target departments specifically have 60+ agents each,
 * excluding other directories that may exist in the ai-agent folder.
 * 
 * Run with: node scripts/verify-target-36.js
 */

const fs = require('fs');
const path = require('path');

function main() {
  console.log('🎯 Verifying Target 36 Departments...');
  console.log('');

  try {
    // The 36 target departments
    const targetDepartments = [
      'customer-experience', 'sales-revenue', 'marketing-growth', 'operations-management',
      'finance-accounting', 'technology-engineering', 'human-resources', 'legal-compliance',
      'data-intelligence', 'product-management', 'security-risk', 'research-development',
      'administrative', 'trading-investments', 'real-estate-property', 'insurance-risk',
      'healthcare-medical', 'manufacturing-production', 'transportation-logistics',
      'government-public-sector', 'supply-chain-logistics', 'ai-management-governance',
      'banking-finance', 'ecommerce', 'professional-services', 'media-entertainment',
      'gaming-esports', 'education', 'retail-stores', 'travel-tourism', 'energy-utilities',
      'executive-strategy', 'event-management', 'agriculture', 'fashion-luxury', 'restaurants'
    ];

    const appAgentPath = path.join(__dirname, '..', 'app', 'ai-agent');
    const departmentStats = [];
    let totalAgents = 0;
    let departmentsWith60Plus = 0;

    console.log('📊 Analyzing 36 Target Departments:');
    console.log('='.repeat(80));
    console.log(`${'Department'.padEnd(40)} ${'Agents'.padStart(10)} ${'Status'.padStart(20)}`);
    console.log('-'.repeat(80));

    targetDepartments.forEach(deptId => {
      const deptPath = path.join(appAgentPath, deptId);
      let agentCount = 0;
      
      if (fs.existsSync(deptPath)) {
        const files = fs.readdirSync(deptPath).filter(f => f.endsWith('.tsx') && f !== 'index.tsx');
        agentCount = files.length;
      }
      
      totalAgents += agentCount;
      const meetsTarget = agentCount >= 60;
      if (meetsTarget) {
        departmentsWith60Plus++;
      }

      const displayName = deptId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const status = meetsTarget ? '✅ TARGET MET' : '❌ BELOW TARGET';
      const excess = agentCount > 60 ? ` (+${agentCount - 60})` : '';
      const deficit = agentCount < 60 ? ` (${60 - agentCount} short)` : '';

      departmentStats.push({
        id: deptId,
        name: displayName,
        agentCount,
        meetsTarget,
        excess: agentCount > 60 ? agentCount - 60 : 0,
        deficit: agentCount < 60 ? 60 - agentCount : 0
      });

      console.log(`${displayName.padEnd(40)} ${agentCount.toString().padStart(10)} ${status.padStart(20)}${excess}${deficit}`);
    });

    console.log('='.repeat(80));
    console.log('');
    console.log('🎯 Target 36 Departments Summary:');
    console.log('='.repeat(80));
    console.log(`Target Departments: ${targetDepartments.length}`);
    console.log(`Departments Meeting Target (60+ agents): ${departmentsWith60Plus}/${targetDepartments.length}`);
    console.log(`Total AI Agents in Target Depts: ${totalAgents}`);
    console.log(`Target Total: ${targetDepartments.length * 60} (36 × 60)`);
    console.log(`Achievement Rate: ${((departmentsWith60Plus / targetDepartments.length) * 100).toFixed(1)}%`);
    console.log('='.repeat(80));
    console.log('');

    if (departmentsWith60Plus === targetDepartments.length) {
      console.log('🎉 MISSION ACCOMPLISHED!');
      console.log('✅ ALL 36 TARGET DEPARTMENTS HAVE 60+ AGENTS EACH!');
      console.log(`📈 TOTAL AI WORKFORCE: ${totalAgents} AGENTS ACROSS 36 DEPARTMENTS`);
      console.log('');
      console.log('🚀 The platform has been successfully expanded and upgraded!');
    } else {
      console.log('⚠️  MISSION INCOMPLETE');
      console.log(`❌ ${targetDepartments.length - departmentsWith60Plus} departments still below target`);
    }

    // Save target verification report
    const targetReport = {
      timestamp: new Date().toISOString(),
      mission: 'Expand and upgrade all 36 departments to 60+ agents each',
      summary: {
        targetDepartments: targetDepartments.length,
        departmentsWith60Plus,
        totalAgents,
        targetTotal: targetDepartments.length * 60,
        achievementRate: (departmentsWith60Plus / targetDepartments.length) * 100,
        missionComplete: departmentsWith60Plus === targetDepartments.length
      },
      departmentStats
    };

    const reportPath = path.join(__dirname, '..', 'constants', 'target-36-verification.json');
    fs.writeFileSync(reportPath, JSON.stringify(targetReport, null, 2));
    console.log(`💾 Saved target verification report to: ${reportPath}`);

  } catch (error) {
    console.error('❌ Error during target verification:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();