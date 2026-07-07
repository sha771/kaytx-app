import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Settings } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-care-coordinator',
    name: 'ai-care-coordinator',
    title: 'ai-care-coordinator',
    description: 'The ai-care-coordinator AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Settings,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$92k/year',
    aiCost: '$1k/year',
    efficiency: '92x efficiency improvement',
    replacesRole: 'ai-care-coordinator',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1415,
      responseTime: '1.0s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Healthcare',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
