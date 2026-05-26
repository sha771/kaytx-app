import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Settings } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'coo',
    name: 'coo',
    title: 'coo',
    description: 'The coo AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Settings,
    color: '#607D8B',
    type: 'employee' as const,
    humanCost: '$238k/year',
    aiCost: '$4k/year',
    efficiency: '59x efficiency improvement',
    replacesRole: 'coo',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$17',
      tasksAutomatedDaily: 1122,
      responseTime: '0.8s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Operations',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
