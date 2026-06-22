import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-lead-development-rep-sdr',
    uid: 'ktx-02-lead-development-rep-sdr',
    name: 'AI Lead Development Rep (SDR)',
    title: 'AI Lead Development Rep (SDR)',
    description: 'AI Lead Development Rep (SDR) manages team operations and ensures delivery excellence for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Revenue Optimization', 'Territory Management', 'Sales Coaching', 'Lead Scoring', 'Pipeline Management'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '78% efficiency',
    replacesRole: 'AI Lead Development Rep (SDR)',
    subAgents: [
      { id: 'ai-forecast-validator', uid: 'ktx-02-forecast-validator', name: 'AI Forecast Validator', title: 'AI Forecast Validator', route: '/ai-agent/sales/forecast-validator' },
      { id: 'ai-demo-coordinator', uid: 'ktx-02-demo-coordinator', name: 'AI Demo Coordinator', title: 'AI Demo Coordinator', route: '/ai-agent/sales/demo-coordinator' },
      { id: 'ai-competitor-price-tracker', uid: 'ktx-02-competitor-price-tracker', name: 'AI Competitor Price Tracker', title: 'AI Competitor Price Tracker', route: '/ai-agent/sales/competitor-price-tracker' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4581',
      tasksAutomatedDaily: 193,
      responseTime: '0.5s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'manager',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
