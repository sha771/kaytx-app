/**
 * Fill Remaining Departments Script
 * 
 * This script creates additional generic agent roles for departments that haven't reached 60 agents
 * to ensure all departments have exactly 60 agents as specified.
 * 
 * Run with: node scripts/fill-remaining-departments.js
 */

const fs = require('fs');
const path = require('path');

function main() {
  console.log('🚀 Starting Remaining Departments Fill...');
  console.log('Target: Ensure all departments have exactly 60 agents using generic roles');
  console.log('');

  try {
    // Read the completion report
    const reportPath = path.join(__dirname, '..', 'constants', 'department-completion-report.json');
    const completionReport = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

    // Read the comprehensive agent generator file for colors
    const generatorPath = path.join(__dirname, '..', 'constants', 'comprehensive-agent-generator.ts');
    const generatorContent = fs.readFileSync(generatorPath, 'utf8');

    // Parse department colors
    const deptColors = {};
    const deptColorPattern = /'([a-z-]+)': \{[\s\S]*?name: '([^']+)',[\s\S]*?color: '([^']+)'/g;
    
    let match;
    while ((match = deptColorPattern.exec(generatorContent)) !== null) {
      const [, id, name, color] = match;
      deptColors[id] = { id, name, color };
    }

    console.log(`✅ Parsed ${Object.keys(deptColors).length} department colors`);

    // Generate additional agents for incomplete departments
    const appAgentPath = path.join(__dirname, '..', 'app', 'ai-agent');
    let totalGenerated = 0;

    Object.keys(completionReport).forEach(deptId => {
      const report = completionReport[deptId];
      if (report.status === 'incomplete' && report.missing > 0) {
        const dept = deptColors[deptId];
        if (!dept) {
          console.log(`⚠️  Skipping ${deptId}: No color configuration found`);
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

        // Generate generic agent roles
        const genericRoles = [
          'Specialist I', 'Specialist II', 'Specialist III', 'Specialist IV',
          'Analyst I', 'Analyst II', 'Analyst III', 'Analyst IV',
          'Coordinator I', 'Coordinator II', 'Coordinator III', 'Coordinator IV',
          'Associate I', 'Associate II', 'Associate III', 'Associate IV',
          'Lead I', 'Lead II', 'Lead III', 'Lead IV',
          'Supervisor I', 'Supervisor II', 'Supervisor III', 'Supervisor IV',
          'Manager I', 'Manager II', 'Manager III', 'Manager IV',
          'Director I', 'Director II', 'Director III', 'Director IV',
          'Officer I', 'Officer II', 'Officer III', 'Officer IV',
          'Agent I', 'Agent II', 'Agent III', 'Agent IV',
          'Representative I', 'Representative II', 'Representative III', 'Representative IV',
          'Consultant I', 'Consultant II', 'Consultant III', 'Consultant IV',
          'Advisor I', 'Advisor II', 'Advisor III', 'Advisor IV',
          'Planner I', 'Planner II', 'Planner III', 'Planner IV',
        ];

        let generatedForDept = 0;
        let roleIndex = 0;

        while (generatedForDept < report.missing && roleIndex < genericRoles.length) {
          const role = genericRoles[roleIndex];
          const fileName = `${dept.id}-${role.toLowerCase().replace(/\s+/g, '-')}`;
          
          if (!existingFiles.has(fileName)) {
            try {
              const agentContent = generateGenericAgentFileContent(role, dept);
              const filePath = path.join(deptPath, `${fileName}.tsx`);
              fs.writeFileSync(filePath, agentContent);
              generatedForDept++;
              totalGenerated++;
            } catch (error) {
              console.error(`❌ Error generating ${fileName}: ${error.message}`);
            }
          }
          
          roleIndex++;
        }

        console.log(`✅ Generated ${generatedForDept} additional agents for ${dept.name}`);
      }
    });

    console.log(`\n📊 Generation Summary:`);
    console.log(`  Total additional agents generated: ${totalGenerated}`);
    console.log(`\n🎉 Remaining Departments Fill Complete!`);

  } catch (error) {
    console.error('❌ Error filling remaining departments:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

function generateGenericAgentFileContent(role, dept) {
  const fileName = `${dept.id}-${role.toLowerCase().replace(/\s+/g, '-')}`;
  const roleName = role.replace(/\s+/g, '');
  
  return `import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function ${dept.id.replace(/-/g, '')}${roleName}Page() {
  const agent = {
    id: '${fileName}',
    name: 'AI ${dept.name} ${role}',
    title: 'AI ${dept.name} ${role}',
    description: 'AI ${dept.name} ${role} provides specialized support and executes critical tasks for the ${dept.name} department. This AI agent automates workflows, provides insights, and collaborates with team members to achieve departmental goals with maximum efficiency.',
    capabilities: [
      'Task Automation',
      'Data Processing',
      'Workflow Management',
      'Department Operations',
      'Team Collaboration',
      'Quality Assurance',
      'Reporting',
      'Analysis',
    ],
    icon: Bot,
    color: '${dept.color}',
    type: 'employee' as const,
    humanCost: '$65k/year',
    aiCost: '$1.5k/year',
    efficiency: '43x efficiency improvement',
    replacesRole: '${fileName}',
    infrastructure: {
      status: 'online',
      health: 94 + Math.floor(Math.random() * 6),
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$5,400',
      tasksAutomatedDaily: 380,
      responseTime: '2.8s',
      accuracyRate: '94.2%',
      errorReduction: '82%',
      timeSaved: '73%',
    },
    performance: {
      tasksCompleted: 12000 + Math.floor(Math.random() * 4000),
      avgResponseTime: '2.6s',
      accuracy: '94.0%',
      uptime: '99.6%',
      userSatisfaction: '4.5/5',
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
      'Enterprise Platform',
      'Analytics Tools',
      'Communication Systems',
    ],
    kpis: [
      'Tasks Completed',
      'Response Time',
      'Accuracy Rate',
      'Team Satisfaction',
      'Cost Efficiency',
      'Process Improvement',
    ],
  };

  return <AgentPageWrapper agent={agent} />;
}`;
}

main();