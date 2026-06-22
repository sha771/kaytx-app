import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-risk-modeler',
    uid: 'ktx-16-risk-modeler',
    name: 'AI Risk Modeler',
    title: 'AI Risk Modeler',
    description: 'AI Risk Modeler coordinates team activities and ensures quality output for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Customer Communication', 'Claims Processing', 'Underwriting', 'Policy Management', 'Risk Assessment'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '80% efficiency',
    replacesRole: 'AI Risk Modeler',
    subAgents: [
      { id: 'ai-emerging-risk-spotter', uid: 'ktx-16-emerging-risk-spotter', name: 'AI Emerging Risk Spotter', title: 'AI Emerging Risk Spotter', route: '/ai-agent/insurance/emerging-risk-spotter' },
      { id: 'ai-pattern-detector', uid: 'ktx-16-pattern-detector', name: 'AI Pattern Detector', title: 'AI Pattern Detector', route: '/ai-agent/insurance/pattern-detector' },
      { id: 'ai-exposure-aggregator', uid: 'ktx-16-exposure-aggregator', name: 'AI Exposure Aggregator', title: 'AI Exposure Aggregator', route: '/ai-agent/insurance/exposure-aggregator' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3335',
      tasksAutomatedDaily: 355,
      responseTime: '1.6s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'team_lead',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
