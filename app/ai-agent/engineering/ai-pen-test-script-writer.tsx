import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-pen-test-script-writer',
    name: 'AI Pen-test Script Writer',
    title: 'Engineering',
    description: 'The AI Pen-test Script Writer creates automated security testing scripts for vulnerability discovery, exploitation, and security assessment.',
    capabilities: ["Exploit Development","Reconnaissance Scripts","Vulnerability Scanning","Report Generation","Attack Simulation","Security Assessment"],
    icon: Cpu,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$92k/year',
    aiCost: '$1k/year',
    efficiency: '92x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 880,
      responseTime: '1.7s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
