import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Wrench } from 'lucide-react-native';

export default function MaintenanceCoordinatorPage() {
  const agent = {
    id: 'maintenance-coordinator',
    name: 'AI Maintenance Coordinator',
    title: 'Maintenance Coordinator',
    description: 'The AI Maintenance Coordinator coordinates maintenance activities, schedules preventive maintenance, manages work orders, and ensures proper maintenance of warehouse equipment and facilities.',
    capabilities: ["Maintenance Coordination","Preventive Scheduling","Work Order Management","Vendor Coordination","Performance Tracking","Cost Monitoring","Reporting","Inventory Management","Compliance","Continuous Improvement"],
    icon: Wrench,
    color: '#3B82F6',
    type: 'employee' as const,
    humanCost: '$52k/year',
    aiCost: '$1.3k/year',
    efficiency: '34x efficiency improvement',
    replacesRole: 'maintenance-coordinator',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$4,208',
      tasksAutomatedDaily: 440,
      responseTime: '1.7s',
      accuracyRate: '95.0%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'specialist',
      reportsTo: 'warehouse-operations-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Maintenance Coordination',
      'Preventive Scheduling',
      'Work Order Management',
      'Vendor Coordination',
      'Performance Tracking',
      'Cost Monitoring',
      'Reporting',
      'Compliance'
    ],
    integrationOptions: [
      'Maintenance Systems',
      'Work Order Tools',
      'Vendor Portals',
      'Inventory Systems',
      'Analytics Platforms',
      'ERP Integration',
      'Compliance Tools'
    ],
    automationFeatures: [
      'Maintenance Scheduling',
      'Work Order Automation',
      'Vendor Coordination',
      'Performance Tracking',
      'Cost Monitoring',
      'Compliance Checking',
      'Report Generation'
    ],
    kpiMetrics: [
      'Preventive Compliance',
      'Work Order Speed',
      'Vendor Performance',
      'Equipment Uptime',
      'Cost Effectiveness',
      'Maintenance Quality',
      'Scheduling Accuracy'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      preventiveLevel: 'maximum',
      costFocus: 'high'
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
      { id: 'mc1', name: 'Maintenance Coordination', category: 'Maintenance', description: 'Coordinate maintenance', level: 'expert' },
      { id: 'mc2', name: 'Scheduling', category: 'Scheduling', description: 'Schedule maintenance', level: 'expert' },
      { id: 'mc3', name: 'Work Order Management', category: 'Work Order', description: 'Manage work orders', level: 'expert' }
    ],
    personality: [
      { trait: 'Organized', value: 10, description: 'Well-organized' },
      { trait: 'Detail Oriented', value: 10, description: 'Attention to detail' },
      { trait: 'Proactive', value: 10, description: 'Proactive approach' },
      { trait: 'Reliable', value: 9, description: 'Reliable coordinator' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
