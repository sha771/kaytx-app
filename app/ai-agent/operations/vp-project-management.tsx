import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-project-management',
    uid: 'ktx-04-vp-project-management',
    name: 'AI VP Project Management',
    title: 'AI VP Project Management',
    description: 'AI VP Project Management drives department strategy and oversees operations for the Operations & Management department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Process Optimization', 'Resource Allocation', 'Workflow Automation', 'Quality Assurance', 'Project Management'],
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI VP Project Management',
    subAgents: [
      { id: 'ai-capacity-planner', uid: 'ktx-04-capacity-planner', name: 'AI Capacity Planner', title: 'AI Capacity Planner', route: '/ai-agent/operations/capacity-planner' },
      { id: 'ai-daily-operations-coordinator', uid: 'ktx-04-daily-operations-coordinator', name: 'AI Daily Operations Coordinator', title: 'AI Daily Operations Coordinator', route: '/ai-agent/operations/daily-operations-coordinator' },
      { id: 'ai-waste-identifier', uid: 'ktx-04-waste-identifier', name: 'AI Waste Identifier', title: 'AI Waste Identifier', route: '/ai-agent/operations/waste-identifier' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11288',
      tasksAutomatedDaily: 552,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Operations & Management',
      level: 'vp_director',
      departmentId: 4,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
