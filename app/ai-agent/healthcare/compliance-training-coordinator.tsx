import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-compliance-training-coordinator',
    uid: 'ktx-17-compliance-training-coordinator',
    name: 'AI Compliance Training Coordinator',
    title: 'AI Compliance Training Coordinator',
    description: 'AI Compliance Training Coordinator leads strategic direction and executive decision-making for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Clinical Decision Support', 'Health Monitoring', 'Treatment Planning', 'Telemedicine', 'Medical Billing'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '93% efficiency',
    replacesRole: 'AI Compliance Training Coordinator',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8658',
      tasksAutomatedDaily: 782,
      responseTime: '0.9s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Healthcare & Medical',
      level: 'c_level',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
