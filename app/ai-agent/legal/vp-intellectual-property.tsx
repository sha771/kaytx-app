import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-intellectual-property',
    uid: 'ktx-08-vp-intellectual-property',
    name: 'AI VP Intellectual Property',
    title: 'AI VP Intellectual Property',
    description: 'AI VP Intellectual Property drives department strategy and oversees operations for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Legal Research', 'IP Protection', 'Dispute Resolution', 'Policy Development', 'Audit Management'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '84% efficiency',
    replacesRole: 'AI VP Intellectual Property',
    subAgents: [
      { id: 'ai-outside-counsel-coordinator', uid: 'ktx-08-outside-counsel-coordinator', name: 'AI Outside Counsel Coordinator', title: 'AI Outside Counsel Coordinator', route: '/ai-agent/legal/outside-counsel-coordinator' },
      { id: 'ai-infringement-monitor', uid: 'ktx-08-infringement-monitor', name: 'AI Infringement Monitor', title: 'AI Infringement Monitor', route: '/ai-agent/legal/infringement-monitor' },
      { id: 'ai-clause-librarian', uid: 'ktx-08-clause-librarian', name: 'AI Clause Librarian', title: 'AI Clause Librarian', route: '/ai-agent/legal/clause-librarian' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11699',
      tasksAutomatedDaily: 621,
      responseTime: '2.4s',
      accuracyRate: '94.7%',
    },
    hierarchy: {
      department: 'Legal & Compliance',
      level: 'vp_director',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
