import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-chro',
    name: 'ai-chro',
    title: 'ai-chro',
    description: 'The ai-chro AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Users,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$58k/year',
    aiCost: '$1k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'ai-chro',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1192,
      responseTime: '1.1s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Hr',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
