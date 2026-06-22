import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-chief-data-ai-officer',
    uid: 'ktx-09-chief-data-ai-officer',
    name: 'AI Chief Data & AI Officer',
    title: 'AI Chief Data & AI Officer',
    description: 'AI Chief Data & AI Officer leads strategic direction and executive decision-making for the Data & Intelligence department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Data Governance', 'ETL Processing', 'Predictive Analytics', 'Data Visualization', 'Statistical Modeling'],
    color: '#00ACC1',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '77% efficiency',
    replacesRole: 'AI Chief Data & AI Officer',
    subAgents: [
      { id: 'ai-data-strategy-advisor', uid: 'ktx-09-data-strategy-advisor', name: 'AI Data Strategy Advisor', title: 'AI Data Strategy Advisor', route: '/ai-agent/data/data-strategy-advisor' },
      { id: 'ai-kpi-definition-specialist', uid: 'ktx-09-kpi-definition-specialist', name: 'AI KPI Definition Specialist', title: 'AI KPI Definition Specialist', route: '/ai-agent/data/kpi-definition-specialist' },
      { id: 'ai-anomaly-detector', uid: 'ktx-09-anomaly-detector', name: 'AI Anomaly Detector', title: 'AI Anomaly Detector', route: '/ai-agent/data/anomaly-detector' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11562',
      tasksAutomatedDaily: 598,
      responseTime: '2.3s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Data & Intelligence',
      level: 'c_level',
      departmentId: 9,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
