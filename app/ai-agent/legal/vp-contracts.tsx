import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-contracts',
    uid: 'ktx-08-vp-contracts',
    name: 'AI VP Contracts',
    title: 'AI VP Contracts',
    description: 'AI VP Contracts drives department strategy and oversees operations for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Audit Management', 'Contract Management', 'Regulatory Compliance', 'Risk Assessment', 'Legal Research'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '80% efficiency',
    replacesRole: 'AI VP Contracts',
    subAgents: [
      { id: 'ai-case-portfolio-manager', uid: 'ktx-08-case-portfolio-manager', name: 'AI Case Portfolio Manager', title: 'AI Case Portfolio Manager', route: '/ai-agent/legal/case-portfolio-manager' },
      { id: 'ai-patent-filing-coordinator', uid: 'ktx-08-patent-filing-coordinator', name: 'AI Patent Filing Coordinator', title: 'AI Patent Filing Coordinator', route: '/ai-agent/legal/patent-filing-coordinator' },
      { id: 'ai-case-law-summarizer', uid: 'ktx-08-case-law-summarizer', name: 'AI Case Law Summarizer', title: 'AI Case Law Summarizer', route: '/ai-agent/legal/case-law-summarizer' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10055',
      tasksAutomatedDaily: 845,
      responseTime: '1.6s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Legal & Compliance',
      level: 'vp_director',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
