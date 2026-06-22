import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-sales-operations-manager',
    uid: 'ktx-02-sales-operations-manager',
    name: 'AI Sales Operations Manager',
    title: 'AI Sales Operations Manager',
    description: 'AI Sales Operations Manager manages team operations and ensures delivery excellence for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['CRM Integration', 'Deal Tracking', 'Revenue Optimization', 'Territory Management', 'Sales Coaching'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '84% efficiency',
    replacesRole: 'AI Sales Operations Manager',
    subAgents: [
      { id: 'ai-pricing-optimizer', uid: 'ktx-02-pricing-optimizer', name: 'AI Pricing Optimizer', title: 'AI Pricing Optimizer', route: '/ai-agent/sales/pricing-optimizer' },
      { id: 'ai-discovery-questioner', uid: 'ktx-02-discovery-questioner', name: 'AI Discovery Questioner', title: 'AI Discovery Questioner', route: '/ai-agent/sales/discovery-questioner' },
      { id: 'ai-batna-calculator', uid: 'ktx-02-batna-calculator', name: 'AI BATNA Calculator', title: 'AI BATNA Calculator', route: '/ai-agent/sales/batna-calculator' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4403',
      tasksAutomatedDaily: 159,
      responseTime: '2.4s',
      accuracyRate: '94.7%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'manager',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
