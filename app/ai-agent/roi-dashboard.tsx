import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Clock,
  Users,
  Award,
  Zap,
  Calendar,
  ChevronDown,
  ChartBar,
  ChartPie,
  Activity,
  Target,
  Sparkles,
  User,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock ROI Data
const ROI_DATA = {
  summary: {
    totalSavings: '$145,230',
    savingsChange: '+23.5%',
    roiPercentage: '287%',
    roiChange: '+45pp',
    hoursSaved: '2,847',
    hoursChange: '+18.2%',
    activeAgents: 24,
    totalAgents: 28,
    grade: 'A+',
  },
  costBreakdown: [
    { category: 'Labor', amount: 52340, percentage: 36, color: '#FF6B6B' },
    { category: 'Time', amount: 38450, percentage: 26, color: '#4ECDC4' },
    { category: 'Efficiency', amount: 28960, percentage: 20, color: '#45B7D1' },
    { category: 'Error Reduction', amount: 15680, percentage: 11, color: '#96CEB4' },
    { category: 'Automation', amount: 9800, percentage: 7, color: '#FFEAA7' },
  ],
  trendData: [
    { month: 'Jan', savings: 8200, costs: 1200 },
    { month: 'Feb', savings: 12400, costs: 1350 },
    { month: 'Mar', savings: 18600, costs: 1400 },
    { month: 'Apr', savings: 22400, costs: 1520 },
    { month: 'May', savings: 28900, costs: 1600 },
    { month: 'Jun', savings: 34200, costs: 1750 },
  ],
  topAgents: [
    { name: 'Sales AI', roi: 456, savings: '$52,340', tasks: 2847 },
    { name: 'Support User', roi: 389, savings: '$38,420', tasks: 4521 },
    { name: 'Data Analyst', roi: 312, savings: '$29,840', tasks: 1234 },
    { name: 'Marketing AI', roi: 298, savings: '$24,630', tasks: 2156 },
  ],
  insights: [
    {
      type: 'success',
      title: 'Outstanding ROI Performance',
      description: 'Your 287% ROI significantly exceeds industry average of 250%',
      icon: Award,
    },
    {
      type: 'opportunity',
      title: 'Untapped Agent Potential',
      description: '4 agents are inactive. Activating them could generate $20K+ additional value',
      icon: Zap,
    },
  ],
  recommendations: [
    {
      priority: 'high',
      title: 'Scale High-Performing Agents',
      description: 'Your top agents are delivering exceptional ROI',
      expectedROI: '+150%',
    },
    {
      priority: 'medium',
      title: 'Optimize Underperformers',
      description: 'Review agent configurations to improve efficiency',
      expectedROI: '+75%',
    },
  ],
};

const PERIODS = ['Day', 'Week', 'Month', 'Quarter', 'Year'];

