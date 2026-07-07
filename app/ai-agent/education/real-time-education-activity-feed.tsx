/**
 * =============================================================================
 * REAL-TIME EDUCATION ACTIVITY FEED
 * =============================================================================
 *
 * A real-time activity feed that displays live educational events, student
 * activities, faculty actions, system notifications, and engagement metrics with
 * AI-powered filtering and insights.
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
  Activity,
  TrendingUp,
  Clock,
  Target,
  Award,
  Users,
  BookOpen,
  GraduationCap,
  Briefcase,
  FileText,
  CheckCircle,
  AlertCircle,
  Zap,
  Flame,
  Shield,
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

// Activity Types
const ACTIVITY_TYPES = [
  { name: 'All', count: 1247, color: THEME.neonCyan },
  { name: 'Enrollment', count: 245, color: THEME.electricBlue },
  { name: 'Learning', count: 521, color: THEME.emeraldGreen },
  { name: 'Assessment', count: 189, color: THEME.purple },
  { name: 'Career', count: 156, color: THEME.amber },
  { name: 'System', count: 136, color: THEME.red },
];

// Real-Time Activities
const REAL_TIME_ACTIVITIES = [
  { id: 1, event: 'Student enrolled in Data Science', user: 'Sarah Johnson', time: 'Just now', type: 'enrollment', icon: Users },
  { id: 2, event: 'Course completed: Machine Learning', user: 'Michael Chen', time: '2 min ago', type: 'learning', icon: CheckCircle },
  { id: 3, event: 'Exam submitted: Statistics Final', user: 'Emily Rodriguez', time: '5 min ago', type: 'assessment', icon: FileText },
  { id: 4, event: 'AI tutoring session started', user: 'David Kim', time: '8 min ago', type: 'learning', icon: Zap },
  { id: 5, event: 'Scholarship awarded', user: 'Jessica Taylor', time: '12 min ago', type: 'enrollment', icon: Award },
  { id: 6, event: 'Faculty published research', user: 'Dr. Sarah Chen', time: '15 min ago', type: 'learning', icon: BookOpen },
  { id: 7, event: 'Internship secured at Google', user: 'James Wilson', time: '18 min ago', type: 'career', icon: Briefcase },
  { id: 8, event: 'Certification achieved: AWS ML', user: 'Lisa Anderson', time: '22 min ago', type: 'assessment', icon: GraduationCap },
  { id: 9, event: 'Course progress milestone', user: 'Robert Martinez', time: '25 min ago', type: 'learning', icon: Flame },
  { id: 10, event: 'System maintenance scheduled', user: 'System', time: '30 min ago', type: 'system', icon: AlertCircle },
  { id: 11, event: 'New student orientation', user: 'Amanda Brown', time: '35 min ago', type: 'enrollment', icon: Users },
  { id: 12, event: 'Assignment submitted: Project 3', user: 'Kevin Lee', time: '40 min ago', type: 'assessment', icon: FileText },
];

// Engagement Metrics
const ENGAGEMENT_METRICS = {
  hourlyActivity: 847,
  dailyActive: '12.4K',
  weeklyTrend: 18,
  peakHours: '2PM-6PM',
};

export default function RealTimeEducationActivityFeed() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [currentTime, setCurrentTime] = useState('');
  const [selectedType, setSelectedType] = useState('All');

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

  const renderTypeCard = (type: typeof ACTIVITY_TYPES[0]) => (
    <TouchableOpacity
      key={type.name}
      style={[styles.typeCard, selectedType === type.name && styles.typeCardSelected]}
      onPress={() => setSelectedType(type.name)}
    >
      <Text style={[styles.typeName, selectedType === type.name && styles.typeNameSelected]}>{type.name}</Text>
      <Text style={[styles.typeCount, { color: type.color }]}>{type.count}</Text>
    </TouchableOpacity>
  );

  const renderActivityItem = (activity: typeof REAL_TIME_ACTIVITIES[0]) => {
    const typeColors = {
      enrollment: THEME.electricBlue,
      learning: THEME.emeraldGreen,
      assessment: THEME.purple,
      career: THEME.amber,
      system: THEME.red,
    };
    const color = typeColors[activity.type as keyof typeof typeColors];
    const Icon = activity.icon;

    return (
      <Animated.View entering={FadeInUp.springify()} style={styles.activityItem}>
        <BlurView intensity={20} tint="dark" style={styles.activityCard}>
          <View style={[styles.activityIcon, { backgroundColor: color + '20' }]}>
            <Icon size={20} color={color} />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityEvent}>{activity.event}</Text>
            <View style={styles.activityMeta}>
              <Text style={styles.activityUser}>{activity.user}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          </View>
          <View style={[styles.activityDot, { backgroundColor: color }]} />
        </BlurView>
      </Animated.View>
    );
  };

  const renderMetricCard = (title: string, value: string, color: string) => (
    <BlurView intensity={20} tint="dark" style={styles.metricCard}>
      <Text style={styles.metricLabel}>{title}</Text>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
    </BlurView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={THEME.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerTitle}>
            <Activity size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Real-Time Education Activity Feed</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Activity Types */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Activity Types</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typesScroll}>
            <View style={styles.typesContainer}>
              {ACTIVITY_TYPES.map((type) => renderTypeCard(type))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Engagement Metrics */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Engagement Metrics</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.metricsCard}>
            <View style={styles.metricsGrid}>
              {renderMetricCard('Hourly Activity', ENGAGEMENT_METRICS.hourlyActivity.toString(), THEME.neonCyan)}
              {renderMetricCard('Daily Active', ENGAGEMENT_METRICS.dailyActive, THEME.electricBlue)}
              {renderMetricCard('Weekly Trend', `${ENGAGEMENT_METRICS.weeklyTrend}%`, THEME.emeraldGreen)}
              {renderMetricCard('Peak Hours', ENGAGEMENT_METRICS.peakHours, THEME.purple)}
            </View>
          </BlurView>
        </Animated.View>

        {/* Real-Time Activities */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Live Activity Feed</Text>
          </View>
          <View style={styles.activitiesContainer}>
            {REAL_TIME_ACTIVITIES.map((activity) => renderActivityItem(activity))}
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
  typesScroll: {
    marginBottom: 0,
  },
  typesContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  typeCard: {
    width: 100,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
    backgroundColor: THEME.card,
  },
  typeCardSelected: {
    borderColor: THEME.neonCyan,
    backgroundColor: THEME.neonCyan + '10',
  },
  typeName: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  typeNameSelected: {
    color: THEME.neonCyan,
    fontWeight: '600',
  },
  typeCount: {
    fontSize: 20,
    fontWeight: '700',
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
  metricCard: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  metricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  activitiesContainer: {
    gap: 12,
  },
  activityItem: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityEvent: {
    fontSize: 14,
    fontWeight: '500',
    color: THEME.text,
    marginBottom: 4,
  },
  activityMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityUser: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  activityTime: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
