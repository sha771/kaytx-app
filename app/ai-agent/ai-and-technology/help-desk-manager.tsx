import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-help-desk-manager',
    uid: 'ktx-06-help-desk-manager',
    name: 'AI Help Desk Manager',
    title: 'AI Help Desk Manager',
    description: 'AI Help Desk Manager oversees help desk operations ensuring efficient ticket resolution, high customer satisfaction, and continuous improvement of support processes through effective team leadership and process optimization.',
    capabilities: ['Help Desk Operations', 'Ticket Management', 'Team Leadership', 'Process Improvement', 'Customer Satisfaction'],
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$800/mo',
    efficiency: '91% efficiency',
    replacesRole: 'Help Desk Manager',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4833',
      tasksAutomatedDaily: 224,
      responseTime: '2.0s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Technology & Engineering',
      level: 'manager',
      departmentId: 6,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
