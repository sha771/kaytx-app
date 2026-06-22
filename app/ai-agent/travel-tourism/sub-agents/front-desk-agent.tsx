import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Plane } from 'lucide-react-native';

export default function FrontDeskAgentPage() {
  const agent = {
    id: 'front-desk-agent',
    name: 'AI Front Desk Agent',
    title: 'AI Front Desk Agent',
    description: 'The AI Front Desk Agent manages guest interactions at the front desk, handles inquiries, and provides excellent customer service.',
    capabilities: ["Task Automation","Data Processing","Guest Services","Inquiry Handling","Check-In/Out Management","Communication","Problem Resolution","Service Delivery","Information Management","Customer Satisfaction"],
    icon: Plane,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$40k/year',
    aiCost: '$2k/year',
    efficiency: '20x efficiency improvement',
    replacesRole: 'front-desk-agent',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,200',
      tasksAutomatedDaily: 220,
      responseTime: '0.6s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'operational',
      reportsTo: 'hotel-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Guest Services',
      'Inquiry Handling',
      'Check-In/Out Management',
      'Communication',
      'Problem Resolution',
      'Service Delivery',
      'Information Management',
      'Customer Satisfaction'
    ],
    integrationOptions: [
      'Property Management Systems',
      'Booking Platforms',
      'Communication Tools',
      'Guest Apps',
      'Information Systems',
      'Service Request Systems',
      'Analytics Platforms',
      'Feedback Systems'
    ],
    automationFeatures: [
      'Guest Greeting',
      'Inquiry Response',
      'Check-In/Out Processing',
      'Service Requests',
      'Information Provision',
      'Problem Resolution',
      'Communication Management',
      'Guest Assistance'
    ],
    kpiMetrics: [
      'Guest Satisfaction',
      'Response Time',
      'Service Quality',
      'Problem Resolution Rate',
      'Check-In/Out Speed',
      'Communication Efficiency',
      'Guest Experience',
      'Service Standards'
    ],
    customOptions: {
      guestFocus: 'high',
      serviceQuality: 'premium',
      responseSpeed: 'fast',
      problemResolution: 'efficient',
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
      { id: 'guest', enabled: true, name: 'Guest Service Engine', description: 'Provides excellent guest service' },
      { id: 'inquiry', enabled: true, name: 'Inquiry Handler', description: 'Handles guest inquiries efficiently' },
      { id: 'service', enabled: true, name: 'Service Coordinator', description: 'Coordinates guest services' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'travel_1', name: 'Guest Services', category: 'Service', description: 'Provide excellent guest service', level: 'expert' },
      { id: 'travel_2', name: 'Inquiry Handling', category: 'Communication', description: 'Handle inquiries effectively', level: 'expert' },
      { id: 'travel_3', name: 'Problem Resolution', category: 'Service', description: 'Resolve guest problems', level: 'expert' },
      { id: 'travel_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'travel_5', name: 'Service Delivery', category: 'Service', description: 'Deliver excellent service', level: 'expert' }
    ],
    personality: [
      { trait: 'Guest Focus', value: 10, description: 'Prioritizes guest needs' },
      { trait: 'Service Excellence', value: 10, description: 'Excellent service delivery' },
      { trait: 'Problem Solving', value: 10, description: 'Strong problem-solving skills' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
