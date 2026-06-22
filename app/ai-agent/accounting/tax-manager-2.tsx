import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'tax-manager-2',
    name: 'Tax Manager II',
    title: 'Tax Manager II',
    description: 'Senior tax manager specializing in international tax matters, transfer pricing, and cross-border tax optimization for multinational operations.',
    capabilities: [
      "International Tax Planning",
      "Transfer Pricing Documentation",
      "Cross-Border Compliance",
      "Tax Treaty Optimization",
      "Foreign Tax Credits",
      "Global Tax Strategy"
    ],
    icon: FileText,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$130k/year',
    aiCost: '$2.0k/year',
    efficiency: '65x efficiency improvement',
    replacesRole: 'Tax Manager II',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10.6',
      tasksAutomatedDaily: 3180,
      responseTime: '0.6s',
      accuracyRate: '99.0%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
