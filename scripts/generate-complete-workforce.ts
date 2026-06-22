/**
 * Generate Complete AI Workforce Script
 * 
 * This script generates the complete AI workforce with 2,160 agents across 36 departments
 * (60 agents per department: 20 main + 40 sub)
 * 
 * Run with: npx ts-node scripts/generate-complete-workforce.ts
 */

import fs from 'fs';
import path from 'path';
import { generateAllAgents } from '../constants/comprehensive-agent-generator';

interface GeneratedWorkforce {
  timestamp: string;
  summary: {
    totalDepartments: number;
    totalMainAgents: number;
    totalSubAgents: number;
    totalAgents: number;
    targetAgentsPerDepartment: number;
  };
  departments: {
    [key: string]: {
      name: string;
      mainAgents: any[];
      subAgents: any[];
      totalAgents: number;
    }
  };
  allMainAgents: any[];
  allSubAgents: any[];
  allAgents: any[];
}

function main() {
  console.log('🚀 Starting Complete AI Workforce Generation...');
  console.log('Target: 2,160 agents across 36 departments (60 per department)');
  console.log('');

  try {
    // Generate all agents using the comprehensive generator
    const generatedData = generateAllAgents();
    
    const workforce: GeneratedWorkforce = {
      timestamp: new Date().toISOString(),
      summary: {
        totalDepartments: Object.keys(generatedData.mainAgents).length,
        totalMainAgents: generatedData.allMainAgents.length,
        totalSubAgents: generatedData.allSubAgents.length,
        totalAgents: generatedData.allAgents.length,
        targetAgentsPerDepartment: 60
      },
      departments: {},
      allMainAgents: generatedData.allMainAgents,
      allSubAgents: generatedData.allSubAgents,
      allAgents: generatedData.allAgents
    };

    // Build department summary
    Object.keys(generatedData.mainAgents).forEach(deptId => {
      workforce.departments[deptId] = {
        name: deptId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        mainAgents: generatedData.mainAgents[deptId],
        subAgents: generatedData.subAgents[deptId],
        totalAgents: generatedData.mainAgents[deptId].length + generatedData.subAgents[deptId].length
      };
    });

    // Output summary
    console.log('✅ Generation Complete!');
    console.log('');
    console.log('Summary:');
    console.log(`  Total Departments: ${workforce.summary.totalDepartments}`);
    console.log(`  Total Main Agents: ${workforce.summary.totalMainAgents}`);
    console.log(`  Total Sub-Agents: ${workforce.summary.totalSubAgents}`);
    console.log(`  Total Agents: ${workforce.summary.totalAgents}`);
    console.log(`  Target per Department: ${workforce.summary.targetAgentsPerDepartment}`);
    console.log('');

    // Verify each department has exactly 60 agents
    let departmentsWithCorrectCount = 0;
    Object.keys(workforce.departments).forEach(deptId => {
      const dept = workforce.departments[deptId];
      if (dept.totalAgents === 60) {
        departmentsWithCorrectCount++;
      } else {
        console.log(`⚠️  Department ${deptId} has ${dept.totalAgents} agents (expected 60)`);
      }
    });

    console.log(`✅ ${departmentsWithCorrectCount}/${workforce.summary.totalDepartments} departments have exactly 60 agents`);
    console.log('');

    // Save to files
    const outputPath = path.join(__dirname, '..', 'constants');
    
    // Save complete workforce as JSON
    const jsonPath = path.join(outputPath, 'completeAIWorkforce_2160.json');
    fs.writeFileSync(jsonPath, JSON.stringify(workforce, null, 2));
    console.log(`💾 Saved complete workforce to: ${jsonPath}`);

    // Save as TypeScript file
    const tsPath = path.join(outputPath, 'completeAIWorkforce_2160.ts');
    const tsContent = `/**
 * =============================================================================
 * KAYTX AI WORKFORCE - COMPLETE DATABASE (2,160 AGENTS & EMPLOYEES)
 * =============================================================================
 * Total: 720 Main Agents + 1,440 Sub-Agents = 2,160 AI Agents & Employees
 * Departments: 36 (22 Core + 14 Industry-Specific)
 * Agents per Department: 60 (20 Main + 40 Sub)
 * @version 13.0.0
 * @lastUpdated ${new Date().toISOString()}
 * @generatedBy generate-complete-workforce.ts
 */

export interface SubAgent {
  id: string;
  uid: string;
  name: string;
  title: string;
  description: string;
  capabilities: string[];
  parentId: string;
}

export interface MainAgent {
  id: string;
  uid: string;
  name: string;
  title: string;
  department: string;
  departmentId: number;
  level: 'c_level' | 'vp_director' | 'manager' | 'team_lead' | 'specialist';
  description: string;
  capabilities: string[];
  responsibilities: string[];
  icon: string;
  color: string;
  route: string;
  subAgents: SubAgent[];
  reportsTo?: string;
  aiCost: string;
  efficiency: string;
  isPremium: boolean;
}

export interface Department {
  id: number;
  name: string;
  shortName: string;
  color: string;
  icon: string;
  mainAgents: number;
  subAgents: number;
  total: number;
}

export const workforceData = ${JSON.stringify(workforce, null, 2)} as any;

// Export departments array for compatibility
export const departments: Department[] = Object.entries(workforceData.departments).map(([key, value]: [string, any], index) => ({
  id: index,
  name: value.name,
  shortName: value.name.substring(0, 15),
  color: '#007AFF',
  icon: 'Bot',
  mainAgents: value.mainAgents.length,
  subAgents: value.subAgents.length,
  total: value.totalAgents
}));

// Export all agents for compatibility
export const allAgents = workforceData.allAgents;
export const mainAgents = workforceData.allMainAgents;
export const subAgents = workforceData.allSubAgents;
`;

    fs.writeFileSync(tsPath, tsContent);
    console.log(`💾 Saved TypeScript version to: ${tsPath}`);

    console.log('');
    console.log('🎉 Complete AI Workforce Generation Finished!');
    console.log('📊 Ready to deploy 2,160 AI agents across 36 departments');

  } catch (error) {
    console.error('❌ Error generating workforce:', error);
    process.exit(1);
  }
}

main();