import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Package } from 'lucide-react-native';

export default function ProductMarketingPage() {
  const agent = {
    id: 'product-marketing',
    name: 'AI Product Marketing',
    title: 'AI Product Marketing',
    description: 'The AI Product Marketing develops go-to-market strategies and product positioning to drive product adoption and revenue.',
    capabilities: ["Task Automation","Data Processing","Product Marketing","Go-to-Market Strategy","Product Positioning","Communication","Analytics","Marketing Intelligence"],
    icon: Package,
    color: '#F59E0B',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$5k/year',
    efficiency: '18x efficiency improvement',
    replacesRole: 'product-marketing-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$7,100',
      tasksAutomatedDaily: 368,
      responseTime: '0.5s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Marketing & Growth',
      level: 'management',
      reportsTo: 'cmo',
      manages: [],
    },
    specializedCapabilities: [
      'Product Marketing',
      'Go-to-Market Strategy',
      'Product Positioning',
      'Communication',
      'Analytics',
      'Marketing Intelligence'
    ],
    integrationOptions: [
      'Product Platforms',
      'GTM Tools',
      'Positioning Systems',
      'Communication Platforms',
      'Product Data',
      'GTM Data',
      'Marketing Systems',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Product Marketing',
      'Go-to-Market Strategy',
      'Product Positioning',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Marketing Intelligence'
    ],
    kpiMetrics: [
      'Product Adoption',
      'GTM Success',
      'Positioning Quality',
      'Communication Effectiveness',
      'Marketing Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      productFocus: 'high',
      gtmEfficiency: 'maximum',
      positioningAccuracy: 'optimized',
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
      { id: 'product', enabled: true, name: 'Product Marketer', description: 'Markets products' },
      { id: 'gtm', enabled: true, name: 'GTM Strategist', description: 'Strategizes GTM' },
      { id: 'positioning', enabled: true, name: 'Positioning Expert', description: 'Expert in positioning' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'marketing_1', name: 'Product Marketing', category: 'Product', description: 'Market products', level: 'expert' },
      { id: 'marketing_2', name: 'Go-to-Market Strategy', category: 'GTM', description: 'Strategy GTM', level: 'expert' },
      { id: 'marketing_3', name: 'Product Positioning', category: 'Positioning', description: 'Position products', level: 'expert' },
      { id: 'marketing_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'marketing_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Product Expertise', value: 10, description: 'Product expertise' },
      { trait: 'GTM Focus', value: 10, description: 'GTM oriented' },
      { trait: 'Positioning Skills', value: 10, description: 'Positioning skilled' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
