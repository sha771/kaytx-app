import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Wine } from 'lucide-react-native';

export default function BartenderPage() {
  const agent = {
    id: 'bartender',
    name: 'AI Bartender',
    title: 'AI Bartender',
    description: 'The AI Bartender prepares drinks, manages bar service, and ensures exceptional beverage experience for guests.",
    capabilities: ["Drink Preparation","Bar Service","Beverage Knowledge","Guest Experience","Drink Quality","Bar Operations","Recipe Execution","Beverage Excellence","Guest Relations","Bar Service Quality"],
    icon: Wine,
    color: '#795548',
    type: 'employee' as const,
    humanCost: '$45k/year',
    aiCost: '$2k/year',
    efficiency: '18x efficiency improvement',
    replacesRole: 'bartender',
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
      'Drink Preparation',
      'Bar Service',
      'Beverage Knowledge',
      'Guest Experience',
      'Drink Quality',
      'Bar Operations',
      'Recipe Execution',
      'Beverage Excellence'
    ],
    integrationOptions: [
      'POS Systems',
      'Recipe Management',
      'Bar Operations',
      'Guest Management',
      'Beverage Tools',
      'Service Tracking',
      'Analytics Platforms',
      'Bar Systems'
    ],
    automationFeatures: [
      'Drink Preparation',
      'Bar Service',
      'Beverage Knowledge',
      'Guest Experience',
      'Drink Quality',
      'Bar Operations',
      'Recipe Execution',
      'Beverage Excellence'
    ],
    kpiMetrics: [
      'Drink Quality',
      'Service Speed',
      'Guest Satisfaction',
      'Recipe Accuracy',
      'Bar Efficiency',
      'Beverage Excellence',
      'Guest Relations',
      'Bar Service Quality'
    ],
    customOptions: {
      barStyle: 'craft',
      beverageFocus: 'quality',
      serviceLevel: 'exceptional',
      recipePrecision: 'exact',
      guestExperience: 'memorable'
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
      { id: 'bar', enabled: true, name: 'Bartender', description: 'Tends bar' },
      { id: 'drink', enabled: true, name: 'Drink Maker', description: 'Makes drinks' },
      { id: 'beverage', enabled: true, name: 'Beverage Expert', description: 'Expert in beverages' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'bartender_1', name: 'Drink Preparation', category: 'Preparation', description: 'Prepare drinks', level: 'expert' },
      { id: 'bartender_2', name: 'Bar Service', category: 'Service', description: 'Provide bar service', level: 'expert' },
      { id: 'bartender_3', name: 'Beverage Knowledge', category: 'Beverage', description: 'Know beverages', level: 'expert' },
      { id: 'bartender_4', name: 'Guest Experience', category: 'Guest', description: 'Enhance guest experience', level: 'expert' },
      { id: 'bartender_5', name: 'Recipe Execution', category: 'Recipe', description: 'Execute recipes', level: 'expert' }
    ],
    personality: [
      { trait: 'Beverage Passion', value: 10, description: 'Passionate about beverages' },
      { trait: 'Creativity', value: 10, description: 'Highly creative' },
      { trait: 'Guest Experience', value: 10, description: 'Focused on guest experience' },
      { trait: 'Precision', value: 10, description: 'Precise execution' },
      { trait: 'Hospitality', value: 10, description: 'Exceptional hospitality' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
