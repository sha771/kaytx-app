import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'property-manager',
    name: 'property-manager',
    title: 'property-manager',
    description: 'The property-manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#8BC34A',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1k/year',
    efficiency: '75x efficiency improvement',
    replacesRole: 'property-manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 544,
      responseTime: '0.6s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Realestate',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
