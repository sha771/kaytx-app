// Comprehensive scan of ALL agent IDs across the entire project
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// 1. Scan all constants files for agent IDs
const constantsDir = path.join(ROOT, 'constants');
const constantsFiles = fs.readdirSync(constantsDir).filter(f => f.endsWith('.ts'));

console.log('=== SCANNING CONSTANTS FILES ===\n');
const allIds = new Map(); // id -> { sources: [], name, title, route, department, level }

for (const file of constantsFiles) {
  const fp = path.join(constantsDir, file);
  const content = fs.readFileSync(fp, 'utf-8');
  
  // Extract id fields with surrounding context
  const idRegex = /id:\s*'([a-z][a-z0-9\-]+)'/g;
  let m;
  const ids = new Set();
  while ((m = idRegex.exec(content)) !== null) {
    ids.add(m[1]);
  }
  
  if (ids.size > 0) {
    console.log(`  ${file}: ${ids.size} IDs`);
    for (const id of ids) {
      if (!allIds.has(id)) {
        allIds.set(id, { sources: [], name: '', title: '', route: '', department: '', level: '' });
      }
      allIds.get(id).sources.push(file);
    }
  }
}

// 2. Scan agent page files in app/ai-agent/
console.log('\n=== SCANNING AGENT PAGE FILES ===\n');
const agentDir = path.join(ROOT, 'app', 'ai-agent');
let pageCount = 0;
const pageIds = new Set();

function scanAgentPages(dir, prefix) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanAgentPages(fullPath, prefix + '/' + entry.name);
    } else if (entry.name.endsWith('.tsx') && entry.name !== '_layout.tsx') {
      pageCount++;
      const baseName = entry.name.replace('.tsx', '');
      const routePath = '/ai-agent' + prefix + '/' + baseName;
      
      // Read file to extract agent details if defined
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const idMatch = content.match(/id:\s*'([a-z][a-z0-9\-]+)'/);
        const agentId = idMatch ? idMatch[1] : baseName;
        pageIds.add(agentId);
        
        if (!allIds.has(agentId)) {
          allIds.set(agentId, { sources: [], name: '', title: '', route: routePath, department: '', level: '' });
        }
        const agent = allIds.get(agentId);
        agent.sources.push('page:' + prefix + '/' + entry.name);
        if (!agent.route) agent.route = routePath;
        
        // Extract properties from page file content if not already set
        if (!agent.name) { const m = content.match(/name:\s*['"]([^'"]+)['"]/); if (m) agent.name = m[1]; }
        if (!agent.title) { const m = content.match(/title:\s*['"]([^'"]+)['"]/); if (m) agent.title = m[1]; }
        if (!agent.department) { const m = content.match(/department:\s*['"]([^'"]+)['"]/); if (m) agent.department = m[1]; }
        if (!agent.level) { const m = content.match(/level:\s*['"]([^'"]+)['"]/); if (m) agent.level = m[1]; }
      } catch(e) {}
    }
  }
}

scanAgentPages(agentDir, '');
console.log(`  Agent page files: ${pageCount}`);
console.log(`  Unique IDs from pages: ${pageIds.size}`);

// 3. Scan other key source files
console.log('\n=== SCANNING OTHER SOURCES ===\n');
const otherSources = [
  'components/ai-agent/AIAgentsSidebar.tsx',
  'hooks/useAIAgents.ts',
  'hooks/useAIAgents.web.ts',
  'constants/aiAgentsSidebarData.ts',
  'constants/completeAIWorkforce_1108.ts',
  'constants/aiEmployees.ts',
  'constants/aiEmployeesEnhanced.ts',
  'constants/customerExperienceAgents.ts',
  'constants/privacy-agents.ts',
  'constants/services.ts',
];

for (const src of otherSources) {
  const fp = path.join(ROOT, src);
  if (!fs.existsSync(fp)) continue;
  const content = fs.readFileSync(fp, 'utf-8');
  const idRegex = /id:\s*'([a-z][a-z0-9\-]+)'/g;
  let m;
  let count = 0;
  while ((m = idRegex.exec(content)) !== null) {
    count++;
    if (!allIds.has(m[1])) {
      allIds.set(m[1], { sources: [], name: '', title: '', route: '', department: '', level: '' });
    }
    if (!allIds.get(m[1]).sources.includes(src)) {
      allIds.get(m[1]).sources.push(src);
    }
  }
  if (count > 0) console.log(`  ${src}: ${count} ID refs`);
}

// 4. Extract more details from key definition files
console.log('\n=== EXTRACTING AGENT DETAILS ===\n');
const detailFiles = fs.readdirSync(constantsDir)
  .filter(f => f.endsWith('.ts'))
  .map(f => 'constants/' + f);

