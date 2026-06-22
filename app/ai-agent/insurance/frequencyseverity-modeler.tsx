import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-frequencyseverity-modeler',
    uid: 'ktx-16-frequencyseverity-modeler',
    name: 'AI Frequency/Severity Modeler',
    title: 'AI Frequency/Severity Modeler',
    description: 'AI Frequency/Severity Modeler provides specialized expertise and executes critical tasks for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Premium Calculation', 'Regulatory Compliance', 'Customer Communication', 'Claims Processing', 'Underwriting'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '78% efficiency',
    replacesRole: 'AI Frequency/Severity Modeler',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4581',
      tasksAutomatedDaily: 193,
      responseTime: '0.5s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'specialist',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
