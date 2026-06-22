import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-change-management-specialist',
    uid: 'ktx-22-ai-change-management-specialist',
    name: 'AI Change Management Specialist',
    title: 'AI Change Management Specialist',
    description: 'AI Change Management Specialist manages changes to AI systems and governance frameworks. This AI agent evaluates change requests, assesses change impact, and ensures controlled change implementation.',
    capabilities: ['Change Evaluation', 'Impact Assessment', 'Implementation Control', 'Change Documentation', 'Rollback Planning'],
    color: '#6366F1',
    type: 'agent' as const,
    humanCost: '$80k/year',
    aiCost: '$1,200/mo',
    efficiency: '92% efficiency',
    replacesRole: 'AI Change Management Specialist',
    subAgents: [
      { id: 'ai-governance-operations', uid: 'ktx-22-governance-operations', name: 'AI Governance Operations', title: 'AI Governance Operations', route: '/ai-agent/ai-governance/governance-operations' },
      { id: 'ai-deployment-governance', uid: 'ktx-22-deployment-governance', name: 'AI Deployment Governance', title: 'AI Deployment Governance', route: '/ai-agent/ai-governance/deployment-governance' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4666',
      tasksAutomatedDaily: 278,
      responseTime: '1.8s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'AI Management & Governance',
      level: 'manager',
      departmentId: 22,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
