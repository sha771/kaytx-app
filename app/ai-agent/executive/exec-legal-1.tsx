import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Scale } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'exec-legal-1',
    name: 'Executive Legal Counsel 1',
    title: 'Corporate Legal Counsel',
    description: 'Provides legal counsel on corporate matters, contracts, and business transactions.',
    capabilities: ["Corporate Law","Contract Review","Transaction Support","Legal Risk Assessment","Regulatory Guidance"],
    icon: Scale,
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
      tasksAutomatedDaily: 235,
      responseTime: '0.4s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
