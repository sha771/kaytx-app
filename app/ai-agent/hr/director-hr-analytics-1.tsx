import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-hr-analytics-1',
    name: 'Director of HR Analytics - Workforce Intelligence',
    title: 'AI Director of HR Analytics - Workforce Intelligence',
    description: 'The AI Director of HR Analytics for Workforce Intelligence oversees workforce data analysis, predictive modeling, and strategic workforce insights.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Workforce Analytics","Predictive Modeling","Data Visualization","Strategic Insights","Dashboard Design","Advanced Analytics","Team Leadership"],
    icon: BarChart3,
    color: '#2196F3',
    type: 'employee' as const,
    humanCost: '$180k/year',
    aiCost: '$4k/year',
    efficiency: '45x efficiency improvement',
    replacesRole: 'director-analytics',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 920,
      responseTime: '1.3s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['workforce-analysts', 'data-scientists'],
    },
    specializedCapabilities: [
      'Workforce Analytics',
      'Predictive Modeling',
      'Data Visualization',
      'Strategic Insights',
      'Dashboard Design',
      'Advanced Analytics',
      'Machine Learning',
      'Storytelling with Data'
    ],
    integrationOptions: [
      'Analytics Platforms',
      'Data Warehouses',
      'BI Tools',
      'HRIS Systems',
      'Statistical Software',
      'ML Platforms',
      'Visualization Tools',
      'API Connectors'
    ],
    automationFeatures: [
      'Data Pipelines',
      'Model Training',
      'Dashboard Updates',
      'Report Generation',
      'Alert Systems',
      'Data Validation',
      'Insight Delivery',
      'Automated Analysis'
    ],
    kpiMetrics: [
      'Insight Generation',
      'Model Accuracy',
      'Dashboard Adoption',
      'Data Quality',
      'Strategic Impact',
      'Prediction Accuracy',
      'User Satisfaction',
      'Time to Insight'
    ],
    customOptions: {
      analyticsType: 'predictive',
      visualizationLevel: 'advanced',
      insightDepth: 'strategic',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts workforce trends' },
      { id: 'analytics', enabled: true, name: 'Analytics Core', description: 'Advanced HR analytics' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dha_1', name: 'Workforce Analytics', category: 'Analytics', description: 'Analyze workforce data', level: 'expert' },
      { id: 'dha_2', name: 'Predictive Modeling', category: 'Analytics', description: 'Build predictive models', level: 'expert' },
      { id: 'dha_3', name: 'Data Visualization', category: 'Visualization', description: 'Visualize data', level: 'expert' },
      { id: 'dha_4', name: 'Strategic Insights', category: 'Strategy', description: 'Provide strategic insights', level: 'expert' },
      { id: 'dha_5', name: 'Machine Learning', category: 'Technology', description: 'Apply ML to HR', level: 'expert' }
    ],
    personality: [
      { trait: 'Analytical', value: 10, description: 'Highly analytical' },
      { trait: 'Data-driven', value: 9, description: 'Data-driven approach' },
      { trait: 'Strategic', value: 9, description: 'Strategic thinker' },
      { trait: 'Inquisitive', value: 9, description: 'Curious about data' },
      { trait: 'Communicative', value: 8, description: 'Communicates insights well' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
