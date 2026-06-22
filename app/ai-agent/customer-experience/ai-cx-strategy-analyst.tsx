import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-cx-strategy-analyst',
    name: 'ai-cx-strategy-analyst',
    title: 'ai-cx-strategy-analyst',
    description: '{agent.longDescription}',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: BarChart3,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$76k/year',
    aiCost: '$1k/year',
    efficiency: '76x efficiency improvement',
    replacesRole: 'ai-cx-strategy-analyst',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 975,
      responseTime: '0.5s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Customer-experience',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
