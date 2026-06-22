/**
 * =============================================================================
 * KAYTX AI WORKFORCE - COMPLETE DATABASE (2,160 AGENTS & EMPLOYEES)
 * =============================================================================
 * Total: 720 Main Agents + 1,440 Sub-Agents = 2,160 AI Agents & Employees
 * Departments: 36 (22 Core + 14 Industry-Specific)
 * Agents per Department: 60 (20 Main + 40 Sub)
 * @version 13.0.0
 * @lastUpdated 2026-06-19T21:30:20.137Z
 * @generatedBy generate-complete-workforce.js
 */

export interface SubAgent {
  id: string;
  uid: string;
  name: string;
  title: string;
  description: string;
  capabilities: string[];
  parentId: string;
}

export interface MainAgent {
  id: string;
  uid: string;
  name: string;
  title: string;
  department: string;
  departmentId: number;
  level: 'c_level' | 'vp_director' | 'manager' | 'team_lead' | 'specialist';
  description: string;
  capabilities: string[];
  responsibilities: string[];
  icon: string;
  color: string;
  route: string;
  subAgents: SubAgent[];
  reportsTo?: string;
  aiCost: string;
  efficiency: string;
  isPremium: boolean;
}

export interface Department {
  id: number;
  name: string;
  shortName: string;
  color: string;
  icon: string;
  mainAgents: number;
  subAgents: number;
  total: number;
}

export const workforceSummary = {
  "totalDepartments": 36,
  "totalMainAgents": 660,
  "totalSubAgents": 1500,
  "totalAgents": 2160,
  "targetAgentsPerDepartment": 60
};

export const departments: Department[] = [
  {
    "id": 0,
    "name": "Customer Experience",
    "shortName": "Customer Experi",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 1,
    "name": "Sales Revenue",
    "shortName": "Sales Revenue",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 2,
    "name": "Marketing Growth",
    "shortName": "Marketing Growt",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 3,
    "name": "Operations Management",
    "shortName": "Operations Mana",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 4,
    "name": "Finance Accounting",
    "shortName": "Finance Account",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 5,
    "name": "Technology Engineering",
    "shortName": "Technology Engi",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 6,
    "name": "Human Resources",
    "shortName": "Human Resources",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 7,
    "name": "Legal Compliance",
    "shortName": "Legal Complianc",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 8,
    "name": "Data Intelligence",
    "shortName": "Data Intelligen",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 9,
    "name": "Product Management",
    "shortName": "Product Managem",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 15,
    "subAgents": 45,
    "total": 60
  },
  {
    "id": 10,
    "name": "Security Risk",
    "shortName": "Security Risk",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 15,
    "subAgents": 45,
    "total": 60
  },
  {
    "id": 11,
    "name": "Research Development",
    "shortName": "Research Develo",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 15,
    "subAgents": 45,
    "total": 60
  },
  {
    "id": 12,
    "name": "Administrative",
    "shortName": "Administrative",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 15,
    "subAgents": 45,
    "total": 60
  },
  {
    "id": 13,
    "name": "Trading Investments",
    "shortName": "Trading Investm",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 15,
    "subAgents": 45,
    "total": 60
  },
  {
    "id": 14,
    "name": "Real Estate Property",
    "shortName": "Real Estate Pro",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 15,
    "subAgents": 45,
    "total": 60
  },
  {
    "id": 15,
    "name": "Insurance Risk",
    "shortName": "Insurance Risk",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 15,
    "subAgents": 45,
    "total": 60
  },
  {
    "id": 16,
    "name": "Healthcare Medical",
    "shortName": "Healthcare Medi",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 15,
    "subAgents": 45,
    "total": 60
  },
  {
    "id": 17,
    "name": "Manufacturing Production",
    "shortName": "Manufacturing P",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 15,
    "subAgents": 45,
    "total": 60
  },
  {
    "id": 18,
    "name": "Transportation Logistics",
    "shortName": "Transportation ",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 15,
    "subAgents": 45,
    "total": 60
  },
  {
    "id": 19,
    "name": "Government Public Sector",
    "shortName": "Government Publ",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 15,
    "subAgents": 45,
    "total": 60
  },
  {
    "id": 20,
    "name": "Supply Chain Logistics",
    "shortName": "Supply Chain Lo",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 15,
    "subAgents": 45,
    "total": 60
  },
  {
    "id": 21,
    "name": "Ai Management Governance",
    "shortName": "Ai Management G",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 22,
    "name": "Banking Finance",
    "shortName": "Banking Finance",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 23,
    "name": "Ecommerce",
    "shortName": "Ecommerce",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 24,
    "name": "Professional Services",
    "shortName": "Professional Se",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 25,
    "name": "Media Entertainment",
    "shortName": "Media Entertain",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 26,
    "name": "Gaming Esports",
    "shortName": "Gaming Esports",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 27,
    "name": "Education",
    "shortName": "Education",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 28,
    "name": "Retail Stores",
    "shortName": "Retail Stores",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 29,
    "name": "Travel Tourism",
    "shortName": "Travel Tourism",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 30,
    "name": "Energy Utilities",
    "shortName": "Energy Utilitie",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 31,
    "name": "Executive Strategy",
    "shortName": "Executive Strat",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 32,
    "name": "Event Management",
    "shortName": "Event Managemen",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 33,
    "name": "Agriculture",
    "shortName": "Agriculture",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 34,
    "name": "Fashion Luxury",
    "shortName": "Fashion Luxury",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  },
  {
    "id": 35,
    "name": "Restaurants",
    "shortName": "Restaurants",
    "color": "#007AFF",
    "icon": "Bot",
    "mainAgents": 20,
    "subAgents": 40,
    "total": 60
  }
];

