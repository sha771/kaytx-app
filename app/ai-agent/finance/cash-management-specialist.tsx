import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Wallet } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cash-management-specialist',
    name: 'cash-management-specialist',
    title: 'AI Cash Management Specialist',
    description: 'The AI Cash Management Specialist focuses on optimizing cash flows, managing daily cash positioning, and maximizing liquidity efficiency. This agent ensures optimal cash utilization across all accounts and entities.',
    capabilities: ["Cash Flow Management","Cash Positioning","Liquidity Optimization","Bank Account Management","Payment Processing","Cash Forecasting","Reconciliation","Sweep Management","Idle Cash Investment","Cash Pooling"],
    icon: Wallet,
    color: '#0277BD',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1.1k/year',
    efficiency: '77x efficiency improvement',
    replacesRole: 'cash-management-specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6985',
      tasksAutomatedDaily: 263,
      responseTime: '0.6s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Finance',
      level: 'specialist',
      reportsTo: 'treasury-supervisor',
      manages: [],
    },
    specializedCapabilities: [
      'Daily Cash Positioning',
      'Cash Flow Forecasting',
      'Bank Account Optimization',
      'Payment Processing',
      'Cash Pooling',
      'Sweep Management',
      'Idle Cash Investment',
      'Reconciliation Automation'
    ],
    integrationOptions: [
      'Cash Management Systems',
      'Banking Platforms',
      'Payment Processors',
      'ERP Systems',
      'Treasury Management',
      'Account Reconciliation',
      'Forecasting Tools',
      'Reporting Platforms'
    ],
    automationFeatures: [
      'Cash Position Automation',
      'Payment Processing',
      'Bank Reconciliation',
      'Cash Forecasting',
      'Sweep Transactions',
      'Idle Cash Investment',
      'Alert Generation',
      'Report Automation'
    ],
    kpiMetrics: [
      'Cash Position Accuracy',
      'Liquidity Ratio',
      'Cash Conversion Cycle',
      'Idle Cash Reduction',
      'Payment Efficiency',
      'Bank Fee Optimization',
      'Forecast Accuracy',
      'Transaction Speed'
    ],
    customOptions: {
      riskTolerance: 'low',
      liquidityTarget: 'high',
      sweepFrequency: 'daily',
      investmentStyle: 'conservative',
      reportingFrequency: 'daily'
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts cash positions and flows' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects cash flow anomalies' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'cm_1', name: 'Cash Management', category: 'Operations', description: 'Manage daily cash operations', level: 'expert' },
      { id: 'cm_2', name: 'Cash Forecasting', category: 'Analytics', description: 'Forecast cash flows', level: 'expert' },
      { id: 'cm_3', name: 'Liquidity Optimization', category: 'Optimization', description: 'Optimize cash liquidity', level: 'expert' },
      { id: 'cm_4', name: 'Payment Processing', category: 'Operations', description: 'Process payments efficiently', level: 'advanced' },
      { id: 'cm_5', name: 'Bank Account Management', category: 'Operations', description: 'Manage bank accounts', level: 'advanced' }
    ],
    personality: [
      { trait: 'Precision', value: 10, description: 'Ensures accurate cash positioning' },
      { trait: 'Vigilance', value: 9, description: 'Continuously monitors cash flows' },
      { trait: 'Efficiency', value: 9, description: 'Optimizes cash utilization' },
      { trait: 'Responsiveness', value: 8, description: 'Quickly addresses cash issues' },
      { trait: 'Organization', value: 9, description: 'Maintains organized cash structures' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
