import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Bot, TrendingUp, CheckCircle, Activity, Zap, Users, ArrowUpRight, ArrowDownRight, Sparkles, Target } from 'lucide-react-native';

interface HRAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'busy' | 'offline';
  confidenceScore: number;
  hrContribution: string;
  employeesImpacted: number;
  performanceTrend: 'up' | 'stable' | 'down';
  metrics: {
    candidatesScreened?: number;
    interviewsScheduled?: number;
    hiringAccuracy?: number;
    coursesAssigned?: number;
    completionRate?: number;
    skillGapsIdentified?: number;
    engagementScore?: number;
    surveysAnalyzed?: number;
    retentionPredictions?: number;
  };
}

interface AIAgentOverviewProps {
  agents: HRAgent[];
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
        return <ArrowUpRight size={14} color="#10B981" />;
      case 'stable':
        return <Activity size={14} color="#6B7280" />;
      case 'down':
        return <ArrowDownRight size={14} color="#EF4444" />;
    }
  };

  const getAgentColor = (agentId: string) => {
    switch (agentId) {
      case 'recruitment':
        return '#3B82F6';
      case 'learning':
        return '#8B5CF6';
      case 'engagement':
        return '#10B981';
      default:
        return '#06B6D4';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
          <Bot size={24} color="#8B5CF6" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            AI HR Agents
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Autonomous People Operations
          </Text>
        </View>
        <View style={[styles.agentCount, { backgroundColor: '#8B5CF6' + '20' }]}>
          <Text style={[styles.agentCountText, { color: '#8B5CF6' }]}>
            {agents.length} Active
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.agentsRow}>
          {agents.map((agent) => {
            const agentColor = getAgentColor(agent.id);
            return (
              <View 
                key={agent.id} 
                style={[
                  styles.agentCard, 
                  { 
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    borderColor: agentColor + '30',
                    borderWidth: 1
                  }
                ]}
              >
                <View style={[styles.glowEffect, { backgroundColor: agentColor + '10' }]} />
                
                <View style={styles.agentHeader}>
                  <View style={styles.avatarContainer}>
                    <View style={[styles.avatarGlow, { backgroundColor: agentColor + '30' }]}>
                      <Text style={styles.avatar}>{agent.avatar}</Text>
                    </View>
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
                  <View style={styles.trendWrapper}>
                    {getTrendIcon(agent.performanceTrend)}
                  </View>
                </View>

                <View style={styles.confidenceSection}>
                  <View style={styles.confidenceHeader}>
                    <Sparkles size={12} color={agentColor} />
                    <Text style={[styles.confidenceLabel, { color: theme.colors.textSecondary }]}>
                      AI Confidence
                    </Text>
                  </View>
                  <Text style={[styles.confidenceValue, { color: agentColor }]}>
                    {agent.confidenceScore}%
                  </Text>
                  <View style={[styles.confidenceBar, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                    <View 
                      style={[
                        styles.confidenceFill, 
                        { 
                          backgroundColor: agentColor,
                          width: `${agent.confidenceScore}%`,
                          shadowColor: agentColor,
                          shadowOffset: { width: 0, height: 0 },
                          shadowOpacity: 0.5,
                          shadowRadius: 8,
                        }
                      ]} 
                    />
                  </View>
                </View>

                <View style={[styles.mainMetric, { backgroundColor: agentColor + '15', borderColor: agentColor + '30' }]}>
                  <Target size={16} color={agentColor} />
                  <Text style={[styles.mainMetricValue, { color: agentColor }]}>
                    {agent.hrContribution}
                  </Text>
                  <Text style={[styles.mainMetricLabel, { color: theme.colors.textSecondary }]}>
                    HR Contribution
                  </Text>
                </View>

                <View style={styles.metricsGrid}>
                  {agent.metrics.candidatesScreened && (
                    <View style={[styles.metricItem, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                      <Activity size={12} color="#3B82F6" />
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                        {agent.metrics.candidatesScreened.toLocaleString()}
                      </Text>
                      <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                        Screened
                      </Text>
                    </View>
                  )}
                  {agent.metrics.interviewsScheduled && (
                    <View style={[styles.metricItem, { backgroundColor: 'rgba(139, 92, 246, 0.1)' }]}>
                      <CheckCircle size={12} color="#8B5CF6" />
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                        {agent.metrics.interviewsScheduled.toLocaleString()}
                      </Text>
                      <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                        Interviews
                      </Text>
                    </View>
                  )}
                  {agent.metrics.hiringAccuracy && (
                    <View style={[styles.metricItem, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                      <Zap size={12} color="#10B981" />
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                        {agent.metrics.hiringAccuracy}%
                      </Text>
                      <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                        Accuracy
                      </Text>
                    </View>
                  )}
                  {agent.metrics.coursesAssigned && (
                    <View style={[styles.metricItem, { backgroundColor: 'rgba(6, 182, 212, 0.1)' }]}>
                      <Activity size={12} color="#06B6D4" />
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                        {agent.metrics.coursesAssigned.toLocaleString()}
                      </Text>
                      <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                        Courses
                      </Text>
                    </View>
                  )}
                  {agent.metrics.completionRate && (
                    <View style={[styles.metricItem, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
                      <CheckCircle size={12} color="#F59E0B" />
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                        {agent.metrics.completionRate}%
                      </Text>
                      <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                        Completion
                      </Text>
                    </View>
                  )}
                  {agent.metrics.skillGapsIdentified && (
                    <View style={[styles.metricItem, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                      <Zap size={12} color="#EF4444" />
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                        {agent.metrics.skillGapsIdentified}
                      </Text>
                      <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                        Skill Gaps
                      </Text>
                    </View>
                  )}
                  {agent.metrics.engagementScore && (
                    <View style={[styles.metricItem, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                      <TrendingUp size={12} color="#10B981" />
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                        {agent.metrics.engagementScore}%
                      </Text>
                      <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                        Engagement
                      </Text>
                    </View>
                  )}
                  {agent.metrics.surveysAnalyzed && (
                    <View style={[styles.metricItem, { backgroundColor: 'rgba(139, 92, 246, 0.1)' }]}>
                      <Activity size={12} color="#8B5CF6" />
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                        {agent.metrics.surveysAnalyzed.toLocaleString()}
                      </Text>
                      <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                        Surveys
                      </Text>
                    </View>
                  )}
                  {agent.metrics.retentionPredictions && (
                    <View style={[styles.metricItem, { backgroundColor: 'rgba(6, 182, 212, 0.1)' }]}>
                      <CheckCircle size={12} color="#06B6D4" />
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                        {agent.metrics.retentionPredictions}%
                      </Text>
                      <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                        Predictions
                      </Text>
                    </View>
                  )}
                </View>

                <View style={[styles.employeesSection, { borderTopColor: 'rgba(255,255,255,0.08)' }]}>
                  <View style={styles.employeesRow}>
                    <Users size={16} color={agentColor} />
                    <Text style={[styles.employeesLabel, { color: theme.colors.textSecondary }]}>
                      Employees Impacted
                    </Text>
                  </View>
                  <Text style={[styles.employeesValue, { color: theme.colors.text }]}>
                    {agent.employeesImpacted.toLocaleString()}
                  </Text>
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
    borderRadius: 20,
    padding: 20,
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.6,
  },
  agentCount: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  agentCountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
  agentsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  agentCard: {
    width: 220,
    borderRadius: 16,
    padding: 18,
    position: 'relative',
    overflow: 'hidden',
  },
  glowEffect: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 0.3,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatarGlow: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    fontSize: 20,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 3,
  },
  agentRole: {
    fontSize: 11,
    opacity: 0.7,
  },
  trendWrapper: {
    marginLeft: 8,
  },
  confidenceSection: {
    marginBottom: 16,
  },
  confidenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  confidenceLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  confidenceValue: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  confidenceBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 3,
  },
  mainMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  mainMetricValue: {
    fontSize: 17,
    fontWeight: '700',
  },
  mainMetricLabel: {
    fontSize: 10,
    opacity: 0.8,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  metricItem: {
    flex: 1,
    minWidth: 85,
    padding: 10,
    borderRadius: 10,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
  },
  metricLabel: {
    fontSize: 9,
    opacity: 0.7,
  },
  employeesSection: {
    paddingTop: 14,
    borderTopWidth: 1,
  },
  employeesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  employeesLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  employeesValue: {
    fontSize: 20,
    fontWeight: '800',
  },
});