import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Monitor } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'financial-systems-analyst',
    name: 'Financial Systems Analyst',
    title: 'Financial Systems Analyst',
    description: 'Analyst managing financial systems, optimizing system performance, and ensuring integration between financial applications.',
    capabilities: [
      "Financial Systems Management",
      "System Performance Optimization",
      "Integration Management",
      "System Requirements Analysis",
      "User Support",
      "System Testing"
    ],
    icon: Monitor,
    color: '#0277BD',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1.5k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'Financial Systems Analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6.9',
      tasksAutomatedDaily: 2345,
      responseTime: '0.8s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
