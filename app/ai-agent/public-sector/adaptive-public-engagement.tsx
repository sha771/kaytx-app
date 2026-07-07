import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Megaphone } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'adaptive-public-engagement',
    name: 'AI Adaptive Public Engagement',
    title: 'Adaptive Public Engagement',
    description: 'Adaptive public engagement and communication with AI',
    capabilities: ["Public Engagement","Communication","Community Relations","Stakeholder Management"],
    icon: Megaphone,
    color: '#1565C0',
    type: 'employee' as const,
    humanCost: '$82k/year',
    aiCost: '$2.2k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Public Engagement Officer',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6.6k',
      tasksAutomatedDaily: 334,
      responseTime: '0.5s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Public Sector',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
