import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function RateNegotiatorPage() {
  const agent = {
    id: 'rate-negotiator',
    name: 'AI Rate Negotiator',
    title: 'Rate Negotiator',
    description: 'The AI Rate Negotiator negotiates freight rates, analyzes market pricing, develops pricing strategies, and ensures competitive freight rates across all transportation modes.',
    capabilities: ["Rate Negotiation","Market Analysis","Pricing Strategy","Cost Optimization","Contract Review","Benchmarking","Reporting","Performance Tracking","Strategic Planning","Savings Analysis"],
    icon: DollarSign,
    color: '#8B5CF6',
    type: 'employee' as const,
    humanCost: '$68k/year',
    aiCost: '$1.8k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'rate-negotiator',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$5,500',
      tasksAutomatedDaily: 550,
      responseTime: '1.4s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'specialist',
      reportsTo: 'carrier-relations-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Rate Negotiation',
      'Market Analysis',
      'Pricing Strategy',
      'Cost Optimization',
      'Contract Review',
      'Benchmarking',
      'Performance Tracking',
      'Savings Analysis'
    ],
    integrationOptions: [
      'Rate Management Tools',
      'Market Data Platforms',
      'Contract Systems',
      'Analytics Platforms',
      'ERP Integration',
      'Benchmarking Tools',
      'Reporting Systems'
    ],
    automationFeatures: [
      'Rate Analysis',
      'Market Monitoring',
      'Pricing Strategy',
      'Cost Optimization',
      'Contract Review',
      'Savings Tracking',
      'Report Generation'
    ],
    kpiMetrics: [
      'Rate Reduction',
      'Market Alignment',
      'Savings Achieved',
      'Contract Value',
      'Negotiation Success',
      'Benchmark Accuracy',
      'Cost Performance'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      costFocus: 'maximum',
      savingsLevel: 'premium'
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
      { id: 'rn1', name: 'Rate Negotiation', category: 'Negotiation', description: 'Negotiate rates', level: 'expert' },
      { id: 'rn2', name: 'Market Analysis', category: 'Market', description: 'Analyze market', level: 'expert' },
      { id: 'rn3', name: 'Pricing Strategy', category: 'Pricing', description: 'Develop strategies', level: 'expert' }
    ],
    personality: [
      { trait: 'Negotiation', value: 10, description: 'Strong negotiator' },
      { trait: 'Analytical', value: 10, description: 'Highly analytical' },
      { trait: 'Strategic', value: 10, description: 'Strategic thinker' },
      { trait: 'Cost Conscious', value: 9, description: 'Cost-focused' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
