import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Smartphone } from 'lucide-react-native';

export default function RestaurantTechnologyDirectorPage() {
  const agent = {
    id: 'restaurant-technology-director',
    name: 'AI Restaurant Technology Director',
    title: 'AI Restaurant Technology Director',
    description: 'The AI Restaurant Technology Director manages restaurant technology systems, oversees digital transformation, implements POS and kitchen technology, and ensures seamless technology integration across all restaurant operations.',
    capabilities: ["Restaurant Technology","Digital Transformation","POS Systems","Kitchen Technology","Online Ordering","Payment Systems","Restaurant Apps","Technology Integration","Digital Operations","Tech Innovation"],
    icon: Smartphone,
    color: '#2196F3',
    type: 'employee' as const,
    humanCost: '$125k/year',
    aiCost: '$4k/year',
    efficiency: '31x efficiency improvement',
    replacesRole: 'restaurant-technology-director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$10,000',
      tasksAutomatedDaily: 420,
      responseTime: '1.2s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Restaurants',
      level: 'director',
      reportsTo: 'chief-restaurant-officer',
      manages: ['pos-manager', 'kitchen-tech-lead', 'digital-operations'],
    },
    specializedCapabilities: [
      'Restaurant Technology',
      'Digital Transformation',
      'POS Systems',
      'Kitchen Technology',
      'Online Ordering',
      'Payment Systems',
      'Restaurant Apps',
      'Technology Integration'
    ],
    integrationOptions: [
      'POS Systems',
      'Kitchen Display',
      'Online Ordering',
      'Payment Platforms',
      'Restaurant Apps',
      'Digital Tools',
      'Integration Platforms',
      'Analytics Systems'
    ],
    automationFeatures: [
      'Technology Management',
      'Digital Transformation',
      'POS Operations',
      'Kitchen Technology',
      'Online Ordering',
      'Payment Processing',
      'Restaurant Apps',
      'Digital Operations'
    ],
    kpiMetrics: [
      'Technology Uptime',
      'Digital Adoption',
      'POS Efficiency',
      'Kitchen Display Success',
      'Online Ordering Growth',
      'Payment Processing',
      'App Usage',
      'Digital Revenue'
    ],
    customOptions: {
      techStrategy: 'digital-first',
      posIntegration: 'seamless',
      kitchenDisplay: 'advanced',
      onlineOrdering: 'optimized',
      paymentSystems: 'modern'
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
      { id: 'tech', enabled: true, name: 'Tech Innovator', description: 'Innovates restaurant technology' },
      { id: 'digital', enabled: true, name: 'Digital Transformer', description: 'Transforms restaurant operations' },
      { id: 'integration', enabled: true, name: 'Integration Manager', description: 'Manages technology integration' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'restech_1', name: 'Restaurant Technology', category: 'Technology', description: 'Manage restaurant technology', level: 'expert' },
      { id: 'restech_2', name: 'Digital Transformation', category: 'Digital', description: 'Lead digital transformation', level: 'expert' },
      { id: 'restech_3', name: 'POS Systems', category: 'POS', description: 'Manage POS systems', level: 'expert' },
      { id: 'restech_4', name: 'Kitchen Technology', category: 'Kitchen', description: 'Manage kitchen technology', level: 'expert' },
      { id: 'restech_5', name: 'Technology Integration', category: 'Integration', description: 'Integrate technology systems', level: 'expert' }
    ],
    personality: [
      { trait: 'Technical Excellence', value: 10, description: 'Technical expert' },
      { trait: 'Innovation', value: 10, description: 'Technology innovator' },
      { trait: 'Digital Focus', value: 10, description: 'Digital transformation leader' },
      { trait: 'Problem Solving', value: 10, description: 'Exceptional problem solver' },
      { trait: 'Operations Focus', value: 9, description: 'Operations-optimized technology' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}