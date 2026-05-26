import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Settings } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-travel-coordinator',
    name: 'ai-travel-coordinator',
    title: 'ai-travel-coordinator',
    description: 'The ai-travel-coordinator AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Settings,
    color: '#5856D6',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1k/year',
    efficiency: '85x efficiency improvement',
    replacesRole: 'ai-travel-coordinator',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1147,
      responseTime: '1.2s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Administrative',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
