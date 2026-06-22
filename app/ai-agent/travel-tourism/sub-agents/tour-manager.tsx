import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MapPinned } from 'lucide-react-native';

export default function TourManagerPage() {
  const agent = {
    id: 'tour-manager',
    name: 'AI Tour Manager',
    title: 'AI Tour Manager',
    description: 'The AI Tour Manager manages tour operations, coordinates tour guides, ensures tour quality, and delivers exceptional tour experiences to customers.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Tour Operations","Guide Coordination","Tour Quality","Experience Delivery","Customer Service","Itinerary Management","Safety Management"],
    icon: MapPinned,
    color: '#00838F',
    type: 'employee' as const,
    humanCost: '$60k/year',
    aiCost: '$1.2k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'tour-manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,900',
      tasksAutomatedDaily: 380,
      responseTime: '1.1s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'manager',
      reportsTo: 'vp-travel-operations',
      manages: [],
    },
    specializedCapabilities: [
      'Tour Operations',
      'Guide Coordination',
      'Tour Quality',
      'Experience Delivery',
      'Customer Service',
      'Itinerary Management',
      'Safety Management',
      'Group Coordination'
    ],
    integrationOptions: [
      'Tour Management Systems',
      'Guide Platforms',
      'Itinerary Tools',
      'Communication Systems',
      'Safety Platforms',
      'Customer Data',
      'Analytics Tools'
    ],
    automationFeatures: [
      'Tour Operations',
      'Guide Coordination',
      'Tour Quality',
      'Experience Delivery',
      'Customer Service',
      'Itinerary Management',
      'Safety Management',
      'Group Coordination'
    ],
    kpiMetrics: [
      'Tour Satisfaction',
      'Guide Performance',
      'Experience Quality',
      'Customer Service',
      'Safety Record',
      'Itinerary Adherence',
      'Group Satisfaction',
      'Operational Efficiency'
    ],
    customOptions: {
      experienceQuality: 'high',
      safetyPriority: 'high',
      customerService: 'premium',
      guidePerformance: 'high',
      operationalEfficiency: 'high'
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
      { id: 'tour', enabled: true, name: 'Tour Optimizer', description: 'Optimizes tour operations' },
      { id: 'experience', enabled: true, name: 'Experience Enhancer', description: 'Enhances tour experiences' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'tour_mgr_1', name: 'Tour Operations', category: 'Tour', description: 'Manage tours', level: 'expert' },
      { id: 'tour_mgr_2', name: 'Guide Coordination', category: 'Coordination', description: 'Coordinate guides', level: 'expert' },
      { id: 'tour_mgr_3', name: 'Tour Quality', category: 'Quality', description: 'Ensure tour quality', level: 'expert' },
      { id: 'tour_mgr_4', name: 'Experience Delivery', category: 'Experience', description: 'Deliver experiences', level: 'advanced' },
      { id: 'tour_mgr_5', name: 'Safety Management', category: 'Safety', description: 'Manage safety', level: 'advanced' }
    ],
    personality: [
      { trait: 'Customer Focus', value: 10, description: 'Customer-centric' },
      { trait: 'Experience Focus', value: 10, description: 'Experience-oriented' },
      { trait: 'Safety Conscious', value: 10, description: 'Safety-conscious' },
      { trait: 'Leadership', value: 9, description: 'Strong leader' },
      { trait: 'Problem Solving', value: 9, description: 'Excellent problem solver' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
