/**
 * Task 1: Extract ALL agent IDs from completeAIWorkforce_1108.ts (v9.0 - 6935 lines)
 * Parses main agents and sub-agents from all department arrays.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SOURCE = path.join(ROOT, 'constants', 'completeAIWorkforce_1108.ts');

console.log('=== Task 1: Extract ALL Agent IDs ===\n');
const content = fs.readFileSync(SOURCE, 'utf-8');

const mainAgents = [];
const subAgents = [];
const allIds = new Set();
const duplicates = [];

// Extract main agents: id at 4-space indent
// Pattern: "    id: 'ai-...',"
const mainIdRegex = /^    id: '(ai-[^']+)',?/gm;
let m;

// We'll parse by scanning line by line
const lines = content.split('\n');
let i = 0;

while (i < lines.length) {
  const line = lines[i];
  
  // Main agent: "    id: 'ai-...'"  at exactly 4 spaces
  const mainMatch = line.match(/^    id: '(ai-[^']+)',?/);
  if (mainMatch) {
    const id = mainMatch[1];
    const agent = { id, uid: '', name: '', title: '', department: '', departmentId: 0, level: '', route: '', reportsTo: '', description: '', subAgentIds: [] };
    
    // Scan forward for fields (up to 40 lines)
    for (let j = i - 1; j < Math.min(i + 40, lines.length); j++) {
      if (j < 0) continue;
      const ln = lines[j];
      if (!agent.uid) { const um = ln.match(/uid:\s*'([^']+)'/); if (um) agent.uid = um[1]; }
      if (!agent.name) { const nm = ln.match(/^    name:\s*'([^']+)'/); if (nm) agent.name = nm[1]; }
      if (!agent.title) { const tm = ln.match(/^    title:\s*'([^']+)'/); if (tm) agent.title = tm[1]; }
      if (!agent.department) { const dm = ln.match(/^    department:\s*'([^']+)'/); if (dm) agent.department = dm[1]; }
      if (!agent.departmentId) { const dim = ln.match(/^    departmentId:\s*(\d+)/); if (dim) agent.departmentId = parseInt(dim[1]); }
      if (!agent.level) { const lm = ln.match(/^    level:\s*'([^']+)'/); if (lm) agent.level = lm[1]; }
      if (!agent.route) { const rm = ln.match(/^    route:\s*'([^']+)'/); if (rm) agent.route = rm[1]; }
      if (!agent.reportsTo) { const rtm = ln.match(/^    reportsTo:\s*'([^']+)'/); if (rtm) agent.reportsTo = rtm[1]; }
    }
    
    if (allIds.has(id)) {
      duplicates.push(id);
    } else {
      allIds.add(id);
      mainAgents.push(agent);
    }
  }
  
  // Sub-agent: inline object with id, uid, name, title, parentId
  // Pattern: "{ id: 'ai-...', uid: 'ktx-...', name: '...', title: '...', parentId: '...'"
  const subMatch = line.match(/\{\s*id:\s*'(ai-[^']+)',\s*uid:\s*'([^']+)',\s*name:\s*'([^']+)',\s*title:\s*'([^']+)',\s*parentId:\s*'([^']+)'/);
  if (subMatch) {
    const sub = {
      id: subMatch[1],
      uid: subMatch[2],
      name: subMatch[3],
      title: subMatch[4],
      parentId: subMatch[5],
      description: '',
    };
    
    // Extract description from same line
    const descMatch = line.match(/description:\s*'([^']+)'/);
    if (descMatch) sub.description = descMatch[1];
    
    // Get department from parent
    const parent = mainAgents[mainAgents.length - 1];
    if (parent) {
      sub.department = parent.department;
      sub.departmentId = parent.departmentId;
      parent.subAgentIds.push(sub.id);
    }
    
    if (allIds.has(sub.id)) {
      duplicates.push(sub.id);
    } else {
      allIds.add(sub.id);
      subAgents.push(sub);
    }
  }
  
  i++;
}

// Assign routes for agents missing them
for (const agent of mainAgents) {
  if (!agent.route && agent.department && agent.id) {
    const slug = agent.id.replace('ai-', '');
    const deptSlug = agent.department.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
    agent.route = `/ai-agent/${deptSlug}/${slug}`;
  }
}
for (const sub of subAgents) {
  if (!sub.route) {
    const slug = sub.id.replace('ai-', '');
    const deptSlug = (sub.department || 'general').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
    sub.route = `/ai-agent/${deptSlug}/${slug}`;
  }
}

console.log(`Main agents: ${mainAgents.length}`);
console.log(`Sub-agents: ${subAgents.length}`);
console.log(`Total unique IDs: ${allIds.size}`);
console.log(`Duplicates: ${duplicates.length}`);

if (duplicates.length > 0) {
  console.log(`\nDuplicate IDs (${[...new Set(duplicates)].length} unique):`);
  for (const d of [...new Set(duplicates)].slice(0, 20)) {
    console.log(`  - ${d}`);
  }
}

// Department breakdown
const deptCounts = {};
for (const a of mainAgents) {
  const dept = a.department || 'unknown';
  if (!deptCounts[dept]) deptCounts[dept] = { main: 0, sub: 0, deptId: a.departmentId };
  deptCounts[dept].main++;
}
for (const a of subAgents) {
  const dept = a.department || 'unknown';
  if (!deptCounts[dept]) deptCounts[dept] = { main: 0, sub: 0, deptId: a.departmentId };
  deptCounts[dept].sub++;
}

console.log(`\n--- By Department ---`);
let totalMain = 0, totalSub = 0;
for (const [dept, c] of Object.entries(deptCounts).sort((a,b) => a[1].deptId - b[1].deptId)) {
  console.log(`  [${String(c.deptId).padStart(2)}] ${dept}: ${c.main} main + ${c.sub} sub = ${c.main + c.sub}`);
  totalMain += c.main;
  totalSub += c.sub;
}
console.log(`  TOTAL: ${totalMain} main + ${totalSub} sub = ${totalMain + totalSub}`);

// Check route coverage
const withRoute = mainAgents.filter(a => a.route).length;
console.log(`\nMain agents with route: ${withRoute}/${mainAgents.length}`);

// Output
const output = {
  extractedAt: new Date().toISOString(),
  summary: {
    mainAgents: mainAgents.length,
    subAgents: subAgents.length,
    totalUnique: allIds.size,
    duplicates: duplicates.length,
    departments: Object.keys(deptCounts).length,
  },
  mainAgents,
  subAgents,
};

const outPath = path.join(__dirname, '1108-agents-raw.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log(`\nOutput: ${outPath}`);
