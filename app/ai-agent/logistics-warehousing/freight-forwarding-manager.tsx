import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Truck } from 'lucide-react-native';

export default function FreightForwardingManagerPage() {
  const agent = {
    id: 'freight-forwarding-manager',
    name: 'AI Freight Forwarding Manager',
    title: 'Freight Forwarding Manager',
    description: 'The AI Freight Forwarding Manager manages freight forwarding operations, coordinates multi-modal shipments, optimizes freight costs, and ensures efficient movement of goods across all transportation modes.',
    capabilities: ["Freight Management","Multi-Modal Coordination","Cost Optimization","Carrier Management","Route Planning","Documentation","Performance Monitoring","Customer Service","Compliance","Strategic Planning"],
    icon: Truck,
    color: '#8B5CF6',
    type: 'employee' as const,
    humanCost: '$95k/year',
    aiCost: '$2.5k/year',
    efficiency: '42x efficiency improvement',
    replacesRole: 'freight-forwarding-manager',
    infrastructure: {
      status: 'online' as const,
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$7,708',
      tasksAutomatedDaily: 750,
      responseTime: '1.3s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'manager',
      reportsTo: 'vp-freight-forwarding',
      manages: ['ocean-freight-specialist', 'air-freight-specialist'],
    },
    specializedCapabilities: [
      'Freight Management',
      'Multi-Modal Coordination',
      'Cost Optimization',
      'Carrier Management',
      'Route Planning',
      'Documentation',
      'Performance Monitoring',
      'Compliance'
    ],
    integrationOptions: [
      'Freight Platforms',
      'TMS Systems',
      'Carrier Portals',
      'Documentation Tools',
      'Analytics Platforms',
      'ERP Integration',
      'Customs Systems'
    ],
    automationFeatures: [
      'Freight Planning',
      'Carrier Selection',
      'Route Optimization',
      'Documentation Generation',
      'Performance Tracking',
      'Cost Analysis',
      'Report Generation'
    ],
    kpiMetrics: [
      'Freight Cost',
      'On-Time Delivery',
      'Carrier Performance',
      'Documentation Accuracy',
      'Customer Satisfaction',
      'Route Efficiency',
      'Overall Performance'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      costFocus: 'maximum',
      serviceLevel: 'premium'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: false,
      anomalyDetection: true,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    agentType: 'learning',
    skills: [
      { id: 'ffm1', name: 'Freight Management', category: 'Freight', description: 'Manage freight', level: 'expert' },
      { id: 'ffm2', name: 'Multi-Modal Coordination', category: 'Multi-Modal', description: 'Coordinate modes', level: 'expert' },
      { id: 'ffm3', name: 'Cost Optimization', category: 'Cost', description: 'Optimize costs', level: 'expert' }
    ],
    personality: [
      { trait: 'Strategic', value: 10, description: 'Strategic thinker' },
      { trait: 'Cost Conscious', value: 10, description: 'Cost-focused' },
      { trait: 'Coordination', value: 10, description: 'Excellent coordinator' },
      { trait: 'Customer Focus', value: 9, description: 'Customer-focused' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
