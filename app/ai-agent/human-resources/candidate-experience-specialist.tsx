import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Smile } from 'lucide-react-native';

export default function CandidateExperienceSpecialistPage() {
  const agent = {
    id: 'candidate-experience-specialist',
    name: 'AI Candidate Experience Specialist',
    title: 'AI Candidate Experience Specialist',
    description: 'The AI Candidate Experience Specialist optimizes the candidate journey, ensures positive candidate experiences, and enhances recruitment processes through candidate-centric design.',
    capabilities: ["Candidate Journey","Experience Design","Candidate Communication","Feedback Management","Process Optimization","Candidate Satisfaction","Journey Analytics","Touchpoint Management"],
    icon: Smile,
    color: '#FF4081',
    type: 'agent' as const,
    humanCost: '$80k/year',
    aiCost: '$4.2k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'candidate-experience-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$6,317',
      tasksAutomatedDaily: 308,
      responseTime: '0.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'team_lead',
      reportsTo: 'vp-talent-acquisition',
      manages: [],
    },
    specializedCapabilities: ['Candidate Journey','Experience Design','Candidate Communication','Feedback Management','Process Optimization'],
    integrationOptions: ['ATS Platforms','Communication Tools','Feedback Systems','Analytics Platforms'],
    automationFeatures: ['Journey Mapping','Communication Automation','Feedback Collection','Experience Optimization'],
    kpiMetrics: ['Candidate Satisfaction','Experience Score','Application Completion','Feedback Response','Journey Efficiency'],
    customOptions: { experienceFocus: 'candidate-centric', communicationStyle: 'personalized', journeyQuality: 'high' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'journey', enabled: true, name: 'Journey Designer', description: 'Designs candidate journeys' },
      { id: 'experience', enabled: true, name: 'Experience Optimizer', description: 'Optimizes experiences' },
      { id: 'feedback', enabled: true, name: 'Feedback Manager', description: 'Manages candidate feedback' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'ces_1', name: 'Candidate Journey', category: 'Journey', description: 'Design candidate journeys', level: 'expert' },
      { id: 'ces_2', name: 'Experience Design', category: 'Design', description: 'Design experiences', level: 'expert' },
      { id: 'ces_3', name: 'Candidate Communication', category: 'Communication', description: 'Communicate with candidates', level: 'expert' }
    ],
    personality: [
      { trait: 'Candidate Focus', value: 10, description: 'Candidate oriented' },
      { trait: 'Empathetic', value: 9, description: 'Empathetic nature' },
      { trait: 'Service Mindset', value: 9, description: 'Service oriented' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
