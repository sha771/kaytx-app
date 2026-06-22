import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-contract-specialist',
    name: 'ai-contract-specialist',
    title: 'ai-contract-specialist',
    description: 'The ai-contract-specialist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$74k/year',
    aiCost: '$1k/year',
    efficiency: '74x efficiency improvement',
    replacesRole: 'ai-contract-specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1192,
      responseTime: '1.6s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Legal',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
