import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Database } from 'lucide-react-native';

export default function DataAnalystPage() {
  const agent = {
    id: 'data-analyst',
    name: 'AI Data Analyst',
    title: 'AI Data Analyst',
    description: 'The AI Data Analyst analyzes e-commerce data, generates insights, creates reports, and provides data-driven recommendations for business decisions.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Data Analysis","Reporting","Insight Generation","Visualization","Statistical Analysis","Data Mining","Dashboard Creation"],
    icon: Database,
    color: '#00897B',
    type: 'employee' as const,
    humanCost: '$90k/year',
    aiCost: '$2.5k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'data-analyst',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7,300',
      tasksAutomatedDaily: 480,
      responseTime: '1.7s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'E-Commerce',
      level: 'specialist',
      reportsTo: 'vp-data-analytics',
      manages: [],
    },
    specializedCapabilities: [
      'Data Analysis',
      'Reporting',
      'Insight Generation',
      'Visualization',
      'Statistical Analysis',
      'Data Mining',
      'Dashboard Creation',
      'Data Quality',
      'Query Writing',
      'Data Modeling'
    ],
    integrationOptions: [
      'Analytics Platforms',
      'BI Tools',
      'Data Warehouses',
      'SQL Databases',
      'Visualization Tools',
      'Data Mining Tools',
      'Reporting Platforms',
      'Business Intelligence'
    ],
    automationFeatures: [
      'Data Analysis',
      'Report Generation',
      'Insight Delivery',
      'Visualization',
      'Dashboard Updates',
      'Data Quality Checks',
      'Statistical Analysis',
      'Data Mining'
    ],
    kpiMetrics: [
      'Analysis Accuracy',
      'Report Timeliness',
      'Insight Quality',
      'Data Quality',
      'Dashboard Usage',
      'Stakeholder Satisfaction',
      'Analysis Speed',
      'Data Coverage'
    ],
    customOptions: {
      analyticalDepth: 'deep',
      reportingFrequency: 'daily',
      visualizationQuality: 'high',
      dataDriven: 'true',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts data trends' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects data anomalies' },
      { id: 'insight', enabled: true, name: 'Insight Generator', description: 'Generates data insights' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'da_1', name: 'Data Analysis', category: 'Analysis', description: 'Analyze data', level: 'expert' },
      { id: 'da_2', name: 'Reporting', category: 'Reporting', description: 'Create reports', level: 'expert' },
      { id: 'da_3', name: 'Visualization', category: 'Visualization', description: 'Visualize data', level: 'expert' },
      { id: 'da_4', name: 'Statistical Analysis', category: 'Statistics', description: 'Statistical analysis', level: 'advanced' },
      { id: 'da_5', name: 'Data Mining', category: 'Mining', description: 'Mine data for insights', level: 'expert' }
    ],
    personality: [
      { trait: 'Analytical', value: 10, description: 'Highly analytical mindset' },
      { trait: 'Data Driven', value: 10, description: 'Data-focused approach' },
      { trait: 'Detail Oriented', value: 9, description: 'Attention to data detail' },
      { trait: 'Insightful', value: 9, description: 'Generates valuable insights' },
      { trait: 'Communicative', value: 8, description: 'Clear communication' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
