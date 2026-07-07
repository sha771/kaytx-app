import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface ProductActivity {
  id: string;
  type: 'user' | 'feature' | 'experiment' | 'feedback' | 'bug' | 'release' | 'insight';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
}

interface ProductActivityStreamProps {
  activities: ProductActivity[];
}

export default function ProductActivityStream({ activities }: ProductActivityStreamProps) {
  const { theme } = useTheme();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return '👤';
      case 'feature': return '⚡';
      case 'experiment': return '🧪';
      case 'feedback': return '💬';
      case 'bug': return '🐛';
      case 'release': return '🚀';
      case 'insight': return '💡';
      default: return '📌';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user': return '#3B82F6';
      case 'feature': return '#8B5CF6';
      case 'experiment': return '#F59E0B';
      case 'feedback': return '#06B6D4';
      case 'bug': return '#EF4444';
      case 'release': return '#22C55E';
      case 'insight': return '#EC4899';
      default: return '#6B7280';
    }
  };

  const groupedActivities = {
    today: activities.filter(a => a.timestamp.includes('today') || a.timestamp.includes('minutes ago') || a.timestamp.includes('hours ago')),
    earlier: activities.filter(a => a.timestamp.includes('yesterday') || a.timestamp.includes('days ago')),
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Real-time Product Activity Stream
      </Text>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Activity Type Filter */}
        <View style={[styles.filterCard, { backgroundColor: theme.colors.background }]}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            {['All', 'Users', 'Features', 'Experiments', 'Feedback', 'Bugs', 'Releases', 'Insights'].map((filter) => (
              <View 
                key={filter}
                style={[styles.filterChip, { 
                  backgroundColor: filter === 'All' ? `${theme.colors.primary}20` : 'rgba(255,255,255,0.05)',
                  borderColor: filter === 'All' ? theme.colors.primary : 'transparent'
                }]}
              >
                <Text style={[
                  styles.filterText, 
                  { color: filter === 'All' ? theme.colors.primary : theme.colors.textSecondary }
                ]}>
                  {filter}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Today's Activities */}
        <View style={styles.activitySection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Today
          </Text>
          {groupedActivities.today.map((activity, index) => (
            <View key={activity.id}>
              <View style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: `${getActivityColor(activity.type)}20` }]}>
                  <Text style={styles.iconText}>{getActivityIcon(activity.type)}</Text>
                </View>
                <View style={styles.activityContent}>
                  <View style={styles.activityHeader}>
                    <Text style={[styles.activityTitle, { color: theme.colors.text }]}>
                      {activity.title}
                    </Text>
                    <Text style={[styles.activityTimestamp, { color: theme.colors.textSecondary }]}>
                      {activity.timestamp}
                    </Text>
                  </View>
                  <Text style={[styles.activityDescription, { color: theme.colors.textSecondary }]}>
                    {activity.description}
                  </Text>
                  {activity.user && (
                    <Text style={[styles.activityUser, { color: theme.colors.primary }]}>
                      {activity.user}
                    </Text>
                  )}
                </View>
              </View>
              {index < groupedActivities.today.length - 1 && (
                <View style={[styles.separator, { backgroundColor: 'rgba(255,255,255,0.05)' }]} />
              )}
            </View>
          ))}
        </View>

        {/* Earlier Activities */}
        {groupedActivities.earlier.length > 0 && (
          <View style={styles.activitySection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Earlier
            </Text>
            {groupedActivities.earlier.map((activity, index) => (
              <View key={activity.id}>
                <View style={[styles.activityItem, { opacity: 0.7 }]}>
                  <View style={[styles.activityIcon, { backgroundColor: `${getActivityColor(activity.type)}20` }]}>
                    <Text style={styles.iconText}>{getActivityIcon(activity.type)}</Text>
                  </View>
                  <View style={styles.activityContent}>
                    <View style={styles.activityHeader}>
                      <Text style={[styles.activityTitle, { color: theme.colors.text }]}>
                        {activity.title}
                      </Text>
                      <Text style={[styles.activityTimestamp, { color: theme.colors.textSecondary }]}>
                        {activity.timestamp}
                      </Text>
                    </View>
                    <Text style={[styles.activityDescription, { color: theme.colors.textSecondary }]}>
                      {activity.description}
                    </Text>
                  </View>
                </View>
                {index < groupedActivities.earlier.length - 1 && (
                  <View style={[styles.separator, { backgroundColor: 'rgba(255,255,255,0.05)' }]} />
                )}
              </View>
            ))}
          </View>
        )}

        {/* Live Indicator */}
        <View style={[styles.liveIndicator, { backgroundColor: theme.colors.background }]}>
          <View style={[styles.liveDot, { backgroundColor: '#EF4444' }]} />
          <Text style={[styles.liveText, { color: theme.colors.textSecondary }]}>
            Live updates • {activities.length} activities today
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  scrollContainer: {
    maxHeight: 600,
  },
  filterCard: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  filterScroll: {
    marginHorizontal: -8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 8,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
  },
  activitySection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  activityItem: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  activityTimestamp: {
    fontSize: 11,
    marginLeft: 8,
  },
  activityDescription: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 4,
  },
  activityUser: {
    fontSize: 11,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    marginVertical: 8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  liveText: {
    fontSize: 11,
  },
});
