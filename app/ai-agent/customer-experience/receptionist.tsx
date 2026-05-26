import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'receptionist',
    name: 'receptionist',
    title: 'receptionist',
    description: 'The receptionist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$52k/year',
    aiCost: '$1k/year',
    efficiency: '52x efficiency improvement',
    replacesRole: 'receptionist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3',
      tasksAutomatedDaily: 1318,
      responseTime: '1.3s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Customer-experience',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
