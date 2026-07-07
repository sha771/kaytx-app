import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'hr-ops-specialist',
    name: 'hr-ops-specialist',
    title: 'hr-ops-specialist',
    description: 'The hr-ops-specialist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$62k/year',
    aiCost: '$1k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'hr-ops-specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 642,
      responseTime: '0.6s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'Hr',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
