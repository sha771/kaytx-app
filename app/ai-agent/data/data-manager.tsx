import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-data-manager',
    uid: 'ktx-09-data-manager',
    name: 'AI Data Manager',
    title: 'AI Data Manager',
    description: 'AI Data Manager manages team operations and ensures delivery excellence for the Data & Intelligence department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Big Data Processing', 'Data Pipeline Management', 'Machine Learning', 'Data Governance', 'ETL Processing'],
    color: '#00ACC1',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '80% efficiency',
    replacesRole: 'AI Data Manager',
    subAgents: [
      { id: 'ai-publication-coordinator', uid: 'ktx-09-publication-coordinator', name: 'AI Publication Coordinator', title: 'AI Publication Coordinator', route: '/ai-agent/data/publication-coordinator' },
      { id: 'ai-analytics-project-coordinator', uid: 'ktx-09-analytics-project-coordinator', name: 'AI Analytics Project Coordinator', title: 'AI Analytics Project Coordinator', route: '/ai-agent/data/analytics-project-coordinator' },
      { id: 'ai-model-performance-monitor', uid: 'ktx-09-model-performance-monitor', name: 'AI Model Performance Monitor', title: 'AI Model Performance Monitor', route: '/ai-agent/data/model-performance-monitor' }
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
      level: 'manager',
      departmentId: 9,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
