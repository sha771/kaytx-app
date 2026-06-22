import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Settings } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-hr-operations-2',
    name: 'Director of HR Operations - Process & Systems',
    title: 'AI Director of HR Operations - Process & Systems',
    description: 'The AI Director of HR Operations for Process & Systems manages HR processes, system integration, and operational technology across HR functions.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Process Design","System Integration","Operational Technology","Data Flow Management","Process Automation","System Optimization","Team Leadership"],
    icon: Settings,
    color: '#607D8B',
    type: 'employee' as const,
    humanCost: '$170k/year',
    aiCost: '$4k/year',
    efficiency: '43x efficiency improvement',
    replacesRole: 'director-hr-ops',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 895,
      responseTime: '1.3s',
      accuracyRate: '97.6%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'vp-hr-ops',
      manages: ['process-engineers', 'systems-admins'],
    },
    specializedCapabilities: [
      'Process Design',
      'System Integration',
      'Operational Technology',
      'Data Flow Management',
      'Process Automation',
      'System Optimization',
      'Integration Architecture',
      'Performance Monitoring'
    ],
    integrationOptions: [
      'HRIS Systems',
      'ATS Platforms',
      'Integration Tools',
      'Automation Platforms',
      'API Connectors',
      'Data Warehouses',
      'Monitoring Tools',
      'DevOps Platforms'
    ],
    automationFeatures: [
      'Process Automation',
      'System Integration',
      'Data Synchronization',
      'Workflow Orchestration',
      'Error Handling',
      'Performance Monitoring',
      'Maintenance Automation',
      'Report Generation'
    ],
    kpiMetrics: [
      'Process Efficiency',
      'System Uptime',
      'Integration Success',
      'Automation Rate',
      'Data Quality',
      'Error Rate',
      'Performance Score',
      'Cost Efficiency'
    ],
    customOptions: {
      processModel: 'agile',
      integrationLevel: 'enterprise',
      automationFocus: 'end-to-end',
      monitoringLevel: 'real-time',
      dataDriven: true
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts system needs' },
      { id: 'automation', enabled: true, name: 'Automation Core', description: 'Automates processes' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dho_1', name: 'Process Design', category: 'Design', description: 'Design processes', level: 'expert' },
      { id: 'dho_2', name: 'System Integration', category: 'Technology', description: 'Integrate systems', level: 'expert' },
      { id: 'dho_3', name: 'Process Automation', category: 'Automation', description: 'Automate processes', level: 'expert' },
      { id: 'dho_4', name: 'Data Flow', category: 'Data', description: 'Manage data flow', level: 'expert' },
      { id: 'dho_5', name: 'System Optimization', category: 'Optimization', description: 'Optimize systems', level: 'expert' }
    ],
    personality: [
      { trait: 'Technical', value: 10, description: 'Technical aptitude' },
      { trait: 'Process-oriented', value: 9, description: 'Process-focused' },
      { trait: 'Efficiency-driven', value: 9, description: 'Driven by efficiency' },
      { trait: 'Innovative', value: 9, description: 'Innovative in solutions' },
      { trait: 'Analytical', value: 8, description: 'Analytical thinker' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
