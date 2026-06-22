import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-sentiment-core',
    uid: 'ktx-00-sentiment-core',
    name: 'AI Sentiment Core',
    title: 'AI Sentiment Core',
    description: 'AI Sentiment Core coordinates team activities and ensures quality output for the Cross-Department department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Enterprise Analytics', 'System Integration', 'Data Sharing', 'Process Orchestration', 'Intelligence Aggregation'],
    color: '#8B5CF6',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Sentiment Core',
    subAgents: [
      { id: 'ai-audit-trail-agent', uid: 'ktx-00-audit-trail-agent', name: 'AI Audit Trail Agent', title: 'AI Audit Trail Agent', route: '/ai-agent/cross-department/audit-trail-agent' }
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
      department: 'Cross-Department',
      level: 'team_lead',
      departmentId: 0,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
