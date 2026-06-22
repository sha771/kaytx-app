import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-claims-adjuster',
    uid: 'ktx-16-claims-adjuster',
    name: 'AI Claims Adjuster',
    title: 'AI Claims Adjuster',
    description: 'AI Claims Adjuster coordinates team activities and ensures quality output for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Policy Management', 'Risk Assessment', 'Fraud Detection', 'Premium Calculation', 'Regulatory Compliance'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI Claims Adjuster',
    subAgents: [
      { id: 'ai-litigation-coordinator', uid: 'ktx-16-litigation-coordinator', name: 'AI Litigation Coordinator', title: 'AI Litigation Coordinator', route: '/ai-agent/insurance/litigation-coordinator' },
      { id: 'ai-damage-assessor', uid: 'ktx-16-damage-assessor', name: 'AI Damage Assessor', title: 'AI Damage Assessor', route: '/ai-agent/insurance/damage-assessor' },
      { id: 'ai-behavioral-scorer', uid: 'ktx-16-behavioral-scorer', name: 'AI Behavioral Scorer', title: 'AI Behavioral Scorer', route: '/ai-agent/insurance/behavioral-scorer' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3602',
      tasksAutomatedDaily: 406,
      responseTime: '1.8s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'team_lead',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
