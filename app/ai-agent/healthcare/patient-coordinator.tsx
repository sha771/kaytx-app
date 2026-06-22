import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-patient-coordinator',
    uid: 'ktx-17-patient-coordinator',
    name: 'AI Patient Coordinator',
    title: 'AI Patient Coordinator',
    description: 'AI Patient Coordinator leads strategic direction and executive decision-making for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Medical Billing', 'Healthcare Compliance', 'Patient Care Coordination', 'Medical Records Management', 'Clinical Decision Support'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '89% efficiency',
    replacesRole: 'AI Patient Coordinator',
    subAgents: [
      { id: 'ai-satisfaction-analyzer', uid: 'ktx-17-satisfaction-analyzer', name: 'AI Satisfaction Analyzer', title: 'AI Satisfaction Analyzer', route: '/ai-agent/healthcare/satisfaction-analyzer' },
      { id: 'ai-care-transition-coordinator', uid: 'ktx-17-care-transition-coordinator', name: 'AI Care Transition Coordinator', title: 'AI Care Transition Coordinator', route: '/ai-agent/healthcare/care-transition-coordinator' },
      { id: 'ai-tech-troubleshooter', uid: 'ktx-17-tech-troubleshooter', name: 'AI Tech Troubleshooter', title: 'AI Tech Troubleshooter', route: '/ai-agent/healthcare/tech-troubleshooter' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11014',
      tasksAutomatedDaily: 506,
      responseTime: '2.0s',
      accuracyRate: '99.1%',
    },
    hierarchy: {
      department: 'Healthcare & Medical',
      level: 'c_level',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
