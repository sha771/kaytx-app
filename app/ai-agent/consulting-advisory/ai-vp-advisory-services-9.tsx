import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ChartBarBig } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-advisory-services',
    name: 'AI VP Advisory Services',
    title: 'VP Advisory Services',
    description: 'AI VP Advisory Services - VP Advisory Services level AI agent in the consulting advisory department. Part of the Kaytx AI Workforce hierarchy providing specialized consulting advisory capabilities.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: ChartBarBig,
    color: 'hsl(333, 70%, 50%)',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1k/year',
    efficiency: '70x efficiency improvement',
    replacesRole: 'VP Advisory Services',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1047,
      responseTime: '0.9s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'consulting advisory',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
