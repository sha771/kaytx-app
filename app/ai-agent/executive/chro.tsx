import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'chro',
    name: 'chro',
    title: 'chro',
    description: 'The chro AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Users,
    color: '#FF9500',
    type: 'employee' as const,
    humanCost: '$230k/year',
    aiCost: '$4k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'chro',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$17',
      tasksAutomatedDaily: 1336,
      responseTime: '0.5s',
      accuracyRate: '95.1%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
