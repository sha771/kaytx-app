import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Check, Clock, X, AlertCircle } from 'lucide-react-native';
import { ActivityFeedProps } from './types';

export default function ActivityFeed({ activities, maxItems = 5 }: ActivityFeedProps) {
  const { theme } = useTheme();
  const displayActivities = activities.slice(0, maxItems);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return Check;
      case 'processing': return Clock;
      case 'failed': return X;
      default: return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#22C55E';
      case 'processing': return theme.colors.primary;
      case 'failed': return '#EF4444';
      default: return theme.colors.textSecondary;
    }
  };

  const getImpactColor = (impact?: string) => {
    switch (impact) {
      case 'critical': return '#EF4444';
      case 'high': return '#F59E0B';
      case 'medium': return theme.colors.primary;
      case 'low': return '#22C55E';
      default: return theme.colors.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Recent Activity
      </Text>
      
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {displayActivities.map((activity) => {
          const Icon = getStatusIcon(activity.status);
          const statusColor = getStatusColor(activity.status);
          
          return (
            <View key={activity.id} style={[styles.activityItem, { borderBottomColor: theme.colors.border }]}>
              <View style={[styles.iconContainer, { backgroundColor: statusColor + '20' }]}>
                <Icon size={14} color={statusColor} />
              </View>
              
              <View style={styles.activityContent}>
                <Text style={[styles.task, { color: theme.colors.text }]} numberOfLines={2}>
                  {activity.task}
                </Text>
                
                <View style={styles.metaRow}>
                  <Text style={[styles.time, { color: theme.colors.textSecondary }]}>
                    {activity.time}
                  </Text>
                  {activity.agent && (
                    <Text style={[styles.agent, { color: theme.colors.textSecondary }]}>
                      • {activity.agent}
                    </Text>
                  )}
                  {activity.impact && (
                    <View style={[styles.impactBadge, { backgroundColor: getImpactColor(activity.impact) + '20' }]}>
                      <Text style={[styles.impactText, { color: getImpactColor(activity.impact) }]}>
                        {activity.impact}
                      </Text>
                    </View>
                  )}
                </View>
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
    padding: 16,
    borderRadius: 12,
    maxHeight: 300,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  scrollContent: {
    maxHeight: 240,
  },
  activityItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  task: {
    fontSize: 13,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  time: {
    fontSize: 11,
  },
  agent: {
    fontSize: 11,
  },
  impactBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
