import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Settings } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-fleet-coordinator',
    name: 'ai-fleet-coordinator',
    title: 'ai-fleet-coordinator',
    description: 'The ai-fleet-coordinator AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Settings,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$93k/year',
    aiCost: '$1k/year',
    efficiency: '93x efficiency improvement',
    replacesRole: 'ai-fleet-coordinator',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 645,
      responseTime: '1.7s',
      accuracyRate: '95.0%',
    },
    hierarchy: {
      department: 'Transportation',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
