import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'grants-specialist',
    name: 'grants-specialist',
    title: 'grants-specialist',
    description: 'The grants-specialist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$53k/year',
    aiCost: '$1k/year',
    efficiency: '53x efficiency improvement',
    replacesRole: 'grants-specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3',
      tasksAutomatedDaily: 984,
      responseTime: '1.7s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Legal',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
