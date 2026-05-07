import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Star, Activity, CircleCheckBig, TrendingUp, TrendingDown, DollarSign, BarChart3, Shield, ArrowRight, Users, Zap, FileText, Target, Brain, Briefcase, Eye, Globe, Calendar, Megaphone, Plane, Mail, PenTool, Phone, Clock } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AiExecutiveAssistantPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Calendars Managed', value: '47', icon: Calendar, color: '#A1887F', change: '+3' },
    { label: 'Trips Booked', value: '892', icon: Plane, color: '#8D6E63', change: '+67' },
    { label: 'Correspondence', value: '14.2K', icon: Mail, color: '#795548', change: '+1.2K' },
    { label: 'Response Time', value: '45s', icon: Clock, color: '#6D4C41', change: '-12s' },
  ];

  const kpis = [
    { label: 'Calendar Accuracy', value: '99.8%', trend: 'up' },
    { label: 'Travel Savings', value: '18%', trend: 'up' },
    { label: 'Email Response', value: '94%', trend: 'up' },
    { label: 'Exec Satisfaction', value: '4.9/5', trend: 'up' },
  ];

  const capabilities = ['Calendar Optimization','Travel Booking','Correspondence Management','Meeting Coordination','Executive Support','Schedule Management','Email Management','Call Screening','Document Preparation','Travel Coordination','Expense Tracking','Time Management','Priority Management','Gatekeeping','Relationship Management'];

  const responsibilities = [
    'Optimize executive calendars to maximize productivity and minimize conflicts',
    'Book and manage complex travel arrangements including flights, hotels, and ground transport',
    'Draft, review, and manage executive correspondence with precision and professionalism',
    'Coordinate high-level meetings with internal and external stakeholders',
    'Provide comprehensive executive support for daily operations and special projects',
    'Manage complex schedules across multiple time zones and priorities',
    'Handle executive email management including prioritization and responses',
    'Screen incoming calls and communications to protect executive time',
    'Prepare documents, presentations, and reports for executive review',
    'Coordinate all aspects of executive travel including visas and documentation',
    'Track and manage executive expenses and reimbursement processes',
    'Optimize time management strategies for maximum executive efficiency',
    'Manage priorities and ensure critical items receive immediate attention',
    'Act as gatekeeper to control access to executive attention and time',
    'Build and maintain relationships with key stakeholders and partners'
  ];

  const activities = [
    { time: '2 min ago', text: 'Calendar optimized: 5 conflicts resolved, 3.5 hours freed', icon: Calendar, type: 'calendar' },
    { time: '18 min ago', text: 'International trip booked: Tokyo, 4 days, business class', icon: Plane, type: 'travel' },
    { time: '45 min ago', text: 'Board correspondence drafted: Q3 strategic review response', icon: PenTool, type: 'correspondence' },
    { time: '1 hour ago', text: 'Executive briefing prepared: Investor meeting materials ready', icon: FileText, type: 'briefing' },
    { time: '3 hours ago', text: 'VIP call scheduled: CEO coordination with 3 executives', icon: Phone, type: 'call' },
    { time: '5 hours ago', text: 'Expense report submitted: $12,400 travel reimbursement', icon: DollarSign, type: 'expense' },
  ];

  const quickActions = [
    { label: 'Calendar', icon: Calendar }, { label: 'Travel', icon: Plane },
    { label: 'Email', icon: Mail }, { label: 'Drafts', icon: PenTool },
    { label: 'Calls', icon: Phone }, { label: 'Expenses', icon: DollarSign },
    { label: 'Schedule', icon: Clock }, { label: 'Reports', icon: BarChart3 },
  ];

  const typeColors: Record<string, string> = { calendar: '#A1887F', travel: '#8D6E63', correspondence: '#795548', briefing: '#6D4C41', call: '#5D4037', expense: '#4E342E' };

  const subAgents = [
    { name: 'AI Calendar Optimizer', id: 'calendar-optimizer', icon: Calendar, desc: 'Schedule optimization, conflict resolution & time blocking', color: '#A1887F' },
    { name: 'AI Travel Booker', id: 'travel-booker', icon: Plane, desc: 'Flight, hotel & ground transport booking coordination', color: '#8D6E63' },
    { name: 'AI Correspondence Drafter', id: 'correspondence-drafter', icon: PenTool, desc: 'Email drafting, review & professional communication', color: '#795548' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#A1887F18' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#A1887F25' }]}>
          <Star size={48} color="#A1887F" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Executive Assistant</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Administrative Division — Specialist Level</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#A1887F22' }]}><Briefcase size={12} color="#A1887F" /><Text style={[styles.badgeText, { color: '#A1887F' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#79554822' }]}><Star size={12} color="#795548" /><Text style={[styles.badgeText, { color: '#795548' }]}>Executive</Text></View>
          <View style={[styles.badge, { backgroundColor: '#6D4C4122' }]}><Brain size={12} color="#6D4C41" /><Text style={[styles.badgeText, { color: '#6D4C41' }]}>AI-Powered</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => { const StatIcon = stat.icon; return (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <StatIcon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statChange, { color: stat.change.startsWith('+') || stat.change.startsWith('-') && stat.label === 'Response Time' ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
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
              <View style={[styles.trendBadge, { backgroundColor: '#34C75922' }]}>
                <TrendingUp size={10} color="#34C759" />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Executive Assistant provides elite-level support for C-suite executives, handling complex calendar optimization, sophisticated travel arrangements, and high-stakes correspondence management. This specialist-level agent ensures executives can focus on strategic decisions while maintaining seamless operations and exceptional stakeholder relationships.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#A1887F18' }]}>
              <Text style={[styles.tagText, { color: '#A1887F' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#A1887F" />
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
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#A1887F12' }]}>
              <action.icon size={24} color="#A1887F" />
              <Text style={[styles.actionText, { color: '#A1887F' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="ai-executive-assistant" agentName="AI Executive Assistant" />
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
