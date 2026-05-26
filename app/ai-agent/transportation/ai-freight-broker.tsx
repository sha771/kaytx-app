import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-freight-broker',
    name: 'ai-freight-broker',
    title: 'ai-freight-broker',
    description: 'The ai-freight-broker AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1k/year',
    efficiency: '65x efficiency improvement',
    replacesRole: 'ai-freight-broker',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1080,
      responseTime: '1.0s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Transportation',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
