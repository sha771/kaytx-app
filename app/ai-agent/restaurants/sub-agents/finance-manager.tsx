import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Calculator } from 'lucide-react-native';

export default function FinanceManagerPage() {
  const agent = {
    id: 'finance-manager',
    name: 'AI Finance Manager',
    title: 'AI Finance Manager',
    description: 'The AI Finance Manager manages financial operations, oversees budgeting, and ensures financial health for restaurant operations.',
    capabilities: ["Financial Management","Budgeting","Financial Reporting","Cost Control","Financial Planning","Expense Management","Financial Analytics","Cash Management","Financial Strategy","Financial Excellence"],
    icon: Calculator,
    color: '#27AE60',
    type: 'employee' as const,
    humanCost: '$85k/year',
    aiCost: '$2.5k/year',
    efficiency: '34x efficiency improvement',
    replacesRole: 'finance-manager',
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
      department: 'Restaurants',
      level: 'specialist',
      reportsTo: 'vp-finance',
      manages: [],
    },
    specializedCapabilities: [
      'Financial Management',
      'Budgeting',
      'Financial Reporting',
      'Cost Control',
      'Financial Planning',
      'Expense Management',
      'Financial Analytics',
      'Cash Management'
    ],
    integrationOptions: [
      'Financial Systems',
      'Budgeting Tools',
      'Reporting Platforms',
      'Cost Management',
      'POS Analytics',
      'Cash Management',
      'Financial Analytics',
      'Planning Systems'
    ],
    automationFeatures: [
      'Financial Management',
      'Budgeting',
      'Financial Reporting',
      'Cost Control',
      'Financial Planning',
      'Expense Management',
      'Financial Analytics',
      'Cash Management'
    ],
    kpiMetrics: [
      'Financial Health',
      'Budget Adherence',
      'Cost Control',
      'Reporting Accuracy',
      'Financial Efficiency',
      'Cash Flow',
      'Expense Optimization',
      'Financial Excellence'
    ],
    customOptions: {
      financialStrategy: 'conservative',
      budgetApproach: 'strategic',
      costControlLevel: 'strict',
      reportingFrequency: 'real-time',
      planningHorizon: 'quarterly'
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
      { id: 'report', enabled: true, name: 'Financial Reporter', description: 'Reports financially' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'finance_mgr_1', name: 'Financial Management', category: 'Finance', description: 'Manage finances', level: 'expert' },
      { id: 'finance_mgr_2', name: 'Budgeting', category: 'Budget', description: 'Manage budgets', level: 'expert' },
      { id: 'finance_mgr_3', name: 'Financial Reporting', category: 'Reporting', description: 'Report financially', level: 'expert' },
      { id: 'finance_mgr_4', name: 'Cost Control', category: 'Cost', description: 'Control costs', level: 'expert' },
      { id: 'finance_mgr_5', name: 'Financial Planning', category: 'Planning', description: 'Plan financially', level: 'expert' }
    ],
    personality: [
      { trait: 'Financial Acumen', value: 10, description: 'Excellent financial acumen' },
      { trait: 'Analytical Thinking', value: 10, description: 'Strong analytical capabilities' },
      { trait: 'Cost Conscious', value: 10, description: 'Highly cost-conscious' },
      { trait: 'Accuracy', value: 10, description: 'Focused on accuracy' },
      { trait: 'Strategic Thinking', value: 10, description: 'Excellent strategic thinking' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
