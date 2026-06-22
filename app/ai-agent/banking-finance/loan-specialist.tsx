import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function LoanSpecialistPage() {
  const agent = {
    id: 'loan-specialist',
    name: 'AI Loan Specialist',
    title: 'AI Loan Specialist',
    description: 'AI Loan Specialist provides specialized expertise and executes critical tasks for the Banking & Finance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ["Loan Processing","Credit Assessment","Underwriting","Loan Servicing","Collections","Portfolio Management"],
    icon: Bot,
    color: '#059669',
    type: 'employee' as const,
    humanCost: '$70k/year',
    aiCost: '$2k/year',
    efficiency: '33x efficiency improvement',
    replacesRole: 'loan-specialist',
    infrastructure: {
      status: 'online',
      health: 95 + Math.floor(Math.random() * 5),
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$5,650',
      tasksAutomatedDaily: 400,
      responseTime: '2.7s',
      accuracyRate: '94.8%',
      errorReduction: '80%',
      timeSaved: '70%',
    },
    performance: {
      tasksCompleted: 14000 + Math.floor(Math.random() * 5000),
      avgResponseTime: '2.5s',
      accuracy: '94.2%',
      uptime: '99.5%',
      userSatisfaction: '4.4/5',
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
