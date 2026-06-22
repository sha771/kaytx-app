import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Gavel } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'exec-legal-2',
    name: 'Executive Legal Counsel 2',
    title: 'Strategic Legal Advisor',
    description: 'Advises on strategic legal matters, M&A legal support, and complex business initiatives.',
    capabilities: ["Strategic Legal Advice","M&A Legal Support","Complex Transactions","Legal Strategy","Risk Mitigation"],
    icon: Gavel,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$220k/year',
    aiCost: '$5k/year',
    efficiency: '44x efficiency improvement',
    replacesRole: 'Executive Legal Counsel',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$18k',
      tasksAutomatedDaily: 238,
      responseTime: '0.4s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
