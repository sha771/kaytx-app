import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';

const DEPARTMENT_AGENTS = [
  {
    "id": "accessory-designer",
    "name": "AI Accessory Designer",
    "description": "AI Accessory Designer provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "boutique-inventory-analyst",
    "name": "AI Boutique Inventory Analyst",
    "description": "AI Boutique Inventory Analyst provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "brand-director",
    "name": "AI Brand Director",
    "description": "AI Brand Director provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "brand-manager",
    "name": "AI Brand Manager",
    "description": "The AI Brand Manager manages brand positioning, brand communication, brand campaigns, and brand equity for fashion and luxury brands.",
    "color": "#9C27B0",
    "efficiency": "42x efficiency improvement"
  },
  {
    "id": "brand-partnership-coordinator",
    "name": "AI Brand Partnership Coordinator",
    "description": "AI Brand Partnership Coordinator provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "chief-brand--luxury-officer",
    "name": "AI Chief Brand & Luxury Officer",
    "description": "AI Chief Brand & Luxury Officer provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "chief-fashion-officer",
    "name": "AI Chief Fashion Officer",
    "description": "The AI Chief Fashion Officer oversees the entire fashion and luxury division, including design strategy, brand positioning, merchandising, retail operations, and e-commerce initiatives.",
    "color": "#9C27B0",
    "efficiency": "50x efficiency improvement"
  },
  {
    "id": "collection-assortment-planner",
    "name": "AI Collection Assortment Planner",
    "description": "AI Collection Assortment Planner provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "collection-planning-director",
    "name": "AI Collection Planning Director",
    "description": "AI Collection Planning Director provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "counterfeit-risk-monitor",
    "name": "AI Counterfeit Risk Monitor",
    "description": "AI Counterfeit Risk Monitor provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "creative-director",
    "name": "AI Creative Director",
    "description": "AI Creative Director provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "design-director",
    "name": "AI Design Director",
    "description": "The AI Design Director leads the design team, oversees creative direction, manages design projects, and ensures design excellence across all fashion collections.",
    "color": "#E91E63",
    "efficiency": "43x efficiency improvement"
  },
  {
    "id": "design-operations-director",
    "name": "AI Design Operations Director",
    "description": "AI Design Operations Director provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "digital-director",
    "name": "AI Digital Director",
    "description": "AI Digital Director provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "e-commerce-director",
    "name": "AI E-commerce Director",
    "description": "AI E-commerce Director provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "fashion-designer",
    "name": "AI Fashion Designer",
    "description": "AI Fashion Designer provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "finance-director",
    "name": "AI Finance Director",
    "description": "AI Finance Director provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "fit-technician",
    "name": "AI Fit Technician",
    "description": "AI Fit Technician provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "human-resources-director",
    "name": "AI Human Resources Director",
    "description": "AI Human Resources Director provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "influencer-seeding-coordinator",
    "name": "AI Influencer Seeding Coordinator",
    "description": "AI Influencer Seeding Coordinator provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "lookbook-content-planner",
    "name": "AI Lookbook Content Planner",
    "description": "AI Lookbook Content Planner provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "luxury-experience-director",
    "name": "AI Luxury Experience Director",
    "description": "AI Luxury Experience Director provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "luxury-pricing-analyst",
    "name": "AI Luxury Pricing Analyst",
    "description": "AI Luxury Pricing Analyst provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "marketing-director",
    "name": "AI Marketing Director",
    "description": "AI Marketing Director provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "material-buyer",
    "name": "AI Material Buyer",
    "description": "AI Material Buyer provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "merchandising-director",
    "name": "AI Merchandising Director",
    "description": "AI Merchandising Director provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "merchandising-manager",
    "name": "AI Merchandising Manager",
    "description": "The AI Merchandising Manager oversees product assortment, inventory planning, pricing execution, and merchandising performance across all retail channels.",
    "color": "#FF9800",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "pattern-maker",
    "name": "AI Pattern Maker",
    "description": "AI Pattern Maker provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "personal-styling-advisor",
    "name": "AI Personal Styling Advisor",
    "description": "AI Personal Styling Advisor provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "product-drop-planner",
    "name": "AI Product Drop Planner",
    "description": "AI Product Drop Planner provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "production-coordinator",
    "name": "AI Production Coordinator",
    "description": "AI Production Coordinator provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "production-manager",
    "name": "AI Production Manager",
    "description": "AI Production Manager provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "quality-control-inspector",
    "name": "AI Quality Control Inspector",
    "description": "AI Quality Control Inspector provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "retail-director",
    "name": "AI Retail Director",
    "description": "AI Retail Director provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "returns-quality-reviewer",
    "name": "AI Returns Quality Reviewer",
    "description": "AI Returns Quality Reviewer provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "runway-calendar-coordinator",
    "name": "AI Runway Calendar Coordinator",
    "description": "AI Runway Calendar Coordinator provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "sample-maker",
    "name": "AI Sample Maker",
    "description": "AI Sample Maker provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "seasonal-demand-forecaster",
    "name": "AI Seasonal Demand Forecaster",
    "description": "AI Seasonal Demand Forecaster provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "size-curve-analyst",
    "name": "AI Size Curve Analyst",
    "description": "AI Size Curve Analyst provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "sourcing-specialist",
    "name": "AI Sourcing Specialist",
    "description": "AI Sourcing Specialist provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "supply-chain-director",
    "name": "AI Supply Chain Director",
    "description": "AI Supply Chain Director provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "sustainability-director",
    "name": "AI Sustainability Director",
    "description": "AI Sustainability Director provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "sustainable-materials-researcher",
    "name": "AI Sustainable Materials Researcher",
    "description": "AI Sustainable Materials Researcher provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "textile-designer",
    "name": "AI Textile Designer",
    "description": "AI Textile Designer provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "trend-forecaster",
    "name": "AI Trend Forecaster",
    "description": "AI Trend Forecaster provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "trim-buyer",
    "name": "AI Trim Buyer",
    "description": "AI Trim Buyer provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "vip-clienteling-specialist",
    "name": "AI VIP Clienteling Specialist",
    "description": "AI VIP Clienteling Specialist provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "visual-merchandising-auditor",
    "name": "AI Visual Merchandising Auditor",
    "description": "AI Visual Merchandising Auditor provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "vp-brand",
    "name": "AI VP Brand",
    "description": "The AI VP Brand oversees brand strategy, brand positioning, brand communication, and brand equity management across all fashion and luxury brands.",
    "color": "#9C27B0",
    "efficiency": "45x efficiency improvement"
  },
  {
    "id": "vp-design",
    "name": "AI VP Design",
    "description": "The AI VP Design oversees all design operations including fashion design, textile development, pattern making, and creative direction across all product lines.",
    "color": "#E91E63",
    "efficiency": "45x efficiency improvement"
  },
  {
    "id": "vp-e-commerce",
    "name": "AI VP E-commerce",
    "description": "AI VP E-commerce provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "vp-ecommerce",
    "name": "AI VP E-commerce",
    "description": "The AI VP E-commerce oversees all digital commerce operations including online stores, digital marketing, e-commerce strategy, and digital customer experience.",
    "color": "#2196F3",
    "efficiency": "45x efficiency improvement"
  },
  {
    "id": "vp-fashion-merchandising",
    "name": "AI VP Fashion Merchandising",
    "description": "AI VP Fashion Merchandising provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "vp-luxury-clienteling",
    "name": "AI VP Luxury Clienteling",
    "description": "AI VP Luxury Clienteling provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "vp-marketing",
    "name": "AI VP Marketing",
    "description": "The AI VP Marketing oversees all marketing operations including brand marketing, digital marketing, campaign management, and marketing analytics for fashion and luxury brands.",
    "color": "#FF5722",
    "efficiency": "44x efficiency improvement"
  },
  {
    "id": "vp-merchandising",
    "name": "AI VP Merchandising",
    "description": "The AI VP Merchandising oversees product assortment planning, inventory management, pricing strategy, and merchandising analytics across all retail channels.",
    "color": "#FF9800",
    "efficiency": "44x efficiency improvement"
  },
  {
    "id": "vp-production",
    "name": "AI VP Production",
    "description": "The AI VP Production oversees all production operations including manufacturing, quality control, production planning, and factory management for fashion and luxury products.",
    "color": "#607D8B",
    "efficiency": "43x efficiency improvement"
  },
  {
    "id": "vp-retail",
    "name": "AI VP Retail",
    "description": "The AI VP Retail oversees all retail operations including store management, retail strategy, customer experience, and retail performance across all physical locations.",
    "color": "#4CAF50",
    "efficiency": "44x efficiency improvement"
  },
  {
    "id": "vp-supply-chain",
    "name": "AI VP Supply Chain",
    "description": "The AI VP Supply Chain oversees all supply chain operations including logistics, procurement, vendor management, and inventory optimization for fashion and luxury products.",
    "color": "#795548",
    "efficiency": "44x efficiency improvement"
  },
  {
    "id": "wholesale-account-analyst",
    "name": "AI Wholesale Account Analyst",
    "description": "AI Wholesale Account Analyst provides specialized expertise and executes critical tasks for the Fashion & Luxury department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#C026D3",
    "efficiency": "40x efficiency improvement"
  }
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="fashion-luxury"
      agents={DEPARTMENT_AGENTS}
    />
  );
}
