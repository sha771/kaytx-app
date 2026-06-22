import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function RetailBankerPage() {
  const agent = {
    id: 'retail-banker',
    name: 'AI Retail Banker',
    title: 'AI Retail Banker',
    description: 'AI Retail Banker provides specialized expertise and executes critical tasks for the Banking & Finance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ["Retail Banking","Personal Banking","Consumer Lending","Savings Accounts","Mortgage Services","Credit Cards"],
    icon: Bot,
    color: '#059669',
    type: 'employee' as const,
    humanCost: '$75k/year',
    aiCost: '$2k/year',
    efficiency: '35x efficiency improvement',
    replacesRole: 'retail-banker',
    infrastructure: {
      status: 'online',
      health: 95 + Math.floor(Math.random() * 5),
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6,100',
      tasksAutomatedDaily: 420,
      responseTime: '2.6s',
      accuracyRate: '95.0%',
      errorReduction: '82%',
      timeSaved: '72%',
    },
    performance: {
      tasksCompleted: 14500 + Math.floor(Math.random() * 5000),
      avgResponseTime: '2.4s',
      accuracy: '94.5%',
      uptime: '99.6%',
      userSatisfaction: '4.5/5',
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
