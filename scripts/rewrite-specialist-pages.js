/**
 * Rewrite the 7 generated specialist pages + 1 VP page with correct JSX
 * These were generated with broken template literals that produced invalid JSX
 */
const fs = require('fs');
const path = require('path');
const BASE = 'c:/Users/shaida/Desktop/kaytx-full-app/app/ai-agent';

const PAGES = [
  { id: 'ai-content-marketing-agent', name: 'AI Content Marketing Agent', icon: 'FileText', color: '#6A1B9A', level: 'Specialist', levelColor: '#007AFF', subtitle: 'Marketing Division — Specialist Level', deptDir: 'marketing',
    subAgents: [
      { name: 'AI Blog Writer', id: 'blog-writer', icon: 'PenLine', desc: 'Blog content creation & SEO writing' },
      { name: 'AI Copy Editor', id: 'copy-editor', icon: 'FileEdit', desc: 'Copy editing & quality assurance' },
      { name: 'AI Content Distributor', id: 'content-distributor', icon: 'Share2', desc: 'Content distribution & syndication' },
    ]},
  { id: 'ai-seo-specialist-agent', name: 'AI SEO Specialist', icon: 'Search', color: '#2E7D32', level: 'Specialist', levelColor: '#007AFF', subtitle: 'Marketing Division — Specialist Level', deptDir: 'marketing',
    subAgents: [
      { name: 'AI Keyword Researcher', id: 'keyword-researcher', icon: 'Search', desc: 'Keyword research & search trend analysis' },
      { name: 'AI On-page Optimizer', id: 'on-page-optimizer', icon: 'FileCode', desc: 'On-page SEO optimization & meta management' },
      { name: 'AI Backlink Analyzer', id: 'backlink-analyzer', icon: 'Link', desc: 'Backlink analysis & link building strategy' },
    ]},
  { id: 'ai-social-media-manager-agent', name: 'AI Social Media Manager', icon: 'Share2', color: '#1DA1F2', level: 'Specialist', levelColor: '#007AFF', subtitle: 'Marketing Division — Specialist Level', deptDir: 'marketing',
    subAgents: [
      { name: 'AI Post Scheduler', id: 'post-scheduler', icon: 'Calendar', desc: 'Social media post scheduling & timing optimization' },
      { name: 'AI Engagement Responder', id: 'engagement-responder', icon: 'MessageCircle', desc: 'Social engagement response & community management' },
      { name: 'AI Trend Monitor', id: 'trend-monitor', icon: 'TrendingUp', desc: 'Social trend monitoring & viral detection' },
    ]},
  { id: 'ai-email-marketing-agent', name: 'AI Email Marketing Agent', icon: 'Mail', color: '#0D47A1', level: 'Specialist', levelColor: '#007AFF', subtitle: 'Marketing Division — Specialist Level', deptDir: 'marketing',
    subAgents: [
      { name: 'AI List Segmenter', id: 'list-segmenter', icon: 'Users', desc: 'Email list segmentation & audience targeting' },
      { name: 'AI Template Designer', id: 'template-designer', icon: 'Layout', desc: 'Email template design & A/B testing' },
      { name: 'AI Deliverability Monitor', id: 'deliverability-monitor', icon: 'ShieldCheck', desc: 'Email deliverability monitoring & optimization' },
    ]},
  { id: 'ai-ad-campaign-manager-agent', name: 'AI Ad Campaign Manager', icon: 'Target', color: '#FF6D00', level: 'Specialist', levelColor: '#007AFF', subtitle: 'Marketing Division — Specialist Level', deptDir: 'marketing',
    subAgents: [
      { name: 'AI Bid Optimizer', id: 'bid-optimizer', icon: 'DollarSign', desc: 'Ad bid optimization & budget management' },
      { name: 'AI Creative Tester', id: 'creative-tester', icon: 'Image', desc: 'Ad creative testing & performance analysis' },
      { name: 'AI Audience Targeter', id: 'audience-targeter', icon: 'Users', desc: 'Audience targeting & lookalike modeling' },
    ]},
  { id: 'ai-marketing-analytics-agent', name: 'AI Marketing Analytics Agent', icon: 'ChartBarBig', color: '#5856D6', level: 'Specialist', levelColor: '#007AFF', subtitle: 'Marketing Division — Specialist Level', deptDir: 'marketing',
    subAgents: [
      { name: 'AI Attribution Modeler', id: 'attribution-modeler', icon: 'GitMerge', desc: 'Multi-touch attribution modeling & analysis' },
      { name: 'AI KPI Dashboard Builder', id: 'kpi-dashboard-builder', icon: 'LayoutDashboard', desc: 'KPI dashboard creation & visualization' },
      { name: 'AI Insight Summarizer', id: 'insight-summarizer', icon: 'Lightbulb', desc: 'Marketing insight summarization & reporting' },
    ]},
  { id: 'vp-operations', name: 'AI VP Operations', icon: 'Settings', color: '#5D4037', level: 'VP', levelColor: '#AF52DE', subtitle: 'Operations Division — VP Level', deptDir: 'operations',
    subAgents: [
      { name: 'AI Process Auditor', id: 'process-auditor', icon: 'ClipboardCheck', desc: 'Process auditing & compliance verification' },
      { name: 'AI SLA Monitor', id: 'sla-monitor', icon: 'Clock', desc: 'SLA monitoring & compliance tracking' },
      { name: 'AI Capacity Planner', id: 'capacity-planner', icon: 'Gauge', desc: 'Capacity planning & resource forecasting' },
    ]},
];

