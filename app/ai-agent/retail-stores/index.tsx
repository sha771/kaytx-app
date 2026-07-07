import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';

const DEPARTMENT_AGENTS = [
  {
    "id": "assistant-store-manager",
    "name": "AI Assistant Store Manager",
    "description": "AI Assistant Store Manager provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "cash-office-reconciler",
    "name": "AI Cash Office Reconciler",
    "description": "AI Cash Office Reconciler provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "cashier",
    "name": "AI Cashier",
    "description": "AI Cashier provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "chief-retail-officer",
    "name": "AI Chief Retail Officer",
    "description": "The AI Chief Retail Officer oversees all retail operations, manages store networks, merchandising, sales, and customer experience strategies to drive retail growth and profitability.",
    "color": "#E65100",
    "efficiency": "50x efficiency improvement"
  },
  {
    "id": "customer-experience-director",
    "name": "AI Customer Experience Director",
    "description": "AI Customer Experience Director provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "customer-loyalty-director",
    "name": "AI Customer Loyalty Director",
    "description": "AI Customer Loyalty Director provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "customer-service-representative",
    "name": "AI Customer Service Representative",
    "description": "AI Customer Service Representative provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "department-supervisor",
    "name": "AI Department Supervisor",
    "description": "AI Department Supervisor provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "digital-director",
    "name": "AI Digital Director",
    "description": "AI Digital Director provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "district-manager",
    "name": "AI District Manager",
    "description": "AI District Manager provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "finance-director",
    "name": "AI Finance Director",
    "description": "AI Finance Director provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "human-resources-director",
    "name": "AI Human Resources Director",
    "description": "AI Human Resources Director provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "international-director",
    "name": "AI International Director",
    "description": "AI International Director provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "inventory-coordinator",
    "name": "AI Inventory Coordinator",
    "description": "AI Inventory Coordinator provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "inventory-planning-director",
    "name": "AI Inventory Planning Director",
    "description": "AI Inventory Planning Director provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "inventory-replenishment-agent",
    "name": "AI Inventory Replenishment Agent",
    "description": "AI Inventory Replenishment Agent provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "local-assortment-planner",
    "name": "AI Local Assortment Planner",
    "description": "AI Local Assortment Planner provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "loss-prevention-director",
    "name": "AI Loss Prevention Director",
    "description": "AI Loss Prevention Director provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "loss-prevention-specialist",
    "name": "AI Loss Prevention Specialist",
    "description": "AI Loss Prevention Specialist provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "loyalty-segment-planner",
    "name": "AI Loyalty Segment Planner",
    "description": "AI Loyalty Segment Planner provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "marketing-director",
    "name": "AI Marketing Director",
    "description": "AI Marketing Director provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "mystery-shop-summarizer",
    "name": "AI Mystery Shop Summarizer",
    "description": "AI Mystery Shop Summarizer provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "omnichannel-pickup-coordinator",
    "name": "AI Omnichannel Pickup Coordinator",
    "description": "AI Omnichannel Pickup Coordinator provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "operations-director",
    "name": "AI Operations Director",
    "description": "AI Operations Director provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "operations-manager",
    "name": "AI Operations Manager",
    "description": "AI Operations Manager provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "planogram-auditor",
    "name": "AI Planogram Auditor",
    "description": "AI Planogram Auditor provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "pos-exception-monitor",
    "name": "AI POS Exception Monitor",
    "description": "AI POS Exception Monitor provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "price-compliance-auditor",
    "name": "AI Price Compliance Auditor",
    "description": "AI Price Compliance Auditor provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "promotion-performance-analyst",
    "name": "AI Promotion Performance Analyst",
    "description": "AI Promotion Performance Analyst provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "real-estate-director",
    "name": "AI Real Estate Director",
    "description": "AI Real Estate Director provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "receiving-clerk",
    "name": "AI Receiving Clerk",
    "description": "AI Receiving Clerk provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "returns-desk-assistant",
    "name": "AI Returns Desk Assistant",
    "description": "AI Returns Desk Assistant provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "sales-associate",
    "name": "AI Sales Associate",
    "description": "AI Sales Associate provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "seasonal-allocation-agent",
    "name": "AI Seasonal Allocation Agent",
    "description": "AI Seasonal Allocation Agent provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "security-officer",
    "name": "AI Security Officer",
    "description": "AI Security Officer provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "shelf-availability-monitor",
    "name": "AI Shelf Availability Monitor",
    "description": "AI Shelf Availability Monitor provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "shrinkage-risk-detector",
    "name": "AI Shrinkage Risk Detector",
    "description": "AI Shrinkage Risk Detector provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "stock-associate",
    "name": "AI Stock Associate",
    "description": "AI Stock Associate provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "store-labor-scheduler",
    "name": "AI Store Labor Scheduler",
    "description": "AI Store Labor Scheduler provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "store-manager",
    "name": "AI Store Manager",
    "description": "AI Store Manager provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "store-opening-checklist-agent",
    "name": "AI Store Opening Checklist Agent",
    "description": "AI Store Opening Checklist Agent provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "store-performance-director",
    "name": "AI Store Performance Director",
    "description": "AI Store Performance Director provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "store-traffic-analyst",
    "name": "AI Store Traffic Analyst",
    "description": "AI Store Traffic Analyst provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "supplier-fill-rate-tracker",
    "name": "AI Supplier Fill-rate Tracker",
    "description": "AI Supplier Fill-rate Tracker provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "sustainability-director",
    "name": "AI Sustainability Director",
    "description": "AI Sustainability Director provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "technology-director",
    "name": "AI Technology Director",
    "description": "AI Technology Director provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "visual-merchandiser",
    "name": "AI Visual Merchandiser",
    "description": "AI Visual Merchandiser provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "visual-merchandising-director",
    "name": "AI Visual Merchandising Director",
    "description": "AI Visual Merchandising Director provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "vp-customer-experience",
    "name": "AI VP Customer Experience",
    "description": "The AI VP Customer Experience oversees all customer experience initiatives, manages customer service, develops CX strategies, and ensures exceptional customer journeys across all touchpoints.",
    "color": "#C62828",
    "efficiency": "44x efficiency improvement"
  },
  {
    "id": "vp-e-commerce",
    "name": "AI VP E-commerce",
    "description": "AI VP E-commerce provides specialized expertise and executes critical tasks for the Retail & Stores department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#06B6D4",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "vp-inventory-management",
    "name": "AI VP Inventory Management",
    "description": "The AI VP Inventory Management oversees all inventory operations, manages stock levels, replenishment, and demand planning to optimize inventory turnover and minimize stockouts.",
    "color": "#6D4C41",
    "efficiency": "42x efficiency improvement"
  },
  {
    "id": "vp-loss-prevention",
    "name": "AI VP Loss Prevention",
    "description": "The AI VP Loss Prevention oversees all loss prevention initiatives, manages security, fraud detection, and asset protection to minimize shrinkage and ensure store safety.",
    "color": "#424242",
    "efficiency": "41x efficiency improvement"
  },
  {
    "id": "vp-merchandising",
    "name": "AI VP Merchandising",
    "description": "The AI VP Merchandising oversees all merchandising operations, manages product assortment, pricing strategies, and visual merchandising to maximize sales and profitability.",
    "color": "#FF6F00",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "vp-retail-analytics",
    "name": "AI VP Retail Analytics",
    "description": "The AI VP Retail Analytics oversees all retail analytics initiatives, manages data analysis, business intelligence, forecasting, and reporting to provide actionable insights for decision-making.",
    "color": "#00695C",
    "efficiency": "42x efficiency improvement"
  },
  {
    "id": "vp-retail-marketing",
    "name": "AI VP Retail Marketing",
    "description": "The AI VP Retail Marketing oversees all retail marketing initiatives, manages brand strategy, promotions, advertising, and customer engagement to drive brand awareness and sales.",
    "color": "#C2185B",
    "efficiency": "44x efficiency improvement"
  },
  {
    "id": "vp-retail-technology",
    "name": "AI VP Retail Technology",
    "description": "The AI VP Retail Technology oversees all retail technology initiatives, manages POS systems, e-commerce platforms, digital experiences, and IT infrastructure to enable digital transformation.",
    "color": "#0277BD",
    "efficiency": "42x efficiency improvement"
  },
  {
    "id": "vp-sales",
    "name": "AI VP Sales",
    "description": "The AI VP Sales oversees all sales operations, manages sales teams, develops sales strategies, and drives revenue growth across all retail channels.",
    "color": "#2E7D32",
    "efficiency": "42x efficiency improvement"
  },
  {
    "id": "vp-store-development",
    "name": "AI VP Store Development",
    "description": "The AI VP Store Development oversees all store development initiatives, manages real estate, construction, store design, and facilities to support store network expansion and optimization.",
    "color": "#455A64",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "vp-store-operations",
    "name": "AI VP Store Operations",
    "description": "The AI VP Store Operations oversees all store operations, manages store performance, ensures operational excellence, and drives store efficiency and profitability.",
    "color": "#F57C00",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "vp-supply-chain",
    "name": "AI VP Supply Chain",
    "description": "The AI VP Supply Chain oversees all supply chain operations, manages logistics, warehousing, distribution, and transportation to ensure efficient product flow and cost optimization.",
    "color": "#1565C0",
    "efficiency": "41x efficiency improvement"
  }
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="retail-stores"
      agents={DEPARTMENT_AGENTS}
    />
  );
}
