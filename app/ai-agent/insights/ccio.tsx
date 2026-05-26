import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Server } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ccio',
    name: 'AI Chief Customer Insights Officer',
    title: 'CCIO - Chief Customer Insights Officer',
    description: 'Leads customer insights and analytics strategy, driving data-driven decision making through deep customer understanding, behavioral analysis, predictive intelligence, and personalization across the organization.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Server,
    color: '#673AB7',
    type: 'agent' as const,
    humanCost: '$56k/year',
    aiCost: '$1k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'CCIO - Chief Customer Insights Officer',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 728,
      responseTime: '1.7s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Insights',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
