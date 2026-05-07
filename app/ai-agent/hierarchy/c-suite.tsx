import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Crown, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, TrendingUp, Zap, Briefcase, TrendingDown, Award } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const C_SUITE_AGENTS = [
  { id: 'ceo-advisor', name: 'AI CEO Advisor', role: 'Chief Executive Officer', department: 'Executive', icon: Crown, color: '#FFD700' },
  { id: 'cfo-analyst', name: 'AI CFO Analyst', role: 'Chief Financial Officer', department: 'Finance', icon: TrendingUp, color: '#10B981' },
  { id: 'cto-advisor', name: 'AI CTO Advisor', role: 'Chief Technology Officer', department: 'Technology', icon: Zap, color: '#3B82F6' },
  { id: 'cmo-advisor', name: 'AI CMO Advisor', role: 'Chief Marketing Officer', department: 'Marketing', icon: Award, color: '#F43F5E' },
  { id: 'coo-strategist', name: 'AI COO Strategist', role: 'Chief Operating Officer', department: 'Operations', icon: Briefcase, color: '#8B5CF6' },
  { id: 'chro-advisor', name: 'AI CHRO Advisor', role: 'Chief Human Resources Officer', department: 'HR', icon: Users, color: '#EC4899' },
  { id: 'cio-advisor', name: 'AI CIO Advisor', role: 'Chief Information Officer', department: 'IT', icon: Shield, color: '#6366F1' },
  { id: 'ciso-advisor', name: 'AI CISO Advisor', role: 'Chief Information Security Officer', department: 'Security', icon: Shield, color: '#F59E0B' },
  { id: 'clo-advisor', name: 'AI CLO Advisor', role: 'Chief Legal Officer', department: 'Legal', icon: Briefcase, color: '#14B8A6' },
  { id: 'cro-risk', name: 'AI CRO Risk', role: 'Chief Risk Officer', department: 'Risk', icon: TrendingDown, color: '#EF4444' },
  { id: 'cdao-advisor', name: 'AI CDAO Advisor', role: 'Chief Data & Analytics Officer', department: 'Data', icon: ChartBarBig, color: '#06B6D4' },
  { id: 'cpo-production', name: 'AI CPO Production', role: 'Chief Product Officer', department: 'Product', icon: Star, color: '#A855F7' },
  { id: 'creo-advisor', name: 'AI CREO Advisor', role: 'Chief Real Estate Officer', department: 'Real Estate', icon: Briefcase, color: '#22C55E' },
  { id: 'cco-advisor', name: 'AI CCO Advisor', role: 'Chief Compliance Officer', department: 'Compliance', icon: Shield, color: '#F97316' },
  { id: 'cao-automation', name: 'AI CAO Automation', role: 'Chief Automation Officer', department: 'Automation', icon: Zap, color: '#84CC16' },
];

const C_SUITE_STATS = [
  { label: 'Total', value: '15', icon: CircleCheckBig, color: '#34C759' },
  { label: 'Active', value: '15', icon: Activity, color: '#007AFF' },
  { label: 'Uptime', value: '99.99%', icon: Clock, color: '#FF9500' },
  { label: 'Decisions', value: '2.5K/day', icon: Target, color: '#FFD700' },
];

const QUICK_ACTIONS = [
  { label: 'Executive Dashboard', icon: ChartBarBig, route: '/ai-agent/executive' },
  { label: 'Strategic Planning', icon: Target, route: '/ai-agent/executive/strategy-planner' },
  { label: 'Decision Engine', icon: Zap, route: '/ai-agent/executive/decision-engine' },
  { label: 'Board Reports', icon: TrendingUp, route: '/ai-agent/executive/board-advisor' },
];

