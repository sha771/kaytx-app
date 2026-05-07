import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { User, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, TrendingUp, Zap, Briefcase, Award, UserCheck, Users, Code, Cpu, Database, Globe, Phone } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const SPECIALIST_AGENTS = [
  // Sales Specialists
  { id: 'sales-rep', name: 'Sales Representative', role: 'Field Sales Specialist', department: 'Sales', icon: TrendingUp, color: '#E65100' },
  { id: 'sdr', name: 'SDR Specialist', role: 'Sales Development Rep', department: 'Sales', icon: Phone, color: '#E65100' },
  { id: 'account-executive', name: 'Account Executive', role: 'Key Account Specialist', department: 'Sales', icon: UserCheck, color: '#E65100' },
  { id: 'sales-ops', name: 'Sales Ops Specialist', role: 'Sales Operations Specialist', department: 'Sales', icon: ChartBarBig, color: '#E65100' },
  // Marketing Specialists
  { id: 'seo-specialist', name: 'SEO Specialist', role: 'Search Optimization Expert', department: 'Marketing', icon: Globe, color: '#F43F5E' },
  { id: 'content-writer', name: 'Content Writer', role: 'Content Creation Specialist', department: 'Marketing', icon: Award, color: '#F43F5E' },
  { id: 'social-specialist', name: 'Social Media Specialist', role: 'Social Campaign Expert', department: 'Marketing', icon: MessageSquare, color: '#F43F5E' },
  { id: 'email-specialist', name: 'Email Specialist', role: 'Email Marketing Expert', department: 'Marketing', icon: MessageSquare, color: '#F43F5E' },
  // Engineering Specialists
  { id: 'frontend-dev', name: 'Frontend Developer', role: 'UI/UX Implementation', department: 'Engineering', icon: Code, color: '#3B82F6' },
  { id: 'backend-dev', name: 'Backend Developer', role: 'API & Services Developer', department: 'Engineering', icon: Database, color: '#3B82F6' },
  { id: 'qa-engineer', name: 'QA Engineer', role: 'Quality Testing Specialist', department: 'Engineering', icon: Shield, color: '#F59E0B' },
  { id: 'devops-engineer', name: 'DevOps Engineer', role: 'Infrastructure Specialist', department: 'Engineering', icon: Cpu, color: '#3B82F6' },
  { id: 'data-engineer', name: 'Data Engineer', role: 'Data Pipeline Specialist', department: 'Data', icon: Database, color: '#06B6D4' },
  { id: 'ml-engineer', name: 'ML Engineer', role: 'Machine Learning Specialist', department: 'Data', icon: Cpu, color: '#06B6D4' },
  // Product Specialists
  { id: 'ux-researcher', name: 'UX Researcher', role: 'User Research Specialist', department: 'Product', icon: User, color: '#A855F7' },
  { id: 'product-analyst', name: 'Product Analyst', role: 'Product Data Specialist', department: 'Product', icon: ChartBarBig, color: '#A855F7' },
  // Operations Specialists
  { id: 'procurement-specialist', name: 'Procurement Specialist', role: 'Sourcing & Buying Expert', department: 'Operations', icon: Briefcase, color: '#84CC16' },
  { id: 'logistics-specialist', name: 'Logistics Specialist', role: 'Supply Chain Coordinator', department: 'Operations', icon: TrendingUp, color: '#84CC16' },
  { id: 'inventory-specialist', name: 'Inventory Specialist', role: 'Stock Management Expert', department: 'Operations', icon: Database, color: '#84CC16' },
  // HR Specialists
  { id: 'recruiter', name: 'Recruiter', role: 'Talent Acquisition Specialist', department: 'HR', icon: Users, color: '#EC4899' },
  { id: 'payroll-specialist', name: 'Payroll Specialist', role: 'Compensation Processing', department: 'HR', icon: TrendingUp, color: '#EC4899' },
  { id: 'trainer', name: 'Corporate Trainer', role: 'Learning & Development', department: 'HR', icon: Award, color: '#EC4899' },
  // Finance Specialists
  { id: 'bookkeeper', name: 'Bookkeeper', role: 'Transaction Recording', department: 'Finance', icon: TrendingUp, color: '#10B981' },
  { id: 'ap-specialist', name: 'AP Specialist', role: 'Accounts Payable', department: 'Finance', icon: TrendingUp, color: '#10B981' },
  { id: 'ar-specialist', name: 'AR Specialist', role: 'Accounts Receivable', department: 'Finance', icon: TrendingUp, color: '#10B981' },
  { id: 'tax-specialist', name: 'Tax Specialist', role: 'Tax Preparation Expert', department: 'Finance', icon: Shield, color: '#10B981' },
  // Customer Specialists
  { id: 'support-agent', name: 'Support Agent', role: 'Customer Service Rep', department: 'Customer', icon: UserCheck, color: '#007AFF' },
  { id: 'technical-support', name: 'Technical Support', role: 'Tech Support Specialist', department: 'Customer', icon: Shield, color: '#007AFF' },
  // Legal Specialists
  { id: 'contract-specialist', name: 'Contract Specialist', role: 'Agreement Reviewer', department: 'Legal', icon: Briefcase, color: '#14B8A6' },
  { id: 'compliance-specialist', name: 'Compliance Specialist', role: 'Regulatory Compliance', department: 'Legal', icon: Shield, color: '#14B8A6' },
];

