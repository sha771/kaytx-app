const agentData = require('./agent-data.js');

const agents = [];

// Get department map for slug lookup
const deptMap = {};
agentData.departments.forEach(dept => {
  deptMap[dept.id] = dept.slug;
});

// Extract all main agents and sub-agents
Object.entries(agentData.agents).forEach(([deptId, deptAgents]) => {
  const deptSlug = deptMap[parseInt(deptId)];
  
  if (Array.isArray(deptAgents)) {
    deptAgents.forEach(mainAgent => {
      // Add main agent
      const mainAgentId = mainAgent.s; // Use slug as ID
      agents.push({
        id: mainAgentId,
        route: `/ai-agent/${deptSlug}/${mainAgentId}`
      });

      // Add sub-agents
      if (mainAgent.sub && Array.isArray(mainAgent.sub)) {
        mainAgent.sub.forEach(subAgent => {
          const subAgentId = subAgent.s;
          agents.push({
            id: subAgentId,
            route: `/ai-agent/${deptSlug}/${subAgentId}`
          });
        });
      }
    });
  }
});

// Sort by ID for readability
agents.sort((a, b) => a.id.localeCompare(b.id));

// Print in requested format
console.log(`Total agents: ${agents.length}\n`);
agents.forEach(agent => {
  console.log(`'${agent.id}' → ${agent.route}`);
});

// Also save to a file
const fs = require('fs');
const output = agents.map(a => `'${a.id}' → ${a.route}`).join('\n');
fs.writeFileSync('agents-list.txt', `Total: ${agents.length} agents\n\n${output}`);
console.log(`\n✓ Saved to agents-list.txt`);
