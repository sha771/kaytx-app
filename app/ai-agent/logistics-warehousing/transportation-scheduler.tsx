import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Calendar } from 'lucide-react-native';

export default function TransportationSchedulerPage() {
  const agent = {
    id: 'transportation-scheduler',
    name: 'AI Transportation Scheduler',
    title: 'Transportation Scheduler',
    description: 'The AI Transportation Scheduler schedules transportation activities, coordinates pickup and delivery times, manages capacity, and ensures efficient transportation scheduling across all modes.',
    capabilities: ["Transportation Scheduling","Time Coordination","Capacity Management","Mode Selection","Appointment Setting","Performance Monitoring","Communication","Documentation","Reporting","Optimization"],
    icon: Calendar,
    color: '#EF4444',
    type: 'employee' as const,
    humanCost: '$54k/year',
    aiCost: '$1.4k/year',
    efficiency: '33x efficiency improvement',
    replacesRole: 'transportation-scheduler',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$4,375',
      tasksAutomatedDaily: 450,
      responseTime: '1.8s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'specialist',
      reportsTo: 'transportation-director',
      manages: [],
    },
    specializedCapabilities: [
      'Transportation Scheduling',
      'Time Coordination',
      'Capacity Management',
      'Mode Selection',
      'Appointment Setting',
      'Performance Monitoring',
      'Communication',
      'Documentation'
    ],
    integrationOptions: [
      'Scheduling Systems',
      'TMS Platforms',
      'Carrier Systems',
      'Communication Tools',
      'Analytics Platforms',
      'ERP Integration',
      'Mobile Applications'
    ],
    automationFeatures: [
      'Schedule Planning',
      'Capacity Coordination',
      'Appointment Setting',
      'Mode Selection',
      'Performance Tracking',
      'Communication Automation',
      'Report Generation'
    ],
    kpiMetrics: [
      'Schedule Accuracy',
      'On-Time Pickup',
      'On-Time Delivery',
      'Capacity Utilization',
      'Mode Efficiency',
      'Appointment Adherence',
      'Communication Speed'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      timingLevel: 'premium',
      capacityLevel: 'high'
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
      { id: 'ts1', name: 'Scheduling', category: 'Scheduling', description: 'Schedule transportation', level: 'expert' },
      { id: 'ts2', name: 'Coordination', category: 'Coordination', description: 'Coordinate activities', level: 'expert' },
      { id: 'ts3', name: 'Capacity Management', category: 'Capacity', description: 'Manage capacity', level: 'expert' }
    ],
    personality: [
      { trait: 'Organized', value: 10, description: 'Well-organized' },
      { trait: 'Efficiency', value: 10, description: 'Prioritizes efficiency' },
      { trait: 'Time Management', value: 10, description: 'Excellent time management' },
      { trait: 'Communication', value: 9, description: 'Good communicator' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
