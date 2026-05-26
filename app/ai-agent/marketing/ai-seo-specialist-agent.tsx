import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-seo-specialist-agent',
    name: 'ai-seo-specialist-agent',
    title: 'ai-seo-specialist-agent',
    description: 'The ai-seo-specialist-agent AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$74k/year',
    aiCost: '$1k/year',
    efficiency: '74x efficiency improvement',
    replacesRole: 'ai-seo-specialist-agent',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 789,
      responseTime: '1.8s',
      accuracyRate: '99.0%',
    },
    hierarchy: {
      department: 'Marketing',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
