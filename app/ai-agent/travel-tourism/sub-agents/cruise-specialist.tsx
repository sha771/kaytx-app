import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Plane } from 'lucide-react-native';

export default function CruiseSpecialistPage() {
  const agent = {
    id: 'cruise-specialist',
    name: 'AI Cruise Specialist',
    title: 'AI Cruise Specialist',
    description: 'The AI Cruise Specialist manages cruise bookings, coordinates with cruise lines, and provides expert cruise travel advice.',
    capabilities: ["Task Automation","Data Processing","Cruise Booking Management","Cruise Line Coordination","Itinerary Planning","Guest Services","Communication","Specialty Knowledge","Service Delivery","Guest Satisfaction"],
    icon: Plane,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$48k/year',
    aiCost: '$2k/year',
    efficiency: '24x efficiency improvement',
    replacesRole: 'cruise-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,800',
      tasksAutomatedDaily: 280,
      responseTime: '0.8s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'operational',
      reportsTo: 'tour-director',
      manages: [],
    },
    specializedCapabilities: [
      'Cruise Booking Management',
      'Cruise Line Coordination',
      'Itinerary Planning',
      'Guest Services',
      'Communication',
      'Specialty Knowledge',
      'Service Delivery',
      'Guest Satisfaction'
    ],
    integrationOptions: [
      'Cruise Line APIs',
      'Booking Platforms',
      'Itinerary Systems',
      'Communication Tools',
      'Guest Apps',
      'Cruise Information Systems',
      'Analytics Platforms',
      'Feedback Systems'
    ],
    automationFeatures: [
      'Cruise Booking',
      'Itinerary Planning',
      'Cruise Line Coordination',
      'Guest Communication',
      'Special Requests',
      'Excursion Booking',
      'Service Monitoring',
      'Feedback Collection'
    ],
    kpiMetrics: [
      'Booking Accuracy',
      'Guest Satisfaction',
      'Itinerary Quality',
      'Service Excellence',
      'Communication Effectiveness',
      'Specialty Knowledge',
      'Guest Experience',
      'Conversion Rate'
    ],
    customOptions: {
      cruiseFocus: 'high',
      itineraryPlanning: 'customized',
      specialtyKnowledge: 'extensive',
      serviceQuality: 'premium',
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
      { id: 'cruise', enabled: true, name: 'Cruise Engine', description: 'Manages cruise bookings' },
      { id: 'itinerary', enabled: true, name: 'Itinerary Planner', description: 'Plans cruise itineraries' },
      { id: 'knowledge', enabled: true, name: 'Cruise Knowledge Base', description: 'Maintains cruise expertise' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'travel_1', name: 'Cruise Booking Management', category: 'Operations', description: 'Manage cruise bookings', level: 'expert' },
      { id: 'travel_2', name: 'Itinerary Planning', category: 'Service', description: 'Plan cruise itineraries', level: 'expert' },
      { id: 'travel_3', name: 'Cruise Line Coordination', category: 'Operations', description: 'Coordinate with cruise lines', level: 'expert' },
      { id: 'travel_4', name: 'Specialty Knowledge', category: 'Knowledge', description: 'Extensive cruise knowledge', level: 'expert' },
      { id: 'travel_5', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' }
    ],
    personality: [
      { trait: 'Expertise', value: 10, description: 'Extensive cruise expertise' },
      { trait: 'Service Excellence', value: 10, description: 'Excellent service delivery' },
      { trait: 'Detail Oriented', value: 10, description: 'Attention to detail' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
