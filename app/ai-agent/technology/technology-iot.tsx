import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Radio } from 'lucide-react-native';

export default function TechnologyIoTPage() {
  const agent = {
    id: 'technology-iot',
    name: 'AI Technology IoT',
    title: 'AI Technology IoT',
    description: 'The AI Technology IoT manages IoT device development and IoT infrastructure.',
    capabilities: ["Task Automation","Data Processing","IoT Development","Device Management","IoT Infrastructure","Communication","Analytics","Technology Intelligence"],
    icon: Radio,
    color: '#8B5CF6',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$5k/year',
    efficiency: '18x efficiency improvement',
    replacesRole: 'technology-iot-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$7,000',
      tasksAutomatedDaily: 365,
      responseTime: '0.5s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Technology & Engineering',
      level: 'management',
      reportsTo: 'cto',
      manages: [],
    },
    specializedCapabilities: ['IoT Development','Device Management','IoT Infrastructure','Communication','Analytics','Technology Intelligence'],
    integrationOptions: ['IoT Platforms','Device Tools','Infrastructure Systems','Communication Platforms'],
    automationFeatures: ['IoT Development','Device Management','IoT Infrastructure','Communication Automation','Analytics Generation'],
    kpiMetrics: ['IoT Quality','Device Success','Infrastructure Efficiency','Communication Effectiveness','Cost Efficiency'],
    customOptions: { iotFocus: 'high', deviceEfficiency: 'maximum', integrationLevel: 'comprehensive' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'iot', enabled: true, name: 'IoT Developer', description: 'Develops IoT' },
      { id: 'device', enabled: true, name: 'Device Manager', description: 'Manages devices' },
      { id: 'infrastructure', enabled: true, name: 'IoT Infrastructure Manager', description: 'Manages infrastructure' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'tech_1', name: 'IoT Development', category: 'IoT', description: 'Develop IoT', level: 'expert' },
      { id: 'tech_2', name: 'Device Management', category: 'Device', description: 'Manage devices', level: 'expert' },
      { id: 'tech_3', name: 'IoT Infrastructure', category: 'Infrastructure', description: 'Manage infrastructure', level: 'expert' }
    ],
    personality: [
      { trait: 'IoT Expertise', value: 10, description: 'IoT expertise' },
      { trait: 'Device Focus', value: 10, description: 'Device oriented' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
