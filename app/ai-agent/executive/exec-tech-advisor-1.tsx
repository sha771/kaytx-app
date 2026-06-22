import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'exec-tech-advisor-1',
    name: 'Executive Technology Advisor 1',
    title: 'Technology Strategy Advisor',
    description: 'Advises on technology strategy, digital transformation, and technology investments.',
    capabilities: ["Technology Strategy","Digital Transformation","Technology Investments","Tech Assessment","Innovation Advisory"],
    icon: Cpu,
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
      tasksAutomatedDaily: 215,
      responseTime: '0.4s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
