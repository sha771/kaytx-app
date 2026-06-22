import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Warehouse } from 'lucide-react-native';

export default function WarehouseOperationsManagerPage() {
  const agent = {
    id: 'warehouse-operations-manager',
    name: 'AI Warehouse Operations Manager',
    title: 'Warehouse Operations Manager',
    description: 'The AI Warehouse Operations Manager manages daily warehouse operations, coordinates receiving, picking, packing, and shipping activities, and ensures efficient warehouse performance.',
    capabilities: ["Warehouse Operations","Activity Coordination","Team Supervision","Performance Monitoring","Process Control","Quality Assurance","Safety Management","Resource Allocation","Reporting","Continuous Improvement"],
    icon: Warehouse,
    color: '#3B82F6',
    type: 'employee' as const,
    humanCost: '$85k/year',
    aiCost: '$2.2k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'warehouse-operations-manager',
    infrastructure: {
      status: 'online' as const,
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$6,875',
      tasksAutomatedDaily: 650,
      responseTime: '1.5s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'manager',
      reportsTo: 'vp-warehouse-management',
      manages: ['warehouse-supervisor', 'zone-manager'],
    },
    specializedCapabilities: [
      'Warehouse Operations',
      'Activity Coordination',
      'Team Supervision',
      'Performance Monitoring',
      'Process Control',
      'Quality Assurance',
      'Safety Management',
      'Resource Allocation'
    ],
    integrationOptions: [
      'WMS Systems',
      'Scanning Equipment',
      'Material Handling',
      'Analytics Platforms',
      'Communication Tools',
      'ERP Integration',
      'Performance Systems'
    ],
    automationFeatures: [
      'Operations Planning',
      'Activity Coordination',
      'Performance Tracking',
      'Quality Monitoring',
      'Safety Monitoring',
      'Resource Allocation',
      'Report Generation'
    ],
    kpiMetrics: [
      'Warehouse Efficiency',
      'Throughput Rate',
      'Quality Metrics',
      'Safety Incidents',
      'Team Productivity',
      'Process Compliance',
      'Cost Per Operation'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      qualityLevel: 'premium',
      safetyLevel: 'high'
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
      { id: 'wom1', name: 'Warehouse Operations', category: 'Warehouse', description: 'Manage warehouse operations', level: 'expert' },
      { id: 'wom2', name: 'Team Supervision', category: 'Leadership', description: 'Supervise teams', level: 'expert' },
      { id: 'wom3', name: 'Process Control', category: 'Process', description: 'Control processes', level: 'expert' }
    ],
    personality: [
      { trait: 'Leadership', value: 10, description: 'Strong leader' },
      { trait: 'Operational Focus', value: 10, description: 'Operations-focused' },
      { trait: 'Efficiency', value: 10, description: 'Prioritizes efficiency' },
      { trait: 'Safety Conscious', value: 9, description: 'Safety-conscious' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
