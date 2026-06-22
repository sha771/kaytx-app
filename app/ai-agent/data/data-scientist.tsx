import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-data-scientist',
    uid: 'ktx-09-data-scientist',
    name: 'AI Data Scientist',
    title: 'AI Data Scientist',
    description: 'AI Data Scientist coordinates team activities and ensures quality output for the Data & Intelligence department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Machine Learning', 'Data Governance', 'ETL Processing', 'Predictive Analytics', 'Data Visualization'],
    color: '#00ACC1',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Data Scientist',
    subAgents: [
      { id: 'ai-data-platform-planner', uid: 'ktx-09-data-platform-planner', name: 'AI Data Platform Planner', title: 'AI Data Platform Planner', route: '/ai-agent/data/data-platform-planner' },
      { id: 'ai-quality-reviewer', uid: 'ktx-09-quality-reviewer', name: 'AI Quality Reviewer', title: 'AI Quality Reviewer', route: '/ai-agent/data/quality-reviewer' },
      { id: 'ai-data-quality-scorer', uid: 'ktx-09-data-quality-scorer', name: 'AI Data Quality Scorer', title: 'AI Data Quality Scorer', route: '/ai-agent/data/data-quality-scorer' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3513',
      tasksAutomatedDaily: 389,
      responseTime: '1.7s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Data & Intelligence',
      level: 'team_lead',
      departmentId: 9,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
