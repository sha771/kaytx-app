import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'fraud-detector',
    name: 'fraud-detector',
    title: 'fraud-detector',
    description: 'The fraud-detector AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#009688',
    type: 'agent' as const,
    humanCost: '$76k/year',
    aiCost: '$1k/year',
    efficiency: '76x efficiency improvement',
    replacesRole: 'fraud-detector',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 820,
      responseTime: '1.7s',
      accuracyRate: '95.8%',
    },
    hierarchy: {
      department: 'Insurance',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
