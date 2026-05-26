import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'safety-inspector',
    name: 'safety-inspector',
    title: 'safety-inspector',
    description: 'The safety-inspector AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$71k/year',
    aiCost: '$1k/year',
    efficiency: '71x efficiency improvement',
    replacesRole: 'safety-inspector',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1108,
      responseTime: '0.7s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Manufacturing',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
