import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-customer-risk-analyst',
    uid: 'ktx-16-customer-risk-analyst',
    name: 'AI Customer Risk Analyst',
    title: 'AI Customer Risk Analyst',
    description: 'AI Customer Risk Analyst coordinates team activities and ensures quality output for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Claims Processing', 'Underwriting', 'Policy Management', 'Risk Assessment', 'Fraud Detection'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Customer Risk Analyst',
    subAgents: [
      { id: 'ai-quality-reviewer', uid: 'ktx-16-quality-reviewer', name: 'AI Quality Reviewer', title: 'AI Quality Reviewer', route: '/ai-agent/insurance/quality-reviewer' },
      { id: 'ai-investigation-coordinator', uid: 'ktx-16-investigation-coordinator', name: 'AI Investigation Coordinator', title: 'AI Investigation Coordinator', route: '/ai-agent/insurance/investigation-coordinator' },
      { id: 'ai-treaty-negotiator', uid: 'ktx-16-treaty-negotiator', name: 'AI Treaty Negotiator', title: 'AI Treaty Negotiator', route: '/ai-agent/insurance/treaty-negotiator' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4136',
      tasksAutomatedDaily: 108,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'team_lead',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
