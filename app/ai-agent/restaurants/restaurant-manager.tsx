import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Store } from 'lucide-react-native';

export default function RestaurantManagerPage() {
  const agent = {
    id: 'restaurant-manager',
    name: 'AI Restaurant Manager',
    title: 'AI Restaurant Manager',
    description: 'The AI Restaurant Manager oversees daily restaurant operations, manages restaurant staff, and ensures exceptional guest experience.',
    capabilities: ["Restaurant Operations","Staff Management","Guest Experience","Service Quality","Floor Management","Team Leadership","Guest Relations","Restaurant Administration","Performance Management","Service Excellence"],
    icon: Store,
    color: '#3498DB',
    type: 'employee' as const,
    humanCost: '$85k/year',
    aiCost: '$3k/year',
    efficiency: '28x efficiency improvement',
    replacesRole: 'restaurant-manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6,800',
      tasksAutomatedDaily: 450,
      responseTime: '1.4s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Restaurants',
      level: 'manager',
      reportsTo: 'chief-restaurant-officer',
      manages: ['service-manager', 'host-manager', 'bar-manager'],
    },
    specializedCapabilities: [
      'Restaurant Operations',
      'Staff Management',
      'Guest Experience',
      'Service Quality',
      'Floor Management',
      'Team Leadership',
      'Guest Relations',
      'Performance Management'
    ],
    integrationOptions: [
      'POS Systems',
      'Reservation Platforms',
      'Staff Scheduling',
      'Guest Management',
      'Service Tracking',
      'Performance Systems',
      'Communication Tools',
      'Analytics Platforms'
    ],
    automationFeatures: [
      'Restaurant Operations',
      'Staff Scheduling',
      'Guest Experience Management',
      'Service Quality Control',
      'Floor Management',
      'Team Coordination',
      'Guest Relations',
      'Performance Tracking'
    ],
    kpiMetrics: [
      'Guest Satisfaction',
      'Service Quality',
      'Staff Productivity',
      'Restaurant Efficiency',
      'Guest Retention',
      'Team Performance',
      'Service Excellence',
      'Operational Success'
    ],
    customOptions: {
      serviceLevel: 'exceptional',
      managementStyle: 'hands-on',
      guestFocus: 'experience',
      teamApproach: 'empowering',
      operationsFocus: 'excellence'
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
      { id: 'restaurant', enabled: true, name: 'Restaurant Manager', description: 'Manages restaurant operations' },
      { id: 'guest', enabled: true, name: 'Guest Experience', description: 'Enhances guest experience' },
      { id: 'service', enabled: true, name: 'Service Quality', description: 'Ensures service quality' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'rest_mgr_1', name: 'Restaurant Operations', category: 'Operations', description: 'Manage restaurant operations', level: 'expert' },
      { id: 'rest_mgr_2', name: 'Staff Management', category: 'Staff', description: 'Manage restaurant staff', level: 'expert' },
      { id: 'rest_mgr_3', name: 'Guest Experience', category: 'Guest', description: 'Enhance guest experience', level: 'expert' },
      { id: 'rest_mgr_4', name: 'Service Quality', category: 'Service', description: 'Ensure service quality', level: 'expert' },
      { id: 'rest_mgr_5', name: 'Floor Management', category: 'Floor', description: 'Manage floor operations', level: 'expert' }
    ],
    personality: [
      { trait: 'Guest Focus', value: 10, description: 'Extremely guest-focused' },
      { trait: 'Leadership', value: 10, description: 'Strong leadership' },
      { trait: 'Service Excellence', value: 10, description: 'Committed to service excellence' },
      { trait: 'Team Building', value: 10, description: 'Excellent team builder' },
      { trait: 'Problem Solving', value: 10, description: 'Excellent problem solver' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
