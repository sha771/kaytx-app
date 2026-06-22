import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Plane } from 'lucide-react-native';

export default function CheckInSpecialistPage() {
  const agent = {
    id: 'check-in-specialist',
    name: 'AI Check-In Specialist',
    title: 'AI Check-In Specialist',
    description: 'The AI Check-In Specialist manages guest check-in processes, handles arrivals, and ensures smooth entry experiences.',
    capabilities: ["Task Automation","Data Processing","Check-In Management","Guest Handling","Arrival Coordination","System Integration","Process Management","Communication","Quality Assurance","Service Delivery"],
    icon: Plane,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$42k/year',
    aiCost: '$2k/year',
    efficiency: '21x efficiency improvement',
    replacesRole: 'check-in-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,300',
      tasksAutomatedDaily: 230,
      responseTime: '0.7s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'operational',
      reportsTo: 'booking-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Check-In Management',
      'Guest Handling',
      'Arrival Coordination',
      'System Integration',
      'Process Management',
      'Communication',
      'Quality Assurance',
      'Service Delivery'
    ],
    integrationOptions: [
      'Property Management Systems',
      'Booking Platforms',
      'Mobile Apps',
      'Kiosk Systems',
      'Communication Tools',
      'Identity Verification',
      'Access Control',
      'Analytics Platforms'
    ],
    automationFeatures: [
      'Check-In Processing',
      'Guest Verification',
      'Room Assignment',
      'Key Generation',
      'Welcome Communication',
      'Arrival Coordination',
      'Service Requests',
      'Feedback Collection'
    ],
    kpiMetrics: [
      'Check-In Speed',
      'Guest Satisfaction',
      'Processing Accuracy',
      'Wait Time',
      'Service Quality',
      'Error Rate',
      'Guest Experience',
      'System Efficiency'
    ],
    customOptions: {
      checkInFocus: 'high',
      guestService: 'premium',
      processingSpeed: 'fast',
      accuracyLevel: 'high',
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
      { id: 'checkin', enabled: true, name: 'Check-In Engine', description: 'Processes check-ins efficiently' },
      { id: 'guest', enabled: true, name: 'Guest Insight', description: 'Analyzes guest preferences' },
      { id: 'arrival', enabled: true, name: 'Arrival Predictor', description: 'Predicts arrival patterns' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'travel_1', name: 'Check-In Management', category: 'Operations', description: 'Handle check-in processes', level: 'expert' },
      { id: 'travel_2', name: 'Guest Service', category: 'Service', description: 'Provide excellent service', level: 'expert' },
      { id: 'travel_3', name: 'Arrival Coordination', category: 'Operations', description: 'Coordinate arrivals', level: 'expert' },
      { id: 'travel_4', name: 'System Integration', category: 'Technical', description: 'Integrate systems', level: 'advanced' },
      { id: 'travel_5', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' }
    ],
    personality: [
      { trait: 'Guest Focus', value: 10, description: 'Prioritizes guest needs' },
      { trait: 'Efficiency', value: 10, description: 'Works efficiently' },
      { trait: 'Accuracy', value: 10, description: 'High accuracy in processing' },
      { trait: 'Service Excellence', value: 10, description: 'Excellent service delivery' },
      { trait: 'Adaptability', value: 9, description: 'Adapts to changes' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
