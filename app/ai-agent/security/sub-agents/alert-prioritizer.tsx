import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Shield,
  Activity,
  Zap,
  Target,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Clock,
  BarChart3,
  Crown,
  Sparkles,
  Settings,
  Filter,
  Layers,
  ArrowUpCircle,
  ArrowDownCircle,
  Gauge,
  Eye,
  Users
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function AlertPrioritizerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;
  const [activeTab, setActiveTab] = useState('overview');
  const [autoPrioritize, setAutoPrioritize] = useState(true);
  const [mlScoring, setMlScoring] = useState(true);
  const [alertSuppression, setAlertSuppression] = useState(true);

  const stats = [
    { label: 'Alerts Processed', value: '12.4K', change: '+2.1K', icon: AlertCircle, color: '#EF4444', trend: 'up' },
    { label: 'Critical Identified', value: '89', change: '+12', icon: AlertTriangle, color: '#DC2626', trend: 'up' },
    { label: 'False Positive Rate', value: '3.2%', change: '-1.5%', icon: Filter, color: '#10B981', trend: 'down' },
    { label: 'Avg Priority Time', value: '2.3s', change: '-0.8s', icon: Clock, color: '#F59E0B', trend: 'down' },
  ];

  const kpis = [
    { label: 'Prioritization Accuracy', value: '97.8%', target: '95%', status: 'exceeding', icon: CheckCircle2 },
    { label: 'Critical Detection Rate', value: '99.2%', target: '98%', status: 'exceeding', icon: AlertTriangle },
    { label: 'False Positive Reduction', value: '68%', target: '60%', status: 'exceeding', icon: Filter },
    { label: 'MTTD Improvement', value: '45%', target: '40%', status: 'exceeding', icon: Clock },
  ];

  const capabilities = [
    'Risk-Based Prioritization', 'Threat Intelligence Correlation', 'Asset Criticality Weighting', 'Historical Pattern Analysis',
    'ML-Based Scoring', 'Context Enrichment', 'Alert Suppression', 'Duplicate Detection',
    'Severity Classification', 'Business Impact Assessment', 'Attack Chain Analysis', 'Confidence Scoring',
    'Real-Time Ranking', 'Analyst Workload Balancing', 'Escalation Recommendation'
  ];

  const responsibilities = [
    'Analyze incoming security alerts and assign priority scores',
    'Correlate alerts with threat intelligence feeds for context',
    'Weight alerts based on asset criticality and business impact',
    'Apply machine learning models to identify true positives',
    'Enrich alerts with contextual data from multiple sources',
    'Suppress low-priority alerts to reduce analyst fatigue',
    'Detect and merge duplicate alerts automatically',
    'Classify alert severity using standardized frameworks',
    'Assess potential business impact of security events',
    'Analyze attack chains to identify related alerts',
    'Assign confidence scores to prioritization decisions',
    'Rank alerts in real-time for analyst queue management',
    'Balance workload across SOC analyst teams',
    'Recommend escalation paths for high-priority alerts',
    'Continuously tune prioritization algorithms based on outcomes'
  ];

  const activities = [
    { action: 'Promoted to critical', target: 'Suspicious login pattern', time: '5 mins ago', icon: ArrowUpCircle },
    { action: 'Suppressed 23 alerts', target: 'Known false positive', time: '15 mins ago', icon: Filter },
    { action: 'Merged duplicates', target: 'Port scan detection', time: '30 mins ago', icon: Layers },
    { action: 'Enriched context', target: 'Malware detection alert', time: '1 hour ago', icon: Eye },
    { action: 'Downgraded severity', target: 'Vulnerability scan', time: '2 hours ago', icon: ArrowDownCircle },
    { action: 'Tuned ML model', target: 'Phishing detection', time: '4 hours ago', icon: Gauge },
  ];

  const quickActions = [
    { label: 'View Queue', icon: Layers, color: '#EF4444' },
    { label: 'Tune Rules', icon: Gauge, color: '#F59E0B' },
    { label: 'Suppress Alert', icon: Filter, color: '#10B981' },
    { label: 'Promote Critical', icon: ArrowUpCircle, color: '#DC2626' },
    { label: 'Enrich Context', icon: Eye, color: '#8B5CF6' },
    { label: 'Merge Duplicates', icon: Layers, color: '#3B82F6' },
    { label: 'View Metrics', icon: BarChart3, color: '#EC4899' },
    { label: 'Train Model', icon: Gauge, color: '#10B981' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[styles.iconContainer, { backgroundColor: '#DC262615' }]}>
          <AlertCircle size={48} color="#DC2626" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>AI Alert Prioritizer</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Security alert ranking and prioritization specialist
        </Text>
        <View style={styles.badgesContainer}>
          <View style={[styles.badge, { backgroundColor: '#34C75920' }]}>
            <Activity size={14} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#DC262620' }]}>
            <Crown size={14} color="#DC2626" />
            <Text style={[styles.badgeText, { color: '#DC2626' }]}>Sub-Agent</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#6366F120' }]}>
            <Sparkles size={14} color="#6366F1" />
            <Text style={[styles.badgeText, { color: '#6366F1' }]}>AI-Powered</Text>
          </View>
        </View>
      </View>

      {/* Parent Agent Navigation */}
      <TouchableOpacity style={[styles.parentCard, { backgroundColor: colors.card }]} onPress={() => router.push('/ai-agent/security/vp-security-ops-enterprise')}>
        <View style={[styles.parentIcon, { backgroundColor: '#DC262615' }]}>
          <Settings size={24} color="#DC2626" />
        </View>
        <View style={styles.parentInfo}>
          <Text style={[styles.parentLabel, { color: colors.textSecondary }]}>Reports to</Text>
          <Text style={[styles.parentName, { color: colors.text }]}>AI VP Security Operations</Text>
        </View>
        <ArrowRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {['overview', 'alerts', 'capabilities', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stats Grid */}
      {activeTab === 'overview' && (
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: colors.card }]}>
            <View style={styles.statHeader}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
                <stat.icon size={20} color={stat.color} />
              </View>
              <View style={[styles.changeBadge, { backgroundColor: stat.trend === 'up' ? '#34C75915' : '#FF3B3015' }]}>
                {stat.trend === 'up' ? <TrendingUp size={12} color="#34C759" /> : <TrendingDown size={12} color="#FF3B30" />}
                <Text style={[styles.changeText, { color: stat.trend === 'up' ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
              </View>
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>
      )}

      {/* KPIs Section */}
      {activeTab === 'overview' && (
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Performance KPIs</Text>
        <View style={styles.kpiGrid}>
          {kpis.map((kpi, index) => (
            <View key={index} style={styles.kpiCard}>
              <View style={styles.kpiHeader}>
                <View style={[styles.kpiIcon, { backgroundColor: '#DC262615' }]}>
                  <kpi.icon size={16} color="#DC2626" />
                </View>
                <View style={[styles.statusBadge, { backgroundColor: kpi.status === 'exceeding' ? '#34C75915' : kpi.status === 'meeting' ? '#007AFF15' : '#FF950015' }]}>
                  <Text style={[styles.statusText, { color: kpi.status === 'exceeding' ? '#34C759' : kpi.status === 'meeting' ? '#007AFF' : '#FF9500' }]}>
                    {kpi.status === 'exceeding' ? 'Exceeding' : kpi.status === 'meeting' ? 'On Track' : 'At Risk'}
                  </Text>
                </View>
              </View>
              <Text style={[styles.kpiValue, { color: colors.text }]}>{kpi.value}</Text>
              <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>{kpi.label}</Text>
              <Text style={[styles.kpiTarget, { color: colors.textSecondary }]}>Target: {kpi.target}</Text>
            </View>
          ))}
        </View>
      </View>
      )}

      {/* Overview Section */}
      {activeTab === 'overview' && (
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Overview</Text>
        <Text style={[styles.overviewText, { color: colors.textSecondary }]}>
          The AI Alert Prioritizer intelligently ranks and prioritizes security alerts based on risk, threat intelligence, 
          asset criticality, and business impact. This agent reduces analyst fatigue by filtering noise and ensuring 
          critical threats receive immediate attention.
        </Text>
      </View>
      )}

      {/* Capabilities Section */}
      {activeTab === 'capabilities' && (
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#EF444415' }]}>
              <Text style={[styles.tagText, { color: '#EF4444' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>
      )}

      {/* Responsibilities Section */}
      {activeTab === 'overview' && (
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((resp, index) => (
          <View key={index} style={styles.responsibilityItem}>
            <View style={[styles.bullet, { backgroundColor: '#DC2626' }]} />
            <Text style={[styles.responsibilityText, { color: colors.textSecondary }]}>{resp}</Text>
          </View>
        ))}
      </View>
      )}

      {/* Activity Feed */}
      {activeTab === 'alerts' && (
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#DC262615' }]}>
              <activity.icon size={16} color="#DC2626" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityAction, { color: colors.text }]}>{activity.action}</Text>
              <Text style={[styles.activityTarget, { color: colors.textSecondary }]}>{activity.target}</Text>
            </View>
            <Text style={[styles.activityTime, { color: colors.textSecondary }]}>{activity.time}</Text>
          </View>
        ))}
      </View>
      )}

      {/* Quick Actions */}
      {activeTab === 'overview' && (
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: action.color + '10' }]}>
              <action.icon size={20} color={action.color} />
              <Text style={[styles.actionText, { color: action.color }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      )}

      {/* Settings Section */}
      {activeTab === 'settings' && (
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Configuration</Text>
        
        <View style={styles.featureToggle}>
          <View style={styles.featureToggleInfo}>
            <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Auto-Prioritization</Text>
            <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Automatically prioritize incoming alerts</Text>
          </View>
          <Switch value={autoPrioritize} onValueChange={setAutoPrioritize} trackColor={{ false: '#767577', true: '#DC2626' }} />
        </View>

        <View style={styles.featureToggle}>
          <View style={styles.featureToggleInfo}>
            <Text style={[styles.featureToggleTitle, { color: colors.text }]}>ML-Based Scoring</Text>
            <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Use machine learning for confidence scoring</Text>
          </View>
          <Switch value={mlScoring} onValueChange={setMlScoring} trackColor={{ false: '#767577', true: '#DC2626' }} />
        </View>

        <View style={styles.featureToggle}>
          <View style={styles.featureToggleInfo}>
            <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Alert Suppression</Text>
            <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Suppress low-priority and duplicate alerts</Text>
          </View>
          <Switch value={alertSuppression} onValueChange={setAlertSuppression} trackColor={{ false: '#767577', true: '#DC2626' }} />
        </View>
      </View>
      )}

      {/* Agent Features */}
      <AgentFeatures agentId="alert-prioritizer" agentName="AI Alert Prioritizer" />

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  iconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesContainer: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, marginHorizontal: 16, marginTop: 16, borderRadius: 12, gap: 12 },
  parentIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  parentInfo: { flex: 1 },
  parentLabel: { fontSize: 11, fontWeight: '500' },
  parentName: { fontSize: 16, fontWeight: '600' },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F2F2F7' },
  activeTab: { backgroundColor: '#DC2626' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 12 },
  statHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  statIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  changeBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
  changeText: { fontSize: 11, fontWeight: '600' },
  statValue: { fontSize: 20, fontWeight: 'bold' },
  statLabel: { fontSize: 12, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  overviewText: { fontSize: 14, lineHeight: 22 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  kpiCard: { flex: 1, minWidth: '45%', padding: 14, backgroundColor: '#F8F8F8', borderRadius: 12 },
  kpiHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  kpiIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: '600' },
  kpiValue: { fontSize: 18, fontWeight: 'bold' },
  kpiLabel: { fontSize: 12, marginTop: 4 },
  kpiTarget: { fontSize: 11, marginTop: 2 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, gap: 10 },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  responsibilityText: { flex: 1, fontSize: 13, lineHeight: 20 },
  activityItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityAction: { fontSize: 14, fontWeight: '500' },
  activityTarget: { fontSize: 12, marginTop: 2 },
  activityTime: { fontSize: 11 },
  quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  actionButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, gap: 8 },
  actionText: { fontSize: 13, fontWeight: '500' },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12 },
});
