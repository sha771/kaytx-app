import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-supplier-relations',
    name: 'ai-supplier-relations',
    title: 'ai-supplier-relations',
    description: 'The ai-supplier-relations AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1k/year',
    efficiency: '65x efficiency improvement',
    replacesRole: 'ai-supplier-relations',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1241,
      responseTime: '1.5s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Supply-chain',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
