import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Badge } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-employer-brand-strategist',
    name: 'ai-employer-brand-strategist',
    title: 'ai-employer-brand-strategist',
    description: 'The ai-employer-brand-strategist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Badge,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$63k/year',
    aiCost: '$1k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'ai-employer-brand-strategist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 938,
      responseTime: '0.6s',
      accuracyRate: '95.4%',
    },
    hierarchy: {
      department: 'Hr',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
