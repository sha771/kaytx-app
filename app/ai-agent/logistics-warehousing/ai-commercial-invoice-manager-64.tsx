import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-commercial-invoice-manager',
    name: 'AI Commercial Invoice Manager',
    title: 'Commercial Invoice Manager',
    description: 'AI Commercial Invoice Manager - Commercial Invoice Manager level AI agent in the logistics warehousing department. Part of the Kaytx AI Workforce hierarchy providing specialized logistics warehousing capabilities.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: 'hsl(208, 70%, 50%)',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1k/year',
    efficiency: '70x efficiency improvement',
    replacesRole: 'Commercial Invoice Manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1047,
      responseTime: '0.9s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'logistics warehousing',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
