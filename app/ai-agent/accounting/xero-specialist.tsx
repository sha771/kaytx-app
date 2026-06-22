import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CloudCloud } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'xero-specialist',
    name: 'Xero Specialist',
    title: 'Xero Specialist',
    description: 'Specialist in Xero cloud accounting, managing bookkeeping and financial operations for businesses.',
    capabilities: [
      "Xero Setup & Configuration",
      "Bank Feed Management",
      "Invoice & Bill Processing",
      "Reporting & Analytics",
      "App Integration",
      "Multi-Currency Support"
    ],
    icon: CloudCloud,
    color: '#0091EA',
    type: 'agent' as const,
    humanCost: '$55k/year',
    aiCost: '$1k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'Xero Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4.5',
      tasksAutomatedDaily: 1876,
      responseTime: '1.2s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
