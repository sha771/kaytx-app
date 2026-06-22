import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-care-transition-coordinator',
    uid: 'ktx-17-care-transition-coordinator',
    name: 'AI Care Transition Coordinator',
    title: 'AI Care Transition Coordinator',
    description: 'AI Care Transition Coordinator leads strategic direction and executive decision-making for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Medical Billing', 'Healthcare Compliance', 'Patient Care Coordination', 'Medical Records Management', 'Clinical Decision Support'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '85% efficiency',
    replacesRole: 'AI Care Transition Coordinator',
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8110',
      tasksAutomatedDaily: 690,
      responseTime: '0.6s',
      accuracyRate: '95.4%',
    },
    hierarchy: {
      department: 'Healthcare & Medical',
      level: 'c_level',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
