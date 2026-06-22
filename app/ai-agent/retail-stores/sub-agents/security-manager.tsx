import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ShieldCheck } from 'lucide-react-native';

export default function SecurityManagerPage() {
  const agent = {
    id: 'security-manager',
    name: 'AI Security Manager',
    title: 'AI Security Manager',
    description: 'The AI Security Manager manages security operations, supervises security staff, monitors surveillance systems, and ensures store safety and asset protection.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Security Operations","Staff Supervision","Surveillance Monitoring","Access Control","Emergency Response","Safety Management","Incident Response"],
    icon: ShieldCheck,
    color: '#37474F',
    type: 'employee' as const,
    humanCost: '$65k/year',
    aiCost: '$1.5k/year',
    efficiency: '43x efficiency improvement',
    replacesRole: 'security-manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,300',
      tasksAutomatedDaily: 400,
      responseTime: '1.1s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Retail & Stores',
      level: 'manager',
      reportsTo: 'loss-prevention-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Security Operations',
      'Staff Supervision',
      'Surveillance Monitoring',
      'Access Control',
      'Emergency Response',
      'Safety Management',
      'Incident Response',
      'Asset Protection'
    ],
    integrationOptions: [
      'Security Systems',
      'Surveillance Platforms',
      'Access Control Systems',
      'Communication Platforms',
      'Emergency Systems',
      'Analytics Tools',
      'Reporting Systems'
    ],
    automationFeatures: [
      'Security Monitoring',
      'Staff Supervision',
      'Surveillance Analysis',
      'Access Control',
      'Emergency Response',
      'Safety Monitoring',
      'Incident Response',
      'Report Generation'
    ],
    kpiMetrics: [
      'Security Incidents',
      'Response Time',
      'Surveillance Coverage',
      'Access Control Effectiveness',
      'Staff Performance',
      'Safety Incidents',
      'Asset Protection',
      'Emergency Response'
    ],
    customOptions: {
      securityFocus: 'high',
      responseSpeed: 'fast',
      surveillanceCoverage: 'high',
      safetyPriority: 'high',
      staffTraining: 'high'
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
      { id: 'surveillance', enabled: true, name: 'Surveillance Analyzer', description: 'Analyzes surveillance footage' },
      { id: 'access', enabled: true, name: 'Access Controller', description: 'Controls access systems' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sec_mgr_1', name: 'Security Operations', category: 'Security', description: 'Manage security operations', level: 'expert' },
      { id: 'sec_mgr_2', name: 'Staff Supervision', category: 'Supervision', description: 'Supervise security staff', level: 'expert' },
      { id: 'sec_mgr_3', name: 'Surveillance Monitoring', category: 'Surveillance', description: 'Monitor surveillance', level: 'expert' },
      { id: 'sec_mgr_4', name: 'Emergency Response', category: 'Emergency', description: 'Respond to emergencies', level: 'advanced' },
      { id: 'sec_mgr_5', name: 'Safety Management', category: 'Safety', description: 'Manage safety', level: 'advanced' }
    ],
    personality: [
      { trait: 'Vigilance', value: 10, description: 'Highly vigilant' },
      { trait: 'Leadership', value: 10, description: 'Strong security leader' },
      { trait: 'Response Speed', value: 10, description: 'Quick responder' },
      { trait: 'Integrity', value: 9, description: 'High integrity' },
      { trait: 'Problem Solving', value: 9, description: 'Excellent problem solver' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
