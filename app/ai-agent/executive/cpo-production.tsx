import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Package } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cpo-production',
    name: 'cpo-production',
    title: 'cpo-production',
    description: 'The cpo-production AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Package,
    color: '#FF9500',
    type: 'agent' as const,
    humanCost: '$74k/year',
    aiCost: '$1k/year',
    efficiency: '74x efficiency improvement',
    replacesRole: 'cpo-production',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1435,
      responseTime: '0.7s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Executive',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
