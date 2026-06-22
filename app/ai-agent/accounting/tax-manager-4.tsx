import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'tax-manager-4',
    name: 'Tax Manager IV',
    title: 'Tax Manager IV',
    description: 'Tax manager specializing in R&D tax credits, incentive optimization, and government benefit programs for innovation-driven organizations.',
    capabilities: [
      "R&D Tax Credit Studies",
      "Incentive Optimization",
      "Government Grant Programs",
      "Tax Credit Documentation",
      "Innovation Incentives",
      "Benefit Maximization"
    ],
    icon: FileText,
    color: '#1E88E5',
    type: 'agent' as const,
    humanCost: '$112k/year',
    aiCost: '$1.7k/year',
    efficiency: '65x efficiency improvement',
    replacesRole: 'Tax Manager IV',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9.3',
      tasksAutomatedDaily: 2850,
      responseTime: '0.7s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
