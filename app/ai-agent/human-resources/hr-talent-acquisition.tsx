import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function HRTalentAcquisitionPage() {
  const agent = {
    id: 'hr-talent-acquisition',
    name: 'AI HR Talent Acquisition',
    title: 'AI HR Talent Acquisition',
    description: 'The AI HR Talent Acquisition manages talent acquisition and recruitment strategies.',
    capabilities: ["Task Automation","Data Processing","Talent Acquisition","Recruitment Strategy","Candidate Sourcing","Communication","Analytics","HR Intelligence"],
    icon: Users,
    color: '#F59E0B',
    type: 'agent' as const,
    humanCost: '$88k/year',
    aiCost: '$5k/year',
    efficiency: '18x efficiency improvement',
    replacesRole: 'hr-talent-acquisition-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$6,900',
      tasksAutomatedDaily: 362,
      responseTime: '0.5s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'management',
      reportsTo: 'chro',
      manages: [],
    },
    specializedCapabilities: ['Talent Acquisition','Recruitment Strategy','Candidate Sourcing','Communication','Analytics','HR Intelligence'],
    integrationOptions: ['Acquisition Platforms','Recruitment Tools','Sourcing Systems','Communication Platforms'],
    automationFeatures: ['Talent Acquisition','Recruitment Strategy','Candidate Sourcing','Communication Automation','Analytics Generation'],
    kpiMetrics: ['Acquisition Quality','Recruitment Success','Sourcing Impact','Communication Effectiveness','Cost Efficiency'],
    customOptions: { acquisitionFocus: 'high', recruitmentEfficiency: 'maximum', integrationLevel: 'comprehensive' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'acquisition', enabled: true, name: 'Talent Acquirer', description: 'Acquires talent' },
      { id: 'recruitment', enabled: true, name: 'Recruitment Strategist', description: 'Strategizes recruitment' },
      { id: 'sourcing', enabled: true, name: 'Candidate Sourcer', description: 'Sources candidates' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'hr_1', name: 'Talent Acquisition', category: 'Acquisition', description: 'Acquire talent', level: 'expert' },
      { id: 'hr_2', name: 'Recruitment Strategy', category: 'Recruitment', description: 'Strategy recruitment', level: 'expert' },
      { id: 'hr_3', name: 'Candidate Sourcing', category: 'Sourcing', description: 'Source candidates', level: 'expert' }
    ],
    personality: [
      { trait: 'Acquisition Expertise', value: 10, description: 'Acquisition expertise' },
      { trait: 'Recruitment Focus', value: 10, description: 'Recruitment oriented' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
