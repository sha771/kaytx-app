import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'data-analyst-1',
    name: 'data-analyst-1',
    title: 'data-analyst-1',
    description: 'The data-analyst-1 AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: BarChart3,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$63k/year',
    aiCost: '$1k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'data-analyst-1',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1208,
      responseTime: '0.9s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Data',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
