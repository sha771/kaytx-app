import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  TrendingUp, Activity, CircleCheckBig, Clock, Target, ChartBarBig,
  DollarSign, Award, BarChart3, Zap, Star, Users, Brain, FileText,
  Settings, Shield, ArrowRight, TrendingDown, Percent, Calculator,
  Eye, Search, Scale, CreditCard, Sparkles, Bell,
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = [
  { id: 'competitor-price-tracker', name: 'AI Competitor Price Tracker', description: 'Real-time competitor pricing intelligence & market positioning analysis', icon: Eye, color: '#FF6B35' },
  { id: 'margin-calculator', name: 'AI Margin Calculator', description: 'Dynamic margin analysis & profitability optimization across product lines', icon: Calculator, color: '#10B981' },
  { id: 'discount-approver', name: 'AI Discount Approver', description: 'Automated discount authorization with policy compliance & margin guardrails', icon: Shield, color: '#8B5CF6' },
];

export default function AIPricingAnalystPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Prices Optimized', value: '12,847', icon: CircleCheckBig, color: '#34C759', change: '+18%' },
    { label: 'Margin Impact', value: '$8.4M', icon: DollarSign, color: '#007AFF', change: '+22%' },
    { label: 'Win Rate Lift', value: '+14%', icon: Target, color: '#FF9500', change: '+5.2%' },
    { label: 'Discount Compliance', value: '98.6%', icon: Shield, color: '#AF52DE', change: '+2.1%' },
  ];

  const kpis = [
    { label: 'Avg Price Uplift', value: '+8.3%', trend: 'up' },
    { label: 'Margin Erosion', value: '-2.1%', trend: 'down' },
    { label: 'Discount Velocity', value: '4.2h', trend: 'down' },
    { label: 'Price Accuracy', value: '96.4%', trend: 'up' },
  ];

  const capabilities = [
    'Competitive Pricing', 'Margin Optimization', 'Discount Governance', 'Price Elasticity Modeling',
    'Dynamic Pricing', 'Bundle Pricing', 'Tiered Pricing', 'Promotional Pricing',
    'Win-Loss Pricing Analysis', 'Market Positioning', 'Revenue Impact Analysis', 'Price Testing',
  ];

  const responsibilities = [
    'Strategic Price Setting & Market Positioning Across All Product Lines',
    'Real-Time Competitor Price Monitoring & Response Strategy',
    'Margin Analysis & Profitability Optimization Per SKU & Segment',
    'Discount Policy Enforcement & Approval Workflow Automation',
    'Price Elasticity Modeling & Demand Curve Analysis',
    'Dynamic Pricing Engine Management & A/B Testing',
    'Bundle & Package Pricing Strategy & Optimization',
    'Promotional Pricing ROI Analysis & Campaign Support',
    'Cross-Functional Alignment with Sales, Product & Finance',
    'Board-Level Pricing Impact Reporting & Forecasting',
  ];

  const activities = [
    { time: '3 min ago', text: 'Competitor X reduced Enterprise tier 15% — response strategy activated', icon: Eye, type: 'alert' },
    { time: '18 min ago', text: 'Approved strategic discount: 18% for $2.1M deal (margin safe at 42%)', icon: Shield, type: 'approval' },
    { time: '45 min ago', text: 'Margin Calculator flagged 3 SKUs below threshold — price adjustments queued', icon: Calculator, type: 'analysis' },
    { time: '1 hour ago', text: 'Dynamic pricing test: +6% on Growth tier showing 92% retention', icon: TrendingUp, type: 'test' },
    { time: '2 hours ago', text: 'Quarterly price review: 8 product lines updated, +$1.2M projected impact', icon: DollarSign, type: 'review' },
    { time: '3 hours ago', text: 'Price elasticity model refreshed with Q3 transaction data', icon: Brain, type: 'model' },
  ];

  const quickActions = [
    { label: 'Competitor Scan', icon: Eye },
    { label: 'Margin Report', icon: Calculator },
    { label: 'Discount Queue', icon: Shield },
    { label: 'Price Test', icon: TrendingUp },
    { label: 'Elasticity Model', icon: Brain },
    { label: 'Bundle Builder', icon: Percent },
    { label: 'Reports', icon: FileText },
    { label: 'Settings', icon: Settings },
  ];

  const priceAlerts = [
    { competitor: 'CloudRival', change: '-15%', tier: 'Enterprise', risk: 'high', ourGap: '+22%' },
    { competitor: 'DataSync Pro', change: '+8%', tier: 'Growth', risk: 'low', ourGap: '-5%' },
    { competitor: 'NexGen CRM', change: '-10%', tier: 'Starter', risk: 'medium', ourGap: '+18%' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#FF6B3518' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#FF6B3525' }]}>
          <Percent size={48} color="#FF6B35" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Pricing Analyst</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Pricing Strategy Lead • Sales & Revenue Division</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF6B3522' }]}>
            <Star size={12} color="#FF6B35" /><Text style={[styles.badgeText, { color: '#FF6B35' }]}>Specialist</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}>
            <Users size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>3 Sub-Agents</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}>
            <Brain size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>AI-Powered</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statChange, { color: stat.change.startsWith('+') ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Executive Dashboard</Text>
        <View style={styles.kpiGrid}>
          {kpis.map((kpi, index) => (
            <View key={index} style={[styles.kpiCard, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.kpiValue, { color: theme.colors.text }]}>{kpi.value}</Text>
              <Text style={[styles.kpiLabel, { color: theme.colors.textSecondary }]}>{kpi.label}</Text>
              <View style={[styles.trendBadge, { backgroundColor: kpi.trend === 'up' ? '#34C75922' : '#FF3B3022' }]}>
                {kpi.trend === 'up' ? <TrendingUp size={10} color="#34C759" /> : <TrendingDown size={10} color="#FF3B30" />}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Pricing Analyst serves as the strategic pricing authority, orchestrating competitive intelligence, margin optimization, and discount governance across all product lines. This specialist AI agent combines real-time market monitoring, elasticity modeling, and automated approval workflows to maximize revenue while protecting profitability.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#FF6B3518' }]}>
              <Text style={[styles.tagText, { color: '#FF6B35' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Strategic Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <View style={[styles.bulletPoint, { backgroundColor: '#FF6B35' }]} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Specialized Sub-Agents</Text>
          <View style={[styles.countBadge, { backgroundColor: '#FF6B3522' }]}>
            <Text style={[styles.countBadgeText, { color: '#FF6B35' }]}>{SUB_AGENTS.length}</Text>
          </View>
        </View>
        <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>
          AI workers specializing in pricing operations, reporting to the Pricing Analyst
        </Text>
        {SUB_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={() => router.push(`/ai-agent/sales/sub-agents/${agent.id}`)} style={[styles.agentCard, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}>
              <agent.icon size={24} color={agent.color} />
            </View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.description}</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Competitor Price Alerts</Text>
        {priceAlerts.map((alert, index) => (
          <View key={index} style={styles.alertRow}>
            <View style={styles.alertLeft}>
              <Text style={[styles.alertCompetitor, { color: theme.colors.text }]}>{alert.competitor}</Text>
              <Text style={[styles.alertDetail, { color: theme.colors.textSecondary }]}>{alert.tier} tier • Our gap: {alert.ourGap}</Text>
            </View>
            <View style={styles.alertRight}>
              <Text style={[styles.alertChange, { color: alert.change.startsWith('-') ? '#34C759' : '#FF3B30' }]}>{alert.change}</Text>
              <View style={[styles.riskBadge, { backgroundColor: alert.risk === 'high' ? '#EF444420' : alert.risk === 'medium' ? '#F59E0B20' : '#34C75920' }]}>
                <Text style={[styles.riskText, { color: alert.risk === 'high' ? '#EF4444' : alert.risk === 'medium' ? '#F59E0B' : '#34C759' }]}>{alert.risk}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Activity Feed</Text>
        {activities.map((act, index) => (
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: getActivityColor(act.type) + '20' }]}>
              <act.icon size={14} color={getActivityColor(act.type)} />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
            <View style={[styles.activityBadge, { backgroundColor: getActivityColor(act.type) + '15' }]}>
              <Text style={[styles.activityBadgeText, { color: getActivityColor(act.type) }]}>{act.type}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#FF6B3512' }]}>
              <action.icon size={22} color="#FF6B35" />
              <Text style={[styles.actionText, { color: '#FF6B35' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="ai-pricing-analyst" agentName="AI Pricing Analyst" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function getActivityColor(type: string): string {
  const colors: Record<string, string> = {
    alert: '#FF3B30', approval: '#34C759', analysis: '#007AFF',
    test: '#AF52DE', review: '#FF9500', model: '#5856D6',
  };
  return colors[type] || '#8E8E93';
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
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  sectionDescription: { fontSize: 13, marginBottom: 16, lineHeight: 18 },
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
  countBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  countBadgeText: { fontSize: 12, fontWeight: '700' },
  agentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10 },
  agentIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  agentInfo: { flex: 1, marginLeft: 12 },
  agentName: { fontSize: 15, fontWeight: '600' },
  agentDesc: { fontSize: 12, marginTop: 2 },
  alertRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingVertical: 8 },
  alertLeft: { flex: 1 },
  alertCompetitor: { fontSize: 15, fontWeight: '600' },
  alertDetail: { fontSize: 12, marginTop: 2 },
  alertRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  alertChange: { fontSize: 14, fontWeight: '700' },
  riskBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  riskText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
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
});
