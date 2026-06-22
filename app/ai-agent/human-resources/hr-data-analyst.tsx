import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Database } from 'lucide-react-native';

export default function HRDataAnalystPage() {
  const agent = {
    id: 'hr-data-analyst',
    name: 'AI HR Data Analyst',
    title: 'AI HR Data Analyst',
    description: 'The AI HR Data Analyst specializes in HR data analysis, workforce metrics, and data-driven insights to support strategic HR decision-making.',
    capabilities: ["Data Analysis","Workforce Metrics","Predictive Analytics","Dashboard Creation","Data Visualization","Reporting","Trend Analysis","Data Integrity"],
    icon: Database,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$4.8k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'hr-data-analyst',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$7,100',
      tasksAutomatedDaily: 338,
      responseTime: '0.7s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'team_lead',
      reportsTo: 'vp-hr-analytics',
      manages: [],
    },
    specializedCapabilities: ['Data Analysis','Workforce Metrics','Predictive Analytics','Dashboard Creation','Trend Analysis'],
    integrationOptions: ['Data Warehouses','Analytics Platforms','HRIS Systems','BI Tools'],
    automationFeatures: ['Automated Reporting','Dashboard Updates','Trend Analysis','Data Validation'],
    kpiMetrics: ['Data Accuracy','Report Timeliness','Insight Quality','Dashboard Usage','Predictive Accuracy'],
    customOptions: { analyticsDepth: 'comprehensive', dataQuality: 'high', insightLevel: 'strategic' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'analyze', enabled: true, name: 'Data Analyzer', description: 'Analyzes HR data' },
      { id: 'metrics', enabled: true, name: 'Metrics Specialist', description: 'Tracks workforce metrics' },
      { id: 'predict', enabled: true, name: 'Predictive Analyst', description: 'Provides predictive insights' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'hrda_1', name: 'Data Analysis', category: 'Analysis', description: 'Analyze HR data', level: 'expert' },
      { id: 'hrda_2', name: 'Workforce Metrics', category: 'Metrics', description: 'Track workforce metrics', level: 'expert' },
      { id: 'hrda_3', name: 'Predictive Analytics', category: 'Analytics', description: 'Provide predictive insights', level: 'expert' }
    ],
    personality: [
      { trait: 'Data Driven', value: 10, description: 'Data oriented' },
      { trait: 'Analytical', value: 9, description: 'Analytical mindset' },
      { trait: 'Detail Oriented', value: 9, description: 'Detail focused' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
