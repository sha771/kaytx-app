import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Layout } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'automated-government-workflow',
    name: 'AI Automated Government Workflow',
    title: 'Automated Government Workflow',
    description: 'Automated government workflow orchestration with AI',
    capabilities: ["Workflow Automation","Government Processes","Process Orchestration","Task Coordination"],
    icon: Layout,
    color: '#1565C0',
    type: 'employee' as const,
    humanCost: '$80k/year',
    aiCost: '$2.1k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Workflow Manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6.5k',
      tasksAutomatedDaily: 389,
      responseTime: '0.4s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Public Sector',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
