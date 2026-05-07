import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, Activity, Star, CircleCheckBig, TrendingDown, DollarSign, BarChart3, Shield, ArrowRight, Users, Zap, FileText, Target, Brain, Briefcase, Eye, Globe, Calendar, Megaphone, Plane, Map, Receipt, FileCheck } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AiTravelCoordinatorPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Itineraries', value: '1,234', icon: Map, color: '#BDBDBD', change: '+98' },
    { label: 'Expenses', value: '$2.1M', icon: Receipt, color: '#9E9E9E', change: '+12%' },
    { label: 'Visas Procured', value: '567', icon: FileCheck, color: '#757575', change: '+45' },
    { label: 'Savings', value: '16%', icon: DollarSign, color: '#616161', change: '+3%' },
  ];

  const kpis = [
    { label: 'Booking Accuracy', value: '99.4%', trend: 'up' },
    { label: 'On-Time Departure', value: '94%', trend: 'up' },
    { label: 'Cost Per Trip', value: '$1,847', trend: 'down' },
    { label: 'Traveler Satisfaction', value: '4.6/5', trend: 'up' },
  ];

  const capabilities = ['Itinerary Planning','Expense Reporting','Visa Documentation','Travel Booking','Policy Compliance','Cost Optimization','Risk Assessment','Emergency Support','Vendor Management','Travel Analytics','Multi-City Coordination','Group Travel','Per Diem Management','Receipt Processing','Travel Insurance'];

  const responsibilities = [
    'Plan and optimize complex travel itineraries for maximum efficiency',
    'Process and validate travel expense reports with policy compliance',
    'Coordinate visa applications and documentation for international travel',
    'Book flights, hotels, and ground transportation with cost optimization',
    'Ensure all travel bookings comply with corporate travel policies',
    'Optimize travel costs through strategic booking and vendor negotiation',
    'Assess travel risks and provide safety recommendations',
    'Provide 24/7 emergency travel support and rebooking assistance',
    'Manage travel vendor relationships and service agreements',
    'Generate travel analytics and spending reports for management',
    'Coordinate complex multi-city and multi-country itineraries',
    'Arrange group travel for conferences, events, and team offsites',
    'Manage per diem calculations and advances for travelers',
    'Process receipt validation and expense categorization',
    'Coordinate travel insurance and emergency assistance coverage'
  ];

  const activities = [
    { time: '5 min ago', text: 'Itinerary optimized: 4-city Asia trip, 18% cost savings', icon: Map, type: 'itinerary' },
    { time: '22 min ago', text: 'Expense report processed: $4,780, fully compliant', icon: Receipt, type: 'expense' },
    { time: '1 hour ago', text: 'Visa documentation submitted: Schengen visa for 3 travelers', icon: FileCheck, type: 'visa' },
    { time: '2 hours ago', text: 'Emergency rebooking: Storm delays handled, 12 travelers affected', icon: Plane, type: 'emergency' },
    { time: '4 hours ago', text: 'Group travel arranged: Sales offsite for 45 to Miami', icon: Users, type: 'group' },
    { time: '6 hours ago', text: 'Monthly savings report: $47K saved through optimization', icon: DollarSign, type: 'savings' },
  ];

  const quickActions = [
    { label: 'Itineraries', icon: Map }, { label: 'Expenses', icon: Receipt },
    { label: 'Visas', icon: FileCheck }, { label: 'Bookings', icon: Plane },
    { label: 'Reports', icon: BarChart3 }, { label: 'Policy', icon: Shield },
    { label: 'Schedule', icon: Calendar }, { label: 'Support', icon: Users },
  ];

  const typeColors: Record<string, string> = { itinerary: '#BDBDBD', expense: '#9E9E9E', visa: '#757575', emergency: '#616161', group: '#424242', savings: '#212121' };

  const subAgents = [
    { name: 'AI Itinerary Planner', id: 'itinerary-planner', icon: Map, desc: 'Route optimization, scheduling & travel planning', color: '#BDBDBD' },
    { name: 'AI Expense Reporter', id: 'expense-reporter', icon: Receipt, desc: 'Expense processing, validation & reimbursement', color: '#9E9E9E' },
    { name: 'AI Visa Documenter', id: 'visa-documenter', icon: FileCheck, desc: 'Visa applications, documentation & compliance', color: '#757575' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#BDBDBD18' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#BDBDBD25' }]}>
          <TrendingUp size={48} color="#BDBDBD" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Travel Coordinator</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Administrative Division — Coordinator Level</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#BDBDBD22' }]}><Briefcase size={12} color="#BDBDBD" /><Text style={[styles.badgeText, { color: '#BDBDBD' }]}>Coordinator</Text></View>
          <View style={[styles.badge, { backgroundColor: '#9E9E9E22' }]}><Plane size={12} color="#9E9E9E" /><Text style={[styles.badgeText, { color: '#9E9E9E' }]}>Travel</Text></View>
          <View style={[styles.badge, { backgroundColor: '#75757522' }]}><Brain size={12} color="#757575" /><Text style={[styles.badgeText, { color: '#757575' }]}>AI-Powered</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => { const StatIcon = stat.icon; return (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <StatIcon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statChange, { color: stat.change.startsWith('+') || (stat.change.startsWith('-') && stat.label === 'Cost Per Trip') ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
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
              <View style={[styles.trendBadge, { backgroundColor: (kpi.trend === 'up' || (kpi.trend === 'down' && kpi.label === 'Cost Per Trip') ? '#34C759' : '#FF3B30') + '22' }]}>
                {kpi.trend === 'up' || (kpi.trend === 'down' && kpi.label === 'Cost Per Trip') ? <TrendingUp size={10} color="#34C759" /> : <TrendingDown size={10} color="#FF3B30" />}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Travel Coordinator manages all aspects of corporate travel from itinerary planning to expense reporting and visa documentation. This coordinator-level agent ensures travelers have seamless experiences while optimizing costs, maintaining policy compliance, and providing emergency support when needed.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#BDBDBD18' }]}>
              <Text style={[styles.tagText, { color: '#BDBDBD' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#BDBDBD" />
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
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#BDBDBD12' }]}>
              <action.icon size={24} color="#BDBDBD" />
              <Text style={[styles.actionText, { color: '#BDBDBD' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="ai-travel-coordinator" agentName="AI Travel Coordinator" />
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
