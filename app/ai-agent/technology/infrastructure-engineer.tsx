import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-infrastructure-engineer',
    uid: 'ktx-06-infrastructure-engineer',
    name: 'AI Infrastructure Engineer',
    title: 'AI Infrastructure Engineer',
    description: 'AI Infrastructure Engineer designs, builds, and maintains technology infrastructure including servers, networks, and storage systems, ensuring optimal performance, security, and reliability for all organizational operations.',
    capabilities: ['Infrastructure Design', 'Server Management', 'Network Configuration', 'Storage Management', 'Infrastructure Monitoring'],
    color: '#455A64',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$1,100/mo',
    efficiency: '89% efficiency',
    replacesRole: 'Infrastructure Engineer',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6250',
      tasksAutomatedDaily: 268,
      responseTime: '2.2s',
      accuracyRate: '95.1%',
    },
    hierarchy: {
      department: 'Technology & Engineering',
      level: 'team_lead',
      departmentId: 6,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
