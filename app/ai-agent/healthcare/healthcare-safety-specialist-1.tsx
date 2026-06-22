import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function HealthcareSafetySpecialist1Page() {
  const agent = {
    id: 'healthcare-safety-specialist-1',
    name: 'AI Healthcare Safety Specialist I',
    title: 'AI Healthcare Safety Specialist I',
    description: 'AI Healthcare Safety Specialist I provides specialized expertise and executes critical tasks for the Healthcare department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ["Safety Management","Risk Assessment","Incident Prevention","Safety Compliance","Emergency Response","Safety Training"],
    icon: Shield,
    color: '#EC407A',
    type: 'employee' as const,
    humanCost: '$95k/year',
    aiCost: '$3k/year',
    efficiency: '32x efficiency improvement',
    replacesRole: 'healthcare-safety-specialist-1',
    infrastructure: {
      status: 'online',
      health: 95 + Math.floor(Math.random() * 5),
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7,700',
      tasksAutomatedDaily: 520,
      responseTime: '2.7s',
      accuracyRate: '96.4%',
      errorReduction: '89%',
      timeSaved: '80%',
    },
    performance: {
      tasksCompleted: 18500 + Math.floor(Math.random() * 5000),
      avgResponseTime: '2.5s',
      accuracy: '95.8%',
      uptime: '99.8%',
      userSatisfaction: '4.7/5',
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
