import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, UserPlus, FileText, Award, BookOpen, MessageSquare, TrendingUp, Clock, Sparkles, Flame, Zap } from 'lucide-react-native';

interface ActivityItem {
  id: string;
  type: 'application' | 'candidate' | 'onboarding' | 'performance' | 'training' | 'survey' | 'promotion';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
  department?: string;
}

interface RealTimeHRActivityFeedProps {
  activities: ActivityItem[];
}

export default function RealTimeHRActivityFeed({ activities }: RealTimeHRActivityFeedProps) {
  const { theme } = useTheme();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'application':
        return <FileText size={16} color="#3B82F6" />;
      case 'candidate':
        return <UserPlus size={16} color="#10B981" />;
      case 'onboarding':
        return <UserPlus size={16} color="#8B5CF6" />;
      case 'performance':
        return <Award size={16} color="#F59E0B" />;
      case 'training':
        return <BookOpen size={16} color="#06B6D4" />;
      case 'survey':
        return <MessageSquare size={16} color="#EC4899" />;
      case 'promotion':
        return <TrendingUp size={16} color="#10B981" />;
      default:
        return <Activity size={16} color="#6B7280" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'application':
        return '#3B82F6';
      case 'candidate':
        return '#10B981';
      case 'onboarding':
        return '#8B5CF6';
      case 'performance':
        return '#F59E0B';
      case 'training':
        return '#06B6D4';
      case 'survey':
        return '#EC4899';
      case 'promotion':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffMs = now.getTime() - activityTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: '#06B6D4' + '20' }]}>
          <Activity size={24} color="#06B6D4" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Real-Time HR Activity Feed
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Live People Operations
          </Text>
        </View>
        <View style={[styles.liveIndicator, { backgroundColor: '#10B981' + '20', borderColor: '#10B981' + '30', borderWidth: 1 }]}>
          <View style={[styles.liveDot, { backgroundColor: '#10B981' }]} />
          <Text style={[styles.liveText, { color: '#10B981' }]}>
            Live
          </Text>
        </View>
      </View>

      <ScrollView style={styles.feedScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.feedList}>
          {activities.map((activity, index) => (
            <View key={activity.id} style={[styles.feedItem, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: getActivityColor(activity.type) + '20', borderWidth: 1 }]}>
              <View style={[styles.iconContainer, { backgroundColor: getActivityColor(activity.type) + '15' }]}>
                {getActivityIcon(activity.type)}
              </View>
              
              <View style={styles.feedContent}>
                <View style={styles.feedHeader}>
                  <Text style={[styles.feedTitle, { color: theme.colors.text }]}>
                    {activity.title}
                  </Text>
                  <View style={styles.timestampRow}>
                    <Clock size={12} color={theme.colors.textSecondary} />
                    <Text style={[styles.timestamp, { color: theme.colors.textSecondary }]}>
                      {formatTimestamp(activity.timestamp)}
                    </Text>
                  </View>
                </View>
                
                <Text style={[styles.feedDescription, { color: theme.colors.textSecondary }]}>
                  {activity.description}
                </Text>
                
                {(activity.user || activity.department) && (
                  <View style={styles.feedMeta}>
                    {activity.user && (
                      <View style={styles.metaItem}>
                        <Text style={[styles.metaLabel, { color: theme.colors.textSecondary }]}>
                          {activity.user}
                        </Text>
                      </View>
                    )}
                    {activity.department && (
                      <View style={styles.metaItem}>
                        <Text style={[styles.metaValue, { color: theme.colors.text }]}>
                          {activity.department}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.activitySummary, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.summaryItem}>
          <Flame size={14} color="#F59E0B" />
          <Text style={[styles.summaryText, { color: theme.colors.textSecondary }]}>
            12 activities today
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Sparkles size={14} color="#10B981" />
          <Text style={[styles.summaryText, { color: theme.colors.textSecondary }]}>
            5 onboarding completions
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Zap size={14} color="#3B82F6" />
          <Text style={[styles.summaryText, { color: theme.colors.textSecondary }]}>
            3 new hires
          </Text>
        </View>
      </View>
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
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '600',
  },
  feedScroll: {
    maxHeight: 350,
  },
  feedList: {
    gap: 12,
  },
  feedItem: {
    flexDirection: 'row',
    gap: 14,
    padding: 16,
    borderRadius: 14,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedContent: {
    flex: 1,
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  feedTitle: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  timestampRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timestamp: {
    fontSize: 10,
    opacity: 0.7,
  },
  feedDescription: {
    fontSize: 11,
    opacity: 0.8,
    marginBottom: 8,
    lineHeight: 16,
  },
  feedMeta: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 10,
    opacity: 0.7,
  },
  metaValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  activitySummary: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    marginTop: 16,
  },
  summaryItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  summaryText: {
    fontSize: 11,
    opacity: 0.8,
    flex: 1,
  },
});