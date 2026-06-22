import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { RefreshCw } from 'lucide-react-native';

export default function ChangeManagementSpecialistPage() {
  const agent = {
    id: 'change-management-specialist',
    name: 'AI Change Management Specialist',
    title: 'AI Change Management Specialist',
    description: 'The AI Change Management Specialist designs and implements change management strategies, supports organizational transformations, and ensures successful change adoption.',
    capabilities: ["Change Strategy","Transformation Planning","Stakeholder Management','Communication Planning','Adoption Support','Resistance Management','Change Analytics','Sustainment Planning"],
    icon: RefreshCw,
    color: '#FF9800',
    type: 'agent' as const,
    humanCost: '$100k/year',
    aiCost: '$5.2k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'change-management-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$7,900',
      tasksAutomatedDaily: 385,
      responseTime: '0.6s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'management',
      reportsTo: 'chro',
      manages: [],
    },
    specializedCapabilities: ['Change Strategy','Transformation Planning','Stakeholder Management','Communication Planning','Adoption Support'],
    integrationOptions: ['Change Management Tools','Communication Platforms','Analytics Systems','Project Management'],
    automationFeatures: ['Change Planning','Stakeholder Analysis','Communication Management','Adoption Tracking'],
    kpiMetrics: ['Change Adoption','Transformation Success','Stakeholder Engagement','Resistance Reduction','Sustainment Rate'],
    customOptions: { changeFocus: 'comprehensive', adoptionLevel: 'high', transformationSpeed: 'optimal' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'change', enabled: true, name: 'Change Strategist', description: 'Develops change strategies' },
      { id: 'transform', enabled: true, name: 'Transformation Planner', description: 'Plans transformations' },
      { id: 'adopt', enabled: true, name: 'Adoption Specialist', description: 'Supports change adoption' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'cms_1', name: 'Change Strategy', category: 'Strategy', description: 'Develop change strategies', level: 'expert' },
      { id: 'cms_2', name: 'Transformation Planning', category: 'Planning', description: 'Plan transformations', level: 'expert' },
      { id: 'cms_3', name: 'Stakeholder Management', category: 'Stakeholders', description: 'Manage stakeholders', level: 'expert' }
    ],
    personality: [
      { trait: 'Change Focus', value: 10, description: 'Change oriented' },
      { trait: 'Adaptive', value: 9, description: 'Adaptive mindset' },
      { trait: 'Transformational', value: 9, description: 'Transformation focused' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
