/**
 * AI Chief Customer Officer
 * Department: Customer Experience
 * Level: C-Level Executive
 * Sub-Agents: 3 (CX Strategy Analyst, Customer Journey Mapper, CX Metrics Tracker)
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import {
  ArrowLeft, Crown, Users, TrendingUp, Settings, Bell,
  Target, BarChart3, GitBranch, Zap, Shield, Globe,
  ChevronRight, Bot, Star, Activity, MessageSquare,
  Briefcase, Award, TrendingDown, Plus, CheckCircle2
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';

const DEPT_COLOR = '#00BCD4';

export default function ChiefCustomerOfficerScreen() {
  const ins = useSafeAreaInsets();
  const { theme } = useTheme();
  const { colors } = theme;
  const [activeTab, setActiveTab] = useState<'overview' | 'subagents' | 'analytics' | 'settings'>('overview');
  const [isActive, setIsActive] = useState(true);

  const agentData = {
    id: 'ai-chief-customer-officer',
    name: 'AI Chief Customer Officer',
    title: 'Chief Customer Officer',
    level: 'C-Level Executive',
    department: 'Customer Experience',
    efficiency: '95%',
    aiCost: '$299/mo',
    description: 'Leads enterprise-wide customer experience strategy, ensuring seamless interactions across all touchpoints and maximizing customer lifetime value.',
    capabilities: [
      'CX Strategy Development',
      'Customer Journey Optimization',
      'Loyalty Program Design',
      'Voice of Customer Analytics',
      'Retention Strategy',
      'Cross-functional Leadership'
    ],
    responsibilities: [
      'Define CX vision and roadmap',
      'Align departments around customer needs',
      'Drive customer-centric culture',
      'Report CX metrics to board'
    ],
    subAgents: [
      { id: 'ai-cx-strategy-analyst', name: 'AI CX Strategy Analyst', role: 'Strategic Planning', status: 'active' },
      { id: 'ai-customer-journey-mapper', name: 'AI Customer Journey Mapper', role: 'Journey Design', status: 'active' },
      { id: 'ai-cx-metrics-tracker', name: 'AI CX Metrics Tracker', role: 'Analytics', status: 'active' },
    ],
    metrics: {
      nps: 72,
      csat: 94,
      ces: 88,
      retention: 96,
      churnRate: 4.2,
      clv: '$12,450'
    },
    recentDecisions: [
      { id: 1, title: 'Launched new onboarding flow', impact: '+15% activation', date: '2 days ago' },
      { id: 2, title: 'Reduced support response time', impact: '-30% wait time', date: '1 week ago' },
      { id: 3, title: 'Implemented proactive outreach', impact: '+8% retention', date: '2 weeks ago' },
    ]
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      {/* Status Card */}
      <View style={[styles.statusCard, { backgroundColor: colors.card }]}>
        <View style={styles.statusHeader}>
          <View style={[styles.statusIndicator, { backgroundColor: isActive ? '#4CAF50' : '#FF5722' }]}>
            <Activity size={16} color="#fff" />
          </View>
          <View style={styles.statusInfo}>
            <Text style={[styles.statusTitle, { color: colors.text }]}>Agent Status</Text>
            <Text style={[styles.statusValue, { color: isActive ? '#4CAF50' : '#FF5722' }]}>
              {isActive ? 'Active & Operating' : 'Paused'}
            </Text>
          </View>
          <Switch value={isActive} onValueChange={setIsActive} />
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.metricsGrid}>
        <View style={[styles.metricBox, { backgroundColor: colors.card }]}>
          <Text style={[styles.metricValue, { color: DEPT_COLOR }]}>{agentData.metrics.nps}</Text>
          <Text style={[styles.metricLabel, { color: colors.secondaryText }]}>NPS Score</Text>
        </View>
        <View style={[styles.metricBox, { backgroundColor: colors.card }]}>
          <Text style={[styles.metricValue, { color: colors.success }]}>{agentData.metrics.csat}%</Text>
          <Text style={[styles.metricLabel, { color: colors.secondaryText }]}>CSAT</Text>
        </View>
        <View style={[styles.metricBox, { backgroundColor: colors.card }]}>
          <Text style={[styles.metricValue, { color: colors.warning }]}>{agentData.metrics.retention}%</Text>
          <Text style={[styles.metricLabel, { color: colors.secondaryText }]}>Retention</Text>
        </View>
        <View style={[styles.metricBox, { backgroundColor: colors.card }]}>
          <Text style={[styles.metricValue, { color: colors.primary }]}>{agentData.metrics.clv}</Text>
          <Text style={[styles.metricLabel, { color: colors.secondaryText }]}>Avg CLV</Text>
        </View>
      </View>

      {/* Capabilities */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <View style={styles.sectionHeader}>
          <Target size={18} color={DEPT_COLOR} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Core Capabilities</Text>
        </View>
        {agentData.capabilities.map((cap, i) => (
          <View key={i} style={styles.capabilityRow}>
            <CheckCircle2 size={16} color={DEPT_COLOR} />
            <Text style={[styles.capabilityText, { color: colors.text }]}>{cap}</Text>
          </View>
        ))}
      </View>

      {/* Recent Decisions */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <View style={styles.sectionHeader}>
          <Briefcase size={18} color={DEPT_COLOR} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Strategic Decisions</Text>
        </View>
        {agentData.recentDecisions.map((decision) => (
          <View key={decision.id} style={styles.decisionRow}>
            <View style={styles.decisionContent}>
              <Text style={[styles.decisionTitle, { color: colors.text }]}>{decision.title}</Text>
              <Text style={[styles.decisionImpact, { color: colors.success }]}>{decision.impact}</Text>
            </View>
            <Text style={[styles.decisionDate, { color: colors.secondaryText }]}>{decision.date}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSubAgents = () => (
    <View style={styles.tabContent}>
      <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
        Direct Reports - {agentData.subAgents.length} Sub-Agents
      </Text>
      {agentData.subAgents.map((sub, index) => (
        <Animated.View key={sub.id} entering={FadeInUp.delay(index * 100)}>
          <TouchableOpacity 
            style={[styles.subAgentCard, { backgroundColor: colors.card }]}
            onPress={() => router.push(`/ai-agent/${sub.id}` as any)}
          >
            <View style={[styles.subAgentIcon, { backgroundColor: DEPT_COLOR + '22' }]}>
              <Bot size={24} color={DEPT_COLOR} />
            </View>
            <View style={styles.subAgentInfo}>
              <Text style={[styles.subAgentName, { color: colors.text }]}>{sub.name}</Text>
              <Text style={[styles.subAgentRole, { color: colors.secondaryText }]}>{sub.role}</Text>
              <View style={[styles.statusBadge, { backgroundColor: '#4CAF5022' }]}>
                <Activity size={10} color="#4CAF50" />
                <Text style={[styles.statusText, { color: '#4CAF50' }]}>{sub.status}</Text>
              </View>
            </View>
            <ChevronRight size={20} color={colors.secondaryText} />
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );

  const renderAnalytics = () => (
    <View style={styles.tabContent}>
      <View style={[styles.chartCard, { backgroundColor: colors.card }]}>
        <View style={styles.chartHeader}>
          <BarChart3 size={20} color={DEPT_COLOR} />
          <Text style={[styles.chartTitle, { color: colors.text }]}>CX Metrics Trend</Text>
        </View>
        <View style={styles.chartPlaceholder}>
          <Text style={[styles.chartPlaceholderText, { color: colors.secondaryText }]}>
            📊 Interactive Chart Component
          </Text>
          <Text style={[styles.chartPlaceholderSubtext, { color: colors.secondaryText }]}>
            NPS, CSAT, CES trends over time
          </Text>
        </View>
      </View>

      <View style={[styles.analyticsGrid, { backgroundColor: colors.card }]}>
        <Text style={[styles.analyticsTitle, { color: colors.text }]}>Key Performance Indicators</Text>
        <View style={styles.kpiRow}>
          <View style={styles.kpiItem}>
            <Text style={[styles.kpiValue, { color: DEPT_COLOR }]}>{agentData.metrics.churnRate}%</Text>
            <Text style={[styles.kpiLabel, { color: colors.secondaryText }]}>Churn Rate</Text>
          </View>
          <View style={styles.kpiItem}>
            <Text style={[styles.kpiValue, { color: colors.success }]}>{agentData.metrics.ces}</Text>
            <Text style={[styles.kpiLabel, { color: colors.secondaryText }]}>CES Score</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: ins.top }]}>
      {/* Header */}
      <LinearGradient colors={[DEPT_COLOR, '#00838F']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerAction}>
              <Bell size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerAction}>
              <Settings size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <Crown size={40} color="#FFD700" />
          </View>
          <Text style={styles.headerName}>{agentData.name}</Text>
          <Text style={styles.headerTitle}>{agentData.title}</Text>
          <View style={styles.headerMeta}>
            <View style={styles.metaBadge}>
              <Star size={12} color="#FFD700" />
              <Text style={styles.metaText}>C-Level</Text>
            </View>
            <View style={styles.metaBadge}>
              <Zap size={12} color="#fff" />
              <Text style={styles.metaText}>{agentData.efficiency} Efficiency</Text>
            </View>
            <View style={styles.metaBadge}>
              <Shield size={12} color="#4CAF50" />
              <Text style={styles.metaText}>Premium</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={[styles.tabBar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        {[
          { id: 'overview', label: 'Overview', icon: Target },
          { id: 'subagents', label: 'Sub-Agents', icon: Users },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'settings', label: 'Settings', icon: Settings },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && { borderBottomColor: DEPT_COLOR, borderBottomWidth: 2 }]}
            onPress={() => setActiveTab(tab.id as any)}
          >
            <tab.icon size={16} color={activeTab === tab.id ? DEPT_COLOR : colors.secondaryText} />
            <Text style={[styles.tabText, { color: activeTab === tab.id ? DEPT_COLOR : colors.secondaryText }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'subagents' && renderSubAgents()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'settings' && (
          <View style={styles.tabContent}>
            <Text style={[styles.comingSoon, { color: colors.secondaryText }]}>Settings - Coming Soon</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 24 },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
  },
  backButton: { padding: 8 },
  headerActions: { flexDirection: 'row', gap: 12 },
  headerAction: { padding: 8 },
  headerContent: { alignItems: 'center', marginTop: 16 },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerName: { fontSize: 24, fontWeight: '700', color: '#fff' },
  headerTitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  headerMeta: { flexDirection: 'row', gap: 12, marginTop: 16 },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  metaText: { fontSize: 12, color: '#fff', fontWeight: '600' },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
  },
  tabText: { fontSize: 13, fontWeight: '600' },
  scrollContent: { padding: 16 },
  tabContent: { paddingBottom: 32 },
  statusCard: { borderRadius: 16, padding: 16, marginBottom: 16 },
  statusHeader: { flexDirection: 'row', alignItems: 'center' },
  statusIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusInfo: { flex: 1, marginLeft: 12 },
  statusTitle: { fontSize: 13, opacity: 0.7 },
  statusValue: { fontSize: 15, fontWeight: '700', marginTop: 2 },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricBox: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  metricValue: { fontSize: 28, fontWeight: '700' },
  metricLabel: { fontSize: 12, marginTop: 4 },
  section: { borderRadius: 16, padding: 16, marginBottom: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  subtitle: { fontSize: 14, marginBottom: 16 },
  capabilityRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
  capabilityText: { fontSize: 14, flex: 1 },
  decisionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128,128,128,0.1)',
  },
  decisionContent: { flex: 1 },
  decisionTitle: { fontSize: 14, fontWeight: '600' },
  decisionImpact: { fontSize: 12, marginTop: 2 },
  decisionDate: { fontSize: 12 },
  subAgentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  subAgentIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subAgentInfo: { flex: 1, marginLeft: 14 },
  subAgentName: { fontSize: 15, fontWeight: '700' },
  subAgentRole: { fontSize: 12, marginTop: 2 },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  statusText: { fontSize: 11, fontWeight: '600' },
  chartCard: { borderRadius: 16, padding: 16, marginBottom: 16 },
  chartHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  chartTitle: { fontSize: 16, fontWeight: '700' },
  chartPlaceholder: {
    height: 200,
    backgroundColor: 'rgba(128,128,128,0.05)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartPlaceholderText: { fontSize: 16, fontWeight: '600' },
  chartPlaceholderSubtext: { fontSize: 12, marginTop: 8 },
  analyticsGrid: { borderRadius: 16, padding: 16 },
  analyticsTitle: { fontSize: 16, fontWeight: '700', marginBottom: 16 },
  kpiRow: { flexDirection: 'row', gap: 24 },
  kpiItem: { flex: 1, alignItems: 'center' },
  kpiValue: { fontSize: 32, fontWeight: '700' },
  kpiLabel: { fontSize: 12, marginTop: 4 },
  comingSoon: { fontSize: 16, textAlign: 'center', marginTop: 40 },
});
