import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Database } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'data-specialist-2',
    name: 'HR Data Specialist - Analytics & Insights',
    title: 'AI HR Data Specialist - Analytics & Insights',
    description: 'The AI HR Data Specialist for Analytics & Insights provides HR data analysis, insights generation, and data storytelling for decision support.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Data Analytics','Insights Generation','Data Storytelling','Decision Support','Data Visualization','Advanced Analytics','Specialization"],
    icon: Database,
    color: '#4CAF50',
    type: 'specialist' as const,
    humanCost: '$160k/year',
    aiCost: '$3.5k/year',
    efficiency: '46x efficiency improvement',
    replacesRole: 'hr-data-specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11',
      tasksAutomatedDaily: 880,
      responseTime: '1.4s',
      accuracyRate: '97.6%',
    },
    hierarchy: {
      department: 'Human-Resources',
      level: 'specialist',
      reportsTo: 'chro',
      manages: [],
    },
    specializedCapabilities: [
      'Data Analytics',
      'Insights Generation',
      'Data Storytelling',
      'Decision Support',
      'Data Visualization',
      'Advanced Analytics',
      'Statistical Analysis',
      'Predictive Modeling'
    ],
    integrationOptions: [
      'Analytics Platforms',
      'BI Tools',
      'Data Warehouses',
      'Visualization Tools',
      'Statistical Software',
      'ML Platforms',
      'Reporting Tools',
      'Dashboards'
    ],
    automationFeatures: [
      'Data Analysis',
      'Insight Generation',
      'Visualization Creation',
      'Report Automation',
      'Story Building',
      'Predictive Modeling',
      'Alert Systems',
      'Insight Delivery'
    ],
    kpiMetrics: [
      'Insight Quality',
      'Analysis Speed',
      'Visualization Effectiveness',
      'Decision Impact',
      'User Engagement',
      'Prediction Accuracy',
      'Story Adoption',
      'Analytics ROI'
    ],
    customOptions: {
      analyticsFocus: 'insights',
      visualizationLevel: 'advanced',
      storytellingStyle: 'narrative',
      insightDepth: 'actionable',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts insights' },
      { id: 'analytics', enabled: true, name: 'Analytics Core', description: 'Advanced data analytics' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'ds_1', name: 'Data Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' },
      { id: 'ds_2', name: 'Insights Generation', category: 'Insights', description: 'Generate insights', level: 'expert' },
      { id: 'ds_3', name: 'Data Storytelling', category: 'Storytelling', description: 'Tell data stories', level: 'expert' },
      { id: 'ds_4', name: 'Decision Support', category: 'Support', description: 'Support decisions', level: 'expert' },
      { id: 'ds_5', name: 'Data Visualization', category: 'Visualization', description: 'Visualize data', level: 'expert' }
    ],
    personality: [
      { trait: 'Analytical', value: 10, description: 'Analytical thinker' },
      { trait: 'Insightful', value: 9, description: 'Insightful analyst' },
      { trait: 'Storyteller', value: 9, description: 'Good storyteller' },
      { trait: 'Data-driven', value: 9, description: 'Data-driven approach' },
      { trait: 'Communicative', value: 8, description: 'Communicates insights well' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
