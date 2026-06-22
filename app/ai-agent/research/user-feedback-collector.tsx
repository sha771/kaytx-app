import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-user-feedback-collector',
    uid: 'ktx-12-user-feedback-collector',
    name: 'AI User Feedback Collector',
    title: 'AI User Feedback Collector',
    description: 'AI User Feedback Collector leads strategic direction and executive decision-making for the Research & Development department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Prototype Development', 'Lab Management', 'Literature Review', 'Experiment Design', 'Innovation Pipeline'],
    color: '#009688',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '77% efficiency',
    replacesRole: 'AI User Feedback Collector',
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11562',
      tasksAutomatedDaily: 598,
      responseTime: '2.3s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Research & Development',
      level: 'c_level',
      departmentId: 12,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
