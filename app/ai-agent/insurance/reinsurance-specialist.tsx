import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-reinsurance-specialist',
    uid: 'ktx-16-reinsurance-specialist',
    name: 'AI Reinsurance Specialist',
    title: 'AI Reinsurance Specialist',
    description: 'AI Reinsurance Specialist coordinates team activities and ensures quality output for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Underwriting', 'Policy Management', 'Risk Assessment', 'Fraud Detection', 'Premium Calculation'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '90% efficiency',
    replacesRole: 'AI Reinsurance Specialist',
    subAgents: [
      { id: 'ai-claims-assigner', uid: 'ktx-16-claims-assigner', name: 'AI Claims Assigner', title: 'AI Claims Assigner', route: '/ai-agent/insurance/claims-assigner' },
      { id: 'ai-frequencyseverity-modeler', uid: 'ktx-16-frequencyseverity-modeler', name: 'AI Frequency/Severity Modeler', title: 'AI Frequency/Severity Modeler', route: '/ai-agent/insurance/frequencyseverity-modeler' },
      { id: 'ai-recoveries-tracker', uid: 'ktx-16-recoveries-tracker', name: 'AI Recoveries Tracker', title: 'AI Recoveries Tracker', route: '/ai-agent/insurance/recoveries-tracker' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4225',
      tasksAutomatedDaily: 125,
      responseTime: '2.3s',
      accuracyRate: '94.3%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'team_lead',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
