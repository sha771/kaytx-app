import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Eye } from 'lucide-react-native';

export default function CustomerInsightsAnalystPage() {
  const agent = {
    id: 'customer-insights-analyst',
    name: 'AI Customer Insights Analyst',
    title: 'AI Customer Insights Analyst',
    description: 'The AI Customer Insights Analyst analyzes customer behavior, generates insights, identifies patterns, and provides actionable recommendations for improving customer experience.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Customer Analytics","Behavior Analysis","Insight Generation","Segmentation","Journey Analysis","Predictive Analytics","Reporting"],
    icon: Eye,
    color: '#00897B',
    type: 'employee' as const,
    humanCost: '$95k/year',
    aiCost: '$2.5k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'customer-insights-analyst',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7,700',
      tasksAutomatedDaily: 500,
      responseTime: '1.6s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'E-Commerce',
      level: 'specialist',
      reportsTo: 'vp-customer-experience',
      manages: [],
    },
    specializedCapabilities: [
      'Customer Analytics',
      'Behavior Analysis',
      'Insight Generation',
      'Segmentation',
      'Journey Analysis',
      'Predictive Analytics',
      'Customer Profiling',
      'Pattern Recognition',
      'Data Visualization',
      'Strategic Planning'
    ],
    integrationOptions: [
      'Analytics Platforms',
      'Customer Data Platforms',
      'BI Tools',
      'Data Warehouses',
      'Behavioral Tracking',
      'Survey Tools',
      'Reporting Platforms',
      'Machine Learning'
    ],
    automationFeatures: [
      'Customer Analytics',
      'Behavior Tracking',
      'Insight Generation',
      'Segmentation',
      'Journey Analysis',
      'Predictive Modeling',
      'Data Visualization',
      'Report Generation'
    ],
    kpiMetrics: [
      'Insight Quality',
      'Analysis Accuracy',
      'Segmentation Effectiveness',
      'Prediction Accuracy',
      'Report Timeliness',
      'Actionability',
      'Data Quality',
      'Stakeholder Satisfaction'
    ],
    customOptions: {
      analyticalDepth: 'deep',
      insightLevel: 'actionable',
      dataDriven: 'true',
      customerFocus: 'high',
      automationLevel: 'high'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: false,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: true,
      sentimentAnalysis: true,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts customer behavior' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects behavior anomalies' },
      { id: 'insight', enabled: true, name: 'Insight Generator', description: 'Generates customer insights' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'cia_1', name: 'Customer Analytics', category: 'Analytics', description: 'Analyze customer data', level: 'expert' },
      { id: 'cia_2', name: 'Behavior Analysis', category: 'Behavior', description: 'Analyze customer behavior', level: 'expert' },
      { id: 'cia_3', name: 'Insight Generation', category: 'Insights', description: 'Generate customer insights', level: 'expert' },
      { id: 'cia_4', name: 'Segmentation', category: 'Segmentation', description: 'Segment customers', level: 'expert' },
      { id: 'cia_5', name: 'Predictive Analytics', category: 'Predictive', description: 'Predict customer behavior', level: 'advanced' }
    ],
    personality: [
      { trait: 'Analytical', value: 10, description: 'Highly analytical mindset' },
      { trait: 'Customer Focus', value: 10, description: 'Customer-centric analysis' },
      { trait: 'Insightful', value: 9, description: 'Generates valuable insights' },
      { trait: 'Data Driven', value: 9, description: 'Data-driven approach' },
      { trait: 'Curious', value: 9, description: 'Curious about patterns' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
