import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Brain,
  Heart,
  Star,
  Clock,
  Tag,
  Search,
  Plus,
  ListFilter,
  ChevronDown,
  User,
  Zap,
  Shield,
  CircleCheck,
  CircleAlert,
  Sparkles,
  Trash2,
  PenLine,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';

// Mock Personal Memories
const MEMORIES = [
  {
    id: '1',
    type: 'preference',
    category: 'Communication',
    content: 'Prefers concise, bullet-point responses over long paragraphs',
    importance: 85,
    confidence: 95,
    verified: true,
    source: 'observed',
    tags: ['communication', 'style'],
    accessCount: 47,
    lastAccessed: '2 hours ago',
    createdAt: '2026-01-15',
  },
  {
    id: '2',
    type: 'fact',
    category: 'Work',
    content: 'Works as VP of Sales at TechCorp, manages a team of 12',
    importance: 90,
    confidence: 100,
    verified: true,
    source: 'explicit',
    tags: ['work', 'role', 'company'],
    accessCount: 89,
    lastAccessed: '30 min ago',
    createdAt: '2026-01-10',
  },
  {
    id: '3',
    type: 'goal',
    category: 'Professional',
    content: 'Aiming to increase team productivity by 25% this quarter',
    importance: 80,
    confidence: 90,
    verified: true,
    source: 'explicit',
    tags: ['goals', 'productivity', 'quarterly'],
    accessCount: 23,
    lastAccessed: '1 day ago',
    createdAt: '2026-02-01',
  },
  {
    id: '4',
    type: 'habit',
    category: 'Schedule',
    content: 'Checks emails at 8am, 12pm, and 4pm daily - avoids constant notifications',
    importance: 75,
    confidence: 88,
    verified: false,
    source: 'inferred',
    tags: ['schedule', 'email', 'routine'],
    accessCount: 34,
    lastAccessed: '3 hours ago',
    createdAt: '2026-02-10',
  },
  {
    id: '5',
    type: 'value',
    category: 'Decision Making',
    content: 'Prioritizes data-driven decisions over gut feelings',
    importance: 82,
    confidence: 92,
    verified: true,
    source: 'observed',
    tags: ['decisions', 'data', 'values'],
    accessCount: 56,
    lastAccessed: '5 hours ago',
    createdAt: '2026-01-20',
  },
];

const MEMORY_TYPES = [
  { id: 'all', label: 'All', icon: Brain, color: '#6366f1' },
  { id: 'preference', label: 'Preferences', icon: Heart, color: '#ec4899' },
  { id: 'fact', label: 'Facts', icon: CircleCheck, color: '#22c55e' },
  { id: 'goal', label: 'Goals', icon: Star, color: '#f59e0b' },
  { id: 'habit', label: 'Habits', icon: Clock, color: '#3b82f6' },
  { id: 'value', label: 'Values', icon: Shield, color: '#8b5cf6' },
];

const RELATIONSHIP_STATS = {
  stage: 'close',
  trustLevel: 78,
  rapportScore: 82,
  interactionCount: 234,
  totalConversations: 89,
};

