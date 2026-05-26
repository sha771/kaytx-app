import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Headphones } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-telehealth-support',
    name: 'ai-telehealth-support',
    title: 'ai-telehealth-support',
    description: 'The ai-telehealth-support AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Headphones,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$88k/year',
    aiCost: '$1k/year',
    efficiency: '88x efficiency improvement',
    replacesRole: 'ai-telehealth-support',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 829,
      responseTime: '0.6s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Healthcare',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
