const agentData = require('./agent-data.js');

const depts = agentData.departments;
const agentsByDept = agentData.agents;

// Build a map from department slug to department info
const deptMap = {};
depts.forEach(d => {
  deptMap[d.id] = d;
});

let allAgents = [];

// Iterate over each department
for (let deptId in agentsByDept) {
  const dept = deptMap[parseInt(deptId)];
  if (!dept) continue;
  const deptSlug = dept.slug;
  const agentList = agentsByDept[deptId];
  agentList.forEach(agent => {
    const slug = agent.s;
    allAgents.push({ slug, deptSlug });
    // Also process sub-agents
    if (agent.sub) {
      agent.sub.forEach(sub => {
        allAgents.push({ slug: sub.s, deptSlug });
      });
    }
  });
}

// Sort by slug
allAgents.sort((a, b) => a.slug.localeCompare(b.slug));

// Output
console.log(`KAYTX AI WORKFORCE - COMPLETE AGENT LINKS`);
console.log(`${'='.repeat(100)}\n`);
console.log(`Total agents found: ${allAgents.length}\n`);
allAgents.forEach(a => {
  console.log(`'${a.slug}' → /ai-agent/${a.deptSlug}/${a.slug}`);
});

// Save to file
const output = allAgents.map(a => `'${a.slug}' → /ai-agent/${a.deptSlug}/${a.slug}`).join('\n');
const fs = require('fs');
fs.writeFileSync('agent-links-1108.txt', `KAYTX AI WORKFORCE - COMPLETE AGENT LINKS\nTotal: ${allAgents.length} agents\n${'='.repeat(100)}\n\n${output}`);

console.log(`\n${'='.repeat(100)}\n✓ Saved to agent-links-1108.txt (${allAgents.length} agents)`);