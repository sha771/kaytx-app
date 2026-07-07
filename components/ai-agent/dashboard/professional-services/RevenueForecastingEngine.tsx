import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  Target,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  PieChart,
  LineChart,
  Calendar,
  Briefcase,
  Users,
  Zap,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react-native';

interface RevenueForecastingEngineProps {
  data?: {
    pipeline: any[];
    forecastAccuracy: any;
    practiceRevenue: any;
    marginPerformance: any;
    futureDemand: any;
  };
}

export default function RevenueForecastingEngine({ data }: RevenueForecastingEngineProps) {
  // Mock data for Revenue Forecasting Engine
  const pipeline = {
    totalValue: '$4.2B',
    stages: [
      { stage: 'Qualified', count: 2450, value: '$840M', conversionRate: 65 },
      { stage: 'Proposal', count: 1240, value: '$1.8B', conversionRate: 45 },
      { stage: 'Negotiation', count: 620, value: '$1.2B', conversionRate: 75 },
      { stage: 'Closing', count: 340, value: '$420M', conversionRate: 85 },
    ],
    conversionFunnel: {
      qualified: 100,
      proposal: 68,
      negotiation: 42,
      closing: 32,
      won: 28,
    },
  };

  const forecastAccuracy = {
    overall: 94,
    byQuarter: [
      { quarter: 'Q1 2024', forecast: '$2.1B', actual: '$2.0B', accuracy: 95 },
      { quarter: 'Q2 2024', forecast: '$2.3B', actual: '$2.2B', accuracy: 96 },
      { quarter: 'Q3 2024', forecast: '$2.5B', actual: '$2.4B', accuracy: 94 },
      { quarter: 'Q4 2024', forecast: '$2.8B', actual: '$2.7B', accuracy: 96 },
    ],
    byPractice: [
      { practice: 'Strategy', accuracy: 92 },
      { practice: 'Digital', accuracy: 95 },
      { practice: 'Cloud', accuracy: 94 },
      { practice: 'Security', accuracy: 91 },
      { practice: 'Data & AI', accuracy: 96 },
    ],
  };

  const practiceRevenue = {
    total: '$2.4B',
    byPractice: [
      { practice: 'Digital Transformation', revenue: '$720M', growth: '+22%', margin: 42 },
      { practice: 'Cloud Services', revenue: '$580M', growth: '+18%', margin: 38 },
      { practice: 'Data & AI', revenue: '$480M', growth: '+28%', margin: 45 },
      { practice: 'Security', revenue: '$320M', growth: '+16%', margin: 40 },
      { practice: 'Strategy', revenue: '$300M', growth: '+12%', margin: 48 },
    ],
    byRegion: [
      { region: 'North America', revenue: '$840M', growth: '+18%' },
      { region: 'EMEA', revenue: '$620M', growth: '+14%' },
      { region: 'APAC', revenue: '$580M', growth: '+22%' },
      { region: 'India', revenue: '$360M', growth: '+28%' },
    ],
  };

  const marginPerformance = {
    overall: 42.8,
    target: 45,
    byPractice: [
      { practice: 'Strategy', current: 48, target: 50, trend: 'up' },
      { practice: 'Data & AI', current: 45, target: 48, trend: 'up' },
      { practice: 'Security', current: 40, target: 42, trend: 'stable' },
      { practice: 'Digital', current: 42, target: 44, trend: 'up' },
      { practice: 'Cloud', current: 38, target: 40, trend: 'up' },
    ],
    improvementOpportunities: [
      { area: 'Resource Optimization', potential: '+3%', effort: 'medium' },
      { area: 'Pricing Strategy', potential: '+2%', effort: 'low' },
      { area: 'Scope Management', potential: '+4%', effort: 'high' },
    ],
  };

  const futureDemand = {
    nextQuarter: '$2.8B',
    nextYear: '$12.4B',
    byIndustry: [
      { industry: 'Financial Services', demand: '$3.2B', growth: '+24%' },
      { industry: 'Healthcare', demand: '$2.4B', growth: '+20%' },
      { industry: 'Technology', demand: '$2.8B', growth: '+28%' },
      { industry: 'Retail', demand: '$1.8B', growth: '+16%' },
      { industry: 'Manufacturing', demand: '$2.2B', growth: '+18%' },
    ],
    scenarioPlanning: [
      { scenario: 'Conservative', revenue: '$11.2B', probability: 25 },
      { scenario: 'Base Case', revenue: '$12.4B', probability: 50 },
      { scenario: 'Optimistic', revenue: '$14.8B', probability: 25 },
    ],
  };

  const renderPipelineCard = (stage: any, index: number) => (
    <View key={index} style={[styles.pipelineCard, { backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
      <Text style={[styles.pipelineStage, { color: '#FFFFFF' }]}>{stage.stage}</Text>
      <View style={styles.pipelineMetrics}>
        <View style={styles.pipelineMetric}>
          <Briefcase size={16} color="rgba(255, 255, 255, 0.5)" />
          <Text style={[styles.pipelineMetricValue, { color: '#FFFFFF' }]}>{stage.count}</Text>
        </View>
        <View style={styles.pipelineMetric}>
          <DollarSign size={16} color="rgba(255, 255, 255, 0.5)" />
          <Text style={[styles.pipelineMetricValue, { color: '#10B981' }]}>{stage.value}</Text>
        </View>
      </View>
      <View style={styles.conversionRate}>
        <Activity size={14} color="rgba(255, 255, 255, 0.5)" />
        <Text style={[styles.conversionText, { color: 'rgba(255, 255, 255, 0.7)' }]}>
          {stage.conversionRate}% conversion
        </Text>
      </View>
    </View>
  );

  const renderForecastCard = (quarter: any, index: number) => (
    <View key={index} style={[styles.forecastCard, { backgroundColor: 'rgba(59, 130, 246, 0.08)', borderColor: 'rgba(59, 130, 246, 0.3)' }]}>
      <Text style={[styles.forecastQuarter, { color: '#FFFFFF' }]}>{quarter.quarter}</Text>
      <View style={styles.forecastDetails}>
        <View style={styles.forecastDetail}>
          <Text style={[styles.forecastLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Forecast</Text>
          <Text style={[styles.forecastValue, { color: '#3B82F6' }]}>{quarter.forecast}</Text>
        </View>
        <View style={styles.forecastDetail}>
          <Text style={[styles.forecastLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Actual</Text>
          <Text style={[styles.forecastValue, { color: '#10B981' }]}>{quarter.actual}</Text>
        </View>
      </View>
      <View style={styles.accuracyBadge}>
        <CheckCircle2 size={14} color="#10B981" />
        <Text style={[styles.accuracyText, { color: '#10B981' }]}>{quarter.accuracy}% accurate</Text>
      </View>
    </View>
  );

  const renderPracticeCard = (practice: any, index: number) => (
    <View key={index} style={[styles.practiceCard, { backgroundColor: 'rgba(139, 92, 246, 0.08)', borderColor: 'rgba(139, 92, 246, 0.3)' }]}>
      <Text style={[styles.practiceName, { color: '#FFFFFF' }]}>{practice.practice}</Text>
      <View style={styles.practiceMetrics}>
        <View style={styles.practiceMetric}>
          <Text style={[styles.practiceRevenue, { color: '#8B5CF6' }]}>{practice.revenue}</Text>
          <View style={styles.growthBadge}>
            <ArrowUpRight size={12} color="#10B981" />
            <Text style={[styles.growthText, { color: '#10B981' }]}>{practice.growth}</Text>
          </View>
        </View>
        <View style={styles.practiceMargin}>
          <Text style={[styles.marginLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Margin</Text>
          <Text style={[styles.marginValue, { color: '#FFFFFF' }]}>{practice.margin}%</Text>
        </View>
      </View>
    </View>
  );

  const renderScenarioCard = (scenario: any, index: number) => (
    <View key={index} style={[
      styles.scenarioCard,
      { 
        backgroundColor: scenario.scenario === 'Optimistic' ? 'rgba(16, 185, 129, 0.15)' :
                        scenario.scenario === 'Base Case' ? 'rgba(59, 130, 246, 0.15)' :
                        'rgba(245, 158, 11, 0.15)',
        borderColor: scenario.scenario === 'Optimistic' ? 'rgba(16, 185, 129, 0.4)' :
                     scenario.scenario === 'Base Case' ? 'rgba(59, 130, 246, 0.4)' :
                     'rgba(245, 158, 11, 0.4)'
      }
    ]}>
      <Text style={[styles.scenarioName, { color: '#FFFFFF' }]}>{scenario.scenario}</Text>
      <Text style={[
        styles.scenarioRevenue,
        { color: scenario.scenario === 'Optimistic' ? '#10B981' :
                 scenario.scenario === 'Base Case' ? '#3B82F6' :
                 '#F59E0B' }
      ]}>{scenario.revenue}</Text>
      <View style={styles.probabilityBar}>
        <View style={[
          styles.probabilityFill,
          { 
            width: `${scenario.probability}%`,
            backgroundColor: scenario.scenario === 'Optimistic' ? '#10B981' :
                             scenario.scenario === 'Base Case' ? '#3B82F6' :
                             '#F59E0B'
          }
        ]} />
      </View>
      <Text style={[styles.probabilityText, { color: 'rgba(255, 255, 255, 0.6)' }]}>
        {scenario.probability}% probability
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
          <TrendingUp size={28} color="#10B981" />
        </View>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: '#FFFFFF' }]}>Revenue Forecasting Engine</Text>
          <Text style={[styles.headerSubtitle, { color: 'rgba(255, 255, 255, 0.6)' }]}>
            Pipeline Intelligence • Forecast Accuracy • Margin Optimization
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Revenue Pipeline */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Revenue Pipeline</Text>
            <View style={styles.pipelineTotal}>
              <DollarSign size={16} color="#10B981" />
              <Text style={[styles.pipelineTotalText, { color: '#10B981' }]}>{pipeline.totalValue}</Text>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pipelineScroll}>
            {pipeline.stages.map((stage, index) => renderPipelineCard(stage, index))}
          </ScrollView>
        </View>

        {/* Forecast Accuracy */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Forecast Accuracy</Text>
          
          <View style={[styles.accuracyOverview, { backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
            <View style={styles.accuracyMain}>
              <Text style={[styles.accuracyScore, { color: '#10B981' }]}>{forecastAccuracy.overall}%</Text>
              <Text style={[styles.accuracyLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Overall Accuracy</Text>
            </View>
            <View style={styles.accuracyTrend}>
              <ArrowUpRight size={20} color="#10B981" />
              <Text style={[styles.accuracyTrendText, { color: '#10B981' }]}>+4% vs last year</Text>
            </View>
          </View>

          <View style={styles.forecastGrid}>
            {forecastAccuracy.byQuarter.map((quarter, index) => renderForecastCard(quarter, index))}
          </View>

          <View style={[styles.practiceAccuracyCard, { backgroundColor: 'rgba(59, 130, 246, 0.08)', borderColor: 'rgba(59, 130, 246, 0.3)' }]}>
            <Text style={[styles.cardSubtitle, { color: '#FFFFFF' }]}>Accuracy by Practice</Text>
            {forecastAccuracy.byPractice.map((item, index) => (
              <View key={index} style={styles.accuracyRow}>
                <Text style={[styles.accuracyPractice, { color: 'rgba(255, 255, 255, 0.8)' }]}>{item.practice}</Text>
                <View style={styles.accuracyBarContainer}>
                  <View style={[styles.accuracyBar, { backgroundColor: 'rgba(59, 130, 246, 0.2)' }]}>
                    <View style={[styles.accuracyBarFill, { backgroundColor: '#3B82F6', width: `${item.accuracy}%` }]} />
                  </View>
                  <Text style={[styles.accuracyBarText, { color: '#3B82F6' }]}>{item.accuracy}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Practice Revenue */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Practice Revenue</Text>
          
          <View style={styles.practicesGrid}>
            {practiceRevenue.byPractice.map((practice, index) => renderPracticeCard(practice, index))}
          </View>

          <View style={[styles.regionalRevenueCard, { backgroundColor: 'rgba(139, 92, 246, 0.08)', borderColor: 'rgba(139, 92, 246, 0.3)' }]}>
            <Text style={[styles.cardSubtitle, { color: '#FFFFFF' }]}>Revenue by Region</Text>
            {practiceRevenue.byRegion.map((item, index) => (
              <View key={index} style={styles.regionalRow}>
                <Text style={[styles.regionalName, { color: 'rgba(255, 255, 255, 0.8)' }]}>{item.region}</Text>
                <View style={styles.regionalMetrics}>
                  <Text style={[styles.regionalRevenue, { color: '#8B5CF6' }]}>{item.revenue}</Text>
                  <View style={styles.growthBadge}>
                    <ArrowUpRight size={12} color="#10B981" />
                    <Text style={[styles.growthText, { color: '#10B981' }]}>{item.growth}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Margin Performance */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Margin Performance</Text>
          
          <View style={[styles.marginOverview, { backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
            <View style={styles.marginMain}>
              <Text style={[styles.marginScore, { color: '#10B981' }]}>{marginPerformance.overall}%</Text>
              <Text style={[styles.marginLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Current Margin</Text>
            </View>
            <View style={styles.marginTarget}>
              <Target size={20} color="#3B82F6" />
              <Text style={[styles.marginTargetText, { color: '#3B82F6' }]}>Target: {marginPerformance.target}%</Text>
            </View>
          </View>

          <View style={[styles.marginByPracticeCard, { backgroundColor: 'rgba(245, 158, 11, 0.08)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}>
            <Text style={[styles.cardSubtitle, { color: '#FFFFFF' }]}>Margin by Practice</Text>
            {marginPerformance.byPractice.map((item, index) => (
              <View key={index} style={styles.marginRow}>
                <Text style={[styles.marginPractice, { color: 'rgba(255, 255, 255, 0.8)' }]}>{item.practice}</Text>
                <View style={styles.marginBars}>
                  <View style={styles.marginBarContainer}>
                    <Text style={[styles.marginBarLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Current</Text>
                    <View style={[styles.marginBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <View style={[styles.marginBarFill, { backgroundColor: '#10B981', width: `${item.current}%` }]} />
                    </View>
                    <Text style={[styles.marginBarValue, { color: '#10B981' }]}>{item.current}%</Text>
                  </View>
                  <View style={styles.marginBarContainer}>
                    <Text style={[styles.marginBarLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Target</Text>
                    <View style={[styles.marginBar, { backgroundColor: 'rgba(59, 130, 246, 0.2)' }]}>
                      <View style={[styles.marginBarFill, { backgroundColor: '#3B82F6', width: `${item.target}%` }]} />
                    </View>
                    <Text style={[styles.marginBarValue, { color: '#3B82F6' }]}>{item.target}%</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={[styles.improvementCard, { backgroundColor: 'rgba(59, 130, 246, 0.08)', borderColor: 'rgba(59, 130, 246, 0.3)' }]}>
            <Text style={[styles.cardSubtitle, { color: '#FFFFFF' }]}>Improvement Opportunities</Text>
            {marginPerformance.improvementOpportunities.map((item, index) => (
              <View key={index} style={styles.improvementRow}>
                <Zap size={16} color="#F59E0B" />
                <Text style={[styles.improvementArea, { color: 'rgba(255, 255, 255, 0.8)' }]}>{item.area}</Text>
                <View style={styles.improvementBadge}>
                  <Text style={[styles.improvementPotential, { color: '#10B981' }]}>+{item.potential}</Text>
                  <Text style={[styles.improvementEffort, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                    ({item.effort})
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Future Demand */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Future Demand</Text>
          
          <View style={styles.demandSummary}>
            <View style={[styles.demandCard, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
              <Calendar size={24} color="#10B981" />
              <Text style={[styles.demandLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Next Quarter</Text>
              <Text style={[styles.demandValue, { color: '#10B981' }]}>{futureDemand.nextQuarter}</Text>
            </View>
            <View style={[styles.demandCard, { backgroundColor: 'rgba(139, 92, 246, 0.15)' }]}>
              <TrendingUp size={24} color="#8B5CF6" />
              <Text style={[styles.demandLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Next Year</Text>
              <Text style={[styles.demandValue, { color: '#8B5CF6' }]}>{futureDemand.nextYear}</Text>
            </View>
          </View>

          <View style={[styles.industryDemandCard, { backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
            <Text style={[styles.cardSubtitle, { color: '#FFFFFF' }]}>Demand by Industry</Text>
            {futureDemand.byIndustry.map((item, index) => (
              <View key={index} style={styles.industryRow}>
                <Text style={[styles.industryName, { color: 'rgba(255, 255, 255, 0.8)' }]}>{item.industry}</Text>
                <View style={styles.industryMetrics}>
                  <Text style={[styles.industryDemand, { color: '#10B981' }]}>{item.demand}</Text>
                  <View style={styles.growthBadge}>
                    <ArrowUpRight size={12} color="#10B981" />
                    <Text style={[styles.growthText, { color: '#10B981' }]}>{item.growth}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={[styles.cardSubtitle, { color: '#FFFFFF' }]}>Scenario Planning</Text>
            <View style={styles.scenariosGrid}>
              {futureDemand.scenarioPlanning.map((scenario, index) => renderScenarioCard(scenario, index))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050B14',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16, 185, 129, 0.3)',
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pipelineTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  pipelineTotalText: {
    fontSize: 14,
    fontWeight: '600',
  },
  pipelineScroll: {
    flexDirection: 'row',
  },
  pipelineCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
    minWidth: 140,
  },
  pipelineStage: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  pipelineMetrics: {
    gap: 8,
    marginBottom: 12,
  },
  pipelineMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pipelineMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  conversionRate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  conversionText: {
    fontSize: 11,
  },
  accuracyOverview: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  accuracyMain: {
    alignItems: 'center',
  },
  accuracyScore: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  accuracyLabel: {
    fontSize: 12,
  },
  accuracyTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  accuracyTrendText: {
    fontSize: 14,
    fontWeight: '600',
  },
  forecastGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  forecastCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  forecastQuarter: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  forecastDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  forecastDetail: {
    alignItems: 'center',
  },
  forecastLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  forecastValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  accuracyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  accuracyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  practiceAccuracyCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  accuracyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  accuracyPractice: {
    fontSize: 14,
    width: '35%',
  },
  accuracyBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accuracyBar: {
    height: 8,
    borderRadius: 4,
    flex: 1,
    overflow: 'hidden',
  },
  accuracyBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  accuracyBarText: {
    fontSize: 13,
    fontWeight: '600',
    width: 40,
  },
  practicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  practiceCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  practiceName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  practiceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  practiceMetric: {
    alignItems: 'flex-start',
  },
  practiceRevenue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  growthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  practiceMargin: {
    alignItems: 'flex-end',
  },
  marginLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  marginValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  regionalRevenueCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  regionalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  regionalName: {
    fontSize: 14,
    width: '35%',
  },
  regionalMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  regionalRevenue: {
    fontSize: 14,
    fontWeight: '600',
  },
  marginOverview: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  marginMain: {
    alignItems: 'center',
  },
  marginScore: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  marginLabel: {
    fontSize: 12,
  },
  marginTarget: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  marginTargetText: {
    fontSize: 14,
    fontWeight: '600',
  },
  marginByPracticeCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  marginRow: {
    marginBottom: 16,
  },
  marginPractice: {
    fontSize: 14,
    marginBottom: 8,
  },
  marginBars: {
    gap: 8,
  },
  marginBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  marginBarLabel: {
    fontSize: 11,
    width: 50,
  },
  marginBar: {
    height: 8,
    borderRadius: 4,
    flex: 1,
    overflow: 'hidden',
  },
  marginBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  marginBarValue: {
    fontSize: 13,
    fontWeight: '600',
    width: 40,
  },
  improvementCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  improvementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    gap: 12,
  },
  improvementArea: {
    fontSize: 14,
    flex: 1,
  },
  improvementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  improvementPotential: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  improvementEffort: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  demandSummary: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  demandCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  demandLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  demandValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  industryDemandCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  industryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  industryName: {
    fontSize: 14,
    width: '40%',
  },
  industryMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  industryDemand: {
    fontSize: 14,
    fontWeight: '600',
  },
  scenariosGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  scenarioCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  scenarioName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  scenarioRevenue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  probabilityBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 8,
  },
  probabilityFill: {
    height: '100%',
    borderRadius: 4,
  },
  probabilityText: {
    fontSize: 12,
  },
});
