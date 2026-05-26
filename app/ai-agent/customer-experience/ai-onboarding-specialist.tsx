import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-onboarding-specialist',
    name: 'ai-onboarding-specialist',
    title: 'ai-onboarding-specialist',
    description: 'The ai-onboarding-specialist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$67k/year',
    aiCost: '$1k/year',
    efficiency: '67x efficiency improvement',
    replacesRole: 'ai-onboarding-specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1480,
      responseTime: '0.5s',
      accuracyRate: '95.3%',
    },
    hierarchy: {
      department: 'Customer-experience',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
