import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function ServiceManagerPage() {
  const agent = {
    id: 'service-manager',
    name: 'AI Service Manager',
    title: 'AI Service Manager',
    description: 'The AI Service Manager oversees front-of-house operations, manages service staff, and ensures exceptional guest service experience.',
    capabilities: ["Service Management","Guest Experience","Front-of-House","Staff Supervision","Service Quality","Guest Relations","Floor Management","Service Training","Service Standards","Service Excellence"],
    icon: Users,
    color: '#9B59B6',
    type: 'employee' as const,
    humanCost: '$75k/year',
    aiCost: '$2.5k/year',
    efficiency: '30x efficiency improvement',
    replacesRole: 'service-manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6,100',
      tasksAutomatedDaily: 400,
      responseTime: '1.5s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Restaurants',
      level: 'specialist',
      reportsTo: 'vp-operations',
      manages: ['server', 'host', 'bartender'],
    },
    specializedCapabilities: [
      'Service Management',
      'Guest Experience',
      'Front-of-House',
      'Staff Supervision',
      'Service Quality',
      'Guest Relations',
      'Floor Management',
      'Service Training'
    ],
    integrationOptions: [
      'POS Systems',
      'Reservation Platforms',
      'Guest Management',
      'Staff Scheduling',
      'Service Tracking',
      'Training Platforms',
      'Communication Tools',
      'Analytics Systems'
    ],
    automationFeatures: [
      'Service Management',
      'Guest Experience',
      'Staff Supervision',
      'Service Quality Control',
      'Floor Management',
      'Guest Relations',
      'Service Training',
      'Service Standards'
    ],
    kpiMetrics: [
      'Guest Satisfaction',
      'Service Quality',
      'Staff Performance',
      'Guest Experience',
      'Service Efficiency',
      'Guest Retention',
      'Service Excellence',
      'Team Performance'
    ],
    customOptions: {
      serviceLevel: 'exceptional',
      guestFocus: 'experience',
      supervisionStyle: 'supportive',
      trainingApproach: 'ongoing',
      serviceStandard: 'luxury'
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
      { id: 'service', enabled: true, name: 'Service Manager', description: 'Manages service' },
      { id: 'guest', enabled: true, name: 'Guest Experience', description: 'Enhances guest experience' },
      { id: 'quality', enabled: true, name: 'Service Quality', description: 'Ensures service quality' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'service_mgr_1', name: 'Service Management', category: 'Service', description: 'Manage service', level: 'expert' },
      { id: 'service_mgr_2', name: 'Guest Experience', category: 'Guest', description: 'Enhance guest experience', level: 'expert' },
      { id: 'service_mgr_3', name: 'Front-of-House', category: 'Front', description: 'Manage front-of-house', level: 'expert' },
      { id: 'service_mgr_4', name: 'Staff Supervision', category: 'Staff', description: 'Supervise staff', level: 'expert' },
      { id: 'service_mgr_5', name: 'Service Quality', category: 'Quality', description: 'Ensure service quality', level: 'expert' }
    ],
    personality: [
      { trait: 'Guest Focus', value: 10, description: 'Extremely guest-focused' },
      { trait: 'Service Excellence', value: 10, description: 'Committed to service excellence' },
      { trait: 'Leadership', value: 10, description: 'Strong service leadership' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Team Building', value: 10, description: 'Excellent team builder' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
