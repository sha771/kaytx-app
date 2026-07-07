import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Layout } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'automated-tax-workflow',
    name: 'AI Automated Tax Workflow',
    title: 'Automated Tax Workflow',
    description: 'End-to-end tax workflow automation with intelligent orchestration',
    capabilities: ["Workflow Automation","Process Orchestration","Task Coordination","End-to-End Automation"],
    icon: Layout,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$88k/year',
    aiCost: '$2.3k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Workflow Manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7.1k',
      tasksAutomatedDaily: 345,
      responseTime: '0.5s',
      accuracyRate: '97.6%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
