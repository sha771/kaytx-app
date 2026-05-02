import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Database,
  Plus,
  Search,
  FileText,
  Folder,
  Tag,
  Clock,
  EllipsisVertical,
  Pencil,
  Trash2,
  Upload,
  Download,
  RefreshCw,
  CircleCheck,
  CircleAlert,
  Globe,
  Link,
  File,
  Book,
  Layers,
  ListFilter,
  ChevronRight,
  Star,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Types
interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  type: 'faqs' | 'documents' | 'articles' | 'links';
  itemCount: number;
  lastUpdated: string;
  status: 'active' | 'syncing' | 'error';
  usedBy: string[];
  tags: string[];
}

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  views: number;
  helpful: number;
  lastModified: string;
  status: 'published' | 'draft' | 'archived';
}

// Mock Data
const KNOWLEDGE_BASES: KnowledgeBase[] = [
  {
    id: '1',
    name: 'Customer Support FAQs',
    description: 'Common questions and answers for customer support',
    type: 'faqs',
    itemCount: 245,
    lastUpdated: '2026-03-01',
    status: 'active',
    usedBy: ['Support AI', 'Customer Experience AI'],
    tags: ['support', 'customer', 'faq'],
  },
  {
    id: '2',
    name: 'Product Documentation',
    description: 'Technical documentation and product guides',
    type: 'documents',
    itemCount: 89,
    lastUpdated: '2026-02-28',
    status: 'syncing',
    usedBy: ['Knowledge Base AI', 'Support AI'],
    tags: ['docs', 'technical', 'product'],
  },
  {
    id: '3',
    name: 'Sales Playbooks',
    description: 'Sales strategies, scripts, and best practices',
    type: 'articles',
    itemCount: 56,
    lastUpdated: '2026-02-25',
    status: 'active',
    usedBy: ['Sales AI'],
    tags: ['sales', 'revenue', 'playbook'],
  },
  {
    id: '4',
    name: 'External Resources',
    description: 'Links to external knowledge sources and APIs',
    type: 'links',
    itemCount: 34,
    lastUpdated: '2026-02-20',
    status: 'active',
    usedBy: ['Research AI', 'Marketing AI'],
    tags: ['external', 'api', 'resources'],
  },
];

const KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  {
    id: '1',
    title: 'How to reset your password',
    content: 'Go to Settings > Security > Change Password...',
    category: 'Account',
    tags: ['password', 'account', 'security'],
    views: 1234,
    helpful: 98,
    lastModified: '2026-02-28',
    status: 'published',
  },
  {
    id: '2',
    title: 'Understanding billing cycles',
    content: 'Our billing cycle runs from the 1st to the end of each month...',
    category: 'Billing',
    tags: ['billing', 'payment', 'subscription'],
    views: 892,
    helpful: 95,
    lastModified: '2026-02-25',
    status: 'published',
  },
  {
    id: '3',
    title: 'API rate limiting explained',
    content: 'API requests are limited to 1000 per hour for standard plans...',
    category: 'Developers',
    tags: ['api', 'developers', 'technical'],
    views: 567,
    helpful: 92,
    lastModified: '2026-02-20',
    status: 'published',
  },
  {
    id: '4',
    title: 'New feature: AI Agent Workflows',
    content: '[DRAFT] Documentation for the new workflow builder feature...',
    category: 'Product',
    tags: ['workflows', 'features', 'beta'],
    views: 0,
    helpful: 0,
    lastModified: '2026-03-01',
    status: 'draft',
  },
];

const TYPE_ICONS = {
  faqs: Book,
  documents: FileText,
  articles: File,
  links: Globe,
};

const TYPE_COLORS = {
  faqs: '#3B82F6',
  documents: '#F59E0B',
  articles: '#10B981',
  links: '#8B5CF6',
};

const STATUS_COLORS = {
  active: '#10B981',
  syncing: '#3B82F6',
  error: '#EF4444',
};

