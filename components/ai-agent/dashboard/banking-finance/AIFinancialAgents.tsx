import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Brain, TrendingUp, Shield, Activity, Zap } from 'lucide-react-native';
import { AIFinancialAgentsConfig } from '../types';

interface AIFinancialAgentsProps {
  config: AIFinancialAgentsConfig;
}

export default function AIFinancialAgents({ config }: AIFinancialAgentsProps) {
  const { theme } = useTheme();

  const getRiskColor = (risk?: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getIcon = (role: string) => {
    if (role.includes('Trading')) return TrendingUp;
    if (role.includes('Risk')) return Shield;
    if (role.includes('Fraud')) return Activity;
    return Brain;
  };

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.aiBadge, { backgroundColor: '#10B98120', borderColor: '#10B981' }]}>
            <Brain size={16} color="#10B981" />
            <Text style={styles.aiBadgeText}>AI AGENTS</Text>
          </View>
          <Text style={[styles.title, { color: '#FFFFFF' }]}>
            Financial Agents
          </Text>
        </View>
        <View style={[styles.liveIndicator, { backgroundColor: '#10B98120', borderColor: '#10B981' }]}>
          <Zap size={12} color="#10B981" />
          <Text style={styles.liveText}>ACTIVE</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {config.agents.map((agent) => {
          const Icon = getIcon(agent.role);
          return (
            <View key={agent.id} style={[styles.agentCard, { backgroundColor: '#0A0F14', borderColor: getRiskColor(agent.riskLevel) }]}>
              <View style={styles.agentHeader}>
                <View style={[styles.iconContainer, { backgroundColor: getRiskColor(agent.riskLevel) + '20', borderColor: getRiskColor(agent.riskLevel) }]}>
                  <Icon size={24} color={getRiskColor(agent.riskLevel)} />
                </View>
                <View style={styles.agentInfo}>
                  <Text style={[styles.agentName, { color: '#FFFFFF' }]}>{agent.name}</Text>
                  <Text style={[styles.agentRole, { color: '#9CA3AF' }]}>{agent.role}</Text>
                </View>
                <View style={[styles.confidenceBadge, { backgroundColor: getRiskColor(agent.riskLevel) + '20', borderColor: getRiskColor(agent.riskLevel) }]}>
                  <Text style={[styles.confidenceText, { color: getRiskColor(agent.riskLevel) }]}>{agent.confidenceScore}%</Text>
                </View>
              </View>
              
              <View style={styles.metricsGrid}>
                {agent.tradesExecuted && (
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Trades Executed</Text>
                    <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{agent.tradesExecuted}</Text>
                  </View>
                )}
                {agent.winRate && (
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Win Rate</Text>
                    <Text style={[styles.metricValue, { color: '#10B981' }]}>{agent.winRate}</Text>
                  </View>
                )}
                {agent.pnlImpact && (
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>PnL Impact</Text>
                    <Text style={[styles.metricValue, { color: '#10B981' }]}>{agent.pnlImpact}</Text>
                  </View>
                )}
                {agent.exposureMonitored && (
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Exposure</Text>
                    <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{agent.exposureMonitored}</Text>
                  </View>
                )}
                {agent.riskAlerts && (
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Risk Alerts</Text>
                    <Text style={[styles.metricValue, { color: '#F59E0B' }]}>{agent.riskAlerts}</Text>
                  </View>
                )}
                {agent.accuracy && (
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Accuracy</Text>
                    <Text style={[styles.metricValue, { color: '#10B981' }]}>{agent.accuracy}</Text>
                  </View>
                )}
                {agent.transactionsMonitored && (
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Transactions</Text>
                    <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{agent.transactionsMonitored}</Text>
                  </View>
                )}
                {agent.fraudPrevented && (
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Fraud Prevented</Text>
                    <Text style={[styles.metricValue, { color: '#10B981' }]}>{agent.fraudPrevented}</Text>
                  </View>
                )}
                {agent.marketContribution && (
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Market Contribution</Text>
                    <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{agent.marketContribution}</Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  aiBadgeText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  liveText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '700',
  },
  agentCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  agentRole: {
    fontSize: 12,
  },
  confidenceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metricItem: {
    width: '48%',
    marginRight: '2%',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});
