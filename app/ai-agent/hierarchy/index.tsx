import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Crown, Users, UserCircle, User, Activity, ArrowRight, ChartBarBig, Network, Target, Zap, Briefcase, Award, GitBranch, Layers } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const HIERARCHY_LEVELS = [
  {
    id: 'c-suite',
    name: 'C-Suite Level',
    subtitle: 'Executive Leadership',
    count: 15,
    icon: Crown,
    color: '#FFD700',
    description: 'Chief-level executives responsible for enterprise strategy',
    route: '/ai-agent/hierarchy/c-suite',
    agents: ['CEO Advisor', 'CFO Analyst', 'CTO Advisor', 'CMO Advisor', 'COO Strategist', 'CHRO Advisor']
  },
  {
    id: 'vp-directors',
    name: 'VP & Directors',
    subtitle: 'Vice Presidents & Directors',
    count: 20,
    icon: Users,
    color: '#8B5CF6',
    description: 'Senior leadership managing departmental operations',
    route: '/ai-agent/hierarchy/vp-directors',
    agents: ['VP Sales', 'VP Marketing', 'VP Engineering', 'VP Product', 'VP Operations']
  },
  {
    id: 'managers',
    name: 'Manager Level',
    subtitle: 'Department & Team Managers',
    count: 24,
    icon: UserCircle,
    color: '#3B82F6',
    description: 'Mid-level leaders driving team execution',
    route: '/ai-agent/hierarchy/managers',
    agents: ['Sales Manager', 'Marketing Manager', 'Engineering Manager', 'Product Manager']
  },
  {
    id: 'team-leads',
    name: 'Team Lead Level',
    subtitle: 'Technical & Functional Leaders',
    count: 24,
    icon: Users,
    color: '#10B981',
    description: 'Leaders guiding daily team activities',
    route: '/ai-agent/hierarchy/team-leads',
    agents: ['Sales Lead', 'Engineering Lead', 'Scrum Master', 'QA Lead']
  },
  {
    id: 'specialists',
    name: 'Specialist Level',
    subtitle: 'Individual Contributors',
    count: 35,
    icon: User,
    color: '#F59E0B',
    description: 'Domain experts executing specialized tasks',
    route: '/ai-agent/hierarchy/specialists',
    agents: ['Sales Rep', 'Developer', 'Designer', 'Analyst', 'Writer']
  }
];

const ORG_STATS = [
  { label: 'Total Agents', value: '118+', icon: Layers, color: '#34C759' },
  { label: 'Departments', value: '16', icon: Briefcase, color: '#007AFF' },
  { label: 'Active Now', value: '118', icon: Activity, color: '#FF9500' },
  { label: 'Hierarchy Depth', value: '5', icon: GitBranch, color: '#8B5CF6' },
];

const QUICK_ACTIONS = [
  { label: 'Full Org Chart', icon: Network, route: '/ai-agent/ai-workforce-architecture' },
  { label: 'Team View', icon: Users, route: '/ai-agent/team-management' },
  { label: 'Performance', icon: ChartBarBig, route: '/ai-agent/performance' },
  { label: 'Goals', icon: Target, route: '/ai-agent/team-management/goals' },
];

export default function HierarchyIndexPage() {
  const { theme } = useTheme();
  const router = useRouter();

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
            <Text style={[styles.badgeText, { color: '#8B5CF6' }]}>5 Levels</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Layers size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>118+ Agents</Text>
          </View>
        </View>
      </View>

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
          The AI workforce is organized into a 5-tier hierarchical structure, from C-Suite executives 
          down to specialist individual contributors. Each level has distinct responsibilities, 
          authority, and scope of influence within the organization.
        </Text>
      </View>

      {/* Hierarchy Levels */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Hierarchy Levels</Text>
        {HIERARCHY_LEVELS.map((level) => (
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
});
