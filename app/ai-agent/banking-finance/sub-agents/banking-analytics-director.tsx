import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function BankingAnalyticsDirectorPage() {
  const agent = {
    id: 'banking-analytics-director',
    name: 'AI Banking Analytics Director',
    title: 'AI Banking Analytics Director',
    description: 'The AI Banking Analytics Director leads banking analytics strategy, provides data-driven insights, measures banking performance, and drives strategic decisions through comprehensive analysis of financial data and customer behavior.',
    capabilities: ["Banking Analytics","Data Insights","Performance Measurement","Financial Analytics","Customer Analytics","Risk Analytics","Predictive Analytics","Business Intelligence","Data Strategy","Banking Intelligence"],
    icon: BarChart3,
    color: '#00BCD4',
    type: 'employee' as const,
    humanCost: '$155k/year',
    aiCost: '$5k/year',
    efficiency: '31x efficiency improvement',
    replacesRole: 'banking-analytics-director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12,500',
      tasksAutomatedDaily: 480,
      responseTime: '1.1s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Banking & Finance',
      level: 'director',
      reportsTo: 'chief-banking-officer',
      manages: ['data-analyst', 'performance-manager', 'risk-analyst'],
    },
    specializedCapabilities: [
      'Banking Analytics',
      'Data Insights',
      'Performance Measurement',
      'Financial Analytics',
      'Customer Analytics',
      'Risk Analytics',
      'Predictive Analytics',
      'Business Intelligence'
    ],
    integrationOptions: [
      'Analytics Platforms',
      'Business Intelligence',
      'Data Warehouses',
      'Financial Systems',
      'Risk Management',
      'Customer Analytics',
      'Predictive Tools',
      'Dashboard Systems'
    ],
    automationFeatures: [
      'Banking Analytics',
      'Data Insights',
      'Performance Measurement',
      'Financial Analytics',
      'Customer Analytics',
      'Risk Analytics',
      'Predictive Analytics',
      'Business Intelligence'
    ],
    kpiMetrics: [
      'Analytics Accuracy',
      'Insight Quality',
      'Prediction Success',
      'Performance Metrics',
      'Risk Prediction',
      'Customer Insights',
      'Financial Intelligence',
      'Data Utilization'
    ],
    customOptions: {
      analyticsApproach: 'comprehensive',
      dataFocus: 'financial-centric',
      predictionModel: 'advanced',
      insightDelivery: 'actionable',
      strategyIntegration: 'seamless'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
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
      { id: 'analytics', enabled: true, name: 'Analytics Engine', description: 'Comprehensive banking analytics' },
      { id: 'predict', enabled: true, name: 'Predictive Model', description: 'Predicts banking trends' },
      { id: 'insight', enabled: true, name: 'Insight Generator', description: 'Generates actionable insights' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'bankanalytics_1', name: 'Banking Analytics', category: 'Analytics', description: 'Analyze banking data', level: 'expert' },
      { id: 'bankanalytics_2', name: 'Data Insights', category: 'Insights', description: 'Generate data insights', level: 'expert' },
      { id: 'bankanalytics_3', name: 'Performance Measurement', category: 'Performance', description: 'Measure banking performance', level: 'expert' },
      { id: 'bankanalytics_4', name: 'Risk Analytics', category: 'Risk', description: 'Analyze banking risks', level: 'expert' },
      { id: 'bankanalytics_5', name: 'Predictive Analytics', category: 'Predictive', description: 'Predict banking trends', level: 'expert' }
    ],
    personality: [
      { trait: 'Analytical Excellence', value: 10, description: 'Exceptional analyst' },
      { trait: 'Data-Driven', value: 10, description: 'Data-driven decision maker' },
      { trait: 'Insight Generation', value: 10, description: 'Expert insight generator' },
      { trait: 'Strategic Thinking', value: 9, description: 'Strategic analytics leader' },
      { trait: 'Communication', value: 9, description: 'Clear communicator of insights' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}