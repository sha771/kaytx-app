import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Settings } from 'lucide-react-native';

export default function EquipmentCoordinatorPage() {
  const agent = {
    id: 'equipment-coordinator',
    name: 'AI Equipment Coordinator',
    title: 'Equipment Coordinator',
    description: 'The AI Equipment Coordinator manages equipment scheduling, coordinates maintenance activities, tracks equipment utilization, and ensures optimal use of logistics equipment and assets.',
    capabilities: ["Equipment Management","Maintenance Coordination","Utilization Tracking","Scheduling","Cost Monitoring","Performance Tracking","Asset Management","Reporting","Preventive Maintenance","Resource Allocation"],
    icon: Settings,
    color: '#EF4444',
    type: 'employee' as const,
    humanCost: '$50k/year',
    aiCost: '$1.3k/year',
    efficiency: '32x efficiency improvement',
    replacesRole: 'equipment-coordinator',
    infrastructure: {
      status: 'online' as const,
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$4,042',
      tasksAutomatedDaily: 420,
      responseTime: '1.9s',
      accuracyRate: '94.8%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'specialist',
      reportsTo: 'warehouse-operations-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Equipment Management',
      'Maintenance Coordination',
      'Utilization Tracking',
      'Scheduling',
      'Cost Monitoring',
      'Performance Tracking',
      'Asset Management',
      'Preventive Maintenance'
    ],
    integrationOptions: [
      'Equipment Systems',
      'Maintenance Software',
      'Asset Management',
      'IoT Sensors',
      'Analytics Platforms',
      'ERP Integration',
      'Scheduling Tools'
    ],
    automationFeatures: [
      'Equipment Scheduling',
      'Maintenance Coordination',
      'Utilization Tracking',
      'Cost Monitoring',
      'Performance Tracking',
      'Preventive Maintenance',
      'Report Generation'
    ],
    kpiMetrics: [
      'Equipment Utilization',
      'Maintenance Compliance',
      'Downtime Reduction',
      'Cost Per Equipment',
      'Asset Life',
      'Scheduling Accuracy',
      'Performance Rate'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      utilizationLevel: 'maximum',
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
      { id: 'ec1', name: 'Equipment Management', category: 'Equipment', description: 'Manage equipment', level: 'expert' },
      { id: 'ec2', name: 'Maintenance Coordination', category: 'Maintenance', description: 'Coordinate maintenance', level: 'expert' },
      { id: 'ec3', name: 'Asset Management', category: 'Asset', description: 'Manage assets', level: 'expert' }
    ],
    personality: [
      { trait: 'Organized', value: 10, description: 'Well-organized' },
      { trait: 'Detail Oriented', value: 10, description: 'Attention to detail' },
      { trait: 'Efficiency', value: 10, description: 'Prioritizes efficiency' },
      { trait: 'Problem Solving', value: 9, description: 'Problem solver' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
