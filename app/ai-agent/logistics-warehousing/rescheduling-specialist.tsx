import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Calendar } from 'lucide-react-native';

export default function ReschedulingSpecialistPage() {
  const agent = {
    id: 'rescheduling-specialist',
    name: 'AI Rescheduling Specialist',
    title: 'Rescheduling Specialist',
    description: 'The AI Rescheduling Specialist manages delivery rescheduling, coordinates time changes, communicates updates, and ensures smooth handling of schedule adjustments.',
    capabilities: ["Rescheduling Management","Change Coordination","Customer Communication","Driver Notification","Route Adjustment","Impact Analysis","Performance Tracking","Reporting","Integration","Continuous Improvement"],
    icon: Calendar,
    color: '#10B981',
    type: 'employee' as const,
    humanCost: '$50k/year',
    aiCost: '$1.3k/year',
    efficiency: '33x efficiency improvement',
    replacesRole: 'rescheduling-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$4,042',
      tasksAutomatedDaily: 400,
      responseTime: '1.8s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'specialist',
      reportsTo: 'last-mile-delivery-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Rescheduling Management',
      'Change Coordination',
      'Customer Communication',
      'Driver Notification',
      'Route Adjustment',
      'Impact Analysis',
      'Performance Tracking',
      'Integration'
    ],
    integrationOptions: [
      'Scheduling Systems',
      'Route Software',
      'Communication Tools',
      'Customer Portals',
      'Driver Apps',
      'Analytics Platforms',
      'ERP Integration'
    ],
    automationFeatures: [
      'Rescheduling Automation',
      'Change Coordination',
      'Customer Communication',
      'Driver Notification',
      'Route Adjustment',
      'Impact Analysis',
      'Report Generation'
    ],
    kpiMetrics: [
      'Rescheduling Speed',
      'Communication Accuracy',
      'Customer Satisfaction',
      'Driver Acceptance',
      'Route Efficiency',
      'Impact Minimization',
      'Overall Efficiency'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      flexibilityLevel: 'maximum',
      customerLevel: 'high'
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
      { id: 'rs1', name: 'Rescheduling Management', category: 'Rescheduling', description: 'Manage rescheduling', level: 'expert' },
      { id: 'rs2', name: 'Change Coordination', category: 'Change', description: 'Coordinate changes', level: 'expert' },
      { id: 'rs3', name: 'Customer Communication', category: 'Customer', description: 'Communicate with customers', level: 'expert' }
    ],
    personality: [
      { trait: 'Flexible', value: 10, description: 'Flexible thinker' },
      { trait: 'Customer Focus', value: 10, description: 'Customer-focused' },
      { trait: 'Communication', value: 10, description: 'Good communicator' },
      { trait: 'Problem Solving', value: 9, description: 'Problem solver' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
