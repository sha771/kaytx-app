import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'compliance-monitor',
    name: 'compliance-monitor',
    title: 'compliance-monitor',
    description: 'The compliance-monitor AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1k/year',
    efficiency: '75x efficiency improvement',
    replacesRole: 'compliance-monitor',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1443,
      responseTime: '0.9s',
      accuracyRate: '95.1%',
    },
    hierarchy: {
      department: 'Legal',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
