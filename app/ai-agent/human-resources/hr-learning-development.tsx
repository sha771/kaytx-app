import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { GraduationCap } from 'lucide-react-native';

export default function HRLearningDevelopmentPage() {
  const agent = {
    id: 'hr-learning-development',
    name: 'AI HR Learning & Development',
    title: 'AI HR Learning & Development',
    description: 'The AI HR Learning & Development manages learning programs and employee development.',
    capabilities: ["Task Automation","Data Processing","Learning Management","Development Planning","Training Programs","Communication","Analytics","HR Intelligence"],
    icon: GraduationCap,
    color: '#F59E0B',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$5k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'hr-learning-development-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$6,700',
      tasksAutomatedDaily: 355,
      responseTime: '0.5s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'management',
      reportsTo: 'chro',
      manages: [],
    },
    specializedCapabilities: ['Learning Management','Development Planning','Training Programs','Communication','Analytics','HR Intelligence'],
    integrationOptions: ['Learning Platforms','Development Tools','Training Systems','Communication Platforms'],
    automationFeatures: ['Learning Management','Development Planning','Training Programs','Communication Automation','Analytics Generation'],
    kpiMetrics: ['Learning Quality','Development Success','Training Impact','Communication Effectiveness','Cost Efficiency'],
    customOptions: { learningFocus: 'high', developmentEfficiency: 'maximum', integrationLevel: 'comprehensive' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'learning', enabled: true, name: 'Learning Manager', description: 'Manages learning' },
      { id: 'development', enabled: true, name: 'Development Planner', description: 'Plans development' },
      { id: 'training', enabled: true, name: 'Training Program Manager', description: 'Manages training' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'hr_1', name: 'Learning Management', category: 'Learning', description: 'Manage learning', level: 'expert' },
      { id: 'hr_2', name: 'Development Planning', category: 'Development', description: 'Plan development', level: 'expert' },
      { id: 'hr_3', name: 'Training Programs', category: 'Training', description: 'Manage training', level: 'expert' }
    ],
    personality: [
      { trait: 'Learning Expertise', value: 10, description: 'Learning expertise' },
      { trait: 'Development Focus', value: 10, description: 'Development oriented' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
