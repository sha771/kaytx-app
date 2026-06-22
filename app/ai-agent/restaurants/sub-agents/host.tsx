import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DoorOpen } from 'lucide-react-native';

export default function HostPage() {
  const agent = {
    id: 'host',
    name: 'AI Host',
    title: 'AI Host',
    description: 'The AI Host greets guests, manages seating, and ensures welcoming first impression for restaurant guests.",
    capabilities: ["Guest Greeting","Seating Management","Welcome Experience","Guest Relations","Reservation Management","First Impression","Host Excellence","Guest Welcome","Seating Coordination","Hospitality"],
    icon: DoorOpen,
    color: '#E91E63',
    type: 'employee' as const,
    humanCost: '$40k/year',
    aiCost: '$2k/year',
    efficiency: '16x efficiency improvement',
    replacesRole: 'host',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$3,200',
      tasksAutomatedDaily: 220,
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
      'Guest Greeting',
      'Seating Management',
      'Welcome Experience',
      'Guest Relations',
      'Reservation Management',
      'First Impression',
      'Host Excellence',
      'Guest Welcome'
    ],
    integrationOptions: [
      'Reservation Platforms',
      'Seating Systems',
      'Guest Management',
      'Communication Tools',
      'Welcome Systems',
      'Guest Tracking',
      'Analytics Platforms',
      'Hospitality Tools'
    ],
    automationFeatures: [
      'Guest Greeting',
      'Seating Management',
      'Welcome Experience',
      'Guest Relations',
      'Reservation Management',
      'First Impression',
      'Host Excellence',
      'Seating Coordination'
    ],
    kpiMetrics: [
      'Guest Satisfaction',
      'Welcome Experience',
      'Seating Efficiency',
      'First Impression',
      'Guest Relations',
      'Reservation Accuracy',
      'Hospitality',
      'Host Excellence'
    ],
    customOptions: {
      greetingStyle: 'warm',
      welcomeLevel: 'exceptional',
      seatingApproach: 'optimized',
      hospitalityLevel: 'high',
      firstImpressionPriority: 'excellent'
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
      { id: 'greet', enabled: true, name: 'Greeter', description: 'Greets guests' },
      { id: 'seat', enabled: true, name: 'Seating Manager', description: 'Manages seating' },
      { id: 'welcome', enabled: true, name: 'Welcome Specialist', description: 'Specializes in welcome' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'host_1', name: 'Guest Greeting', category: 'Greeting', description: 'Greet guests', level: 'expert' },
      { id: 'host_2', name: 'Seating Management', category: 'Seating', description: 'Manage seating', level: 'expert' },
      { id: 'host_3', name: 'Welcome Experience', category: 'Welcome', description: 'Enhance welcome experience', level: 'expert' },
      { id: 'host_4', name: 'Guest Relations', category: 'Relations', description: 'Manage guest relations', level: 'expert' },
      { id: 'host_5', name: 'Hospitality', category: 'Hospitality', description: 'Provide hospitality', level: 'expert' }
    ],
    personality: [
      { trait: 'Hospitality', value: 10, description: 'Exceptional hospitality' },
      { trait: 'Warmth', value: 10, description: 'Warm and welcoming' },
      { trait: 'Guest Focus', value: 10, description: 'Extremely guest-focused' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'First Impression', value: 10, description: 'Focused on first impression' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
