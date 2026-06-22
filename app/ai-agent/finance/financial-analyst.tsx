import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-financial-analyst',
    uid: 'ktx-05-financial-analyst',
    name: 'AI Financial Analyst',
    title: 'AI Financial Analyst',
    description: 'AI Financial Analyst coordinates team activities and ensures quality output for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Expense Tracking', 'Audit Preparation', 'Cash Flow Analysis', 'Financial Reporting', 'Financial Modeling'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '75% efficiency',
    replacesRole: 'AI Financial Analyst',
    subAgents: [
      { id: 'ai-close-process-coordinator', uid: 'ktx-05-close-process-coordinator', name: 'AI Close Process Coordinator', title: 'AI Close Process Coordinator', route: '/ai-agent/finance/close-process-coordinator' },
      { id: 'ai-journal-entry-reviewer', uid: 'ktx-05-journal-entry-reviewer', name: 'AI Journal Entry Reviewer', title: 'AI Journal Entry Reviewer', route: '/ai-agent/finance/journal-entry-reviewer' },
      { id: 'ai-finding-tracker', uid: 'ktx-05-finding-tracker', name: 'AI Finding Tracker', title: 'AI Finding Tracker', route: '/ai-agent/finance/finding-tracker' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3780',
      tasksAutomatedDaily: 440,
      responseTime: '1.9s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Finance & Accounting',
      level: 'team_lead',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
