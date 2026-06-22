import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MessageSquare } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'banking',
    name: 'Banking & Finance',
    title: 'Secure account support, onboarding, and high-volume service requests',
    description: 'The Banking & Finance AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: MessageSquare,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$97k/year',
    aiCost: '$1k/year',
    efficiency: '97x efficiency improvement',
    replacesRole: 'Secure account support, onboarding, and high-volume service requests',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1114,
      responseTime: '1.5s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Industries',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
