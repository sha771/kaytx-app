import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-hr-ops-specialist',
    name: 'ai-hr-ops-specialist',
    title: 'ai-hr-ops-specialist',
    description: 'The ai-hr-ops-specialist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$69k/year',
    aiCost: '$1k/year',
    efficiency: '69x efficiency improvement',
    replacesRole: 'ai-hr-ops-specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 617,
      responseTime: '1.3s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Hr',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
