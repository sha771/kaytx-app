const fs = require('fs');
const path = require('path');

const AI_AGENT_DIR = path.join(__dirname, '..', 'app', 'ai-agent');

function isLikelyAgentDetailFile(filePath, content) {
  const base = path.basename(filePath);
  // Skip non-detail files
  if (base === '_layout.tsx' || base === 'index.tsx' || base.includes('workflow') || base.includes('test') || base.includes('-agents.tsx') || base.endsWith('s.tsx') && base !== 'agents.tsx') {
    // but allow some main ones
  }
  const skipPatterns = ['_layout', 'index', 'workflow', 'workflows', 'viz', 'builder', 'sidebar', 'list', 'overview', 'main', 'employees-main', 'ai-agents-employees'];
  if (skipPatterns.some(p => base.toLowerCase().includes(p))) {
    // Still allow specific ones that are pages
    if (!['agents.tsx', 'marketing-agents.tsx', 'sales-agents.tsx', 'operations-agents.tsx'].includes(base)) {
      return false;
    }
  }
  if (base.includes('.test.') || base.includes('.spec.')) return false;
  if (content.includes('AgentPageWrapper') || content.includes('EnhancedAgentShell') || content.includes('EnterpriseAgentShell')) return false;

  // Must have a default export function that looks like page
  if (!/export default function/.test(content)) return false;

  // Heuristic: has name/title or description typical of agents
  return /name:|title:|description:/.test(content) || /capabilities:/.test(content);
}

function findLegacyAgentFiles(dir) {
  const results = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results.push(...findLegacyAgentFiles(full));
    } else if (item.endsWith('.tsx')) {
      try {
        const content = fs.readFileSync(full, 'utf8');
        if (isLikelyAgentDetailFile(full, content)) {
          results.push(full);
        }
      } catch (e) {}
    }
  }
  return results;
}

const legacy = findLegacyAgentFiles(AI_AGENT_DIR);
console.log(`Found ${legacy.length} legacy agent pages that need upgrade:`);
legacy.forEach(f => console.log('  - ' + path.relative(AI_AGENT_DIR, f)));
console.log('\nTotal legacy to upgrade:', legacy.length);
