import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { professionalServicesDashboardConfig } from '@/constants/dashboardMetrics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  TrendingUp,
  ChevronLeft,
  Target,
  DollarSign,
  BarChart3,
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
  Briefcase,
  Building,
  Globe,
  MapPin,
  FileText,
  AlertTriangle,
  CheckCircle,
  Percent,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function RevenueForecastingCommandCenter() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState<'quarter' | 'year' | 'custom'>('quarter');
  const [selectedView, setSelectedView] = useState<'all' | 'by-practice' | 'by-region' | 'by-client'>('all');

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

  const forecastMetrics = {
    currentQuarter: {
      forecast: '$2.8B',
      actual: '$2.4B',
      variance: '-$400M',
      variancePercent: '-14%',
      confidence: 94,
      daysRemaining: 45
    },
    fullYear: {
      forecast: '$9.6B',
      actual: '$7.2B',
      variance: '-$2.4B',
      variancePercent: '-25%',
      confidence: 89,
      monthsRemaining: 6
    },
    pipeline: {
      total: '$4.2B',
      qualified: '$2.8B',
      proposal: '$1.2B',
      negotiation: '$200M',
      conversionRate: 67
    }
  };

  const quarterlyForecast = [
    { quarter: 'Q1 2024', forecast: '$2.2B', actual: '$2.4B', variance: '+$200M', variancePercent: '+9%', confidence: 96 },
    { quarter: 'Q2 2024', forecast: '$2.8B', actual: '$2.4B', variance: '-$400M', variancePercent: '-14%', confidence: 94 },
    { quarter: 'Q3 2024', forecast: '$2.6B', actual: null, variance: null, variancePercent: null, confidence: 91 },
    { quarter: 'Q4 2024', forecast: '$2.0B', actual: null, variance: null, variancePercent: null, confidence: 88 }
  ];

  const practiceRevenue = [
    { practice: 'Cloud Services', forecast: '$2.4B', actual: '$2.1B', variance: '-$300M', margin: 38, growth: 18 },
    { practice: 'Data & Analytics', forecast: '$1.8B', actual: '$1.6B', variance: '-$200M', margin: 42, growth: 24 },
    { practice: 'AI & ML', forecast: '$1.2B', actual: '$1.0B', variance: '-$200M', margin: 45, growth: 42 },
    { practice: 'Cybersecurity', forecast: '$1.5B', actual: '$1.4B', variance: '-$100M', margin: 40, growth: 28 },
    { practice: 'Digital Transformation', forecast: '$1.4B', actual: '$1.1B', variance: '-$300M', margin: 35, growth: 22 },
    { practice: 'Strategy & Consulting', forecast: '$1.3B', actual: '$0.9B', variance: '-$400M', margin: 48, growth: 15 }
  ];

  const regionalRevenue = [
    { region: 'North America', forecast: '$4.2B', actual: '$3.8B', variance: '-$400M', growth: 12 },
    { region: 'Europe', forecast: '$2.8B', actual: '$2.4B', variance: '-$400M', growth: 18 },
    { region: 'Asia Pacific', forecast: '$1.8B', actual: '$1.2B', variance: '-$600M', growth: 28 },
    { region: 'Latin America', forecast: '$600M', actual: '$500M', variance: '-$100M', growth: 22 },
    { region: 'Middle East', forecast: '$200M', actual: '$180M', variance: '-$20M', growth: 15 }
  ];

  const topDeals = [
    { id: 1, client: 'Fortune 500 Tech', value: '$12M', stage: 'Negotiation', probability: 85, closeDate: '2024-02-15', practice: 'Cloud Services' },
    { id: 2, client: 'Global Bank', value: '$8M', stage: 'Proposal', probability: 65, closeDate: '2024-03-01', practice: 'Cybersecurity' },
    { id: 3, client: 'Healthcare System', value: '$15M', stage: 'Qualified', probability: 45, closeDate: '2024-04-15', practice: 'AI & ML' },
    { id: 4, client: 'Manufacturing Co', value: '$6M', stage: 'Negotiation', probability: 78, closeDate: '2024-02-28', practice: 'Digital Transformation' },
    { id: 5, client: 'Insurance Giant', value: '$10M', stage: 'Proposal', probability: 60, closeDate: '2024-03-15', practice: 'Data & Analytics' }
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

  const renderQuarterRow = (quarter: any, index: number) => (
    <View key={index} style={[styles.quarterRow, { borderBottomColor: colors.cardBorder }]}>
      <Text style={[styles.quarterName, { color: colors.text }]}>{quarter.quarter}</Text>
      <Text style={[styles.quarterValue, { color: colors.text }]}>{quarter.forecast}</Text>
      <Text style={[styles.quarterActual, { color: quarter.actual ? colors.emeraldGreen : colors.textSecondary }]}>{quarter.actual || '-'}</Text>
      <Text style={[
        styles.quarterVariance,
        { color: quarter.variancePercent?.startsWith('+') ? colors.emeraldGreen : quarter.variancePercent?.startsWith('-') ? colors.red : colors.textSecondary }
      ]}>{quarter.variance || '-'}</Text>
      <View style={[styles.confidenceBadge, { backgroundColor: quarter.confidence >= 95 ? colors.emeraldGreen + '20' : quarter.confidence >= 90 ? colors.electricBlue + '20' : colors.amber + '20' }]}>
        <Text style={[
          styles.confidenceText,
          { color: quarter.confidence >= 95 ? colors.emeraldGreen : quarter.confidence >= 90 ? colors.electricBlue : colors.amber }
        ]}>{quarter.confidence}%</Text>
      </View>
    </View>
  );

  const renderPracticeRow = (practice: any, index: number) => (
    <View key={index} style={[styles.practiceRow, { borderBottomColor: colors.cardBorder }]}>
      <Text style={[styles.practiceName, { color: colors.text }]}>{practice.practice}</Text>
      <Text style={[styles.practiceValue, { color: colors.text }]}>{practice.forecast}</Text>
      <Text style={[styles.practiceActual, { color: colors.emeraldGreen }]}>{practice.actual}</Text>
      <Text style={[
        styles.practiceVariance,
        { color: practice.variance.startsWith('-') ? colors.red : colors.emeraldGreen }
      ]}>{practice.variance}</Text>
      <Text style={[styles.practiceMargin, { color: practice.margin >= 40 ? colors.emeraldGreen : colors.amber }]}>{practice.margin}%</Text>
      <View style={styles.growthBadge}>
        <TrendingUp size={12} color={colors.emeraldGreen} />
        <Text style={[styles.growthText, { color: colors.emeraldGreen }]}>{practice.growth}%</Text>
      </View>
    </View>
  );

  const renderDealCard = (deal: any) => (
    <View key={deal.id} style={[styles.dealCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
      <View style={styles.dealHeader}>
        <View style={styles.dealInfo}>
          <Text style={[styles.dealClient, { color: colors.text }]}>{deal.client}</Text>
          <Text style={[styles.dealPractice, { color: colors.textSecondary }]}>{deal.practice}</Text>
        </View>
        <View style={[
          styles.dealStage,
          { backgroundColor: deal.stage === 'Negotiation' ? colors.emeraldGreen + '20' : deal.stage === 'Proposal' ? colors.electricBlue + '20' : colors.purple + '20' }
        ]}>
          <Text style={[
            styles.dealStageText,
            { color: deal.stage === 'Negotiation' ? colors.emeraldGreen : deal.stage === 'Proposal' ? colors.electricBlue : colors.purple }
          ]}>{deal.stage}</Text>
        </View>
      </View>

      <View style={styles.dealMetrics}>
        <View style={styles.dealMetric}>
          <DollarSign size={14} color={colors.textSecondary} />
          <Text style={[styles.dealValue, { color: colors.text }]}>{deal.value}</Text>
        </View>
        <View style={styles.dealMetric}>
          <Percent size={14} color={colors.textSecondary} />
          <Text style={[styles.dealProbability, { color: deal.probability >= 75 ? colors.emeraldGreen : deal.probability >= 50 ? colors.electricBlue : colors.amber }]}>{deal.probability}%</Text>
        </View>
        <View style={styles.dealMetric}>
          <Calendar size={14} color={colors.textSecondary} />
          <Text style={[styles.dealCloseDate, { color: colors.textSecondary }]}>{deal.closeDate}</Text>
        </View>
      </View>

      <View style={styles.dealProgress}>
        <View style={[styles.progressBar, { backgroundColor: colors.glass }]}>
          <View style={[styles.progressFill, { width: `${deal.probability}%`, backgroundColor: deal.probability >= 75 ? colors.emeraldGreen : deal.probability >= 50 ? colors.electricBlue : colors.amber }]} />
        </View>
        <Text style={[styles.progressText, { color: colors.text }]}>{deal.probability}% Win Probability</Text>
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
            <TrendingUp size={24} color="#FFFFFF" />
          </LinearGradient>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Revenue Forecasting Engine</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>AI-Powered Revenue Prediction & Pipeline Intelligence</Text>
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
        {/* Current Quarter Forecast */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Current Quarter Forecast</Text>
          <View style={styles.metricsGrid}>
            {renderMetricCard('Forecast', forecastMetrics.currentQuarter.forecast, Target, colors.electricBlue)}
            {renderMetricCard('Actual', forecastMetrics.currentQuarter.actual, DollarSign, colors.emeraldGreen)}
            {renderMetricCard('Variance', forecastMetrics.currentQuarter.variance, AlertTriangle, colors.red, forecastMetrics.currentQuarter.variancePercent, colors.red)}
            {renderMetricCard('Confidence', `${forecastMetrics.currentQuarter.confidence}%`, CheckCircle, colors.emeraldGreen)}
            {renderMetricCard('Days Remaining', forecastMetrics.currentQuarter.daysRemaining.toString(), Calendar, colors.amber)}
          </View>
        </View>

        {/* Full Year Forecast */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Full Year Forecast</Text>
          <View style={styles.metricsGrid}>
            {renderMetricCard('Forecast', forecastMetrics.fullYear.forecast, Target, colors.electricBlue)}
            {renderMetricCard('Actual', forecastMetrics.fullYear.actual, DollarSign, colors.emeraldGreen)}
            {renderMetricCard('Variance', forecastMetrics.fullYear.variance, AlertTriangle, colors.red, forecastMetrics.fullYear.variancePercent, colors.red)}
            {renderMetricCard('Confidence', `${forecastMetrics.fullYear.confidence}%`, CheckCircle, colors.emeraldGreen)}
            {renderMetricCard('Months Remaining', forecastMetrics.fullYear.monthsRemaining.toString(), Calendar, colors.amber)}
          </View>
        </View>

        {/* Pipeline Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Pipeline Overview</Text>
          <View style={styles.metricsGrid}>
            {renderMetricCard('Total Pipeline', forecastMetrics.pipeline.total, Layers, colors.purple)}
            {renderMetricCard('Qualified', forecastMetrics.pipeline.qualified, CheckCircle, colors.emeraldGreen)}
            {renderMetricCard('Proposal', forecastMetrics.pipeline.proposal, FileText, colors.electricBlue)}
            {renderMetricCard('Negotiation', forecastMetrics.pipeline.negotiation, Briefcase, colors.amber)}
            {renderMetricCard('Conversion Rate', `${forecastMetrics.pipeline.conversionRate}%`, Percent, colors.emeraldGreen)}
          </View>
        </View>

        {/* Quarterly Forecast */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Quarterly Forecast</Text>
            <View style={styles.periodTabs}>
              {['quarter', 'year', 'custom'].map((period) => (
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
          <View style={[styles.quarterCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.quarterHeader}>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Quarter</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Forecast</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Actual</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Variance</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Confidence</Text>
            </View>
            {quarterlyForecast.map((quarter, index) => renderQuarterRow(quarter, index))}
          </View>
        </View>

        {/* Practice Revenue */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Revenue by Practice</Text>
          <View style={[styles.practiceCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.practiceHeader}>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Practice</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Forecast</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Actual</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Variance</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Margin</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Growth</Text>
            </View>
            {practiceRevenue.map((practice, index) => renderPracticeRow(practice, index))}
          </View>
        </View>

        {/* Regional Revenue */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Revenue by Region</Text>
          <View style={[styles.regionCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            {regionalRevenue.map((region, index) => (
              <View key={index} style={[styles.regionRow, { borderBottomColor: colors.cardBorder }]}>
                <View style={styles.regionInfo}>
                  <Globe size={16} color={colors.electricBlue} />
                  <Text style={[styles.regionName, { color: colors.text }]}>{region.region}</Text>
                </View>
                <Text style={[styles.regionValue, { color: colors.text }]}>{region.forecast}</Text>
                <Text style={[styles.regionActual, { color: colors.emeraldGreen }]}>{region.actual}</Text>
                <Text style={[
                  styles.regionVariance,
                  { color: region.variance.startsWith('-') ? colors.red : colors.emeraldGreen }
                ]}>{region.variance}</Text>
                <View style={styles.growthBadge}>
                  <TrendingUp size={12} color={colors.emeraldGreen} />
                  <Text style={[styles.growthText, { color: colors.emeraldGreen }]}>{region.growth}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Top Deals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Top Pipeline Deals</Text>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.emeraldGreen }]}>
              <Plus size={20} color="white" />
              <Text style={styles.addButtonText}>Add Deal</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dealsGrid}>
            {topDeals.map((deal) => renderDealCard(deal))}
          </View>
        </View>

        {/* AI Forecast Insights */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>AI Forecast Insights</Text>
          <View style={[styles.insightsCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: colors.emeraldGreen + '20' }]}>
                <TrendingUp size={20} color={colors.emeraldGreen} />
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: colors.text }]}>Q2 Recovery Expected</Text>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
                  AI models predict 18% recovery in Q2 driven by Cloud Services and AI/ML demand surge.
                </Text>
              </View>
            </View>

            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: colors.amber + '20' }]}>
                <AlertTriangle size={20} color={colors.amber} />
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: colors.text }]}>Asia Pacific Gap Widening</Text>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
                  $600M variance in Asia Pacific. AI recommends strategic investment in regional sales capacity.
                </Text>
              </View>
            </View>

            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: colors.purple + '20' }]}>
                <Zap size={20} color={colors.purple} />
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: colors.text }]}>Pipeline Conversion Optimization</Text>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
                  AI identifies 12 deals with 85%+ probability. Accelerated closing could add $48M to Q2.
                </Text>
              </View>
            </View>
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
    width: (width - 64) / 5,
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
    fontSize: 18,
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
  quarterCard: {
    padding: 16,
    borderRadius: 12,
  },
  quarterHeader: {
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
  quarterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  quarterName: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
  },
  quarterValue: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  quarterActual: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  quarterVariance: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  confidenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  confidenceText: {
    fontSize: 11,
    fontWeight: '600',
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
  practiceValue: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  practiceActual: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  practiceVariance: {
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
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  growthText: {
    fontSize: 11,
    fontWeight: '600',
  },
  regionCard: {
    padding: 16,
    borderRadius: 12,
  },
  regionRow: {
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
  regionValue: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  regionActual: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  regionVariance: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  dealsGrid: {
    gap: 12,
  },
  dealCard: {
    padding: 16,
    borderRadius: 12,
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dealInfo: {
    flex: 1,
  },
  dealClient: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dealPractice: {
    fontSize: 14,
  },
  dealStage: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  dealStageText: {
    fontSize: 11,
    fontWeight: '600',
  },
  dealMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dealMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dealValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  dealProbability: {
    fontSize: 14,
    fontWeight: '600',
  },
  dealCloseDate: {
    fontSize: 12,
  },
  dealProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightsCard: {
    padding: 16,
    borderRadius: 12,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 12,
  },
});
