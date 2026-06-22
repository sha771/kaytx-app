import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Sprout } from 'lucide-react-native';

export default function EquipmentMaintenancePage() {
  const agent = {
    id: 'equipment-maintenance',
    name: 'AI Equipment Maintenance',
    title: 'AI Equipment Maintenance',
    description: 'The AI Equipment Maintenance manages agricultural equipment maintenance, schedules repairs, and ensures optimal equipment performance.',
    capabilities: ["Task Automation","Data Processing","Equipment Management","Maintenance Scheduling","Repair Coordination","Performance Monitoring","Communication","Inventory Management","Cost Optimization","Maintenance Intelligence"],
    icon: Sprout,
    color: '#4CAF50',
    type: 'agent' as const,
    humanCost: '$49k/year',
    aiCost: '$2k/year',
    efficiency: '24x efficiency improvement',
    replacesRole: 'equipment-maintenance',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,900',
      tasksAutomatedDaily: 285,
      responseTime: '0.6s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Agriculture',
      level: 'operational',
      reportsTo: 'equipment',
      manages: [],
    },
    specializedCapabilities: [
      'Equipment Management',
      'Maintenance Scheduling',
      'Repair Coordination',
      'Performance Monitoring',
      'Communication',
      'Inventory Management',
      'Cost Optimization',
      'Maintenance Intelligence'
    ],
    integrationOptions: [
      'Equipment Systems',
      'Maintenance Platforms',
      'Inventory Management',
      'Communication Tools',
      'Analytics Platforms',
      'Repair Systems',
      'Cost Tracking',
      'Performance Monitoring'
    ],
    automationFeatures: [
      'Equipment Monitoring',
      'Maintenance Scheduling',
      'Repair Coordination',
      'Performance Tracking',
      'Inventory Management',
      'Cost Optimization',
      'Predictive Maintenance',
      'Performance Monitoring'
    ],
    kpiMetrics: [
      'Equipment Uptime',
      'Maintenance Efficiency',
      'Repair Speed',
      'Cost Savings',
      'Performance Metrics',
      'Communication Effectiveness',
      'Maintenance Intelligence',
      'Operational Efficiency'
    ],
    customOptions: {
      equipmentFocus: 'high',
      maintenanceEfficiency: 'maximum',
      costOptimization: 'priority',
      predictiveMaintenance: 'enabled',
      integrationLevel: 'comprehensive'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: true,
      sentimentAnalysis: true,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'equipment', enabled: true, name: 'Equipment Monitor', description: 'Monitors equipment' },
      { id: 'maintenance', enabled: true, name: 'Maintenance Scheduler', description: 'Schedules maintenance' },
      { id: 'repair', enabled: true, name: 'Repair Coordinator', description: 'Coordinates repairs' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'agri_1', name: 'Equipment Management', category: 'Equipment', description: 'Manage equipment', level: 'expert' },
      { id: 'agri_2', name: 'Maintenance Scheduling', category: 'Maintenance', description: 'Schedule maintenance', level: 'expert' },
      { id: 'agri_3', name: 'Repair Coordination', category: 'Repair', description: 'Coordinate repairs', level: 'expert' },
      { id: 'agri_4', name: 'Performance Monitoring', category: 'Monitoring', description: 'Monitor performance', level: 'expert' },
      { id: 'agri_5', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' }
    ],
    personality: [
      { trait: 'Technical Skill', value: 10, description: 'Technical expertise' },
      { trait: 'Maintenance Focus', value: 10, description: 'Maintenance oriented' },
      { trait: 'Cost Conscious', value: 10, description: 'Cost conscious' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
