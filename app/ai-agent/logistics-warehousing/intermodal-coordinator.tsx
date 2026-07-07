import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ArrowRightLeft } from 'lucide-react-native';

export default function IntermodalCoordinatorPage() {
  const agent = {
    id: 'intermodal-coordinator',
    name: 'AI Intermodal Coordinator',
    title: 'Intermodal Coordinator',
    description: 'The AI Intermodal Coordinator coordinates intermodal shipments, manages mode transfers, optimizes multi-modal routes, and ensures seamless transitions between transportation modes.',
    capabilities: ["Intermodal Coordination","Mode Transfer Management","Route Optimization","Synchronization","Documentation","Tracking","Performance Monitoring","Cost Analysis","Exception Handling","Customer Service"],
    icon: ArrowRightLeft,
    color: '#8B5CF6',
    type: 'employee' as const,
    humanCost: '$60k/year',
    aiCost: '$1.5k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'intermodal-coordinator',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$4,875',
      tasksAutomatedDaily: 490,
      responseTime: '1.5s',
      accuracyRate: '95.3%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'specialist',
      reportsTo: 'freight-forwarding-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Intermodal Coordination',
      'Mode Transfer Management',
      'Route Optimization',
      'Synchronization',
      'Documentation',
      'Tracking',
      'Performance Monitoring',
      'Exception Handling'
    ],
    integrationOptions: [
      'Intermodal Systems',
      'Mode Transfer Tools',
      'Route Software',
      'Documentation Platforms',
      'Tracking Systems',
      'Analytics Platforms',
      'ERP Integration'
    ],
    automationFeatures: [
      'Intermodal Planning',
      'Transfer Coordination',
      'Route Optimization',
      'Synchronization',
      'Documentation Generation',
      'Tracking Coordination',
      'Report Generation'
    ],
    kpiMetrics: [
      'Transfer Efficiency',
      'Route Optimization',
      'Synchronization Accuracy',
      'Documentation Quality',
      'Transit Time',
      'Cost Efficiency',
      'Exception Rate'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      coordinationLevel: 'maximum',
      costFocus: 'high'
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
      { id: 'ic1', name: 'Intermodal Coordination', category: 'Intermodal', description: 'Coordinate intermodal', level: 'expert' },
      { id: 'ic2', name: 'Mode Transfer', category: 'Transfer', description: 'Manage transfers', level: 'expert' },
      { id: 'ic3', name: 'Synchronization', category: 'Sync', description: 'Synchronize operations', level: 'expert' }
    ],
    personality: [
      { trait: 'Coordination', value: 10, description: 'Excellent coordinator' },
      { trait: 'Strategic', value: 10, description: 'Strategic thinker' },
      { trait: 'Detail Oriented', value: 10, description: 'Attention to detail' },
      { trait: 'Problem Solving', value: 9, description: 'Problem solver' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
