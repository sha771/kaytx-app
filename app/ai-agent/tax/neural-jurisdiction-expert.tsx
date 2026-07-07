import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Globe } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'neural-jurisdiction-expert',
    name: 'AI Neural Jurisdiction Expert',
    title: 'Neural Jurisdiction Expert',
    description: 'Multi-jurisdiction tax expertise with neural AI capabilities',
    capabilities: ["Jurisdiction Expertise","Multi-Region Tax","Cross-Border Compliance","International Tax"],
    icon: Globe,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$130k/year',
    aiCost: '$3.8k/year',
    efficiency: '34x efficiency improvement',
    replacesRole: 'Jurisdiction Expert',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$10.5k',
      tasksAutomatedDaily: 178,
      responseTime: '1.3s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
