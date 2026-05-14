const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'app', 'ai-agent');

function getAgentFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let agentFiles = [];
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      agentFiles = agentFiles.concat(getAgentFiles(fullPath));
    } else {
      if (file.name.endsWith('.tsx') && file.name.startsWith('ai-') && !file.name.includes('-1') && !file.name.includes('-enterprise') && file.name !== 'ai-agent.tsx') {
        // Exclude variants and the main component
        agentFiles.push(fullPath);
      }
    }
  }
  return agentFiles;
}

const agentFiles = getAgentFiles(rootDir);

const links = [];
agentFiles.forEach(file => {
  const relative = path.relative(rootDir, file);
  const dir = path.dirname(relative);
  const fileName = path.basename(file, '.tsx');
  let slug = fileName;
  if (slug.startsWith('ai-')) {
    slug = slug.substring(3);
  }
  let dept = dir;
  if (dept === '.') dept = '';
  // Normalize path separators
  dept = dept.split(path.sep).join('/');
  if (dept) {
    links.push(`'${slug}' → /ai-agent/${dept}/${slug}`);
  } else {
    links.push(`'${slug}' → /ai-agent/${slug}`);
  }
});

// Sort by slug
links.sort((a, b) => {
  const slugA = a.match(/'([^']+)'/)[1];
  const slugB = b.match(/'([^']+)'/)[1];
  return slugA.localeCompare(slugB);
});

console.log(`KAYTX AI WORKFORCE - AGENT LINKS FROM FILE SYSTEM`);
console.log(`${'='.repeat(100)}\n`);
console.log(`Total agents found: ${links.length}\n`);
links.forEach(link => console.log(link));

// Save to file
const output = links.join('\n');
fs.writeFileSync('agent-links-from-fs.txt', `KAYTX AI WORKFORCE - AGENT LINKS FROM FILE SYSTEM\nTotal: ${links.length} agents\n${'='.repeat(100)}\n\n${output}`);

console.log(`\n${'='.repeat(100)}\n✓ Saved to agent-links-from-fs.txt (${links.length} agents)`);