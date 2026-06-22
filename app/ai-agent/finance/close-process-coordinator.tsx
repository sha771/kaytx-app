import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-close-process-coordinator',
    uid: 'ktx-05-close-process-coordinator',
    name: 'AI Close Process Coordinator',
    title: 'AI Close Process Coordinator',
    description: 'AI Close Process Coordinator leads strategic direction and executive decision-making for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Expense Tracking', 'Audit Preparation', 'Cash Flow Analysis', 'Financial Reporting', 'Financial Modeling'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '91% efficiency',
    replacesRole: 'AI Close Process Coordinator',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11836',
      tasksAutomatedDaily: 644,
      responseTime: '2.5s',
      accuracyRate: '94.9%',
    },
    hierarchy: {
      department: 'Finance & Accounting',
      level: 'c_level',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
