import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';
import { DollarSign, Landmark, Users } from 'lucide-react-native';

const DEPARTMENT_AGENTS = [
  { id: 'chief-banking-officer', name: 'Chief Banking Officer', description: 'Chief Banking Officer AI Agent', icon: DollarSign, color: '#2563EB' },
  { id: 'vp-retail-banking', name: 'VP Retail Banking', description: 'VP Retail Banking AI Agent', icon: Landmark, color: '#2563EB' },
  { id: 'vp-commercial-banking', name: 'VP Commercial Banking', description: 'VP Commercial Banking AI Agent', icon: Landmark, color: '#2563EB' },
  { id: 'vp-investment-banking', name: 'VP Investment Banking', description: 'VP Investment Banking AI Agent', icon: DollarSign, color: '#2563EB' },
  { id: 'vp-wealth-management', name: 'VP Wealth Management', description: 'VP Wealth Management AI Agent', icon: DollarSign, color: '#2563EB' },
  { id: 'risk-compliance-director', name: 'Risk & Compliance Director', description: 'Risk & Compliance Director AI Agent', icon: Landmark, color: '#2563EB' },
  { id: 'lending-operations-director', name: 'Lending Operations Director', description: 'Lending Operations Director AI Agent', icon: Landmark, color: '#2563EB' },
  { id: 'payments-strategy-director', name: 'Payments Strategy Director', description: 'Payments Strategy Director AI Agent', icon: DollarSign, color: '#2563EB' },
  { id: 'treasury-director', name: 'Treasury Director', description: 'Treasury Director AI Agent', icon: DollarSign, color: '#2563EB' },
  { id: 'digital-banking-director', name: 'Digital Banking Director', description: 'Digital Banking Director AI Agent', icon: Landmark, color: '#2563EB' },
  { id: 'branch-network-director', name: 'Branch Network Director', description: 'Branch Network Director AI Agent', icon: Landmark, color: '#2563EB' },
  { id: 'customer-experience-director', name: 'Customer Experience Director', description: 'Customer Experience Director AI Agent', icon: Users, color: '#2563EB' },
  { id: 'product-director', name: 'Product Director', description: 'Product Director AI Agent', icon: DollarSign, color: '#2563EB' },
  { id: 'operations-director', name: 'Operations Director', description: 'Operations Director AI Agent', icon: Landmark, color: '#2563EB' },
  { id: 'technology-director', name: 'Technology Director', description: 'Technology Director AI Agent', icon: Landmark, color: '#2563EB' },
  // Sub-agents would be listed here (45 total)
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="banking-finance"
      agents={DEPARTMENT_AGENTS}
    />
  );
}
