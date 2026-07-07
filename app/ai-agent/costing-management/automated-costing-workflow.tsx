import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Layout } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'automated-costing-workflow',
    name: 'AI Automated Costing Workflow',
    title: 'Automated Costing Workflow',
    description: 'Automated costing workflow orchestration with AI',
    capabilities: ["Costing Workflow","Automation","Process Orchestration","Task Coordination"],
    icon: Layout,
    color: '#C62828',
    type: 'employee' as const,
    humanCost: '$92k/year',
    aiCost: '$2.4k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Costing Workflow Manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7.5k',
      tasksAutomatedDaily: 323,
      responseTime: '0.5s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Costing Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
