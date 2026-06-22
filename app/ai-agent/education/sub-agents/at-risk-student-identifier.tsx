import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { AlertCircle } from 'lucide-react-native';

export default function AtRiskStudentIdentifierPage() {
  const agent = {
    id: 'at-risk-student-identifier',
    name: 'AI At-Risk Student Identifier',
    title: 'Education Agent',
    description: 'Automated At-Risk Student Identifier agent specializing in early warning systems with advanced AI capabilities for risk prediction, intervention triggering, and progress monitoring.',
    capabilities: ["Risk Prediction","Intervention Triggering","Progress Monitoring","Early Warning","Risk Factor Analysis","Success Probability"],
    icon: AlertCircle,
    color: '#EF4444',
    type: 'agent' as const,
    humanCost: '$49k/year',
    aiCost: '$1.0k/year',
    efficiency: '13x efficiency improvement',
    replacesRole: 'At-Risk Specialist',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,200',
      tasksAutomatedDaily: 75,
      responseTime: '<1s',
      accuracyRate: '95%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}