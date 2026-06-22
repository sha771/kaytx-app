import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-ad-campaign-manager-agent',
    name: 'ai-ad-campaign-manager-agent',
    title: 'ai-ad-campaign-manager-agent',
    description: 'The ai-ad-campaign-manager-agent AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$93k/year',
    aiCost: '$1k/year',
    efficiency: '93x efficiency improvement',
    replacesRole: 'ai-ad-campaign-manager-agent',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1242,
      responseTime: '0.3s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'Marketing',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
