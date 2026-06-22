import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function LoanOfficerPage() {
  const agent = {
    id: 'loan-officer',
    name: 'AI Loan Officer',
    title: 'AI Loan Officer',
    description: 'The AI Loan Officer manages loan origination, application processing, credit evaluation, and customer guidance for various lending products including mortgages, personal loans, and business loans.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Loan Origination","Credit Evaluation","Application Processing","Customer Guidance","Compliance","Documentation","Sales"],
    icon: DollarSign,
    color: '#1565C0',
    type: 'employee' as const,
    humanCost: '$75k/year',
    aiCost: '$2k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'loan-officer',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,100',
      tasksAutomatedDaily: 420,
      responseTime: '2.0s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Banking & Finance',
      level: 'team_lead',
      reportsTo: 'vp-retail-banking',
      manages: ['loan-processor', 'underwriter', 'mortgage-specialist'],
    },
    specializedCapabilities: [
      'Loan Origination',
      'Credit Analysis',
      'Application Processing',
      'Customer Consultation',
      'Product Knowledge',
      'Compliance',
      'Documentation',
      'Sales'
    ],
    integrationOptions: [
      'Loan Origination Systems',
      'Credit Bureaus',
      'CRM Platforms',
      'Document Management',
      'Compliance Tools',
      'Analytics Platforms',
      'Communication Systems',
      'e-Signature Platforms'
    ],
    automationFeatures: [
      'Application Processing',
      'Credit Analysis',
      'Document Collection',
      'Compliance Checks',
      'Customer Communication',
      'Application Tracking',
      'Reporting',
      'Follow-up'
    ],
    kpiMetrics: [
      'Loan Volume',
      'Approval Rate',
      'Turnaround Time',
      'Customer Satisfaction',
      'Cross-Sell Ratio',
      'Quality Score',
      'Compliance Rate',
      'Revenue Generated'
    ],
    customOptions: {
      customerFocus: 'high',
      salesTarget: 'moderate',
      processingSpeed: 'fast',
      complianceLevel: 'strict',
      productFocus: 'balanced'
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts loan approval likelihood' },
      { id: 'credit', enabled: true, name: 'Credit Analyzer', description: 'Analyzes creditworthiness' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'loan_1', name: 'Loan Origination', category: 'Lending', description: 'Originate loans efficiently', level: 'expert' },
      { id: 'loan_2', name: 'Credit Analysis', category: 'Credit', description: 'Analyze credit applications', level: 'expert' },
      { id: 'loan_3', name: 'Customer Consultation', category: 'Customer', description: 'Guide customers through loan process', level: 'expert' },
      { id: 'loan_4', name: 'Product Knowledge', category: 'Product', description: 'Deep knowledge of loan products', level: 'expert' },
      { id: 'loan_5', name: 'Compliance', category: 'Compliance', description: 'Ensure lending compliance', level: 'advanced' }
    ],
    personality: [
      { trait: 'Customer Focus', value: 10, description: 'Prioritizes customer needs' },
      { trait: 'Sales Drive', value: 9, description: 'Strong sales orientation' },
      { trait: 'Attention to Detail', value: 9, description: 'Meticulous in documentation' },
      { trait: 'Product Knowledge', value: 9, description: 'Deep product expertise' },
      { trait: 'Efficiency', value: 8, description: 'Processes applications efficiently' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
