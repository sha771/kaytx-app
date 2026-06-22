import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-customer-success-director-1',
    name: 'Customer Success Director',
    title: 'Customer Success Director',
    description: 'The Customer Success Director AI leads customer success strategy, oversees account health initiatives, and ensures maximum value realization for enterprise customers.',
    capabilities: ["Strategic Account Management","Customer Health Monitoring","Success Planning","Value Realization","Team Leadership","Revenue Retention"],
    icon: Users,
    color: '#9C27B0',
    type: 'employee' as const,
    humanCost: '$185k/year',
    aiCost: '$4k/year',
    efficiency: '46x efficiency improvement',
    replacesRole: 'Customer Success',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$15',
      tasksAutomatedDaily: 890,
      responseTime: '1.3s',
      accuracyRate: '94.7%',
    },
    hierarchy: {
      department: 'Customer Experience',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
