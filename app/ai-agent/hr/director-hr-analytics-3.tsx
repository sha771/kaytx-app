import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-hr-analytics-3',
    name: 'Director of HR Analytics - People Analytics',
    title: 'AI Director of HR Analytics - People Analytics',
    description: 'The AI Director of HR Analytics for People Analytics oversees employee engagement, performance analytics, and people insights across the employee lifecycle.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","People Analytics","Engagement Analysis","Performance Analytics","Retention Analytics","Employee Insights","Lifecycle Analytics","Team Leadership"],
    icon: BarChart3,
    color: '#2196F3',
    type: 'employee' as const,
    humanCost: '$165k/year',
    aiCost: '$3.5k/year',
    efficiency: '47x efficiency improvement',
    replacesRole: 'director-analytics',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 885,
      responseTime: '1.5s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['people-analysts', 'engagement-analysts'],
    },
    specializedCapabilities: [
      'People Analytics',
      'Engagement Analysis',
      'Performance Analytics',
      'Retention Analytics',
      'Employee Insights',
      'Lifecycle Analytics',
      'Sentiment Analysis',
      'Behavioral Analytics'
    ],
    integrationOptions: [
      'Engagement Platforms',
      'Performance Systems',
      'HRIS Analytics',
      'Survey Tools',
      'BI Platforms',
      'Feedback Systems',
      'Analytics Suite',
      'Communication Tools'
    ],
    automationFeatures: [
      'Engagement Tracking',
      'Performance Monitoring',
      'Retention Prediction',
      'Insight Generation',
      'Report Automation',
      'Dashboard Updates',
      'Alert Systems',
      'Survey Analysis'
    ],
    kpiMetrics: [
      'Engagement Score',
      'Retention Rate',
      'Performance Distribution',
      'Satisfaction Index',
      'Insight Adoption',
      'Prediction Accuracy',
      'Manager Satisfaction',
      'Employee NPS'
    ],
    customOptions: {
      analyticsFocus: 'people',
      insightType: 'behavioral',
      analysisDepth: 'lifecycle',
      automationLevel: 'high',
      dataDriven: true
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts people trends' },
      { id: 'sentiment', enabled: true, name: 'Sentiment Core', description: 'Analyzes employee sentiment' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dha_1', name: 'People Analytics', category: 'Analytics', description: 'Analyze people data', level: 'expert' },
      { id: 'dha_2', name: 'Engagement Analysis', category: 'Analytics', description: 'Analyze engagement', level: 'expert' },
      { id: 'dha_3', name: 'Performance Analytics', category: 'Analytics', description: 'Analyze performance', level: 'expert' },
      { id: 'dha_4', name: 'Retention Analytics', category: 'Analytics', description: 'Analyze retention', level: 'expert' },
      { id: 'dha_5', name: 'Behavioral Analytics', category: 'Analytics', description: 'Analyze behavior', level: 'expert' }
    ],
    personality: [
      { trait: 'People-focused', value: 10, description: 'Focuses on people' },
      { trait: 'Empathetic', value: 9, description: 'Empathetic to employees' },
      { trait: 'Analytical', value: 9, description: 'Analytical approach' },
      { trait: 'Insightful', value: 9, description: 'Provides insights' },
      { trait: 'Collaborative', value: 8, description: 'Works with HRBPs' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
