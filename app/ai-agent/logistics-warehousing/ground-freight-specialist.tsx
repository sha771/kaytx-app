import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Truck } from 'lucide-react-native';

export default function GroundFreightSpecialistPage() {
  const agent = {
    id: 'ground-freight-specialist',
    name: 'AI Ground Freight Specialist',
    title: 'Ground Freight Specialist',
    description: 'The AI Ground Freight Specialist manages ground freight shipments, coordinates trucking operations, optimizes overland routes, and ensures efficient ground transportation services.',
    capabilities: ["Ground Freight Management","Trucking Coordination","Route Optimization","Load Planning","Documentation","Tracking","Cost Analysis","Compliance","Performance Monitoring","Customer Service"],
    icon: Truck,
    color: '#8B5CF6',
    type: 'employee' as const,
    humanCost: '$58k/year',
    aiCost: '$1.5k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'ground-freight-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$4,708',
      tasksAutomatedDaily: 480,
      responseTime: '1.5s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'specialist',
      reportsTo: 'freight-forwarding-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Ground Freight Management',
      'Trucking Coordination',
      'Route Optimization',
      'Load Planning',
      'Documentation',
      'Tracking',
      'Cost Analysis',
      'Compliance'
    ],
    integrationOptions: [
      'Ground Freight Platforms',
      'Trucking Systems',
      'Route Software',
      'Documentation Tools',
      'Tracking Systems',
      'Analytics Platforms',
      'ERP Integration'
    ],
    automationFeatures: [
      'Ground Freight Planning',
      'Trucking Coordination',
      'Route Optimization',
      'Load Planning',
      'Documentation Generation',
      'Tracking Coordination',
      'Report Generation'
    ],
    kpiMetrics: [
      'Freight Accuracy',
      'Route Efficiency',
      'Load Utilization',
      'Documentation Quality',
      'Cost Efficiency',
      'Carrier Performance',
      'Customer Satisfaction'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      costFocus: 'maximum',
      reliabilityLevel: 'premium'
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
      { id: 'gfs1', name: 'Ground Freight', category: 'Ground', description: 'Manage ground freight', level: 'expert' },
      { id: 'gfs2', name: 'Trucking Coordination', category: 'Trucking', description: 'Coordinate trucking', level: 'expert' },
      { id: 'gfs3', name: 'Route Optimization', category: 'Route', description: 'Optimize routes', level: 'expert' }
    ],
    personality: [
      { trait: 'Efficiency', value: 10, description: 'Prioritizes efficiency' },
      { trait: 'Cost Conscious', value: 10, description: 'Cost-focused' },
      { trait: 'Reliability', value: 10, description: 'Reliability-focused' },
      { trait: 'Strategic', value: 9, description: 'Strategic thinker' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
