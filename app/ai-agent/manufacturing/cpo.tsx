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
    color: '#FF5722',
    type: 'employee' as const,
    humanCost: '$233k/year',
    aiCost: '$4k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'cpo',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$17',
      tasksAutomatedDaily: 1251,
      responseTime: '0.9s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Manufacturing',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
