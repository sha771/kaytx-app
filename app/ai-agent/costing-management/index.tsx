import React from 'react';
import { Briefcase, Calculator, Wallet, DollarSign, Users, TrendingUp, PiggyBank, LineChart, CreditCard, BarChart3, Layout, PieChart, Banknote, Shield, Scale } from 'lucide-react-native';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';

const DEPARTMENT_AGENTS = [
  { id: 'neural-costing-hub', name: 'AI Neural Costing Hub', description: 'Central costing coordination and management system', icon: Briefcase, color: '#C62828' },
  { id: 'predictive-cost-analyzer', name: 'AI Predictive Cost Analyzer', description: 'Predictive cost analysis and forecasting', icon: Calculator, color: '#C62828' },
  { id: 'real-time-budget-tracker', name: 'AI Real-Time Budget Tracker', description: 'Real-time budget tracking and management', icon: Wallet, color: '#C62828' },
  { id: 'cognitive-financial-planner', name: 'AI Cognitive Financial Planner', description: 'Intelligent financial planning and analysis', icon: DollarSign, color: '#C62828' },
  { id: 'adaptive-resource-allocator', name: 'AI Adaptive Resource Allocator', description: 'Adaptive resource allocation and optimization', icon: Users, color: '#C62828' },
  { id: 'intelligent-profitability-analyzer', name: 'AI Intelligent Profitability Analyzer', description: 'Profitability analysis and optimization', icon: TrendingUp, color: '#C62828' },
  { id: 'neural-cost-reduction', name: 'AI Neural Cost Reduction', description: 'Neural cost reduction and efficiency improvement', icon: PiggyBank, color: '#C62828' },
  { id: 'predictive-expense-forecaster', name: 'AI Predictive Expense Forecaster', description: 'Predictive expense forecasting and management', icon: LineChart, color: '#C62828' },
  { id: 'real-time-pricing-strategy', name: 'AI Real-Time Pricing Strategy', description: 'Real-time pricing strategy and optimization', icon: CreditCard, color: '#C62828' },
  { id: 'cognitive-cost-modeler', name: 'AI Cognitive Cost Modeler', description: 'Intelligent cost modeling and simulation', icon: BarChart3, color: '#C62828' },
  { id: 'automated-costing-workflow', name: 'AI Automated Costing Workflow', description: 'Automated costing workflow orchestration', icon: Layout, color: '#C62828' },
  { id: 'neural-budget-optimizer', name: 'AI Neural Budget Optimizer', description: 'Neural budget optimization and planning', icon: PieChart, color: '#C62828' },
  { id: 'adaptive-investment-analyzer', name: 'AI Adaptive Investment Analyzer', description: 'Adaptive investment analysis and recommendations', icon: Banknote, color: '#C62828' },
  { id: 'intelligent-cost-controller', name: 'AI Intelligent Cost Controller', description: 'Intelligent cost control and monitoring', icon: Shield, color: '#C62828' },
  { id: 'predictive-margin-analyzer', name: 'AI Predictive Margin Analyzer', description: 'Predictive margin analysis and optimization', icon: Scale, color: '#C62828' },
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="costing-management"
      agents={DEPARTMENT_AGENTS}
    />
  );
}
