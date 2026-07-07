import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';

const agents = [
  { id: 'ai-vp-sales', uid: 'ktx-02-vp-sales', title: 'AI VP Sales', route: '/ai-agent/sales/vp-sales', color: '#FFA000', level: 'vp_director', efficiency: '92%' },
  { id: 'ai-vp-revenue', uid: 'ktx-02-vp-revenue', title: 'AI VP Revenue', route: '/ai-agent/sales/vp-revenue', color: '#FFA000', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-business-development', uid: 'ktx-02-vp-business-development', title: 'AI VP Business Development', route: '/ai-agent/sales/vp-business-development', color: '#FFA000', level: 'vp_director', efficiency: '77%' },
  { id: 'ai-vp-channel-partners', uid: 'ktx-02-vp-channel-partners', title: 'AI VP Channel Partners', route: '/ai-agent/sales/vp-channel-partners', color: '#FFA000', level: 'vp_director', efficiency: '89%' },
  { id: 'ai-sales-operations-manager', uid: 'ktx-02-sales-operations-manager', title: 'AI Sales Operations Manager', route: '/ai-agent/sales/sales-operations-manager', color: '#FFA000', level: 'manager', efficiency: '84%' },
  { id: 'ai-lead-development-rep-sdr', uid: 'ktx-02-lead-development-rep-sdr', title: 'AI Lead Development Rep (SDR)', route: '/ai-agent/sales/lead-development-rep-sdr', color: '#FFA000', level: 'manager', efficiency: '78%' },
  { id: 'ai-sales-rep', uid: 'ktx-02-sales-rep', title: 'AI Sales Rep', route: '/ai-agent/sales/sales-rep', color: '#FFA000', level: 'team_lead', efficiency: '79%' },
  { id: 'ai-sales-executive', uid: 'ktx-02-sales-executive', title: 'AI Sales Executive', route: '/ai-agent/sales/sales-executive', color: '#FFA000', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-crm-assistant', uid: 'ktx-02-crm-assistant', title: 'AI CRM Assistant', route: '/ai-agent/sales/crm-assistant', color: '#FFA000', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-proposal-generator', uid: 'ktx-02-proposal-generator', title: 'AI Proposal Generator', route: '/ai-agent/sales/proposal-generator', color: '#FFA000', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-negotiator', uid: 'ktx-02-negotiator', title: 'AI Negotiator', route: '/ai-agent/sales/negotiator', color: '#FFA000', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-pricing-analyst', uid: 'ktx-02-pricing-analyst', title: 'AI Pricing Analyst', route: '/ai-agent/sales/pricing-analyst', color: '#FFA000', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-sales-forecasting-agent', uid: 'ktx-02-sales-forecasting-agent', title: 'AI Sales Forecasting Agent', route: '/ai-agent/sales/sales-forecasting-agent', color: '#FFA000', level: 'team_lead', efficiency: '77%' },
  { id: 'ai-sales-enablement-agent', uid: 'ktx-02-sales-enablement-agent', title: 'AI Sales Enablement Agent', route: '/ai-agent/sales/sales-enablement-agent', color: '#FFA000', level: 'team_lead', efficiency: '90%' },
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="sales-revenue"
      agents={agents}
    />
  );
}
