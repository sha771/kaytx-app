import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  ChevronLeft, Target, Trophy, TrendingUp, Users, CheckCircle,
  Clock, AlertCircle, Calendar, Plus, Funnel, ArrowUpRight,
  Zap, Star, Flag, Medal
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

const GOAL_TYPES = ['Company', 'Team', 'Individual'];
const TIME_PERIODS = ['Q1 2026', 'Q2 2026', 'Annual 2026'];

const GOALS = [
  {
    id: '1',
    title: 'Increase Monthly Recurring Revenue',
    description: 'Grow MRR by 25% quarter over quarter',
    type: 'Company',
    target: '$1.5M',
    current: '$1.24M',
    progress: 82,
    deadline: '2026-03-31',
    status: 'on_track',
    owner: 'Executive Team',
    keyResults: [
      { name: 'New Customer Acquisition', target: 150, current: 134, progress: 89 },
      { name: 'Upsell Revenue', target: '$200K', current: '$178K', progress: 89 },
      { name: 'Churn Reduction', target: '<5%', current: '4.2%', progress: 100 },
    ]
  },
  {
    id: '2',
    title: 'Improve Customer Satisfaction',
    description: 'Achieve NPS score of 60+',
    type: 'Company',
    target: '60 NPS',
    current: '52 NPS',
    progress: 87,
    deadline: '2026-03-31',
    status: 'on_track',
    owner: 'Customer Success',
    keyResults: [
      { name: 'CSAT Score', target: '4.5/5', current: '4.6/5', progress: 100 },
      { name: 'Support Response Time', target: '<2h', current: '2.3h', progress: 87 },
      { name: 'Feature Adoption', target: '80%', current: '76%', progress: 95 },
    ]
  },
  {
    id: '3',
    title: 'Launch New Product Line',
    description: 'Successfully launch Enterprise tier',
    type: 'Team',
    target: '100%',
    current: '75%',
    progress: 75,
    deadline: '2026-02-28',
    status: 'at_risk',
    owner: 'Product Team',
    keyResults: [
      { name: 'Feature Completion', target: '100%', current: '82%', progress: 82 },
      { name: 'Beta Testing', target: '20 Companies', current: '12 Companies', progress: 60 },
      { name: 'Documentation', target: '100%', current: '95%', progress: 95 },
    ]
  },
  {
    id: '4',
    title: 'Reduce Churn Rate',
    description: 'Reduce monthly churn to under 3%',
    type: 'Team',
    target: '<3%',
    current: '2.1%',
    progress: 100,
    deadline: '2026-03-31',
    status: 'completed',
    owner: 'Retention Team',
    keyResults: [
      { name: 'Customer Health Score', target: '8/10', current: '8.2/10', progress: 100 },
      { name: 'At-Risk Accounts Saved', target: '50', current: '67', progress: 100 },
      { name: 'Win-back Campaign', target: '30%', current: '35%', progress: 100 },
    ]
  },
  {
    id: '5',
    title: 'Personal Development Goals',
    description: 'Complete leadership certification',
    type: 'Individual',
    target: '100%',
    current: '45%',
    progress: 45,
    deadline: '2026-06-30',
    status: 'on_track',
    owner: 'Sarah Chen',
    keyResults: [
      { name: 'Course Completion', target: '12 modules', current: '5 modules', progress: 42 },
      { name: 'Mentorship Sessions', target: '6 sessions', current: '3 sessions', progress: 50 },
      { name: 'Capstone Project', target: '1 project', current: 'Planning', progress: 40 },
    ]
  },
];

const ACHIEVEMENTS = [
  { icon: Trophy, title: 'Goal Crusher', desc: 'Completed 5 goals ahead of schedule', color: '#F59E0B' },
  { icon: Medal, title: 'Team Player', desc: 'Contributed to 10+ team goals', color: '#3B82F6' },
  { icon: Star, title: 'Stretch Achiever', desc: 'Exceeded target by 25% or more', color: '#10B981' },
];

