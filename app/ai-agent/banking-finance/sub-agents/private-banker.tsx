import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Gem } from 'lucide-react-native';

export default function PrivateBankerPage() {
  const agent = {
    id: 'private-banker',
    name: 'AI Private Banker',
    title: 'Banking Agent',
    description: 'Automated Private Banker agent specializing in private banking services with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Private Banking","High-Net-Worth Services","Relationship Management","Concierge Services","Investment Advisory"],
    icon: Gem,
    color: '#FF6F00',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1.5k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'Private Banker',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7,800',
      tasksAutomatedDaily: 520,
      responseTime: '1.4s',
      accuracyRate: '97.5%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
