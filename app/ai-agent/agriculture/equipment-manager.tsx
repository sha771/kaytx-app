import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Wrench } from 'lucide-react-native';

export default function EquipmentManagerPage() {
  const agent = {
    id: 'equipment-manager',
    name: 'AI Equipment Manager',
    title: 'AI Equipment Manager',
    description: 'The AI Equipment Manager manages farm equipment and machinery, oversees maintenance schedules, and ensures optimal equipment performance and availability.',
    capabilities: ["Task Automation","Data Processing","Equipment Management","Maintenance Scheduling","Machinery Tracking","Performance Monitoring","Inventory Management","Cost Tracking","Repair Coordination","Equipment Optimization"],
    icon: Wrench,
    color: '#FF9800',
    type: 'employee' as const,
    humanCost: '$100k/year',
    aiCost: '$2.5k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'equipment-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$8,125',
      tasksAutomatedDaily: 750,
      responseTime: '1.6s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Agriculture',
      level: 'manager',
      reportsTo: 'vp-farm-operations',
      manages: [],
    },
    specializedCapabilities: [
      'Equipment Management',
      'Maintenance Scheduling',
      'Machinery Tracking',
      'Performance Monitoring',
      'Inventory Management',
      'Cost Tracking',
      'Repair Coordination',
      'Equipment Optimization',
      'Lifecycle Management',
      'Utilization Tracking'
    ],
    integrationOptions: [
      'Equipment Management Systems',
      'Maintenance Software',
      'IoT Sensors',
      'Inventory Systems',
      'Cost Tracking',
      'Repair Platforms',
      'GPS Tracking',
      'Analytics Tools'
    ],
    automationFeatures: [
      'Maintenance Scheduling',
      'Equipment Tracking',
      'Performance Monitoring',
      'Inventory Management',
      'Cost Tracking',
      'Repair Coordination',
      'Utilization Analysis',
      'Report Generation'
    ],
    kpiMetrics: [
      'Equipment Availability',
      'Maintenance Compliance',
      'Performance Score',
      'Utilization Rate',
      'Cost Efficiency',
      'Repair Time',
      'Lifecycle Optimization',
      'Inventory Accuracy'
    ],
    customOptions: {
      availabilityLevel: 'high',
      maintenanceProactive: 'yes',
      utilizationTarget: 'optimal',
      costEfficiency: 'high',
      performanceStandard: 'premium'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: false,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: true,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'equipment', enabled: true, name: 'Equipment Monitor', description: 'Monitors equipment performance' },
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts maintenance needs' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'em_1', name: 'Equipment Management', category: 'Equipment', description: 'Manage equipment', level: 'expert' },
      { id: 'em_2', name: 'Maintenance Scheduling', category: 'Maintenance', description: 'Schedule maintenance', level: 'expert' },
      { id: 'em_3', name: 'Performance Monitoring', category: 'Performance', description: 'Monitor performance', level: 'expert' }
    ],
    personality: [
      { trait: 'Maintenance', value: 10, description: 'Maintenance-focused' },
      { trait: 'Efficiency', value: 10, description: 'Efficiency-oriented' },
      { trait: 'Reliability', value: 9, description: 'Reliability-conscious' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
