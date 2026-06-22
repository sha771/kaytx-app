import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function DataAnalystPage() {
  const agent = {
    id: 'data-analyst',
    name: 'AI Data Analyst',
    title: 'AI Data Analyst',
    description: 'The AI Data Analyst analyzes agricultural data, provides insights and recommendations, and supports data-driven decision making across operations.',
    capabilities: ["Task Automation","Data Processing","Data Analysis","Statistical Modeling","Trend Analysis","Predictive Analytics","Reporting","Visualization","Insight Generation","Decision Support"],
    icon: BarChart3,
    color: '#673AB7',
    type: 'employee' as const,
    humanCost: '$85k/year',
    aiCost: '$3k/year',
    efficiency: '28x efficiency improvement',
    replacesRole: 'data-analyst',
    infrastructure: {
      status: 'online' as const,
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$6,833',
      tasksAutomatedDaily: 550,
      responseTime: '1.7s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Agriculture',
      level: 'analyst',
      reportsTo: 'vp-agriculture-technology',
      manages: [],
    },
    specializedCapabilities: [
      'Data Analysis',
      'Statistical Modeling',
      'Trend Analysis',
      'Predictive Analytics',
      'Reporting',
      'Visualization',
      'Insight Generation',
      'Decision Support',
      'Data Mining',
      'Performance Analytics'
    ],
    integrationOptions: [
      'Analytics Platforms',
      'Data Warehouses',
      'Visualization Tools',
      'Statistical Software',
      'Reporting Systems',
      'BI Platforms',
      'Data Sources',
      'Communication Tools'
    ],
    automationFeatures: [
      'Data Processing',
      'Statistical Analysis',
      'Trend Detection',
      'Predictive Modeling',
      'Report Generation',
      'Visualization',
      'Insight Extraction',
      'Decision Support'
    ],
    kpiMetrics: [
      'Analysis Accuracy',
      'Insight Quality',
      'Report Timeliness',
      'Prediction Accuracy',
      'Decision Impact',
      'Data Quality',
      'Visualization Effectiveness',
      'Analysis Speed'
    ],
    customOptions: {
      analysisDepth: 'comprehensive',
      insightQuality: 'high',
      predictionAccuracy: 'maximum',
      reportingFrequency: 'regular',
      decisionSupport: 'strategic'
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
      { id: 'analytics', enabled: true, name: 'Analytics Engine', description: 'Analyzes agricultural data' },
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts trends' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'da_1', name: 'Data Analysis', category: 'Analysis', description: 'Analyze agricultural data', level: 'expert' },
      { id: 'da_2', name: 'Statistical Modeling', category: 'Statistics', description: 'Build statistical models', level: 'expert' },
      { id: 'da_3', name: 'Predictive Analytics', category: 'Predictive', description: 'Perform predictive analytics', level: 'expert' }
    ],
    personality: [
      { trait: 'Analytical', value: 10, description: 'Analytical' },
      { trait: 'Data Driven', value: 10, description: 'Data-oriented' },
      { trait: 'Insight', value: 9, description: 'Insight-focused' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
