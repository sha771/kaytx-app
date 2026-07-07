import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MessageSquare } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'real-time-chat-assistant',
    name: 'AI Real-Time Chat Assistant',
    title: 'Real-Time Chat Assistant',
    description: 'Real-time chat support with AI assistance and natural language processing',
    capabilities: ["Chat Support","Real-Time Assistance","Natural Language Processing","Conversation Management"],
    icon: MessageSquare,
    color: '#1976D2',
    type: 'employee' as const,
    humanCost: '$55k/year',
    aiCost: '$1.4k/year',
    efficiency: '39x efficiency improvement',
    replacesRole: 'Chat Agent',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$4.5k',
      tasksAutomatedDaily: 567,
      responseTime: '0.2s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Customer Support',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
