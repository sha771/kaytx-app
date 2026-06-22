import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Presentation } from 'lucide-react-native';

export default function SalesTrainerLeadPage() {
  const agent = {
    id: 'sales-trainer-lead',
    name: 'AI Sales Trainer Lead',
    title: 'AI Sales Trainer Lead',
    description: 'The AI Sales Trainer Lead leads sales training initiatives to develop team capabilities and improve overall performance.',
    capabilities: ["Task Automation","Data Processing","Training Leadership","Capability Development","Performance Improvement","Communication","Analytics","Sales Intelligence"],
    icon: Presentation,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$89k/year',
    aiCost: '$5k/year',
    efficiency: '18x efficiency improvement',
    replacesRole: 'sales-trainer-lead',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$7,000',
      tasksAutomatedDaily: 368,
      responseTime: '0.5s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'management',
      reportsTo: 'vp-sales',
      manages: [],
    },
    specializedCapabilities: [
      'Training Leadership',
      'Capability Development',
      'Performance Improvement',
      'Communication',
      'Analytics',
      'Sales Intelligence'
    ],
    integrationOptions: [
      'Training Platforms',
      'Learning Systems',
      'Performance Tools',
      'Communication Platforms',
      'Training Data',
      'Capability Data',
      'Sales Systems',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Training Leadership',
      'Capability Development',
      'Performance Improvement',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Sales Intelligence'
    ],
    kpiMetrics: [
      'Training Quality',
      'Capability Growth',
      'Performance Impact',
      'Communication Effectiveness',
      'Sales Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      trainingFocus: 'high',
      capabilityEfficiency: 'maximum',
      improvementAccuracy: 'optimized',
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
      { id: 'training', enabled: true, name: 'Training Leader', description: 'Leads training' },
      { id: 'capability', enabled: true, name: 'Capability Developer', description: 'Develops capabilities' },
      { id: 'improvement', enabled: true, name: 'Performance Improver', description: 'Improves performance' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_1', name: 'Training Leadership', category: 'Training', description: 'Lead training', level: 'expert' },
      { id: 'sales_2', name: 'Capability Development', category: 'Capability', description: 'Develop capabilities', level: 'expert' },
      { id: 'sales_3', name: 'Performance Improvement', category: 'Performance', description: 'Improve performance', level: 'expert' },
      { id: 'sales_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'sales_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Training Expertise', value: 10, description: 'Training expertise' },
      { trait: 'Capability Focus', value: 10, description: 'Capability oriented' },
      { trait: 'Improvement Skills', value: 10, description: 'Improvement skilled' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
