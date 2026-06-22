import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { PieChart } from 'lucide-react-native';

export default function PeopleAnalyticsSpecialistPage() {
  const agent = {
    id: 'people-analytics-specialist',
    name: 'AI People Analytics Specialist',
    title: 'AI People Analytics Specialist',
    description: 'The AI People Analytics Specialist specializes in advanced people analytics, workforce insights, and predictive modeling to drive data-driven HR decisions.',
    capabilities: ["People Analytics","Workforce Insights","Predictive Modeling','Advanced Analytics','People Metrics','Trend Analysis','Workforce Intelligence','Data Storytelling"],
    icon: PieChart,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$105k/year',
    aiCost: '$5.5k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'people-analytics-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$8,250',
      tasksAutomatedDaily: 395,
      responseTime: '0.6s',
      accuracyRate: '98.9%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'management',
      reportsTo: 'vp-hr-analytics',
      manages: [],
    },
    specializedCapabilities: ['People Analytics','Workforce Insights','Predictive Modeling','Advanced Analytics','Trend Analysis'],
    integrationOptions: ['Analytics Platforms','Data Warehouses','HRIS Systems','BI Tools'],
    automationFeatures: ['Advanced Analytics','Predictive Modeling','Insight Generation','Trend Detection'],
    kpiMetrics: ['Insight Accuracy','Predictive Success','Analytics Adoption','Decision Impact','Data Quality'],
    customOptions: { analyticsDepth: 'advanced', insightLevel: 'strategic', predictionAccuracy: 'maximum' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'analytics', enabled: true, name: 'People Analyst', description: 'Analyzes people data' },
      { id: 'insights', enabled: true, name: 'Insight Generator', description: 'Generates workforce insights' },
      { id: 'predict', enabled: true, name: 'Predictive Modeler', description: 'Creates predictive models' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'pas_1', name: 'People Analytics', category: 'Analytics', description: 'Analyze people data', level: 'expert' },
      { id: 'pas_2', name: 'Workforce Insights', category: 'Insights', description: 'Generate workforce insights', level: 'expert' },
      { id: 'pas_3', name: 'Predictive Modeling', category: 'Modeling', description: 'Create predictive models', level: 'expert' }
    ],
    personality: [
      { trait: 'Analytics Focus', value: 10, description: 'Analytics oriented' },
      { trait: 'Data Driven', value: 9, description: 'Data driven' },
      { trait: 'Insightful', value: 9, description: 'Insightful mindset' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
