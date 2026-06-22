import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-grants-specialist',
    name: 'ai-grants-specialist',
    title: 'ai-grants-specialist',
    description: 'The ai-grants-specialist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$60k/year',
    aiCost: '$1k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'ai-grants-specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 944,
      responseTime: '1.2s',
      accuracyRate: '95.9%',
    },
    hierarchy: {
      department: 'Government',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
