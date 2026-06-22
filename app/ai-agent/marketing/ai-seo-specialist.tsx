import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-seo-specialist',
    name: 'ai-seo-specialist',
    title: 'ai-seo-specialist',
    description: 'The ai-seo-specialist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$81k/year',
    aiCost: '$1k/year',
    efficiency: '81x efficiency improvement',
    replacesRole: 'ai-seo-specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 978,
      responseTime: '0.8s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Marketing',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
