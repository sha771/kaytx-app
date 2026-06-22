import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'financial-planning-manager',
    name: 'Financial Planning Manager',
    title: 'Financial Planning Manager',
    description: 'Manager leading financial planning processes, long-term financial strategy development, and strategic financial modeling.',
    capabilities: [
      "Financial Planning Leadership",
      "Long-Term Strategy Development",
      "Strategic Modeling",
      "FP&A Team Management",
      "Executive Reporting",
      "Scenario Planning"
    ],
    icon: Target,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$110k/year',
    aiCost: '$2k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'Financial Planning Manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9',
      tasksAutomatedDaily: 2876,
      responseTime: '0.7s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
