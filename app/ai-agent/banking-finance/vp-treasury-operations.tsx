import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Landmark } from 'lucide-react-native';

export default function VPTreasuryOperationsPage() {
  const agent = {
    id: 'vp-treasury-operations',
    name: 'AI VP Treasury Operations',
    title: 'AI VP Treasury Operations',
    description: 'The AI VP Treasury Operations manages treasury functions including liquidity management, funding operations, foreign exchange, interest rate management, and capital allocation.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Treasury Operations","Liquidity Management","FX Trading","Interest Rate Management","Capital Allocation","Risk Management","Team Leadership"],
    icon: Landmark,
    color: '#1B5E20',
    type: 'employee' as const,
    humanCost: '$175k/year',
    aiCost: '$4k/year',
    efficiency: '43x efficiency improvement',
    replacesRole: 'vp-treasury-operations',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14,200',
      tasksAutomatedDaily: 950,
      responseTime: '1.4s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Banking & Finance',
      level: 'vp_director',
      reportsTo: 'chief-banking-officer',
      manages: ['treasury-analyst', 'liquidity-manager', 'foreign-exchange-trader', 'interest-rate-specialist'],
    },
    specializedCapabilities: [
      'Treasury Management',
      'Liquidity Planning',
      'FX Operations',
      'Interest Rate Management',
      'Capital Allocation',
      'Funding Strategy',
      'Risk Management',
      'Cash Optimization'
    ],
    integrationOptions: [
      'Treasury Management Systems',
      'FX Trading Platforms',
      'Banking Systems',
      'Risk Management Tools',
      'Analytics Platforms',
      'Market Data Systems',
      'Payment Systems',
      'Reporting Tools'
    ],
    automationFeatures: [
      'Cash Position Monitoring',
      'FX Execution',
      'Interest Rate Hedging',
      'Liquidity Forecasting',
      'Funding Operations',
      'Capital Allocation',
      'Risk Monitoring',
      'Reporting'
    ],
    kpiMetrics: [
      'Liquidity Ratio',
      'FX Performance',
      'Interest Cost',
      'Capital Efficiency',
      'Risk Exposure',
      'Operating Cost',
      'Forecast Accuracy',
      'Compliance Rate'
    ],
    customOptions: {
      riskTolerance: 'conservative',
      liquidityTarget: 'high',
      costOptimization: 'high',
      serviceLevel: 'premium',
      innovationLevel: 'moderate'
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts liquidity and cash needs' },
      { id: 'fx', enabled: true, name: 'FX Optimizer', description: 'Optimizes foreign exchange operations' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'treas_1', name: 'Treasury Management', category: 'Treasury', description: 'Manage treasury operations', level: 'expert' },
      { id: 'treas_2', name: 'Liquidity Management', category: 'Liquidity', description: 'Optimize liquidity positions', level: 'expert' },
      { id: 'treas_3', name: 'FX Trading', category: 'Trading', description: 'Execute FX operations', level: 'expert' },
      { id: 'treas_4', name: 'Interest Rate Management', category: 'Risk', description: 'Manage interest rate exposure', level: 'expert' },
      { id: 'treas_5', name: 'Capital Allocation', category: 'Finance', description: 'Allocate capital efficiently', level: 'advanced' }
    ],
    personality: [
      { trait: 'Risk Awareness', value: 10, description: 'Highly risk-conscious' },
      { trait: 'Analytical Thinking', value: 10, description: 'Strong analytical capabilities' },
      { trait: 'Precision', value: 10, description: 'Highly precise in operations' },
      { trait: 'Strategic Thinking', value: 9, description: 'Strategic approach to treasury' },
      { trait: 'Leadership', value: 9, description: 'Effective treasury team leader' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
