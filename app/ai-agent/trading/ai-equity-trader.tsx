import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-equity-trader',
    name: 'ai-equity-trader',
    title: 'ai-equity-trader',
    description: 'The ai-equity-trader AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#FFC107',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$1k/year',
    efficiency: '90x efficiency improvement',
    replacesRole: 'ai-equity-trader',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1137,
      responseTime: '0.7s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'Trading',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
