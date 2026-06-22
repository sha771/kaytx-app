import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-change-management-specialist',
    uid: 'ktx-06-change-management-specialist',
    name: 'AI Change Management Specialist',
    title: 'AI Change Management Specialist',
    description: 'AI Change Management Specialist oversees change management processes, ensuring all changes to IT systems are properly planned, tested, approved, and documented to minimize risks and maintain system stability.',
    capabilities: ['Change Management', 'Risk Assessment', 'Change Approval', 'Impact Analysis', 'Change Documentation'],
    color: '#0097A7',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$900/mo',
    efficiency: '91% efficiency',
    replacesRole: 'Change Management Specialist',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5250',
      tasksAutomatedDaily: 218,
      responseTime: '2.0s',
      accuracyRate: '95.4%',
    },
    hierarchy: {
      department: 'Technology & Engineering',
      level: 'specialist',
      departmentId: 6,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
