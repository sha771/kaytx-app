// KAYTX Sub-Agent Page Generator
// Generates .tsx pages for all 831 sub-agents across 22 departments
// Usage: node generate-sub-agents.js

const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'app', 'ai-agent');
const dataFile = path.join(__dirname, 'the agents lib by shaida', 'KAYTX AI WORKFORCE - COMPLETE WITH SUB-AGENTS');

const deptMap = {
  'Customer Experience': { folder: 'customer', color: '#06B6D4', icon: 'Headphones' },
  'Sales & Revenue': { folder: 'sales', color: '#FF9500', icon: 'TrendingUp' },
  'Marketing & Growth': { folder: 'marketing', color: '#E91E63', icon: 'Megaphone' },
  'Operations & Management': { folder: 'operations', color: '#607D8B', icon: 'Settings' },
  'Finance & Accounting': { folder: 'finance', color: '#2E7D32', icon: 'DollarSign' },
  'Technology & Engineering': { folder: 'tech', color: '#1565C0', icon: 'Cpu' },
  'Human Resources': { folder: 'hr', color: '#9C27B0', icon: 'Users' },
  'Legal & Compliance': { folder: 'legal', color: '#3F51B5', icon: 'Scale' },
  'Data & Intelligence': { folder: 'data', color: '#6366F1', icon: 'Database' },
  'Product Management': { folder: 'product', color: '#8B5CF6', icon: 'Package' },
  'Security & Risk': { folder: 'security', color: '#F44336', icon: 'Shield' },
  'Research & Development': { folder: 'research', color: '#10B981', icon: 'Telescope' },
  'Administrative': { folder: 'admin', color: '#475569', icon: 'Building' },
  'Trading & Investments': { folder: 'trading', color: '#10B981', icon: 'TrendingUp' },
  'Real Estate & Property': { folder: 'realestate', color: '#8B5CF6', icon: 'Building2' },
  'Insurance & Risk': { folder: 'insurance', color: '#F59E0B', icon: 'Shield' },
  'Healthcare & Medical': { folder: 'healthcare', color: '#EF4444', icon: 'Heart' },
  'Manufacturing & Production': { folder: 'manufacturing', color: '#6366F1', icon: 'Factory' },
  'Transportation & Logistics': { folder: 'transportation', color: '#0EA5E9', icon: 'Truck' },
  'Government & Public Sector': { folder: 'government', color: '#475569', icon: 'Landmark' },
  'Supply Chain & Logistics': { folder: 'supply-chain', color: '#0EA5E9', icon: 'Package' },
  'AI Management & Governance': { folder: 'ai-mgmt', color: '#8B5CF6', icon: 'Bot' },
};

function toId(name) {
  return name.replace(/^AI\s+/, '').replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').replace(/--+/g, '-').replace(/^-|-$/g, '').toLowerCase();
}

function toPascalCase(str) {
  return str.replace(/(^|-)(\w)/g, (_, _sep, c) => c.toUpperCase());
}

function generatePage(agentId, agentName, parentId, parentName, deptFolder, color, icon) {
  const pageName = toPascalCase(agentId) + 'Page';
  const levelLabel = /Chief/i.test(agentName) ? 'C-Level' : /VP/i.test(agentName) ? 'VP/Director' : /Manager/i.test(agentName) ? 'Manager' : /Lead/i.test(agentName) ? 'Team Lead' : 'Specialist';
  
  const shortName = agentName.replace(/^AI\s+/, '');
  const capTags = [shortName, 'AI-Powered', 'Real-time', 'Analytics', 'Integration', 'Automation'].slice(0, 6);
  const capTagsStr = capTags.map(c => `'${c}'`).join(',');
  const endpointsStr = [`/consult/${agentId}`, `/${agentId}/execute`, `/${agentId}/analyze`].map(e => `'${e}'`).join(',');

  return `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, ${icon}, Clock, Target, Zap, ArrowRight, Briefcase } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function ${pageName}() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '${color}20' }]}>
          <${icon} size={56} color="${color}" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>{${JSON.stringify(agentName)}}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of {${JSON.stringify(parentName)}}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '${color}22' }]}><Briefcase size={12} color="${color}" /><Text style={[styles.badgeText, { color: '${color}' }]}>${levelLabel}</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {[
          {label:'Status',value:'Active',icon: Activity, color: '#34C759'},
          {label:'Level',value:'${levelLabel}',icon: Briefcase, color: '${color}'},
          {label:'Efficiency',value:'20x',icon: Target, color: '#FF9500'},
          {label:'Parent',value:'${parentId}',icon: ${icon}, color: '#007AFF'}
        ].map((stat,index)=>(
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          ${agentName} - Sub-agent supporting ${parentName}. Part of the Kaytx AI Workforce hierarchy providing automated capabilities.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {[${capTagsStr}].map((cap,index)=>(
            <View key={index} style={[styles.tag, { backgroundColor: '${color}18' }]}>
              <Text style={[styles.tagText, { color: '${color}' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {[${endpointsStr}].map((endpoint,index)=>(
          <View key={index} style={styles.endpointRow}>
            <Zap size={14} color="#8B5CF6" />
            <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/${deptFolder}/${parentId}')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <${icon} size={24} color="${color}" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>{${JSON.stringify(parentName)}}</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="${agentId}" agentName="${agentName}" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
`;
}