for (const page of PAGES) {
  const filePath = path.join(BASE, page.deptDir, page.id + '.tsx');
  const fnName = page.id.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) + 'Page';
  const uniqueIcons = [...new Set(page.subAgents.map(s => s.icon))];
  const allIcons = [page.icon, 'Activity', 'Star', 'CircleCheckBig', 'Clock', 'Target', 'ChartBarBig', 'MessageSquare', 'Calendar', 'Shield', 'ArrowRight', 'Users', 'Zap', 'TrendingUp', 'BarChart3', 'Brain', 'Briefcase', 'Settings', ...uniqueIcons];
  const uniqueAllIcons = [...new Set(allIcons)];

  const subAgentData = page.subAgents.map(s => `    { name: '${s.name}', id: '${s.id}', icon: ${s.icon}, desc: '${s.desc}' }`).join(',\n');
  const capData = page.subAgents.map(s => `'${s.desc}'`).join(', ');
  const respData = page.subAgents.map(s => `    '${s.desc} & execution'`).join(',\n');

  const content = `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { ${uniqueAllIcons.join(', ')} } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function ${fnName}() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Tasks/Day', value: '${Math.floor(Math.random() * 300 + 100)}', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.9%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '${(Math.random() * 2 + 0.5).toFixed(1)}s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '${(Math.random() * 3 + 97).toFixed(1)}%', icon: Target, color: '${page.color}' },
  ];

  const capabilities = [${capData}];

  const responsibilities = [
${respData}
  ];

  const activities = [
    { time: '2 min ago', text: 'Processed ${Math.floor(Math.random() * 50 + 10)} tasks autonomously', icon: Zap },
    { time: '15 min ago', text: 'Updated performance metrics dashboard', icon: BarChart3 },
    { time: '1 hour ago', text: 'Coordinated with ${Math.floor(Math.random() * 5 + 2)} sub-agents', icon: Users },
    { time: '3 hours ago', text: 'Generated executive summary report', icon: TrendingUp },
  ];

  const quickActions = [
    { label: 'Reports', icon: ChartBarBig }, { label: 'Team Chat', icon: MessageSquare },
    { label: 'Schedule', icon: Calendar }, { label: 'Settings', icon: Settings },
  ];

  const subAgentsList = [
${subAgentData}
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '${page.color}18' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '${page.color}25' }]}>
          <${page.icon} size={48} color="${page.color}" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>${page.name}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>${page.subtitle}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '${page.levelColor}22' }]}><Star size={12} color="${page.levelColor}" /><Text style={[styles.badgeText, { color: '${page.levelColor}' }]}>${page.level}</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Briefcase size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>${page.subAgents.length} Reports</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Brain size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>AI-Powered</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
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
          The ${page.name} provides ${page.level.toLowerCase()}-level oversight and coordination within the organization. This agent manages ${page.subAgents.length} sub-agents, driving operational excellence, strategic alignment, and continuous improvement across all assigned domains.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '${page.color}18' }]}>
              <Text style={[styles.tagText, { color: '${page.color}' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="${page.color}" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, index) => (
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '${page.color}15' }]}>
              <act.icon size={14} color="${page.color}" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        {subAgentsList.map((sub, index) => {
          const SubIcon = sub.icon;
          return (
            <TouchableOpacity key={sub.id} onPress={() => router.push('/ai-agent/${page.deptDir}/sub-agents/' + sub.id)} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <View style={[styles.subAgentIcon, { backgroundColor: '${page.color}15' }]}>
                <SubIcon size={20} color="${page.color}" />
              </View>
              <View style={styles.subAgentInfo}>
                <Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sub.name}</Text>
                <Text style={[styles.subAgentDesc, { color: theme.colors.textSecondary }]}>{sub.desc}</Text>
              </View>
              <ArrowRight size={18} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '${page.color}12' }]}>
              <action.icon size={24} color="${page.color}" />
              <Text style={[styles.actionText, { color: '${page.color}' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="${page.id}" agentName="${page.name}" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', marginTop: 16, gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10, gap: 12 },
  subAgentIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  subAgentInfo: { flex: 1 },
  subAgentName: { fontSize: 15, fontWeight: '600' },
  subAgentDesc: { fontSize: 12, marginTop: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});
`;

  fs.writeFileSync(filePath, content);
  console.log('Rewrote: ' + filePath);
}

console.log('\nDone! All ' + PAGES.length + ' pages rewritten.');
