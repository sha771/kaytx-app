import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Cpu, Shield, Zap, CheckCircle, Clock, Activity } from 'lucide-react-native';

interface EngineeringAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'active' | 'idle' | 'busy';
  confidence: number;
  tasksCompleted: number;
  productivityImpact: string;
  contribution: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

interface AIAgentsOverviewProps {
  agents: EngineeringAgent[];
}

export default function AIAgentsOverview({ agents }: AIAgentsOverviewProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10B981';
      case 'idle':
        return '#6B7280';
      case 'busy':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'software development':
        return Cpu;
      case 'devops':
        return Zap;
      case 'security':
        return Shield;
      default:
        return Activity;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          AI Engineering Agents
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Autonomous Engineering Workforce
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.agentsRow}>
          {agents.map((agent) => {
            const Icon = getRoleIcon(agent.role);
            return (
              <View key={agent.id} style={[styles.agentCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                <View style={styles.agentHeader}>
                  <View style={[styles.avatarContainer, { backgroundColor: getStatusColor(agent.status) + '20' }]}>
                    <Icon size={32} color={getStatusColor(agent.status)} />
                  </View>
                  <View style={styles.statusIndicator}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(agent.status) }]} />
                  </View>
                </View>

                <Text style={[styles.agentName, { color: theme.colors.text }]}>
                  {agent.name}
                </Text>
                <Text style={[styles.agentRole, { color: theme.colors.textSecondary }]}>
                  {agent.role}
                </Text>

                <View style={styles.confidenceBar}>
                  <View style={styles.confidenceLabel}>
                    <Text style={[styles.confidenceText, { color: theme.colors.textSecondary }]}>
                      Confidence
                    </Text>
                    <Text style={[styles.confidenceValue, { color: theme.colors.text }]}>
                      {agent.confidence}%
                    </Text>
                  </View>
                  <View style={[styles.confidenceTrack, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                    <View 
                      style={[styles.confidenceFill, { 
                        backgroundColor: getStatusColor(agent.status),
                        width: `${agent.confidence}%` 
                      }]} 
                    />
                  </View>
                </View>

                <View style={styles.metricsContainer}>
                  {agent.metrics.map((metric, index) => (
                    <View key={index} style={styles.metricItem}>
                      <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                        {metric.label}
                      </Text>
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                        {metric.value}
                      </Text>
                    </View>
                  ))}
                </View>

                <View style={styles.contributionContainer}>
                  <Text style={[styles.contributionLabel, { color: theme.colors.textSecondary }]}>
                    Productivity Impact
                  </Text>
                  <Text style={[styles.contributionValue, { color: '#10B981' }]}>
                    {agent.productivityImpact}
                  </Text>
                </View>

                <View style={styles.tasksContainer}>
                  <View style={styles.tasksRow}>
                    <CheckCircle size={14} color="#10B981" />
                    <Text style={[styles.tasksText, { color: theme.colors.textSecondary }]}>
                      {agent.tasksCompleted} tasks completed
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    opacity: 0.7,
  },
  agentsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  agentCard: {
    width: 280,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  agentHeader: {
    flexDirection: 'row',
    marginBottom: 12,
    position: 'relative',
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  agentName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  agentRole: {
    fontSize: 12,
    marginBottom: 12,
    opacity: 0.7,
  },
  confidenceBar: {
    marginBottom: 12,
  },
  confidenceLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  confidenceText: {
    fontSize: 11,
    fontWeight: '500',
  },
  confidenceValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  confidenceTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 3,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 4,
    opacity: 0.7,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  contributionContainer: {
    marginBottom: 8,
  },
  contributionLabel: {
    fontSize: 10,
    marginBottom: 4,
    opacity: 0.7,
  },
  contributionValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  tasksContainer: {
    marginTop: 8,
  },
  tasksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tasksText: {
    fontSize: 11,
    opacity: 0.7,
  }
});