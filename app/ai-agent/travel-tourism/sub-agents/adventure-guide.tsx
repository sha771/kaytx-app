import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Plane } from 'lucide-react-native';

export default function AdventureGuidePage() {
  const agent = {
    id: 'adventure-guide',
    name: 'AI Adventure Guide',
    title: 'AI Adventure Guide',
    description: 'The AI Adventure Guide specializes in adventure travel activities, coordinates outdoor experiences, and ensures safe adventure excursions.',
    capabilities: ["Task Automation","Data Processing","Adventure Activity Management","Safety Coordination","Experience Planning","Guest Guidance","Risk Assessment","Communication","Service Delivery","Guest Satisfaction"],
    icon: Plane,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$45k/year',
    aiCost: '$2k/year',
    efficiency: '22x efficiency improvement',
    replacesRole: 'adventure-guide',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,600',
      tasksAutomatedDaily: 250,
      responseTime: '0.7s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'operational',
      reportsTo: 'activity-coordinator',
      manages: [],
    },
    specializedCapabilities: [
      'Adventure Activity Management',
      'Safety Coordination',
      'Experience Planning',
      'Guest Guidance',
      'Risk Assessment',
      'Communication',
      'Service Delivery',
      'Guest Satisfaction'
    ],
    integrationOptions: [
      'Activity Booking Systems',
      'Safety Monitoring Tools',
      'Weather APIs',
      'Communication Platforms',
      'Guest Apps',
      'Equipment Tracking',
      'Analytics Platforms',
      'Feedback Systems'
    ],
    automationFeatures: [
      'Activity Scheduling',
      'Safety Monitoring',
      'Experience Planning',
      'Guest Coordination',
      'Risk Assessment',
      'Equipment Management',
      'Emergency Response',
      'Feedback Collection'
    ],
    kpiMetrics: [
      'Activity Safety',
      'Guest Satisfaction',
      'Experience Quality',
      'Risk Management',
      'Service Excellence',
      'Communication Effectiveness',
      'Guest Experience',
      'Safety Record'
    ],
    customOptions: {
      adventureFocus: 'high',
      safetyPriority: 'maximum',
      experienceQuality: 'premium',
      riskManagement: 'comprehensive',
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
      { id: 'adventure', enabled: true, name: 'Adventure Engine', description: 'Manages adventure activities' },
      { id: 'safety', enabled: true, name: 'Safety Monitor', description: 'Monitors safety conditions' },
      { id: 'risk', enabled: true, name: 'Risk Assessor', description: 'Assesses adventure risks' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'travel_1', name: 'Adventure Activity Management', category: 'Operations', description: 'Manage adventure activities', level: 'expert' },
      { id: 'travel_2', name: 'Safety Coordination', category: 'Safety', description: 'Coordinate safety measures', level: 'expert' },
      { id: 'travel_3', name: 'Experience Planning', category: 'Service', description: 'Plan adventure experiences', level: 'expert' },
      { id: 'travel_4', name: 'Risk Assessment', category: 'Safety', description: 'Assess risks effectively', level: 'expert' },
      { id: 'travel_5', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' }
    ],
    personality: [
      { trait: 'Safety Focus', value: 10, description: 'Prioritizes safety' },
      { trait: 'Adventure', value: 10, description: 'Adventure expertise' },
      { trait: 'Service Excellence', value: 10, description: 'Excellent service delivery' },
      { trait: 'Risk Management', value: 10, description: 'Strong risk management' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
