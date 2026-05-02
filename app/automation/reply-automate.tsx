
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import {
  ArrowLeft,
  Reply,
  Plus,
  Clock,
  MessageSquare,
  Brain,
  Settings,
  CircleCheck,
  CircleAlert,
  Zap,
  Pencil,
  Trash2,
  ListFilter,
  Sparkles,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface ReplyRule {
  id: string;
  name: string;
  condition: string;
  replyType: 'template' | 'ai-generated' | 'hybrid';
  replyContent: string;
  platform: string;
  isActive: boolean;
  responseCount: number;
  avgResponseTime: string;
  lastTriggered: string;
}

export default function ReplyAutomateScreen() {
  const { theme } = useTheme();
  const [rules, setRules] = useState<ReplyRule[]>([
    {
      id: '1',
      name: 'Out of Office Auto-Reply',
      condition: 'Message received outside business hours',
      replyType: 'template',
      replyContent: 'Thanks for reaching out! Our team is currently unavailable. We\'ll respond within 2 hours on the next business day.',
      platform: 'All',
      isActive: true,
      responseCount: 312,
      avgResponseTime: '<1s',
      lastTriggered: '30 min ago',
    },
    {
      id: '2',
      name: 'FAQ Auto-Response',
      condition: 'Message contains pricing, hours, or location keywords',
      replyType: 'ai-generated',
      replyContent: 'AI generates contextual response based on knowledge base',
      platform: 'All',
      isActive: true,
      responseCount: 587,
      avgResponseTime: '1.2s',
      lastTriggered: '15 min ago',
    },
    {
      id: '3',
      name: 'Support Ticket Acknowledgment',
      condition: 'New support request received',
      replyType: 'template',
      replyContent: 'We\'ve received your request (#{ticketId}). Our team will review it within 4 hours. Track status at {portalUrl}',
      platform: 'Email',
      isActive: true,
      responseCount: 198,
      avgResponseTime: '<1s',
      lastTriggered: '2 hours ago',
    },
    {
      id: '4',
      name: 'Smart Lead Qualifier',
      condition: 'New inquiry from unknown contact',
      replyType: 'hybrid',
      replyContent: 'AI qualifies lead, then sends personalized template response',
      platform: 'WhatsApp',
      isActive: false,
      responseCount: 45,
      avgResponseTime: '2.5s',
      lastTriggered: '1 week ago',
    },
  ]);

  const [keywordFilter, setKeywordFilter] = useState('');

  const toggleRule = (id: string) => {
    setRules(prev =>
      prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r)
    );
  };

  const getReplyTypeIcon = (type: ReplyRule['replyType']) => {
    switch (type) {
      case 'template': return <MessageSquare size={14} color="#007AFF" />;
      case 'ai-generated': return <Brain size={14} color="#AF52DE" />;
      case 'hybrid': return <Sparkles size={14} color="#FF9500" />;
    }
  };

  const getReplyTypeLabel = (type: ReplyRule['replyType']) => {
    switch (type) {
      case 'template': return 'Template';
      case 'ai-generated': return 'AI Generated';
      case 'hybrid': return 'Hybrid';
    }
  };

  const getReplyTypeColor = (type: ReplyRule['replyType']) => {
    switch (type) {
      case 'template': return '#007AFF';
      case 'ai-generated': return '#AF52DE';
      case 'hybrid': return '#FF9500';
    }
  };

  const filteredRules = rules.filter(r =>
    !keywordFilter || r.name.toLowerCase().includes(keywordFilter.toLowerCase())
  );

  const renderRule = ({ item }: { item: ReplyRule }) => (
    <View style={[styles.ruleCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.ruleHeader}>
        <View style={styles.ruleInfo}>
          <View style={styles.ruleTitleRow}>
            <Reply size={16} color={item.isActive ? '#34C759' : theme.colors.secondaryText} />
            <Text style={[styles.ruleName, { color: theme.colors.text }]}>{item.name}</Text>
          </View>
          <Text style={[styles.ruleCondition, { color: theme.colors.secondaryText }]}>
            {item.condition}
          </Text>
        </View>
        <Switch
          value={item.isActive}
          onValueChange={() => toggleRule(item.id)}
          trackColor={{ false: '#767577', true: theme.colors.primary }}
          thumbColor={item.isActive ? '#fff' : '#f4f3f4'}
        />
      </View>

      <View style={[styles.replyPreview, { backgroundColor: `${getReplyTypeColor(item.replyType)}08`, borderColor: `${getReplyTypeColor(item.replyType)}20` }]}>
        {getReplyTypeIcon(item.replyType)}
        <View style={styles.replyContentInfo}>
          <View style={[styles.replyTypeBadge, { backgroundColor: `${getReplyTypeColor(item.replyType)}15` }]}>
            <Text style={[styles.replyTypeText, { color: getReplyTypeColor(item.replyType) }]}>
              {getReplyTypeLabel(item.replyType)}
            </Text>
          </View>
          <Text style={[styles.replyText, { color: theme.colors.text }]} numberOfLines={2}>
            {item.replyContent}
          </Text>
        </View>
      </View>

      <View style={styles.ruleFooter}>
        <View style={styles.ruleStats}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{item.responseCount}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Responses</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{item.avgResponseTime}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Avg Time</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{item.platform}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Platform</Text>
          </View>
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
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Reply Automate</Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.secondaryText }]}>
            Smart auto-replies with AI-powered responses
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
        {/* Response Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.miniStat, { backgroundColor: theme.colors.cardBackground }]}>
            <CircleCheck size={16} color="#34C759" />
            <Text style={[styles.miniStatValue, { color: theme.colors.text }]}>
              {rules.filter(r => r.isActive).length}
            </Text>
            <Text style={[styles.miniStatLabel, { color: theme.colors.secondaryText }]}>Active</Text>
          </View>
          <View style={[styles.miniStat, { backgroundColor: theme.colors.cardBackground }]}>
            <Zap size={16} color="#FF9500" />
            <Text style={[styles.miniStatValue, { color: theme.colors.text }]}>
              {rules.reduce((s, r) => s + r.responseCount, 0)}
            </Text>
            <Text style={[styles.miniStatLabel, { color: theme.colors.secondaryText }]}>Replies Sent</Text>
          </View>
          <View style={[styles.miniStat, { backgroundColor: theme.colors.cardBackground }]}>
            <Clock size={16} color="#007AFF" />
            <Text style={[styles.miniStatValue, { color: theme.colors.text }]}>1.2s</Text>
            <Text style={[styles.miniStatLabel, { color: theme.colors.secondaryText }]}>Avg Speed</Text>
          </View>
        </View>

        {/* Search/Filter */}
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
          <ListFilter size={16} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search reply rules..."
            placeholderTextColor={theme.colors.secondaryText}
            value={keywordFilter}
            onChangeText={setKeywordFilter}
          />
        </View>

        {/* Reply Type Legend */}
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <MessageSquare size={12} color="#007AFF" />
            <Text style={[styles.legendText, { color: theme.colors.secondaryText }]}>Template</Text>
          </View>
          <View style={styles.legendItem}>
            <Brain size={12} color="#AF52DE" />
            <Text style={[styles.legendText, { color: theme.colors.secondaryText }]}>AI Generated</Text>
          </View>
          <View style={styles.legendItem}>
            <Sparkles size={12} color="#FF9500" />
            <Text style={[styles.legendText, { color: theme.colors.secondaryText }]}>Hybrid</Text>
          </View>
        </View>

        {/* Reply Rules */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Reply Rules</Text>
          <FlatList
            data={filteredRules}
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
    marginBottom: 20,
  },
  miniStat: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    gap: 4,
  },
  miniStatValue: { fontSize: 18, fontWeight: '700' },
  miniStatLabel: { fontSize: 11, fontWeight: '500' },
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
  legendRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
    paddingLeft: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendText: { fontSize: 12 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
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
  ruleCondition: { fontSize: 12, lineHeight: 16 },
  replyPreview: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
    gap: 10,
  },
  replyContentInfo: { flex: 1 },
  replyTypeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6,
  },
  replyTypeText: { fontSize: 10, fontWeight: '600' },
  replyText: { fontSize: 13, lineHeight: 18 },
  ruleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ruleStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 13, fontWeight: '600', marginBottom: 1 },
  statLabel: { fontSize: 10 },
  ruleActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: { padding: 6 },
});
