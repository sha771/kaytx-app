import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-chief-production-officer',
    uid: 'ktx-18-chief-production-officer',
    name: 'AI Chief Production Officer',
    title: 'AI Chief Production Officer',
    description: 'AI Chief Production Officer leads strategic direction and executive decision-making for the Manufacturing & Production department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Equipment Maintenance', 'Lean Manufacturing', 'Supply Coordination', 'Safety Compliance', 'Process Engineering'],
    color: '#5C6BC0',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '84% efficiency',
    replacesRole: 'AI Chief Production Officer',
    subAgents: [
      { id: 'ai-production-strategy-advisor', uid: 'ktx-18-production-strategy-advisor', name: 'AI Production Strategy Advisor', title: 'AI Production Strategy Advisor', route: '/ai-agent/manufacturing/production-strategy-advisor' },
      { id: 'ai-supplier-quality-auditor', uid: 'ktx-18-supplier-quality-auditor', name: 'AI Supplier Quality Auditor', title: 'AI Supplier Quality Auditor', route: '/ai-agent/manufacturing/supplier-quality-auditor' },
      { id: 'ai-repair-scheduler', uid: 'ktx-18-repair-scheduler', name: 'AI Repair Scheduler', title: 'AI Repair Scheduler', route: '/ai-agent/manufacturing/repair-scheduler' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11699',
      tasksAutomatedDaily: 621,
      responseTime: '2.4s',
      accuracyRate: '94.7%',
    },
    hierarchy: {
      department: 'Manufacturing & Production',
      level: 'c_level',
      departmentId: 18,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
