/**
 * =============================================================================
 * WORKFORCE MANAGEMENT HUB
 * =============================================================================
 *
 * A comprehensive workforce management dashboard that monitors employee
 * performance, scheduling efficiency, labor costs, training progress, and
 * workforce productivity across the retail organization.
 *
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import {
  ChevronLeft,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Target,
  Activity,
  Zap,
  Clock,
  DollarSign,
  Award,
  GraduationCap,
  AlertTriangle,
  CheckCircle,
  Calendar,
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Theme Colors
const THEME = {
  background: '#03050A',
  card: '#0A0F1E',
  cardLight: '#121829',
  neonCyan: '#00F0FF',
  electricBlue: '#3B82F6',
  emeraldGreen: '#10B981',
  purple: '#8B5CF6',
  amber: '#F59E0B',
  red: '#EF4444',
  magenta: '#EC4899',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  border: '#1E293B',
};

// Workforce Metrics
const WORKFORCE_METRICS = {
  totalEmployees: '285K',
  avgProductivity: 92,
  schedulingEfficiency: 87,
  laborCosts: '$4.2B',
  trainingCompletion: 78,
  employeeSatisfaction: 88,
};

// Department Performance
const DEPARTMENT_PERFORMANCE = [
  { department: 'Store Operations', employees: '245K', productivity: 94, satisfaction: 89, retention: 92 },
  { department: 'Warehouse & Logistics', employees: '28K', productivity: 89, satisfaction: 84, retention: 87 },
  { department: 'Corporate & Admin', employees: '8K', productivity: 91, satisfaction: 92, retention: 95 },
  { department: 'Customer Service', employees: '4K', productivity: 88, satisfaction: 86, retention: 84 },
];

// Scheduling Overview
const SCHEDULING_OVERVIEW = [
  { day: 'Monday', scheduled: '98%', actual: '96%', gap: '-2%', status: 'optimal' },
  { day: 'Tuesday', scheduled: '97%', actual: '95%', gap: '-2%', status: 'optimal' },
  { day: 'Wednesday', scheduled: '96%', actual: '94%', gap: '-2%', status: 'optimal' },
  { day: 'Thursday', scheduled: '98%', actual: '92%', gap: '-6%', status: 'warning' },
  { day: 'Friday', scheduled: '99%', actual: '97%', gap: '-2%', status: 'optimal' },
  { day: 'Saturday', scheduled: '95%', actual: '93%', gap: '-2%', status: 'optimal' },
  { day: 'Sunday', scheduled: '92%', actual: '90%', gap: '-2%', status: 'optimal' },
];

// Training Progress
const TRAINING_PROGRESS = [
  { program: 'Customer Service Excellence', completion: 94, participants: '245K', status: 'completed' },
  { program: 'Sales Techniques', completion: 87, participants: '198K', status: 'in-progress' },
  { program: 'Inventory Management', completion: 76, participants: '28K', status: 'in-progress' },
  { program: 'Leadership Development', completion: 62, participants: '12K', status: 'in-progress' },
  { program: 'Safety Compliance', completion: 98, participants: '285K', status: 'completed' },
];

export default function WorkforceManagementHub() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderTrendIndicator = (change: number, trend: string) => {
    if (trend === 'up') {
      return (
        <View style={styles.trendUp}>
          <ArrowUpRight size={12} color={THEME.emeraldGreen} />
          <Text style={[styles.trendText, { color: THEME.emeraldGreen }]}>{change}%</Text>
        </View>
      );
    } else if (trend === 'down') {
      return (
        <View style={styles.trendDown}>
          <ArrowDownRight size={12} color={THEME.red} />
          <Text style={[styles.trendText, { color: THEME.red }]}>{change}%</Text>
        </View>
      );
    }
    return null;
  };

  const renderDepartmentCard = (dept: typeof DEPARTMENT_PERFORMANCE[0]) => (
    <BlurView key={dept.department} intensity={20} tint="dark" style={styles.deptCard}>
      <Text style={styles.deptName}>{dept.department}</Text>
      <View style={styles.deptMetrics}>
        <View style={styles.deptMetric}>
          <Text style={styles.deptMetricLabel}>Employees</Text>
          <Text style={[styles.deptMetricValue, { color: THEME.neonCyan }]}>{dept.employees}</Text>
        </View>
        <View style={styles.deptMetric}>
          <Text style={styles.deptMetricLabel}>Productivity</Text>
          <Text style={[styles.deptMetricValue, { color: THEME.emeraldGreen }]}>{dept.productivity}%</Text>
        </View>
        <View style={styles.deptMetric}>
          <Text style={styles.deptMetricLabel}>Satisfaction</Text>
          <Text style={[styles.deptMetricValue, { color: THEME.electricBlue }]}>{dept.satisfaction}%</Text>
        </View>
        <View style={styles.deptMetric}>
          <Text style={styles.deptMetricLabel}>Retention</Text>
          <Text style={[styles.deptMetricValue, { color: THEME.purple }]}>{dept.retention}%</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderScheduleCard = (schedule: typeof SCHEDULING_OVERVIEW[0]) => {
    const statusColors = {
      optimal: THEME.emeraldGreen,
      warning: THEME.amber,
      critical: THEME.red,
    };
    const color = statusColors[schedule.status as keyof typeof statusColors];

    return (
      <BlurView key={schedule.day} intensity={20} tint="dark" style={styles.scheduleCard}>
        <Text style={styles.scheduleDay}>{schedule.day}</Text>
        <View style={styles.scheduleMetrics}>
          <View style={styles.scheduleMetric}>
            <Text style={styles.scheduleMetricLabel}>Scheduled</Text>
            <Text style={[styles.scheduleMetricValue, { color: THEME.neonCyan }]}>{schedule.scheduled}</Text>
          </View>
          <View style={styles.scheduleMetric}>
            <Text style={styles.scheduleMetricLabel}>Actual</Text>
            <Text style={[styles.scheduleMetricValue, { color: color }]}>{schedule.actual}</Text>
          </View>
        </View>
        <View style={[styles.scheduleGap, { backgroundColor: color + '20' }]}>
          <Text style={[styles.scheduleGapText, { color }]}>{schedule.gap}</Text>
        </View>
      </BlurView>
    );
  };

  const renderTrainingCard = (training: typeof TRAINING_PROGRESS[0]) => {
    const statusColors = {
      completed: THEME.emeraldGreen,
      'in-progress': THEME.electricBlue,
      pending: THEME.amber,
    };
    const color = statusColors[training.status as keyof typeof statusColors];

    return (
      <BlurView key={training.program} intensity={20} tint="dark" style={styles.trainingCard}>
        <View style={styles.trainingHeader}>
          <GraduationCap size={16} color={THEME.purple} />
          <Text style={styles.trainingProgram}>{training.program}</Text>
        </View>
        <View style={styles.trainingMetrics}>
          <View style={styles.trainingMetric}>
            <Text style={styles.trainingMetricLabel}>Completion</Text>
            <Text style={[styles.trainingMetricValue, { color }]}>{training.completion}%</Text>
          </View>
          <View style={styles.trainingMetric}>
            <Text style={styles.trainingMetricLabel}>Participants</Text>
            <Text style={[styles.trainingMetricValue, { color: THEME.neonCyan }]}>{training.participants}</Text>
          </View>
        </View>
        <View style={[styles.trainingStatus, { backgroundColor: color + '20' }]}>
          <Text style={[styles.trainingStatusText, { color }]}>{training.status.toUpperCase()}</Text>
        </View>
      </BlurView>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={THEME.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerTitle}>
            <Users size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Workforce Management Hub</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Workforce Metrics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Workforce Metrics</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.metricsCard}>
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Users size={20} color={THEME.neonCyan} />
                <Text style={styles.metricLabel}>Total Employees</Text>
                <Text style={[styles.metricValue, { color: THEME.neonCyan }]}>{WORKFORCE_METRICS.totalEmployees}</Text>
              </View>
              <View style={styles.metricItem}>
                <Target size={20} color={THEME.electricBlue} />
                <Text style={styles.metricLabel}>Avg Productivity</Text>
                <Text style={[styles.metricValue, { color: THEME.electricBlue }]}>{WORKFORCE_METRICS.avgProductivity}%</Text>
              </View>
              <View style={styles.metricItem}>
                <Calendar size={20} color={THEME.emeraldGreen} />
                <Text style={styles.metricLabel}>Scheduling Efficiency</Text>
                <Text style={[styles.metricValue, { color: THEME.emeraldGreen }]}>{WORKFORCE_METRICS.schedulingEfficiency}%</Text>
              </View>
              <View style={styles.metricItem}>
                <DollarSign size={20} color={THEME.purple} />
                <Text style={styles.metricLabel}>Labor Costs</Text>
                <Text style={[styles.metricValue, { color: THEME.purple }]}>{WORKFORCE_METRICS.laborCosts}</Text>
              </View>
              <View style={styles.metricItem}>
                <GraduationCap size={20} color={THEME.amber} />
                <Text style={styles.metricLabel}>Training Completion</Text>
                <Text style={[styles.metricValue, { color: THEME.amber }]}>{WORKFORCE_METRICS.trainingCompletion}%</Text>
              </View>
              <View style={styles.metricItem}>
                <Activity size={20} color={THEME.magenta} />
                <Text style={styles.metricLabel}>Employee Satisfaction</Text>
                <Text style={[styles.metricValue, { color: THEME.magenta }]}>{WORKFORCE_METRICS.employeeSatisfaction}%</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Department Performance */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Award size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Department Performance</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.deptsScroll}>
            <View style={styles.deptsContainer}>
              {DEPARTMENT_PERFORMANCE.map((dept) => renderDepartmentCard(dept))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Scheduling Overview */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calendar size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Weekly Scheduling Overview</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scheduleScroll}>
            <View style={styles.scheduleContainer}>
              {SCHEDULING_OVERVIEW.map((schedule) => renderScheduleCard(schedule))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Training Progress */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <GraduationCap size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Training Progress</Text>
          </View>
          <View style={styles.trainingContainer}>
            {TRAINING_PROGRESS.map((training) => renderTrainingCard(training))}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.text,
  },
  timeText: {
    fontSize: 12,
    color: THEME.textMuted,
    marginTop: 4,
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.text,
  },
  metricsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricItem: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginTop: 8,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  deptsScroll: {
    marginBottom: 0,
  },
  deptsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  deptCard: {
    width: 180,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  deptName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  deptMetrics: {
    gap: 8,
  },
  deptMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deptMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  deptMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  scheduleScroll: {
    marginBottom: 0,
  },
  scheduleContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  scheduleCard: {
    width: 140,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  scheduleDay: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  scheduleMetrics: {
    gap: 8,
    marginBottom: 12,
  },
  scheduleMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scheduleMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  scheduleMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  scheduleGap: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  scheduleGapText: {
    fontSize: 12,
    fontWeight: '600',
  },
  trainingContainer: {
    gap: 12,
  },
  trainingCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  trainingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  trainingProgram: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  trainingMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  trainingMetric: {
    flex: 1,
  },
  trainingMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  trainingMetricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  trainingStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  trainingStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  trendUp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendDown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
