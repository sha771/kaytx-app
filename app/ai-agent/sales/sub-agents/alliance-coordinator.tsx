import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { Activity, TrendingUp, TrendingDown, Target, ArrowRight, Briefcase, Brain, BarChart3, DollarSign, Handshake, Users, FileText, Settings, Link2, Award, Calendar } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const PARENT_AGENT = { id: 'vp-business-development', name: 'AI VP Business Development', route: '/ai-agent/sales/vp-business-development', icon: DollarSign, color: '#5856D6' };

export default function AllianceCoordinatorPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Active Alliances', value: '42', icon: Handshake, color: '#007AFF', change: '+6' },
    { label: 'Joint Revenue', value: '$18M', icon: DollarSign, color: '#34C759', change: '+24%' },
    { label: 'Co-sell Deals', value: '84', icon: Link2, color: '#FF9500', change: '+12' },
    { label: 'NPS Score', value: '76', icon: Award, color: '#AF52DE', change: '+4' },
  ];

  const kpis = [
    { label: 'Alliance ROI', value: '4.2x', trend: 'up' },
    { label: 'Partner Sat.', value: '92%', trend: 'up' },
    { label: 'Deal Cycle', value: '45 days', trend: 'down' },
    { label: 'Enablement', value: '94%', trend: 'up' },
  ];

  const capabilities = ['Alliance Management','Co-selling','Partner Enablement','Joint Planning','Relationship Mapping','Contract Negotiation','Performance Tracking','Conflict Resolution','Marketing Alignment','Technical Integration','Executive Sponsorship','Quarterly Reviews'];

  const responsibilities = ['Strategic alliance relationship cultivation and executive engagement','Co-selling program orchestration and deal escalation management','Joint business planning and mutual goal setting with partners','Partner enablement content delivery and certification tracking','Alliance performance tracking and health score monitoring','Contract negotiation support and agreement renewal management','Technical integration coordination and solution architecture alignment','Joint marketing campaign planning and co-branding approval','Alliance conflict resolution and territory dispute mediation','Executive business review preparation and presentation delivery'];

  const activities = [
    { time: '8 min ago', text: 'QBR completed with TechCorp: $4.2M pipeline secured', icon: Calendar, type: 'review' },
    { time: '25 min ago', text: 'Co-sell deal won: $850K with partner CloudFirst', icon: Link2, type: 'deal' },
    { time: '52 min ago', text: 'Partner enablement session: 45 SEs certified', icon: Users, type: 'training' },
    { time: '1 hour ago', text: 'Alliance health check: 3 at-risk flagged for attention', icon: Handshake, type: 'health' },
    { time: '2 hours ago', text: 'Joint marketing campaign launched: 12 partners', icon: Award, type: 'marketing' },
    { time: '4 hours ago', text: 'Executive sponsor alignment meeting completed', icon: Users, type: 'executive' },
  ];

  const quickActions = [
    { label: 'Alliances', icon: Handshake },{ label: 'Co-sell', icon: Link2 },{ label: 'Planning', icon: Calendar },{ label: 'Training', icon: Users },{ label: 'Health', icon: Award },{ label: 'Contracts', icon: FileText },{ label: 'Reports', icon: BarChart3 },{ label: 'Settings', icon: Settings },
  ];

  const typeColors: Record<string, string> = { review: '#007AFF', deal: '#34C759', training: '#FF9500', health: '#AF52DE', marketing: '#5856D6', executive: '#FF2D55' };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#FF950018' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#FF950025' }]}>
          <Handshake size={48} color="#FF9500" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Alliance Coordinator</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Partnership Excellence • Business Development</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Briefcase size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}><Handshake size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>42 Alliances</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Brain size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>AI-Powered</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => { const StatIcon = stat.icon; return (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <StatIcon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statChange, { color: stat.change.startsWith('+') ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        )})}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance KPIs</Text>
        <View style={styles.kpiGrid}>
          {kpis.map((kpi, index) => (
            <View key={index} style={[styles.kpiCard, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.kpiValue, { color: theme.colors.text }]}>{kpi.value}</Text>
              <Text style={[styles.kpiLabel, { color: theme.colors.textSecondary }]}>{kpi.label}</Text>
              <View style={[styles.trendBadge, { backgroundColor: (kpi.trend === 'up' ? '#34C759' : '#FF3B30') + '22' }]}>
                {kpi.trend === 'up' ? <TrendingUp size={10} color="#34C759" /> : <TrendingDown size={10} color="#FF3B30" />}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Alliance Coordinator nurtures strategic partnerships through relationship management, co-selling orchestration, and joint planning. It ensures partner satisfaction, tracks alliance health, and drives revenue through collaborative selling programs and coordinated go-to-market execution.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (<View key={index} style={[styles.tag, { backgroundColor: '#FF950018' }]}><Text style={[styles.tagText, { color: '#FF9500' }]}>{cap}</Text></View>))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <View style={[styles.bulletPoint, { backgroundColor: '#FF9500' }]} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Activity Feed</Text>
        {activities.map((act, index) => { const ActIcon = act.icon; return (
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: (typeColors[act.type] || '#8E8E93') + '20' }]}>
              <ActIcon size={14} color={typeColors[act.type] || '#8E8E93'} />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
            <View style={[styles.activityBadge, { backgroundColor: (typeColors[act.type] || '#8E8E93') + '15' }]}>
              <Text style={[styles.activityBadgeText, { color: typeColors[act.type] || '#8E8E93' }]}>{act.type}</Text>
            </View>
          </View>
        )})}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => { const ActionIcon = action.icon; return (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#FF950012' }]}>
              <ActionIcon size={22} color="#FF9500" />
              <Text style={[styles.actionText, { color: '#FF9500' }]}>{action.label}</Text>
            </TouchableOpacity>
          )})}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push(PARENT_AGENT.route)} style={[styles.parentCard, { backgroundColor: theme.colors.background }]}>
          <PARENT_AGENT.icon size={24} color={PARENT_AGENT.color} />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>{PARENT_AGENT.name}</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Executive Agent • Growth Division</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="alliance-coordinator" agentName="AI Alliance Coordinator" />
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
