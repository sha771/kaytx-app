import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Mountain } from 'lucide-react-native';

export default function AdventureSpecialistPage() {
  const agent = {
    id: 'adventure-specialist',
    name: 'AI Adventure Specialist',
    title: 'AI Adventure Specialist',
    description: 'The AI Adventure Specialist designs and manages adventure activities, ensures adventure safety, provides expert guidance, and delivers thrilling adventure experiences.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Adventure Design","Safety Management","Expert Guidance","Risk Assessment","Adventure Delivery","Equipment Management","Experience Quality"],
    icon: Mountain,
    color: '#1B5E20',
    type: 'employee' as const,
    humanCost: '$55k/year',
    aiCost: '$1.2k/year',
    efficiency: '45x efficiency improvement',
    replacesRole: 'adventure-specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,400',
      tasksAutomatedDaily: 350,
      responseTime: '1.1s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'specialist',
      reportsTo: 'vp-tour-experiences',
      manages: [],
    },
    specializedCapabilities: [
      'Adventure Design',
      'Safety Management',
      'Expert Guidance',
      'Risk Assessment',
      'Adventure Delivery',
      'Equipment Management',
      'Experience Quality',
      'Adventure Innovation'
    ],
    integrationOptions: [
      'Adventure Platforms',
      'Safety Systems',
      'Equipment Management',
      'Risk Assessment Tools',
      'Communication Systems',
      'Weather Services',
      'Emergency Systems'
    ],
    automationFeatures: [
      'Adventure Design',
      'Safety Management',
      'Expert Guidance',
      'Risk Assessment',
      'Adventure Delivery',
      'Equipment Management',
      'Experience Quality',
      'Adventure Innovation'
    ],
    kpiMetrics: [
      'Adventure Satisfaction',
      'Safety Record',
      'Risk Management',
      'Equipment Reliability',
      'Experience Quality',
      'Guest Safety',
      'Adventure Innovation',
      'Expertise Delivery'
    ],
    customOptions: {
      safetyPriority: 'high',
      experienceQuality: 'premium',
      riskManagement: 'strict',
      equipmentReliability: 'high',
      adventureInnovation: 'high'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: true,
      sentimentAnalysis: true,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'adventure', enabled: true, name: 'Adventure Designer', description: 'Designs adventure experiences' },
      { id: 'risk', enabled: true, name: 'Risk Assessor', description: 'Assesses adventure risks' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'adventure_1', name: 'Adventure Design', category: 'Adventure', description: 'Design adventures', level: 'expert' },
      { id: 'adventure_2', name: 'Safety Management', category: 'Safety', description: 'Manage safety', level: 'expert' },
      { id: 'adventure_3', name: 'Expert Guidance', category: 'Guidance', description: 'Provide expert guidance', level: 'expert' },
      { id: 'adventure_4', name: 'Risk Assessment', category: 'Risk', description: 'Assess risks', level: 'expert' },
      { id: 'adventure_5', name: 'Adventure Delivery', category: 'Delivery', description: 'Deliver adventures', level: 'advanced' }
    ],
    personality: [
      { trait: 'Adventure Focus', value: 10, description: 'Adventure-oriented' },
      { trait: 'Safety Conscious', value: 10, description: 'Safety-conscious' },
      { trait: 'Expertise', value: 10, description: 'Expert knowledge' },
      { trait: 'Thrill Focus', value: 9, description: 'Thrill-seeking' },
      { trait: 'Risk Management', value: 9, description: 'Risk-aware' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
