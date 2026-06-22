const d = require('../agent-references.json');
console.log(`\n=== ALL ${d.summary.totalAgents} UNIQUE AGENT IDs ===\n`);
console.log('--- DEFINED AGENTS (with full profiles) ---');
let n = 0;
d.agents.filter(a => a.source === 'defined').forEach((a, i) => {
  n++;
  console.log(`${n}. ${a.agentId} [${a.status}] | ${a.name} | ${a.department}/${a.level} | route: ${a.route}`);
});
console.log(`\n--- REFERENCED-ONLY IDs (mentioned in arrays but no profile) ---`);
d.agents.filter(a => a.source === 'referenced').forEach((a, i) => {
  n++;
  console.log(`${n}. ${a.agentId} [${a.status}]`);
});
console.log(`\nTotal: ${n}`);
