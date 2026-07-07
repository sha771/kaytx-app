import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function SafetyOfficerPage() {
  const agent = {
    id: 'safety-officer',
    name: 'AI Safety Officer',
    title: 'AI Safety Officer',
    description: 'AI Safety Officer provides specialized expertise and executes critical tasks for the Research & Development department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ["Research & Development","Innovation Management","Prototype Development","Patent Research","Technology Scouting","Market Research","User Research","Competitive Analysis"],
    icon: Bot,
    color: '#6366F1',
    type: 'employee' as const,
    humanCost: '$80k/year',
    aiCost: '$2k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'safety-officer',
    infrastructure: {
      status: 'online',
      health: 95 + Math.floor(Math.random() * 5),
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6,500',
      tasksAutomatedDaily: 450,
      responseTime: '2.5s',
      accuracyRate: '95.5%',
      errorReduction: '85%',
      timeSaved: '75%',
    },
    performance: {
      tasksCompleted: 15000 + Math.floor(Math.random() * 5000),
      avgResponseTime: '2.3s',
      accuracy: '94.8%',
      uptime: '99.7%',
      userSatisfaction: '4.6/5',
    },
    features: {
      taskAutomation: true,
      dataProcessing: true,
      workflowManagement: true,
      reporting: true,
      integration: true,
      collaboration: true,
      learning: true,
      security: true,
    },
    integrations: [
      'Department Systems',
      'Enterprise CRM',
      'Analytics Platform',
      'Communication Tools',
    ],
    kpis: [
      'Tasks Completed',
      'Response Time',
      'Accuracy Rate',
      'User Satisfaction',
      'Cost Savings',
      'Efficiency Gain',
    ],
  };

  return <AgentPageWrapper agent={agent} />;
}