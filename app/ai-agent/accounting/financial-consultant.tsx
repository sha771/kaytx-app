import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Network } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'financial-consultant',
    name: 'Financial Consultant',
    title: 'Financial Consultant',
    description: 'Consultant providing expert financial advice, strategic recommendations, and specialized financial analysis for management.',
    capabilities: [
      "Strategic Financial Advisory",
      "Specialized Analysis",
      "Best Practice Recommendations",
      "Process Optimization",
      "Change Management Support",
      "Executive Presentation"
    ],
    icon: Network,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$125k/year',
    aiCost: '$2k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'Financial Consultant',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10.2',
      tasksAutomatedDaily: 2890,
      responseTime: '0.7s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