const SPECIALIST_STATS = [
  { label: 'Total', value: '35+', icon: CircleCheckBig, color: '#34C759' },
  { label: 'Active', value: '35', icon: Activity, color: '#007AFF' },
  { label: 'Tasks/Day', value: '2.8K', icon: Briefcase, color: '#FF9500' },
  { label: 'Accuracy', value: '98.5%', icon: Target, color: '#8B5CF6' },
];

const QUICK_ACTIONS = [
  { label: 'My Tasks', icon: Briefcase, route: '/ai-agent/agent-work' },
  { label: 'Skill Training', icon: Award, route: '/ai-agent/training-dashboard' },
  { label: 'Performance', icon: ChartBarBig, route: '/ai-agent/agent-performance' },
  { label: 'Knowledge Base', icon: Database, route: '/ai-agent/knowledge-base' },
];

export default function SpecialistsHierarchyPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#F59E0B20' }]}>
          <User size={56} color="#F59E0B" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Specialist Level</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Individual Contributors & Domain Experts
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>All Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#F59E0B22' }]}>
            <User size={12} color="#F59E0B" />
            <Text style={[styles.badgeText, { color: '#F59E0B' }]}>Specialist</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Star size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>{SPECIALIST_AGENTS.length}+ Specialists</Text>
          </View>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        {SPECIALIST_STATS.map((stat, i) => (
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
          The Specialist level represents the foundation of the AI workforce - individual contributors 
          with deep domain expertise. These agents execute specific tasks with high precision, 
          delivering consistent quality in their specialized functional areas.
        </Text>
      </View>

      {/* Key Responsibilities */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        <View style={styles.responsibilityList}>
          {[
            'Task execution with high accuracy and efficiency',
            'Domain-specific problem solving',
            'Knowledge documentation and sharing',
            'Process adherence and quality control',
            'Skill development and certification',
            'Collaboration with team members',
            'Time management and deadline adherence',
            'Continuous improvement of work outputs'
          ].map((item, i) => (
            <View key={i} style={styles.responsibilityItem}>
              <View style={[styles.bullet, { backgroundColor: '#F59E0B' }]} />
              <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Specialist Agents List */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Specialist Agents</Text>
        {SPECIALIST_AGENTS.map((agent) => (
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
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Specialist Actions</Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => router.push(action.route)}
              style={[styles.actionButton, { backgroundColor: '#F59E0B15' }]}
            >
              <action.icon size={24} color="#F59E0B" />
              <Text style={[styles.actionText, { color: '#F59E0B' }]}>{action.label}</Text>
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
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/hierarchy/team-leads')}
            style={[styles.hierarchyBtn, { backgroundColor: theme.colors.background }]}
          >
            <Text style={[styles.hierarchyBtnText, { color: theme.colors.textSecondary }]}>Team Leads</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.hierarchyBtn, { backgroundColor: '#F59E0B20' }]}>
            <Text style={[styles.hierarchyBtnText, { color: '#F59E0B' }]}>Specialists</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AgentFeatures agentId="specialists-hierarchy" agentName="Specialist Level" />
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
