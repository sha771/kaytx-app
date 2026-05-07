/**
 * KAYTX AI WORKFORCE - DEPARTMENT 3: MARKETING & GROWTH
 * 15 Main Agents + 45 Sub-Agents = 60 Total Agents
 */

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import {
  ArrowLeft, Search, Users, Crown, Star, Target, Bot,
  Megaphone, TrendingUp, Palette, FileText, BarChart3,
  Zap, ChevronRight, Filter, Grid3X3, List, Activity,
  Mail, Share2, PenTool, Sparkles
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';

const DEPT_COLOR = '#E91E63';
const DEPT_NAME = 'Marketing & Growth';

// Marketing & Growth Department Agents
const marketingGrowthAgents = [
  { id: 'cmo', name: 'AI Chief Marketing Officer', title: 'Chief Marketing Officer', level: 'c_level', efficiency: '96%', cost: '$299/mo', subAgents: 3, capabilities: ['Marketing Strategy', 'Brand Management', 'Budget Allocation'] },
  { id: 'vp-marketing', name: 'AI VP Marketing', title: 'VP Marketing', level: 'vp_director', efficiency: '93%', cost: '$229/mo', subAgents: 3, capabilities: ['Campaign Management', 'Channel Strategy', 'Team Leadership'] },
  { id: 'vp-brand', name: 'AI VP Brand', title: 'VP Brand', level: 'vp_director', efficiency: '92%', cost: '$219/mo', subAgents: 3, capabilities: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines'] },
  { id: 'vp-growth', name: 'AI VP Growth', title: 'VP Growth', level: 'vp_director', efficiency: '94%', cost: '$239/mo', subAgents: 3, capabilities: ['Growth Hacking', 'A/B Testing', 'Funnel Optimization'] },
  { id: 'vp-content', name: 'AI VP Content', title: 'VP Content', level: 'vp_director', efficiency: '91%', cost: '$209/mo', subAgents: 3, capabilities: ['Content Strategy', 'Editorial Planning', 'Content Quality'] },
  { id: 'vp-digital', name: 'AI VP Digital', title: 'VP Digital', level: 'vp_director', efficiency: '92%', cost: '$219/mo', subAgents: 3, capabilities: ['Digital Strategy', 'Web Analytics', 'Conversion Optimization'] },
  { id: 'marketing-manager', name: 'AI Marketing Manager', title: 'Marketing Manager', level: 'manager', efficiency: '89%', cost: '$149/mo', subAgents: 3, capabilities: ['Campaign Execution', 'Team Coordination', 'Budget Tracking'] },
  { id: 'content-marketing', name: 'AI Content Marketing', title: 'Content Marketing', level: 'specialist', efficiency: '90%', cost: '$89/mo', subAgents: 3, capabilities: ['Blog Writing', 'Copy Editing', 'Content Distribution'] },
  { id: 'seo-specialist', name: 'AI SEO Specialist', title: 'SEO Specialist', level: 'specialist', efficiency: '91%', cost: '$99/mo', subAgents: 3, capabilities: ['Keyword Research', 'On-page SEO', 'Backlink Analysis'] },
  { id: 'social-media-manager', name: 'AI Social Media Manager', title: 'Social Media Manager', level: 'specialist', efficiency: '88%', cost: '$79/mo', subAgents: 3, capabilities: ['Social Posting', 'Community Management', 'Trend Monitoring'] },
  { id: 'email-marketing', name: 'AI Email Marketing', title: 'Email Marketing', level: 'specialist', efficiency: '92%', cost: '$89/mo', subAgents: 3, capabilities: ['Email Campaigns', 'List Segmentation', 'Automation'] },
  { id: 'ad-campaign-manager', name: 'AI Ad Campaign Manager', title: 'Ad Campaign Manager', level: 'specialist', efficiency: '90%', cost: '$109/mo', subAgents: 3, capabilities: ['PPC Management', 'Ad Creative', 'Audience Targeting'] },
  { id: 'marketing-analytics', name: 'AI Marketing Analytics', title: 'Marketing Analytics', level: 'specialist', efficiency: '93%', cost: '$99/mo', subAgents: 3, capabilities: ['Attribution Modeling', 'Dashboard Building', 'Insight Reporting'] },
  { id: 'brand-manager', name: 'AI Brand Manager', title: 'Brand Manager', level: 'specialist', efficiency: '89%', cost: '$99/mo', subAgents: 3, capabilities: ['Brand Monitoring', 'Competitor Analysis', 'Messaging Alignment'] },
  { id: 'growth-hacker', name: 'AI Growth Hacker', title: 'Growth Hacker', level: 'specialist', efficiency: '91%', cost: '$119/mo', subAgents: 3, capabilities: ['Viral Loops', 'Referral Programs', 'Acquisition Channels'] },
];

export default function MarketingGrowthDepartment() {
  const ins = useSafeAreaInsets();
  const { theme } = useTheme();
  const { colors } = theme;

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterLevel, setFilterLevel] = useState<string | null>(null);

  const stats = useMemo(() => ({
    total: marketingGrowthAgents.length,
    mainAgents: marketingGrowthAgents.filter(a => a.level !== 'specialist').length,
    specialists: marketingGrowthAgents.filter(a => a.level === 'specialist').length,
    subAgents: marketingGrowthAgents.reduce((acc, a) => acc + a.subAgents, 0),
  }), []);

  const filteredAgents = useMemo(() => {
    let agents = marketingGrowthAgents;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      agents = agents.filter(a => 
        a.name.toLowerCase().includes(q) || 
        a.title.toLowerCase().includes(q) ||
        a.capabilities.some(c => c.toLowerCase().includes(q))
      );
    }
    if (filterLevel) {
      agents = agents.filter(a => a.level === filterLevel);
    }
    return agents;
  }, [searchQuery, filterLevel]);

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'c_level': return Crown;
      case 'vp_director': return Star;
      case 'manager': return Users;
      case 'team_lead': return Target;
      default: return Bot;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'c_level': return '#FFD700';
      case 'vp_director': return '#FF6B6B';
      case 'manager': return '#4ECDC4';
      case 'team_lead': return '#45B7D1';
      default: return '#96CEB4';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: ins.top }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Megaphone size={20} color={DEPT_COLOR} />
          <Text style={[styles.headerTitle, { color: colors.text }]}>{DEPT_NAME}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} style={styles.headerButton}>
            {viewMode === 'grid' ? <List size={22} color={colors.text} /> : <Grid3X3 size={22} color={colors.text} />}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <LinearGradient colors={[DEPT_COLOR, '#C2185B']} style={styles.statCard}>
            <Users size={24} color="#fff" />
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total Agents</Text>
          </LinearGradient>
          <LinearGradient colors={['#FF6B6B', '#EE5A6F']} style={styles.statCard}>
            <Crown size={24} color="#fff" />
            <Text style={styles.statValue}>{stats.mainAgents}</Text>
            <Text style={styles.statLabel}>Main Agents</Text>
          </LinearGradient>
          <LinearGradient colors={['#4ECDC4', '#44A08D']} style={styles.statCard}>
            <Bot size={24} color="#fff" />
            <Text style={styles.statValue}>{stats.subAgents}</Text>
            <Text style={styles.statLabel}>Sub-Agents</Text>
          </LinearGradient>
          <LinearGradient colors={['#9C27B0', '#7B1FA2']} style={styles.statCard}>
            <TrendingUp size={24} color="#fff" />
            <Text style={styles.statValue}>+32%</Text>
            <Text style={styles.statLabel}>Growth Rate</Text>
          </LinearGradient>
        </View>

        {/* Search */}
        <View style={[styles.searchBox, { backgroundColor: colors.card }]}>
          <Search size={18} color={colors.secondaryText} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search marketing agents, capabilities..."
            placeholderTextColor={colors.secondaryText}
            style={[styles.searchInput, { color: colors.text }]}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Activity size={16} color={colors.secondaryText} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Filter Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <TouchableOpacity 
            style={[styles.filterPill, { backgroundColor: filterLevel === null ? DEPT_COLOR : colors.card }]} 
            onPress={() => setFilterLevel(null)}
          >
            <Text style={[styles.filterText, { color: filterLevel === null ? '#fff' : colors.text }]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterPill, { backgroundColor: filterLevel === 'c_level' ? '#FFD700' : colors.card }]} 
            onPress={() => setFilterLevel('c_level')}
          >
            <Crown size={12} color={filterLevel === 'c_level' ? '#fff' : colors.text} />
            <Text style={[styles.filterText, { color: filterLevel === 'c_level' ? '#fff' : colors.text }]}>C-Level</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterPill, { backgroundColor: filterLevel === 'vp_director' ? '#FF6B6B' : colors.card }]} 
            onPress={() => setFilterLevel('vp_director')}
          >
            <Star size={12} color={filterLevel === 'vp_director' ? '#fff' : colors.text} />
            <Text style={[styles.filterText, { color: filterLevel === 'vp_director' ? '#fff' : colors.text }]}>VP/Director</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterPill, { backgroundColor: filterLevel === 'specialist' ? '#96CEB4' : colors.card }]} 
            onPress={() => setFilterLevel('specialist')}
          >
            <Bot size={12} color={filterLevel === 'specialist' ? '#fff' : colors.text} />
            <Text style={[styles.filterText, { color: filterLevel === 'specialist' ? '#fff' : colors.text }]}>Specialists</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Hierarchy Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Marketing & Growth Team</Text>
            <Text style={[styles.sectionCount, { color: colors.secondaryText }]}>{filteredAgents.length} agents</Text>
          </View>

          {filteredAgents.map((agent, index) => {
            const LevelIcon = getLevelIcon(agent.level);
            const levelColor = getLevelColor(agent.level);
            
            return (
              <Animated.View key={agent.id} entering={FadeInUp.delay(index * 50)}>
                <TouchableOpacity 
                  style={[styles.agentCard, { backgroundColor: colors.card }]}
                  onPress={() => router.push(`/ai-agent/marketing-growth/${agent.id}` as any)}
                >
                  <View style={styles.agentHeader}>
                    <View style={[styles.agentIconContainer, { backgroundColor: levelColor + '22' }]}>
                      <LevelIcon size={20} color={levelColor} />
                    </View>
                    <View style={styles.agentInfo}>
                      <Text style={[styles.agentName, { color: colors.text }]}>{agent.name}</Text>
                      <Text style={[styles.agentTitle, { color: colors.secondaryText }]}>{agent.title}</Text>
                    </View>
                    <View style={styles.agentMeta}>
                      <ChevronRight size={18} color={colors.secondaryText} />
                    </View>
                  </View>

                  <View style={styles.agentStats}>
                    <View style={styles.agentStat}>
                      <Text style={[styles.agentStatValue, { color: DEPT_COLOR }]}>{agent.subAgents}</Text>
                      <Text style={[styles.agentStatLabel, { color: colors.secondaryText }]}>Sub-Agents</Text>
                    </View>
                    <View style={styles.agentStat}>
                      <Text style={[styles.agentStatValue, { color: colors.success }]}>{agent.efficiency}</Text>
                      <Text style={[styles.agentStatLabel, { color: colors.secondaryText }]}>Efficiency</Text>
                    </View>
                    <View style={styles.agentStat}>
                      <Text style={[styles.agentStatValue, { color: colors.primary }]}>{agent.cost}</Text>
                      <Text style={[styles.agentStatLabel, { color: colors.secondaryText }]}>Cost</Text>
                    </View>
                  </View>

                  {/* Capabilities */}
                  <View style={styles.capabilitiesContainer}>
                    {agent.capabilities.map((cap, i) => (
                      <View key={i} style={[styles.capabilityBadge, { backgroundColor: DEPT_COLOR + '22' }]}>
                        <Text style={[styles.capabilityText, { color: DEPT_COLOR }]}>{cap}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerButton: { padding: 8 },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  headerRight: { flexDirection: 'row', gap: 8 },
  content: { padding: 16 },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: '22%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statValue: { fontSize: 24, fontWeight: '700', color: '#fff', marginTop: 8 },
  statLabel: { fontSize: 11, color: '#fff', opacity: 0.9, marginTop: 2 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  searchInput: { flex: 1, fontSize: 15, padding: 0 },
  filterScroll: { marginBottom: 20 },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterText: { fontSize: 13, fontWeight: '600' },
  section: { marginTop: 8 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 20, fontWeight: '700' },
  sectionCount: { fontSize: 14 },
  agentCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  agentIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentInfo: { flex: 1, marginLeft: 12 },
  agentName: { fontSize: 16, fontWeight: '700' },
  agentTitle: { fontSize: 13, marginTop: 2 },
  agentMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  agentStats: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 12,
  },
  agentStat: { alignItems: 'center' },
  agentStatValue: { fontSize: 16, fontWeight: '700' },
  agentStatLabel: { fontSize: 11, marginTop: 2 },
  capabilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  capabilityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  capabilityText: { fontSize: 11, fontWeight: '600' },
});
