import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Package } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cpo',
    name: 'cpo',
    title: 'cpo',
    description: 'The cpo AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Package,
    color: '#FF9500',
    type: 'employee' as const,
    humanCost: '$221k/year',
    aiCost: '$4k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'cpo',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$16',
      tasksAutomatedDaily: 528,
      responseTime: '1.5s',
      accuracyRate: '95.7%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
