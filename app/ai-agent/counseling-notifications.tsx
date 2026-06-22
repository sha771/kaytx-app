import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { useCounselingNotifications, useMarkNotificationAsRead } from '../hooks/useEnhancedCounseling';
import { AnimatedCard, AnimatedButton, StatusIndicator } from '@/components/ai-agent/CounselingAnimations';

export default function CounselingNotificationsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);
  
  const { data: notifications, isLoading, error, refetch } = useCounselingNotifications({
    unreadOnly: selectedFilter === 'unread',
  });
  
  const markAsReadMutation = useMarkNotificationAsRead();

  const filters = [
    { value: 'all', label: 'All Notifications' },
    { value: 'unread', label: 'Unread' },
    { value: 'session_created', label: 'New Sessions' },
    { value: 'response_received', label: 'Responses' },
    { value: 'milestone_reached', label: 'Milestones' },
  ];

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markAsReadMutation.mutateAsync({ notificationId });
    } catch {
      Alert.alert('Error', 'Failed to mark notification as read');
    }

  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const getNotificationIcon = (type: string) => {
    const iconMap: Record<string, string> = {
      session_created: '📋',
      response_received: '💬',
      session_completed: '✅',
      session_escalated: '⚠️',
      milestone_reached: '🎯',
      achievement_unlocked: '🏆',
      counseling_needed: '💡',
      session_reminder: '⏰',
    };
    return iconMap[type] || '📢';
  };

  if (isLoading && !notifications) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Notifications</Text>
        {[1, 2, 3].map(i => (
          <AnimatedCard key={i} style={styles.notificationCard}>
            <View style={styles.skeletonHeader} />
            <View style={styles.skeletonLine} />
            <View style={styles.skeletonLine} />
          </AnimatedCard>
        ))}
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load notifications</Text>
        <AnimatedButton
          title="Retry"
          onPress={() => refetch()}
          variant="primary"
          style={styles.retryButton}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.subtitle}>
          {notifications?.filter((n: any) => !n.read).length || 0} unread
        </Text>
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {filters.map(Filter => (
          <TouchableOpacity
            key={Filter.value}
            style={[
              styles.filterChip,
              selectedFilter === Filter.value && styles.selectedFilter,
            ]}
            onPress={() => setSelectedFilter(Filter.value)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === Filter.value && styles.selectedFilterText,
            ]}>
              {Filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Notifications List */}
      <ScrollView
        style={styles.notificationsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {notifications?.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No notifications</Text>
            <Text style={styles.emptySubtext}>
              {selectedFilter === 'unread' 
                ? 'All caught up!' 
                : 'No notifications match this Filter'
              }
            </Text>
          </View>
        ) : (
          notifications?.map((notification: any, index: any) => (
            <AnimatedCard
              key={notification.id}
              style={[
                styles.notificationCard,
                !notification.read && styles.unreadCard,
              ]}
              onPress={() => {
                if (!notification.read) {
                  handleMarkAsRead(notification.id);
                }
                // Navigate to related content
                if (notification.actionUrl) {
                  // Navigate to action URL
                }
              }}
            >
              <View style={styles.notificationHeader}>
                <View style={styles.notificationMeta}>
                  <Text style={styles.notificationIcon}>
                    {getNotificationIcon(notification.type)}
                  </Text>
                  <StatusIndicator
                    status={notification.priority === 'critical' ? 'busy' : 'online'}
                    size={12}
                    style={styles.priorityIndicator}
                  />
                </View>
                <Text style={styles.notificationTime}>
                  {new Date(notification.createdAt).toLocaleDateString()}
                </Text>
              </View>

              <View style={styles.notificationContent}>
                <Text style={[
                  styles.notificationTitle,
                  !notification.read && styles.unreadTitle,
                ]}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationMessage}>
                  {notification.message}
                </Text>
                
                {notification.actionRequired && (
                  <View style={styles.actionRequired}>
                    <Text style={styles.actionText}>
                      Action Required
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.notificationFooter}>
                <Text style={styles.actionType}>
                  {notification.actionType?.replace(/_/g, ' ').toUpperCase()}
                </Text>
                {!notification.read && (
                  <AnimatedButton
                    title="Mark as Read"
                    onPress={() => handleMarkAsRead(notification.id)}
                    variant="ghost"
                    size="small"
                  />
                )}
              </View>
            </AnimatedCard>
          ))
        )}
      </ScrollView>
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
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  filterScroll: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  selectedFilter: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  filterText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  selectedFilterText: {
    color: '#fff',
  },
  notificationsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  notificationCard: {
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#e5e7eb',
  },
  unreadCard: {
    borderLeftColor: '#6366f1',
    backgroundColor: '#f0f9ff',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  notificationIcon: {
    fontSize: 20,
  },
  priorityIndicator: {
    marginLeft: 'auto',
  },
  notificationTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  notificationContent: {
    marginBottom: 12,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  unreadTitle: {
    color: '#111827',
    fontWeight: '700',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  actionRequired: {
    alignSelf: 'flex-start',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#92400e',
    fontWeight: '600',
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionType: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 40,
  },
  retryButton: {
    marginTop: 16,
  },
  skeletonHeader: {
    height: 20,
    width: 100,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonLine: {
    height: 16,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginBottom: 6,
  },
});
