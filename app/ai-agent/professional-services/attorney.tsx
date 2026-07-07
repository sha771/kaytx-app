import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-attorney',
    uid: 'ktx-17-attorney',
    name: 'AI Attorney',
    title: 'AI Attorney',
    description: 'AI Attorney provides legal services, contract review, and compliance management for the Professional Services department. This AI agent automates complex legal workflows, provides intelligent legal insights, and collaborates with other agents to achieve optimal legal outcomes with maximum efficiency.',
    capabilities: ['Contract Review', 'Legal Research', 'Compliance Management', 'Risk Assessment', 'Document Drafting'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$180k/year',
    aiCost: '$3,600/mo',
    efficiency: '90% efficiency',
    replacesRole: 'AI Attorney',
    subAgents: [
      { id: 'ai-paralegal', uid: 'ktx-17-paralegal', name: 'AI Paralegal', title: 'AI Paralegal', route: '/ai-agent/professional-services/paralegal' },
      { id: 'ai-legal-researcher', uid: 'ktx-17-legal-researcher', name: 'AI Legal Researcher', title: 'AI Legal Researcher', route: '/ai-agent/professional-services/legal-researcher' }
    ],
    infrastructure: {
      status: 'online',
      health: 90,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$17325',
      tasksAutomatedDaily: 812,
      responseTime: '2.0s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Professional Services',
      level: 'manager',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}