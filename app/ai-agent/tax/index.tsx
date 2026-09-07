import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';
import { Briefcase, Calculator, Shield, Search, FileCheck, TrendingUp, FileText, Scale, BarChart3, Users, AlertTriangle, MessageSquare, Layout, Globe, Target, Star, PieChart } from 'lucide-react-native';

const DEPARTMENT_AGENTS = [
  { id: 'neural-tax-hub', name: 'AI Neural Tax Hub', description: 'Central tax coordination and management system', icon: Briefcase, color: '#2E7D32' },
  { id: 'predictive-tax-planner', name: 'AI Predictive Tax Planner', description: 'Strategic tax planning with predictive analytics', icon: Calculator, color: '#2E7D32' },
  { id: 'real-time-compliance-monitor', name: 'AI Real-Time Compliance Monitor', description: 'Real-time tax compliance monitoring and alerts', icon: Shield, color: '#2E7D32' },
  { id: 'cognitive-tax-researcher', name: 'AI Cognitive Tax Researcher', description: 'Tax law research and interpretation', icon: Search, color: '#2E7D32' },
  { id: 'adaptive-filing-assistant', name: 'AI Adaptive Filing Assistant', description: 'Automated tax filing preparation and submission', icon: FileCheck, color: '#2E7D32' },
  { id: 'intelligent-tax-calculator', name: 'AI Intelligent Tax Calculator', description: 'Advanced tax calculation and optimization', icon: Calculator, color: '#2E7D32' },
  { id: 'neural-audit-assistant', name: 'AI Neural Audit Assistant', description: 'Tax audit preparation and support', icon: AlertTriangle, color: '#2E7D32' },
  { id: 'predictive-tax-optimization', name: 'AI Predictive Tax Optimization', description: 'Tax optimization strategies and planning', icon: TrendingUp, color: '#2E7D32' },
  { id: 'real-time-reporting-platform', name: 'AI Real-Time Reporting Platform', description: 'Real-time tax reporting and documentation', icon: BarChart3, color: '#2E7D32' },
  { id: 'cognitive-tax-advisor', name: 'AI Cognitive Tax Advisor', description: 'Intelligent tax advisory services', icon: MessageSquare, color: '#2E7D32' },
  { id: 'automated-tax-workflow', name: 'AI Automated Tax Workflow', description: 'End-to-end tax workflow automation', icon: Layout, color: '#2E7D32' },
  { id: 'neural-jurisdiction-expert', name: 'AI Neural Jurisdiction Expert', description: 'Multi-jurisdiction tax expertise', icon: Globe, color: '#2E7D32' },
  { id: 'adaptive-tax-strategist', name: 'AI Adaptive Tax Strategist', description: 'Adaptive tax strategy development', icon: Target, color: '#2E7D32' },
  { id: 'intelligent-credit-finder', name: 'AI Intelligent Credit Finder', description: 'Tax credit identification and optimization', icon: Star, color: '#2E7D32' },
  { id: 'predictive-liability-calculator', name: 'AI Predictive Liability Calculator', description: 'Tax liability forecasting and calculation', icon: Calculator, color: '#2E7D32' },
  { id: 'real-time-document-processor', name: 'AI Real-Time Document Processor', description: 'Tax document processing and management', icon: FileText, color: '#2E7D32' },
  { id: 'cognitive-regulatory-monitor', name: 'AI Cognitive Regulatory Monitor', description: 'Tax regulation monitoring and updates', icon: Scale, color: '#2E7D32' },
  { id: 'automated-tax-preparation', name: 'AI Automated Tax Preparation', description: 'Automated tax return preparation', icon: FileCheck, color: '#2E7D32' },
  { id: 'neural-tax-analyst', name: 'AI Neural Tax Analyst', description: 'Comprehensive tax analysis and insights', icon: PieChart, color: '#2E7D32' },
  { id: 'adaptive-risk-assessor', name: 'AI Adaptive Risk Assessor', description: 'Tax risk assessment and mitigation', icon: AlertTriangle, color: '#2E7D32' },
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="tax"
      agents={DEPARTMENT_AGENTS}
    />
  );
}
