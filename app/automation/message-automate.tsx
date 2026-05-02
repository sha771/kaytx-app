
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import {
  ArrowLeft,
  Send,
  Clock,
  ListFilter,
  Plus,
  Settings,
  CircleCheck,
  MessageSquare,
  Users,
  Zap,
  CalendarClock,
  CircleAlert,
  Trash2,
  Pencil,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface MessageRule {
  id: string;
  name: string;
  trigger: string;
  message: string;
  platform: string;
  isActive: boolean;
  sentCount: number;
  lastTriggered: string;
}

export default function MessageAutomateScreen() {
  const { theme } = useTheme();
  const [rules, setRules] = useState<MessageRule[]>([
    {
      id: '1',
      name: 'Welcome New Contacts',
      trigger: 'New contact added',
      message: 'Hi {name}! Welcome to our community. We\'re glad to have you!',
      platform: 'All',
      isActive: true,
      sentCount: 142,
      lastTriggered: '2 hours ago',
    },
    {
      id: '2',
      name: 'Appointment Confirmation',
      trigger: 'Appointment booked',
      message: 'Your appointment on {date} at {time} is confirmed. Reply HELP for assistance.',
      platform: 'SMS',
      isActive: true,
      sentCount: 89,
      lastTriggered: '5 hours ago',
    },
    {
      id: '3',
      name: 'Payment Receipt',
      trigger: 'Payment received',
      message: 'Thank you for your payment of ${amount}. Receipt #{receiptId} has been generated.',
      platform: 'Email',
      isActive: true,
      sentCount: 256,
      lastTriggered: '1 day ago',
    },
    {
      id: '4',
      name: 'Birthday Greeting',
      trigger: 'Contact birthday',
      message: 'Happy Birthday {name}! Wishing you a wonderful day from the team!',
      platform: 'All',
      isActive: false,
      sentCount: 34,
      lastTriggered: '3 days ago',
    },
  ]);

  const toggleRule = (id: string) => {
    setRules(prev =>
      prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r)
    );
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'SMS': return '#34C759';
      case 'Email': return '#007AFF';
      case 'Slack': return '#E01E5A';
      case 'WhatsApp': return '#25D366';
      default: return '#FF9500';
    }
  };

  const renderRule = ({ item }: { item: MessageRule }) => (
    <View style={[styles.ruleCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.ruleHeader}>
        <View style={styles.ruleInfo}>
          <View style={styles.ruleTitleRow}>
            <Send size={16} color={item.isActive ? '#007AFF' : theme.colors.secondaryText} />
            <Text style={[styles.ruleName, { color: theme.colors.text }]}>{item.name}</Text>
          </View>
          <Text style={[styles.ruleTrigger, { color: theme.colors.secondaryText }]}>
            Trigger: {item.trigger}
          </Text>
        </View>
        <Switch
          value={item.isActive}
          onValueChange={() => toggleRule(item.id)}
          trackColor={{ false: '#767577', true: theme.colors.primary }}
          thumbColor={item.isActive ? '#fff' : '#f4f3f4'}
        />
      </View>

      <View style={[styles.messagePreview, { backgroundColor: `${theme.colors.primary}08`, borderColor: `${theme.colors.primary}20` }]}>
        <MessageSquare size={14} color={theme.colors.primary} />
        <Text style={[styles.messageText, { color: theme.colors.text }]} numberOfLines={2}>
          {item.message}
        </Text>
      </View>

      <View style={styles.ruleFooter}>
        <View style={[styles.platformBadge, { backgroundColor: `${getPlatformColor(item.platform)}15` }]}>
          <Text style={[styles.platformText, { color: getPlatformColor(item.platform) }]}>
            {item.platform}
          </Text>
        </View>
        <View style={styles.ruleStats}>
          <Text style={[styles.statText, { color: theme.colors.secondaryText }]}>
            {item.sentCount} sent
          </Text>
          <Text style={[styles.statText, { color: theme.colors.secondaryText }]}>
            {item.lastTriggered}
          </Text>
        </View>
        <View style={styles.ruleActions}>
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Message Automate</Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.secondaryText }]}>
            Auto-send messages based on triggers
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => {}}
        >
          <Plus size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <View style={styles.statsRow}>
          <View style={[styles.miniStat, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.miniStatValue, { color: theme.colors.text }]}>
              {rules.filter(r => r.isActive).length}
            </Text>
            <Text style={[styles.miniStatLabel, { color: theme.colors.secondaryText }]}>Active</Text>
          </View>
          <View style={[styles.miniStat, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.miniStatValue, { color: theme.colors.text }]}>
              {rules.reduce((s, r) => s + r.sentCount, 0)}
            </Text>
            <Text style={[styles.miniStatLabel, { color: theme.colors.secondaryText }]}>Total Sent</Text>
          </View>
          <View style={[styles.miniStat, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.miniStatValue, { color: theme.colors.text }]}>
              {rules.length}
            </Text>
            <Text style={[styles.miniStatLabel, { color: theme.colors.secondaryText }]}>Rules</Text>
          </View>
        </View>

        {/* Quick Setup */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Setup</Text>
          <View style={styles.quickSetupRow}>
            <TouchableOpacity
              style={[styles.setupCard, { backgroundColor: theme.colors.cardBackground }]}
              onPress={() => {}}
            >
              <CalendarClock size={20} color="#FF9500" />
              <Text style={[styles.setupLabel, { color: theme.colors.text }]}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.setupCard, { backgroundColor: theme.colors.cardBackground }]}
              onPress={() => {}}
            >
              <ListFilter size={20} color="#007AFF" />
              <Text style={[styles.setupLabel, { color: theme.colors.text }]}>Condition</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.setupCard, { backgroundColor: theme.colors.cardBackground }]}
              onPress={() => {}}
            >
              <Users size={20} color="#34C759" />
              <Text style={[styles.setupLabel, { color: theme.colors.text }]}>Audience</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.setupCard, { backgroundColor: theme.colors.cardBackground }]}
              onPress={() => {}}
            >
              <Zap size={20} color="#AF52DE" />
              <Text style={[styles.setupLabel, { color: theme.colors.text }]}>Template</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Message Rules */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Message Rules</Text>
          <FlatList
            data={rules}
            renderItem={renderRule}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.rulesList}
          />
        </View>
      </ScrollView>
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
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  miniStat: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  miniStatValue: { fontSize: 20, fontWeight: '700', marginBottom: 2 },
  miniStatLabel: { fontSize: 11, fontWeight: '500' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  quickSetupRow: {
    flexDirection: 'row',
    gap: 10,
  },
  setupCard: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    gap: 6,
  },
  setupLabel: { fontSize: 12, fontWeight: '500' },
  rulesList: { gap: 12 },
  ruleCard: {
    padding: 16,
    borderRadius: 14,
  },
  ruleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  ruleInfo: { flex: 1, marginRight: 12 },
  ruleTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  ruleName: { fontSize: 15, fontWeight: '600' },
  ruleTrigger: { fontSize: 12 },
  messagePreview: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
    gap: 8,
  },
  messageText: { flex: 1, fontSize: 13, lineHeight: 18 },
  ruleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  platformBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  platformText: { fontSize: 11, fontWeight: '600' },
  ruleStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statText: { fontSize: 11 },
  ruleActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: { padding: 6 },
});
