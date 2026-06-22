import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'acquisition-analyst',
    name: 'acquisition-analyst',
    title: 'acquisition-analyst',
    description: 'The acquisition-analyst AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: BarChart3,
    color: '#8BC34A',
    type: 'agent' as const,
    humanCost: '$76k/year',
    aiCost: '$1k/year',
    efficiency: '76x efficiency improvement',
    replacesRole: 'acquisition-analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1355,
      responseTime: '1.6s',
      accuracyRate: '96.1%',
    },
    hierarchy: {
      department: 'Realestate',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
