import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Database } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'data-specialist-1',
    name: 'HR Data Specialist - Data Management',
    title: 'AI HR Data Specialist - Data Management',
    description: 'The AI HR Data Specialist for Data Management manages HR data architecture, data quality, and data governance across HR systems.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Data Architecture','Data Quality','Data Governance','Data Integration','Master Data Management','Data Strategy','Specialization"],
    icon: Database,
    color: '#4CAF50',
    type: 'specialist' as const,
    humanCost: '$150k/year',
    aiCost: '$3.5k/year',
    efficiency: '43x efficiency improvement',
    replacesRole: 'hr-data-specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$10',
      tasksAutomatedDaily: 870,
      responseTime: '1.5s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Human-Resources',
      level: 'specialist',
      reportsTo: 'chro',
      manages: [],
    },
    specializedCapabilities: [
      'Data Architecture',
      'Data Quality',
      'Data Governance',
      'Data Integration',
      'Master Data Management',
      'Data Strategy',
      'Data Security',
      'Data Lineage'
    ],
    integrationOptions: [
      'Data Warehouses',
      'HRIS Systems',
      'ETL Tools',
      'Quality Platforms',
      'Governance Systems',
      'Integration Platforms',
      'Analytics Tools',
      'Security Systems'
    ],
    automationFeatures: [
      'Data Validation',
      'Quality Checks',
      'Governance Enforcement',
      'Integration Automation',
      'Master Data Sync',
      'Security Monitoring',
      'Report Generation',
      'Insight Delivery'
    ],
    kpiMetrics: [
      'Data Quality',
      'Data Accuracy',
      'Governance Compliance',
      'Integration Success',
      'Data Availability',
      'Security Score',
      'User Satisfaction',
      'Data ROI'
    ],
    customOptions: {
      dataFocus: 'management',
      architecture: 'modern',
      qualityLevel: 'high',
      governanceModel: 'centralized',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts data needs' },
      { id: 'data', enabled: true, name: 'Data Core', description: 'Manages HR data' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'ds_1', name: 'Data Architecture', category: 'Data', description: 'Design data architecture', level: 'expert' },
      { id: 'ds_2', name: 'Data Quality', category: 'Quality', description: 'Ensure data quality', level: 'expert' },
      { id: 'ds_3', name: 'Data Governance', category: 'Governance', description: 'Govern data', level: 'expert' },
      { id: 'ds_4', name: 'Data Integration', category: 'Integration', description: 'Integrate data', level: 'expert' },
      { id: 'ds_5', name: 'Master Data Management', category: 'MDM', description: 'Manage master data', level: 'expert' }
    ],
    personality: [
      { trait: 'Data-focused', value: 10, description: 'Focuses on data' },
      { trait: 'Detail-oriented', value: 9, description: 'Attention to detail' },
      { trait: 'Analytical', value: 9, description: 'Analytical approach' },
      { trait: 'Quality-driven', value: 9, description: 'Driven by quality' },
      { trait: 'Technical', value: 8, description: 'Technical expert' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
