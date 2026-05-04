import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Users, Clock, AlertTriangle, CheckCircle, BarChart3, Calendar,
  ChevronRight, Funnel, Plus, User, Briefcase, Zap, TrendingUp,
  ArrowUpRight, ArrowDownRight, MoreVertical
} from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const TEAM_MEMBERS = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Product Manager',
    avatar: 'SC',
    workload: 85,
    capacity: 40,
    assigned: 8,
    completed: 32,
    status: 'busy',
    projects: ['Q2 Roadmap', 'Mobile App'],
    aiAssisted: true
  },
  {
    id: '2',
    name: 'Michael Johnson',
    role: 'Senior Developer',
    avatar: 'MJ',
    workload: 72,
    capacity: 40,
    assigned: 6,
    completed: 45,
    status: 'available',
    projects: ['API v2', 'Dashboard'],
    aiAssisted: true
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    avatar: 'ER',
    workload: 95,
    capacity: 35,
    assigned: 10,
    completed: 28,
    status: 'overloaded',
    projects: ['Design System', 'Mobile App'],
    aiAssisted: false
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'DevOps Engineer',
    avatar: 'DK',
    workload: 60,
    capacity: 40,
    assigned: 4,
    completed: 38,
    status: 'available',
    projects: ['Infrastructure', 'CI/CD'],
    aiAssisted: true
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    role: 'Data Analyst',
    avatar: 'LT',
    workload: 78,
    capacity: 40,
    assigned: 7,
    completed: 29,
    status: 'busy',
    projects: ['Analytics', 'Reporting'],
    aiAssisted: true
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'QA Engineer',
    avatar: 'JW',
    workload: 88,
    capacity: 40,
    assigned: 9,
    completed: 41,
    status: 'busy',
    projects: ['Testing', 'Automation'],
    aiAssisted: false
  },
];

const WORKLOAD_STATS = [
  { label: 'Available', count: 2, color: '#10B981', icon: CheckCircle },
  { label: 'Busy', count: 3, color: '#F59E0B', icon: Clock },
  { label: 'Overloaded', count: 1, color: '#EF4444', icon: AlertTriangle },
];

const AI_RECOMMENDATIONS = [
  { type: 'rebalance', message: 'Consider redistributing 2 tasks from Emily to David', priority: 'high' },
  { type: 'optimize', message: 'AI can automate 15% of Sarah\'s reporting tasks', priority: 'medium' },
  { type: 'capacity', message: 'Team has 35 hours of available capacity this week', priority: 'low' },
];

