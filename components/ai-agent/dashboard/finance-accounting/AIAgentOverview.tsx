import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Bot, TrendingUp, CheckCircle, Activity, Zap, DollarSign } from 'lucide-react-native';

interface FinanceAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'busy' | 'offline';
  confidenceScore: number;
  financialContribution: string;
  transactionsManaged: number;
  performanceTrend: 'up' | 'stable' | 'down';
  metrics: {
    forecastAccuracy?: number;
    budgetsManaged?: string;
    varianceDetection?: number;
    invoicesProcessed?: number;
    automationRate?: number;
    costSavings?: string;
    journalEntries?: number;
    reconciliations?: number;
    errorRate?: number;
  };
}

interface AIAgentOverviewProps {
  agents: FinanceAgent[];
}

export default function AIAgentOverview({ agents }: AIAgentOverviewProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return '#10B981';
      case 'busy':
        return '#F59E0B';
      case 'offline':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  const getTrendIcon = (trend: 'up' | 'stable' | 'down') => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={12} color="#10B981" />;
      case 'stable':
        return <Activity size={12} color="#6B7280" />;
      case 'down':
        return <Activity size={12} color="#EF4444" />;
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Bot size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          AI Finance Agents
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.agentsRow}>
          {agents.map((agent) => (
            <View 
              key={agent.id} 
              style={[
                styles.agentCard, 
                { backgroundColor: 'rgba(255,255,255,0.03)' }
              ]}
            >
              <View style={styles.agentHeader}>
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatar}>{agent.avatar}</Text>
                  <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(agent.status) }]} />
                </View>
                <View style={styles.agentInfo}>
                  <Text style={[styles.agentName, { color: theme.colors.text }]}>
                    {agent.name}
                  </Text>
                  <Text style={[styles.agentRole, { color: theme.colors.textSecondary }]}>
                    {agent.role}
                  </Text>
                </View>
                {getTrendIcon(agent.performanceTrend)}
              </View>

              <View style={styles.confidenceSection}>
                <View style={styles.confidenceHeader}>
                  <CheckCircle size={12} color="#10B981" />
                  <Text style={[styles.confidenceLabel, { color: theme.colors.textSecondary }]}>
                    Confidence Score
                  </Text>
                </View>
                <Text style={[styles.confidenceValue, { color: '#10B981' }]}>
                  {agent.confidenceScore}%
                </Text>
                <View style={[styles.confidenceBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                  <View 
                    style={[
                      styles.confidenceFill, 
                      { 
                        backgroundColor: agent.confidenceScore >= 90 ? '#10B981' : 
                                     agent.confidenceScore >= 80 ? '#3B82F6' : '#F59E0B',
                        width: `${agent.confidenceScore}%`
                      }
                    ]} 
                  />
                </View>
              </View>

              <View style={styles.mainMetric}>
                <DollarSign size={14} color="#F59E0B" />
                <Text style={[styles.mainMetricValue, { color: '#F59E0B' }]}>
                  {agent.financialContribution}
                </Text>
                <Text style={[styles.mainMetricLabel, { color: theme.colors.textSecondary }]}>
                  Financial Contribution
                </Text>
              </View>

              <View style={styles.metricsGrid}>
                {agent.metrics.forecastAccuracy && (
                  <View style={styles.metricItem}>
                    <Zap size={12} color="#3B82F6" />
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {agent.metrics.forecastAccuracy}%
                    </Text>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Forecast Accuracy
                    </Text>
                  </View>
                )}
                {agent.metrics.budgetsManaged && (
                  <View style={styles.metricItem}>
                    <DollarSign size={12} color="#10B981" />
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {agent.metrics.budgetsManaged}
                    </Text>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Budgets Managed
                    </Text>
                  </View>
                )}
                {agent.metrics.varianceDetection && (
                  <View style={styles.metricItem}>
                    <CheckCircle size={12} color="#8B5CF6" />
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {agent.metrics.varianceDetection}%
                    </Text>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Variance Detection
                    </Text>
                  </View>
                )}
                {agent.metrics.invoicesProcessed && (
                  <View style={styles.metricItem}>
                    <Activity size={12} color="#06B6D4" />
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {agent.metrics.invoicesProcessed.toLocaleString()}
                    </Text>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Invoices Processed
                    </Text>
                  </View>
                )}
                {agent.metrics.automationRate && (
                  <View style={styles.metricItem}>
                    <Zap size={12} color="#F59E0B" />
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {agent.metrics.automationRate}%
                    </Text>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Automation Rate
                    </Text>
                  </View>
                )}
                {agent.metrics.costSavings && (
                  <View style={styles.metricItem}>
                    <DollarSign size={12} color="#10B981" />
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {agent.metrics.costSavings}
                    </Text>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Cost Savings
                    </Text>
                  </View>
                )}
                {agent.metrics.journalEntries && (
                  <View style={styles.metricItem}>
                    <Activity size={12} color="#8B5CF6" />
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {agent.metrics.journalEntries.toLocaleString()}
                    </Text>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Journal Entries
                    </Text>
                  </View>
                )}
                {agent.metrics.reconciliations && (
                  <View style={styles.metricItem}>
                    <CheckCircle size={12} color="#10B981" />
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {agent.metrics.reconciliations.toLocaleString()}
                    </Text>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Reconciliations
                    </Text>
                  </View>
                )}
                {agent.metrics.errorRate && (
                  <View style={styles.metricItem}>
                    <Activity size={12} color="#EF4444" />
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {agent.metrics.errorRate}%
                    </Text>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Error Rate
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.transactionsSection}>
                <Text style={[styles.transactionsLabel, { color: theme.colors.textSecondary }]}>
                  Transactions Managed
                </Text>
                <Text style={[styles.transactionsValue, { color: theme.colors.text }]}>
                  {agent.transactionsManaged.toLocaleString()}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  agentsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  agentCard: {
    borderRadius: 12,
    padding: 12,
    minWidth: 220,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 10,
  },
  avatar: {
    fontSize: 24,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#0B0F14',
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  agentRole: {
    fontSize: 11,
  },
  confidenceSection: {
    marginBottom: 12,
  },
  confidenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  confidenceLabel: {
    fontSize: 10,
  },
  confidenceValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  confidenceBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 2,
  },
  mainMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    padding: 10,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 8,
  },
  mainMetricValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  mainMetricLabel: {
    fontSize: 11,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  metricItem: {
    flex: 1,
    minWidth: 80,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 9,
  },
  transactionsSection: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
  },
  transactionsLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  transactionsValue: {
    fontSize: 16,
    fontWeight: '700',
  }
});