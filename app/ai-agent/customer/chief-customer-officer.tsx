import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'chief-customer-officer',
    name: 'chief-customer-officer',
    title: 'chief-customer-officer',
    description: 'The chief-customer-officer AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Users,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$61k/year',
    aiCost: '$1k/year',
    efficiency: '61x efficiency improvement',
    replacesRole: 'chief-customer-officer',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1067,
      responseTime: '1.6s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Customer',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
