import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { 
  Users, 
  TrendingUp, 
  Heart, 
  AlertTriangle, 
  Target, 
  Activity, 
  Zap, 
  Clock, 
  Award,
  Brain,
  Shield,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  LineChart,
  GitBranch,
  Layers,
  UserCheck,
  UserX,
  Star,
  Flame
} from 'lucide-react-native';

interface PlayerIntelligenceHubProps {
  data?: any;
}

export default function PlayerIntelligenceHub({ data }: PlayerIntelligenceHubProps) {
  // Player Segments Data
  const playerSegments = [
    { name: 'Whales', count: '1.2M', percentage: 12, revenue: '$2.8B', color: '#A855F7' },
    { name: 'Dolphins', count: '4.8M', percentage: 28, revenue: '$1.9B', color: '#3B82F6' },
    { name: 'Fish', count: '15.2M', percentage: 45, revenue: '$620M', color: '#06B6D4' },
    { name: 'Minnows', count: '48.8M', percentage: 15, revenue: '$85M', color: '#10B981' }
  ];

  // Retention Metrics
  const retentionMetrics = [
    { label: 'Day 1 Retention', value: '68%', change: '+5%', trend: 'up' as const, color: '#10B981' },
    { label: 'Day 7 Retention', value: '42%', change: '+3%', trend: 'up' as const, color: '#10B981' },
    { label: 'Day 30 Retention', value: '24%', change: '+2%', trend: 'up' as const, color: '#10B981' },
    { label: 'Day 90 Retention', value: '12%', change: '-1%', trend: 'down' as const, color: '#EF4444' }
  ];

  // Churn Risk Analysis
  const churnRisk = {
    high: { count: '2.4M', percentage: 2, trend: 'up' },
    medium: { count: '8.7M', percentage: 7.2, trend: 'stable' },
    low: { count: '109M', percentage: 90.8, trend: 'down' }
  };

  // Player Journey Stages
  const playerJourney = [
    { stage: 'Onboarding', players: '15.2M', completion: 85, avgTime: '12m' },
    { stage: 'First Purchase', players: '8.4M', completion: 55, avgTime: '3d' },
    { stage: 'First Win', players: '12.8M', completion: 84, avgTime: '2h' },
    { stage: 'Social Connection', players: '6.2M', completion: 41, avgTime: '5d' },
    { stage: 'Guild Join', players: '3.1M', completion: 20, avgTime: '7d' }
  ];

  // Cohort Analysis
  const cohortData = [
    { cohort: 'Jan', d1: 65, d7: 40, d30: 22, d90: 11 },
    { cohort: 'Feb', d1: 67, d7: 42, d30: 23, d90: 12 },
    { cohort: 'Mar', d1: 68, d7: 43, d30: 24, d90: 13 },
    { cohort: 'Apr', d1: 70, d7: 45, d30: 25, d90: 14 },
    { cohort: 'May', d1: 72, d7: 47, d30: 26, d90: 15 }
  ];

  // Behavioral Intelligence
  const behavioralPatterns = [
    { pattern: 'Peak Playing Hours', value: '7PM - 11PM', change: '+15%', trend: 'up' as const },
    { pattern: 'Avg Session Duration', value: '45m', change: '+8%', trend: 'up' as const },
    { pattern: 'Sessions Per Day', value: '3.2', change: '+5%', trend: 'up' as const },
    { pattern: 'Social Interactions', value: '12/hr', change: '+22%', trend: 'up' as const }
  ];

  const renderSegmentCard = (segment: any, index: number) => (
    <View key={index} style={[styles.segmentCard, { backgroundColor: `${segment.color}10`, borderColor: `${segment.color}30` }]}>
      <View style={styles.segmentHeader}>
        <Text style={[styles.segmentName, { color: '#FFFFFF' }]}>{segment.name}</Text>
        <Text style={[styles.segmentPercentage, { color: segment.color }]}>{segment.percentage}%</Text>
      </View>
      <View style={styles.segmentBar}>
        <View style={[styles.segmentFill, { width: `${segment.percentage}%`, backgroundColor: segment.color }]} />
      </View>
      <View style={styles.segmentMetrics}>
        <View style={styles.segmentMetric}>
          <Users size={14} color="rgba(255, 255, 255, 0.5)" />
          <Text style={[styles.segmentMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{segment.count}</Text>
        </View>
        <View style={styles.segmentMetric}>
          <TrendingUp size={14} color="rgba(255, 255, 255, 0.5)" />
          <Text style={[styles.segmentMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{segment.revenue}</Text>
        </View>
      </View>
    </View>
  );

  const renderRetentionCard = (metric: any, index: number) => (
    <View key={index} style={[styles.retentionCard, { backgroundColor: `${metric.color}10`, borderColor: `${metric.color}30` }]}>
      <Text style={[styles.retentionLabel, { color: 'rgba(255, 255, 255, 0.7)' }]}>{metric.label}</Text>
      <Text style={[styles.retentionValue, { color: '#FFFFFF' }]}>{metric.value}</Text>
      <View style={styles.retentionTrend}>
        {metric.trend === 'up' ? <ArrowUpRight size={14} color="#10B981" /> : <ArrowDownRight size={14} color="#EF4444" />}
        <Text style={[styles.retentionChange, { color: metric.trend === 'up' ? '#10B981' : '#EF4444' }]}>{metric.change}</Text>
      </View>
    </View>
  );

  const renderJourneyStage = (stage: any, index: number) => (
    <View key={index} style={styles.journeyStage}>
      <View style={styles.journeyHeader}>
        <View style={[styles.journeyDot, { backgroundColor: index === 0 ? '#00D4FF' : 'rgba(255, 255, 255, 0.2)' }]} />
        <Text style={[styles.journeyStageName, { color: '#FFFFFF' }]}>{stage.stage}</Text>
      </View>
      <View style={styles.journeyMetrics}>
        <View style={styles.journeyMetric}>
          <Users size={12} color="rgba(255, 255, 255, 0.5)" />
          <Text style={[styles.journeyMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{stage.players}</Text>
        </View>
        <View style={styles.journeyMetric}>
          <Target size={12} color="rgba(255, 255, 255, 0.5)" />
          <Text style={[styles.journeyMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{stage.completion}%</Text>
        </View>
        <View style={styles.journeyMetric}>
          <Clock size={12} color="rgba(255, 255, 255, 0.5)" />
          <Text style={[styles.journeyMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{stage.avgTime}</Text>
        </View>
      </View>
      {index < playerJourney.length - 1 && <View style={styles.journeyConnector} />}
    </View>
  );

  const renderBehavioralCard = (pattern: any, index: number) => (
    <View key={index} style={[styles.behavioralCard, { backgroundColor: 'rgba(0, 212, 255, 0.05)', borderColor: 'rgba(0, 212, 255, 0.2)' }]}>
      <Text style={[styles.behavioralPattern, { color: 'rgba(255, 255, 255, 0.7)' }]}>{pattern.pattern}</Text>
      <Text style={[styles.behavioralValue, { color: '#00D4FF' }]}>{pattern.value}</Text>
      <View style={styles.behavioralTrend}>
        {pattern.trend === 'up' ? <ArrowUpRight size={12} color="#10B981" /> : <ArrowDownRight size={12} color="#EF4444" />}
        <Text style={[styles.behavioralChange, { color: pattern.trend === 'up' ? '#10B981' : '#EF4444' }]}>{pattern.change}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#03050A' }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: 'rgba(0, 212, 255, 0.2)' }]}>
          <Users size={24} color="#00D4FF" />
        </View>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: '#FFFFFF' }]}>Player Intelligence Hub</Text>
          <Text style={[styles.headerSubtitle, { color: 'rgba(255, 255, 255, 0.6)' }]}>
            Behavioral Analytics • Retention Optimization • Churn Prediction
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Player Segments */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Player Segments</Text>
          <View style={styles.segmentsContainer}>
            {playerSegments.map((segment, index) => renderSegmentCard(segment, index))}
          </View>
        </View>

        {/* Retention Metrics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Retention Metrics</Text>
          <View style={styles.retentionGrid}>
            {retentionMetrics.map((metric, index) => renderRetentionCard(metric, index))}
          </View>
        </View>

        {/* Churn Risk Analysis */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Churn Risk Analysis</Text>
          <View style={[styles.churnCard, { backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)' }]}>
            <View style={styles.churnRiskItem}>
              <View style={styles.churnRiskHeader}>
                <AlertTriangle size={20} color="#EF4444" />
                <Text style={[styles.churnRiskLabel, { color: '#FFFFFF' }]}>High Risk</Text>
              </View>
              <Text style={[styles.churnRiskValue, { color: '#EF4444' }]}>{churnRisk.high.count}</Text>
              <Text style={[styles.churnRiskPercentage, { color: 'rgba(255, 255, 255, 0.6)' }]}>{churnRisk.high.percentage}%</Text>
              <View style={[styles.churnTrend, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
                <ArrowUpRight size={12} color="#EF4444" />
                <Text style={[styles.churnTrendText, { color: '#EF4444' }]}>Increasing</Text>
              </View>
            </View>

            <View style={styles.churnRiskItem}>
              <View style={styles.churnRiskHeader}>
                <Shield size={20} color="#F59E0B" />
                <Text style={[styles.churnRiskLabel, { color: '#FFFFFF' }]}>Medium Risk</Text>
              </View>
              <Text style={[styles.churnRiskValue, { color: '#F59E0B' }]}>{churnRisk.medium.count}</Text>
              <Text style={[styles.churnRiskPercentage, { color: 'rgba(255, 255, 255, 0.6)' }]}>{churnRisk.medium.percentage}%</Text>
              <View style={[styles.churnTrend, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                <Activity size={12} color="#F59E0B" />
                <Text style={[styles.churnTrendText, { color: '#F59E0B' }]}>Stable</Text>
              </View>
            </View>

            <View style={styles.churnRiskItem}>
              <View style={styles.churnRiskHeader}>
                <UserCheck size={20} color="#10B981" />
                <Text style={[styles.churnRiskLabel, { color: '#FFFFFF' }]}>Low Risk</Text>
              </View>
              <Text style={[styles.churnRiskValue, { color: '#10B981' }]}>{churnRisk.low.count}</Text>
              <Text style={[styles.churnRiskPercentage, { color: 'rgba(255, 255, 255, 0.6)' }]}>{churnRisk.low.percentage}%</Text>
              <View style={[styles.churnTrend, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <ArrowDownRight size={12} color="#10B981" />
                <Text style={[styles.churnTrendText, { color: '#10B981' }]}>Decreasing</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Player Journey Map */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Player Journey Map</Text>
          <View style={[styles.journeyContainer, { backgroundColor: 'rgba(0, 212, 255, 0.05)', borderColor: 'rgba(0, 212, 255, 0.2)' }]}>
            {playerJourney.map((stage, index) => renderJourneyStage(stage, index))}
          </View>
        </View>

        {/* Cohort Analysis */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Cohort Analysis</Text>
          <View style={[styles.cohortTable, { backgroundColor: 'rgba(0, 212, 255, 0.05)', borderColor: 'rgba(0, 212, 255, 0.2)' }]}>
            <View style={styles.cohortHeader}>
              <Text style={[styles.cohortHeaderText, { color: 'rgba(255, 255, 255, 0.6)' }]}>Cohort</Text>
              <Text style={[styles.cohortHeaderText, { color: 'rgba(255, 255, 255, 0.6)' }]}>Day 1</Text>
              <Text style={[styles.cohortHeaderText, { color: 'rgba(255, 255, 255, 0.6)' }]}>Day 7</Text>
              <Text style={[styles.cohortHeaderText, { color: 'rgba(255, 255, 255, 0.6)' }]}>Day 30</Text>
              <Text style={[styles.cohortHeaderText, { color: 'rgba(255, 255, 255, 0.6)' }]}>Day 90</Text>
            </View>
            {cohortData.map((cohort, index) => (
              <View key={index} style={styles.cohortRow}>
                <Text style={[styles.cohortCell, { color: '#FFFFFF' }]}>{cohort.cohort}</Text>
                <Text style={[styles.cohortCell, { color: '#00D4FF' }]}>{cohort.d1}%</Text>
                <Text style={[styles.cohortCell, { color: '#00D4FF' }]}>{cohort.d7}%</Text>
                <Text style={[styles.cohortCell, { color: '#00D4FF' }]}>{cohort.d30}%</Text>
                <Text style={[styles.cohortCell, { color: '#00D4FF' }]}>{cohort.d90}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Behavioral Intelligence */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Behavioral Intelligence</Text>
          <View style={styles.behavioralGrid}>
            {behavioralPatterns.map((pattern, index) => renderBehavioralCard(pattern, index))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  segmentsContainer: {
    gap: 12,
  },
  segmentCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  segmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  segmentName: {
    fontSize: 16,
    fontWeight: '600',
  },
  segmentPercentage: {
    fontSize: 18,
    fontWeight: '700',
  },
  segmentBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  segmentFill: {
    height: '100%',
    borderRadius: 4,
  },
  segmentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  segmentMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  segmentMetricText: {
    fontSize: 13,
    fontWeight: '500',
  },
  retentionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  retentionCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  retentionLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  retentionValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  retentionTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  retentionChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  churnCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  churnRiskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  churnRiskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 120,
  },
  churnRiskLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  churnRiskValue: {
    fontSize: 18,
    fontWeight: '700',
    width: 80,
  },
  churnRiskPercentage: {
    fontSize: 13,
    width: 50,
  },
  churnTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    marginLeft: 'auto',
  },
  churnTrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  journeyContainer: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  journeyStage: {
    position: 'relative',
    marginBottom: 24,
  },
  journeyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  journeyDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  journeyStageName: {
    fontSize: 16,
    fontWeight: '600',
  },
  journeyMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 28,
  },
  journeyMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  journeyMetricText: {
    fontSize: 12,
  },
  journeyConnector: {
    position: 'absolute',
    left: 7,
    top: 16,
    bottom: -24,
    width: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  cohortTable: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cohortHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 212, 255, 0.2)',
  },
  cohortHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  cohortRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  cohortCell: {
    flex: 1,
    fontSize: 13,
    textAlign: 'center',
  },
  behavioralGrid: {
    gap: 12,
  },
  behavioralCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  behavioralPattern: {
    fontSize: 13,
    flex: 1,
  },
  behavioralValue: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 12,
  },
  behavioralTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  behavioralChange: {
    fontSize: 12,
    fontWeight: '600',
  },
});