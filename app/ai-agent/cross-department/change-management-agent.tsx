import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-change-management-agent',
    uid: 'ktx-00-change-management-agent',
    name: 'AI Change Management Agent',
    title: 'AI Change Management Agent',
    description: 'AI Change Management Agent coordinates team activities and ensures quality output for the Cross-Department department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['System Integration', 'Data Sharing', 'Process Orchestration', 'Intelligence Aggregation', 'Governance Oversight'],
    color: '#8B5CF6',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '77% efficiency',
    replacesRole: 'AI Change Management Agent',
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4314',
      tasksAutomatedDaily: 142,
      responseTime: '2.3s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Cross-Department',
      level: 'team_lead',
      departmentId: 0,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
