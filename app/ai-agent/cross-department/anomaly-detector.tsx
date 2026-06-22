import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-anomaly-detector',
    uid: 'ktx-00-anomaly-detector',
    name: 'AI Anomaly Detector',
    title: 'AI Anomaly Detector',
    description: 'AI Anomaly Detector leads strategic direction and executive decision-making for the Cross-Department department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Data Sharing', 'Process Orchestration', 'Intelligence Aggregation', 'Governance Oversight', 'Anomaly Detection'],
    color: '#8B5CF6',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Anomaly Detector',
    subAgents: [
      { id: 'ai-data-lineage-tracker', uid: 'ktx-00-data-lineage-tracker', name: 'AI Data Lineage Tracker', title: 'AI Data Lineage Tracker', route: '/ai-agent/cross-department/data-lineage-tracker' }
    ],
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
      department: 'Cross-Department',
      level: 'c_level',
      departmentId: 0,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
