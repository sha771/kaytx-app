import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-it-service-manager',
    uid: 'ktx-06-it-service-manager',
    name: 'AI IT Service Manager',
    title: 'AI IT Service Manager',
    description: 'AI IT Service Manager oversees IT service delivery ensuring quality, efficiency, and alignment with business needs through ITIL best practices, service level management, and continuous service improvement.',
    capabilities: ['Service Delivery', 'SLA Management', 'ITIL Processes', 'Service Improvement', 'Quality Assurance'],
    color: '#0277BD',
    type: 'agent' as const,
    humanCost: '$100k/year',
    aiCost: '$1,300/mo',
    efficiency: '91% efficiency',
    replacesRole: 'IT Service Manager',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6983',
      tasksAutomatedDaily: 272,
      responseTime: '2.0s',
      accuracyRate: '95.7%',
    },
    hierarchy: {
      department: 'Technology & Engineering',
      level: 'manager',
      departmentId: 6,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
