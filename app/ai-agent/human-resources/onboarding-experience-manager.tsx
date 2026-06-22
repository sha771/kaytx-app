import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { UserPlus } from 'lucide-react-native';

export default function OnboardingExperienceManagerPage() {
  const agent = {
    id: 'onboarding-experience-manager',
    name: 'AI Onboarding Experience Manager',
    title: 'AI Onboarding Experience Manager',
    description: 'The AI Onboarding Experience Manager designs and manages exceptional onboarding experiences, ensures smooth new hire integration, and drives early engagement and retention.',
    capabilities: ["Onboarding Strategy","Experience Design","New Hire Integration","Cultural Assimilation","Onboarding Analytics","Program Management","Early Engagement","Retention Support"],
    icon: UserPlus,
    color: '#4CAF50',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$4.5k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'onboarding-experience-manager',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$6,700',
      tasksAutomatedDaily: 325,
      responseTime: '0.7s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'management',
      reportsTo: 'vp-hr-operations',
      manages: [],
    },
    specializedCapabilities: ['Onboarding Strategy','Experience Design','New Hire Integration','Cultural Assimilation','Onboarding Analytics'],
    integrationOptions: ['Onboarding Platforms','HRIS Systems','Learning Tools','Communication Systems'],
    automationFeatures: ['Onboarding Program Management','Integration Tracking','Culture Introduction','Engagement Monitoring'],
    kpiMetrics: ['Onboarding Satisfaction','Time to Productivity','Early Retention','Program Completion','Cultural Fit'],
    customOptions: { onboardingFocus: 'comprehensive', experienceQuality: 'high', integrationSpeed: 'maximum' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'onboarding', enabled: true, name: 'Onboarding Strategist', description: 'Develops onboarding strategies' },
      { id: 'experience', enabled: true, name: 'Experience Designer', description: 'Designs onboarding experiences' },
      { id: 'integration', enabled: true, name: 'Integration Manager', description: 'Manages new hire integration' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'oem_1', name: 'Onboarding Strategy', category: 'Strategy', description: 'Develop onboarding strategies', level: 'expert' },
      { id: 'oem_2', name: 'Experience Design', category: 'Design', description: 'Design onboarding experiences', level: 'expert' },
      { id: 'oem_3', name: 'New Hire Integration', category: 'Integration', description: 'Integrate new hires', level: 'expert' }
    ],
    personality: [
      { trait: 'Onboarding Focus', value: 10, description: 'Onboarding oriented' },
      { trait: 'Welcoming', value: 9, description: 'Welcoming nature' },
      { trait: 'Integration Expert', value: 9, description: 'Integration focused' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
