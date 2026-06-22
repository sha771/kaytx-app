import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Megaphone } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'evp-marketing',
    name: 'Executive VP Marketing',
    title: 'Executive Vice President of Marketing',
    description: 'Directs marketing strategy, brand management, and customer acquisition initiatives.',
    capabilities: ["Marketing Strategy","Brand Management","Customer Acquisition","Campaign Management","Market Analytics"],
    icon: Megaphone,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$300k/year',
    aiCost: '$6k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'Executive Vice President',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$24k',
      tasksAutomatedDaily: 282,
      responseTime: '0.4s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
