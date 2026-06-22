import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { HelpCircle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'financial-services',
    name: 'financial-services',
    title: 'financial-services',
    description: 'The financial-services AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: HelpCircle,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$68k/year',
    aiCost: '$1k/year',
    efficiency: '68x efficiency improvement',
    replacesRole: 'financial-services',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 581,
      responseTime: '1.1s',
      accuracyRate: '95.3%',
    },
    hierarchy: {
      department: 'Industries',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
