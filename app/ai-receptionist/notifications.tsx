import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {
  Bell,
  BellRing,
  Phone,
  Calendar,
  Mail,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Settings,
  Trash2,
  Check,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'call' | 'appointment' | 'message' | 'alert' | 'info';
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Missed Call',
    message: 'You missed a call from Jennifer Smith at 2:30 PM',
    type: 'call',
    timestamp: '2024-01-15T14:30:00',
    isRead: false,
    priority: 'high',
  },
  {
    id: '2',
    title: 'Upcoming Appointment',
    message: 'Product Demo with Michael Johnson starts in 1 hour',
    type: 'appointment',
    timestamp: '2024-01-15T13:00:00',
    isRead: false,
    priority: 'high',
  },
  {
    id: '3',
    title: 'New Message',
    message: 'You have 3 new messages in your inbox',
    type: 'message',
    timestamp: '2024-01-15T12:45:00',
    isRead: true,
    priority: 'medium',
  },
  {
    id: '4',
    title: 'System Alert',
    message: 'AI receptionist successfully handled 45 calls today',
    type: 'info',
    timestamp: '2024-01-15T12:00:00',
    isRead: true,
    priority: 'low',
  },
  {
    id: '5',
    title: 'High Volume Alert',
    message: 'Call volume is 30% higher than usual. Consider adjusting availability',
    type: 'alert',
    timestamp: '2024-01-15T11:30:00',
    isRead: true,
    priority: 'medium',
  },
];

