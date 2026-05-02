
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import {
  ArrowLeft,
  Plus,
  Clock,
  Send,
  Mail,
  MessageSquare,
  CalendarClock,
  Settings,
  CircleCheck,
  CircleAlert,
  Pencil,
  Trash2,
  ListFilter,
  Repeat,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface ScheduledMsg {
  id: string;
  recipient: string;
  recipientAvatar: string;
  message: string;
  scheduledDate: string;
  scheduledTime: string;
  platform: string;
  recurrence: 'once' | 'daily' | 'weekly' | 'monthly';
  status: 'pending' | 'sent' | 'failed' | 'cancelled';
}

export default function ScheduledMessagesScreen() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'sent'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [messages, setMessages] = useState<ScheduledMsg[]>([
    {
      id: '1',
      recipient: 'Team Alpha',
      recipientAvatar: '👥',
      message: 'Good morning team! Here are today\'s priorities and standup notes.',
      scheduledDate: 'Today',
      scheduledTime: '8:00 AM',
      platform: 'Slack',
      recurrence: 'daily',
      status: 'pending',
    },
    {
      id: '2',
      recipient: 'Acme Corp - John',
      recipientAvatar: '🏢',
      message: 'Hi John, following up on our meeting from last week. Attached is the revised proposal.',
      scheduledDate: 'Today',
      scheduledTime: '9:30 AM',
      platform: 'Email',
      recurrence: 'once',
      status: 'pending',
    },
    {
      id: '3',
      recipient: 'Support Queue',
      recipientAvatar: '🎧',
      message: 'Our team is currently unavailable. We\'ll respond within 2 hours during business hours.',
      scheduledDate: 'Recurring',
      scheduledTime: 'After hours',
      platform: 'All',
      recurrence: 'daily',
      status: 'sent',
    },
    {
      id: '4',
      recipient: 'Marketing Team',
      recipientAvatar: '📊',
      message: 'Weekly social media performance report is ready for review.',
      scheduledDate: 'Every Monday',
      scheduledTime: '10:00 AM',
      platform: 'Slack',
      recurrence: 'weekly',
      status: 'pending',
    },
    {
      id: '5',
      recipient: 'Client List - Q2',
      recipientAvatar: '📋',
      message: 'Your monthly invoice summary for May 2026 is now available.',
      scheduledDate: 'May 31, 2026',
      scheduledTime: '12:00 PM',
      platform: 'Email',
      recurrence: 'monthly',
      status: 'pending',
    },
    {
      id: '6',
      recipient: 'VIP Customers',
      recipientAvatar: '⭐',
      message: 'Exclusive offer just for you! Use code VIP20 for 20% off your next purchase.',
      scheduledDate: 'Jun 1, 2026',
      scheduledTime: '9:00 AM',
      platform: 'WhatsApp',
      recurrence: 'once',
      status: 'pending',
    },
  ]);

  const filteredMessages = messages.filter(m => {
    const tabMatch = activeTab === 'all' ||
      (activeTab === 'pending' && m.status === 'pending') ||
      (activeTab === 'sent' && m.status === 'sent');
    const searchMatch = !searchQuery ||
      m.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase());
    return tabMatch && searchMatch;
  });

  const getRecurrenceIcon = (recurrence: ScheduledMsg['recurrence']) => {
    switch (recurrence) {
      case 'once': return <Send size={12} color={theme.colors.secondaryText} />;
      case 'daily': return <Repeat size={12} color="#FF9500" />;
      case 'weekly': return <CalendarClock size={12} color="#007AFF" />;
      case 'monthly': return <CalendarClock size={12} color="#AF52DE" />;
    }
  };

  const getRecurrenceLabel = (recurrence: ScheduledMsg['recurrence']) => {
    switch (recurrence) {
      case 'once': return 'One-time';
      case 'daily': return 'Daily';
      case 'weekly': return 'Weekly';
      case 'monthly': return 'Monthly';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Slack': return '#E01E5A';
      case 'Email': return '#007AFF';
      case 'WhatsApp': return '#25D366';
      case 'SMS': return '#34C759';
      default: return '#FF9500';
    }
  };

  const getStatusStyle = (status: ScheduledMsg['status']) => {
    switch (status) {
      case 'pending': return { color: '#FF9500', bg: '#FF950020' };
      case 'sent': return { color: '#34C759', bg: '#34C75920' };
      case 'failed': return { color: '#FF3B30', bg: '#FF3B3020' };
      case 'cancelled': return { color: '#8E8E93', bg: '#8E8E9320' };
    }
  };

  const renderMessage = ({ item }: { item: ScheduledMsg }) => {
    const statusStyle = getStatusStyle(item.status);
    return (
      <View style={[styles.msgCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.msgHeader}>
          <View style={styles.msgRecipientRow}>
            <Text style={styles.avatar}>{item.recipientAvatar}</Text>
            <View style={styles.msgRecipientInfo}>
              <Text style={[styles.msgRecipient, { color: theme.colors.text }]}>{item.recipient}</Text>
              <View style={styles.msgMetaRow}>
                {getRecurrenceIcon(item.recurrence)}
                <Text style={[styles.msgRecurrence, { color: theme.colors.secondaryText }]}>
                  {getRecurrenceLabel(item.recurrence)}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.statusText, { color: statusStyle.color }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        <Text style={[styles.msgContent, { color: theme.colors.secondaryText }]} numberOfLines={2}>
          {item.message}
        </Text>

        <View style={styles.msgFooter}>
          <View style={styles.msgScheduleInfo}>
            <View style={[styles.platformBadge, { backgroundColor: `${getPlatformColor(item.platform)}15` }]}>
              {item.platform === 'Slack' ? (
                <MessageSquare size={10} color={getPlatformColor(item.platform)} />
              ) : item.platform === 'Email' ? (
                <Mail size={10} color={getPlatformColor(item.platform)} />
              ) : (
                <Send size={10} color={getPlatformColor(item.platform)} />
              )}
              <Text style={[styles.platformText, { color: getPlatformColor(item.platform) }]}>
                {item.platform}
              </Text>
            </View>
            <View style={styles.timeRow}>
              <Clock size={12} color={theme.colors.secondaryText} />
              <Text style={[styles.timeText, { color: theme.colors.secondaryText }]}>
                {item.scheduledDate} at {item.scheduledTime}
              </Text>
            </View>
          </View>
          <View style={styles.msgActions}>
            <TouchableOpacity style={styles.actionBtn}>
              <Pencil size={14} color={theme.colors.secondaryText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Trash2 size={14} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Scheduled Messages</Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.secondaryText }]}>
            Schedule messages across all platforms
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => {}}
        >
          <Plus size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Search */}
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
          <ListFilter size={16} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search scheduled messages..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {(['all', 'pending', 'sent'] as const).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && { backgroundColor: theme.colors.primary }]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, { color: activeTab === tab ? '#fff' : theme.colors.secondaryText }]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.miniStat, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.miniStatValue, { color: '#FF9500' }]}>
              {messages.filter(m => m.status === 'pending').length}
            </Text>
            <Text style={[styles.miniStatLabel, { color: theme.colors.secondaryText }]}>Pending</Text>
          </View>
          <View style={[styles.miniStat, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.miniStatValue, { color: '#34C759' }]}>
              {messages.filter(m => m.status === 'sent').length}
            </Text>
            <Text style={[styles.miniStatLabel, { color: theme.colors.secondaryText }]}>Sent</Text>
          </View>
          <View style={[styles.miniStat, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.miniStatValue, { color: theme.colors.text }]}>
              {messages.filter(m => m.recurrence !== 'once').length}
            </Text>
            <Text style={[styles.miniStatLabel, { color: theme.colors.secondaryText }]}>Recurring</Text>
          </View>
        </View>

        {/* Message List */}
        <FlatList
          data={filteredMessages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.msgList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  backButton: { padding: 8 },
  headerCenter: { flex: 1, marginLeft: 8 },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  headerSubtitle: { fontSize: 13 },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: { flex: 1, paddingHorizontal: 16 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 14 },
  tabRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  tabText: { fontSize: 13, fontWeight: '600' },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  miniStat: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  miniStatValue: { fontSize: 18, fontWeight: '700', marginBottom: 2 },
  miniStatLabel: { fontSize: 11, fontWeight: '500' },
  msgList: { gap: 12, paddingBottom: 20 },
  msgCard: {
    padding: 16,
    borderRadius: 14,
  },
  msgHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  msgRecipientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  avatar: { fontSize: 20 },
  msgRecipientInfo: { flex: 1 },
  msgRecipient: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  msgMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  msgRecurrence: { fontSize: 11 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: { fontSize: 11, fontWeight: '600' },
  msgContent: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  msgFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  msgScheduleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  platformBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 3,
  },
  platformText: { fontSize: 10, fontWeight: '600' },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: { fontSize: 11 },
  msgActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: { padding: 6 },
});
