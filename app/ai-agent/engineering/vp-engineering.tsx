import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-engineering',
    name: 'VP Engineering',
    title: 'Technology & Engineering Department',
    description: 'The VP Engineering AI leads technology strategy, system architecture, and engineering team excellence. This agent ensures scalable, secure, and high-performance systems while mentoring technical teams and driving innovation.',
    capabilities: ["System Architecture","Code Review","DevOps","SRE","CI/CD Pipelines","Cloud Infrastructure","Security","Performance"],
    icon: Briefcase,
    color: '#00BCD4',
    type: 'employee' as const,
    humanCost: '$192k/year',
    aiCost: '$3k/year',
    efficiency: '64x efficiency improvement',
    replacesRole: 'Technology & Engineering Department',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 642,
      responseTime: '1.3s',
      accuracyRate: '97.6%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
