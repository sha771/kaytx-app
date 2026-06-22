import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function InvestmentBankerPage() {
  const agent = {
    id: 'investment-banker',
    name: 'AI Investment Banker',
    title: 'AI Investment Banker',
    description: 'AI Investment Banker provides specialized expertise and executes critical tasks for the Banking & Finance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ["Investment Banking","M&A Advisory","Capital Markets","IPO Management","Debt Financing","Equity Financing"],
    icon: Bot,
    color: '#059669',
    type: 'employee' as const,
    humanCost: '$150k/year',
    aiCost: '$2k/year',
    efficiency: '70x efficiency improvement',
    replacesRole: 'investment-banker',
    infrastructure: {
      status: 'online',
      health: 95 + Math.floor(Math.random() * 5),
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12,400',
      tasksAutomatedDaily: 650,
      responseTime: '2.0s',
      accuracyRate: '97.0%',
      errorReduction: '92%',
      timeSaved: '85%',
    },
    performance: {
      tasksCompleted: 22000 + Math.floor(Math.random() * 5000),
      avgResponseTime: '1.8s',
      accuracy: '96.5%',
      uptime: '99.9%',
      userSatisfaction: '4.8/5',
    },
    features: {
      taskAutomation: true,
      dataProcessing: true,
      workflowManagement: true,
      reporting: true,
      integration: true,
      collaboration: true,
      learning: true,
      security: true,
    },
    integrations: [
      'Department Systems',
      'Enterprise CRM',
      'Analytics Platform',
      'Communication Tools',
    ],
    kpis: [
      'Tasks Completed',
      'Response Time',
      'Accuracy Rate',
      'User Satisfaction',
      'Cost Savings',
      'Efficiency Gain',
    ],
  };

  return <AgentPageWrapper agent={agent} />;
}
