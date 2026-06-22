import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Layout } from 'lucide-react-native';

export default function SpacePlannerPage() {
  const agent = {
    id: 'space-planner',
    name: 'AI Space Planner',
    title: 'Facilities Sub-Agent',
    description: 'Handles space allocation, desk assignment, and utilization optimization with automated capacity planning.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Performance Reporting","Quality Assurance","Compliance Monitoring"],
    icon: Layout,
    color: '#8B5CF6',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$1.0k/year',
    efficiency: '15x efficiency improvement',
    replacesRole: 'Space Planner',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,200',
      tasksAutomatedDaily: 75,
      responseTime: '<2s',
      accuracyRate: '94%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
