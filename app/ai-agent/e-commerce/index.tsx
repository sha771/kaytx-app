import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';

const DEPARTMENT_AGENTS = [
  {
    "id": "chief-commerce-officer",
    "name": "AI Chief Commerce Officer",
    "description": "The AI Chief Commerce Officer oversees all e-commerce operations, digital sales strategy, online customer experience, and drives overall e-commerce growth and profitability.",
    "color": "#1565C0",
    "efficiency": "50x efficiency improvement"
  },
  {
    "id": "customer-support-lead",
    "name": "AI Customer Support Lead",
    "description": "The AI Customer Support Lead manages customer support operations, ensures customer satisfaction, and resolves issues efficiently.",
    "color": "#FF6B6B",
    "efficiency": "18x efficiency improvement"
  },
  {
    "id": "inventory-manager",
    "name": "AI Inventory Manager",
    "description": "The AI Inventory Manager manages inventory levels, optimizes stock, and ensures product availability.",
    "color": "#FF6B6B",
    "efficiency": "22x efficiency improvement"
  },
  {
    "id": "order-processing-manager",
    "name": "AI Order Processing Manager",
    "description": "The AI Order Processing Manager manages order processing, optimizes fulfillment, and ensures timely delivery.",
    "color": "#FF6B6B",
    "efficiency": "20x efficiency improvement"
  },
  {
    "id": "pricing-strategist",
    "name": "AI Pricing Strategist",
    "description": "The AI Pricing Strategist develops pricing strategies, optimizes pricing models, and maximizes revenue.",
    "color": "#FF6B6B",
    "efficiency": "21x efficiency improvement"
  },
  {
    "id": "returns-refunds-manager",
    "name": "AI Returns & Refunds Manager",
    "description": "The AI Returns & Refunds Manager manages returns and refunds, optimizes the process, and ensures customer satisfaction.",
    "color": "#FF6B6B",
    "efficiency": "17x efficiency improvement"
  },
  {
    "id": "store-manager",
    "name": "AI Store Manager",
    "description": "The AI Store Manager manages e-commerce store operations, optimizes store performance, and ensures customer satisfaction.",
    "color": "#FF6B6B",
    "efficiency": "25x efficiency improvement"
  },
  {
    "id": "vp-customer-experience",
    "name": "AI VP Customer Experience",
    "description": "The AI VP Customer Experience oversees customer journey, customer service, user experience design, and ensures exceptional customer satisfaction across all e-commerce touchpoints.",
    "color": "#E91E63",
    "efficiency": "41x efficiency improvement"
  },
  {
    "id": "vp-data-analytics",
    "name": "AI VP Data Analytics",
    "description": "The AI VP Data Analytics oversees e-commerce data strategy, analytics platforms, business intelligence, and drives data-driven decision making across the organization.",
    "color": "#00897B",
    "efficiency": "42x efficiency improvement"
  },
  {
    "id": "vp-growth",
    "name": "AI VP Growth",
    "description": "The AI VP Growth drives e-commerce growth initiatives, customer acquisition strategies, market expansion, and implements data-driven growth hacking techniques.",
    "color": "#7B1FA2",
    "efficiency": "41x efficiency improvement"
  },
  {
    "id": "vp-international",
    "name": "AI VP International",
    "description": "The AI VP International oversees international e-commerce expansion, cross-border operations, localization, and manages global market entry strategies.",
    "color": "#1565C0",
    "efficiency": "42x efficiency improvement"
  },
  {
    "id": "vp-loyalty-retention",
    "name": "AI VP Loyalty & Retention",
    "description": "The AI VP Loyalty & Retention oversees customer loyalty programs, retention strategies, customer lifecycle management, and drives long-term customer value and engagement.",
    "color": "#FF6F00",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "vp-marketing",
    "name": "AI VP Marketing",
    "description": "The AI VP Marketing oversees e-commerce marketing strategy, digital marketing campaigns, brand management, customer acquisition, and drives marketing ROI.",
    "color": "#E65100",
    "efficiency": "44x efficiency improvement"
  },
  {
    "id": "vp-marketplace-operations",
    "name": "AI VP Marketplace Operations",
    "description": "The AI VP Marketplace Operations manages marketplace operations, optimizes seller performance, and ensures platform efficiency.",
    "color": "#FF6B6B",
    "efficiency": "30x efficiency improvement"
  },
  {
    "id": "vp-mobile-commerce",
    "name": "AI VP Mobile Commerce",
    "description": "The AI VP Mobile Commerce oversees mobile app strategy, mobile user experience, mobile commerce operations, and drives mobile-first shopping initiatives.",
    "color": "#7B1FA2",
    "efficiency": "41x efficiency improvement"
  },
  {
    "id": "vp-operations",
    "name": "AI VP Operations",
    "description": "The AI VP Operations oversees e-commerce operations, fulfillment, logistics, inventory management, and ensures operational excellence across the e-commerce value chain.",
    "color": "#616161",
    "efficiency": "41x efficiency improvement"
  },
  {
    "id": "vp-partnerships",
    "name": "AI VP Partnerships",
    "description": "The AI VP Partnerships oversees strategic partnerships, affiliate programs, marketplace integrations, and manages collaborative relationships to expand e-commerce reach.",
    "color": "#00838F",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "vp-product",
    "name": "AI VP Product",
    "description": "The AI VP Product oversees e-commerce product strategy, product management, merchandising, and ensures optimal product assortment and pricing strategies.",
    "color": "#F57C00",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "vp-sales",
    "name": "AI VP Sales",
    "description": "The AI VP Sales oversees e-commerce sales operations, manages sales targets, drives revenue growth, and leads the digital sales team to achieve business objectives.",
    "color": "#2E7D32",
    "efficiency": "44x efficiency improvement"
  },
  {
    "id": "vp-supply-chain",
    "name": "AI VP Supply Chain",
    "description": "The AI VP Supply Chain oversees end-to-end supply chain operations, vendor management, logistics optimization, and ensures efficient product flow from suppliers to customers.",
    "color": "#5D4037",
    "efficiency": "41x efficiency improvement"
  },
  {
    "id": "vp-technology",
    "name": "AI VP Technology",
    "description": "The AI VP Technology oversees e-commerce technology infrastructure, platform development, technical architecture, and ensures technology excellence across all e-commerce systems.",
    "color": "#1976D2",
    "efficiency": "45x efficiency improvement"
  }
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="e-commerce"
      agents={DEPARTMENT_AGENTS}
    />
  );
}
