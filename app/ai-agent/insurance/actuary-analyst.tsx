import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-actuary-analyst',
    uid: 'ktx-16-actuary-analyst',
    name: 'AI Actuary Analyst',
    title: 'AI Actuary Analyst',
    description: 'AI Actuary Analyst coordinates team activities and ensures quality output for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Policy Management', 'Risk Assessment', 'Fraud Detection', 'Premium Calculation', 'Regulatory Compliance'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI Actuary Analyst',
    subAgents: [
      { id: 'ai-assessment-standards-enforcer', uid: 'ktx-16-assessment-standards-enforcer', name: 'AI Assessment Standards Enforcer', title: 'AI Assessment Standards Enforcer', route: '/ai-agent/insurance/assessment-standards-enforcer' },
      { id: 'ai-settlement-negotiator', uid: 'ktx-16-settlement-negotiator', name: 'AI Settlement Negotiator', title: 'AI Settlement Negotiator', route: '/ai-agent/insurance/settlement-negotiator' },
      { id: 'ai-event-simulator', uid: 'ktx-16-event-simulator', name: 'AI Event Simulator', title: 'AI Event Simulator', route: '/ai-agent/insurance/event-simulator' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3602',
      tasksAutomatedDaily: 406,
      responseTime: '1.8s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'team_lead',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
