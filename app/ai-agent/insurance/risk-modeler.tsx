import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'risk-modeler',
    name: 'risk-modeler',
    title: 'risk-modeler',
    description: 'The risk-modeler AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#009688',
    type: 'agent' as const,
    humanCost: '$51k/year',
    aiCost: '$1k/year',
    efficiency: '51x efficiency improvement',
    replacesRole: 'risk-modeler',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3',
      tasksAutomatedDaily: 1337,
      responseTime: '0.9s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Insurance',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
