import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-negotiator',
    uid: 'ktx-02-negotiator',
    name: 'AI Negotiator',
    title: 'AI Negotiator',
    description: 'AI Negotiator coordinates team activities and ensures quality output for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Revenue Optimization', 'Territory Management', 'Sales Coaching', 'Lead Scoring', 'Pipeline Management'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '86% efficiency',
    replacesRole: 'AI Negotiator',
    subAgents: [
      { id: 'ai-channel-performance-tracker', uid: 'ktx-02-channel-performance-tracker', name: 'AI Channel Performance Tracker', title: 'AI Channel Performance Tracker', route: '/ai-agent/sales/channel-performance-tracker' },
      { id: 'ai-contact-updater', uid: 'ktx-02-contact-updater', name: 'AI Contact Updater', title: 'AI Contact Updater', route: '/ai-agent/sales/contact-updater' },
      { id: 'ai-pipeline-weighter', uid: 'ktx-02-pipeline-weighter', name: 'AI Pipeline Weighter', title: 'AI Pipeline Weighter', route: '/ai-agent/sales/pipeline-weighter' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3157',
      tasksAutomatedDaily: 321,
      responseTime: '1.4s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'team_lead',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