export default function GoalsManagementScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('Company');
  const [selectedPeriod, setSelectedPeriod] = useState('Q1 2026');
  const [expandedGoal, setExpandedGoal] = useState<string | null>('1');

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'on_track': return '#3B82F6';
      case 'completed': return '#10B981';
      case 'at_risk': return '#F59E0B';
      case 'behind': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'on_track': return <TrendingUp size={16} color="#3B82F6" />;
      case 'completed': return <CheckCircle size={16} color="#10B981" />;
      case 'at_risk': return <AlertCircle size={16} color="#F59E0B" />;
      case 'behind': return <Clock size={16} color="#EF4444" />;
      default: return null;
    }
  };

  const filteredGoals = GOALS.filter(g => g.type === selectedType);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Goals & OKRs
          </Text>
          <TouchableOpacity style={[styles.addBtn, { backgroundColor: '#F59E0B' }]}>
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Type Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeScroll}>
          {GOAL_TYPES.map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => setSelectedType(type)}
              style={[
                styles.typeChip,
                selectedType === type && { backgroundColor: '#F59E0B' }
              ]}
            >
              <Text style={[
                styles.typeText,
                { color: selectedType === type ? '#fff' : theme.colors.text }
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Period Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.periodScroll}>
          {TIME_PERIODS.map((period) => (
            <TouchableOpacity
              key={period}
              onPress={() => setSelectedPeriod(period)}
              style={[
                styles.periodChip,
                selectedPeriod === period && { backgroundColor: '#3B82F6' }
              ]}
            >
              <Calendar size={14} color={selectedPeriod === period ? '#fff' : theme.colors.textSecondary} />
              <Text style={[
                styles.periodText,
                { color: selectedPeriod === period ? '#fff' : theme.colors.textSecondary }
              ]}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Summary Stats */}
      <View style={styles.summaryRow}>
        <Animated.View entering={FadeInUp} style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
          <View style={[styles.summaryIcon, { backgroundColor: '#10B98115' }]}>
            <Target size={20} color="#10B981" />
          </View>
          <Text style={[styles.summaryValue, { color: '#10B981' }]}>
            {filteredGoals.filter(g => g.status === 'completed').length}
          </Text>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Completed</Text>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(50)} style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
          <View style={[styles.summaryIcon, { backgroundColor: '#3B82F615' }]}>
            <TrendingUp size={20} color="#3B82F6" />
          </View>
          <Text style={[styles.summaryValue, { color: '#3B82F6' }]}>
            {filteredGoals.filter(g => g.status === 'on_track').length}
          </Text>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>On Track</Text>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(100)} style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
          <View style={[styles.summaryIcon, { backgroundColor: '#F59E0B15' }]}>
            <AlertCircle size={20} color="#F59E0B" />
          </View>
          <Text style={[styles.summaryValue, { color: '#F59E0B' }]}>
            {filteredGoals.filter(g => g.status === 'at_risk').length}
          </Text>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>At Risk</Text>
        </Animated.View>
      </View>

      {/* Goals List */}
      <View style={styles.goalsContainer}>
        {filteredGoals.map((goal, i) => (
          <Animated.View key={goal.id} entering={FadeInUp.delay(i * 50)}>
            <TouchableOpacity
              style={[styles.goalCard, { backgroundColor: theme.colors.card }]}
              onPress={() => setExpandedGoal(expandedGoal === goal.id ? null : goal.id)}
            >
              {/* Goal Header */}
              <View style={styles.goalHeader}>
                <View style={styles.goalLeft}>
                  <View style={[styles.goalIcon, { backgroundColor: getStatusColor(goal.status) + '15' }]}>
                    {getStatusIcon(goal.status)}
                  </View>
                  <View>
                    <Text style={[styles.goalTitle, { color: theme.colors.text }]}>
                      {goal.title}
                    </Text>
                    <Text style={[styles.goalDesc, { color: theme.colors.textSecondary }]}>
                      {goal.description}
                    </Text>
                  </View>
                </View>
                <View style={styles.goalRight}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(goal.status) + '15' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(goal.status) }]}>
                      {goal.status.replace('_', ' ').toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Progress Section */}
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={[styles.progressLabel, { color: theme.colors.textSecondary }]}>
                    Progress
                  </Text>
                  <Text style={[styles.progressValue, { color: getStatusColor(goal.status) }]}>
                    {goal.progress}%
                  </Text>
                </View>
                <View style={[styles.progressBar, { backgroundColor: theme.colors.background }]}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${goal.progress}%`, backgroundColor: getStatusColor(goal.status) }
                    ]} 
                  />
                </View>
                <View style={styles.goalMeta}>
                  <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                    Current: <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{goal.current}</Text>
                  </Text>
                  <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                    Target: <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{goal.target}</Text>
                  </Text>
                </View>
              </View>

              {/* Goal Footer */}
              <View style={styles.goalFooter}>
                <View style={styles.ownerRow}>
                  <Users size={14} color={theme.colors.textSecondary} />
                  <Text style={[styles.ownerText, { color: theme.colors.textSecondary }]}>
                    {goal.owner}
                  </Text>
                </View>
                <View style={styles.deadlineRow}>
                  <Clock size={14} color={theme.colors.textSecondary} />
                  <Text style={[styles.deadlineText, { color: theme.colors.textSecondary }]}>
                    Due {new Date(goal.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </Text>
                </View>
              </View>

              {/* Expanded Key Results */}
              {expandedGoal === goal.id && (
                <View style={[styles.krSection, { backgroundColor: theme.colors.background }]}>
                  <Text style={[styles.krTitle, { color: theme.colors.text }]}>Key Results</Text>
                  {goal.keyResults.map((kr, j) => (
                    <View key={j} style={styles.krRow}>
                      <View style={styles.krLeft}>
                        <View style={[styles.krDot, { backgroundColor: kr.progress >= 100 ? '#10B981' : '#3B82F6' }]} />
                        <Text style={[styles.krName, { color: theme.colors.text }]}>{kr.name}</Text>
                      </View>
                      <View style={styles.krRight}>
                        <Text style={[styles.krProgress, { color: kr.progress >= 100 ? '#10B981' : theme.colors.textSecondary }]}>
                          {kr.current} / {kr.target}
                        </Text>
                        <View style={[styles.krBar, { backgroundColor: theme.colors.background }]}>
                          <View 
                            style={[
                              styles.krBarFill, 
                              { width: `${Math.min(kr.progress, 100)}%`, backgroundColor: kr.progress >= 100 ? '#10B981' : '#3B82F6' }
                            ]} 
                          />
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* Achievements */}
      <View style={[styles.achievementsSection, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Your Achievements
        </Text>
        <View style={styles.achievementsGrid}>
          {ACHIEVEMENTS.map((achievement, i) => (
            <Animated.View 
              key={achievement.title}
              entering={FadeInUp.delay(i * 50)}
              style={[styles.achievementCard, { backgroundColor: theme.colors.background }]}
            >
              <View style={[styles.achievementIcon, { backgroundColor: achievement.color + '15' }]}>
                <achievement.icon size={24} color={achievement.color} />
              </View>
              <Text style={[styles.achievementTitle, { color: theme.colors.text }]}>
                {achievement.title}
              </Text>
              <Text style={[styles.achievementDesc, { color: theme.colors.textSecondary }]}>
                {achievement.desc}
              </Text>
            </Animated.View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 60 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', flex: 1, marginLeft: 12 },
  addBtn: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  typeScroll: { marginBottom: 10 },
  typeChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  typeText: { fontSize: 13, fontWeight: '600' },
  periodScroll: {},
  periodChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginRight: 8 },
  periodText: { fontSize: 12, fontWeight: '600' },
  summaryRow: { flexDirection: 'row', padding: 16, gap: 10 },
  summaryCard: { flex: 1, alignItems: 'center', padding: 16, borderRadius: 16 },
  summaryIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  summaryValue: { fontSize: 22, fontWeight: '800', marginBottom: 4 },
  summaryLabel: { fontSize: 12 },
  goalsContainer: { padding: 16, gap: 12 },
  goalCard: { padding: 16, borderRadius: 16 },
  goalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  goalLeft: { flexDirection: 'row', gap: 12, flex: 1 },
  goalIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  goalTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  goalDesc: { fontSize: 12 },
  goalRight: {},
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 10, fontWeight: '700' },
  progressSection: { marginBottom: 12 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  progressLabel: { fontSize: 12 },
  progressValue: { fontSize: 14, fontWeight: '700' },
  progressBar: { height: 6, borderRadius: 3, marginBottom: 8 },
  progressFill: { height: 6, borderRadius: 3 },
  goalMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  metaText: { fontSize: 12 },
  goalFooter: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  ownerRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ownerText: { fontSize: 12 },
  deadlineRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  deadlineText: { fontSize: 12 },
  krSection: { padding: 12, borderRadius: 12, marginTop: 12 },
  krTitle: { fontSize: 13, fontWeight: '600', marginBottom: 10 },
  krRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  krLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  krDot: { width: 8, height: 8, borderRadius: 4 },
  krName: { fontSize: 12 },
  krRight: { alignItems: 'flex-end', width: 100 },
  krProgress: { fontSize: 11, marginBottom: 4 },
  krBar: { width: 80, height: 4, borderRadius: 2 },
  krBarFill: { height: 4, borderRadius: 2 },
  achievementsSection: { marginHorizontal: 16, marginBottom: 30, padding: 16, borderRadius: 16 },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 14 },
  achievementsGrid: { flexDirection: 'row', gap: 10 },
  achievementCard: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 12 },
  achievementIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  achievementTitle: { fontSize: 13, fontWeight: '600', textAlign: 'center', marginBottom: 4 },
  achievementDesc: { fontSize: 10, textAlign: 'center' },
});
