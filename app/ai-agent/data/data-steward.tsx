import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-data-steward',
    uid: 'ktx-09-data-steward',
    name: 'AI Data Steward',
    title: 'AI Data Steward',
    description: 'AI Data Steward coordinates team activities and ensures quality output for the Data & Intelligence department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Big Data Processing', 'Data Pipeline Management', 'Machine Learning', 'Data Governance', 'ETL Processing'],
    color: '#00ACC1',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '80% efficiency',
    replacesRole: 'AI Data Steward',
    subAgents: [
      { id: 'ai-stakeholder-communicator', uid: 'ktx-09-stakeholder-communicator', name: 'AI Stakeholder Communicator', title: 'AI Stakeholder Communicator', route: '/ai-agent/data/stakeholder-communicator' },
      { id: 'ai-query-builder', uid: 'ktx-09-query-builder', name: 'AI Query Builder', title: 'AI Query Builder', route: '/ai-agent/data/query-builder' },
      { id: 'ai-segmentation-expert', uid: 'ktx-09-segmentation-expert', name: 'AI Segmentation Expert', title: 'AI Segmentation Expert', route: '/ai-agent/data/segmentation-expert' }
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