export default function PersonalMemoryScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [activeType, setActiveType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);

  const colors = {
    background: isDark ? '#0a0a0f' : '#f8f9fa',
    card: isDark ? '#1a1a2e' : '#ffffff',
    text: isDark ? '#ffffff' : '#1a1a2e',
    textSecondary: isDark ? '#a0a0b0' : '#6c757d',
    border: isDark ? '#2a2a3e' : '#e9ecef',
    accent: '#6366f1',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
  };

  const filteredMemories = MEMORIES.filter((memory) => {
    const matchesType = activeType === 'all' || memory.type === activeType;
    const matchesSearch =
      memory.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const renderRelationshipCard = () => (
    <Animated.View entering={FadeInUp.duration(600)} style={[styles.relationshipCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        style={styles.relationshipHeader}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.relationshipAvatar}>
          <User size={32} color="#6366f1" />
        </View>
        <View style={styles.relationshipInfo}>
          <Text style={styles.relationshipTitle}>User Relationship</Text>
          <Text style={styles.relationshipSubtitle}>AI Agent Personal Memory</Text>
        </View>
        <View style={styles.relationshipBadge}>
          <Text style={styles.relationshipBadgeText}>{RELATIONSHIP_STATS.stage.toUpperCase()}</Text>
        </View>
      </LinearGradient>

      <View style={styles.relationshipStats}>
        <View style={styles.relStat}>
          <Text style={[styles.relStatValue, { color: colors.text }]}>{RELATIONSHIP_STATS.trustLevel}%</Text>
          <Text style={[styles.relStatLabel, { color: colors.textSecondary }]}>Trust Level</Text>
        </View>
        <View style={styles.relStat}>
          <Text style={[styles.relStatValue, { color: colors.text }]}>{RELATIONSHIP_STATS.rapportScore}%</Text>
          <Text style={[styles.relStatLabel, { color: colors.textSecondary }]}>Rapport Score</Text>
        </View>
        <View style={styles.relStat}>
          <Text style={[styles.relStatValue, { color: colors.text }]}>{RELATIONSHIP_STATS.interactionCount}</Text>
          <Text style={[styles.relStatLabel, { color: colors.textSecondary }]}>Interactions</Text>
        </View>
        <View style={styles.relStat}>
          <Text style={[styles.relStatValue, { color: colors.text }]}>{RELATIONSHIP_STATS.totalConversations}</Text>
          <Text style={[styles.relStatLabel, { color: colors.textSecondary }]}>Conversations</Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderMemoryCard = (memory: typeof MEMORIES[0], index: number) => {
    const typeConfig = MEMORY_TYPES.find((t) => t.id === memory.type);
    const Icon = typeConfig?.icon || Brain;
    const color = typeConfig?.color || colors.accent;

    return (
      <Animated.View
        key={memory.id}
        entering={FadeInUp.delay(index * 50).duration(600)}
        style={[styles.memoryCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      >
        <View style={styles.memoryHeader}>
          <View style={[styles.memoryTypeIcon, { backgroundColor: color + '20' }]}>
            <Icon size={16} color={color} />
          </View>
          <View style={styles.memoryMeta}>
            <Text style={[styles.memoryCategory, { color: colors.textSecondary }]}>
              {memory.category}
            </Text>
            <Text style={[styles.memoryDate, { color: colors.textSecondary }]}>
              {memory.createdAt}
            </Text>
          </View>
          <View style={styles.memoryBadges}>
            {memory.verified && (
              <View style={[styles.badge, { backgroundColor: colors.success + '20' }]}>
                <CircleCheck size={12} color={colors.success} />
              </View>
            )}
            <View style={[styles.importanceBadge, { backgroundColor: color + '20' }]}>
              <Star size={12} color={color} />
              <Text style={[styles.importanceText, { color }]}>{memory.importance}</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.memoryContent, { color: colors.text }]}>{memory.content}</Text>

        <View style={styles.memoryTags}>
          {memory.tags.map((tag) => (
            <View key={tag} style={[styles.tag, { backgroundColor: colors.border }]}>
              <Text style={[styles.tagText, { color: colors.textSecondary }]}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.memoryFooter, { borderTopColor: colors.border }]}>
          <View style={styles.footerStat}>
            <Zap size={14} color={colors.textSecondary} />
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              {memory.confidence}% confidence
            </Text>
          </View>
          <View style={styles.footerStat}>
            <Clock size={14} color={colors.textSecondary} />
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              {memory.accessCount} accesses
            </Text>
          </View>
          <View style={styles.memoryActions}>
            <TouchableOpacity style={styles.actionIcon}>
              <PenLine size={16} color={colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon}>
              <Trash2 size={16} color={colors.danger} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Personal Memory</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            AI Agent User Context
          </Text>
        </View>
        <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.accent }]}>
          <Plus size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Relationship Card */}
        {renderRelationshipCard()}

        {/* Search */}
        <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Search size={18} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search memories..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <CircleAlert size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Memory Type Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {MEMORY_TYPES.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.filterChip,
                {
                  backgroundColor: activeType === type.id ? type.color : colors.card,
                  borderColor: activeType === type.id ? type.color : colors.border,
                },
              ]}
              onPress={() => setActiveType(type.id)}
            >
              <type.icon size={16} color={activeType === type.id ? '#fff' : type.color} />
              <Text
                style={[
                  styles.filterText,
                  { color: activeType === type.id ? '#fff' : colors.text },
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Stats Row */}
        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Brain size={20} color={colors.accent} />
            <Text style={[styles.statValue, { color: colors.text }]}>{MEMORIES.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Memories</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <CircleCheck size={20} color={colors.success} />
            <Text style={[styles.statValue, { color: colors.text }]}>
              {MEMORIES.filter((m) => m.verified).length}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Verified</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Sparkles size={20} color={colors.warning} />
            <Text style={[styles.statValue, { color: colors.text }]}>
              {Math.round(MEMORIES.reduce((acc, m) => acc + m.importance, 0) / MEMORIES.length)}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Avg Importance</Text>
          </View>
        </Animated.View>

        {/* Memory List */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Memories</Text>
        {filteredMemories.map((memory, index) => renderMemoryCard(memory, index))}

        {/* Insights Section */}
        <Animated.View entering={FadeInUp.delay(400).duration(600)} style={[styles.insightsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.insightsHeader}>
            <Sparkles size={20} color={colors.accent} />
            <Text style={[styles.insightsTitle, { color: colors.text }]}>AI Insights</Text>
          </View>
          <View
            style={[
              styles.insightItem,
              {
                backgroundColor: isDark ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.05)',
                borderColor: isDark ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)',
              },
            ]}
          >
            <CircleCheck size={18} color={colors.success} />
            <View style={styles.insightContent}>
              <Text style={[styles.insightTitle, { color: colors.text }]}>Strong Preference Pattern</Text>
              <Text style={[styles.insightDesc, { color: colors.textSecondary }]}>
                User consistently prefers concise responses. Consider this in all interactions.
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.insightItem,
              {
                backgroundColor: isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.05)',
                borderColor: isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)',
              },
            ]}
          >
            <CircleAlert size={18} color={colors.warning} />
            <View style={styles.insightContent}>
              <Text style={[styles.insightTitle, { color: colors.text }]}>Unverified Memory</Text>
              <Text style={[styles.insightDesc, { color: colors.textSecondary }]}>
                Email checking habit needs verification. Ask user to confirm.
              </Text>
            </View>
          </View>
        </Animated.View>

        <View style={{ height: 40 }} />
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  relationshipCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 16,
  },
  relationshipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  relationshipAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  relationshipInfo: {
    flex: 1,
    marginLeft: 16,
  },
  relationshipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  relationshipSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  relationshipBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  relationshipBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  relationshipStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  relStat: {
    alignItems: 'center',
  },
  relStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  relStatLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  filterScroll: {
    marginBottom: 16,
  },
  filterContent: {
    paddingRight: 16,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  memoryCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  memoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  memoryTypeIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memoryMeta: {
    flex: 1,
    marginLeft: 10,
  },
  memoryCategory: {
    fontSize: 12,
    fontWeight: '500',
  },
  memoryDate: {
    fontSize: 11,
    marginTop: 1,
  },
  memoryBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  importanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  importanceText: {
    fontSize: 11,
    fontWeight: '600',
  },
  memoryContent: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  memoryTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
  },
  memoryFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  footerStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 12,
  },
  memoryActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionIcon: {
    padding: 4,
  },
  insightsCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 8,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  insightItem: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  insightDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
});
