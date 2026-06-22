import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-governance-budget-manager',
    uid: 'ktx-22-ai-governance-budget-manager',
    name: 'AI Governance Budget Manager',
    title: 'AI Governance Budget Manager',
    description: 'AI Governance Budget Manager manages budget planning and tracking for governance initiatives. This AI agent develops budget proposals, tracks expenditures, and ensures efficient resource allocation.',
    capabilities: ['Budget Planning', 'Expenditure Tracking', 'Resource Allocation', 'Cost Optimization', 'Financial Reporting'],
    color: '#059669',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1,300/mo',
    efficiency: '93% efficiency',
    replacesRole: 'AI Governance Budget Manager',
    subAgents: [
      { id: 'ai-governance-program-manager', uid: 'ktx-22-governance-program-manager', name: 'AI Governance Program Manager', title: 'AI Governance Program Manager', route: '/ai-agent/ai-governance/governance-program-manager' }
    ],
    infrastructure: {
      status: 'online',
      health: 93,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4916',
      tasksAutomatedDaily: 278,
      responseTime: '1.7s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'AI Management & Governance',
      level: 'manager',
      departmentId: 22,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
