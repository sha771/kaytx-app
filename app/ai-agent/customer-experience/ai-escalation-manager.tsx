import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-escalation-manager',
    name: 'ai-escalation-manager',
    title: 'ai-escalation-manager',
    description: 'The ai-escalation-manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$94k/year',
    aiCost: '$1k/year',
    efficiency: '94x efficiency improvement',
    replacesRole: 'ai-escalation-manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 988,
      responseTime: '0.3s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Customer-experience',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
