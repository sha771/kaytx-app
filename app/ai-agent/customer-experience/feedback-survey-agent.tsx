import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-feedback-survey-agent',
    uid: 'ktx-01-feedback-survey-agent',
    name: 'AI Feedback & Survey Agent',
    title: 'AI Feedback & Survey Agent',
    description: 'AI Feedback & Survey Agent coordinates team activities and ensures quality output for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Multi-channel Support', 'Churn Prediction', 'Loyalty Programs', 'Ticket Routing', 'Knowledge Base Management'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '77% efficiency',
    replacesRole: 'AI Feedback & Survey Agent',
    subAgents: [
      { id: 'ai-churn-predictor', uid: 'ktx-01-churn-predictor', name: 'AI Churn Predictor', title: 'AI Churn Predictor', route: '/ai-agent/customer-experience/churn-predictor' },
      { id: 'ai-escalation-router', uid: 'ktx-01-escalation-router', name: 'AI Escalation Router', title: 'AI Escalation Router', route: '/ai-agent/customer-experience/escalation-router' },
      { id: 'ai-invoice-explainer', uid: 'ktx-01-invoice-explainer', name: 'AI Invoice Explainer', title: 'AI Invoice Explainer', route: '/ai-agent/customer-experience/invoice-explainer' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4314',
      tasksAutomatedDaily: 142,
      responseTime: '2.3s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Customer Experience',
      level: 'team_lead',
      departmentId: 1,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
