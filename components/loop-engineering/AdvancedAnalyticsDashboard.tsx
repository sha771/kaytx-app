/**
 * Advanced Analytics Dashboard for Loop Engineering
 * Comprehensive monitoring and analytics for loop performance
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Zap,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Layers,
  Network,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  Users,
  Cpu,
  DollarSign,
  Award,
  Flame,
} from 'lucide-react-native';

interface LoopAnalyticsData {
  loopId: string;
  loopName: string;
  timeRange: { start: Date; end: Date };
  
  // Performance metrics
  performance: {
    totalExecutions: number;
    successfulExecutions: number;
    failedExecutions: number;
    averageDuration: number;
    successRate: number;
    averageIterations: number;
  };
  
  // Resource usage
  resources: {
    averageCpuUsage: number;
    averageMemoryUsage: number;
    totalApiCalls: number;
    estimatedCost: number;
  };
  
  // Agent utilization
  agentUtilization: Array<{
    agentId: string;
    agentName: string;
    executionCount: number;
    averageTime: number;
    successRate: number;
  }>;
  
  // Trends
  trends: Array<{
    timestamp: Date;
    metric: string;
    value: number;
  }>;
  
  // Errors
  errors: Array<{
    nodeId: string;
    error: string;
    count: number;
    lastOccurrence: Date;
  }>;
  
  // Goals
  goalProgress: Array<{
    goalId: string;
    goalName: string;
    target: number;
    current: number;
    achieved: boolean;
  }>;
}

interface AdvancedAnalyticsDashboardProps {
  data: LoopAnalyticsData;
  onRefresh?: () => void;
  onExport?: () => void;
  onFilterChange?: (filter: string) => void;
}

export const AdvancedAnalyticsDashboard: React.FC<AdvancedAnalyticsDashboardProps> = ({
  data,
  onRefresh,
  onExport,
  onFilterChange,
}) => {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'performance' | 'resources' | 'agents' | 'trends' | 'errors'>('overview');
  const [timeFilter, setTimeFilter] = useState<'1h' | '24h' | '7d' | '30d'>('24h');

  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      {/* Key Metrics */}
      <View style={styles.metricsGrid}>
        <MetricCard
          icon={Activity}
          label="Total Executions"
          value={data.performance.totalExecutions}
          change={12}
          theme={theme}
        />
        <MetricCard
          icon={CheckCircle}
          label="Success Rate"
          value={`${(data.performance.successRate * 100).toFixed(1)}%`}
          change={5.2}
          theme={theme}
        />
        <MetricCard
          icon={Clock}
          label="Avg Duration"
          value={`${Math.round(data.performance.averageDuration / 1000)}s`}
          change={-8.5}
          theme={theme}
        />
        <MetricCard
          icon={RefreshCw}
          label="Avg Iterations"
          value={data.performance.averageIterations.toFixed(1)}
          change={-3.2}
          theme={theme}
        />
      </View>

      {/* Goal Progress */}
      <View style={[styles.section, { backgroundColor: theme.languages.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <Target size={20} color={theme.colors.primary} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Goal Progress</Text>
        </View>
        {data.goalProgress.map(goal => (
          <View key={goal.goalId} style={styles.goalItem}>
            <View style={styles.goalHeader}>
              <Text style={[styles.goalName, { color: theme.colors.text }]}>{goal.goalName}</Text>
              <Text style={[
                styles.goalStatus,
                { color: goal.achieved ? '#10B981' : '#F59E0B' }
              ]}>
                {goal.achieved ? 'Achieved' : 'In Progress'}
              </Text>
            </View>
            <View style={[styles.goalProgressBar, { backgroundColor: theme.colors.border }]}>
              <View
                style={[
                  styles.goalProgressFill,
                  {
                    width: `${Math.min((goal.current / goal.target) * 100, 100)}%`,
                    backgroundColor: goal.achieved ? '#10B981' : theme.colors.primary,
                  }
                ]}
              />
            </View>
            <Text style={[styles.goalValues, { color: theme.colors.secondaryText }]}>
              {goal.current.toFixed(1)} / {goal.target}
            </Text>
          </View>
        ))}
      </View>

      {/* Recent Errors */}
      {data.errors.length > 0 && (
        <View style={[styles.section, { backgroundColor: theme.languages.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={20} color="#EF4444" />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Errors</Text>
          </View>
          {data.errors.slice(0, 5).map((error, index) => (
            <View key={index} style={[styles.errorItem, { borderColor: theme.colors.border }]}>
              <XCircle size={16} color="#EF4444" />
              <View style={styles.errorContent}>
                <Text style={[styles.errorText, { color: theme.colors.text }]}>{error.error}</Text>
                <Text style={[styles.errorMeta, { color: theme.colors.secondaryText }]}>
                  {error.count} occurrences • {new Date(error.lastOccurrence).toLocaleString()}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderPerformanceTab = () => (
    <View style={styles.tabContent}>
      <View style={[styles.section, { backgroundColor: theme.languages.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <BarChart3 size={20} color={theme.colors.primary} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Metrics</Text>
        </View>
        
        <View style={styles.metricRow}>
          <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Total Executions</Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>{data.performance.totalExecutions}</Text>
        </View>
        
        <View style={styles.metricRow}>
          <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Successful</Text>
          <Text style={[styles.metricValue, { color: '#10B981' }]}>{data.performance.successfulExecutions}</Text>
        </View>
        
        <View style={styles.metricRow}>
          <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Failed</Text>
          <Text style={[styles.metricValue, { color: '#EF4444' }]}>{data.performance.failedExecutions}</Text>
        </View>
        
        <View style={styles.metricRow}>
          <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Average Duration</Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>{Math.round(data.performance.averageDuration / 1000)}s</Text>
        </View>
        
        <View style={styles.metricRow}>
          <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Success Rate</Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>{(data.performance.successRate * 100).toFixed(1)}%</Text>
        </View>
        
        <View style={styles.metricRow}>
          <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Average Iterations</Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>{data.performance.averageIterations.toFixed(1)}</Text>
        </View>
      </View>
    </View>
  );

  const renderResourcesTab = () => (
    <View style={styles.tabContent}>
      <View style={[styles.section, { backgroundColor: theme.languages.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <Cpu size={20} color={theme.colors.primary} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Resource Usage</Text>
        </View>
        
        <View style={styles.metricRow}>
          <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Average CPU</Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>{data.resources.averageCpuUsage.toFixed(1)}%</Text>
        </View>
        
        <View style={styles.metricRow}>
          <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Average Memory</Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>${(data.resources.averageMemoryUsage / 1024 / 1024).toFixed(1)}MB</Text>
        </View>
        
        <View style={styles.metricRow}>
          <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Total API Calls</Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>{data.resources.totalApiCalls}</Text>
        </View>
        
        <View style={styles.metricRow}>
          <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Estimated Cost</Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>${data.resources.estimatedCost.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  const renderAgentsTab = () => (
    <View style={styles.tabContent}>
      <View style={[styles.section, { backgroundColor: theme.languages.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <Users size={20} color={theme.colors.primary} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Agent Utilization</Text>
        </View>
        
        {data.agentUtilization.map(agent => (
          <View key={agent.agentId} style={[styles.agentItem, { borderColor: theme.colors.border }]}>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.agentName}</Text>
              <Text style={[styles.agentId, { color: theme.colors.secondaryText }]}>{agent.agentId}</Text>
            </View>
            <View style={styles.agentStats}>
              <Text style={[styles.agentStat, { color: theme.colors.text }]}>
                {agent.executionCount} executions
              </Text>
              <Text style={[styles.agentStat, { color: theme.colors.text }]}>
                {Math.round(agent.averageTime / 1000)}s avg
              </Text>
              <Text style={[
                styles.agentStat,
                { color: agent.successRate > 0.8 ? '#10B981' : agent.successRate > 0.5 ? '#F59E0B' : '#EF4444' }
              ]}>
                {(agent.successRate * 100).toFixed(1)}% success
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderTrendsTab = () => (
    <View style={styles.tabContent}>
      <View style={[styles.section, { backgroundColor: theme.languages.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <LineChart size={20} color={theme.colors.primary} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Trends</Text>
        </View>
        
        <View style={styles.trendChart}>
          {data.trends.slice(-10).map((trend, index) => (
            <View key={index} style={styles.trendItem}>
              <Text style={[styles.trendTime, { color: theme.colors.secondaryText }]}>
                {new Date(trend.timestamp).toLocaleTimeString()}
              </Text>
              <View style={[
                styles.trendBar,
                { 
                  backgroundColor: trend.value > 0.5 ? '#10B981' : '#F59E0B',
                  width: `${trend.value * 100}%`
                }
              ]} />
              <Text style={[styles.trendValue, { color: theme.colors.text }]}>
                {trend.value.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderErrorsTab = () => (
    <View style={styles.tabContent}>
      <View style={[styles.section, { backgroundColor: theme.languages.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <XCircle size={20} color="#EF4444" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Error Analysis</Text>
        </View>
        
        {data.errors.map((error, index) => (
          <View key={index} style={[styles.errorDetailItem, { borderColor: theme.colors.border }]}>
            <View style={styles.errorDetailHeader}>
              <XCircle size={16} color="#EF4444" />
              <Text style={[styles.errorDetailNode, { color: theme.colors.text }]}>
                {error.nodeId}
              </Text>
              <View style={[styles.errorCountBadge, { backgroundColor: '#EF4444' }]}>
                <Text style={styles.errorCountText}>{error.count}</Text>
              </View>
            </View>
            <Text style={[styles.errorDetailMessage, { color: theme.colors.text }]}>
              {error.error}
            </Text>
            <Text style={[styles.errorDetailTime, { color: theme.colors.secondaryText }]}>
              Last: {new Date(error.lastOccurrence).toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.languages.cardBackground, borderBottomColor: theme.colors.border }]}>
        <View>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>{data.loopName}</Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.secondaryText }]}>
            {data.timeRange.start.toLocaleDateString()} - {data.timeRange.end.toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: theme.colors.background }]} onPress={onRefresh}>
            <RefreshCw size={20} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: theme.colors.background }]} onPress={onExport}>
            <Download size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Time Filter */}
      <View style={[styles.timeFilter, { backgroundColor: theme.languages.cardBackground, borderBottomColor: theme.colors.border }]}>
        {(['1h', '24h', '7d', '30d'] as const).map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              timeFilter === filter && { backgroundColor: theme.colors.primary }
            ]}
            onPress={() => setTimeFilter(filter)}
          >
            <Text style={[
              styles.filterButtonText,
              { color: timeFilter === filter ? '#fff' : theme.colors.secondaryText }
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tabs */}
      <View style={[styles.tabs, { backgroundColor: theme.languages.cardBackground, borderBottomColor: theme.colors.border }]}>
        {[
          { id: 'overview', icon: BarChart3, label: 'Overview' },
          { id: 'performance', icon: Activity, label: 'Performance' },
          { id: 'resources', icon: Cpu, label: 'Resources' },
          { id: 'agents', icon: Users, label: 'Agents' },
          { id: 'trends', icon: LineChart, label: 'Trends' },
          { id: 'errors', icon: XCircle, label: 'Errors' },
        ].map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              selectedTab === tab.id && { borderBottomColor: theme.colors.primary }
            ]}
            onPress={() => setSelectedTab(tab.id as any)}
          >
            <tab.icon
              size={18}
              color={selectedTab === tab.id ? theme.colors.primary : theme.colors.secondaryText}
            />
            <Text style={[
              styles.tabText,
              { color: selectedTab === tab.id ? theme.colors.primary : theme.colors.secondaryText }
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {selectedTab === 'overview' && renderOverviewTab()}
        {selectedTab === 'performance' && renderPerformanceTab()}
        {selectedTab === 'resources' && renderResourcesTab()}
        {selectedTab === 'agents' && renderAgentsTab()}
        {selectedTab === 'trends' && renderTrendsTab()}
        {selectedTab === 'errors' && renderErrorsTab()}
      </ScrollView>
    </View>
  );
};

interface MetricCardProps {
  icon: any;
  label: string;
  value: string | number;
  change: number;
  theme: any;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, label, value, change, theme }) => (
  <View style={[styles.metricCard, { backgroundColor: theme.languages.cardBackground, borderColor: theme.colors.border }]}>
    <Icon size={24} color={theme.colors.primary} />
    <Text style={[styles.metricCardLabel, { color: theme.colors.secondaryText }]}>{label}</Text>
    <Text style={[styles.metricCardValue, { color: theme.colors.text }]}>{value}</Text>
    <View style={styles.metricCardChange}>
      {change > 0 ? (
        <TrendingUp size={14} color="#10B981" />
      ) : (
        <TrendingDown size={14} color="#EF4444" />
      )}
      <Text style={[
        styles.metricCardChangeText,
        { color: change > 0 ? '#10B981' : '#EF4444' }
      ]}>
        {Math.abs(change).toFixed(1)}%
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
  },
  timeFilter: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 11,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  metricCardLabel: {
    fontSize: 12,
    marginTop: 8,
  },
  metricCardValue: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4,
  },
  metricCardChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  metricCardChangeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  goalItem: {
    marginBottom: 12,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  goalName: {
    fontSize: 14,
    fontWeight: '600',
  },
  goalStatus: {
    fontSize: 11,
    fontWeight: '600',
  },
  goalProgressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  goalProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  goalValues: {
    fontSize: 11,
  },
  errorItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  errorContent: {
    flex: 1,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  errorMeta: {
    fontSize: 11,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  metricLabel: {
    fontSize: 14,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  agentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  agentId: {
    fontSize: 11,
  },
  agentStats: {
    alignItems: 'flex-end',
  },
  agentStat: {
    fontSize: 11,
    marginBottom: 2,
  },
  trendChart: {
    gap: 8,
  },
  trendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trendTime: {
    fontSize: 10,
    width: 60,
  },
  trendBar: {
    height: 8,
    borderRadius: 4,
    flex: 1,
  },
  trendValue: {
    fontSize: 11,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
  errorDetailItem: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  errorDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  errorDetailNode: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  errorCountBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  errorCountText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  errorDetailMessage: {
    fontSize: 13,
    marginBottom: 4,
  },
  errorDetailTime: {
    fontSize: 11,
  },
});