export default function WorkloadManagementScreen() {
  const { theme } = useTheme();
  const [selectedView, setSelectedView] = useState('team');
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'available': return '#10B981';
      case 'busy': return '#F59E0B';
      case 'overloaded': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getWorkloadColor = (workload: number) => {
    if (workload >= 90) return '#EF4444';
    if (workload >= 75) return '#F59E0B';
    return '#10B981';
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <View style={[styles.iconWrap, { backgroundColor: '#3B82F615' }]}>
              <BarChart3 size={28} color="#3B82F6" />
            </View>
            <View>
              <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
                Workload Management
              </Text>
              <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
                Balance team capacity with AI insights
              </Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.newBtn, { backgroundColor: '#3B82F6' }]}>
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Team Stats */}
        <View style={styles.statsRow}>
          {WORKLOAD_STATS.map((stat) => (
            <View key={stat.label} style={[styles.statCard, { backgroundColor: theme.colors.background }]}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
                <stat.icon size={18} color={stat.color} />
              </View>
              <Text style={[styles.statCount, { color: stat.color }]}>{stat.count}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* View Toggle */}
        <View style={styles.viewToggle}>
          {['team', 'projects', 'timeline'].map((view) => (
            <TouchableOpacity
              key={view}
              onPress={() => setSelectedView(view)}
              style={[
                styles.viewTab,
                selectedView === view && { backgroundColor: '#3B82F6' }
              ]}
            >
              <Text style={[
                styles.viewText,
                { color: selectedView === view ? '#fff' : theme.colors.text }
              ]}>
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* AI Recommendations */}
      <View style={[styles.aiSection, { backgroundColor: theme.colors.card }]}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Zap size={18} color="#F59E0B" />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              AI Recommendations
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: '#3B82F6' }]}>View All</Text>
          </TouchableOpacity>
        </View>
        {AI_RECOMMENDATIONS.map((rec, i) => (
          <Animated.View 
            key={i}
            entering={FadeInUp.delay(i * 50)}
            style={[styles.recCard, { backgroundColor: theme.colors.background }]}
          >
            <View style={[styles.recIcon, { 
              backgroundColor: rec.priority === 'high' ? '#EF444415' : rec.priority === 'medium' ? '#F59E0B15' : '#10B98115' 
            }]}>
              {rec.type === 'rebalance' && <ArrowUpRight size={16} color="#EF4444" />}
              {rec.type === 'optimize' && <Zap size={16} color="#F59E0B" />}
              {rec.type === 'capacity' && <TrendingUp size={16} color="#10B981" />}
            </View>
            <View style={styles.recContent}>
              <Text style={[styles.recMessage, { color: theme.colors.text }]}>
                {rec.message}
              </Text>
              <View style={[styles.priorityChip, { 
                backgroundColor: rec.priority === 'high' ? '#EF444415' : rec.priority === 'medium' ? '#F59E0B15' : '#10B98115' 
              }]}>
                <Text style={[styles.priorityText, { 
                  color: rec.priority === 'high' ? '#EF4444' : rec.priority === 'medium' ? '#F59E0B' : '#10B981' 
                }]}>
                  {rec.priority.toUpperCase()}
                </Text>
              </View>
            </View>
          </Animated.View>
        ))}
      </View>

      {/* Team Workload */}
      <View style={[styles.teamSection, { backgroundColor: theme.colors.card }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Team Workload
          </Text>
          <TouchableOpacity>
            <Funnel size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {TEAM_MEMBERS.map((member, index) => (
          <Animated.View key={member.id} entering={FadeInUp.delay(index * 50)}>
            <TouchableOpacity
              style={[styles.memberCard, { backgroundColor: theme.colors.background }]}
              onPress={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
            >
              {/* Member Header */}
              <View style={styles.memberHeader}>
                <View style={styles.memberLeft}>
                  <View style={[styles.avatar, { backgroundColor: getStatusColor(member.status) }]}>
                    <Text style={styles.avatarText}>{member.avatar}</Text>
                  </View>
                  <View>
                    <Text style={[styles.memberName, { color: theme.colors.text }]}>
                      {member.name}
                    </Text>
                    <Text style={[styles.memberRole, { color: theme.colors.textSecondary }]}>
                      {member.role}
                    </Text>
                  </View>
                </View>
                <View style={styles.memberRight}>
                  {member.aiAssisted && (
                    <View style={[styles.aiBadge, { backgroundColor: '#3B82F615' }]}>
                      <Zap size={12} color="#3B82F6" />
                      <Text style={[styles.aiBadgeText, { color: '#3B82F6' }]}>AI</Text>
                    </View>
                  )}
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(member.status) }]} />
                </View>
              </View>

              {/* Workload Bar */}
              <View style={styles.workloadSection}>
                <View style={styles.workloadHeader}>
                  <Text style={[styles.workloadLabel, { color: theme.colors.textSecondary }]}>
                    Workload
                  </Text>
                  <Text style={[styles.workloadValue, { color: getWorkloadColor(member.workload) }]}>
                    {member.workload}%
                  </Text>
                </View>
                <View style={[styles.workloadBar, { backgroundColor: theme.colors.background }]}>
                  <View 
                    style={[
                      styles.workloadFill, 
                      { width: `${member.workload}%`, backgroundColor: getWorkloadColor(member.workload) }
                    ]} 
                  />
                </View>
                <Text style={[styles.workloadDetail, { color: theme.colors.textSecondary }]}>
                  {member.assigned} assigned • {member.capacity}h capacity
                </Text>
              </View>

              {/* Projects */}
              <View style={styles.projectsRow}>
                {member.projects.map((project, i) => (
                  <View key={i} style={[styles.projectChip, { backgroundColor: theme.colors.background }]}>
                    <Briefcase size={12} color={theme.colors.textSecondary} />
                    <Text style={[styles.projectText, { color: theme.colors.textSecondary }]}>
                      {project}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Expanded Details */}
              {selectedMember === member.id && (
                <View style={styles.expandedSection}>
                  <View style={styles.statsGrid}>
                    <View style={styles.statBox}>
                      <Text style={[styles.statValue, { color: theme.colors.text }]}>
                        {member.completed}
                      </Text>
                      <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                        Tasks Done
                      </Text>
                    </View>
                    <View style={styles.statBox}>
                      <Text style={[styles.statValue, { color: theme.colors.text }]}>
                        {member.assigned}
                      </Text>
                      <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                        In Progress
                      </Text>
                    </View>
                    <View style={styles.statBox}>
                      <Text style={[styles.statValue, { color: theme.colors.text }]}>
                        {member.capacity}h
                      </Text>
                      <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                        Available
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#3B82F6' }]}>
                    <Text style={styles.actionBtnText}>Rebalance Tasks</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* Summary Footer */}
      <View style={[styles.summaryFooter, { backgroundColor: theme.colors.card }]}>
        <View style={styles.summaryItem}>
          <Users size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{TEAM_MEMBERS.length}</Text>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Team Members</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Briefcase size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>44</Text>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Total Tasks</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Clock size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>213h</Text>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Total Capacity</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 60 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconWrap: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 22, fontWeight: '700' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  newBtn: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statCard: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 12 },
  statIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  statCount: { fontSize: 20, fontWeight: '800', marginBottom: 2 },
  statLabel: { fontSize: 11 },
  viewToggle: { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 10, padding: 4 },
  viewTab: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  viewText: { fontSize: 13, fontWeight: '600' },
  aiSection: { marginHorizontal: 16, marginTop: 16, padding: 16, borderRadius: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  seeAll: { fontSize: 14, fontWeight: '600' },
  recCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 8 },
  recIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  recContent: { flex: 1, marginLeft: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  recMessage: { flex: 1, fontSize: 14, fontWeight: '500', marginRight: 10 },
  priorityChip: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  priorityText: { fontSize: 10, fontWeight: '700' },
  teamSection: { marginHorizontal: 16, marginTop: 16, padding: 16, borderRadius: 16 },
  memberCard: { padding: 14, borderRadius: 12, marginBottom: 10 },
  memberHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  memberLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  memberName: { fontSize: 15, fontWeight: '600' },
  memberRole: { fontSize: 12, marginTop: 2 },
  memberRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  aiBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  aiBadgeText: { fontSize: 10, fontWeight: '700' },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  workloadSection: { marginBottom: 10 },
  workloadHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  workloadLabel: { fontSize: 12 },
  workloadValue: { fontSize: 14, fontWeight: '700' },
  workloadBar: { height: 6, borderRadius: 3, marginBottom: 6 },
  workloadFill: { height: 6, borderRadius: 3 },
  workloadDetail: { fontSize: 11 },
  projectsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  projectChip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  projectText: { fontSize: 11 },
  expandedSection: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.05)' },
  statsGrid: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  statBox: { flex: 1, alignItems: 'center', padding: 10, backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: 8 },
  statValue: { fontSize: 18, fontWeight: '700', marginBottom: 2 },
  statLabel: { fontSize: 11 },
  actionBtn: { paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  actionBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  summaryFooter: { marginHorizontal: 16, marginTop: 16, marginBottom: 30, padding: 16, borderRadius: 16, flexDirection: 'row', alignItems: 'center' },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryDivider: { width: 1, height: 40, backgroundColor: 'rgba(0,0,0,0.1)' },
  summaryValue: { fontSize: 20, fontWeight: '800', marginTop: 6, marginBottom: 2 },
  summaryLabel: { fontSize: 11 },
});
