const fs = require('fs');

// Read both files
const genFile = fs.readFileSync('./generate-enterprise-agents.js', 'utf8');
const agentDataFile = fs.readFileSync('./agent-data.js', 'utf8');

const agents = new Map();

// Extract ALL slugs using aggressive regex patterns
const allSlugs = new Set();

// Pattern 1: Direct agent object format - s:'slug'
const p1 = genFile.matchAll(/s:'([a-z][a-z0-9\-]*)',/gi);
for (const m of p1) allSlugs.add(m[1]);

// Pattern 2: Array format - ['name', 'slug', ...
const p2 = genFile.matchAll(/\['[^']*',\s*'([a-z][a-z0-9\-]*)',/g);
for (const m of p2) allSlugs.add(m[1]);

// Pattern 3: Pipe-delimited compact format - |slug|
const p3 = genFile.matchAll(/\|([a-z][a-z0-9\-]+)\|/g);
for (const m of p3) allSlugs.add(m[1]);

// Pattern 4: From agent-data.js
const p4 = agentDataFile.matchAll(/s:'([a-z][a-z0-9\-]*)',/gi);
for (const m of p4) allSlugs.add(m[1]);

// Remove common false positives
allSlugs.delete('enterprise');
allSlugs.delete('premium');
allSlugs.delete('specialist');
allSlugs.delete('manager');

// Department mapping
function getDept(slug) {
  const deptKeywords = {
    'customer': ['cco', 'receptionist', 'support', 'retention', 'loyalty', 'billing', 'complaint', 'feedback', 'onboarding', 'account', 'cx', 'csat', 'nps', 'escalation', 'knowledge', 'ticket', 'faq', 'resolution', 'sentiment', 'survey', 'engagement', 'chief-customer', 'vp-customer', 'vp-support', 'vp-experience', 'vp-retention', 'vp-loyalty'],
    'sales': ['sales', 'sdr', 'pipeline', 'quota', 'territory', 'revenue', 'pricing', 'proposal', 'negotiator', 'forecasting', 'crm', 'business-dev', 'channel', 'enablement', 'deal', 'vp-sales', 'vp-revenue', 'vp-business', 'vp-channel'],
    'marketing': ['marketing', 'cmo', 'vp-marketing', 'content', 'seo', 'social', 'email', 'campaign', 'growth', 'brand', 'analytics', 'ad-campaign', 'digital', 'funnel', 'experiment', 'editorial'],
    'operations': ['operations', 'coo', 'vp-operations', 'process', 'workflow', 'quality', 'facilities', 'project', 'task', 'resource', 'supply', 'logistics', 'capacity', 'efficiency', 'sla', 'maintenance'],
    'finance': ['finance', 'cfo', 'accounting', 'budget', 'audit', 'tax', 'payroll', 'invoice', 'cash', 'expense'],
    'tech': ['tech', 'cto', 'engineering', 'devops', 'infrastructure', 'architecture', 'deployment', 'automation', 'ci-cd', 'monitoring', 'database', 'platform'],
    'hr': ['hr', 'recruiting', 'recruitment', 'training', 'compensation', 'benefits', 'employee', 'talent', 'performance', 'development', 'culture', 'payroll'],
    'legal': ['legal', 'compliance', 'contracts', 'ip', 'litigation', 'regulatory', 'privacy', 'data-protection', 'terms', 'agreement'],
    'data': ['data', 'analytics', 'bi', 'intelligence', 'warehouse', 'lake', 'reporting', 'dashboard', 'metric', 'kpi'],
    'product': ['product', 'pm', 'roadmap', 'backlog', 'feature', 'release', 'lifecycle'],
    'security': ['security', 'ciso', 'risk', 'threat', 'incident', 'vulnerability', 'identity', 'ciso-ai', 'ciso-advisor'],
    'research': ['research', 'rd', 'innovation', 'experiment', 'development', 'lab'],
    'admin': ['admin', 'facilities', 'office', 'travel', 'supplies', 'documentation'],
    'trading': ['trading', 'investment', 'portfolio', 'forex', 'crypto', 'broker'],
    'realestate': ['real-estate', 'property', 'commercial', 'residential', 'asset'],
    'insurance': ['insurance', 'underwriting', 'claims', 'actuarial', 'fraud'],
    'healthcare': ['healthcare', 'medical', 'patient', 'clinical', 'pharmacy', 'hospital'],
    'manufacturing': ['manufacturing', 'production', 'quality'],
    'transportation': ['transportation', 'fleet', 'distribution', 'shipping'],
    'government': ['government', 'public', 'policy', 'grants'],
    'ai-mgmt': ['ai', 'automation', 'rpa', 'governance']
  };

  for (const [dept, keywords] of Object.entries(deptKeywords)) {
    for (const kw of keywords) {
      if (slug.includes(kw)) {
        return dept;
      }
    }
  }
  return 'customer'; // default
}

// Build list
const result = Array.from(allSlugs)
  .sort((a, b) => a.localeCompare(b))
  .map(slug => {
    const dept = getDept(slug);
    return `'${slug}' → /ai-agent/${dept}/${slug}`;
  });

// Output
console.log('KAYTX AI WORKFORCE - COMPLETE AGENT DIRECTORY');
console.log('='.repeat(100));
console.log('');
console.log(`Total Agents: ${result.length}`);
console.log('');
result.forEach(line => console.log(line));

// Save to file
const output = result.join('\n');
fs.writeFileSync('agents-complete-list.txt', `KAYTX AI WORKFORCE - COMPLETE AGENT DIRECTORY\nTotal: ${result.length} agents\n${'='.repeat(100)}\n\n${output}`);

console.log(`\n${'='.repeat(100)}`);
console.log(`✓ Saved ${result.length} agents to agents-complete-list.txt`);

// Count by department
const byDept = {};
result.forEach(line => {
  const dept = line.split('/ai-agent/')[1].split('/')[0];
  byDept[dept] = (byDept[dept] || 0) + 1;
});

console.log('\nBreakdown by Department:');
Object.entries(byDept).sort((a, b) => b[1] - a[1]).forEach(([dept, count]) => {
  console.log(`  ${dept}: ${count} agents`);
});
