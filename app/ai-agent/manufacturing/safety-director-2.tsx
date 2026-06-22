import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ShieldAlert } from 'lucide-react-native';

export default function SafetyDirector2Page() {
  const agent = {
    id: 'safety-director-2',
    name: 'AI Safety Director II',
    title: 'AI Safety Director II',
    description: 'AI Safety Director II provides specialized expertise and executes critical tasks for the Manufacturing department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ["Safety Management","Risk Assessment","Incident Prevention","Safety Compliance","Emergency Response","Safety Training"],
    icon: ShieldAlert,
    color: '#5C6BC0',
    type: 'employee' as const,
    humanCost: '$138k/year',
    aiCost: '$4k/year',
    efficiency: '35x efficiency improvement',
    replacesRole: 'safety-director-2',
    infrastructure: {
      status: 'online',
      health: 95 + Math.floor(Math.random() * 5),
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11,200',
      tasksAutomatedDaily: 590,
      responseTime: '2.5s',
      accuracyRate: '96.9%',
      errorReduction: '93%',
      timeSaved: '83%',
    },
    performance: {
      tasksCompleted: 21000 + Math.floor(Math.random() * 5000),
      avgResponseTime: '2.3s',
      accuracy: '96.3%',
      uptime: '99.8%',
      userSatisfaction: '4.8/5',
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
      'Safety Systems',
      'Risk Platforms',
      'Incident Systems',
      'Training Platforms',
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
