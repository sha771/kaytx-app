import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  HeartHandshake, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, TrendingUp, ChevronRight, MessageSquare, AlertTriangle, FileText, ShieldCheck, Zap, ClipboardList, Calendar
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = [
  {
    "id": "care-plan-manager",
    "name": "AI Care Plan Manager",
    "icon": ClipboardList,
    "desc": "Develops and manages comprehensive patient care plans"
  },
  {
    "id": "follow-up-scheduler",
    "name": "AI Follow-up Scheduler",
    "icon": Calendar,
    "desc": "Schedules and monitors patient follow-up appointments"
  },
  {
    "id": "outcome-tracker",
    "name": "AI Outcome Tracker",
    "icon": TrendingUp,
    "desc": "Tracks clinical outcomes and quality metrics"
  }
];

const QUICK_ACTIONS = [
  {
    "label": "Care Plans",
    "icon": HeartHandshake
  },
  {
    "label": "Team Chat",
    "icon": MessageSquare
  },
  {
    "label": "Follow-ups",
    "icon": Calendar
  },
  {
    "label": "Outcomes",
    "icon": ChartBarBig
  }
];

const METRICS = [
  {
    "label": "Care Plans",
    "value": "4,821",
    "change": "+12.4%",
    "trend": "up"
  },
  {
    "label": "Follow-up Rate",
    "value": "96.8%",
    "change": "+4.2%",
    "trend": "up"
  },
  {
    "label": "Outcome Score",
    "value": "94.1%",
    "change": "+2.8%",
    "trend": "up"
  },
  {
    "label": "Care Gaps Closed",
    "value": "1,247",
    "change": "+18%",
    "trend": "up"
  }
];

export default function CareCoordinatorPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
  {
    "label": "Tasks",
    "value": "2513",
    "icon": CircleCheckBig,
    "color": "#34C759"
  },
  {
    "label": "Uptime",
    "value": "99.9%",
    "icon": Activity,
    "color": "#007AFF"
  },
  {
    "label": "Response",
    "value": "1.9s",
    "icon": Clock,
    "color": "#FF9500"
  },
  {
    "label": "Accuracy",
    "value": "96.0%",
    "icon": Target,
    "color": "#B71C1C"
  }
];

  const capabilities = [
  "Care Planning",
  "Follow-up Management",
  "Outcome Tracking",
  "Multi-Disciplinary Coordination",
  "Patient Education",
  "Risk Stratification",
  "Chronic Disease Management",
  "Care Gap Analysis",
  "Population Health",
  "Quality Metrics",
  "Communication",
  "Documentation"
];

  const responsibilities = [
  "Comprehensive care plan development and management for patient populations",
  "Follow-up scheduling and appointment adherence monitoring",
  "Clinical outcome tracking and quality metric reporting",
  "Multi-disciplinary care coordination and communication management",
  "Patient education and self-management support coordination",
  "Risk stratification and care intensity level assignment",
  "Chronic disease management program coordination and oversight",
  "Care gap analysis and proactive outreach for overdue patients",
  "Population health management and quality improvement initiatives"
];

  const activities = [
  {
    "time": "3 min ago",
    "text": "Developed care plans for 24 new patients",
    "icon": HeartHandshake
  },
  {
    "time": "6 min ago",
    "text": "Scheduled follow-ups for 48 patients",
    "icon": Calendar
  },
  {
    "time": "9 min ago",
    "text": "Tracked outcomes for chronic disease cohort",
    "icon": ChartBarBig
  },
  {
    "time": "15 min ago",
    "text": "Closed 12 care gaps through proactive outreach",
    "icon": CircleCheckBig
  },
  {
    "time": "32 min ago",
    "text": "Coordinated multi-disciplinary team meeting",
    "icon": Users
  }
];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#B71C1C20' }]}>
          <HeartHandshake size={48} color="#B71C1C" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Care Coordinator</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Care Planning & Outcome Tracking</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#B71C1C22' }]}>
            <Star size={12} color="#B71C1C" />
            <Text style={[styles.badgeText, { color: '#B71C1C' }]}>Coordinator</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Users size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}>
            <ShieldCheck size={12} color="#AF52DE" />
            <Text style={[styles.badgeText, { color: '#AF52DE' }]}>Healthcare</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Care Coordinator manages care plan development, follow-up scheduling, and outcome tracking across the Healthcare division. It orchestrates sub-agents for care plan management, follow-up scheduling, and outcome tracking.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, i) => (
            <View key={i} style={[styles.tag, { backgroundColor: '#B71C1C18' }]}>
              <Text style={[styles.tagText, { color: '#B71C1C' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, i) => (
          <View key={i} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#B71C1C" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents Hierarchy</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary, marginBottom: 12 }]}>
          Direct reports and specialized sub-agents executing care coordinator functions.
        </Text>
        {SUB_AGENTS.map((agent) => (
          <TouchableOpacity
            key={agent.id}
            onPress={() => router.push(`/ai-agent/healthcare/sub-agents/${agent.id}`)}
            style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
          >
            <View style={[styles.agentIcon, { backgroundColor: '#F59E0B20' }]}>
              <agent.icon size={28} color="#F59E0B" />
            </View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.desc}</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Metrics</Text>
        <View style={styles.metricsGrid}>
          {METRICS.map((m, i) => (
            <View key={i} style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.value}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.label}</Text>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>{m.change}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, i) => (
          <View key={i} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '#B71C1C15' }]}>
              <act.icon size={14} color="#B71C1C" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action, i) => (
            <TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#B71C1C12' }]}>
              <action.icon size={24} color="#B71C1C" />
              <Text style={[styles.actionText, { color: '#B71C1C' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="care-coordinator" agentName="AI Care Coordinator" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  agentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12 },
  agentIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  agentInfo: { flex: 1, marginLeft: 12 },
  agentName: { fontSize: 16, fontWeight: '600' },
  agentDesc: { fontSize: 12, marginTop: 2 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricCard: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  metricValue: { fontSize: 20, fontWeight: 'bold' },
  metricLabel: { fontSize: 12, marginTop: 4 },
  metricTrend: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});
