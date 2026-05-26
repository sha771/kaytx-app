import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-medical-coder',
    name: 'ai-medical-coder',
    title: 'ai-medical-coder',
    description: 'The ai-medical-coder AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$82k/year',
    aiCost: '$1k/year',
    efficiency: '82x efficiency improvement',
    replacesRole: 'ai-medical-coder',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 755,
      responseTime: '0.5s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Healthcare',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
