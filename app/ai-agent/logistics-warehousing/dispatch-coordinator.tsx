import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Radio } from 'lucide-react-native';

export default function DispatchCoordinatorPage() {
  const agent = {
    id: 'dispatch-coordinator',
    name: 'AI Dispatch Coordinator',
    title: 'Dispatch Coordinator',
    description: 'The AI Dispatch Coordinator coordinates dispatch activities, manages driver assignments, optimizes dispatch schedules, and ensures efficient and timely dispatch operations.',
    capabilities: ["Dispatch Coordination","Driver Assignment","Schedule Optimization","Communication","Real-Time Tracking","Performance Monitoring","Exception Handling","Documentation","Reporting","Efficiency Optimization"],
    icon: Radio,
    color: '#EF4444',
    type: 'employee' as const,
    humanCost: '$50k/year',
    aiCost: '$1.3k/year',
    efficiency: '31x efficiency improvement',
    replacesRole: 'dispatch-coordinator',
    infrastructure: {
      status: 'online' as const,
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$4,042',
      tasksAutomatedDaily: 420,
      responseTime: '1.9s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'specialist',
      reportsTo: 'delivery-operations-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Dispatch Coordination',
      'Driver Assignment',
      'Schedule Optimization',
      'Communication',
      'Real-Time Tracking',
      'Performance Monitoring',
      'Exception Handling',
      'Documentation'
    ],
    integrationOptions: [
      'Dispatch Systems',
      'Communication Tools',
      'GPS Tracking',
      'Route Software',
      'Analytics Platforms',
      'ERP Integration',
      'Mobile Applications'
    ],
    automationFeatures: [
      'Dispatch Planning',
      'Driver Assignment',
      'Schedule Optimization',
      'Communication Automation',
      'Real-Time Tracking',
      'Performance Monitoring',
      'Report Generation'
    ],
    kpiMetrics: [
      'Dispatch Efficiency',
      'Assignment Accuracy',
      'Schedule Adherence',
      'Communication Speed',
      'Tracking Coverage',
      'Exception Rate',
      'On-Time Dispatch'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      dispatchLevel: 'premium',
      accuracyLevel: 'high'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: false,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: false,
      anomalyDetection: true,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: false,
    },
    agentType: 'learning',
    skills: [
      { id: 'dc1', name: 'Dispatch Coordination', category: 'Dispatch', description: 'Coordinate dispatch', level: 'expert' },
      { id: 'dc2', name: 'Driver Assignment', category: 'Driver', description: 'Assign drivers', level: 'expert' },
      { id: 'dc3', name: 'Schedule Optimization', category: 'Schedule', description: 'Optimize schedules', level: 'expert' }
    ],
    personality: [
      { trait: 'Organized', value: 10, description: 'Well-organized' },
      { trait: 'Efficiency', value: 10, description: 'Prioritizes efficiency' },
      { trait: 'Communication', value: 10, description: 'Good communicator' },
      { trait: 'Quick Thinking', value: 9, description: 'Quick thinker' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
