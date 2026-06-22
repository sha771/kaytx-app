import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { RefreshCw } from 'lucide-react-native';

export default function HRChangeManagementPage() {
  const agent = {
    id: 'hr-change-management',
    name: 'AI HR Change Management',
    title: 'AI HR Change Management',
    description: 'The AI HR Change Management manages organizational change and transformation initiatives.',
    capabilities: ["Task Automation","Data Processing","Change Management","Transformation Planning","Change Communication","Communication","Analytics","HR Intelligence"],
    icon: RefreshCw,
    color: '#F59E0B',
    type: 'agent' as const,
    humanCost: '$87k/year',
    aiCost: '$5k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'hr-change-management-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$6,800',
      tasksAutomatedDaily: 358,
      responseTime: '0.5s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'management',
      reportsTo: 'chro',
      manages: [],
    },
    specializedCapabilities: ['Change Management','Transformation Planning','Change Communication','Communication','Analytics','HR Intelligence'],
    integrationOptions: ['Change Platforms','Transformation Tools','Communication Platforms'],
    automationFeatures: ['Change Management','Transformation Planning','Change Communication','Communication Automation','Analytics Generation'],
    kpiMetrics: ['Change Success','Transformation Quality','Communication Impact','Communication Effectiveness','Cost Efficiency'],
    customOptions: { changeFocus: 'high', transformationEfficiency: 'maximum', integrationLevel: 'comprehensive' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'change', enabled: true, name: 'Change Manager', description: 'Manages change' },
      { id: 'transformation', enabled: true, name: 'Transformation Planner', description: 'Plans transformation' },
      { id: 'communication', enabled: true, name: 'Change Communicator', description: 'Communicates change' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'hr_1', name: 'Change Management', category: 'Change', description: 'Manage change', level: 'expert' },
      { id: 'hr_2', name: 'Transformation Planning', category: 'Transformation', description: 'Plan transformation', level: 'expert' },
      { id: 'hr_3', name: 'Change Communication', category: 'Communication', description: 'Communicate change', level: 'expert' }
    ],
    personality: [
      { trait: 'Change Expertise', value: 10, description: 'Change expertise' },
      { trait: 'Transformation Focus', value: 10, description: 'Transformation oriented' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
