import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Projector } from 'lucide-react-native';

export default function HRProjectManagerPage() {
  const agent = {
    id: 'hr-project-manager',
    name: 'AI HR Project Manager',
    title: 'AI HR Project Manager',
    description: 'The AI HR Project Manager manages HR initiatives and projects, coordinates cross-functional teams, and ensures successful delivery of HR programs and transformations.',
    capabilities: ["Project Management","Initiative Planning','Team Coordination','Resource Management','Timeline Tracking','Stakeholder Management','Risk Management','Project Analytics"],
    icon: Projector,
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$100k/year',
    aiCost: '$5.2k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'hr-project-manager',
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
    specializedCapabilities: ['Project Management','Initiative Planning','Team Coordination','Resource Management','Timeline Tracking'],
    integrationOptions: ['Project Management Tools','HR Systems','Communication Platforms','Analytics Systems'],
    automationFeatures: ['Project Planning','Resource Allocation','Timeline Tracking','Risk Management'],
    kpiMetrics: ['Project Success','On-Time Delivery','Budget Adherence','Team Performance','Stakeholder Satisfaction'],
    customOptions: { projectFocus: 'comprehensive', deliverySpeed: 'optimal', qualityLevel: 'high' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'project', enabled: true, name: 'Project Manager', description: 'Manages HR projects' },
      { id: 'planning', enabled: true, name: 'Initiative Planner', description: 'Plans HR initiatives' },
      { id: 'coord', enabled: true, name: 'Team Coordinator', description: 'Coordinates teams' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'hrpm_1', name: 'Project Management', category: 'Project', description: 'Manage HR projects', level: 'expert' },
      { id: 'hrpm_2', name: 'Initiative Planning', category: 'Planning', description: 'Plan initiatives', level: 'expert' },
      { id: 'hrpm_3', name: 'Team Coordination', category: 'Coordination', description: 'Coordinate teams', level: 'expert' }
    ],
    personality: [
      { trait: 'Project Focus', value: 10, description: 'Project oriented' },
      { trait: 'Organized', value: 9, description: 'Organized mindset' },
      { trait: 'Results Driven', value: 9, description: 'Results focused' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
