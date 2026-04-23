import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useCounselingDashboard } from '../hooks/useEnhancedCounseling';
import { AnimatedCard, Skeleton, StatusIndicator } from '../../components/ai-agent/CounselingAnimations';

export default function CounselingDashboardScreen() {
  const { notifications, templates, calendar, isLoading, error } = useCounselingDashboard('current-agent-id');

  const quickActions = [
    {
      title: 'New Session',
      description: 'Start a counseling session',
      icon: '💬',
      color: '#6366f1',
      onPress: () => {
        // Navigate to create session
      },
    },
    {
      title: 'Templates',
      description: 'Browse counseling templates',
      icon: '📋',
      color: '#22c55e',
      onPress: () => {
        // Navigate to templates
      },
    },
    {
      title: 'Analytics',
      description: 'View counseling analytics',
      icon: '📊',
      color: '#f59e0b',
      onPress: () => {
        // Navigate to analytics
      },
    },
    {
      title: 'Bulk Operations',
      description: 'Manage bulk counseling',
      icon: '⚡',
      color: '#ef4444',
      onPress: () => {
        // Navigate to bulk operations
      },
    },
  ];

  const renderNotificationItem = (notification: any) => (
    <View key={notification.id} style={styles.notificationItem}>
      <Text style={styles.notificationIcon}>
        {notification.type === 'session_created' ? '📋' :
         notification.type === 'response_received' ? '💬' :
         notification.type === 'milestone_reached' ? '🎯' : '📢'}
      </Text>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationMessage} numberOfLines={1}>
          {notification.message}
        </Text>
      </View>
      <View style={styles.notificationTime}>
        <Text style={styles.timeText}>
          {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

  const renderTemplateItem = (template: any) => (
    <View key={template.id} style={styles.templateItem}>
      <Text style={styles.templateName}>{template.name}</Text>
      <Text style={styles.templateCategory}>{template.category}</Text>
    </View>
  );

  const renderCalendarItem = (event: any) => (
    <View key={event.id} style={styles.calendarItem}>
      <Text style={styles.calendarTime}>
        {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
      <Text style={styles.calendarTitle}>{event.title}</Text>
      <StatusIndicator
        status={event.status === 'scheduled' ? 'online' : 'busy'}
        size={8}
      />
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Counseling Dashboard</Text>
        <View style={styles.quickActions}>
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} height={80} style={styles.skeletonCard} />
          ))}
        </View>
        <View style={styles.widgetsRow}>
          <Skeleton height={200} style={styles.skeletonWidget} />
          <Skeleton height={200} style={styles.skeletonWidget} />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load dashboard</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Counseling Dashboard</Text>
        <TouchableOpacity style={styles.refreshButton}>
          <Text style={styles.refreshText}>↻</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quickActions.map(action => (
            <TouchableOpacity
              key={action.title}
              style={[styles.quickActionCard, { backgroundColor: action.color }]}
              onPress={action.onPress}
            >
              <Text style={styles.quickActionIcon}>{action.icon}</Text>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
              <Text style={styles.quickActionDescription}>{action.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Widgets Row */}
      <View style={styles.widgetsRow}>
        {/* Notifications Widget */}
        <AnimatedCard style={styles.widget}>
          <View style={styles.widgetHeader}>
            <Text style={styles.widgetTitle}>Recent Notifications</Text>
            <TouchableOpacity>
              <Text style={styles.widgetLink}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.widgetContent}>
            {notifications?.data?.slice(0, 5).map(renderNotificationItem)}
            {(!notifications?.data || notifications.data.length === 0) && (
              <Text style={styles.emptyText}>No notifications</Text>
            )}
          </ScrollView>
        </AnimatedCard>

        {/* Templates Widget */}
        <AnimatedCard style={styles.widget}>
          <View style={styles.widgetHeader}>
            <Text style={styles.widgetTitle}>Recommended Templates</Text>
            <TouchableOpacity>
              <Text style={styles.widgetLink}>Browse</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.widgetContent}>
            {templates?.data?.slice(0, 5).map(renderTemplateItem)}
            {(!templates?.data || templates.data.length === 0) && (
              <Text style={styles.emptyText}>No templates available</Text>
            )}
          </ScrollView>
        </AnimatedCard>
      </View>

      {/* Calendar Widget */}
      <AnimatedCard style={styles.fullWidthWidget}>
        <View style={styles.widgetHeader}>
          <Text style={styles.widgetTitle}>Upcoming Sessions</Text>
          <TouchableOpacity>
            <Text style={styles.widgetLink}>Calendar</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.widgetContent}>
          {calendar?.events?.slice(0, 5).map(renderCalendarItem)}
          {(!calendar?.events || calendar.events.length === 0) && (
            <Text style={styles.emptyText}>No upcoming sessions</Text>
          )}
        </ScrollView>
      </AnimatedCard>

      {/* Stats Overview */}
      <AnimatedCard style={styles.fullWidthWidget}>
        <View style={styles.widgetHeader}>
          <Text style={styles.widgetTitle}>Overview</Text>
        </View>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Active Sessions</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Completed Today</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Pending Reviews</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>95%</Text>
            <Text style={styles.statLabel}>Satisfaction</Text>
          </View>
        </View>
      </AnimatedCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  refreshButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshText: {
    fontSize: 16,
    color: '#6b7280',
  },
  quickActions: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  quickActionCard: {
    width: 140,
    height: 100,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  quickActionDescription: {
    fontSize: 11,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  widgetsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  widget: {
    flex: 1,
    maxHeight: 250,
  },
  fullWidthWidget: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  widgetTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  widgetLink: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '500',
  },
  widgetContent: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  notificationIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  notificationMessage: {
    fontSize: 12,
    color: '#6b7280',
  },
  notificationTime: {
    marginLeft: 8,
  },
  timeText: {
    fontSize: 11,
    color: '#9ca3af',
  },
  templateItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  templateName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  templateCategory: {
    fontSize: 12,
    color: '#6b7280',
  },
  calendarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  calendarTime: {
    fontSize: 12,
    color: '#6b7280',
    width: 50,
  },
  calendarTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    flex: 1,
    marginHorizontal: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    paddingVertical: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 40,
  },
  skeletonCard: {
    width: 140,
    height: 100,
    marginHorizontal: 10,
    borderRadius: 12,
  },
  skeletonWidget: {
    flex: 1,
    height: 200,
    borderRadius: 12,
  },
});
