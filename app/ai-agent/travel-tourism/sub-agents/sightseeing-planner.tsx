import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Plane } from 'lucide-react-native';

export default function SightseeingPlannerPage() {
  const agent = {
    id: 'sightseeing-planner',
    name: 'AI Sightseeing Planner',
    title: 'AI Sightseeing Planner',
    description: 'The AI Sightseeing Planner creates sightseeing itineraries, coordinates attractions visits, and optimizes tourist experiences.',
    capabilities: ["Task Automation","Data Processing","Sightseeing Planning","Attraction Coordination","Itinerary Optimization","Guest Experience","Communication","Local Knowledge","Service Delivery","Guest Satisfaction"],
    icon: Plane,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$43k/year',
    aiCost: '$2k/year',
    efficiency: '21x efficiency improvement',
    replacesRole: 'sightseeing-planner',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,400',
      tasksAutomatedDaily: 230,
      responseTime: '0.6s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'operational',
      reportsTo: 'experience-designer',
      manages: [],
    },
    specializedCapabilities: [
      'Sightseeing Planning',
      'Attraction Coordination',
      'Itinerary Optimization',
      'Guest Experience',
      'Communication',
      'Local Knowledge',
      'Service Delivery',
      'Guest Satisfaction'
    ],
    integrationOptions: [
      'Attraction Booking Systems',
      'Mapping Services',
      'Transportation APIs',
      'Communication Tools',
      'Guest Apps',
      'Local Information Systems',
      'Analytics Platforms',
      'Feedback Systems'
    ],
    automationFeatures: [
      'Itinerary Planning',
      'Attraction Booking',
      'Route Optimization',
      'Guest Communication',
      'Time Management',
      'Experience Monitoring',
      'Adjustment Handling',
      'Feedback Collection'
    ],
    kpiMetrics: [
      'Itinerary Quality',
      'Guest Satisfaction',
      'Attraction Coverage',
      'Time Optimization',
      'Service Excellence',
      'Communication Effectiveness',
      'Guest Experience',
      'Itinerary Efficiency'
    ],
    customOptions: {
      sightseeingFocus: 'high',
      itineraryQuality: 'optimized',
      localKnowledge: 'extensive',
      timeEfficiency: 'maximized',
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
      { id: 'sightseeing', enabled: true, name: 'Sightseeing Engine', description: 'Plans sightseeing experiences' },
      { id: 'itinerary', enabled: true, name: 'Itinerary Optimizer', description: 'Optimizes travel itineraries' },
      { id: 'local', enabled: true, name: 'Local Knowledge Base', description: 'Maintains local information' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'travel_1', name: 'Sightseeing Planning', category: 'Service', description: 'Plan sightseeing experiences', level: 'expert' },
      { id: 'travel_2', name: 'Itinerary Optimization', category: 'Operations', description: 'Optimize itineraries', level: 'expert' },
      { id: 'travel_3', name: 'Attraction Coordination', category: 'Operations', description: 'Coordinate attractions', level: 'expert' },
      { id: 'travel_4', name: 'Local Knowledge', category: 'Knowledge', description: 'Extensive local knowledge', level: 'expert' },
      { id: 'travel_5', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' }
    ],
    personality: [
      { trait: 'Planning', value: 10, description: 'Excellent planning skills' },
      { trait: 'Local Knowledge', value: 10, description: 'Extensive local knowledge' },
      { trait: 'Service Excellence', value: 10, description: 'Excellent service delivery' },
      { trait: 'Optimization', value: 10, description: 'Strong optimization skills' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
