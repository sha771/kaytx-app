import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface SupportAgent {
  id: string;
  name: string;
  status: 'active' | 'learning' | 'offline';
  specialization: string;
  confidence: number;
  conversationsToday: number;
  resolutionRate: number;
  satisfactionScore: number;
  escalations: number;
  avgHandlingTime: string;
}

interface AIAgentOverviewProps {
  agents: SupportAgent[];
}

export default function AIAgentOverview({ agents }: AIAgentOverviewProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#22C55E';
      case 'learning': return '#F59E0B';
      case 'offline': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'learning': return 'Learning';
      case 'offline': return 'Offline';
      default: return status;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        AI Agent Overview
      </Text>
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {agents.map((agent) => (
          <View 
            key={agent.id} 
            style={[styles.agentCard, { 
              backgroundColor: 'rgba(11, 15, 20, 0.6)',
              borderColor: 'rgba(16, 185, 129, 0.3)',
              borderWidth: 1
            }]}
          >
            {/* Agent Header */}
            <View style={styles.agentHeader}>
              <View style={[styles.avatar, { backgroundColor: `${getStatusColor(agent.status)}20`, borderColor: `${getStatusColor(agent.status)}40`, borderWidth: 2 }]}>
                <Text style={[styles.avatarText, { color: getStatusColor(agent.status) }]}>
                  {agent.name.charAt(0)}
                </Text>
              </View>
              <View style={styles.agentInfo}>
                <Text style={[styles.agentName, { color: '#FFFFFF' }]}>
                  {agent.name}
                </Text>
                <View style={styles.statusRow}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(agent.status) }]} />
                  <Text style={[styles.statusText, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                    {getStatusLabel(agent.status)} • {agent.specialization}
                  </Text>
                </View>
              </View>
            </View>

            {/* Metrics Grid */}
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                  Confidence
                </Text>
                <Text style={[styles.metricValue, { color: '#10B981' }]}>
                  {agent.confidence}%
                </Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                  Conversations
                </Text>
                <Text style={[styles.metricValue, { color: '#06B6D4' }]}>
                  {agent.conversationsToday}
                </Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                  Resolution Rate
                </Text>
                <Text style={[styles.metricValue, { color: '#22C55E' }]}>
                  {agent.resolutionRate}%
                </Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                  Satisfaction
                </Text>
                <Text style={[styles.metricValue, { color: '#3B82F6' }]}>
                  {agent.satisfactionScore}/5
                </Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                  Escalations
                </Text>
                <Text style={[styles.metricValue, { color: agent.escalations > 5 ? '#EF4444' : '#8B5CF6' }]}>
                  {agent.escalations}
                </Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                  Avg Time
                </Text>
                <Text style={[styles.metricValue, { color: '#F59E0B' }]}>
                  {agent.avgHandlingTime}
                </Text>
              </View>
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
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  scrollContainer: {
    maxHeight: 500,
  },
  agentCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '700',
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  metricItem: {
    width: '33.33%',
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 11,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 15,
    fontWeight: '700',
  },
});