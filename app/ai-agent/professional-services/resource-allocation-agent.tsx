import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-resource-allocation-agent',
    uid: 'ktx-17-resource-allocation-agent',
    name: 'AI Resource Allocation Agent',
    title: 'AI Resource Allocation Agent',
    description: 'AI Resource Allocation Agent leads staffing, skills matching, capacity planning, and utilization optimization for the Professional Services department. This AI agent automates complex resource workflows, provides intelligent staffing insights, and collaborates with other agents to achieve optimal resource allocation with maximum efficiency.',
    capabilities: ['Staffing', 'Skills Matching', 'Capacity Planning', 'Utilization Optimization', 'Workforce Forecasting'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$140k/year',
    aiCost: '$2,800/mo',
    efficiency: '86% efficiency',
    replacesRole: 'AI Resource Allocation Agent',
    subAgents: [
      { id: 'ai-consulting-manager', uid: 'ktx-17-consulting-manager', name: 'AI Consulting Manager', title: 'AI Consulting Manager', route: '/ai-agent/professional-services/consulting-manager' },
      { id: 'ai-project-manager', uid: 'ktx-17-project-manager', name: 'AI Project Manager', title: 'AI Project Manager', route: '/ai-agent/professional-services/project-manager' },
      { id: 'ai-consultant', uid: 'ktx-17-consultant', name: 'AI Consultant', title: 'AI Consultant', route: '/ai-agent/professional-services/consultant' }
    ],
    infrastructure: {
      status: 'online',
      health: 86,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$13533',
      tasksAutomatedDaily: 756,
      responseTime: '2.2s',
      accuracyRate: '94.8%',
    },
    hierarchy: {
      department: 'Professional Services',
      level: 'vp_director',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}