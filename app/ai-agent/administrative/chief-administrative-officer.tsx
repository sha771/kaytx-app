import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'chief-administrative-officer',
    name: 'chief-administrative-officer',
    title: 'chief-administrative-officer',
    description: 'The chief-administrative-officer AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#5856D6',
    type: 'agent' as const,
    humanCost: '$64k/year',
    aiCost: '$1k/year',
    efficiency: '64x efficiency improvement',
    replacesRole: 'chief-administrative-officer',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1154,
      responseTime: '1.6s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Administrative',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
