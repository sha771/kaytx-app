import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MessageSquare } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'exec-comm-director-1',
    name: 'Executive Communication Director 1',
    title: 'Director of Internal Communications',
    description: 'Manages internal executive communications, employee engagement, and corporate messaging.',
    capabilities: ["Internal Communications","Employee Engagement","Corporate Messaging","Change Communication","Feedback Management"],
    icon: MessageSquare,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$160k/year',
    aiCost: '$3k/year',
    efficiency: '53x efficiency improvement',
    replacesRole: 'Executive Communication Director',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$13k',
      tasksAutomatedDaily: 175,
      responseTime: '0.5s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
