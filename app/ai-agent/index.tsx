import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Bot,
  Database,
  Mic,
  Zap,
  ArrowRight,
  Search,
  LayoutGrid,
  Users,
  Sparkles,
  Menu,
  X,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import {
  allAgents,
  allMainAgents,
  allSubAgents,
  agentCategories,
  getAgentsWithVoiceEnabled,
} from '@/constants/aiAgentHierarchy';
import { AIAgentsSidebar } from '@/components/ai-agent/AIAgentsSidebar';

const categoryRoutes: Record<string, string> = {
  'customer-experience': '/ai-agent/customer-experience-ai',
  'sales-revenue': '/ai-agent/sales-revenue-ai',
  'marketing-growth': '/ai-agent/marketing-growth-ai',
  'operations-management': '/ai-agent/operations-management-ai',
  'data-intelligence': '/ai-agent/data-intelligence-ai',
  'analysis-insights-performance': '/ai-agent/analysis-performance-ai',
  'accounting-finance': '/ai-agent/accounting-finance-ai',
  'executive-leadership': '/ai-agent/executive-leadership-ai',
  'product-rnd': '/ai-agent/product-rnd-ai',
  'social-media-management': '/ai-agent/social-media-management-ai',
  'human-resources': '/ai-agent/human-resources-ai',
  'it-technology': '/ai-agent/it-technology-ai',
  'legal-compliance': '/ai-agent/legal-compliance-ai',
  'engineering-development': '/ai-agent/engineering-development-ai',
  'ai-personal-assistant': '/ai-agent/ai-personal-assistant-ai',
  'trading-investment': '/ai-agent/trading-investment-ai',
};

