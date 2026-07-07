import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { GitCommit, GitPullRequest, Rocket, AlertTriangle, Shield, Server, CheckCircle, Clock, Code, Activity, Zap } from 'lucide-react-native';

interface EngineeringActivity {
  id: string;
  type: 'commit' | 'pr' | 'build' | 'deployment' | 'incident' | 'security' | 'infrastructure' | 'code_review';
  title: string;
  description: string;
  user: string;
  service: string;
  timestamp: string;
  status: 'success' | 'failed' | 'pending' | 'active';
}

interface RealTimeEngineeringActivityProps {
  activities: EngineeringActivity[];
}

export default function RealTimeEngineeringActivity({ activities }: RealTimeEngineeringActivityProps) {
  const { theme } = useTheme();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'commit':
        return GitCommit;
      case 'pr':
        return GitPullRequest;
      case 'build':
        return Activity;
      case 'deployment':
        return Rocket;
      case 'incident':
        return AlertTriangle;
      case 'security':
        return Shield;
      case 'infrastructure':
        return Server;
      case 'code_review':
        return Code;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'commit':
        return '#10B981';
      case 'pr':
        return '#8B5CF6';
      case 'build':
        return '#3B82F6';
      case 'deployment':
        return '#F59E0B';
      case 'incident':
        return '#EF4444';
      case 'security':
        return '#EF4444';
      case 'infrastructure':
        return '#06B6D4';
      case 'code_review':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return '#10B981';
      case 'failed':
        return '#EF4444';
      case 'pending':
        return '#F59E0B';
      case 'active':
        return '#3B82F6';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return CheckCircle;
      case 'failed':
        return AlertTriangle;
      case 'pending':
        return Clock;
      case 'active':
        return Zap;
      default:
        return Activity;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={[styles.liveText, { color: '#10B981' }]}>
              LIVE
            </Text>
          </View>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Real-Time Engineering Activity
          </Text>
        </View>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          {activities.length} events today
        </Text>
      </View>

      <View style={styles.activityFeed}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {activities.map((activity, index) => {
            const ActivityIcon = getActivityIcon(activity.type);
            const activityColor = getActivityColor(activity.type);
            const StatusIcon = getStatusIcon(activity.status);
            const statusColor = getStatusColor(activity.status);
            
            return (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityTimeline}>
                  <View style={[styles.activityDot, { backgroundColor: activityColor + '20' }]}>
                    <ActivityIcon size={16} color={activityColor} />
                  </View>
                  {index < activities.length - 1 && (
                    <View style={styles.activityLine} />
                  )}
                </View>

                <View style={[styles.activityCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                  <View style={styles.activityHeader}>
                    <View style={styles.activityInfo}>
                      <Text style={[styles.activityTitle, { color: theme.colors.text }]}>
                        {activity.title}
                      </Text>
                      <Text style={[styles.activityDescription, { color: theme.colors.textSecondary }]}>
                        {activity.description}
                      </Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
                      <StatusIcon size={12} color={statusColor} />
                      <Text style={[styles.statusText, { color: statusColor }]}>
                        {activity.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.activityMeta}>
                    <View style={styles.metaItem}>
                      <Code size={12} color="#8B5CF6" />
                      <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                        {activity.service}
                      </Text>
                    </View>

                    <View style={styles.metaItem}>
                      <Activity size={12} color="#3B82F6" />
                      <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                        {activity.user}
                      </Text>
                    </View>

                    <View style={styles.metaItem}>
                      <Clock size={12} color="#F59E0B" />
                      <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                        {activity.timestamp}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.filterSection}>
        <Text style={[styles.filterTitle, { color: theme.colors.text }]}>
          Activity Filters
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterRow}>
            {['All', 'Commits', 'Deployments', 'Incidents', 'Security', 'Infrastructure'].map((filter) => (
              <View key={filter} style={[styles.filterChip, { backgroundColor: filter === 'All' ? '#3B82F6' + '20' : 'rgba(255,255,255,0.05)' }]}>
                <Text style={[styles.filterText, { color: filter === 'All' ? '#3B82F6' : theme.colors.textSecondary }]}>
                  {filter}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.statsSection}>
        <Text style={[styles.statsTitle, { color: theme.colors.text }]}>
          Activity Statistics
        </Text>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <GitCommit size={20} color="#10B981" />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {activities.filter(a => a.type === 'commit').length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Commits
            </Text>
          </View>

          <View style={styles.statCard}>
            <Rocket size={20} color="#F59E0B" />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {activities.filter(a => a.type === 'deployment').length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Deployments
            </Text>
          </View>

          <View style={styles.statCard}>
            <AlertTriangle size={20} color="#EF4444" />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {activities.filter(a => a.type === 'incident').length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Incidents
            </Text>
          </View>

          <View style={styles.statCard}>
            <Shield size={20} color="#8B5CF6" />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {activities.filter(a => a.type === 'security').length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Security Events
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 12,
    opacity: 0.7,
  },
  activityFeed: {
    maxHeight: 400,
    marginBottom: 20,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  activityTimeline: {
    width: 40,
    alignItems: 'center',
  },
  activityDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityLine: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginTop: 4,
  },
  activityCard: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 11,
    opacity: 0.7,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '600',
  },
  activityMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 10,
    opacity: 0.7,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  filterText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statsSection: {
    marginTop: 8,
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    opacity: 0.7,
  }
});