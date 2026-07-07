import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Layout } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'automated-research-workflow',
    name: 'AI Automated Research Workflow',
    title: 'Automated Research Workflow',
    description: 'Automated research workflow orchestration with AI',
    capabilities: ["Research Workflow","Automation","Process Orchestration","Task Coordination"],
    icon: Layout,
    color: '#7B1FA2',
    type: 'employee' as const,
    humanCost: '$84k/year',
    aiCost: '$2.2k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Research Workflow Manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6.8k',
      tasksAutomatedDaily: 367,
      responseTime: '0.4s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Research Development',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
