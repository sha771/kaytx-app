/**
 * Batch create missing AI agent/employee main pages
 * and update the master list with green ticks.
 */

const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(__dirname, '..', 'app', 'ai-agent');
const LIST_FILE = path.join(__dirname, '..', 'all ai agents& employees');

// Department folder mapping
const DEPT_MAP = {
  '1. CUSTOMER EXPERIENCE': 'customer',
  '2. SALES & REVENUE': 'sales',
  '3. MARKETING & GROWTH': 'marketing',
  '4. OPERATIONS & MANAGEMENT': 'operations',
  '5. FINANCE & ACCOUNTING': 'accounting',
  '6. TECHNOLOGY & ENGINEERING': 'engineering',
  '7. HUMAN RESOURCES': 'hr',
  '8. LEGAL & COMPLIANCE': 'legal',
  '9. DATA & INTELLIGENCE': 'data',
  '10. PRODUCT MANAGEMENT': 'product',
  '11. SECURITY & RISK': 'security',
  '12. RESEARCH & DEVELOPMENT': 'research',
  '13. ADMINISTRATIVE': 'operations',
  '14. TRADING & INVESTMENTS': 'trading',
  '15. REAL ESTATE & PROPERTY': 'realestate',
  '16. INSURANCE & RISK': 'insurance',
  '17. HEALTHCARE & MEDICAL': 'healthcare',
  '18. MANUFACTURING & PRODUCTION': 'manufacturing',
  '19. TRANSPORTATION & LOGISTICS': 'operations',
  '20. GOVERNMENT & PUBLIC SECTOR': 'legal',
  '21. SUPPLY CHAIN & LOGISTICS': 'operations',
  '22. AI MANAGEMENT & GOVERNANCE': 'executive',
};

// Fallback folder for sub-agents when exact mapping isn't clear
const SUBFOLDER_FALLBACK = {
  customer: 'customer',
  sales: 'sales',
  marketing: 'marketing',
  operations: 'operations',
  finance: 'accounting',
  accounting: 'accounting',
  technology: 'engineering',
  engineering: 'engineering',
  hr: 'hr',
  legal: 'legal',
  data: 'data',
  product: 'product',
  security: 'security',
  research: 'research',
  trading: 'trading',
  realestate: 'realestate',
  insurance: 'insurance',
  healthcare: 'healthcare',
  manufacturing: 'manufacturing',
  transportation: 'operations',
  government: 'legal',
  'supply chain': 'operations',
  administrative: 'operations',
  'ai management': 'executive',
};

