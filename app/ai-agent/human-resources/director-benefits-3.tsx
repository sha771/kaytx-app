import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Heart } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-benefits-3',
    name: 'Director of Benefits - Total Rewards & Perks',
    title: 'AI Director of Benefits - Total Rewards & Perks',
    description: 'The AI Director of Benefits for Total Rewards & Perks oversees non-traditional benefits, employee perks, and total rewards programs to enhance employee experience.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Perks Program Design","Total Rewards Strategy","Employee Experience Enhancement","Vendor Management","Benefits Communication","Program Evaluation","Team Leadership"],
    icon: Heart,
    color: '#E91E63',
    type: 'employee' as const,
    humanCost: '$150k/year',
    aiCost: '$3.5k/year',
    efficiency: '43x efficiency improvement',
    replacesRole: 'director-benefits',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$10',
      tasksAutomatedDaily: 840,
      responseTime: '1.9s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'vp-compensation',
      manages: ['benefits-admins-perks'],
    },
    specializedCapabilities: [
      'Perks Program Design',
      'Total Rewards Strategy',
      'Employee Experience',
      'Vendor Management',
      'Benefits Communication',
      'Program Innovation',
      'Cost Management',
      'Experience Analytics'
    ],
    integrationOptions: [
      'Perks Platforms',
      'Vendor Systems',
      'Experience Platforms',
      'HRIS Integration',
      'Communication Tools',
      'Survey Platforms',
      'Analytics Suite',
      'Mobile Apps'
    ],
    automationFeatures: [
      'Perk Enrollment',
      'Vendor Coordination',
      'Experience Tracking',
      'Feedback Collection',
      'Program Promotion',
      'Cost Tracking',
      'Communication Automation',
      'Reporting Automation'
    ],
    kpiMetrics: [
      'Utilization Rate',
      'Employee Satisfaction',
      'Program Cost',
      'Engagement Score',
      'Vendor Performance',
      'Innovation Index',
      'Experience Rating',
      'Retention Impact'
    ],
    customOptions: {
      focus: 'total-rewards',
      experienceLevel: 'premium',
      innovationFocus: 'continuous',
      communicationStyle: 'engaging',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts perk trends' },
      { id: 'experience', enabled: true, name: 'Experience Core', description: 'Enhances employee experience' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'db_1', name: 'Perks Programs', category: 'Benefits', description: 'Manage perks programs', level: 'expert' },
      { id: 'db_2', name: 'Total Rewards', category: 'Strategy', description: 'Design total rewards', level: 'expert' },
      { id: 'db_3', name: 'Employee Experience', category: 'Experience', description: 'Enhance experience', level: 'expert' },
      { id: 'db_4', name: 'Vendor Management', category: 'Operations', description: 'Manage vendors', level: 'expert' },
      { id: 'db_5', name: 'Program Innovation', category: 'Innovation', description: 'Innovate programs', level: 'expert' }
    ],
    personality: [
      { trait: 'Creative', value: 10, description: 'Creative in programs' },
      { trait: 'Employee-focused', value: 9, description: 'Focuses on employees' },
      { trait: 'Innovative', value: 9, description: 'Innovative approach' },
      { trait: 'Service-oriented', value: 9, description: 'Service-oriented' },
      { trait: 'Collaborative', value: 8, description: 'Works with teams' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
