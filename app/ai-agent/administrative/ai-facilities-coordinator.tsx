import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Settings } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-facilities-coordinator',
    name: 'ai-facilities-coordinator',
    title: 'ai-facilities-coordinator',
    description: 'The ai-facilities-coordinator AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Settings,
    color: '#5856D6',
    type: 'agent' as const,
    humanCost: '$51k/year',
    aiCost: '$1k/year',
    efficiency: '51x efficiency improvement',
    replacesRole: 'ai-facilities-coordinator',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3',
      tasksAutomatedDaily: 524,
      responseTime: '1.5s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Administrative',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
