import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Link } from 'lucide-react-native';

export default function AffiliateMarketingPage() {
  const agent = {
    id: 'affiliate-marketing',
    name: 'AI Affiliate Marketing',
    title: 'AI Affiliate Marketing',
    description: 'The AI Affiliate Marketing manages affiliate programs and partnerships to drive performance-based marketing and revenue.',
    capabilities: ["Task Automation","Data Processing","Affiliate Marketing","Program Management","Partner Relations","Communication","Analytics","Marketing Intelligence"],
    icon: Link,
    color: '#F59E0B',
    type: 'agent' as const,
    humanCost: '$76k/year',
    aiCost: '$4k/year',
    efficiency: '19x efficiency improvement',
    replacesRole: 'affiliate-marketing-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$6,000',
      tasksAutomatedDaily: 325,
      responseTime: '0.6s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Marketing & Growth',
      level: 'management',
      reportsTo: 'cmo',
      manages: [],
    },
    specializedCapabilities: [
      'Affiliate Marketing',
      'Program Management',
      'Partner Relations',
      'Communication',
      'Analytics',
      'Marketing Intelligence'
    ],
    integrationOptions: [
      'Affiliate Platforms',
      'Program Tools',
      'Partner Systems',
      'Communication Platforms',
      'Affiliate Data',
      'Program Data',
      'Marketing Systems',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Affiliate Marketing',
      'Program Management',
      'Partner Relations',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Marketing Intelligence'
    ],
    kpiMetrics: [
      'Affiliate Revenue',
      'Program Performance',
      'Partner Quality',
      'Communication Effectiveness',
      'Marketing Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      affiliateFocus: 'high',
      programEfficiency: 'maximum',
      partnerAccuracy: 'optimized',
      integrationLevel: 'comprehensive'
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
      { id: 'affiliate', enabled: true, name: 'Affiliate Marketer', description: 'Markets affiliates' },
      { id: 'program', enabled: true, name: 'Program Manager', description: 'Manages programs' },
      { id: 'partner', enabled: true, name: 'Partner Relations Manager', description: 'Manages partner relations' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'marketing_1', name: 'Affiliate Marketing', category: 'Affiliate', description: 'Market affiliates', level: 'expert' },
      { id: 'marketing_2', name: 'Program Management', category: 'Program', description: 'Manage programs', level: 'expert' },
      { id: 'marketing_3', name: 'Partner Relations', category: 'Partner', description: 'Manage partner relations', level: 'expert' },
      { id: 'marketing_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'marketing_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Affiliate Expertise', value: 10, description: 'Affiliate expertise' },
      { trait: 'Program Focus', value: 10, description: 'Program oriented' },
      { trait: 'Partner Skills', value: 10, description: 'Partner skilled' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
