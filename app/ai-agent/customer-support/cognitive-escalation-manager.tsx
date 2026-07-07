import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ArrowRight } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cognitive-escalation-manager',
    name: 'AI Cognitive Escalation Manager',
    title: 'Cognitive Escalation Manager',
    description: 'Intelligent escalation and priority management with cognitive AI',
    capabilities: ["Escalation Management","Priority Handling","SLA Monitoring","Decision Support"],
    icon: ArrowRight,
    color: '#1976D2',
    type: 'employee' as const,
    humanCost: '$68k/year',
    aiCost: '$1.7k/year',
    efficiency: '39x efficiency improvement',
    replacesRole: 'Escalation Manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$5.5k',
      tasksAutomatedDaily: 389,
      responseTime: '0.4s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'Customer Support',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
