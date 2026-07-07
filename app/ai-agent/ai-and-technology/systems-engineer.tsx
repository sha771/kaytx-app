import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-systems-engineer',
    uid: 'ktx-06-systems-engineer',
    name: 'AI Systems Engineer',
    title: 'AI Systems Engineer',
    description: 'AI Systems Engineer designs and maintains complex systems. This AI agent automates system integration, troubleshooting, and optimization to ensure seamless technology operations.',
    capabilities: ['System Integration', 'Systems Administration', 'Troubleshooting', 'System Optimization', 'Configuration Management'],
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$100k/year',
    aiCost: '$2,000/mo',
    efficiency: '87% efficiency',
    replacesRole: 'Systems Engineer',
    subAgents: [],
    infrastructure: {
      status: 'online',
      health: 90,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7999',
      tasksAutomatedDaily: 511,
      responseTime: '2.2s',
      accuracyRate: '94.7%',
    },
    hierarchy: {
      department: 'Technology & Engineering',
      level: 'team_lead',
      departmentId: 6,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
