
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import {
  ArrowLeft,
  Bot,
  Plus,
  Brain,
  MessageSquare,
  Settings,
  CircleCheck,
  CircleAlert,
  Zap,
  Clock,
  Sparkles,
  ListFilter,
  ToggleLeft,
  Pencil,
  Trash2,
  Shield,
  Globe,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface AIResponderConfig {
  id: string;
  name: string;
  description: string;
  channel: string;
  aiModel: string;
  isActive: boolean;
  responseCount: number;
  satisfactionRate: number;
  avgResponseTime: string;
  personality: string;
  language: string;
  fallbackAction: string;
}

export default function AIResponderScreen() {
  const { theme } = useTheme();
  const [configs, setConfigs] = useState<AIResponderConfig[]>([
    {
      id: '1',
      name: 'Customer Support Bot',
      description: 'Handles customer inquiries, FAQs, and basic troubleshooting',
      channel: 'All Channels',
      aiModel: 'GPT-4 Turbo',
      isActive: true,
      responseCount: 1247,
      satisfactionRate: 92,
      avgResponseTime: '1.3s',
      personality: 'Professional & Helpful',
      language: 'English',
      fallbackAction: 'Transfer to human agent',
    },
    {
      id: '2',
      name: 'Sales Assistant',
      description: 'Qualifies leads, answers product questions, and books demos',
      channel: 'WhatsApp',
      aiModel: 'GPT-4',
      isActive: true,
      responseCount: 432,
      satisfactionRate: 88,
      avgResponseTime: '2.1s',
      personality: 'Friendly & Persuasive',
      language: 'English + Spanish',
      fallbackAction: 'Schedule callback',
    },
    {
      id: '3',
      name: 'Internal Help Desk',
      description: 'Answers employee questions about policies, IT, and HR',
      channel: 'Slack',
      aiModel: 'GPT-3.5 Turbo',
      isActive: false,
      responseCount: 89,
      satisfactionRate: 85,
      avgResponseTime: '0.8s',
      personality: 'Concise & Direct',
      language: 'English',
      fallbackAction: 'Create support ticket',
    },
  ]);

  const [globalEnabled, setGlobalEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleConfig = (id: string) => {
    setConfigs(prev =>
      prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c)
    );
  };

  const filteredConfigs = configs.filter(c =>
    !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderConfig = ({ item }: { item: AIResponderConfig }) => (
    <View style={[styles.configCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.configHeader}>
        <View style={styles.configInfo}>
          <View style={styles.configTitleRow}>
            <Bot size={18} color={item.isActive ? '#AF52DE' : theme.colors.secondaryText} />
            <Text style={[styles.configName, { color: theme.colors.text }]}>{item.name}</Text>
          </View>
          <Text style={[styles.configDesc, { color: theme.colors.secondaryText }]}>
            {item.description}
          </Text>
        </View>
        <Switch
          value={item.isActive}
          onValueChange={() => toggleConfig(item.id)}
          trackColor={{ false: '#767577', true: theme.colors.primary }}
          thumbColor={item.isActive ? '#fff' : '#f4f3f4'}
        />
      </View>

      {/* AI Config Details */}
      <View style={styles.configDetails}>
        <View style={styles.detailRow}>
          <Brain size={14} color="#AF52DE" />
          <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>AI Model</Text>
          <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.aiModel}</Text>
        </View>
        <View style={styles.detailRow}>
          <Sparkles size={14} color="#FF9500" />
          <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Personality</Text>
          <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.personality}</Text>
        </View>
        <View style={styles.detailRow}>
          <Globe size={14} color="#007AFF" />
          <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Language</Text>
          <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.language}</Text>
        </View>
        <View style={styles.detailRow}>
          <Shield size={14} color="#34C759" />
          <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Fallback</Text>
          <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.fallbackAction}</Text>
        </View>
      </View>

      {/* Performance Stats */}
      <View style={[styles.statsBar, { borderTopColor: theme.colors.border }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{item.responseCount}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Responses</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: item.satisfactionRate >= 90 ? '#34C759' : '#FF9500' }]}>
            {item.satisfactionRate}%
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Satisfaction</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{item.avgResponseTime}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Avg Speed</Text>
        </View>
        <View style={styles.configActions}>
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
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>AI Auto-Responder</Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.secondaryText }]}>
            Let AI handle incoming messages intelligently
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
        {/* Global Toggle */}
        <View style={[styles.globalToggleCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.globalToggleInfo}>
            <Bot size={24} color="#AF52DE" />
            <View style={styles.globalToggleText}>
              <Text style={[styles.globalToggleTitle, { color: theme.colors.text }]}>
                AI Auto-Responder
              </Text>
              <Text style={[styles.globalToggleDesc, { color: theme.colors.secondaryText }]}>
                {globalEnabled ? 'Active — AI is handling messages' : 'Disabled — Manual mode'}
              </Text>
            </View>
          </View>
          <Switch
            value={globalEnabled}
            onValueChange={setGlobalEnabled}
            trackColor={{ false: '#767577', true: '#AF52DE' }}
            thumbColor={globalEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        {/* Global Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.miniStat, { backgroundColor: theme.colors.cardBackground }]}>
            <Zap size={16} color="#AF52DE" />
            <Text style={[styles.miniStatValue, { color: theme.colors.text }]}>
              {configs.reduce((s, c) => s + c.responseCount, 0)}
            </Text>
            <Text style={[styles.miniStatLabel, { color: theme.colors.secondaryText }]}>Total AI Replies</Text>
          </View>
          <View style={[styles.miniStat, { backgroundColor: theme.colors.cardBackground }]}>
            <CircleCheck size={16} color="#34C759" />
            <Text style={[styles.miniStatValue, { color: theme.colors.text }]}>
              {Math.round(configs.reduce((s, c) => s + c.satisfactionRate, 0) / configs.length)}%
            </Text>
            <Text style={[styles.miniStatLabel, { color: theme.colors.secondaryText }]}>Avg Satisfaction</Text>
          </View>
        </View>

        {/* Search */}
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
          <ListFilter size={16} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search AI responders..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* AI Responder Configs */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Responder Configs</Text>
          <FlatList
            data={filteredConfigs}
            renderItem={renderConfig}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.configsList}
          />
        </View>

        {/* AI Capabilities */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Capabilities</Text>
          <View style={styles.capabilitiesGrid}>
            {[
              { icon: Brain, label: 'Natural Language', desc: 'Understands context & intent', color: '#AF52DE' },
              { icon: Sparkles, label: 'Personality', desc: 'Customizable tone & style', color: '#FF9500' },
              { icon: Globe, label: 'Multilingual', desc: 'Responds in 50+ languages', color: '#007AFF' },
              { icon: Shield, label: 'Safe Responses', desc: 'Content filtering & guardrails', color: '#34C759' },
            ].map((cap, idx) => {
              const IconComp = cap.icon;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.capCard, { backgroundColor: theme.colors.cardBackground }]}
                >
                  <View style={[styles.capIcon, { backgroundColor: `${cap.color}15` }]}>
                    <IconComp size={18} color={cap.color} />
                  </View>
                  <Text style={[styles.capLabel, { color: theme.colors.text }]}>{cap.label}</Text>
                  <Text style={[styles.capDesc, { color: theme.colors.secondaryText }]}>{cap.desc}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
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
  globalToggleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  globalToggleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  globalToggleText: { flex: 1 },
  globalToggleTitle: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
  globalToggleDesc: { fontSize: 12 },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
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
    marginBottom: 16,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 14 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  configsList: { gap: 12 },
  configCard: {
    padding: 16,
    borderRadius: 14,
  },
  configHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  configInfo: { flex: 1, marginRight: 12 },
  configTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  configName: { fontSize: 15, fontWeight: '600' },
  configDesc: { fontSize: 12, lineHeight: 16 },
  configDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: { fontSize: 12, width: 80 },
  detailValue: { fontSize: 12, flex: 1 },
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 13, fontWeight: '600', marginBottom: 1 },
  statLabel: { fontSize: 10 },
  configActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: { padding: 6 },
  capabilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  capCard: {
    width: '47%',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  capIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  capLabel: { fontSize: 13, fontWeight: '600', marginBottom: 2 },
  capDesc: { fontSize: 11, textAlign: 'center' },
});
