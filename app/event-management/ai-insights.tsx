import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Brain, TrendingUp, AlertTriangle, Target, Zap, ArrowRight, Lightbulb,
  DollarSign, Users, Shield, Activity, CheckCircle, Clock
} from 'lucide-react-native';

export default function AIInsightsCenter() {
  const router = useRouter();

  const INSIGHT_CATEGORIES = [
    { category: 'Revenue Optimization', count: 47, icon: DollarSign, color: '#10B981' },
    { category: 'Attendee Experience', count: 34, icon: Users, color: '#06B6D4' },
    { category: 'Risk Mitigation', count: 28, icon: Shield, color: '#F59E0B' },
    { category: 'Operational Efficiency', count: 52, icon: Activity, color: '#8B5CF6' },
  ];

  const AI_INSIGHTS = [
    {
      id: 1,
      type: 'revenue',
      priority: 'high',
      insight: 'VIP ticket demand is projected to increase by 21% before registration closes.',
      impact: '+$2.4M',
      confidence: 94,
      action: 'Increase VIP allocation by 500 tickets',
      time: '2s ago',
      icon: DollarSign,
      color: '#10B981'
    },
    {
      id: 2,
      type: 'sponsorship',
      priority: 'high',
      insight: 'Booth traffic optimization could improve sponsor ROI by 18%.',
      impact: '+$890K',
      confidence: 89,
      action: 'Reconfigure booth layout for main hall',
      time: '5s ago',
      icon: Target,
      color: '#FFD700'
    },
    {
      id: 3,
      type: 'capacity',
      priority: 'medium',
      insight: 'Session capacity should be increased for AI & Innovation keynote.',
      impact: '+1,200 attendees',
      confidence: 96,
      action: 'Move keynote to larger venue',
      time: '12s ago',
      icon: Users,
      color: '#06B6D4'
    },
    {
      id: 4,
      type: 'risk',
      priority: 'high',
      insight: 'Potential congestion detected near Entrance B during peak check-in.',
      impact: '-15% satisfaction',
      confidence: 87,
      action: 'Deploy additional check-in stations',
      time: '24s ago',
      icon: AlertTriangle,
      color: '#F59E0B'
    },
    {
      id: 5,
      type: 'marketing',
      priority: 'medium',
      insight: 'Targeted email campaign could increase registrations by 9%.',
      impact: '+847 registrations',
      confidence: 82,
      action: 'Launch segmented email campaign',
      time: '31s ago',
      icon: Zap,
      color: '#8B5CF6'
    },
    {
      id: 6,
      type: 'operations',
      priority: 'low',
      insight: 'Staffing levels optimal for current event load.',
      impact: 'No action needed',
      confidence: 98,
      action: 'Maintain current staffing',
      time: '45s ago',
      icon: CheckCircle,
      color: '#10B981'
    },
    {
      id: 7,
      type: 'revenue',
      priority: 'medium',
      insight: 'Merchandise sales trending 12% above forecast.',
      impact: '+$340K',
      confidence: 91,
      action: 'Increase merchandise inventory',
      time: '1m ago',
      icon: DollarSign,
      color: '#10B981'
    },
    {
      id: 8,
      type: 'risk',
      priority: 'medium',
      insight: 'Weather forecast indicates 40% chance of rain during outdoor session.',
      impact: 'Potential relocation',
      confidence: 75,
      action: 'Prepare indoor backup venue',
      time: '2m ago',
      icon: Shield,
      color: '#F59E0B'
    },
  ];

  const PREDICTIVE_FORECASTS = [
    { metric: 'VIP Ticket Demand', current: '2,400', projected: '2,904', change: '+21%', confidence: 94, color: '#10B981' },
    { metric: 'Sponsor ROI', current: '3.8x', projected: '4.5x', change: '+18%', confidence: 89, color: '#FFD700' },
    { metric: 'Session Attendance', current: '87%', projected: '92%', change: '+5%', confidence: 96, color: '#06B6D4' },
    { metric: 'Check-in Efficiency', current: '94%', projected: '98%', change: '+4%', confidence: 87, color: '#8B5CF6' },
  ];

  const AI_PERFORMANCE = [
    { metric: 'Insights Generated', value: '847', accuracy: '94%', color: '#06B6D4' },
    { metric: 'Predictions Made', value: '324', accuracy: '89%', color: '#8B5CF6' },
    { metric: 'Actions Taken', value: '287', accuracy: '96%', color: '#10B981' },
    { metric: 'Revenue Impact', value: '+$4.1M', accuracy: 'N/A', color: '#FFD700' },
  ];

  const EXECUTIVE_SUMMARY = [
    { metric: 'Overall Event Health', value: '94%', status: 'excellent', color: '#10B981' },
    { metric: 'Revenue Projection', value: '$7.2B', status: 'on-track', color: '#06B6D4' },
    { metric: 'Risk Level', value: 'Low', status: 'stable', color: '#10B981' },
    { metric: 'AI Confidence', value: '91%', status: 'high', color: '#8B5CF6' },
  ];

  const RISK_ASSESSMENT = [
    { risk: 'Weather Impact', probability: '40%', impact: 'Medium', mitigation: 'Indoor backup ready', color: '#F59E0B' },
    { risk: 'Staffing Shortage', probability: '12%', impact: 'Low', mitigation: 'Contingency staff on standby', color: '#10B981' },
    { risk: 'Technical Failure', probability: '8%', impact: 'High', mitigation: 'Redundant systems active', color: '#10B981' },
    { risk: 'Security Incident', probability: '5%', impact: 'High', mitigation: 'Enhanced security deployed', color: '#10B981' },
  ];

  const OPPORTUNITY_ANALYSIS = [
    { opportunity: 'Upsell Premium Tickets', potential: '+$1.2M', confidence: 87, effort: 'Medium', color: '#10B981' },
    { opportunity: 'Dynamic Pricing', potential: '+$890K', confidence: 82, effort: 'Low', color: '#06B6D4' },
    { opportunity: 'Sponsorship Expansion', potential: '+$2.4M', confidence: 75, effort: 'High', color: '#FFD700' },
    { opportunity: 'Merchandise Bundling', potential: '+$340K', confidence: 91, effort: 'Low', color: '#8B5CF6' },
  ];

  const STRATEGIC_RECOMMENDATIONS = [
    { recommendation: 'Increase VIP ticket allocation by 500', priority: 'high', impact: '+$2.4M', timeline: 'Immediate', color: '#EF4444' },
    { recommendation: 'Reconfigure booth layout for main hall', priority: 'high', impact: '+$890K', timeline: 'Today', color: '#EF4444' },
    { recommendation: 'Deploy additional check-in stations', priority: 'medium', impact: '+15% satisfaction', timeline: 'Tomorrow', color: '#F59E0B' },
    { recommendation: 'Launch segmented email campaign', priority: 'medium', impact: '+847 registrations', timeline: 'This Week', color: '#F59E0B' },
  ];

  const AI_MODEL_METRICS = [
    { model: 'Revenue Prediction', accuracy: '94%', latency: '12ms', predictions: '1,240', color: '#10B981' },
    { model: 'Capacity Forecasting', accuracy: '89%', latency: '8ms', predictions: '890', color: '#06B6D4' },
    { model: 'Risk Assessment', accuracy: '87%', latency: '15ms', predictions: '456', color: '#8B5CF6' },
    { model: 'Attendee Behavior', accuracy: '91%', latency: '10ms', predictions: '2,340', color: '#FFD700' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#06B6D4';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Brain size={48} color="#8B5CF6" />
        </View>
        <View>
          <Text style={styles.headerTitle}>AI Insights Center</Text>
          <Text style={styles.headerSubtitle}>Executive Intelligence & Predictions</Text>
        </View>
      </View>

      {/* Insight Categories */}
      <View style={styles.categoriesContainer}>
        {INSIGHT_CATEGORIES.map((category, index) => (
          <View key={index} style={[styles.categoryCard, { borderColor: category.color + '40' }]}>
            <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
              <category.icon size={24} color={category.color} />
            </View>
            <Text style={styles.categoryCount}>{category.count}</Text>
            <Text style={styles.categoryName}>{category.category}</Text>
          </View>
        ))}
      </View>

      {/* Predictive Forecasts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Predictive Forecasts</Text>
        {PREDICTIVE_FORECASTS.map((forecast, index) => (
          <View key={index} style={styles.forecastCard}>
            <View style={styles.forecastHeader}>
              <Text style={styles.forecastMetric}>{forecast.metric}</Text>
              <View style={[styles.forecastConfidence, { backgroundColor: forecast.color + '20' }]}>
                <Brain size={12} color={forecast.color} />
                <Text style={[styles.forecastConfidenceText, { color: forecast.color }]}>{forecast.confidence}% confidence</Text>
              </View>
            </View>
            <View style={styles.forecastValues}>
              <View style={styles.forecastValue}>
                <Text style={styles.forecastValueLabel}>Current</Text>
                <Text style={styles.forecastValueNumber}>{forecast.current}</Text>
              </View>
              <TrendingUp size={20} color="#10B981" />
              <View style={styles.forecastValue}>
                <Text style={styles.forecastValueLabel}>Projected</Text>
                <Text style={[styles.forecastValueNumber, { color: '#10B981' }]}>{forecast.projected}</Text>
              </View>
            </View>
            <View style={[styles.forecastChange, { backgroundColor: '#10B98120' }]}>
              <TrendingUp size={12} color="#10B981" />
              <Text style={[styles.forecastChangeText, { color: '#10B981' }]}>{forecast.change}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Executive Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Executive Summary</Text>
        <Text style={styles.sectionDescription}>High-level event health and AI confidence metrics</Text>
        <View style={styles.executiveGrid}>
          {EXECUTIVE_SUMMARY.map((exec, index) => (
            <View key={index} style={[styles.executiveCard, { borderColor: exec.color + '40' }]}>
              <Text style={styles.executiveValue}>{exec.value}</Text>
              <Text style={styles.executiveMetric}>{exec.metric}</Text>
              <View style={[styles.executiveStatus, { backgroundColor: exec.color + '20' }]}>
                <CheckCircle size={10} color={exec.color} />
                <Text style={[styles.executiveStatusText, { color: exec.color }]}>{exec.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Risk Assessment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Risk Assessment Dashboard</Text>
        <Text style={styles.sectionDescription}>Real-time risk monitoring and mitigation status</Text>
        {RISK_ASSESSMENT.map((risk, index) => (
          <View key={index} style={styles.riskCard}>
            <View style={styles.riskHeader}>
              <Text style={styles.riskName}>{risk.risk}</Text>
              <View style={[styles.riskProbability, { backgroundColor: risk.color + '20' }]}>
                <Text style={[styles.riskProbabilityText, { color: risk.color }]}>{risk.probability}</Text>
              </View>
            </View>
            <View style={styles.riskDetails}>
              <View style={styles.riskDetail}>
                <Text style={styles.riskDetailLabel}>Impact</Text>
                <Text style={styles.riskDetailValue}>{risk.impact}</Text>
              </View>
              <View style={styles.riskDetail}>
                <Text style={styles.riskDetailLabel}>Mitigation</Text>
                <Text style={styles.riskDetailValue}>{risk.mitigation}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Opportunity Analysis */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Opportunity Analysis</Text>
        <Text style={styles.sectionDescription}>AI-identified revenue and operational opportunities</Text>
        {OPPORTUNITY_ANALYSIS.map((opp, index) => (
          <View key={index} style={styles.opportunityCard}>
            <View style={styles.opportunityHeader}>
              <Text style={styles.opportunityName}>{opp.opportunity}</Text>
              <View style={styles.opportunityPotential}>
                <Text style={styles.opportunityPotentialLabel}>Potential</Text>
                <Text style={[styles.opportunityPotentialValue, { color: opp.color }]}>{opp.potential}</Text>
              </View>
            </View>
            <View style={styles.opportunityDetails}>
              <View style={styles.opportunityDetail}>
                <Text style={styles.opportunityDetailLabel}>Confidence</Text>
                <Text style={styles.opportunityDetailValue}>{opp.confidence}%</Text>
              </View>
              <View style={styles.opportunityDetail}>
                <Text style={styles.opportunityDetailLabel}>Effort</Text>
                <Text style={styles.opportunityDetailValue}>{opp.effort}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Strategic Recommendations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Strategic Recommendations</Text>
        <Text style={styles.sectionDescription}>AI-generated actionable insights for decision makers</Text>
        {STRATEGIC_RECOMMENDATIONS.map((rec, index) => (
          <View key={index} style={[styles.recommendationCard, { borderLeftWidth: 4, borderLeftColor: rec.color }]}>
            <View style={styles.recommendationHeader}>
              <Text style={styles.recommendationText}>{rec.recommendation}</Text>
              <View style={[styles.recommendationPriority, { backgroundColor: rec.color + '20' }]}>
                <Text style={[styles.recommendationPriorityText, { color: rec.color }]}>{rec.priority}</Text>
              </View>
            </View>
            <View style={styles.recommendationDetails}>
              <View style={styles.recommendationDetail}>
                <Text style={styles.recommendationDetailLabel}>Impact</Text>
                <Text style={styles.recommendationDetailValue}>{rec.impact}</Text>
              </View>
              <View style={styles.recommendationDetail}>
                <Text style={styles.recommendationDetailLabel}>Timeline</Text>
                <Text style={styles.recommendationDetailValue}>{rec.timeline}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* AI Model Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Model Performance</Text>
        <Text style={styles.sectionDescription}>Real-time model accuracy and performance metrics</Text>
        {AI_MODEL_METRICS.map((model, index) => (
          <View key={index} style={styles.modelCard}>
            <View style={styles.modelHeader}>
              <Text style={styles.modelName}>{model.model}</Text>
              <View style={[styles.modelAccuracy, { backgroundColor: model.color + '20' }]}>
                <Brain size={12} color={model.color} />
                <Text style={[styles.modelAccuracyText, { color: model.color }]}>{model.accuracy}</Text>
              </View>
            </View>
            <View style={styles.modelMetrics}>
              <View style={styles.modelMetric}>
                <Text style={styles.modelMetricLabel}>Latency</Text>
                <Text style={styles.modelMetricValue}>{model.latency}</Text>
              </View>
              <View style={styles.modelMetric}>
                <Text style={styles.modelMetricLabel}>Predictions</Text>
                <Text style={styles.modelMetricValue}>{model.predictions}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* AI Performance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Performance</Text>
        <View style={styles.performanceGrid}>
          {AI_PERFORMANCE.map((perf, index) => (
            <View key={index} style={[styles.performanceCard, { borderColor: perf.color + '40' }]}>
              <Text style={styles.performanceValue}>{perf.value}</Text>
              <Text style={styles.performanceLabel}>{perf.metric}</Text>
              <View style={[styles.performanceAccuracy, { backgroundColor: perf.color + '20' }]}>
                <CheckCircle size={12} color={perf.color} />
                <Text style={[styles.performanceAccuracyText, { color: perf.color }]}>{perf.accuracy} accuracy</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* AI Insights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI-Generated Insights</Text>
        {AI_INSIGHTS.map((insight) => (
          <View key={insight.id} style={[styles.insightCard, { borderLeftWidth: 4, borderLeftColor: getPriorityColor(insight.priority) }]}>
            <View style={styles.insightHeader}>
              <View style={[styles.insightIcon, { backgroundColor: insight.color + '20' }]}>
                <insight.icon size={20} color={insight.color} />
              </View>
              <View style={styles.insightHeaderLeft}>
                <Text style={styles.insightType}>{insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}</Text>
                <View style={[styles.insightPriority, { backgroundColor: getPriorityColor(insight.priority) + '20' }]}>
                  <Text style={[styles.insightPriorityText, { color: getPriorityColor(insight.priority) }]}>{insight.priority} priority</Text>
                </View>
              </View>
              <View style={styles.insightMeta}>
                <Clock size={12} color="#9CA3AF" />
                <Text style={styles.insightTime}>{insight.time}</Text>
              </View>
            </View>

            <Text style={styles.insightText}>{insight.insight}</Text>

            <View style={styles.insightDetails}>
              <View style={styles.insightDetail}>
                <Target size={14} color="#9CA3AF" />
                <View>
                  <Text style={styles.insightDetailLabel}>Impact</Text>
                  <Text style={[styles.insightDetailValue, { color: insight.color }]}>{insight.impact}</Text>
                </View>
              </View>
              <View style={styles.insightDetail}>
                <Brain size={14} color="#9CA3AF" />
                <View>
                  <Text style={styles.insightDetailLabel}>Confidence</Text>
                  <Text style={styles.insightDetailValue}>{insight.confidence}%</Text>
                </View>
              </View>
            </View>

            <View style={styles.insightActionSection}>
              <Lightbulb size={16} color="#F59E0B" />
              <Text style={styles.insightActionLabel}>Recommended Action:</Text>
            </View>
            <Text style={styles.insightAction}>{insight.action}</Text>

            <TouchableOpacity
              style={[styles.insightButton, { backgroundColor: insight.color }]}
              onPress={() => router.push('/event-management/dashboard')}
            >
              <Text style={styles.insightButtonText}>Take Action</Text>
              <ArrowRight size={18} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#8B5CF615', borderColor: '#8B5CF640' }]}
          >
            <Brain size={24} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Generate Insights</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#10B98115', borderColor: '#10B98140' }]}
          >
            <TrendingUp size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>View Forecasts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#06B6D415', borderColor: '#06B6D440' }]}
          >
            <Target size={24} color="#06B6D4" />
            <Text style={[styles.actionText, { color: '#06B6D4' }]}>Set Alerts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#F59E0B15', borderColor: '#F59E0B40' }]}
          >
            <Zap size={24} color="#F59E0B" />
            <Text style={[styles.actionText, { color: '#F59E0B' }]}>Auto-Execute</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03050A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#8B5CF640',
    gap: 16,
  },
  headerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#8B5CF620',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  categoryName: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  section: {
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  forecastCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  forecastHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  forecastMetric: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  forecastConfidence: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
  },
  forecastConfidenceText: {
    fontSize: 11,
    fontWeight: '600',
  },
  forecastValues: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 12,
  },
  forecastValue: {
    alignItems: 'center',
  },
  forecastValueLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  forecastValueNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  forecastChange: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  forecastChangeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  performanceCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  performanceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  performanceLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  performanceAccuracy: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  performanceAccuracyText: {
    fontSize: 11,
    fontWeight: '600',
  },
  insightCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  insightIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightHeaderLeft: {
    flex: 1,
  },
  insightType: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  insightPriority: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  insightPriorityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  insightMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  insightTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  insightText: {
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 22,
    marginBottom: 12,
  },
  insightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  insightDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  insightDetailLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  insightDetailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  insightActionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  insightActionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F59E0B',
  },
  insightAction: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  insightButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 12,
  },
  insightButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionsSection: {
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: 140,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  executiveGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  executiveCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  executiveValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  executiveMetric: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  executiveStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  executiveStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  riskCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  riskName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  riskProbability: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  riskProbabilityText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  riskDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  riskDetail: {
    alignItems: 'center',
  },
  riskDetailLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  riskDetailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  opportunityCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  opportunityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  opportunityName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  opportunityPotential: {
    alignItems: 'flex-end',
  },
  opportunityPotentialLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  opportunityPotentialValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  opportunityDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  opportunityDetail: {
    alignItems: 'center',
  },
  opportunityDetailLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  opportunityDetailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  recommendationCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  recommendationPriority: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  recommendationPriorityText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  recommendationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  recommendationDetail: {
    alignItems: 'center',
  },
  recommendationDetailLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  recommendationDetailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modelCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  modelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modelName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modelAccuracy: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  modelAccuracyText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  modelMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modelMetric: {
    alignItems: 'center',
  },
  modelMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  modelMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
