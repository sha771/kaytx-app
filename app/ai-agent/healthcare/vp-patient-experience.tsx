import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-patient-experience',
    uid: 'ktx-17-vp-patient-experience',
    name: 'AI VP Patient Experience',
    title: 'AI VP Patient Experience',
    description: 'AI VP Patient Experience drives department strategy and oversees operations for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Patient Care Coordination', 'Medical Records Management', 'Clinical Decision Support', 'Health Monitoring', 'Treatment Planning'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI VP Patient Experience',
    subAgents: [
      { id: 'ai-medical-policy-reviewer', uid: 'ktx-17-medical-policy-reviewer', name: 'AI Medical Policy Reviewer', title: 'AI Medical Policy Reviewer', route: '/ai-agent/healthcare/medical-policy-reviewer' },
      { id: 'ai-no-show-predictor', uid: 'ktx-17-no-show-predictor', name: 'AI No-show Predictor', title: 'AI No-show Predictor', route: '/ai-agent/healthcare/no-show-predictor' },
      { id: 'ai-record-organizer', uid: 'ktx-17-record-organizer', name: 'AI Record Organizer', title: 'AI Record Organizer', route: '/ai-agent/healthcare/record-organizer' }
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
      department: 'Healthcare & Medical',
      level: 'vp_director',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
