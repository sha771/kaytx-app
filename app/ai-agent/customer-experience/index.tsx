/**
 * KAYTX AI WORKFORCE - DEPARTMENT 1: CUSTOMER EXPERIENCE
 * 14 Main Agents + 42 Sub-Agents = 56 Total Agents
 */

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import {
  ArrowLeft, Search, Users, Crown, Star, Target, Bot,
  Headphones, Heart, Gift, ClipboardList, CreditCard, Phone,
  MessageCircle, Ticket, MessageSquareWarning, UserPlus,
  Sparkles, ChevronRight, Filter, Grid3X3, List,
  TrendingUp, Activity, Zap, Shield
} from 'lucide-react-native';
import { allCustomerExperienceAgents } from '@/constants/completeAIWorkforce_1108';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';

const DEPT_COLOR = '#00BCD4';
const DEPT_NAME = 'Customer Experience';

export default function CustomerExperienceDepartment() {
  const ins = useSafeAreaInsets();
  const { theme } = useTheme();
  const { colors } = theme;
  const isDark = colors.background === '#000000';

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterLevel, setFilterLevel] = useState<string | null>(null);

  const stats = useMemo(() => ({
    total: allCustomerExperienceAgents.length,
    mainAgents: allCustomerExperienceAgents.filter(a => a.level !== 'specialist').length,
    specialists: allCustomerExperienceAgents.filter(a => a.level === 'specialist').length,
    subAgents: allCustomerExperienceAgents.reduce((acc, a) => acc + a.subAgents.length, 0),
  }), []);

  const filteredAgents = useMemo(() => {
    let agents = allCustomerExperienceAgents;
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
          <Headphones size={20} color={DEPT_COLOR} />
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
          <LinearGradient colors={[DEPT_COLOR, '#00838F']} style={styles.statCard}>
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
          <LinearGradient colors={['#96CEB4', '#7FB3A3']} style={styles.statCard}>
            <Zap size={24} color="#fff" />
            <Text style={styles.statValue}>92%</Text>
            <Text style={styles.statLabel}>Avg Efficiency</Text>
          </LinearGradient>
        </View>

        {/* Search */}
        <View style={[styles.searchBox, { backgroundColor: colors.card }]}>
          <Search size={18} color={colors.secondaryText} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search agents, capabilities..."
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
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Agent Hierarchy</Text>
            <Text style={[styles.sectionCount, { color: colors.secondaryText }]}>{filteredAgents.length} agents</Text>
          </View>

          {filteredAgents.map((agent, index) => {
            const LevelIcon = getLevelIcon(agent.level);
            const levelColor = getLevelColor(agent.level);
            
            return (
              <Animated.View key={agent.id} entering={FadeInUp.delay(index * 50)}>
                <TouchableOpacity 
                  style={[styles.agentCard, { backgroundColor: colors.card }]}
                  onPress={() => router.push(agent.route as any)}
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
                      {agent.isPremium && (
                        <View style={[styles.premiumBadge, { backgroundColor: '#FFD70033' }]}>
                          <Star size={10} color="#FFD700" />
                        </View>
                      )}
                      <ChevronRight size={18} color={colors.secondaryText} />
                    </View>
                  </View>

                  <Text style={[styles.agentDesc, { color: colors.secondaryText }]} numberOfLines={2}>
                    {agent.description}
                  </Text>

                  <View style={styles.agentStats}>
                    <View style={styles.agentStat}>
                      <Text style={[styles.agentStatValue, { color: DEPT_COLOR }]}>{agent.subAgents.length}</Text>
                      <Text style={[styles.agentStatLabel, { color: colors.secondaryText }]}>Sub-Agents</Text>
                    </View>
                    <View style={styles.agentStat}>
                      <Text style={[styles.agentStatValue, { color: colors.success }]}>{agent.efficiency}</Text>
                      <Text style={[styles.agentStatLabel, { color: colors.secondaryText }]}>Efficiency</Text>
                    </View>
                    <View style={styles.agentStat}>
                      <Text style={[styles.agentStatValue, { color: colors.primary }]}>{agent.aiCost}</Text>
                      <Text style={[styles.agentStatLabel, { color: colors.secondaryText }]}>Cost</Text>
                    </View>
                  </View>

                  {/* Capabilities */}
                  <View style={styles.capabilitiesContainer}>
                    {agent.capabilities.slice(0, 3).map((cap, i) => (
                      <View key={i} style={[styles.capabilityBadge, { backgroundColor: DEPT_COLOR + '22' }]}>
                        <Text style={[styles.capabilityText, { color: DEPT_COLOR }]}>{cap}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Sub-Agents Preview */}
                  {agent.subAgents.length > 0 && (
                    <View style={styles.subAgentsPreview}>
                      <Text style={[styles.subAgentsTitle, { color: colors.secondaryText }]}>
                        Sub-Agents ({agent.subAgents.length}):
                      </Text>
                      <View style={styles.subAgentsList}>
                        {agent.subAgents.slice(0, 3).map((sub, i) => (
                          <TouchableOpacity 
                            key={sub.id}
                            style={[styles.subAgentChip, { backgroundColor: colors.background }]} 
                            onPress={() => router.push(`/ai-agent/${sub.id}` as any)}
                          >
                            <Bot size={10} color={colors.secondaryText} />
                            <Text style={[styles.subAgentName, { color: colors.text }]} numberOfLines={1}>
                              {sub.name.replace('AI ', '')}
                            </Text>
                          </TouchableOpacity>
                        ))}
                        {agent.subAgents.length > 3 && (
                          <View style={[styles.subAgentChip, { backgroundColor: colors.background }]}>
                            <Text style={[styles.subAgentName, { color: colors.secondaryText }]}>
                              +{agent.subAgents.length - 3} more
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  )}
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
  premiumBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  agentDesc: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
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
    marginBottom: 12,
  },
  capabilityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  capabilityText: { fontSize: 11, fontWeight: '600' },
  subAgentsPreview: { marginTop: 8 },
  subAgentsTitle: { fontSize: 12, marginBottom: 8 },
  subAgentsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  subAgentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  subAgentName: { fontSize: 11, fontWeight: '500', maxWidth: 120 },
});
