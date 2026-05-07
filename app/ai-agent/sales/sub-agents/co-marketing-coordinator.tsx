import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity, TrendingUp, TrendingDown, Target, ArrowRight, Briefcase,
  Brain, BarChart3, DollarSign, Megaphone, Users, FileText, CheckCircle,
  Palette, Settings, Link2, Calendar
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const PARENT_AGENT = { id: 'vp-channel-partners', name: 'AI VP Channel Partners', route: '/ai-agent/sales/vp-channel-partners', icon: Link2, color: '#AF52DE' };

export default function CoMarketingCoordinatorPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Campaigns', value: '56', icon: Megaphone, color: '#007AFF', change: '+8' },
    { label: 'MDF Used', value: '$420K', icon: DollarSign, color: '#34C759', change: '+$65K' },
    { label: 'Partners', value: '34', icon: Users, color: '#FF9500', change: '+4' },
    { label: 'ROI', value: '3.8x', icon: Target, color: '#AF52DE', change: '+0.4x' },
  ];

  const kpis = [
    { label: 'Campaign ROI', value: '3.8x', trend: 'up' },
    { label: 'MDF Utilization', value: '87%', trend: 'up' },
    { label: 'Lead Gen', value: '2.4K/mo', trend: 'up' },
    { label: 'Time to Launch', value: '12 days', trend: 'down' },
  ];

  const capabilities = [
    'Campaign Planning', 'MDF Management', 'Co-branding', 'Content Creation',
    'Event Coordination', 'Lead Sharing', 'Budget Tracking', 'Approval Workflow',
    'Asset Library', 'Performance Analytics', 'Partner Selection', 'Compliance Review'
  ];

  const responsibilities = [
    'Joint marketing campaign planning and execution with channel partners',
    'Market development fund (MDF) management and utilization tracking',
    'Co-branding guideline enforcement and brand compliance review',
    'Collaborative content creation and asset development with partners',
    'Co-marketed event coordination including webinars and conferences',
    'Lead sharing and attribution tracking between partner organizations',
    'Budget allocation and spend tracking across partner campaigns',
    'Approval workflow management for co-marketing materials',
    'Shared asset library maintenance and version control',
    'Campaign performance analytics and ROI measurement',
    'Partner selection and qualification for co-marketing programs',
    'Compliance review for regulatory and brand guideline adherence'
  ];

  const activities = [
    { time: '5 min ago', text: 'Co-branded webinar launched with CloudFirst', icon: Megaphone, type: 'campaign' },
    { time: '20 min ago', text: 'MDF claim approved: $28K for Q2 events', icon: DollarSign, type: 'budget' },
    { time: '40 min ago', text: 'Brand compliance review passed for 4 assets', icon: CheckCircle, type: 'compliance' },
    { time: '1 hour ago', text: 'Lead sharing: 142 leads distributed to 3 partners', icon: Users, type: 'leads' },
    { time: '2 hours ago', text: 'Campaign ROI report: 3.8x average return', icon: BarChart3, type: 'analytics' },
    { time: '3 hours ago', text: 'Partner selection completed for APAC campaign', icon: Users, type: 'planning' },
  ];

  const quickActions = [
    { label: 'Campaigns', icon: Megaphone },{ label: 'MDF', icon: DollarSign },{ label: 'Assets', icon: Palette },{ label: 'Events', icon: Calendar },{ label: 'Leads', icon: Users },{ label: 'Reports', icon: BarChart3 },{ label: 'Approve', icon: FileText },{ label: 'Settings', icon: Settings },
  ];

  const typeColors: Record<string, string> = { campaign: '#007AFF', budget: '#34C759', compliance: '#AF52DE', leads: '#FF9500', analytics: '#5856D6', planning: '#FF2D55' };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#5856D618' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#5856D625' }]}>
          <Megaphone size={48} color="#5856D6" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Co-marketing Coordinator</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Partner Marketing • Channel Division</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text></View>
          <View style={[styles.badge, { backgroundColor: '#5856D622' }]}><Briefcase size={12} color="#5856D6" /><Text style={[styles.badgeText, { color: '#5856D6' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}><Megaphone size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>68 Campaigns</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Brain size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>AI-Powered</Text></View>
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
          The AI Co-marketing Coordinator orchestrates joint marketing programs with channel partners, managing MDF budgets, co-branded campaigns, and lead sharing. It ensures brand consistency, maximizes partner marketing ROI, and drives pipeline generation through collaborative go-to-market execution.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (<View key={index} style={[styles.tag, { backgroundColor: '#5856D618' }]}><Text style={[styles.tagText, { color: '#5856D6' }]}>{cap}</Text></View>))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <View style={[styles.bulletPoint, { backgroundColor: '#5856D6' }]} />
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
          );
        })}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => {
            const ActionIcon = action.icon;
            return (
              <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#5856D612' }]}>
                <ActionIcon size={22} color="#5856D6" />
                <Text style={[styles.actionText, { color: '#5856D6' }]}>{action.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push(PARENT_AGENT.route)} style={[styles.parentCard, { backgroundColor: theme.colors.background }]}>
          <PARENT_AGENT.icon size={24} color={PARENT_AGENT.color} />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>{PARENT_AGENT.name}</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Executive Agent • Channel Division</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="co-marketing-coordinator" agentName="AI Co-marketing Coordinator" />
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
  statChange: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 },
  kpiCard: { flex: 1, minWidth: '45%', padding: 14, borderRadius: 12, position: 'relative' },
  kpiValue: { fontSize: 20, fontWeight: 'bold' },
  kpiLabel: { fontSize: 12, marginTop: 4 },
  trendBadge: { position: 'absolute', top: 10, right: 10, padding: 4, borderRadius: 8 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  bulletPoint: { width: 6, height: 6, borderRadius: 3 },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  activityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  activityBadgeText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  actionText: { fontSize: 12, fontWeight: '600', marginTop: 8 },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
