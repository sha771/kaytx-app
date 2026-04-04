import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell,
  Phone,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  X,
  Mail,
  MessageSquare,
  Settings as SettingsIcon,
  Volume2,
  Vibrate,
  BellOff,
} from 'lucide-react-native';
import { mockNegotiationNotifications } from '@/utils/mockNegotiationData';
import type { NegotiationNotification } from '@/types/negotiation';

export default function NotificationsScreen() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'unread'>('all');
  const [selectedNotification, setSelectedNotification] = useState<NegotiationNotification | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const [settings, setSettings] = useState({
    callNotifications: true,
    appointmentNotifications: true,
    dealNotifications: true,
    systemNotifications: true,
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    soundEnabled: true,
    vibrationEnabled: true,
    doNotDisturb: false,
  });

  const notifications = selectedTab === 'all'
    ? mockNegotiationNotifications
    : mockNegotiationNotifications.filter(n => !n.isRead);

  const unreadCount = mockNegotiationNotifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone size={20} color="#007AFF" />;
      case 'appointment':
        return <Calendar size={20} color="#5AC8FA" />;
      case 'deal':
        return <DollarSign size={20} color="#34C759" />;
      case 'system':
        return <AlertCircle size={20} color="#FF9500" />;
      default:
        return <Bell size={20} color="#8E8E93" />;
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

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Notifications',
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#1A1A1A',
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => setShowSettings(true)} style={styles.settingsButton}>
              <SettingsIcon size={22} color="#FF2D92" />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.topSection}>
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: '#FFF0F5' }]}>
              <Bell size={20} color="#FF2D92" />
              <Text style={[styles.statValue, { color: '#FF2D92' }]}>{notifications.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#E8F5FF' }]}>
              <AlertCircle size={20} color="#007AFF" />
              <Text style={[styles.statValue, { color: '#007AFF' }]}>{unreadCount}</Text>
              <Text style={styles.statLabel}>Unread</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#FFF5F0' }]}>
              <CheckCircle size={20} color="#34C759" />
              <Text style={[styles.statValue, { color: '#34C759' }]}>
                {mockNegotiationNotifications.filter(n => n.priority === 'high').length}
              </Text>
              <Text style={styles.statLabel}>Priority</Text>
            </View>
          </View>

          <View style={styles.tabsRow}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'all' && styles.tabActive]}
              onPress={() => setSelectedTab('all')}
            >
              <Text style={[styles.tabText, selectedTab === 'all' && styles.tabTextActive]}>
                All Notifications
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'unread' && styles.tabActive]}
              onPress={() => setSelectedTab('unread')}
            >
              <Text style={[styles.tabText, selectedTab === 'unread' && styles.tabTextActive]}>
                Unread ({unreadCount})
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.notificationsList}>
            {notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[styles.notificationCard, !notification.isRead && styles.notificationCardUnread]}
                onPress={() => setSelectedNotification(notification)}
              >
                <View style={styles.notificationHeader}>
                  <View style={[styles.iconContainer, { backgroundColor: getPriorityColor(notification.priority) + '20' }]}>
                    {getNotificationIcon(notification.type)}
                  </View>
                  <View style={styles.notificationContent}>
                    <View style={styles.notificationTop}>
                      <Text style={styles.notificationTitle}>{notification.title}</Text>
                      {!notification.isRead && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={styles.notificationMessage} numberOfLines={2}>
                      {notification.message}
                    </Text>
                    <View style={styles.notificationMeta}>
                      <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(notification.priority) + '20' }]}>
                        <Text style={[styles.priorityText, { color: getPriorityColor(notification.priority) }]}>
                          {notification.priority}
                        </Text>
                      </View>
                      <Text style={styles.timeText}>
                        {new Date(notification.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Modal
          visible={selectedNotification !== null}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setSelectedNotification(null)}
        >
          {selectedNotification && (
            <SafeAreaView style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Notification Details</Text>
                <TouchableOpacity onPress={() => setSelectedNotification(null)}>
                  <X size={24} color="#1A1A1A" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalContent}>
                <View style={styles.modalNotificationHeader}>
                  <View style={[styles.modalIconContainer, { backgroundColor: getPriorityColor(selectedNotification.priority) + '20' }]}>
                    {getNotificationIcon(selectedNotification.type)}
                  </View>
                  <Text style={styles.modalNotificationTitle}>{selectedNotification.title}</Text>
                  <View style={[styles.modalPriorityBadge, { backgroundColor: getPriorityColor(selectedNotification.priority) + '20' }]}>
                    <Text style={[styles.modalPriorityText, { color: getPriorityColor(selectedNotification.priority) }]}>
                      {selectedNotification.priority.toUpperCase()} PRIORITY
                    </Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Message</Text>
                  <View style={styles.messageCard}>
                    <Text style={styles.messageText}>{selectedNotification.message}</Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Details</Text>
                  <View style={styles.detailsCard}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Type:</Text>
                      <Text style={styles.detailValue}>{selectedNotification.type}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Time:</Text>
                      <Text style={styles.detailValue}>
                        {new Date(selectedNotification.timestamp).toLocaleString()}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Status:</Text>
                      <Text style={[styles.detailValue, { color: selectedNotification.isRead ? '#34C759' : '#FF9500' }]}>
                        {selectedNotification.isRead ? 'Read' : 'Unread'}
                      </Text>
                    </View>
                  </View>
                </View>

                {selectedNotification.actionUrl && (
                  <View style={styles.modalActionsSection}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>View Related Item</Text>
                    </TouchableOpacity>
                    {!selectedNotification.isRead && (
                      <TouchableOpacity style={styles.markReadButton}>
                        <CheckCircle size={20} color="#FFFFFF" />
                        <Text style={styles.markReadButtonText}>Mark as Read</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </ScrollView>
            </SafeAreaView>
          )}
        </Modal>

        <Modal
          visible={showSettings}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setShowSettings(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notification Settings</Text>
              <TouchableOpacity onPress={() => setShowSettings(false)}>
                <X size={24} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.settingsSection}>
                <Text style={styles.settingsSectionTitle}>Notification Types</Text>
                
                <View style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <Phone size={20} color="#007AFF" />
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingLabel}>Call Notifications</Text>
                      <Text style={styles.settingDescription}>
                        Alerts for incoming and missed calls
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={settings.callNotifications}
                    onValueChange={(value) => setSettings({ ...settings, callNotifications: value })}
                    trackColor={{ true: '#FF2D92' }}
                  />
                </View>

                <View style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <Calendar size={20} color="#5AC8FA" />
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingLabel}>Appointment Notifications</Text>
                      <Text style={styles.settingDescription}>
                        Reminders for scheduled appointments
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={settings.appointmentNotifications}
                    onValueChange={(value) => setSettings({ ...settings, appointmentNotifications: value })}
                    trackColor={{ true: '#FF2D92' }}
                  />
                </View>

                <View style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <DollarSign size={20} color="#34C759" />
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingLabel}>Deal Notifications</Text>
                      <Text style={styles.settingDescription}>
                        Updates on deal status changes
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={settings.dealNotifications}
                    onValueChange={(value) => setSettings({ ...settings, dealNotifications: value })}
                    trackColor={{ true: '#FF2D92' }}
                  />
                </View>

                <View style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <AlertCircle size={20} color="#FF9500" />
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingLabel}>System Notifications</Text>
                      <Text style={styles.settingDescription}>
                        Important system updates
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={settings.systemNotifications}
                    onValueChange={(value) => setSettings({ ...settings, systemNotifications: value })}
                    trackColor={{ true: '#FF2D92' }}
                  />
                </View>
              </View>

              <View style={styles.settingsSection}>
                <Text style={styles.settingsSectionTitle}>Delivery Channels</Text>
                
                <View style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <Bell size={20} color="#FF2D92" />
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingLabel}>Push Notifications</Text>
                      <Text style={styles.settingDescription}>
                        In-app push notifications
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={settings.pushNotifications}
                    onValueChange={(value) => setSettings({ ...settings, pushNotifications: value })}
                    trackColor={{ true: '#FF2D92' }}
                  />
                </View>

                <View style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <Mail size={20} color="#007AFF" />
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingLabel}>Email Notifications</Text>
                      <Text style={styles.settingDescription}>
                        Receive notifications via email
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={settings.emailNotifications}
                    onValueChange={(value) => setSettings({ ...settings, emailNotifications: value })}
                    trackColor={{ true: '#FF2D92' }}
                  />
                </View>

                <View style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <MessageSquare size={20} color="#34C759" />
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingLabel}>SMS Notifications</Text>
                      <Text style={styles.settingDescription}>
                        Text message notifications
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={settings.smsNotifications}
                    onValueChange={(value) => setSettings({ ...settings, smsNotifications: value })}
                    trackColor={{ true: '#FF2D92' }}
                  />
                </View>
              </View>

              <View style={styles.settingsSection}>
                <Text style={styles.settingsSectionTitle}>Preferences</Text>
                
                <View style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <Volume2 size={20} color="#FF9500" />
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingLabel}>Sound</Text>
                      <Text style={styles.settingDescription}>
                        Play sound for notifications
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={settings.soundEnabled}
                    onValueChange={(value) => setSettings({ ...settings, soundEnabled: value })}
                    trackColor={{ true: '#FF2D92' }}
                  />
                </View>

                <View style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <Vibrate size={20} color="#5AC8FA" />
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingLabel}>Vibration</Text>
                      <Text style={styles.settingDescription}>
                        Vibrate for notifications
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={settings.vibrationEnabled}
                    onValueChange={(value) => setSettings({ ...settings, vibrationEnabled: value })}
                    trackColor={{ true: '#FF2D92' }}
                  />
                </View>

                <View style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <BellOff size={20} color="#8E8E93" />
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingLabel}>Do Not Disturb</Text>
                      <Text style={styles.settingDescription}>
                        Silence all notifications
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={settings.doNotDisturb}
                    onValueChange={(value) => setSettings({ ...settings, doNotDisturb: value })}
                    trackColor={{ true: '#FF2D92' }}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.saveSettingsButton}>
                <CheckCircle size={20} color="#FFFFFF" />
                <Text style={styles.saveSettingsButtonText}>Save Settings</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  topSection: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700' as const,
  },
  statLabel: {
    fontSize: 11,
    color: '#8E8E93',
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
  },
  tabActive: {
    backgroundColor: '#FF2D92',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#8E8E93',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  notificationsList: {
    padding: 16,
    gap: 12,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  notificationCardUnread: {
    borderColor: '#FF2D92',
    borderWidth: 2,
  },
  notificationHeader: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF2D92',
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 20,
    color: '#8E8E93',
    marginBottom: 8,
  },
  notificationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600' as const,
    textTransform: 'capitalize' as const,
  },
  timeText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#1A1A1A',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  modalNotificationHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
  },
  modalIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  modalNotificationTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalPriorityBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  modalPriorityText: {
    fontSize: 12,
    fontWeight: '700' as const,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginBottom: 12,
  },
  messageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#1A1A1A',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 15,
    color: '#8E8E93',
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: '#1A1A1A',
  },
  modalActionsSection: {
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF2D92',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FF2D92',
  },
  markReadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FF2D92',
    paddingVertical: 16,
    borderRadius: 12,
  },
  markReadButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  settingsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  settingsSectionTitle: {
    fontSize: 17,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
    gap: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: '#8E8E93',
  },
  saveSettingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FF2D92',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  saveSettingsButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
});
