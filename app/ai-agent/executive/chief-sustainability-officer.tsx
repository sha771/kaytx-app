import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Leaf } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'chief-sustainability-officer',
    name: 'Chief Sustainability Officer',
    title: 'Chief Sustainability Officer',
    description: 'The Chief Sustainability Officer AI manages environmental initiatives, ESG reporting, and sustainability strategy.',
    capabilities: ["ESG Reporting","Sustainability Strategy","Carbon Management","Environmental Compliance","Green Initiatives","Impact Measurement"],
    icon: Leaf,
    color: '#10B981',
    type: 'employee' as const,
    humanCost: '$175k/year',
    aiCost: '$3k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'Chief Sustainability Officer',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14k',
      tasksAutomatedDaily: 460,
      responseTime: '0.7s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Executive',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
