import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Monitor, Activity, Star, CircleCheckBig, Target, ChartBarBig, Calendar, ArrowRight, Users, Zap, Globe, Gauge, MousePointerClick, TrendingUp, TrendingDown, DollarSign, BarChart3, Brain, Briefcase, Settings, FileText } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function VPDigitalPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Digital Channels', value: '12', icon: CircleCheckBig, color: '#34C759', change: '+2' },
    { label: 'Ad ROI', value: '4.8x', icon: TrendingUp, color: '#007AFF', change: '+0.6x' },
    { label: 'Ad Spend', value: '$2.1M', icon: DollarSign, color: '#FF9500', change: '+$340K' },
    { label: 'Conv. Rate', value: '3.4%', icon: MousePointerClick, color: '#1565C0', change: '+0.5%' },
  ];

  const kpis = [
    { label: 'Digital Revenue', value: '$14M', trend: 'up' },
    { label: 'Page Load', value: '1.8s', trend: 'down' },
    { label: 'Bounce Rate', value: '32%', trend: 'down' },
    { label: 'Sessions', value: '2.4M', trend: 'up' },
  ];

  const capabilities = ['Digital Strategy','Channel Optimization','Web Analytics','Conversion Optimization','Performance Tracking','Digital Advertising','UX Optimization','MarTech Stack','Programmatic Ads','Attribution Modeling','A/B Testing','SEO/SEM','Social Ads','Retargeting','User Journey Mapping','Data Integration'];

  const responsibilities = [
    'Digital channel optimization across all platforms and devices',
    'Web performance tracking and speed optimization programs',
    'Conversion rate analysis and continuous improvement',
    'Digital advertising strategy and spend management',
    'UX/UI optimization and user journey mapping',
    'Marketing technology stack integration and management',
    'Digital attribution modeling and multi-touch analytics',
    'Cross-platform digital experience consistency enforcement',
    'Programmatic advertising and real-time bidding strategy',
    'SEO/SEM strategy and search performance optimization',
    'Social media advertising and retargeting programs',
    'Data integration and customer data platform management'
  ];

  const activities = [
    { time: '4 min ago', text: 'Optimized digital ad spend across 6 channels: +12% ROI', icon: Globe, type: 'optimization' },
    { time: '20 min ago', text: 'Tracked web performance: 1.8s avg load, 99.9% uptime', icon: Gauge, type: 'performance' },
    { time: '1 hour ago', text: 'Analyzed conversion funnel: checkout +8% improvement', icon: MousePointerClick, type: 'conversion' },
    { time: '3 hours ago', text: 'Launched A/B test on landing page: 4 variants running', icon: Monitor, type: 'testing' },
    { time: '5 hours ago', text: 'Updated digital attribution model: 6-touch model live', icon: Zap, type: 'attribution' },
    { time: '8 hours ago', text: 'Programmatic ad review: $340K reallocated to top segments', icon: DollarSign, type: 'spend' },
  ];

  const typeColors: Record<string, string> = { optimization: '#34C759', performance: '#007AFF', conversion: '#FF9500', testing: '#1565C0', attribution: '#AF52DE', spend: '#C62828' };

  const quickActions = [
    { label: 'Channels', icon: Globe }, { label: 'Performance', icon: Gauge },
    { label: 'Conversions', icon: MousePointerClick }, { label: 'Ad Spend', icon: DollarSign },
    { label: 'Analytics', icon: ChartBarBig }, { label: 'A/B Test', icon: Monitor },
    { label: 'Schedule', icon: Calendar }, { label: 'Settings', icon: Settings },
  ];

  const subAgents = [
    { name: 'AI Digital Channel Optimizer', id: 'digital-channel-optimizer', icon: Globe, desc: 'Digital channel performance & optimization' },
    { name: 'AI Web Performance Tracker', id: 'web-performance-tracker', icon: Gauge, desc: 'Web speed, uptime & performance monitoring' },
    { name: 'AI Conversion Analyst', id: 'conversion-analyst', icon: MousePointerClick, desc: 'Conversion funnel analysis & CRO' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#C6282818' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#C6282825' }]}>
          <Monitor size={48} color="#C62828" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Digital</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Marketing Division — VP Level</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#1565C022' }]}><Star size={12} color="#1565C0" /><Text style={[styles.badgeText, { color: '#1565C0' }]}>VP Level</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Briefcase size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Reports</Text></View>
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
          The AI VP Digital leads digital strategy, channel optimization, and conversion improvement across all digital touchpoints. This VP-level agent manages digital advertising, web performance, and marketing technology to maximize digital ROI and user experience.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#C6282818' }]}>
              <Text style={[styles.tagText, { color: '#C62828' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#C62828" />
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
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        {subAgents.map((sub, index) => (
          <TouchableOpacity key={index} onPress={() => router.push(`/ai-agent/marketing/sub-agents/${sub.id}`)} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.subAgentIcon, { backgroundColor: '#C6282815' }]}>
              <sub.icon size={20} color="#C62828" />
            </View>
            <View style={styles.subAgentInfo}>
              <Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sub.name}</Text>
              <Text style={[styles.subAgentDesc, { color: theme.colors.textSecondary }]}>{sub.desc}</Text>
            </View>
            <ArrowRight size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#C6282812' }]}>
              <action.icon size={24} color="#C62828" />
              <Text style={[styles.actionText, { color: '#C62828' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/marketing/cmo' as any)} style={[styles.parentCard, { backgroundColor: theme.colors.background }]}>
          <Monitor size={24} color="#C62828" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI Chief Marketing Officer</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>C-Suite • Marketing Division</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="vp-digital" agentName="AI VP Digital" />
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
  badgesRow: { flexDirection: 'row', marginTop: 16, gap: 8 },
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
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  activityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  activityBadgeText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10, gap: 12 },
  subAgentIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  subAgentInfo: { flex: 1 },
  subAgentName: { fontSize: 15, fontWeight: '600' },
  subAgentDesc: { fontSize: 12, marginTop: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 12, fontWeight: '600', marginTop: 8 },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
