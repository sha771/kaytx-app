import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Megaphone } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-property-marketing',
    name: 'ai-property-marketing',
    title: 'ai-property-marketing',
    description: 'The ai-property-marketing AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Megaphone,
    color: '#8BC34A',
    type: 'agent' as const,
    humanCost: '$76k/year',
    aiCost: '$1k/year',
    efficiency: '76x efficiency improvement',
    replacesRole: 'ai-property-marketing',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1087,
      responseTime: '0.9s',
      accuracyRate: '95.4%',
    },
    hierarchy: {
      department: 'Realestate',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
