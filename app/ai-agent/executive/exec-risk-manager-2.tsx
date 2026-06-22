import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { AlertTriangle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'exec-risk-manager-2',
    name: 'Executive Risk Manager 2',
    title: 'Strategic Risk Manager',
    description: 'Manages strategic risks, market risks, and business continuity planning.',
    capabilities: ["Strategic Risk Management","Market Risk Assessment","Business Continuity","Crisis Planning","Risk Analytics"],
    icon: AlertTriangle,
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
      tasksAutomatedDaily: 205,
      responseTime: '0.5s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
