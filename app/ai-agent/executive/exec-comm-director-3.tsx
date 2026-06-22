import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Globe } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'exec-comm-director-3',
    name: 'Executive Communication Director 3',
    title: 'Director of Investor Communications',
    description: 'Manages investor communications, shareholder relations, and financial disclosure strategies.',
    capabilities: ["Investor Communications","Shareholder Relations","Financial Disclosures","Earnings Communication","Investor Relations"],
    icon: Globe,
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
      tasksAutomatedDaily: 180,
      responseTime: '0.5s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
