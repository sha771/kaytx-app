import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CheckCircle } from 'lucide-react-native';

export default function QualityAssuranceSpecialistPage() {
  const agent = {
    id: 'quality-assurance-specialist',
    name: 'AI Quality Assurance Specialist',
    title: 'AI Quality Assurance Specialist',
    description: 'The AI Quality Assurance Specialist manages quality control programs, ensures product standards, and maintains quality across agricultural outputs.',
    capabilities: ["Task Automation","Data Processing","Quality Assurance","Quality Control","Standards Enforcement","Testing Management","Compliance Monitoring","Quality Reporting","Process Improvement","Certification Management"],
    icon: CheckCircle,
    color: '#4CAF50',
    type: 'employee' as const,
    humanCost: '$70k/year',
    aiCost: '$2.5k/year',
    efficiency: '28x efficiency improvement',
    replacesRole: 'quality-assurance-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$5,625',
      tasksAutomatedDaily: 475,
      responseTime: '2.0s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Agriculture',
      level: 'specialist',
      reportsTo: 'vp-crop-production',
      manages: [],
    },
    specializedCapabilities: [
      'Quality Assurance',
      'Quality Control',
      'Standards Enforcement',
      'Testing Management',
      'Compliance Monitoring',
      'Quality Reporting',
      'Process Improvement',
      'Certification Management',
      'Product Standards',
      'Quality Metrics'
    ],
    integrationOptions: [
      'Quality Management Systems',
      'Testing Platforms',
      'Compliance Tools',
      'Standards Software',
      'Certification Systems',
      'Reporting Platforms',
      'Process Improvement',
      'Analytics Platforms'
    ],
    automationFeatures: [
      'Quality Control',
      'Standards Enforcement',
      'Testing Management',
      'Compliance Monitoring',
      'Quality Reporting',
      'Process Improvement',
      'Certification Tracking',
      'Report Generation'
    ],
    kpiMetrics: [
      'Quality Score',
      'Compliance Rate',
      'Test Coverage',
      'Standards Adherence',
      'Process Improvement',
      'Certification Success',
      'Product Quality',
      'Quality Metrics'
    ],
    customOptions: {
      qualityStandard: 'premium',
      complianceLevel: 'strict',
      testCoverage: 'comprehensive',
      processImprovement: 'continuous',
      certificationLevel: 'high'
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
      { id: 'quality', enabled: true, name: 'Quality Monitor', description: 'Monitors quality metrics' },
      { id: 'compliance', enabled: true, name: 'Compliance Checker', description: 'Checks quality compliance' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'qas_1', name: 'Quality Assurance', category: 'Quality', description: 'Assure quality standards', level: 'expert' },
      { id: 'qas_2', name: 'Quality Control', category: 'Control', description: 'Control quality processes', level: 'expert' },
      { id: 'qas_3', name: 'Standards Enforcement', category: 'Standards', description: 'Enforce quality standards', level: 'expert' }
    ],
    personality: [
      { trait: 'Quality', value: 10, description: 'Quality-focused' },
      { trait: 'Standards', value: 10, description: 'Standards-oriented' },
      { trait: 'Precision', value: 9, description: 'Precision-conscious' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
