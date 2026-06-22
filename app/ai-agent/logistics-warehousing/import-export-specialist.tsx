import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Globe } from 'lucide-react-native';

export default function ImportExportSpecialistPage() {
  const agent = {
    id: 'import-export-specialist',
    name: 'AI Import Export Specialist',
    title: 'Import Export Specialist',
    description: 'The AI Import Export Specialist manages import/export operations, coordinates international shipments, ensures compliance with trade regulations, and facilitates global trade activities.',
    capabilities: ["Import Export Management","International Coordination","Trade Compliance","Documentation","Regulatory Management","Logistics Coordination","Cost Analysis","Reporting","Risk Management","Strategic Planning"],
    icon: Globe,
    color: '#EC4899',
    type: 'employee' as const,
    humanCost: '$70k/year',
    aiCost: '$1.8k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'import-export-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$5,708',
      tasksAutomatedDaily: 560,
      responseTime: '1.4s',
      accuracyRate: '96.2%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'specialist',
      reportsTo: 'customs-brokerage-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Import Export Management',
      'International Coordination',
      'Trade Compliance',
      'Documentation',
      'Regulatory Management',
      'Logistics Coordination',
      'Cost Analysis',
      'Risk Management'
    ],
    integrationOptions: [
      'Trade Platforms',
      'Customs Systems',
      'International Portals',
      'Documentation Tools',
      'Logistics Systems',
      'Analytics Platforms',
      'Compliance Tools'
    ],
    automationFeatures: [
      'Import Export Management',
      'International Coordination',
      'Compliance Checking',
      'Documentation Generation',
      'Regulatory Monitoring',
      'Cost Analysis',
      'Report Generation'
    ],
    kpiMetrics: [
      'Operation Accuracy',
      'Compliance Rate',
      'Documentation Quality',
      'Cost Efficiency',
      'Transit Time',
      'Risk Mitigation',
      'Overall Performance'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      complianceLevel: 'maximum',
      globalLevel: 'high'
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
      { id: 'ies1', name: 'Import Export', category: 'Trade', description: 'Manage import/export', level: 'expert' },
      { id: 'ies2', name: 'International Coordination', category: 'International', description: 'Coordinate international', level: 'expert' },
      { id: 'ies3', name: 'Trade Compliance', category: 'Compliance', description: 'Ensure compliance', level: 'expert' }
    ],
    personality: [
      { trait: 'Global Perspective', value: 10, description: 'Global mindset' },
      { trait: 'Compliance', value: 10, description: 'Compliance-driven' },
      { trait: 'Strategic', value: 10, description: 'Strategic thinker' },
      { trait: 'Detail Oriented', value: 9, description: 'Attention to detail' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
