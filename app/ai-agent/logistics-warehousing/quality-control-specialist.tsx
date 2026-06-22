import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CheckCircle } from 'lucide-react-native';

export default function QualityControlSpecialistPage() {
  const agent = {
    id: 'quality-control-specialist',
    name: 'AI Quality Control Specialist',
    title: 'Quality Control Specialist',
    description: 'The AI Quality Control Specialist performs quality inspections, maintains quality standards, coordinates testing activities, and ensures products and processes meet quality requirements.',
    capabilities: ["Quality Inspection","Standard Maintenance","Testing Coordination","Defect Detection","Reporting","Documentation","Process Improvement","Compliance Monitoring","Analytics","Continuous Improvement"],
    icon: CheckCircle,
    color: '#EF4444',
    type: 'employee' as const,
    humanCost: '$55k/year',
    aiCost: '$1.4k/year',
    efficiency: '32x efficiency improvement',
    replacesRole: 'quality-control-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$4,458',
      tasksAutomatedDaily: 460,
      responseTime: '1.9s',
      accuracyRate: '95.0%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'specialist',
      reportsTo: 'warehouse-operations-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Quality Inspection',
      'Standard Maintenance',
      'Testing Coordination',
      'Defect Detection',
      'Reporting',
      'Documentation',
      'Process Improvement',
      'Compliance Monitoring'
    ],
    integrationOptions: [
      'Quality Systems',
      'Testing Equipment',
      'Inspection Tools',
      'Analytics Platforms',
      'Documentation Systems',
      'ERP Integration',
      'Compliance Tools'
    ],
    automationFeatures: [
      'Inspection Planning',
      'Quality Checking',
      'Defect Detection',
      'Testing Coordination',
      'Compliance Monitoring',
      'Report Generation',
      'Documentation Creation'
    ],
    kpiMetrics: [
      'Inspection Accuracy',
      'Defect Detection Rate',
      'Testing Speed',
      'Quality Score',
      'Compliance Rate',
      'Process Improvement',
      'Customer Returns'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      qualityLevel: 'maximum',
      complianceLevel: 'premium'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: false,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: false,
      anomalyDetection: true,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: false,
    },
    agentType: 'learning',
    skills: [
      { id: 'qcs1', name: 'Quality Inspection', category: 'Quality', description: 'Perform inspections', level: 'expert' },
      { id: 'qcs2', name: 'Testing', category: 'Testing', description: 'Coordinate testing', level: 'expert' },
      { id: 'qcs3', name: 'Compliance', category: 'Compliance', description: 'Monitor compliance', level: 'expert' }
    ],
    personality: [
      { trait: 'Quality Focus', value: 10, description: 'Quality-focused' },
      { trait: 'Detail Oriented', value: 10, description: 'Attention to detail' },
      { trait: 'Standards', value: 10, description: 'Standards-driven' },
      { trait: 'Analytical', value: 9, description: 'Analytical thinker' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
