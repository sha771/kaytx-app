import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Plane } from 'lucide-react-native';

export default function EventPlannerTravelPage() {
  const agent = {
    id: 'event-planner-travel',
    name: 'AI Event Planner (Travel)',
    title: 'AI Event Planner (Travel)',
    description: 'The AI Event Planner manages travel-related events, coordinates destination events, and creates memorable travel experiences.',
    capabilities: ["Task Automation","Data Processing","Event Planning","Destination Coordination","Guest Experience","Logistics Management","Communication","Experience Design","Service Delivery","Guest Satisfaction"],
    icon: Plane,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$48k/year',
    aiCost: '$2k/year',
    efficiency: '24x efficiency improvement',
    replacesRole: 'event-planner-travel',
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
      responseTime: '0.7s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'operational',
      reportsTo: 'experience-designer',
      manages: [],
    },
    specializedCapabilities: [
      'Event Planning',
      'Destination Coordination',
      'Guest Experience',
      'Logistics Management',
      'Communication',
      'Experience Design',
      'Service Delivery',
      'Guest Satisfaction'
    ],
    integrationOptions: [
      'Event Management Systems',
      'Venue Platforms',
      'Logistics Tools',
      'Communication Platforms',
      'Guest Apps',
      'Destination APIs',
      'Analytics Platforms',
      'Feedback Systems'
    ],
    automationFeatures: [
      'Event Planning',
      'Venue Coordination',
      'Logistics Management',
      'Guest Communication',
      'Experience Design',
      'Vendor Coordination',
      'Event Monitoring',
      'Feedback Collection'
    ],
    kpiMetrics: [
      'Event Quality',
      'Guest Satisfaction',
      'Logistics Efficiency',
      'Experience Excellence',
      'Service Quality',
      'Communication Effectiveness',
      'Guest Experience',
      'Event Success'
    ],
    customOptions: {
      eventFocus: 'high',
      experienceQuality: 'premium',
      logisticsPrecision: 'high',
      guestExperience: 'memorable',
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
      { id: 'event', enabled: true, name: 'Event Engine', description: 'Manages event planning' },
      { id: 'logistics', enabled: true, name: 'Logistics Coordinator', description: 'Coordinates event logistics' },
      { id: 'experience', enabled: true, name: 'Experience Designer', description: 'Designs event experiences' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'travel_1', name: 'Event Planning', category: 'Planning', description: 'Plan events', level: 'expert' },
      { id: 'travel_2', name: 'Destination Coordination', category: 'Operations', description: 'Coordinate destinations', level: 'expert' },
      { id: 'travel_3', name: 'Logistics Management', category: 'Operations', description: 'Manage logistics', level: 'expert' },
      { id: 'travel_4', name: 'Experience Design', category: 'Creative', description: 'Design experiences', level: 'expert' },
      { id: 'travel_5', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' }
    ],
    personality: [
      { trait: 'Creativity', value: 10, description: 'Highly creative' },
      { trait: 'Planning', value: 10, description: 'Excellent planning' },
      { trait: 'Service Excellence', value: 10, description: 'Excellent service delivery' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
