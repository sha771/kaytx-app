import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ShoppingCart } from 'lucide-react-native';

export default function ProcurementManagerPage() {
  const agent = {
    id: 'procurement-manager',
    name: 'AI Procurement Manager',
    title: 'AI Procurement Manager',
    description: 'The AI Procurement Manager manages purchasing, negotiates with suppliers, and optimizes procurement processes for fashion and luxury materials.',
    capabilities: ["Procurement Management","Purchasing","Supplier Negotiation","Vendor Management","Cost Optimization","Procurement Analytics","Contract Management","Sourcing","Supply Planning","Procurement Strategy"],
    icon: ShoppingCart,
    color: '#2196F3',
    type: 'employee' as const,
    humanCost: '$85k/year',
    aiCost: '$2.5k/year',
    efficiency: '34x efficiency improvement',
    replacesRole: 'procurement-manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6,900',
      tasksAutomatedDaily: 450,
      responseTime: '1.5s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Fashion & Luxury',
      level: 'specialist',
      reportsTo: 'vp-supply-chain',
      manages: [],
    },
    specializedCapabilities: [
      'Procurement Management',
      'Purchasing',
      'Supplier Negotiation',
      'Vendor Management',
      'Cost Optimization',
      'Procurement Analytics',
      'Contract Management',
      'Sourcing'
    ],
    integrationOptions: [
      'Procurement Systems',
      'Supplier Portals',
      'Purchasing Tools',
      'Contract Management',
      'Analytics Platforms',
      'Sourcing Platforms',
      'Vendor Management',
      'Cost Tracking'
    ],
    automationFeatures: [
      'Procurement Planning',
      'Purchasing Automation',
      'Supplier Negotiation',
      'Vendor Management',
      'Cost Optimization',
      'Contract Management',
      'Sourcing',
      'Procurement Analytics'
    ],
    kpiMetrics: [
      'Cost Savings',
      'Supplier Performance',
      'Procurement Efficiency',
      'Contract Compliance',
      'Sourcing Success',
      'Purchase Accuracy',
      'Vendor Relations',
      'Procurement ROI'
    ],
    customOptions: {
      procurementStrategy: 'strategic',
      sourcingApproach: 'global',
      negotiationFocus: 'value',
      vendorStrategy: 'partnership',
      costPriority: 'optimization'
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
    intelligenceFeatures: [
      { id: 'procure', enabled: true, name: 'Procurement Manager', description: 'Manages procurement' },
      { id: 'negotiate', enabled: true, name: 'Negotiation Engine', description: 'Negotiates with suppliers' },
      { id: 'source', enabled: true, name: 'Sourcing Specialist', description: 'Sources materials' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'procure_1', name: 'Procurement Management', category: 'Procurement', description: 'Manage procurement', level: 'expert' },
      { id: 'procure_2', name: 'Purchasing', category: 'Purchasing', description: 'Manage purchasing', level: 'expert' },
      { id: 'procure_3', name: 'Supplier Negotiation', category: 'Negotiation', description: 'Negotiate with suppliers', level: 'expert' },
      { id: 'procure_4', name: 'Vendor Management', category: 'Vendor', description: 'Manage vendors', level: 'expert' },
      { id: 'procure_5', name: 'Cost Optimization', category: 'Cost', description: 'Optimize costs', level: 'expert' }
    ],
    personality: [
      { trait: 'Negotiation', value: 10, description: 'Strong negotiation skills' },
      { trait: 'Strategic Thinking', value: 10, description: 'Excellent strategic thinking' },
      { trait: 'Cost Focus', value: 10, description: 'Focused on cost' },
      { trait: 'Vendor Relations', value: 10, description: 'Excellent vendor relations' },
      { trait: 'Value Creation', value: 10, description: 'Focused on value' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
