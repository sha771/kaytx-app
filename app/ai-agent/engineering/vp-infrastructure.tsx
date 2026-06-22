import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-infrastructure',
    name: 'VP Infrastructure',
    title: 'Engineering',
    description: 'The VP Infrastructure AI leads departmental strategy, manages cross-functional initiatives, and drives performance optimization within the Engineering division.',
    capabilities: ["Software Development","System Architecture","DevOps & CI/CD","Quality Assurance","Security Engineering","Infrastructure Management"],
    icon: Briefcase,
    color: '#00BCD4',
    type: 'employee' as const,
    humanCost: '$220k/year',
    aiCost: '$4k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$16',
      tasksAutomatedDaily: 556,
      responseTime: '1.0s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