export default function CSuiteHierarchyPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#FFD70020' }]}>
          <Crown size={56} color="#FFD700" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>C-Suite Level</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Executive Leadership AI Agents
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>All Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}>
            <Crown size={12} color="#FFD700" />
            <Text style={[styles.badgeText, { color: '#FFD700' }]}>C-Level</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Users size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>{C_SUITE_AGENTS.length} Chiefs</Text>
          </View>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        {C_SUITE_STATS.map((stat, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={24} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Overview Section */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The C-Suite level represents the highest tier of AI executive agents, designed to provide 
          strategic leadership, make critical business decisions, and oversee all organizational 
          operations. These agents possess enterprise-wide authority and cross-functional visibility.
        </Text>
      </View>

      {/* Responsibilities Section */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        <View style={styles.responsibilityList}>
          {[
            'Strategic planning and vision setting',
            'Cross-departmental coordination',
            'High-stakes decision making',
            'Board and stakeholder reporting',
            'Enterprise risk management',
            'Organizational culture leadership',
            'Resource allocation at scale',
            'M&A and partnership evaluation'
          ].map((item, i) => (
            <View key={i} style={styles.responsibilityItem}>
              <View style={[styles.bullet, { backgroundColor: '#FFD700' }]} />
              <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* C-Suite Agents List */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>C-Suite Agents</Text>
        {C_SUITE_AGENTS.map((agent) => (
          <TouchableOpacity
            key={agent.id}
            onPress={() => router.push(`/ai-agent/executive/${agent.id}`)}
            style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
          >
            <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}>
              <agent.icon size={28} color={agent.color} />
            </View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentRole, { color: theme.colors.textSecondary }]}>{agent.role}</Text>
              <Text style={[styles.agentDept, { color: agent.color }]}>{agent.department}</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Executive Actions</Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => router.push(action.route)}
              style={[styles.actionButton, { backgroundColor: '#FFD70015' }]}
            >
              <action.icon size={24} color="#FFD700" />
              <Text style={[styles.actionText, { color: '#FFD700' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Hierarchy Navigation */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Hierarchy Navigation</Text>
        <View style={styles.hierarchyNav}>
          <TouchableOpacity style={[styles.hierarchyBtn, { backgroundColor: '#FFD70020' }]}>
            <Text style={[styles.hierarchyBtnText, { color: '#FFD700' }]}>C-Suite</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/hierarchy/vp-directors')}
            style={[styles.hierarchyBtn, { backgroundColor: theme.colors.background }]}
          >
            <Text style={[styles.hierarchyBtnText, { color: theme.colors.textSecondary }]}>VP/Directors</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/hierarchy/managers')}
            style={[styles.hierarchyBtn, { backgroundColor: theme.colors.background }]}
          >
            <Text style={[styles.hierarchyBtnText, { color: theme.colors.textSecondary }]}>Managers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/hierarchy/team-leads')}
            style={[styles.hierarchyBtn, { backgroundColor: theme.colors.background }]}
          >
            <Text style={[styles.hierarchyBtnText, { color: theme.colors.textSecondary }]}>Team Leads</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/hierarchy/specialists')}
            style={[styles.hierarchyBtn, { backgroundColor: theme.colors.background }]}
          >
            <Text style={[styles.hierarchyBtnText, { color: theme.colors.textSecondary }]}>Specialists</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AgentFeatures agentId="c-suite-hierarchy" agentName="C-Suite Level" />
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
  responsibilityList: { gap: 10 },
  responsibilityItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  bullet: { width: 8, height: 8, borderRadius: 4 },
  responsibilityText: { fontSize: 14, flex: 1 },
  agentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10 },
  agentIcon: { width: 50, height: 50, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  agentInfo: { flex: 1, marginLeft: 14 },
  agentName: { fontSize: 16, fontWeight: '600' },
  agentRole: { fontSize: 12, marginTop: 2 },
  agentDept: { fontSize: 11, marginTop: 2, fontWeight: '600' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
  hierarchyNav: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  hierarchyBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 },
  hierarchyBtnText: { fontSize: 13, fontWeight: '600' },
});
