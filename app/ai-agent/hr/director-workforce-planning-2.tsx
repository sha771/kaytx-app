import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-workforce-planning-2',
    name: 'Director of Workforce Planning - Operational',
    title: 'AI Director of Workforce Planning - Operational',
    description: 'The AI Director of Workforce Planning for Operational manages short-term workforce scheduling, resource allocation, and operational workforce optimization.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Operational Planning","Resource Allocation","Workforce Scheduling","Cost Optimization','Real-time Adjustments','Shift Management','Team Leadership"],
    icon: Target,
    color: '#4CAF50',
    type: 'employee' as const,
    humanCost: '$155k/year',
    aiCost: '$3.5k/year',
    efficiency: '44x efficiency improvement',
    replacesRole: 'director-workforce-planning',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11',
      tasksAutomatedDaily: 870,
      responseTime: '1.6s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['operational-planners', 'schedulers'],
    },
    specializedCapabilities: [
      'Operational Planning',
      'Resource Allocation',
      'Workforce Scheduling',
      'Cost Optimization',
      'Real-time Adjustments',
      'Shift Management',
      'Utilization Tracking',
      'Demand Response'
    ],
    integrationOptions: [
      'Scheduling Systems',
      'Time Tracking',
      'Project Management',
      'Resource Management',
      'Cost Systems',
      'Analytics Suite',
      'Communication Tools',
      'Mobile Apps'
    ],
    automationFeatures: [
      'Schedule Generation',
      'Resource Assignment',
      'Cost Calculation',
      'Utilization Tracking',
      'Adjustment Automation',
      'Shift Coordination',
      'Report Generation',
      'Alert Systems'
    ],
    kpiMetrics: [
      'Schedule Efficiency',
      'Resource Utilization',
      'Cost Variance',
      'Response Time',
      'Shift Coverage',
      'Employee Satisfaction',
      'Productivity Impact',
      'Service Level'
    ],
    customOptions: {
      planningHorizon: '0-12-months',
      schedulingModel: 'optimized',
      costFocus: 'efficiency',
      flexibility: 'high',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts demand' },
      { id: 'operational', enabled: true, name: 'Operational Core', description: 'Optimizes operations' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dwp_1', name: 'Operational Planning', category: 'Planning', description: 'Plan operations', level: 'expert' },
      { id: 'dwp_2', name: 'Resource Allocation', category: 'Allocation', description: 'Allocate resources', level: 'expert' },
      { id: 'dwp_3', name: 'Workforce Scheduling', category: 'Scheduling', description: 'Schedule workforce', level: 'expert' },
      { id: 'dwp_4', name: 'Cost Optimization', category: 'Optimization', description: 'Optimize costs', level: 'expert' },
      { id: 'dwp_5', name: 'Real-time Adjustments', category: 'Operations', description: 'Adjust in real-time', level: 'expert' }
    ],
    personality: [
      { trait: 'Efficient', value: 10, description: 'Efficient planner' },
      { trait: 'Responsive', value: 9, description: 'Responsive to changes' },
      { trait: 'Detail-oriented', value: 9, description: 'Attention to detail' },
      { trait: 'Pragmatic', value: 9, description: 'Pragmatic approach' },
      { trait: 'Collaborative', value: 8, description: 'Works with operations' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
