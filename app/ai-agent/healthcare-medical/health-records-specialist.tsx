import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-health-records-specialist',
    uid: 'ktx-17-health-records-specialist',
    name: 'AI Health Records Specialist',
    title: 'AI Health Records Specialist',
    description: 'AI Health Records Specialist coordinates team activities and ensures quality output for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Treatment Planning', 'Telemedicine', 'Medical Billing', 'Healthcare Compliance', 'Patient Care Coordination'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '91% efficiency',
    replacesRole: 'AI Health Records Specialist',
    subAgents: [
      { id: 'ai-service-navigator', uid: 'ktx-17-service-navigator', name: 'AI Service Navigator', title: 'AI Service Navigator', route: '/ai-agent/healthcare/service-navigator' },
      { id: 'ai-charge-capture-agent', uid: 'ktx-17-charge-capture-agent', name: 'AI Charge Capture Agent', title: 'AI Charge Capture Agent', route: '/ai-agent/healthcare/charge-capture-agent' },
      { id: 'ai-compliance-training-coordinator', uid: 'ktx-17-compliance-training-coordinator', name: 'AI Compliance Training Coordinator', title: 'AI Compliance Training Coordinator', route: '/ai-agent/healthcare/compliance-training-coordinator' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4492',
      tasksAutomatedDaily: 176,
      responseTime: '2.5s',
      accuracyRate: '94.9%',
    },
    hierarchy: {
      department: 'Healthcare & Medical',
      level: 'team_lead',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
