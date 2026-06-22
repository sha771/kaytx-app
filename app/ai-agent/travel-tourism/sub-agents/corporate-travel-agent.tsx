import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Plane } from 'lucide-react-native';

export default function CorporateTravelAgentPage() {
  const agent = {
    id: 'corporate-travel-agent',
    name: 'AI Corporate Travel Agent',
    title: 'AI Corporate Travel Agent',
    description: 'The AI Corporate Travel Agent manages business travel, coordinates corporate bookings, and ensures efficient corporate travel experiences.',
    capabilities: ["Task Automation","Data Processing","Corporate Travel Management","Business Booking","Policy Compliance","Expense Management","Communication","Corporate Service","Service Delivery","Corporate Satisfaction"],
    icon: Plane,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$46k/year',
    aiCost: '$2k/year',
    efficiency: '23x efficiency improvement',
    replacesRole: 'corporate-travel-agent',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,700',
      tasksAutomatedDaily: 260,
      responseTime: '0.6s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'operational',
      reportsTo: 'booking-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Corporate Travel Management',
      'Business Booking',
      'Policy Compliance',
      'Expense Management',
      'Communication',
      'Corporate Service',
      'Service Delivery',
      'Corporate Satisfaction'
    ],
    integrationOptions: [
      'Corporate Travel Platforms',
      'Expense Management Systems',
      'Policy Compliance Tools',
      'Communication Platforms',
      'Corporate Apps',
      'Booking Systems',
      'Analytics Platforms',
      'Feedback Systems'
    ],
    automationFeatures: [
      'Corporate Booking',
      'Policy Enforcement',
      'Expense Tracking',
      'Corporate Communication',
      'Travel Approval',
      'Compliance Monitoring',
      'Reporting Generation',
      'Feedback Collection'
    ],
    kpiMetrics: [
      'Booking Efficiency',
      'Policy Compliance',
      'Cost Savings',
      'Corporate Satisfaction',
      'Service Excellence',
      'Communication Effectiveness',
      'Corporate Experience',
      'Travel Efficiency'
    ],
    customOptions: {
      corporateFocus: 'high',
      policyCompliance: 'strict',
      costEfficiency: 'optimized',
      serviceQuality: 'premium',
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
      { id: 'corporate', enabled: true, name: 'Corporate Engine', description: 'Manages corporate travel' },
      { id: 'policy', enabled: true, name: 'Policy Monitor', description: 'Monitors policy compliance' },
      { id: 'expense', enabled: true, name: 'Expense Tracker', description: 'Tracks travel expenses' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'travel_1', name: 'Corporate Travel Management', category: 'Corporate', description: 'Manage corporate travel', level: 'expert' },
      { id: 'travel_2', name: 'Policy Compliance', category: 'Compliance', description: 'Ensure compliance', level: 'expert' },
      { id: 'travel_3', name: 'Expense Management', category: 'Finance', description: 'Manage expenses', level: 'expert' },
      { id: 'travel_4', name: 'Business Booking', category: 'Operations', description: 'Handle business bookings', level: 'expert' },
      { id: 'travel_5', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' }
    ],
    personality: [
      { trait: 'Professionalism', value: 10, description: 'Highly professional' },
      { trait: 'Efficiency', value: 10, description: 'Highly efficient' },
      { trait: 'Service Excellence', value: 10, description: 'Excellent service delivery' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Compliance', value: 9, description: 'Strong compliance focus' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
