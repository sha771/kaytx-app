import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'contract-specialist',
    name: 'contract-specialist',
    title: 'contract-specialist',
    description: 'The contract-specialist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$99k/year',
    aiCost: '$1k/year',
    efficiency: '99x efficiency improvement',
    replacesRole: 'contract-specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1013,
      responseTime: '1.7s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'Legal',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
