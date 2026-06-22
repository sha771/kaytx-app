import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Heart } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-benefits-2',
    name: 'Director of Benefits - Retirement & Financial',
    title: 'AI Director of Benefits - Retirement & Financial',
    description: 'The AI Director of Benefits for Retirement & Financial oversees retirement plans, financial wellness programs, and savings benefits for the organization.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Retirement Plan Design","Financial Wellness Programs","401k Management","Investment Options","Compliance Monitoring","Financial Education","Team Leadership"],
    icon: Heart,
    color: '#E91E63',
    type: 'employee' as const,
    humanCost: '$155k/year',
    aiCost: '$3.5k/year',
    efficiency: '44x efficiency improvement',
    replacesRole: 'director-benefits',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$10',
      tasksAutomatedDaily: 850,
      responseTime: '1.8s',
      accuracyRate: '96.6%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'vp-compensation',
      manages: ['benefits-admins-retirement'],
    },
    specializedCapabilities: [
      'Retirement Plan Design',
      'Financial Wellness',
      '401k Administration',
      'Investment Management',
      'Compliance Monitoring',
      'Financial Education',
      'Vendor Management',
      'Retirement Analytics'
    ],
    integrationOptions: [
      'Retirement Platforms',
      '401k Systems',
      'Investment Platforms',
      'Financial Education',
      'HRIS Integration',
      'Compliance Systems',
      'Analytics Suite',
      'Communication Tools'
    ],
    automationFeatures: [
      'Enrollment Processing',
      'Contribution Management',
      'Vesting Tracking',
      'Compliance Monitoring',
      'Financial Education Delivery',
      'Vendor Coordination',
      'Communication Automation',
      'Reporting Automation'
    ],
    kpiMetrics: [
      'Participation Rate',
      'Deferral Rate',
      'Financial Wellness Score',
      'Plan Cost',
      'Employee Satisfaction',
      'Compliance Score',
      'Investment Performance',
      'Retirement Readiness'
    ],
    customOptions: {
      focus: 'retirement-financial',
      planType: 'defined-contribution',
      wellnessFocus: 'financial-literacy',
      investmentLevel: 'diversified',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts retirement readiness' },
      { id: 'financial', enabled: true, name: 'Financial Core', description: 'Manages financial wellness' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'db_1', name: 'Retirement Plans', category: 'Benefits', description: 'Manage retirement plans', level: 'expert' },
      { id: 'db_2', name: 'Financial Wellness', category: 'Wellness', description: 'Run financial programs', level: 'expert' },
      { id: 'db_3', name: '401k Administration', category: 'Operations', description: 'Administer 401k', level: 'expert' },
      { id: 'db_4', name: 'Investment Management', category: 'Finance', description: 'Manage investments', level: 'expert' },
      { id: 'db_5', name: 'Financial Education', category: 'Education', description: 'Educate employees', level: 'expert' }
    ],
    personality: [
      { trait: 'Financial-savvy', value: 10, description: 'Understands finance' },
      { trait: 'Educational', value: 9, description: 'Educates employees' },
      { trait: 'Service-oriented', value: 9, description: 'Service-oriented approach' },
      { trait: 'Compliance-focused', value: 9, description: 'Focuses on compliance' },
      { trait: 'Analytical', value: 8, description: 'Analytical in analysis' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
