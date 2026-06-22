import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-reinsurance-specialist',
    name: 'ai-reinsurance-specialist',
    title: 'ai-reinsurance-specialist',
    description: 'The ai-reinsurance-specialist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#009688',
    type: 'agent' as const,
    humanCost: '$60k/year',
    aiCost: '$1k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'ai-reinsurance-specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1353,
      responseTime: '1.8s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Insurance',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
