import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { UsersRound } from 'lucide-react-native';

export default function SharedServicesSpecialistPage() {
  const agent = {
    id: 'shared-services-specialist',
    name: 'AI Shared Services Specialist',
    title: 'AI Shared Services Specialist',
    description: 'The AI Shared Services Specialist manages HR shared services operations, centralizes HR functions, and delivers efficient shared services across the organization.',
    capabilities: ["Shared Services Management","Centralization Strategy','Service Standardization','Process Integration','Shared Analytics','Cost Optimization','Service Delivery','Cross-Functional Support"],
    icon: UsersRound,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$4.5k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'shared-services-specialist',
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
      responseTime: '0.7s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'management',
      reportsTo: 'vp-hr-operations',
      manages: [],
    },
    specializedCapabilities: ['Shared Services Management','Centralization Strategy','Service Standardization','Process Integration','Cost Optimization'],
    integrationOptions: ['Shared Services Platforms','HRIS Systems','Process Tools','Analytics Systems'],
    automationFeatures: ['Service Standardization','Process Integration','Cost Optimization','Shared Analytics'],
    kpiMetrics: ['Service Efficiency','Cost Savings','Standardization Rate','Integration Success','Service Quality'],
    customOptions: { sharedFocus: 'comprehensive', standardizationLevel: 'high', costPriority: 'maximum' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'shared', enabled: true, name: 'Services Manager', description: 'Manages shared services' },
      { id: 'centralize', enabled: true, name: 'Centralization Strategist', description: 'Develops centralization strategies' },
      { id: 'standardize', enabled: true, name: 'Standardization Expert', description: 'Standardizes services' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sss_1', name: 'Shared Services Management', category: 'Management', description: 'Manage shared services', level: 'expert' },
      { id: 'sss_2', name: 'Centralization Strategy', category: 'Strategy', description: 'Develop centralization strategies', level: 'expert' },
      { id: 'sss_3', name: 'Service Standardization', category: 'Standardization', description: 'Standardize services', level: 'expert' }
    ],
    personality: [
      { trait: 'Service Focus', value: 10, description: 'Service oriented' },
      { trait: 'Collaborative', value: 9, description: 'Collaborative mindset' },
      { trait: 'Efficiency Driven', value: 9, description: 'Efficiency focused' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
