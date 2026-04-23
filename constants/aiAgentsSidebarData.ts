import {
  Bot, Crown, Calculator, Monitor, Megaphone, Headphones, Settings, Users, Scale,
  ShieldCheck, TrendingUp, Building, ShieldAlert, Activity, Zap, Truck, Building2,
  Database, Command, Brain, Network, Sparkles, Target, Layers, AlertTriangle, Heart,
  Star, Smile, Trophy, Phone, ClipboardList, FileText, DollarSign, UserPlus, FileSignature,
  Handshake, LineChart, GraduationCap, Globe, Mail, Search, Share2, PieChart, BarChart3,
  Lightbulb, Shield, Fingerprint, Siren, Lock, Cog, HardDrive, Server, Cpu, CheckSquare,
  Code, Clipboard, CheckCircle, Workflow, Rocket, Microscope, FileCheck, Briefcase,
  Factory, Landmark, LandPlot, Home, Stethoscope, HeartPulse, Package, Navigation,
  MessageSquare, Clock, Hash, Radio, Video, Inbox, Send, Eye, Palette, Image,
  Filter, MapPin, Sun, Moon, Bell, ChevronRight, X, Menu, Plus, Minus, Divide,
  Calendar,
} from 'lucide-react-native';

export const aiAgentsSidebarSections = [
  // Section 1: Customer Experience (14 agents)
  {
    id: '2-section-dept1',
    title: '3: Customer Experience (14)',
    icon: Headphones,
    subSections: [
      {
        id: '2-cx-main',
        title: 'Main Agents (6)',
        icon: Headphones,
        items: [
          { id: '2-cco-dept', title: 'CCO - Chief Customer Officer', icon: Headphones },
          { id: '2-vp-customer-success', title: 'VP Customer Success', icon: Star },
          { id: '2-vp-support', title: 'VP Support', icon: Headphones },
          { id: '2-vp-experience', title: 'VP Experience', icon: Smile },
          { id: '2-vp-retention', title: 'VP Retention', icon: Heart },
          { id: '2-vp-loyalty', title: 'VP Loyalty', icon: Trophy },
        ]
      },
      {
        id: '2-cx-sub',
        title: 'Sub-Agents (8)',
        icon: Bot,
        items: [
          { id: '2-cx-receptionist', title: 'CX Receptionist', icon: Phone },
          { id: '2-cx-support', title: 'Customer Support Agent', icon: Headphones },
          { id: '2-cx-ticket', title: 'Ticket Resolution Agent', icon: ClipboardList },
          { id: '2-cx-complaint', title: 'Complaint Handling Agent', icon: AlertTriangle },
          { id: '2-cx-retention', title: 'Retention Specialist', icon: Heart },
          { id: '2-cx-loyalty', title: 'Loyalty & Engagement Agent', icon: Trophy },
          { id: '2-cx-feedback', title: 'Feedback & Survey Agent', icon: FileText },
          { id: '2-cx-billing', title: 'Billing Support Agent', icon: DollarSign },
        ]
      },
    ]
  },
  // Section 2: Sales & Revenue (14 agents)
  {
    id: '2-section-dept2',
    title: '4: Sales & Revenue (14)',
    icon: TrendingUp,
    subSections: [
      {
        id: '2-sales-main',
        title: 'Main Agents (5)',
        icon: TrendingUp,
        items: [
          { id: '2-vp-sales', title: 'VP Sales', icon: TrendingUp },
          { id: '2-vp-revenue', title: 'VP Revenue', icon: DollarSign },
          { id: '2-vp-bizdev', title: 'VP Business Development', icon: Target },
          { id: '2-vp-channel', title: 'VP Channel Partners', icon: Share2 },
          { id: '2-sales-ops-mgr', title: 'Sales Operations Manager', icon: Settings },
        ]
      },
      {
        id: '2-sales-sub',
        title: 'Sub-Agents (9)',
        icon: Bot,
        items: [
          { id: '2-sales-sdr', title: 'Lead Development Rep (SDR)', icon: UserPlus },
          { id: '2-sales-rep', title: 'Sales Rep', icon: Target },
          { id: '2-sales-exec', title: 'Sales Executive', icon: TrendingUp },
          { id: '2-sales-crm', title: 'CRM Assistant', icon: Database },
          { id: '2-sales-proposal', title: 'Proposal Generator', icon: FileSignature },
          { id: '2-sales-negotiator', title: 'Negotiator', icon: Handshake },
          { id: '2-sales-pricing', title: 'Pricing Analyst', icon: DollarSign },
          { id: '2-sales-forecast', title: 'Sales Forecasting Agent', icon: LineChart },
          { id: '2-sales-enablement', title: 'Sales Enablement Agent', icon: GraduationCap },
        ]
      },
    ]
  },
  // Section 3: Marketing & Growth (15 agents)
  {
    id: '2-section-dept3',
    title: '5: Marketing & Growth (15)',
    icon: Megaphone,
    subSections: [
      {
        id: '2-mkt-main',
        title: 'Main Agents (7)',
        icon: Megaphone,
        items: [
          { id: '2-cmo-dept', title: 'CMO - Chief Marketing Officer', icon: Megaphone },
          { id: '2-vp-marketing', title: 'VP Marketing', icon: Megaphone },
          { id: '2-vp-brand', title: 'VP Brand', icon: Star },
          { id: '2-vp-growth', title: 'VP Growth', icon: TrendingUp },
          { id: '2-vp-content', title: 'VP Content', icon: FileText },
          { id: '2-vp-digital', title: 'VP Digital', icon: Globe },
          { id: '2-mkt-mgr', title: 'Marketing Manager', icon: Megaphone },
        ]
      },
      {
        id: '2-mkt-sub',
        title: 'Sub-Agents (8)',
        icon: Bot,
        items: [
          { id: '2-mkt-content', title: 'Content Marketing Agent', icon: FileText },
          { id: '2-mkt-seo', title: 'SEO Specialist', icon: Search },
          { id: '2-mkt-social', title: 'Social Media Manager', icon: Share2 },
          { id: '2-mkt-email', title: 'Email Marketing Agent', icon: Mail },
          { id: '2-mkt-ads', title: 'Ad Campaign Manager', icon: Target },
          { id: '2-mkt-analytics', title: 'Marketing Analytics Agent', icon: BarChart3 },
          { id: '2-mkt-brand', title: 'Brand Manager', icon: Star },
          { id: '2-mkt-growth', title: 'Growth Hacker', icon: Zap },
        ]
      },
    ]
  },
  // Section 4: Operations & Management (13+ agents)
  {
    id: '2-section-dept4',
    title: '6: Operations & Management (13+)',
    icon: Settings,
    subSections: [
      {
        id: '2-ops-main',
        title: 'Main Agents (7)',
        icon: Settings,
        items: [
          { id: '2-coo-dept', title: 'COO - Chief Operating Officer', icon: Settings },
          { id: '2-vp-operations', title: 'VP Operations', icon: Settings },
          { id: '2-vp-supply-chain', title: 'VP Supply Chain', icon: Truck },
          { id: '2-vp-quality', title: 'VP Quality', icon: CheckCircle },
          { id: '2-vp-facilities', title: 'VP Facilities', icon: Building2 },
          { id: '2-vp-project-mgmt', title: 'VP Project Management', icon: ClipboardList },
          { id: '2-ops-mgr', title: 'Operations Manager', icon: Settings },
        ]
      },
      {
        id: '2-ops-sub',
        title: 'Sub-Agents (6+)',
        icon: Bot,
        items: [
          { id: '2-ai-ops-mgr', title: 'AI Operations Manager', icon: Settings },
          { id: '2-ai-workflow', title: 'Workflow Automation Agent', icon: Workflow },
          { id: '2-ai-task-coord', title: 'Task Coordinator', icon: ClipboardList },
          { id: '2-ai-process-opt', title: 'Process Optimization Agent', icon: Zap },
          { id: '2-ai-resource', title: 'Resource Planner', icon: Users },
          { id: '2-ai-qa', title: 'Quality Assurance Agent', icon: CheckCircle },
        ]
      },
    ]
  },
  // Section 5: Finance & Accounting (13 agents)
  {
    id: '2-section-dept5',
    title: '7: Finance & Accounting (13)',
    icon: Calculator,
    subSections: [
      {
        id: '2-fin-main',
        title: 'Main Agents (8)',
        icon: Calculator,
        items: [
          { id: '2-cfo-dept', title: 'CFO - Chief Financial Officer', icon: Calculator },
          { id: '2-vp-finance', title: 'VP Finance', icon: DollarSign },
          { id: '2-vp-accounting', title: 'VP Accounting', icon: Calculator },
          { id: '2-vp-treasury', title: 'VP Treasury', icon: DollarSign },
          { id: '2-vp-investor-rel', title: 'VP Investor Relations', icon: Handshake },
          { id: '2-controller', title: 'Controller', icon: Calculator },
          { id: '2-fin-mgr', title: 'Finance Manager', icon: DollarSign },
          { id: '2-acct-mgr', title: 'Accounting Manager', icon: Calculator },
        ]
      },
      {
        id: '2-fin-sub',
        title: 'Sub-Agents (5)',
        icon: Bot,
        items: [
          { id: '2-fin-analyst', title: 'Financial Analyst', icon: BarChart3 },
          { id: '2-budget-mgr', title: 'Budget Manager', icon: Calculator },
          { id: '2-tax-specialist', title: 'Tax Specialist', icon: FileText },
          { id: '2-audit-mgr', title: 'Audit Manager', icon: CheckSquare },
          { id: '2-treasury-analyst', title: 'Treasury Analyst', icon: DollarSign },
        ]
      },
    ]
  },
  // Section 6: Technology & Engineering (16+ agents)
  {
    id: '2-section-dept6',
    title: '8: Technology & Engineering (16+)',
    icon: Code,
    subSections: [
      {
        id: '2-tech-main',
        title: 'Main Agents (10)',
        icon: Code,
        items: [
          { id: '2-cto-dept', title: 'CTO - Chief Technology Officer', icon: Monitor },
          { id: '2-vp-engineering', title: 'VP Engineering', icon: Code },
          { id: '2-vp-infra', title: 'VP Infrastructure', icon: Server },
          { id: '2-vp-aiml', title: 'VP AI/ML', icon: Brain },
          { id: '2-vp-security-tech', title: 'VP Security Technology', icon: Shield },
          { id: '2-architect-lead', title: 'Lead Architect', icon: Code },
          { id: '2-devops-mgr', title: 'DevOps Manager', icon: Cog },
          { id: '2-frontend-lead', title: 'Frontend Lead', icon: Monitor },
          { id: '2-backend-lead', title: 'Backend Lead', icon: Code },
          { id: '2-sre-lead', title: 'SRE Lead', icon: HardDrive },
        ]
      },
      {
        id: '2-tech-sub',
        title: 'Sub-Agents (6+)',
        icon: Bot,
        items: [
          { id: '2-frontend-dev', title: 'Frontend Developer', icon: Monitor },
          { id: '2-backend-dev', title: 'Backend Developer', icon: Code },
          { id: '2-sre-engineer', title: 'SRE Engineer', icon: HardDrive },
          { id: '2-qa-automation', title: 'QA Automation Engineer', icon: CheckSquare },
          { id: '2-data-engineer', title: 'Data Engineer', icon: Database },
          { id: '2-security-engineer', title: 'Security Engineer', icon: Shield },
        ]
      },
    ]
  },
  // Section 7: Human Resources (11+ agents)
  {
    id: '2-section-dept7',
    title: '9: Human Resources (11+)',
    icon: Users,
    subSections: [
      {
        id: '2-hr-main',
        title: 'Main Agents (7)',
        icon: Users,
        items: [
          { id: '2-chro-dept', title: 'CHRO - Chief HR Officer', icon: Users },
          { id: '2-vp-talent', title: 'VP Talent', icon: UserPlus },
          { id: '2-vp-hr-ops', title: 'VP HR Operations', icon: Settings },
          { id: '2-vp-learning', title: 'VP Learning', icon: GraduationCap },
          { id: '2-vp-culture', title: 'VP Culture', icon: Heart },
          { id: '2-vp-compensation', title: 'VP Compensation', icon: DollarSign },
          { id: '2-recruiting-mgr', title: 'Recruiting Manager', icon: UserPlus },
        ]
      },
      {
        id: '2-hr-sub',
        title: 'Sub-Agents (4+)',
        icon: Bot,
        items: [
          { id: '2-ai-recruiter', title: 'AI Recruiter', icon: UserPlus },
          { id: '2-hr-ops-spec', title: 'HR Operations Specialist', icon: Settings },
          { id: '2-learning-spec', title: 'Learning Specialist', icon: GraduationCap },
          { id: '2-comp-analyst', title: 'Compensation Analyst', icon: DollarSign },
        ]
      },
    ]
  },
  // Section 8: Legal & Compliance (10+ agents)
  {
    id: '2-section-dept8',
    title: '10: Legal & Compliance (10+)',
    icon: Scale,
    subSections: [
      {
        id: '2-legal-main',
        title: 'Main Agents (7)',
        icon: Scale,
        items: [
          { id: '2-clo-dept', title: 'CLO - Chief Legal Officer', icon: Scale },
          { id: '2-vp-legal', title: 'VP Legal', icon: Scale },
          { id: '2-vp-compliance', title: 'VP Compliance', icon: Shield },
          { id: '2-vp-contracts', title: 'VP Contracts', icon: FileSignature },
          { id: '2-vp-ip', title: 'VP Intellectual Property', icon: Lightbulb },
          { id: '2-vp-governance', title: 'VP Governance', icon: Landmark },
          { id: '2-compliance-mgr', title: 'Compliance Manager', icon: Shield },
        ]
      },
      {
        id: '2-legal-sub',
        title: 'Sub-Agents (3+)',
        icon: Bot,
        items: [
          { id: '2-legal-researcher', title: 'Legal Researcher', icon: Search },
          { id: '2-contract-spec', title: 'Contract Specialist', icon: FileSignature },
          { id: '2-compliance-analyst', title: 'Compliance Analyst', icon: Shield },
        ]
      },
    ]
  },
  // Section 9: Data & Intelligence (13+ agents)
  {
    id: '2-section-dept9',
    title: '11: Data & Intelligence (13+)',
    icon: Database,
    subSections: [
      {
        id: '2-data-main',
        title: 'Main Agents (7)',
        icon: Database,
        items: [
          { id: '2-cdao-dept', title: 'CDAO - Chief Data & AI Officer', icon: Database },
          { id: '2-vp-data-science', title: 'VP Data Science', icon: Brain },
          { id: '2-vp-data-eng', title: 'VP Data Engineering', icon: Database },
          { id: '2-vp-analytics', title: 'VP Analytics', icon: BarChart3 },
          { id: '2-vp-bi', title: 'VP Business Intelligence', icon: PieChart },
          { id: '2-data-mgr', title: 'Data Manager', icon: Database },
          { id: '2-analytics-mgr', title: 'Analytics Manager', icon: BarChart3 },
        ]
      },
      {
        id: '2-data-sub',
        title: 'Sub-Agents (6+)',
        icon: Bot,
        items: [
          { id: '2-data-scientist', title: 'Data Scientist', icon: Brain },
          { id: '2-data-analyst', title: 'Data Analyst', icon: BarChart3 },
          { id: '2-bi-developer', title: 'BI Developer', icon: PieChart },
          { id: '2-ml-engineer', title: 'ML Engineer', icon: Cpu },
          { id: '2-data-steward', title: 'Data Steward', icon: Database },
          { id: '2-analytics-spec', title: 'Analytics Specialist', icon: BarChart3 },
        ]
      },
    ]
  },
  // Section 10: Product Management (10+ agents)
  {
    id: '2-section-dept10',
    title: '12: Product Management (10+)',
    icon: Lightbulb,
    subSections: [
      {
        id: '2-prod-main',
        title: 'Main Agents (5)',
        icon: Lightbulb,
        items: [
          { id: '2-vp-product', title: 'VP Product', icon: Lightbulb },
          { id: '2-vp-product-strategy', title: 'VP Product Strategy', icon: Target },
          { id: '2-vp-product-ops', title: 'VP Product Operations', icon: Settings },
          { id: '2-product-mgr', title: 'Product Manager', icon: Lightbulb },
          { id: '2-product-owner', title: 'Product Owner', icon: CheckSquare },
        ]
      },
      {
        id: '2-prod-sub',
        title: 'Sub-Agents (5+)',
        icon: Bot,
        items: [
          { id: '2-ai-product-mgr', title: 'AI Product Manager', icon: Lightbulb },
          { id: '2-ai-product-analyst', title: 'AI Product Analyst', icon: BarChart3 },
          { id: '2-ai-ux-researcher', title: 'AI UX Researcher', icon: Search },
          { id: '2-ai-product-marketer', title: 'AI Product Marketer', icon: Megaphone },
          { id: '2-ai-release-mgr', title: 'AI Release Manager', icon: Rocket },
        ]
      },
    ]
  },
  // Section 11: Security & Risk (12+ agents)
  {
    id: '2-section-dept11',
    title: '13: Security & Risk (12+)',
    icon: ShieldAlert,
    subSections: [
      {
        id: '2-sec-main',
        title: 'Main Agents (7)',
        icon: ShieldAlert,
        items: [
          { id: '2-ciso-dept', title: 'CISO - Chief Security Officer', icon: ShieldCheck },
          { id: '2-vp-security-ops', title: 'VP Security Operations', icon: Shield },
          { id: '2-vp-cyber', title: 'VP Cybersecurity', icon: Lock },
          { id: '2-vp-gov-risk', title: 'VP Governance & Risk', icon: Scale },
          { id: '2-vp-privacy', title: 'VP Privacy', icon: Fingerprint },
          { id: '2-security-arch', title: 'Security Architect', icon: Shield },
          { id: '2-soc-mgr', title: 'SOC Manager', icon: Siren },
        ]
      },
      {
        id: '2-sec-sub',
        title: 'Sub-Agents (5+)',
        icon: Bot,
        items: [
          { id: '2-security-analyst', title: 'Security Analyst', icon: Shield },
          { id: '2-incident-responder', title: 'Incident Responder', icon: AlertTriangle },
          { id: '2-sec-compliance', title: 'Security Compliance Specialist', icon: ShieldCheck },
          { id: '2-pen-tester', title: 'Penetration Tester', icon: Lock },
          { id: '2-identity-mgr', title: 'Identity Manager', icon: Fingerprint },
        ]
      },
    ]
  },
  // Section 12: Research & Development (9+ agents)
  {
    id: '2-section-dept12',
    title: '14: Research & Development (9+)',
    icon: Microscope,
    subSections: [
      {
        id: '2-rnd-main',
        title: 'Main Agents (5)',
        icon: Microscope,
        items: [
          { id: '2-vp-research', title: 'VP Research', icon: Microscope },
          { id: '2-vp-innovation', title: 'VP Innovation', icon: Sparkles },
          { id: '2-vp-rd-ops', title: 'VP R&D Operations', icon: Settings },
          { id: '2-research-lead', title: 'Research Lead', icon: Microscope },
          { id: '2-innovation-mgr', title: 'Innovation Manager', icon: Sparkles },
        ]
      },
      {
        id: '2-rnd-sub',
        title: 'Sub-Agents (4+)',
        icon: Bot,
        items: [
          { id: '2-research-scientist', title: 'Research Scientist', icon: Microscope },
          { id: '2-innovation-analyst', title: 'Innovation Analyst', icon: Sparkles },
          { id: '2-prototype-engineer', title: 'Prototype Engineer', icon: Cog },
          { id: '2-patent-researcher', title: 'Patent Researcher', icon: FileText },
        ]
      },
    ]
  },
  // Section 13: Administrative (9+ agents)
  {
    id: '2-section-dept13',
    title: '15: Administrative (9+)',
    icon: Briefcase,
    subSections: [
      {
        id: '2-admin-main',
        title: 'Main Agents (4)',
        icon: Briefcase,
        items: [
          { id: '2-cao-admin-dept', title: 'CAO - Chief Admin Officer', icon: Building2 },
          { id: '2-vp-admin-ops', title: 'VP Admin Operations', icon: Settings },
          { id: '2-vp-facilities-admin', title: 'VP Facilities', icon: Building2 },
          { id: '2-admin-mgr', title: 'Admin Manager', icon: Briefcase },
        ]
      },
      {
        id: '2-admin-sub',
        title: 'Sub-Agents (5+)',
        icon: Bot,
        items: [
          { id: '2-office-mgr', title: 'Office Manager', icon: Building2 },
          { id: '2-exec-asst', title: 'Executive Assistant', icon: Users },
          { id: '2-facilities-coord', title: 'Facilities Coordinator', icon: Building2 },
          { id: '2-travel-coord', title: 'Travel Coordinator', icon: Truck },
          { id: '2-doc-controller', title: 'Document Controller', icon: FileCheck },
        ]
      },
    ]
  },
  // Section 14: Trading & Investments (18+ agents)
  {
    id: '2-section-dept14',
    title: '16: Trading & Investments (18+)',
    icon: TrendingUp,
    subSections: [
      {
        id: '2-trading-main',
        title: 'Main Agents (6)',
        icon: TrendingUp,
        items: [
          { id: '2-cio-dept', title: 'CIO - Chief Investment Officer', icon: TrendingUp },
          { id: '2-vp-trading', title: 'VP Trading', icon: TrendingUp },
          { id: '2-vp-investments', title: 'VP Investments', icon: DollarSign },
          { id: '2-trading-desk-mgr', title: 'Trading Desk Manager', icon: Monitor },
          { id: '2-portfolio-mgr', title: 'Portfolio Manager', icon: PieChart },
          { id: '2-risk-mgr-trading', title: 'Trading Risk Manager', icon: ShieldAlert },
        ]
      },
      {
        id: '2-trading-sub',
        title: 'Sub-Agents (12+)',
        icon: Bot,
        items: [
          { id: '2-equity-trader', title: 'Equity Trader', icon: TrendingUp },
          { id: '2-forex-trader', title: 'Forex Trader', icon: Globe },
          { id: '2-crypto-trader', title: 'Crypto Trader', icon: Zap },
          { id: '2-derivatives-spec', title: 'Derivatives Specialist', icon: BarChart3 },
          { id: '2-portfolio-analyst', title: 'Portfolio Analyst', icon: PieChart },
          { id: '2-risk-analyst-trading', title: 'Trading Risk Analyst', icon: ShieldAlert },
          { id: '2-compliance-trading', title: 'Trading Compliance', icon: Shield },
          { id: '2-quant-analyst', title: 'Quantitative Analyst', icon: Brain },
          { id: '2-esg-analyst', title: 'ESG Analyst', icon: Star },
          { id: '2-macro-analyst', title: 'Macro Analyst', icon: Globe },
          { id: '2-algo-trading', title: 'Algo Trading Developer', icon: Code },
          { id: '2-settlement-spec', title: 'Settlement Specialist', icon: FileCheck },
        ]
      },
    ]
  },
  // Section 15: Real Estate & Property (14+ agents)
  {
    id: '2-section-dept15',
    title: '17: Real Estate & Property (14+)',
    icon: Home,
    subSections: [
      {
        id: '2-re-main',
        title: 'Main Agents (6)',
        icon: Home,
        items: [
          { id: '2-creo-dept', title: 'CREO - Chief Real Estate Officer', icon: Building },
          { id: '2-vp-property-mgmt', title: 'VP Property Management', icon: Building2 },
          { id: '2-vp-re-development', title: 'VP Real Estate Development', icon: Building },
          { id: '2-property-mgr', title: 'Property Manager', icon: Building2 },
          { id: '2-leasing-mgr', title: 'Leasing Manager', icon: FileSignature },
          { id: '2-facilities-mgr-re', title: 'Facilities Manager', icon: Building2 },
        ]
      },
      {
        id: '2-re-sub',
        title: 'Sub-Agents (8+)',
        icon: Bot,
        items: [
          { id: '2-property-analyst', title: 'Property Analyst', icon: BarChart3 },
          { id: '2-lease-admin', title: 'Lease Administrator', icon: FileSignature },
          { id: '2-tenant-relations', title: 'Tenant Relations Specialist', icon: Users },
          { id: '2-maintenance-coord', title: 'Maintenance Coordinator', icon: Cog },
          { id: '2-acquisition-analyst', title: 'Acquisition Analyst', icon: Target },
          { id: '2-asset-mgr', title: 'Asset Manager', icon: DollarSign },
          { id: '2-dev-coordinator', title: 'Development Coordinator', icon: Building },
          { id: '2-property-marketing', title: 'Property Marketing', icon: Megaphone },
        ]
      },
    ]
  },
  // Section 16: Insurance & Risk (16+ agents)
  {
    id: '2-section-dept16',
    title: '18: Insurance & Risk (16+)',
    icon: Shield,
    subSections: [
      {
        id: '2-ins-main',
        title: 'Main Agents (7)',
        icon: Shield,
        items: [
          { id: '2-cro-dept', title: 'CRO - Chief Risk Officer', icon: ShieldAlert },
          { id: '2-vp-underwriting', title: 'VP Underwriting', icon: ShieldCheck },
          { id: '2-vp-claims', title: 'VP Claims', icon: FileText },
          { id: '2-vp-risk-assessment', title: 'VP Risk Assessment', icon: ShieldAlert },
          { id: '2-underwriting-mgr', title: 'Underwriting Manager', icon: Shield },
          { id: '2-claims-mgr', title: 'Claims Manager', icon: FileText },
          { id: '2-policy-mgr', title: 'Policy Manager', icon: FileCheck },
        ]
      },
      {
        id: '2-ins-sub',
        title: 'Sub-Agents (9+)',
        icon: Bot,
        items: [
          { id: '2-underwriter', title: 'Underwriter', icon: Shield },
          { id: '2-claims-adjuster', title: 'Claims Adjuster', icon: FileText },
          { id: '2-fraud-detector', title: 'Fraud Detection Agent', icon: AlertTriangle },
          { id: '2-actuary-analyst', title: 'Actuary Analyst', icon: Calculator },
          { id: '2-risk-modeler', title: 'Risk Modeler', icon: BarChart3 },
          { id: '2-policy-admin', title: 'Policy Administrator', icon: FileCheck },
          { id: '2-customer-risk-analyst', title: 'Customer Risk Analyst', icon: Users },
          { id: '2-catastrophe-modeler', title: 'Catastrophe Modeler', icon: AlertTriangle },
          { id: '2-reinsurance-spec', title: 'Reinsurance Specialist', icon: ShieldCheck },
        ]
      },
    ]
  },
  // Section 17: Healthcare & Medical (14+ agents)
  {
    id: '2-section-dept17',
    title: '19: Healthcare & Medical (14+)',
    icon: HeartPulse,
    subSections: [
      {
        id: '2-healthcare-main',
        title: 'Main Agents (6)',
        icon: HeartPulse,
        items: [
          { id: '2-cmo-healthcare-dept', title: 'CMO - Chief Medical Officer', icon: Activity },
          { id: '2-vp-healthcare-ops', title: 'VP Healthcare Operations', icon: Settings },
          { id: '2-vp-patient-experience', title: 'VP Patient Experience', icon: Heart },
          { id: '2-patient-services-mgr', title: 'Patient Services Manager', icon: Users },
          { id: '2-medical-billing-mgr', title: 'Medical Billing Manager', icon: DollarSign },
          { id: '2-scheduling-mgr', title: 'Scheduling Manager', icon: Calendar },
        ]
      },
      {
        id: '2-healthcare-sub',
        title: 'Sub-Agents (8+)',
        icon: Bot,
        items: [
          { id: '2-patient-coordinator', title: 'Patient Coordinator', icon: Users },
          { id: '2-medical-coder', title: 'Medical Coder', icon: FileText },
          { id: '2-billing-specialist', title: 'Billing Specialist', icon: DollarSign },
          { id: '2-care-coordinator', title: 'Care Coordinator', icon: Heart },
          { id: '2-health-records-spec', title: 'Health Records Specialist', icon: FileCheck },
          { id: '2-telehealth-support', title: 'Telehealth Support', icon: Video },
          { id: '2-compliance-healthcare', title: 'Healthcare Compliance', icon: Shield },
          { id: '2-quality-improvement', title: 'Quality Improvement Specialist', icon: CheckCircle },
        ]
      },
    ]
  },
  // Section 18: Manufacturing & Production (14+ agents)
  {
    id: '2-section-dept18',
    title: '20: Manufacturing & Production (14+)',
    icon: Factory,
    subSections: [
      {
        id: '2-mfg-main',
        title: 'Main Agents (6)',
        icon: Factory,
        items: [
          { id: '2-cpo-dept', title: 'CPO - Chief Production Officer', icon: Zap },
          { id: '2-vp-manufacturing', title: 'VP Manufacturing', icon: Factory },
          { id: '2-vp-quality-assurance', title: 'VP Quality Assurance', icon: CheckCircle },
          { id: '2-production-mgr', title: 'Production Manager', icon: Factory },
          { id: '2-quality-mgr', title: 'Quality Manager', icon: CheckCircle },
          { id: '2-safety-mgr', title: 'Safety Manager', icon: Shield },
        ]
      },
      {
        id: '2-mfg-sub',
        title: 'Sub-Agents (8+)',
        icon: Bot,
        items: [
          { id: '2-production-planner', title: 'Production Planner', icon: Calendar },
          { id: '2-quality-inspector', title: 'Quality Inspector', icon: CheckSquare },
          { id: '2-supply-chain-coord', title: 'Supply Chain Coordinator', icon: Truck },
          { id: '2-maintenance-tech', title: 'Maintenance Technician', icon: Cog },
          { id: '2-inventory-controller', title: 'Inventory Controller', icon: Package },
          { id: '2-lean-specialist', title: 'Lean Specialist', icon: Zap },
          { id: '2-safety-inspector', title: 'Safety Inspector', icon: ShieldCheck },
          { id: '2-logistics-coordinator', title: 'Logistics Coordinator', icon: Truck },
        ]
      },
    ]
  },
  // Section 19: Transportation & Logistics (14+ agents)
  {
    id: '2-section-dept19',
    title: '21: Transportation & Logistics (14+)',
    icon: Truck,
    subSections: [
      {
        id: '2-logistics-main',
        title: 'Main Agents (6)',
        icon: Truck,
        items: [
          { id: '2-clo-logistics-dept', title: 'CLO - Chief Logistics Officer', icon: Truck },
          { id: '2-vp-transportation', title: 'VP Transportation', icon: Navigation },
          { id: '2-vp-logistics-ops', title: 'VP Logistics Operations', icon: Settings },
          { id: '2-fleet-mgr', title: 'Fleet Manager', icon: Truck },
          { id: '2-warehouse-mgr', title: 'Warehouse Manager', icon: Building2 },
          { id: '2-distribution-mgr', title: 'Distribution Manager', icon: Package },
        ]
      },
      {
        id: '2-logistics-sub',
        title: 'Sub-Agents (8+)',
        icon: Bot,
        items: [
          { id: '2-route-optimizer', title: 'Route Optimizer', icon: Navigation },
          { id: '2-fleet-coordinator', title: 'Fleet Coordinator', icon: Truck },
          { id: '2-warehouse-operator', title: 'Warehouse Operator', icon: Building2 },
          { id: '2-dispatcher', title: 'Dispatcher', icon: Clock },
          { id: '2-tracking-spec', title: 'Tracking Specialist', icon: Target },
          { id: '2-last-mile-coord', title: 'Last Mile Coordinator', icon: Truck },
          { id: '2-freight-broker', title: 'Freight Broker', icon: Handshake },
          { id: '2-customs-spec', title: 'Customs Specialist', icon: ShieldCheck },
        ]
      },
    ]
  },
  // Section 20: Government & Public Sector (12+ agents)
  {
    id: '2-section-dept20',
    title: '22: Government & Public (12+)',
    icon: Landmark,
    subSections: [
      {
        id: '2-gov-main',
        title: 'Main Agents (6)',
        icon: Landmark,
        items: [
          { id: '2-cao-gov', title: 'CAO - Chief Admin Officer (Gov)', icon: Building2 },
          { id: '2-vp-public-policy', title: 'VP Public Policy', icon: FileText },
          { id: '2-vp-regulatory', title: 'VP Regulatory Affairs', icon: Shield },
          { id: '2-vp-public-engagement', title: 'VP Public Engagement', icon: Users },
          { id: '2-policy-mgr-gov', title: 'Policy Manager', icon: FileCheck },
          { id: '2-grants-mgr', title: 'Grants Manager', icon: DollarSign },
        ]
      },
      {
        id: '2-gov-sub',
        title: 'Sub-Agents (6+)',
        icon: Bot,
        items: [
          { id: '2-policy-analyst', title: 'Policy Analyst', icon: BarChart3 },
          { id: '2-regulatory-spec', title: 'Regulatory Specialist', icon: Shield },
          { id: '2-public-affairs', title: 'Public Affairs Specialist', icon: Megaphone },
          { id: '2-grants-spec', title: 'Grants Specialist', icon: FileText },
          { id: '2-compliance-gov', title: 'Government Compliance', icon: ShieldCheck },
          { id: '2-transparency-officer', title: 'Transparency Officer', icon: Eye },
        ]
      },
    ]
  },
  // Section 21: Supply Chain & Logistics (10+ agents)
  {
    id: '2-section-dept21',
    title: '23: Supply Chain & Logistics (10+)',
    icon: Package,
    subSections: [
      {
        id: '2-supply-chain-main',
        title: 'Main Agents (4)',
        icon: Package,
        items: [
          { id: '2-vp-supply-chain-ops', title: 'VP Supply Chain Operations', icon: Package },
          { id: '2-procurement-mgr', title: 'Procurement Manager', icon: DollarSign },
          { id: '2-logistics-mgr', title: 'Logistics Manager', icon: Truck },
          { id: '2-warehouse-lead', title: 'Warehouse Lead', icon: Building2 },
        ]
      },
      {
        id: '2-supply-chain-sub',
        title: 'Sub-Agents (6+)',
        icon: Bot,
        items: [
          { id: '2-procurement-buyer', title: 'Procurement Buyer', icon: DollarSign },
          { id: '2-inventory-spec', title: 'Inventory Specialist', icon: Package },
          { id: '2-demand-planner', title: 'Demand Planner', icon: BarChart3 },
          { id: '2-supplier-relations', title: 'Supplier Relations', icon: Handshake },
          { id: '2-shipping-coord', title: 'Shipping Coordinator', icon: Truck },
          { id: '2-fulfillment-spec', title: 'Fulfillment Specialist', icon: CheckCircle },
        ]
      },
    ]
  },
  // Section 22: AI Management & Governance (6+ agents)
  {
    id: '2-section-dept22',
    title: '24: AI Management & Governance (6+)',
    icon: Sparkles,
    subSections: [
      {
        id: '2-ai-mgmt-main',
        title: 'Main Agents (3)',
        icon: Sparkles,
        items: [
          { id: '2-cao-automation-dept', title: 'CAO - Chief Automation Officer', icon: Zap },
          { id: '2-vp-automation', title: 'VP Automation', icon: Cog },
          { id: '2-vp-process-excellence', title: 'VP Process Excellence', icon: CheckCircle },
        ]
      },
      {
        id: '2-ai-mgmt-sub',
        title: 'Sub-Agents (3+)',
        icon: Bot,
        items: [
          { id: '2-aod-lead', title: 'AOD - Automation Operations Lead', icon: Bot },
          { id: '2-rpa-mgr', title: 'RPA Manager', icon: Cog },
          { id: '2-workflow-spec', title: 'Workflow Specialist', icon: Workflow },
        ]
      },
    ]
  },
];

export default aiAgentsSidebarSections;
