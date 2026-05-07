import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { UserCircle, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, TrendingUp, Zap, Briefcase, Award, UserCheck, Users, Flag } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const TEAM_LEAD_AGENTS = [
  { id: 'sales-lead', name: 'Sales Team Lead', role: 'Lead Sales Representative', department: 'Sales', icon: TrendingUp, color: '#E65100' },
  { id: 'marketing-lead', name: 'Marketing Lead', role: 'Campaign Team Lead', department: 'Marketing', icon: Award, color: '#F43F5E' },
  { id: 'engineering-lead', name: 'Engineering Lead', role: 'Tech Team Lead', department: 'Engineering', icon: Zap, color: '#3B82F6' },
  { id: 'product-lead', name: 'Product Lead', role: 'Product Squad Lead', department: 'Product', icon: Star, color: '#A855F7' },
  { id: 'operations-lead', name: 'Operations Lead', role: 'Ops Process Lead', department: 'Operations', icon: Briefcase, color: '#8B5CF6' },
  { id: 'hr-lead', name: 'HR Team Lead', role: 'People Operations Lead', department: 'HR', icon: Users, color: '#EC4899' },
  { id: 'finance-lead', name: 'Finance Lead', role: 'Financial Analysis Lead', department: 'Finance', icon: TrendingUp, color: '#10B981' },
  { id: 'it-lead', name: 'IT Team Lead', role: 'Infrastructure Team Lead', department: 'IT', icon: Shield, color: '#6366F1' },
  { id: 'security-lead', name: 'Security Lead', role: 'Security Operations Lead', department: 'Security', icon: Shield, color: '#F59E0B' },
  { id: 'data-lead', name: 'Data Lead', role: 'Data Engineering Lead', department: 'Data', icon: ChartBarBig, color: '#06B6D4' },
  { id: 'customer-lead', name: 'Customer Lead', role: 'Support Team Lead', department: 'Customer', icon: UserCheck, color: '#007AFF' },
  { id: 'scrum-master', name: 'Scrum Master', role: 'Agile Process Lead', department: 'Engineering', icon: Zap, color: '#3B82F6' },
  { id: 'qa-lead', name: 'QA Lead', role: 'Quality Assurance Lead', department: 'Engineering', icon: Shield, color: '#F59E0B' },
  { id: 'devops-lead', name: 'DevOps Lead', role: 'DevOps Team Lead', department: 'Engineering', icon: Zap, color: '#3B82F6' },
  { id: 'frontend-lead', name: 'Frontend Lead', role: 'UI Development Lead', department: 'Engineering', icon: Zap, color: '#3B82F6' },
  { id: 'backend-lead', name: 'Backend Lead', role: 'Backend Services Lead', department: 'Engineering', icon: Zap, color: '#3B82F6' },
  { id: 'design-lead', name: 'Design Lead', role: 'UX/UI Design Lead', department: 'Product', icon: Star, color: '#A855F7' },
  { id: 'content-lead', name: 'Content Lead', role: 'Content Strategy Lead', department: 'Marketing', icon: Award, color: '#F43F5E' },
  { id: 'social-lead', name: 'Social Lead', role: 'Social Media Lead', department: 'Marketing', icon: Award, color: '#F43F5E' },
  { id: 'seo-lead', name: 'SEO Lead', role: 'Search Optimization Lead', department: 'Marketing', icon: TrendingUp, color: '#E65100' },
  { id: 'recruiting-lead', name: 'Recruiting Lead', role: 'Talent Acquisition Lead', department: 'HR', icon: Users, color: '#EC4899' },
  { id: 'learning-lead', name: 'Learning Lead', role: 'Training & Development Lead', department: 'HR', icon: Award, color: '#EC4899' },
  { id: 'payroll-lead', name: 'Payroll Lead', role: 'Compensation Processing Lead', department: 'Finance', icon: TrendingUp, color: '#10B981' },
  { id: 'logistics-lead', name: 'Logistics Lead', role: 'Logistics Coordination Lead', department: 'Operations', icon: Briefcase, color: '#84CC16' },
];

const LEAD_STATS = [
  { label: 'Total', value: '24', icon: CircleCheckBig, color: '#34C759' },
  { label: 'Active', value: '24', icon: Activity, color: '#007AFF' },
  { label: 'Team Members', value: '120+', icon: Users, color: '#FF9500' },
  { label: 'Sprints', value: '48', icon: Target, color: '#8B5CF6' },
];

const QUICK_ACTIONS = [
  { label: 'Daily Standup', icon: Users, route: '/ai-agent/team-management' },
  { label: 'Sprint Board', icon: Flag, route: '/ai-agent/engineering/sprint-manager' },
  { label: 'Team Chat', icon: MessageSquare, route: '/ai-agent/chat-platforms' },
  { label: 'Task Board', icon: Briefcase, route: '/ai-agent/smart-task-automation' },
];

export default function TeamLeadsHierarchyPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#10B98120' }]}>
          <UserCircle size={56} color="#10B981" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Team Lead Level</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Technical & Functional Team Leaders
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>All Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <UserCircle size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>Lead</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Flag size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>{TEAM_LEAD_AGENTS.length} Leads</Text>
          </View>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        {LEAD_STATS.map((stat, i) => (
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
          The Team Lead level represents technical and functional leaders who guide daily team activities. 
          These agents combine hands-on expertise with leadership capabilities, mentoring specialists 
          while maintaining technical contributions to projects.
        </Text>
      </View>

      {/* Key Responsibilities */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        <View style={styles.responsibilityList}>
          {[
            'Daily standup facilitation and sprint coordination',
            'Technical mentorship and code reviews',
            'Task assignment and sprint planning',
            'Blocker identification and removal',
            'Quality standards enforcement',
            'Team velocity tracking and optimization',
            'Technical debt management',
            'Knowledge sharing and documentation'
          ].map((item, i) => (
            <View key={i} style={styles.responsibilityItem}>
              <View style={[styles.bullet, { backgroundColor: '#10B981' }]} />
              <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Team Lead Agents List */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Team Lead Agents</Text>
        {TEAM_LEAD_AGENTS.map((agent) => (
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
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Lead Actions</Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => router.push(action.route)}
              style={[styles.actionButton, { backgroundColor: '#10B98115' }]}
            >
              <action.icon size={24} color="#10B981" />
              <Text style={[styles.actionText, { color: '#10B981' }]}>{action.label}</Text>
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
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/hierarchy/managers')}
            style={[styles.hierarchyBtn, { backgroundColor: theme.colors.background }]}
          >
            <Text style={[styles.hierarchyBtnText, { color: theme.colors.textSecondary }]}>Managers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.hierarchyBtn, { backgroundColor: '#10B98120' }]}>
            <Text style={[styles.hierarchyBtnText, { color: '#10B981' }]}>Team Leads</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/hierarchy/specialists')}
            style={[styles.hierarchyBtn, { backgroundColor: theme.colors.background }]}
          >
            <Text style={[styles.hierarchyBtnText, { color: theme.colors.textSecondary }]}>Specialists</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AgentFeatures agentId="team-leads-hierarchy" agentName="Team Lead Level" />
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
