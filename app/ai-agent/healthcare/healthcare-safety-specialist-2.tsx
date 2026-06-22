import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function HealthcareSafetySpecialist2Page() {
  const agent = {
    id: 'healthcare-safety-specialist-2',
    name: 'AI Healthcare Safety Specialist II',
    title: 'AI Healthcare Safety Specialist II',
    description: 'AI Healthcare Safety Specialist II provides specialized expertise and executes critical tasks for the Healthcare department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ["Safety Management","Risk Assessment","Incident Prevention","Safety Compliance","Emergency Response","Safety Training"],
    icon: Shield,
    color: '#EC407A',
    type: 'employee' as const,
    humanCost: '$98k/year',
    aiCost: '$3k/year',
    efficiency: '33x efficiency improvement',
    replacesRole: 'healthcare-safety-specialist-2',
    infrastructure: {
      status: 'online',
      health: 95 + Math.floor(Math.random() * 5),
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7,900',
      tasksAutomatedDaily: 530,
      responseTime: '2.6s',
      accuracyRate: '96.5%',
      errorReduction: '90%',
      timeSaved: '81%',
    },
    performance: {
      tasksCompleted: 19000 + Math.floor(Math.random() * 5000),
      avgResponseTime: '2.4s',
      accuracy: '95.9%',
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
