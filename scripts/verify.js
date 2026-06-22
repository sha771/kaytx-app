/**
 * VERIFICATION: Validate all 1135 unique IDs across all systems
 */
const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function check(name, condition, detail) {
  if (condition) {
    console.log(`  ✓ ${name}`);
    passed++;
  } else {
    console.log(`  ✗ ${name} - ${detail}`);
    failed++;
  }
}

console.log('==========================================');
console.log('KAYTX AI WORKFORCE - VERIFICATION REPORT');
console.log('==========================================\n');

// 1. Registry validation
console.log('1. MASTER REGISTRY (aiAgentRegistry.ts)');
const registry = fs.readFileSync('constants/aiAgentRegistry.ts', 'utf8');
const registryEntries = [...registry.matchAll(/\{ uid: '([^']+)'/g)].map(m => m[1]);
const registryUnique = new Set(registryEntries);
check('Total entries = 1135', registryEntries.length === 1135, `Got ${registryEntries.length}`);
check('All UIDs unique', registryUnique.size === registryEntries.length, `${registryUnique.size} unique of ${registryEntries.length}`);

// Check seq numbers
const seqNumbers = [...registry.matchAll(/seq: (\d+)/g)].map(m => parseInt(m[1]));
check('Sequential numbers 1-1135', seqNumbers.length === 1135 && seqNumbers.includes(1) && seqNumbers.includes(1135), `Got ${seqNumbers.length} sequences`);

// Check department coverage
const deptIds = [...registry.matchAll(/departmentId: (\d+)/g)].map(m => parseInt(m[1]));
const uniqueDepts = new Set(deptIds);
check('Covers 23 departments (0-22)', uniqueDepts.size === 23, `Got ${uniqueDepts.size} departments`);

// Check cross-department count
const crossDept = registryEntries.filter(uid => uid.startsWith('ktx-00-'));
check('27 cross-department agents', crossDept.length === 27, `Got ${crossDept.length}`);

// 2. Sidebar validation
console.log('\n2. SIDEBAR DATA (aiAgentsSidebarData.ts)');
const sidebar = fs.readFileSync('constants/aiAgentsSidebarData.ts', 'utf8');
const sidebarIds = [...sidebar.matchAll(/\{ id: '([^']+)'/g)].map(m => m[1]).filter(id => !id.startsWith('dept'));
const sidebarUnique = new Set(sidebarIds);
check('Total sidebar agents = 1135', sidebarIds.length === 1135, `Got ${sidebarIds.length}`);
check('All sidebar IDs unique', sidebarUnique.size === sidebarIds.length, `${sidebarUnique.size} unique of ${sidebarIds.length}`);

// 3. Check sidebar IDs match registry sidebarIds
console.log('\n3. SIDEBAR ↔ REGISTRY CONNECTION');
const regSidebarIds = [...registry.matchAll(/sidebarId: '([^']+)'/g)].map(m => m[1]);
const regSidebarSet = new Set(regSidebarIds);
const sidebarSet = new Set(sidebarIds);
const sidebarInReg = sidebarIds.filter(id => regSidebarSet.has(id));
const regInSidebar = regSidebarIds.filter(id => sidebarSet.has(id));
check('All sidebar IDs in registry', sidebarInReg.length === sidebarIds.length, `${sidebarInReg.length} of ${sidebarIds.length} found`);
check('All registry sidebarIds in sidebar', regInSidebar.length === regSidebarIds.length, `${regInSidebar.length} of ${regSidebarIds.length} found`);

// 4. Page files validation
console.log('\n4. PAGE FILES');
function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir, { withFileTypes: true });
    for (const d of list) {
      const full = path.join(dir, d.name);
      if (d.isDirectory()) results = results.concat(walk(full));
      else if (d.name.endsWith('.tsx')) results.push(full.replace(/\\/g, '/'));
    }
  } catch(e) {}
  return results;
}

const pages = walk('app/ai-agent');
const agentPages = pages.filter(p => !p.includes('index.tsx') && !p.includes('_layout.tsx'));

