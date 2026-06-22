import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { 
  TrendingUp, Activity, Users, Zap, Clock, CheckCircle, 
  AlertCircle, DollarSign, Target, BarChart3, PieChart, 
  Calendar, Filter, Download, RefreshCw, ArrowUpRight, ArrowDownRight
} from 'lucide-react-native';

export default function AnalyticsDashboardPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('performance');

  const TIME_RANGES = [
    { id: '24h', label: '24H' },
    { id: '7d', label: '7D' },
    { id: '30d', label: '30D' },
    { id: '90d', label: '90D' },
  ];

  const OVERALL_METRICS = [
    { 
      label: 'Total Agent Tasks', 
      value: '1.2M', 
      change: '+12.5%', 
      trend: 'up', 
      icon: Activity, 
      color: '#3B82F6' 
    },
    { 
      label: 'Avg Response Time', 
      value: '1.2s', 
      change: '-18.3%', 
      trend: 'down', 
      icon: Clock, 
      color: '#10B981' 
    },
    { 
      label: 'Success Rate', 
      value: '98.2%', 
      change: '+2.1%', 
      trend: 'up', 
      icon: CheckCircle, 
      color: '#8B5CF6' 
    },
    { 
      label: 'Cost Savings', 
      value: '$847K', 
      change: '+34.7%', 
      trend: 'up', 
      icon: DollarSign, 
      color: '#F59E0B' 
    },
  ];

  const AGENT_PERFORMANCE = [
    { 
      agent: 'Customer Support Agent', 
      tasks: 45230, 
      successRate: 98.5, 
      avgResponse: 0.8, 
      satisfaction: 4.8,
      trend: '+15.2%'
    },
    { 
      agent: 'Sales Agent', 
      tasks: 23450, 
      successRate: 94.2, 
      avgResponse: 1.5, 
      satisfaction: 4.6,
      trend: '+8.7%'
    },
    { 
      agent: 'Data Analytics Agent', 
      tasks: 12890, 
      successRate: 99.1, 
      avgResponse: 2.3, 
      satisfaction: 4.9,
      trend: '+22.4%'
    },
    { 
      agent: 'Security Agent', 
      tasks: 8750, 
      successRate: 99.8, 
      avgResponse: 0.3, 
      satisfaction: 4.7,
      trend: '+5.3%'
    },
  ];

  const DEPARTMENT_METRICS = [
    { department: 'Customer Experience', activeAgents: 45, tasksCompleted: 234500, efficiency: 92.3, costSavings: '$234K' },
    { department: 'Sales & Revenue', activeAgents: 32, tasksCompleted: 156700, efficiency: 88.7, costSavings: '$189K' },
    { department: 'Technology', activeAgents: 28, tasksCompleted: 189200, efficiency: 95.1, costSavings: '$312K' },
    { department: 'Operations', activeAgents: 38, tasksCompleted: 298400, efficiency: 91.8, costSavings: '$276K' },
  ];

  const ACTIVITY_GRAPH = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [1250, 1420, 1380, 1650, 1520, 980, 890]
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#8B5CF620' }]}>
          <BarChart3 size={56} color="#8B5CF6" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Analytics Dashboard</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Comprehensive AI agents performance metrics and insights
        </Text>
        <View style={styles.heroActions}>
          <TouchableOpacity 
            style={[styles.heroActionButton, { backgroundColor: '#8B5CF6' }]}
          >
            <RefreshCw size={20} color="white" />
            <Text style={styles.heroActionText}>Refresh</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.heroActionButton, { backgroundColor: '#10B981' }]}
          >
            <Download size={20} color="white" />
            <Text style={styles.heroActionText}>Export</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Time Range Selector */}
      <View style={[styles.timeRangeContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={styles.timeRangeLabel}>
          <Calendar size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.timeRangeText, { color: theme.colors.textSecondary }]}>Time Range:</Text>
        </View>
        <View style={styles.timeRangeOptions}>
          {TIME_RANGES.map((range) => (
            <TouchableOpacity
              key={range.id}
              onPress={() => setTimeRange(range.id)}
              style={[
                styles.timeRangeOption,
                { 
                  backgroundColor: timeRange === range.id ? '#8B5CF6' : 'transparent',
                  borderColor: timeRange === range.id ? '#8B5CF6' : '#E5E5EA'
                }
              ]}
            >
              <Text style={[
                styles.timeRangeOptionText,
                { color: timeRange === range.id ? 'white' : theme.colors.text }
              ]}>
                {range.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Overall Metrics */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overall Performance</Text>
        <View style={styles.metricsGrid}>
          {OVERALL_METRICS.map((metric) => (
            <View key={metric.label} style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <View style={[styles.metricIcon, { backgroundColor: metric.color + '20' }]}>
                <metric.icon size={24} color={metric.color} />
              </View>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{metric.label}</Text>
              <View style={[
                styles.metricTrend, 
                { backgroundColor: metric.trend === 'up' ? '#10B98120' : '#EF444420' }
              ]}>
                {metric.trend === 'up' ? <ArrowUpRight size={12} color="#10B981" /> : <ArrowDownRight size={12} color="#EF4444" />}
                <Text style={[
                  styles.metricTrendText,
                  { color: metric.trend === 'up' ? '#10B981' : '#EF4444' }
                ]}>
                  {metric.change}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Activity Graph */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Agent Activity</Text>
        <View style={[styles.graphContainer, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={styles.graphBars}>
            {ACTIVITY_GRAPH.data.map((value, index) => {
              const maxValue = Math.max(...ACTIVITY_GRAPH.data);
              const height = (value / maxValue) * 100;
              return (
                <View key={index} style={styles.graphBar}>
                  <View style={[
                    styles.graphBarFill, 
                    { 
                      height: `${height}%`,
                      backgroundColor: '#8B5CF6'
                    }
                  ]} />
                  <Text style={[styles.graphBarLabel, { color: theme.colors.textSecondary }]}>{ACTIVITY_GRAPH.labels[index]}</Text>
                  <Text style={[styles.graphBarValue, { color: theme.colors.text }]}>{value}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {/* Agent Performance */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Agent Performance</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          Top performing agents by task completion and efficiency
        </Text>
        {AGENT_PERFORMANCE.map((agent) => (
          <View key={agent.agent} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={styles.agentHeader}>
              <View style={styles.agentInfo}>
                <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.agent}</Text>
                <View style={styles.agentMeta}>
                  <Text style={[styles.agentMetaText, { color: theme.colors.textSecondary }]}>
                    {agent.tasks.toLocaleString()} tasks
                  </Text>
                  <Text style={[styles.agentMetaDivider, { color: theme.colors.textSecondary }]}>•</Text>
                  <Text style={[styles.agentMetaText, { color: theme.colors.textSecondary }]}>
                    {agent.avgResponse}s avg
                  </Text>
                </View>
              </View>
              <View style={[
                styles.trendBadge, 
                { backgroundColor: '#10B98120' }
              ]}>
                <ArrowUpRight size={14} color="#10B981" />
                <Text style={[styles.trendText, { color: '#10B981' }]}>{agent.trend}</Text>
              </View>
            </View>
            <View style={styles.agentMetrics}>
              <View style={styles.agentMetric}>
                <Text style={[styles.agentMetricValue, { color: '#10B981' }]}>{agent.successRate}%</Text>
                <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Success Rate</Text>
              </View>
              <View style={styles.agentMetric}>
                <Text style={[styles.agentMetricValue, { color: '#8B5CF6' }]}>{agent.satisfaction}/5</Text>
                <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Satisfaction</Text>
              </View>
              <View style={styles.agentMetric}>
                <Text style={[styles.agentMetricValue, { color: '#F59E0B' }]}>{agent.tasks.toLocaleString()}</Text>
                <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Tasks</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Department Metrics */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Department Performance</Text>
        {DEPARTMENT_METRICS.map((dept) => (
          <View key={dept.department} style={[styles.deptCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <Text style={[styles.deptName, { color: theme.colors.text }]}>{dept.department}</Text>
            <View style={styles.deptMetrics}>
              <View style={styles.deptMetric}>
                <Users size={16} color={theme.colors.textSecondary} />
                <Text style={[styles.deptMetricValue, { color: theme.colors.text }]}>{dept.activeAgents}</Text>
                <Text style={[styles.deptMetricLabel, { color: theme.colors.textSecondary }]}>Agents</Text>
              </View>
              <View style={styles.deptMetric}>
                <Activity size={16} color={theme.colors.textSecondary} />
                <Text style={[styles.deptMetricValue, { color: theme.colors.text }]}>{(dept.tasksCompleted / 1000).toFixed(0)}K</Text>
                <Text style={[styles.deptMetricLabel, { color: theme.colors.textSecondary }]}>Tasks</Text>
              </View>
              <View style={styles.deptMetric}>
                <TrendingUp size={16} color={theme.colors.textSecondary} />
                <Text style={[styles.deptMetricValue, { color: theme.colors.text }]}>{dept.efficiency}%</Text>
                <Text style={[styles.deptMetricLabel, { color: theme.colors.textSecondary }]}>Efficiency</Text>
              </View>
              <View style={styles.deptMetric}>
                <DollarSign size={16} color={theme.colors.textSecondary} />
                <Text style={[styles.deptMetricValue, { color: '#10B981' }]}>{dept.costSavings}</Text>
                <Text style={[styles.deptMetricLabel, { color: theme.colors.textSecondary }]}>Savings</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/ai-agents-employees')}
            style={[styles.actionButton, { backgroundColor: '#8B5CF615' }]}
          >
            <Users size={28} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>View Agents</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/workflow-automation')}
            style={[styles.actionButton, { backgroundColor: '#10B98115' }]}
          >
            <Zap size={28} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>Workflows</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/hierarchy')}
            style={[styles.actionButton, { backgroundColor: '#F59E0B15' }]}
          >
            <Target size={28} color="#F59E0B" />
            <Text style={[styles.actionText, { color: '#F59E0B' }]}>Hierarchy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    padding: 24,
    borderBottomWidth: 1,
  },
  heroIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 12,
  },
  heroActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  heroActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  timeRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 8,
  },
  timeRangeLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeRangeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  timeRangeOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  timeRangeOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  timeRangeOptionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    padding: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: 150,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  metricLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  metricTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  graphContainer: {
    padding: 20,
    borderRadius: 12,
  },
  graphBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
  },
  graphBar: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  graphBarFill: {
    width: 30,
    borderRadius: 8,
  },
  graphBarLabel: {
    fontSize: 12,
  },
  graphBarValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  agentCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  agentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  agentMetaText: {
    fontSize: 12,
  },
  agentMetaDivider: {
    fontSize: 12,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  agentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  agentMetric: {
    alignItems: 'center',
  },
  agentMetricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  agentMetricLabel: {
    fontSize: 11,
  },
  deptCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  deptName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  deptMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deptMetric: {
    alignItems: 'center',
    gap: 4,
  },
  deptMetricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  deptMetricLabel: {
    fontSize: 11,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: 140,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});