export default function AIAgentsHubScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'main' | 'sub'>('all');
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('');

  const stats = {
    totalAgents: allAgents.length,
    mainAgents: allMainAgents.length,
    subAgents: allSubAgents.length,
    withVoice: getAgentsWithVoiceEnabled().length,
    active: allAgents.filter(a => a.status === 'active').length,
    categories: agentCategories.length,
  };

  const handleCategoryPress = (categoryId: string) => {
    const route = categoryRoutes[categoryId];
    if (route) {
      router.push(route as any);
    }
  };

  const handleAgentPress = (agentId: string) => {
    router.push(`/ai-agent/agent-configuration?id=${agentId}`);
  };

  const handleGlobalDataUpload = () => {
    router.push('/ai-agent/agent-data-upload');
  };

  const filteredAgents = allAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 'main') return agent.type === 'main_agent';
    if (activeTab === 'sub') return agent.type === 'subagent';
    return true;
  });

  const renderCategoryCard = (category: typeof agentCategories[0], index: number) => (
    <Animated.View entering={FadeInUp.delay(index * 100)} key={category.id}>
      <TouchableOpacity
        style={[styles.categoryCard, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => handleCategoryPress(category.id)}
      >
        <View style={[styles.categoryIcon, { backgroundColor: category.color + '15' }]}>
          <category.icon size={28} color={category.color} />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={[styles.categoryName, { color: colors.text }]}>{category.label}</Text>
          <Text style={[styles.categorySubtitle, { color: colors.text + '60' }]}>
            {allSubAgents.filter(a => a.category === category.id).length} AI Employees
          </Text>
        </View>
        <ArrowRight size={20} color={colors.text + '40'} />
      </TouchableOpacity>
    </Animated.View>
  );

  const renderAgentCard = (agent: typeof allAgents[0], index: number) => (
    <Animated.View entering={FadeInUp.delay(index * 50)} key={agent.id}>
      <TouchableOpacity
        style={[styles.agentCard, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => handleAgentPress(agent.id)}
      >
        <View style={[styles.agentIcon, { backgroundColor: agent.color + '15' }]}>
          <agent.icon size={24} color={agent.color} />
        </View>
        <View style={styles.agentInfo}>
          <Text style={[styles.agentName, { color: colors.text }]}>{agent.name}</Text>
          <Text style={[styles.agentTitle, { color: colors.text + '60' }]} numberOfLines={1}>
            {agent.title}
          </Text>
          <View style={styles.agentMeta}>
            <View style={[styles.typeBadge, { 
              backgroundColor: agent.type === 'main_agent' ? '#8B5CF6' : '#3B82F6' 
            }]}>
              <Text style={styles.typeText}>{agent.type === 'main_agent' ? 'Main' : 'Sub'}</Text>
            </View>
            {agent.configuration?.voice.enabled && (
              <View style={[styles.featureBadge, { backgroundColor: '#10B981' }]}>
                <Mic size={10} color="#fff" />
              </View>
            )}
            {agent.configuration?.training.enabled && (
              <View style={[styles.featureBadge, { backgroundColor: '#F59E0B' }]}>
                <Zap size={10} color="#fff" />
              </View>
            )}
          </View>
        </View>
        <ArrowRight size={18} color={colors.text + '40'} />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ChevronLeft size={24} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowSidebar(!showSidebar)} style={styles.sidebarToggle}>
              {showSidebar ? <X size={22} color={colors.primary} /> : <Menu size={22} color={colors.text} />}
            </TouchableOpacity>
          </View>
          <View style={styles.headerTitleContainer}>
            <Sparkles size={22} color={colors.primary} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>AI Agents & Employees</Text>
          </View>
          <TouchableOpacity onPress={handleGlobalDataUpload} style={styles.dataButton}>
            <Database size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Stats Overview */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
          <Animated.View entering={FadeInRight} style={[styles.statCard, { backgroundColor: colors.primary + '15' }]}>
            <Bot size={20} color={colors.primary} />
            <Text style={[styles.statNumber, { color: colors.primary }]}>{stats.totalAgents}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>Total Agents</Text>
          </Animated.View>
          <Animated.View entering={FadeInRight.delay(100)} style={[styles.statCard, { backgroundColor: '#8B5CF6' + '15' }]}>
            <LayoutGrid size={20} color="#8B5CF6" />
            <Text style={[styles.statNumber, { color: '#8B5CF6' }]}>{stats.mainAgents}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>Main Agents</Text>
          </Animated.View>
          <Animated.View entering={FadeInRight.delay(200)} style={[styles.statCard, { backgroundColor: '#3B82F6' + '15' }]}>
            <Users size={20} color="#3B82F6" />
            <Text style={[styles.statNumber, { color: '#3B82F6' }]}>{stats.subAgents}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>AI Employees</Text>
          </Animated.View>
          <Animated.View entering={FadeInRight.delay(300)} style={[styles.statCard, { backgroundColor: '#10B981' + '15' }]}>
            <Mic size={20} color="#10B981" />
            <Text style={[styles.statNumber, { color: '#10B981' }]}>{stats.withVoice}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>Voice Enabled</Text>
          </Animated.View>
        </ScrollView>

        {/* Search */}
        <View style={[styles.searchContainer, { backgroundColor: colors.border + '30' }]}>
          <Search size={18} color={colors.text + '60'} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search all agents..."
            placeholderTextColor={colors.text + '40'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {(['all', 'main', 'sub'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && { backgroundColor: colors.primary }]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, { color: activeTab === tab ? '#fff' : colors.text }]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Main Content with Sidebar */}
      <View style={styles.mainContent}>
        {/* 3-Line Sidebar */}
        {showSidebar && (
          <View style={[styles.sidebarContainer, { borderRightColor: colors.border }]}>
            <AIAgentsSidebar activeCategory={activeCategory} onCategoryPress={(id) => { setActiveCategory(id); handleCategoryPress(id); }} />
          </View>
        )}

        {/* Content Area */}
        <ScrollView style={[styles.content, showSidebar && styles.contentWithSidebar]} showsVerticalScrollIndicator={false}>
          {/* Categories Section - Only show when not searching */}
          {!searchQuery && activeTab === 'all' && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Agent Categories</Text>
                <Text style={[styles.sectionCount, { color: colors.text + '40' }]}>{agentCategories.length}</Text>
              </View>
              <View style={styles.categoriesGrid}>
                {agentCategories.map((category, index) => renderCategoryCard(category, index))}
              </View>
            </>
          )}

          {/* Agents List */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {searchQuery ? 'Search Results' : activeTab === 'all' ? 'All Agents' : activeTab === 'main' ? 'Main Agents' : 'AI Employees'}
            </Text>
            <Text style={[styles.sectionCount, { color: colors.text + '40' }]}>{filteredAgents.length}</Text>
          </View>
          <View style={styles.agentsList}>
            {filteredAgents.map((agent, index) => renderAgentCard(agent, index))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backButton: {
    padding: 8,
  },
  sidebarToggle: {
    padding: 8,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  dataButton: {
    padding: 8,
  },
  statsScroll: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    minWidth: 90,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebarContainer: {
    width: 280,
    borderRightWidth: 1,
  },
  content: {
    flex: 1,
  },
  contentWithSidebar: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  sectionCount: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoriesGrid: {
    paddingHorizontal: 16,
    gap: 10,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
    marginLeft: 12,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
  },
  categorySubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  agentsList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  agentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  agentIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  agentName: {
    fontSize: 15,
    fontWeight: '600',
  },
  agentTitle: {
    fontSize: 12,
    marginTop: 2,
  },
  agentMeta: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  typeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  featureBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
