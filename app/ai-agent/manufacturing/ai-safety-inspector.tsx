import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-safety-inspector',
    name: 'ai-safety-inspector',
    title: 'ai-safety-inspector',
    description: 'The ai-safety-inspector AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$79k/year',
    aiCost: '$1k/year',
    efficiency: '79x efficiency improvement',
    replacesRole: 'ai-safety-inspector',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 579,
      responseTime: '1.3s',
      accuracyRate: '97.6%',
    },
    hierarchy: {
      department: 'Manufacturing',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
