import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Package } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cognitive-supply-orchestrator',
    name: 'AI Cognitive Supply Orchestrator',
    title: 'Cognitive Supply Orchestrator',
    description: 'Cognitive supply chain orchestration and management with AI',
    capabilities: ["Supply Chain Orchestration","Cognitive Management","Logistics Coordination","Supply Optimization"],
    icon: Package,
    color: '#00695C',
    type: 'employee' as const,
    humanCost: '$120k/year',
    aiCost: '$3.2k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Supply Chain Director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9.7k',
      tasksAutomatedDaily: 189,
      responseTime: '0.9s',
      accuracyRate: '96.4%',
    },
    hierarchy: {
      department: 'Operations Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
