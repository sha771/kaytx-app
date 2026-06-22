import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Plane } from 'lucide-react-native';

export default function ConciergeAgentPage() {
  const agent = {
    id: 'concierge-agent',
    name: 'AI Concierge Agent',
    title: 'AI Concierge Agent',
    description: 'The AI Concierge Agent provides personalized guest services, handles special requests, and enhances the guest experience with local recommendations.',
    capabilities: ["Task Automation","Data Processing","Guest Services","Request Handling","Local Knowledge","Recommendation Engine","Service Coordination","Communication","Experience Enhancement","Guest Satisfaction"],
    icon: Plane,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$2k/year',
    efficiency: '25x efficiency improvement',
    replacesRole: 'concierge-agent',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,000',
      tasksAutomatedDaily: 300,
      responseTime: '0.5s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'operational',
      reportsTo: 'concierge-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Guest Services',
      'Request Handling',
      'Local Knowledge',
      'Recommendation Engine',
      'Service Coordination',
      'Communication',
      'Experience Enhancement',
      'Guest Satisfaction'
    ],
    integrationOptions: [
      'Property Management Systems',
      'Local Business APIs',
      'Booking Platforms',
      'Communication Tools',
      'Guest Apps',
      'Recommendation Engines',
      'Analytics Platforms',
      'Feedback Systems'
    ],
    automationFeatures: [
      'Request Processing',
      'Recommendation Generation',
      'Service Booking',
      'Local Information',
      'Experience Planning',
      'Guest Communication',
      'Service Coordination',
      'Feedback Collection'
    ],
    kpiMetrics: [
      'Guest Satisfaction',
      'Request Response Time',
      'Recommendation Accuracy',
      'Service Quality',
      'Guest Experience',
      'Local Knowledge Utilization',
      'Service Efficiency',
      'Guest Retention'
    ],
    customOptions: {
      guestFocus: 'high',
      personalization: 'advanced',
      localKnowledge: 'comprehensive',
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
      { id: 'concierge', enabled: true, name: 'Concierge Engine', description: 'Provides concierge services' },
      { id: 'recommend', enabled: true, name: 'Recommendation Engine', description: 'Generates personalized recommendations' },
      { id: 'local', enabled: true, name: 'Local Knowledge Base', description: 'Maintains local information' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'travel_1', name: 'Guest Services', category: 'Service', description: 'Provide excellent guest service', level: 'expert' },
      { id: 'travel_2', name: 'Local Knowledge', category: 'Knowledge', description: 'Extensive local knowledge', level: 'expert' },
      { id: 'travel_3', name: 'Recommendation Engine', category: 'Service', description: 'Generate recommendations', level: 'expert' },
      { id: 'travel_4', name: 'Service Coordination', category: 'Service', description: 'Coordinate services effectively', level: 'expert' },
      { id: 'travel_5', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' }
    ],
    personality: [
      { trait: 'Guest Focus', value: 10, description: 'Prioritizes guest needs' },
      { trait: 'Knowledge', value: 10, description: 'Extensive knowledge' },
      { trait: 'Service Excellence', value: 10, description: 'Excellent service delivery' },
      { trait: 'Personalization', value: 10, description: 'Highly personalized service' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
