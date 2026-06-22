import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-data-analyst',
    uid: 'ktx-09-data-analyst',
    name: 'AI Data Analyst',
    title: 'AI Data Analyst',
    description: 'AI Data Analyst coordinates team activities and ensures quality output for the Data & Intelligence department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Big Data Processing', 'Data Pipeline Management', 'Machine Learning', 'Data Governance', 'ETL Processing'],
    color: '#00ACC1',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '80% efficiency',
    replacesRole: 'AI Data Analyst',
    subAgents: [
      { id: 'ai-data-cost-optimizer', uid: 'ktx-09-data-cost-optimizer', name: 'AI Data Cost Optimizer', title: 'AI Data Cost Optimizer', route: '/ai-agent/data/data-cost-optimizer' },
      { id: 'ai-feature-engineer', uid: 'ktx-09-feature-engineer', name: 'AI Feature Engineer', title: 'AI Feature Engineer', route: '/ai-agent/data/feature-engineer' },
      { id: 'ai-standard-enforcer', uid: 'ktx-09-standard-enforcer', name: 'AI Standard Enforcer', title: 'AI Standard Enforcer', route: '/ai-agent/data/standard-enforcer' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3335',
      tasksAutomatedDaily: 355,
      responseTime: '1.6s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Data & Intelligence',
      level: 'team_lead',
      departmentId: 9,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
