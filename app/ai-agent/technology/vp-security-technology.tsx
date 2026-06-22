import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-security-technology',
    uid: 'ktx-06-vp-security-technology',
    name: 'AI VP Security Technology',
    title: 'AI VP Security Technology',
    description: 'AI VP Security Technology drives department strategy and oversees operations for the Technology & Engineering department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['System Architecture', 'DevOps Automation', 'Performance Optimization', 'Security Scanning', 'API Management'],
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '90% efficiency',
    replacesRole: 'AI VP Security Technology',
    subAgents: [
      { id: 'ai-engineering-metrics-tracker', uid: 'ktx-06-engineering-metrics-tracker', name: 'AI Engineering Metrics Tracker', title: 'AI Engineering Metrics Tracker', route: '/ai-agent/technology/engineering-metrics-tracker' },
      { id: 'ai-incident-commander', uid: 'ktx-06-incident-commander', name: 'AI Incident Commander', title: 'AI Incident Commander', route: '/ai-agent/technology/incident-commander' },
      { id: 'ai-alert-tuner', uid: 'ktx-06-alert-tuner', name: 'AI Alert Tuner', title: 'AI Alert Tuner', route: '/ai-agent/technology/alert-tuner' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11425',
      tasksAutomatedDaily: 575,
      responseTime: '2.3s',
      accuracyRate: '94.3%',
    },
    hierarchy: {
      department: 'Technology & Engineering',
      level: 'vp_director',
      departmentId: 6,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