// Parse the data file
const content = fs.readFileSync(dataFile, 'utf8');
const lines = content.split('\n');

let currentDept = '';
let currentMainAgent = '';
let currentMainAgentId = '';
let deptFolder = '';
let deptColor = '';
let deptIcon = '';
const agents = [];

for (const line of lines) {
  // Detect department header
  const deptMatch = line.match(/DEPT\s+\d+:\s+(.+?)\s+\(/);
  if (deptMatch) {
    // Convert UPPERCASE name to Title Case for deptMap lookup
    const rawName = deptMatch[1].trim();
    currentDept = rawName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    // Handle special cases
    if (currentDept === 'Ai Management & Governance') currentDept = 'AI Management & Governance';
    if (currentDept === 'It-technology') currentDept = 'IT & Technology';
    const cfg = deptMap[currentDept];
    if (cfg) {
      deptFolder = cfg.folder;
      deptColor = cfg.color;
      deptIcon = cfg.icon;
    }
  }

  // Detect main agent (numbered line like "1. AI Chief Customer Officer")
  const mainMatch = line.match(/^\s*(\d+)\.\s+(AI\s+.+?)\s*$/);
  if (mainMatch) {
    currentMainAgent = mainMatch[2].trim();
    currentMainAgentId = toId(currentMainAgent);
  }

  // Detect sub-agent (line starting with →)
  const subMatch = line.match(/→\s+(AI\s+.+?)\s*$/);
  if (subMatch) {
    const subName = subMatch[1].trim();
    const subId = toId(subName);
    agents.push({ subId, subName, parentId: currentMainAgentId, parentName: currentMainAgent, deptFolder, deptColor, deptIcon });
  }
}

console.log(`Found ${agents.length} sub-agents to generate`);

// Generate pages
let totalGenerated = 0;
for (const agent of agents) {
  const subDir = path.join(baseDir, agent.deptFolder, 'sub-agents');
  if (!fs.existsSync(subDir)) {
    fs.mkdirSync(subDir, { recursive: true });
  }

  const filePath = path.join(subDir, `${agent.subId}.tsx`);
  if (!fs.existsSync(filePath)) {
    const pageContent = generatePage(agent.subId, agent.subName, agent.parentId, agent.parentName, agent.deptFolder, agent.deptColor, agent.deptIcon);
    fs.writeFileSync(filePath, pageContent, 'utf8');
    totalGenerated++;
    if (totalGenerated % 100 === 0) {
      console.log(`Generated ${totalGenerated} pages...`);
    }
  }
}

console.log(`\nDONE! Generated ${totalGenerated} sub-agent pages`);
console.log(`Files created in: ${baseDir}/{department}/sub-agents/`);

// Also generate department sub-agents index pages
for (const dept of Object.values(deptMap)) {
  const subAgentsDir = path.join(baseDir, dept.folder, 'sub-agents');
  if (fs.existsSync(subAgentsDir)) {
    const files = fs.readdirSync(subAgentsDir).filter(f => f.endsWith('.tsx') && f !== 'index.tsx');
    if (files.length > 0) {
      const agentIds = files.map(f => f.replace('.tsx', ''));
      const indexContent = generateSubAgentsIndex(dept.folder, dept.color, dept.icon, agentIds);
      fs.writeFileSync(path.join(subAgentsDir, 'index.tsx'), indexContent, 'utf8');
      console.log(`Created index for ${dept.folder}/sub-agents (${files.length} agents)`);
    }
  }
}

function generateSubAgentsIndex(deptFolder, color, icon, agentIds) {
  const deptName = Object.entries(deptMap).find(([_, v]) => v.folder === deptFolder)?.[0] || deptFolder;
  const iconImport = icon;
  
  const agentCards = agentIds.map(id => {
    const displayName = id.replace(/-/g, ' ').replace(/\b(\w)/g, (_, c) => c.toUpperCase());
    return `        <TouchableOpacity key="${id}" onPress={() => router.push('/ai-agent/${deptFolder}/sub-agents/${id}')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '${color}20' }]}><${iconImport} size={28} color="${color}" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>${displayName}</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>`;
  }).join('\n');

  return `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, ${iconImport}, ArrowRight, Briefcase, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SubAgentsIndex() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '${color}15' }]}><${iconImport} size={48} color="${color}" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>${deptName} - Sub-Agents</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Helper & Sub-Agent Workforce</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '${color}22' }]}><Users size={12} color="${color}" /><Text style={[styles.badgeText, { color: '${color}' }]}>${agentIds.length} Agents</Text></View>
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
${agentCards}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  agentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12 },
  agentIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  agentInfo: { flex: 1, marginLeft: 12 },
  agentName: { fontSize: 16, fontWeight: '600' },
  agentDesc: { fontSize: 12, marginTop: 2 },
});
`;
}
