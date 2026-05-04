import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  ChevronLeft, Users, BarChart3, Award, Calendar, Clock,
  Zap, ArrowRight, Target, TrendingUp, Star, CheckCircle
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

const TEAM_TOOLS = [
  {
    id: 'workload',
    name: 'Workload Management',
    description: 'Balance team capacity and tasks',
    icon: BarChart3,
    color: '#3B82F6',
    route: '/ai-agent/team-management/workload',
    metric: '87% balanced'
  },
  {
    id: 'goals',
    name: 'Goals & OKRs',
    description: 'Track objectives and key results',
    icon: Target,
    color: '#10B981',
    route: '/ai-agent/team-management/goals',
    metric: '4 of 5 on track'
  },
];

const TEAM_STATS = [
  { label: 'Team Size', value: '48', icon: Users },
  { label: 'Active Goals', value: '24', icon: Target },
  { label: 'Completed', value: '89%', icon: CheckCircle },
  { label: 'Avg Score', value: '4.6', icon: Star },
];

const TEAM_MEMBERS = [
  { name: 'Sarah Chen', role: 'Product Manager', status: 'available', avatar: 'SC' },
  { name: 'Mike Johnson', role: 'Senior Dev', status: 'busy', avatar: 'MJ' },
  { name: 'Emma Wilson', role: 'UX Designer', status: 'available', avatar: 'EW' },
  { name: 'David Kim', role: 'DevOps', status: 'offline', avatar: 'DK' },
];

export default function TeamManagementIndexScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'available': return '#10B981';
      case 'busy': return '#F59E0B';
      case 'offline': return '#6B7280';
      default: return '#6B7280';
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Team Management
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Manage your AI workforce
            </Text>
          </View>
        </View>

        {/* Team Stats */}
        <View style={styles.statsRow}>
          {TEAM_STATS.map((stat, i) => (
            <Animated.View
              key={stat.label}
              entering={FadeInUp.delay(i * 50)}
              style={[styles.statCard, { backgroundColor: theme.colors.background }]}
            >
              <stat.icon size={20} color={theme.colors.primary} />
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Management Tools */}
      <View style={styles.toolsContainer}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Management Tools
        </Text>
        {TEAM_TOOLS.map((tool, i) => (
          <Animated.View key={tool.id} entering={FadeInUp.delay(i * 50)}>
            <TouchableOpacity
              style={[styles.toolCard, { backgroundColor: theme.colors.card }]}
              onPress={() => router.push(tool.route)}
            >
              <View style={[styles.toolIcon, { backgroundColor: tool.color + '15' }]}>
                <tool.icon size={28} color={tool.color} />
              </View>
              <View style={styles.toolContent}>
                <Text style={[styles.toolName, { color: theme.colors.text }]}>
                  {tool.name}
                </Text>
                <Text style={[styles.toolDesc, { color: theme.colors.textSecondary }]}>
                  {tool.description}
                </Text>
                <View style={styles.toolMetric}>
                  <TrendingUp size={14} color={tool.color} />
                  <Text style={[styles.metricText, { color: tool.color }]}>
                    {tool.metric}
                  </Text>
                </View>
              </View>
              <ArrowRight size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* Team Members */}
      <View style={[styles.membersSection, { backgroundColor: theme.colors.card }]}>
        <View style={styles.membersHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 0 }]}>
            Team Members
          </Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: '#3B82F6' }]}>View All</Text>
          </TouchableOpacity>
        </View>
        {TEAM_MEMBERS.map((member, i) => (
          <Animated.View key={member.name} entering={FadeInUp.delay(i * 50)}>
            <View style={[styles.memberRow, { backgroundColor: theme.colors.background }]}>
              <View style={[styles.memberAvatar, { backgroundColor: getStatusColor(member.status) }]}>
                <Text style={styles.memberAvatarText}>{member.avatar}</Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={[styles.memberName, { color: theme.colors.text }]}>
                  {member.name}
                </Text>
                <Text style={[styles.memberRole, { color: theme.colors.textSecondary }]}>
                  {member.role}
                </Text>
              </View>
              <View style={styles.memberStatus}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(member.status) }]} />
                <Text style={[styles.statusText, { color: theme.colors.textSecondary }]}>
                  {member.status}
                </Text>
              </View>
            </View>
          </Animated.View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={[styles.actionsSection, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Quick Actions
        </Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#3B82F615' }]}>
            <Users size={20} color="#3B82F6" />
            <Text style={[styles.actionText, { color: '#3B82F6' }]}>Add Member</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#10B98115' }]}>
            <Target size={20} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>New Goal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#F59E0B15' }]}>
            <Calendar size={20} color="#F59E0B" />
            <Text style={[styles.actionText, { color: '#F59E0B' }]}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#8B5CF615' }]}>
            <Award size={20} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Reviews</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 60 },
  headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  headerTitle: { fontSize: 22, fontWeight: '700' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: '700', marginTop: 6, marginBottom: 2 },
  statLabel: { fontSize: 10 },
  toolsContainer: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  toolCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, marginBottom: 12 },
  toolIcon: { width: 56, height: 56, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  toolContent: { flex: 1 },
  toolName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  toolDesc: { fontSize: 13, marginBottom: 6 },
  toolMetric: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metricText: { fontSize: 12, fontWeight: '600' },
  membersSection: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  membersHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  seeAll: { fontSize: 14, fontWeight: '600' },
  memberRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 10, marginBottom: 8 },
  memberAvatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  memberAvatarText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  memberInfo: { flex: 1 },
  memberName: { fontSize: 14, fontWeight: '600' },
  memberRole: { fontSize: 12, marginTop: 2 },
  memberStatus: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 12 },
  actionsSection: { marginHorizontal: 16, marginBottom: 30, padding: 16, borderRadius: 16 },
  actionsGrid: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 12 },
  actionText: { fontSize: 12, fontWeight: '600', marginTop: 6 },
});
