import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-ticket-resolution-agent',
    uid: 'ktx-01-ticket-resolution-agent',
    name: 'AI Ticket Resolution Agent',
    title: 'AI Ticket Resolution Agent',
    description: 'AI Ticket Resolution Agent coordinates team activities and ensures quality output for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Multi-channel Support', 'Churn Prediction', 'Loyalty Programs', 'Ticket Routing', 'Knowledge Base Management'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '77% efficiency',
    replacesRole: 'AI Ticket Resolution Agent',
    subAgents: [
      { id: 'ai-support-quality-auditor', uid: 'ktx-01-support-quality-auditor', name: 'AI Support Quality Auditor', title: 'AI Support Quality Auditor', route: '/ai-agent/customer-experience/support-quality-auditor' },
      { id: 'ai-troubleshooting-guide', uid: 'ktx-01-troubleshooting-guide', name: 'AI Troubleshooting Guide', title: 'AI Troubleshooting Guide', route: '/ai-agent/customer-experience/troubleshooting-guide' },
      { id: 'ai-survey-designer', uid: 'ktx-01-survey-designer', name: 'AI Survey Designer', title: 'AI Survey Designer', route: '/ai-agent/customer-experience/survey-designer' }
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
