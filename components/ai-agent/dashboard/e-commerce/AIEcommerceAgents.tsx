import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  performanceScore: number;
  revenueManaged: string;
  conversionLift?: string;
  optimizationActions?: string;
  usersTracked?: string;
  predictionsMade?: string;
  accuracy?: string;
  pricesOptimized?: string;
  marginImprovement?: string;
  demandSensitivity?: string;
  campaignsOptimized?: string;
  roasImprovement?: string;
  audienceSegments?: string;
  stockoutPrediction?: string;
  demandAccuracy?: string;
  warehousesManaged?: string;
  status: string;
  lastActivity: string;
}

interface AIEcommerceAgentsProps {
  agents: Agent[];
}

export default function AIEcommerceAgents({ agents }: AIEcommerceAgentsProps) {
  const { theme } = useTheme();

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#22C55E';
    if (score >= 80) return '#3B82F6';
    if (score >= 70) return '#F59E0B';
    return '#EF4444';
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? '#22C55E' : '#F59E0B';
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#38BDF8' }]}>
        AI E-Commerce Agents
      </Text>

      <ScrollView style={styles.agentsScroll} showsVerticalScrollIndicator={false}>
        {agents.map((agent) => (
          <View key={agent.id} style={[styles.agentCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.3)', borderWidth: 1 }]}>
            {/* Agent Header */}
            <View style={styles.agentHeader}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>{agent.avatar}</Text>
                <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(agent.status) }]} />
              </View>
              <View style={styles.agentInfo}>
                <Text style={[styles.agentName, { color: '#FFFFFF' }]}>{agent.name}</Text>
                <Text style={[styles.agentRole, { color: 'rgba(255, 255, 255, 0.6)' }]}>{agent.role}</Text>
              </View>
              <View style={[styles.scoreBadge, { backgroundColor: `${getScoreColor(agent.performanceScore)}20` }]}>
                <Text style={[styles.scoreText, { color: getScoreColor(agent.performanceScore) }]}>
                  {agent.performanceScore}
                </Text>
              </View>
            </View>

            {/* Agent Metrics */}
            <View style={styles.metricsGrid}>
              {agent.revenueManaged && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Revenue Managed</Text>
                  <Text style={[styles.metricValue, { color: '#22C55E' }]}>{agent.revenueManaged}</Text>
                </View>
              )}
              {agent.conversionLift && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Conversion Lift</Text>
                  <Text style={[styles.metricValue, { color: '#22C55E' }]}>{agent.conversionLift}</Text>
                </View>
              )}
              {agent.optimizationActions && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Optimization Actions</Text>
                  <Text style={[styles.metricValue, { color: '#3B82F6' }]}>{agent.optimizationActions}</Text>
                </View>
              )}
              {agent.usersTracked && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Users Tracked</Text>
                  <Text style={[styles.metricValue, { color: '#3B82F6' }]}>{agent.usersTracked}</Text>
                </View>
              )}
              {agent.predictionsMade && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Predictions Made</Text>
                  <Text style={[styles.metricValue, { color: '#3B82F6' }]}>{agent.predictionsMade}</Text>
                </View>
              )}
              {agent.accuracy && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Accuracy</Text>
                  <Text style={[styles.metricValue, { color: '#22C55E' }]}>{agent.accuracy}</Text>
                </View>
              )}
              {agent.pricesOptimized && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Prices Optimized</Text>
                  <Text style={[styles.metricValue, { color: '#3B82F6' }]}>{agent.pricesOptimized}</Text>
                </View>
              )}
              {agent.marginImprovement && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Margin Improvement</Text>
                  <Text style={[styles.metricValue, { color: '#22C55E' }]}>{agent.marginImprovement}</Text>
                </View>
              )}
              {agent.demandSensitivity && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Demand Sensitivity</Text>
                  <Text style={[styles.metricValue, { color: '#8B5CF6' }]}>{agent.demandSensitivity}</Text>
                </View>
              )}
              {agent.campaignsOptimized && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Campaigns Optimized</Text>
                  <Text style={[styles.metricValue, { color: '#3B82F6' }]}>{agent.campaignsOptimized}</Text>
                </View>
              )}
              {agent.roasImprovement && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>ROAS Improvement</Text>
                  <Text style={[styles.metricValue, { color: '#22C55E' }]}>{agent.roasImprovement}</Text>
                </View>
              )}
              {agent.audienceSegments && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Audience Segments</Text>
                  <Text style={[styles.metricValue, { color: '#3B82F6' }]}>{agent.audienceSegments}</Text>
                </View>
              )}
              {agent.stockoutPrediction && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Stockout Prediction</Text>
                  <Text style={[styles.metricValue, { color: '#22C55E' }]}>{agent.stockoutPrediction}</Text>
                </View>
              )}
              {agent.demandAccuracy && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Demand Accuracy</Text>
                  <Text style={[styles.metricValue, { color: '#22C55E' }]}>{agent.demandAccuracy}</Text>
                </View>
              )}
              {agent.warehousesManaged && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Warehouses Managed</Text>
                  <Text style={[styles.metricValue, { color: '#3B82F6' }]}>{agent.warehousesManaged}</Text>
                </View>
              )}
            </View>

            {/* Agent Footer */}
            <View style={styles.agentFooter}>
              <View style={styles.activityIndicator}>
                <View style={[styles.activityDot, { backgroundColor: getStatusColor(agent.status) }]} />
                <Text style={[styles.activityText, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                  {agent.lastActivity}
                </Text>
              </View>
              <Text style={[styles.statusText, { color: getStatusColor(agent.status) }]}>
                {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  agentsScroll: {
    maxHeight: 600,
  },
  agentCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
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
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#05070A',
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  agentRole: {
    fontSize: 12,
  },
  scoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '700',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  metricItem: {
    width: '50%',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  agentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  activityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  activityText: {
    fontSize: 11,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
});