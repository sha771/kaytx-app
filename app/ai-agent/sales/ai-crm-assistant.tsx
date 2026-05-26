import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-crm-assistant',
    name: 'ai-crm-assistant',
    title: 'ai-crm-assistant',
    description: 'The ai-crm-assistant AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#4CAF50',
    type: 'agent' as const,
    humanCost: '$52k/year',
    aiCost: '$1k/year',
    efficiency: '52x efficiency improvement',
    replacesRole: 'ai-crm-assistant',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3',
      tasksAutomatedDaily: 1430,
      responseTime: '1.7s',
      accuracyRate: '96.2%',
    },
    hierarchy: {
      department: 'Sales',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
