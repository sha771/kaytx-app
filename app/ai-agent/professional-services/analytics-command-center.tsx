import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { professionalServicesDashboardConfig } from '@/constants/dashboardMetrics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  BarChart3,
  ChevronLeft,
  Target,
  TrendingUp,
  DollarSign,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Layers,
  Zap,
  Settings,
  RefreshCw,
  PieChart,
  LineChart,
  Download,
  Share2,
  FileText,
  Users,
  Briefcase,
  Building,
  Globe,
  MapPin,
  Clock,
  Award,
  Percent,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function AnalyticsCommandCenter() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [selectedMetric, setSelectedMetric] = useState<'all' | 'financial' | 'delivery' | 'resource' | 'customer'>('all');

  const colors = {
    background: '#050B14',
    card: 'rgba(10, 20, 40, 0.8)',
    cardBorder: 'rgba(30, 58, 95, 0.5)',
    text: '#FFFFFF',
    textSecondary: '#94A3B8',
    electricBlue: '#3B82F6',
    emeraldGreen: '#10B981',
    purple: '#8B5CF6',
    amber: '#F59E0B',
    red: '#EF4444',
    glass: 'rgba(255, 255, 255, 0.05)',
    glassBorder: 'rgba(255, 255, 255, 0.1)'
  };

  const analyticsMetrics = {
    totalRevenue: '$2.4B',
    revenueGrowth: '+18%',
    avgMargin: '34.2%',
    marginImprovement: '+2.4%',
    utilizationRate: '86%',
    utilizationTrend: '+3%',
    clientSatisfaction: '94%',
    satisfactionTrend: '+2%',
    onTimeDelivery: '89%',
    deliveryTrend: '+5%',
    aiImpact: '$180M',
    aiEfficiency: '+24%'
  };

  const performanceTrends = [
    { metric: 'Revenue', current: '$2.4B', previous: '$2.0B', change: '+18%', trend: 'up' },
    { metric: 'Margin', current: '34.2%', previous: '31.8%', change: '+2.4%', trend: 'up' },
    { metric: 'Utilization', current: '86%', previous: '83%', change: '+3%', trend: 'up' },
    { metric: 'Satisfaction', current: '94%', previous: '92%', change: '+2%', trend: 'up' },
    { metric: 'On-Time Delivery', current: '89%', previous: '84%', change: '+5%', trend: 'up' },
    { metric: 'AI Efficiency', current: '+24%', previous: '+18%', change: '+6%', trend: 'up' }
  ];

  const regionalPerformance = [
    { region: 'North America', revenue: '$1.2B', growth: '+12%', margin: '36%', satisfaction: '95%', utilization: '88%' },
    { region: 'Europe', revenue: '$800M', growth: '+18%', margin: '34%', satisfaction: '93%', utilization: '85%' },
    { region: 'Asia Pacific', revenue: '$300M', growth: '+28%', margin: '32%', satisfaction: '92%', utilization: '82%' },
    { region: 'Latin America', revenue: '$80M', growth: '+22%', margin: '30%', satisfaction: '91%', utilization: '80%' },
    { region: 'Middle East', revenue: '$20M', growth: '+15%', margin: '28%', satisfaction: '90%', utilization: '78%' }
  ];

  const practicePerformance = [
    { practice: 'Cloud Services', revenue: '$600M', growth: '+18%', margin: '38%', projects: 280, consultants: 1200 },
    { practice: 'Data & Analytics', revenue: '$480M', growth: '+24%', margin: '42%', projects: 220, consultants: 980 },
    { practice: 'AI & ML', revenue: '$360M', growth: '+42%', margin: '45%', projects: 180, consultants: 720 },
    { practice: 'Cybersecurity', revenue: '$420M', growth: '+28%', margin: '40%', projects: 240, consultants: 960 },
    { practice: 'Digital Transformation', revenue: '$380M', growth: '+22%', margin: '35%', projects: 200, consultants: 840 },
    { practice: 'Strategy & Consulting', revenue: '$160M', growth: '+15%', margin: '48%', projects: 80, consultants: 400 }
  ];

  const aiInsights = [
    { id: 1, title: 'Revenue Forecast Accuracy', category: 'Financial', score: 94, trend: '+4%', impact: 'high' },
    { id: 2, title: 'Resource Optimization', category: 'Resource', score: 88, trend: '+6%', impact: 'high' },
    { id: 3, title: 'Client Churn Prediction', category: 'Customer', score: 82, trend: '+8%', impact: 'medium' },
    { id: 4, title: 'Project Risk Detection', category: 'Delivery', score: 90, trend: '+5%', impact: 'high' },
    { id: 5, title: 'Proposal Win Rate', category: 'Financial', score: 76, trend: '+3%', impact: 'medium' }
  ];

  const renderMetricCard = (label: string, value: string, icon: any, color: string, trend?: string, trendColor?: string) => (
    <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
      <View style={[styles.metricIcon, { backgroundColor: color + '20' }]}>
        {React.createElement(icon, { size: 20, color: color })}
      </View>
      <Text style={[styles.metricCardValue, { color: color }]}>{value}</Text>
      <Text style={[styles.metricCardLabel, { color: colors.textSecondary }]}>{label}</Text>
      {trend && (
        <View style={styles.trendRow}>
          {React.createElement(trend.startsWith('+') ? ArrowUpRight : ArrowDownRight, { size: 12, color: trendColor || colors.emeraldGreen })}
          <Text style={[styles.trendText, { color: trendColor || colors.emeraldGreen }]}>{trend}</Text>
        </View>
      )}
    </View>
  );

  const renderTrendRow = (trend: any, index: number) => (
    <View key={index} style={[styles.trendRow, { borderBottomColor: colors.cardBorder }]}>
      <Text style={[styles.trendMetric, { color: colors.text }]}>{trend.metric}</Text>
      <Text style={[styles.trendCurrent, { color: colors.text }]}>{trend.current}</Text>
      <Text style={[styles.trendPrevious, { color: colors.textSecondary }]}>{trend.previous}</Text>
      <View style={[
        styles.trendChangeBadge,
        { backgroundColor: trend.trend === 'up' ? colors.emeraldGreen + '20' : colors.red + '20' }
      ]}>
        {React.createElement(trend.trend === 'up' ? ArrowUpRight : ArrowDownRight, { size: 12, color: trend.trend === 'up' ? colors.emeraldGreen : colors.red })}
        <Text style={[
          styles.trendChangeText,
          { color: trend.trend === 'up' ? colors.emeraldGreen : colors.red }
        ]}>{trend.change}</Text>
      </View>
    </View>
  );

  const renderRegionalRow = (region: any, index: number) => (
    <View key={index} style={[styles.regionalRow, { borderBottomColor: colors.cardBorder }]}>
      <View style={styles.regionInfo}>
        <Globe size={16} color={colors.electricBlue} />
        <Text style={[styles.regionName, { color: colors.text }]}>{region.region}</Text>
      </View>
      <Text style={[styles.regionRevenue, { color: colors.emeraldGreen }]}>{region.revenue}</Text>
      <View style={styles.growthBadge}>
        <TrendingUp size={12} color={colors.emeraldGreen} />
        <Text style={[styles.growthText, { color: colors.emeraldGreen }]}>{region.growth}</Text>
      </View>
      <Text style={[styles.regionMargin, { color: region.margin >= 35 ? colors.emeraldGreen : colors.amber }]}>{region.margin}</Text>
      <Text style={[styles.regionSatisfaction, { color: colors.electricBlue }]}>{region.satisfaction}%</Text>
      <Text style={[styles.regionUtilization, { color: colors.purple }]}>{region.utilization}%</Text>
    </View>
  );

  const renderPracticeRow = (practice: any, index: number) => (
    <View key={index} style={[styles.practiceRow, { borderBottomColor: colors.cardBorder }]}>
      <Text style={[styles.practiceName, { color: colors.text }]}>{practice.practice}</Text>
      <Text style={[styles.practiceRevenue, { color: colors.emeraldGreen }]}>{practice.revenue}</Text>
      <View style={styles.growthBadge}>
        <TrendingUp size={12} color={colors.emeraldGreen} />
        <Text style={[styles.growthText, { color: colors.emeraldGreen }]}>{practice.growth}</Text>
      </View>
      <Text style={[styles.practiceMargin, { color: practice.margin >= 40 ? colors.emeraldGreen : colors.amber }]}>{practice.margin}</Text>
      <Text style={[styles.practiceProjects, { color: colors.text }]}>{practice.projects}</Text>
      <Text style={[styles.practiceConsultants, { color: colors.textSecondary }]}>{practice.consultants}</Text>
    </View>
  );

  const renderInsightRow = (insight: any, index: number) => (
    <View key={index} style={[styles.insightRow, { borderBottomColor: colors.cardBorder }]}>
      <View style={[styles.insightDot, { backgroundColor: insight.impact === 'high' ? colors.red : insight.impact === 'medium' ? colors.amber : colors.emeraldGreen }]} />
      <View style={styles.insightContent}>
        <Text style={[styles.insightTitle, { color: colors.text }]}>{insight.title}</Text>
        <Text style={[styles.insightMeta, { color: colors.textSecondary }]}>{insight.category}</Text>
      </View>
      <View style={styles.insightScore}>
        <Text style={[styles.scoreValue, { color: insight.score >= 90 ? colors.emeraldGreen : insight.score >= 80 ? colors.electricBlue : colors.amber }]}>{insight.score}%</Text>
        <View style={styles.trendBadge}>
          <TrendingUp size={10} color={colors.emeraldGreen} />
          <Text style={[styles.trendText, { color: colors.emeraldGreen }]}>{insight.trend}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <LinearGradient
        colors={['rgba(16, 185, 129, 0.1)', 'rgba(5, 11, 20, 0.9)']}
        style={[styles.header, { borderBottomColor: colors.cardBorder, borderBottomWidth: 1 }]}
      >
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.headerIcon}
          >
            <BarChart3 size={24} color="#FFFFFF" />
          </LinearGradient>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Analytics Command Center</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Enterprise Performance Analytics & AI Insights</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <Search size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <Filter size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <RefreshCw size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Analytics Metrics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Performance Overview</Text>
          <View style={styles.metricsGrid}>
            {renderMetricCard('Total Revenue', analyticsMetrics.totalRevenue, DollarSign, colors.emeraldGreen, analyticsMetrics.revenueGrowth)}
            {renderMetricCard('Avg Margin', analyticsMetrics.avgMargin, Percent, colors.electricBlue, analyticsMetrics.marginImprovement)}
            {renderMetricCard('Utilization', analyticsMetrics.utilizationRate, Activity, colors.purple, analyticsMetrics.utilizationTrend)}
            {renderMetricCard('Satisfaction', analyticsMetrics.clientSatisfaction, Award, colors.emeraldGreen, analyticsMetrics.satisfactionTrend)}
            {renderMetricCard('On-Time Delivery', analyticsMetrics.onTimeDelivery, Target, colors.electricBlue, analyticsMetrics.deliveryTrend)}
            {renderMetricCard('AI Impact', analyticsMetrics.aiImpact, Zap, colors.amber, analyticsMetrics.aiEfficiency)}
          </View>
        </View>

        {/* Performance Trends */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Performance Trends</Text>
            <View style={styles.periodTabs}>
              {['week', 'month', 'quarter', 'year'].map((period) => (
                <TouchableOpacity
                  key={period}
                  style={[
                    styles.periodTab,
                    selectedPeriod === period && styles.activePeriodTab,
                    { backgroundColor: selectedPeriod === period ? colors.electricBlue : colors.glass }
                  ]}
                  onPress={() => setSelectedPeriod(period as any)}
                >
                  <Text style={[
                    styles.periodTabText,
                    { color: selectedPeriod === period ? '#FFFFFF' : colors.textSecondary }
                  ]}>
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={[styles.trendsCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.trendsHeader}>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Metric</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Current</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Previous</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Change</Text>
            </View>
            {performanceTrends.map((trend, index) => renderTrendRow(trend, index))}
          </View>
        </View>

        {/* Regional Performance */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Regional Performance</Text>
          <View style={[styles.regionalCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.regionalHeader}>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Region</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Revenue</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Growth</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Margin</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>CSAT</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Util</Text>
            </View>
            {regionalPerformance.map((region, index) => renderRegionalRow(region, index))}
          </View>
        </View>

        {/* Practice Performance */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Practice Performance</Text>
          <View style={[styles.practiceCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.practiceHeader}>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Practice</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Revenue</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Growth</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Margin</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Projects</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Consultants</Text>
            </View>
            {practicePerformance.map((practice, index) => renderPracticeRow(practice, index))}
          </View>
        </View>

        {/* AI Insights Performance */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>AI Insights Performance</Text>
          <View style={[styles.insightsCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            {aiInsights.map((insight, index) => renderInsightRow(insight, index))}
          </View>
        </View>

        {/* Export Options */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Export Analytics</Text>
          </View>
          <View style={styles.exportButtons}>
            <TouchableOpacity style={[styles.exportButton, { backgroundColor: colors.electricBlue }]}>
              <Download size={20} color="white" />
              <Text style={styles.exportButtonText}>Export Report</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.exportButton, { backgroundColor: colors.emeraldGreen }]}>
              <Share2 size={20} color="white" />
              <Text style={styles.exportButtonText}>Share Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.exportButton, { backgroundColor: colors.purple }]}>
              <FileText size={20} color="white" />
              <Text style={styles.exportButtonText}>Schedule Report</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: (width - 64) / 3,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricCardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricCardLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  periodTabs: {
    flexDirection: 'row',
    gap: 8,
  },
  periodTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  activePeriodTab: {
    backgroundColor: '#3B82F6',
  },
  periodTabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  trendsCard: {
    padding: 16,
    borderRadius: 12,
  },
  trendsHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    marginBottom: 8,
  },
  columnHeader: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
  },
  trendMetric: {
    flex: 1.5,
    fontSize: 13,
    fontWeight: '500',
  },
  trendCurrent: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  trendPrevious: {
    flex: 1,
    fontSize: 13,
    textAlign: 'right',
  },
  trendChangeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  trendChangeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  regionalCard: {
    padding: 16,
    borderRadius: 12,
  },
  regionalHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    marginBottom: 8,
  },
  regionalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  regionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1.5,
  },
  regionName: {
    fontSize: 13,
    fontWeight: '500',
  },
  regionRevenue: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  growthText: {
    fontSize: 11,
    fontWeight: '600',
  },
  regionMargin: {
    flex: 0.8,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  regionSatisfaction: {
    flex: 0.8,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  regionUtilization: {
    flex: 0.6,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  practiceCard: {
    padding: 16,
    borderRadius: 12,
  },
  practiceHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    marginBottom: 8,
  },
  practiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  practiceName: {
    flex: 1.5,
    fontSize: 13,
    fontWeight: '500',
  },
  practiceRevenue: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  practiceMargin: {
    flex: 0.8,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  practiceProjects: {
    flex: 0.8,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  practiceConsultants: {
    flex: 0.8,
    fontSize: 13,
    textAlign: 'right',
  },
  insightsCard: {
    padding: 16,
    borderRadius: 12,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  insightDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  insightMeta: {
    fontSize: 12,
  },
  insightScore: {
    alignItems: 'flex-end',
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  exportButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  exportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  exportButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
