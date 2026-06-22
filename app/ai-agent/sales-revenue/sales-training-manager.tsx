import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function SalesTrainingManagerPage() {
  const agent = {
    id: 'sales-training-manager',
    name: 'AI Sales Training Manager',
    title: 'AI Sales Training Manager',
    description: 'The AI Sales Training Manager manages sales training programs, develops curriculum, and ensures team skill development.',
    capabilities: ["Task Automation","Data Processing","Sales Training","Curriculum Development","Skill Assessment","Communication","Analytics","Training Intelligence"],
    icon: DollarSign,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$4k/year',
    efficiency: '19x efficiency improvement',
    replacesRole: 'sales-training-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,900',
      tasksAutomatedDaily: 320,
      responseTime: '0.6s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'management',
      reportsTo: 'vp-sales',
      manages: [],
    },
    specializedCapabilities: [
      'Sales Training',
      'Curriculum Development',
      'Skill Assessment',
      'Communication',
      'Analytics',
      'Training Intelligence'
    ],
    integrationOptions: [
      'Training Platforms',
      'Learning Management Systems',
      'Assessment Tools',
      'Communication Platforms',
      'Analytics Systems',
      'Sales Systems',
      'Content Management',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Sales Training',
      'Curriculum Development',
      'Skill Assessment',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Training Intelligence'
    ],
    kpiMetrics: [
      'Training Effectiveness',
      'Curriculum Quality',
      'Skill Development',
      'Communication Effectiveness',
      'Training Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      trainingFocus: 'high',
      curriculumQuality: 'maximum',
      skillDevelopment: 'optimized',
      integrationLevel: 'comprehensive'
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
      { id: 'training', enabled: true, name: 'Training Engine', description: 'Manages training' },
      { id: 'curriculum', enabled: true, name: 'Curriculum Developer', description: 'Develops curriculum' },
      { id: 'assessment', enabled: true, name: 'Skill Assessor', description: 'Assesses skills' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_1', name: 'Sales Training', category: 'Training', description: 'Train sales teams', level: 'expert' },
      { id: 'sales_2', name: 'Curriculum Development', category: 'Curriculum', description: 'Develop curriculum', level: 'expert' },
      { id: 'sales_3', name: 'Skill Assessment', category: 'Assessment', description: 'Assess skills', level: 'expert' },
      { id: 'sales_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'sales_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Training Expertise', value: 10, description: 'Training expertise' },
      { trait: 'Education Focus', value: 10, description: 'Education oriented' },
      { trait: 'Skill Development', value: 10, description: 'Skill developer' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
