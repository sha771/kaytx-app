import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Truck } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'clo-logistics',
    name: 'clo-logistics',
    title: 'clo-logistics',
    description: 'The clo-logistics AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Truck,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$63k/year',
    aiCost: '$1k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'clo-logistics',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 792,
      responseTime: '1.0s',
      accuracyRate: '95.3%',
    },
    hierarchy: {
      department: 'Transportation',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
