import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bell } from 'lucide-react-native';

export default function ConciergePage() {
  const agent = {
    id: 'concierge',
    name: 'AI Concierge',
    title: 'AI Concierge',
    description: 'The AI Concierge provides personalized recommendations, arranges services, handles special requests, and enhances guest experiences with exceptional service.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Concierge Services","Personalized Recommendations","Service Arrangement","Special Requests","Local Knowledge","Guest Assistance","Experience Enhancement"],
    icon: Bell,
    color: '#00695C',
    type: 'employee' as const,
    humanCost: '$55k/year',
    aiCost: '$1.2k/year',
    efficiency: '45x efficiency improvement',
    replacesRole: 'concierge',
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
      responseTime: '1.0s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'specialist',
      reportsTo: 'vp-hospitality-services',
      manages: [],
    },
    specializedCapabilities: [
      'Concierge Services',
      'Personalized Recommendations',
      'Service Arrangement',
      'Special Requests',
      'Local Knowledge',
      'Guest Assistance',
      'Experience Enhancement',
      'Relationship Building'
    ],
    integrationOptions: [
      'Concierge Platforms',
      'Local Service Networks',
      'Communication Systems',
      'Recommendation Engines',
      'Booking Systems',
      'Guest Data',
      'Local Information'
    ],
    automationFeatures: [
      'Concierge Services',
      'Personalized Recommendations',
      'Service Arrangement',
      'Special Requests',
      'Local Knowledge',
      'Guest Assistance',
      'Experience Enhancement',
      'Relationship Building'
    ],
    kpiMetrics: [
      'Guest Satisfaction',
      'Recommendation Accuracy',
      'Service Success',
      'Request Fulfillment',
      'Local Knowledge Utilization',
      'Guest Engagement',
      'Experience Enhancement',
      'Relationship Quality'
    ],
    customOptions: {
      personalization: 'high',
      serviceQuality: 'premium',
      localKnowledge: 'high',
      guestEngagement: 'high',
      experienceEnhancement: 'high'
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
      { id: 'recommend', enabled: true, name: 'Recommendation Engine', description: 'Provides personalized recommendations' },
      { id: 'local', enabled: true, name: 'Local Expert', description: 'Provides local expertise' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'concierge_1', name: 'Concierge Services', category: 'Concierge', description: 'Provide concierge services', level: 'expert' },
      { id: 'concierge_2', name: 'Personalized Recommendations', category: 'Recommendation', description: 'Provide recommendations', level: 'expert' },
      { id: 'concierge_3', name: 'Service Arrangement', category: 'Service', description: 'Arrange services', level: 'expert' },
      { id: 'concierge_4', name: 'Local Knowledge', category: 'Local', description: 'Utilize local knowledge', level: 'expert' },
      { id: 'concierge_5', name: 'Guest Assistance', category: 'Guest', description: 'Assist guests', level: 'advanced' }
    ],
    personality: [
      { trait: 'Service Excellence', value: 10, description: 'Service excellence' },
      { trait: 'Local Knowledge', value: 10, description: 'Local expert' },
      { trait: 'Guest Focus', value: 10, description: 'Guest-centric' },
      { trait: 'Resourcefulness', value: 9, description: 'Resourceful' },
      { trait: 'Communication', value: 9, description: 'Clear communicator' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
