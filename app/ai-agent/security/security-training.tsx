import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { GraduationCap } from 'lucide-react-native';

export default function SecurityTrainingPage() {
  const agent = {
    id: 'security-training',
    name: 'AI Security Training',
    title: 'AI Security Training',
    description: 'The AI Security Training manages security training and awareness programs.',
    capabilities: ["Task Automation","Data Processing","Training Management","Security Awareness","Employee Education","Communication","Analytics","Security Intelligence"],
    icon: GraduationCap,
    color: '#DC2626',
    type: 'agent' as const,
    humanCost: '$86k/year',
    aiCost: '$5k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'security-training-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$6,500',
      tasksAutomatedDaily: 345,
      responseTime: '0.5s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Security & Risk',
      level: 'management',
      reportsTo: 'ciso',
      manages: [],
    },
    specializedCapabilities: ['Training Management','Security Awareness','Employee Education','Communication','Analytics','Security Intelligence'],
    integrationOptions: ['Training Platforms','Awareness Tools','Education Systems','Communication Platforms'],
    automationFeatures: ['Training Management','Security Awareness','Employee Education','Communication Automation','Analytics Generation'],
    kpiMetrics: ['Training Quality','Awareness Success','Education Impact','Communication Effectiveness','Cost Efficiency'],
    customOptions: { trainingFocus: 'high', awarenessEfficiency: 'maximum', integrationLevel: 'comprehensive' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'training', enabled: true, name: 'Training Manager', description: 'Manages training' },
      { id: 'awareness', enabled: true, name: 'Security Awareness Specialist', description: 'Specializes in awareness' },
      { id: 'education', enabled: true, name: 'Employee Educator', description: 'Educates employees' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'security_1', name: 'Training Management', category: 'Training', description: 'Manage training', level: 'expert' },
      { id: 'security_2', name: 'Security Awareness', category: 'Awareness', description: 'Raise awareness', level: 'expert' },
      { id: 'security_3', name: 'Employee Education', category: 'Education', description: 'Educate employees', level: 'expert' }
    ],
    personality: [
      { trait: 'Training Expertise', value: 10, description: 'Training expertise' },
      { trait: 'Awareness Focus', value: 10, description: 'Awareness oriented' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
