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
    humanCost: '$89k/year',
    aiCost: '$1k/year',
    efficiency: '89x efficiency improvement',
    replacesRole: 'receptionist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1468,
      responseTime: '1.7s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Customer',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
