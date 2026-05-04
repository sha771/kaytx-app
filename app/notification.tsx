 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Bell, Mail, MessageSquare, Calendar, Settings, Volume2, VolumeX } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function NotificationScreen() {
  const { theme } = useTheme();
  const [pushEnabled, setPushEnabled] = useState<boolean>(true);
  const [emailEnabled, setEmailEnabled] = useState<boolean>(true);
  const [smsEnabled, setSmsEnabled] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const notificationCategories = [
    {
      id: 'messages',
      title: 'Messages & Chats',
      description: 'New messages, mentions, and chat notifications',
      icon: MessageSquare,
      enabled: true,
      settings: {
        push: true,
        email: false,
        sms: false,
        sound: true,
      },
    },
    {
      id: 'calendar',
      title: 'Calendar & Events',
      description: 'Meeting reminders and calendar updates',
      icon: Calendar,
      enabled: true,
      settings: {
        push: true,
        email: true,
        sms: false,
        sound: true,
      },
    },
    {
      id: 'marketing',
      title: 'Marketing Updates',
      description: 'Campaign results and marketing insights',
      icon: Mail,
      enabled: false,
      settings: {
        push: false,
        email: true,
        sms: false,
        sound: false,
      },
    },
    {
      id: 'system',
      title: 'System Alerts',
      description: 'Security alerts and system maintenance',
      icon: Settings,
      enabled: true,
      settings: {
        push: true,
        email: true,
        sms: true,
        sound: true,
      },
    },
  ];

  const recentNotifications = [
    {
      id: '1',
      title: 'New message from Sarah',
      description: 'Hey, can we schedule a meeting for tomorrow?',
      type: 'messages',
      timestamp: '2024-01-15T10:30:00Z',
      read: false,
      priority: 'normal',
    },
    {
      id: '2',
      title: 'Meeting reminder',
      description: 'Team standup in 15 minutes',
      type: 'calendar',
      timestamp: '2024-01-15T09:45:00Z',
      read: true,
      priority: 'high',
    },
    {
      id: '3',
      title: 'Campaign performance update',
      description: 'Your email campaign achieved 25% open rate',
      type: 'marketing',
      timestamp: '2024-01-15T08:20:00Z',
      read: false,
      priority: 'low',
    },
    {
      id: '4',
      title: 'Security alert',
      description: 'New login detected from unknown device',
      type: 'system',
      timestamp: '2024-01-14T22:15:00Z',
      read: true,
      priority: 'high',
    },
    {
      id: '5',
      title: 'Task completed',
      description: 'Workflow "Lead Nurturing" completed successfully',
      type: 'system',
      timestamp: '2024-01-14T18:30:00Z',
      read: true,
      priority: 'normal',
    },
  ];

  const getTypeIcon = (type: string) => {
    const category = notificationCategories.find(cat => cat.id === type);
    if (category) {
      const IconComponent = category.icon;
      return <IconComponent size={16} color={theme.colors.primary} />;
    }
    return <Bell size={16} color={theme.colors.primary} />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return theme.colors.error;
      case 'normal': return theme.colors.primary;
      case 'low': return theme.colors.success;
      default: return theme.colors.secondaryText;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const unreadCount = recentNotifications.filter(n => !n.read).length;

  return (
    <SafeAreaView style= [styles.container, { backgroundColor: theme.colors.background }]}>
      <View style= [styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style= [styles.title, { color: theme.colors.text }]}>Notifications</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style= [styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <Bell size={24} color={theme.colors.primary} />
            <Text style= [styles.cardTitle, { color: theme.colors.text }]}>Notification Center</Text>
          </View>
          <Text style= [styles.cardDescription, { color: theme.colors.secondaryText }]}>
            Manage your notification preferences and stay updated
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <View style= [styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Bell size={20} color={theme.colors.primary} />
            <Text style= [styles.statValue, { color: theme.colors.text }]}>
              {recentNotifications.length}
            </Text>
            <Text style= [styles.statLabel, { color: theme.colors.secondaryText }]}>
              Total
            </Text>
          </View>
          <View style= [styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Mail size={20} color={theme.colors.error} />
            <Text style= [styles.statValue, { color: theme.colors.text }]}>
              {unreadCount}
            </Text>
            <Text style= [styles.statLabel, { color: theme.colors.secondaryText }]}>
              Unread
            </Text>
          </View>
          <View style= [styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Settings size={20} color={theme.colors.success} />
            <Text style= [styles.statValue, { color: theme.colors.text }]}>
              {notificationCategories.filter(cat => cat.enabled).length}
            </Text>
            <Text style= [styles.statLabel, { color: theme.colors.secondaryText }]}>
              Active
            </Text>
          </View>
        </View>

        <View style= [styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style= [styles.sectionTitle, { color: theme.colors.text }]}>Global Settings</Text>
          
          <View style={styles.globalSettings}>
            <View style= [styles.settingItem, { borderColor: theme.colors.border }]}>
              <View style={styles.settingInfo}>
                <Bell size={20} color={theme.colors.primary} />
                <View style={styles.settingDetails}>
                  <Text style= [styles.settingTitle, { color: theme.colors.text }]}>
                    Push Notifications
                  </Text>
                  <Text style= [styles.settingDescription, { color: theme.colors.secondaryText }]}>
                    Receive notifications on your device
                  </Text>
                </View>
              </View>
              <Switch
                value={pushEnabled}
                onValueChange={setPushEnabled}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style= [styles.settingItem, { borderColor: theme.colors.border }]}>
              <View style={styles.settingInfo}>
                <Mail size={20} color={theme.colors.primary} />
                <View style={styles.settingDetails}>
                  <Text style= [styles.settingTitle, { color: theme.colors.text }]}>
                    Email Notifications
                  </Text>
                  <Text style= [styles.settingDescription, { color: theme.colors.secondaryText }]}>
                    Receive notifications via email
                  </Text>
                </View>
              </View>
              <Switch
                value={emailEnabled}
                onValueChange={setEmailEnabled}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style= [styles.settingItem, { borderColor: theme.colors.border }]}>
              <View style={styles.settingInfo}>
                <MessageSquare size={20} color={theme.colors.primary} />
                <View style={styles.settingDetails}>
                  <Text style= [styles.settingTitle, { color: theme.colors.text }]}>
                    SMS Notifications
                  </Text>
                  <Text style= [styles.settingDescription, { color: theme.colors.secondaryText }]}>
                    Receive important alerts via SMS
                  </Text>
                </View>
              </View>
              <Switch
                value={smsEnabled}
                onValueChange={setSmsEnabled}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style= [styles.settingItem, { borderColor: theme.colors.border }]}>
              <View style={styles.settingInfo}>
                {soundEnabled ? (
                  <Volume2 size={20} color={theme.colors.primary} />
                ) : (
                  <VolumeX size={20} color={theme.colors.primary} />
                )}
                <View style={styles.settingDetails}>
                  <Text style= [styles.settingTitle, { color: theme.colors.text }]}>
                    Sound & Vibration
                  </Text>
                  <Text style= [styles.settingDescription, { color: theme.colors.secondaryText }]}>
                    Play sounds for notifications
                  </Text>
                </View>
              </View>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        <View style= [styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style= [styles.sectionTitle, { color: theme.colors.text }]}>Notification Categories</Text>
          
          <View style={styles.categoriesList}>
            {notificationCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <View key={category.id} style= [styles.categoryCard, { borderColor: theme.colors.border }]}>
                  <View style={styles.categoryHeader}>
                    <View style={styles.categoryInfo}>
                      <IconComponent size={20} color={theme.colors.primary} />
                      <View style={styles.categoryDetails}>
                        <Text style= [styles.categoryTitle, { color: theme.colors.text }]}>
                          {category.title}
                        </Text>
                        <Text style= [styles.categoryDescription, { color: theme.colors.secondaryText }]}>
                          {category.description}
                        </Text>
                      </View>
                    </View>
                    <Switch
                      value={category.enabled}
                      onValueChange={() => console.log(`Toggle ${category.id}`)}
                      trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                      thumbColor="#FFFFFF"
                    />
                  </View>

                  {category.enabled && (
                    <View style={styles.categorySettings}>
                      <View style={styles.settingRow}>
                        <Text style= [styles.settingLabel, { color: theme.colors.secondaryText }]}>
                          Push
                        </Text>
                        <Switch
                          value={category.settings.push}
                          onValueChange={() => console.log(`Toggle push for ${category.id}`)}
                          trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                          thumbColor="#FFFFFF"
                          style={styles.miniSwitch}
                        />
                      </View>
                      <View style={styles.settingRow}>
                        <Text style= [styles.settingLabel, { color: theme.colors.secondaryText }]}>
                          Email
                        </Text>
                        <Switch
                          value={category.settings.email}
                          onValueChange={() => console.log(`Toggle email for ${category.id}`)}
                          trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                          thumbColor="#FFFFFF"
                          style={styles.miniSwitch}
                        />
                      </View>
                      <View style={styles.settingRow}>
                        <Text style= [styles.settingLabel, { color: theme.colors.secondaryText }]}>
                          Sound
                        </Text>
                        <Switch
                          value={category.settings.sound}
                          onValueChange={() => console.log(`Toggle sound for ${category.id}`)}
                          trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                          thumbColor="#FFFFFF"
                          style={styles.miniSwitch}
                        />
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <View style= [styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style= [styles.sectionTitle, { color: theme.colors.text }]}>Recent Notifications</Text>
          
          <View style={styles.notificationsList}>
            {recentNotifications.map((notification) => (
              <View 
                key={notification.id} 
                style= [
                  styles.notificationCard, 
                  { 
                    borderColor: theme.colors.border,
                    backgroundColor: notification.read ? 'transparent' : `${theme.colors.primary}05`,
                  }
                ]}
              >
                <View style={styles.notificationHeader}>
                  <View style={styles.notificationInfo}>
                    {getTypeIcon(notification.type)}
                    <View style={styles.notificationDetails}>
                      <Text style= [styles.notificationTitle, { color: theme.colors.text }]}>
                        {notification.title}
                      </Text>
                      <Text style= [styles.notificationDescription, { color: theme.colors.secondaryText }]}>
                        {notification.description}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.notificationMeta}>
                    <View 
                      style= [
                        styles.priorityDot, 
                        { backgroundColor: getPriorityColor(notification.priority) }
                      ]} 
                    />
                    {!notification.read && (
                      <View style= [styles.unreadDot, { backgroundColor: theme.colors.primary }]} />
                    )}
                  </View>
                </View>
                <Text style= [styles.notificationTime, { color: theme.colors.secondaryText }]}>
                  {getTimeAgo(notification.timestamp)}
                </Text>
              </View>
            ))}
          </View>
        </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  settingsButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  globalSettings: {
    gap: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingDetails: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
  },
  categoriesList: {
    gap: 16,
  },
  categoryCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryDetails: {
    marginLeft: 12,
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: 14,
  },
  categorySettings: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  settingRow: {
    alignItems: 'center',
    gap: 4,
  },
  settingLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  miniSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  notificationsList: {
    gap: 12,
  },
  notificationCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  notificationDetails: {
    marginLeft: 12,
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  notificationDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  notificationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  notificationTime: {
    fontSize: 12,
    marginLeft: 28,
  },
});

