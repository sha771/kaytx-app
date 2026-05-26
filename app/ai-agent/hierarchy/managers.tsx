import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'managers',
    name: 'Manager Level',
    title: 'Department & Team Managers',
    description: 'The Manager level represents mid-level leadership responsible for day-to-day team operations. These agents bridge strategic vision with tactical execution, manage individual contributors, and ensure project delivery within their functional areas.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$91k/year',
    aiCost: '$1k/year',
    efficiency: '91x efficiency improvement',
    replacesRole: 'Department & Team Managers',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 651,
      responseTime: '1.0s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Hierarchy',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
