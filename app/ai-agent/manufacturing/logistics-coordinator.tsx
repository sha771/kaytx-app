import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-logistics-coordinator',
    uid: 'ktx-18-logistics-coordinator',
    name: 'AI Logistics Coordinator',
    title: 'AI Logistics Coordinator',
    description: 'AI Logistics Coordinator leads strategic direction and executive decision-making for the Manufacturing & Production department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Production Planning', 'Quality Control', 'Inventory Management', 'Equipment Maintenance', 'Lean Manufacturing'],
    color: '#5C6BC0',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Logistics Coordinator',
    subAgents: [
      { id: 'ai-defect-categorizer', uid: 'ktx-18-defect-categorizer', name: 'AI Defect Categorizer', title: 'AI Defect Categorizer', route: '/ai-agent/manufacturing/defect-categorizer' },
      { id: 'ai-predictive-maintenance-monitor', uid: 'ktx-18-predictive-maintenance-monitor', name: 'AI Predictive Maintenance Monitor', title: 'AI Predictive Maintenance Monitor', route: '/ai-agent/manufacturing/predictive-maintenance-monitor' },
      { id: 'ai-delivery-optimizer', uid: 'ktx-18-delivery-optimizer', name: 'AI Delivery Optimizer', title: 'AI Delivery Optimizer', route: '/ai-agent/manufacturing/delivery-optimizer' }
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
      department: 'Manufacturing & Production',
      level: 'c_level',
      departmentId: 18,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
