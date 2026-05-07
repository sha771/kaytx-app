import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Building2, Activity, Star, CircleCheckBig, TrendingUp, TrendingDown, DollarSign, BarChart3, Shield, ArrowRight, Users, Zap, FileText, Target, Brain, Briefcase, Eye, Globe, Calendar, Megaphone, Clipboard, Lock, Wrench, MapPin, Home, AlertTriangle, CheckCircle } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function VpFacilitiesPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Space Utilization', value: '89%', icon: Home, color: '#6D4C41', change: '+6%' },
    { label: 'Maintenance SLA', value: '98%', icon: Wrench, color: '#2E7D32', change: '+3%' },
    { label: 'Safety Score', value: '100%', icon: Shield, color: '#007AFF', change: '0%' },
    { label: 'Facilities Cost', value: '$1.2M', icon: DollarSign, color: '#795548', change: '-8%' },
  ];

  const kpis = [
    { label: 'Space Efficiency', value: '89%', trend: 'up' },
    { label: 'Uptime', value: '99.8%', trend: 'up' },
    { label: 'Compliance Rate', value: '100%', trend: 'up' },
    { label: 'Cost Per Sq Ft', value: '$28', trend: 'down' },
  ];

  const capabilities = ['Space Planning','Maintenance Management','Safety Compliance','Facility Optimization','Vendor Coordination','Budget Management','Risk Assessment','Emergency Response','Asset Tracking','Sustainability','Accessibility','Lease Management','Workplace Design','Energy Management','Security Planning'];

  const responsibilities = [
    'Strategic space planning and workplace optimization across all office locations',
    'Comprehensive maintenance scheduling and vendor coordination for facilities',
    'Safety compliance monitoring and regulatory adherence assurance',
    'Facility budget management including cost control and variance analysis',
    'Risk assessment for facilities operations and emergency preparedness planning',
    'Asset tracking and lifecycle management for facility equipment',
    'Sustainability initiatives and energy efficiency program implementation',
    'Accessibility compliance and workplace accommodation coordination',
    'Lease management and real estate portfolio optimization',
    'Workplace design standards development and implementation',
    'Energy management and utility cost optimization strategies',
    'Security planning and access control system management',
    'Emergency response coordination and business continuity planning',
    'Preventive maintenance program oversight and execution',
    'Cross-functional coordination with IT, HR, and Security teams'
  ];

  const activities = [
    { time: '2 min ago', text: 'Space reallocation completed: 15% efficiency gain achieved', icon: Home, type: 'space' },
    { time: '20 min ago', text: 'Preventive maintenance completed: HVAC systems optimized', icon: Wrench, type: 'maintenance' },
    { time: '1 hour ago', text: 'Safety inspection passed: 100% compliance score', icon: CheckCircle, type: 'safety' },
    { time: '3 hours ago', text: 'Energy audit completed: 12% cost reduction identified', icon: DollarSign, type: 'savings' },
    { time: '5 hours ago', text: 'Emergency drill conducted: All protocols executed successfully', icon: AlertTriangle, type: 'emergency' },
    { time: '8 hours ago', text: 'Vendor contract renegotiated: $180K annual savings', icon: Star, type: 'vendor' },
  ];

  const quickActions = [
    { label: 'Space Plan', icon: Home }, { label: 'Maintenance', icon: Wrench },
    { label: 'Safety', icon: Shield }, { label: 'Budget', icon: DollarSign },
    { label: 'Assets', icon: Building2 }, { label: 'Vendors', icon: Users },
    { label: 'Schedule', icon: Calendar }, { label: 'Reports', icon: BarChart3 },
  ];

  const typeColors: Record<string, string> = { space: '#6D4C41', maintenance: '#2E7D32', safety: '#007AFF', savings: '#795548', emergency: '#FF9500', vendor: '#AF52DE' };

  const subAgents = [
    { name: 'AI Space Planner', id: 'space-planner', icon: Home, desc: 'Space allocation, layout optimization & capacity planning', color: '#6D4C41' },
    { name: 'AI Maintenance Scheduler', id: 'maintenance-scheduler', icon: Wrench, desc: 'Preventive maintenance & work order coordination', color: '#2E7D32' },
    { name: 'AI Safety Compliance Checker', id: 'safety-compliance-checker', icon: Shield, desc: 'Safety audits, compliance monitoring & risk assessment', color: '#007AFF' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#6D4C4118' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#6D4C4125' }]}>
          <Building2 size={48} color="#6D4C41" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Facilities</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Administrative Division — VP Level</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#6D4C4122' }]}><Briefcase size={12} color="#6D4C41" /><Text style={[styles.badgeText, { color: '#6D4C41' }]}>VP Level</Text></View>
          <View style={[styles.badge, { backgroundColor: '#79554822' }]}><Building2 size={12} color="#795548" /><Text style={[styles.badgeText, { color: '#795548' }]}>Facilities</Text></View>
          <View style={[styles.badge, { backgroundColor: '#5D403722' }]}><Brain size={12} color="#5D4037" /><Text style={[styles.badgeText, { color: '#5D4037' }]}>AI-Powered</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => { const StatIcon = stat.icon; return (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <StatIcon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statChange, { color: stat.change.startsWith('+') ? '#34C759' : stat.change.startsWith('-') ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        )})}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance KPIs</Text>
        <View style={styles.kpiGrid}>
          {kpis.map((kpi, index) => (
            <View key={index} style={[styles.kpiCard, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.kpiValue, { color: theme.colors.text }]}>{kpi.value}</Text>
              <Text style={[styles.kpiLabel, { color: theme.colors.textSecondary }]}>{kpi.label}</Text>
              <View style={[styles.trendBadge, { backgroundColor: (kpi.trend === 'up' ? '#34C759' : kpi.trend === 'down' ? '#34C759' : '#FF3B30') + '22' }]}>
                {kpi.trend === 'up' || kpi.trend === 'down' ? <TrendingUp size={10} color="#34C759" /> : <TrendingDown size={10} color="#FF3B30" />}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI VP Facilities manages all facility operations including space planning, maintenance scheduling, and safety compliance. This VP-level agent ensures optimal workspace utilization, maintains critical infrastructure, and guarantees 100% safety compliance while optimizing facility costs across the organization.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#6D4C4118' }]}>
              <Text style={[styles.tagText, { color: '#6D4C41' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#6D4C41" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Activity Feed</Text>
        {activities.map((act, index) => { const ActIcon = act.icon; return (
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: (typeColors[act.type] || '#8E8E93') + '20' }]}>
              <ActIcon size={14} color={typeColors[act.type] || '#8E8E93'} />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
            <View style={[styles.activityBadge, { backgroundColor: (typeColors[act.type] || '#8E8E93') + '15' }]}>
              <Text style={[styles.activityBadgeText, { color: typeColors[act.type] || '#8E8E93' }]}>{act.type}</Text>
            </View>
          </View>
        )})}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        {subAgents.map((sub, index) => (
          <TouchableOpacity key={index} onPress={() => router.push(`/ai-agent/administrative/sub-agents/${sub.id}`)} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.subAgentIcon, { backgroundColor: sub.color + '15' }]}>
              <sub.icon size={20} color={sub.color} />
            </View>
            <View style={styles.subAgentInfo}>
              <Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sub.name}</Text>
              <Text style={[styles.subAgentDesc, { color: theme.colors.textSecondary }]}>{sub.desc}</Text>
            </View>
            <ArrowRight size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#6D4C4112' }]}>
              <action.icon size={24} color="#6D4C41" />
              <Text style={[styles.actionText, { color: '#6D4C41' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="vp-facilities" agentName="AI VP Facilities" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', marginTop: 16, gap: 8 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statChange: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 },
  kpiCard: { flex: 1, minWidth: '45%', padding: 14, borderRadius: 12, position: 'relative' },
  kpiValue: { fontSize: 20, fontWeight: 'bold' },
  kpiLabel: { fontSize: 12, marginTop: 4 },
  trendBadge: { position: 'absolute', top: 10, right: 10, padding: 4, borderRadius: 8 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  activityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  activityBadgeText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10, gap: 12 },
  subAgentIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  subAgentInfo: { flex: 1 },
  subAgentName: { fontSize: 15, fontWeight: '600' },
  subAgentDesc: { fontSize: 12, marginTop: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});
