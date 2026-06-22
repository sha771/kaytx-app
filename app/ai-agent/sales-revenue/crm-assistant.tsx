import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'crm-assistant',
    name: 'crm-assistant',
    title: 'crm-assistant',
    description: 'The crm-assistant AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#4CAF50',
    type: 'agent' as const,
    humanCost: '$81k/year',
    aiCost: '$1k/year',
    efficiency: '81x efficiency improvement',
    replacesRole: 'crm-assistant',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 878,
      responseTime: '0.9s',
      accuracyRate: '95.7%',
    },
    hierarchy: {
      department: 'Sales-revenue',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
