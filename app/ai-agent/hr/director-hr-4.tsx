import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-hr-4',
    name: 'Director of Human Resources - Latin America',
    title: 'AI Director of Human Resources - Latin America',
    description: 'The AI Director of Human Resources for Latin America oversees HR operations across LATAM markets, managing talent acquisition and employee relations throughout the region.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","LATAM HR Strategy","Talent Management","Regional Relations","Workforce Planning","Performance Management","Labor Compliance","Team Leadership"],
    icon: Users,
    color: '#E91E63',
    type: 'employee' as const,
    humanCost: '$155k/year',
    aiCost: '$3.5k/year',
    efficiency: '44x efficiency improvement',
    replacesRole: 'director-hr',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11',
      tasksAutomatedDaily: 840,
      responseTime: '1.8s',
      accuracyRate: '96.2%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['hr-managers-latam'],
    },
    specializedCapabilities: [
      'LATAM Strategy',
      'Regional Talent Acquisition',
      'Latin American Labor Laws',
      'Employee Relations',
      'Performance Management',
      'Workforce Analytics',
      'Regional Compliance',
      'Market Development'
    ],
    integrationOptions: [
      'LATAM HRIS Systems',
      'Regional ATS',
      'Multi-currency Payroll',
      'Learning Management',
      'Performance Tools',
      'Compliance Systems',
      'Regional Benefits',
      'Analytics Platforms'
    ],
    automationFeatures: [
      'LATAM Workflows',
      'Regional Onboarding',
      'Spanish/Portuguese Support',
      'Compliance Monitoring',
      'Regional Training Programs',
      'Policy Implementation',
      'Reporting Automation',
      'Talent Pipeline Management'
    ],
    kpiMetrics: [
      'LATAM Retention Rate',
      'Time to Fill',
      'Employee Satisfaction',
      'Compliance Score',
      'Training Completion',
      'Diversity Metrics',
      'Cost per Hire',
      'Engagement Index'
    ],
    customOptions: {
      regionFocus: 'latam',
      languageSupport: 'spanish-portuguese',
      culturalFocus: 'latin-american',
      growthMarket: true,
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts LATAM workforce trends' },
      { id: 'regional', enabled: true, name: 'Regional Core', description: 'Adapts to LATAM markets' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dhr_1', name: 'LATAM Strategy', category: 'Strategy', description: 'Develop LATAM HR strategy', level: 'expert' },
      { id: 'dhr_2', name: 'Regional Relations', category: 'Operations', description: 'Manage regional employee relations', level: 'expert' },
      { id: 'dhr_3', name: 'Latin Labor Laws', category: 'Compliance', description: 'Understand LATAM labor laws', level: 'expert' },
      { id: 'dhr_4', name: 'Talent Acquisition', category: 'Operations', description: 'Acquire LATAM talent', level: 'expert' },
      { id: 'dhr_5', name: 'Market Development', category: 'Strategy', description: 'Develop LATAM markets', level: 'expert' }
    ],
    personality: [
      { trait: 'Relationship-builder', value: 10, description: 'Builds strong relationships' },
      { trait: 'Cultural-awareness', value: 9, description: 'Understands LATAM cultures' },
      { trait: 'Collaborative', value: 9, description: 'Works across LATAM region' },
      { trait: 'Strategic', value: 9, description: 'Thinks strategically for LATAM' },
      { trait: 'Bilingual', value: 8, description: 'Spanish/Portuguese support' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
