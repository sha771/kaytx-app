import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Bell,
  Check,
  Trash2,
  Settings,
  ListFilter,
  CircleAlert,
  Info,
  CircleCheck,
  MessageSquare,
  Zap,
  Star,
  TrendingUp,
  Clock,
  ChevronRight,
  EllipsisVertical,
  BellRing,
  BellOff,
  GitBranch,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Types
interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: string;
  category: 'agent' | 'system' | 'workflow' | 'performance';
}

interface NotificationPreference {
  category: string;
  email: boolean;
  push: boolean;
  inApp: boolean;
}

// Mock Data
const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'Workflow Failed',
    message: 'Monthly Financial Report workflow failed due to API timeout',
    timestamp: '2 min ago',
    read: false,
    action: 'View Details',
    category: 'workflow',
  },
  {
    id: '2',
    type: 'success',
    title: 'Agent Training Complete',
    message: 'Support AI has completed training with 94.5% accuracy',
    timestamp: '15 min ago',
    read: false,
    action: 'View Results',
    category: 'agent',
  },
  {
    id: '3',
    type: 'info',
    title: 'High Conversation Volume',
    message: 'Customer Experience AI is handling 40% more conversations than usual',
    timestamp: '1 hour ago',
    read: true,
    category: 'performance',
  },
  {
    id: '4',
    type: 'warning',
    title: 'API Rate Limit Approaching',
    message: 'Sales AI is at 85% of daily API quota',
    timestamp: '2 hours ago',
    read: true,
    action: 'Manage Limits',
    category: 'system',
  },
  {
    id: '5',
    type: 'success',
    title: 'New Integration Connected',
    message: 'Slack integration has been successfully configured',
    timestamp: '3 hours ago',
    read: true,
    category: 'system',
  },
  {
    id: '6',
    type: 'info',
    title: 'Weekly Report Ready',
    message: 'Your AI Agent Performance Report for this week is available',
    timestamp: '5 hours ago',
    read: true,
    action: 'View Report',
    category: 'performance',
  },
  {
    id: '7',
    type: 'alert',
    title: 'Security Alert',
    message: 'Multiple failed login attempts detected from unknown IP',
    timestamp: 'Yesterday',
    read: true,
    action: 'Review',
    category: 'system',
  },
];

const PREFERENCES: NotificationPreference[] = [
  { category: 'Agent Events', email: true, push: true, inApp: true },
  { category: 'Workflow Status', email: true, push: false, inApp: true },
  { category: 'Performance Alerts', email: false, push: true, inApp: true },
  { category: 'Security Warnings', email: true, push: true, inApp: true },
  { category: 'System Updates', email: false, push: false, inApp: true },
  { category: 'Billing & Usage', email: true, push: true, inApp: false },
];

const TYPE_CONFIG = {
  alert: { icon: CircleAlert, color: '#EF4444', bg: '#EF4444' },
  info: { icon: Info, color: '#3B82F6', bg: '#3B82F6' },
  success: { icon: CircleCheck, color: '#10B981', bg: '#10B981' },
  warning: { icon: Zap, color: '#F59E0B', bg: '#F59E0B' },
};

const CATEGORY_ICONS = {
  agent: Settings,
  workflow: GitBranch,
  performance: TrendingUp,
};

