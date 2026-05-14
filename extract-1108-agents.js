const fs = require('fs');

// Read and parse generate-enterprise-agents.js to extract all 1,108 agents
const genFile = fs.readFileSync('./generate-enterprise-agents.js', 'utf8');

const agents = new Map();

// Department mapping
const depts = [
  '', // 0 - unused
  'customer',
  'sales', 
  'marketing',
  'operations',
  'finance',
  'tech',
  'hr',
  'legal',
  'data',
  'product',
  'security',
  'research',
  'admin',
  'trading',
  'realestate',
  'insurance',
  'healthcare',
  'manufacturing',
  'transportation',
  'government',
  'supply-chain',
  'ai-mgmt'
];

// Extract all agent slugs using multiple regex patterns
const patterns = [
  // Main format: ['AI Agent Name', 'agent-slug', ...
  /\['([^']*(?:AI|Chief|VP|Manager|SDR|Agent|Specialist|Coordinator|Analyst)[^']*)',\s*'([a-z0-9][a-z0-9\-]*)',/gi,
  // Sub-agent arrays: [['name', 'slug', ...
  /\[{2}'([^']*)',\s*'([a-z0-9][a-z0-9\-]*)',\s*'[^']*',/g,
  // Compact format with pipes: slug|
  /\|([a-z0-9][a-z0-9\-]*)\|/g,
  // Direct slug extraction from object properties
  /s:'([a-z0-9][a-z0-9\-]*)',/g,
];

const foundSlugs = new Set();

patterns.forEach(pattern => {
  let match;
  while ((match = pattern.exec(genFile)) !== null) {
    const slug = match[match.length - 1];
    if (slug && slug.length > 1 && slug !== 'enterprise' && slug !== 'premium') {
      foundSlugs.add(slug);
    }
  }
});

// Also extract from agent-data.js if available
try {
  const agentDataFile = fs.readFileSync('./agent-data.js', 'utf8');
  const m = agentDataFile.matchAll(/s:'([a-z0-9][a-z0-9\-]*)',/g);
  for (const match of m) {
    foundSlugs.add(match[1]);
  }
} catch (e) {}

// Convert to array and sort
let agentSlugs = Array.from(foundSlugs).sort((a, b) => a.localeCompare(b));

// Function to guess department from agent slug
function getDept(slug) {
  // Customer Experience agents
  if (['cco', 'receptionist', 'support', 'retention', 'loyalty', 'billing', 'complaint', 'feedback', 'onboarding', 'account', 'cx', 'csat', 'nps', 'escalation', 'knowledge', 'ticket', 'faq', 'resolution', 'sentiment', 'survey', 'engagement', 'chief-customer-officer', 'vp-customer-success', 'vp-support', 'vp-experience', 'vp-retention', 'vp-loyalty', 'customer-support', 'retention-specialist', 'loyalty-engagement', 'feedback-survey', 'billing-support'].some(k => slug.includes(k))) return 'customer';
  
  // Sales agents
  if (['sales', 'sdr', 'pipeline', 'quota', 'territory', 'revenue', 'pricing', 'proposal', 'negotiator', 'forecasting', 'crm', 'business-development', 'channel', 'enablement', 'deal', 'vp-sales', 'vp-revenue', 'vp-business', 'vp-channel'].some(k => slug.includes(k))) return 'sales';
  
  // Marketing agents
  if (['marketing', 'cmo', 'vp-marketing', 'content', 'seo', 'social', 'email', 'campaign', 'growth', 'brand', 'analytics', 'ad-campaign', 'digital', 'funnel', 'experiment', 'editorial'].some(k => slug.includes(k))) return 'marketing';
  
  // Operations agents
  if (['operations', 'coo', 'vp-operations', 'process', 'workflow', 'quality', 'facilities', 'project', 'task', 'resource', 'supply-chain', 'logistics', 'capacity', 'efficiency', 'sla', 'maintenance'].some(k => slug.includes(k))) return 'operations';
  
  // Finance agents
  if (['finance', 'cfo', 'accounting', 'budget', 'audit', 'tax', 'payroll', 'invoice', 'cash', 'expense', 'forecast'].some(k => slug.includes(k))) return 'finance';
  
  // Tech agents
  if (['tech', 'cto', 'engineering', 'devops', 'infrastructure', 'architecture', 'deployment', 'automation', 'ci-cd', 'monitoring', 'database', 'platform'].some(k => slug.includes(k))) return 'tech';
  
  // HR agents
  if (['hr', 'recruiting', 'recruitment', 'training', 'compensation', 'benefits', 'employee', 'talent', 'performance', 'development', 'culture', 'payroll'].some(k => slug.includes(k))) return 'hr';
  
  // Legal agents
  if (['legal', 'compliance', 'contracts', 'ip', 'litigation', 'regulatory', 'privacy', 'data-protection', 'terms', 'agreement'].some(k => slug.includes(k))) return 'legal';
  
  // Data agents
  if (['data', 'analytics', 'bi', 'intelligence', 'warehouse', 'lake', 'reporting', 'dashboard', 'metric', 'kpi', 'analytics'].some(k => slug.includes(k))) return 'data';
  
  // Product agents
  if (['product', 'pm', 'roadmap', 'backlog', 'feature', 'release', 'lifecycle'].some(k => slug.includes(k))) return 'product';
  
  // Security agents
  if (['security', 'ciso', 'risk', 'threat', 'incident', 'vulnerability', 'identity', 'ciso-ai', 'ciso-advisor'].some(k => slug.includes(k))) return 'security';
  
  // Research agents
  if (['research', 'rd', 'innovation', 'experiment', 'development', 'lab'].some(k => slug.includes(k))) return 'research';
  
  // Admin agents
  if (['admin', 'facilities', 'office', 'travel', 'supplies', 'documentation'].some(k => slug.includes(k))) return 'admin';
  
  // Trading agents
  if (['trading', 'investment', 'portfolio', 'forex', 'crypto', 'broker'].some(k => slug.includes(k))) return 'trading';
  
  // Real Estate agents
  if (['real-estate', 'property', 'commercial', 'residential', 'asset'].some(k => slug.includes(k))) return 'realestate';
  
  // Insurance agents
  if (['insurance', 'underwriting', 'claims', 'actuarial', 'fraud'].some(k => slug.includes(k))) return 'insurance';
  
  // Healthcare agents
  if (['healthcare', 'medical', 'patient', 'clinical', 'pharmacy', 'hospital'].some(k => slug.includes(k))) return 'healthcare';
  
  // Manufacturing agents
  if (['manufacturing', 'production', 'supply', 'quality'].some(k => slug.includes(k))) return 'manufacturing';
  
  // Transportation agents
  if (['transportation', 'fleet', 'distribution', 'shipping'].some(k => slug.includes(k))) return 'transportation';
  
  // Government agents
  if (['government', 'public', 'policy', 'grants'].some(k => slug.includes(k))) return 'government';
  
  // AI Management agents
  if (['ai', 'automation', 'rpa', 'governance'].some(k => slug.includes(k))) return 'ai-mgmt';
  
  return 'customer'; // default
}

// Build the complete list
const result = [];
agentSlugs.forEach(slug => {
  const dept = getDept(slug);
  result.push(`'${slug}' → /ai-agent/${dept}/${slug}`);
});

// Print results
console.log(`KAYTX AI WORKFORCE - COMPLETE LIST`);
console.log(`${'='.repeat(100)}\n`);
console.log(`Total agents found: ${result.length}\n`);
result.forEach(line => console.log(line));

// Save to file
const output = result.join('\n');
fs.writeFileSync('agents-1108-list.txt', `KAYTX AI WORKFORCE - COMPLETE AGENT DIRECTORY\nTotal: ${result.length} agents\n${'='.repeat(100)}\n\n${output}`);

console.log(`\n${'='.repeat(100)}\n✓ Saved to agents-1108-list.txt (${result.length} agents)`);
