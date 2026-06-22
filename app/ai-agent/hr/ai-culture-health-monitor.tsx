import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Smile } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-culture-health-monitor',
    name: 'ai-culture-health-monitor',
    title: 'ai-culture-health-monitor',
    description: 'The ai-culture-health-monitor AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Smile,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$76k/year',
    aiCost: '$1k/year',
    efficiency: '76x efficiency improvement',
    replacesRole: 'ai-culture-health-monitor',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 859,
      responseTime: '1.7s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Hr',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
