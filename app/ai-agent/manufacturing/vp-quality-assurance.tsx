import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-quality-assurance',
    uid: 'ktx-18-vp-quality-assurance',
    name: 'AI VP Quality Assurance',
    title: 'AI VP Quality Assurance',
    description: 'AI VP Quality Assurance drives department strategy and oversees operations for the Manufacturing & Production department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Process Engineering', 'Production Planning', 'Quality Control', 'Inventory Management', 'Equipment Maintenance'],
    color: '#5C6BC0',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI VP Quality Assurance',
    subAgents: [
      { id: 'ai-cost-reduction-analyst', uid: 'ktx-18-cost-reduction-analyst', name: 'AI Cost Reduction Analyst', title: 'AI Cost Reduction Analyst', route: '/ai-agent/manufacturing/cost-reduction-analyst' },
      { id: 'ai-safety-trainer', uid: 'ktx-18-safety-trainer', name: 'AI Safety Trainer', title: 'AI Safety Trainer', route: '/ai-agent/manufacturing/safety-trainer' },
      { id: 'ai-stock-level-monitor', uid: 'ktx-18-stock-level-monitor', name: 'AI Stock Level Monitor', title: 'AI Stock Level Monitor', route: '/ai-agent/manufacturing/stock-level-monitor' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11151',
      tasksAutomatedDaily: 529,
      responseTime: '2.1s',
      accuracyRate: '99.3%',
    },
    hierarchy: {
      department: 'Manufacturing & Production',
      level: 'vp_director',
      departmentId: 18,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
