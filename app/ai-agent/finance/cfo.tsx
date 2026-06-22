import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cfo',
    name: 'cfo',
    title: 'AI Chief Financial Officer',
    description: 'The AI Chief Financial Officer oversees all financial operations, manages treasury and investments, ensures regulatory compliance, and drives financial strategy and planning.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Financial Strategy","Budget Management","Risk Assessment","Investment Management","Compliance Oversight","Reporting","Team Leadership"],
    icon: DollarSign,
    color: '#0D47A1',
    type: 'employee' as const,
    humanCost: '$179k/year',
    aiCost: '$3k/year',
    efficiency: '59x efficiency improvement',
    replacesRole: 'cfo',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 983,
      responseTime: '1.3s',
      accuracyRate: '96.1%',
    },
    hierarchy: {
      department: 'Finance',
      level: 'executive',
      reportsTo: 'ceo',
      manages: ['vp-finance', 'vp-accounting', 'vp-treasury', 'controller', 'finance-manager'],
    },
    specializedCapabilities: [
      'Financial Analysis',
      'Budget Management',
      'Forecasting',
      'Risk Assessment',
      'Audit Support',
      'Compliance Monitoring',
      'Invoice Processing',
      'Expense Tracking',
      'Treasury Management',
      'Financial Reporting'
    ],
    integrationOptions: [
      'Accounting Software',
      'ERP Systems',
      'Banking Platforms',
      'Payment Processors',
      'Tax Software',
      'Compliance Tools',
      'Reporting Platforms',
      'Data Warehouses'
    ],
    automationFeatures: [
      'Invoice Processing',
      'Expense Categorization',
      'Reconciliation',
      'Report Generation',
      'Budget Alerts',
      'Compliance Checks',
      'Audit Trails',
      'Forecast Updates'
    ],
    kpiMetrics: [
      'Budget Variance',
      'Cash Flow',
      'ROI',
      'Cost Reduction',
      'Audit Findings',
      'Compliance Rate',
      'Processing Time',
      'Accuracy Rate'
    ],
    customOptions: {
      riskTolerance: 'conservative',
      complianceLevel: 'strict',
      forecastingHorizon: '12-month',
      auditFrequency: 'monthly',
      costControl: 'high'
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts financial performance and trends' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects financial anomalies and fraud risks' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'fin_1', name: 'Budget Analysis', category: 'Analytics', description: 'Analyze and optimize budgets', level: 'expert' },
      { id: 'fin_2', name: 'ROI Calculation', category: 'Analytics', description: 'Calculate return on investment', level: 'expert' },
      { id: 'fin_4', name: 'Financial Forecasting', category: 'Analytics', description: 'Predict financial trends', level: 'expert' },
      { id: 'fin_6', name: 'Risk Assessment', category: 'Analytics', description: 'Evaluate financial risks', level: 'expert' },
      { id: 'fin_3', name: 'Expense Tracking', category: 'Operations', description: 'Monitor and categorize expenses', level: 'advanced' }
    ],
    personality: [
      { trait: 'Professionalism', value: 10, description: 'Maintains formal, business-appropriate tone' },
      { trait: 'Analytical', value: 10, description: 'Breaks down problems logically' },
      { trait: 'Efficiency', value: 9, description: 'Delivers quick, concise responses' },
      { trait: 'Assertiveness', value: 9, description: 'Confidently guides conversations' },
      { trait: 'Proactivity', value: 8, description: 'Takes initiative in interactions' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
