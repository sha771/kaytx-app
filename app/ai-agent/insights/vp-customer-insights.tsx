import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-customer-insights',
    name: '{agent.name}',
    title: '{agent.title}',
    description: 'AI VP Customer Insights - VP Customer Insights level AI agent in the vp customer insights department. Part of the Kaytx AI Workforce hierarchy providing automated vp customer insights capabilities.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#673AB7',
    type: 'agent' as const,
    humanCost: '$52k/year',
    aiCost: '$1k/year',
    efficiency: '52x efficiency improvement',
    replacesRole: '{agent.title}',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3',
      tasksAutomatedDaily: 530,
      responseTime: '1.2s',
      accuracyRate: '95.7%',
    },
    hierarchy: {
      department: 'Insights',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
