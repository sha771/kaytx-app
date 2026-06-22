import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-analytics-project-coordinator',
    uid: 'ktx-08-analytics-project-coordinator',
    name: 'AI AI Analytics Project Coordinator',
    title: 'AI Analytics Project Coordinator',
    description: 'AI AI Analytics Project Coordinator leads strategic direction and executive decision-making for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Contract Management', 'Regulatory Compliance', 'Risk Assessment', 'Legal Research', 'IP Protection'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '79% efficiency',
    replacesRole: 'AI Analytics Project Coordinator',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8384',
      tasksAutomatedDaily: 736,
      responseTime: '0.7s',
      accuracyRate: '95.9%',
    },
    hierarchy: {
      department: 'Legal & Compliance',
      level: 'c_level',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
