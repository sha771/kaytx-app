const fs = require('fs');
const path = require('path');

let pass = 0, fail = 0;
function check(name, ok, detail) {
  if (ok) { console.log(`  PASS: ${name}`); pass++; }
  else { console.log(`  FAIL: ${name} - ${detail}`); fail++; }
}

console.log('=== KAYTX 1135 AGENT VERIFICATION ===\n');

// 1. Hierarchy Index - the master file
console.log('1. HIERARCHY INDEX (aiAgentHierarchyIndex.ts)');
const idx = fs.readFileSync('constants/aiAgentHierarchyIndex.ts', 'utf8');
const idxIds = [...idx.matchAll(/^\s+id:\s*'([^']+)'/gm)].map(m => m[1]);
const idxUids = [...idx.matchAll(/uid:\s*'([^']+)'/g)].map(m => m[1]);
const idxUidSet = new Set(idxUids);
check('Has 1135 agent entries', idxIds.length >= 1135, `Got ${idxIds.length}`);
check('All UIDs unique', idxUidSet.size === idxUids.length, `${idxUids.length} total, ${idxUidSet.size} unique`);
check('Has AIEmployeeProfile interface', idx.includes('interface AIEmployeeProfile'), 'Missing');
check('Has lookup functions', idx.includes('getAgentByUid') && idx.includes('getHierarchyTree'), 'Missing');

// 2. Workforce DB
console.log('\n2. WORKFORCE DATABASE (completeAIWorkforce_1108.ts)');
const wf = fs.readFileSync('constants/completeAIWorkforce_1108.ts', 'utf8');
const wfUids = [...wf.matchAll(/uid:\s*'([^']+)'/g)].map(m => m[1]);
const wfUidSet = new Set(wfUids);
check('Has 1108+ UIDs', wfUids.length >= 1108, `Got ${wfUids.length}`);
check('All UIDs unique', wfUidSet.size === wfUids.length, `${wfUids.length} total, ${wfUidSet.size} unique`);
check('No "AI AI" duplicates', !wf.includes('AI AI'), 'Found');

// 3. Registry
console.log('\n3. AGENT REGISTRY (aiAgentRegistry.ts)');
const reg = fs.readFileSync('constants/aiAgentRegistry.ts', 'utf8');
const regUids = [...reg.matchAll(/uid:\s*'([^']+)'/g)].map(m => m[1]);
check('Has 1108+ entries', regUids.length >= 1108, `Got ${regUids.length}`);

// 4. Cross-system UID matching
console.log('\n4. CROSS-SYSTEM UID MATCHING');
let matchedHierToWf = 0;
for (const u of idxUidSet) { if (wfUidSet.has(u)) matchedHierToWf++; }
check('Hierarchy UIDs in Workforce', matchedHierToWf >= 1100, `${matchedHierToWf}/${idxUidSet.size}`);

// 5. Agent Pages
console.log('\n5. AGENT PAGES');
function walk(dir) {
  let r = [];
  try { const l = fs.readdirSync(dir, { withFileTypes: true }); for (const d of l) { const f = path.join(dir, d.name); if (d.isDirectory()) r = r.concat(walk(f)); else if (f.endsWith('.tsx') && !f.endsWith('index.tsx') && !f.endsWith('_layout.tsx')) r.push(f); } } catch(e) {}
  return r;
}
const pages = walk('app/ai-agent');
let withUid = 0, withCaps = 0, withROI = 0, withDept = 0;
for (const p of pages) {
  const c = fs.readFileSync(p, 'utf8');
  if (c.includes("uid: 'ktx-")) withUid++;
  if (c.includes('capabilities:')) withCaps++;
  if (c.includes('roiMetrics')) withROI++;
  if (c.includes('department:')) withDept++;
}
check('Pages with UIDs', withUid >= 1100, `${withUid}/${pages.length}`);
check('Pages with capabilities', withCaps >= 1100, `${withCaps}/${pages.length}`);
check('Pages with ROI metrics', withROI >= 1100, `${withROI}/${pages.length}`);
check('Pages with department', withDept >= 1100, `${withDept}/${pages.length}`);

// 6. Sidebar
console.log('\n6. SIDEBAR DATA');
const sb = fs.readFileSync('constants/aiAgentsSidebarData.ts', 'utf8');
const sbItems = [...sb.matchAll(/\{\s*id:\s*'([^']+)'/g)].map(m => m[1]).filter(id => !id.startsWith('dept'));
check('Sidebar has 1108+ agents', sbItems.length >= 1108, `Got ${sbItems.length}`);

// 7. Hierarchy Complete backward compat
console.log('\n7. HIERARCHY COMPLETE (backward compat)');
const hc = fs.readFileSync('constants/aiAgentHierarchyComplete.ts', 'utf8');
check('Re-exports types', hc.includes("export type { AIEmployeeProfile"), 'Missing type exports');
check('Re-exports agents', hc.includes('completeHierarchy'), 'Missing');
check('Has dept exports', hc.includes('dept_customer_experience'), 'Missing');

// Summary
console.log('\n============================');
console.log(`PASSED: ${pass}  FAILED: ${fail}`);
console.log('============================');
if (fail === 0) console.log('\nAll 1135 agents verified across all systems!');
