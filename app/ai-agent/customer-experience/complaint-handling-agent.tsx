import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-complaint-handling-agent',
    uid: 'ktx-01-complaint-handling-agent',
    name: 'AI Complaint Handling Agent',
    title: 'AI Complaint Handling Agent',
    description: 'AI Complaint Handling Agent coordinates team activities and ensures quality output for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Churn Prediction', 'Loyalty Programs', 'Ticket Routing', 'Knowledge Base Management', 'Customer Feedback Analysis'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '84% efficiency',
    replacesRole: 'AI Complaint Handling Agent',
    subAgents: [
      { id: 'ai-ux-feedback-analyst', uid: 'ktx-01-ux-feedback-analyst', name: 'AI UX Feedback Analyst', title: 'AI UX Feedback Analyst', route: '/ai-agent/customer-experience/ux-feedback-analyst' },
      { id: 'ai-live-chat-handler', uid: 'ktx-01-live-chat-handler', name: 'AI Live Chat Handler', title: 'AI Live Chat Handler', route: '/ai-agent/customer-experience/live-chat-handler' },
      { id: 'ai-response-analyzer', uid: 'ktx-01-response-analyzer', name: 'AI Response Analyzer', title: 'AI Response Analyzer', route: '/ai-agent/customer-experience/response-analyzer' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4403',
      tasksAutomatedDaily: 159,
      responseTime: '2.4s',
      accuracyRate: '94.7%',
    },
    hierarchy: {
      department: 'Customer Experience',
      level: 'team_lead',
      departmentId: 1,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
