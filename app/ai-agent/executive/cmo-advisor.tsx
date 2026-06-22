import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Megaphone } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cmo-advisor',
    name: 'cmo-advisor',
    title: 'cmo-advisor',
    description: 'The cmo-advisor AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Megaphone,
    color: '#FF9500',
    type: 'agent' as const,
    humanCost: '$58k/year',
    aiCost: '$1k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'cmo-advisor',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 578,
      responseTime: '1.2s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Executive',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
