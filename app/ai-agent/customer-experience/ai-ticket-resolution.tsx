import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-ticket-resolution',
    name: '{agent.name}',
    title: '{agent.title}',
    description: 'AI Ticket Resolution Agent - Ticket Resolution level AI agent in the ai ticket resolution department. Part of the Kaytx AI Workforce hierarchy providing automated ticket resolution capabilities.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$77k/year',
    aiCost: '$1k/year',
    efficiency: '77x efficiency improvement',
    replacesRole: '{agent.title}',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1020,
      responseTime: '1.1s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Customer-experience',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
