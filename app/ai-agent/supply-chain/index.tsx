import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';

const agents = [
  { id: 'ai-vp-supply-chain-operations', uid: 'ktx-21-vp-supply-chain-operations', title: 'AI VP Supply Chain Operations', route: '/ai-agent/supply-chain/vp-supply-chain-operations', color: '#42A5F5', level: 'vp_director', efficiency: '78%' },
  { id: 'ai-procurement-manager', uid: 'ktx-21-procurement-manager', title: 'AI Procurement Manager', route: '/ai-agent/supply-chain/procurement-manager', color: '#42A5F5', level: 'manager', efficiency: '89%' },
  { id: 'ai-logistics-manager', uid: 'ktx-21-logistics-manager', title: 'AI Logistics Manager', route: '/ai-agent/supply-chain/logistics-manager', color: '#42A5F5', level: 'manager', efficiency: '75%' },
  { id: 'ai-warehouse-lead', uid: 'ktx-21-warehouse-lead', title: 'AI Warehouse Lead', route: '/ai-agent/supply-chain/warehouse-lead', color: '#42A5F5', level: 'team_lead', efficiency: '94%' },
  { id: 'ai-procurement-buyer', uid: 'ktx-21-procurement-buyer', title: 'AI Procurement Buyer', route: '/ai-agent/supply-chain/procurement-buyer', color: '#42A5F5', level: 'team_lead', efficiency: '75%' },
  { id: 'ai-inventory-specialist', uid: 'ktx-21-inventory-specialist', title: 'AI Inventory Specialist', route: '/ai-agent/supply-chain/inventory-specialist', color: '#42A5F5', level: 'team_lead', efficiency: '76%' },
  { id: 'ai-demand-planner', uid: 'ktx-21-demand-planner', title: 'AI Demand Planner', route: '/ai-agent/supply-chain/demand-planner', color: '#42A5F5', level: 'team_lead', efficiency: '94%' },
  { id: 'ai-supplier-relations', uid: 'ktx-21-supplier-relations', title: 'AI Supplier Relations', route: '/ai-agent/supply-chain/supplier-relations', color: '#42A5F5', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-shipping-coordinator', uid: 'ktx-21-shipping-coordinator', title: 'AI Shipping Coordinator', route: '/ai-agent/supply-chain/shipping-coordinator', color: '#42A5F5', level: 'c_level', efficiency: '76%' },
  { id: 'ai-fulfillment-specialist', uid: 'ktx-21-fulfillment-specialist', title: 'AI Fulfillment Specialist', route: '/ai-agent/supply-chain/fulfillment-specialist', color: '#42A5F5', level: 'team_lead', efficiency: '90%' },
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="supply-chain-logistics"
      agents={agents}
    />
  );
}
