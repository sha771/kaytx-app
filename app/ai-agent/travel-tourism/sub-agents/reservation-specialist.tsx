import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CalendarClock } from 'lucide-react-native';

export default function ReservationSpecialistPage() {
  const agent = {
    id: 'reservation-specialist',
    name: 'AI Reservation Specialist',
    title: 'AI Reservation Specialist',
    description: 'The AI Reservation Specialist manages complex reservations, handles special requests, coordinates with partners, and ensures seamless reservation experiences.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Reservation Management","Special Requests","Partner Coordination","Complex Itineraries","Reservation Support","Customer Service","Issue Resolution"],
    icon: CalendarClock,
    color: '#0277BD',
    type: 'employee' as const,
    humanCost: '$50k/year',
    aiCost: '$1.2k/year',
    efficiency: '41x efficiency improvement',
    replacesRole: 'reservation-specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,000',
      tasksAutomatedDaily: 320,
      responseTime: '1.1s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'specialist',
      reportsTo: 'vp-booking-reservations',
      manages: [],
    },
    specializedCapabilities: [
      'Reservation Management',
      'Special Requests',
      'Partner Coordination',
      'Complex Itineraries',
      'Reservation Support',
      'Customer Service',
      'Issue Resolution',
      'Coordination Excellence'
    ],
    integrationOptions: [
      'Reservation Systems',
      'Partner Platforms',
      'Communication Systems',
      'Itinerary Tools',
      'CRM Systems',
      'Analytics Tools',
      'Support Platforms'
    ],
    automationFeatures: [
      'Reservation Management',
      'Special Requests',
      'Partner Coordination',
      'Complex Itineraries',
      'Reservation Support',
      'Customer Service',
      'Issue Resolution',
      'Coordination Excellence'
    ],
    kpiMetrics: [
      'Reservation Accuracy',
      'Special Request Success',
      'Partner Satisfaction',
      'Itinerary Complexity',
      'Customer Satisfaction',
      'Resolution Rate',
      'Coordination Success',
      'Support Quality'
    ],
    customOptions: {
      accuracyTarget: 'strict',
      partnerCoordination: 'high',
      customerService: 'premium',
      complexityHandling: 'high',
      resolutionSpeed: 'fast'
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
      { id: 'reservation', enabled: true, name: 'Reservation Manager', description: 'Manages reservations' },
      { id: 'complex', enabled: true, name: 'Complex Itinerary Handler', description: 'Handles complex itineraries' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'res_spec_1', name: 'Reservation Management', category: 'Reservation', description: 'Manage reservations', level: 'expert' },
      { id: 'res_spec_2', name: 'Special Requests', category: 'Special', description: 'Handle special requests', level: 'expert' },
      { id: 'res_spec_3', name: 'Partner Coordination', category: 'Coordination', description: 'Coordinate partners', level: 'expert' },
      { id: 'res_spec_4', name: 'Complex Itineraries', category: 'Itinerary', description: 'Handle complex itineraries', level: 'expert' },
      { id: 'res_spec_5', name: 'Customer Service', category: 'Service', description: 'Provide customer service', level: 'advanced' }
    ],
    personality: [
      { trait: 'Detail Oriented', value: 10, description: 'Detail-oriented' },
      { trait: 'Problem Solving', value: 10, description: 'Excellent problem solver' },
      { trait: 'Customer Focus', value: 10, description: 'Customer-centric' },
      { trait: 'Coordination', value: 9, description: 'Strong coordinator' },
      { trait: 'Patience', value: 9, description: 'Patient specialist' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
