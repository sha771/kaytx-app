import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity, TrendingUp, TrendingDown, Target, ArrowRight, Briefcase,
  Brain, BarChart3, DollarSign, MapPin, Users, FileText, Shield,
  CheckCircle, Settings, Globe, AlertTriangle
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const PARENT_AGENT = { id: 'vp-business-development', name: 'AI VP Business Development', route: '/ai-agent/sales/vp-business-development', icon: TrendingUp, color: '#007AFF' };

export default function MarketExpanderPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Markets', value: '28', icon: MapPin, color: '#007AFF', change: '+4' },
    { label: 'Entry Plans', value: '12', icon: FileText, color: '#34C759', change: '+2' },
    { label: 'TAM Identified', value: '$2.4B', icon: DollarSign, color: '#FF9500', change: '+$400M' },
    { label: 'Win Probability', value: '72%', icon: Target, color: '#AF52DE', change: '+5%' },
  ];

  const kpis = [
    { label: 'Market Readiness', value: '84%', trend: 'up' },
    { label: 'Entry Time', value: '6 mo', trend: 'down' },
    { label: 'TAM Coverage', value: '62%', trend: 'up' },
    { label: 'Risk Score', value: 'Low', trend: 'up' },
  ];

  const capabilities = [
    'Market Analysis', 'Entry Strategy', 'TAM Calculation', 'Competitive Intel',
    'Regulatory Review', 'Go-to-Market', 'Localization', 'Channel Strategy',
    'Risk Assessment', 'Opportunity Sizing', 'Cultural Fit', 'Expansion Roadmap'
  ];

  const responsibilities = [
    'Market opportunity analysis with TAM/SAM/SOM calculation and prioritization',
    'Market entry strategy development with go-to-market planning',
    'Competitive landscape analysis for target expansion markets',
    'Regulatory and compliance review for new market entry',
    'Localization strategy development for product and messaging',
    'Channel strategy design for market penetration acceleration',
    'Risk assessment for market entry including political and economic factors',
    'Cultural fit analysis and market readiness evaluation',
    'Expansion roadmap development with milestone tracking',
    'Partnership opportunity identification in target markets',
    'Market testing and validation with minimum viable launch planning',
    'Post-entry performance monitoring and strategy adjustment'
  ];

  const activities = [
    { time: '5 min ago', text: 'Completed APAC market analysis: $800M TAM', icon: MapPin, type: 'analysis' },
    { time: '20 min ago', text: 'Entry plan approved for DACH region', icon: FileText, type: 'strategy' },
    { time: '45 min ago', text: 'Regulatory review cleared for UK expansion', icon: CheckCircle, type: 'compliance' },
    { time: '1 hour ago', text: 'Identified 3 local partners for LATAM entry', icon: Users, type: 'partnership' },
    { time: '2 hours ago', text: 'Risk assessment updated: EMEA low risk', icon: Shield, type: 'risk' },
    { time: '3 hours ago', text: 'Generated expansion roadmap for Q3-Q4', icon: FileText, type: 'report' },
  ];

  const quickActions = [
    { label: 'Markets', icon: MapPin },
    { label: 'Entry Plan', icon: FileText },
    { label: 'TAM', icon: DollarSign },
    { label: 'Compliance', icon: Shield },
    { label: 'Partners', icon: Users },
    { label: 'Risk', icon: AlertTriangle },
    { label: 'Reports', icon: FileText },
    { label: 'Settings', icon: Settings },
  ];

  const typeColors: Record<string, string> = {
    analysis: '#007AFF', strategy: '#34C759', compliance: '#5856D6', partnership: '#FF9500', risk: '#AF52DE', report: '#FF2D55',
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#34C75918' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#34C75925' }]}>
          <MapPin size={48} color="#34C759" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Market Expander</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Market Intelligence • Business Development</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Briefcase size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}><MapPin size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>28 Markets</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Brain size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>AI-Powered</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => {
          const StatIcon = stat.icon;
          return (
            <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <StatIcon size={22} color={stat.color} />
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statChange, { color: stat.change.startsWith('+') ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
            </View>
          );
        })}
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
          The AI Market Expander identifies, evaluates, and plans entry into new geographic and vertical markets. It calculates TAM/SAM/SOM, assesses competitive landscapes, evaluates regulatory requirements, and develops comprehensive go-to-market strategies to ensure successful market entry.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#34C75918' }]}>
              <Text style={[styles.tagText, { color: '#34C759' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <View style={[styles.bulletPoint, { backgroundColor: '#34C759' }]} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Activity Feed</Text>
        {activities.map((act, index) => {
          const ActIcon = act.icon;
          return (
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
              <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#34C75912' }]}>
                <ActionIcon size={22} color="#34C759" />
                <Text style={[styles.actionText, { color: '#34C759' }]}>{action.label}</Text>
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
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Executive Agent • Business Development</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="market-expander" agentName="AI Market Expander" />
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
