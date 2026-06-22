import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ShieldCheck } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-support-quality-auditor',
    name: 'ai-support-quality-auditor',
    title: 'ai-support-quality-auditor',
    description: 'The ai-support-quality-auditor AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: ShieldCheck,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$56k/year',
    aiCost: '$1k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'ai-support-quality-auditor',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1424,
      responseTime: '1.6s',
      accuracyRate: '96.1%',
    },
    hierarchy: {
      department: 'Customer-experience',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
