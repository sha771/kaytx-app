import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Truck } from 'lucide-react-native';

export default function VPFreightForwardingPage() {
  const agent = {
    id: 'vp-freight-forwarding',
    name: 'AI VP Freight Forwarding',
    title: 'VP Freight Forwarding',
    description: 'The AI VP Freight Forwarding manages global freight operations, coordinates ocean and air freight, optimizes shipping routes, and ensures timely and cost-effective freight movement across all modes.',
    capabilities: ["Freight Management","Ocean Freight","Air Freight","Intermodal Coordination","Carrier Relations","Route Optimization","Cost Negotiation","Documentation","Customs Coordination","Strategic Planning"],
    icon: Truck,
    color: '#F97316',
    type: 'employee' as const,
    humanCost: '$210k/year',
    aiCost: '$5.8k/year',
    efficiency: '47x efficiency improvement',
    replacesRole: 'vp-freight-forwarding',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$17,100',
      tasksAutomatedDaily: 1150,
      responseTime: '1.2s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'executive',
      reportsTo: 'chief-logistics-officer',
      manages: ['freight-manager', 'freight-forwarding-manager'],
    },
    specializedCapabilities: [
      'Freight Strategy',
      'Ocean Freight Management',
      'Air Freight Management',
      'Intermodal Coordination',
      'Carrier Relations',
      'Route Optimization',
      'Cost Management',
      'Documentation'
    ],
    integrationOptions: [
      'Freight Platforms',
      'Carrier Systems',
      'TMS Platforms',
      'Customs Systems',
      'Documentation Tools',
      'Analytics Platforms',
      'ERP Systems'
    ],
    automationFeatures: [
      'Freight Planning',
      'Carrier Selection',
      'Route Optimization',
      'Cost Analysis',
      'Documentation Management',
      'Tracking Integration',
      'Report Generation'
    ],
    kpiMetrics: [
      'Freight Cost',
      'On-Time Delivery',
      'Carrier Performance',
      'Route Efficiency',
      'Documentation Accuracy',
      'Customs Clearance Time',
      'Customer Satisfaction'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'advanced',
      costFocus: 'high',
      qualityLevel: 'premium'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: true,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    agentType: 'learning',
    skills: [
      { id: 'vff1', name: 'Freight Management', category: 'Freight', description: 'Manage freight operations', level: 'expert' },
      { id: 'vff2', name: 'Ocean Freight', category: 'Ocean', description: 'Manage ocean freight', level: 'expert' },
      { id: 'vff3', name: 'Air Freight', category: 'Air', description: 'Manage air freight', level: 'expert' }
    ],
    personality: [
      { trait: 'Strategic Thinking', value: 10, description: 'Thinks strategically about freight' },
      { trait: 'Efficiency', value: 10, description: 'Prioritizes efficiency' },
      { trait: 'Leadership', value: 9, description: 'Strong leadership' },
      { trait: 'Cost Conscious', value: 10, description: 'Focuses on cost optimization' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
