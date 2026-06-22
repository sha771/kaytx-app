import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-governance',
    uid: 'ktx-08-vp-governance',
    name: 'AI VP Governance',
    title: 'AI VP Governance',
    description: 'AI VP Governance drives department strategy and oversees operations for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Contract Management', 'Regulatory Compliance', 'Risk Assessment', 'Legal Research', 'IP Protection'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI VP Governance',
    subAgents: [
      { id: 'ai-legal-spend-analyst', uid: 'ktx-08-legal-spend-analyst', name: 'AI Legal Spend Analyst', title: 'AI Legal Spend Analyst', route: '/ai-agent/legal/legal-spend-analyst' },
      { id: 'ai-board-meeting-coordinator', uid: 'ktx-08-board-meeting-coordinator', name: 'AI Board Meeting Coordinator', title: 'AI Board Meeting Coordinator', route: '/ai-agent/legal/board-meeting-coordinator' },
      { id: 'ai-risk-spotter', uid: 'ktx-08-risk-spotter', name: 'AI Risk Spotter', title: 'AI Risk Spotter', route: '/ai-agent/legal/risk-spotter' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10192',
      tasksAutomatedDaily: 868,
      responseTime: '1.6s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Legal & Compliance',
      level: 'vp_director',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
