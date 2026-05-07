import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { UserCrown, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, TrendingUp, Zap, Briefcase, Award, UserCheck } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const VP_AGENTS = [
  { id: 'vp-sales', name: 'VP Sales', role: 'Vice President of Sales', department: 'Sales', icon: TrendingUp, color: '#E65100' },
  { id: 'vp-marketing', name: 'VP Marketing', role: 'Vice President of Marketing', department: 'Marketing', icon: Award, color: '#F43F5E' },
  { id: 'vp-engineering', name: 'VP Engineering', role: 'VP of Engineering', department: 'Engineering', icon: Zap, color: '#3B82F6' },
  { id: 'vp-product', name: 'VP Product', role: 'VP of Product', department: 'Product', icon: Star, color: '#A855F7' },
  { id: 'vp-operations', name: 'VP Operations', role: 'VP of Operations', department: 'Operations', icon: Briefcase, color: '#8B5CF6' },
  { id: 'vp-hr', name: 'VP HR', role: 'VP of Human Resources', department: 'HR', icon: Users, color: '#EC4899' },
  { id: 'vp-finance', name: 'VP Finance', role: 'VP of Finance', department: 'Finance', icon: TrendingUp, color: '#10B981' },
  { id: 'vp-technology', name: 'VP Technology', role: 'VP of Technology', department: 'IT', icon: Shield, color: '#6366F1' },
  { id: 'vp-security', name: 'VP Security', role: 'VP of Security', department: 'Security', icon: Shield, color: '#F59E0B' },
  { id: 'vp-legal', name: 'VP Legal', role: 'VP of Legal Affairs', department: 'Legal', icon: Briefcase, color: '#14B8A6' },
  { id: 'vp-data', name: 'VP Data Science', role: 'VP of Data Science', department: 'Data', icon: ChartBarBig, color: '#06B6D4' },
  { id: 'vp-customer-success', name: 'VP Customer Success', role: 'VP Customer Success', department: 'Customer', icon: UserCheck, color: '#007AFF' },
  { id: 'vp-supply-chain', name: 'VP Supply Chain', role: 'VP Supply Chain', department: 'Operations', icon: Briefcase, color: '#84CC16' },
  { id: 'vp-research', name: 'VP Research', role: 'VP of R&D', department: 'Research', icon: Zap, color: '#22C55E' },
  { id: 'vp-strategy', name: 'VP Strategy', role: 'VP of Strategy', department: 'Executive', icon: Target, color: '#FFD700' },
  { id: 'vp-compliance', name: 'VP Compliance', role: 'VP of Compliance', department: 'Legal', icon: Shield, color: '#F97316' },
  { id: 'vp-talent', name: 'VP Talent', role: 'VP of Talent Acquisition', department: 'HR', icon: Users, color: '#EC4899' },
  { id: 'vp-analytics', name: 'VP Analytics', role: 'VP of Analytics', department: 'Data', icon: ChartBarBig, color: '#06B6D4' },
  { id: 'vp-innovation', name: 'VP Innovation', role: 'VP of Innovation', department: 'Research', icon: Zap, color: '#22C55E' },
  { id: 'vp-digital', name: 'VP Digital', role: 'VP of Digital Transformation', department: 'Technology', icon: Zap, color: '#3B82F6' },
];

const VP_STATS = [
  { label: 'Total VPs', value: '20', icon: CircleCheckBig, color: '#34C759' },
  { label: 'Active', value: '20', icon: Activity, color: '#007AFF' },
  { label: 'Reports', value: '180+', icon: Users, color: '#FF9500' },
  { label: 'Projects', value: '85', icon: Target, color: '#8B5CF6' },
];

const QUICK_ACTIONS = [
  { label: 'VP Dashboard', icon: ChartBarBig, route: '/ai-agent/executive' },
  { label: 'Team Reviews', icon: Users, route: '/ai-agent/performance' },
  { label: 'Quarter Planning', icon: Calendar, route: '/ai-agent/executive/strategy-planner' },
  { label: 'Budget Allocation', icon: TrendingUp, route: '/ai-agent/accounting-finance-ai' },
];

export default function VPDirectorsHierarchyPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#8B5CF620' }]}>
          <UserCrown size={56} color="#8B5CF6" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>VP & Director Level</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Vice Presidents & Directors
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>All Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#8B5CF622' }]}>
            <UserCrown size={12} color="#8B5CF6" />
            <Text style={[styles.badgeText, { color: '#8B5CF6' }]}>VP Level</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Users size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>{VP_AGENTS.length} VPs</Text>
          </View>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        {VP_STATS.map((stat, i) => (
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
          The VP and Director level represents senior leadership responsible for departmental strategy 
          execution. These agents translate C-Suite vision into actionable plans, manage departmental 
          operations, and oversee team performance across all business units.
        </Text>
      </View>

      {/* Key Responsibilities */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        <View style={styles.responsibilityList}>
          {[
            'Departmental strategy development and execution',
            'Team management and performance oversight',
            'Resource allocation and budget management',
            'Cross-functional collaboration and alignment',
            'Risk management within department scope',
            'Talent development and succession planning',
            'Operational excellence and process optimization',
            'Reporting to C-Suite on departmental metrics'
          ].map((item, i) => (
            <View key={i} style={styles.responsibilityItem}>
              <View style={[styles.bullet, { backgroundColor: '#8B5CF6' }]} />
              <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* VP Agents List */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>VP & Director Agents</Text>
        {VP_AGENTS.map((agent) => (
          <TouchableOpacity
            key={agent.id}
            onPress={() => {
              const deptRoute = agent.department.toLowerCase().replace(/\s+/g, '-');
              router.push(`/ai-agent/${deptRoute}/${agent.id}`);
            }}
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
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>VP Actions</Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => router.push(action.route)}
              style={[styles.actionButton, { backgroundColor: '#8B5CF615' }]}
            >
              <action.icon size={24} color="#8B5CF6" />
              <Text style={[styles.actionText, { color: '#8B5CF6' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Hierarchy Navigation */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Hierarchy Navigation</Text>
        <View style={styles.hierarchyNav}>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/hierarchy/c-suite')}
            style={[styles.hierarchyBtn, { backgroundColor: theme.colors.background }]}
          >
            <Text style={[styles.hierarchyBtnText, { color: theme.colors.textSecondary }]}>C-Suite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.hierarchyBtn, { backgroundColor: '#8B5CF620' }]}>
            <Text style={[styles.hierarchyBtnText, { color: '#8B5CF6' }]}>VP/Directors</Text>
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

      <AgentFeatures agentId="vp-directors-hierarchy" agentName="VP & Director Level" />
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
