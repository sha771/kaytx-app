import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'security-architect-1',
    name: 'Security Architect',
    title: 'Security Architect',
    description: 'The Security Architect AI designs comprehensive security architectures, implements security best practices, and ensures regulatory compliance.',
    capabilities: ["Security Architecture","Threat Modeling","Security Policy Design","Compliance Management","Risk Assessment","Security Governance"],
    icon: Shield,
    color: '#F44336',
    type: 'employee' as const,
    humanCost: '$195k/year',
    aiCost: '$4k/year',
    efficiency: '49x efficiency improvement',
    replacesRole: 'Security Architecture',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$16',
      tasksAutomatedDaily: 960,
      responseTime: '1.0s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