export default function NotificationCenterScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const [preferences, setPreferences] = useState<NotificationPreference[]>(PREFERENCES);
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'settings'>('all');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'unread') return !n.read;
    if (selectedFilter) return n.category === selectedFilter;
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const togglePreference = (category: string, type: 'email' | 'push' | 'inApp') => {
    setPreferences(prev =>
      prev.map(p =>
        p.category === category ? { ...p, [type]: !p[type] } : p
      )
    );
  };

  const renderNotificationCard = (notification: Notification, index: number) => {
    const config = TYPE_CONFIG[notification.type];
    const Icon = config.icon;
    const CategoryIcon = CATEGORY_ICONS[notification.category];

    return (
      <Animated.View
        key={notification.id}
        entering={FadeInUp.delay(index * 30)}
        style={[
          styles.notificationCard,
          { backgroundColor: colors.card },
          !notification.read && styles.unreadCard,
        ]}
      >
        <TouchableOpacity
          style={styles.notificationContent}
          onPress={() => markAsRead(notification.id)}
        >
          <View style={styles.notificationHeader}>
            <View style={[styles.typeIcon, { backgroundColor: config.bg + '15' }]}>
              <Icon size={18} color={config.color} />
            </View>
            <View style={styles.notificationMeta}>
              <Text style={[styles.categoryText, { color: colors.icon }]}>
                {notification.category.toUpperCase()}
              </Text>
              <Text style={[styles.timestamp, { color: colors.icon }]}>
                {notification.timestamp}
              </Text>
            </View>
            {!notification.read && (
              <View style={[styles.unreadDot, { backgroundColor: colors.tint }]} />
            )}
          </View>

          <Text style={[styles.notificationTitle, { color: colors.text }]}>
            {notification.title}
          </Text>
          <Text style={[styles.notificationMessage, { color: colors.icon }]}>
            {notification.message}
          </Text>

          {notification.action && (
            <TouchableOpacity style={styles.actionButton}>
              <Text style={[styles.actionText, { color: colors.tint }]}>
                {notification.action}
              </Text>
              <ChevronRight size={16} color={colors.tint} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteNotification(notification.id)}
        >
          <Trash2 size={16} color="#EF4444" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderPreferenceRow = (pref: NotificationPreference, index: number) => (
    <Animated.View
      key={pref.category}
      entering={FadeInUp.delay(index * 50)}
      style={[styles.preferenceRow, { backgroundColor: colors.card }]}
    >
      <Text style={[styles.preferenceCategory, { color: colors.text }]}>
        {pref.category}
      </Text>
      <View style={styles.preferenceToggles}>
        <View style={styles.toggleItem}>
          <Text style={[styles.toggleLabel, { color: colors.icon }]}>Email</Text>
          <Switch
            value={pref.email}
            onValueChange={() => togglePreference(pref.category, 'email')}
            trackColor={{ false: '#E5E7EB', true: colors.tint + '50' }}
            thumbColor={pref.email ? colors.tint : '#9CA3AF'}
          />
        </View>
        <View style={styles.toggleItem}>
          <Text style={[styles.toggleLabel, { color: colors.icon }]}>Push</Text>
          <Switch
            value={pref.push}
            onValueChange={() => togglePreference(pref.category, 'push')}
            trackColor={{ false: '#E5E7EB', true: colors.tint + '50' }}
            thumbColor={pref.push ? colors.tint : '#9CA3AF'}
          />
        </View>
        <View style={styles.toggleItem}>
          <Text style={[styles.toggleLabel, { color: colors.icon }]}>In-App</Text>
          <Switch
            value={pref.inApp}
            onValueChange={() => togglePreference(pref.category, 'inApp')}
            trackColor={{ false: '#E5E7EB', true: colors.tint + '50' }}
            thumbColor={pref.inApp ? colors.tint : '#9CA3AF'}
          />
        </View>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={28} color={colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Notifications
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
              {unreadCount} unread messages
            </Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          {activeTab !== 'settings' && (
            <TouchableOpacity onPress={markAllAsRead} style={styles.headerButton}>
              <Check size={22} color={colors.tint} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => setActiveTab(activeTab === 'settings' ? 'all' : 'settings')}
            style={styles.headerButton}
          >
            <Settings size={22} color={activeTab === 'settings' ? colors.tint : colors.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      {activeTab !== 'settings' && (
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && { backgroundColor: colors.tint }]}
            onPress={() => setActiveTab('all')}
          >
            <Bell size={16} color={activeTab === 'all' ? 'white' : colors.icon} />
            <Text style={[styles.tabText, { color: activeTab === 'all' ? 'white' : colors.text }]}>
              All
            </Text>
            <View style={[styles.badge, { backgroundColor: activeTab === 'all' ? 'white' : colors.tint }]}>
              <Text style={[styles.badgeText, { color: activeTab === 'all' ? colors.tint : 'white' }]}>
                {notifications.length}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'unread' && { backgroundColor: colors.tint }]}
            onPress={() => setActiveTab('unread')}
          >
            <BellRing size={16} color={activeTab === 'unread' ? 'white' : colors.icon} />
            <Text style={[styles.tabText, { color: activeTab === 'unread' ? 'white' : colors.text }]}>
              Unread
            </Text>
            {unreadCount > 0 && (
              <View style={[styles.badge, { backgroundColor: activeTab === 'unread' ? 'white' : '#EF4444' }]}>
                <Text style={[styles.badgeText, { color: activeTab === 'unread' ? '#EF4444' : 'white' }]}>
                  {unreadCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Category Filters */}
      {activeTab !== 'settings' && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          <TouchableOpacity
            style={[
              styles.filterChip,
              { backgroundColor: selectedFilter === null ? colors.tint : colors.card },
            ]}
            onPress={() => setSelectedFilter(null)}
          >
            <Text
              style={[
                styles.filterText,
                { color: selectedFilter === null ? 'white' : colors.text },
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {Object.keys(CATEGORY_ICONS).map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterChip,
                { backgroundColor: selectedFilter === category ? colors.tint : colors.card },
              ]}
              onPress={() => setSelectedFilter(category === selectedFilter ? null : category)}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: selectedFilter === category ? 'white' : colors.text },
                ]}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {activeTab === 'settings' ? (
          <>
            <View style={styles.settingsHeader}>
              <Text style={[styles.settingsTitle, { color: colors.text }]}>
                Notification Preferences
              </Text>
              <Text style={[styles.settingsSubtitle, { color: colors.icon }]}>
                Manage how you receive notifications
              </Text>
            </View>
            {preferences.map((pref, index) => renderPreferenceRow(pref, index))}

            <View style={[styles.dndCard, { backgroundColor: colors.card }]}>
              <View style={styles.dndHeader}>
                <BellOff size={20} color={colors.icon} />
                <Text style={[styles.dndTitle, { color: colors.text }]}>
                  Do Not Disturb
                </Text>
              </View>
              <Text style={[styles.dndDescription, { color: colors.icon }]}>
                Pause all non-urgent notifications for a specified time period
              </Text>
              <TouchableOpacity style={[styles.dndButton, { backgroundColor: colors.tint + '15' }]}>
                <Text style={[styles.dndButtonText, { color: colors.tint }]}>
                  Schedule DND
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, index) =>
            renderNotificationCard(notification, index)
          )
        ) : (
          <View style={styles.emptyState}>
            <Bell size={48} color={colors.icon} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No notifications
            </Text>
            <Text style={[styles.emptyText, { color: colors.icon }]}>
              {activeTab === 'unread'
                ? "You've read all your notifications!"
                : 'No notifications in this category'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  notificationCard: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  unreadCard: {
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
  },
  notificationContent: {
    flex: 1,
    padding: 16,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  typeIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  notificationMeta: {
    flex: 1,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsHeader: {
    marginBottom: 20,
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingsSubtitle: {
    fontSize: 14,
  },
  preferenceRow: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  preferenceCategory: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  preferenceToggles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toggleItem: {
    alignItems: 'center',
    gap: 8,
  },
  toggleLabel: {
    fontSize: 12,
  },
  dndCard: {
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
  dndHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  dndTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  dndDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  dndButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  dndButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
