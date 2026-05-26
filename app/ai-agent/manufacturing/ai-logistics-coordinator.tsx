import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Settings } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-logistics-coordinator',
    name: 'ai-logistics-coordinator',
    title: 'ai-logistics-coordinator',
    description: 'The ai-logistics-coordinator AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Settings,
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1k/year',
    efficiency: '95x efficiency improvement',
    replacesRole: 'ai-logistics-coordinator',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 959,
      responseTime: '1.0s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Manufacturing',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
