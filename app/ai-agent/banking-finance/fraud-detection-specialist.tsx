import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function FraudDetectionSpecialistPage() {
  const agent = {
    id: 'fraud-detection-specialist',
    name: 'AI Fraud Detection Specialist',
    title: 'AI Fraud Detection Specialist',
    description: 'The AI Fraud Detection Specialist monitors transactions for fraudulent activity, investigates suspicious patterns, implements fraud prevention measures, and protects the bank from financial crimes.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Fraud Detection","Transaction Monitoring","Pattern Recognition","Investigation","Prevention","Analytics","Reporting"],
    icon: Shield,
    color: '#C62828',
    type: 'employee' as const,
    humanCost: '$80k/year',
    aiCost: '$2k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'fraud-detection-specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,500',
      tasksAutomatedDaily: 440,
      responseTime: '1.5s',
      accuracyRate: '99.0%',
    },
    hierarchy: {
      department: 'Banking & Finance',
      level: 'team_lead',
      reportsTo: 'vp-risk-management',
      manages: ['aml-analyst', 'kyc-specialist', 'audit-specialist'],
    },
    specializedCapabilities: [
      'Fraud Detection',
      'Transaction Monitoring',
      'Pattern Recognition',
      'Investigation',
      'Prevention Strategies',
      'Risk Assessment',
      'Analytics',
      'Reporting'
    ],
    integrationOptions: [
      'Fraud Detection Systems',
      'Transaction Monitoring Platforms',
      'Analytics Tools',
      'Machine Learning Platforms',
      'Case Management Systems',
      'Reporting Tools',
      'Alert Systems',
      'Data Warehouses'
    ],
    automationFeatures: [
      'Transaction Monitoring',
      'Fraud Detection',
      'Alert Generation',
      'Case Management',
      'Investigation Support',
      'Reporting',
      'Pattern Analysis',
      'Risk Scoring'
    ],
    kpiMetrics: [
      'Fraud Detection Rate',
      'False Positive Rate',
      'Response Time',
      'Loss Prevention',
      'Investigation Efficiency',
      'Alert Accuracy',
      'Case Resolution',
      'Risk Reduction'
    ],
    customOptions: {
      sensitivityLevel: 'high',
      responseSpeed: 'immediate',
      monitoringScope: 'comprehensive',
      reportingLevel: 'detailed',
      preventionFocus: 'proactive'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
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
      { id: 'fraud', enabled: true, name: 'Fraud Detector', description: 'Advanced fraud detection algorithms' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects unusual transaction patterns' },
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Predicts fraud attempts' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'fraud_1', name: 'Fraud Detection', category: 'Security', description: 'Detect fraudulent activities', level: 'expert' },
      { id: 'fraud_2', name: 'Transaction Monitoring', category: 'Monitoring', description: 'Monitor transactions for fraud', level: 'expert' },
      { id: 'fraud_3', name: 'Pattern Recognition', category: 'Analytics', description: 'Recognize fraud patterns', level: 'expert' },
      { id: 'fraud_4', name: 'Investigation', category: 'Investigation', description: 'Investigate fraud cases', level: 'advanced' },
      { id: 'fraud_5', name: 'Prevention', category: 'Prevention', description: 'Implement fraud prevention', level: 'expert' }
    ],
    personality: [
      { trait: 'Vigilance', value: 10, description: 'Constantly vigilant for fraud' },
      { trait: 'Analytical Thinking', value: 10, description: 'Strong analytical capabilities' },
      { trait: 'Attention to Detail', value: 10, description: 'Meticulous attention to detail' },
      { trait: 'Quick Response', value: 9, description: 'Rapid response to threats' },
      { trait: 'Risk Awareness', value: 10, description: 'Highly risk-conscious' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
