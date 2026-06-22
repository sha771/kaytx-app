import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Megaphone } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'property-marketing',
    name: 'property-marketing',
    title: 'property-marketing',
    description: 'The property-marketing AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Megaphone,
    color: '#8BC34A',
    type: 'agent' as const,
    humanCost: '$77k/year',
    aiCost: '$1k/year',
    efficiency: '77x efficiency improvement',
    replacesRole: 'property-marketing',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 793,
      responseTime: '1.4s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Realestate',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
