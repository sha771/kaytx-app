import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-desktop-support-specialist',
    uid: 'ktx-06-desktop-support-specialist',
    name: 'AI Desktop Support Specialist',
    title: 'AI Desktop Support Specialist',
    description: 'AI Desktop Support Specialist provides support for desktop computers, laptops, and peripherals, handling installations, configurations, troubleshooting, and maintenance to ensure optimal end-user productivity.',
    capabilities: ['Desktop Support', 'OS Installation', 'Application Support', 'Hardware Troubleshooting', 'User Setup'],
    color: '#455A64',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$500/mo',
    efficiency: '91% efficiency',
    replacesRole: 'Desktop Support Specialist',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3416',
      tasksAutomatedDaily: 178,
      responseTime: '2.0s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Technology & Engineering',
      level: 'specialist',
      departmentId: 6,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
