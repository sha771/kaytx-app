import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Crown, Users, UserCircle, User, Activity, ArrowRight, BarChart3, Network, Target, Zap, Briefcase, Award, GitBranch, Layers, Brain, Shield, Search, Filter } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const HIERARCHY_LEVELS = [
  {
    id: 'governance',
    name: 'Governance & Ethics',
    subtitle: 'Tier 0 - AI Ethics Board & Oversight',
    count: 2,
    icon: Shield,
    color: '#DC2626',
    description: 'AI Ethics Board and CISO-AI providing governance and ethical oversight',
    route: '/ai-agent/hierarchy/governance',
    agents: ['AI Ethics Board', 'CISO-AI']
  },
  {
    id: 'c-suite',
    name: 'C-Suite Executives',
    subtitle: 'Tier 1 - Executive Leadership (17 agents)',
    count: 17,
    icon: Crown,
    color: '#FFD700',
    description: 'Chief-level executives responsible for enterprise strategy including CDAO & CAO',
    route: '/ai-agent/hierarchy/c-suite',
    agents: ['CEO Advisor', 'CFO Analyst', 'CTO Advisor', 'CMO Advisor', 'COO Strategist', 'CDAO', 'CAO']
  },
  {
    id: 'intelligence',
    name: 'Intelligence Layer',
    subtitle: 'Tier 2 - Predictive & Analytical',
    count: 3,
    icon: Brain,
    color: '#7C3AED',
    description: 'Predictive Engine, Sentiment Core, and Anomaly Detector for advanced intelligence',
    route: '/ai-agent/hierarchy/intelligence',
    agents: ['Predictive Engine', 'Sentiment Core', 'Anomaly Detector']
  },
  {
    id: 'bridge',
    name: 'Layer Bridge',
    subtitle: 'Tier 3 - Digital Interface',
    count: 1,
    icon: Network,
    color: '#3B82F6',
    description: 'Digital Interface for seamless communication between layers',
    route: '/ai-agent/hierarchy/bridge',
    agents: ['Digital Interface']
  },
  {
    id: 'command-center',
    name: 'Advanced Command Center',
    subtitle: 'Tier 4 - Strategic Operations (7 components)',
    count: 7,
    icon: Zap,
    color: '#F59E0B',
    description: 'CDOO, DDO, WOL, AOD, PRED, SWARM, LEARN for strategic command',
    route: '/ai-agent/hierarchy/command-center',
    agents: ['CDOO', 'DDO', 'WOL', 'AOD', 'PRED', 'SWARM', 'LEARN']
  },
  {
    id: 'departments',
    name: 'Departments',
    subtitle: 'Tier 5 - Business Functions (21 departments)',
    count: 21,
    icon: Briefcase,
    color: '#10B981',
    description: '21 major business functions and operational departments',
    route: '/ai-agent/hierarchy/departments',
    agents: ['Customer Experience', 'Sales', 'Marketing', 'Operations', 'Finance', 'Technology']
  },
  {
    id: 'workforce',
    name: 'AI Agent Workforce',
    subtitle: 'Tier 6 - Specialized Agents (199+ agents)',
    count: 199,
    icon: Users,
    color: '#EC4899',
    description: '199 specialized AI agents with reactive, learning, and swarm capabilities',
    route: '/ai-agent/hierarchy/workforce',
    agents: ['VP & Directors', 'Managers', 'Team Leads', 'Specialists', 'Sub-agents']
  }
];

const ORG_STATS = [
  { label: 'Total Agents', value: '199+', icon: Layers, color: '#34C759' },
  { label: 'Hierarchy Tiers', value: '7', icon: GitBranch, color: '#007AFF' },
  { label: 'Departments', value: '21', icon: Briefcase, color: '#FF9500' },
  { label: 'Active Now', value: '199', icon: Activity, color: '#8B5CF6' },
];

const QUICK_ACTIONS = [
  { label: 'Full Org Chart', icon: Network, route: '/ai-agent/ai-workforce-architecture' },
  { label: 'Team View', icon: Users, route: '/ai-agent/team-management' },
  { label: 'Performance', icon: BarChart3, route: '/ai-agent/performance' },
  { label: 'Goals', icon: Target, route: '/ai-agent/team-management/goals' },
];

