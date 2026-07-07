/**
 * =============================================================================
 * EDUCATION TAB - MAIN ENTRY POINT
 * =============================================================================
 *
 * Main navigation hub for the Education AI Operating System.
 * Provides access to all education intelligence features and AI agents.
 *
 * @version 1.0.0
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import {
  GraduationCap,
  Brain,
  Users,
  BookOpen,
  BarChart3,
  Award,
  Target,
  TrendingUp,
  ChevronRight,
  Zap,
  Globe,
  Activity,
  Settings,
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

// Main Navigation Items
const NAVIGATION_ITEMS = [
  {
    id: 'executive',
    title: 'Executive Dashboard',
    description: 'Chief Education Officer Command Center',
    icon: GraduationCap,
    color: THEME.neonCyan,
    route: '/ai-agent/education/chief-education-officer-command-center',
    stats: { label: 'KPIs', value: '25+' },
  },
  {
    id: 'agents',
    title: 'AI Education Agents',
    description: '6 Autonomous Intelligence Agents',
    icon: Brain,
    color: THEME.electricBlue,
    route: '/ai-agent/education/ai-education-agents',
    stats: { label: 'Agents', value: '6' },
  },
  {
    id: 'students',
    title: 'Student Intelligence',
    description: 'Learning Progress & Risk Assessment',
    icon: Users,
    color: THEME.emeraldGreen,
    route: '/ai-agent/education/student-intelligence-hub',
    stats: { label: 'Students', value: '1.8M' },
  },
  {
    id: 'analytics',
    title: 'Learning Analytics',
    description: 'Course Engagement & Content Performance',
    icon: BarChart3,
    color: THEME.purple,
    route: '/ai-agent/education/learning-analytics-command-center',
    stats: { label: 'Metrics', value: '50+' },
  },
  {
    id: 'tutors',
    title: 'AI Tutor Center',
    description: 'Personalized Learning & Tutoring Sessions',
    icon: BookOpen,
    color: THEME.amber,
    route: '/ai-agent/education/ai-tutor-center',
    stats: { label: 'Sessions', value: '12.5M' },
  },
  {
    id: 'curriculum',
    title: 'Curriculum & Courses',
    description: 'Course Management & Learning Outcomes',
    icon: Target,
    color: THEME.red,
    route: '/ai-agent/education/curriculum-course-command-center',
    stats: { label: 'Courses', value: '1.2K' },
  },
  {
    id: 'assessments',
    title: 'Assessment Intelligence',
    description: 'Exams, Assignments & Certification',
    icon: Award,
    color: THEME.magenta,
    route: '/ai-agent/education/assessment-intelligence-hub',
    stats: { label: 'Tests', value: '890K' },
  },
  {
    id: 'faculty',
    title: 'Faculty Operations',
    description: 'Teaching Performance & Research Output',
    icon: TrendingUp,
    color: THEME.neonCyan,
    route: '/ai-agent/education/faculty-operations-center',
    stats: { label: 'Faculty', value: '42K' },
  },
  {
    id: 'admissions',
    title: 'Admissions',
    description: 'Applications, Enrollment & Recruitment',
    icon: Users,
    color: THEME.electricBlue,
    route: '/ai-agent/education/admissions-command-center',
    stats: { label: 'Apps', value: '2.4M' },
  },
  {
    id: 'career',
    title: 'Career Services',
    description: 'Job Placements & Internship Opportunities',
    icon: Award,
    color: THEME.emeraldGreen,
    route: '/ai-agent/education/career-success-hub',
    stats: { label: 'Placements', value: '425K' },
  },
  {
    id: 'research',
    title: 'Research Hub',
    description: 'Publications, Funding & Collaboration',
    icon: Brain,
    color: THEME.purple,
    route: '/ai-agent/education/research-innovation-center',
    stats: { label: 'Papers', value: '45K' },
  },
  {
    id: 'insights',
    title: 'AI Insights',
    description: 'AI-Generated Recommendations',
    icon: Zap,
    color: THEME.amber,
    route: '/ai-agent/education/ai-insights-center',
    stats: { label: 'Insights', value: '156K' },
  },
  {
    id: 'activity',
    title: 'Activity Feed',
    description: 'Real-Time Academic Events',
    icon: Activity,
    color: THEME.red,
    route: '/ai-agent/education/real-time-education-activity-feed',
    stats: { label: 'Events', value: 'Live' },
  },
  {
    id: 'global',
    title: 'Global Operations',
    description: 'Campus Locations & Regional Performance',
    icon: Globe,
    color: THEME.magenta,
    route: '/ai-agent/education/global-education-operations',
    stats: { label: 'Campuses', value: '247' },
  },
  {
    id: 'system',
    title: 'System Health',
    description: 'Infrastructure & AI Agent Monitoring',
    icon: Settings,
    color: THEME.neonCyan,
    route: '/ai-agent/education/system-health-ai-infrastructure',
    stats: { label: 'Uptime', value: '99.9%' },
  },
];

// Quick Stats
const QUICK_STATS = [
  { label: 'Total Students', value: '1.8M', color: THEME.neonCyan },
  { label: 'Active Courses', value: '1,247', color: THEME.electricBlue },
  { label: 'AI Tutor Sessions', value: '12.5M', color: THEME.emeraldGreen },
  { label: 'Faculty Members', value: '42K', color: THEME.purple },
];

export default function EducationTab() {
  const router = useRouter();

  const renderNavCard = (item: typeof NAVIGATION_ITEMS[0], index: number) => {
    const Icon = item.icon;

    return (
      <Animated.View entering={FadeInUp.delay(index * 50).springify()} key={item.id}>
        <TouchableOpacity
          onPress={() => router.push(item.route as any)}
          style={[styles.navCard, { borderColor: item.color + '30' }]}
        >
          <View style={[styles.navIcon, { backgroundColor: item.color + '20' }]}>
            <Icon size={24} color={item.color} />
          </View>
          <View style={styles.navContent}>
            <Text style={styles.navTitle}>{item.title}</Text>
            <Text style={styles.navDescription}>{item.description}</Text>
          </View>
          <View style={styles.navStats}>
            <Text style={styles.navStatsLabel}>{item.stats.label}</Text>
            <Text style={[styles.navStatsValue, { color: item.color }]}>{item.stats.value}</Text>
          </View>
          <ChevronRight size={20} color={THEME.textMuted} style={styles.navArrow} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderQuickStat = (stat: typeof QUICK_STATS[0], index: number) => (
    <Animated.View entering={FadeInUp.delay(index * 100).springify()} key={index} style={styles.quickStatCard}>
      <BlurView intensity={20} tint="dark" style={[styles.quickStatBlur, { borderColor: stat.color + '30' }]}>
        <Text style={[styles.quickStatValue, { color: stat.color }]}>{stat.value}</Text>
        <Text style={styles.quickStatLabel}>{stat.label}</Text>
      </BlurView>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTitle}>
            <GraduationCap size={32} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Education AI OS</Text>
          </View>
          <Text style={styles.headerSubtitle}>Autonomous Learning Intelligence Platform</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Overview</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickStatsScroll}>
            <View style={styles.quickStatsContainer}>
              {QUICK_STATS.map((stat, index) => renderQuickStat(stat, index))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Executive Dashboard */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/education/chief-education-officer-command-center' as any)}
            style={styles.executiveCard}
          >
            <BlurView intensity={30} tint="dark" style={styles.executiveBlur}>
              <View style={styles.executiveHeader}>
                <View style={[styles.executiveIcon, { backgroundColor: THEME.neonCyan + '20' }]}>
                  <GraduationCap size={32} color={THEME.neonCyan} />
                </View>
                <View style={styles.executiveTitle}>
                  <Text style={styles.executiveTitleText}>Executive Dashboard</Text>
                  <Text style={styles.executiveSubtitle}>Chief Education Officer Command Center</Text>
                </View>
                <ChevronRight size={24} color={THEME.neonCyan} />
              </View>
              <View style={styles.executiveStats}>
                <View style={styles.executiveStat}>
                  <Text style={styles.executiveStatValue}>1.8M</Text>
                  <Text style={styles.executiveStatLabel}>Students</Text>
                </View>
                <View style={styles.executiveStat}>
                  <Text style={styles.executiveStatValue}>91%</Text>
                  <Text style={styles.executiveStatLabel}>Completion</Text>
                </View>
                <View style={styles.executiveStat}>
                  <Text style={styles.executiveStatValue}>88%</Text>
                  <Text style={styles.executiveStatLabel}>Graduation</Text>
                </View>
                <View style={styles.executiveStat}>
                  <Text style={styles.executiveStatValue}>94%</Text>
                  <Text style={styles.executiveStatLabel}>Satisfaction</Text>
                </View>
              </View>
            </BlurView>
          </TouchableOpacity>
        </Animated.View>

        {/* AI Education Agents */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/education/ai-education-agents' as any)}
            style={styles.agentsCard}
          >
            <BlurView intensity={30} tint="dark" style={styles.agentsBlur}>
              <View style={styles.agentsHeader}>
                <View style={[styles.agentsIcon, { backgroundColor: THEME.electricBlue + '20' }]}>
                  <Brain size={32} color={THEME.electricBlue} />
                </View>
                <View style={styles.agentsTitle}>
                  <Text style={styles.agentsTitleText}>AI Education Agents</Text>
                  <Text style={styles.agentsSubtitle}>6 Autonomous Intelligence Agents</Text>
                </View>
                <ChevronRight size={24} color={THEME.electricBlue} />
              </View>
              <View style={styles.agentsList}>
                <View style={styles.agentBadge}>
                  <GraduationCap size={16} color={THEME.neonCyan} />
                  <Text style={styles.agentBadgeText}>Scholar</Text>
                </View>
                <View style={styles.agentBadge}>
                  <BookOpen size={16} color={THEME.electricBlue} />
                  <Text style={styles.agentBadgeText}>Mentor</Text>
                </View>
                <View style={styles.agentBadge}>
                  <Target size={16} color={THEME.emeraldGreen} />
                  <Text style={styles.agentBadgeText}>Compass</Text>
                </View>
                <View style={styles.agentBadge}>
                  <BarChart3 size={16} color={THEME.purple} />
                  <Text style={styles.agentBadgeText}>Insight</Text>
                </View>
                <View style={styles.agentBadge}>
                  <Award size={16} color={THEME.amber} />
                  <Text style={styles.agentBadgeText}>Career</Text>
                </View>
                <View style={styles.agentBadge}>
                  <Brain size={16} color={THEME.magenta} />
                  <Text style={styles.agentBadgeText}>Researcher</Text>
                </View>
              </View>
            </BlurView>
          </TouchableOpacity>
        </Animated.View>

        {/* Navigation Grid */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <Text style={styles.sectionTitle}>Education Intelligence</Text>
          <View style={styles.navGrid}>
            {NAVIGATION_ITEMS.slice(2).map((item, index) => renderNavCard(item, index))}
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
  },
  headerContent: {
    gap: 4,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: THEME.text,
  },
  headerSubtitle: {
    fontSize: 13,
    color: THEME.textMuted,
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.text,
    marginBottom: 16,
  },
  quickStatsScroll: {
    marginBottom: 0,
  },
  quickStatsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  quickStatCard: {
    marginRight: 12,
  },
  quickStatBlur: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minWidth: 120,
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 11,
    color: THEME.textMuted,
  },
  executiveCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  executiveBlur: {
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.neonCyan + '30',
  },
  executiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  executiveIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  executiveTitle: {
    flex: 1,
  },
  executiveTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.text,
    marginBottom: 4,
  },
  executiveSubtitle: {
    fontSize: 13,
    color: THEME.textMuted,
  },
  executiveStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  executiveStat: {
    alignItems: 'center',
  },
  executiveStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.neonCyan,
    marginBottom: 4,
  },
  executiveStatLabel: {
    fontSize: 11,
    color: THEME.textMuted,
  },
  agentsCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  agentsBlur: {
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.electricBlue + '30',
  },
  agentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  agentsIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  agentsTitle: {
    flex: 1,
  },
  agentsTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.text,
    marginBottom: 4,
  },
  agentsSubtitle: {
    fontSize: 13,
    color: THEME.textMuted,
  },
  agentsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  agentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: THEME.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  agentBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.text,
  },
  navGrid: {
    gap: 12,
  },
  navCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  navIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  navContent: {
    flex: 1,
  },
  navTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 4,
  },
  navDescription: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  navStats: {
    alignItems: 'center',
    marginRight: 16,
  },
  navStatsLabel: {
    fontSize: 10,
    color: THEME.textMuted,
    marginBottom: 2,
  },
  navStatsValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  navArrow: {
    marginLeft: 8,
  },
});
