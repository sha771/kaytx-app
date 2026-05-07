import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Target, Activity, Star, Users, CircleCheckBig, Clock, ArrowRight, Zap, Eye, Compass, Megaphone, Package } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AgentPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Strategies', value: '2,290', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.9%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '1.2s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '98.4%', icon: Target, color: '#6A1B9A' },
  ];

  const capabilities = ['Product Strategy', 'Competitive Analysis', 'Strategic Opportunity ID', 'Vision Communication', 'Market Positioning', 'Portfolio Strategy', 'Innovation Scouting', 'Executive Alignment'];

  const responsibilities = [
    'Define and communicate product vision and strategic direction',
    'Lead competitive analysis and market positioning initiatives',
    'Identify and evaluate strategic opportunities for growth',
    'Align product strategy with business objectives and executive goals',
    'Drive innovation scouting and emerging technology assessment',
    'Coordinate cross-functional strategic planning sessions',
    'Present strategic recommendations to C-suite stakeholders',
    'Monitor competitive landscape and adjust strategy accordingly',
  ];

  const activities = [
    { time: '2 min ago', text: 'Completed competitive landscape analysis for Q3', icon: Eye },
    { time: '15 min ago', text: 'Identified 3 new strategic growth opportunities', icon: Compass },
    { time: '1 hour ago', text: 'Presented product vision to executive team', icon: Megaphone },
    { time: '3 hours ago', text: 'Updated strategic roadmap with market shifts', icon: Target },
  ];

  const subAgents = [
    { name: 'AI Competitive Analyst', icon: Eye, route: '/ai-agent/product/sub-agents/competitive-analyst', desc: 'Competitive intelligence & market positioning' },
    { name: 'AI Strategic Opportunity Scout', icon: Compass, route: '/ai-agent/product/sub-agents/strategic-opportunity-scout', desc: 'Growth opportunity identification & evaluation' },
    { name: 'AI Vision Communicator', icon: Megaphone, route: '/ai-agent/product/sub-agents/vision-communicator', desc: 'Product vision articulation & stakeholder alignment' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#6A1B9A20' }]}><Target size={48} color="#6A1B9A" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Product Strategy</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Product Management Department</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#6A1B9A22' }]}><Star size={12} color="#6A1B9A" /><Text style={[styles.badgeText, { color: '#6A1B9A' }]}>VP Level</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The AI VP Product Strategy leads enterprise product strategy, drives competitive analysis, identifies strategic growth opportunities, and communicates product vision across the organization. It oversees 3 specialized sub-agents for comprehensive strategic coverage.</Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, i) => (
            <View key={i} style={[styles.tag, { backgroundColor: '#6A1B9A18' }]}><Text style={[styles.tagText, { color: '#6A1B9A' }]}>{cap}</Text></View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, i) => (
          <View key={i} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#6A1B9A" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {['/consult/vp-product-strategy', '/product-strategy/execute', '/product-strategy/analyze', '/product-strategy/competitive-intel'].map((ep, i) => (
          <View key={i} style={styles.endpointRow}>
            <Zap size={14} color="#6A1B9A" />
            <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{ep}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        {subAgents.map((sub, i) => (
          <TouchableOpacity key={i} onPress={() => router.push(sub.route as any)} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7', marginTop: i > 0 ? 8 : 0 }]}>
            <sub.icon size={24} color="#6A1B9A" />
            <View style={styles.subAgentInfo}>
              <Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sub.name}</Text>
              <Text style={[styles.subAgentDesc, { color: theme.colors.textSecondary }]}>{sub.desc}</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, i) => (
          <View key={i} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '#6A1B9A15' }]}><act.icon size={14} color="#6A1B9A" /></View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <AgentFeatures agentId="vp-product-strategy" agentName="AI VP Product Strategy" />
      <View style={{ height: 40 }} />
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
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  subAgentInfo: { flex: 1 },
  subAgentName: { fontSize: 16, fontWeight: '600' },
  subAgentDesc: { fontSize: 12, marginTop: 2 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
});
