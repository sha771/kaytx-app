import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Server } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cio',
    name: 'cio',
    title: 'AI Chief Investment Officer',
    description: 'The AI Chief Investment Officer leads investment strategy, oversees portfolio management and trading operations, manages risk and compliance, and drives investment excellence across the organization.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Investment Strategy","Portfolio Management","Trading Operations","Risk Management","Market Analysis","Compliance Oversight","Team Leadership"],
    icon: Server,
    color: '#FFC107',
    type: 'employee' as const,
    humanCost: '$153k/year',
    aiCost: '$3k/year',
    efficiency: '51x efficiency improvement',
    replacesRole: 'cio',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11',
      tasksAutomatedDaily: 770,
      responseTime: '1.2s',
      accuracyRate: '96.4%',
    },
    hierarchy: {
      department: 'Trading',
      level: 'executive',
      reportsTo: 'ceo',
      manages: ['vp-trading', 'vp-investments', 'portfolio-manager', 'trading-desk-manager', 'trading-risk-manager'],
    },
    specializedCapabilities: [
      'Market Analysis',
      'Portfolio Optimization',
      'Risk Assessment',
      'Trade Execution',
      'Compliance Monitoring',
      'Performance Reporting',
      'Asset Allocation',
      'Market Research',
      'Investment Strategy',
      'Regulatory Compliance'
    ],
    integrationOptions: [
      'Trading Platforms',
      'Portfolio Management',
      'Risk Management',
      'Market Data',
      'Compliance Systems',
      'Bloomberg Terminal',
      'Order Management',
      'Analytics Platforms'
    ],
    automationFeatures: [
      'Trade Execution',
      'Portfolio Rebalancing',
      'Risk Monitoring',
      'Compliance Checks',
      'Performance Reporting',
      'Market Alerts',
      'Order Routing',
      'Settlement Tracking'
    ],
    kpiMetrics: [
      'Portfolio Return',
      'Risk Adjusted Return',
      'Sharpe Ratio',
      'Max Drawdown',
      'Trade Volume',
      'Compliance Rate',
      'Cost Efficiency',
      'Alpha Generation'
    ],
    customOptions: {
      riskTolerance: 'moderate',
      investmentHorizon: 'medium-term',
      liquidityPreference: 'balanced',
      sectorFocus: 'diversified',
      esgIntegration: true
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts market trends and asset performance' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects market anomalies and trading risks' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'trade_1', name: 'Market Analysis', category: 'Analytics', description: 'Analyze market trends', level: 'expert' },
      { id: 'trade_2', name: 'Portfolio Management', category: 'Operations', description: 'Manage portfolios', level: 'expert' },
      { id: 'trade_3', name: 'Risk Assessment', category: 'Analytics', description: 'Assess investment risks', level: 'expert' },
      { id: 'trade_4', name: 'Trade Execution', category: 'Operations', description: 'Execute trades', level: 'expert' },
      { id: 'trade_5', name: 'Compliance', category: 'Operations', description: 'Ensure compliance', level: 'expert' }
    ],
    personality: [
      { trait: 'Analytical', value: 10, description: 'Breaks down problems logically' },
      { trait: 'Professionalism', value: 10, description: 'Maintains formal, business-appropriate tone' },
      { trait: 'Assertiveness', value: 9, description: 'Confidently guides conversations' },
      { trait: 'Efficiency', value: 9, description: 'Delivers quick, concise responses' },
      { trait: 'Proactivity', value: 8, description: 'Takes initiative in interactions' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
