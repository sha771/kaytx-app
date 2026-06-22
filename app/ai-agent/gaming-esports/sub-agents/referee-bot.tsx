import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Sliders } from 'lucide-react-native';

export default function AIRefereeBotPage() {
  const agent = {
    id: 'referee-bot',
    name: 'AI Referee Bot',
    title: 'AI Referee Bot',
    description: 'Enforces game rules and handles dispute resolution.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Sliders,
    color: 'undefined',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$1k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'referee-bot',
    hierarchy: {
      department: 'Gaming & Esports'
    },
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,317',
      tasksAutomatedDaily: 642,
      responseTime: '2.1s',
      accuracyRate: '96.7%',
    }
  };
  return <AgentPageWrapper agent={agent} />;
}
