import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Truck } from 'lucide-react-native';

export default function ShippingCoordinatorPage() {
  const agent = {
    id: 'shipping-coordinator',
    name: 'AI Shipping Coordinator',
    title: 'Shipping Coordinator',
    description: 'The AI Shipping Coordinator coordinates shipping activities, manages carrier pickups, prepares shipping documentation, and ensures accurate and timely shipment of goods.',
    capabilities: ["Shipping Coordination","Carrier Management","Documentation","Label Generation","Tracking Coordination","Rate Management","Quality Control","Exception Handling","Performance Tracking","Reporting"],
    icon: Truck,
    color: '#EF4444',
    type: 'employee' as const,
    humanCost: '$55k/year',
    aiCost: '$1.4k/year',
    efficiency: '33x efficiency improvement',
    replacesRole: 'shipping-coordinator',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$4,458',
      tasksAutomatedDaily: 480,
      responseTime: '1.9s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'specialist',
      reportsTo: 'logistics-operations-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Shipping Coordination',
      'Carrier Management',
      'Documentation',
      'Label Generation',
      'Tracking Coordination',
      'Rate Management',
      'Quality Control',
      'Exception Handling'
    ],
    integrationOptions: [
      'Shipping Platforms',
      'Carrier Systems',
      'Label Printers',
      'Documentation Tools',
      'Tracking Systems',
      'ERP Integration',
      'Analytics Platforms'
    ],
    automationFeatures: [
      'Shipping Planning',
      'Carrier Selection',
      'Label Generation',
      'Documentation Creation',
      'Tracking Setup',
      'Exception Monitoring',
      'Report Generation'
    ],
    kpiMetrics: [
      'Shipping Accuracy',
      'On-Time Shipment',
      'Label Accuracy',
      'Documentation Quality',
      'Carrier Performance',
      'Cost Per Shipment',
      'Exception Rate'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      qualityLevel: 'premium',
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
      { id: 'sc1', name: 'Shipping Coordination', category: 'Shipping', description: 'Coordinate shipping', level: 'expert' },
      { id: 'sc2', name: 'Documentation', category: 'Documentation', description: 'Manage documentation', level: 'expert' },
      { id: 'sc3', name: 'Carrier Management', category: 'Carrier', description: 'Manage carriers', level: 'expert' }
    ],
    personality: [
      { trait: 'Detail Oriented', value: 10, description: 'Attention to detail' },
      { trait: 'Efficiency', value: 10, description: 'Prioritizes efficiency' },
      { trait: 'Accuracy', value: 10, description: 'Accuracy-focused' },
      { trait: 'Organization', value: 9, description: 'Well-organized' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
