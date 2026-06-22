import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function InsuranceBrokerPage() {
  const agent = {
    id: 'insurance-broker',
    name: 'AI Insurance Broker',
    title: 'AI Insurance Broker',
    description: 'AI Insurance Broker provides specialized expertise and executes critical tasks for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ["Underwriting","Claims Processing","Fraud Detection","Risk Modeling","Policy Management","Actuarial Analysis","Catastrophe Modeling","Reinsurance Management"],
    icon: Bot,
    color: '#FF5252',
    type: 'employee' as const,
    humanCost: '$80k/year',
    aiCost: '$2k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'insurance-broker',
    infrastructure: {
      status: 'online',
      health: 95 + Math.floor(Math.random() * 5),
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6,500',
      tasksAutomatedDaily: 450,
      responseTime: '2.5s',
      accuracyRate: '95.5%',
      errorReduction: '85%',
      timeSaved: '75%',
    },
    performance: {
      tasksCompleted: 15000 + Math.floor(Math.random() * 5000),
      avgResponseTime: '2.3s',
      accuracy: '94.8%',
      uptime: '99.7%',
      userSatisfaction: '4.6/5',
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