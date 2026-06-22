import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function SecurityIotPage() {
  const agent = {
    id: 'security-iot',
    name: 'AI Security IoT',
    title: 'AI Security IoT',
    description: 'The AI Security IoT manages IoT security and device protection.',
    capabilities: ["Task Automation","Data Processing","IoT Security","Device Protection","IoT Network Security","Communication","Analytics","Security Intelligence"],
    icon: Cpu,
    color: '#DC2626',
    type: 'agent' as const,
    humanCost: '$87k/year',
    aiCost: '$5k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'security-iot-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$6,600',
      tasksAutomatedDaily: 352,
      responseTime: '0.5s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Security & Risk',
      level: 'management',
      reportsTo: 'ciso',
      manages: [],
    },
    specializedCapabilities: ['IoT Security','Device Protection','IoT Network Security','Communication','Analytics','Security Intelligence'],
    integrationOptions: ['IoT Platforms','Protection Tools','Network Security Systems','Communication Platforms'],
    automationFeatures: ['IoT Security','Device Protection','IoT Network Security','Communication Automation','Analytics Generation'],
    kpiMetrics: ['IoT Quality','Protection Success','Network Security Impact','Communication Effectiveness','Cost Efficiency'],
    customOptions: { iotFocus: 'high', protectionEfficiency: 'maximum', integrationLevel: 'comprehensive' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'iot', enabled: true, name: 'IoT Security Manager', description: 'Manages IoT security' },
      { id: 'device', enabled: true, name: 'Device Protector', description: 'Protects devices' },
      { id: 'network', enabled: true, name: 'IoT Network Security Specialist', description: 'Specializes in network security' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'security_1', name: 'IoT Security', category: 'IoT', description: 'Secure IoT', level: 'expert' },
      { id: 'security_2', name: 'Device Protection', category: 'Device', description: 'Protect devices', level: 'expert' },
      { id: 'security_3', name: 'IoT Network Security', category: 'Network', description: 'Secure IoT networks', level: 'expert' }
    ],
    personality: [
      { trait: 'IoT Expertise', value: 10, description: 'IoT expertise' },
      { trait: 'Device Focus', value: 10, description: 'Device oriented' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
