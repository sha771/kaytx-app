import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function EventSafetyDirectorPage() {
  const agent = {
    id: 'event-safety-director',
    name: 'AI Event Safety Director',
    title: 'AI Event Safety Director',
    description: 'The AI Event Safety Director manages event safety protocols, oversees risk assessment, coordinates emergency response, and ensures secure event environments for all attendees and staff.',
    capabilities: ["Event Safety","Risk Assessment","Emergency Response","Security Management","Safety Protocols","Crowd Control","Emergency Planning","Safety Compliance","Risk Management","Security Operations"],
    icon: Shield,
    color: '#F44336',
    type: 'employee' as const,
    humanCost: '$125k/year',
    aiCost: '$4k/year',
    efficiency: '31x efficiency improvement',
    replacesRole: 'event-safety-director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$10,000',
      tasksAutomatedDaily: 400,
      responseTime: '1.1s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Event Management',
      level: 'director',
      reportsTo: 'chief-event-officer',
      manages: ['security-manager', 'risk-assessor', 'emergency-coordinator'],
    },
    specializedCapabilities: [
      'Event Safety',
      'Risk Assessment',
      'Emergency Response',
      'Security Management',
      'Safety Protocols',
      'Crowd Control',
      'Emergency Planning',
      'Safety Compliance'
    ],
    integrationOptions: [
      'Security Systems',
      'Risk Assessment',
      'Emergency Response',
      'Safety Platforms',
      'Crowd Management',
      'Compliance Tools',
      'Security Operations',
      'Emergency Planning'
    ],
    automationFeatures: [
      'Safety Management',
      'Risk Assessment',
      'Emergency Response',
      'Security Management',
      'Safety Protocols',
      'Crowd Control',
      'Emergency Planning',
      'Safety Compliance'
    ],
    kpiMetrics: [
      'Safety Incident Rate',
      'Risk Mitigation',
      'Emergency Response Time',
      'Security Effectiveness',
      'Safety Compliance',
      'Crowd Control Success',
      'Emergency Planning Quality',
      'Guest Safety Rating'
    ],
    customOptions: {
      safetyStandard: 'highest',
      riskTolerance: 'minimal',
      emergencyPreparedness: 'comprehensive',
      securityLevel: 'robust',
      compliancePriority: 'strict'
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
      { id: 'safety', enabled: true, name: 'Safety Monitor', description: 'Monitors event safety' },
      { id: 'risk', enabled: true, name: 'Risk Assessor', description: 'Assesses safety risks' },
      { id: 'emergency', enabled: true, name: 'Emergency Responder', description: 'Coordinates emergency response' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'esafety_1', name: 'Event Safety', category: 'Safety', description: 'Manage event safety', level: 'expert' },
      { id: 'esafety_2', name: 'Risk Assessment', category: 'Risk', description: 'Assess event risks', level: 'expert' },
      { id: 'esafety_3', name: 'Emergency Response', category: 'Emergency', description: 'Coordinate emergency response', level: 'expert' },
      { id: 'esafety_4', name: 'Security Management', category: 'Security', description: 'Manage event security', level: 'expert' },
      { id: 'esafety_5', name: 'Safety Compliance', category: 'Compliance', description: 'Ensure safety compliance', level: 'expert' }
    ],
    personality: [
      { trait: 'Safety Focus', value: 10, description: 'Safety-obsessed' },
      { trait: 'Risk Awareness', value: 10, description: 'Highly risk-aware' },
      { trait: 'Emergency Ready', value: 10, description: 'Emergency prepared' },
      { trait: 'Compliance', value: 10, description: 'Compliance-focused' },
      { trait: 'Protection Instinct', value: 10, description: 'Protective mindset' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}