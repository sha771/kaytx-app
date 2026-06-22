import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ShieldAlert } from 'lucide-react-native';

export default function LossPreventionManagerPage() {
  const agent = {
    id: 'loss-prevention-manager',
    name: 'AI Loss Prevention Manager',
    title: 'AI Loss Prevention Manager',
    description: 'The AI Loss Prevention Manager oversees loss prevention initiatives, manages security operations, investigates incidents, and minimizes shrinkage and theft.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Loss Prevention","Security Management","Incident Investigation","Shrinkage Reduction","Risk Assessment","Policy Enforcement","Team Leadership"],
    icon: ShieldAlert,
    color: '#424242',
    type: 'employee' as const,
    humanCost: '$75k/year',
    aiCost: '$1.8k/year',
    efficiency: '41x efficiency improvement',
    replacesRole: 'loss-prevention-manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,100',
      tasksAutomatedDaily: 450,
      responseTime: '1.2s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Retail & Stores',
      level: 'manager',
      reportsTo: 'vp-loss-prevention',
      manages: ['security-manager', 'fraud-investigator', 'audit-specialist'],
    },
    specializedCapabilities: [
      'Loss Prevention Strategy',
      'Security Management',
      'Incident Investigation',
      'Shrinkage Reduction',
      'Risk Assessment',
      'Policy Enforcement',
      'Team Leadership',
      'Compliance'
    ],
    integrationOptions: [
      'Security Systems',
      'Surveillance Platforms',
      'Incident Management',
      'Analytics Tools',
      'Communication Systems',
      'Audit Systems',
      'Reporting Platforms'
    ],
    automationFeatures: [
      'Loss Prevention',
      'Security Monitoring',
      'Incident Investigation',
      'Risk Assessment',
      'Policy Enforcement',
      'Shrinkage Tracking',
      'Report Generation',
      'Team Coordination'
    ],
    kpiMetrics: [
      'Shrinkage Rate',
      'Incident Resolution',
      'Security Effectiveness',
      'Risk Mitigation',
      'Policy Compliance',
      'Team Performance',
      'Cost Savings',
      'Investigation Accuracy'
    ],
    customOptions: {
      securityFocus: 'high',
      shrinkageReduction: 'high',
      riskManagement: 'high',
      policyEnforcement: 'strict',
      teamDevelopment: 'high'
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
      { id: 'risk', enabled: true, name: 'Risk Analyzer', description: 'Analyzes security risks' },
      { id: 'shrink', enabled: true, name: 'Shrinkage Predictor', description: 'Predicts shrinkage patterns' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'lp_mgr_1', name: 'Loss Prevention', category: 'Security', description: 'Prevent losses', level: 'expert' },
      { id: 'lp_mgr_2', name: 'Security Management', category: 'Security', description: 'Manage security operations', level: 'expert' },
      { id: 'lp_mgr_3', name: 'Incident Investigation', category: 'Investigation', description: 'Investigate incidents', level: 'expert' },
      { id: 'lp_mgr_4', name: 'Risk Assessment', category: 'Risk', description: 'Assess security risks', level: 'advanced' },
      { id: 'lp_mgr_5', name: 'Policy Enforcement', category: 'Policy', description: 'Enforce policies', level: 'advanced' }
    ],
    personality: [
      { trait: 'Vigilance', value: 10, description: 'Highly vigilant' },
      { trait: 'Integrity', value: 10, description: 'High integrity' },
      { trait: 'Analytical', value: 9, description: 'Analytical thinker' },
      { trait: 'Leadership', value: 9, description: 'Strong security leader' },
      { trait: 'Problem Solving', value: 9, description: 'Excellent problem solver' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
