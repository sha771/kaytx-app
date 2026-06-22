import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Activity } from 'lucide-react-native';

export default function WellnessProgramManagerPage() {
  const agent = {
    id: 'wellness-program-manager',
    name: 'AI Wellness Program Manager',
    title: 'AI Wellness Program Manager',
    description: 'The AI Wellness Program Manager designs and implements wellness programs, promotes employee health and wellbeing, and drives initiatives to support holistic employee wellness.',
    capabilities: ["Wellness Strategy","Program Design','Health Promotion','Wellness Analytics','Mental Health Support','Fitness Initiatives','Wellness Education','Well-being Tracking"],
    icon: Activity,
    color: '#4CAF50',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$4.5k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'wellness-program-manager',
    infrastructure: {
      status: 'online' as const,
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$6,700',
      tasksAutomatedDaily: 325,
      responseTime: '0.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'management',
      reportsTo: 'vp-culture',
      manages: [],
    },
    specializedCapabilities: ['Wellness Strategy','Program Design','Health Promotion','Wellness Analytics','Mental Health Support'],
    integrationOptions: ['Wellness Platforms','Health Apps','Survey Tools','Analytics Systems'],
    automationFeatures: ['Program Management','Health Tracking','Wellness Analytics','Mental Health Support'],
    kpiMetrics: ['Program Participation','Health Outcomes','Wellness Score','Mental Health Index','Program ROI'],
    customOptions: { wellnessFocus: 'comprehensive', healthPriority: 'high', supportLevel: 'maximum' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'wellness', enabled: true, name: 'Wellness Strategist', description: 'Develops wellness strategies' },
      { id: 'program', enabled: true, name: 'Program Designer', description: 'Designs wellness programs' },
      { id: 'health', enabled: true, name: 'Health Promoter', description: 'Promotes employee health' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'wpm_1', name: 'Wellness Strategy', category: 'Strategy', description: 'Develop wellness strategies', level: 'expert' },
      { id: 'wpm_2', name: 'Program Design', category: 'Design', description: 'Design wellness programs', level: 'expert' },
      { id: 'wpm_3', name: 'Health Promotion', category: 'Health', description: 'Promote health', level: 'expert' }
    ],
    personality: [
      { trait: 'Wellness Focus', value: 10, description: 'Wellness oriented' },
      { trait: 'Caring', value: 9, description: 'Caring nature' },
      { trait: 'Health Conscious', value: 9, description: 'Health focused' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
