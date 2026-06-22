import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const agents = [
  // C-Level Strategic Agents
  { id: 'ai-chief-logistics-officer', uid: 'ktx-20-chief-logistics-officer', title: 'AI Chief Logistics Officer', route: '/ai-agent/logistics-warehousing/chief-logistics-officer', color: '#F97316', level: 'c_level', efficiency: '94%' },
  
  // VP-Level Strategic Agents
  { id: 'ai-vp-logistics-operations', uid: 'ktx-20-vp-logistics-operations', title: 'AI VP Logistics Operations', route: '/ai-agent/logistics-warehousing/vp-logistics-operations', color: '#F97316', level: 'vp_director', efficiency: '92%' },
  { id: 'ai-vp-warehouse-management', uid: 'ktx-20-vp-warehouse-management', title: 'AI VP Warehouse Management', route: '/ai-agent/logistics-warehousing/vp-warehouse-management', color: '#F97316', level: 'vp_director', efficiency: '91%' },
  { id: 'ai-vp-freight-forwarding', uid: 'ktx-20-vp-freight-forwarding', title: 'AI VP Freight Forwarding', route: '/ai-agent/logistics-warehousing/vp-freight-forwarding', color: '#F97316', level: 'vp_director', efficiency: '90%' },
  { id: 'ai-vp-customs-brokerage', uid: 'ktx-20-vp-customs-brokerage', title: 'AI VP Customs Brokerage', route: '/ai-agent/logistics-warehousing/vp-customs-brokerage', color: '#F97316', level: 'vp_director', efficiency: '89%' },
  { id: 'ai-vp-last-mile-delivery', uid: 'ktx-20-vp-last-mile-delivery', title: 'AI VP Last Mile Delivery', route: '/ai-agent/logistics-warehousing/vp-last-mile-delivery', color: '#F97316', level: 'vp_director', efficiency: '88%' },
  { id: 'ai-vp-inventory-optimization', uid: 'ktx-20-vp-inventory-optimization', title: 'AI VP Inventory Optimization', route: '/ai-agent/logistics-warehousing/vp-inventory-optimization', color: '#F97316', level: 'vp_director', efficiency: '93%' },
  
  // Director-Level Agents
  { id: 'ai-logistics-intelligence-hub', uid: 'ktx-20-logistics-intelligence-hub', title: 'AI Logistics Intelligence Hub', route: '/ai-agent/logistics-warehousing/logistics-intelligence-hub', color: '#3B82F6', level: 'director', efficiency: '95%' },
  { id: 'ai-warehouse-automation-director', uid: 'ktx-20-warehouse-automation-director', title: 'AI Warehouse Automation Director', route: '/ai-agent/logistics-warehousing/warehouse-automation-director', color: '#3B82F6', level: 'director', efficiency: '94%' },
  { id: 'ai-fleet-management-director', uid: 'ktx-20-fleet-management-director', title: 'AI Fleet Management Director', route: '/ai-agent/logistics-warehousing/fleet-management-director', color: '#3B82F6', level: 'director', efficiency: '93%' },
  { id: 'ai-supply-chain-director', uid: 'ktx-20-supply-chain-director', title: 'AI Supply Chain Director', route: '/ai-agent/logistics-warehousing/supply-chain-director', color: '#3B82F6', level: 'director', efficiency: '92%' },
  
  // Manager-Level Agents
  { id: 'ai-logistics-sr-manager', uid: 'ktx-20-logistics-sr-manager', title: 'AI Logistics Senior Manager', route: '/ai-agent/logistics-warehousing/logistics-sr-manager', color: '#10B981', level: 'manager', efficiency: '91%' },
  { id: 'ai-warehouse-manager', uid: 'ktx-20-warehouse-manager', title: 'AI Warehouse Manager', route: '/ai-agent/logistics-warehousing/warehouse-manager', color: '#10B981', level: 'manager', efficiency: '93%' },
  { id: 'ai-inventory-manager', uid: 'ktx-20-inventory-manager', title: 'AI Inventory Manager', route: '/ai-agent/logistics-warehousing/inventory-manager', color: '#10B981', level: 'manager', efficiency: '92%' },
  { id: 'ai-freight-manager', uid: 'ktx-20-freight-manager', title: 'AI Freight Manager', route: '/ai-agent/logistics-warehousing/freight-manager', color: '#10B981', level: 'manager', efficiency: '90%' },
  { id: 'ai-customs-manager', uid: 'ktx-20-customs-manager', title: 'AI Customs Manager', route: '/ai-agent/logistics-warehousing/customs-manager', color: '#10B981', level: 'manager', efficiency: '89%' },
  { id: 'ai-delivery-manager', uid: 'ktx-20-delivery-manager', title: 'AI Delivery Manager', route: '/ai-agent/logistics-warehousing/delivery-manager', color: '#10B981', level: 'manager', efficiency: '91%' },
  
  // Team Lead-Level Agents
  { id: 'ai-logistics-coordinator', uid: 'ktx-20-logistics-coordinator', title: 'AI Logistics Coordinator', route: '/ai-agent/logistics-warehousing/logistics-coordinator', color: '#8B5CF6', level: 'team_lead', efficiency: '88%' },
  
  // Dedicated Logistics Operations Agents (22 total)
  { id: 'ai-logistics-operations-manager', uid: 'ktx-20-logistics-operations-manager', title: 'AI Logistics Operations Manager', route: '/ai-agent/logistics-warehousing/logistics-operations-manager', color: '#EF4444', level: 'manager', efficiency: '92%' },
  { id: 'ai-order-fulfillment-specialist', uid: 'ktx-20-order-fulfillment-specialist', title: 'AI Order Fulfillment Specialist', route: '/ai-agent/logistics-warehousing/order-fulfillment-specialist', color: '#EF4444', level: 'specialist', efficiency: '91%' },
  { id: 'ai-shipping-coordinator', uid: 'ktx-20-shipping-coordinator', title: 'AI Shipping Coordinator', route: '/ai-agent/logistics-warehousing/shipping-coordinator', color: '#EF4444', level: 'specialist', efficiency: '90%' },
  { id: 'ai-receiving-specialist', uid: 'ktx-20-receiving-specialist', title: 'AI Receiving Specialist', route: '/ai-agent/logistics-warehousing/receiving-specialist', color: '#EF4444', level: 'specialist', efficiency: '89%' },
  { id: 'ai-picking-operations-lead', uid: 'ktx-20-picking-operations-lead', title: 'AI Picking Operations Lead', route: '/ai-agent/logistics-warehousing/picking-operations-lead', color: '#EF4444', level: 'team_lead', efficiency: '91%' },
  { id: 'ai-packing-specialist', uid: 'ktx-20-packing-specialist', title: 'AI Packing Specialist', route: '/ai-agent/logistics-warehousing/packing-specialist', color: '#EF4444', level: 'specialist', efficiency: '90%' },
  { id: 'ai-returns-processing-specialist', uid: 'ktx-20-returns-processing-specialist', title: 'AI Returns Processing Specialist', route: '/ai-agent/logistics-warehousing/returns-processing-specialist', color: '#EF4444', level: 'specialist', efficiency: '88%' },
  { id: 'ai-quality-control-specialist', uid: 'ktx-20-quality-control-specialist', title: 'AI Quality Control Specialist', route: '/ai-agent/logistics-warehousing/quality-control-specialist', color: '#EF4444', level: 'specialist', efficiency: '89%' },
  { id: 'ai-logistics-data-analyst', uid: 'ktx-20-logistics-data-analyst', title: 'AI Logistics Data Analyst', route: '/ai-agent/logistics-warehousing/logistics-data-analyst', color: '#EF4444', level: 'specialist', efficiency: '92%' },
  { id: 'ai-route-optimizer', uid: 'ktx-20-route-optimizer', title: 'AI Route Optimizer', route: '/ai-agent/logistics-warehousing/route-optimizer', color: '#EF4444', level: 'specialist', efficiency: '93%' },
  { id: 'ai-load-planner', uid: 'ktx-20-load-planner', title: 'AI Load Planner', route: '/ai-agent/logistics-warehousing/load-planner', color: '#EF4444', level: 'specialist', efficiency: '90%' },
  { id: 'ai-transportation-scheduler', uid: 'ktx-20-transportation-scheduler', title: 'AI Transportation Scheduler', route: '/ai-agent/logistics-warehousing/transportation-scheduler', color: '#EF4444', level: 'specialist', efficiency: '89%' },
  { id: 'ai-warehouse-flow-optimizer', uid: 'ktx-20-warehouse-flow-optimizer', title: 'AI Warehouse Flow Optimizer', route: '/ai-agent/logistics-warehousing/warehouse-flow-optimizer', color: '#EF4444', level: 'specialist', efficiency: '91%' },
  { id: 'ai-throughput-monitor', uid: 'ktx-20-throughput-monitor', title: 'AI Throughput Monitor', route: '/ai-agent/logistics-warehousing/throughput-monitor', color: '#EF4444', level: 'specialist', efficiency: '90%' },
  { id: 'ai-operations-analyst', uid: 'ktx-20-operations-analyst', title: 'AI Operations Analyst', route: '/ai-agent/logistics-warehousing/operations-analyst', color: '#EF4444', level: 'specialist', efficiency: '89%' },
  { id: 'ai-capacity-planner', uid: 'ktx-20-capacity-planner', title: 'AI Capacity Planner', route: '/ai-agent/logistics-warehousing/capacity-planner', color: '#EF4444', level: 'specialist', efficiency: '88%' },
  { id: 'ai-labor-optimizer', uid: 'ktx-20-labor-optimizer', title: 'AI Labor Optimizer', route: '/ai-agent/logistics-warehousing/labor-optimizer', color: '#EF4444', level: 'specialist', efficiency: '90%' },
  { id: 'ai-equipment-coordinator', uid: 'ktx-20-equipment-coordinator', title: 'AI Equipment Coordinator', route: '/ai-agent/logistics-warehousing/equipment-coordinator', color: '#EF4444', level: 'specialist', efficiency: '89%' },
  { id: 'ai-safety-compliance-officer', uid: 'ktx-20-safety-compliance-officer', title: 'AI Safety Compliance Officer', route: '/ai-agent/logistics-warehousing/safety-compliance-officer', color: '#EF4444', level: 'specialist', efficiency: '91%' },
  { id: 'ai-performance-tracker', uid: 'ktx-20-performance-tracker', title: 'AI Performance Tracker', route: '/ai-agent/logistics-warehousing/performance-tracker', color: '#EF4444', level: 'specialist', efficiency: '90%' },
  { id: 'ai-exception-handler', uid: 'ktx-20-exception-handler', title: 'AI Exception Handler', route: '/ai-agent/logistics-warehousing/exception-handler', color: '#EF4444', level: 'specialist', efficiency: '89%' },
  { id: 'ai-dispatch-coordinator', uid: 'ktx-20-dispatch-coordinator', title: 'AI Dispatch Coordinator', route: '/ai-agent/logistics-warehousing/dispatch-coordinator', color: '#EF4444', level: 'specialist', efficiency: '88%' },
  
  // Warehouse Management Agents (17 total)
  { id: 'ai-warehouse-operations-manager', uid: 'ktx-20-warehouse-operations-manager', title: 'AI Warehouse Operations Manager', route: '/ai-agent/logistics-warehousing/warehouse-operations-manager', color: '#3B82F6', level: 'manager', efficiency: '93%' },
  { id: 'ai-storage-optimizer', uid: 'ktx-20-storage-optimizer', title: 'AI Storage Optimizer', route: '/ai-agent/logistics-warehousing/storage-optimizer', color: '#3B82F6', level: 'specialist', efficiency: '92%' },
  { id: 'ai-slotting-specialist', uid: 'ktx-20-slotting-specialist', title: 'AI Slotting Specialist', route: '/ai-agent/logistics-warehousing/slotting-specialist', color: '#3B82F6', level: 'specialist', efficiency: '91%' },
  { id: 'ai-space-planner', uid: 'ktx-20-space-planner', title: 'AI Space Planner', route: '/ai-agent/logistics-warehousing/space-planner', color: '#3B82F6', level: 'specialist', efficiency: '90%' },
  { id: 'ai-inventory-tracker', uid: 'ktx-20-inventory-tracker', title: 'AI Inventory Tracker', route: '/ai-agent/logistics-warehousing/inventory-tracker', color: '#3B82F6', level: 'specialist', efficiency: '94%' },
  { id: 'ai-stock-level-monitor', uid: 'ktx-20-stock-level-monitor', title: 'AI Stock Level Monitor', route: '/ai-agent/logistics-warehousing/stock-level-monitor', color: '#3B82F6', level: 'specialist', efficiency: '93%' },
  { id: 'ai-warehouse-supervisor', uid: 'ktx-20-warehouse-supervisor', title: 'AI Warehouse Supervisor', route: '/ai-agent/logistics-warehousing/warehouse-supervisor', color: '#3B82F6', level: 'manager', efficiency: '92%' },
  { id: 'ai-zone-manager', uid: 'ktx-20-zone-manager', title: 'AI Zone Manager', route: '/ai-agent/logistics-warehousing/zone-manager', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'ai-bin-coordinator', uid: 'ktx-20-bin-coordinator', title: 'AI Bin Coordinator', route: '/ai-agent/logistics-warehousing/bin-coordinator', color: '#3B82F6', level: 'specialist', efficiency: '90%' },
  { id: 'ai-putaway-specialist', uid: 'ktx-20-putaway-specialist', title: 'AI Putaway Specialist', route: '/ai-agent/logistics-warehousing/putaway-specialist', color: '#3B82F6', level: 'specialist', efficiency: '89%' },
  { id: 'ai-cycle-count-coordinator', uid: 'ktx-20-cycle-count-coordinator', title: 'AI Cycle Count Coordinator', route: '/ai-agent/logistics-warehousing/cycle-count-coordinator', color: '#3B82F6', level: 'specialist', efficiency: '91%' },
  { id: 'ai-audit-specialist', uid: 'ktx-20-audit-specialist', title: 'AI Audit Specialist', route: '/ai-agent/logistics-warehousing/audit-specialist', color: '#3B82F6', level: 'specialist', efficiency: '90%' },
  { id: 'ai-warehouse-security-manager', uid: 'ktx-20-warehouse-security-manager', title: 'AI Warehouse Security Manager', route: '/ai-agent/logistics-warehousing/warehouse-security-manager', color: '#3B82F6', level: 'manager', efficiency: '92%' },
  { id: 'ai-maintenance-coordinator', uid: 'ktx-20-maintenance-coordinator', title: 'AI Maintenance Coordinator', route: '/ai-agent/logistics-warehousing/maintenance-coordinator', color: '#3B82F6', level: 'specialist', efficiency: '89%' },
  { id: 'ai-equipment-tracker', uid: 'ktx-20-equipment-tracker', title: 'AI Equipment Tracker', route: '/ai-agent/logistics-warehousing/equipment-tracker', color: '#3B82F6', level: 'specialist', efficiency: '90%' },
  { id: 'ai-warehouse-analyst', uid: 'ktx-20-warehouse-analyst', title: 'AI Warehouse Analyst', route: '/ai-agent/logistics-warehousing/warehouse-analyst', color: '#3B82F6', level: 'specialist', efficiency: '91%' },
  { id: 'ai-layout-optimizer', uid: 'ktx-20-layout-optimizer', title: 'AI Layout Optimizer', route: '/ai-agent/logistics-warehousing/layout-optimizer', color: '#3B82F6', level: 'specialist', efficiency: '89%' },
  { id: 'ai-material-handler-coordinator', uid: 'ktx-20-material-handler-coordinator', title: 'AI Material Handler Coordinator', route: '/ai-agent/logistics-warehousing/material-handler-coordinator', color: '#3B82F6', level: 'team_lead', efficiency: '88%' },
  
  // Freight Forwarding Agents (17 total)
  { id: 'ai-freight-forwarding-manager', uid: 'ktx-20-freight-forwarding-manager', title: 'AI Freight Forwarding Manager', route: '/ai-agent/logistics-warehousing/freight-forwarding-manager', color: '#8B5CF6', level: 'manager', efficiency: '91%' },
  { id: 'ai-ocean-freight-specialist', uid: 'ktx-20-ocean-freight-specialist', title: 'AI Ocean Freight Specialist', route: '/ai-agent/logistics-warehousing/ocean-freight-specialist', color: '#8B5CF6', level: 'specialist', efficiency: '90%' },
  { id: 'ai-air-freight-specialist', uid: 'ktx-20-air-freight-specialist', title: 'AI Air Freight Specialist', route: '/ai-agent/logistics-warehousing/air-freight-specialist', color: '#8B5CF6', level: 'specialist', efficiency: '89%' },
  { id: 'ai-ground-freight-specialist', uid: 'ktx-20-ground-freight-specialist', title: 'AI Ground Freight Specialist', route: '/ai-agent/logistics-warehousing/ground-freight-specialist', color: '#8B5CF6', level: 'specialist', efficiency: '88%' },
  { id: 'ai-intermodal-coordinator', uid: 'ktx-20-intermodal-coordinator', title: 'AI Intermodal Coordinator', route: '/ai-agent/logistics-warehousing/intermodal-coordinator', color: '#8B5CF6', level: 'specialist', efficiency: '91%' },
  { id: 'ai-carrier-relations-manager', uid: 'ktx-20-carrier-relations-manager', title: 'AI Carrier Relations Manager', route: '/ai-agent/logistics-warehousing/carrier-relations-manager', color: '#8B5CF6', level: 'manager', efficiency: '90%' },
  { id: 'ai-rate-negotiator', uid: 'ktx-20-rate-negotiator', title: 'AI Rate Negotiator', route: '/ai-agent/logistics-warehousing/rate-negotiator', color: '#8B5CF6', level: 'specialist', efficiency: '89%' },
  { id: 'ai-freight-auditor', uid: 'ktx-20-freight-auditor', title: 'AI Freight Auditor', route: '/ai-agent/logistics-warehousing/freight-auditor', color: '#8B5CF6', level: 'specialist', efficiency: '88%' },
  { id: 'ai-booking-coordinator', uid: 'ktx-20-booking-coordinator', title: 'AI Booking Coordinator', route: '/ai-agent/logistics-warehousing/booking-coordinator', color: '#8B5CF6', level: 'specialist', efficiency: '90%' },
  { id: 'ai-documentation-specialist', uid: 'ktx-20-documentation-specialist', title: 'AI Documentation Specialist', route: '/ai-agent/logistics-warehousing/documentation-specialist', color: '#8B5CF6', level: 'specialist', efficiency: '89%' },
  { id: 'ai-tracking-specialist', uid: 'ktx-20-tracking-specialist', title: 'AI Tracking Specialist', route: '/ai-agent/logistics-warehousing/tracking-specialist', color: '#8B5CF6', level: 'specialist', efficiency: '92%' },
  { id: 'ai-shipment-planner', uid: 'ktx-20-shipment-planner', title: 'AI Shipment Planner', route: '/ai-agent/logistics-warehousing/shipment-planner', color: '#8B5CF6', level: 'specialist', efficiency: '91%' },
  { id: 'ai-consolidation-specialist', uid: 'ktx-20-consolidation-specialist', title: 'AI Consolidation Specialist', route: '/ai-agent/logistics-warehousing/consolidation-specialist', color: '#8B5CF6', level: 'specialist', efficiency: '90%' },
  { id: 'ai-deconsolidation-specialist', uid: 'ktx-20-deconsolidation-specialist', title: 'AI Deconsolidation Specialist', route: '/ai-agent/logistics-warehousing/deconsolidation-specialist', color: '#8B5CF6', level: 'specialist', efficiency: '89%' },
  { id: 'ai-transit-time-optimizer', uid: 'ktx-20-transit-time-optimizer', title: 'AI Transit Time Optimizer', route: '/ai-agent/logistics-warehousing/transit-time-optimizer', color: '#8B5CF6', level: 'specialist', efficiency: '88%' },
  { id: 'ai-freight-forwarder-liaison', uid: 'ktx-20-freight-forwarder-liaison', title: 'AI Freight Forwarder Liaison', route: '/ai-agent/logistics-warehousing/freight-forwarder-liaison', color: '#8B5CF6', level: 'specialist', efficiency: '90%' },
  { id: 'ai-cargo-insurance-specialist', uid: 'ktx-20-cargo-insurance-specialist', title: 'AI Cargo Insurance Specialist', route: '/ai-agent/logistics-warehousing/cargo-insurance-specialist', color: '#8B5CF6', level: 'specialist', efficiency: '89%' },
  { id: 'ai-hazardous-materials-specialist', uid: 'ktx-20-hazardous-materials-specialist', title: 'AI Hazardous Materials Specialist', route: '/ai-agent/logistics-warehousing/hazardous-materials-specialist', color: '#8B5CF6', level: 'specialist', efficiency: '88%' },
  { id: 'ai-temperature-controlled-specialist', uid: 'ktx-20-temperature-controlled-specialist', title: 'AI Temperature Controlled Specialist', route: '/ai-agent/logistics-warehousing/temperature-controlled-specialist', color: '#8B5CF6', level: 'specialist', efficiency: '89%' },
  
  // Customs Brokerage Agents (13 total)
  { id: 'ai-customs-brokerage-manager', uid: 'ktx-20-customs-brokerage-manager', title: 'AI Customs Brokerage Manager', route: '/ai-agent/logistics-warehousing/customs-brokerage-manager', color: '#EC4899', level: 'manager', efficiency: '90%' },
  { id: 'ai-customs-declaration-specialist', uid: 'ktx-20-customs-declaration-specialist', title: 'AI Customs Declaration Specialist', route: '/ai-agent/logistics-warehousing/customs-declaration-specialist', color: '#EC4899', level: 'specialist', efficiency: '89%' },
  { id: 'ai-compliance-analyst', uid: 'ktx-20-compliance-analyst', title: 'AI Compliance Analyst', route: '/ai-agent/logistics-warehousing/compliance-analyst', color: '#EC4899', level: 'specialist', efficiency: '88%' },
  { id: 'ai-tariff-classifier', uid: 'ktx-20-tariff-classifier', title: 'AI Tariff Classifier', route: '/ai-agent/logistics-warehousing/tariff-classifier', color: '#EC4899', level: 'specialist', efficiency: '90%' },
  { id: 'ai-duty-calculator', uid: 'ktx-20-duty-calculator', title: 'AI Duty Calculator', route: '/ai-agent/logistics-warehousing/duty-calculator', color: '#EC4899', level: 'specialist', efficiency: '91%' },
  { id: 'ai-import-license-coordinator', uid: 'ktx-20-import-license-coordinator', title: 'AI Import License Coordinator', route: '/ai-agent/logistics-warehousing/import-license-coordinator', color: '#EC4899', level: 'specialist', efficiency: '89%' },
  { id: 'ai-export-documentation-specialist', uid: 'ktx-20-export-documentation-specialist', title: 'AI Export Documentation Specialist', route: '/ai-agent/logistics-warehousing/export-documentation-specialist', color: '#EC4899', level: 'specialist', efficiency: '88%' },
  { id: 'ai-free-trade-agreement-specialist', uid: 'ktx-20-free-trade-agreement-specialist', title: 'AI Free Trade Agreement Specialist', route: '/ai-agent/logistics-warehousing/free-trade-agreement-specialist', color: '#EC4899', level: 'specialist', efficiency: '90%' },
  { id: 'ai-customs-bond-specialist', uid: 'ktx-20-customs-bond-specialist', title: 'AI Customs Bond Specialist', route: '/ai-agent/logistics-warehousing/customs-bond-specialist', color: '#EC4899', level: 'specialist', efficiency: '89%' },
  { id: 'ai-partner-government-agency-liaison', uid: 'ktx-20-partner-government-agency-liaison', title: 'AI Partner Government Agency Liaison', route: '/ai-agent/logistics-warehousing/partner-government-agency-liaison', color: '#EC4899', level: 'specialist', efficiency: '88%' },
  { id: 'ai-quota-manager', uid: 'ktx-20-quota-manager', title: 'AI Quota Manager', route: '/ai-agent/logistics-warehousing/quota-manager', color: '#EC4899', level: 'specialist', efficiency: '87%' },
  { id: 'ai-valuation-specialist', uid: 'ktx-20-valuation-specialist', title: 'AI Valuation Specialist', route: '/ai-agent/logistics-warehousing/valuation-specialist', color: '#EC4899', level: 'specialist', efficiency: '89%' },
  { id: 'ai-origin-determiner', uid: 'ktx-20-origin-determiner', title: 'AI Origin Determiner', route: '/ai-agent/logistics-warehousing/origin-determiner', color: '#EC4899', level: 'specialist', efficiency: '88%' },
  { id: 'ai-trade-compliance-officer', uid: 'ktx-20-trade-compliance-officer', title: 'AI Trade Compliance Officer', route: '/ai-agent/logistics-warehousing/trade-compliance-officer', color: '#EC4899', level: 'specialist', efficiency: '89%' },
  
  // Last-Mile Delivery Agents (18 total)
  { id: 'ai-last-mile-delivery-manager', uid: 'ktx-20-last-mile-delivery-manager', title: 'AI Last Mile Delivery Manager', route: '/ai-agent/logistics-warehousing/last-mile-delivery-manager', color: '#10B981', level: 'manager', efficiency: '92%' },
  { id: 'ai-route-planner', uid: 'ktx-20-route-planner', title: 'AI Route Planner', route: '/ai-agent/logistics-warehousing/route-planner', color: '#10B981', level: 'specialist', efficiency: '93%' },
  { id: 'ai-delivery-dispatcher', uid: 'ktx-20-delivery-dispatcher', title: 'AI Delivery Dispatcher', route: '/ai-agent/logistics-warehousing/delivery-dispatcher', color: '#10B981', level: 'specialist', efficiency: '92%' },
  { id: 'ai-driver-coordinator', uid: 'ktx-20-driver-coordinator', title: 'AI Driver Coordinator', route: '/ai-agent/logistics-warehousing/driver-coordinator', color: '#10B981', level: 'team_lead', efficiency: '91%' },
  { id: 'ai-delivery-tracking-specialist', uid: 'ktx-20-delivery-tracking-specialist', title: 'AI Delivery Tracking Specialist', route: '/ai-agent/logistics-warehousing/delivery-tracking-specialist', color: '#10B981', level: 'specialist', efficiency: '94%' },
  { id: 'ai-customer-notification-agent', uid: 'ktx-20-customer-notification-agent', title: 'AI Customer Notification Agent', route: '/ai-agent/logistics-warehousing/customer-notification-agent', color: '#10B981', level: 'specialist', efficiency: '93%' },
  { id: 'ai-proof-of-delivery-specialist', uid: 'ktx-20-proof-of-delivery-specialist', title: 'AI Proof of Delivery Specialist', route: '/ai-agent/logistics-warehousing/proof-of-delivery-specialist', color: '#10B981', level: 'specialist', efficiency: '92%' },
  { id: 'ai-delivery-exception-handler', uid: 'ktx-20-delivery-exception-handler', title: 'AI Delivery Exception Handler', route: '/ai-agent/logistics-warehousing/delivery-exception-handler', color: '#10B981', level: 'specialist', efficiency: '90%' },
  { id: 'ai-rescheduling-specialist', uid: 'ktx-20-rescheduling-specialist', title: 'AI Rescheduling Specialist', route: '/ai-agent/logistics-warehousing/rescheduling-specialist', color: '#10B981', level: 'specialist', efficiency: '89%' },
  { id: 'ai-customer-service-agent', uid: 'ktx-20-customer-service-agent', title: 'AI Customer Service Agent', route: '/ai-agent/logistics-warehousing/customer-service-agent', color: '#10B981', level: 'specialist', efficiency: '91%' },
  { id: 'ai-courier-management-specialist', uid: 'ktx-20-courier-management-specialist', title: 'AI Courier Management Specialist', route: '/ai-agent/logistics-warehousing/courier-management-specialist', color: '#10B981', level: 'specialist', efficiency: '90%' },
  { id: 'ai-locker-coordinator', uid: 'ktx-20-locker-coordinator', title: 'AI Locker Coordinator', route: '/ai-agent/logistics-warehousing/locker-coordinator', color: '#10B981', level: 'specialist', efficiency: '89%' },
  { id: 'ai-pickup-point-manager', uid: 'ktx-20-pickup-point-manager', title: 'AI Pickup Point Manager', route: '/ai-agent/logistics-warehousing/pickup-point-manager', color: '#10B981', level: 'manager', efficiency: '90%' },
  { id: 'ai-same-day-delivery-specialist', uid: 'ktx-20-same-day-delivery-specialist', title: 'AI Same Day Delivery Specialist', route: '/ai-agent/logistics-warehousing/same-day-delivery-specialist', color: '#10B981', level: 'specialist', efficiency: '88%' },
  { id: 'ai-scheduled-delivery-coordinator', uid: 'ktx-20-scheduled-delivery-coordinator', title: 'AI Scheduled Delivery Coordinator', route: '/ai-agent/logistics-warehousing/scheduled-delivery-coordinator', color: '#10B981', level: 'specialist', efficiency: '89%' },
  { id: 'ai-delivery-performance-analyst', uid: 'ktx-20-delivery-performance-analyst', title: 'AI Delivery Performance Analyst', route: '/ai-agent/logistics-warehousing/delivery-performance-analyst', color: '#10B981', level: 'specialist', efficiency: '90%' },
  { id: 'ai-returns-management-specialist', uid: 'ktx-20-returns-management-specialist', title: 'AI Returns Management Specialist', route: '/ai-agent/logistics-warehousing/returns-management-specialist', color: '#10B981', level: 'specialist', efficiency: '88%' },
  { id: 'ai-delivery-optimizer', uid: 'ktx-20-delivery-optimizer', title: 'AI Delivery Optimizer', route: '/ai-agent/logistics-warehousing/delivery-optimizer', color: '#10B981', level: 'specialist', efficiency: '91%' },
  { id: 'ai-eta-predictor', uid: 'ktx-20-eta-predictor', title: 'AI ETA Predictor', route: '/ai-agent/logistics-warehousing/eta-predictor', color: '#10B981', level: 'specialist', efficiency: '92%' },
  { id: 'ai-delivery-zone-manager', uid: 'ktx-20-delivery-zone-manager', title: 'AI Delivery Zone Manager', route: '/ai-agent/logistics-warehousing/delivery-zone-manager', color: '#10B981', level: 'manager', efficiency: '89%' },
  
  // Inventory Optimization Agents (12 total)
  { id: 'ai-inventory-optimization-manager', uid: 'ktx-20-inventory-optimization-manager', title: 'AI Inventory Optimization Manager', route: '/ai-agent/logistics-warehousing/inventory-optimization-manager', color: '#F59E0B', level: 'manager', efficiency: '93%' },
  { id: 'ai-demand-forecaster', uid: 'ktx-20-demand-forecaster', title: 'AI Demand Forecaster', route: '/ai-agent/logistics-warehousing/demand-forecaster', color: '#F59E0B', level: 'specialist', efficiency: '94%' },
  { id: 'ai-safety-stock-calculator', uid: 'ktx-20-safety-stock-calculator', title: 'AI Safety Stock Calculator', route: '/ai-agent/logistics-warehousing/safety-stock-calculator', color: '#F59E0B', level: 'specialist', efficiency: '92%' },
  { id: 'ai-reorder-point-optimizer', uid: 'ktx-20-reorder-point-optimizer', title: 'AI Reorder Point Optimizer', route: '/ai-agent/logistics-warehousing/reorder-point-optimizer', color: '#F59E0B', level: 'specialist', efficiency: '91%' },
  { id: 'ai-abc-analyst', uid: 'ktx-20-abc-analyst', title: 'AI ABC Analyst', route: '/ai-agent/logistics-warehousing/abc-analyst', color: '#F59E0B', level: 'specialist', efficiency: '90%' },
  { id: 'ai-obsolete-inventory-specialist', uid: 'ktx-20-obsolete-inventory-specialist', title: 'AI Obsolete Inventory Specialist', route: '/ai-agent/logistics-warehousing/obsolete-inventory-specialist', color: '#F59E0B', level: 'specialist', efficiency: '89%' },
  { id: 'ai-seasonality-analyst', uid: 'ktx-20-seasonality-analyst', title: 'AI Seasonality Analyst', route: '/ai-agent/logistics-warehousing/seasonality-analyst', color: '#F59E0B', level: 'specialist', efficiency: '91%' },
  { id: 'ai-inventory-turnover-analyst', uid: 'ktx-20-inventory-turnover-analyst', title: 'AI Inventory Turnover Analyst', route: '/ai-agent/logistics-warehousing/inventory-turnover-analyst', color: '#F59E0B', level: 'specialist', efficiency: '90%' },
  { id: 'ai-stockout-preventer', uid: 'ktx-20-stockout-preventer', title: 'AI Stockout Preventer', route: '/ai-agent/logistics-warehousing/stockout-preventer', color: '#F59E0B', level: 'specialist', efficiency: '92%' },
  { id: 'ai-overstock-reducer', uid: 'ktx-20-overstock-reducer', title: 'AI Overstock Reducer', route: '/ai-agent/logistics-warehousing/overstock-reducer', color: '#F59E0B', level: 'specialist', efficiency: '89%' },
  { id: 'ai-inventory-health-monitor', uid: 'ktx-20-inventory-health-monitor', title: 'AI Inventory Health Monitor', route: '/ai-agent/logistics-warehousing/inventory-health-monitor', color: '#F59E0B', level: 'specialist', efficiency: '90%' },
  { id: 'ai-product-lifecycle-manager', uid: 'ktx-20-product-lifecycle-manager', title: 'AI Product Lifecycle Manager', route: '/ai-agent/logistics-warehousing/product-lifecycle-manager', color: '#F59E0B', level: 'manager', efficiency: '88%' },
  { id: 'ai-multi-echelon-optimizer', uid: 'ktx-20-multi-echelon-optimizer', title: 'AI Multi-Echelon Optimizer', route: '/ai-agent/logistics-warehousing/multi-echelon-optimizer', color: '#F59E0B', level: 'specialist', efficiency: '87%' },
  { id: 'ai-inventory-allocation-specialist', uid: 'ktx-20-inventory-allocation-specialist', title: 'AI Inventory Allocation Specialist', route: '/ai-agent/logistics-warehousing/inventory-allocation-specialist', color: '#F59E0B', level: 'specialist', efficiency: '89%' },
  
  // Supply Chain Coordination Agents (8 total)
  { id: 'ai-supply-chain-coordinator', uid: 'ktx-20-supply-chain-coordinator', title: 'AI Supply Chain Coordinator', route: '/ai-agent/logistics-warehousing/supply-chain-coordinator', color: '#6366F1', level: 'manager', efficiency: '92%' },
  { id: 'ai-supplier-relations-manager', uid: 'ktx-20-supplier-relations-manager', title: 'AI Supplier Relations Manager', route: '/ai-agent/logistics-warehousing/supplier-relations-manager', color: '#6366F1', level: 'manager', efficiency: '91%' },
  { id: 'ai-supplier-performance-analyst', uid: 'ktx-20-supplier-performance-analyst', title: 'AI Supplier Performance Analyst', route: '/ai-agent/logistics-warehousing/supplier-performance-analyst', color: '#6366F1', level: 'specialist', efficiency: '90%' },
  { id: 'ai-supply-chain-visibility-agent', uid: 'ktx-20-supply-chain-visibility-agent', title: 'AI Supply Chain Visibility Agent', route: '/ai-agent/logistics-warehousing/supply-chain-visibility-agent', color: '#6366F1', level: 'specialist', efficiency: '93%' },
  { id: 'ai-supply-chain-risk-manager', uid: 'ktx-20-supply-chain-risk-manager', title: 'AI Supply Chain Risk Manager', route: '/ai-agent/logistics-warehousing/supply-chain-risk-manager', color: '#6366F1', level: 'manager', efficiency: '89%' },
  { id: 'ai-supply-chain-planner', uid: 'ktx-20-supply-chain-planner', title: 'AI Supply Chain Planner', route: '/ai-agent/logistics-warehousing/supply-chain-planner', color: '#6366F1', level: 'specialist', efficiency: '91%' },
  { id: 'ai-supplier-onboarding-specialist', uid: 'ktx-20-supplier-onboarding-specialist', title: 'AI Supplier Onboarding Specialist', route: '/ai-agent/logistics-warehousing/supplier-onboarding-specialist', color: '#6366F1', level: 'specialist', efficiency: '88%' },
  { id: 'ai-supply-chain-analyst', uid: 'ktx-20-supply-chain-analyst', title: 'AI Supply Chain Analyst', route: '/ai-agent/logistics-warehousing/supply-chain-analyst', color: '#6366F1', level: 'specialist', efficiency: '90%' },
  { id: 'ai-collaboration-facilitator', uid: 'ktx-20-collaboration-facilitator', title: 'AI Collaboration Facilitator', route: '/ai-agent/logistics-warehousing/collaboration-facilitator', color: '#6366F1', level: 'specialist', efficiency: '89%' },
  { id: 'ai-supply-network-optimizer', uid: 'ktx-20-supply-network-optimizer', title: 'AI Supply Network Optimizer', route: '/ai-agent/logistics-warehousing/supply-network-optimizer', color: '#6366F1', level: 'specialist', efficiency: '88%' },
];

export default function LogisticsWarehousingIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Logistics & Warehousing - AI Agents</Text>
      <Text style={s.sub}>125 AI Agents Across Logistics Operations</Text>
      <View style={s.grid}>
        {agents.map((a) => (
          <Pressable key={a.id} style={[s.card, { borderLeftColor: a.color }]} onPress={() => router.push(a.route as any)}>
            <Text style={s.at}>{a.title}</Text>
            <Text style={s.al}>{a.level.replace('_',' ').toUpperCase()}</Text>
            <Text style={s.ae}>{a.efficiency}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  sub: { fontSize: 16, color: '#666', marginBottom: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  card: { width: '48%', padding: 16, borderRadius: 12, backgroundColor: '#F5F5F5', borderLeftWidth: 4 },
  at: { fontSize: 16, fontWeight: '600', marginBottom: 4, color: '#333' },
  al: { fontSize: 12, color: '#666', marginBottom: 2 },
  ae: { fontSize: 14, fontWeight: '500', color: '#333' }
});
