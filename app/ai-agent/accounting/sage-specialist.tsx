import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Leaf } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'sage-specialist',
    name: 'Sage Specialist',
    title: 'Sage Specialist',
    description: 'Specialist in Sage accounting products including Sage Intacct and Sage 50 for business financial management.',
    capabilities: [
      "Sage Product Management",
      "Financial Module Configuration",
      "Multi-Entity Management",
      "Reporting Automation",
      "Integration Support",
      "Compliance Features"
    ],
    icon: Leaf,
    color: '#1B5E20',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.2k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'Sage Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5.3',
      tasksAutomatedDaily: 1987,
      responseTime: '0.9s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
