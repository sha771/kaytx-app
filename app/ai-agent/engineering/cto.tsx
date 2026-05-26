import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cto',
    name: 'CTO',
    title: 'Engineering',
    description: 'The CTO AI provides executive-level strategic oversight, drives organizational alignment, and ensures operational excellence across the Engineering division.',
    capabilities: ["Software Development","System Architecture","DevOps & CI/CD","Quality Assurance","Security Engineering","Infrastructure Management"],
    icon: Cpu,
    color: '#00BCD4',
    type: 'employee' as const,
    humanCost: '$228k/year',
    aiCost: '$4k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$17',
      tasksAutomatedDaily: 1135,
      responseTime: '1.1s',
      accuracyRate: '96.4%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
