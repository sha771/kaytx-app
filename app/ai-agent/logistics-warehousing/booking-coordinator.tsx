import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CalendarCheck } from 'lucide-react-native';

export default function BookingCoordinatorPage() {
  const agent = {
    id: 'booking-coordinator',
    name: 'AI Booking Coordinator',
    title: 'Booking Coordinator',
    description: 'The AI Booking Coordinator coordinates freight bookings, manages scheduling, optimizes booking capacity, and ensures efficient booking processes across all carriers and modes.',
    capabilities: ["Booking Coordination","Scheduling","Capacity Management","Carrier Selection","Confirmation Management","Documentation","Tracking","Communication","Performance Monitoring","Cost Optimization"],
    icon: CalendarCheck,
    color: '#8B5CF6',
    type: 'employee' as const,
    humanCost: '$52k/year',
    aiCost: '$1.3k/year',
    efficiency: '34x efficiency improvement',
    replacesRole: 'booking-coordinator',
    infrastructure: {
      status: 'online' as const,
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$4,208',
      tasksAutomatedDaily: 420,
      responseTime: '1.7s',
      accuracyRate: '95.0%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'specialist',
      reportsTo: 'freight-forwarding-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Booking Coordination',
      'Scheduling',
      'Capacity Management',
      'Carrier Selection',
      'Confirmation Management',
      'Documentation',
      'Tracking',
      'Cost Optimization'
    ],
    integrationOptions: [
      'Booking Systems',
      'Carrier Portals',
      'Scheduling Tools',
      'Documentation Platforms',
      'Tracking Systems',
      'Analytics Platforms',
      'Communication Tools'
    ],
    automationFeatures: [
      'Booking Processing',
      'Scheduling Automation',
      'Capacity Management',
      'Carrier Selection',
      'Confirmation Tracking',
      'Documentation Generation',
      'Report Generation'
    ],
    kpiMetrics: [
      'Booking Accuracy',
      'Schedule Adherence',
      'Capacity Utilization',
      'Confirmation Speed',
      'Documentation Quality',
      'Cost Efficiency',
      'Carrier Performance'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      capacityLevel: 'maximum',
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
      { id: 'bc1', name: 'Booking Coordination', category: 'Booking', description: 'Coordinate bookings', level: 'expert' },
      { id: 'bc2', name: 'Scheduling', category: 'Scheduling', description: 'Manage schedules', level: 'expert' },
      { id: 'bc3', name: 'Capacity Management', category: 'Capacity', description: 'Manage capacity', level: 'expert' }
    ],
    personality: [
      { trait: 'Organized', value: 10, description: 'Well-organized' },
      { trait: 'Efficiency', value: 10, description: 'Prioritizes efficiency' },
      { trait: 'Coordination', value: 10, description: 'Excellent coordinator' },
      { trait: 'Communication', value: 9, description: 'Good communicator' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
