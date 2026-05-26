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
    color: '#3F51B5',
    type: 'employee' as const,
    humanCost: '$243k/year',
    aiCost: '$4k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'cpo',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$18',
      tasksAutomatedDaily: 667,
      responseTime: '1.7s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Product',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
