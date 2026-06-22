import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ShieldAlert } from 'lucide-react-native';

export default function SafetyDirector1Page() {
  const agent = {
    id: 'safety-director-1',
    name: 'AI Safety Director I',
    title: 'AI Safety Director I',
    description: 'AI Safety Director I provides specialized expertise and executes critical tasks for the Manufacturing department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ["Safety Management","Risk Assessment","Incident Prevention","Safety Compliance","Emergency Response","Safety Training"],
    icon: ShieldAlert,
    color: '#5C6BC0',
    type: 'employee' as const,
    humanCost: '$135k/year',
    aiCost: '$4k/year',
    efficiency: '34x efficiency improvement',
    replacesRole: 'safety-director-1',
    infrastructure: {
      status: 'online',
      health: 95 + Math.floor(Math.random() * 5),
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$10,900',
      tasksAutomatedDaily: 580,
      responseTime: '2.6s',
      accuracyRate: '96.8%',
      errorReduction: '92%',
      timeSaved: '82%',
    },
    performance: {
      tasksCompleted: 20500 + Math.floor(Math.random() * 5000),
      avgResponseTime: '2.4s',
      accuracy: '96.2%',
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
