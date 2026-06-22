import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Package } from 'lucide-react-native';

export default function ReceivingSpecialistPage() {
  const agent = {
    id: 'receiving-specialist',
    name: 'AI Receiving Specialist',
    title: 'Receiving Specialist',
    description: 'The AI Receiving Specialist manages incoming shipments, coordinates receiving activities, inspects received goods, and ensures accurate receipt and processing of incoming materials.',
    capabilities: ["Receiving Coordination","Shipment Inspection","Quality Check","Documentation","Inventory Recording","Exception Handling","Vendor Communication","Performance Tracking","Reporting","Analytics"],
    icon: Package,
    color: '#EF4444',
    type: 'employee' as const,
    humanCost: '$52k/year',
    aiCost: '$1.3k/year',
    efficiency: '32x efficiency improvement',
    replacesRole: 'receiving-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$4,208',
      tasksAutomatedDaily: 450,
      responseTime: '2.0s',
      accuracyRate: '94.8%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'specialist',
      reportsTo: 'warehouse-operations-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Receiving Coordination',
      'Shipment Inspection',
      'Quality Checking',
      'Documentation',
      'Inventory Recording',
      'Exception Handling',
      'Vendor Communication',
      'Performance Tracking'
    ],
    integrationOptions: [
      'Receiving Systems',
      'WMS Integration',
      'Scanning Equipment',
      'Quality Tools',
      'Vendor Portals',
      'Analytics Platforms',
      'ERP Systems'
    ],
    automationFeatures: [
      'Receiving Planning',
      'Inspection Coordination',
      'Quality Checking',
      'Inventory Recording',
      'Exception Handling',
      'Vendor Communication',
      'Report Generation'
    ],
    kpiMetrics: [
      'Receiving Accuracy',
      'Inspection Quality',
      'Processing Speed',
      'Exception Rate',
      'Vendor Performance',
      'Documentation Accuracy',
      'Inventory Accuracy'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      qualityLevel: 'premium',
      accuracyLevel: 'high'
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
      { id: 'rs1', name: 'Receiving', category: 'Receiving', description: 'Manage receiving', level: 'expert' },
      { id: 'rs2', name: 'Inspection', category: 'Quality', description: 'Inspect shipments', level: 'expert' },
      { id: 'rs3', name: 'Documentation', category: 'Documentation', description: 'Document receipts', level: 'expert' }
    ],
    personality: [
      { trait: 'Detail Oriented', value: 10, description: 'Attention to detail' },
      { trait: 'Quality Focus', value: 10, description: 'Quality-focused' },
      { trait: 'Accuracy', value: 10, description: 'Accuracy-focused' },
      { trait: 'Organization', value: 9, description: 'Well-organized' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
