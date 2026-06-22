import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ShieldAlert } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'exec-risk-manager-1',
    name: 'Executive Risk Manager 1',
    title: 'Enterprise Risk Manager',
    description: 'Manages enterprise risk identification, risk assessment, and risk mitigation strategies.',
    capabilities: ["Risk Identification","Risk Assessment","Risk Mitigation","Risk Monitoring","Enterprise Risk Management"],
    icon: ShieldAlert,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$185k/year',
    aiCost: '$4k/year',
    efficiency: '46x efficiency improvement',
    replacesRole: 'Executive Risk Manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$15k',
      tasksAutomatedDaily: 202,
      responseTime: '0.5s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
