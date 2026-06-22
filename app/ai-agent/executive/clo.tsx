import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Truck } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'clo',
    name: 'clo',
    title: 'clo',
    description: 'The clo AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Truck,
    color: '#FF9500',
    type: 'employee' as const,
    humanCost: '$221k/year',
    aiCost: '$4k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'clo',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$16',
      tasksAutomatedDaily: 810,
      responseTime: '1.6s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Executive',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
