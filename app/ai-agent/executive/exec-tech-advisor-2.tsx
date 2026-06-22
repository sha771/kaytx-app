import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Database } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'exec-tech-advisor-2',
    name: 'Executive Technology Advisor 2',
    title: 'IT Architecture Advisor',
    description: 'Advises on IT architecture, infrastructure planning, and technology roadmap execution.',
    capabilities: ["IT Architecture","Infrastructure Planning","Technology Roadmap","System Design","Tech Governance"],
    icon: Database,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$180k/year',
    aiCost: '$4k/year',
    efficiency: '45x efficiency improvement',
    replacesRole: 'Executive Technology Advisor',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$15k',
      tasksAutomatedDaily: 218,
      responseTime: '0.4s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
