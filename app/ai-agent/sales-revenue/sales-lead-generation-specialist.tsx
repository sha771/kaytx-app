import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function SalesLeadGenerationSpecialistPage() {
  const agent = {
    id: 'sales-lead-generation-specialist',
    name: 'AI Sales Lead Generation Specialist',
    title: 'AI Sales Lead Generation Specialist',
    description: 'The AI Sales Lead Generation Specialist identifies and qualifies high-quality leads through automated prospecting and data analysis.',
    capabilities: ["Task Automation","Data Processing","Lead Generation","Lead Qualification","Prospecting","Communication","Analytics","Sales Intelligence"],
    icon: Target,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$68k/year',
    aiCost: '$4k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'lead-generation-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,300',
      tasksAutomatedDaily: 295,
      responseTime: '0.6s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'specialist',
      reportsTo: 'sales-pipeline-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Lead Generation',
      'Lead Qualification',
      'Prospecting',
      'Communication',
      'Analytics',
      'Sales Intelligence'
    ],
    integrationOptions: [
      'CRM Systems',
      'Lead Generation Platforms',
      'Data Sources',
      'Communication Platforms',
      'Sales Systems',
      'Analytics Tools',
      'Marketing Data',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Lead Generation',
      'Lead Qualification',
      'Prospecting',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Sales Intelligence'
    ],
    kpiMetrics: [
      'Lead Quality',
      'Lead Quantity',
      'Qualification Rate',
      'Communication Effectiveness',
      'Sales Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      leadFocus: 'high',
      qualificationEfficiency: 'maximum',
      prospectingAccuracy: 'optimized',
      integrationLevel: 'comprehensive'
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
      { id: 'lead', enabled: true, name: 'Lead Generator', description: 'Generates leads' },
      { id: 'qualification', enabled: true, name: 'Lead Qualifier', description: 'Qualifies leads' },
      { id: 'prospecting', enabled: true, name: 'Prospecting Engine', description: 'Prospects customers' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_1', name: 'Lead Generation', category: 'Lead', description: 'Generate leads', level: 'expert' },
      { id: 'sales_2', name: 'Lead Qualification', category: 'Qualification', description: 'Qualify leads', level: 'expert' },
      { id: 'sales_3', name: 'Prospecting', category: 'Prospecting', description: 'Prospect customers', level: 'expert' },
      { id: 'sales_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'sales_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Lead Expertise', value: 10, description: 'Lead expertise' },
      { trait: 'Qualification Focus', value: 10, description: 'Qualification oriented' },
      { trait: 'Prospecting Skills', value: 10, description: 'Prospecting skilled' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