export default function KnowledgeBaseScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [activeTab, setActiveTab] = useState<'bases' | 'items' | 'stats'>('bases');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBase, setSelectedBase] = useState<KnowledgeBase | null>(null);

  const filteredBases = KNOWLEDGE_BASES.filter(
    base =>
      base.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      base.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredItems = KNOWLEDGE_ITEMS.filter(
    item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderKnowledgeBaseCard = (base: KnowledgeBase, index: number) => {
    const TypeIcon = TYPE_ICONS[base.type];
    const typeColor = TYPE_COLORS[base.type];

    return (
      <Animated.View
        key={base.id}
        entering={FadeInUp.delay(index * 50)}
        style={[styles.baseCard, { backgroundColor: colors.card }]}
      >
        <View style={styles.baseHeader}>
          <View style={[styles.typeIcon, { backgroundColor: typeColor + '15' }]}>
            <TypeIcon size={22} color={typeColor} />
          </View>
          <View style={styles.baseInfo}>
            <Text style={[styles.baseName, { color: colors.text }]}>{base.name}</Text>
            <Text style={[styles.baseDescription, { color: colors.icon }]}>
              {base.description}
            </Text>
          </View>
          <TouchableOpacity>
            <EllipsisVertical size={20} color={colors.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.baseStats}>
          <View style={styles.baseStat}>
            <Layers size={14} color={colors.icon} />
            <Text style={[styles.baseStatText, { color: colors.icon }]}>
              {base.itemCount} items
            </Text>
          </View>
          <View style={styles.baseStat}>
            <Clock size={14} color={colors.icon} />
            <Text style={[styles.baseStatText, { color: colors.icon }]}>
              {base.lastUpdated}
            </Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: STATUS_COLORS[base.status] + '15' },
            ]}
          >
            <View
              style={[
                styles.statusDot,
                { backgroundColor: STATUS_COLORS[base.status] },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                { color: STATUS_COLORS[base.status] },
              ]}
            >
              {base.status}
            </Text>
          </View>
        </View>

        <View style={styles.tagsRow}>
          {base.tags.map((tag, i) => (
            <View key={i} style={[styles.tagChip, { backgroundColor: colors.tint + '10' }]}>
              <Tag size={10} color={colors.tint} />
              <Text style={[styles.tagText, { color: colors.tint }]}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.usedBySection}>
          <Text style={[styles.usedByLabel, { color: colors.icon }]}>Used by:</Text>
          <View style={styles.usedByAgents}>
            {base.usedBy.map((agent, i) => (
              <View key={i} style={[styles.agentChip, { backgroundColor: colors.background }]}>
                <Text style={[styles.agentChipText, { color: colors.text }]}>{agent}</Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderKnowledgeItemRow = (item: KnowledgeItem, index: number) => (
    <Animated.View
      key={item.id}
      entering={FadeInUp.delay(index * 30)}
      style={[styles.itemRow, { backgroundColor: colors.card }]}
    >
      <View style={styles.itemHeader}>
        <View style={styles.itemTitleSection}>
          <Text style={[styles.itemTitle, { color: colors.text }]}>{item.title}</Text>
          <View style={styles.itemMeta}>
            <View
              style={[
                styles.statusChip,
                {
                  backgroundColor:
                    item.status === 'published'
                      ? '#10B981' + '15'
                      : item.status === 'draft'
                      ? '#F59E0B' + '15'
                      : '#6B7280' + '15',
                },
              ]}
            >
              <Text
                style={[
                  styles.statusChipText,
                  {
                    color:
                      item.status === 'published'
                        ? '#10B981'
                        : item.status === 'draft'
                        ? '#F59E0B'
                        : '#6B7280',
                  },
                ]}
              >
                {item.status}
              </Text>
            </View>
            <Text style={[styles.itemCategory, { color: colors.icon }]}>
              {item.category}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <EllipsisVertical size={18} color={colors.icon} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.itemContent, { color: colors.icon }]} numberOfLines={2}>
        {item.content}
      </Text>

      <View style={styles.itemFooter}>
        <View style={styles.itemStats}>
          <View style={styles.itemStat}>
            <Globe size={12} color={colors.icon} />
            <Text style={[styles.itemStatText, { color: colors.icon }]}>
              {item.views} views
            </Text>
          </View>
          <View style={styles.itemStat}>
            <CircleCheck size={12} color={colors.icon} />
            <Text style={[styles.itemStatText, { color: colors.icon }]}>
              {item.helpful}% helpful
            </Text>
          </View>
        </View>
        <Text style={[styles.itemDate, { color: colors.icon }]}>
          Modified {item.lastModified}
        </Text>
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
              Knowledge Base
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
              Manage AI training content
            </Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.tint }]}>
          <Plus size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>424</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Total Items</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>12</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Knowledge Bases</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>8.2K</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Total Views</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'bases' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('bases')}
        >
          <Folder size={16} color={activeTab === 'bases' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'bases' ? 'white' : colors.text }]}>
            Bases
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'items' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('items')}
        >
          <FileText size={16} color={activeTab === 'items' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'items' ? 'white' : colors.text }]}>
            Items
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'stats' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('stats')}
        >
          <Database size={16} color={activeTab === 'stats' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'stats' ? 'white' : colors.text }]}>
            Stats
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchInput, { backgroundColor: colors.card }]}>
          <Search size={18} color={colors.icon} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Search knowledge base..."
            placeholderTextColor={colors.icon}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.card }]}>
          <ListFilter size={18} color={colors.icon} />
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      {activeTab === 'items' && (
        <View style={styles.actionBar}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.tint + '15' }]}>
            <Upload size={16} color={colors.tint} />
            <Text style={[styles.actionButtonText, { color: colors.tint }]}>Import</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.tint + '15' }]}>
            <Download size={16} color={colors.tint} />
            <Text style={[styles.actionButtonText, { color: colors.tint }]}>Export</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.tint + '15' }]}>
            <RefreshCw size={16} color={colors.tint} />
            <Text style={[styles.actionButtonText, { color: colors.tint }]}>Sync</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {activeTab === 'bases' && (
          <>
            {filteredBases.map((base, index) => renderKnowledgeBaseCard(base, index))}
            {filteredBases.length === 0 && (
              <View style={styles.emptyState}>
                <Database size={48} color={colors.icon} />
                <Text style={[styles.emptyTitle, { color: colors.text }]}>
                  No knowledge bases found
                </Text>
                <Text style={[styles.emptyText, { color: colors.icon }]}>
                  Create your first knowledge base to get started
                </Text>
              </View>
            )}
          </>
        )}

        {activeTab === 'items' && (
          <>
            {filteredItems.map((item, index) => renderKnowledgeItemRow(item, index))}
            {filteredItems.length === 0 && (
              <View style={styles.emptyState}>
                <FileText size={48} color={colors.icon} />
                <Text style={[styles.emptyTitle, { color: colors.text }]}>
                  No items found
                </Text>
                <Text style={[styles.emptyText, { color: colors.icon }]}>
                  Try adjusting your search
                </Text>
              </View>
            )}
          </>
        )}

        {activeTab === 'stats' && (
          <Animated.View entering={FadeInUp} style={styles.statsContent}>
            <View style={[styles.statsCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.statsCardTitle, { color: colors.text }]}>
                Knowledge Base Performance
              </Text>
              <View style={styles.statsGrid}>
                <View style={styles.statBox}>
                  <Text style={[styles.statBoxValue, { color: colors.text }]}>2.4K</Text>
                  <Text style={[styles.statBoxLabel, { color: colors.icon }]}>
                    Searches this week
                  </Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={[styles.statBoxValue, { color: colors.text }]}>87%</Text>
                  <Text style={[styles.statBoxLabel, { color: colors.icon }]}>
                    Find rate
                  </Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={[styles.statBoxValue, { color: colors.text }]}>4.6/5</Text>
                  <Text style={[styles.statBoxLabel, { color: colors.icon }]}>
                    Avg rating
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.topItemsCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.topItemsTitle, { color: colors.text }]}>
                Top Performing Items
              </Text>
              <View style={styles.topItem}>
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <Text style={[styles.topItemText, { color: colors.text }]}>
                  How to reset your password
                </Text>
                <Text style={[styles.topItemViews, { color: colors.icon }]}>
                  1,234 views
                </Text>
              </View>
              <View style={styles.topItem}>
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <Text style={[styles.topItemText, { color: colors.text }]}>
                  Understanding billing cycles
                </Text>
                <Text style={[styles.topItemViews, { color: colors.icon }]}>
                  892 views
                </Text>
              </View>
              <View style={styles.topItem}>
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <Text style={[styles.topItemText, { color: colors.text }]}>
                  API rate limiting explained
                </Text>
                <Text style={[styles.topItemViews, { color: colors.icon }]}>
                  567 views
                </Text>
              </View>
            </View>
          </Animated.View>
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
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
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
    gap: 6,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  baseCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  baseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  baseInfo: {
    flex: 1,
  },
  baseName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 2,
  },
  baseDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  baseStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  baseStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  baseStatText: {
    fontSize: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 4,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '500',
  },
  usedBySection: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  usedByLabel: {
    fontSize: 11,
    marginBottom: 8,
  },
  usedByAgents: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  agentChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  agentChipText: {
    fontSize: 12,
  },
  itemRow: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemTitleSection: {
    flex: 1,
    marginRight: 8,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  statusChipText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  itemCategory: {
    fontSize: 12,
  },
  itemContent: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemStats: {
    flexDirection: 'row',
    gap: 16,
  },
  itemStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  itemStatText: {
    fontSize: 11,
  },
  itemDate: {
    fontSize: 11,
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
  statsContent: {
    gap: 16,
  },
  statsCard: {
    padding: 20,
    borderRadius: 16,
  },
  statsCardTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#00000005',
    borderRadius: 10,
  },
  statBoxValue: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  statBoxLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  topItemsCard: {
    padding: 20,
    borderRadius: 16,
  },
  topItemsTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
  },
  topItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  topItemText: {
    flex: 1,
    fontSize: 14,
  },
  topItemViews: {
    fontSize: 12,
  },
});
