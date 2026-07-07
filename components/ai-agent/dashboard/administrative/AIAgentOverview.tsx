import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Bot, Activity, TrendingUp, Zap, CheckCircle, Clock, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react-native';

interface AdminAgent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'learning' | 'idle';
  confidence: number;
  workload: number;
  productivityGain: number;
  accuracy: number;
  tasksCompleted: number;
  icon: string;
  color: string;
}

interface AIAgentOverviewProps {
  agents: AdminAgent[];
}

export default function AIAgentOverview({ agents }: AIAgentOverviewProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'learning': return '#F59E0B';
      case 'idle': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'learning': return 'Learning';
      case 'idle': return 'Idle';
      default: return 'Unknown';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Bot size={24} color="#8B5CF6" />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              AI Administrative Agents
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Autonomous workforce operations
            </Text>
          </View>
        </View>
        <View style={[styles.agentCountBadge, { backgroundColor: '#8B5CF6' + '20' }]}>
          <Sparkles size={16} color="#8B5CF6" />
          <Text style={[styles.agentCountText, { color: '#8B5CF6' }]}>
            {agents.length} Active
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {agents.map((agent) => (
          <View key={agent.id} style={[styles.agentCard, { borderColor: agent.color + '30', borderWidth: 1 }]}>
            <View style={styles.agentHeader}>
              <View style={[styles.agentAvatar, { backgroundColor: agent.color + '20' }]}>
                <Text style={styles.agentIcon}>{agent.icon}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(agent.status) + '20' }]}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(agent.status) }]} />
                <Text style={[styles.statusText, { color: getStatusColor(agent.status) }]}>
                  {getStatusBadge(agent.status)}
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
              <View style={styles.metricItem}>
                <Activity size={14} color={agent.color} />
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                  Confidence
                </Text>
                <Text style={[styles.metricValue, { color: agent.color }]}>
                  {agent.confidence}%
                </Text>
              </View>

              <View style={styles.metricItem}>
                <Zap size={14} color={agent.color} />
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                  Workload
                </Text>
                <Text style={[styles.metricValue, { color: agent.color }]}>
                  {agent.workload}%
                </Text>
              </View>

              <View style={styles.metricItem}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                  Productivity
                </Text>
                <Text style={[styles.metricValue, { color: '#10B981' }]}>
                  +{agent.productivityGain}%
                </Text>
              </View>

              <View style={styles.metricItem}>
                <CheckCircle size={14} color="#3B82F6" />
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                  Accuracy
                </Text>
                <Text style={[styles.metricValue, { color: '#3B82F6' }]}>
                  {agent.accuracy}%
                </Text>
              </View>
            </View>

            <View style={styles.taskSection}>
              <View style={styles.taskRow}>
                <Clock size={14} color="#8B5CF6" />
                <Text style={[styles.taskLabel, { color: theme.colors.textSecondary }]}>
                  Tasks Completed
                </Text>
                <Text style={[styles.taskValue, { color: theme.colors.text }]}>
                  {agent.tasksCompleted.toLocaleString()}
                </Text>
              </View>
            </View>

            <View style={[styles.progressBar, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    backgroundColor: agent.color,
                    width: `${agent.workload}%`
                  }
                ]} 
              />
            </View>
          </View>
        ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  agentCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  agentCountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scrollContent: {
    gap: 12,
  },
  agentCard: {
    width: 200,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  agentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  agentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentIcon: {
    fontSize: 24,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
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
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  agentRole: {
    fontSize: 11,
    marginBottom: 12,
  },
  metricsGrid: {
    gap: 8,
    marginBottom: 12,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricLabel: {
    fontSize: 10,
    flex: 1,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  taskSection: {
    marginBottom: 12,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  taskLabel: {
    fontSize: 10,
    flex: 1,
  },
  taskValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});