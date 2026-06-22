import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Megaphone } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-email-marketing-agent',
    name: 'ai-email-marketing-agent',
    title: 'ai-email-marketing-agent',
    description: 'The ai-email-marketing-agent AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Megaphone,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$59k/year',
    aiCost: '$1k/year',
    efficiency: '59x efficiency improvement',
    replacesRole: 'ai-email-marketing-agent',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 995,
      responseTime: '1.3s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'Marketing',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