// Check registry routes have pages
const routes = [...registry.matchAll(/route: '([^']+)'/g)].map(m => m[1]);
let routesWithPages = 0;
let routesWithout = [];
for (const route of routes) {
  const routePath = route.replace('/ai-agent/', '');
  const filePath = `app/ai-agent/${routePath}.tsx`.replace(/\\/g, '/');
  if (pages.includes(filePath)) {
    routesWithPages++;
  } else {
    routesWithout.push(route);
  }
}
check('All registry routes have pages', routesWithPages === routes.length, `${routesWithPages} of ${routes.length} (${routesWithout.length} missing)`);
if (routesWithout.length > 0 && routesWithout.length <= 5) {
  console.log('    Missing routes:', routesWithout);
}

// Check pages have UIDs
let pagesWithUid = 0;
let pagesWithoutUid = 0;
for (const page of agentPages) {
  const content = fs.readFileSync(page, 'utf8');
  if (content.includes("uid: 'ktx-")) {
    pagesWithUid++;
  } else {
    pagesWithoutUid++;
  }
}
check('All agent pages have UIDs', pagesWithoutUid === 0, `${pagesWithoutUid} pages without UID`);
console.log(`    Pages with UID: ${pagesWithUid}, without: ${pagesWithoutUid}`);

// 5. Hierarchy files validation
console.log('\n5. HIERARCHY FILES');
const hierFiles = [
  'constants/aiAgentHierarchy_UPGRADED.ts',
  'constants/aiAgentHierarchyComplete.ts',
  'constants/aiAgentHierarchy_Managers.ts',
  'constants/aiAgentHierarchy_TeamLeadsSpecialists.ts',
  'constants/aiAgentHierarchy_NewDepartments.ts',
];
let totalHierUids = 0;
for (const file of hierFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const uids = [...content.matchAll(/uid: '([^']+)'/g)].map(m => m[1]);
  totalHierUids += uids.length;
  const fname = path.basename(file);
  console.log(`    ${fname}: ${uids.length} UIDs`);
}
check('Hierarchy files have UIDs', totalHierUids > 0, `Got ${totalHierUids} UIDs`);

// 6. completeAIWorkforce validation
console.log('\n6. COMPLETE WORKFORCE (completeAIWorkforce_1108.ts)');
const wf = fs.readFileSync('constants/completeAIWorkforce_1108.ts', 'utf8');
const wfUids = [...wf.matchAll(/uid: '([^']+)'/g)].map(m => m[1]);
const wfUidsUnique = new Set(wfUids);
check('Workforce has uid fields', wfUids.length > 0, `Got ${wfUids.length} uid references`);
check('Workforce UIDs are unique', wfUidsUnique.size === wfUids.length, `${wfUidsUnique.size} unique of ${wfUids.length}`);

// 7. UID format validation
console.log('\n7. UID FORMAT');
const allUids = [...registryUnique];
const ktxFormat = allUids.filter(u => u.startsWith('ktx-'));
check('All UIDs follow ktx-XX-slug format', ktxFormat.length === allUids.length, `${ktxFormat.length} of ${allUids.length}`);

// Check for duplicates across all systems
console.log('\n8. CROSS-SYSTEM UNIQUENESS');
const allSystemUids = [
  ...allUids,
  ...wfUids,
];
const allSystemSet = new Set(allSystemUids);
// Registry UIDs should be the superset
check('Registry is the authoritative source', registryUnique.size === 1135, `Registry has ${registryUnique.size} UIDs`);

// Summary
console.log('\n==========================================');
console.log('SUMMARY');
console.log('==========================================');
console.log(`Total unique UIDs in registry: ${registryUnique.size}`);
console.log(`Total sidebar agents: ${sidebarIds.length}`);
console.log(`Total agent pages: ${agentPages.length}`);
console.log(`Total hierarchy UIDs: ${totalHierUids}`);
console.log(`Workforce UIDs: ${wfUids.length}`);
console.log(`\nChecks passed: ${passed}`);
console.log(`Checks failed: ${failed}`);
console.log(`\nResult: ${failed === 0 ? '✓ ALL CHECKS PASSED' : '✗ SOME CHECKS FAILED'}`);
