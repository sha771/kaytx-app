import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Bell, BellRing, CheckCircle2, AlertCircle, Info, Trash2, Settings, ChevronRight, Filter, Archive } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const NOTIFICATION_TYPES = [
  { id: 'all', name: 'All', color: '#3B82F6' },
  { id: 'alert', name: 'Alerts', color: '#EF4444' },
  { id: 'warning', name: 'Warnings', color: '#F59E0B' },
  { id: 'success', name: 'Success', color: '#10B981' },
  { id: 'info', name: 'Info', color: '#3B82F6' },
];

const NOTIFICATIONS = [
  { id: 1, type: 'alert', title: 'High CPU Usage', message: 'Sales AI Agent experiencing 95% CPU load', time: '2 min ago', read: false, source: 'Monitoring' },
  { id: 2, type: 'success', title: 'Workflow Completed', message: 'Lead qualification pipeline finished successfully', time: '15 min ago', read: false, source: 'Workflows' },
  { id: 3, type: 'warning', title: 'API Rate Limit', message: 'Approaching 90% of API rate limit for this hour', time: '32 min ago', read: true, source: 'API Gateway' },
  { id: 4, type: 'info', title: 'Agent Update', message: 'Marketing AI updated to version 2.4.1', time: '1 hour ago', read: true, source: 'System' },
  { id: 5, type: 'success', title: 'Backup Complete', message: 'Daily database backup completed successfully', time: '2 hours ago', read: true, source: 'Backup' },
  { id: 6, type: 'alert', title: 'Task Failed', message: 'Data sync job failed after 3 retry attempts', time: '3 hours ago', read: true, source: 'Scheduler' },
  { id: 7, type: 'info', title: 'New Feature', message: 'AI Agent counseling feature is now available', time: '5 hours ago', read: true, source: 'Product' },
  { id: 8, type: 'warning', title: 'Storage Warning', message: 'Storage usage at 85% capacity', time: '1 day ago', read: true, source: 'Storage' },
];

const TypeIcon = ({ type }: { type: string }) => {
  const icons = {
    alert: AlertCircle,
    warning: AlertCircle,
    success: CheckCircle2,
    info: Info,
  };
  const Icon = icons[type as keyof typeof icons] || Info;
  const colors = {
    alert: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
    info: '#3B82F6',
  };
  return <Icon size={20} color={colors[type as keyof typeof colors] || '#3B82F6'} />;
};

