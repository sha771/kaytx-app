import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bug } from 'lucide-react-native';

export default function PestManagementSpecialistPage() {
  const agent = {
    id: 'pest-management-specialist',
    name: 'AI Pest Management Specialist',
    title: 'AI Pest Management Specialist',
    description: 'The AI Pest Management Specialist manages pest control programs, monitors pest activity, and ensures effective and sustainable pest management.',
    capabilities: ["Task Automation","Data Processing","Pest Management","Pest Monitoring","Control Strategies","Integrated Pest Management","Pesticide Management","Biological Control","Prevention Programs","Pest Identification"],
    icon: Bug,
    color: '#8BC34A',
    type: 'employee' as const,
    humanCost: '$70k/year',
    aiCost: '$2.5k/year',
    efficiency: '28x efficiency improvement',
    replacesRole: 'pest-management-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$5,625',
      tasksAutomatedDaily: 475,
      responseTime: '2.0s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Agriculture',
      level: 'specialist',
      reportsTo: 'vp-crop-production',
      manages: [],
    },
    specializedCapabilities: [
      'Pest Management',
      'Pest Monitoring',
      'Control Strategies',
      'Integrated Pest Management',
      'Pesticide Management',
      'Biological Control',
      'Prevention Programs',
      'Pest Identification',
      'Resistance Management',
      'Sustainable Control'
    ],
    integrationOptions: [
      'Pest Management Systems',
      'Monitoring Platforms',
      'Control Tools',
      'IPM Software',
      'Pesticide Tracking',
      'Biological Control',
      'Identification Tools',
      'Analytics Platforms'
    ],
    automationFeatures: [
      'Pest Monitoring',
      'Control Strategy',
      'IPM Implementation',
      'Pesticide Management',
      'Biological Control',
      'Prevention Programs',
      'Pest Identification',
      'Report Generation'
    ],
    kpiMetrics: [
      'Pest Control Success',
      'Monitoring Accuracy',
      'IPM Effectiveness',
      'Pesticide Efficiency',
      'Biological Control Rate',
      'Prevention Success',
      'Identification Accuracy',
      'Resistance Management'
    ],
    customOptions: {
      controlStrategy: 'integrated',
      pesticideUse: 'minimal',
      biologicalControl: 'priority',
      preventionLevel: 'maximum',
      sustainabilityFocus: 'high'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: false,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: true,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'pest', enabled: true, name: 'Pest Monitor', description: 'Monitors pest activity' },
      { id: 'control', enabled: true, name: 'Control Optimizer', description: 'Optimizes pest control' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'pms_1', name: 'Pest Management', category: 'Pest', description: 'Manage pest control', level: 'expert' },
      { id: 'pms_2', name: 'Pest Monitoring', category: 'Monitoring', description: 'Monitor pest activity', level: 'expert' },
      { id: 'pms_3', name: 'IPM', category: 'IPM', description: 'Implement IPM', level: 'expert' }
    ],
    personality: [
      { trait: 'Control', value: 10, description: 'Control-focused' },
      { trait: 'Sustainability', value: 10, description: 'Sustainability-oriented' },
      { trait: 'Prevention', value: 9, description: 'Prevention-minded' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
