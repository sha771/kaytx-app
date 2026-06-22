import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-bias-detector',
    uid: 'ktx-00-bias-detector',
    name: 'AI Bias Detector',
    title: 'AI Bias Detector',
    description: 'AI Bias Detector leads strategic direction and executive decision-making for the Cross-Department department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Cross-department Coordination', 'Enterprise Analytics', 'System Integration', 'Data Sharing', 'Process Orchestration'],
    color: '#8B5CF6',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI Bias Detector',
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10192',
      tasksAutomatedDaily: 868,
      responseTime: '1.6s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Cross-Department',
      level: 'c_level',
      departmentId: 0,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
