const fs = require('fs');
const path = require('path');

// Read the hierarchy file
const content = fs.readFileSync('constants/aiAgentHierarchyComplete.ts', 'utf8');

// Extract all route definitions
const routeMatches = content.match(/route: '\/ai-agent\/[^']+'/g) || [];
const routes = routeMatches.map(m => m.replace("route: '", '').replace("'", ''));

console.log('Total routes found:', routes.length);
console.log('\nFirst 30 routes:');
routes.slice(0, 30).forEach(r => console.log(r));

// Check which files exist
const missing = [];
const existing = [];
routes.forEach(route => {
  const filePath = path.join('app', route + '.tsx');
  if (!fs.existsSync(filePath)) {
    missing.push(route);
  } else {
    existing.push(route);
  }
});

console.log('\n========================================');
console.log('Total routes:', routes.length);
console.log('Existing files:', existing.length);
console.log('Missing files:', missing.length);
console.log('========================================\n');

console.log('Sample missing routes (first 50):');
missing.slice(0, 50).forEach(m => console.log('  ' + m));

// Save to file
fs.writeFileSync('missing-routes.json', JSON.stringify({
  total: routes.length,
  existing: existing.length,
  missing: missing.length,
  missingRoutes: missing,
  existingRoutes: existing
}, null, 2));

console.log('\nSaved full report to missing-routes.json');
