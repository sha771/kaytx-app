import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'security-engineer-1',
    name: 'Security Engineer',
    title: 'Engineering',
    description: 'The Security Engineer AI executes specialized tasks, automates workflows, and delivers consistent high-quality performance within the Engineering department.',
    capabilities: ["Software Development","System Architecture","DevOps & CI/CD","Quality Assurance","Security Engineering","Infrastructure Management"],
    icon: Cpu,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$69k/year',
    aiCost: '$1k/year',
    efficiency: '69x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 670,
      responseTime: '0.5s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
