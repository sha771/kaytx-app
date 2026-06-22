import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Copyright } from 'lucide-react-native';

export default function LegalIntellectualPropertyPage() {
  const agent = {
    id: 'legal-intellectual-property',
    name: 'AI Legal Intellectual Property',
    title: 'AI Legal Intellectual Property',
    description: 'The AI Legal Intellectual Property manages intellectual property rights and protections.',
    capabilities: ["Task Automation","Data Processing","IP Management","Patent Protection","Trademark Management","Communication","Analytics","Legal Intelligence"],
    icon: Copyright,
    color: '#EF4444',
    type: 'agent' as const,
    humanCost: '$94k/year',
    aiCost: '$5k/year',
    efficiency: '19x efficiency improvement',
    replacesRole: 'legal-ip-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$7,400',
      tasksAutomatedDaily: 376,
      responseTime: '0.5s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Legal & Compliance',
      level: 'management',
      reportsTo: 'clo',
      manages: [],
    },
    specializedCapabilities: ['IP Management','Patent Protection','Trademark Management','Communication','Analytics','Legal Intelligence'],
    integrationOptions: ['IP Platforms','Patent Tools','Trademark Systems','Communication Platforms'],
    automationFeatures: ['IP Management','Patent Protection','Trademark Management','Communication Automation','Analytics Generation'],
    kpiMetrics: ['IP Quality','Patent Success','Trademark Impact','Communication Effectiveness','Cost Efficiency'],
    customOptions: { ipFocus: 'high', patentEfficiency: 'maximum', integrationLevel: 'comprehensive' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'ip', enabled: true, name: 'IP Manager', description: 'Manages IP' },
      { id: 'patent', enabled: true, name: 'Patent Protector', description: 'Protects patents' },
      { id: 'trademark', enabled: true, name: 'Trademark Manager', description: 'Manages trademarks' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'legal_1', name: 'IP Management', category: 'IP', description: 'Manage IP', level: 'expert' },
      { id: 'legal_2', name: 'Patent Protection', category: 'Patent', description: 'Protect patents', level: 'expert' },
      { id: 'legal_3', name: 'Trademark Management', category: 'Trademark', description: 'Manage trademarks', level: 'expert' }
    ],
    personality: [
      { trait: 'IP Expertise', value: 10, description: 'IP expertise' },
      { trait: 'Patent Focus', value: 10, description: 'Patent oriented' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
