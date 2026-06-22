import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Plane } from 'lucide-react-native';

export default function FoodTourCoordinatorPage() {
  const agent = {
    id: 'food-tour-coordinator',
    name: 'AI Food Tour Coordinator',
    title: 'AI Food Tour Coordinator',
    description: 'The AI Food Tour Coordinator manages culinary experiences, coordinates food tours, and provides local gastronomic recommendations.',
    capabilities: ["Task Automation","Data Processing","Food Tour Management","Culinary Coordination","Restaurant Partnerships","Guest Experience","Communication","Local Food Knowledge","Service Delivery","Guest Satisfaction"],
    icon: Plane,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$44k/year',
    aiCost: '$2k/year',
    efficiency: '22x efficiency improvement',
    replacesRole: 'food-tour-coordinator',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,500',
      tasksAutomatedDaily: 240,
      responseTime: '0.7s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'operational',
      reportsTo: 'activity-coordinator',
      manages: [],
    },
    specializedCapabilities: [
      'Food Tour Management',
      'Culinary Coordination',
      'Restaurant Partnerships',
      'Guest Experience',
      'Communication',
      'Local Food Knowledge',
      'Service Delivery',
      'Guest Satisfaction'
    ],
    integrationOptions: [
      'Restaurant Booking Systems',
      'Food Review Platforms',
      'Communication Tools',
      'Guest Apps',
      'Partnership Management',
      'Analytics Platforms',
      'Feedback Systems',
      'Menu Information'
    ],
    automationFeatures: [
      'Tour Scheduling',
      'Restaurant Coordination',
      'Menu Planning',
      'Guest Communication',
      'Dietary Accommodation',
      'Experience Monitoring',
      'Partnership Management',
      'Feedback Collection'
    ],
    kpiMetrics: [
      'Tour Quality',
      'Guest Satisfaction',
      'Restaurant Partnership',
      'Culinary Experience',
      'Service Excellence',
      'Communication Effectiveness',
      'Guest Experience',
      'Dietary Accommodation'
    ],
    customOptions: {
      foodFocus: 'high',
      culinaryQuality: 'premium',
      localKnowledge: 'extensive',
      dietaryFlexibility: 'comprehensive',
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
      { id: 'food', enabled: true, name: 'Food Tour Engine', description: 'Manages food tours' },
      { id: 'culinary', enabled: true, name: 'Culinary Knowledge Base', description: 'Maintains culinary expertise' },
      { id: 'restaurant', enabled: true, name: 'Restaurant Network', description: 'Manages restaurant partnerships' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'travel_1', name: 'Food Tour Management', category: 'Operations', description: 'Manage food tours', level: 'expert' },
      { id: 'travel_2', name: 'Culinary Coordination', category: 'Service', description: 'Coordinate culinary experiences', level: 'expert' },
      { id: 'travel_3', name: 'Local Food Knowledge', category: 'Knowledge', description: 'Extensive local food knowledge', level: 'expert' },
      { id: 'travel_4', name: 'Restaurant Partnerships', category: 'Business', description: 'Manage restaurant relationships', level: 'expert' },
      { id: 'travel_5', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' }
    ],
    personality: [
      { trait: 'Culinary Passion', value: 10, description: 'Passionate about food' },
      { trait: 'Local Knowledge', value: 10, description: 'Extensive local knowledge' },
      { trait: 'Service Excellence', value: 10, description: 'Excellent service delivery' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
