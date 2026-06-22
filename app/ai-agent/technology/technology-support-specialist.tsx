import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-technology-support-specialist',
    uid: 'ktx-06-technology-support-specialist',
    name: 'AI Technology Support Specialist',
    title: 'AI Technology Support Specialist',
    description: 'AI Technology Support Specialist provides technical support and assistance to users, resolving issues, answering questions, and ensuring smooth technology adoption and usage across the organization.',
    capabilities: ['Technical Support', 'Issue Resolution', 'User Assistance', 'Training Support', 'Documentation'],
    color: '#00838F',
    type: 'agent' as const,
    humanCost: '$55k/year',
    aiCost: '$600/mo',
    efficiency: '92% efficiency',
    replacesRole: 'Technology Support Specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3783',
      tasksAutomatedDaily: 196,
      responseTime: '1.9s',
      accuracyRate: '95.8%',
    },
    hierarchy: {
      department: 'Technology & Engineering',
      level: 'specialist',
      departmentId: 6,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
