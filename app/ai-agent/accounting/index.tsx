import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';
import { Calculator } from 'lucide-react-native';

const DEPARTMENT_AGENTS = [
  { id: 'accounting-manager', name: 'Accounting Manager', description: 'Accounting Manager AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'audit-manager', name: 'Audit Manager', description: 'Audit Manager AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'auditor', name: 'AI Auditor', description: 'AI Auditor AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'bookkeeper', name: 'AI Bookkeeper', description: 'AI Bookkeeper AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'budget-manager', name: 'Budget Manager', description: 'Budget Manager AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'cfo', name: 'CFO', description: 'CFO AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'controller', name: 'Controller', description: 'Controller AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'expense-manager', name: 'AI Expense Manager', description: 'AI Expense Manager AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'finance-analyst', name: 'Finance Analyst', description: 'Finance Analyst AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'finance-manager', name: 'Finance Manager', description: 'Finance Manager AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'financial-planner', name: 'AI Financial Planner', description: 'AI Financial Planner AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'invoice-processor', name: 'AI Invoice Processor', description: 'AI Invoice Processor AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'payroll-manager', name: 'AI Payroll Manager', description: 'AI Payroll Manager AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'tax-analyst', name: 'AI Tax Analyst', description: 'AI Tax Analyst AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'tax-specialist', name: 'Tax Specialist', description: 'Tax Specialist AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'treasury-analyst', name: 'Treasury Analyst', description: 'Treasury Analyst AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'vp-accounting', name: 'VP Accounting', description: 'VP Accounting AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'vp-finance', name: 'VP Finance', description: 'VP Finance AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'vp-investor-relations', name: 'VP Investor Relations', description: 'VP Investor Relations AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'vp-treasury', name: 'VP Treasury', description: 'VP Treasury AI Agent', icon: Calculator, color: '#0D47A1' }
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="finance-accounting"
      agents={DEPARTMENT_AGENTS}
    />
  );
}
