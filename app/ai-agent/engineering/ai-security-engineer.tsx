import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-security-engineer',
    name: 'AI Security Engineer',
    title: 'Engineering',
    description: 'The AI Security Engineer designs secure architectures, manages vulnerabilities, and implements robust security controls across the infrastructure.',
    capabilities: ["Security Architecture","Vulnerability Management","Penetration Testing","Access Control Design","Security Monitoring","Compliance Enforcement"],
    icon: Cpu,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$98k/year',
    aiCost: '$1k/year',
    efficiency: '98x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 679,
      responseTime: '1.3s',
      accuracyRate: '95.1%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
