import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'security-architect-enterprise',
    name: 'security-architect-enterprise',
    title: 'security-architect-enterprise',
    description: 'The security-architect-enterprise AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$63k/year',
    aiCost: '$1k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'security-architect-enterprise',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1240,
      responseTime: '1.0s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Security',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
