/**
 * Agent Reference Scanner v3
 * Extracts ALL agent IDs from aiAgentHierarchyComplete.ts
 * (both defined agents and referenced IDs in directReports, escalation, peers, etc.)
 * Then scans the project to determine if each is connected or missing.
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const HIERARCHY_FILE = path.join(PROJECT_ROOT, 'constants', 'aiAgentHierarchyComplete.ts');

const SKIP_DIRS = new Set([
  'node_modules', '.git', 'coverage', 'dist', '.expo', 'logs',
  'diagrams', 'kubernetes', 'shaida speech and demo',
  'shaida the agents lib by shaida', 'shaidadoc',
]);

const SKIP_FILES = new Set([
  'aiAgentHierarchyComplete.ts',
  'aiAgentHierarchy.ts',
  'aiAgentHierarchyIndex.ts',
  'aiAgentHierarchyIndex_UPGRADED.ts',
  'aiAgentHierarchy_Managers.ts',
  'aiAgentHierarchy_NewDepartments.ts',
  'aiAgentHierarchy_TeamLeadsSpecialists.ts',
  'aiAgentHierarchy_UPGRADED.ts',
  'aiAgentHierarchy_ext.ts',
  'scan-agent-references.js',
  'agent-references.json',
]);

const SCAN_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.yaml', '.yml']);

console.log('=== KAYTX Agent Reference Scanner v3 ===\n');

// ============================================
// Step 1: Parse ALL IDs from the hierarchy file
// ============================================
console.log('Step 1: Parsing hierarchy file...');
const content = fs.readFileSync(HIERARCHY_FILE, 'utf-8');
const lines = content.split('\n');

// 1a: Extract defined agents (top-level id at 4-space indent)
const definedAgents = new Map(); // id -> { name, title, route, department, level }
let i = 0;
while (i < lines.length) {
  const line = lines[i];
  const topIdMatch = line.match(/^    id: '([^']+)',?\s*$/);
  if (topIdMatch) {
    const agentId = topIdMatch[1];
    const agent = { id: agentId, name: '', title: '', route: '', department: '', level: '' };
    let j = i + 1;
    while (j < lines.length && j < i + 200) {
      const ln = lines[j];
      if ((ln.match(/^    id: '/) || ln.trim() === '];') && j > i + 5) break;
      if (!agent.name) { const m = ln.match(/^    name: '([^']+)'/); if (m) agent.name = m[1]; }
      if (!agent.title) { const m = ln.match(/^    title: '([^']+)'/); if (m) agent.title = m[1]; }
      if (!agent.level) { const m = ln.match(/^    level: '([^']+)'/); if (m) agent.level = m[1]; }
      if (!agent.department) { const m = ln.match(/^    department: '([^']+)'/); if (m) agent.department = m[1]; }
      if (!agent.route) { const m = ln.match(/^    route: '([^']+)'/); if (m) agent.route = m[1]; }
      j++;
    }
    definedAgents.set(agentId, agent);
  }
  i++;
}
console.log(`  Defined agents (with full profiles): ${definedAgents.size}`);

// 1b: Extract ALL referenced IDs from arrays like directReports, canReceiveEscalationFrom, peerPositions, canEscalateTo
const allReferencedIds = new Set();

// Pattern: arrays with agent IDs in single quotes
// e.g., directReports: ['vp-finance', 'vp-accounting', ...]
// e.g., canReceiveEscalationFrom: ['vp-talent', 'vp-hr-ops', ...]
const arrayFieldRegex = /(?:directReports|canReceiveEscalationFrom|peerPositions|canEscalateTo|a2aEndpoints):\s*\[([^\]]+)\]/g;
let arrayMatch;
while ((arrayMatch = arrayFieldRegex.exec(content)) !== null) {
  const arrayContent = arrayMatch[1];
  // Extract all quoted strings that look like agent IDs (not API paths)
  const idRegex = /'([a-z][a-z0-9\-]+)'/g;
  let idMatch;
  while ((idMatch = idRegex.exec(arrayContent)) !== null) {
    const id = idMatch[1];
    // Skip API paths and non-ID values
    if (id.startsWith('/') || id.includes('.') || id === 'active' || id === 'development') continue;
    allReferencedIds.add(id);
  }
}

// Also add all defined agent IDs
for (const id of definedAgents.keys()) {
  allReferencedIds.add(id);
}

// Also look for any id: '...' pattern in the file (including orgChart, reportsTo, etc.)
const allIdRegex = /id:\s*'([a-z][a-z0-9\-]+)'/g;
let allIdMatch;
while ((allIdMatch = allIdRegex.exec(content)) !== null) {
  allReferencedIds.add(allIdMatch[1]);
}

// reportsTo field
const reportsToRegex = /reportsTo:\s*'([a-z][a-z0-9\-]+)'/g;
let reportsToMatch;
while ((reportsToMatch = reportsToRegex.exec(content)) !== null) {
  allReferencedIds.add(reportsToMatch[1]);
}

console.log(`  Total unique IDs referenced in file: ${allReferencedIds.size}`);

// Build full agent list: defined agents get full info, referenced-only get minimal info
const allAgents = [];
for (const id of allReferencedIds) {
  if (definedAgents.has(id)) {
    allAgents.push({ ...definedAgents.get(id), source: 'defined' });
  } else {
    allAgents.push({ id, name: id, title: '', route: '', department: '', level: '', source: 'referenced' });
  }
}

// Sort by source (defined first), then by id
allAgents.sort((a, b) => {
  if (a.source !== b.source) return a.source === 'defined' ? -1 : 1;
  return a.id.localeCompare(b.id);
});

console.log(`  Total agents to check: ${allAgents.length}\n`);

// ============================================
// Step 2: Collect project files
// ============================================
console.log('Step 2: Collecting project files...');

function collectFiles(dir) {
  const results = [];
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return results; }
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) results.push(...collectFiles(fullPath));
    } else if (entry.isFile()) {
      if (SKIP_FILES.has(entry.name)) continue;
      const ext = path.extname(entry.name).toLowerCase();
      if (SCAN_EXTENSIONS.has(ext)) results.push(fullPath);
    }
  }
  return results;
}

const projectFiles = collectFiles(PROJECT_ROOT);
console.log(`  Found ${projectFiles.length} files to scan.\n`);

// ============================================
// Step 3: Read all files
// ============================================
console.log('Step 3: Reading file contents...');
const fileContents = [];
for (const fp of projectFiles) {
  try { fileContents.push({ path: fp, content: fs.readFileSync(fp, 'utf-8') }); } catch (e) {}
}
console.log(`  Read ${fileContents.length} files.\n`);

// ============================================
// Step 4: Scan for references
// ============================================
console.log('Step 4: Scanning for agent references...');

const results = [];
let connectedCount = 0;
let missingCount = 0;

for (const agent of allAgents) {
  const references = [];
  const isShortId = agent.id.length <= 3;

  for (const { path: fp, content } of fileContents) {
    const relPath = path.relative(PROJECT_ROOT, fp).replace(/\\/g, '/');
    let found = false;
    let matchTypes = [];

    // Check for route references
    if (agent.route && content.includes(agent.route)) {
      found = true;
      matchTypes.push('route_reference');
    }

    // Check for quoted id references
    const quotedSingle = `'${agent.id}'`;
    const quotedDouble = `"${agent.id}"`;
    if (content.includes(quotedSingle) || content.includes(quotedDouble)) {
      // For very short IDs, require more context to avoid false positives
      if (isShortId) {
        // Only count if found in agent-related context
        const idx = content.indexOf(quotedSingle);
        const idx2 = content.indexOf(quotedDouble);
        const pos = idx >= 0 ? idx : idx2;
        if (pos >= 0) {
          const context = content.substring(Math.max(0, pos - 50), Math.min(content.length, pos + 50));
          if (context.includes('agent') || context.includes('Agent') || context.includes('route') || 
              context.includes('escalat') || context.includes('directReport') || context.includes('peer') ||
              context.includes('id:') || context.includes('id :') || context.includes('hierarchy') ||
              context.includes('/ai-agent/') || context.includes('Reports') || context.includes('import')) {
            found = true;
            matchTypes.push('quoted_id_context');
          }
        }
      } else {
        found = true;
        matchTypes.push('quoted_id');
      }
    }

    // Check for route-based file
    if (agent.route) {
      const routeFilePart = agent.route.replace('/ai-agent/', '');
      if (relPath.includes(routeFilePart)) {
        found = true;
        matchTypes.push('route_file');
      }
    }

    // Check for file named after agent
    const agentFileName = agent.id + '.tsx';
    const agentFileNameJs = agent.id + '.ts';
    if (relPath.endsWith('/' + agentFileName) || relPath.endsWith('/' + agentFileNameJs) ||
        relPath.endsWith('/' + agent.id + '/index.tsx') || relPath.endsWith('/' + agent.id + '/index.ts')) {
      found = true;
      if (!matchTypes.includes('route_file')) matchTypes.push('agent_file');
    }

    // For longer IDs, plain string match
    if (!isShortId && !found && content.includes(agent.id)) {
      found = true;
      matchTypes.push('string_match');
    }

    if (found) {
      references.push({
        file: relPath,
        types: [...new Set(matchTypes)],
      });
    }
  }

  const status = references.length > 0 ? 'connected' : 'missing';
  if (status === 'connected') connectedCount++;
  else missingCount++;

  results.push({
    agentId: agent.id,
    name: agent.name,
    title: agent.title || '',
    department: agent.department || '',
    level: agent.level || '',
    route: agent.route || '',
    source: agent.source,
    status,
    referenceCount: references.length,
    references,
  });
}

console.log(`  Connected: ${connectedCount}`);
console.log(`  Missing: ${missingCount}`);
console.log(`  Total: ${results.length}\n`);

// Sort: missing first, then by source, then department, then id
results.sort((a, b) => {
  if (a.status !== b.status) return a.status === 'missing' ? -1 : 1;
  if (a.source !== b.source) return a.source === 'defined' ? -1 : 1;
  if (a.department !== b.department) return (a.department || '').localeCompare(b.department || '');
  return a.agentId.localeCompare(b.agentId);
});

// ============================================
// Step 5: Write output
// ============================================
const output = {
  generatedAt: new Date().toISOString(),
  summary: {
    totalAgents: results.length,
    definedAgents: definedAgents.size,
    referencedOnlyIds: allReferencedIds.size - definedAgents.size,
    connected: connectedCount,
    missing: missingCount,
  },
  agents: results,
};

const outputPath = path.join(PROJECT_ROOT, 'agent-references.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log(`Step 5: Results written to ${outputPath}`);
console.log(`\n=== Scan Complete ===`);
console.log(`Total IDs: ${results.length} (Defined: ${definedAgents.size}, Referenced-only: ${allReferencedIds.size - definedAgents.size})`);
console.log(`Connected: ${connectedCount}`);
console.log(`Missing: ${missingCount}`);

// Print missing agents
const missingAgents = results.filter(r => r.status === 'missing');
if (missingAgents.length > 0) {
  console.log(`\n--- MISSING AGENTS (${missingAgents.length}) ---`);
  for (const r of missingAgents) {
    const info = r.source === 'defined' ? `[DEFINED]` : `[REFERENCED]`;
    console.log(`  ${info} ${r.agentId} | ${r.name} | ${r.department || 'n/a'}/${r.level || 'n/a'} | route: ${r.route || 'n/a'}`);
  }
}

// Department summary
console.log(`\n--- BY DEPARTMENT ---`);
const deptMap = {};
for (const r of results) {
  const dept = r.department || 'unknown';
  if (!deptMap[dept]) deptMap[dept] = { total: 0, connected: 0, missing: 0 };
  deptMap[dept].total++;
  if (r.status === 'connected') deptMap[dept].connected++;
  else deptMap[dept].missing++;
}
for (const [dept, stats] of Object.entries(deptMap).sort()) {
  console.log(`  ${dept}: ${stats.total} total, ${stats.connected} connected, ${stats.missing} missing`);
}
