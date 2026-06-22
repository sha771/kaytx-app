import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cfo-analyst',
    name: 'cfo-analyst',
    title: 'cfo-analyst',
    description: 'The cfo-analyst AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: DollarSign,
    color: '#FF9500',
    type: 'agent' as const,
    humanCost: '$64k/year',
    aiCost: '$1k/year',
    efficiency: '64x efficiency improvement',
    replacesRole: 'cfo-analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1025,
      responseTime: '0.3s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Executive',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
