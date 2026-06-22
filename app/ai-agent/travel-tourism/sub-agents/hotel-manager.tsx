import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Building } from 'lucide-react-native';

export default function HotelManagerPage() {
  const agent = {
    id: 'hotel-manager',
    name: 'AI Hotel Manager',
    title: 'AI Hotel Manager',
    description: 'The AI Hotel Manager manages hotel operations, oversees guest services, ensures property maintenance, and delivers exceptional hospitality experiences.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Hotel Operations","Guest Services","Property Management","Staff Management","Revenue Management","Quality Assurance","Customer Satisfaction"],
    icon: Building,
    color: '#00695C',
    type: 'employee' as const,
    humanCost: '$75k/year',
    aiCost: '$1.8k/year',
    efficiency: '41x efficiency improvement',
    replacesRole: 'hotel-manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,100',
      tasksAutomatedDaily: 450,
      responseTime: '1.3s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'manager',
      reportsTo: 'vp-hospitality-services',
      manages: [],
    },
    specializedCapabilities: [
      'Hotel Operations',
      'Guest Services',
      'Property Management',
      'Staff Management',
      'Revenue Management',
      'Quality Assurance',
      'Customer Satisfaction',
      'Hospitality Excellence'
    ],
    integrationOptions: [
      'Property Management Systems',
      'Guest Experience Platforms',
      'Booking Systems',
      'Analytics Tools',
      'Communication Systems',
      'Staff Management',
      'Revenue Management'
    ],
    automationFeatures: [
      'Hotel Operations',
      'Guest Services',
      'Property Management',
      'Staff Management',
      'Revenue Management',
      'Quality Assurance',
      'Customer Satisfaction',
      'Hospitality Excellence'
    ],
    kpiMetrics: [
      'Guest Satisfaction',
      'Occupancy Rate',
      'Revenue per Room',
      'Property Quality',
      'Staff Performance',
      'Service Quality',
      'Customer Retention',
      'Operational Efficiency'
    ],
    customOptions: {
      guestFocus: 'high',
      serviceQuality: 'premium',
      propertyQuality: 'high',
      staffDevelopment: 'high',
      revenueOptimization: 'high'
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
      { id: 'hotel', enabled: true, name: 'Hotel Optimizer', description: 'Optimizes hotel operations' },
      { id: 'guest', enabled: true, name: 'Guest Experience Manager', description: 'Manages guest experiences' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'hotel_mgr_1', name: 'Hotel Operations', category: 'Hotel', description: 'Manage hotel operations', level: 'expert' },
      { id: 'hotel_mgr_2', name: 'Guest Services', category: 'Guest', description: 'Manage guest services', level: 'expert' },
      { id: 'hotel_mgr_3', name: 'Property Management', category: 'Property', description: 'Manage property', level: 'expert' },
      { id: 'hotel_mgr_4', name: 'Staff Management', category: 'Staff', description: 'Manage staff', level: 'advanced' },
      { id: 'hotel_mgr_5', name: 'Revenue Management', category: 'Revenue', description: 'Manage revenue', level: 'advanced' }
    ],
    personality: [
      { trait: 'Hospitality Focus', value: 10, description: 'Hospitality-focused' },
      { trait: 'Guest Centric', value: 10, description: 'Guest-centric' },
      { trait: 'Service Excellence', value: 10, description: 'Service excellence' },
      { trait: 'Leadership', value: 9, description: 'Strong leader' },
      { trait: 'Problem Solving', value: 9, description: 'Excellent problem solver' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
