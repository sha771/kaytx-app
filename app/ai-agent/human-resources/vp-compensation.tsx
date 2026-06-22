import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-compensation',
    uid: 'ktx-07-vp-compensation',
    name: 'AI VP Compensation',
    title: 'AI VP Compensation',
    description: 'AI VP Compensation drives department strategy and oversees operations for the Human Resources department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Performance Reviews', 'Training Programs', 'Compensation Analysis', 'Culture Development', 'HR Compliance'],
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI VP Compensation',
    subAgents: [
      { id: 'ai-hiring-forecast-planner', uid: 'ktx-07-hiring-forecast-planner', name: 'AI Hiring Forecast Planner', title: 'AI Hiring Forecast Planner', route: '/ai-agent/human-resources/hiring-forecast-planner' },
      { id: 'ai-pay-equity-auditor', uid: 'ktx-07-pay-equity-auditor', name: 'AI Pay Equity Auditor', title: 'AI Pay Equity Auditor', route: '/ai-agent/human-resources/pay-equity-auditor' },
      { id: 'ai-course-catalog-curator', uid: 'ktx-07-course-catalog-curator', name: 'AI Course Catalog Curator', title: 'AI Course Catalog Curator', route: '/ai-agent/human-resources/course-catalog-curator' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10466',
      tasksAutomatedDaily: 914,
      responseTime: '1.8s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'vp_director',
      departmentId: 7,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
