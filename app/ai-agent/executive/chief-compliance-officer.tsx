import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ShieldCheck } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'chief-compliance-officer',
    name: 'Chief Compliance Officer',
    title: 'Chief Compliance Officer',
    description: 'The Chief Compliance Officer AI ensures regulatory compliance, risk management, and ethical business practices.',
    capabilities: ["Regulatory Compliance","Risk Assessment","Audit Management","Policy Enforcement","Ethics Oversight","Compliance Training"],
    icon: ShieldCheck,
    color: '#059669',
    type: 'employee' as const,
    humanCost: '$195k/year',
    aiCost: '$4k/year',
    efficiency: '49x efficiency improvement',
    replacesRole: 'Chief Compliance Officer',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$16k',
      tasksAutomatedDaily: 510,
      responseTime: '0.5s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Executive',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
