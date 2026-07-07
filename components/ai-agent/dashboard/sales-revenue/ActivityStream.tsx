import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Clock, User, Building2, CheckCircle, AlertCircle, DollarSign, Calendar } from 'lucide-react-native';

interface Activity {
  id: string;
  event: string;
  entity: string;
  time: string;
  type: 'lead' | 'opportunity' | 'deal' | 'revenue';
}

interface ActivityStreamProps {
  activities: Activity[];
}

export default function ActivityStream({ activities }: ActivityStreamProps) {
  const { theme } = useTheme();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lead':
        return User;
      case 'opportunity':
        return Building2;
      case 'deal':
        return CheckCircle;
      case 'revenue':
        return DollarSign;
      default:
        return Clock;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'lead':
        return '#3B82F6';
      case 'opportunity':
        return '#8B5CF6';
      case 'deal':
        return '#F59E0B';
      case 'revenue':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Clock size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Activity Stream
        </Text>
        <View style={[styles.liveIndicator, { backgroundColor: '#10B981' + '20' }]}>
          <View style={[styles.liveDot, { backgroundColor: '#10B981' }]} />
          <Text style={[styles.liveText, { color: '#10B981' }]}>
            LIVE
          </Text>
        </View>
      </View>

      <ScrollView style={styles.activitiesList} showsVerticalScrollIndicator={false}>
        {activities.map((activity, index) => {
          const ActivityIcon = getActivityIcon(activity.type);
          const activityColor = getActivityColor(activity.type);
          
          return (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityLeft}>
                <View style={[styles.activityIcon, { backgroundColor: activityColor + '20' }]}>
                  <ActivityIcon size={14} color={activityColor} />
                </View>
                {index < activities.length - 1 && (
                  <View style={[styles.activityLine, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
                )}
              </View>
              
              <View style={styles.activityContent}>
                <View style={styles.activityHeader}>
                  <Text style={[styles.activityEvent, { color: theme.colors.text }]}>
                    {activity.event}
                  </Text>
                  <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>
                    {activity.time}
                  </Text>
                </View>
                <Text style={[styles.activityEntity, { color: activityColor }]}>
                  {activity.entity}
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
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 'auto',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
  },
  activitiesList: {
    maxHeight: 300,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  activityLeft: {
    alignItems: 'center',
    marginRight: 12,
  },
  activityIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityLine: {
    width: 2,
    flex: 1,
    marginTop: 4,
  },
  activityContent: {
    flex: 1,
    paddingBottom: 16,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityEvent: {
    fontSize: 13,
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 11,
  },
  activityEntity: {
    fontSize: 12,
    fontWeight: '600',
  }
});