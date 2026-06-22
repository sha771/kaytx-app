import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-chief-human-resources-officer',
    uid: 'ktx-07-chief-human-resources-officer',
    name: 'AI Chief Human Resources Officer',
    title: 'AI Chief Human Resources Officer',
    description: 'AI Chief Human Resources Officer leads strategic direction and executive decision-making for the Human Resources department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Talent Acquisition', 'Employee Onboarding', 'Performance Reviews', 'Training Programs', 'Compensation Analysis'],
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '79% efficiency',
    replacesRole: 'AI Chief Human Resources Officer',
    subAgents: [
      { id: 'ai-hr-strategy-advisor', uid: 'ktx-07-hr-strategy-advisor', name: 'AI HR Strategy Advisor', title: 'AI HR Strategy Advisor', route: '/ai-agent/human-resources/hr-strategy-advisor' },
      { id: 'ai-training-effectiveness-evaluator', uid: 'ktx-07-training-effectiveness-evaluator', name: 'AI Training Effectiveness Evaluator', title: 'AI Training Effectiveness Evaluator', route: '/ai-agent/human-resources/training-effectiveness-evaluator' },
      { id: 'ai-interview-scheduler', uid: 'ktx-07-interview-scheduler', name: 'AI Interview Scheduler', title: 'AI Interview Scheduler', route: '/ai-agent/human-resources/interview-scheduler' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8384',
      tasksAutomatedDaily: 736,
      responseTime: '0.7s',
      accuracyRate: '95.9%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'c_level',
      departmentId: 7,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
