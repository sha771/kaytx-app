import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Zap, Activity, Star, CircleCheckBig, Clock, Target, ChartBarBig, MessageSquare, Calendar, Shield, ArrowRight, Users, Share2, Gift, Megaphone } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AIGrowthHackerPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Experiments', value: '892', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.7%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '0.4s', icon: Clock, color: '#FF9500' },
    { label: 'Growth', value: '340%', icon: Target, color: '#F43F5E' },
  ];

  const capabilities = [
    'Growth Hacking', 'Viral Loops', 'Referral Programs', 'Channel Testing',
    'Rapid Experimentation', 'User Acquisition', 'Growth Analytics', 'CRO'
  ];

  const responsibilities = [
    'Viral loop design & implementation for product growth',
    'Referral program building & optimization',
    'Acquisition channel testing & scaling',
    'Rapid experimentation framework management',
    'User acquisition strategy & execution',
    'Growth analytics & funnel optimization',
    'Conversion rate optimization across touchpoints',
    'Growth hack ideation & prioritization'
  ];

  const activities = [
    { time: '3 min ago', text: 'Designed viral loop for new feature launch', icon: Share2 },
    { time: '15 min ago', text: 'Built referral program with 3-tier rewards', icon: Gift },
    { time: '1 hour ago', text: 'Tested 4 new acquisition channels', icon: Megaphone },
    { time: '3 hours ago', text: 'Analyzed viral coefficient for onboarding', icon: Zap },
    { time: '5 hours ago', text: 'Optimized referral conversion by 28%', icon: Target },
  ];

  const quickActions = [
    { label: 'View Reports', icon: ChartBarBig },
    { label: 'Team Chat', icon: MessageSquare },
    { label: 'Schedule', icon: Calendar },
    { label: 'Settings', icon: Shield },
  ];

  const subAgents = [
    { name: 'AI Viral Loop Designer', id: 'viral-loop-designer', icon: Share2, desc: 'Viral loop design & coefficient optimization' },
    { name: 'AI Referral Program Builder', id: 'referral-program-builder', icon: Gift, desc: 'Referral program creation & management' },
    { name: 'AI Acquisition Channel Tester', id: 'acquisition-channel-tester', icon: Megaphone, desc: 'Channel testing & acquisition optimization' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#F43F5E18' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#F43F5E25' }]}>
          <Zap size={48} color="#F43F5E" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Growth Hacker</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Marketing Division — Specialist Level</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#F43F5E22' }]}>
            <Star size={12} color="#F43F5E" />
            <Text style={[styles.badgeText, { color: '#F43F5E' }]}>Specialist</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Users size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Reports</Text>
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
          The AI Growth Hacker drives rapid experimentation and unconventional growth strategies. This specialist agent designs viral loops, builds referral programs, and tests acquisition channels to achieve exponential user growth through data-driven, creative growth hacking techniques.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#F43F5E18' }]}>
              <Text style={[styles.tagText, { color: '#F43F5E' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#F43F5E" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, index) => (
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '#F43F5E15' }]}>
              <act.icon size={14} color="#F43F5E" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        {subAgents.map((sub, index) => (
          <TouchableOpacity key={index} onPress={() => router.push(`/ai-agent/marketing/sub-agents/${sub.id}`)} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.subAgentIcon, { backgroundColor: '#F43F5E15' }]}>
              <sub.icon size={20} color="#F43F5E" />
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
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#F43F5E12' }]}>
              <action.icon size={24} color="#F43F5E" />
              <Text style={[styles.actionText, { color: '#F43F5E' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="ai-growth-hacker" agentName="AI Growth Hacker" />
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
  subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10, gap: 12 },
  subAgentIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  subAgentInfo: { flex: 1 },
  subAgentName: { fontSize: 15, fontWeight: '600' },
  subAgentDesc: { fontSize: 12, marginTop: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});