export default function ROIDashboardScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedPeriod, setSelectedPeriod] = useState('Month');
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

  const colors = {
    background: isDark ? '#0a0a0f' : '#f8f9fa',
    card: isDark ? '#1a1a2e' : '#ffffff',
    text: isDark ? '#ffffff' : '#1a1a2e',
    textSecondary: isDark ? '#a0a0b0' : '#6c757d',
    border: isDark ? '#2a2a3e' : '#e9ecef',
    accent: '#6366f1',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
  };

  const renderMetricCard = (
    title: string,
    value: string,
    change: string,
    icon: React.ComponentType<any>,
    gradient: readonly [string, string],
    delay: number
  ) => (
    <Animated.View
      entering={FadeInUp.delay(delay).duration(600)}
      style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}
    >
      <LinearGradient colors={gradient} style={styles.metricIcon} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <icon size={24} color="#fff" />
      </LinearGradient>
      <View style={styles.metricContent}>
        <Text style={[styles.metricTitle, { color: colors.textSecondary }]}>{title}</Text>
        <Text style={[styles.metricValue, { color: colors.text }]}>{value}</Text>
        <Text style={[styles.metricChange, { color: change.startsWith('+') ? colors.success : colors.danger }]}>
          {change} vs last period
        </Text>
      </View>
    </Animated.View>
  );

  const renderCostBreakdown = () => (
    <Animated.View entering={FadeInUp.delay(400).duration(600)} style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.sectionHeader}>
        <ChartPie size={20} color={colors.accent} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Cost Savings Breakdown</Text>
      </View>
      <View style={styles.breakdownContainer}>
        {ROI_DATA.costBreakdown.map((item, index) => (
          <View key={item.category} style={styles.breakdownItem}>
            <View style={styles.breakdownHeader}>
              <View style={[styles.breakdownDot, { backgroundColor: item.color }]} />
              <Text style={[styles.breakdownCategory, { color: colors.text }]}>{item.category}</Text>
              <Text style={[styles.breakdownAmount, { color: colors.text }]}>
                ${(item.amount / 1000).toFixed(1)}K
              </Text>
            </View>
            <View style={styles.breakdownBarContainer}>
              <View
                style={[
                  styles.breakdownBar,
                  { width: `${item.percentage}%`, backgroundColor: item.color },
                ]}
              />
            </View>
            <Text style={[styles.breakdownPercentage, { color: colors.textSecondary }]}>
              {item.percentage}% of total savings
            </Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );

  const renderTopAgents = () => (
    <Animated.View entering={FadeInUp.delay(500).duration(600)} style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.sectionHeader}>
        <User size={20} color={colors.accent} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Top Performing Agents</Text>
      </View>
      {ROI_DATA.topAgents.map((agent, index) => (
        <View key={agent.name} style={[styles.agentRow, index < ROI_DATA.topAgents.length - 1 && { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentRank, { color: colors.accent }]}>#{index + 1}</Text>
            <View>
              <Text style={[styles.agentName, { color: colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentTasks, { color: colors.textSecondary }]}>
                {agent.tasks.toLocaleString()} tasks completed
              </Text>
            </View>
          </View>
          <View style={styles.agentStats}>
            <Text style={[styles.agentROI, { color: colors.success }]}>{agent.roi}% ROI</Text>
            <Text style={[styles.agentSavings, { color: colors.textSecondary }]}>{agent.savings} saved</Text>
          </View>
        </View>
      ))}
    </Animated.View>
  );

  const renderInsights = () => (
    <Animated.View entering={FadeInUp.delay(600).duration(600)} style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.sectionHeader}>
        <Sparkles size={20} color={colors.accent} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>AI-Generated Insights</Text>
      </View>
      {ROI_DATA.insights.map((insight, index) => (
        <View
          key={insight.title}
          style={[
            styles.insightCard,
            {
              backgroundColor:
                insight.type === 'success'
                  ? isDark
                    ? 'rgba(34, 197, 94, 0.1)'
                    : 'rgba(34, 197, 94, 0.05)'
                  : isDark
                  ? 'rgba(245, 158, 11, 0.1)'
                  : 'rgba(245, 158, 11, 0.05)',
              borderColor:
                insight.type === 'success'
                  ? isDark
                    ? 'rgba(34, 197, 94, 0.2)'
                    : 'rgba(34, 197, 94, 0.1)'
                  : isDark
                  ? 'rgba(245, 158, 11, 0.2)'
                  : 'rgba(245, 158, 11, 0.1)',
            },
          ]}
        >
          <insight.icon
            size={20}
            color={insight.type === 'success' ? colors.success : colors.warning}
          />
          <View style={styles.insightContent}>
            <Text style={[styles.insightTitle, { color: colors.text }]}>{insight.title}</Text>
            <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
              {insight.description}
            </Text>
          </View>
        </View>
      ))}
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>ROI Dashboard</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            Cost Savings Analytics
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.periodSelector, { borderColor: colors.border, backgroundColor: colors.card }]}
          onPress={() => setShowPeriodDropdown(!showPeriodDropdown)}
        >
          <Calendar size={16} color={colors.textSecondary} />
          <Text style={[styles.periodText, { color: colors.text }]}>{selectedPeriod}</Text>
          <ChevronDown size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Grade Badge */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.gradeContainer}>
          <LinearGradient
            colors={['#FFD700', '#FFA500']}
            style={styles.gradeBadge}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.gradeText}>{ROI_DATA.summary.grade}</Text>
          </LinearGradient>
          <Text style={[styles.gradeLabel, { color: colors.textSecondary }]}>Performance Grade</Text>
        </Animated.View>

        {/* Metrics Grid */}
        <View style={styles.metricsGrid}>
          {renderMetricCard(
            'Total Savings',
            ROI_DATA.summary.totalSavings,
            ROI_DATA.summary.savingsChange,
            DollarSign,
            ['#6366f1', '#8b5cf6'],
            100
          )}
          {renderMetricCard(
            'ROI',
            ROI_DATA.summary.roiPercentage,
            ROI_DATA.summary.roiChange,
            TrendingUp,
            ['#22c55e', '#16a34a'],
            200
          )}
          {renderMetricCard(
            'Hours Saved',
            ROI_DATA.summary.hoursSaved,
            ROI_DATA.summary.hoursChange,
            Clock,
            ['#f59e0b', '#d97706'],
            300
          )}
          {renderMetricCard(
            'Active Agents',
            `${ROI_DATA.summary.activeAgents}/${ROI_DATA.summary.totalAgents}`,
            '+2 new',
            Users,
            ['#3b82f6', '#2563eb'],
            400
          )}
        </View>

        {/* Cost Breakdown */}
        {renderCostBreakdown()}

        {/* Top Agents */}
        {renderTopAgents()}

        {/* Insights */}
        {renderInsights()}

        {/* Recommendations */}
        <Animated.View entering={FadeInUp.delay(700).duration(600)} style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <Target size={20} color={colors.accent} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>AI Recommendations</Text>
          </View>
          {ROI_DATA.recommendations.map((rec, index) => (
            <TouchableOpacity
              key={rec.title}
              style={[styles.recommendationCard, { borderColor: colors.border }]}
            >
              <View style={styles.recHeader}>
                <View
                  style={[
                    styles.priorityBadge,
                    {
                      backgroundColor:
                        rec.priority === 'high'
                          ? isDark
                            ? 'rgba(239, 68, 68, 0.2)'
                            : 'rgba(239, 68, 68, 0.1)'
                          : isDark
                          ? 'rgba(245, 158, 11, 0.2)'
                          : 'rgba(245, 158, 11, 0.1)',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      {
                        color: rec.priority === 'high' ? colors.danger : colors.warning,
                      },
                    ]}
                  >
                    {rec.priority.toUpperCase()}
                  </Text>
                </View>
                <Text style={[styles.expectedROI, { color: colors.success }]}>+{rec.expectedROI}</Text>
              </View>
              <Text style={[styles.recTitle, { color: colors.text }]}>{rec.title}</Text>
              <Text style={[styles.recDescription, { color: colors.textSecondary }]}>
                {rec.description}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Period Dropdown */}
      {showPeriodDropdown && (
        <View style={[styles.dropdown, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {PERIODS.map((period) => (
            <TouchableOpacity
              key={period}
              style={[styles.dropdownItem, selectedPeriod === period && { backgroundColor: colors.accent + '20' }]}
              onPress={() => {
                setSelectedPeriod(period);
                setShowPeriodDropdown(false);
              }}
            >
              <Text
                style={[
                  styles.dropdownText,
                  { color: selectedPeriod === period ? colors.accent : colors.text },
                ]}
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  gradeContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  gradeBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  gradeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  gradeLabel: {
    fontSize: 14,
    marginTop: 8,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  metricCard: {
    width: (SCREEN_WIDTH - 44) / 2,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  metricIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricContent: {
    gap: 4,
  },
  metricTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  sectionCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  breakdownContainer: {
    gap: 16,
  },
  breakdownItem: {
    gap: 8,
  },
  breakdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  breakdownDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  breakdownCategory: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  breakdownAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
  breakdownBarContainer: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  breakdownBar: {
    height: '100%',
    borderRadius: 4,
  },
  breakdownPercentage: {
    fontSize: 12,
  },
  agentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  agentRank: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 30,
  },
  agentName: {
    fontSize: 15,
    fontWeight: '600',
  },
  agentTasks: {
    fontSize: 12,
    marginTop: 2,
  },
  agentStats: {
    alignItems: 'flex-end',
  },
  agentROI: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  agentSavings: {
    fontSize: 12,
    marginTop: 2,
  },
  insightCard: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  recommendationCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  recHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  expectedROI: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  recTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  recDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  dropdown: {
    position: 'absolute',
    top: 70,
    right: 16,
    borderRadius: 12,
    borderWidth: 1,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
