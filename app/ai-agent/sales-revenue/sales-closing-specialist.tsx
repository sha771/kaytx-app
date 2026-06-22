import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function SalesClosingSpecialistPage() {
  const agent = {
    id: 'sales-closing-specialist',
    name: 'AI Sales Closing Specialist',
    title: 'AI Sales Closing Specialist',
    description: 'The AI Sales Closing Specialist specializes in closing deals, manages final negotiations, and ensures successful deal completion.',
    capabilities: ["Task Automation","Data Processing","Deal Closing","Negotiation","Closing Strategy","Communication","Analytics","Closing Intelligence"],
    icon: DollarSign,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$74k/year',
    aiCost: '$4k/year',
    efficiency: '19x efficiency improvement',
    replacesRole: 'sales-closing-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,800',
      tasksAutomatedDaily: 315,
      responseTime: '0.6s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'management',
      reportsTo: 'vp-sales',
      manages: [],
    },
    specializedCapabilities: [
      'Deal Closing',
      'Negotiation',
      'Closing Strategy',
      'Communication',
      'Analytics',
      'Closing Intelligence'
    ],
    integrationOptions: [
      'CRM Systems',
      'Closing Platforms',
      'Negotiation Tools',
      'Analytics Systems',
      'Communication Platforms',
      'Sales Systems',
      'Contract Management',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Deal Closing',
      'Negotiation',
      'Closing Strategy',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Closing Intelligence'
    ],
    kpiMetrics: [
      'Closing Rate',
      'Negotiation Success',
      'Strategy Effectiveness',
      'Communication Effectiveness',
      'Closing Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      closingFocus: 'high',
      negotiationSuccess: 'maximum',
      strategyEffectiveness: 'optimized',
      integrationLevel: 'comprehensive'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: true,
      sentimentAnalysis: true,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'closing', enabled: true, name: 'Closing Engine', description: 'Closes deals' },
      { id: 'negotiation', enabled: true, name: 'Negotiation Specialist', description: 'Handles negotiations' },
      { id: 'strategy', enabled: true, name: 'Strategy Developer', description: 'Develops strategies' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_1', name: 'Deal Closing', category: 'Closing', description: 'Close deals', level: 'expert' },
      { id: 'sales_2', name: 'Negotiation', category: 'Negotiation', description: 'Negotiate deals', level: 'expert' },
      { id: 'sales_3', name: 'Closing Strategy', category: 'Strategy', description: 'Develop strategies', level: 'expert' },
      { id: 'sales_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'sales_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Closing Expertise', value: 10, description: 'Closing expertise' },
      { trait: 'Negotiation Focus', value: 10, description: 'Negotiation oriented' },
      { trait: 'Strategy Development', value: 10, description: 'Strategy developer' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
