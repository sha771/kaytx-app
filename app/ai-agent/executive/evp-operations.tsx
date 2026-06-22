import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Building2 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'evp-operations',
    name: 'Executive VP Operations',
    title: 'Executive Vice President of Operations',
    description: 'Oversees operational excellence, process optimization, and operational strategy execution.',
    capabilities: ["Operations Management","Process Optimization","Strategic Execution","Performance Management","Operational Analytics"],
    icon: Building2,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$300k/year',
    aiCost: '$6k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'Executive Vice President',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$24k',
      tasksAutomatedDaily: 280,
      responseTime: '0.4s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
