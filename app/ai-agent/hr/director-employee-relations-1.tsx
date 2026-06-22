import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MessageSquare } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-employee-relations-1',
    name: 'Director of Employee Relations - Conflict Resolution',
    title: 'AI Director of Employee Relations - Conflict Resolution',
    description: 'The AI Director of Employee Relations for Conflict Resolution manages workplace conflicts, grievance processes, and mediation to maintain positive employee relations.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Conflict Resolution","Grievance Management","Mediation Services","Investigation Management","Policy Enforcement","Employee Advocacy","Team Leadership"],
    icon: MessageSquare,
    color: '#9C27B0',
    type: 'employee' as const,
    humanCost: '$155k/year',
    aiCost: '$3.5k/year',
    efficiency: '44x efficiency improvement',
    replacesRole: 'director-employee-relations',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11',
      tasksAutomatedDaily: 845,
      responseTime: '1.8s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['employee-relations-specialists', 'investigators'],
    },
    specializedCapabilities: [
      'Conflict Resolution',
      'Grievance Management',
      'Mediation Services',
      'Investigation Management',
      'Policy Enforcement',
      'Employee Advocacy',
      'Workplace Harassment Prevention',
      'Restorative Practices'
    ],
    integrationOptions: [
      'Case Management Systems',
      'HRIS Platforms',
      'Survey Tools',
      'Legal Compliance Systems',
      'Communication Platforms',
      'Documentation Systems',
      'Analytics Suite',
      'Reporting Tools'
    ],
    automationFeatures: [
      'Case Tracking',
      'Grievance Processing',
      'Investigation Workflow',
      'Mediation Scheduling',
      'Documentation Generation',
      'Compliance Monitoring',
      'Follow-up Automation',
      'Report Generation'
    ],
    kpiMetrics: [
      'Resolution Time',
      'Case Closure Rate',
      'Employee Satisfaction',
      'Recurrence Rate',
      'Compliance Score',
      'Mediation Success',
      'Investigation Quality',
      'Policy Adherence'
    ],
    customOptions: {
      resolutionMethod: 'mediation-focused',
      responseLevel: 'timely',
      documentationLevel: 'comprehensive',
      approach: 'restorative',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts conflict risks' },
      { id: 'resolution', enabled: true, name: 'Resolution Core', description: 'Optimizes conflict resolution' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'der_1', name: 'Conflict Resolution', category: 'Relations', description: 'Resolve conflicts', level: 'expert' },
      { id: 'der_2', name: 'Grievance Management', category: 'Operations', description: 'Manage grievances', level: 'expert' },
      { id: 'der_3', name: 'Mediation', category: 'Relations', description: 'Conduct mediation', level: 'expert' },
      { id: 'der_4', name: 'Investigation', category: 'Operations', description: 'Conduct investigations', level: 'expert' },
      { id: 'der_5', name: 'Employee Advocacy', category: 'Relations', description: 'Advocate for employees', level: 'expert' }
    ],
    personality: [
      { trait: 'Diplomatic', value: 10, description: 'Diplomatic in approach' },
      { trait: 'Empathetic', value: 9, description: 'Empathetic to employees' },
      { trait: 'Fair', value: 9, description: 'Fair in decisions' },
      { trait: 'Confidential', value: 9, description: 'Maintains confidentiality' },
      { trait: 'Patient', value: 8, description: 'Patient in resolution' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
