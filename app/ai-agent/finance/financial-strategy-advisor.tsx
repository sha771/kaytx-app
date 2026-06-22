import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-financial-strategy-advisor',
    uid: 'ktx-05-financial-strategy-advisor',
    name: 'AI Financial Strategy Advisor',
    title: 'AI Financial Strategy Advisor',
    description: 'AI Financial Strategy Advisor provides specialized expertise and executes critical tasks for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Audit Preparation', 'Cash Flow Analysis', 'Financial Reporting', 'Financial Modeling', 'Budget Management'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '78% efficiency',
    replacesRole: 'AI Financial Strategy Advisor',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4581',
      tasksAutomatedDaily: 193,
      responseTime: '0.5s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Finance & Accounting',
      level: 'specialist',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
