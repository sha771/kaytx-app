import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-security-engineer',
    name: 'ai-security-engineer',
    title: 'ai-security-engineer',
    description: 'The ai-security-engineer AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$80k/year',
    aiCost: '$1k/year',
    efficiency: '80x efficiency improvement',
    replacesRole: 'ai-security-engineer',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 775,
      responseTime: '1.4s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Tech',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
