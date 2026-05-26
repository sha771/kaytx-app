import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-loyalty',
    name: '{agent.name}',
    title: '{agent.title}',
    description: 'AI VP Loyalty - VP Loyalty level AI agent in the vp loyalty department. Part of the Kaytx AI Workforce hierarchy providing automated vp loyalty capabilities.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$96k/year',
    aiCost: '$1k/year',
    efficiency: '96x efficiency improvement',
    replacesRole: '{agent.title}',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1022,
      responseTime: '1.8s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Customer-experience',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
