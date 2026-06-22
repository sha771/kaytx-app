import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Globe2 } from 'lucide-react-native';

export default function SalesGlobalManagerPage() {
  const agent = {
    id: 'sales-global-manager',
    name: 'AI Sales Global Manager',
    title: 'AI Sales Global Manager',
    description: 'The AI Sales Global Manager manages global sales operations, international markets, and cross-border sales strategies.',
    capabilities: ["Task Automation","Data Processing","Global Management","International Strategy","Cross-border Sales","Communication","Analytics","Sales Intelligence"],
    icon: Globe2,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$6k/year',
    efficiency: '20x efficiency improvement',
    replacesRole: 'global-sales-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$9,500',
      tasksAutomatedDaily: 420,
      responseTime: '0.5s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'management',
      reportsTo: 'chief-revenue-officer',
      manages: [],
    },
    specializedCapabilities: [
      'Global Management',
      'International Strategy',
      'Cross-border Sales',
      'Communication',
      'Analytics',
      'Sales Intelligence'
    ],
    integrationOptions: [
      'Global Platforms',
      'International Systems',
      'Analytics Tools',
      'Communication Platforms',
      'Global Data',
      'International Data',
      'Sales Systems',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Global Management',
      'International Strategy',
      'Cross-border Sales',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Sales Intelligence'
    ],
    kpiMetrics: [
      'Global Revenue',
      'International Penetration',
      'Cross-border Success',
      'Communication Effectiveness',
      'Sales Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      globalFocus: 'high',
      managementEfficiency: 'maximum',
      internationalAccuracy: 'optimized',
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
      { id: 'global', enabled: true, name: 'Global Manager', description: 'Manages global operations' },
      { id: 'international', enabled: true, name: 'International Strategist', description: 'International strategy' },
      { id: 'crossborder', enabled: true, name: 'Cross-border Specialist', description: 'Cross-border specialist' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_1', name: 'Global Management', category: 'Global', description: 'Manage globally', level: 'expert' },
      { id: 'sales_2', name: 'International Strategy', category: 'International', description: 'International strategy', level: 'expert' },
      { id: 'sales_3', name: 'Cross-border Sales', category: 'Cross-border', description: 'Cross-border sales', level: 'expert' },
      { id: 'sales_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'sales_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Global Expertise', value: 10, description: 'Global expertise' },
      { trait: 'International Focus', value: 10, description: 'International oriented' },
      { trait: 'Cross-border Skills', value: 10, description: 'Cross-border skilled' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
