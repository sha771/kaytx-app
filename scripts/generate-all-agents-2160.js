/**
 * Generate All 2,160 Agent Definitions
 * 
 * This script generates all agent definitions for the complete AI workforce
 * by parsing the comprehensive agent generator configurations and creating
 * individual agent definitions.
 * 
 * Run with: node scripts/generate-all-agents-2160.js
 */

const fs = require('fs');
const path = require('path');

function main() {
  console.log('🚀 Starting Agent Definitions Generation...');
  console.log('Target: Generate definitions for 2,160 agents across 36 departments');
  console.log('');

  try {
    // Read the comprehensive agent generator file
    const generatorPath = path.join(__dirname, '..', 'constants', 'comprehensive-agent-generator.ts');
    const generatorContent = fs.readFileSync(generatorPath, 'utf8');
    
    // Extract all department configurations
    const departments = {};
    const deptConfigPattern = /'([a-z-]+)': \{[\s\S]*?name: '([^']+)',[\s\S]*?color: '([^']+)',[\s\S]*?mainAgentRoles: \[([\s\S]*?)\],[\s\S]*?subAgentRoles: \[([\s\S]*?)\],[\s\S]*?capabilities: \[([\s\S]*?)\],[\s\S]*?integrations: \[([\s\S]*?)\],[\s\S]*?kpis: \[([\s\S]*?)\][\s\S]*?\}/g;
    
    let match;
    while ((match = deptConfigPattern.exec(generatorContent)) !== null) {
      const [, id, name, color, mainRolesStr, subRolesStr, capabilitiesStr, integrationsStr, kpisStr] = match;
      
      // Parse the arrays
      const mainAgentRoles = parseArray(mainRolesStr);
      const subAgentRoles = parseArray(subRolesStr);
      const capabilities = parseArray(capabilitiesStr);
      const integrations = parseArray(integrationsStr);
      const kpis = parseArray(kpisStr);
      
      departments[id] = {
        id,
        name,
        color,
        mainAgentRoles,
        subAgentRoles,
        capabilities,
        integrations,
        kpis,
        mainAgentCount: mainAgentRoles.length,
        subAgentCount: subAgentRoles.length
      };
    }

    console.log(`✅ Parsed ${Object.keys(departments).length} department configurations`);

    // Generate agent definitions for each department
    const allAgents = [];
    const departmentAgents = {};

    Object.keys(departments).forEach(deptId => {
      const dept = departments[deptId];
      const deptAgents = [];
      
      // Generate main agents
      dept.mainAgentRoles.forEach((role, index) => {
        const agent = generateMainAgent(deptId, dept, role, index);
        deptAgents.push(agent);
        allAgents.push(agent);
      });
      
      // Generate sub-agents
      dept.subAgentRoles.forEach((role, index) => {
        const parentIndex = Math.floor(index / Math.ceil(dept.subAgentCount / dept.mainAgentCount));
        const agent = generateSubAgent(deptId, dept, role, index, parentIndex, dept.mainAgentRoles[parentIndex]);
        deptAgents.push(agent);
        allAgents.push(agent);
      });
      
      departmentAgents[deptId] = deptAgents;
    });

    console.log(`✅ Generated ${allAgents.length} agent definitions`);

    // Create the complete workforce data structure
    const workforceData = {
      timestamp: new Date().toISOString(),
      summary: {
        totalDepartments: Object.keys(departments).length,
        totalMainAgents: allAgents.filter(a => a.level !== 'specialist').length,
        totalSubAgents: allAgents.filter(a => a.level === 'specialist').length,
        totalAgents: allAgents.length
      },
      departments: departmentAgents,
      allAgents
    };

    // Save to TypeScript file
    const outputPath = path.join(__dirname, '..', 'constants');
    const tsPath = path.join(outputPath, 'aiAgentDefinitions_2160.ts');
    
    const tsContent = generateTypeScriptContent(workforceData, departments);
    fs.writeFileSync(tsPath, tsContent);
    
    console.log(`💾 Saved agent definitions to: ${tsPath}`);
    console.log('');
    console.log('🎉 Agent Definitions Generation Complete!');
    console.log(`📊 Generated ${workforceData.summary.totalAgents} agent definitions across ${workforceData.summary.totalDepartments} departments`);

  } catch (error) {
    console.error('❌ Error generating agent definitions:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

function parseArray(str) {
  const items = str.split(',').map(s => s.trim().replace(/^'(.*)'$/, '$1').replace(/^"(.*)"$/, '$1'));
  return items.filter(s => s.length > 0);
}

function generateMainAgent(deptId, dept, role, index) {
  const levels = ['c_level', 'vp_director', 'manager', 'team_lead', 'specialist'];
  const levelIndex = Math.min(index, Math.floor(dept.mainAgentCount / 4));
  const level = levels[levelIndex] || 'specialist';
  
  const agentId = `${deptId}-${role.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
  const uid = `ktx-${deptId.substring(0, 2)}-${index + 1}`;
  
  return {
    id: agentId,
    uid,
    name: `AI ${role}`,
    title: role,
    department: dept.name,
    departmentId: Object.keys(getAllDeptIds()).indexOf(deptId),
    level,
    description: `AI ${role} provides specialized expertise and executes critical tasks for the ${dept.name} department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.`,
    capabilities: dept.capabilities.slice(0, 5),
    responsibilities: [
      `Execute ${role.toLowerCase()} responsibilities`,
      'Collaborate with team members',
      'Ensure quality output',
      'Meet SLA requirements'
    ],
    icon: 'Bot',
    color: dept.color,
    route: `/ai-agent/${deptId}/${agentId}`,
    subAgents: [],
    reportsTo: index > 0 ? `${deptId}-${dept.mainAgentRoles[0].toLowerCase().replace(/\s+/g, '-')}` : undefined,
    aiCost: level === 'c_level' ? '$2,400/mo' : level === 'vp_director' ? '$1,800/mo' : level === 'manager' ? '$1,200/mo' : '$800/mo',
    efficiency: `${85 + Math.floor(Math.random() * 10)}%`,
    isPremium: level === 'c_level' || level === 'vp_director'
  };
}

function generateSubAgent(deptId, dept, role, index, parentIndex, parentRole) {
  const agentId = `${deptId}-${role.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
  const uid = `ktx-${deptId.substring(0, 2)}-${index + 1}`;
  const parentId = `${deptId}-${parentRole.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
  
  return {
    id: agentId,
    uid,
    name: `AI ${role}`,
    title: role,
    department: dept.name,
    departmentId: Object.keys(getAllDeptIds()).indexOf(deptId),
    level: 'specialist',
    description: `AI ${role} provides specialized expertise and executes critical tasks for the ${dept.name} department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.`,
    capabilities: dept.capabilities.slice(0, 3),
    responsibilities: [
      `Execute ${role.toLowerCase()} responsibilities`,
      'Support main agent activities',
      'Ensure quality output',
      'Meet operational requirements'
    ],
    icon: 'Bot',
    color: dept.color,
    route: `/ai-agent/${deptId}/${agentId}`,
    subAgents: [],
    reportsTo: parentId,
    aiCost: '$400/mo',
    efficiency: `${80 + Math.floor(Math.random() * 15)}%`,
    isPremium: false
  };
}

function getAllDeptIds() {
  // This will be populated when departments are parsed
  return [];
}

function generateTypeScriptContent(workforceData, departments) {
  return `/**
 * =============================================================================
 * KAYTX AI WORKFORCE - COMPLETE AGENT DEFINITIONS (2,160 AGENTS)
 * =============================================================================
 * Total: 720 Main Agents + 1,440 Sub-Agents = 2,160 AI Agents & Employees
 * Departments: 36 (22 Core + 14 Industry-Specific)
 * Agents per Department: 60 (20 Main + 40 Sub)
 * @version 13.0.0
 * @lastUpdated ${new Date().toISOString()}
 * @generatedBy generate-all-agents-2160.js
 */

export interface AIAgent {
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
  subAgents: any[];
  reportsTo?: string;
  aiCost: string;
  efficiency: string;
  isPremium: boolean;
}

export const workforceSummary = ${JSON.stringify(workforceData.summary, null, 2)};

export const departmentConfigurations = ${JSON.stringify(departments, null, 2)};

export const allAgents: AIAgent[] = ${JSON.stringify(workforceData.allAgents, null, 2)};

export const departmentAgents: Record<string, AIAgent[]> = ${JSON.stringify(workforceData.departments, null, 2)};

// Helper functions to get agents by department
export function getAgentsByDepartment(departmentId: string): AIAgent[] {
  return departmentAgents[departmentId] || [];
}

export function getAgentById(agentId: string): AIAgent | undefined {
  return allAgents.find(agent => agent.id === agentId);
}

export function getMainAgents(departmentId: string): AIAgent[] {
  return getAgentsByDepartment(departmentId).filter(agent => agent.level !== 'specialist');
}

export function getSubAgents(departmentId: string): AIAgent[] {
  return getAgentsByDepartment(departmentId).filter(agent => agent.level === 'specialist');
}
`;
}

main();