import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function HRFinanceSpecialistPage() {
  const agent = {
    id: 'hr-finance-specialist',
    name: 'AI HR Finance Specialist',
    title: 'AI HR Finance Specialist',
    description: 'The AI HR Finance Specialist manages HR financial planning, analyzes HR costs, and ensures financial alignment between HR initiatives and organizational budget.',
    capabilities: ["HR Financial Planning","Cost Analysis","Budget Management','Financial Reporting','ROI Analysis','Cost Optimization','Financial Analytics','Budget Forecasting"],
    icon: DollarSign,
    color: '#4CAF50',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$5k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'hr-finance-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$7,500',
      tasksAutomatedDaily: 378,
      responseTime: '0.6s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'management',
      reportsTo: 'chro',
      manages: [],
    },
    specializedCapabilities: ['HR Financial Planning','Cost Analysis','Budget Management','Financial Reporting','ROI Analysis'],
    integrationOptions: ['Financial Systems','HRIS Integration','Budget Tools','Analytics Platforms'],
    automationFeatures: ['Financial Planning','Cost Analysis','Budget Management','ROI Tracking'],
    kpiMetrics: ['Budget Adherence','Cost Savings','ROI Achievement','Financial Accuracy','Forecast Precision'],
    customOptions: { financeFocus: 'comprehensive', costOptimization: 'maximum', budgetPrecision: 'high' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'finance', enabled: true, name: 'Financial Planner', description: 'Plans HR finances' },
      { id: 'cost', enabled: true, name: 'Cost Analyst', description: 'Analyzes HR costs' },
      { id: 'budget', enabled: true, name: 'Budget Manager', description: 'Manages budgets' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'hrfs_1', name: 'HR Financial Planning', category: 'Planning', description: 'Plan HR finances', level: 'expert' },
      { id: 'hrfs_2', name: 'Cost Analysis', category: 'Analysis', description: 'Analyze costs', level: 'expert' },
      { id: 'hrfs_3', name: 'Budget Management', category: 'Budget', description: 'Manage budgets', level: 'expert' }
    ],
    personality: [
      { trait: 'Financial Focus', value: 10, description: 'Financial oriented' },
      { trait: 'Cost Conscious', value: 9, description: 'Cost conscious' },
      { trait: 'Analytical', value: 9, description: 'Analytical mindset' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
