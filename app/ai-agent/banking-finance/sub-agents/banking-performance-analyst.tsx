import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function BankingPerformanceAnalystPage() {
  const agent = {
    id: 'banking-performance-analyst',
    name: 'AI Banking Performance Analyst',
    title: 'AI Banking Performance Analyst',
    description: 'The AI Banking Performance Analyst monitors and analyzes banking performance metrics, KPIs, operational efficiency, and provides insights for continuous improvement.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Performance Analytics","KPI Tracking","Operational Analysis","Reporting","Data Visualization","Trend Analysis","Insight Generation"],
    icon: BarChart3,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$95k/year',
    aiCost: '$2.5k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'banking-performance-analyst',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7,700',
      tasksAutomatedDaily: 520,
      responseTime: '1.6s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Banking & Finance',
      level: 'specialist',
      reportsTo: 'chief-banking-officer',
      manages: [],
    },
    specializedCapabilities: [
      'Performance Analytics',
      'KPI Tracking',
      'Operational Analysis',
      'Reporting',
      'Data Visualization',
      'Trend Analysis',
      'Insight Generation',
      'Benchmarking',
      'Performance Optimization',
      'Metric Development'
    ],
    integrationOptions: [
      'Analytics Platforms',
      'BI Tools',
      'Data Warehouses',
      'Reporting Systems',
      'KPI Dashboards',
      'Performance Monitoring Tools',
      'Data Visualization Platforms',
      'Collaboration Systems'
    ],
    automationFeatures: [
      'KPI Tracking',
      'Performance Monitoring',
      'Report Generation',
      'Data Visualization',
      'Trend Analysis',
      'Benchmarking',
      'Alert Generation',
      'Insight Delivery'
    ],
    kpiMetrics: [
      'Report Accuracy',
      'Insight Quality',
      'Analysis Timeliness',
      'KPI Coverage',
      'Performance Improvement Impact',
      'Data Quality',
      'Visualization Effectiveness',
      'Stakeholder Satisfaction'
    ],
    customOptions: {
      analyticalDepth: 'deep',
      reportingFrequency: 'daily',
      visualizationQuality: 'high',
      insightLevel: 'actionable',
      automationLevel: 'high'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: false,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: true,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts performance trends' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects performance anomalies' },
      { id: 'insight', enabled: true, name: 'Insight Generator', description: 'Generates actionable insights' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'perf_1', name: 'Performance Analytics', category: 'Analytics', description: 'Analyze performance metrics', level: 'expert' },
      { id: 'perf_2', name: 'KPI Tracking', category: 'Metrics', description: 'Track key performance indicators', level: 'expert' },
      { id: 'perf_3', name: 'Data Visualization', category: 'Visualization', description: 'Create visual reports', level: 'expert' },
      { id: 'perf_4', name: 'Trend Analysis', category: 'Analysis', description: 'Analyze performance trends', level: 'advanced' },
      { id: 'perf_5', name: 'Insight Generation', category: 'Intelligence', description: 'Generate actionable insights', level: 'expert' }
    ],
    personality: [
      { trait: 'Analytical', value: 10, description: 'Highly analytical mindset' },
      { trait: 'Detail Oriented', value: 10, description: 'Meticulous attention to detail' },
      { trait: 'Data Driven', value: 10, description: 'Data-focused approach' },
      { trait: 'Insightful', value: 9, description: 'Generates valuable insights' },
      { trait: 'Communicative', value: 8, description: 'Clear communication of findings' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
