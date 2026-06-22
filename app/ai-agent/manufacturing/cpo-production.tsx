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
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$94k/year',
    aiCost: '$1k/year',
    efficiency: '94x efficiency improvement',
    replacesRole: 'cpo-production',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1364,
      responseTime: '1.3s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Manufacturing',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
