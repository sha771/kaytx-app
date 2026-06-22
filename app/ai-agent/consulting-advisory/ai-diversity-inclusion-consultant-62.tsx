import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-diversity-inclusion-consultant',
    name: 'AI Diversity & Inclusion Consultant',
    title: 'Diversity & Inclusion Consultant',
    description: 'AI Diversity & Inclusion Consultant - Diversity & Inclusion Consultant level AI agent in the consulting advisory department. Part of the Kaytx AI Workforce hierarchy providing specialized consulting advisory capabilities.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: 'hsl(134, 70%, 50%)',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1k/year',
    efficiency: '70x efficiency improvement',
    replacesRole: 'Diversity & Inclusion Consultant',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1047,
      responseTime: '0.9s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'consulting advisory',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
