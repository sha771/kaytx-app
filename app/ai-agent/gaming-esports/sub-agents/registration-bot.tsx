import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MessageSquare } from 'lucide-react-native';

export default function AIRegistrationBotPage() {
  const agent = {
    id: 'registration-bot',
    name: 'AI Registration Bot',
    title: 'AI Registration Bot',
    description: 'Handles tournament registrations and player verification.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: MessageSquare,
    color: 'undefined',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$1k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'registration-bot',
    hierarchy: {
      department: 'Gaming & Esports'
    },
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,222',
      tasksAutomatedDaily: 983,
      responseTime: '2.3s',
      accuracyRate: '96.3%',
    }
  };
  return <AgentPageWrapper agent={agent} />;
}
