import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'security-analyst',
    name: 'AI Security Analyst',
    title: 'IT & Technology',
    description: 'Monitors security threats, analyzes vulnerabilities, and protects digital assets.',
    capabilities: ["Threat Monitoring","Vulnerability Analysis","Asset Protection"],
    icon: BarChart3,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$52k/year',
    aiCost: '$1k/year',
    efficiency: '52x efficiency improvement',
    replacesRole: 'IT & Technology',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3',
      tasksAutomatedDaily: 1426,
      responseTime: '1.6s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'It',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