function slugify(id) {
  return id
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function makePageTemplate(agentName, agentId, level, role, deptFolder) {
  const nameSafe = agentName.replace(/'/g, "\\'");
  const levelSafe = (level || role || 'AI Agent').replace(/'/g, "\\'");
  const iconName = 'Bot';

  return `import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Bot, Activity } from 'lucide-react-native';

export default function AgentPage() {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Bot size={48} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          ${nameSafe}
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          ${levelSafe}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The ${nameSafe} AI manages specialized tasks, automates workflows,
          and delivers consistent performance within the ${deptFolder} department.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Responsibilities</Text>
        <Text style={[styles.bullet, { color: theme.colors.textSecondary }]}>• Workflow Automation</Text>
        <Text style={[styles.bullet, { color: theme.colors.textSecondary }]}>• Data Analysis & Reporting</Text>
        <Text style={[styles.bullet, { color: theme.colors.textSecondary }]}>• Cross-functional Coordination</Text>
        <Text style={[styles.bullet, { color: theme.colors.textSecondary }]}>• Continuous Optimization</Text>
      </View>

      <View style={styles.card}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Status</Text>
        <View style={styles.statusRow}>
          <Activity size={20} color="#34C759" />
          <Text style={[styles.statusText, { color: '#34C759' }]}>Active</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
  },
  card: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  bullet: {
    fontSize: 14,
    marginVertical: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
});
`;
}

// Parse the list file
const content = fs.readFileSync(LIST_FILE, 'utf8');
const lines = content.split('\n');

let currentDept = '';
let currentTable = '';
const agents = []; // { id, name, level, role, lineIndex, type: 'main'|'sub' }

lines.forEach((line, idx) => {
  // Detect department headers
  const deptMatch = line.match(/\|\s*(\d+\.\s+[^|]+)\s*\|/);
  if (deptMatch) {
    currentDept = deptMatch[1].trim();
    currentTable = '';
    return;
  }
  if (line.includes('MAIN AGENTS TABLE')) {
    currentTable = 'main';
    return;
  }
  if (line.includes('SUB-AGENTS TABLE')) {
    currentTable = 'sub';
    return;
  }

  // Parse agent rows
  const rowMatch = line.match(
    /\|\s*\d+\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]*)\|\s*([^|]*)\|\s*/
  );
  if (rowMatch && currentDept && currentTable) {
    const id = rowMatch[1].trim();
    const name = rowMatch[2].trim();
    const levelOrRole = rowMatch[3].trim();
    const mainPage = rowMatch[4].trim();
    const innerPage = rowMatch[5].trim();
    // Skip header rows and rows with no ID
    if (id && id.toLowerCase() !== 'id' && !id.match(/^#\s*$/)) {
      agents.push({
        id,
        name,
        level: currentTable === 'main' ? levelOrRole : '',
        role: currentTable === 'sub' ? levelOrRole : '',
        lineIndex: idx,
        type: currentTable,
        dept: currentDept,
        mainPage,
        innerPage,
        line,
      });
    }
  }
});

console.log(`Found ${agents.length} agents in the list file.`);

// Determine folder for each agent
function getFolder(agent) {
  // Direct mapping from department name
  for (const [deptKey, folder] of Object.entries(DEPT_MAP)) {
    if (agent.dept.toLowerCase().includes(deptKey.toLowerCase().replace(/\d+\.\s+/, ''))) {
      return folder;
    }
  }
  // Fallback based on ID prefix
  if (agent.id.startsWith('cx-') || agent.id.includes('customer')) return 'customer';
  if (agent.id.startsWith('sales-') || agent.id.includes('sales')) return 'sales';
  if (agent.id.startsWith('marketing-')) return 'marketing';
  if (agent.id.startsWith('ops-') || agent.id.includes('operations')) return 'operations';
  if (agent.id.startsWith('finance-') || agent.id.includes('finance') || agent.id.startsWith('accounting-') || agent.id.includes('accounting')) return 'accounting';
  if (agent.id.startsWith('hr-') || agent.id.includes('hr') || agent.id.includes('recruit') || agent.id.includes('talent')) return 'hr';
  if (agent.id.startsWith('legal-') || agent.id.includes('legal') || agent.id.includes('compliance') || agent.id.includes('contract')) return 'legal';
  if (agent.id.startsWith('data-') || agent.id.includes('data') || agent.id.includes('analytics')) return 'data';
  if (agent.id.startsWith('product-') || agent.id.includes('product')) return 'product';
  if (agent.id.startsWith('security-') || agent.id.includes('security') || agent.id.includes('ciso')) return 'security';
  if (agent.id.startsWith('research-') || agent.id.includes('research')) return 'research';
  if (agent.id.startsWith('trading-') || agent.id.includes('trading') || agent.id.includes('portfolio')) return 'trading';
  if (agent.id.includes('real-estate') || agent.id.includes('property') || agent.id.includes('creo')) return 'realestate';
  if (agent.id.includes('insurance') || agent.id.includes('underwriting') || agent.id.includes('claims')) return 'insurance';
  if (agent.id.includes('healthcare') || agent.id.includes('medical') || agent.id.includes('patient')) return 'healthcare';
  if (agent.id.includes('manufacturing') || agent.id.includes('production') || agent.id.includes('cpo')) return 'manufacturing';
  if (agent.id.includes('transportation') || agent.id.includes('logistics') || agent.id.includes('fleet') || agent.id.includes('warehouse')) return 'operations';
  if (agent.id.includes('government') || agent.id.includes('public') || agent.id.includes('policy')) return 'legal';
  if (agent.id.includes('supply-chain') || agent.id.includes('procurement')) return 'operations';
  if (agent.id.includes('executive') || agent.id.includes('admin') || agent.id.includes('cao-') || agent.id.includes('cao ')) return 'operations';
  if (agent.id.includes('ai-management') || agent.id.includes('automation') || agent.id.includes('rpa')) return 'executive';
  if (agent.id.includes('engineering') || agent.id.includes('dev') || agent.id.includes('architect') || agent.id.includes('sre')) return 'engineering';
  if (agent.id.includes('it-') || agent.id.includes('cloud') || agent.id.includes('infrastructure')) return 'it';
  // C-suite fallback
  if (agent.level === 'C-Suite' || agent.level === 'C-Suite (v7.1)') return 'executive';
  return 'executive';
}

// Build expected file paths
const expectedFiles = [];
agents.forEach((agent) => {
  const folder = getFolder(agent);
  const fileName = `${slugify(agent.id)}.tsx`;
  const filePath = path.join(APP_DIR, folder, fileName);
  expectedFiles.push({ ...agent, folder, filePath, fileName });
});

// Check which files exist
let created = 0;
let existing = 0;
const missingAgents = [];

expectedFiles.forEach((ef) => {
  if (fs.existsSync(ef.filePath)) {
    existing++;
  } else {
    missingAgents.push(ef);
  }
});

console.log(`Existing pages: ${existing}`);
console.log(`Missing pages: ${missingAgents.length}`);

// Create missing pages
missingAgents.forEach((agent) => {
  const dir = path.dirname(agent.filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const template = makePageTemplate(agent.name, agent.id, agent.level, agent.role, agent.folder);
  fs.writeFileSync(agent.filePath, template, 'utf8');
  created++;
});

console.log(`Created ${created} new pages.`);

// Update list file with green ticks for ALL agents that now have pages
let updatedContent = content;
const allNowExisting = [];

expectedFiles.forEach((ef) => {
  if (fs.existsSync(ef.filePath)) {
    allNowExisting.push(ef);
  }
});

// Process lines in reverse order so replacements don't shift indices
allNowExisting
  .sort((a, b) => b.lineIndex - a.lineIndex)
  .forEach((agent) => {
    const originalLine = agent.line;
    // Replace the Main Page column (4th data column) with ✅
    // The pattern is: | # | id | name | level/role | mainPage | innerPage |
    const parts = originalLine.split('|').map((p) => p.trim());
    if (parts.length >= 6) {
      // parts[0] = empty (before first |)
      // parts[1] = #
      // parts[2] = id
      // parts[3] = name
      // parts[4] = level/role
      // parts[5] = mainPage  <-- update this
      // parts[6] = innerPage
      parts[5] = '✅';
      const newLine = parts.join(' | ');
      updatedContent = updatedContent.replace(originalLine, newLine);
    }
  });

fs.writeFileSync(LIST_FILE, updatedContent, 'utf8');

console.log(`Updated ${allNowExisting.length} agents with green ticks in the list file.`);
console.log('Done!');
