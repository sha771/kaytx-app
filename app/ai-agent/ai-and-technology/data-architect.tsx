import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-data-architect',
    uid: 'ktx-06-data-architect',
    name: 'AI Data Architect',
    title: 'AI Data Architect',
    description: 'AI Data Architect designs and governs data architecture solutions, ensuring data quality, integrity, accessibility, and security while enabling effective data management and analytics across the organization.',
    capabilities: ['Data Modeling', 'Data Governance', 'Database Design', 'Data Integration', 'Data Strategy'],
    color: '#00695C',
    type: 'agent' as const,
    humanCost: '$125k/year',
    aiCost: '$1,500/mo',
    efficiency: '89% efficiency',
    replacesRole: 'Data Architect',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8666',
      tasksAutomatedDaily: 306,
      responseTime: '2.2s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Technology & Engineering',
      level: 'manager',
      departmentId: 6,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
