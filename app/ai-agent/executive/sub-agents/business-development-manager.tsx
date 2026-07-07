import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function BusinessDevelopmentManagerPage() {
  const agent = {
    id: 'business-development-manager',
    name: 'AI Business Development Manager',
    title: 'AI Business Development Manager',
    description: 'The AI Business Development Manager drives business growth, manages sales pipelines, and develops strategic partnerships.',
    capabilities: ["Task Automation","Data Processing","Business Development","Pipeline Management","Partnership Development","Revenue Growth","Sales Strategy","Client Relations"],
    icon: Briefcase,
    color: '#536DFE',
    type: 'employee' as const,
    humanCost: '$130k/year',
    aiCost: '$3.3k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'business-development-manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$10,500',
      tasksAutomatedDaily: 800,
      responseTime: '1.2s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Executive & Strategy',
      level: 'manager',
      reportsTo: 'vp-business-development',
      manages: ['sales-representative', 'partnership-specialist', 'account-manager'],
    },
    specializedCapabilities: [
      'Business Development',
      'Pipeline Management',
      'Partnership Development',
      'Revenue Growth',
      'Sales Strategy',
      'Client Relations',
      'Market Expansion',
      'Opportunity Management'
    ],
    integrationOptions: [
      'CRM Systems',
      'Sales Platforms',
      'Partnership Tools',
      'Analytics Platforms',
      'Communication Systems',
      'Market Intelligence',
      'Revenue Tracking'
    ],
    automationFeatures: [
      'Business Development',
      'Pipeline Management',
      'Partnership Development',
      'Revenue Tracking',
      'Sales Strategy',
      'Client Relations',
      'Market Expansion',
      'Opportunity Management'
    ],
    kpiMetrics: [
      'Revenue Growth',
      'Pipeline Value',
      'Partnership Success',
      'Client Acquisition',
      'Market Expansion',
      'Sales Performance',
      'Relationship Quality',
      'Deal Velocity'
    ],
    customOptions: {
      growthTarget: 'aggressive',
      pipelineFocus: 'quality',
      partnershipStrategy: 'strategic',
      clientApproach: 'consultative',
      marketExpansion: 'targeted'
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
      { id: 'predictive', enabled: true, name: 'Revenue Predictor', description: 'Predicts revenue growth' },
      { id: 'pipeline', enabled: true, name: 'Pipeline Optimizer', description: 'Optimizes sales pipeline' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'bdm_1', name: 'Business Development', category: 'Business', description: 'Drive business growth', level: 'expert' },
      { id: 'bdm_2', name: 'Pipeline Management', category: 'Pipeline', description: 'Manage pipeline', level: 'expert' },
      { id: 'bdm_3', name: 'Partnership Development', category: 'Partnerships', description: 'Develop partnerships', level: 'expert' },
      { id: 'bdm_4', name: 'Sales Strategy', category: 'Sales', description: 'Develop sales strategy', level: 'expert' },
      { id: 'bdm_5', name: 'Client Relations', category: 'Relations', description: 'Manage client relations', level: 'expert' }
    ],
    personality: [
      { trait: 'Business Acumen', value: 10, description: 'Strong business sense' },
      { trait: 'Relationship Building', value: 10, description: 'Excellent relationship builder' },
      { trait: 'Sales Drive', value: 10, description: 'Strong sales orientation' },
      { trait: 'Strategic Thinking', value: 9, description: 'Strategic approach' },
      { trait: 'Leadership', value: 9, description: 'Strong leader' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
