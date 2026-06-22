import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function WarehouseSecurityManagerPage() {
  const agent = {
    id: 'warehouse-security-manager',
    name: 'AI Warehouse Security Manager',
    title: 'Warehouse Security Manager',
    description: 'The AI Warehouse Security Manager manages warehouse security, monitors access control, coordinates security systems, and ensures protection of assets and personnel in warehouse facilities.",
    capabilities: ["Security Management","Access Control","Monitoring","Incident Response","System Coordination","Compliance","Reporting","Risk Assessment","Training","Continuous Improvement"],
    icon: Shield,
    color: '#3B82F6',
    type: 'employee' as const,
    humanCost: '$70k/year',
    aiCost: '$1.8k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'warehouse-security-manager',
    infrastructure: {
      status: 'online' as const,
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$5,708',
      tasksAutomatedDaily: 540,
      responseTime: '1.3s',
      accuracyRate: '96.2%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'manager',
      reportsTo: 'warehouse-manager',
      manages: ['safety-compliance-officer', 'security-specialist'],
    },
    specializedCapabilities: [
      'Security Management',
      'Access Control',
      'Monitoring',
      'Incident Response',
      'System Coordination',
      'Compliance',
      'Reporting',
      'Risk Assessment'
    ],
    integrationOptions: [
      'Security Systems',
      'Access Control',
      'Monitoring Platforms',
      'Incident Management',
      'Compliance Tools',
      'Analytics Platforms',
      'Emergency Systems'
    ],
    automationFeatures: [
      'Security Monitoring',
      'Access Control',
      'Incident Detection',
      'Response Coordination',
      'Compliance Checking',
      'Risk Assessment',
      'Report Generation'
    ],
    kpiMetrics: [
      'Security Incidents',
      'Access Compliance',
      'Monitoring Coverage',
      'Response Time',
      'System Reliability',
      'Compliance Rate',
      'Risk Reduction'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      securityLevel: 'maximum',
      complianceLevel: 'premium'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: false,
      anomalyDetection: true,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    agentType: 'learning',
    skills: [
      { id: 'wsm1', name: 'Security Management', category: 'Security', description: 'Manage security', level: 'expert' },
      { id: 'wsm2', name: 'Access Control', category: 'Access', description: 'Control access', level: 'expert' },
      { id: 'wsm3', name: 'Incident Response', category: 'Incident', description: 'Respond to incidents', level: 'expert' }
    ],
    personality: [
      { trait: 'Security Conscious', value: 10, description: 'Security-focused' },
      { trait: 'Vigilant', value: 10, description: 'Highly vigilant' },
      { trait: 'Protective', value: 10, description: 'Protective mindset' },
      { trait: 'Compliance', value: 9, description: 'Compliance-driven' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
