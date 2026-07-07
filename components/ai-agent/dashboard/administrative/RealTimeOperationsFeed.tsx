import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, CheckCircle, Clock, Calendar, FileText, Zap, Users, AlertTriangle, Sparkles, TrendingUp, ChevronRight } from 'lucide-react-native';

interface OperationEvent {
  id: string;
  type: 'meeting' | 'task' | 'workflow' | 'approval' | 'document' | 'vendor' | 'facility' | 'system';
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'in_progress' | 'pending';
  icon: string;
}

interface RealTimeOperationsFeedProps {
  events: OperationEvent[];
}

export default function RealTimeOperationsFeed({ events }: RealTimeOperationsFeedProps) {
  const { theme } = useTheme();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <Calendar size={16} color="#3B82F6" />;
      case 'task': return <CheckCircle size={16} color="#10B981" />;
      case 'workflow': return <Zap size={16} color="#8B5CF6" />;
      case 'approval': return <FileText size={16} color="#F59E0B" />;
      case 'document': return <FileText size={16} color="#06B6D4" />;
      case 'vendor': return <Users size={16} color="#EC4899" />;
      case 'facility': return <AlertTriangle size={16} color="#EF4444" />;
      case 'system': return <Activity size={16} color="#6B7280" />;
      default: return <Activity size={16} color="#6B7280" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'in_progress': return '#3B82F6';
      case 'pending': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={12} color="#10B981" />;
      case 'in_progress': return <Clock size={12} color="#3B82F6" />;
      case 'pending': return <Clock size={12} color="#F59E0B" />;
      default: return <Clock size={12} color="#6B7280" />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Activity size={24} color="#8B5CF6" />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Real-Time Operations Feed
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Live administrative updates
            </Text>
          </View>
        </View>
        <View style={[styles.liveBadge, { backgroundColor: '#EF4444' + '20' }]}>
          <View style={[styles.liveDot, { backgroundColor: '#EF4444' }]} />
          <Text style={[styles.liveText, { color: '#EF4444' }]}>
            LIVE
          </Text>
          <Text style={[styles.liveTime, { color: theme.colors.textSecondary }]}>
            {currentTime}
          </Text>
        </View>
      </View>

      <View style={styles.filterBar}>
        <View style={[styles.filterChip, { backgroundColor: '#8B5CF6' + '20', borderColor: '#8B5CF6' + '50' }]}>
          <Text style={[styles.filterChipText, { color: '#8B5CF6' }]}>
            All Events
          </Text>
        </View>
        <View style={[styles.filterChip, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
          <Text style={[styles.filterChipText, { color: theme.colors.textSecondary }]}>
            Meetings
          </Text>
        </View>
        <View style={[styles.filterChip, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
          <Text style={[styles.filterChipText, { color: theme.colors.textSecondary }]}>
            Tasks
          </Text>
        </View>
        <View style={[styles.filterChip, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
          <Text style={[styles.filterChipText, { color: theme.colors.textSecondary }]}>
            Approvals
          </Text>
        </View>
      </View>

      <ScrollView style={styles.eventsScroll} showsVerticalScrollIndicator={false}>
        {events.map((event, index) => (
          <View key={event.id} style={styles.eventCard}>
            <View style={styles.eventLeft}>
              <View style={[styles.eventIcon, { backgroundColor: getStatusColor(event.status) + '20' }]}>
                {getTypeIcon(event.type)}
              </View>
              <View style={styles.eventTimeline}>
                <View style={[styles.timelineDot, { backgroundColor: getStatusColor(event.status) }]} />
                {index < events.length - 1 && <View style={[styles.timelineLine, { backgroundColor: 'rgba(255,255,255,0.08)' }]} />}
              </View>
            </View>

            <View style={styles.eventContent}>
              <View style={styles.eventHeader}>
                <Text style={[styles.eventTitle, { color: theme.colors.text }]}>
                  {event.title}
                </Text>
                {getStatusDot(event.status)}
              </View>

              <Text style={[styles.eventDescription, { color: theme.colors.textSecondary }]}>
                {event.description}
              </Text>

              <View style={styles.eventMeta}>
                <Text style={[styles.eventTimestamp, { color: theme.colors.textSecondary }]}>
                  {event.timestamp}
                </Text>
                <Text style={[styles.eventIconText, { color: theme.colors.textSecondary }]}>
                  {event.icon}
                </Text>
              </View>
            </View>

            <View style={styles.eventAction}>
              <ChevronRight size={16} color="#6B7280" />
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.summarySection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
        <View style={styles.summaryHeader}>
          <TrendingUp size={20} color="#8B5CF6" />
          <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>
            Today's Activity
          </Text>
        </View>
        <View style={styles.summaryStats}>
          <View style={styles.summaryStat}>
            <Text style={[styles.summaryStatValue, { color: theme.colors.text }]}>
              {events.filter(e => e.status === 'completed').length}
            </Text>
            <Text style={[styles.summaryStatLabel, { color: theme.colors.textSecondary }]}>
              Completed
            </Text>
          </View>
          <View style={styles.summaryStat}>
            <Text style={[styles.summaryStatValue, { color: theme.colors.text }]}>
              {events.filter(e => e.status === 'in_progress').length}
            </Text>
            <Text style={[styles.summaryStatLabel, { color: theme.colors.textSecondary }]}>
              In Progress
            </Text>
          </View>
          <View style={styles.summaryStat}>
            <Text style={[styles.summaryStatValue, { color: theme.colors.text }]}>
              {events.filter(e => e.status === 'pending').length}
            </Text>
            <Text style={[styles.summaryStatLabel, { color: theme.colors.textSecondary }]}>
              Pending
            </Text>
          </View>
          <View style={styles.summaryStat}>
            <Text style={[styles.summaryStatValue, { color: theme.colors.text }]}>
              {events.length}
            </Text>
            <Text style={[styles.summaryStatLabel, { color: theme.colors.textSecondary }]}>
              Total Events
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    maxHeight: 700,
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
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '700',
  },
  liveTime: {
    fontSize: 11,
    marginLeft: 4,
  },
  filterBar: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  eventsScroll: {
    marginBottom: 16,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  eventLeft: {
    alignItems: 'center',
  },
  eventIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventTimeline: {
    alignItems: 'center',
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  timelineLine: {
    width: 2,
    height: 40,
    marginTop: 4,
  },
  eventContent: {
    flex: 1,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  eventDescription: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 16,
  },
  eventMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventTimestamp: {
    fontSize: 10,
  },
  eventIconText: {
    fontSize: 14,
  },
  eventAction: {
    marginTop: 4,
  },
  summarySection: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryStat: {
    alignItems: 'center',
  },
  summaryStatValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  summaryStatLabel: {
    fontSize: 10,
  },
});
