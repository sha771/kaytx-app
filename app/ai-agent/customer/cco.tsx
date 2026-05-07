import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Crown, Activity, CircleCheckBig, Clock, Target, ChartBarBig, MessageSquare, Calendar, Shield, ArrowRight, Users, Zap, Star, TrendingUp } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function CCOPage() {
  const { theme } = useTheme();

  const stats = [
    { label: 'Tasks Done', value: '24,531', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.97%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '0.8s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '99.2%', icon: Target, color: '#AF52DE' },
  ];

  const capabilities = [
    'Customer Strategy', 'Experience Design', 'Journey Mapping', 'Retention Programs',
    'Voice Analytics', 'Sentiment Analysis', 'NPS Tracking', 'Success Frameworks'
  ];

  const responsibilities = [
    'Customer Experience Strategy & Vision',
    'Customer Satisfaction Monitoring & Reporting',
    'Support Operations Oversight & Optimization',
    'Customer Retention & Loyalty Programs',
    'Journey Mapping & Touchpoint Analysis',
    'Voice of Customer & Feedback Systems',
    'CX Technology Stack & Tooling',
    'Cross-functional CX Alignment'
  ];

  const activities = [
    { time: '2 min ago', text: 'Completed quarterly CX performance review', icon: CircleCheckBig },
    { time: '15 min ago', text: 'Updated NPS dashboard with latest results', icon: ChartBarBig },
    { time: '1 hour ago', text: 'Approved new customer journey optimization', icon: Zap },
    { time: '3 hours ago', text: 'Resolved escalated enterprise customer issue', icon: Shield },
    { time: '5 hours ago', text: 'Launched retention campaign for Q3', icon: TrendingUp },
  ];

  const quickActions = [
    { label: 'View Reports', icon: ChartBarBig },
    { label: 'Team Chat', icon: MessageSquare },
    { label: 'Schedule', icon: Calendar },
    { label: 'Settings', icon: Shield },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Header */}
      <View style={[styles.hero, { backgroundColor: theme.colors.primary + '18' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: theme.colors.primary + '25' }]}>
          <Crown size={48} color={theme.colors.primary} />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>CCO</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Chief Customer Officer</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: theme.colors.primary + '22' }]}>
            <Star size={12} color={theme.colors.primary} />
            <Text style={[styles.badgeText, { color: theme.colors.primary }]}>C-Suite</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Users size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>14 Reports</Text>
          </View>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Overview */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The Chief Customer Officer AI oversees all customer experience operations, ensuring exceptional service delivery and customer satisfaction across every touchpoint. This agent orchestrates the entire customer lifecycle from onboarding to advocacy.
        </Text>
      </View>

      {/* Capabilities */}
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

      {/* Responsibilities */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color={theme.colors.primary} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Recent Activity */}
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

      {/* Quick Actions */}
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

      <AgentFeatures agentId="cco" agentName="CCO - Chief Customer Officer" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 28, fontWeight: 'bold' },
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
