import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-chief-professional-services-officer',
    uid: 'ktx-17-chief-professional-services-officer',
    name: 'AI Chief Professional Services Officer',
    title: 'AI Chief Professional Services Officer',
    description: 'AI Chief Professional Services Officer leads strategic direction and executive decision-making for the Professional Services department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Strategic Planning', 'Client Relations', 'Delivery Excellence', 'Resource Optimization', 'Revenue Growth'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$250k/year',
    aiCost: '$5,000/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Chief Professional Services Officer',
    subAgents: [
      { id: 'ai-project-delivery-agent', uid: 'ktx-17-project-delivery-agent', name: 'AI Project Delivery Agent', title: 'AI Project Delivery Agent', route: '/ai-agent/professional-services/project-delivery-agent' },
      { id: 'ai-proposal-sow-agent', uid: 'ktx-17-proposal-sow-agent', name: 'AI Proposal & SOW Agent', title: 'AI Proposal & SOW Agent', route: '/ai-agent/professional-services/proposal-sow-agent' },
      { id: 'ai-client-success-agent', uid: 'ktx-17-client-success-agent', name: 'AI Client Success Agent', title: 'AI Client Success Agent', route: '/ai-agent/professional-services/client-success-agent' },
      { id: 'ai-resource-allocation-agent', uid: 'ktx-17-resource-allocation-agent', name: 'AI Resource Allocation Agent', title: 'AI Resource Allocation Agent', route: '/ai-agent/professional-services/resource-allocation-agent' },
      { id: 'ai-risk-management-agent', uid: 'ktx-17-risk-management-agent', name: 'AI Risk Management Agent', title: 'AI Risk Management Agent', route: '/ai-agent/professional-services/risk-management-agent' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'very_high',
    },
    roiMetrics: {
      savingsPerMonth: '$24083',
      tasksAutomatedDaily: 1245,
      responseTime: '1.5s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Professional Services',
      level: 'c_level',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}