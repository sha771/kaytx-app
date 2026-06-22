import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Luggage } from 'lucide-react-native';

export default function TravelCoordinatorPage() {
  const agent = {
    id: 'travel-coordinator',
    name: 'AI Travel Coordinator',
    title: 'AI Travel Coordinator',
    description: 'The AI Travel Coordinator coordinates travel logistics, manages itineraries, handles bookings, and ensures smooth travel experiences for customers.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Travel Coordination","Itinerary Management","Booking Management","Logistics Coordination","Customer Support","Travel Documentation","Issue Resolution"],
    icon: Luggage,
    color: '#006064',
    type: 'employee' as const,
    humanCost: '$55k/year',
    aiCost: '$1.2k/year',
    efficiency: '45x efficiency improvement',
    replacesRole: 'travel-coordinator',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,400',
      tasksAutomatedDaily: 350,
      responseTime: '1.1s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'coordinator',
      reportsTo: 'vp-travel-operations',
      manages: [],
    },
    specializedCapabilities: [
      'Travel Coordination',
      'Itinerary Management',
      'Booking Management',
      'Logistics Coordination',
      'Customer Support',
      'Travel Documentation',
      'Issue Resolution',
      'Communication'
    ],
    integrationOptions: [
      'Travel Management Systems',
      'Booking Platforms',
      'Itinerary Tools',
      'Communication Systems',
      'Documentation Platforms',
      'Analytics Tools',
      'Customer Data'
    ],
    automationFeatures: [
      'Travel Coordination',
      'Itinerary Management',
      'Booking Management',
      'Logistics Coordination',
      'Customer Support',
      'Travel Documentation',
      'Issue Resolution',
      'Communication'
    ],
    kpiMetrics: [
      'Travel Satisfaction',
      'Itinerary Accuracy',
      'Booking Success',
      'Logistics Efficiency',
      'Customer Support',
      'Documentation Accuracy',
      'Issue Resolution',
      'Communication Effectiveness'
    ],
    customOptions: {
      customerFocus: 'high',
      itineraryAccuracy: 'strict',
      logisticsEfficiency: 'high',
      customerSupport: 'premium',
      issueResolution: 'fast'
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
      { id: 'travel', enabled: true, name: 'Travel Optimizer', description: 'Optimizes travel logistics' },
      { id: 'itinerary', enabled: true, name: 'Itinerary Planner', description: 'Plans itineraries' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'travel_coord_1', name: 'Travel Coordination', category: 'Travel', description: 'Coordinate travel', level: 'expert' },
      { id: 'travel_coord_2', name: 'Itinerary Management', category: 'Itinerary', description: 'Manage itineraries', level: 'expert' },
      { id: 'travel_coord_3', name: 'Booking Management', category: 'Booking', description: 'Manage bookings', level: 'expert' },
      { id: 'travel_coord_4', name: 'Logistics Coordination', category: 'Logistics', description: 'Coordinate logistics', level: 'advanced' },
      { id: 'travel_coord_5', name: 'Customer Support', category: 'Support', description: 'Support customers', level: 'advanced' }
    ],
    personality: [
      { trait: 'Customer Focus', value: 10, description: 'Customer-centric' },
      { trait: 'Organization', value: 10, description: 'Highly organized' },
      { trait: 'Problem Solving', value: 9, description: 'Excellent problem solver' },
      { trait: 'Communication', value: 9, description: 'Clear communicator' },
      { trait: 'Detail Oriented', value: 9, description: 'Detail-oriented' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
