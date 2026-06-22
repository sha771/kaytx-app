import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-risk-modeler',
    name: 'ai-risk-modeler',
    title: 'ai-risk-modeler',
    description: 'The ai-risk-modeler AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#009688',
    type: 'agent' as const,
    humanCost: '$78k/year',
    aiCost: '$1k/year',
    efficiency: '78x efficiency improvement',
    replacesRole: 'ai-risk-modeler',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 939,
      responseTime: '1.6s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Insurance',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
