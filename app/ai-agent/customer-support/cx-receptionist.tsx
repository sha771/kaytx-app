import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cx-receptionist',
    name: 'cx-receptionist',
    title: 'cx-receptionist',
    description: 'The cx-receptionist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$96k/year',
    aiCost: '$1k/year',
    efficiency: '96x efficiency improvement',
    replacesRole: 'cx-receptionist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1405,
      responseTime: '1.8s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'Customer',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
