import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Layout } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'automated-hr-workflow',
    name: 'AI Automated HR Workflow',
    title: 'Automated HR Workflow',
    description: 'Automated HR workflow orchestration with AI',
    capabilities: ["HR Workflow","Automation","Process Orchestration","Task Coordination"],
    icon: Layout,
    color: '#AD1457',
    type: 'employee' as const,
    humanCost: '$90k/year',
    aiCost: '$2.4k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'HR Workflow Manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7.3k',
      tasksAutomatedDaily: 334,
      responseTime: '0.5s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'Human Resources',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
