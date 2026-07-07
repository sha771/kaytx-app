import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Layout } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'real-time-workflow-orchestrator',
    name: 'AI Real-Time Workflow Orchestrator',
    title: 'Real-Time Workflow Orchestrator',
    description: 'Real-time workflow orchestration and automation with AI',
    capabilities: ["Workflow Orchestration","Real-Time Automation","Process Management","Task Coordination"],
    icon: Layout,
    color: '#00695C',
    type: 'employee' as const,
    humanCost: '$98k/year',
    aiCost: '$2.6k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Workflow Orchestrator',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7.9k',
      tasksAutomatedDaily: 278,
      responseTime: '0.6s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Operations Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
