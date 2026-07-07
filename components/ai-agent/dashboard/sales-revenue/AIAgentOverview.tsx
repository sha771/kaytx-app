import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Bot, TrendingUp, TrendingDown, Minus, DollarSign, Award } from 'lucide-react-native';

interface SalesAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  confidenceScore: number;
  revenueContribution: string;
  dealsInfluenced: number;
  performanceTrend: 'up' | 'down' | 'stable';
  metrics: {
    leadsGenerated?: number;
    meetingsBooked?: number;
    conversionRate?: number;
    opportunitiesManaged?: number;
    revenueClosed?: string;
    upsellRevenue?: string;
    renewalSuccess?: number;
  };
}

interface AIAgentOverviewProps {
  agents: SalesAgent[];
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
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={14} color="#10B981" />;
      case 'down':
        return <TrendingDown size={14} color="#EF4444" />;
      case 'stable':
        return <Minus size={14} color="#6B7280" />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Bot size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          AI Sales Agents
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.agentsRow}>
          {agents.map((agent) => (
            <View key={agent.id} style={[styles.agentCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
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
                <View style={styles.trendContainer}>
                  {getTrendIcon(agent.performanceTrend)}
                </View>
              </View>

              <View style={styles.confidenceBar}>
                <View style={styles.confidenceLabel}>
                  <Text style={[styles.confidenceText, { color: theme.colors.textSecondary }]}>
                    Confidence
                  </Text>
                  <Text style={[styles.confidenceScore, { color: theme.colors.text }]}>
                    {agent.confidenceScore}%
                  </Text>
                </View>
                <View style={[styles.confidenceProgress, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
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

              <View style={styles.metricsGrid}>
                <View style={styles.metricItem}>
                  <DollarSign size={12} color="#10B981" />
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {agent.revenueContribution}
                  </Text>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Revenue
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Award size={12} color="#3B82F6" />
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {agent.dealsInfluenced}
                  </Text>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Deals
                  </Text>
                </View>
              </View>

              <View style={styles.agentMetrics}>
                {agent.metrics.leadsGenerated && (
                  <View style={styles.agentMetric}>
                    <Text style={[styles.agentMetricValue, { color: theme.colors.text }]}>
                      {agent.metrics.leadsGenerated.toLocaleString()}
                    </Text>
                    <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>
                      Leads Generated
                    </Text>
                  </View>
                )}
                {agent.metrics.meetingsBooked && (
                  <View style={styles.agentMetric}>
                    <Text style={[styles.agentMetricValue, { color: theme.colors.text }]}>
                      {agent.metrics.meetingsBooked}
                    </Text>
                    <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>
                      Meetings Booked
                    </Text>
                  </View>
                )}
                {agent.metrics.conversionRate && (
                  <View style={styles.agentMetric}>
                    <Text style={[styles.agentMetricValue, { color: theme.colors.text }]}>
                      {agent.metrics.conversionRate}%
                    </Text>
                    <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>
                      Conversion Rate
                    </Text>
                  </View>
                )}
                {agent.metrics.opportunitiesManaged && (
                  <View style={styles.agentMetric}>
                    <Text style={[styles.agentMetricValue, { color: theme.colors.text }]}>
                      {agent.metrics.opportunitiesManaged}
                    </Text>
                    <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>
                      Opportunities
                    </Text>
                  </View>
                )}
                {agent.metrics.revenueClosed && (
                  <View style={styles.agentMetric}>
                    <Text style={[styles.agentMetricValue, { color: theme.colors.text }]}>
                      {agent.metrics.revenueClosed}
                    </Text>
                    <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>
                      Revenue Closed
                    </Text>
                  </View>
                )}
                {agent.metrics.upsellRevenue && (
                  <View style={styles.agentMetric}>
                    <Text style={[styles.agentMetricValue, { color: theme.colors.text }]}>
                      {agent.metrics.upsellRevenue}
                    </Text>
                    <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>
                      Upsell Revenue
                    </Text>
                  </View>
                )}
                {agent.metrics.renewalSuccess && (
                  <View style={styles.agentMetric}>
                    <Text style={[styles.agentMetricValue, { color: theme.colors.text }]}>
                      {agent.metrics.renewalSuccess}%
                    </Text>
                    <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>
                      Renewal Success
                    </Text>
                  </View>
                )}
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
    padding: 16,
    minWidth: 280,
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
    marginRight: 12,
  },
  avatar: {
    fontSize: 32,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#0B0F14',
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  agentRole: {
    fontSize: 12,
  },
  trendContainer: {
    marginLeft: 8,
  },
  confidenceBar: {
    marginBottom: 12,
  },
  confidenceLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  confidenceText: {
    fontSize: 11,
  },
  confidenceScore: {
    fontSize: 11,
    fontWeight: '600',
  },
  confidenceProgress: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 2,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 10,
  },
  agentMetrics: {
    gap: 8,
  },
  agentMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  agentMetricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  agentMetricLabel: {
    fontSize: 11,
  }
});