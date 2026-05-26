import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'compliance-manager',
    name: 'compliance-manager',
    title: 'compliance-manager',
    description: 'The compliance-manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1k/year',
    efficiency: '75x efficiency improvement',
    replacesRole: 'compliance-manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 979,
      responseTime: '0.6s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Legal',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
