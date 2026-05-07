import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Target, TrendingUp, CheckCircle2, Clock, Plus, ChevronRight, Award, Zap, Calendar } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const GOALS = [
  { id: 1, title: 'Increase Sales Conversion', target: '15%', current: '12%', deadline: 'May 31', status: 'active', category: 'Sales' },
  { id: 2, title: 'Reduce Support Response Time', target: '< 2 min', current: '2.5 min', deadline: 'Jun 15', status: 'active', category: 'Support' },
  { id: 3, title: 'Launch 5 New AI Agents', target: '5', current: '3', deadline: 'Jun 30', status: 'active', category: 'Operations' },
  { id: 4, title: 'Improve Customer Satisfaction', target: '95%', current: '92%', deadline: 'Q2 End', status: 'completed', category: 'Customer' },
];

const MILESTONES = [
  { id: 1, goal: 'Sales Conversion', milestone: 'Hit 10% conversion', completed: true, date: 'Apr 15' },
  { id: 2, goal: 'Sales Conversion', milestone: 'Optimize lead scoring', completed: true, date: 'Apr 30' },
  { id: 3, goal: 'Sales Conversion', milestone: 'Reach 15% target', completed: false, date: 'May 31' },
];

const QUICK_STATS = [
  { label: 'Active Goals', value: '8', icon: Target, color: '#3B82F6' },
  { label: 'Completed', value: '24', icon: CheckCircle2, color: '#10B981' },
  { label: 'Success Rate', value: '87%', icon: TrendingUp, color: '#F59E0B' },
];

export default function GoalsPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.iconWrap, { backgroundColor: '#10B98120' }]}>
          <Target size={40} color="#10B981" />
        </View>
        <Text style={[styles.title, { color: theme.colors.text }]}>Goals & OKRs</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Track objectives and key results</Text>
      </View>

      <View style={styles.statsRow}>
        {QUICK_STATS.map((stat) => (
          <View key={stat.label} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={20} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Goals</Text>
          <TouchableOpacity style={[styles.addBtn, { backgroundColor: '#10B981' }]}>
            <Plus size={18} color="#fff" />
          </TouchableOpacity>
        </View>
        {GOALS.filter(g => g.status === 'active').map((goal) => (
          <TouchableOpacity key={goal.id} style={[styles.goalCard, { backgroundColor: theme.colors.background }]}>
            <View style={styles.goalHeader}>
              <View style={[styles.categoryBadge, { backgroundColor: '#10B98120' }]}>
                <Text style={[styles.categoryText, { color: '#10B981' }]}>{goal.category}</Text>
              </View>
              <View style={styles.deadline}>
                <Clock size={12} color={theme.colors.textSecondary} />
                <Text style={[styles.deadlineText, { color: theme.colors.textSecondary }]}>{goal.deadline}</Text>
              </View>
            </View>
            <Text style={[styles.goalTitle, { color: theme.colors.text }]}>{goal.title}</Text>
            <View style={styles.progressSection}>
              <View style={styles.progressLabels}>
                <Text style={[styles.currentValue, { color: theme.colors.text }]}>{goal.current}</Text>
                <Text style={[styles.targetValue, { color: theme.colors.textSecondary }]}>Target: {goal.target}</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '75%', backgroundColor: '#10B981' }]} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Milestones</Text>
        {MILESTONES.map((milestone, index) => (
          <View key={milestone.id} style={styles.milestoneItem}>
            <View style={[styles.milestoneLine, { backgroundColor: index < MILESTONES.length - 1 ? '#E5E5EA' : 'transparent' }]} />
            <View style={[styles.milestoneDot, { backgroundColor: milestone.completed ? '#10B981' : '#E5E5EA' }]}>
              {milestone.completed && <CheckCircle2 size={12} color="#fff" />}
            </View>
            <View style={styles.milestoneContent}>
              <Text style={[styles.milestoneTitle, { color: theme.colors.text }]}>{milestone.milestone}</Text>
              <Text style={[styles.milestoneDate, { color: theme.colors.textSecondary }]}>{milestone.date}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recently Completed</Text>
        {GOALS.filter(g => g.status === 'completed').map((goal) => (
          <View key={goal.id} style={[styles.completedCard, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.completedIcon, { backgroundColor: '#10B98120' }]}>
              <Award size={20} color="#10B981" />
            </View>
            <View style={styles.completedInfo}>
              <Text style={[styles.completedTitle, { color: theme.colors.text }]}>{goal.title}</Text>
              <Text style={[styles.completedTarget, { color: theme.colors.textSecondary }]}>Achieved: {goal.target}</Text>
            </View>
            <CheckCircle2 size={20} color="#10B981" />
          </View>
        ))}
      </View>

      <AgentFeatures agentId="goals" agentName="Goals & OKRs" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', paddingVertical: 30, borderBottomWidth: 1 },
  iconWrap: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 26, fontWeight: 'bold' },
  subtitle: { fontSize: 14, marginTop: 4 },
  statsRow: { flexDirection: 'row', padding: 16, gap: 10 },
  statCard: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 20, fontWeight: 'bold', marginTop: 6 },
  statLabel: { fontSize: 11, marginTop: 2 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  addBtn: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  goalCard: { padding: 14, borderRadius: 12, marginBottom: 10 },
  goalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  categoryBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  categoryText: { fontSize: 11, fontWeight: '600' },
  deadline: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  deadlineText: { fontSize: 12 },
  goalTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  progressSection: { gap: 6 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  currentValue: { fontSize: 14, fontWeight: '600' },
  targetValue: { fontSize: 13 },
  progressBar: { height: 6, backgroundColor: '#E5E5EA', borderRadius: 3 },
  progressFill: { height: '100%', borderRadius: 3 },
  milestoneItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  milestoneLine: { position: 'absolute', left: 11, top: 24, bottom: -16, width: 2 },
  milestoneDot: { width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  milestoneContent: { flex: 1 },
  milestoneTitle: { fontSize: 14, fontWeight: '500' },
  milestoneDate: { fontSize: 12, marginTop: 2 },
  completedCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 10, marginBottom: 8 },
  completedIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  completedInfo: { flex: 1 },
  completedTitle: { fontSize: 15, fontWeight: '500' },
  completedTarget: { fontSize: 12, marginTop: 2 },
});
