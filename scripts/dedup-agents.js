/**
 * Task 1b: Deduplicate agents and produce final 1,108 unique agent list.
 * - Reads 1108-agents-raw.json
 * - Resolves duplicate IDs by appending department suffix
 * - Outputs clean 1108-agents-final.json with all unique IDs
 */
const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '1108-agents-raw.json'), 'utf-8'));

console.log('=== Task 1b: Deduplicate and Finalize ===\n');

const mainAgents = raw.mainAgents;
const subAgents = raw.subAgents;

// Track all IDs and resolve duplicates
const idMap = new Map(); // id -> agent
const resolvedAgents = [];
let dupeCount = 0;

function addAgent(agent, type) {
  const origId = agent.id;
  if (idMap.has(origId)) {
    // Duplicate - generate new ID by appending dept number
    const newId = `${origId}-dept${agent.departmentId}`;
    dupeCount++;
    console.log(`  DUPE: ${origId} -> ${newId} (dept ${agent.departmentId})`);
    agent.originalId = origId;
    agent.id = newId;
    // Also update uid if exists
    if (agent.uid) {
      agent.originalUid = agent.uid;
      agent.uid = agent.uid + `-d${agent.departmentId}`;
    }
  }
  idMap.set(agent.id, agent);
  agent.type = type;
  resolvedAgents.push(agent);
}

for (const a of mainAgents) addAgent(a, 'main');
for (const a of subAgents) addAgent(a, 'sub');

console.log(`\nDuplicates resolved: ${dupeCount}`);
console.log(`Total unique agents: ${idMap.size}`);

// Department summary
const deptCounts = {};
for (const a of resolvedAgents) {
  const dept = a.department || 'unknown';
  if (!deptCounts[dept]) deptCounts[dept] = { main: 0, sub: 0, deptId: a.departmentId };
  if (a.type === 'main') deptCounts[dept].main++;
  else deptCounts[dept].sub++;
}

console.log(`\n--- By Department ---`);
let totalMain = 0, totalSub = 0;
for (const [dept, c] of Object.entries(deptCounts).sort((a,b) => a[1].deptId - b[1].deptId)) {
  console.log(`  [${String(c.deptId).padStart(2)}] ${dept}: ${c.main} main + ${c.sub} sub = ${c.main + c.sub}`);
  totalMain += c.main;
  totalSub += c.sub;
}
console.log(`  TOTAL: ${totalMain} main + ${totalSub} sub = ${totalMain + totalSub}`);

// Verify uniqueness
const allIds = resolvedAgents.map(a => a.id);
const uniqueIds = new Set(allIds);
console.log(`\nUniqueness check: ${allIds.length} total, ${uniqueIds.size} unique ${allIds.length === uniqueIds.size ? 'PASS' : 'FAIL'}`);

// Output
const output = {
  generatedAt: new Date().toISOString(),
  summary: {
    totalAgents: resolvedAgents.length,
    mainAgents: totalMain,
    subAgents: totalSub,
    departments: Object.keys(deptCounts).length,
    duplicatesResolved: dupeCount,
    allUnique: allIds.length === uniqueIds.size,
  },
  agents: resolvedAgents.map(a => ({
    id: a.id,
    uid: a.uid || '',
    originalId: a.originalId || '',
    name: a.name || a.title,
    title: a.title,
    department: a.department || '',
    departmentId: a.departmentId || 0,
    level: a.level || '',
    route: a.route || '',
    reportsTo: a.reportsTo || '',
    parentId: a.parentId || '',
    type: a.type,
    description: a.description || '',
    subAgentIds: a.subAgentIds || [],
  })),
};

const outPath = path.join(__dirname, '1108-agents-final.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log(`\nOutput: ${outPath}`);
