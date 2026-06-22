import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-department-liaison',
    uid: 'ktx-00-department-liaison',
    name: 'AI Department Liaison',
    title: 'AI Department Liaison',
    description: 'AI Department Liaison coordinates team activities and ensures quality output for the Cross-Department department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Intelligence Aggregation', 'Governance Oversight', 'Anomaly Detection', 'Cross-department Coordination', 'Enterprise Analytics'],
    color: '#8B5CF6',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Department Liaison',
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3869',
      tasksAutomatedDaily: 457,
      responseTime: '2.0s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Cross-Department',
      level: 'team_lead',
      departmentId: 0,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
