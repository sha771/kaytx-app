import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-anomaly-detector',
    uid: 'ktx-08-anomaly-detector',
    name: 'AI AI Anomaly Detector',
    title: 'AI Anomaly Detector',
    description: 'AI AI Anomaly Detector leads strategic direction and executive decision-making for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Legal Research', 'IP Protection', 'Dispute Resolution', 'Policy Development', 'Audit Management'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Anomaly Detector',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10603',
      tasksAutomatedDaily: 937,
      responseTime: '1.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Legal & Compliance',
      level: 'c_level',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
