import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Cpu, Activity, CircleCheckBig, Clock, Target, ChartBar, MessageSquare, Calendar, Shield, ArrowRight, Users, Zap, Star, SquareCode, GitBranch, Layers } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function VPEngineeringPage() {
  const { theme } = useTheme();

  const stats = [
    { label: 'Commits', value: '24,531', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.99%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '0.5s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '99.5%', icon: Target, color: '#AF52DE' },
  ];

  const capabilities = [
    'System Architecture', 'Code Review', 'DevOps', 'SRE',
    'CI/CD Pipelines', 'Cloud Infrastructure', 'Security', 'Performance'
  ];

  const responsibilities = [
    'Engineering Strategy & Technical Vision',
    'System Architecture & Design Oversight',
    'Code Quality & Review Processes',
    'DevOps, CI/CD & Infrastructure',
    'Site Reliability & Performance Engineering',
    'Cloud Architecture & Cost Optimization',
    'Security Engineering & Threat Modeling',
    'Team Growth & Technical Mentorship'
  ];

  const activities = [
    { time: '1 min ago', text: 'Approved critical production deployment', icon: GitBranch },
    { time: '10 min ago', text: 'Reviewed architecture proposal for new service', icon: Layers },
    { time: '35 min ago', text: 'Updated SLO dashboards for Q3', icon: ChartBar },
    { time: '2 hours ago', text: 'Mentored 3 engineers on design patterns', icon: SquareCode },
    { time: '4 hours ago', text: 'Launched infrastructure cost optimization', icon: Zap },
  ];

  const quickActions = [
    { label: 'View Reports', icon: ChartBar },
    { label: 'Team Chat', icon: MessageSquare },
    { label: 'Schedule', icon: Calendar },
    { label: 'Settings', icon: Shield },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: theme.colors.primary + '18' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: theme.colors.primary + '25' }]}>
          <Cpu size={48} color={theme.colors.primary} />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>VP Engineering</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Technology & Engineering Department</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: theme.colors.primary + '22' }]}>
            <Star size={12} color={theme.colors.primary} />
            <Text style={[styles.badgeText, { color: theme.colors.primary }]}>VP Level</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Users size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>6+ Reports</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The VP Engineering AI leads technology strategy, system architecture, and engineering team excellence. This agent ensures scalable, secure, and high-performance systems while mentoring technical teams and driving innovation.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: theme.colors.primary + '18' }]}>
              <Text style={[styles.tagText, { color: theme.colors.primary }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color={theme.colors.primary} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, index) => (
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: theme.colors.primary + '15' }]}>
              <act.icon size={14} color={theme.colors.primary} />
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
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: theme.colors.primary + '12' }]}>
              <action.icon size={24} color={theme.colors.primary} />
              <Text style={[styles.actionText, { color: theme.colors.primary }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    
      <AgentFeatures agentId="vp-engineering" agentName="VP Engineering" />
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
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
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
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});
