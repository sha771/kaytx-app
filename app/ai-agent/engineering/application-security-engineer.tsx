import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Lock } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'application-security-engineer',
    name: 'Application Security Engineer',
    title: 'Engineering',
    description: 'The Application Security Engineer secures applications through code reviews, vulnerability assessments, and secure development practices.',
    capabilities: ["AppSec Review","Static Analysis","Dynamic Analysis","Secure Coding","Vulnerability Assessment","Security Testing"],
    icon: Lock,
    color: '#AD1457',
    type: 'agent' as const,
    humanCost: '$110k/year',
    aiCost: '$1k/year',
    efficiency: '110x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$9',
      tasksAutomatedDaily: 756,
      responseTime: '0.9s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