export default function ReceptionistNotificationsScreen() {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    calls: true,
    appointments: true,
    messages: true,
    alerts: true,
    emailNotifications: false,
    pushNotifications: true,
    smsNotifications: false,
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'call':
        return Phone;
      case 'appointment':
        return Calendar;
      case 'message':
        return MessageSquare;
      case 'alert':
        return AlertCircle;
      case 'info':
        return Info;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'call':
        return '#34C759';
      case 'appointment':
        return '#007AFF';
      case 'message':
        return '#FF9500';
      case 'alert':
        return '#FF3B30';
      case 'info':
        return '#5856D6';
      default:
        return '#8E8E93';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#FF3B30';
      case 'medium':
        return '#FF9500';
      case 'low':
        return '#34C759';
      default:
        return '#8E8E93';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (showSettings) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Stack.Screen
          options={{
            title: 'Notification Settings',
            headerStyle: { backgroundColor: theme.colors.background },
            headerTintColor: theme.colors.text,
            headerLeft: () => (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setShowSettings(false)}
              >
                <Text style={[styles.backText, { color: theme.colors.primary }]}>Back</Text>
              </TouchableOpacity>
            ),
          }}
        />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Notification Types
            </Text>

            <View style={[styles.settingCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={styles.settingRow}>
                <View style={styles.settingLeft}>
                  <Phone size={20} color="#34C759" />
                  <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Calls</Text>
                </View>
                <Switch
                  value={notificationSettings.calls}
                  onValueChange={value =>
                    setNotificationSettings({ ...notificationSettings, calls: value })
                  }
                  trackColor={{ false: '#D1D1D6', true: theme.colors.primary }}
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingLeft}>
                  <Calendar size={20} color="#007AFF" />
                  <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Appointments</Text>
                </View>
                <Switch
                  value={notificationSettings.appointments}
                  onValueChange={value =>
                    setNotificationSettings({ ...notificationSettings, appointments: value })
                  }
                  trackColor={{ false: '#D1D1D6', true: theme.colors.primary }}
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingLeft}>
                  <MessageSquare size={20} color="#FF9500" />
                  <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Messages</Text>
                </View>
                <Switch
                  value={notificationSettings.messages}
                  onValueChange={value =>
                    setNotificationSettings({ ...notificationSettings, messages: value })
                  }
                  trackColor={{ false: '#D1D1D6', true: theme.colors.primary }}
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingLeft}>
                  <AlertCircle size={20} color="#FF3B30" />
                  <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Alerts</Text>
                </View>
                <Switch
                  value={notificationSettings.alerts}
                  onValueChange={value =>
                    setNotificationSettings({ ...notificationSettings, alerts: value })
                  }
                  trackColor={{ false: '#D1D1D6', true: theme.colors.primary }}
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Delivery Methods
            </Text>

            <View style={[styles.settingCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={styles.settingRow}>
                <View style={styles.settingLeft}>
                  <BellRing size={20} color={theme.colors.primary} />
                  <View>
                    <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                      Push Notifications
                    </Text>
                    <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
                      Receive notifications on your device
                    </Text>
                  </View>
                </View>
                <Switch
                  value={notificationSettings.pushNotifications}
                  onValueChange={value =>
                    setNotificationSettings({ ...notificationSettings, pushNotifications: value })
                  }
                  trackColor={{ false: '#D1D1D6', true: theme.colors.primary }}
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingLeft}>
                  <Mail size={20} color={theme.colors.primary} />
                  <View>
                    <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                      Email Notifications
                    </Text>
                    <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
                      Receive daily summary via email
                    </Text>
                  </View>
                </View>
                <Switch
                  value={notificationSettings.emailNotifications}
                  onValueChange={value =>
                    setNotificationSettings({ ...notificationSettings, emailNotifications: value })
                  }
                  trackColor={{ false: '#D1D1D6', true: theme.colors.primary }}
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingLeft}>
                  <MessageSquare size={20} color={theme.colors.primary} />
                  <View>
                    <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                      SMS Notifications
                    </Text>
                    <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
                      Receive urgent alerts via SMS
                    </Text>
                  </View>
                </View>
                <Switch
                  value={notificationSettings.smsNotifications}
                  onValueChange={value =>
                    setNotificationSettings({ ...notificationSettings, smsNotifications: value })
                  }
                  trackColor={{ false: '#D1D1D6', true: theme.colors.primary }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Notifications',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerRight: () => (
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => setShowSettings(true)}
            >
              <Settings size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={styles.headerSection}>
        <View style={[styles.unreadBanner, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.unreadLeft}>
            <BellRing size={20} color={theme.colors.primary} />
            <Text style={[styles.unreadText, { color: theme.colors.text }]}>
              {unreadCount} unread notifications
            </Text>
          </View>
          {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllAsRead}>
              <Text style={[styles.markAllText, { color: theme.colors.primary }]}>
                Mark all as read
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.notificationsList}>
          {notifications.map(notification => {
            const Icon = getNotificationIcon(notification.type);
            const iconColor = getNotificationColor(notification.type);
            const priorityColor = getPriorityColor(notification.priority);

            return (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationCard,
                  { backgroundColor: theme.colors.cardBackground },
                  !notification.isRead && styles.notificationUnread,
                ]}
                onPress={() => markAsRead(notification.id)}
              >
                <View style={styles.notificationMain}>
                  <View style={[styles.notificationIcon, { backgroundColor: `${iconColor}20` }]}>
                    <Icon size={20} color={iconColor} />
                  </View>

                  <View style={styles.notificationContent}>
                    <View style={styles.notificationHeader}>
                      <Text style={[styles.notificationTitle, { color: theme.colors.text }]}>
                        {notification.title}
                      </Text>
                      {!notification.isRead && <View style={styles.unreadDot} />}
                    </View>

                    <Text style={[styles.notificationMessage, { color: theme.colors.secondaryText }]}>
                      {notification.message}
                    </Text>

                    <View style={styles.notificationFooter}>
                      <View style={styles.notificationMeta}>
                        <Clock size={12} color={theme.colors.secondaryText} />
                        <Text style={[styles.notificationTime, { color: theme.colors.secondaryText }]}>
                          {formatTime(notification.timestamp)}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.priorityBadge,
                          { backgroundColor: `${priorityColor}20` },
                        ]}
                      >
                        <Text style={[styles.priorityText, { color: priorityColor }]}>
                          {notification.priority}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.notificationActions}>
                  {!notification.isRead && (
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => markAsRead(notification.id)}
                    >
                      <Check size={16} color={theme.colors.primary} />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => deleteNotification(notification.id)}
                  >
                    <Trash2 size={16} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}

          {notifications.length === 0 && (
            <View style={styles.emptyState}>
              <Bell size={48} color={theme.colors.secondaryText} />
              <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
                No notifications
              </Text>
              <Text style={[styles.emptySubtitle, { color: theme.colors.secondaryText }]}>
                You're all caught up!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  backButton: {
    padding: 8,
    marginLeft: 8,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingsButton: {
    padding: 8,
    marginRight: 8,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  unreadBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  unreadLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  unreadText: {
    fontSize: 15,
    fontWeight: '600',
  },
  markAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  notificationsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  notificationUnread: {
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  notificationMain: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  notificationTime: {
    fontSize: 12,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  notificationActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  actionButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  settingCard: {
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 13,
    marginTop: 2,
  },
});
