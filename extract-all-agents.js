const fs = require('fs');

// Read the generator file
const content = fs.readFileSync('./generate-enterprise-agents.js', 'utf8');

const agents = new Map();

// Extract all agent definitions using regex
// Pattern 1: ['name', 'slug', 'shortName', ...] format
const agentPattern = /\['([^']*agent[^']*)',\s*'([^']+)',/gi;
let match;

// Collect all unique agent slugs
const slugs = new Set();

// Pattern for main agents: ['AI Agent Name','agent-slug',...
const mainPattern = /\['[^']*(?:AI|Chief|VP|Manager)[^']*',\s*'([a-z][a-z0-9\-]*)',/gi;
let m;
while ((m = mainPattern.exec(content)) !== null) {
  slugs.add(m[1]);
}

// Pattern for sub-agents in sub-arrays
const subPattern = /\[{2}'[^']*',\s*'([a-z][a-z0-9\-]*)',/g;
while ((m = subPattern.exec(content)) !== null) {
  slugs.add(m[1]);
}

// Additional patterns for agents in COMPACT_DEPTS
const compactPattern = /\|([a-z][a-z0-9\-]*)\|/g;
while ((m = compactPattern.exec(content)) !== null) {
  const slug = m[1];
  if (slug.length > 1 && !slug.includes(' ')) {
    slugs.add(slug);
  }
}

// Try to extract from agent-data.js too for completeness
try {
  const agentDataContent = fs.readFileSync('./agent-data.js', 'utf8');
  const adPattern = /s:'([^']+)'/g;
  while ((m = adPattern.exec(agentDataContent)) !== null) {
    slugs.add(m[1]);
  }
} catch (e) {
  // Ignore if file doesn't exist
}

// Convert to sorted array
const agentIds = Array.from(slugs).sort((a, b) => a.localeCompare(b));

// Infer department from context (simplified mapping based on agent name patterns)
const deptMap = {
  'customer': ['customer', 'cco', 'receptionist', 'support', 'retention', 'loyalty', 'billing', 'complaint', 'feedback', 'onboarding', 'account', 'cx', 'csat', 'nps', 'escalation', 'knowledge', 'ticket', 'faq', 'resolution', 'sentiment', 'survey', 'engagement'],
  'sales': ['sdr', 'sales', 'vp-sales', 'pipeline', 'quota', 'territory', 'revenue', 'pricing', 'proposal', 'negotiator', 'forecasting', 'crm', 'business-development', 'channel', 'enablement', 'deal', 'cro'],
  'marketing': ['cmo', 'vp-marketing', 'marketing', 'content', 'seo', 'social', 'email', 'campaign', 'growth', 'brand', 'analytics', 'ad-campaign', 'digital', 'funnel', 'experiment', 'editorial'],
  'operations': ['coo', 'operations', 'process', 'workflow', 'quality', 'facilities', 'project', 'task', 'resource', 'supply-chain', 'logistics', 'capacity', 'efficiency', 'sla', 'maintenance'],
  'finance': ['cfo', 'finance', 'accounting', 'budget', 'audit', 'tax', 'payroll', 'invoice', 'cash', 'financial', 'expense', 'forecasting', 'planning', 'analysis'],
  'tech': ['cto', 'tech', 'engineering', 'devops', 'infrastructure', 'architecture', 'deployment', 'automation', 'ci-cd', 'monitoring', 'security', 'database', 'platform'],
  'hr': ['hr', 'recruiting', 'recruitment', 'onboarding', 'training', 'compensation', 'benefits', 'employee', 'talent', 'performance', 'development', 'engagement', 'culture'],
  'legal': ['legal', 'compliance', 'contracts', 'ip', 'litigation', 'regulatory', 'privacy', 'data-protection', 'terms', 'agreements'],
  'data': ['data', 'analytics', 'bi', 'intelligence', 'warehouse', 'lake', 'reporting', 'dashboard', 'metric', 'kpi'],
  'product': ['product', 'pm', 'roadmap', 'backlog', 'feature', 'release', 'lifecycle'],
  'security': ['security', 'ciso', 'risk', 'compliance', 'threat', 'incident', 'vulnerability', 'identity'],
  'research': ['research', 'rd', 'innovation', 'experiment', 'development', 'lab'],
  'admin': ['admin', 'facilities', 'office', 'travel', 'supplies', 'documentation'],
  'trading': ['trading', 'investment', 'portfolio', 'forex', 'crypto', 'broker'],
  'realestate': ['real-estate', 'property', 'commercial', 'residential', 'asset'],
  'insurance': ['insurance', 'underwriting', 'claims', 'actuarial', 'fraud'],
  'healthcare': ['healthcare', 'medical', 'patient', 'clinical', 'pharmacy', 'hospital'],
  'manufacturing': ['manufacturing', 'production', 'supply', 'quality', 'operations'],
  'transportation': ['transportation', 'logistics', 'fleet', 'distribution', 'shipping'],
  'government': ['government', 'public', 'policy', 'grants', 'regulatory'],
  'ai-mgmt': ['ai', 'automation', 'rpa', 'governance', 'automation-engineer']
};

function guessDept(slug) {
  for (const [dept, keywords] of Object.entries(deptMap)) {
    for (const kw of keywords) {
      if (slug.includes(kw)) {
        return dept;
      }
    }
  }
  return 'customer'; // default
}

// Build the output
const output = [];
output.push('KAYTX AI WORKFORCE - 1108 AI AGENTS & EMPLOYEES');
output.push('='.repeat(100));
output.push('');
output.push(`Total: ${agentIds.length} agents extracted\n`);

agentIds.forEach(id => {
  const dept = guessDept(id);
  output.push(`'${id}' → /ai-agent/${dept}/${id}`);
});

const fullOutput = output.join('\n');

// Print
console.log(fullOutput);

// Save to file
fs.writeFileSync('agents-list.txt', fullOutput);
console.log(`\n✓ Saved ${agentIds.length} agents to agents-list.txt`);

// Show breakdown by department
const byDept = {};
agentIds.forEach(id => {
  const dept = guessDept(id);
  byDept[dept] = (byDept[dept] || 0) + 1;
});

console.log('\nBreakdown by Department:');
Object.entries(byDept).sort((a, b) => b[1] - a[1]).forEach(([dept, count]) => {
  console.log(`  ${dept}: ${count}`);
});
