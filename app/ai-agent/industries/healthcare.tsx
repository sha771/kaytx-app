import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'healthcare',
    name: 'healthcare',
    title: 'healthcare',
    description: 'The healthcare AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$62k/year',
    aiCost: '$1k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'healthcare',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 571,
      responseTime: '1.3s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Industries',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
