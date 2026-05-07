import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Shield, Activity, Star, CircleCheckBig, TrendingUp, TrendingDown, DollarSign, BarChart3, ArrowRight, Users, Zap, FileText, Target, Brain, Briefcase, Eye, Globe, Calendar, Megaphone, Wrench, ClipboardCheck, UserCheck, Clipboard } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AiFacilitiesCoordinatorPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Work Orders', value: '456', icon: Wrench, color: '#9E9E9E', change: '+34' },
    { label: 'Vendor Tasks', value: '128', icon: Users, color: '#BDBDBD', change: '+12' },
    { label: 'Inspections', value: '89', icon: ClipboardCheck, color: '#9E9E9E', change: '+8' },
    { label: 'Resolution', value: '97%', icon: Target, color: '#757575', change: '+3%' },
  ];

  const kpis = [
    { label: 'Response Time', value: '2.1h', trend: 'down' },
    { label: 'Completion Rate', value: '97%', trend: 'up' },
    { label: 'Vendor SLA', value: '96%', trend: 'up' },
    { label: 'Compliance', value: '100%', trend: 'up' },
  ];

  const capabilities = ['Work Order Management','Vendor Coordination','Inspection Scheduling','Issue Resolution','Maintenance Coordination','Safety Monitoring','Compliance Tracking','Emergency Response','Asset Monitoring','Space Allocation','Service Requests','Quality Control','Documentation','Reporting','Stakeholder Communication'];

  const responsibilities = [
    'Coordinate and track work orders for facilities maintenance and repairs',
    'Manage vendor relationships and coordinate service delivery schedules',
    'Schedule and track facility inspections for compliance and safety',
    'Resolve facility-related issues quickly to minimize disruption',
    'Coordinate maintenance activities to reduce operational impact',
    'Monitor safety conditions and escalate concerns immediately',
    'Track compliance requirements and ensure all standards are met',
    'Respond to facility emergencies and coordinate rapid resolution',
    'Monitor facility assets and track equipment condition',
    'Manage space allocation requests and coordinate changes',
    'Process and prioritize employee service requests',
    'Maintain quality standards for all facility services',
    'Document all facility activities and maintain accurate records',
    'Generate facility performance reports and analytics',
    'Communicate with stakeholders on facility status and issues'
  ];

  const activities = [
    { time: '3 min ago', text: 'Work order dispatched: HVAC repair, Priority 1, 30 min SLA', icon: Wrench, type: 'workorder' },
    { time: '20 min ago', text: 'Vendor coordination: Cleaning crew scheduled for weekend', icon: Users, type: 'vendor' },
    { time: '1 hour ago', text: 'Inspection completed: Fire safety, 100% compliance', icon: ClipboardCheck, type: 'inspection' },
    { time: '2 hours ago', text: 'Emergency resolved: Water leak contained, repair scheduled', icon: Shield, type: 'emergency' },
    { time: '4 hours ago', text: 'Space allocation: New team move-in coordinated', icon: UserCheck, type: 'allocation' },
    { time: '6 hours ago', text: 'Monthly report generated: 456 work orders, 97% completion', icon: BarChart3, type: 'report' },
  ];

  const quickActions = [
    { label: 'Work Orders', icon: Wrench }, { label: 'Vendors', icon: Users },
    { label: 'Inspections', icon: ClipboardCheck }, { label: 'Reports', icon: BarChart3 },
    { label: 'Requests', icon: Clipboard }, { label: 'Schedule', icon: Calendar },
    { label: 'Assets', icon: Shield }, { label: 'Settings', icon: Target },
  ];

  const typeColors: Record<string, string> = { workorder: '#9E9E9E', vendor: '#BDBDBD', inspection: '#9E9E9E', emergency: '#757575', allocation: '#616161', report: '#424242' };

  const subAgents = [
    { name: 'AI Work Order Manager', id: 'work-order-manager', icon: Wrench, desc: 'Maintenance requests, dispatch & resolution tracking', color: '#9E9E9E' },
    { name: 'AI Vendor Liaison', id: 'vendor-liaison', icon: Users, desc: 'Service provider coordination & performance monitoring', color: '#BDBDBD' },
    { name: 'AI Inspection Scheduler', id: 'inspection-scheduler', icon: ClipboardCheck, desc: 'Compliance inspections, audits & documentation', color: '#9E9E9E' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#9E9E9E18' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#9E9E9E25' }]}>
          <Shield size={48} color="#9E9E9E" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Facilities Coordinator</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Administrative Division — Coordinator Level</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#9E9E9E22' }]}><Briefcase size={12} color="#9E9E9E" /><Text style={[styles.badgeText, { color: '#9E9E9E' }]}>Coordinator</Text></View>
          <View style={[styles.badge, { backgroundColor: '#BDBDBD22' }]}><Shield size={12} color="#BDBDBD" /><Text style={[styles.badgeText, { color: '#BDBDBD' }]}>Facilities</Text></View>
          <View style={[styles.badge, { backgroundColor: '#75757522' }]}><Brain size={12} color="#757575" /><Text style={[styles.badgeText, { color: '#757575' }]}>AI-Powered</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => { const StatIcon = stat.icon; return (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <StatIcon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statChange, { color: stat.change.startsWith('+') || (stat.change.startsWith('-') && stat.label === 'Response Time') ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
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
              <View style={[styles.trendBadge, { backgroundColor: (kpi.trend === 'up' || kpi.trend === 'down' && kpi.label === 'Response Time' ? '#34C759' : '#FF3B30') + '22' }]}>
                {kpi.trend === 'up' || (kpi.trend === 'down' && kpi.label === 'Response Time') ? <TrendingUp size={10} color="#34C759" /> : <TrendingDown size={10} color="#FF3B30" />}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Facilities Coordinator manages day-to-day facility operations including work orders, vendor coordination, and inspection scheduling. This coordinator-level agent ensures facilities run smoothly by efficiently managing maintenance requests, coordinating service providers, and maintaining compliance with safety and regulatory standards.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#9E9E9E18' }]}>
              <Text style={[styles.tagText, { color: '#9E9E9E' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#9E9E9E" />
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
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#9E9E9E12' }]}>
              <action.icon size={24} color="#9E9E9E" />
              <Text style={[styles.actionText, { color: '#9E9E9E' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="ai-facilities-coordinator" agentName="AI Facilities Coordinator" />
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
