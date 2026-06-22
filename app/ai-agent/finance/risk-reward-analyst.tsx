import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-risk-reward-analyst',
    uid: 'ktx-05-risk-reward-analyst',
    name: 'AI Risk-Reward Analyst',
    title: 'AI Risk-Reward Analyst',
    description: 'AI Risk-Reward Analyst provides specialized expertise and executes critical tasks for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Cash Flow Analysis', 'Financial Reporting', 'Financial Modeling', 'Budget Management', 'Tax Compliance'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '89% efficiency',
    replacesRole: 'AI Risk-Reward Analyst',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3958',
      tasksAutomatedDaily: 474,
      responseTime: '2.0s',
      accuracyRate: '99.1%',
    },
    hierarchy: {
      department: 'Finance & Accounting',
      level: 'specialist',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
