import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Kanban } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'project-manager-prof',
    name: 'project-manager-prof',
    title: 'AI Project Manager',
    description: 'The AI Project Manager manages professional services projects, coordinates resources, tracks progress, and ensures projects are delivered on time, on budget, and to quality standards.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Project Planning","Resource Coordination","Schedule Management","Budget Tracking","Risk Management","Stakeholder Communication","Quality Assurance"],
    icon: Kanban,
    color: '#6366F1',
    type: 'employee' as const,
    humanCost: '$125k/year',
    aiCost: '$2.6k/year',
    efficiency: '48x efficiency improvement',
    replacesRole: 'project-manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$10',
      tasksAutomatedDaily: 700,
      responseTime: '1.4s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Professional Services',
      level: 'management',
      reportsTo: 'vp-project-delivery',
      manages: [],
    },
    specializedCapabilities: [
      'Project Planning',
      'Resource Coordination',
      'Schedule Management',
      'Budget Tracking',
      'Risk Management',
      'Stakeholder Communication',
      'Quality Assurance',
      'Progress Monitoring',
      'Issue Resolution',
      'Delivery Excellence'
    ],
    integrationOptions: [
      'Project Management Tools',
      'Resource Management Systems',
      'Time Tracking',
      'Budget Systems',
      'Risk Management Platforms',
      'Communication Tools',
      'Document Management',
      'Reporting Systems'
    ],
    automationFeatures: [
      'Project Scheduling',
      'Resource Assignment',
      'Progress Tracking',
      'Budget Monitoring',
      'Risk Alerts',
      'Status Reporting',
      'Stakeholder Updates',
      'Quality Checks'
    ],
    kpiMetrics: [
      'On-Time Delivery',
      'Budget Adherence',
      'Project Quality',
      'Resource Utilization',
      'Client Satisfaction',
      'Risk Mitigation',
      'Issue Resolution',
      'Team Productivity'
    ],
    customOptions: {
      methodology: 'agile',
      projectType: 'consulting',
      reportingFrequency: 'weekly',
      riskTolerance: 'low',
      stakeholderEngagement: 'high'
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts project delivery and risks' },
      { id: 'sentiment', enabled: true, name: 'Sentiment Core', description: 'Analyzes stakeholder satisfaction' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'pm_1', name: 'Project Planning', category: 'Planning', description: 'Plan projects effectively', level: 'expert' },
      { id: 'pm_2', name: 'Resource Coordination', category: 'Resources', description: 'Coordinate project resources', level: 'expert' },
      { id: 'pm_3', name: 'Schedule Management', category: 'Schedule', description: 'Manage project schedules', level: 'expert' },
      { id: 'pm_4', name: 'Risk Management', category: 'Risk', description: 'Manage project risks', level: 'expert' },
      { id: 'pm_5', name: 'Stakeholder Communication', category: 'Communication', description: 'Communicate with stakeholders', level: 'expert' }
    ],
    personality: [
      { trait: 'Organization', value: 10, description: 'Highly organized' },
      { trait: 'Accountability', value: 9, description: 'Takes ownership' },
      { trait: 'Communication', value: 9, description: 'Communicates clearly' },
      { trait: 'Problem Solving', value: 9, description: 'Solves project issues' },
      { trait: 'Detail Oriented', value: 8, description: 'Pays attention to details' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
