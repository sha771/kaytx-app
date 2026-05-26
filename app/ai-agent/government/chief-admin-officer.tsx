import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'chief-admin-officer',
    name: 'chief-admin-officer',
    title: 'chief-admin-officer',
    description: 'The chief-admin-officer AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$81k/year',
    aiCost: '$1k/year',
    efficiency: '81x efficiency improvement',
    replacesRole: 'chief-admin-officer',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 763,
      responseTime: '1.5s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Government',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
