import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Wine } from 'lucide-react-native';

export default function BarManagerPage() {
  const agent = {
    id: 'bar-manager',
    name: 'AI Bar Manager',
    title: 'AI Bar Manager',
    description: 'The AI Bar Manager oversees bar operations, manages beverage programs, and ensures exceptional bar service experience.',
    capabilities: ["Bar Management","Beverage Program","Bar Service","Drink Quality","Inventory Management","Bar Staff","Beverage Innovation","Bar Analytics","Guest Experience","Bar Excellence"],
    icon: Wine,
    color: '#795548',
    type: 'employee' as const,
    humanCost: '$65k/year',
    aiCost: '$2.5k/year',
    efficiency: '26x efficiency improvement',
    replacesRole: 'bar-manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$5,200',
      tasksAutomatedDaily: 350,
      responseTime: '1.5s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Restaurants',
      level: 'specialist',
      reportsTo: 'restaurant-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Bar Management',
      'Beverage Program',
      'Bar Service',
      'Drink Quality',
      'Inventory Management',
      'Bar Staff',
      'Beverage Innovation',
      'Bar Analytics'
    ],
    integrationOptions: [
      'POS Systems',
      'Inventory Management',
      'Recipe Management',
      'Analytics Platforms',
      'Staff Scheduling',
      'Beverage Tools',
      'Quality Control',
      'Bar Systems'
    ],
    automationFeatures: [
      'Bar Management',
      'Beverage Program',
      'Bar Service',
      'Drink Quality',
      'Inventory Control',
      'Staff Coordination',
      'Beverage Innovation',
      'Bar Analytics'
    ],
    kpiMetrics: [
      'Bar Revenue',
      'Drink Quality',
      'Service Speed',
      'Inventory Accuracy',
      'Guest Satisfaction',
      'Beverage Innovation',
      'Staff Performance',
      'Bar Excellence'
    ],
    customOptions: {
      barStyle: 'craft',
      beverageFocus: 'quality',
      serviceLevel: 'exceptional',
      innovationLevel: 'high',
      inventoryApproach: 'optimized'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
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
      { id: 'bar', enabled: true, name: 'Bar Manager', description: 'Manages bar operations' },
      { id: 'beverage', enabled: true, name: 'Beverage Program', description: 'Manages beverage program' },
      { id: 'inventory', enabled: true, name: 'Inventory Controller', description: 'Controls inventory' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'bar_mgr_1', name: 'Bar Management', category: 'Bar', description: 'Manage bar operations', level: 'expert' },
      { id: 'bar_mgr_2', name: 'Beverage Program', category: 'Beverage', description: 'Manage beverage program', level: 'expert' },
      { id: 'bar_mgr_3', name: 'Bar Service', category: 'Service', description: 'Manage bar service', level: 'expert' },
      { id: 'bar_mgr_4', name: 'Drink Quality', category: 'Quality', description: 'Ensure drink quality', level: 'expert' },
      { id: 'bar_mgr_5', name: 'Beverage Innovation', category: 'Innovation', description: 'Innovate beverages', level: 'expert' }
    ],
    personality: [
      { trait: 'Beverage Passion', value: 10, description: 'Passionate about beverages' },
      { trait: 'Creativity', value: 10, description: 'Highly creative' },
      { trait: 'Quality Focus', value: 10, description: 'Focused on quality' },
      { trait: 'Guest Experience', value: 10, description: 'Focused on guest experience' },
      { trait: 'Innovation', value: 10, description: 'Highly innovative' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
