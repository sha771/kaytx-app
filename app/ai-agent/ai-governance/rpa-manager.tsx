import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-rpa-manager',
    uid: 'ktx-22-rpa-manager',
    name: 'AI RPA Manager',
    title: 'AI RPA Manager',
    description: 'AI RPA Manager manages team operations and ensures delivery excellence for the AI Management & Governance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Agent Orchestration', 'AI Risk Management', 'AI Governance', 'Model Monitoring', 'Ethics Compliance'],
    color: '#6366F1',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '93% efficiency',
    replacesRole: 'AI RPA Manager',
    subAgents: [
      { id: 'ai-tool-selector', uid: 'ktx-22-tool-selector', name: 'AI Tool Selector', title: 'AI Tool Selector', route: '/ai-agent/ai-governance/tool-selector' },
      { id: 'ai-exception-handler', uid: 'ktx-22-exception-handler', name: 'AI Exception Handler', title: 'AI Exception Handler', route: '/ai-agent/ai-governance/exception-handler' },
      { id: 'ai-integration-builder', uid: 'ktx-22-integration-builder', name: 'AI Integration Builder', title: 'AI Integration Builder', route: '/ai-agent/ai-governance/integration-builder' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3246',
      tasksAutomatedDaily: 338,
      responseTime: '1.5s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'AI Management & Governance',
      level: 'manager',
      departmentId: 22,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
