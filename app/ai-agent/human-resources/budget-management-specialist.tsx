import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Wallet } from 'lucide-react-native';

export default function BudgetManagementSpecialistPage() {
  const agent = {
    id: 'budget-management-specialist',
    name: 'AI Budget Management Specialist',
    title: 'AI Budget Management Specialist',
    description: 'The AI Budget Management Specialist manages HR budgets, tracks expenditure, and ensures optimal allocation of HR financial resources across programs and initiatives.',
    capabilities: ["Budget Management","Expenditure Tracking","Resource Allocation','Budget Forecasting','Cost Control','Financial Reporting','Budget Analytics','Spend Optimization"],
    icon: Wallet,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$4.5k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'budget-management-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$6,700',
      tasksAutomatedDaily: 325,
      responseTime: '0.7s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'management',
      reportsTo: 'vp-compensation',
      manages: [],
    },
    specializedCapabilities: ['Budget Management','Expenditure Tracking','Resource Allocation','Budget Forecasting','Cost Control'],
    integrationOptions: ['Budget Systems','Financial Platforms','HRIS Integration','Analytics Tools'],
    automationFeatures: ['Budget Tracking','Expenditure Monitoring','Resource Allocation','Cost Control'],
    kpiMetrics: ['Budget Adherence','Spend Optimization','Forecast Accuracy','Cost Control','Resource Efficiency'],
    customOptions: { budgetFocus: 'comprehensive', controlLevel: 'high', optimizationPriority: 'maximum' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'budget', enabled: true, name: 'Budget Manager', description: 'Manages budgets' },
      { id: 'spend', enabled: true, name: 'Spend Tracker', description: 'Tracks expenditure' },
      { id: 'allocate', enabled: true, name: 'Resource Allocator', description: 'Allocates resources' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'bms_1', name: 'Budget Management', category: 'Budget', description: 'Manage budgets', level: 'expert' },
      { id: 'bms_2', name: 'Expenditure Tracking', category: 'Tracking', description: 'Track expenditure', level: 'expert' },
      { id: 'bms_3', name: 'Resource Allocation', category: 'Allocation', description: 'Allocate resources', level: 'expert' }
    ],
    personality: [
      { trait: 'Budget Focus', value: 10, description: 'Budget oriented' },
      { trait: 'Cost Conscious', value: 9, description: 'Cost conscious' },
      { trait: 'Precise', value: 9, description: 'Precise mindset' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
