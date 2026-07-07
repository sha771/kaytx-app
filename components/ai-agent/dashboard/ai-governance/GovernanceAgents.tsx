import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Shield, Eye, Map, CheckCircle, AlertTriangle, Activity, Zap, Brain, Lock } from 'lucide-react-native';

interface GovernanceAgent {
  name: string;
  role: string;
  icon: any;
  status: 'safe' | 'warning' | 'critical';
  confidence: number;
  systemsUnderControl: number;
  riskImpactScore: number;
  complianceContribution: number;
  metrics: {
    label: string;
    value: string;
  }[];
}

interface GovernanceAgentsProps {
  agents: GovernanceAgent[];
}

export default function GovernanceAgents({ agents }: GovernanceAgentsProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: 'safe' | 'warning' | 'critical') => {
    switch (status) {
      case 'safe': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusBackground = (status: 'safe' | 'warning' | 'critical') => {
    switch (status) {
      case 'safe': return 'rgba(16, 185, 129, 0.1)';
      case 'warning': return 'rgba(245, 158, 11, 0.1)';
      case 'critical': return 'rgba(239, 68, 68, 0.1)';
      default: return 'rgba(107, 114, 128, 0.1)';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Brain size={20} color="#8B5CF6" />
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          AI Governance Agents
        </Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {agents.map((agent, index) => {
          const Icon = agent.icon;
          const statusColor = getStatusColor(agent.status);
          const statusBackground = getStatusBackground(agent.status);

          return (
            <View 
              key={index} 
              style={[
                styles.agentCard, 
                { 
                  backgroundColor: statusBackground,
                  borderColor: statusColor + '30',
                  borderWidth: 1
                }
              ]}
            >
              <View style={styles.agentHeader}>
                <View style={[styles.agentIcon, { backgroundColor: statusColor + '20' }]}>
                  <Icon size={32} color={statusColor} />
                </View>
                <View style={styles.agentStatus}>
                  <View style={[
                    styles.statusDot, 
                    { backgroundColor: statusColor }
                  ]} />
                  <Text style={[styles.statusText, { color: statusColor }]}>
                    {agent.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <Text style={[styles.agentName, { color: theme.colors.text }]}>
                {agent.name}
              </Text>
              <Text style={[styles.agentRole, { color: theme.colors.textSecondary }]}>
                {agent.role}
              </Text>

              <View style={styles.metricsGrid}>
                {agent.metrics.map((metric, metricIndex) => (
                  <View key={metricIndex} style={styles.metricItem}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      {metric.label}
                    </Text>
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {metric.value}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.scoreSection}>
                <View style={styles.scoreRow}>
                  <Text style={[styles.scoreLabel, { color: theme.colors.textSecondary }]}>
                    Confidence
                  </Text>
                  <View style={styles.scoreBar}>
                    <View 
                      style={[
                        styles.scoreFill, 
                        { 
                          backgroundColor: statusColor,
                          width: `${agent.confidence}%`
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.scoreValue, { color: statusColor }]}>
                    {agent.confidence}%
                  </Text>
                </View>

                <View style={styles.scoreRow}>
                  <Text style={[styles.scoreLabel, { color: theme.colors.textSecondary }]}>
                    Risk Impact
                  </Text>
                  <View style={styles.scoreBar}>
                    <View 
                      style={[
                        styles.scoreFill, 
                        { 
                          backgroundColor: agent.riskImpactScore > 70 ? '#EF4444' : agent.riskImpactScore > 40 ? '#F59E0B' : '#10B981',
                          width: `${agent.riskImpactScore}%`
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[
                    styles.scoreValue, 
                    { color: agent.riskImpactScore > 70 ? '#EF4444' : agent.riskImpactScore > 40 ? '#F59E0B' : '#10B981' }
                  ]}>
                    {agent.riskImpactScore}%
                  </Text>
                </View>

                <View style={styles.scoreRow}>
                  <Text style={[styles.scoreLabel, { color: theme.colors.textSecondary }]}>
                    Compliance
                  </Text>
                  <View style={styles.scoreBar}>
                    <View 
                      style={[
                        styles.scoreFill, 
                        { 
                          backgroundColor: '#10B981',
                          width: `${agent.complianceContribution}%`
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.scoreValue, { color: '#10B981' }]}>
                    {agent.complianceContribution}%
                  </Text>
                </View>
              </View>

              <View style={styles.systemsInfo}>
                <Activity size={14} color={theme.colors.textSecondary} />
                <Text style={[styles.systemsText, { color: theme.colors.textSecondary }]}>
                  {agent.systemsUnderControl.toLocaleString()} systems under control
                </Text>
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
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContent: {
    gap: 16,
    paddingHorizontal: 4,
  },
  agentCard: {
    borderRadius: 16,
    padding: 20,
    minWidth: 280,
  },
  agentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  agentIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  agentName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  agentRole: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricItem: {
    flex: 1,
    minWidth: 100,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  scoreSection: {
    marginBottom: 16,
    gap: 8,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scoreLabel: {
    fontSize: 11,
    fontWeight: '500',
    width: 70,
  },
  scoreBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  scoreFill: {
    height: '100%',
    borderRadius: 3,
  },
  scoreValue: {
    fontSize: 11,
    fontWeight: '600',
    width: 30,
    textAlign: 'right',
  },
  systemsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  systemsText: {
    fontSize: 11,
    fontWeight: '500',
  },
});