import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function VPFinancePage() {
  const agent = {
    id: 'vp-finance',
    name: 'AI VP Finance',
    title: 'AI VP Finance',
    description: 'The AI VP Finance oversees all financial operations including budgeting, cost control, financial reporting, and profitability management for restaurants.',
    capabilities: ["Financial Management","Budgeting","Cost Control","Financial Reporting","Profitability","Financial Analytics","Revenue Management","Expense Management","Financial Planning","Financial Strategy"],
    icon: DollarSign,
    color: '#27AE60',
    type: 'employee' as const,
    humanCost: '$155k/year',
    aiCost: '$4k/year',
    efficiency: '39x efficiency improvement',
    replacesRole: 'vp-finance',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12,600',
      tasksAutomatedDaily: 820,
      responseTime: '1.3s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Restaurants',
      level: 'vp_director',
      reportsTo: 'chief-restaurant-officer',
      manages: ['finance-manager', 'cost-controller', 'revenue-manager', 'financial-analyst'],
    },
    specializedCapabilities: [
      'Financial Management',
      'Budgeting',
      'Cost Control',
      'Financial Reporting',
      'Profitability',
      'Financial Analytics',
      'Revenue Management',
      'Expense Management'
    ],
    integrationOptions: [
      'Financial Systems',
      'POS Analytics',
      'Budgeting Tools',
      'Cost Management',
      'Reporting Platforms',
      'Revenue Systems',
      'Expense Tracking',
      'Financial Analytics'
    ],
    automationFeatures: [
      'Financial Management',
      'Budgeting',
      'Cost Control',
      'Financial Reporting',
      'Profitability Analysis',
      'Revenue Management',
      'Expense Tracking',
      'Financial Planning'
    ],
    kpiMetrics: [
      'Profitability',
      'Cost Control',
      'Budget Adherence',
      'Revenue Growth',
      'Financial Accuracy',
      'Expense Efficiency',
      'ROI',
      'Financial Health'
    ],
    customOptions: {
      financialStrategy: 'profit-focused',
      budgetApproach: 'strategic',
      costControlLevel: 'strict',
      reportingFrequency: 'real-time',
      profitabilityFocus: 'optimization'
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
      { id: 'finance', enabled: true, name: 'Financial Manager', description: 'Manages finances' },
      { id: 'budget', enabled: true, name: 'Budget Controller', description: 'Controls budgets' },
      { id: 'profit', enabled: true, name: 'Profitability Analyzer', description: 'Analyzes profitability' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'finance_1', name: 'Financial Management', category: 'Finance', description: 'Manage finances', level: 'expert' },
      { id: 'finance_2', name: 'Budgeting', category: 'Budget', description: 'Manage budgets', level: 'expert' },
      { id: 'finance_3', name: 'Cost Control', category: 'Cost', description: 'Control costs', level: 'expert' },
      { id: 'finance_4', name: 'Financial Reporting', category: 'Reporting', description: 'Report financially', level: 'expert' },
      { id: 'finance_5', name: 'Profitability', category: 'Profitability', description: 'Manage profitability', level: 'expert' }
    ],
    personality: [
      { trait: 'Financial Acumen', value: 10, description: 'Excellent financial acumen' },
      { trait: 'Analytical Thinking', value: 10, description: 'Strong analytical capabilities' },
      { trait: 'Cost Conscious', value: 10, description: 'Highly cost-conscious' },
      { trait: 'Strategic Thinking', value: 10, description: 'Excellent strategic thinking' },
      { trait: 'Accuracy', value: 10, description: 'Focused on accuracy' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
