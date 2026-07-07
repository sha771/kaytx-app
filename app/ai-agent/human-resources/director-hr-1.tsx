import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-hr-1',
    name: 'Director of Human Resources - North America',
    title: 'AI Director of Human Resources - North America',
    description: 'The AI Director of Human Resources for North America oversees HR operations, talent management, and organizational development across the region, ensuring alignment with global HR strategy.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Regional HR Strategy","Talent Management","Employee Relations","Workforce Planning","Performance Management","Compliance Oversight","Team Leadership"],
    icon: Users,
    color: '#E91E63',
    type: 'employee' as const,
    humanCost: '$185k/year',
    aiCost: '$3.5k/year',
    efficiency: '53x efficiency improvement',
    replacesRole: 'director-hr',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 920,
      responseTime: '1.5s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['hr-managers-na'],
    },
    specializedCapabilities: [
      'Regional Strategy',
      'Talent Acquisition',
      'Employee Development',
      'Performance Management',
      'Employee Relations',
      'Compliance Management',
      'Workforce Analytics',
      'Change Management'
    ],
    integrationOptions: [
      'Regional HRIS',
      'ATS Platforms',
      'Payroll Systems',
      'Learning Management',
      'Performance Tools',
      'Compliance Systems',
      'Benefits Administration',
      'Analytics Platforms'
    ],
    automationFeatures: [
      'Regional Workflows',
      'Talent Pipeline Management',
      'Performance Review Cycles',
      'Compliance Monitoring',
      'Employee Onboarding',
      'Training Coordination',
      'Policy Implementation',
      'Reporting Automation'
    ],
    kpiMetrics: [
      'Regional Retention Rate',
      'Time to Fill',
      'Employee Satisfaction',
      'Diversity Metrics',
      'Training Completion',
      'Compliance Score',
      'Cost per Hire',
      'Engagement Index'
    ],
    customOptions: {
      regionFocus: 'north-america',
      strategyAlignment: 'global',
      talentFocus: 'diverse',
      complianceLevel: 'strict',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts regional workforce trends' },
      { id: 'sentiment', enabled: true, name: 'Sentiment Core', description: 'Analyzes regional employee sentiment' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dhr_1', name: 'Regional Strategy', category: 'Strategy', description: 'Develop regional HR strategy', level: 'expert' },
      { id: 'dhr_2', name: 'Talent Management', category: 'Operations', description: 'Manage regional talent', level: 'expert' },
      { id: 'dhr_3', name: 'Employee Relations', category: 'Operations', description: 'Handle employee relations', level: 'expert' },
      { id: 'dhr_4', name: 'Compliance', category: 'Compliance', description: 'Ensure regional compliance', level: 'expert' },
      { id: 'dhr_5', name: 'Analytics', category: 'Analytics', description: 'Analyze regional HR data', level: 'expert' }
    ],
    personality: [
      { trait: 'Leadership', value: 10, description: 'Strong leadership and direction' },
      { trait: 'Strategic', value: 9, description: 'Thinks strategically and long-term' },
      { trait: 'Collaborative', value: 9, description: 'Works well with teams' },
      { trait: 'Results-oriented', value: 9, description: 'Focuses on achieving results' },
      { trait: 'Cultural-awareness', value: 8, description: 'Understands regional cultures' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
