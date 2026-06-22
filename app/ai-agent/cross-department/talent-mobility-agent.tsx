import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-talent-mobility-agent',
    uid: 'ktx-00-talent-mobility-agent',
    name: 'AI Talent Mobility Agent',
    title: 'AI Talent Mobility Agent',
    description: 'AI Talent Mobility Agent coordinates team activities and ensures quality output for the Cross-Department department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Cross-department Coordination', 'Enterprise Analytics', 'System Integration', 'Data Sharing', 'Process Orchestration'],
    color: '#8B5CF6',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Talent Mobility Agent',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4136',
      tasksAutomatedDaily: 108,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Cross-Department',
      level: 'team_lead',
      departmentId: 0,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
