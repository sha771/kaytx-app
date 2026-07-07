import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-hr-analytics-2',
    name: 'Director of HR Analytics - Talent Intelligence',
    title: 'AI Director of HR Analytics - Talent Intelligence',
    description: 'The AI Director of HR Analytics for Talent Intelligence oversees talent acquisition analytics, pipeline analysis, and recruitment metrics optimization.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Talent Analytics","Pipeline Analysis","Recruitment Metrics","Sourcing Analytics","Hiring Insights","Performance Tracking","Team Leadership"],
    icon: BarChart3,
    color: '#2196F3',
    type: 'employee' as const,
    humanCost: '$170k/year',
    aiCost: '$3.5k/year',
    efficiency: '49x efficiency improvement',
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
      tasksAutomatedDaily: 895,
      responseTime: '1.4s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'vp-talent',
      manages: ['talent-analysts', 'recruitment-analysts'],
    },
    specializedCapabilities: [
      'Talent Acquisition Analytics',
      'Pipeline Analysis',
      'Sourcing Metrics',
      'Hiring Insights',
      'Recruitment ROI',
      'Candidate Experience Analytics',
      'Time-to-fill Analysis',
      'Quality of Hire Metrics'
    ],
    integrationOptions: [
      'ATS Analytics',
      'Recruitment Platforms',
      'Sourcing Tools',
      'CRM Systems',
      'Assessment Platforms',
      'BI Tools',
      'Analytics Suite',
      'Survey Platforms'
    ],
    automationFeatures: [
      'Pipeline Tracking',
      'Metric Calculation',
      'Report Generation',
      'Dashboard Updates',
      'Performance Monitoring',
      'ROI Analysis',
      'Insight Delivery',
      'Automated Alerts'
    ],
    kpiMetrics: [
      'Time to Fill',
      'Quality of Hire',
      'Source Effectiveness',
      'Pipeline Health',
      'Recruitment ROI',
      'Candidate Experience',
      'Cost per Hire',
      'Hiring Manager Satisfaction'
    ],
    customOptions: {
      analyticsFocus: 'talent-acquisition',
      metricType: 'recruitment',
      insightLevel: 'operational',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts hiring needs' },
      { id: 'talent', enabled: true, name: 'Talent Core', description: 'Talent acquisition analytics' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dha_1', name: 'Talent Analytics', category: 'Analytics', description: 'Analyze talent data', level: 'expert' },
      { id: 'dha_2', name: 'Pipeline Analysis', category: 'Analytics', description: 'Analyze pipelines', level: 'expert' },
      { id: 'dha_3', name: 'Recruitment Metrics', category: 'Analytics', description: 'Track recruitment metrics', level: 'expert' },
      { id: 'dha_4', name: 'Hiring Insights', category: 'Insights', description: 'Provide hiring insights', level: 'expert' },
      { id: 'dha_5', name: 'Recruitment ROI', category: 'Finance', description: 'Calculate recruitment ROI', level: 'expert' }
    ],
    personality: [
      { trait: 'Talent-focused', value: 10, description: 'Focuses on talent' },
      { trait: 'Analytical', value: 9, description: 'Analytical approach' },
      { trait: 'Results-driven', value: 9, description: 'Driven by results' },
      { trait: 'Metric-focused', value: 9, description: 'Focuses on metrics' },
      { trait: 'Collaborative', value: 8, description: 'Works with recruiters' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
