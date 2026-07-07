import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Trash2 } from 'lucide-react-native';

export default function ObsoleteInventorySpecialistPage() {
  const agent = {
    id: 'obsolete-inventory-specialist',
    name: 'AI Obsolete Inventory Specialist',
    title: 'Obsolete Inventory Specialist',
    description: 'The AI Obsolete Inventory Specialist identifies obsolete inventory, manages write-offs, coordinates disposal processes, and minimizes obsolete stock losses.',
    capabilities: ["Obsolete Identification","Write-Off Management","Disposal Coordination","Cost Recovery","Analysis","Reporting","Documentation","Vendor Communication","Prevention","Continuous Improvement"],
    icon: Trash2,
    color: '#F59E0B',
    type: 'employee' as const,
    humanCost: '$52k/year',
    aiCost: '$1.3k/year',
    efficiency: '34x efficiency improvement',
    replacesRole: 'obsolete-inventory-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$4,208',
      tasksAutomatedDaily: 420,
      responseTime: '1.7s',
      accuracyRate: '95.0%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'specialist',
      reportsTo: 'inventory-optimization-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Obsolete Identification',
      'Write-Off Management',
      'Disposal Coordination',
      'Cost Recovery',
      'Analysis',
      'Reporting',
      'Documentation',
      'Prevention'
    ],
    integrationOptions: [
      'Inventory Systems',
      'Asset Management',
      'Disposal Services',
      'Analytics Platforms',
      'Financial Systems',
      'ERP Integration',
      'Documentation Tools'
    ],
    automationFeatures: [
      'Obsolete Detection',
      'Write-Off Processing',
      'Disposal Coordination',
      'Cost Recovery',
      'Analysis',
      'Documentation Generation',
      'Report Generation'
    ],
    kpiMetrics: [
      'Identification Accuracy',
      'Write-Off Speed',
      'Disposal Efficiency',
      'Cost Recovery',
      'Prevention Success',
      'Documentation Quality',
      'Overall Performance'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      recoveryLevel: 'maximum',
      preventionLevel: 'high'
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
      { id: 'ois1', name: 'Obsolete Management', category: 'Obsolete', description: 'Manage obsolete stock', level: 'expert' },
      { id: 'ois2', name: 'Cost Recovery', category: 'Cost', description: 'Recover costs', level: 'expert' },
      { id: 'ois3', name: 'Prevention', category: 'Prevention', description: 'Prevent obsolescence', level: 'expert' }
    ],
    personality: [
      { trait: 'Cost Conscious', value: 10, description: 'Cost-focused' },
      { trait: 'Analytical', value: 10, description: 'Highly analytical' },
      { trait: 'Detail Oriented', value: 10, description: 'Attention to detail' },
      { trait: 'Strategic', value: 9, description: 'Strategic thinker' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