export const departmentConfigurations = {
  "customer-experience": {
    "id": "customer-experience",
    "name": "Customer Experience",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "sales-revenue": {
    "id": "sales-revenue",
    "name": "Sales Revenue",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "marketing-growth": {
    "id": "marketing-growth",
    "name": "Marketing Growth",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "operations-management": {
    "id": "operations-management",
    "name": "Operations Management",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "finance-accounting": {
    "id": "finance-accounting",
    "name": "Finance Accounting",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "technology-engineering": {
    "id": "technology-engineering",
    "name": "Technology Engineering",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "human-resources": {
    "id": "human-resources",
    "name": "Human Resources",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "legal-compliance": {
    "id": "legal-compliance",
    "name": "Legal Compliance",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "data-intelligence": {
    "id": "data-intelligence",
    "name": "Data Intelligence",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "product-management": {
    "id": "product-management",
    "name": "Product Management",
    "mainAgents": 15,
    "subAgents": 45,
    "totalAgents": 60
  },
  "security-risk": {
    "id": "security-risk",
    "name": "Security Risk",
    "mainAgents": 15,
    "subAgents": 45,
    "totalAgents": 60
  },
  "research-development": {
    "id": "research-development",
    "name": "Research Development",
    "mainAgents": 15,
    "subAgents": 45,
    "totalAgents": 60
  },
  "administrative": {
    "id": "administrative",
    "name": "Administrative",
    "mainAgents": 15,
    "subAgents": 45,
    "totalAgents": 60
  },
  "trading-investments": {
    "id": "trading-investments",
    "name": "Trading Investments",
    "mainAgents": 15,
    "subAgents": 45,
    "totalAgents": 60
  },
  "real-estate-property": {
    "id": "real-estate-property",
    "name": "Real Estate Property",
    "mainAgents": 15,
    "subAgents": 45,
    "totalAgents": 60
  },
  "insurance-risk": {
    "id": "insurance-risk",
    "name": "Insurance Risk",
    "mainAgents": 15,
    "subAgents": 45,
    "totalAgents": 60
  },
  "healthcare-medical": {
    "id": "healthcare-medical",
    "name": "Healthcare Medical",
    "mainAgents": 15,
    "subAgents": 45,
    "totalAgents": 60
  },
  "manufacturing-production": {
    "id": "manufacturing-production",
    "name": "Manufacturing Production",
    "mainAgents": 15,
    "subAgents": 45,
    "totalAgents": 60
  },
  "transportation-logistics": {
    "id": "transportation-logistics",
    "name": "Transportation Logistics",
    "mainAgents": 15,
    "subAgents": 45,
    "totalAgents": 60
  },
  "government-public-sector": {
    "id": "government-public-sector",
    "name": "Government Public Sector",
    "mainAgents": 15,
    "subAgents": 45,
    "totalAgents": 60
  },
  "supply-chain-logistics": {
    "id": "supply-chain-logistics",
    "name": "Supply Chain Logistics",
    "mainAgents": 15,
    "subAgents": 45,
    "totalAgents": 60
  },
  "ai-management-governance": {
    "id": "ai-management-governance",
    "name": "Ai Management Governance",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "banking-finance": {
    "id": "banking-finance",
    "name": "Banking Finance",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "ecommerce": {
    "id": "ecommerce",
    "name": "Ecommerce",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "professional-services": {
    "id": "professional-services",
    "name": "Professional Services",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "media-entertainment": {
    "id": "media-entertainment",
    "name": "Media Entertainment",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "gaming-esports": {
    "id": "gaming-esports",
    "name": "Gaming Esports",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "education": {
    "id": "education",
    "name": "Education",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "retail-stores": {
    "id": "retail-stores",
    "name": "Retail Stores",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "travel-tourism": {
    "id": "travel-tourism",
    "name": "Travel Tourism",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "energy-utilities": {
    "id": "energy-utilities",
    "name": "Energy Utilities",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "executive-strategy": {
    "id": "executive-strategy",
    "name": "Executive Strategy",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "event-management": {
    "id": "event-management",
    "name": "Event Management",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "agriculture": {
    "id": "agriculture",
    "name": "Agriculture",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "fashion-luxury": {
    "id": "fashion-luxury",
    "name": "Fashion Luxury",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  },
  "restaurants": {
    "id": "restaurants",
    "name": "Restaurants",
    "mainAgents": 20,
    "subAgents": 40,
    "totalAgents": 60
  }
};
