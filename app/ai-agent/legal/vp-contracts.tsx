import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-contracts',
    name: 'vp-contracts',
    title: 'vp-contracts',
    description: 'The vp-contracts AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#795548',
    type: 'employee' as const,
    humanCost: '$171k/year',
    aiCost: '$3k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'vp-contracts',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 943,
      responseTime: '0.7s',
      accuracyRate: '97.6%',
    },
    hierarchy: {
      department: 'Legal',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
