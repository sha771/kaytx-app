import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Users, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, TrendingUp, Zap, Briefcase, Award, UserCheck, UsersRound } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const MANAGER_AGENTS = [
  { id: 'sales-manager', name: 'Sales Manager', role: 'Sales Team Manager', department: 'Sales', icon: TrendingUp, color: '#E65100' },
  { id: 'marketing-manager', name: 'Marketing Manager', role: 'Marketing Campaign Manager', department: 'Marketing', icon: Award, color: '#F43F5E' },
  { id: 'engineering-manager', name: 'Engineering Manager', role: 'Software Engineering Manager', department: 'Engineering', icon: Zap, color: '#3B82F6' },
  { id: 'product-manager', name: 'Product Manager', role: 'Product Development Manager', department: 'Product', icon: Star, color: '#A855F7' },
  { id: 'operations-manager', name: 'Operations Manager', role: 'Business Operations Manager', department: 'Operations', icon: Briefcase, color: '#8B5CF6' },
  { id: 'hr-manager', name: 'HR Manager', role: 'Human Resources Manager', department: 'HR', icon: Users, color: '#EC4899' },
  { id: 'finance-manager', name: 'Finance Manager', role: 'Financial Planning Manager', department: 'Finance', icon: TrendingUp, color: '#10B981' },
  { id: 'it-manager', name: 'IT Manager', role: 'IT Infrastructure Manager', department: 'IT', icon: Shield, color: '#6366F1' },
  { id: 'security-manager', name: 'Security Manager', role: 'Information Security Manager', department: 'Security', icon: Shield, color: '#F59E0B' },
  { id: 'legal-manager', name: 'Legal Manager', role: 'Legal Operations Manager', department: 'Legal', icon: Briefcase, color: '#14B8A6' },
  { id: 'data-manager', name: 'Data Manager', role: 'Data Engineering Manager', department: 'Data', icon: ChartBarBig, color: '#06B6D4' },
  { id: 'customer-success-manager', name: 'Customer Success Manager', role: 'Client Success Manager', department: 'Customer', icon: UserCheck, color: '#007AFF' },
  { id: 'supply-chain-manager', name: 'Supply Chain Manager', role: 'Supply Chain Operations Manager', department: 'Operations', icon: Briefcase, color: '#84CC16' },
  { id: 'research-manager', name: 'Research Manager', role: 'R&D Program Manager', department: 'Research', icon: Zap, color: '#22C55E' },
  { id: 'project-manager', name: 'Project Manager', role: 'Strategic Project Manager', department: 'Executive', icon: Target, color: '#FFD700' },
  { id: 'compliance-manager', name: 'Compliance Manager', role: 'Regulatory Compliance Manager', department: 'Legal', icon: Shield, color: '#F97316' },
  { id: 'talent-manager', name: 'Talent Manager', role: 'Talent Development Manager', department: 'HR', icon: Users, color: '#EC4899' },
  { id: 'analytics-manager', name: 'Analytics Manager', role: 'Business Analytics Manager', department: 'Data', icon: ChartBarBig, color: '#06B6D4' },
  { id: 'quality-manager', name: 'Quality Manager', role: 'Quality Assurance Manager', department: 'Operations', icon: Shield, color: '#8B5CF6' },
  { id: 'logistics-manager', name: 'Logistics Manager', role: 'Logistics & Distribution Manager', department: 'Operations', icon: Briefcase, color: '#84CC16' },
  { id: 'procurement-manager', name: 'Procurement Manager', role: 'Strategic Procurement Manager', department: 'Operations', icon: TrendingUp, color: '#10B981' },
  { id: 'warehouse-manager', name: 'Warehouse Manager', role: 'Warehouse Operations Manager', department: 'Operations', icon: Briefcase, color: '#84CC16' },
  { id: 'devops-manager', name: 'DevOps Manager', role: 'DevOps & Infrastructure Manager', department: 'Engineering', icon: Zap, color: '#3B82F6' },
  { id: 'qa-manager', name: 'QA Manager', role: 'Quality Assurance Manager', department: 'Engineering', icon: Shield, color: '#F59E0B' },
];

const MANAGER_STATS = [
  { label: 'Total', value: '24', icon: CircleCheckBig, color: '#34C759' },
  { label: 'Active', value: '24', icon: Activity, color: '#007AFF' },
  { label: 'Team Size', value: '240+', icon: Users, color: '#FF9500' },
  { label: 'Projects', value: '156', icon: Target, color: '#8B5CF6' },
];

const QUICK_ACTIONS = [
  { label: 'Team Dashboard', icon: UsersRound, route: '/ai-agent/team-management' },
  { label: 'Performance', icon: ChartBarBig, route: '/ai-agent/performance' },
  { label: 'Schedule', icon: Calendar, route: '/ai-agent/scheduling' },
  { label: 'Workload', icon: Briefcase, route: '/ai-agent/team-management/workload' },
];

export default function ManagersHierarchyPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#3B82F620' }]}>
          <Users size={56} color="#3B82F6" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Manager Level</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Department & Team Managers
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>All Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#3B82F622' }]}>
            <Users size={12} color="#3B82F6" />
            <Text style={[styles.badgeText, { color: '#3B82F6' }]}>Manager</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <UsersRound size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>{MANAGER_AGENTS.length} Managers</Text>
          </View>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        {MANAGER_STATS.map((stat, i) => (
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
          The Manager level represents mid-level leadership responsible for day-to-day team operations. 
          These agents bridge strategic vision with tactical execution, manage individual contributors, 
          and ensure project delivery within their functional areas.
        </Text>
      </View>

      {/* Key Responsibilities */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        <View style={styles.responsibilityList}>
          {[
            'Team performance management and coaching',
            'Project planning, execution, and delivery',
            'Task delegation and workload distribution',
            'Performance reviews and feedback delivery',
            'Conflict resolution within teams',
            'Resource planning and capacity management',
            'Process implementation and optimization',
            'Escalation management and issue resolution'
          ].map((item, i) => (
            <View key={i} style={styles.responsibilityItem}>
              <View style={[styles.bullet, { backgroundColor: '#3B82F6' }]} />
              <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Manager Agents List */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Manager Agents</Text>
        {MANAGER_AGENTS.map((agent) => (
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
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Manager Actions</Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => router.push(action.route)}
              style={[styles.actionButton, { backgroundColor: '#3B82F615' }]}
            >
              <action.icon size={24} color="#3B82F6" />
              <Text style={[styles.actionText, { color: '#3B82F6' }]}>{action.label}</Text>
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
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/hierarchy/vp-directors')}
            style={[styles.hierarchyBtn, { backgroundColor: theme.colors.background }]}
          >
            <Text style={[styles.hierarchyBtnText, { color: theme.colors.textSecondary }]}>VP/Directors</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.hierarchyBtn, { backgroundColor: '#3B82F620' }]}>
            <Text style={[styles.hierarchyBtnText, { color: '#3B82F6' }]}>Managers</Text>
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

      <AgentFeatures agentId="managers-hierarchy" agentName="Manager Level" />
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