export default function HierarchyIndexPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterActive, setFilterActive] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#8B5CF620' }]}>
          <Network size={56} color="#8B5CF6" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Hierarchy</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Organizational Structure & Reporting Lines
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#8B5CF622' }]}>
            <GitBranch size={12} color="#8B5CF6" />
            <Text style={[styles.badgeText, { color: '#8B5CF6' }]}>7 Tiers</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Layers size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>199+ Agents</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <Brain size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>Upgraded</Text>
          </View>
        </View>
      </View>

      {/* Search and Filter Bar */}
      <View style={[styles.searchBarContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={[styles.searchInputWrapper, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Search size={20} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search hierarchy levels..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={[styles.filterButton, { backgroundColor: filterActive ? '#8B5CF6' : '#E5E5EA' }]}
          onPress={() => setFilterActive(!filterActive)}
        >
          <Filter size={20} color={filterActive ? 'white' : '#666'} />
        </TouchableOpacity>
      </View>

      {/* Active Filters */}
      {filterActive && (
        <View style={[styles.activeFiltersContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.filtersTitle, { color: theme.colors.text }]}>Quick Filters:</Text>
          <View style={styles.filtersGrid}>
            {['Executive', 'Operations', 'Technical', 'Support'].map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => {
                  setSelectedFilters(prev =>
                    prev.includes(filter)
                      ? prev.filter(f => f !== filter)
                      : [...prev, filter]
                  );
                }}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: selectedFilters.includes(filter) ? '#8B5CF6' : '#E5E5EA',
                  }
                ]}
              >
                <Text style={[
                  styles.filterChipText,
                  { color: selectedFilters.includes(filter) ? 'white' : '#666' }
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        {ORG_STATS.map((stat, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={24} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Overview Section */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Organizational Structure</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI workforce is organized into a 7-tier hierarchical structure, from Governance & Ethics 
          down to specialized AI agents. Each tier has distinct responsibilities, authority, and 
          scope of influence within the organization, enabling intelligent routing, token optimization,
          and advanced agent capabilities.
        </Text>
      </View>

      {/* Hierarchy Levels */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Hierarchy Levels</Text>
        {HIERARCHY_LEVELS
          .filter(level => {
            const matchesSearch = level.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 level.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilters = selectedFilters.length === 0 || 
                                   selectedFilters.some(filter => 
                                     level.name.toLowerCase().includes(filter.toLowerCase()) ||
                                     level.description.toLowerCase().includes(filter.toLowerCase())
                                   );
            return matchesSearch && matchesFilters;
          })
          .map((level) => (
          <TouchableOpacity
            key={level.id}
            onPress={() => router.push(level.route)}
            style={[styles.levelCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
          >
            <View style={[styles.levelIcon, { backgroundColor: level.color + '20' }]}>
              <level.icon size={32} color={level.color} />
            </View>
            <View style={styles.levelInfo}>
              <View style={styles.levelHeader}>
                <Text style={[styles.levelName, { color: theme.colors.text }]}>{level.name}</Text>
                <View style={[styles.countBadge, { backgroundColor: level.color + '20' }]}>
                  <Text style={[styles.countText, { color: level.color }]}>{level.count}</Text>
                </View>
              </View>
              <Text style={[styles.levelSubtitle, { color: theme.colors.textSecondary }]}>{level.subtitle}</Text>
              <Text style={[styles.levelDesc, { color: theme.colors.textSecondary }]}>{level.description}</Text>
              <View style={styles.agentPreview}>
                {level.agents.slice(0, 4).map((agent, i) => (
                  <View key={i} style={[styles.agentChip, { backgroundColor: level.color + '15' }]}>
                    <Text style={[styles.agentChipText, { color: level.color }]}>{agent}</Text>
                  </View>
                ))}
                {level.agents.length > 4 && (
                  <Text style={[styles.moreText, { color: theme.colors.textSecondary }]}>+{level.agents.length - 4} more</Text>
                )}
              </View>
            </View>
            <ArrowRight size={24} color={level.color} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => router.push(action.route)}
              style={[styles.actionButton, { backgroundColor: '#8B5CF615' }]}
            >
              <action.icon size={28} color="#8B5CF6" />
              <Text style={[styles.actionText, { color: '#8B5CF6' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Reporting Structure */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Reporting Structure</Text>
        <View style={styles.reportingFlow}>
          {HIERARCHY_LEVELS.map((level, index) => (
            <View key={level.id} style={styles.reportingItem}>
              <View style={[styles.reportingDot, { backgroundColor: level.color }]} />
              <View style={styles.reportingLine}>
                {index < HIERARCHY_LEVELS.length - 1 && <View style={[styles.line, { backgroundColor: theme.colors.border }]} />}
              </View>
              <View style={styles.reportingContent}>
                <Text style={[styles.reportingName, { color: theme.colors.text }]}>{level.name}</Text>
                <Text style={[styles.reportingCount, { color: theme.colors.textSecondary }]}>{level.count} agents</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="hierarchy-index" agentName="AI Hierarchy" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 28, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 18 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 16, borderRadius: 12 },
  statValue: { fontSize: 20, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  levelCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, marginBottom: 12 },
  levelIcon: { width: 60, height: 60, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  levelInfo: { flex: 1 },
  levelHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  levelName: { fontSize: 17, fontWeight: '700' },
  countBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  countText: { fontSize: 13, fontWeight: '600' },
  levelSubtitle: { fontSize: 13, marginTop: 2 },
  levelDesc: { fontSize: 12, marginTop: 4, lineHeight: 18 },
  agentPreview: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  agentChip: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  agentChipText: { fontSize: 10, fontWeight: '600' },
  moreText: { fontSize: 11, marginLeft: 4 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 18, borderRadius: 14 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 10 },
  reportingFlow: { paddingLeft: 8 },
  reportingItem: { flexDirection: 'row', alignItems: 'flex-start' },
  reportingDot: { width: 12, height: 12, borderRadius: 6, marginTop: 6, marginRight: 12 },
  reportingLine: { width: 2, marginHorizontal: 5 },
  line: { width: 2, flex: 1, marginVertical: 4 },
  reportingContent: { flex: 1, paddingBottom: 16 },
  reportingName: { fontSize: 15, fontWeight: '600' },
  reportingCount: { fontSize: 12, marginTop: 2 },
  searchBarContainer: { flexDirection: 'row', alignItems: 'center', padding: 16, marginTop: 8, gap: 12 },
  searchInputWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8 },
  searchInput: { flex: 1, fontSize: 14 },
  filterButton: { width: 44, height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  activeFiltersContainer: { padding: 16, marginTop: 8 },
  filtersTitle: { fontSize: 14, fontWeight: '600', marginBottom: 12 },
  filtersGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  filterChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  filterChipText: { fontSize: 12, fontWeight: '500' },
});
