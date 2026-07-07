/**
 * Loop Analytics Dashboard Component
 * 
 * Comprehensive monitoring and analytics dashboard for loop engineering.
 * Provides real-time insights, performance metrics, and trend analysis.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { LoopAnalytics, LoopExecution, LoopConfig } from '@/lib/loop-engineering/types';
import {
  TrendingUp, TrendingDown, Activity, Clock, CheckCircle, XCircle,
  AlertCircle, BarChart3, PieChart, LineChart, Zap, Target, Users,
  Cpu, Database, ArrowUpRight, ArrowDownRight, Minus, Calendar,
  Filter, Download, RefreshCw, Settings, Layers, Network
} from 'lucide-react-native';

interface LoopAnalyticsDashboardProps {
  loopId: string;
  timeRange?: 'hour' | 'day' | 'week' | 'month';
  onTimeRangeChange?: (range: 'hour' | 'day' | 'week' | 'month') => void;
}

export const LoopAnalyticsDashboard: React.FC<LoopAnalyticsDashboardProps> = ({
  loopId,
  timeRange = 'day',
  onTimeRangeChange
}) => {
  const { theme } = useTheme();
  const [analytics, setAnalytics] = useState<LoopAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<'performance' | 'executions' | 'utilization'>('performance');

  useEffect(() => {
    loadAnalytics();
  }, [loopId, timeRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    // In real implementation, fetch from API
    // For now, generate mock data
    const mockAnalytics = generateMockAnalytics(loopId, timeRange);
    setAnalytics(mockAnalytics);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContainer}>
          <Activity size={48} color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
            Loading analytics...
          </Text>
        </View>
      </View>
    );
  }

  if (!analytics) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.errorContainer}>
          <AlertCircle size={48} color={theme.colors.error} />
          <Text style={[styles.errorText, { color: theme.colors.textSecondary }]}>
            No analytics data available
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <View>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Loop Analytics
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            {formatTimeRange(timeRange)}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable onPress={loadAnalytics}>
            <RefreshCw size={20} color={theme.colors.textSecondary} />
          </Pressable>
          <Pressable>
            <Download size={20} color={theme.colors.textSecondary} />
          </Pressable>
          <Pressable>
            <Settings size={20} color={theme.colors.textSecondary} />
          </Pressable>
        </View>
      </View>

      {/* Time Range Selector */}
      <View style={[styles.timeRangeSelector, { borderBottomColor: theme.colors.border }]}>
        {(['hour', 'day', 'week', 'month'] as const).map((range) => (
          <Pressable
            key={range}
            style={[
              styles.timeRangeButton,
              timeRange === range && { backgroundColor: theme.colors.primary }
            ]}
            onPress={() => onTimeRangeChange?.(range)}
          >
            <Text
              style={[
                styles.timeRangeButtonText,
                { color: timeRange === range ? '#fff' : theme.colors.textSecondary }
              ]}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {/* Key Metrics */}
        <View style={styles.metricsSection}>
          <MetricCard
            title="Total Executions"
            value={analytics.executions.total}
            change={calculateChange(analytics.executions.total, analytics.executions.total * 0.8)}
            icon={Activity}
            theme={theme}
          />
          <MetricCard
            title="Success Rate"
            value={`${analytics.executions.successRate.toFixed(1)}%`}
            change={calculateChange(analytics.executions.successRate, 85)}
            icon={CheckCircle}
            theme={theme}
          />
          <MetricCard
            title="Avg Duration"
            value={`${formatDuration(analytics.executions.averageDuration)}`}
            change={calculateChange(analytics.executions.averageDuration, analytics.executions.averageDuration * 1.1)}
            icon={Clock}
            theme={theme}
            inverse
          />
          <MetricCard
            title="Avg Iterations"
            value={analytics.performance.averageIterations.toFixed(1)}
            change={calculateChange(analytics.performance.averageIterations, 5)}
            icon={Layers}
            theme={theme}
          />
        </View>

        {/* Performance Metrics */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Performance Metrics
            </Text>
            <TrendingUp size={20} color={theme.colors.primary} />
          </View>
          
          <PerformanceMetric
            label="Resource Efficiency"
            value={`${analytics.performance.resourceEfficiency.toFixed(1)}%`}
            target={90}
            theme={theme}
          />
          <PerformanceMetric
            label="Cost Optimization"
            value={`${analytics.performance.costOptimization.toFixed(1)}%`}
            target={75}
            theme={theme}
          />
          <PerformanceMetric
            label="Avg Agent Time"
            value={`${formatDuration(analytics.performance.averageAgentExecutionTime)}`}
            target={3000}
            theme={theme}
            inverse
          />
        </View>

        {/* Execution Trends */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Execution Trends
            </Text>
            <LineChart size={20} color={theme.colors.primary} />
          </View>
          
          <TrendChart
            data={analytics.trends}
            theme={theme}
          />
        </View>

        {/* Agent Utilization */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Agent Utilization
            </Text>
            <PieChart size={20} color={theme.colors.primary} />
          </View>
          
          <AgentUtilizationList
            utilization={analytics.agentUtilization}
            theme={theme}
          />
        </View>

        {/* Execution Breakdown */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Execution Breakdown
            </Text>
            <BarChart3 size={20} color={theme.colors.primary} />
          </View>
          
          <ExecutionBreakdown
            executions={analytics.executions}
            theme={theme}
          />
        </View>
      </ScrollView>
    </View>
  );
};

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: any;
  theme: any;
  inverse?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  theme,
  inverse = false
}) => {
  const isPositive = inverse ? change < 0 : change > 0;
  const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;
  const changeColor = isPositive ? theme.colors.success : theme.colors.error;

  return (
    <View style={[styles.metricCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.metricCardHeader}>
        <Icon size={20} color={theme.colors.primary} />
        <Text style={[styles.metricCardTitle, { color: theme.colors.textSecondary }]}>
          {title}
        </Text>
      </View>
      <Text style={[styles.metricCardValue, { color: theme.colors.text }]}>
        {value}
      </Text>
      <View style={styles.metricCardChange}>
        <ChangeIcon size={16} color={changeColor} />
        <Text style={[styles.metricCardChangeText, { color: changeColor }]}>
          {Math.abs(change).toFixed(1)}%
        </Text>
      </View>
    </View>
  );
};

// Performance Metric Component
interface PerformanceMetricProps {
  label: string;
  value: string;
  target: number;
  theme: any;
  inverse?: boolean;
}

const PerformanceMetric: React.FC<PerformanceMetricProps> = ({
  label,
  value,
  target,
  theme,
  inverse = false
}) => {
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const percentage = Math.min((numericValue / target) * 100, 100);
  const isGood = inverse ? percentage < 100 : percentage >= 100;

  return (
    <View style={styles.performanceMetric}>
      <View style={styles.performanceMetricHeader}>
        <Text style={[styles.performanceMetricLabel, { color: theme.colors.text }]}>
          {label}
        </Text>
        <Text style={[styles.performanceMetricValue, { color: theme.colors.text }]}>
          {value}
        </Text>
      </View>
      <View style={[styles.performanceMetricBar, { backgroundColor: theme.colors.border }]}>
        <View
          style={[
            styles.performanceMetricFill,
            {
              width: `${percentage}%`,
              backgroundColor: isGood ? theme.colors.success : theme.colors.warning
            }
          ]}
        />
      </View>
      <Text style={[styles.performanceMetricTarget, { color: theme.colors.textSecondary }]}>
        Target: {target}
      </Text>
    </View>
  );
};

// Trend Chart Component
interface TrendChartProps {
  data: Array<{ timestamp: Date; metric: string; value: number }>;
  theme: any;
}

const TrendChart: React.FC<TrendChartProps> = ({ data, theme }) => {
  // In a real implementation, this would render an actual chart
  // For now, show a simplified representation
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  return (
    <View style={styles.trendChart}>
      <View style={styles.trendChartBars}>
        {data.slice(-10).map((point, index) => {
          const height = ((point.value - minValue) / range) * 100;
          return (
            <View key={index} style={styles.trendChartBarContainer}>
              <View
                style={[
                  styles.trendChartBar,
                  {
                    height: `${Math.max(height, 10)}%`,
                    backgroundColor: theme.colors.primary
                  }
                ]}
              />
              <Text style={[styles.trendChartLabel, { color: theme.colors.textSecondary }]}>
                {formatTimestamp(point.timestamp)}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

// Agent Utilization List Component
interface AgentUtilizationListProps {
  utilization: Map<string, { executionCount: number; averageTime: number; successRate: number }>;
  theme: any;
}

const AgentUtilizationList: React.FC<AgentUtilizationListProps> = ({ utilization, theme }) => {
  const sortedAgents = Array.from(utilization.entries())
    .sort((a, b) => b[1].executionCount - a[1].executionCount)
    .slice(0, 5);

  return (
    <View style={styles.agentUtilizationList}>
      {sortedAgents.map(([agentId, data]) => (
        <View key={agentId} style={[styles.agentUtilizationItem, { borderBottomColor: theme.colors.border }]}>
          <View style={styles.agentUtilizationInfo}>
            <Text style={[styles.agentUtilizationName, { color: theme.colors.text }]}>
              {agentId}
            </Text>
            <Text style={[styles.agentUtilizationMeta, { color: theme.colors.textSecondary }]}>
              {data.executionCount} executions · {formatDuration(data.averageTime)}
            </Text>
          </View>
          <View style={styles.agentUtilizationRate}>
            <Text style={[styles.agentUtilizationRateValue, { color: theme.colors.text }]}>
              {data.successRate.toFixed(1)}%
            </Text>
            <Text style={[styles.agentUtilizationRateLabel, { color: theme.colors.textSecondary }]}>
              success
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

// Execution Breakdown Component
interface ExecutionBreakdownProps {
  executions: LoopAnalytics['executions'];
  theme: any;
}

const ExecutionBreakdown: React.FC<ExecutionBreakdownProps> = ({ executions, theme }) => {
  const total = executions.total;
  const successful = executions.successful;
  const failed = executions.failed;

  return (
    <View style={styles.executionBreakdown}>
      <View style={styles.breakdownItem}>
        <View style={[styles.breakdownBar, { backgroundColor: theme.colors.success }]} style={{ flex: successful / total, height: 8 }} />
        <Text style={[styles.breakdownLabel, { color: theme.colors.text }]}>
          Successful: {successful} ({((successful / total) * 100).toFixed(1)}%)
        </Text>
      </View>
      <View style={styles.breakdownItem}>
        <View style={[styles.breakdownBar, { backgroundColor: theme.colors.error }]} style={{ flex: failed / total, height: 8 }} />
        <Text style={[styles.breakdownLabel, { color: theme.colors.text }]}>
          Failed: {failed} ({((failed / total) * 100).toFixed(1)}%)
        </Text>
      </View>
    </View>
  );
};

// Utility functions
function generateMockAnalytics(loopId: string, timeRange: string): LoopAnalytics {
  const now = new Date();
  const startTime = new Date(now.getTime() - getTimeRangeMs(timeRange));

  return {
    loopId,
    timeRange: {
      start: startTime,
      end: now
    },
    executions: {
      total: Math.floor(Math.random() * 100) + 50,
      successful: Math.floor(Math.random() * 80) + 40,
      failed: Math.floor(Math.random() * 20) + 5,
      averageDuration: Math.random() * 5000 + 2000,
      successRate: Math.random() * 15 + 85
    },
    performance: {
      averageIterations: Math.random() * 5 + 3,
      averageAgentExecutionTime: Math.random() * 2000 + 1000,
      resourceEfficiency: Math.random() * 15 + 80,
      costOptimization: Math.random() * 20 + 70
    },
    trends: Array.from({ length: 20 }, (_, i) => ({
      timestamp: new Date(startTime.getTime() + (i * getTimeRangeMs(timeRange) / 20)),
      metric: 'execution_time',
      value: Math.random() * 3000 + 1500
    })),
    agentUtilization: new Map([
      ['agent-1', { executionCount: 45, averageTime: 1200, successRate: 95.5 }],
      ['agent-2', { executionCount: 38, averageTime: 1800, successRate: 92.3 }],
      ['agent-3', { executionCount: 52, averageTime: 900, successRate: 97.1 }],
      ['agent-4', { executionCount: 29, averageTime: 2100, successRate: 89.8 }],
      ['agent-5', { executionCount: 41, averageTime: 1500, successRate: 94.2 }]
    ])
  };
}

function getTimeRangeMs(range: string): number {
  switch (range) {
    case 'hour': return 60 * 60 * 1000;
    case 'day': return 24 * 60 * 60 * 1000;
    case 'week': return 7 * 24 * 60 * 60 * 1000;
    case 'month': return 30 * 24 * 60 * 60 * 1000;
    default: return 24 * 60 * 60 * 1000;
  }
}

function formatTimeRange(range: string): string {
  switch (range) {
    case 'hour': return 'Last Hour';
    case 'day': return 'Last 24 Hours';
    case 'week': return 'Last 7 Days';
    case 'month': return 'Last 30 Days';
    default: return 'Last 24 Hours';
  }
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60000).toFixed(1)}m`;
}

function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function calculateChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  timeRangeSelector: {
    flexDirection: 'row',
    padding: 8,
    gap: 8,
    borderBottomWidth: 1,
  },
  timeRangeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  timeRangeButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  metricsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    minWidth: 150,
    borderRadius: 12,
    padding: 16,
  },
  metricCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  metricCardTitle: {
    fontSize: 12,
  },
  metricCardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  metricCardChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricCardChangeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  performanceMetric: {
    marginBottom: 16,
  },
  performanceMetricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  performanceMetricLabel: {
    fontSize: 14,
  },
  performanceMetricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  performanceMetricBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  performanceMetricFill: {
    height: '100%',
    borderRadius: 4,
  },
  performanceMetricTarget: {
    fontSize: 12,
  },
  trendChart: {
    paddingVertical: 16,
  },
  trendChartBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  trendChartBarContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  trendChartBar: {
    width: '100%',
    borderRadius: 4,
    marginBottom: 4,
  },
  trendChartLabel: {
    fontSize: 10,
  },
  agentUtilizationList: {
    gap: 12,
  },
  agentUtilizationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  agentUtilizationInfo: {
    flex: 1,
  },
  agentUtilizationName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  agentUtilizationMeta: {
    fontSize: 12,
  },
  agentUtilizationRate: {
    alignItems: 'flex-end',
  },
  agentUtilizationRateValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  agentUtilizationRateLabel: {
    fontSize: 12,
  },
  executionBreakdown: {
    gap: 12,
  },
  breakdownItem: {
    marginBottom: 8,
  },
  breakdownBar: {
    borderRadius: 4,
    marginBottom: 4,
  },
  breakdownLabel: {
    fontSize: 14,
  },
});