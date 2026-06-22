/**
 * Generate Missing Agent Files Script
 * 
 * This script generates missing agent files for all departments to reach 60 agents each.
 * It uses the comprehensive agent generator configurations and creates appropriate React component files.
 * 
 * Run with: node scripts/generate-missing-agent-files.js
 */

const fs = require('fs');
const path = require('path');

function main() {
  console.log('🚀 Starting Missing Agent Files Generation...');
  console.log('Target: Generate all missing agent files to reach 60 per department');
  console.log('');

  try {
    // Read the completion report
    const reportPath = path.join(__dirname, '..', 'constants', 'department-completion-report.json');
    const completionReport = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

    // Read the comprehensive agent generator file
    const generatorPath = path.join(__dirname, '..', 'constants', 'comprehensive-agent-generator.ts');
    const generatorContent = fs.readFileSync(generatorPath, 'utf8');

    // Parse department configurations
    const departments = {};
    const deptConfigPattern = /'([a-z-]+)': \{[\s\S]*?name: '([^']+)',[\s\S]*?color: '([^']+)',[\s\S]*?mainAgentRoles: \[([\s\S]*?)\],[\s\S]*?subAgentRoles: \[([\s\S]*?)\],[\s\S]*?capabilities: \[([\s\S]*?)\]/g;
    
    let match;
    while ((match = deptConfigPattern.exec(generatorContent)) !== null) {
      const [, id, name, color, mainRolesStr, subRolesStr, capabilitiesStr] = match;
      const mainAgentRoles = parseArray(mainRolesStr);
      const subAgentRoles = parseArray(subRolesStr);
      const capabilities = parseArray(capabilitiesStr);
      
      departments[id] = {
        id,
        name,
        color,
        mainAgentRoles,
        subAgentRoles,
        capabilities,
        allRoles: [...mainAgentRoles, ...subAgentRoles]
      };
    }

    console.log(`✅ Parsed ${Object.keys(departments).length} department configurations`);

    // Generate missing agent files
    const appAgentPath = path.join(__dirname, '..', 'app', 'ai-agent');
    let totalGenerated = 0;
    let totalErrors = 0;

    Object.keys(completionReport).forEach(deptId => {
      const report = completionReport[deptId];
      if (report.status === 'incomplete' && report.missing > 0) {
        const dept = departments[deptId];
        if (!dept) {
          console.log(`⚠️  Skipping ${deptId}: No configuration found`);
          return;
        }

        const deptPath = path.join(appAgentPath, deptId);
        if (!fs.existsSync(deptPath)) {
          fs.mkdirSync(deptPath, { recursive: true });
        }

        // Get existing agent files
        const existingFiles = new Set();
        if (fs.existsSync(deptPath)) {
          const files = fs.readdirSync(deptPath).filter(f => f.endsWith('.tsx') && f !== 'index.tsx');
          files.forEach(f => existingFiles.add(f.replace('.tsx', '')));
        }

        // Generate missing agents
        const allRoles = dept.allRoles;
        let generatedForDept = 0;

        allRoles.forEach((role, index) => {
          const fileName = role.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          if (!existingFiles.has(fileName) && generatedForDept < report.missing) {
            try {
              const agentContent = generateAgentFileContent(role, dept, dept.capabilities);
              const filePath = path.join(deptPath, `${fileName}.tsx`);
              fs.writeFileSync(filePath, agentContent);
              generatedForDept++;
              totalGenerated++;
            } catch (error) {
              console.error(`❌ Error generating ${fileName}: ${error.message}`);
              totalErrors++;
            }
          }
        });

        console.log(`✅ Generated ${generatedForDept} agents for ${dept.name}`);
      }
    });

    console.log(`\n📊 Generation Summary:`);
    console.log(`  Total agents generated: ${totalGenerated}`);
    console.log(`  Total errors: ${totalErrors}`);
    console.log(`\n🎉 Missing Agent Files Generation Complete!`);

  } catch (error) {
    console.error('❌ Error generating missing agent files:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

function parseArray(str) {
  const items = str.split(',').map(s => s.trim().replace(/^'(.*)'$/, '$1').replace(/^"(.*)"$/, '$1'));
  return items.filter(s => s.length > 0);
}

function generateAgentFileContent(role, dept, capabilities) {
  const fileName = role.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const roleName = role.replace(/\s+/g, '');
  
  return `import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function ${roleName}Page() {
  const agent = {
    id: '${fileName}',
    name: 'AI ${role}',
    title: 'AI ${role}',
    description: 'AI ${role} provides specialized expertise and executes critical tasks for the ${dept.name} department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ${JSON.stringify(capabilities.slice(0, 8))},
    icon: Bot,
    color: '${dept.color}',
    type: 'employee' as const,
    humanCost: '$80k/year',
    aiCost: '$2k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: '${fileName}',
    infrastructure: {
      status: 'online',
      health: 95 + Math.floor(Math.random() * 5),
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6,500',
      tasksAutomatedDaily: 450,
      responseTime: '2.5s',
      accuracyRate: '95.5%',
      errorReduction: '85%',
      timeSaved: '75%',
    },
    performance: {
      tasksCompleted: 15000 + Math.floor(Math.random() * 5000),
      avgResponseTime: '2.3s',
      accuracy: '94.8%',
      uptime: '99.7%',
      userSatisfaction: '4.6/5',
    },
    features: {
      taskAutomation: true,
      dataProcessing: true,
      workflowManagement: true,
      reporting: true,
      integration: true,
      collaboration: true,
      learning: true,
      security: true,
    },
    integrations: [
      'Department Systems',
      'Enterprise CRM',
      'Analytics Platform',
      'Communication Tools',
    ],
    kpis: [
      'Tasks Completed',
      'Response Time',
      'Accuracy Rate',
      'User Satisfaction',
      'Cost Savings',
      'Efficiency Gain',
    ],
  };

  return <AgentPageWrapper agent={agent} />;
}`;
}

main();