import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Search } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'forensic-auditor',
    name: 'Forensic Auditor',
    title: 'Forensic Auditor',
    description: 'Specialized auditor investigating financial fraud, embezzlement, and financial irregularities using advanced analytical techniques.',
    capabilities: [
      "Fraud Detection & Investigation",
      "Financial Irregularity Analysis",
      "Asset Tracing",
      "Evidence Documentation",
      "Expert Report Preparation",
      "Legal Support"
    ],
    icon: Search,
    color: '#C62828',
    type: 'agent' as const,
    humanCost: '$110k/year',
    aiCost: '$2k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'Forensic Auditor',
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
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
