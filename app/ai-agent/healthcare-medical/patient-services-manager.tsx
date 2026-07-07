import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-patient-services-manager',
    uid: 'ktx-17-patient-services-manager',
    name: 'AI Patient Services Manager',
    title: 'AI Patient Services Manager',
    description: 'AI Patient Services Manager manages team operations and ensures delivery excellence for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Health Monitoring', 'Treatment Planning', 'Telemedicine', 'Medical Billing', 'Healthcare Compliance'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '84% efficiency',
    replacesRole: 'AI Patient Services Manager',
    subAgents: [
      { id: 'ai-workflow-optimizer', uid: 'ktx-17-workflow-optimizer', name: 'AI Workflow Optimizer', title: 'AI Workflow Optimizer', route: '/ai-agent/healthcare/workflow-optimizer' },
      { id: 'ai-provider-calendar-manager', uid: 'ktx-17-provider-calendar-manager', name: 'AI Provider Calendar Manager', title: 'AI Provider Calendar Manager', route: '/ai-agent/healthcare/provider-calendar-manager' },
      { id: 'ai-release-manager', uid: 'ktx-17-release-manager', name: 'AI Release Manager', title: 'AI Release Manager', route: '/ai-agent/healthcare/release-manager' }
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
      department: 'Healthcare & Medical',
      level: 'manager',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
