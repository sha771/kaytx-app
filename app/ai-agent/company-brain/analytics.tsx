import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, useSafeAreaInsets } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, BarChart3, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Users, FileText, Search, Clock, Target, Activity, PieChart, LineChart, Bot, Download, RefreshCw, Filter } from 'lucide-react-native';

export default function CompanyBrainAnalyticsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const HEALTH_METRICS = [
    { label: 'Knowledge Coverage', value: '87%', trend: '+5%', status: 'good', icon: FileText },
    { label: 'Freshness Score', value: '92%', trend: '+3%', status: 'good', icon: Clock },
    { label: 'Search Success', value: '94%', trend: '+2%', status: 'good', icon: Search },
    { label: 'At-Risk Knowledge', value: '12', trend: '-3', status: 'warning', icon: AlertTriangle },
  ];

  const USAGE_STATS = [
    { label: 'Daily Searches', value: '892', change: '+12%', up: true },
    { label: 'Active Users', value: '156', change: '+8%', up: true },
    { label: 'Avg Query Time', value: '1.2s', change: '-15%', up: true },
    { label: 'Knowledge Added', value: '234', change: '+23%', up: true },
  ];

  const TOP_TOPICS = [
    { topic: 'AWS Migration', searches: 1234, department: 'Engineering', trend: 'up' },
    { topic: 'Q4 Product Launch', searches: 987, department: 'Product', trend: 'up' },
    { topic: 'Security Compliance', searches: 756, department: 'Security', trend: 'stable' },
    { topic: 'Client Onboarding', searches: 654, department: 'Sales', trend: 'up' },
    { topic: 'Refund Policy', searches: 543, department: 'Operations', trend: 'down' },
  ];

  const DEPARTMENT_COVERAGE = [
    { dept: 'Engineering', coverage: 94, experts: 23, nodes: 456 },
    { dept: 'Sales', coverage: 88, experts: 15, nodes: 234 },
    { dept: 'Product', coverage: 85, experts: 12, nodes: 189 },
    { dept: 'Marketing', coverage: 78, experts: 8, nodes: 145 },
    { dept: 'Operations', coverage: 72, experts: 6, nodes: 123 },
    { dept: 'HR', coverage: 68, experts: 5, nodes: 98 },
  ];

  const KNOWLEDGE_GAPS = [
    { area: 'Security Protocols', department: 'IT', priority: 'high', missing: 12 },
    { area: 'Pricing Strategy', department: 'Sales', priority: 'high', missing: 8 },
    { area: 'API Documentation', department: 'Engineering', priority: 'medium', missing: 15 },
    { area: 'Customer Success Playbook', department: 'CS', priority: 'medium', missing: 6 },
  ];

  const RISK_ALERTS = [
    { type: 'Single Point of Failure', knowledge: 'AWS Architecture', holder: 'Sarah Chen', risk: 'high' },
    { type: 'Departure Risk', knowledge: 'Legal Contracts', holder: 'James Wilson', risk: 'high' },
    { type: 'Outdated Content', knowledge: 'Q3 Sales Playbook', age: '90 days', risk: 'medium' },
    { type: 'Coverage Gap', knowledge: 'Mobile App Specs', department: 'Product', risk: 'low' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Analytics & Insights</Text>
          <Text style={styles.headerSubtitle}>Knowledge health metrics and usage analytics</Text>
        </View>
        <TouchableOpacity style={styles.headerAction}>
          <Download size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Knowledge Health Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Knowledge Health</Text>
          <View style={styles.healthGrid}>
            {HEALTH_METRICS.map((metric, index) => (
              <View key={index} style={[styles.healthCard, { backgroundColor: '#1E293B' }]}>
                <View style={[styles.healthIcon, { backgroundColor: metric.status === 'good' ? '#10B98120' : '#F59E0B20' }]}>
                  <metric.icon size={20} color={metric.status === 'good' ? '#10B981' : '#F59E0B'} />
                </View>
                <Text style={styles.healthValue}>{metric.value}</Text>
                <Text style={styles.healthLabel}>{metric.label}</Text>
                <View style={styles.healthTrend}>
                  {metric.trend.startsWith('+') ? (
                    <TrendingUp size={12} color="#10B981" />
                  ) : metric.trend.startsWith('-') ? (
                    <TrendingDown size={12} color={metric.status === 'warning' ? '#EF4444' : '#10B981'} />
                  ) : null}
                  <Text style={[styles.healthTrendText, { color: metric.trend.startsWith('+') ? '#10B981' : metric.trend.startsWith('-') && metric.status === 'warning' ? '#EF4444' : '#9CA3AF' }]}>
                    {metric.trend}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Usage Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Usage Analytics</Text>
          <View style={styles.usageRow}>
            {USAGE_STATS.map((stat, index) => (
              <View key={index} style={[styles.usageCard, { backgroundColor: '#1E293B' }]}>
                <Text style={styles.usageValue}>{stat.value}</Text>
                <Text style={styles.usageLabel}>{stat.label}</Text>
                <View style={styles.usageChange}>
                  {stat.up ? (
                    <TrendingUp size={12} color="#10B981" />
                  ) : (
                    <TrendingDown size={12} color="#EF4444" />
                  )}
                  <Text style={[styles.usageChangeText, { color: stat.up ? '#10B981' : '#EF4444' }]}>
                    {stat.change}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Top Search Topics */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Searched Topics</Text>
            <TouchableOpacity>
              <Filter size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>
          {TOP_TOPICS.map((item, index) => (
            <View key={index} style={[styles.topicCard, { backgroundColor: '#1E293B' }]}>
              <View style={styles.topicRank}>
                <Text style={styles.topicRankText}>{index + 1}</Text>
              </View>
              <View style={styles.topicInfo}>
                <Text style={styles.topicName}>{item.topic}</Text>
                <Text style={styles.topicDept}>{item.department}</Text>
              </View>
              <View style={styles.topicStats}>
                <Text style={styles.topicSearches}>{item.searches.toLocaleString()}</Text>
                <Text style={styles.topicSearchLabel}>searches</Text>
              </View>
              <View style={[styles.topicTrend, { backgroundColor: item.trend === 'up' ? '#10B98120' : item.trend === 'down' ? '#EF444420' : '#6B728020' }]}>
                {item.trend === 'up' ? (
                  <TrendingUp size={14} color="#10B981" />
                ) : item.trend === 'down' ? (
                  <TrendingDown size={14} color="#EF4444" />
                ) : (
                  <Activity size={14} color="#6B7280" />
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Department Coverage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Department Knowledge Coverage</Text>
          {DEPARTMENT_COVERAGE.map((dept, index) => (
            <View key={index} style={[styles.deptCard, { backgroundColor: '#1E293B' }]}>
              <View style={styles.deptHeader}>
                <Text style={styles.deptName}>{dept.dept}</Text>
                <Text style={styles.deptCoverage}>{dept.coverage}%</Text>
              </View>
              <View style={styles.deptBar}>
                <View style={[styles.deptBarFill, { width: `${dept.coverage}%`, backgroundColor: dept.coverage >= 80 ? '#10B981' : dept.coverage >= 60 ? '#F59E0B' : '#EF4444' }]} />
              </View>
              <View style={styles.deptMeta}>
                <View style={styles.deptMetaItem}>
                  <Users size={12} color="#6B7280" />
                  <Text style={styles.deptMetaText}>{dept.experts} experts</Text>
                </View>
                <View style={styles.deptMetaItem}>
                  <FileText size={12} color="#6B7280" />
                  <Text style={styles.deptMetaText}>{dept.nodes} nodes</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Knowledge Gaps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Knowledge Gaps</Text>
          {KNOWLEDGE_GAPS.map((gap, index) => (
            <View key={index} style={[styles.gapCard, { backgroundColor: '#1E293B' }]}>
              <View style={styles.gapHeader}>
                <Text style={styles.gapArea}>{gap.area}</Text>
                <View style={[styles.gapPriority, { backgroundColor: gap.priority === 'high' ? '#EF444420' : '#F59E0B20' }]}>
                  <Text style={[styles.gapPriorityText, { color: gap.priority === 'high' ? '#EF4444' : '#F59E0B' }]}>
                    {gap.priority}
                  </Text>
                </View>
              </View>
              <View style={styles.gapDetails}>
                <Text style={styles.gapDept}>{gap.department}</Text>
                <Text style={styles.gapMissing}>{gap.missing} items missing</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Risk Alerts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Risk Alerts</Text>
          {RISK_ALERTS.map((alert, index) => (
            <View key={index} style={[styles.riskCard, { backgroundColor: '#1E293B' }]}>
              <View style={[styles.riskIcon, { backgroundColor: alert.risk === 'high' ? '#EF444420' : alert.risk === 'medium' ? '#F59E0B20' : '#10B98120' }]}>
                <AlertTriangle size={18} color={alert.risk === 'high' ? '#EF4444' : alert.risk === 'medium' ? '#F59E0B' : '#10B981'} />
              </View>
              <View style={styles.riskInfo}>
                <Text style={styles.riskType}>{alert.type}</Text>
                <Text style={styles.riskKnowledge}>{alert.knowledge}</Text>
                <Text style={styles.riskDetail}>
                  {alert.holder ? `Owner: ${alert.holder}` : alert.age ? `Age: ${alert.age}` : `Dept: ${alert.department}`}
                </Text>
              </View>
              <View style={[styles.riskBadge, { backgroundColor: alert.risk === 'high' ? '#EF444420' : alert.risk === 'medium' ? '#F59E0B20' : '#10B98120' }]}>
                <Text style={[styles.riskBadgeText, { color: alert.risk === 'high' ? '#EF4444' : alert.risk === 'medium' ? '#F59E0B' : '#10B981' }]}>
                  {alert.risk}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Analytics AI Agents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Analytics AI Agents</Text>
          <View style={styles.agentsRow}>
            {[
              { name: 'Health Monitor', color: '#10B981' },
              { name: 'Usage Tracker', color: '#3B82F6' },
              { name: 'Gap Analyzer', color: '#F59E0B' },
              { name: 'Risk Detector', color: '#EF4444' },
              { name: 'Trend Predictor', color: '#7C3AED' },
              { name: 'Expert Finder', color: '#06B6D4' },
            ].map((agent, index) => (
              <View key={index} style={[styles.agentChip, { backgroundColor: agent.color + '20' }]}>
                <Bot size={14} color={agent.color} />
                <Text style={[styles.agentChipText, { color: agent.color }]}>{agent.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#1E293B' }]}>
              <RefreshCw size={18} color="#3B82F6" />
              <Text style={styles.actionText}>Refresh Analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#1E293B' }]}>
              <Download size={18} color="#10B981" />
              <Text style={styles.actionText}>Export Report</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = {
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#0F172A', gap: 12 },
  backButton: { padding: 4 },
  headerTitle: { flex: 1 },
  headerTitleText: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 13, color: '#9CA3AF' },
  headerAction: { padding: 4 },
  content: { flex: 1, paddingHorizontal: 16 },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#FFFFFF', marginBottom: 12 },
  healthGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  healthCard: { width: '48%', padding: 14, borderRadius: 12 },
  healthIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  healthValue: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF' },
  healthLabel: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  healthTrend: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  healthTrendText: { fontSize: 12, fontWeight: '500' },
  usageRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  usageCard: { width: '48%', padding: 14, borderRadius: 12 },
  usageValue: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF' },
  usageLabel: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  usageChange: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  usageChangeText: { fontSize: 12, fontWeight: '600' },
  topicCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 10, marginBottom: 8 },
  topicRank: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#374151', justifyContent: 'center', alignItems: 'center' },
  topicRankText: { fontSize: 12, fontWeight: 'bold', color: '#FFFFFF' },
  topicInfo: { flex: 1, marginLeft: 12 },
  topicName: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  topicDept: { fontSize: 12, color: '#9CA3AF' },
  topicStats: { alignItems: 'flex-end', marginRight: 8 },
  topicSearches: { fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' },
  topicSearchLabel: { fontSize: 10, color: '#6B7280' },
  topicTrend: { width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  deptCard: { padding: 14, borderRadius: 12, marginBottom: 8 },
  deptHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  deptName: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  deptCoverage: { fontSize: 14, fontWeight: 'bold', color: '#10B981' },
  deptBar: { height: 6, backgroundColor: '#374151', borderRadius: 3, marginBottom: 8 },
  deptBarFill: { height: '100%', borderRadius: 3 },
  deptMeta: { flexDirection: 'row', gap: 16 },
  deptMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  deptMetaText: { fontSize: 11, color: '#6B7280' },
  gapCard: { padding: 14, borderRadius: 12, marginBottom: 8 },
  gapHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  gapArea: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  gapPriority: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8 },
  gapPriorityText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  gapDetails: { flexDirection: 'row', justifyContent: 'space-between' },
  gapDept: { fontSize: 12, color: '#9CA3AF' },
  gapMissing: { fontSize: 12, color: '#EF4444' },
  riskCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 8 },
  riskIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  riskInfo: { flex: 1, marginLeft: 12 },
  riskType: { fontSize: 12, color: '#6B7280' },
  riskKnowledge: { fontSize: 14, fontWeight: '600', color: '#FFFFFF', marginTop: 2 },
  riskDetail: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  riskBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  riskBadgeText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  agentsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  agentChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, gap: 6 },
  agentChipText: { fontSize: 12, fontWeight: '500' },
  actionsRow: { flexDirection: 'row', gap: 8 },
  actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12, gap: 8 },
  actionText: { fontSize: 13, color: '#FFFFFF', fontWeight: '500' }
};