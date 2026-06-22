import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function HRCompensationBenefitsPage() {
  const agent = {
    id: 'hr-compensation-benefits',
    name: 'AI HR Compensation & Benefits',
    title: 'AI HR Compensation & Benefits',
    description: 'The AI HR Compensation & Benefits manages compensation structures and benefits programs.',
    capabilities: ["Task Automation","Data Processing","Compensation Management","Benefits Administration","Payroll Planning","Communication","Analytics","HR Intelligence"],
    icon: DollarSign,
    color: '#F59E0B',
    type: 'agent' as const,
    humanCost: '$87k/year',
    aiCost: '$5k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'hr-compensation-benefits-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$6,800',
      tasksAutomatedDaily: 358,
      responseTime: '0.5s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'management',
      reportsTo: 'chro',
      manages: [],
    },
    specializedCapabilities: ['Compensation Management','Benefits Administration','Payroll Planning','Communication','Analytics','HR Intelligence'],
    integrationOptions: ['Compensation Platforms','Benefits Tools','Payroll Systems','Communication Platforms'],
    automationFeatures: ['Compensation Management','Benefits Administration','Payroll Planning','Communication Automation','Analytics Generation'],
    kpiMetrics: ['Compensation Quality','Benefits Success','Payroll Accuracy','Communication Effectiveness','Cost Efficiency'],
    customOptions: { compensationFocus: 'high', benefitsEfficiency: 'maximum', integrationLevel: 'comprehensive' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'compensation', enabled: true, name: 'Compensation Manager', description: 'Manages compensation' },
      { id: 'benefits', enabled: true, name: 'Benefits Administrator', description: 'Administers benefits' },
      { id: 'payroll', enabled: true, name: 'Payroll Planner', description: 'Plans payroll' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'hr_1', name: 'Compensation Management', category: 'Compensation', description: 'Manage compensation', level: 'expert' },
      { id: 'hr_2', name: 'Benefits Administration', category: 'Benefits', description: 'Administer benefits', level: 'expert' },
      { id: 'hr_3', name: 'Payroll Planning', category: 'Payroll', description: 'Plan payroll', level: 'expert' }
    ],
    personality: [
      { trait: 'Compensation Expertise', value: 10, description: 'Compensation expertise' },
      { trait: 'Benefits Focus', value: 10, description: 'Benefits oriented' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
