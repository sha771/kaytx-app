import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { BarChart3, TrendingUp, Clock, Target, Users, Activity, Zap, Award, Calendar, ChevronDown, Filter, Download, Share2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const { width } = Dimensions.get('window');

const TIME_RANGES = [
  { id: '24h', label: '24H' },
  { id: '7d', label: '7D' },
  { id: '30d', label: '30D' },
  { id: '90d', label: '90D' },
  { id: '1y', label: '1Y' },
];

const ANALYTICS_METRICS = [
  { id: 'tasks', name: 'Tasks Completed', value: '12,450', change: '+23%', positive: true, icon: Target, color: '#3B82F6' },
  { id: 'efficiency', name: 'Efficiency Rate', value: '94.2%', change: '+5%', positive: true, icon: Zap, color: '#10B981' },
  { id: 'uptime', name: 'Uptime', value: '99.98%', change: '+0.02%', positive: true, icon: Activity, color: '#F59E0B' },
  { id: 'response', name: 'Avg Response', value: '1.2s', change: '-15%', positive: true, icon: Clock, color: '#8B5CF6' },
];

const PERFORMANCE_DATA = [
  { day: 'Mon', value: 85 },
  { day: 'Tue', value: 92 },
  { day: 'Wed', value: 78 },
  { day: 'Thu', value: 95 },
  { day: 'Fri', value: 88 },
  { day: 'Sat', value: 72 },
  { day: 'Sun', value: 68 },
];

const TOP_AGENTS = [
  { id: 1, name: 'Sales Rep Pro', tasks: 1450, efficiency: 98, rank: 1 },
  { id: 2, name: 'Marketing AI', tasks: 1320, efficiency: 96, rank: 2 },
  { id: 3, name: 'Support Agent', tasks: 1280, efficiency: 95, rank: 3 },
  { id: 4, name: 'Data Analyst', tasks: 1150, efficiency: 94, rank: 4 },
  { id: 5, name: 'Content Writer', tasks: 980, efficiency: 92, rank: 5 },
];

const INSIGHT_CARDS = [
  { id: 1, type: 'improvement', title: 'Response Time Improved', description: 'Average response time decreased by 15% this week', icon: TrendingUp, color: '#10B981' },
  { id: 2, type: 'alert', title: 'High Load Detected', description: 'Sales agents experiencing 40% higher load than usual', icon: Activity, color: '#F59E0B' },
  { id: 3, type: 'achievement', title: 'New Milestone', description: 'Team completed 10,000 tasks this month', icon: Award, color: '#3B82F6' },
];

export default function AgentAnalyticsPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedRange, setSelectedRange] = useState('7d');

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Agent Analytics</Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Performance insights and metrics
            </Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionBtn}>
              <Share2 size={20} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Download size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Time Range Selector */}
        <View style={styles.timeSelector}>
          {TIME_RANGES.map((range) => (
            <TouchableOpacity
              key={range.id}
              onPress={() => setSelectedRange(range.id)}
              style={[
                styles.timeChip,
                { backgroundColor: selectedRange === range.id ? '#3B82F6' : theme.colors.card || '#F2F2F7' }
              ]}
            >
              <Text style={[styles.timeText, { color: selectedRange === range.id ? '#fff' : theme.colors.text }]}>
                {range.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Key Metrics */}
      <View style={styles.metricsContainer}>
        {ANALYTICS_METRICS.map((metric) => (
          <View key={metric.id} style={[styles.metricCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <View style={[styles.metricIcon, { backgroundColor: metric.color + '20' }]}>
              <metric.icon size={22} color={metric.color} />
            </View>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text>
            <Text style={[styles.metricName, { color: theme.colors.textSecondary }]}>{metric.name}</Text>
            <View style={[styles.changeBadge, { backgroundColor: metric.positive ? '#10B98120' : '#EF444420' }]}>
              <Text style={[styles.changeText, { color: metric.positive ? '#10B981' : '#EF4444' }]}>
                {metric.change}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Performance Chart */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Trend</Text>
          <TouchableOpacity style={styles.filterBtn}>
            <Filter size={16} color={theme.colors.textSecondary} />
            <Text style={[styles.filterText, { color: theme.colors.textSecondary }]}>Filter</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.chartContainer}>
          {PERFORMANCE_DATA.map((item, index) => (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barWrapper}>
                <View style={[styles.bar, { height: `${item.value}%`, backgroundColor: '#3B82F6' }]} />
              </View>
              <Text style={[styles.barLabel, { color: theme.colors.textSecondary }]}>{item.day}</Text>
            </View>
          ))}
        </View>
        <View style={styles.chartLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
            <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>Task Completion</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>Efficiency</Text>
          </View>
        </View>
      </View>

      {/* Top Performers */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top Performers</Text>
        <View style={styles.performersList}>
          {TOP_AGENTS.map((agent, index) => (
            <TouchableOpacity key={agent.id} style={styles.performerItem}>
              <View style={[styles.rankBadge, { backgroundColor: index < 3 ? '#FFD70030' : theme.colors.background }]}>
                <Text style={[styles.rankText, { color: index < 3 ? '#FFD700' : theme.colors.textSecondary }]}>
                  #{agent.rank}
                </Text>
              </View>
              <View style={styles.performerInfo}>
                <Text style={[styles.performerName, { color: theme.colors.text }]}>{agent.name}</Text>
                <Text style={[styles.performerStats, { color: theme.colors.textSecondary }]}>
                  {agent.tasks} tasks • {agent.efficiency}% efficiency
                </Text>
              </View>
              <View style={[styles.efficiencyBadge, { backgroundColor: '#10B98120' }]}>
                <Text style={[styles.efficiencyText, { color: '#10B981' }]}>{agent.efficiency}%</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Insights */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text>
        {INSIGHT_CARDS.map((insight) => (
          <View key={insight.id} style={[styles.insightCard, { backgroundColor: insight.color + '10' }]}>
            <View style={[styles.insightIcon, { backgroundColor: insight.color + '20' }]}>
              <insight.icon size={22} color={insight.color} />
            </View>
            <View style={styles.insightContent}>
              <Text style={[styles.insightTitle, { color: theme.colors.text }]}>{insight.title}</Text>
              <Text style={[styles.insightDesc, { color: theme.colors.textSecondary }]}>{insight.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Department Breakdown */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Department Breakdown</Text>
        <View style={styles.deptList}>
          {[
            { name: 'Sales', value: 35, color: '#E65100' },
            { name: 'Marketing', value: 28, color: '#F43F5E' },
            { name: 'Engineering', value: 42, color: '#3B82F6' },
            { name: 'Operations', value: 25, color: '#8B5CF6' },
            { name: 'Customer', value: 18, color: '#007AFF' },
          ].map((dept) => (
            <View key={dept.name} style={styles.deptItem}>
              <Text style={[styles.deptName, { color: theme.colors.text }]}>{dept.name}</Text>
              <View style={styles.deptBar}>
                <View style={[styles.deptFill, { width: `${dept.value}%`, backgroundColor: dept.color }]} />
              </View>
              <Text style={[styles.deptValue, { color: theme.colors.textSecondary }]}>{dept.value}%</Text>
            </View>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="agent-analytics" agentName="Agent Analytics" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, borderBottomWidth: 1 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  headerActions: { flexDirection: 'row', gap: 8 },
  actionBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000010' },
  timeSelector: { flexDirection: 'row', gap: 8 },
  timeChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  timeText: { fontSize: 13, fontWeight: '600' },
  metricsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 16 },
  metricIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  metricValue: { fontSize: 24, fontWeight: 'bold' },
  metricName: { fontSize: 12, marginTop: 4 },
  changeBadge: { alignSelf: 'flex-start', marginTop: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  changeText: { fontSize: 12, fontWeight: '600' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  filterBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  filterText: { fontSize: 13 },
  chartContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 150, paddingBottom: 20 },
  barContainer: { flex: 1, alignItems: 'center' },
  barWrapper: { width: 24, height: 120, backgroundColor: '#E5E5EA', borderRadius: 12, justifyContent: 'flex-end', overflow: 'hidden' },
  bar: { width: '100%', borderRadius: 12 },
  barLabel: { fontSize: 11, marginTop: 8 },
  chartLegend: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12 },
  performersList: { gap: 2 },
  performerItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E5EA30' },
  rankBadge: { width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  rankText: { fontSize: 13, fontWeight: '700' },
  performerInfo: { flex: 1, marginLeft: 12 },
  performerName: { fontSize: 15, fontWeight: '500' },
  performerStats: { fontSize: 12, marginTop: 2 },
  efficiencyBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  efficiencyText: { fontSize: 12, fontWeight: '600' },
  insightCard: { flexDirection: 'row', padding: 14, borderRadius: 12, marginBottom: 10 },
  insightIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  insightContent: { flex: 1 },
  insightTitle: { fontSize: 15, fontWeight: '600' },
  insightDesc: { fontSize: 12, marginTop: 2, lineHeight: 18 },
  deptList: { gap: 12 },
  deptItem: { flexDirection: 'row', alignItems: 'center' },
  deptName: { width: 90, fontSize: 14 },
  deptBar: { flex: 1, height: 8, backgroundColor: '#E5E5EA', borderRadius: 4 },
  deptFill: { height: '100%', borderRadius: 4 },
  deptValue: { width: 40, fontSize: 13, textAlign: 'right' },
});
