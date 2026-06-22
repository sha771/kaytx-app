import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-loyalty',
    uid: 'ktx-01-vp-loyalty',
    name: 'AI VP Loyalty',
    title: 'AI VP Loyalty',
    description: 'AI VP Loyalty drives department strategy and oversees operations for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Ticket Routing', 'Knowledge Base Management', 'Customer Feedback Analysis', 'Customer Journey Mapping', 'Sentiment Analysis'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '86% efficiency',
    replacesRole: 'AI VP Loyalty',
    subAgents: [
      { id: 'ai-success-plan-coordinator', uid: 'ktx-01-success-plan-coordinator', name: 'AI Success Plan Coordinator', title: 'AI Success Plan Coordinator', route: '/ai-agent/customer-experience/success-plan-coordinator' },
      { id: 'ai-visitor-logger', uid: 'ktx-01-visitor-logger', name: 'AI Visitor Logger', title: 'AI Visitor Logger', route: '/ai-agent/customer-experience/visitor-logger' },
      { id: 'ai-points-calculator', uid: 'ktx-01-points-calculator', name: 'AI Points Calculator', title: 'AI Points Calculator', route: '/ai-agent/customer-experience/points-calculator' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9781',
      tasksAutomatedDaily: 799,
      responseTime: '1.4s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Customer Experience',
      level: 'vp_director',
      departmentId: 1,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