export default function NotificationsPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('all');
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const filteredNotifications = selectedType === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === selectedType);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={styles.headerTop}>
          <View style={styles.headerTitleRow}>
            <View style={[styles.bellIcon, { backgroundColor: '#3B82F620' }]}>
              <Bell size={24} color="#3B82F6" />
              {unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{unreadCount}</Text>
                </View>
              )}
            </View>
            <View>
              <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Notifications</Text>
              <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
                {unreadCount} unread notifications
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push('/ai-agent/settings')} style={styles.settingsBtn}>
            <Settings size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity onPress={markAllAsRead} style={[styles.actionBtn, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <CheckCircle2 size={16} color={theme.colors.textSecondary} />
            <Text style={[styles.actionText, { color: theme.colors.textSecondary }]}>Mark All Read</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={clearAll} style={[styles.actionBtn, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Trash2 size={16} color={theme.colors.textSecondary} />
            <Text style={[styles.actionText, { color: theme.colors.textSecondary }]}>Clear All</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Type Filter */}
      <View style={[styles.filterSection, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {NOTIFICATION_TYPES.map((type) => (
            <TouchableOpacity
              key={type.id}
              onPress={() => setSelectedType(type.id)}
              style={[
                styles.typeChip,
                { backgroundColor: selectedType === type.id ? type.color + '20' : theme.colors.background },
                selectedType === type.id && { borderColor: type.color, borderWidth: 1 }
              ]}
            >
              <Text style={[styles.typeText, { color: selectedType === type.id ? type.color : theme.colors.textSecondary }]}>
                {type.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Notifications List */}
      <View style={[styles.notificationsSection, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.countText, { color: theme.colors.textSecondary }]}>
          {filteredNotifications.length} notifications
        </Text>
        
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <BellRing size={48} color={theme.colors.textSecondary} />
            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>No notifications</Text>
            <Text style={[styles.emptyDesc, { color: theme.colors.textSecondary }]}>
              You're all caught up!
            </Text>
          </View>
        ) : (
          <View style={styles.notificationsList}>
            {filteredNotifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                onPress={() => markAsRead(notification.id)}
                style={[
                  styles.notificationCard,
                  { backgroundColor: theme.colors.background },
                  !notification.read && { borderLeftWidth: 3, borderLeftColor: NOTIFICATION_TYPES.find(t => t.id === notification.type)?.color }
                ]}
              >
                <View style={[styles.iconContainer, { backgroundColor: NOTIFICATION_TYPES.find(t => t.id === notification.type)?.color + '15' }]}>
                  <TypeIcon type={notification.type} />
                </View>
                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <Text style={[styles.notificationTitle, { color: theme.colors.text }]}>{notification.title}</Text>
                    {!notification.read && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={[styles.notificationMessage, { color: theme.colors.textSecondary }]}>
                    {notification.message}
                  </Text>
                  <View style={styles.notificationFooter}>
                    <Text style={[styles.sourceText, { color: theme.colors.textSecondary }]}>{notification.source}</Text>
                    <Text style={[styles.timeText, { color: theme.colors.textSecondary }]}>{notification.time}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Preferences Link */}
      <TouchableOpacity 
        onPress={() => router.push('/ai-agent/options/agent-preferences')}
        style={[styles.preferencesCard, { backgroundColor: '#8B5CF620' }]}
      >
        <View style={[styles.preferencesIcon, { backgroundColor: '#8B5CF6' }]}>
          <Bell size={20} color="#fff" />
        </View>
        <View style={styles.preferencesContent}>
          <Text style={[styles.preferencesTitle, { color: theme.colors.text }]}>Notification Preferences</Text>
          <Text style={[styles.preferencesDesc, { color: theme.colors.textSecondary }]}>
            Customize alert settings and channels
          </Text>
        </View>
        <ChevronRight size={20} color="#8B5CF6" />
      </TouchableOpacity>

      <AgentFeatures agentId="notifications" agentName="Notifications Center" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, borderBottomWidth: 1 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  bellIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  unreadBadge: { position: 'absolute', top: -4, right: -4, width: 20, height: 20, borderRadius: 10, backgroundColor: '#EF4444', justifyContent: 'center', alignItems: 'center' },
  unreadText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 13, marginTop: 2 },
  settingsBtn: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000010' },
  actionsRow: { flexDirection: 'row', gap: 10 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, gap: 6 },
  actionText: { fontSize: 12, fontWeight: '500' },
  filterSection: { marginHorizontal: 16, marginVertical: 12, padding: 12, borderRadius: 16 },
  typeChip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, marginRight: 8 },
  typeText: { fontSize: 13, fontWeight: '500' },
  notificationsSection: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  countText: { fontSize: 13, marginBottom: 12 },
  emptyState: { alignItems: 'center', padding: 40 },
  emptyTitle: { fontSize: 18, fontWeight: '600', marginTop: 16 },
  emptyDesc: { fontSize: 14, marginTop: 4 },
  notificationsList: { gap: 10 },
  notificationCard: { flexDirection: 'row', padding: 14, borderRadius: 12 },
  iconContainer: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  notificationContent: { flex: 1 },
  notificationHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  notificationTitle: { fontSize: 15, fontWeight: '600' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#3B82F6' },
  notificationMessage: { fontSize: 13, lineHeight: 18, marginBottom: 8 },
  notificationFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  sourceText: { fontSize: 11 },
  timeText: { fontSize: 11 },
  preferencesCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  preferencesIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  preferencesContent: { flex: 1 },
  preferencesTitle: { fontSize: 16, fontWeight: '600' },
  preferencesDesc: { fontSize: 13, marginTop: 2 },
});
