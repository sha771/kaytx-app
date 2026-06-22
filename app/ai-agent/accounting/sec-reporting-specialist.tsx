import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BadgeCheck } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'sec-reporting-specialist',
    name: 'SEC Reporting Specialist',
    title: 'SEC Reporting Specialist',
    description: 'Specialist managing SEC filings including 10-K, 10-Q, 8-K reports and ensuring compliance with SEC regulations.',
    capabilities: [
      "SEC Filing Preparation",
      "10-K/10-Q/8-K Management",
      "EDGAR Filing",
      "XBRL Tagging",
      "SEC Compliance Monitoring",
      "Disclosure Committee Support"
    ],
    icon: BadgeCheck,
    color: '#1B5E20',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1.5k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'SEC Reporting Specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.8',
      tasksAutomatedDaily: 2456,
      responseTime: '0.8s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
