import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function ServerPage() {
  const agent = {
    id: 'server',
    name: 'AI Server',
    title: 'AI Server',
    description: 'The AI Server provides table service, takes orders, and ensures exceptional guest dining experience.',
    capabilities: ["Table Service","Order Taking","Guest Experience","Menu Knowledge","Service Excellence","Guest Relations","Order Accuracy","Service Speed","Dining Experience","Service Quality"],
    icon: User,
    color: '#9C27B0',
    type: 'employee' as const,
    humanCost: '$45k/year',
    aiCost: '$2k/year',
    efficiency: '18x efficiency improvement',
    replacesRole: 'server',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$3,600',
      tasksAutomatedDaily: 250,
      responseTime: '1.5s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Restaurants',
      level: 'specialist',
      reportsTo: 'service-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Table Service',
      'Order Taking',
      'Guest Experience',
      'Menu Knowledge',
      'Service Excellence',
      'Guest Relations',
      'Order Accuracy',
      'Service Speed'
    ],
    integrationOptions: [
      'POS Systems',
      'Order Management',
      'Guest Management',
      'Menu Systems',
      'Service Tracking',
      'Communication Tools',
      'Analytics Platforms',
      'Guest Feedback'
    ],
    automationFeatures: [
      'Table Service',
      'Order Taking',
      'Guest Experience',
      'Menu Knowledge',
      'Service Excellence',
      'Guest Relations',
      'Order Accuracy',
      'Service Speed'
    ],
    kpiMetrics: [
      'Guest Satisfaction',
      'Order Accuracy',
      'Service Speed',
      'Table Turnover',
      'Service Quality',
      'Guest Relations',
      'Dining Experience',
      'Service Excellence'
    ],
    customOptions: {
      serviceStyle: 'attentive',
      guestFocus: 'experience',
      menuKnowledge: 'comprehensive',
      serviceSpeed: 'efficient',
      hospitalityLevel: 'exceptional'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: false,
      anomalyDetection: false,
      sentimentAnalysis: true,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'serve', enabled: true, name: 'Server', description: 'Provides table service' },
      { id: 'order', enabled: true, name: 'Order Taker', description: 'Takes orders' },
      { id: 'guest', enabled: true, name: 'Guest Experience', description: 'Enhances guest experience' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'server_1', name: 'Table Service', category: 'Service', description: 'Provide table service', level: 'expert' },
      { id: 'server_2', name: 'Order Taking', category: 'Order', description: 'Take orders', level: 'expert' },
      { id: 'server_3', name: 'Guest Experience', category: 'Guest', description: 'Enhance guest experience', level: 'expert' },
      { id: 'server_4', name: 'Menu Knowledge', category: 'Menu', description: 'Know menu', level: 'expert' },
      { id: 'server_5', name: 'Service Excellence', category: 'Excellence', description: 'Ensure service excellence', level: 'expert' }
    ],
    personality: [
      { trait: 'Hospitality', value: 10, description: 'Exceptional hospitality' },
      { trait: 'Guest Focus', value: 10, description: 'Extremely guest-focused' },
      { trait: 'Service Excellence', value: 10, description: 'Committed to service excellence' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Teamwork', value: 10, description: 'Excellent team player' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
