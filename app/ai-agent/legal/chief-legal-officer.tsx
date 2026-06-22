import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-chief-legal-officer',
    uid: 'ktx-08-chief-legal-officer',
    name: 'AI Chief Legal Officer',
    title: 'AI Chief Legal Officer',
    description: 'AI Chief Legal Officer leads strategic direction and executive decision-making for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Policy Development', 'Audit Management', 'Contract Management', 'Regulatory Compliance', 'Risk Assessment'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '89% efficiency',
    replacesRole: 'AI Chief Legal Officer',
    subAgents: [
      { id: 'ai-legal-strategy-advisor', uid: 'ktx-08-legal-strategy-advisor', name: 'AI Legal Strategy Advisor', title: 'AI Legal Strategy Advisor', route: '/ai-agent/legal/legal-strategy-advisor' },
      { id: 'ai-template-librarian', uid: 'ktx-08-template-librarian', name: 'AI Template Librarian', title: 'AI Template Librarian', route: '/ai-agent/legal/template-librarian' },
      { id: 'ai-corrective-action-monitor', uid: 'ktx-08-corrective-action-monitor', name: 'AI Corrective Action Monitor', title: 'AI Corrective Action Monitor', route: '/ai-agent/legal/corrective-action-monitor' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11014',
      tasksAutomatedDaily: 506,
      responseTime: '2.0s',
      accuracyRate: '99.1%',
    },
    hierarchy: {
      department: 'Legal & Compliance',
      level: 'c_level',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
