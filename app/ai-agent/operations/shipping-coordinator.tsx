import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Settings } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'shipping-coordinator',
    name: 'shipping-coordinator',
    title: 'shipping-coordinator',
    description: 'The shipping-coordinator AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Settings,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$55k/year',
    aiCost: '$1k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'shipping-coordinator',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 798,
      responseTime: '0.7s',
      accuracyRate: '95.7%',
    },
    hierarchy: {
      department: 'Operations',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
