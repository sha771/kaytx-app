import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-blog-writer-agent',
    name: 'ai-blog-writer-agent',
    title: 'ai-blog-writer-agent',
    description: 'The ai-blog-writer-agent AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$61k/year',
    aiCost: '$1k/year',
    efficiency: '61x efficiency improvement',
    replacesRole: 'ai-blog-writer-agent',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1177,
      responseTime: '0.6s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Marketing',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
