import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Truck } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'clo-advisor',
    name: 'clo-advisor',
    title: 'clo-advisor',
    description: 'The clo-advisor AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Truck,
    color: '#FF9500',
    type: 'agent' as const,
    humanCost: '$89k/year',
    aiCost: '$1k/year',
    efficiency: '89x efficiency improvement',
    replacesRole: 'clo-advisor',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1158,
      responseTime: '1.0s',
      accuracyRate: '96.1%',
    },
    hierarchy: {
      department: 'Executive',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
