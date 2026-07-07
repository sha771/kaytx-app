import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-hr-5',
    name: 'Director of Human Resources - Global Operations',
    title: 'AI Director of Human Resources - Global Operations',
    description: 'The AI Director of Human Resources for Global Operations oversees worldwide HR processes, systems, and service delivery, ensuring consistency and excellence across all regions.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Global HR Operations","Process Standardization","Service Delivery","System Integration","Global Compliance","Performance Management","Team Leadership"],
    icon: Users,
    color: '#E91E63',
    type: 'employee' as const,
    humanCost: '$195k/year',
    aiCost: '$4k/year',
    efficiency: '49x efficiency improvement',
    replacesRole: 'director-hr-ops',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 950,
      responseTime: '1.4s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['regional-hr-directors', 'hr-systems-team'],
    },
    specializedCapabilities: [
      'Global Process Design',
      'HR System Architecture',
      'Service Delivery Models',
      'Global Compliance',
      'Process Standardization',
      'Vendor Management',
      'Operational Excellence',
      'Change Management'
    ],
    integrationOptions: [
      'Global HRIS',
      'Enterprise ATS',
      'Global Payroll',
      'Learning Platforms',
      'Performance Systems',
      'Compliance Platforms',
      'Shared Services',
      'Analytics Suite'
    ],
    automationFeatures: [
      'Global Workflows',
      'Process Automation',
      'System Integration',
      'Compliance Monitoring',
      'Service Delivery Automation',
      'Reporting Automation',
      'Vendor Coordination',
      'Change Management'
    ],
    kpiMetrics: [
      'Process Efficiency',
      'System Uptime',
      'Service Level Compliance',
      'Global Satisfaction',
      'Compliance Score',
      'Cost per Transaction',
      'Automation Rate',
      'Quality Metrics'
    ],
    customOptions: {
      scope: 'global',
      processFocus: 'standardization',
      systemIntegration: 'enterprise',
      serviceModel: 'shared-services',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts operational trends' },
      { id: 'process', enabled: true, name: 'Process Core', description: 'Optimizes global processes' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dhr_1', name: 'Global Operations', category: 'Operations', description: 'Manage global HR operations', level: 'expert' },
      { id: 'dhr_2', name: 'Process Design', category: 'Operations', description: 'Design HR processes', level: 'expert' },
      { id: 'dhr_3', name: 'System Architecture', category: 'Technology', description: 'Design HR systems', level: 'expert' },
      { id: 'dhr_4', name: 'Service Delivery', category: 'Operations', description: 'Manage service delivery', level: 'expert' },
      { id: 'dhr_5', name: 'Operational Excellence', category: 'Operations', description: 'Drive operational excellence', level: 'expert' }
    ],
    personality: [
      { trait: 'Process-oriented', value: 10, description: 'Strong process orientation' },
      { trait: 'Systems-thinking', value: 9, description: 'Thinks in systems' },
      { trait: 'Collaborative', value: 9, description: 'Works globally' },
      { trait: 'Efficiency-focused', value: 9, description: 'Focuses on efficiency' },
      { trait: 'Strategic', value: 8, description: 'Thinks strategically' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
