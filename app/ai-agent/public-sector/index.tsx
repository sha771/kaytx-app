import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';
import { Briefcase, FileText, Users, Building, Shield, AlertCircle, MapPin, Heart, Activity, Globe, Layout, PieChart, Megaphone, TrendingUp } from 'lucide-react-native';

const DEPARTMENT_AGENTS = [
  { id: 'neural-public-sector-hub', name: 'AI Neural Public Sector Hub', description: 'Central public sector coordination system', icon: Briefcase, color: '#1565C0' },
  { id: 'predictive-policy-analyzer', name: 'AI Predictive Policy Analyzer', description: 'Predictive policy analysis and impact assessment', icon: FileText, color: '#1565C0' },
  { id: 'real-time-citizen-services', name: 'AI Real-Time Citizen Services', description: 'Real-time citizen services and support', icon: Users, color: '#1565C0' },
  { id: 'cognitive-government-operations', name: 'AI Cognitive Government Operations', description: 'Government operations optimization with cognitive AI', icon: Building, color: '#1565C0' },
  { id: 'adaptive-regulatory-compliance', name: 'AI Adaptive Regulatory Compliance', description: 'Adaptive regulatory compliance management', icon: Shield, color: '#1565C0' },
  { id: 'intelligent-public-safety', name: 'AI Intelligent Public Safety', description: 'Intelligent public safety and security systems', icon: AlertCircle, color: '#1565C0' },
  { id: 'neural-urban-planning', name: 'AI Neural Urban Planning', description: 'Neural AI for urban planning and development', icon: MapPin, color: '#1565C0' },
  { id: 'predictive-social-services', name: 'AI Predictive Social Services', description: 'Predictive social services optimization', icon: Heart, color: '#1565C0' },
  { id: 'real-time-public-health', name: 'AI Real-Time Public Health', description: 'Real-time public health monitoring and response', icon: Activity, color: '#1565C0' },
  { id: 'cognitive-environmental-tracker', name: 'AI Cognitive Environmental Tracker', description: 'Environmental monitoring and tracking', icon: Globe, color: '#1565C0' },
  { id: 'automated-government-workflow', name: 'AI Automated Government Workflow', description: 'Automated government workflow orchestration', icon: Layout, color: '#1565C0' },
  { id: 'neural-budget-allocator', name: 'AI Neural Budget Allocator', description: 'Neural budget allocation and optimization', icon: PieChart, color: '#1565C0' },
  { id: 'adaptive-public-engagement', name: 'AI Adaptive Public Engagement', description: 'Adaptive public engagement and communication', icon: Megaphone, color: '#1565C0' },
  { id: 'intelligent-transparency-reporter', name: 'AI Intelligent Transparency Reporter', description: 'Government transparency and reporting', icon: FileText, color: '#1565C0' },
  { id: 'predictive-policy-impact', name: 'AI Predictive Policy Impact', description: 'Predictive policy impact analysis', icon: TrendingUp, color: '#1565C0' },
  { id: 'real-time-emergency-response', name: 'AI Real-Time Emergency Response', description: 'Real-time emergency response coordination', icon: AlertCircle, color: '#1565C0' },
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="government-public-sector"
      agents={DEPARTMENT_AGENTS}
    />
  );
}
