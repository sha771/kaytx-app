import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ArrowRightLeft } from 'lucide-react-native';

export default function CrossDockManagerPage() {
  const agent = {
    id: 'cross-dock-manager',
    name: 'AI Cross Dock Manager',
    title: 'Cross Dock Manager',
    description: 'The AI Cross Dock Manager manages cross-docking operations, coordinates direct transfers, optimizes dock scheduling, and ensures efficient cross-dock operations for rapid throughput.",
    capabilities: ["Cross-Dock Operations","Transfer Coordination","Dock Scheduling","Throughput Optimization","Quality Check","Performance Monitoring","Resource Allocation","Reporting","Cost Analysis","Continuous Improvement"],
    icon: ArrowRightLeft,
    color: '#3B82F6',
    type: 'employee' as const,
    humanCost: '$62k/year',
    aiCost: '$1.6k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'cross-dock-manager',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$5,042',
      tasksAutomatedDaily: 500,
      responseTime: '1.5s',
      accuracyRate: '95.8%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'manager',
      reportsTo: 'warehouse-manager',
      manages: ['dock-specialist', 'transfer-coordinator'],
    },
    specializedCapabilities: [
      'Cross-Dock Operations',
      'Transfer Coordination',
      'Dock Scheduling',
      'Throughput Optimization',
      'Quality Check',
      'Performance Monitoring',
      'Resource Allocation',
      'Cost Analysis'
    ],
    integrationOptions: [
      'Cross-Dock Systems',
      'Dock Management',
      'Transfer Tools',
      'Analytics Platforms',
      'WMS Integration',
      'ERP Integration',
      'Performance Systems'
    ],
    automationFeatures: [
      'Cross-Dock Planning',
      'Transfer Coordination',
      'Dock Scheduling',
      'Throughput Monitoring',
      'Quality Checking',
      'Resource Allocation',
      'Report Generation'
    ],
    kpiMetrics: [
      'Throughput Rate',
      'Transfer Speed',
      'Dock Utilization',
      'Quality Metrics',
      'Resource Efficiency',
      'Cost Per Transfer',
      'Overall Efficiency'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      throughputLevel: 'maximum',
      speedLevel: 'premium'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: false,
      anomalyDetection: true,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    agentType: 'learning',
    skills: [
      { id: 'cdm1', name: 'Cross-Dock Operations', category: 'Cross-Dock', description: 'Manage cross-dock', level: 'expert' },
      { id: 'cdm2', name: 'Transfer Coordination', category: 'Transfer', description: 'Coordinate transfers', level: 'expert' },
      { id: 'cdm3', name: 'Throughput Optimization', category: 'Throughput', description: 'Optimize throughput', level: 'expert' }
    ],
    personality: [
      { trait: 'Efficiency', value: 10, description: 'Prioritizes efficiency' },
      { trait: 'Speed', value: 10, description: 'Speed-focused' },
      { trait: 'Coordination', value: 10, description: 'Excellent coordinator' },
      { trait: 'Strategic', value: 9, description: 'Strategic thinker' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
