import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  CircleCheckBig,
  TriangleAlert,
  MessageCircle,
  Crown,
  GitBranch,
  Target,
  Calendar,
  ChevronRight,
  ListFilter,
  Download,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useAgentCounseling } from '@/hooks/useAgentCounseling';
import { getAgentById, getAllAgents, AIAgentDefinition } from '@/constants/aiAgentHierarchy';

const { width } = Dimensions.get('window');

type TimeRange = '7d' | '30d' | '90d' | 'all';
type CounselingMode = 'all' | 'main_to_sub' | 'sub_to_main' | 'peer_to_peer';

interface AnalyticsData {
  totalSessions: number;
  completedSessions: number;
  inProgressSessions: number;
  escalatedSessions: number;
  averageResponseTime: number;
  averageConfidence: number;
  sessionsByMode: Record<string, number>;
  sessionsByStatus: Record<string, number>;
  sessionsByPriority: Record<string, number>;
  topTopics: { topic: string; count: number }[];
  agentParticipation: { agentId: string; agentName: string; sessionsInitiated: number; sessionsParticipated: number }[];
  trendData: { date: string; sessions: number; completed: number }[];
}

export default function CounselingAnalyticsScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { sessions, loading } = useAgentCounseling();

  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [selectedMode, setSelectedMode] = useState<CounselingMode>('all');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const agents = useMemo(() => getAllAgents(), []);

  // Calculate analytics from sessions
  const analytics: AnalyticsData = useMemo(() => {
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (timeRange) {
      case '7d': cutoffDate.setDate(now.getDate() - 7); break;
      case '30d': cutoffDate.setDate(now.getDate() - 30); break;
      case '90d': cutoffDate.setDate(now.getDate() - 90); break;
      case 'all': cutoffDate.setFullYear(2000); break;
    }

    const filteredSessions = sessions.filter(session => {
      const sessionDate = new Date(session.createdAt);
      if (sessionDate < cutoffDate) return false;
      
      if (selectedMode !== 'all') {
        const latestRequest = session.requests[session.requests.length - 1];
        const relationship = latestRequest?.counselingContext?.relationship;
        if (relationship !== selectedMode) return false;
      }
      
      if (selectedAgent) {
        const isInvolved = 
          session.initiator.agentId === selectedAgent ||
          session.participants.some(p => p.agentId === selectedAgent);
        if (!isInvolved) return false;
      }
      
      return true;
    });

    const total = filteredSessions.length;
    const completed = filteredSessions.filter(s => s.status === 'completed').length;
    const inProgress = filteredSessions.filter(s => s.status === 'in_progress').length;
    const escalated = filteredSessions.filter(s => s.status === 'escalated').length;

    // Sessions by mode
    const byMode: Record<string, number> = {};

    filteredSessions.forEach(session => {
      const latestRequest = session.requests[session.requests.length - 1];
      const mode = latestRequest?.counselingContext?.relationship || 'unknown';
      byMode[mode] = (byMode[mode] || 0) + 1;
    });

    // Sessions by status
    const byStatus: Record<string, number> = {};
    filteredSessions.forEach(session => {
      byStatus[session.status] = (byStatus[session.status] || 0) + 1;
    });

    // Sessions by priority
    const byPriority: Record<string, number> = {};
    filteredSessions.forEach(session => {
      const latestRequest = session.requests[session.requests.length - 1];
      const priority = latestRequest?.priority || 'unknown';
      byPriority[priority] = (byPriority[priority] || 0) + 1;
    });

    // Top topics
    const topicCounts: Record<string, number> = {};
    filteredSessions.forEach(session => {
      const latestRequest = session.requests[session.requests.length - 1];
      const topic = latestRequest?.topic || 'Untitled';
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });
    const topTopics = Object.entries(topicCounts)
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Agent participation
    const agentStats: Record<string, { name: string; initiated: number; participated: number }> = {};
    filteredSessions.forEach(session => {
      // Initiator
      const initId = session.initiator.agentId;
      if (!agentStats[initId]) {
        agentStats[initId] = { name: session.initiator.agentName, initiated: 0, participated: 0 };
      }
      agentStats[initId].initiated++;
      
      // Participants
      session.participants.forEach(p => {
        if (!agentStats[p.agentId]) {
          agentStats[p.agentId] = { name: p.agentName, initiated: 0, participated: 0 };
        }
        agentStats[p.agentId].participated++;
      });
    });
    const agentParticipation = Object.entries(agentStats)
      .map(([agentId, stats]) => ({
        agentId,
        agentName: stats.name,
        sessionsInitiated: stats.initiated,
        sessionsParticipated: stats.participated,
      }))
      .sort((a, b) => (b.sessionsInitiated + b.sessionsParticipated) - (a.sessionsInitiated + a.sessionsParticipated));

    // Trend data (daily for 7d, weekly for 30d/90d)
    const trendMap: Record<string, { sessions: number; completed: number }> = {};
    filteredSessions.forEach(session => {
      const date = new Date(session.createdAt);
      let key: string;
      
      if (timeRange === '7d') {
        key = date.toLocaleDateString('en-US', { weekday: 'short' });
      } else {
        key = `Week ${Math.ceil(date.getDate() / 7)}`;
      }
      
      if (!trendMap[key]) {
        trendMap[key] = { sessions: 0, completed: 0 };
      }
      trendMap[key].sessions++;
      if (session.status === 'completed') {
        trendMap[key].completed++;
      }
    });
    const trendData = Object.entries(trendMap)
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Calculate averages
    const totalConfidence = filteredSessions.reduce((sum, s) => {
      const lastResponse = s.responses[s.responses.length - 1];
      return sum + (lastResponse?.confidence || 0);
    }, 0);
    const avgConfidence = filteredSessions.length > 0 ? totalConfidence / filteredSessions.length : 0;

    return {
      totalSessions: total,
      completedSessions: completed,
      inProgressSessions: inProgress,
      escalatedSessions: escalated,
      averageResponseTime: 2.5, // Placeholder
      averageConfidence: avgConfidence,
      sessionsByMode: byMode,
      sessionsByStatus: byStatus,
      sessionsByPriority: byPriority,
      topTopics,
      agentParticipation: agentParticipation.slice(0, 10),
      trendData,
    };
  }, [sessions, timeRange, selectedMode, selectedAgent]);

  const completionRate = analytics.totalSessions > 0 
    ? Math.round((analytics.completedSessions / analytics.totalSessions) * 100) 
    : 0;

  const StatCard = ({ 
    title, 
    value, 
    subtitle, 
    icon: Icon, 
    color, 
    trend 
  }: { 
    title: string; 
    value: string | number; 
    subtitle: string; 
    icon: any; 
    color: string;
    trend?: 'up' | 'down' | 'neutral';
  }) => (
    <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={[styles.statIconContainer, { backgroundColor: color + '20' }]}>
        <Icon size={20} color={color} />
      </View>
      <View style={styles.statContent}>
        <Text style={[styles.statValue, { color: theme.colors.text }]}>{value}</Text>
        <Text style={[styles.statTitle, { color: theme.colors.secondaryText }]}>{title}</Text>
      </View>
      {trend && (
        <View style={styles.trendContainer}>
          {trend === 'up' ? (
            <TrendingUp size={14} color="#34C759" />
          ) : trend === 'down' ? (
            <TrendingDown size={14} color="#FF3B30" />
          ) : null}
        </View>
      )}
    </View>
  );

  const ProgressBar = ({ 
    value, 
    total, 
    color 
  }: { 
    value: number; 
    total: number; 
    color: string 
  }) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    return (
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${percentage}%`, backgroundColor: color }
            ]} 
          />
        </View>
        <Text style={[styles.progressText, { color: theme.colors.secondaryText }]}>
          {Math.round(percentage)}%
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <LinearGradient colors={['#0f172a', '#1e293b']} style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Counseling Analytics</Text>
            <Text style={styles.headerSubtitle}>Performance Insights</Text>
          </View>
          <TouchableOpacity style={styles.exportButton}>
            <Download size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Filters */}
      <View style={[styles.filtersContainer, { backgroundColor: theme.colors.cardBackground }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContent}>
          {/* Time Range Filter */}
          <View style={styles.filterGroup}>
            <ListFilter size={14} color={theme.colors.secondaryText} />
            <View style={styles.filterButtons}>
              {(['7d', '30d', '90d', 'all'] as TimeRange[]).map(range => (
                <TouchableOpacity
                  key={range}
                  style={[
                    styles.filterChip,
                    timeRange === range && { backgroundColor: theme.colors.primary }
                  ]}
                  onPress={() => setTimeRange(range)}
                >
                  <Text 
                    style={[
                      styles.filterChipText,
                      { color: timeRange === range ? '#fff' : theme.colors.secondaryText }
                    ]}
                  >
                    {range === 'all' ? 'All Time' : range}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Mode Filter */}
          <View style={[styles.filterGroup, { marginLeft: 16 }]}>
            <Users size={14} color={theme.colors.secondaryText} />
            <View style={styles.filterButtons}>
              {(['all', 'main_to_sub', 'sub_to_main', 'peer_to_peer'] as CounselingMode[]).map(mode => (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.filterChip,
                    selectedMode === mode && { backgroundColor: theme.colors.primary }
                  ]}
                  onPress={() => setSelectedMode(mode)}
                >
                  <Text 
                    style={[
                      styles.filterChipText,
                      { color: selectedMode === mode ? '#fff' : theme.colors.secondaryText }
                    ]}
                  >
                    {mode === 'all' ? 'All' : mode.replace(/_/g, ' ')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Key Metrics */}
        <View style={styles.metricsGrid}>
          <StatCard
            title="Total Sessions"
            value={analytics.totalSessions}
            subtitle="All time"
            icon={MessageCircle}
            color="#007AFF"
            trend="up"
          />
          <StatCard
            title="Completed"
            value={analytics.completedSessions}
            subtitle={`${completionRate}% completion rate`}
            icon={CircleCheckBig}
            color="#34C759"
            trend="up"
          />
          <StatCard
            title="In Progress"
            value={analytics.inProgressSessions}
            subtitle="Active sessions"
            icon={Clock}
            color="#FF9500"
            trend="neutral"
          />
          <StatCard
            title="Escalated"
            value={analytics.escalatedSessions}
            subtitle="Require attention"
            icon={TriangleAlert}
            color="#FF3B30"
            trend="down"
          />
        </View>

        {/* Sessions by Mode */}
        <View style={[styles.sectionCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sessions by Mode</Text>
          <View style={styles.modeBreakdown}>
            {Object.entries(analytics.sessionsByMode).map(([mode, count]) => {
              const Icon = mode === 'main_to_sub' ? Crown : mode === 'sub_to_main' ? GitBranch : Target;
              const color = mode === 'main_to_sub' ? '#FFD700' : mode === 'sub_to_main' ? '#34C759' : '#007AFF';
              return (
                <View key={mode} style={styles.modeItem}>
                  <View style={[styles.modeIcon, { backgroundColor: color + '20' }]}>
                    <Icon size={16} color={color} />
                  </View>
                  <View style={styles.modeInfo}>
                    <Text style={[styles.modeLabel, { color: theme.colors.text }]}>
                      {mode.replace(/_/g, ' ').toUpperCase()}
                    </Text>
                    <ProgressBar value={count} total={analytics.totalSessions} color={color} />
                  </View>
                  <Text style={[styles.modeCount, { color: theme.colors.text }]}>{count}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Priority Distribution */}
        {Object.keys(analytics.sessionsByPriority).length > 0 && (
          <View style={[styles.sectionCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Priority Distribution</Text>
            <View style={styles.priorityGrid}>
              {Object.entries(analytics.sessionsByPriority).map(([priority, count]) => {
                const color = 
                  priority === 'emergency' || priority === 'critical' ? '#FF3B30' :
                  priority === 'high' ? '#FF9500' :
                  priority === 'medium' ? '#007AFF' : '#34C759';
                return (
                  <View key={priority} style={[styles.priorityItem, { backgroundColor: color + '15' }]}>
                    <Text style={[styles.priorityValue, { color }]}>{count}</Text>
                    <Text style={[styles.priorityLabel, { color: theme.colors.secondaryText }]}>
                      {priority.toUpperCase()}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Top Topics */}
        {analytics.topTopics.length > 0 && (
          <View style={[styles.sectionCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top Topics</Text>
            <View style={styles.topicsList}>
              {analytics.topTopics.map((item, index) => (
                <View key={index} style={styles.topicItem}>
                  <View style={[styles.topicRank, { backgroundColor: theme.colors.primary }]}>
                    <Text style={styles.topicRankText}>{index + 1}</Text>
                  </View>
                  <Text style={[styles.topicName, { color: theme.colors.text }]} numberOfLines={1}>
                    {item.topic}
                  </Text>
                  <View style={[styles.topicBadge, { backgroundColor: theme.colors.background }]}>
                    <Text style={[styles.topicCount, { color: theme.colors.secondaryText }]}>
                      {item.count} sessions
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Agent Participation */}
        {analytics.agentParticipation.length > 0 && (
          <View style={[styles.sectionCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Agent Participation</Text>
            <View style={styles.agentList}>
              {analytics.agentParticipation.map((agent, index) => {
                const agentDef = getAgentById(agent.agentId);
                return (
                  <TouchableOpacity 
                    key={agent.agentId} 
                    style={[
                      styles.agentItem,
                      selectedAgent === agent.agentId && { backgroundColor: theme.colors.primary + '15' }
                    ]}
                    onPress={() => setSelectedAgent(selectedAgent === agent.agentId ? null : agent.agentId)}
                  >
                    <View style={[styles.agentAvatar, { backgroundColor: theme.colors.primary }]}>
                      <Text style={styles.agentInitial}>{agent.agentName.charAt(0)}</Text>
                    </View>
                    <View style={styles.agentInfo}>
                      <Text style={[styles.agentName, { color: theme.colors.text }]}>
                        {agent.agentName}
                      </Text>
                      <Text style={[styles.agentRole, { color: theme.colors.secondaryText }]}>
                        {agentDef?.type === 'main_agent' ? 'Main Agent' : 'Subagent'}
                      </Text>
                    </View>
                    <View style={styles.agentStats}>
                      <View style={styles.agentStat}>
                        <Text style={[styles.agentStatValue, { color: theme.colors.primary }]}>
                          {agent.sessionsInitiated}
                        </Text>
                        <Text style={[styles.agentStatLabel, { color: theme.colors.secondaryText }]}>
                          Initiated
                        </Text>
                      </View>
                      <View style={styles.agentStat}>
                        <Text style={[styles.agentStatValue, { color: '#34C759' }]}>
                          {agent.sessionsParticipated}
                        </Text>
                        <Text style={[styles.agentStatLabel, { color: theme.colors.secondaryText }]}>
                          Participated
                        </Text>
                      </View>
                    </View>
                    <ChevronRight size={16} color={theme.colors.secondaryText} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Trend Chart */}
        {analytics.trendData.length > 0 && (
          <View style={[styles.sectionCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Session Trend</Text>
            <View style={styles.trendChart}>
              {analytics.trendData.map((point, index) => {
                const maxValue = Math.max(...analytics.trendData.map(d => d.sessions));
                const height = maxValue > 0 ? (point.sessions / maxValue) * 100 : 0;
                const completedHeight = maxValue > 0 ? (point.completed / maxValue) * 100 : 0;
                
                return (
                  <View key={index} style={styles.trendPoint}>
                    <View style={styles.trendBars}>
                      <View 
                        style={[
                          styles.trendBar, 
                          { 
                            height: `${height}%`, 
                            backgroundColor: '#007AFF',
                            opacity: 0.3
                          }
                        ]} 
                      />
                      <View 
                        style={[
                          styles.trendBar, 
                          { 
                            height: `${completedHeight}%`, 
                            backgroundColor: '#34C759',
                            position: 'absolute',
                            bottom: 0
                          }
                        ]} 
                      />
                    </View>
                    <Text style={[styles.trendLabel, { color: theme.colors.secondaryText }]}>
                      {point.date}
                    </Text>
                    <Text style={[styles.trendValue, { color: theme.colors.text }]}>
                      {point.sessions}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.trendLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#007AFF', opacity: 0.3 }]} />
                <Text style={[styles.legendText, { color: theme.colors.secondaryText }]}>Total</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#34C759' }]} />
                <Text style={[styles.legendText, { color: theme.colors.secondaryText }]}>Completed</Text>
              </View>
            </View>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    paddingHorizontal: 20, 
    paddingBottom: 16,
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30,
  },
  navBar: { 
    flexDirection: 'row', 
    alignItems: 'center',
  },
  backButton: { 
    width: 40, 
    height: 40, 
    borderRadius: 12, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  headerTitleContainer: { flex: 1, marginLeft: 15 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#fff' },
  headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  exportButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 12,
  },
  filtersContent: {
    paddingHorizontal: 4,
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 6,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: { 
    flex: 1, 
    padding: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 56) / 2,
    padding: 14,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statContent: {
    flex: 1,
    marginLeft: 12,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
  },
  statTitle: {
    fontSize: 12,
    marginTop: 2,
  },
  trendContainer: {
    marginLeft: 8,
  },
  sectionCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 16,
  },
  modeBreakdown: {
    gap: 14,
  },
  modeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  modeLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  modeCount: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 12,
    minWidth: 30,
    textAlign: 'right',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    minWidth: 35,
    textAlign: 'right',
  },
  priorityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  priorityItem: {
    flex: 1,
    minWidth: 70,
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  priorityValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  priorityLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  topicsList: {
    gap: 10,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  topicRank: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicRankText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  topicName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 12,
  },
  topicBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  topicCount: {
    fontSize: 11,
    fontWeight: '600',
  },
  agentList: {
    gap: 8,
  },
  agentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  agentAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  agentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '600',
  },
  agentRole: {
    fontSize: 11,
    marginTop: 2,
  },
  agentStats: {
    flexDirection: 'row',
    gap: 16,
    marginRight: 8,
  },
  agentStat: {
    alignItems: 'center',
  },
  agentStatValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  agentStatLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  trendChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  trendPoint: {
    flex: 1,
    alignItems: 'center',
  },
  trendBars: {
    width: 24,
    height: 100,
    position: 'relative',
  },
  trendBar: {
    width: '100%',
    borderRadius: 4,
  },
  trendLabel: {
    fontSize: 10,
    marginTop: 8,
  },
  trendValue: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  trendLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
  },
});
