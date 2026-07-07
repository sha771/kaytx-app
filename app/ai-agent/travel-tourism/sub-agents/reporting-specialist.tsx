import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function ReportingSpecialistPage() {
  const agent = {
    id: 'reporting-specialist',
    name: 'AI Reporting Specialist',
    title: 'AI Reporting Specialist',
    description: 'The AI Reporting Specialist creates reports, manages reporting schedules, ensures data accuracy, and delivers timely and accurate business intelligence.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Report Creation","Schedule Management","Data Accuracy","BI Delivery","Visualization","Dashboard Management","Stakeholder Communication"],
    icon: FileText,
    color: '#388E3C',
    type: 'employee' as const,
    humanCost: '$60k/year',
    aiCost: '$1.5k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'reporting-specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,900',
      tasksAutomatedDaily: 380,
      responseTime: '1.2s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'specialist',
      reportsTo: 'vp-tourism-analytics',
      manages: [],
    },
    specializedCapabilities: [
      'Report Creation',
      'Schedule Management',
      'Data Accuracy',
      'BI Delivery',
      'Visualization',
      'Dashboard Management',
      'Stakeholder Communication',
      'Report Optimization'
    ],
    integrationOptions: [
      'Reporting Platforms',
      'BI Tools',
      'Data Sources',
      'Visualization Systems',
      'Dashboard Platforms',
      'Communication Tools',
      'Scheduling Systems'
    ],
    automationFeatures: [
      'Report Creation',
      'Schedule Management',
      'Data Accuracy',
      'BI Delivery',
      'Visualization',
      'Dashboard Management',
      'Stakeholder Communication',
      'Report Optimization'
    ],
    kpiMetrics: [
      'Report Accuracy',
      'Timeliness',
      'Data Quality',
      'Stakeholder Satisfaction',
      'Visualization Effectiveness',
      'Dashboard Usage',
      'Schedule Adherence',
      'Communication Quality'
    ],
    customOptions: {
      accuracyTarget: 'strict',
      timelinessTarget: 'strict',
      dataQuality: 'high',
      stakeholderSatisfaction: 'high',
      visualizationQuality: 'high'
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
      { id: 'report', enabled: true, name: 'Report Generator', description: 'Generates reports' },
      { id: 'visualize', enabled: true, name: 'Visualization Creator', description: 'Creates visualizations' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'report_spec_1', name: 'Report Creation', category: 'Report', description: 'Create reports', level: 'expert' },
      { id: 'report_spec_2', name: 'Data Accuracy', category: 'Data', description: 'Ensure data accuracy', level: 'expert' },
      { id: 'report_spec_3', name: 'Visualization', category: 'Visualization', description: 'Create visualizations', level: 'expert' },
      { id: 'report_spec_4', name: 'Dashboard Management', category: 'Dashboard', description: 'Manage dashboards', level: 'advanced' },
      { id: 'report_spec_5', name: 'Stakeholder Communication', category: 'Communication', description: 'Communicate with stakeholders', level: 'advanced' }
    ],
    personality: [
      { trait: 'Accuracy Focus', value: 10, description: 'Accuracy-focused' },
      { trait: 'Timeliness', value: 10, description: 'Timely deliverer' },
      { trait: 'Detail Oriented', value: 10, description: 'Detail-oriented' },
      { trait: 'Communication', value: 9, description: 'Clear communicator' },
      { trait: 'Organization', value: 9, description: 'Well-organized' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
