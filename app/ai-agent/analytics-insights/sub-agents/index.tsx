import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, BarChart3, LineChart, PieChart, Database, TrendingUp, ArrowRight, Users, Sparkles, Shield, Zap, Target, FileText, Calculator, Search, Filter, Settings, Globe, Workflow, Network, Server } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function AnalyticsInsightsSubAgentsIndex() {
  const { theme } = useTheme();
  const router = useRouter();

  const enterpriseAgents = [
    'analytics-intelligence-hub', 'data-analytics-engine', 'business-intelligence-platform',
    'predictive-analytics-system', 'performance-metrics-hub', 'reporting-automation-center',
    'insights-generation-engine', 'data-warehouse-orchestrator', 'real-time-analytics-platform',
    'advanced-analytics-suite', 'strategic-analytics-advisor', 'data-governance-manager',
    'analytics-operations-center', 'data-quality-assurance', 'analytics-security-guardian'
  ];

  const agents = [
    // STRATEGIC AGENTS (15)
    { id: 'analytics-intelligence-hub', name: 'Analytics Intelligence Hub', icon: BarChart3, enterprise: true },
    { id: 'data-analytics-engine', name: 'Data Analytics Engine', icon: Database, enterprise: true },
    { id: 'business-intelligence-platform', name: 'Business Intelligence Platform', icon: LineChart, enterprise: true },
    { id: 'predictive-analytics-system', name: 'Predictive Analytics System', icon: TrendingUp, enterprise: true },
    { id: 'performance-metrics-hub', name: 'Performance Metrics Hub', icon: Target, enterprise: true },
    { id: 'reporting-automation-center', name: 'Reporting Automation Center', icon: FileText, enterprise: true },
    { id: 'insights-generation-engine', name: 'Insights Generation Engine', icon: Sparkles, enterprise: true },
    { id: 'data-warehouse-orchestrator', name: 'Data Warehouse Orchestrator', icon: Server, enterprise: true },
    { id: 'real-time-analytics-platform', name: 'Real-Time Analytics Platform', icon: Activity, enterprise: true },
    { id: 'advanced-analytics-suite', name: 'Advanced Analytics Suite', icon: Calculator, enterprise: true },
    { id: 'strategic-analytics-advisor', name: 'Strategic Analytics Advisor', icon: Globe, enterprise: true },
    { id: 'data-governance-manager', name: 'Data Governance Manager', icon: Shield, enterprise: true },
    { id: 'analytics-operations-center', name: 'Analytics Operations Center', icon: Workflow, enterprise: true },
    { id: 'data-quality-assurance', name: 'Data Quality Assurance', icon: Settings, enterprise: true },
    { id: 'analytics-security-guardian', name: 'Analytics Security Guardian', icon: Shield, enterprise: true },

    // DATA ANALYTICS (18 agents)
    { id: 'data-pipeline-orchestrator', name: 'Data Pipeline Orchestrator', icon: Workflow, enterprise: false },
    { id: 'data-transformation-engine', name: 'Data Transformation Engine', icon: Database, enterprise: false },
    { id: 'data-aggregation-hub', name: 'Data Aggregation Hub', icon: Network, enterprise: false },
    { id: 'data-cleaning-specialist', name: 'Data Cleaning Specialist', icon: Filter, enterprise: false },
    { id: 'data-validation-automator', name: 'Data Validation Automator', icon: Shield, enterprise: false },
    { id: 'data-enrichment-engine', name: 'Data Enrichment Engine', icon: Sparkles, enterprise: false },
    { id: 'data-integration-platform', name: 'Data Integration Platform', icon: Server, enterprise: false },
    { id: 'data-synchronization-agent', name: 'Data Synchronization Agent', icon: Activity, enterprise: false },
    { id: 'data-migration-specialist', name: 'Data Migration Specialist', icon: Database, enterprise: false },
    { id: 'data-archiving-manager', name: 'Data Archiving Manager', icon: Server, enterprise: false },
    { id: 'data-retention-optimizer', name: 'Data Retention Optimizer', icon: Settings, enterprise: false },
    { id: 'data-profiler-analyzer', name: 'Data Profiler Analyzer', icon: Search, enterprise: false },
    { id: 'data-catalog-manager', name: 'Data Catalog Manager', icon: FileText, enterprise: false },
    { id: 'data-lineage-tracker', name: 'Data Lineage Tracker', icon: Workflow, enterprise: false },
    { id: 'data-version-controller', name: 'Data Version Controller', icon: GitBranch, enterprise: false },
    { id: 'data-audit-logger', name: 'Data Audit Logger', icon: Shield, enterprise: false },
    { id: 'data-compliance-checker', name: 'Data Compliance Checker', icon: Shield, enterprise: false },
    { id: 'data-privacy-guardian', name: 'Data Privacy Guardian', icon: Lock, enterprise: false },

    // BUSINESS INTELLIGENCE (17 agents)
    { id: 'bi-dashboard-creator', name: 'BI Dashboard Creator', icon: BarChart3, enterprise: false },
    { id: 'bi-report-generator', name: 'BI Report Generator', icon: FileText, enterprise: false },
    { id: 'bi-visualization-architect', name: 'BI Visualization Architect', icon: PieChart, enterprise: false },
    { id: 'bi-kpi-tracker', name: 'BI KPI Tracker', icon: Target, enterprise: false },
    { id: 'bi-scorecard-manager', name: 'BI Scorecard Manager', icon: FileText, enterprise: false },
    { id: 'bi-metric-calculator', name: 'BI Metric Calculator', icon: Calculator, enterprise: false },
    { id: 'bi-trend-analyzer', name: 'BI Trend Analyzer', icon: TrendingUp, enterprise: false },
    { id: 'bi-comparator-engine', name: 'BI Comparator Engine', icon: Activity, enterprise: false },
    { id: 'bi-drill-down-specialist', name: 'BI Drill Down Specialist', icon: Search, enterprise: false },
    { id: 'bi-filter-optimizer', name: 'BI Filter Optimizer', icon: Filter, enterprise: false },
    { id: 'bi-slice-dicer', name: 'BI Slice Dicer', icon: Layers, enterprise: false },
    { id: 'bi-aggregation-engine', name: 'BI Aggregation Engine', icon: Database, enterprise: false },
    { id: 'bi-forecasting-model', name: 'BI Forecasting Model', icon: TrendingUp, enterprise: false },
    { id: 'bi-scenario-planner', name: 'BI Scenario Planner', icon: Globe, enterprise: false },
    { id: 'bi-what-if-analyzer', name: 'BI What-If Analyzer', icon: Calculator, enterprise: false },
    { id: 'bi-performance-tracker', name: 'BI Performance Tracker', icon: Target, enterprise: false },
    { id: 'bi-alert-manager', name: 'BI Alert Manager', icon: Bell, enterprise: false },

    // PREDICTIVE ANALYTICS (18 agents)
    { id: 'predictive-model-builder', name: 'Predictive Model Builder', icon: Calculator, enterprise: false },
    { id: 'machine-learning-orchestrator', name: 'Machine Learning Orchestrator', icon: Cpu, enterprise: false },
    { id: 'forecasting-engine', name: 'Forecasting Engine', icon: TrendingUp, enterprise: false },
    { id: 'time-series-analyzer', name: 'Time Series Analyzer', icon: LineChart, enterprise: false },
    { id: 'regression-analyst', name: 'Regression Analyst', icon: Calculator, enterprise: false },
    { id: 'classification-engine', name: 'Classification Engine', icon: Database, enterprise: false },
    { id: 'clustering-specialist', name: 'Clustering Specialist', icon: Network, enterprise: false },
    { id: 'anomaly-detector', name: 'Anomaly Detector', icon: Shield, enterprise: false },
    { id: 'pattern-recognizer', name: 'Pattern Recognizer', icon: Search, enterprise: false },
    { id: 'sentiment-analyzer', name: 'Sentiment Analyzer', icon: Sparkles, enterprise: false },
    { id: 'churn-predictor', name: 'Churn Predictor', icon: TrendingDown, enterprise: false },
    { id: 'revenue-forecaster', name: 'Revenue Forecaster', icon: TrendingUp, enterprise: false },
    { id: 'demand-predictor', name: 'Demand Predictor', icon: LineChart, enterprise: false },
    { id: 'risk-assessment-engine', name: 'Risk Assessment Engine', icon: Shield, enterprise: false },
    { id: 'probability-calculator', name: 'Probability Calculator', icon: Calculator, enterprise: false },
    { id: 'simulation-modeler', name: 'Simulation Modeler', icon: Activity, enterprise: false },
    { id: 'optimization-engine', name: 'Optimization Engine', icon: Zap, enterprise: false },
    { id: 'recommendation-system', name: 'Recommendation System', icon: Sparkles, enterprise: false },

    // PERFORMANCE METRICS (17 agents)
    { id: 'kpi-definition-manager', name: 'KPI Definition Manager', icon: Target, enterprise: false },
    { id: 'metric-calculator-engine', name: 'Metric Calculator Engine', icon: Calculator, enterprise: false },
    { id: 'performance-tracker', name: 'Performance Tracker', icon: Activity, enterprise: false },
    { id: 'benchmark-analyzer', name: 'Benchmark Analyzer', icon: BarChart3, enterprise: false },
    { id: 'goal-progress-monitor', name: 'Goal Progress Monitor', icon: Target, enterprise: false },
    { id: 'achievement-tracker', name: 'Achievement Tracker', icon: Trophy, enterprise: false },
    { id: 'efficiency-calculator', name: 'Efficiency Calculator', icon: Calculator, enterprise: false },
    { id: 'productivity-analyzer', name: 'Productivity Analyzer', icon: TrendingUp, enterprise: false },
    { id: 'quality-metrics-engine', name: 'Quality Metrics Engine', icon: Shield, enterprise: false },
    { id: 'cost-performance-tracker', name: 'Cost Performance Tracker', icon: DollarSign, enterprise: false },
    { id: 'roi-calculator', name: 'ROI Calculator', icon: Calculator, enterprise: false },
    { id: ' utilization-metrics', name: 'Utilization Metrics', icon: Activity, enterprise: false },
    { id: 'capacity-planner', name: 'Capacity Planner', icon: Server, enterprise: false },
    { id: 'throughput-monitor', name: 'Throughput Monitor', icon: Activity, enterprise: false },
    { id: 'latency-tracker', name: 'Latency Tracker', icon: Clock, enterprise: false },
    { id: 'availability-monitor', name: 'Availability Monitor', icon: Activity, enterprise: false },
    { id: 'reliability-scorer', name: 'Reliability Scorer', icon: Shield, enterprise: false },

    // REPORTING AUTOMATION (17 agents)
    { id: 'report-scheduler', name: 'Report Scheduler', icon: Clock, enterprise: false },
    { id: 'report-distributor', name: 'Report Distributor', icon: Send, enterprise: false },
    { id: 'report-template-manager', name: 'Report Template Manager', icon: FileText, enterprise: false },
    { id: 'report-format-engine', name: 'Report Format Engine', icon: FileText, enterprise: false },
    { id: 'automated-report-generator', name: 'Automated Report Generator', icon: FileText, enterprise: false },
    { id: 'real-time-reporter', name: 'Real-Time Reporter', icon: Activity, enterprise: false },
    { id: 'scheduled-report-runner', name: 'Scheduled Report Runner', icon: Clock, enterprise: false },
    { id: 'on-demand-reporter', name: 'On-Demand Reporter', icon: Zap, enterprise: false },
    { id: 'batch-report-processor', name: 'Batch Report Processor', icon: Server, enterprise: false },
    { id: 'report-version-controller', name: 'Report Version Controller', icon: GitBranch, enterprise: false },
    { id: 'report-approval-workflow', name: 'Report Approval Workflow', icon: Workflow, enterprise: false },
    { id: 'report-delivery-manager', name: 'Report Delivery Manager', icon: Send, enterprise: false },
    { id: 'report-subscription-manager', name: 'Report Subscription Manager', icon: Users, enterprise: false },
    { id: 'report-archive-manager', name: 'Report Archive Manager', icon: Archive, enterprise: false },
    { id: 'compliance-reporter', name: 'Compliance Reporter', icon: Shield, enterprise: false },
    { id: 'audit-report-generator', name: 'Audit Report Generator', icon: FileText, enterprise: false },
    { id: 'executive-summary-creator', name: 'Executive Summary Creator', icon: FileText, enterprise: false },

    // INSIGHTS GENERATION (18 agents)
    { id: 'insight-discovery-engine', name: 'Insight Discovery Engine', icon: Sparkles, enterprise: false },
    { id: 'pattern-matcher', name: 'Pattern Matcher', icon: Search, enterprise: false },
    { id: 'correlation-analyzer', name: 'Correlation Analyzer', icon: Activity, enterprise: false },
    { id: 'causality-detector', name: 'Causality Detector', icon: Target, enterprise: false },
    { id: 'trend-identifier', name: 'Trend Identifier', icon: TrendingUp, enterprise: false },
    { id: 'opportunity-finder', name: 'Opportunity Finder', icon: Sparkles, enterprise: false },
    { id: 'risk-identifier', name: 'Risk Identifier', icon: Shield, enterprise: false },
    { id: 'root-cause-analyzer', name: 'Root Cause Analyzer', icon: Search, enterprise: false },
    { id: 'impact-analyzer', name: 'Impact Analyzer', icon: Target, enterprise: false },
    { id: 'scenario-simulator', name: 'Scenario Simulator', icon: Activity, enterprise: false },
    { id: 'recommendation-engine', name: 'Recommendation Engine', icon: Sparkles, enterprise: false },
    { id: 'insight-prioritizer', name: 'Insight Prioritizer', icon: Target, enterprise: false },
    { id: 'actionable-insight-generator', name: 'Actionable Insight Generator', icon: Zap, enterprise: false },
    { id: 'narrative-builder', name: 'Narrative Builder', icon: FileText, enterprise: false },
    { id: 'story-teller', name: 'Story Teller', icon: FileText, enterprise: false },
    { id: 'visualization-recommender', name: 'Visualization Recommender', icon: PieChart, enterprise: false },
    { id: 'data-story-creator', name: 'Data Story Creator', icon: FileText, enterprise: false },
    { id: 'executive-insight-generator', name: 'Executive Insight Generator', icon: Sparkles, enterprise: false },
  ];

  const categories = {
    'Strategic Agents': agents.slice(0, 15),
    'Data Analytics': agents.slice(15, 33),
    'Business Intelligence': agents.slice(33, 50),
    'Predictive Analytics': agents.slice(50, 68),
    'Performance Metrics': agents.slice(68, 85),
    'Reporting Automation': agents.slice(85, 102),
    'Insights Generation': agents.slice(102, 120),
  };

  const handleAgentPress = (agentId) => {
    router.push(`/ai-agent/analytics-insights/sub-agents/${agentId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics and Insights Sub-Agents</Text>
        <Text style={styles.subtitle}>120 Specialized Analytics Intelligence Agents</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {Object.entries(categories).map(([category, categoryAgents]) => (
          <View key={category} style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <Text style={styles.categoryCount}>{categoryAgents.length} agents</Text>
            </View>
            
            <View style={styles.agentGrid}>
              {categoryAgents.map((agent) => (
                <TouchableOpacity
                  key={agent.id}
                  style={[
                    styles.agentCard,
                    agent.enterprise && styles.enterpriseCard,
                    { borderLeftColor: agent.enterprise ? '#10B981' : '#6366F1' }
                  ]}
                  onPress={() => handleAgentPress(agent.id)}
                >
                  <agent.icon size={24} color={agent.enterprise ? '#10B981' : '#6366F1'} />
                  <Text style={styles.agentName} numberOfLines={2}>
                    {agent.name}
                  </Text>
                  {agent.enterprise && (
                    <View style={styles.enterpriseBadge}>
                      <Text style={styles.enterpriseBadgeText}>Enterprise</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  categoryCount: {
    fontSize: 14,
    color: '#94A3B8',
  },
  agentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  agentCard: {
    width: '48%',
    backgroundColor: '#1E293B',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    marginBottom: 8,
  },
  enterpriseCard: {
    backgroundColor: '#1E293B',
  },
  agentName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 8,
    lineHeight: 16,
  },
  enterpriseBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#10B981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 8,
  },
  enterpriseBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
