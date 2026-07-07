import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Layout } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'intelligent-support-routing',
    name: 'AI Intelligent Support Routing',
    title: 'Intelligent Support Routing',
    description: 'Intelligent routing and escalation management with AI-powered decision making',
    capabilities: ["Intelligent Routing","Escalation Management","Decision Making","Load Balancing"],
    icon: Layout,
    color: '#1976D2',
    type: 'employee' as const,
    humanCost: '$62k/year',
    aiCost: '$1.6k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Routing Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$5.0k',
      tasksAutomatedDaily: 456,
      responseTime: '0.4s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Customer Support',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