for (const file of detailFiles) {
  const fp = path.join(ROOT, file);
  if (!fs.existsSync(fp)) continue;
  const content = fs.readFileSync(fp, 'utf-8');
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const idMatch = lines[i].match(/id:\s*'([a-z][a-z0-9\-]+)'/);
    if (!idMatch) continue;
    const id = idMatch[1];
    if (!allIds.has(id)) continue;
    const agent = allIds.get(id);
    
    // Check current line first
    if (!agent.name) { const m = lines[i].match(/name:\s*'([^']+)'/); if (m) agent.name = m[1]; }
    if (!agent.title) { const m = lines[i].match(/title:\s*'([^']+)'/); if (m) agent.title = m[1]; }
    if (!agent.route) { const m = lines[i].match(/route:\s*'([^']+)'/); if (m) agent.route = m[1]; }
    if (!agent.department) { const m = lines[i].match(/department:\s*'([^']+)'/); if (m) agent.department = m[1]; }
    if (!agent.level) { const m = lines[i].match(/level:\s*'([^']+)'/); if (m) agent.level = m[1]; }
    
    // Look ahead for details, but stop if we hit another agent id
    for (let j = i + 1; j < Math.min(i + 30, lines.length); j++) {
      // If we see another id declaration on a new line, stop lookahead
      if (lines[j].includes('id:') && !lines[j].includes(`id: '${id}'`)) {
        break;
      }
      if (!agent.name) { const m = lines[j].match(/name:\s*'([^']+)'/); if (m) agent.name = m[1]; }
      if (!agent.title) { const m = lines[j].match(/title:\s*'([^']+)'/); if (m) agent.title = m[1]; }
      if (!agent.route) { const m = lines[j].match(/route:\s*'([^']+)'/); if (m) agent.route = m[1]; }
      if (!agent.department) { const m = lines[j].match(/department:\s*'([^']+)'/); if (m) agent.department = m[1]; }
      if (!agent.level) { const m = lines[j].match(/level:\s*'([^']+)'/); if (m) agent.level = m[1]; }
    }
  }
}

// Summary
console.log('\n=== SUMMARY ===\n');
console.log(`Total unique agent IDs found: ${allIds.size}`);

// Count by source type
const sourceCounts = {};
for (const [id, info] of allIds) {
  const key = info.sources.length === 1 ? info.sources[0] : 'multiple_sources';
  sourceCounts[key] = (sourceCounts[key] || 0) + 1;
}

// IDs with no name (likely just referenced, not fully defined)
const withName = [...allIds.entries()].filter(([_, v]) => v.name).length;
const withoutName = allIds.size - withName;
console.log(`  With name/title: ${withName}`);
console.log(`  ID-only (no details): ${withoutName}`);

// Check for route coverage
const withRoute = [...allIds.entries()].filter(([_, v]) => v.route).length;
console.log(`  With route: ${withRoute}`);
console.log(`  Without route: ${allIds.size - withRoute}`);

// Count page files per department folder
console.log('\n=== AGENT PAGES BY DEPARTMENT ===\n');
const deptCounts = {};
function countDeptPages(dir, dept) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      countDeptPages(fullPath, entry.name);
    } else if (entry.name.endsWith('.tsx') && entry.name !== '_layout.tsx' && entry.name !== 'index.tsx') {
      deptCounts[dept] = (deptCounts[dept] || 0) + 1;
    }
  }
}
const topEntries = fs.readdirSync(agentDir, { withFileTypes: true });
for (const entry of topEntries) {
  if (entry.isDirectory()) {
    countDeptPages(path.join(agentDir, entry.name), entry.name);
  } else if (entry.name.endsWith('.tsx') && entry.name !== '_layout.tsx' && entry.name !== 'index.tsx') {
    deptCounts['_root'] = (deptCounts['_root'] || 0) + 1;
  }
}
let totalPages = 0;
for (const [dept, count] of Object.entries(deptCounts).sort((a,b) => b[1]-a[1])) {
  console.log(`  ${dept}: ${count} pages`);
  totalPages += count;
}
console.log(`  TOTAL pages: ${totalPages}`);

// IDs that appear in only 1 source
const singleSource = [...allIds.entries()].filter(([_, v]) => v.sources.length === 1).length;
const multiSource = allIds.size - singleSource;
console.log(`\n  Single-source IDs: ${singleSource}`);
console.log(`  Multi-source IDs: ${multiSource}`);

// Output full ID list
const output = {
  totalUniqueIds: allIds.size,
  withName, withoutName, withRoute,
  totalPages,
  agents: [...allIds.entries()].map(([id, info]) => ({
    id,
    name: info.name || '',
    title: info.title || '',
    route: info.route || '',
    department: info.department || '',
    level: info.level || '',
    sources: info.sources,
    sourceCount: info.sources.length,
  })).sort((a,b) => a.id.localeCompare(b.id))
};

fs.writeFileSync(path.join(ROOT, 'all-agent-ids-scan.json'), JSON.stringify(output, null, 2));
console.log(`\nFull scan written to all-agent-ids-scan.json`);
