import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ChevronLeft, 
  TrendingUp, 
  Target, 
  Award, 
  Clock,
  Zap,
  ChartBarBig,
  Calendar,
  ChevronDown,
  Share2,
  Download
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface MetricPeriod {
  label: string;
  value: string;
  change: number;
  data: number[];
}

export default function PerformanceTrackingPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const { agentId, agentName } = useLocalSearchParams<{ agentId: string; agentName: string }>();
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'quarter'>('week');
  const [showDropdown, setShowDropdown] = useState(false);

  const periods = [
    { key: 'day', label: 'Today' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'quarter', label: 'This Quarter' },
  ];

  const mainMetrics = [
    { 
      label: 'Tasks Completed', 
      value: '1,247', 
      change: +12.5, 
      icon: Target,
      color: '#34C759',
      target: '1,500'
    },
    { 
      label: 'Avg Response Time', 
      value: '0.8s', 
      change: -15.2, 
      icon: Clock,
      color: '#007AFF',
      target: '< 1.0s'
    },
    { 
      label: 'Accuracy Rate', 
      value: '97.8%', 
      change: +2.3, 
      icon: Award,
      color: '#FF9500',
      target: '95%'
    },
    { 
      label: 'Efficiency Score', 
      value: '94/100', 
      change: +5.1, 
      icon: Zap,
      color: '#AF52DE',
      target: '90/100'
    },
  ];

  const performanceGoals = [
    { name: 'Task Completion Rate', current: 94, target: 95, unit: '%' },
    { name: 'Customer Satisfaction', current: 4.8, target: 4.5, unit: '/5' },
    { name: 'First Contact Resolution', current: 87, target: 85, unit: '%' },
    { name: 'Knowledge Base Updates', current: 45, target: 50, unit: '/month' },
  ];

  const achievements = [
    { title: 'Speed Demon', desc: 'Response time under 1s for 1000 queries', earned: '2 days ago', icon: Zap },
    { title: 'Accuracy Master', desc: 'Maintained 98%+ accuracy for 7 days', earned: '1 week ago', icon: Award },
    { title: 'Task Champion', desc: 'Completed 1000+ tasks in a month', earned: '2 weeks ago', icon: Target },
  ];

  const weeklyActivity = [
    { day: 'Mon', tasks: 180, hours: 8.5 },
    { day: 'Tue', tasks: 220, hours: 9.0 },
    { day: 'Wed', tasks: 195, hours: 8.0 },
    { day: 'Thu', tasks: 245, hours: 9.5 },
    { day: 'Fri', tasks: 210, hours: 8.0 },
    { day: 'Sat', tasks: 120, hours: 5.0 },
    { day: 'Sun', tasks: 87, hours: 4.0 },
  ];

  const maxTasks = Math.max(...weeklyActivity.map(d => d.tasks));

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Performance Tracking</Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
            {agentName || 'AI Agent'} Metrics
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Share2 size={20} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Download size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Period Selector */}
      <View style={styles.periodContainer}>
        <TouchableOpacity 
          style={[styles.periodSelector, { backgroundColor: theme.colors.card || '#F2F2F7' }]}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Calendar size={18} color={theme.colors.primary} />
          <Text style={[styles.periodText, { color: theme.colors.text }]}>
            {periods.find(p => p.key === selectedPeriod)?.label}
          </Text>
          <ChevronDown size={18} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        {showDropdown && (
          <View style={[styles.dropdown, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            {periods.map(period => (
              <TouchableOpacity
                key={period.key}
                style={[styles.dropdownItem, selectedPeriod === period.key && { backgroundColor: theme.colors.primary + '15' }]}
                onPress={() => { setSelectedPeriod(period.key as any); setShowDropdown(false); }}
              >
                <Text style={[styles.dropdownText, { color: theme.colors.text }]}>{period.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Main Metrics */}
      <View style={styles.metricsGrid}>
        {mainMetrics.map((metric, index) => (
          <View key={index} style={[styles.metricCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <View style={styles.metricHeader}>
              <View style={[styles.metricIcon, { backgroundColor: metric.color + '15' }]}>
                <metric.icon size={20} color={metric.color} />
              </View>
              <View style={[styles.changeBadge, { backgroundColor: metric.change >= 0 ? '#34C75915' : '#FF3B3015' }]}>
                <TrendingUp 
                  size={12} 
                  color={metric.change >= 0 ? '#34C759' : '#FF3B30'} 
                  style={{ transform: [{ rotate: metric.change < 0 ? '180deg' : '0deg' }] }}
                />
                <Text style={[styles.changeText, { color: metric.change >= 0 ? '#34C759' : '#FF3B30' }]}>
                  {Math.abs(metric.change)}%
                </Text>
              </View>
            </View>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{metric.label}</Text>
            <View style={styles.targetRow}>
              <Target size={12} color={theme.colors.textSecondary} />
              <Text style={[styles.targetText, { color: theme.colors.textSecondary }]}>Target: {metric.target}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Weekly Activity Chart */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Weekly Activity</Text>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: theme.colors.primary }]} />
              <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>Tasks</Text>
            </View>
          </View>
        </View>
        <View style={styles.chartContainer}>
          {weeklyActivity.map((day, index) => (
            <View key={index} style={styles.barColumn}>
              <View style={styles.barWrapper}>
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: `${(day.tasks / maxTasks) * 100}%`,
                      backgroundColor: theme.colors.primary 
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.barLabel, { color: theme.colors.textSecondary }]}>{day.day}</Text>
              <Text style={[styles.barValue, { color: theme.colors.text }]}>{day.tasks}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Performance Goals */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Goals</Text>
        {performanceGoals.map((goal, index) => (
          <View key={index} style={styles.goalRow}>
            <View style={styles.goalInfo}>
              <Text style={[styles.goalName, { color: theme.colors.text }]}>{goal.name}</Text>
              <Text style={[styles.goalValues, { color: theme.colors.textSecondary }]}>
                {goal.current}{goal.unit} / {goal.target}{goal.unit}
              </Text>
            </View>
            <View style={styles.goalProgress}>
              <View style={[styles.goalBar, { backgroundColor: theme.colors.background }]}>
                <View 
                  style={[
                    styles.goalFill, 
                    { 
                      width: `${Math.min((goal.current / goal.target) * 100, 100)}%`,
                      backgroundColor: goal.current >= goal.target ? '#34C759' : theme.colors.primary 
                    }
                  ]} 
                />
              </View>
              {goal.current >= goal.target && (
                <View style={styles.achievedBadge}>
                  <Award size={12} color="#34C759" />
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* Achievements */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Achievements</Text>
        {achievements.map((achievement, index) => (
          <View key={index} style={styles.achievementCard}>
            <View style={[styles.achievementIcon, { backgroundColor: '#FFD70020' }]}>
              <achievement.icon size={24} color="#FFD700" />
            </View>
            <View style={styles.achievementContent}>
              <Text style={[styles.achievementTitle, { color: theme.colors.text }]}>{achievement.title}</Text>
              <Text style={[styles.achievementDesc, { color: theme.colors.textSecondary }]}>{achievement.desc}</Text>
              <Text style={[styles.achievementTime, { color: theme.colors.textSecondary }]}>{achievement.earned}</Text>
            </View>
          </View>
        ))}
      </View>
    
      <AgentFeatures agentId="performance-tracking" agentName="Performance Tracking" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#E5E5EA' 
  },
  backButton: { padding: 4 },
  headerContent: { flex: 1, marginLeft: 12 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  headerActions: { flexDirection: 'row', gap: 8 },
  iconButton: { padding: 8 },
  periodContainer: { padding: 16, position: 'relative', zIndex: 10 },
  periodSelector: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 12, 
    borderRadius: 12,
    gap: 8
  },
  periodText: { flex: 1, fontSize: 15, fontWeight: '500' },
  dropdown: { 
    position: 'absolute', 
    top: 60, 
    left: 16, 
    right: 16, 
    borderRadius: 12, 
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  dropdownItem: { 
    padding: 12, 
    borderRadius: 8 
  },
  dropdownText: { fontSize: 15 },
  metricsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    padding: 16, 
    gap: 12 
  },
  metricCard: { 
    flex: 1, 
    minWidth: '45%', 
    padding: 16, 
    borderRadius: 12 
  },
  metricHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  metricIcon: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  changeBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 12, 
    gap: 4 
  },
  changeText: { fontSize: 12, fontWeight: '600' },
  metricValue: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  metricLabel: { fontSize: 13, marginBottom: 8 },
  targetRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  targetText: { fontSize: 11 },
  section: { margin: 16, padding: 16, borderRadius: 16 },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  legend: { flexDirection: 'row', gap: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12 },
  chartContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    height: 150, 
    alignItems: 'flex-end' 
  },
  barColumn: { flex: 1, alignItems: 'center' },
  barWrapper: { 
    width: 24, 
    height: 100, 
    justifyContent: 'flex-end', 
    backgroundColor: '#E5E5EA30', 
    borderRadius: 4 
  },
  bar: { width: '100%', borderRadius: 4 },
  barLabel: { fontSize: 11, marginTop: 8 },
  barValue: { fontSize: 10, fontWeight: '600', marginTop: 2 },
  goalRow: { marginBottom: 16 },
  goalInfo: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 8 
  },
  goalName: { fontSize: 14, fontWeight: '500' },
  goalValues: { fontSize: 13 },
  goalProgress: { flexDirection: 'row', alignItems: 'center' },
  goalBar: { 
    flex: 1, 
    height: 8, 
    borderRadius: 4 
  },
  goalFill: { 
    height: '100%', 
    borderRadius: 4 
  },
  achievedBadge: { marginLeft: 8 },
  achievementCard: { 
    flexDirection: 'row', 
    marginBottom: 12, 
    padding: 12, 
    backgroundColor: '#F2F2F7', 
    borderRadius: 12 
  },
  achievementIcon: { 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  },
  achievementContent: { flex: 1 },
  achievementTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  achievementDesc: { fontSize: 13, marginBottom: 4 },
  achievementTime: { fontSize: 11 },
});
