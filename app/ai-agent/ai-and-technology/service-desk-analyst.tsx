import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-service-desk-analyst',
    uid: 'ktx-06-service-desk-analyst',
    name: 'AI Service Desk Analyst',
    title: 'AI Service Desk Analyst',
    description: 'AI Service Desk Analyst provides first-level support to users, handling incoming tickets, resolving common issues, and escalating complex problems while documenting solutions and maintaining service quality.',
    capabilities: ['Ticket Management', 'First-Level Support', 'Issue Triage', 'Documentation', 'Customer Service'],
    color: '#0277BD',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$500/mo',
    efficiency: '93% efficiency',
    replacesRole: 'Service Desk Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3416',
      tasksAutomatedDaily: 182,
      responseTime: '1.8s',
      accuracyRate: '96.1%',
    },
    hierarchy: {
      department: 'Technology & Engineering',
      level: 'specialist',
      departmentId: 6,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
