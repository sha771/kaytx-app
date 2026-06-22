import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FlaskConical } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'r-and-tax-credit-specialist',
    name: 'R&D Tax Credit Specialist',
    title: 'R&D Tax Credit Specialist',
    description: 'Specialist identifying and documenting qualifying R&D activities for tax credit claims and optimization.',
    capabilities: [
      "R&D Tax Credit Identification",
      "Qualification Analysis",
      "Documentation Support",
      "Credit Calculation",
      "Claim Preparation",
      "Audit Defense"
    ],
    icon: FlaskConical,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$1.5k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'R&D Tax Credit Specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.4',
      tasksAutomatedDaily: 2543,
      responseTime: '0.7s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
