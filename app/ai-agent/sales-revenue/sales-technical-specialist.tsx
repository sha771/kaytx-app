import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function SalesTechnicalSpecialistPage() {
  const agent = {
    id: 'sales-technical-specialist',
    name: 'AI Sales Technical Specialist',
    title: 'AI Sales Technical Specialist',
    description: 'The AI Sales Technical Specialist provides technical expertise and support for complex product sales and demonstrations.',
    capabilities: ["Task Automation","Data Processing","Technical Sales","Product Expertise","Technical Demos","Communication","Analytics","Sales Intelligence"],
    icon: Cpu,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$92k/year',
    aiCost: '$5k/year',
    efficiency: '18x efficiency improvement',
    replacesRole: 'technical-sales-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7,200',
      tasksAutomatedDaily: 368,
      responseTime: '0.5s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'specialist',
      reportsTo: 'vp-sales',
      manages: [],
    },
    specializedCapabilities: [
      'Technical Sales',
      'Product Expertise',
      'Technical Demos',
      'Communication',
      'Analytics',
      'Sales Intelligence'
    ],
    integrationOptions: [
      'Technical Platforms',
      'Product Systems',
      'Demo Tools',
      'Communication Platforms',
      'Technical Data',
      'Product Data',
      'Sales Systems',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Technical Sales',
      'Product Expertise',
      'Technical Demos',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Sales Intelligence'
    ],
    kpiMetrics: [
      'Technical Win Rate',
      'Product Knowledge',
      'Demo Success',
      'Communication Effectiveness',
      'Sales Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      technicalFocus: 'high',
      salesEfficiency: 'maximum',
      demoAccuracy: 'optimized',
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
      { id: 'technical', enabled: true, name: 'Technical Sales Engine', description: 'Technical sales expertise' },
      { id: 'product', enabled: true, name: 'Product Expert', description: 'Product expertise' },
      { id: 'demo', enabled: true, name: 'Demo Specialist', description: 'Demo specialist' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_1', name: 'Technical Sales', category: 'Technical', description: 'Technical sales', level: 'expert' },
      { id: 'sales_2', name: 'Product Expertise', category: 'Product', description: 'Product expertise', level: 'expert' },
      { id: 'sales_3', name: 'Technical Demos', category: 'Demo', description: 'Technical demos', level: 'expert' },
      { id: 'sales_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'sales_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Technical Expertise', value: 10, description: 'Technical expertise' },
      { trait: 'Product Focus', value: 10, description: 'Product oriented' },
      { trait: 'Demo Skills', value: 10, description: 'Demo skilled' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
