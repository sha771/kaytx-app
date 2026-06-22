/**
 * Comprehensive Agent Generator
 * 
 * Generates all agents with complete features, options, and capabilities across 36 departments.
 * 
 * ALL 36 DEPARTMENTS: Exactly 60 agents each (20 main + 40 sub)
 * Total: 36 departments × 60 agents = 2,160 total agents
 * 
 * @version 4.0.0
 * @lastUpdated 2026-06-20
 */

import type { AIAgent } from './aiAgentHierarchy';
import { enhanceAIAgent } from './utils/agent-capability-enhancer';
import {
  Users, Target, Megaphone, Settings, Zap, Shield, ChartBarBig,
  Briefcase, TrendingUp, Globe, Building2, Truck, ShoppingCart, Scale,
  Heart, Activity, Microscope, Factory, Landmark, FileText, Database,
  Search, Workflow, Cpu, Lock, BadgeCheck, Sparkles, Award,
  Phone, Mail, Calendar, CheckCircle, AlertTriangle, Bell, MessageSquare,
  ClipboardList, Receipt, Calculator, Wallet, CreditCard, PiggyBank,
  RefreshCw, Play, Pause, Square, Layers, Network, Share2, Link,
  Cloud, Server, FileCode, FileImage, Folder, Archive, Package, Box,
  MapPin, Compass, Car, Wrench, Paintbrush, Palette, Camera, Mic,
  Eye, Scan, ShieldCheck, ShieldAlert, Unlock, Key, Badge,
  User, UserCheck, UserPlus, UsersRound, Home, Store, Shop, Bag,
  DollarSign, ArrowUpRight, ArrowDownRight, BarChart, LineChart, PieChart,
  Gamepad2, GraduationCap, Plane, Lightbulb, Tv, Coffee, Sprout,
  Gem, Utensils, Banknote, Video, Music, Radio, Newspaper,
  CreditCard, Globe2, Hammer, Train, Ship, WrenchIcon, Crown, Calendar as CalendarIcon,
} from 'lucide-react-native';

// ============================================
// DEPARTMENT CONFIGURATIONS
// ============================================

interface DepartmentConfig {
  id: string;
  name: string;
  color: string;
  icon: any;
  mainAgentCount: number;
  subAgentCount: number;
  mainAgentRoles: string[];
  subAgentRoles: string[];
  capabilities: string[];
  integrations: string[];
  kpis: string[];
}

const DEPARTMENT_CONFIGS: Record<string, DepartmentConfig> = {
  // ============================================
  // CORE 22 DEPARTMENTS (60 agents each: 20 main + 40 sub)
  // ============================================
  
  'customer-experience': {
    id: 'customer-experience',
    name: 'Customer Experience',
    color: '#007AFF',
    icon: Users as any,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Customer Officer', 'VP Customer Success', 'VP Support', 'VP Experience',
      'VP Retention', 'VP Loyalty', 'CX Director', 'Support Director',
      'Success Director', 'Experience Director', 'Retention Director',
      'Loyalty Director', 'Receptionist Manager', 'Customer Support Manager',
      'Ticket Resolution Manager', 'Complaint Handling Manager', 'Retention Manager',
      'Loyalty & Engagement Manager', 'Feedback & Survey Manager', 'Billing Support Manager',
      'CX Operations Manager'
    ],
    subAgentRoles: [
      'CX Strategy Analyst', 'Customer Journey Mapper', 'CX Metrics Tracker',
      'Account Health Monitor', 'Engagement Scoring Agent', 'Churn Predictor',
      'Sentiment Analyzer', 'Feedback Survey Agent', 'Support Quality Auditor',
      'Ticket Classifier', 'Resolution Tracker', 'Escalation Handler',
      'Complaint Categorizer', 'Dispute Resolver', 'Improvement Recommender',
      'Loyalty Engagement Agent', 'Loyalty Tier Analyst', 'Points Calculator',
      'Reward Recommender', 'Referral Program Builder', 'Win-back Campaign Specialist',
      'Feedback Survey Designer', 'Insight Reporter', 'Insight Summarizer',
      'Survey Designer', 'Response Analyzer', 'CX Data Analyst',
      'Billing Support Specialist', 'Invoice Explainer', 'Payment Processor',
      'Receptionist Agent', 'Call Router', 'Appointment Scheduler',
      'Live Chat Handler', 'FAQ Responder', 'Knowledge Base Curator',
      'Multi-language Support', 'Voice Recognition', 'IVR Navigator',
      'Emergency Call Handler', 'Lead Qualification', 'Contact Updater',
      'Customer Onboarding Agent', 'Offboarding Specialist', 'Account Manager Assistant'
    ],
    capabilities: [
      'Multi-channel Support', 'Sentiment Analysis', 'Journey Mapping',
      'Churn Prediction', 'Personalization', 'Omnichannel Routing',
      'Self-Service Portal', 'Knowledge Base Integration', 'Voice AI',
      'Real-time Coaching', 'Quality Assurance', 'Feedback Loop',
      'Loyalty Management', 'Retention Automation', 'Customer 360 View'
    ],
    integrations: [
      'Salesforce', 'Zendesk', 'Intercom', 'Twilio', 'Stripe',
      'HubSpot', 'Freshdesk', 'Genesys', 'Medallia', 'Qualtrics'
    ],
    kpis: [
      'CSAT Score', 'NPS Score', 'First Response Time', 'Resolution Time',
      'Churn Rate', 'Retention Rate', 'Customer Lifetime Value',
      'Ticket Volume', 'Escalation Rate', 'Self-Service Rate'
    ]
  },
  'sales-revenue': {
    id: 'sales-revenue',
    name: 'Sales & Revenue',
    color: '#34C759',
    icon: Target,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Revenue Officer', 'VP Sales', 'VP Revenue', 'VP Business Development',
      'VP Channel Partners', 'Sales Director', 'Revenue Director', 'BD Director',
      'Channel Director', 'Sales Operations Manager', 'Lead Development Manager',
      'Sales Manager', 'Account Executive Manager', 'CRM Manager',
      'Proposal Manager', 'Negotiation Manager', 'Pricing Manager',
      'Sales Forecasting Manager', 'Sales Enablement Manager', 'Commission Manager',
      'Territory Manager'
    ],
    subAgentRoles: [
      'Lead Scoring Agent', 'Pipeline Analyst', 'Pipeline Organizer', 'Pipeline Weighter',
      'Quota Tracker', 'Territory Planner', 'Channel Performance Tracker',
      'Channel Planner', 'Digital Channel Optimizer', 'Acquisition Channel Tester',
      'Deal Structurer', 'Revenue Modeler', 'Pricing Calculator', 'Pricing Optimizer',
      'Sales Process Auditor', 'CRM Data Cleaner', 'Proposal Reviewer',
      'Negotiation Support', 'Closing Strategist', 'Demand Forecaster',
      'Forecast Validator', 'Sales Enablement Content', 'Training Coordinator',
      'Performance Reporter', 'Competitor Price Tracker', 'Market Expander',
      'BATNA Calculator', 'Concession Tracker', 'Term Analyzer',
      'Margin Calculator', 'Prospect Researcher', 'Lead Qualification',
      'Outreach Sequencer', 'Follow-up Scheduler', 'Meeting Coordinator',
      'Demo Coordinator', 'Contract Reviewer', 'Commission Calculator',
      'Sales Performance Analyst', 'Lead Nurturing Specialist', 'Deal Coach'
    ],
    capabilities: [
      'Lead Scoring', 'Pipeline Management', 'Forecasting', 'CPQ',
      'CRM Integration', 'Email Automation', 'Sales Intelligence',
      'Proposal Generation', 'Contract Management', 'Commission Tracking',
      'Territory Management', 'Quota Management', 'Sales Coaching',
      'Competitive Intelligence', 'Pricing Optimization', 'Revenue Operations'
    ],
    integrations: [
      'Salesforce', 'HubSpot', 'Pipedrive', 'Zoho CRM', 'Microsoft Dynamics',
      'Oracle CRM', 'Gong', 'Chorus', 'Outreach', 'SalesLoft'
    ],
    kpis: [
      'Revenue', 'Pipeline Value', 'Win Rate', 'Deal Velocity',
      'Quota Attainment', 'Lead Conversion Rate', 'Average Deal Size',
      'Sales Cycle Length', 'Activity Metrics', 'Forecast Accuracy'
    ]
  },
  'marketing-growth': {
    id: 'marketing-growth',
    name: 'Marketing & Growth',
    color: '#FF2D55',
    icon: Megaphone,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Marketing Officer', 'VP Marketing', 'VP Brand', 'VP Growth',
      'VP Content', 'VP Digital', 'Marketing Director', 'Brand Director',
      'Growth Director', 'Content Director', 'Digital Director',
      'Marketing Manager', 'Content Marketing Manager', 'SEO Manager',
      'Social Media Manager', 'Email Marketing Manager', 'Ad Campaign Manager',
      'Marketing Analytics Manager', 'Brand Manager', 'Growth Hacker Manager',
      'Creative Director'
    ],
    subAgentRoles: [
      'Campaign Coordinator', 'Campaign ROI Evaluator', 'Brand Guidelines Enforcer',
      'Brand Health Surveyor', 'Brand Perception Monitor', 'Competitor Brand Tracker',
      'Content Distributor', 'Content Quality Reviewer', 'Content Recommender',
      'Editorial Calendar Planner', 'Blog Writer', 'Copy Editor',
      'Creative Tester', 'Keyword Researcher', 'On-page Optimizer',
      'Backlink Analyzer', 'Technical SEO Auditor', 'Post Scheduler',
      'Social Listening', 'Influencer Coordinator', 'Community Manager',
      'Drip Campaign Manager', 'A/B Test Coordinator', 'Deliverability Monitor',
      'Funnel Analyzer', 'Attribution Modeler', 'Marketing Strategy Analyst',
      'Marketing Calendar Manager', 'Marketing Spend Monitor', 'Viral Loop Designer',
      'Referral Program Builder', 'Experiment Designer', 'Conversion Analyst',
      'Acquisition Channel Tester', 'Landing Page Optimizer', 'Marketing Automation Specialist',
      'Performance Marketing Analyst', 'Brand Equity Analyst', 'Customer Journey Analyst',
      'Marketing Data Analyst', 'Creative Production Assistant', 'Social Media Content Creator'
    ],
    capabilities: [
      'Campaign Management', 'Content Creation', 'SEO Optimization',
      'Social Media Management', 'Email Marketing', 'Marketing Automation',
      'Analytics & Reporting', 'A/B Testing', 'Personalization',
      'Attribution Modeling', 'Brand Management', 'Growth Hacking',
      'Influencer Marketing', 'Event Marketing', 'Account-Based Marketing'
    ],
    integrations: [
      'HubSpot Marketing', 'Marketo', 'Pardot', 'Mailchimp', 'SendGrid',
      'Hootsuite', 'Sprout Social', 'SEMrush', 'Ahrefs', 'Google Analytics'
    ],
    kpis: [
      'Marketing Qualified Leads', 'Customer Acquisition Cost', 'Return on Ad Spend',
      'Conversion Rate', 'Engagement Rate', 'Brand Awareness',
      'Email Open Rate', 'Click-Through Rate', 'Social Reach', 'Content Performance'
    ]
  },
  'operations-management': {
    id: 'operations-management',
    name: 'Operations & Management',
    color: '#5856D6',
    icon: Settings,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Operating Officer', 'VP Operations', 'VP Supply Chain', 'VP Quality',
      'VP Facilities', 'VP Project Management', 'VP Process Improvement', 'VP Business Operations',
      'Operations Director', 'Supply Chain Director', 'Quality Director', 'Facilities Director',
      'Project Management Director', 'Business Operations Director', 'Process Improvement Director',
      'Operations Manager', 'Workflow Automation Manager', 'Task Coordination Manager', 
      'Process Optimization Manager', 'Resource Planning Manager', 'Quality Assurance Manager',
      'Efficiency Manager'
    ],
    subAgentRoles: [
      'Process Auditor', 'Process Mapper', 'Process Optimization Agent', 'Quality Assurance Agent',
      'Quality Standards Enforcer', 'SLA Monitor', 'Task Assigner', 'Task Coordinator',
      'Task Prioritizer', 'Resource Allocator', 'Resource Planner', 'Capacity Planner',
      'Daily Operations Coordinator', 'Cross-dept Coordinator', 'Success Plan Coordinator',
      'Workflow Automation Agent', 'Workflow Monitor', 'Automation Rule Builder',
      'Efficiency Reporter', 'Operational Efficiency Analyst', 'Energy Efficiency Monitor',
      'Logistics Cost Analyzer', 'Maintenance Scheduler', 'Demo Coordinator',
      'Payment Processor', 'Supply Chain Coordinator', 'Inventory Optimizer',
      'Bottleneck Detector', 'Dependency Tracker', 'Deadline Tracker',
      'Deadline Enforcer', 'Milestone Tracker', 'Strategic Initiative Tracker',
      'Change Management Coordinator', 'Process Improvement Analyst', 'Kaizen Facilitator',
      'Lean Consultant', 'Six Sigma Green Belt', 'Performance Tracker', 'Continuous Improvement Agent'
    ],
    capabilities: [
      'Process Automation', 'Workflow Management', 'Resource Planning',
      'Quality Control', 'Supply Chain Management', 'Project Management',
      'Inventory Management', 'Facilities Management', 'Maintenance Scheduling',
      'SLA Monitoring', 'Performance Tracking', 'Continuous Improvement',
      'Lean Operations', 'Six Sigma', 'Operational Analytics'
    ],
    integrations: [
      'ServiceNow', 'Jira', 'Asana', 'Monday.com', 'Smartsheet',
      'SAP', 'Oracle', 'Workday', 'Tableau', 'Power BI'
    ],
    kpis: [
      'Operational Efficiency', 'Process Cycle Time', 'Quality Rate',
      'On-Time Delivery', 'Resource Utilization', 'Cost per Unit',
      'Downtime', 'SLA Compliance', 'Backlog', 'Throughput'
    ]
  },
  'finance-accounting': {
    id: 'finance-accounting',
    name: 'Finance & Accounting',
    color: '#FFD700',
    icon: Award as any,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Financial Officer', 'VP Finance', 'VP Accounting', 'VP Treasury',
      'VP Investor Relations', 'VP Financial Planning & Analysis', 'VP Corporate Finance',
      'VP Tax & Compliance', 'Controller', 'Finance Manager', 'Accounting Manager',
      'Financial Analyst', 'Budget Manager', 'Tax Specialist', 'Audit Manager',
      'Treasury Analyst', 'FP&A Manager', 'Corporate Finance Manager', 'Finance Operations Director',
      'Financial Planning Director'
    ],
    subAgentRoles: [
      'Budget Allocator', 'Demand Forecaster', 'Forecast Validator', 'Invoice Explainer',
      'Financial Reporting', 'Expense Management', 'Investment Management',
      'Payroll Accounting', 'Tax Specialist', 'Treasury Specialist', 'Bookkeeper',
      'Accountant', 'Financial Analyst', 'Budget Manager', 'Cost Accountant',
      'Payroll Specialist', 'Tax Advisor', 'Audit Specialist', 'Compliance Officer',
      'Financial Planner', 'Risk Manager', 'Investment Analyst', 'Cash Manager',
      'Revenue Recognition', 'Accounts Payable', 'Accounts Receivable', 'General Ledger',
      'Financial Controller', 'Treasury Manager', 'Tax Manager', 'Audit Manager',
      'Financial Modeling Analyst', 'Variance Analyst', 'Cost Analyst', 'Profitability Analyst',
      'Capital Budgeting Analyst', 'Working Capital Manager', 'Treasury Operations Specialist'
    ],
    capabilities: [
      'Financial Planning & Analysis', 'Budgeting & Forecasting', 'Accounting Automation',
      'Tax Management', 'Treasury Management', 'Risk Management', 'Compliance',
      'Audit Support', 'Financial Reporting', 'Expense Management', 'Payroll',
      'Accounts Payable/Receivable', 'Cash Management', 'Investment Management'
    ],
    integrations: [
      'QuickBooks', 'Xero', 'Sage', 'NetSuite', 'SAP',
      'Oracle Financials', 'Workday', 'Adaptive', 'Anaplan', 'BlackLine'
    ],
    kpis: [
      'Revenue', 'Gross Margin', 'Operating Margin', 'EBITDA',
      'Cash Flow', 'Budget Variance', 'Days Sales Outstanding', 'Working Capital',
      'Return on Investment', 'Cost of Goods Sold'
    ]
  },
  'technology-engineering': {
    id: 'technology-engineering',
    name: 'Technology & Engineering',
    color: '#AF52DE',
    icon: Zap,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Technology Officer', 'VP Engineering', 'VP Infrastructure', 'VP AI/ML',
      'VP Security Technology', 'VP Product Engineering', 'VP Platform Engineering',
      'VP Data Engineering', 'Lead Architect', 'DevOps Manager', 'Frontend Lead',
      'Backend Lead', 'SRE Lead', 'Engineering Director', 'Architecture Director',
      'Frontend Developer', 'Backend Developer', 'SRE Engineer', 'QA Automation Engineer', 'Data Engineer'
    ],
    subAgentRoles: [
      'Automation Rule Builder', 'Bottleneck Detector', 'Churn Predictor',
      'Template Selector', 'Full Stack Developer',
      'DevOps Engineer', 'QA Engineer', 'Test Automation Engineer',
      'Security Engineer', 'Network Engineer', 'Cloud Architect', 'Database Administrator',
      'ML Engineer', 'AI Engineer', 'Platform Engineer',
      'Mobile Developer', 'iOS Developer', 'Android Developer', 'Web Developer',
      'UI/UX Developer', 'Game Developer', 'System Architect', 'Software Architect',
      'Solutions Architect', 'Enterprise Architect', 'Technical Lead',
      'Principal Engineer', 'DevOps Specialist', 'Cloud Developer', 'API Developer',
      'Microservices Architect', 'Performance Engineer', 'Scalability Engineer', 'Reliability Engineer'
    ],
    capabilities: [
      'Software Development', 'DevOps & CI/CD', 'Cloud Infrastructure',
      'Security & Compliance', 'Data Engineering', 'Machine Learning',
      'Quality Assurance', 'Monitoring & Observability', 'API Management',
      'Database Management', 'Mobile Development', 'Web Development',
      'Microservices', 'Container Orchestration', 'Infrastructure as Code'
    ],
    integrations: [
      'GitHub', 'GitLab', 'Jenkins', 'Docker', 'Kubernetes',
      'AWS', 'Azure', 'GCP', 'Terraform', 'Ansible'
    ],
    kpis: [
      'Deployment Frequency', 'Lead Time for Changes', 'Mean Time to Recovery',
      'Change Failure Rate', 'Code Coverage', 'Bug Rate', 'Performance Metrics',
      'Uptime', 'Security Incidents', 'Technical Debt'
    ]
  },
  'human-resources': {
    id: 'human-resources',
    name: 'Human Resources',
    color: '#FF5252',
    icon: Shield,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Human Resources Officer', 'VP Talent', 'VP HR Operations', 'VP Learning',
      'VP Culture', 'VP Compensation', 'VP Talent Acquisition', 'VP Employee Experience',
      'VP Diversity & Inclusion', 'Recruiting Manager', 'Recruiter',
      'HR Operations Specialist', 'Learning Specialist', 'Compensation Analyst',
      'HR Business Partner Manager', 'Talent Development Manager', 'Employee Engagement Manager',
      'Diversity & Inclusion Manager', 'HR Director', 'Talent Management Director'
    ],
    subAgentRoles: [
      'Performance Reporter', 'Training Scheduler', 'Resume Screener', 'Interview Scheduler',
      'Onboarding Specialist', 'Offboarding Specialist', 'HR Coordinator', 'HR Generalist',
      'Talent Acquisition Specialist', 'Employer Brand Manager', 'Campus Recruiter',
      'Executive Recruiter', 'Technical Recruiter', 'Sales Recruiter',
      'Learning & Development Specialist', 'Training Coordinator', 'Instructional Designer',
      'Compliance Training Manager', 'Skills Assessment Specialist', 'Career Coach',
      'Compensation Analyst', 'Benefits Administrator', 'Payroll Specialist',
      'HRIS Administrator', 'HR Analytics Specialist', 'Workforce Planner',
      'Employee Relations Specialist', 'Diversity & Inclusion Specialist', 'Culture Champion',
      'HR Operations Manager', 'HR Business Partner', 'People Operations Manager',
      'Employee Experience Specialist', 'Internal Communications Specialist', 'Wellness Program Coordinator',
      'Mentorship Program Manager', 'Succession Planning Specialist', 'Performance Management Analyst'
    ],
    capabilities: [
      'Recruitment & Hiring', 'Onboarding & Offboarding', 'Performance Management',
      'Learning & Development', 'Compensation & Benefits', 'HR Analytics',
      'Employee Relations', 'Compliance Management', 'Workforce Planning',
      'Talent Management', 'Succession Planning', 'Diversity & Inclusion',
      'Employee Engagement', 'HRIS Management', 'Payroll Administration'
    ],
    integrations: [
      'Workday', 'BambooHR', 'Greenhouse', 'Lever', 'Ashby',
      'ADP', 'Paylocity', 'Ultimate Software', 'Cornerstone', 'Docebo'
    ],
    kpis: [
      'Time to Hire', 'Time to Fill', 'Quality of Hire', 'Employee Retention',
      'Employee Engagement Score', 'Training Completion Rate', 'HR Cost per Employee',
      'Diversity Metrics', 'Absenteeism Rate', 'Turnover Rate'
    ]
  },
  'legal-compliance': {
    id: 'legal-compliance',
    name: 'Legal & Compliance',
    color: '#6366F1',
    icon: ChartBarBig,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Legal Officer', 'VP Legal', 'VP Compliance', 'VP Contracts',
      'VP Intellectual Property', 'VP Governance', 'VP Risk Management', 'VP Regulatory Affairs',
      'Compliance Manager', 'Legal Researcher', 'Contract Specialist', 'Compliance Analyst',
      'Corporate Counsel Manager', 'Litigation Manager', 'Privacy & Data Protection Manager',
      'Ethics & Compliance Manager', 'Regulatory Affairs Manager', 'Legal Director',
      'Compliance Director', 'Corporate Secretary'
    ],
    subAgentRoles: [
      'Compliance Tracker', 'Legal Researcher', 'Contract Reviewer',
      'Contract Manager', 'Contract Administrator', 'Legal Analyst',
      'Compliance Officer', 'Regulatory Specialist', 'Policy Manager',
      'Governance Specialist', 'Risk Manager', 'Intellectual Property Specialist',
      'Patent Attorney', 'Trademark Attorney', 'Corporate Counsel',
      'Litigation Support', 'Legal Operations Manager', 'Legal Technology Specialist',
      'E-Discovery Specialist', 'Privacy Officer', 'Data Protection Officer',
      'Ethics & Compliance Officer', 'Audit Specialist', 'Regulatory Affairs Manager',
      'Government Relations Specialist', 'Legal Project Manager', 'License Management Specialist',
      'Securities Compliance Specialist', 'Antitrust Compliance Specialist', 'Export Control Specialist',
      'International Trade Compliance', 'Environmental Compliance Specialist', 'Health & Safety Compliance',
      'Corporate Governance Specialist', 'Board Relations Specialist', 'Shareholder Relations Manager'
    ],
    capabilities: [
      'Contract Management', 'Compliance Monitoring', 'Legal Research',
      'Risk Assessment', 'Policy Management', 'Intellectual Property Management',
      'Governance', 'Regulatory Compliance', 'Audit Support', 'Litigation Support',
      'E-Discovery', 'Privacy Management', 'Data Protection', 'Ethics Management'
    ],
    integrations: [
      'DocuSign', 'Adobe Sign', 'ContractPodAi', 'Kira Systems', 'LawGeex',
      'Onit', 'HighQ', 'Relativity', 'Logikcull', 'OneTrust'
    ],
    kpis: [
      'Contract Cycle Time', 'Compliance Rate', 'Risk Exposure',
      'Legal Spend', 'Matter Resolution Time', 'Policy Adherence',
      'Audit Findings', 'Regulatory Violations', 'Training Completion', 'Incident Response Time'
    ]
  },
  'data-intelligence': {
    id: 'data-intelligence',
    name: 'Data & Intelligence',
    color: '#AF52DE',
    icon: Database,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Data & AI Officer', 'VP Data Science', 'VP Data Engineering',
      'VP Analytics', 'VP Business Intelligence', 'VP Data Governance', 'VP Data Architecture',
      'Data Manager', 'Analytics Manager', 'Data Scientist', 'Data Analyst',
      'BI Developer', 'ML Engineer', 'Data Steward', 'Analytics Specialist',
      'Data Architecture Manager', 'Data Governance Manager', 'Data Platform Manager',
      'Analytics Director', 'Data Science Director'
    ],
    subAgentRoles: [
      'KPI Dashboard Builder', 'Reporting Automator', 'Data Engineer', 'Data Analyst',
      'Data Scientist', 'ML Engineer', 'BI Developer', 'Data Architect',
      'Data Steward', 'Data Quality Specialist', 'Data Governance Specialist', 'Data Privacy Officer',
      'Business Analyst', 'Reporting Specialist', 'Dashboard Developer', 'Analytics Engineer',
      'Research Analyst', 'Market Intelligence Analyst', 'Competitive Intelligence Analyst',
      'Customer Intelligence Analyst', 'Product Intelligence Analyst', 'Predictive Analytics Specialist',
      'Prescriptive Analytics Specialist', 'Diagnostic Analytics Specialist', 'Descriptive Analytics Specialist',
      'Data Visualization Specialist', 'Data Storyteller', 'Data Integration Specialist', 'ETL Developer',
      'Data Warehouse Specialist', 'Data Lake Specialist', 'Real-time Analytics Specialist', 'Stream Processing Engineer',
      'Data Catalog Manager', 'Metadata Manager', 'Data Lineage Specialist', 'Data Fabric Engineer'
    ],
    capabilities: [
      'Data Engineering', 'Data Science', 'Machine Learning', 'Business Intelligence',
      'Data Analytics', 'Data Visualization', 'Data Governance', 'Data Quality',
      'Data Integration', 'Predictive Analytics', 'Real-time Analytics', 'Data Warehousing',
      'Data Lakes', 'Stream Processing', 'Data Privacy', 'Data Security'
    ],
    integrations: [
      'Snowflake', 'Databricks', 'BigQuery', 'Redshift', 'Azure Synapse',
      'Tableau', 'Power BI', 'Looker', 'dbt', 'Airflow'
    ],
    kpis: [
      'Data Quality Score', 'Data Freshness', 'Query Performance',
      'Dashboard Adoption', 'Model Accuracy', 'Prediction Accuracy',
      'Data Governance Compliance', 'Data Security Incidents', 'Data Pipeline Success Rate', 'Analytics ROI'
    ]
  },
  'product-management': {
    id: 'product-management',
    name: 'Product Management',
    color: '#FFD700',
    icon: Briefcase,
    mainAgentCount: 15,
    subAgentCount: 45,
    mainAgentRoles: [
      'VP Product', 'VP Product Strategy', 'VP Product Operations', 'Product Manager',
      'Product Owner', 'Product Analyst', 'UX Researcher', 'Product Marketer',
      'Release Manager', 'Growth Product Manager', 'Product Design Manager', 'Product Discovery Manager', 'Product Insights Manager', 'Product Performance Manager', 'Product Enablement Manager'
    ],
    subAgentRoles: [
      'Product Manager', 'Product Owner', 'Product Analyst',
      'UX Researcher', 'UX Designer', 'UI Designer',
      'Product Designer', 'Content Designer', 'Service Designer',
      'Product Marketing Manager', 'Growth Product Manager', 'Technical Product Manager',
      'Data Product Manager', 'Platform Product Manager', 'API Product Manager',
      'Mobile Product Manager', 'Web Product Manager', 'B2B Product Manager',
      'B2C Product Manager', 'Marketplace Product Manager', 'Marketplace Operations Manager',
      'Release Manager', 'Launch Manager', 'Go-to-Market Manager',
      'Product Operations Manager', 'Product Strategy Manager', 'Product Portfolio Manager',
      'Product Lifecycle Manager', 'Product Success Manager', 'Customer Success Manager',
      'Feature Prioritization Specialist', 'User Research Specialist', 'Competitive Analysis Specialist',
      'Product Metrics Analyst', 'Product Experimentation Specialist', 'Product Documentation Writer',
      'Product Training Specialist', 'Product Evangelist', 'Product Community Manager'
    ],
    capabilities: [
      'Product Strategy', 'Roadmap Management', 'User Research', 'Design Thinking',
      'Agile/Scrum', 'Product Analytics', 'A/B Testing', 'Feature Prioritization',
      'Go-to-Market', 'Product Marketing', 'Release Management', 'Product Operations',
      'Customer Feedback', 'Competitive Analysis', 'Market Research', 'Product Lifecycle Management'
    ],
    integrations: [
      'Jira', 'Aha!', 'Productboard', 'Pendo', 'Amplitude',
      'Mixpanel', 'Figma', 'Miro', 'Notion', 'Confluence'
    ],
    kpis: [
      'Product Adoption', 'User Engagement', 'Feature Usage', 'Customer Satisfaction',
      'Time to Market', 'Product Revenue', 'Churn Rate', 'Net Revenue Retention',
      'NPS Score', 'Product-Market Fit'
    ]
  },
  'security-risk': {
    id: 'security-risk',
    name: 'Security & Risk',
    color: '#FF5252',
    icon: Shield,
    mainAgentCount: 15,
    subAgentCount: 45,
    mainAgentRoles: [
      'Chief Information Security Officer', 'VP Security Operations', 'VP Cybersecurity',
      'VP Governance & Risk', 'VP Privacy', 'Security Architect', 'SOC Manager',
      'Security Analyst', 'Incident Responder', 'Security Compliance Specialist',
      'Penetration Tester', 'Identity Manager', 'Threat Intelligence Manager', 'Security Training Manager', 'Risk Assessment Manager', 'Security Operations Director'
    ],
    subAgentRoles: [
      'At-risk Identifier', 'Risk Identifier', 'Supplier Risk Assessor',
      'Security Analyst', 'Security Engineer', 'Network Security Engineer',
      'Application Security Engineer', 'Cloud Security Engineer', 'DevSecOps Engineer',
      'Incident Responder', 'Threat Hunter', 'Malware Analyst',
      'Forensic Analyst', 'Security Operations Center Analyst', 'Security Monitoring Analyst',
      'Penetration Tester', 'Vulnerability Scanner', 'Security Auditor',
      'Compliance Specialist', 'GRC Analyst', 'Risk Manager',
      'Identity & Access Management Specialist', 'Privileged Access Management Specialist',
      'Security Awareness Trainer', 'Security Architect', 'Cloud Security Architect',
      'Application Security Architect', 'Network Security Architect', 'Enterprise Security Architect',
      'Threat Intelligence Analyst', 'Security Content Writer', 'Security Policy Developer',
      'Third-Party Risk Assessor', 'Vendor Security Analyst', 'Supply Chain Security Specialist',
      'Incident Response Coordinator', 'Crisis Management Specialist', 'Business Continuity Planner'
    ],
    capabilities: [
      'Threat Detection', 'Vulnerability Management', 'Incident Response',
      'Security Monitoring', 'Identity & Access Management', 'Security Analytics',
      'Penetration Testing', 'Security Auditing', 'Compliance Management',
      'Risk Assessment', 'Security Awareness', 'Cloud Security', 'Application Security',
      'Network Security', 'Endpoint Security', 'Data Security'
    ],
    integrations: [
      'Splunk', 'CrowdStrike', 'Palo Alto Networks', 'Cisco', 'Fortinet',
      'Okta', 'Auth0', 'Microsoft Defender', 'Qualys', 'Tenable'
    ],
    kpis: [
      'Mean Time to Detect', 'Mean Time to Respond', 'Vulnerability Remediation Time',
      'Security Incident Rate', 'Compliance Score', 'Risk Exposure',
      'Security Awareness Score', 'Patch Coverage', 'False Positive Rate', 'Security ROI'
    ]
  },
  'research-development': {
    id: 'research-development',
    name: 'Research & Development',
    color: '#6366F1',
    icon: Microscope,
    mainAgentCount: 15,
    subAgentCount: 45,
    mainAgentRoles: [
      'Chief Research Officer', 'VP Research', 'VP Innovation', 'VP R&D Operations',
      'Research Director', 'Innovation Director', 'R&D Operations Director',
      'Research Lead', 'Innovation Manager', 'Research Scientist',
      'Innovation Analyst', 'Prototype Engineer', 'Patent Researcher',
      'Technology Scout Director', 'Lab Director'
    ],
    subAgentRoles: [
      'Keyword Researcher', 'Prospect Researcher', 'Reward Recommender',
      'Rewards Program Designer', 'Research Scientist', 'Research Analyst',
      'Research Engineer', 'Research Associate', 'Research Technician',
      'Innovation Manager', 'Innovation Analyst', 'Innovation Consultant',
      'R&D Manager', 'R&D Engineer', 'R&D Specialist',
      'Prototype Engineer', 'Prototype Designer', 'Prototype Developer',
      'Patent Researcher', 'Patent Attorney', 'IP Specialist',
      'Technology Scout', 'Technology Analyst', 'Market Researcher',
      'Product Researcher', 'User Researcher', 'Competitive Researcher',
      'Lab Technician', 'Quality Control Analyst', 'Data Analyst',
      'Research Coordinator', 'Project Manager', 'Grant Writer',
      'Technical Writer', 'Research Librarian', 'Literature Reviewer',
      'Experimental Designer', 'Statistical Analyst', 'Research Programmer',
      'Instrument Specialist', 'Safety Officer', 'Compliance Officer',
      'Research Assistant', 'Lab Manager', 'Equipment Manager',
      'Research Methodologist', 'Validation Specialist', 'Tech Transfer Officer'
    ],
    capabilities: [
      'Research & Development', 'Innovation Management', 'Prototype Development',
      'Patent Research', 'Technology Scouting', 'Market Research',
      'User Research', 'Competitive Analysis', 'Product Research',
      'Technology Assessment', 'Innovation Consulting', 'R&D Project Management',
      'Laboratory Management', 'Research Collaboration', 'Knowledge Management'
    ],
    integrations: [
      'LabArchives', 'Benchling', 'Electronic Lab Notebook', 'ResearchGate',
      'Google Scholar', 'PubMed', 'PatSnap', 'InnoCentive', 'NineSigma'
    ],
    kpis: [
      'R&D Spend', 'Time to Innovation', 'Patent Applications', 'Research Publications',
      'Prototype Success Rate', 'Technology Adoption', 'Innovation ROI',
      'Research Impact Factor', 'Collaboration Rate', 'Knowledge Transfer'
    ]
  },
  'administrative': {
    id: 'administrative',
    name: 'Administrative',
    color: '#5856D6',
    icon: Settings,
    mainAgentCount: 15,
    subAgentCount: 45,
    mainAgentRoles: [
      'Chief Administrative Officer', 'VP Admin Operations', 'VP Facilities',
      'Admin Director', 'Facilities Director', 'Office Director',
      'Admin Manager', 'Office Manager', 'Executive Assistant Manager',
      'Facilities Coordinator Manager', 'Travel Coordinator Manager',
      'Document Controller Manager', 'Vendor Management Manager',
      'Budget Manager', 'Compliance Manager'
    ],
    subAgentRoles: [
      'Admin Strategy Planner', 'Cost Reduction Analyst', 'Policy Overseer',
      'Process Standardizer', 'Vendor Manager', 'Office Budget Controller',
      'Space Planner', 'Maintenance Scheduler', 'Safety Compliance Checker',
      'Task Delegator', 'Schedule Coordinator', 'Inventory Manager',
      'Meeting Room Booker', 'Supply Orderer', 'Visitor Host',
      'Calendar Optimizer', 'Travel Booker', 'Correspondence Drafter',
      'Work Order Manager', 'Vendor Liaison', 'Inspection Scheduler',
      'Itinerary Planner', 'Expense Reporter', 'Visa Documenter',
      'Version Manager', 'Archive Organizer', 'Access Controller',
      'Executive Assistant', 'Receptionist', 'Mailroom Clerk',
      'Facilities Assistant', 'Travel Agent', 'Document Specialist',
      'Procurement Specialist', 'Inventory Clerk', 'Security Coordinator',
      'Event Coordinator', 'Conference Room Scheduler', 'Catering Coordinator',
      'Ground Transportation Coordinator', 'Accommodation Specialist',
      'Expense Auditor', 'Budget Analyst', 'Contract Administrator',
      'Records Manager', 'File Clerk', 'Data Entry Specialist',
      'Office Services Clerk', 'Maintenance Request Handler', 'Help Desk Support',
      'Communications Coordinator', 'Internal Communications Specialist'
    ],
    capabilities: [
      'Office Management', 'Facilities Management', 'Travel Coordination',
      'Document Management', 'Meeting Coordination', 'Supply Management',
      'Vendor Management', 'Budget Management', 'Policy Management',
      'Space Planning', 'Maintenance Coordination', 'Safety Compliance',
      'Administrative Support', 'Executive Support', 'Records Management'
    ],
    integrations: [
      'Concur', 'Expensify', 'TripActions', 'Calendly', 'Zoom',
      'Slack', 'Microsoft Teams', 'Office 365', 'Google Workspace', 'Asana'
    ],
    kpis: [
      'Office Utilization', 'Travel Cost Savings', 'Vendor Performance',
      'Meeting Efficiency', 'Supply Cost Reduction', 'Process Efficiency',
      'Document Retrieval Time', 'Facility Uptime', 'Safety Compliance Rate', 'Budget Adherence'
    ]
  },
  'trading-investments': {
    id: 'trading-investments',
    name: 'Trading & Investments',
    color: '#34C759',
    icon: TrendingUp,
    mainAgentCount: 15,
    subAgentCount: 45,
    mainAgentRoles: [
      'Chief Investment Officer', 'VP Trading', 'VP Investments', 'Trading Desk Manager',
      'Portfolio Manager', 'Trading Risk Manager', 'Equity Trader', 'Forex Trader',
      'Crypto Trader', 'Derivatives Specialist', 'Portfolio Analyst', 'Trading Risk Analyst',
      'Trading Compliance', 'Quantitative Analyst', 'ESG Analyst', 'Algo Trading Developer'
    ],
    subAgentRoles: [
      'Equity Trader', 'Forex Trader', 'Crypto Trader', 'Commodities Trader',
      'Fixed Income Trader', 'Options Trader', 'Futures Trader', 'Swaps Trader',
      'Portfolio Manager', 'Fund Manager', 'Asset Manager', 'Wealth Manager',
      'Investment Analyst', 'Research Analyst', 'Credit Analyst', 'Risk Analyst',
      'Quantitative Analyst', 'Quantitative Developer', 'Algo Trader', 'High-Frequency Trader',
      'Market Maker', 'Proprietary Trader', 'Day Trader', 'Swing Trader',
      'Position Trader', 'Long-term Investor', 'Value Investor', 'Growth Investor',
      'Technical Analyst', 'Fundamental Analyst', 'Chart Analyst', 'Pattern Analyst',
      'Market Analyst', 'Sector Analyst', 'Economist', 'Strategist',
      'Trading Compliance Officer', 'Settlement Specialist', 'Clearing Specialist',
      'Custody Specialist', 'Trade Support Analyst', 'Operations Analyst',
      'Risk Manager', 'Portfolio Risk Manager', 'Market Risk Manager', 'Credit Risk Manager',
      'Operational Risk Manager', 'Liquidity Risk Manager', 'Model Risk Manager',
      'ESG Analyst', 'Sustainability Analyst', 'Impact Investor', 'Social Responsibility Analyst'
    ],
    capabilities: [
      'Trading Execution', 'Portfolio Management', 'Risk Management', 'Investment Research',
      'Market Analysis', 'Quantitative Analysis', 'Algorithmic Trading', 'High-Frequency Trading',
      'Technical Analysis', 'Fundamental Analysis', 'Options Trading', 'Futures Trading',
      'Forex Trading', 'Crypto Trading', 'Commodities Trading', 'Fixed Income Trading',
      'Derivatives Trading', 'Asset Allocation', 'Performance Attribution', 'Compliance Monitoring',
      'Settlement & Clearing', 'Trade Support', 'Risk Analytics', 'ESG Integration'
    ],
    integrations: [
      'Bloomberg Terminal', 'Reuters Eikon', 'Trading Technologies', 'Interactive Brokers',
      'Charles River', 'BlackRock Aladdin', 'MSCI RiskMetrics', 'FactSet', 'Morningstar'
    ],
    kpis: [
      'Portfolio Return', 'Sharpe Ratio', 'Sortino Ratio', 'Maximum Drawdown',
      'Win Rate', 'Profit Factor', 'Average Trade Duration', 'Trade Frequency',
      'Risk-Adjusted Return', 'Alpha', 'Beta', 'Information Ratio',
      'Tracking Error', 'Turnover Ratio', 'Expense Ratio', 'Compliance Rate'
    ]
  },
  'real-estate-property': {
    id: 'real-estate-property',
    name: 'Real Estate & Property',
    color: '#FFD700',
    icon: Building2,
    mainAgentCount: 15,
    subAgentCount: 45,
    mainAgentRoles: [
      'Chief Real Estate Officer', 'VP Property Management', 'VP Real Estate Development',
      'Property Manager', 'Leasing Manager', 'Facilities Manager', 'Property Analyst',
      'Lease Administrator', 'Tenant Relations Specialist', 'Maintenance Coordinator',
      'Acquisition Analyst', 'Asset Manager', 'Development Coordinator', 'Property Marketing', 'Property Investment Manager'
    ],
    subAgentRoles: [
      'Property Manager', 'Leasing Manager', 'Facilities Manager', 'Property Analyst',
      'Lease Administrator', 'Tenant Relations Specialist', 'Maintenance Coordinator',
      'Acquisition Analyst', 'Asset Manager', 'Development Coordinator', 'Property Marketing',
      'Real Estate Broker', 'Real Estate Agent', 'Leasing Agent', 'Property Consultant',
      'Investment Analyst', 'Valuation Specialist', 'Appraiser', 'Market Analyst',
      'Development Manager', 'Construction Manager', 'Project Manager', 'Site Selector',
      'Property Accountant', 'Property Tax Specialist', 'Insurance Specialist', 'Legal Specialist',
      'Marketing Manager', 'Leasing Specialist', 'Tenant Coordinator', 'Community Manager',
      'Maintenance Technician', 'Facilities Coordinator', 'Vendor Manager', 'Service Provider Manager',
      'Property Inspector', 'Compliance Specialist', 'Safety Inspector', 'Environmental Specialist',
      'Property Investment Analyst', 'Capital Markets Specialist', 'Real Estate Fund Manager', 'Portfolio Manager'
    ],
    capabilities: [
      'Property Management', 'Leasing Management', 'Facilities Management', 'Property Analytics',
      'Lease Administration', 'Tenant Relations', 'Maintenance Coordination', 'Property Acquisition',
      'Asset Management', 'Real Estate Development', 'Property Marketing', 'Investment Analysis',
      'Property Valuation', 'Market Analysis', 'Development Management', 'Construction Management',
      'Property Accounting', 'Tax Management', 'Insurance Management', 'Legal Compliance',
      'Marketing & Leasing', 'Tenant Services', 'Maintenance & Facilities', 'Vendor Management'
    ],
    integrations: [
      'Yardi', 'AppFolio', 'Buildium', 'RealPage', 'MRI Software',
      'CoStar', 'LoopNet', 'CREXi', 'RealPage', 'Skyline'
    ],
    kpis: [
      'Occupancy Rate', 'Net Operating Income', 'Capitalization Rate', 'Cash on Cash Return',
      'Tenant Retention Rate', 'Lease Renewal Rate', 'Rental Rate', 'Operating Expense Ratio',
      'Maintenance Cost per Unit', 'Tenant Satisfaction Score', 'Property Value Appreciation', 'Yield'
    ]
  },
  'insurance-risk': {
    id: 'insurance-risk',
    name: 'Insurance & Risk',
    color: '#FF5252',
    icon: Shield,
    mainAgentCount: 15,
    subAgentCount: 45,
    mainAgentRoles: [
      'Chief Risk Officer', 'VP Underwriting', 'VP Claims', 'VP Risk Assessment',
      'Underwriting Manager', 'Claims Manager', 'Policy Manager', 'Underwriter',
      'Claims Adjuster', 'Fraud Detection Agent', 'Actuary Analyst', 'Risk Modeler',
      'Policy Administrator', 'Customer Risk Analyst', 'Catastrophe Modeler'
    ],
    subAgentRoles: [
      'Underwriter', 'Claims Adjuster', 'Fraud Detection Agent', 'Actuary Analyst',
      'Risk Modeler', 'Policy Administrator', 'Customer Risk Analyst', 'Catastrophe Modeler',
      'Reinsurance Specialist', 'Insurance Agent', 'Insurance Broker', 'Claims Examiner',
      'Loss Adjuster', 'Surveyor', 'Appraiser', 'Investigator',
      'Actuary', 'Risk Analyst', 'Data Scientist', 'Model Developer',
      'Product Manager', 'Pricing Specialist', 'Compliance Officer', 'Regulatory Specialist',
      'Customer Service Representative', 'Account Manager', 'Relationship Manager', 'Sales Support',
      'Underwriting Assistant', 'Claims Assistant', 'Policy Servicing Specialist', 'Billing Specialist',
      'Catastrophe Risk Analyst', 'Climate Risk Analyst', 'Geospatial Analyst', 'Exposure Analyst',
      'Reinsurance Underwriter', 'Reinsurance Broker', 'Capital Management Specialist', 'Solvency Analyst',
      'Claims Quality Auditor', 'Underwriting Quality Auditor', 'Risk Control Specialist', 'Loss Prevention Specialist'
    ],
    capabilities: [
      'Underwriting', 'Claims Processing', 'Fraud Detection', 'Risk Modeling',
      'Policy Management', 'Actuarial Analysis', 'Catastrophe Modeling', 'Reinsurance Management',
      'Customer Risk Assessment', 'Insurance Operations', 'Product Development', 'Pricing',
      'Compliance Management', 'Regulatory Reporting', 'Data Analytics', 'Predictive Modeling',
      'Customer Service', 'Account Management', 'Sales Support', 'Policy Servicing',
      'Catastrophe Risk Management', 'Climate Risk Assessment', 'Geospatial Analysis', 'Exposure Management',
      'Reinsurance Operations', 'Capital Management', 'Solvency Management'
    ],
    integrations: [
      'Guidewire', 'Duck Creek', 'Insurity', 'Sapiens', 'Majesco',
      'SS&C', 'FIS', 'Oracle', 'SAP', 'Accenture'
    ],
    kpis: [
      'Loss Ratio', 'Combined Ratio', 'Expense Ratio', 'Underwriting Profit',
      'Claims Ratio', 'Fraud Detection Rate', 'Risk Score', 'Policy Renewal Rate',
      'Customer Retention Rate', 'Customer Acquisition Cost', 'Claim Processing Time', 'Underwriting Turnaround Time'
    ]
  },
  'healthcare-medical': {
    id: 'healthcare-medical',
    name: 'Healthcare & Medical',
    color: '#6366F1',
    icon: Heart,
    mainAgentCount: 15,
    subAgentCount: 45,
    mainAgentRoles: [
      'Chief Medical Officer', 'VP Healthcare Operations', 'VP Patient Experience',
      'Patient Services Manager', 'Medical Billing Manager', 'Scheduling Manager',
      'Patient Coordinator', 'Medical Coder', 'Billing Specialist', 'Care Coordinator',
      'Health Records Specialist', 'Telehealth Support', 'Healthcare Compliance', 'Quality Improvement Specialist', 'Clinical Operations Manager'
    ],
    subAgentRoles: [
      'Patient Coordinator', 'Medical Coder', 'Billing Specialist', 'Care Coordinator',
      'Health Records Specialist', 'Telehealth Support', 'Healthcare Compliance', 'Quality Improvement Specialist',
      'Patient Services Representative', 'Medical Assistant', 'Nurse Practitioner', 'Physician Assistant',
      'Medical Receptionist', 'Scheduling Coordinator', 'Registration Specialist', 'Insurance Verification Specialist',
      'Medical Biller', 'Coding Specialist', 'Revenue Cycle Specialist', 'Denial Management Specialist',
      'Care Manager', 'Case Manager', 'Discharge Planner', 'Social Worker',
      'Health Information Technician', 'Medical Records Clerk', 'Release of Information Specialist', 'Privacy Officer',
      'Telehealth Coordinator', 'Remote Monitoring Specialist', 'Digital Health Specialist', 'Health Tech Specialist',
      'Compliance Officer', 'Quality Assurance Specialist', 'Risk Manager', 'Patient Safety Officer',
      'Clinical Documentation Improvement Specialist', 'Physician Advisor', 'Medical Director', 'Chief of Staff',
      'Patient Experience Coordinator', 'Patient Advocate', 'Health Navigator', 'Community Health Worker'
    ],
    capabilities: [
      'Patient Care Coordination', 'Medical Billing', 'Health Records Management', 'Compliance Monitoring',
      'Telehealth Support', 'Quality Improvement', 'Patient Scheduling', 'Insurance Verification',
      'Care Management', 'Case Management', 'Health Information Management', 'Privacy Management',
      'Remote Patient Monitoring', 'Digital Health Integration', 'Clinical Documentation', 'Revenue Cycle Management',
      'Compliance Management', 'Quality Assurance', 'Risk Management', 'Patient Safety',
      'Physician Support', 'Nursing Support', 'Administrative Support', 'Clinical Decision Support'
    ],
    integrations: [
      'Epic', 'Cerner', 'Allscripts', 'Athenahealth', 'Meditech',
      'NextGen', 'GE Healthcare', 'Philips Healthcare', 'Siemens Healthineers', 'IBM Watson Health'
    ],
    kpis: [
      'Patient Satisfaction Score', 'Wait Time', 'No-Show Rate', 'Patient Throughput',
      'Billing Accuracy', 'Claim Denial Rate', 'Days in AR', 'Collection Rate',
      'Quality Score', 'Readmission Rate', 'Length of Stay', 'Patient Safety Incidents'
    ]
  },
  'manufacturing-production': {
    id: 'manufacturing-production',
    name: 'Manufacturing & Production',
    color: '#AF52DE',
    icon: Factory,
    mainAgentCount: 15,
    subAgentCount: 45,
    mainAgentRoles: [
      'Chief Production Officer', 'VP Manufacturing', 'VP Quality Assurance',
      'Production Manager', 'Quality Manager', 'Safety Manager', 'Production Planner',
      'Quality Inspector', 'Supply Chain Coordinator', 'Maintenance Technician',
      'Inventory Controller', 'Lean Specialist', 'Safety Inspector', 'Logistics Coordinator', 'Process Engineering Manager'
    ],
    subAgentRoles: [
      'Production Planner', 'Quality Inspector', 'Supply Chain Coordinator', 'Maintenance Technician',
      'Inventory Controller', 'Lean Specialist', 'Safety Inspector', 'Logistics Coordinator',
      'Production Supervisor', 'Shift Supervisor', 'Team Leader', 'Cell Leader',
      'Machine Operator', 'Assembly Technician', 'Fabricator', 'Welder',
      'Quality Control Inspector', 'Quality Assurance Analyst', 'Test Technician', 'Metrologist',
      'Maintenance Mechanic', 'Electrician', 'Instrument Technician', 'Reliability Engineer',
      'Inventory Analyst', 'Material Handler', 'Warehouse Associate', 'Shipping/Receiving Clerk',
      'Lean Facilitator', 'Six Sigma Black Belt', 'Continuous Improvement Manager', 'Process Engineer',
      'Safety Coordinator', 'EHS Specialist', 'Industrial Hygienist', 'Safety Engineer',
      'Production Scheduler', 'Capacity Planner', 'Demand Planner', 'Master Scheduler',
      'Logistics Coordinator', 'Transportation Coordinator', 'Distribution Manager', 'Supply Chain Analyst',
      'Production Control Specialist', 'Material Planner', 'Production Optimization Engineer', 'Manufacturing Systems Analyst'
    ],
    capabilities: [
      'Production Planning', 'Quality Control', 'Supply Chain Management', 'Maintenance Management',
      'Inventory Management', 'Lean Manufacturing', 'Safety Management', 'Logistics Coordination',
      'Production Scheduling', 'Capacity Planning', 'Demand Planning', 'Process Improvement',
      'Equipment Maintenance', 'Quality Assurance', 'Safety Compliance', 'Warehouse Management',
      'Lean Implementation', 'Six Sigma', 'Continuous Improvement', 'Process Engineering',
      'Safety Coordination', 'EHS Management', 'Risk Assessment', 'Compliance Management'
    ],
    integrations: [
      'SAP', 'Oracle', 'Infor', 'Microsoft Dynamics', 'Epicor',
      'QAD', 'PLEX', 'IQMS', 'Fishbowl', 'NetSuite'
    ],
    kpis: [
      'Overall Equipment Effectiveness', 'First Pass Yield', 'Scrap Rate', 'Rework Rate',
      'Production Output', 'Cycle Time', 'Lead Time', 'On-Time Delivery',
      'Inventory Turnover', 'Carrying Cost', 'Safety Incident Rate', 'Downtime'
    ]
  },
  'transportation-logistics': {
    id: 'transportation-logistics',
    name: 'Transportation & Logistics',
    color: '#5856D6',
    icon: Truck,
    mainAgentCount: 15,
    subAgentCount: 45,
    mainAgentRoles: [
      'Chief Logistics Officer', 'VP Transportation', 'VP Logistics Operations',
      'Fleet Manager', 'Warehouse Manager', 'Distribution Manager', 'Route Optimizer',
      'Fleet Coordinator', 'Warehouse Operator', 'Dispatcher', 'Tracking Specialist',
      'Last Mile Coordinator', 'Freight Broker', 'Customs Specialist', 'Logistics Operations Manager'
    ],
    subAgentRoles: [
      'Route Optimizer', 'Fleet Coordinator', 'Warehouse Operator', 'Dispatcher',
      'Tracking Specialist', 'Last Mile Coordinator', 'Freight Broker', 'Customs Specialist',
      'Driver', 'Delivery Driver', 'Truck Driver', 'Courier',
      'Fleet Manager', 'Vehicle Maintenance Technician', 'Fuel Manager', 'Route Planner',
      'Warehouse Manager', 'Warehouse Supervisor', 'Inventory Manager', 'Order Picker',
      'Distribution Manager', 'Logistics Coordinator', 'Supply Chain Manager', 'Operations Manager',
      'Dispatcher', 'Load Planner', 'Route Coordinator', 'Traffic Manager',
      'Tracking Specialist', 'Customer Service Representative', 'Proof of Delivery Specialist', 'Claims Handler',
      'Last Mile Coordinator', 'Delivery Manager', 'Route Driver', 'Parcel Manager',
      'Freight Broker', 'Freight Forwarder', 'Customs Broker', 'Compliance Specialist',
      'Import/Export Specialist', 'Trade Compliance Manager', 'Documentation Specialist', 'Tariff Specialist',
      'Logistics Analyst', 'Transportation Planner', 'Freight Cost Analyst', 'Carrier Relationship Manager'
    ],
    capabilities: [
      'Route Optimization', 'Fleet Management', 'Warehouse Operations', 'Dispatch Management',
      'Shipment Tracking', 'Last Mile Delivery', 'Freight Brokerage', 'Customs Compliance',
      'Transportation Management', 'Logistics Coordination', 'Supply Chain Visibility', 'Order Management',
      'Inventory Management', 'Warehouse Management', 'Fleet Maintenance', 'Fuel Management',
      'Route Planning', 'Load Planning', 'Traffic Management', 'Customer Service',
      'Delivery Management', 'Proof of Delivery', 'Claims Management', 'Import/Export Management'
    ],
    integrations: [
      'Oracle Transportation Management', 'SAP Transportation Management', 'JDA Software',
      'Manhattan Associates', 'Descartes', 'Trimble', 'KeepTruckin', 'Samsara',
      'FourKites', 'Project44'
    ],
    kpis: [
      'On-Time Delivery Rate', 'Delivery Cost per Package', 'Fuel Efficiency', 'Fleet Utilization',
      'Route Efficiency', 'Warehouse Throughput', 'Order Accuracy', 'Pick Rate',
      'Ship Time', 'Transit Time', 'Customer Satisfaction', 'Claims Rate'
    ]
  },
  'government-public-sector': {
    id: 'government-public-sector',
    name: 'Government & Public Sector',
    color: '#FFD700',
    icon: Landmark,
    mainAgentCount: 15,
    subAgentCount: 45,
    mainAgentRoles: [
      'Chief Administrative Officer', 'VP Public Policy', 'VP Regulatory Affairs',
      'VP Public Engagement', 'Policy Manager', 'Grants Manager', 'Policy Analyst',
      'Regulatory Specialist', 'Public Affairs Specialist', 'Grants Specialist',
      'Government Compliance', 'Transparency Officer', 'Legislative Affairs Manager', 'Public Communications Director', 'Citizen Services Director'
    ],
    subAgentRoles: [
      'Policy Manager', 'Grants Manager', 'Policy Analyst', 'Regulatory Specialist',
      'Public Affairs Specialist', 'Grants Specialist', 'Government Compliance', 'Transparency Officer',
      'Policy Advisor', 'Policy Researcher', 'Legislative Analyst', 'Regulatory Analyst',
      'Public Affairs Manager', 'Communications Specialist', 'Media Relations Specialist', 'Community Outreach Specialist',
      'Grants Administrator', 'Grants Officer', 'Grant Writer', 'Grant Reviewer',
      'Compliance Officer', 'Audit Specialist', 'Investigator', 'Inspector General',
      'Transparency Officer', 'Open Data Specialist', 'FOIA Officer', 'Records Manager',
      'Public Engagement Specialist', 'Citizen Services Representative', 'Constituent Services Specialist', 'Ombudsman',
      'Program Manager', 'Project Manager', 'Budget Analyst', 'Performance Analyst',
      'Evaluation Specialist', 'Research Analyst', 'Data Analyst', 'Policy Analyst',
      'Legislative Liaison', 'Government Relations Specialist', 'Public Policy Advisor', 'Civic Tech Specialist',
      'Digital Services Manager', 'Open Government Initiative Lead', 'Citizen Experience Designer', 'Public Innovation Coordinator'
    ],
    capabilities: [
      'Policy Development', 'Regulatory Compliance', 'Public Engagement', 'Grants Management',
      'Policy Analysis', 'Regulatory Analysis', 'Public Affairs', 'Communications',
      'Grants Administration', 'Compliance Management', 'Audit & Investigation', 'Transparency',
      'Open Data Management', 'FOIA Processing', 'Records Management', 'Citizen Services',
      'Constituent Services', 'Program Management', 'Budget Management', 'Performance Management',
      'Evaluation & Research', 'Data Analysis', 'Policy Research', 'Legislative Analysis'
    ],
    integrations: [
      'Grants.gov', 'SAM.gov', 'USA.gov', 'Regulations.gov', 'FOIA.gov',
      'Data.gov', 'USAspending.gov', 'Performance.gov', 'GSA Advantage', 'NASA SEWP'
    ],
    kpis: [
      'Policy Implementation Rate', 'Compliance Rate', 'Grant Award Rate', 'Public Engagement Score',
      'Transparency Index', 'Citizen Satisfaction', 'Service Delivery Time', 'Budget Utilization',
      'Program Effectiveness', 'Audit Findings Resolution', 'FOIA Response Time', 'Open Data Adoption'
    ]
  },
  'supply-chain-logistics': {
    id: 'supply-chain-logistics',
    name: 'Supply Chain & Logistics',
    color: '#34C759',
    icon: ShoppingCart,
    mainAgentCount: 15,
    subAgentCount: 45,
    mainAgentRoles: [
      'VP Supply Chain Operations', 'Procurement Manager', 'Logistics Manager',
      'Warehouse Lead', 'Procurement Buyer', 'Inventory Specialist', 'Demand Planner',
      'Supplier Relations', 'Shipping Coordinator', 'Fulfillment Specialist',
      'Strategic Sourcing Manager', 'Supply Chain Director', 'Materials Management Manager', 'Distribution Operations Manager', 'Supplier Performance Manager'
    ],
    subAgentRoles: [
      'Procurement Manager', 'Logistics Manager', 'Warehouse Lead', 'Procurement Buyer',
      'Inventory Specialist', 'Demand Planner', 'Supplier Relations', 'Shipping Coordinator',
      'Fulfillment Specialist', 'Procurement Specialist', 'Sourcing Specialist', 'Category Manager',
      'Strategic Sourcing Manager', 'Supplier Development Manager', 'Vendor Manager', 'Contract Manager',
      'Logistics Coordinator', 'Transportation Manager', 'Distribution Manager', 'Supply Chain Analyst',
      'Warehouse Manager', 'Inventory Manager', 'Materials Manager', 'Production Planner',
      'Demand Planner', 'Supply Planner', 'Capacity Planner', 'S&OP Manager',
      'Supplier Relations Manager', 'Supplier Quality Engineer', 'Supplier Performance Analyst', 'Commodity Manager',
      'Shipping Coordinator', 'Export Coordinator', 'Import Coordinator', 'Trade Compliance Specialist',
      'Fulfillment Specialist', 'Order Fulfillment Manager', 'E-commerce Fulfillment Specialist', 'Returns Manager',
      'Procurement Analyst', 'Sourcing Analyst', 'Category Buyer', 'Commodity Buyer',
      'Freight Forwarder', 'Customs Broker', 'Trade Finance Specialist', 'Supply Chain Risk Manager',
      'Warehouse Operations Specialist', 'Inventory Control Specialist', 'Material Requirements Planner', 'Supply Chain Optimization Analyst'
    ],
    capabilities: [
      'Procurement Management', 'Logistics Management', 'Warehouse Management', 'Inventory Management',
      'Demand Planning', 'Supply Planning', 'Supplier Relationship Management', 'Shipping Coordination',
      'Order Fulfillment', 'Strategic Sourcing', 'Category Management', 'Supplier Development',
      'Transportation Management', 'Distribution Management', 'Supply Chain Analytics', 'Production Planning',
      'Capacity Planning', 'Sales & Operations Planning', 'Supplier Quality Management', 'Trade Compliance',
      'Export/Import Management', 'E-commerce Fulfillment', 'Returns Management'
    ],
    integrations: [
      'SAP Ariba', 'Coupa', 'Jaggaer', 'GEP', 'Oracle SCM',
      'Kinaxis', 'E2open', 'Blue Yonder', 'Manhattan', 'HighJump'
    ],
    kpis: [
      'Procurement Cost Savings', 'Supplier On-Time Delivery', 'Inventory Turnover', 'Order Fill Rate',
      'Perfect Order Rate', 'Cash-to-Cash Cycle Time', 'Supplier Defect Rate', ' Logistics Cost as % of Sales',
      'Forecast Accuracy', 'Warehouse Utilization', 'Pick Accuracy', 'Ship Accuracy'
    ]
  },
  'ai-management-governance': {
    id: 'ai-management-governance',
    name: 'AI Management & Governance',
    color: '#8B5CF6',
    icon: Sparkles,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief AI Officer', 'VP AI Strategy', 'VP AI Operations', 'VP AI Learning',
      'AI Governance Director', 'AI Policy Director', 'AI Ethics Director', 'AI Compliance Director',
      'AI Risk Director', 'AI Security Director', 'AI Performance Director', 'AI Quality Director',
      'AI Strategy Manager', 'AI Operations Manager', 'AI Learning Manager', 'AI Governance Manager',
      'AI Policy Manager', 'AI Ethics Manager', 'AI Compliance Manager', 'AI Risk Manager'
    ],
    subAgentRoles: [
      'AI Strategy Specialist', 'AI Operations Specialist', 'AI Learning Specialist',
      'AI Governance Specialist', 'AI Policy Specialist', 'AI Ethics Specialist',
      'AI Compliance Specialist', 'AI Risk Specialist', 'AI Transparency Specialist',
      'AI Accountability Specialist', 'AI Fairness Specialist', 'AI Bias Specialist',
      'AI Model Specialist', 'AI Data Specialist', 'AI Security Specialist',
      'AI Performance Specialist', 'AI Quality Specialist', 'AI Testing Specialist',
      'AI Strategy Analyst', 'AI Operations Analyst', 'AI Learning Analyst',
      'AI Governance Analyst', 'AI Policy Analyst', 'AI Ethics Analyst',
      'AI Compliance Analyst', 'AI Risk Analyst', 'AI Transparency Analyst',
      'AI Accountability Analyst', 'AI Fairness Analyst', 'AI Bias Analyst',
      'AI Model Analyst', 'AI Data Analyst', 'AI Security Analyst',
      'AI Performance Analyst', 'AI Quality Analyst', 'AI Testing Analyst',
      'AI Strategy Coordinator', 'AI Operations Coordinator', 'AI Learning Coordinator',
      'AI Governance Coordinator', 'AI Policy Coordinator', 'AI Ethics Coordinator',
      'AI Compliance Coordinator', 'AI Risk Coordinator', 'AI Transparency Coordinator',
      'AI Accountability Coordinator', 'AI Fairness Coordinator', 'AI Bias Coordinator',
      'AI Model Coordinator', 'AI Data Coordinator', 'AI Security Coordinator',
      'AI Performance Coordinator', 'AI Quality Coordinator', 'AI Testing Coordinator'
    ],
    capabilities: [
      'AI Strategy Development', 'AI Operations Management', 'AI Learning Optimization',
      'AI Governance', 'AI Policy Management', 'AI Ethics Enforcement',
      'AI Compliance', 'AI Risk Assessment', 'AI Transparency', 'AI Accountability',
      'AI Fairness', 'AI Bias Detection', 'AI Model Management', 'AI Data Governance',
      'AI Security', 'AI Performance Monitoring', 'AI Quality Assurance', 'AI Testing'
    ],
    integrations: [
      'Microsoft Azure AI', 'Google Cloud AI', 'AWS AI Services', 'IBM Watson AI',
      'DataRobot', 'H2O.ai', 'Algorithmia', 'Dataiku', 'Databricks'
    ],
    kpis: [
      'AI Strategy Alignment', 'AI Operations Efficiency', 'AI Learning Rate',
      'AI Governance Compliance', 'AI Policy Adherence', 'AI Ethics Score',
      'AI Compliance Rate', 'AI Risk Score', 'AI Transparency Index', 'AI Accountability Rating',
      'AI Fairness Score', 'AI Bias Incidents', 'AI Model Performance', 'AI Data Quality',
      'AI Security Score', 'AI Performance Metrics', 'AI Quality Score', 'AI Testing Coverage'
    ]
  },
  // ============================================
  // INDUSTRY 14 DEPARTMENTS (60 agents each)
  // ============================================
  'banking-finance': {
    id: 'banking-finance',
    name: 'Banking & Finance',
    color: '#059669',
    icon: Landmark,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Banking Officer', 'VP Retail Banking', 'VP Commercial Banking', 'VP Investment Banking', 'VP Wealth Management', 'VP Risk Management', 'VP Compliance', 'Retail Banking Director', 'Commercial Banking Director', 'Investment Banking Director', 'Wealth Management Director', 'Risk Management Director', 'Compliance Director', 'Treasury Director', 'Digital Banking Director', 'Branch Director', 'Operations Director', 'Finance Director', 'HR Director'
    ],
    subAgentRoles: [
      'Loan Processor', 'Credit Analyst', 'Underwriter', 'Mortgage Specialist', 'Relationship Manager', 'Portfolio Manager', 'Investment Advisor', 'Financial Planner', 'Risk Analyst', 'Compliance Officer', 'AML Specialist', 'Fraud Analyst', 'Teller Supervisor', 'Branch Manager', 'Customer Service Representative', 'Operations Manager', 'Product Manager', 'Digital Banking Specialist', 'Mobile Banking Analyst', 'Payments Specialist', 'Treasury Analyst', 'Capital Markets Analyst', 'Derivatives Specialist', 'Trade Finance Specialist', 'Corporate Banking Analyst', 'SME Banking Specialist', 'Microfinance Officer', 'Credit Risk Analyst', 'Market Risk Analyst', 'Operational Risk Analyst', 'Liquidity Risk Analyst', 'Regulatory Reporting Analyst', 'Audit Analyst', 'Internal Controls Specialist', 'Finance Analyst', 'Business Analyst', 'Data Analyst', 'IT Security Specialist', 'Cybersecurity Analyst', 'Network Administrator', 'System Administrator', 'Loan Officer', 'Collection Specialist', 'Debt Counselor', 'Wealth Advisor', 'Trust Officer', 'Estate Planner'
    ],
    capabilities: [
      'Retail Banking', 'Commercial Banking', 'Investment Banking', 'Wealth Management', 'Risk Management', 'Compliance'
    ],
    integrations: [
      'Fiserv', 'Jack Henry', 'FIS', 'Oracle Banking', 'Temenos', 'Mambu'
    ],
    kpis: [
      'Loan Cycle Time', 'Delinquency Rate', 'AML False Positive Rate', 'Deposit Growth', 'Payment Failure Rate', 'NIM'
    ]
  },
  'ecommerce': {
    id: 'ecommerce',
    name: 'E-Commerce',
    color: '#7C3AED',
    icon: ShoppingCart,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief E-commerce Officer', 'VP Digital Sales', 'VP Customer Experience', 'VP Merchandising', 'VP Operations', 'VP Marketing', 'VP Technology', 'Digital Sales Director', 'Customer Experience Director', 'Merchandising Director', 'Operations Director', 'Marketing Director', 'Technology Director', 'Analytics Director', 'Supply Chain Director', 'Creative Director', 'UX/UI Director', 'Content Director', 'International Director'
    ],
    subAgentRoles: [
      'Product Listing Specialist', 'Price Optimization Agent', 'Inventory Monitor', 'Order Processing Specialist', 'Payment Gateway Manager', 'Shipping Coordinator', 'Return Processing Agent', 'Customer Support Agent', 'Live Chat Agent', 'Email Support Specialist', 'Social Media Support Agent', 'Product Review Analyst', 'UX/UI Designer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile App Developer', 'QA Engineer', 'DevOps Engineer', 'Data Engineer', 'Marketing Automation Specialist', 'SEO Specialist', 'PPC Specialist', 'Content Manager', 'Social Media Manager', 'Email Marketing Specialist', 'Affiliate Manager', 'Influencer Coordinator', 'Conversion Rate Optimizer', 'A/B Testing Specialist', 'Web Analyst', 'Business Analyst', 'Product Manager', 'Project Manager', 'Scrum Master', 'Warehouse Manager', 'Fulfillment Specialist', 'Inventory Planner', 'Demand Forecaster', 'Supply Chain Analyst', 'Logistics Coordinator', 'Customer Success Manager', 'Account Manager', 'Sales Representative', 'Copywriter', 'Photographer', 'Videographer', 'Marketplace Manager', 'Channel Manager', 'Market Research Analyst', 'Competitor Analyst', 'Customer Insights Analyst', 'User Researcher', 'Journey Mapper', 'Personalization Specialist', 'Recommendation Engine Analyst'
    ],
    capabilities: [
      'Product Management', 'Order Processing', 'Payment Processing', 'Shipping & Logistics', 'Customer Support', 'Digital Marketing'
    ],
    integrations: [
      'Shopify', 'Magento', 'WooCommerce', 'BigCommerce', 'Salesforce Commerce Cloud', 'Adobe Commerce'
    ],
    kpis: [
      'Conversion Rate', 'AOV', 'Cart Abandonment', 'Return Rate', 'Fulfillment SLA', 'Repeat Purchase Rate'
    ]
  },
  'professional-services': {
    id: 'professional-services',
    name: 'Professional Services',
    color: '#0891B2',
    icon: Briefcase,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Services Officer', 'VP Consulting', 'VP Advisory', 'VP Implementation', 'VP Customer Success', 'VP Practice Development', 'Consulting Director', 'Advisory Director', 'Implementation Director', 'Customer Success Director', 'Practice Development Director', 'Sales Director', 'Marketing Director', 'Operations Director', 'Finance Director', 'HR Director', 'Technology Director', 'Risk Director', 'Quality Director'
    ],
    subAgentRoles: [
      'Strategy Consultant', 'Operations Consultant', 'Technology Consultant', 'Financial Consultant', 'HR Consultant', 'Management Consultant', 'Business Analyst', 'Data Analyst', 'Process Improvement Specialist', 'Change Management Consultant', 'Project Manager', 'Program Manager', 'Portfolio Manager', 'Engagement Manager', 'Account Manager', 'Solution Architect', 'Technical Architect', 'Business Architect', 'Domain Expert', 'Subject Matter Expert', 'Trainer', 'Facilitator', 'Coach', 'Mentor', 'Quality Assurance Specialist', 'Risk Manager', 'Compliance Specialist', 'Proposal Writer', 'Bid Manager', 'Sales Engineer', 'Pre-sales Consultant', 'Post-sales Consultant', 'Customer Support Specialist', 'Technical Support Engineer', 'Implementation Consultant', 'Integration Specialist', 'Data Migration Specialist', 'Testing Specialist', 'UAT Coordinator', 'Go-to-market Specialist', 'Customer Onboarding Specialist', 'Customer Success Manager', 'Renewals Manager', 'Expansion Manager', 'Industry Consultant', 'Functional Consultant', 'Technical Consultant', 'Delivery Manager', 'Resource Manager', 'Practice Lead', 'Knowledge Manager', 'Innovation Specialist', 'Digital Transformation Consultant', 'Cloud Consultant', 'Security Consultant', 'Governance Consultant'
    ],
    capabilities: [
      'Consulting', 'Advisory Services', 'Implementation Services', 'Customer Success', 'Practice Development', 'Sales'
    ],
    integrations: [
      'Salesforce', 'ServiceNow', 'Microsoft Dynamics', 'SAP', 'Oracle', 'Workday'
    ],
    kpis: [
      'Utilization', 'Gross Margin', 'On-time Delivery', 'Scope Variance', 'Client Satisfaction', 'Billable Hours'
    ]
  },
  'media-entertainment': {
    id: 'media-entertainment',
    name: 'Media & Entertainment',
    color: '#EC4899',
    icon: Tv,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Media Officer', 'VP Content', 'VP Production', 'VP Distribution', 'VP Marketing', 'VP Technology', 'Content Director', 'Production Director', 'Distribution Director', 'Marketing Director', 'Technology Director', 'Creative Director', 'Programming Director', 'Analytics Director', 'Business Affairs Director', 'Rights Management Director', 'Digital Director', 'Studio Operations Director'
    ],
    subAgentRoles: [
      'Content Creator', 'Writer', 'Producer', 'Director', 'Editor', 'Cinematographer', 'Sound Engineer', 'Production Designer', 'Costume Designer', 'Makeup Artist', 'VFX Artist', 'Animator', 'Graphic Designer', 'Illustrator', 'Music Composer', 'Voice Actor', 'Casting Director', 'Location Manager', 'Script Supervisor', 'Production Coordinator', 'Post-production Supervisor', 'Colorist', 'Sound Designer', 'Foley Artist', 'Dubbing Specialist', 'Subtitle Specialist', 'Distribution Manager', 'Licensing Specialist', 'Rights Management Specialist', 'Digital Marketing Specialist', 'Social Media Manager', 'Public Relations Specialist', 'Event Coordinator', 'Brand Partnership Manager', 'Monetization Specialist', 'Revenue Analyst', 'Audience Analyst', 'Content Strategist', 'Platform Manager', 'App Developer', 'Web Developer', 'QA Engineer', 'Data Analyst', 'Programming Director', 'Analytics Director', 'Scheduling Coordinator', 'Budget Manager', 'Contract Manager', 'Talent Agent', 'Business Affairs Manager', 'Legal Specialist', 'Music Supervisor', 'Archivist', 'Metadata Specialist', 'Quality Control Manager', 'Studio Manager', 'Facility Manager', 'Equipment Manager', 'Technical Director', 'Broadcast Engineer', 'Transmission Specialist', 'Streaming Specialist'
    ],
    capabilities: [
      'Content Creation', 'Production', 'Distribution', 'Marketing', 'Technology', 'Analytics'
    ],
    integrations: [
      'Adobe Creative Cloud', 'Avid Media Composer', 'Final Cut Pro', 'DaVinci Resolve', 'Maya', 'Hootsuite'
    ],
    kpis: [
      'Audience Reach', 'Watch Time', 'Production Variance', 'Ad Fill Rate', 'Rights Utilization', 'Engagement Rate'
    ]
  },
  'gaming-esports': {
    id: 'gaming-esports',
    name: 'Gaming & Esports',
    color: '#8B5CF6',
    icon: Gamepad2,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Gaming Officer', 'VP Game Development', 'VP Esports', 'VP Community', 'VP Marketing', 'VP Technology', 'Game Development Director', 'Esports Director', 'Community Director', 'Marketing Director', 'Technology Director', 'Creative Director', 'Live Operations Director', 'Player Experience Director', 'Design Director', 'Engineering Director', 'Production Director', 'Business Director', 'Analytics Director'
    ],
    subAgentRoles: [
      'Game Designer', 'Level Designer', 'Narrative Designer', 'Character Artist', 'Environment Artist', 'UI/UX Designer', 'Animator', 'Technical Artist', 'Programmer', 'Engineer', 'QA Tester', 'Producer', 'Project Manager', 'Esports Manager', 'Tournament Organizer', 'Community Manager', 'Social Media Specialist', 'Content Creator', 'Stream Manager', 'Broadcast Producer', 'Commentator', 'Analyst', 'Coach', 'Team Manager', 'Player Support Specialist', 'Trust & Safety Specialist', 'Anti-cheat Specialist', 'Live Operations Manager', 'Event Manager', 'Business Analyst', 'Data Scientist', 'Monetization Designer', 'Product Manager', 'Marketing Manager', 'User Acquisition Specialist', 'Partnership Manager', 'Licensing Specialist', 'Technology Director', 'Creative Director', 'Live Operations Director', 'Player Experience Director', 'Audio Designer', 'Sound Engineer', 'Music Composer', 'Voice Actor', 'Motion Capture Specialist', 'Physics Programmer', 'AI Programmer', 'Network Programmer', 'Graphics Programmer', 'Tools Programmer', 'Build Engineer', 'Release Manager', 'Localization Manager', 'Compliance Manager', 'Culturalization Specialist', 'Player Insights Analyst', 'Economy Designer', 'Combat Designer', 'Systems Designer', 'Quest Designer', 'Writer', 'Creative Director', 'Art Director', 'Technical Director'
    ],
    capabilities: [
      'Game Development', 'Esports Management', 'Community Management', 'Marketing', 'Technology', 'Live Operations'
    ],
    integrations: [
      'Unity', 'Unreal Engine', 'Discord', 'Twitch', 'YouTube Gaming', 'Steam'
    ],
    kpis: [
      'DAU/MAU', 'Retention D7/D30', 'ARPU', 'Tournament Viewership', 'Toxicity Rate', 'Churn Rate'
    ]
  },
  'education': {
    id: 'education',
    name: 'Education',
    color: '#0EA5E9',
    icon: GraduationCap,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Education Officer', 'VP Academic Affairs', 'VP Student Services', 'VP Online Learning', 'VP Research', 'VP Administration', 'Academic Affairs Director', 'Student Services Director', 'Online Learning Director', 'Research Director', 'Administration Director', 'Curriculum Director', 'Faculty Director', 'Technology Director', 'Admissions Director', 'Financial Aid Director', 'Student Affairs Director', 'Diversity Director', 'Continuing Education Director'
    ],
    subAgentRoles: [
      'Curriculum Developer', 'Instructional Designer', 'Subject Matter Expert', 'Teacher', 'Professor', 'Teaching Assistant', 'Academic Advisor', 'Career Counselor', 'Student Success Coach', 'Learning Specialist', 'Accessibility Specialist', 'Assessment Designer', 'Learning Analyst', 'Educational Technologist', 'LMS Administrator', 'Online Course Developer', 'Video Producer', 'Content Editor', 'Quality Assurance Specialist', 'Program Coordinator', 'Department Chair', 'Dean', 'Researcher', 'Research Assistant', 'Grant Writer', 'Librarian', 'Archivist', 'IT Support Specialist', 'Help Desk Technician', 'Network Administrator', 'System Administrator', 'Data Analyst', 'Business Analyst', 'Financial Aid Officer', 'Registrar', 'Admissions Officer', 'Recruitment Specialist', 'Marketing Specialist', 'Event Coordinator', 'Facilities Manager', 'Security Officer', 'Student Affairs Director', 'Diversity Officer', 'International Student Advisor', 'Disability Services Coordinator', 'Mental Health Counselor', 'Tutor', 'Writing Center Specialist', 'Math Lab Specialist', 'Science Lab Technician', 'Computer Lab Technician', 'Academic Integrity Officer', 'Learning Outcomes Assessment Specialist', 'Institutional Research Analyst', 'Accreditation Specialist', 'Continuing Education Director', 'Executive Education Director', 'Corporate Training Manager', 'Workforce Development Specialist', 'Apprenticeship Coordinator', 'Internship Coordinator', 'Service Learning Coordinator'
    ],
    capabilities: [
      'Curriculum Development', 'Instructional Design', 'Student Services', 'Online Learning', 'Research', 'Administration'
    ],
    integrations: [
      'Canvas', 'Blackboard', 'Moodle', 'Coursera', 'edX', 'Zoom'
    ],
    kpis: [
      'Completion Rate', 'Student Retention', 'Assessment Scores', 'Enrollment Conversion', 'Attendance Rate', 'Learner Satisfaction'
    ]
  },
  'retail-stores': {
    id: 'retail-stores',
    name: 'Retail & Stores',
    color: '#06B6D4',
    icon: Shop,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Retail Officer', 'VP Store Operations', 'VP Merchandising', 'VP E-commerce', 'VP Supply Chain', 'Store Performance Director', 'Inventory Planning Director', 'Customer Loyalty Director', 'Loss Prevention Director', 'Human Resources Director', 'Marketing Director', 'Finance Director', 'Technology Director', 'Real Estate Director', 'Operations Director', 'Visual Merchandising Director', 'Customer Experience Director', 'Digital Director', 'International Director', 'Sustainability Director'
    ],
    subAgentRoles: [
      'Store Traffic Analyst', 'Planogram Auditor', 'Inventory Replenishment Agent', 'POS Exception Monitor', 'Shrinkage Risk Detector', 'Promotion Performance Analyst', 'Local Assortment Planner', 'Store Labor Scheduler', 'Omnichannel Pickup Coordinator', 'Returns Desk Assistant', 'Loyalty Segment Planner', 'Mystery Shop Summarizer', 'Price Compliance Auditor', 'Shelf Availability Monitor', 'Seasonal Allocation Agent', 'Supplier Fill-rate Tracker', 'Cash Office Reconciler', 'Store Opening Checklist Agent', 'Store Manager', 'Assistant Store Manager', 'Department Supervisor', 'Sales Associate', 'Cashier', 'Stock Associate', 'Customer Service Representative', 'Visual Merchandiser', 'Inventory Coordinator', 'Receiving Clerk', 'Security Officer', 'Loss Prevention Specialist', 'Operations Manager', 'District Manager', 'Regional Manager', 'Buyer', 'Planner', 'Allocator', 'Merchant', 'Marketing Coordinator', 'Social Media Specialist', 'Email Marketing Specialist', 'Event Coordinator', 'Personal Stylist', 'Fit Specialist', 'Beauty Advisor', 'Technical Specialist', 'Loss Prevention Director', 'Human Resources Director', 'Marketing Director', 'Finance Director', 'Technology Director', 'Real Estate Director', 'Operations Director', 'Supply Chain Director', 'E-commerce Director', 'Digital Marketing Manager', 'Customer Experience Manager', 'Brand Manager', 'Category Manager', 'Product Developer', 'Sourcing Specialist', 'Quality Control Inspector', 'Distribution Center Manager', 'Fulfillment Specialist', 'Last Mile Delivery Coordinator', 'Store Design Manager', 'Facilities Manager', 'Maintenance Technician'
    ],
    capabilities: [
      'Store Operations', 'Merchandising', 'Inventory Replenishment', 'Loss Prevention', 'Omnichannel Retail', 'Promotion Analytics'
    ],
    integrations: [
      'Square', 'Shopify POS', 'Lightspeed', 'Oracle Retail', 'NCR', 'NetSuite'
    ],
    kpis: [
      'Same-store Sales', 'Stockout Rate', 'Shrink Rate', 'Basket Size', 'Store Conversion', 'Inventory Accuracy'
    ]
  },
  'travel-tourism': {
    id: 'travel-tourism',
    name: 'Travel & Tourism',
    color: '#0891B2',
    icon: Plane,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Travel Officer', 'VP Airline Operations', 'VP Hotel Operations', 'VP Tour Operations', 'VP Customer Experience', 'Revenue Management Director', 'Operations Director', 'Sales Director', 'Marketing Director', 'Customer Service Director', 'Technology Director', 'Finance Director', 'Human Resources Director', 'Safety Director', 'Sustainability Director', 'Ground Services Director', 'Cabin Services Director', 'In-flight Services Director', 'Loyalty Program Director'
    ],
    subAgentRoles: [
      'Flight Operations Coordinator', 'Hotel Booking Agent', 'Tour Package Designer', 'Itinerary Planner', 'Travel Consultant', 'Customer Service Representative', 'Reservation Agent', 'Ticket Agent', 'Gate Agent', 'Flight Attendant', 'Pilot', 'Co-pilot', 'Aircraft Mechanic', 'Ground Crew', 'Baggage Handler', 'Concierge', 'Front Desk Agent', 'Housekeeper', 'Bellman', 'Restaurant Staff', 'Tour Guide', 'Driver', 'Cruise Director', 'Activity Coordinator', 'Revenue Analyst', 'Pricing Specialist', 'Inventory Manager', 'Sales Representative', 'Account Manager', 'Marketing Specialist', 'Social Media Manager', 'Content Creator', 'PR Specialist', 'Customer Experience Manager', 'Quality Assurance Specialist', 'Compliance Officer', 'Safety Inspector', 'Security Officer', 'Emergency Response Coordinator', 'Sustainability Coordinator', 'Data Analyst', 'Business Intelligence Analyst', 'Technology Support Specialist', 'Yield Management Specialist', 'Network Planning Analyst', 'Fleet Manager', 'Maintenance Director', 'Cabin Services Manager', 'In-flight Entertainment Manager', 'Lounge Manager', 'Ground Services Manager', 'Cargo Operations Manager', 'Charter Sales Manager', 'Group Travel Coordinator', 'Corporate Travel Manager', 'Leisure Travel Manager', 'Adventure Travel Specialist', 'Luxury Travel Advisor', 'Destination Specialist', 'Visa Processing Agent', 'Travel Insurance Specialist', 'Loyalty Program Manager'
    ],
    capabilities: [
      'Travel Operations', 'Hotel Operations', 'Tour Operations', 'Revenue Management', 'Customer Experience', 'Safety Management'
    ],
    integrations: [
      'Sabre', 'Amadeus', 'Travelport', 'Expedia', 'Booking.com', 'Airbnb'
    ],
    kpis: [
      'Occupancy Rate', 'Revenue per Available Room', 'Customer Satisfaction', 'Load Factor', 'Average Daily Rate', 'Net Promoter Score'
    ]
  },
  'energy-utilities': {
    id: 'energy-utilities',
    name: 'Energy & Utilities',
    color: '#F59E0B',
    icon: Zap,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Energy Officer', 'VP Generation', 'VP Transmission', 'VP Distribution', 'VP Renewable Energy', 'VP Regulatory Affairs', 'Generation Director', 'Transmission Director', 'Distribution Director', 'Renewable Energy Director', 'Regulatory Affairs Director', 'Operations Director', 'Engineering Director', 'Safety Director', 'Environmental Director', 'Technology Director', 'Finance Director', 'Human Resources Director', 'Supply Chain Director'
    ],
    subAgentRoles: [
      'Power Plant Operator', 'Grid Operator', 'Dispatch Operator', 'Maintenance Technician', 'Electrical Engineer', 'Mechanical Engineer', 'Civil Engineer', 'Chemical Engineer', 'Environmental Engineer', 'Safety Inspector', 'Compliance Officer', 'Regulatory Analyst', 'Policy Analyst', 'Renewable Energy Specialist', 'Solar Engineer', 'Wind Engineer', 'Hydroelectric Specialist', 'Battery Storage Specialist', 'Smart Grid Engineer', 'SCADA Technician', 'Meter Technician', 'Lineman', 'Pipeline Technician', 'Control Room Operator', 'Energy Trader', 'Risk Manager', 'Asset Manager', 'Project Manager', 'Construction Manager', 'Procurement Specialist', 'Supply Chain Coordinator', 'Financial Analyst', 'Business Analyst', 'Data Scientist', 'IT Specialist', 'Cybersecurity Specialist', 'Communication Specialist', 'Stakeholder Relations Manager', 'Nuclear Engineer', 'Geothermal Specialist', 'Biomass Specialist', 'Wave Energy Specialist', 'Energy Storage Engineer', 'Demand Response Manager', 'Energy Efficiency Specialist', 'Water Treatment Specialist', 'Wastewater Engineer', 'Environmental Compliance Manager', 'Permitting Specialist', 'Land Rights Manager', 'Right-of-Way Agent', 'Public Affairs Manager', 'Government Relations Specialist', 'Community Outreach Coordinator', 'Workforce Development Manager', 'Training Coordinator', 'Health Physics Technician', 'Radiation Protection Specialist'
    ],
    capabilities: [
      'Power Generation', 'Transmission', 'Distribution', 'Renewable Energy', 'Regulatory Compliance', 'Grid Operations'
    ],
    integrations: [
      'OSIsoft PI', 'SAP IS-U', 'ArcGIS', 'ServiceNow', 'Oracle Utilities', 'Power BI'
    ],
    kpis: [
      'SAIDI', 'SAIFI', 'Load Forecast Accuracy', 'Outage Restoration Time', 'Carbon Intensity', 'Field SLA'
    ]
  },
  'executive-strategy': {
    id: 'executive-strategy',
    name: 'Executive & Strategy',
    color: '#1F2937',
    icon: Crown,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Executive Officer', 'Chief Strategy Officer', 'Chief Operating Officer', 'VP Corporate Strategy', 'VP Executive Operations', 'VP Corporate Development', 'VP Mergers & Acquisitions', 'VP Investor Relations', 'VP Board Relations', 'VP Risk Management', 'Strategic Initiatives Director', 'Board & Governance Director', 'Executive Communications Director', 'Performance Management Director', 'Transformation Director', 'Corporate Development Director', 'Strategy Director', 'Innovation Director', 'Chief of Staff'
    ],
    subAgentRoles: [
      'OKR Alignment Agent', 'Board Pack Builder', 'Executive Briefing Writer', 'Competitive Strategy Analyst', 'Strategic Initiative Tracker', 'Scenario Planning Analyst', 'M&A Screen Assistant', 'Leadership Cadence Coordinator', 'Investor Narrative Drafter', 'Decision Log Curator', 'Risk Register Summarizer', 'Cross-functional Escalation Router', 'Market Signals Monitor', 'Transformation Roadmap Agent', 'Executive Follow-up Tracker', 'Strategic Planning Analyst', 'Market Intelligence Analyst', 'Financial Modeling Specialist', 'Valuation Analyst', 'M&A Analyst', 'Due Diligence Specialist', 'Integration Manager', 'Portfolio Manager', 'Investment Analyst', 'Capital Allocation Specialist', 'Performance Management Analyst', 'KPI Tracker', 'Dashboard Designer', 'Board Meeting Coordinator', 'Corporate Governance Specialist', 'Compliance Officer', 'Risk Analyst', 'Crisis Management Specialist', 'Communications Strategist', 'Media Relations Specialist', 'Investment Relations Specialist', 'Earnings Analyst', 'Shareholder Services Coordinator', 'Executive Assistant', 'Strategic Initiative Manager', 'Transformation Consultant', 'Change Management Specialist', 'Business Architect', 'Process Excellence Specialist', 'Corporate Development Analyst', 'Strategic Planning Manager', 'Market Research Analyst', 'Competitive Intelligence Analyst', 'Industry Analyst', 'Economic Analyst', 'Geopolitical Analyst', 'Trend Analyst', 'Innovation Strategist', 'Digital Transformation Specialist', 'Business Model Designer', 'Growth Strategist', 'M&A Integration Specialist', 'Divestiture Specialist', 'Joint Venture Manager', 'Partnership Development Manager', 'Strategic Alliance Manager', 'Ecosystem Strategist', 'Platform Strategy Manager', 'Corporate Ventures Manager'
    ],
    capabilities: [
      'Corporate Strategy', 'Executive Operations', 'Board Reporting', 'OKR Alignment', 'Scenario Planning', 'Strategic Initiatives'
    ],
    integrations: [
      'Microsoft 365', 'Google Workspace', 'Notion', 'Airtable', 'Power BI', 'Slack'
    ],
    kpis: [
      'Strategy Milestone Completion', 'OKR Attainment', 'Board Readiness', 'Decision Cycle Time', 'Initiative Health', 'Executive Follow-through'
    ]
  },
  'event-management': {
    id: 'event-management',
    name: 'Event Management',
    color: '#F97316',
    icon: Calendar,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Events Officer', 'VP Event Strategy', 'VP Production', 'VP Sales', 'VP Marketing', 'Event Operations Director', 'Sponsorship Director', 'Venue Director', 'Production Director', 'Creative Director', 'Technology Director', 'Finance Director', 'Human Resources Director', 'Client Services Director', 'Logistics Director', 'Safety Director', 'Sustainability Director', 'Digital Events Director', 'Experiential Director'
    ],
    subAgentRoles: [
      'Venue Shortlist Agent', 'Run-of-show Builder', 'Vendor Coordinator', 'Budget Tracker', 'Registration Flow Agent', 'Speaker Liaison', 'Sponsor Benefits Tracker', 'Ticketing Analyst', 'Attendee Journey Planner', 'Onsite Staffing Planner', 'Risk & Safety Checklist Agent', 'Post-event Survey Analyst', 'Content Capture Planner', 'Travel Block Coordinator', 'Event ROI Reporter', 'Event Manager', 'Assistant Event Manager', 'Event Coordinator', 'Production Manager', 'Technical Director', 'Audio Engineer', 'Lighting Designer', 'Stage Manager', 'Rigging Specialist', 'Video Engineer', 'Camera Operator', 'Streaming Specialist', 'Vendor Manager', 'Venue Coordinator', 'Catering Manager', 'Transportation Coordinator', 'Housing Coordinator', 'Registration Manager', 'Check-in Staff', 'Usher', 'Security Supervisor', 'Security Officer', 'Medical Staff', 'Crowd Manager', 'Traffic Coordinator', 'Parking Manager', 'Janitorial Staff', 'Setup Crew', 'Teardown Crew', 'Warehouse Manager', 'Inventory Manager', 'Equipment Technician', 'Graphic Designer', 'Web Developer', 'Email Marketing Specialist', 'Social Media Manager', 'Content Creator', 'Copywriter', 'Photographer', 'Videographer', 'Technology Director', 'Finance Director', 'Human Resources Director', 'Client Services Director', 'Logistics Director', 'Sponsorship Sales Manager', 'Event Sales Manager', 'Account Manager', 'Business Development Manager', 'Marketing Director', 'Public Relations Manager', 'Brand Manager', 'Digital Marketing Manager', 'Experience Designer', 'Creative Producer', 'Show Director', 'Floor Manager', 'Room Manager', 'Attendee Experience Manager', 'Volunteer Coordinator', 'Sustainability Coordinator', 'Accessibility Coordinator', 'Permitting Specialist', 'Insurance Specialist'
    ],
    capabilities: [
      'Event Planning', 'Vendor Coordination', 'Budget Control', 'Sponsorship Management', 'Attendee Operations', 'Risk Planning'
    ],
    integrations: [
      'Cvent', 'Eventbrite', 'Hopin', 'Airtable', 'Asana', 'Stripe'
    ],
    kpis: [
      'Attendance Rate', 'Event ROI', 'Sponsor Satisfaction', 'Budget Variance', 'Registration Conversion', 'NPS'
    ]
  },
  'agriculture': {
    id: 'agriculture',
    name: 'Agriculture',
    color: '#65A30D',
    icon: Sprout,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Agriculture Officer', 'VP Farming Operations', 'VP Processing', 'VP Supply Chain', 'VP Research & Development', 'VP Sustainability', 'Farming Operations Director', 'Processing Director', 'Supply Chain Director', 'Research Director', 'Sustainability Director', 'Quality Director', 'Safety Director', 'Technology Director', 'Finance Director', 'Human Resources Director', 'Business Development Director', 'Commodity Trading Director', 'Regulatory Affairs Director'
    ],
    subAgentRoles: [
      'Crop Specialist', 'Soil Scientist', 'Irrigation Specialist', 'Pest Management Specialist', 'Harvest Coordinator', 'Farm Equipment Operator', 'Maintenance Technician', 'Quality Control Inspector', 'Processing Technician', 'Packaging Specialist', 'Warehouse Manager', 'Logistics Coordinator', 'Procurement Specialist', 'Buyer', 'Commodities Trader', 'Risk Manager', 'Compliance Officer', 'Environmental Specialist', 'Sustainability Coordinator', 'Research Scientist', 'Lab Technician', 'Data Analyst', 'Agronomist', 'Horticulturist', 'Livestock Manager', 'Veterinary Technician', 'Breeding Specialist', 'Nutritionist', 'Farm Manager', 'Assistant Farm Manager', 'Field Supervisor', 'Equipment Manager', 'Safety Inspector', 'HR Manager', 'Finance Manager', 'IT Specialist', 'Sales Representative', 'Customer Service Representative', 'Marketing Specialist', 'Precision Agriculture Specialist', 'Drone Operator', 'Remote Sensing Analyst', 'Hydrologist', 'Meteorologist', 'Geneticist', 'Plant Pathologist', 'Entomologist', 'Microbiologist', 'Food Safety Specialist', 'Organic Certification Specialist', 'Regulatory Affairs Manager', 'Water Resources Manager', 'Conservation Specialist', 'Soil Conservationist', 'Waste Management Specialist', 'Bioenergy Specialist', 'Agroforestry Specialist', 'Aquaculture Specialist', 'Greenhouse Manager', 'Nursery Manager', 'Seed Specialist', 'Fertilizer Specialist', 'Crop Protection Specialist', 'Agricultural Engineer', 'Irrigation Engineer', 'Mechanical Engineer', 'Automation Specialist', 'Technology Integration Manager'
    ],
    capabilities: [
      'Crop Management', 'Livestock Management', 'Processing', 'Supply Chain', 'Research & Development', 'Sustainability'
    ],
    integrations: [
      'John Deere Operations Center', 'Climate FieldView', 'Trimble Ag', 'AGCO', 'CNH Industrial', 'Granular'
    ],
    kpis: [
      'Yield per Acre', 'Input Cost per Acre', 'Water Use Efficiency', 'Crop Loss Rate', 'Harvest Timeliness', 'Traceability Coverage'
    ]
  },
  'fashion-luxury': {
    id: 'fashion-luxury',
    name: 'Fashion & Luxury',
    color: '#C026D3',
    icon: Bag,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Brand & Luxury Officer', 'VP Fashion Merchandising', 'VP Luxury Clienteling', 'VP Design', 'VP Retail', 'VP E-commerce', 'Design Operations Director', 'Collection Planning Director', 'Luxury Experience Director', 'Merchandising Director', 'Retail Director', 'E-commerce Director', 'Marketing Director', 'Supply Chain Director', 'Finance Director', 'Human Resources Director', 'Creative Director', 'Brand Director', 'Digital Director', 'Sustainability Director'
    ],
    subAgentRoles: [
      'Trend Forecaster', 'Collection Assortment Planner', 'Runway Calendar Coordinator', 'VIP Clienteling Specialist', 'Personal Styling Advisor', 'Boutique Inventory Analyst', 'Luxury Pricing Analyst', 'Brand Partnership Coordinator', 'Visual Merchandising Auditor', 'Sustainable Materials Researcher', 'Product Drop Planner', 'Returns Quality Reviewer', 'Influencer Seeding Coordinator', 'Lookbook Content Planner', 'Wholesale Account Analyst', 'Counterfeit Risk Monitor', 'Size Curve Analyst', 'Seasonal Demand Forecaster', 'Fashion Designer', 'Textile Designer', 'Accessory Designer', 'Pattern Maker', 'Sample Maker', 'Fit Technician', 'Quality Control Inspector', 'Production Coordinator', 'Sourcing Specialist', 'Material Buyer', 'Trim Buyer', 'Production Manager', 'Factory Liaison', 'Boutique Manager', 'Assistant Store Manager', 'Sales Associate', 'Visual Merchandiser', 'Stock Room Supervisor', 'Client Advisor', 'Personal Shopper', 'Stylist', 'Makeup Artist', 'Photographer', 'Model Booker', 'Showroom Manager', 'PR Specialist', 'Social Media Manager', 'Content Creator', 'Copywriter', 'Graphic Designer', 'Email Marketing Specialist', 'CRM Manager', 'Customer Service Representative', 'Inventory Planner', 'Allocator', 'Distribution Coordinator', 'Marketing Director', 'Supply Chain Director', 'Finance Director', 'Human Resources Director', 'Creative Director', 'Art Director', 'Design Director', 'Merchandising Analyst', 'Retail Analyst', 'E-commerce Analyst', 'Digital Marketing Manager', 'Brand Manager', 'Social Media Director', 'Influencer Marketing Manager', 'Public Relations Director', 'Events Director', 'Fashion Show Producer', 'Digital Content Creator', 'Video Producer', 'Art Director', 'Copy Chief', 'Brand Strategist'
    ],
    capabilities: [
      'Collection Planning', 'Luxury Clienteling', 'Merchandising Analytics', 'Trend Forecasting', 'Brand Management', 'Inventory Optimization'
    ],
    integrations: [
      'Shopify Plus', 'Farfetch', 'NetSuite', 'Klaviyo', 'Salesforce Commerce Cloud', 'Adobe Commerce'
    ],
    kpis: [
      'Sell-through Rate', 'Average Order Value', 'Inventory Turnover', 'VIP Retention', 'Return Rate', 'Gross Margin'
    ]
  },
  'restaurants': {
    id: 'restaurants',
    name: 'Restaurants',
    color: '#EF4444',
    icon: Store,
    mainAgentCount: 20,
    subAgentCount: 40,
    mainAgentRoles: [
      'Chief Restaurant Officer', 'VP Restaurant Operations', 'VP Culinary', 'VP Beverage', 'VP Marketing', 'VP Finance', 'Kitchen Operations Director', 'Front of House Director', 'Beverage Director', 'Marketing Director', 'Finance Director', 'Human Resources Director', 'Technology Director', 'Design Director', 'Quality Director', 'Safety Director', 'Catering Director', 'Concept Development Director', 'Multi-unit Director', 'Real Estate Director'
    ],
    subAgentRoles: [
      'Menu Engineer', 'Recipe Developer', 'Cost Control Specialist', 'Inventory Manager', 'Purchasing Agent', 'Receiving Clerk', 'Storeroom Clerk', 'Executive Chef', 'Sous Chef', 'Line Cook', 'Prep Cook', 'Dishwasher', 'Pastry Chef', 'Baker', 'Sommelier', 'Bartender', 'Barback', 'Server', 'Server Assistant', 'Host', 'Hostess', 'Restaurant Manager', 'Assistant Manager', 'General Manager', 'Shift Leader', 'Marketing Coordinator', 'Social Media Manager', 'Event Coordinator', 'Catering Manager', 'Private Dining Manager', 'Banquet Manager', 'Quality Assurance Specialist', 'Health Inspector', 'Safety Officer', 'Maintenance Technician', 'Accounting Specialist', 'HR Manager', 'IT Support Specialist', 'Finance Director', 'Human Resources Director', 'Technology Director', 'Design Director', 'Chef de Cuisine', 'Chef de Partie', 'Commis Chef', 'Garde Manger', 'Poissonier', 'Rotisseur', 'Grillardin', 'Friturier', 'Entremetier', 'Boucher', 'Pâtissier', 'Confiseur', 'Boulanger', 'Executive Pastry Chef', 'Pastry Cook', 'Baker Assistant', 'Wine Director', 'Mixologist', 'Head Bartender', 'Bar Supervisor', 'Food Runner', 'Busser', 'Food Expeditor', 'Beverage Expeditor', 'Reservationist', 'Host Manager', 'Floor Manager', 'Guest Relations Manager', 'Loyalty Program Manager', 'Delivery Manager', 'Takeout Specialist', 'Catering Sales Manager', 'Private Events Manager', 'Corporate Sales Manager', 'Wedding Specialist', 'Brand Ambassador', 'Community Manager', 'Influencer Coordinator'
    ],
    capabilities: [
      'Culinary Operations', 'Beverage Program', 'Front of House', 'Marketing', 'Finance', 'Quality Assurance'
    ],
    integrations: [
      'Toast', 'OpenTable', 'Square', 'DoorDash', 'Uber Eats', 'Resy'
    ],
    kpis: [
      'Food Cost %', 'Labor Cost %', 'Table Turn Time', 'Guest Satisfaction', 'Average Check', 'Prime Cost'
    ]
  }
};

const createIndustryDepartment = (
  id: string,
  name: string,
  color: string,
  icon: any,
  mainAgentRoles: string[],
  subAgentRoles: string[],
  capabilities: string[],
  integrations: string[],
  kpis: string[]
): DepartmentConfig => ({
  id,
  name,
  color,
  icon,
  mainAgentCount: mainAgentRoles.length,
  subAgentCount: subAgentRoles.length,
  mainAgentRoles,
  subAgentRoles,
  capabilities,
  integrations,
  kpis,
});

Object.assign(DEPARTMENT_CONFIGS, {
  'banking-finance': createIndustryDepartment(
    'banking-finance',
    'Banking & Finance',
    '#059669',
    Landmark,
    ['Chief Banking Officer', 'VP Retail Banking', 'VP Commercial Banking', 'VP Investment Banking', 'VP Wealth Management', 'VP Risk Management', 'VP Compliance', 'Retail Banking Director', 'Commercial Banking Director', 'Investment Banking Director', 'Wealth Management Director', 'Risk Management Director', 'Compliance Director'],
    ['Loan Processor', 'Credit Analyst', 'Underwriter', 'Mortgage Specialist', 'Relationship Manager', 'Portfolio Manager', 'Investment Advisor', 'Financial Planner', 'Risk Analyst', 'Compliance Officer', 'AML Specialist', 'Fraud Analyst', 'Teller Supervisor', 'Branch Manager', 'Customer Service Representative', 'Operations Manager', 'Product Manager', 'Digital Banking Specialist', 'Mobile Banking Analyst', 'Payments Specialist', 'Treasury Analyst', 'Capital Markets Analyst', 'Derivatives Specialist', 'Trade Finance Specialist', 'Corporate Banking Analyst', 'SME Banking Specialist', 'Microfinance Officer', 'Credit Risk Analyst', 'Market Risk Analyst', 'Operational Risk Analyst', 'Liquidity Risk Analyst', 'Regulatory Reporting Analyst', 'Audit Analyst', 'Internal Controls Specialist', 'Finance Analyst', 'Business Analyst', 'Data Analyst', 'IT Security Specialist', 'Cybersecurity Analyst', 'Network Administrator', 'System Administrator', 'Loan Officer', 'Collection Specialist', 'Debt Counselor', 'Wealth Advisor', 'Trust Officer', 'Estate Planner', 'Insurance Specialist', 'Investment Analyst', 'Trading Specialist', 'Foreign Exchange Trader', 'Commodities Trader', 'Fixed Income Analyst', 'Equity Analyst', 'Private Banker', 'Commercial Lender', 'Small Business Banker', 'Agricultural Lender', 'Healthcare Banking Specialist', 'Real Estate Finance Specialist', 'Leasing Specialist', 'Factoring Specialist', 'Supply Chain Finance Analyst', 'Trade Finance Officer', 'Cash Management Specialist', 'Liquidity Manager', 'ALM Analyst'],
    ['Retail Banking', 'Commercial Banking', 'Investment Banking', 'Wealth Management', 'Risk Management', 'Compliance'],
    ['Fiserv', 'Jack Henry', 'FIS', 'Oracle Banking', 'Temenos', 'Mambu'],
    ['Loan Cycle Time', 'Delinquency Rate', 'AML False Positive Rate', 'Deposit Growth', 'Payment Failure Rate', 'NIM']
  ),
  'ecommerce': createIndustryDepartment(
    'ecommerce',
    'E-Commerce',
    '#7C3AED',
    ShoppingCart,
    ['Chief E-commerce Officer', 'VP Digital Sales', 'VP Customer Experience', 'VP Merchandising', 'VP Operations', 'VP Marketing', 'VP Technology', 'Digital Sales Director', 'Customer Experience Director', 'Merchandising Director', 'Operations Director', 'Marketing Director', 'Technology Director', 'Analytics Director', 'Supply Chain Director'],
    ['Product Listing Specialist', 'Price Optimization Agent', 'Inventory Monitor', 'Order Processing Specialist', 'Payment Gateway Manager', 'Shipping Coordinator', 'Return Processing Agent', 'Customer Support Agent', 'Live Chat Agent', 'Email Support Specialist', 'Social Media Support Agent', 'Product Review Analyst', 'UX/UI Designer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile App Developer', 'QA Engineer', 'DevOps Engineer', 'Data Engineer', 'Marketing Automation Specialist', 'SEO Specialist', 'PPC Specialist', 'Content Manager', 'Social Media Manager', 'Email Marketing Specialist', 'Affiliate Manager', 'Influencer Coordinator', 'Conversion Rate Optimizer', 'A/B Testing Specialist', 'Web Analyst', 'Business Analyst', 'Product Manager', 'Project Manager', 'Scrum Master', 'Warehouse Manager', 'Fulfillment Specialist', 'Inventory Planner', 'Demand Forecaster', 'Supply Chain Analyst', 'Logistics Coordinator', 'Customer Success Manager', 'Account Manager', 'Sales Representative', 'Copywriter', 'Photographer', 'Videographer', 'Marketplace Manager', 'Channel Manager', 'Market Research Analyst', 'Competitor Analyst', 'Customer Insights Analyst', 'User Researcher', 'Journey Mapper', 'Personalization Specialist', 'Recommendation Engine Analyst', 'Search Merchandiser', 'Site Merchandiser', 'Catalog Manager'],
    ['Product Management', 'Order Processing', 'Payment Processing', 'Shipping & Logistics', 'Customer Support', 'Digital Marketing'],
    ['Shopify', 'Magento', 'WooCommerce', 'BigCommerce', 'Salesforce Commerce Cloud', 'Adobe Commerce'],
    ['Conversion Rate', 'AOV', 'Cart Abandonment', 'Return Rate', 'Fulfillment SLA', 'Repeat Purchase Rate']
  ),
  'professional-services': createIndustryDepartment(
    'professional-services',
    'Professional Services',
    '#0891B2',
    Briefcase,
    ['Chief Services Officer', 'VP Consulting', 'VP Advisory', 'VP Implementation', 'VP Customer Success', 'VP Practice Development', 'Consulting Director', 'Advisory Director', 'Implementation Director', 'Customer Success Director', 'Practice Development Director', 'Sales Director', 'Marketing Director'],
    ['Strategy Consultant', 'Operations Consultant', 'Technology Consultant', 'Financial Consultant', 'HR Consultant', 'Management Consultant', 'Business Analyst', 'Data Analyst', 'Process Improvement Specialist', 'Change Management Consultant', 'Project Manager', 'Program Manager', 'Portfolio Manager', 'Engagement Manager', 'Account Manager', 'Solution Architect', 'Technical Architect', 'Business Architect', 'Domain Expert', 'Subject Matter Expert', 'Trainer', 'Facilitator', 'Coach', 'Mentor', 'Quality Assurance Specialist', 'Risk Manager', 'Compliance Specialist', 'Proposal Writer', 'Bid Manager', 'Sales Engineer', 'Pre-sales Consultant', 'Post-sales Consultant', 'Customer Support Specialist', 'Technical Support Engineer', 'Implementation Consultant', 'Integration Specialist', 'Data Migration Specialist', 'Testing Specialist', 'UAT Coordinator', 'Go-to-market Specialist', 'Customer Onboarding Specialist', 'Customer Success Manager', 'Renewals Manager', 'Expansion Manager', 'Industry Consultant', 'Functional Consultant', 'Technical Consultant', 'Delivery Manager', 'Resource Manager', 'Practice Lead', 'Knowledge Manager', 'Innovation Specialist', 'Digital Transformation Consultant', 'Cloud Consultant', 'Security Consultant', 'Governance Consultant', 'Sustainability Consultant', 'ESG Consultant', 'Revenue Consultant', 'Growth Consultant', 'Productivity Consultant', 'Automation Consultant'],
    ['Consulting', 'Advisory Services', 'Implementation Services', 'Customer Success', 'Practice Development', 'Sales'],
    ['Salesforce', 'ServiceNow', 'Microsoft Dynamics', 'SAP', 'Oracle', 'Workday'],
    ['Utilization', 'Gross Margin', 'On-time Delivery', 'Scope Variance', 'Client Satisfaction', 'Billable Hours']
  ),
  'media-entertainment': createIndustryDepartment(
    'media-entertainment',
    'Media & Entertainment',
    '#EC4899',
    Tv,
    ['Chief Media Officer', 'VP Content', 'VP Production', 'VP Distribution', 'VP Marketing', 'VP Technology', 'Content Director', 'Production Director', 'Distribution Director', 'Marketing Director', 'Technology Director', 'Creative Director'],
    ['Content Creator', 'Writer', 'Producer', 'Director', 'Editor', 'Cinematographer', 'Sound Engineer', 'Production Designer', 'Costume Designer', 'Makeup Artist', 'VFX Artist', 'Animator', 'Graphic Designer', 'Illustrator', 'Music Composer', 'Voice Actor', 'Casting Director', 'Location Manager', 'Script Supervisor', 'Production Coordinator', 'Post-production Supervisor', 'Colorist', 'Sound Designer', 'Foley Artist', 'Dubbing Specialist', 'Subtitle Specialist', 'Distribution Manager', 'Licensing Specialist', 'Rights Management Specialist', 'Digital Marketing Specialist', 'Social Media Manager', 'Public Relations Specialist', 'Event Coordinator', 'Brand Partnership Manager', 'Monetization Specialist', 'Revenue Analyst', 'Audience Analyst', 'Content Strategist', 'Platform Manager', 'App Developer', 'Web Developer', 'QA Engineer', 'Data Analyst', 'Programming Director', 'Analytics Director', 'Scheduling Coordinator', 'Budget Manager', 'Contract Manager', 'Talent Agent', 'Business Affairs Manager', 'Legal Specialist', 'Music Supervisor', 'Archivist', 'Metadata Specialist', 'Quality Control Manager', 'Studio Manager', 'Facility Manager', 'Equipment Manager', 'Technical Director', 'Broadcast Engineer', 'Transmission Specialist', 'Streaming Specialist', 'OTT Specialist', 'Content Moderator', 'Community Manager', 'Fan Engagement Specialist', 'Merchandising Manager', 'Licensing Executive'],
    ['Content Creation', 'Production', 'Distribution', 'Marketing', 'Technology', 'Analytics'],
    ['Adobe Creative Cloud', 'Avid Media Composer', 'Final Cut Pro', 'DaVinci Resolve', 'Maya', 'Hootsuite'],
    ['Audience Reach', 'Watch Time', 'Production Variance', 'Ad Fill Rate', 'Rights Utilization', 'Engagement Rate']
  ),
  'gaming-esports': createIndustryDepartment(
    'gaming-esports',
    'Gaming & Esports',
    '#8B5CF6',
    Gamepad2,
    ['Chief Gaming Officer', 'VP Game Development', 'VP Esports', 'VP Community', 'VP Marketing', 'VP Technology', 'Game Development Director', 'Esports Director', 'Community Director', 'Marketing Director'],
    ['Game Designer', 'Level Designer', 'Narrative Designer', 'Character Artist', 'Environment Artist', 'UI/UX Designer', 'Animator', 'Technical Artist', 'Programmer', 'Engineer', 'QA Tester', 'Producer', 'Project Manager', 'Esports Manager', 'Tournament Organizer', 'Community Manager', 'Social Media Specialist', 'Content Creator', 'Stream Manager', 'Broadcast Producer', 'Commentator', 'Analyst', 'Coach', 'Team Manager', 'Player Support Specialist', 'Trust & Safety Specialist', 'Anti-cheat Specialist', 'Live Operations Manager', 'Event Manager', 'Business Analyst', 'Data Scientist', 'Monetization Designer', 'Product Manager', 'Marketing Manager', 'User Acquisition Specialist', 'Partnership Manager', 'Licensing Specialist', 'Technology Director', 'Creative Director', 'Live Operations Director', 'Player Experience Director', 'Audio Designer', 'Sound Engineer', 'Music Composer', 'Voice Actor', 'Motion Capture Specialist', 'Physics Programmer', 'AI Programmer', 'Network Programmer', 'Graphics Programmer', 'Tools Programmer', 'Build Engineer', 'Release Manager', 'Localization Manager', 'Compliance Manager', 'Culturalization Specialist', 'Player Insights Analyst', 'Economy Designer', 'Combat Designer', 'Systems Designer', 'Quest Designer', 'Writer', 'Creative Director', 'Art Director', 'Technical Director'],
    ['Game Development', 'Esports Management', 'Community Management', 'Marketing', 'Technology', 'Live Operations'],
    ['Unity', 'Unreal Engine', 'Discord', 'Twitch', 'YouTube Gaming', 'Steam'],
    ['DAU/MAU', 'Retention D7/D30', 'ARPU', 'Tournament Viewership', 'Toxicity Rate', 'Churn Rate']
  ),
  'education': createIndustryDepartment(
    'education',
    'Education',
    '#0EA5E9',
    GraduationCap,
    ['Chief Education Officer', 'VP Academic Affairs', 'VP Student Services', 'VP Online Learning', 'VP Research', 'VP Administration', 'Academic Affairs Director', 'Student Services Director', 'Online Learning Director', 'Research Director'],
    ['Curriculum Developer', 'Instructional Designer', 'Subject Matter Expert', 'Teacher', 'Professor', 'Teaching Assistant', 'Academic Advisor', 'Career Counselor', 'Student Success Coach', 'Learning Specialist', 'Accessibility Specialist', 'Assessment Designer', 'Learning Analyst', 'Educational Technologist', 'LMS Administrator', 'Online Course Developer', 'Video Producer', 'Content Editor', 'Quality Assurance Specialist', 'Program Coordinator', 'Department Chair', 'Dean', 'Researcher', 'Research Assistant', 'Grant Writer', 'Librarian', 'Archivist', 'IT Support Specialist', 'Help Desk Technician', 'Network Administrator', 'System Administrator', 'Data Analyst', 'Business Analyst', 'Financial Aid Officer', 'Registrar', 'Admissions Officer', 'Recruitment Specialist', 'Marketing Specialist', 'Event Coordinator', 'Facilities Manager', 'Security Officer', 'Administration Director', 'Curriculum Director', 'Faculty Director', 'Technology Director', 'Student Affairs Director', 'Diversity Officer', 'International Student Advisor', 'Disability Services Coordinator', 'Mental Health Counselor', 'Tutor', 'Writing Center Specialist', 'Math Lab Specialist', 'Science Lab Technician', 'Computer Lab Technician', 'Academic Integrity Officer', 'Learning Outcomes Assessment Specialist', 'Institutional Research Analyst', 'Accreditation Specialist', 'Continuing Education Director', 'Executive Education Director', 'Corporate Training Manager', 'Workforce Development Specialist', 'Apprenticeship Coordinator', 'Internship Coordinator', 'Service Learning Coordinator'],
    ['Curriculum Development', 'Instructional Design', 'Student Services', 'Online Learning', 'Research', 'Administration'],
    ['Canvas', 'Blackboard', 'Moodle', 'Coursera', 'edX', 'Zoom'],
    ['Completion Rate', 'Student Retention', 'Assessment Scores', 'Enrollment Conversion', 'Attendance Rate', 'Learner Satisfaction']
  ),
  'retail-stores': createIndustryDepartment(
    'retail-stores',
    'Retail & Stores',
    '#06B6D4',
    Shop,
    ['Chief Retail Officer', 'VP Store Operations', 'VP Merchandising', 'VP E-commerce', 'VP Supply Chain', 'Store Performance Director', 'Inventory Planning Director', 'Customer Loyalty Director'],
    ['Store Traffic Analyst', 'Planogram Auditor', 'Inventory Replenishment Agent', 'POS Exception Monitor', 'Shrinkage Risk Detector', 'Promotion Performance Analyst', 'Local Assortment Planner', 'Store Labor Scheduler', 'Omnichannel Pickup Coordinator', 'Returns Desk Assistant', 'Loyalty Segment Planner', 'Mystery Shop Summarizer', 'Price Compliance Auditor', 'Shelf Availability Monitor', 'Seasonal Allocation Agent', 'Supplier Fill-rate Tracker', 'Cash Office Reconciler', 'Store Opening Checklist Agent', 'Store Manager', 'Assistant Store Manager', 'Department Supervisor', 'Sales Associate', 'Cashier', 'Stock Associate', 'Customer Service Representative', 'Visual Merchandiser', 'Inventory Coordinator', 'Receiving Clerk', 'Security Officer', 'Loss Prevention Specialist', 'Operations Manager', 'District Manager', 'Regional Manager', 'Buyer', 'Planner', 'Allocator', 'Merchant', 'Marketing Coordinator', 'Social Media Specialist', 'Email Marketing Specialist', 'Event Coordinator', 'Personal Stylist', 'Fit Specialist', 'Beauty Advisor', 'Technical Specialist', 'Loss Prevention Director', 'Human Resources Director', 'Marketing Director', 'Finance Director', 'Technology Director', 'Real Estate Director', 'Operations Director', 'Supply Chain Director', 'E-commerce Director', 'Digital Marketing Manager', 'Customer Experience Manager', 'Brand Manager', 'Category Manager', 'Product Developer', 'Sourcing Specialist', 'Quality Control Inspector', 'Distribution Center Manager', 'Fulfillment Specialist', 'Last Mile Delivery Coordinator', 'Store Design Manager', 'Facilities Manager', 'Maintenance Technician', 'Environmental Services Manager'],
    ['Store Operations', 'Merchandising', 'Inventory Replenishment', 'Loss Prevention', 'Omnichannel Retail', 'Promotion Analytics'],
    ['Square', 'Shopify POS', 'Lightspeed', 'Oracle Retail', 'NCR', 'NetSuite'],
    ['Same-store Sales', 'Stockout Rate', 'Shrink Rate', 'Basket Size', 'Store Conversion', 'Inventory Accuracy']
  ),
  'travel-tourism': createIndustryDepartment(
    'travel-tourism',
    'Travel & Tourism',
    '#0891B2',
    Plane,
    ['Chief Travel Officer', 'VP Airline Operations', 'VP Hotel Operations', 'VP Tour Operations', 'VP Customer Experience', 'Revenue Management Director', 'Operations Director', 'Sales Director', 'Marketing Director', 'Customer Service Director'],
    ['Flight Operations Coordinator', 'Hotel Booking Agent', 'Tour Package Designer', 'Itinerary Planner', 'Travel Consultant', 'Customer Service Representative', 'Reservation Agent', 'Ticket Agent', 'Gate Agent', 'Flight Attendant', 'Pilot', 'Co-pilot', 'Aircraft Mechanic', 'Ground Crew', 'Baggage Handler', 'Concierge', 'Front Desk Agent', 'Housekeeper', 'Bellman', 'Restaurant Staff', 'Tour Guide', 'Driver', 'Cruise Director', 'Activity Coordinator', 'Revenue Analyst', 'Pricing Specialist', 'Inventory Manager', 'Sales Representative', 'Account Manager', 'Marketing Specialist', 'Social Media Manager', 'Content Creator', 'PR Specialist', 'Customer Experience Manager', 'Quality Assurance Specialist', 'Compliance Officer', 'Safety Inspector', 'Security Officer', 'Emergency Response Coordinator', 'Sustainability Coordinator', 'Data Analyst', 'Business Intelligence Analyst', 'Technology Support Specialist', 'Technology Director', 'Finance Director', 'Human Resources Director', 'Safety Director', 'Sustainability Director', 'Yield Management Specialist', 'Network Planning Analyst', 'Fleet Manager', 'Maintenance Director', 'Cabin Services Manager', 'In-flight Entertainment Manager', 'Lounge Manager', 'Ground Services Manager', 'Cargo Operations Manager', 'Charter Sales Manager', 'Group Travel Coordinator', 'Corporate Travel Manager', 'Leisure Travel Manager', 'Adventure Travel Specialist', 'Luxury Travel Advisor', 'Destination Specialist', 'Visa Processing Agent', 'Travel Insurance Specialist', 'Loyalty Program Manager'],
    ['Travel Operations', 'Hotel Operations', 'Tour Operations', 'Revenue Management', 'Customer Experience', 'Safety Management'],
    ['Sabre', 'Amadeus', 'Travelport', 'Expedia', 'Booking.com', 'Airbnb'],
    ['Occupancy Rate', 'Revenue per Available Room', 'Customer Satisfaction', 'Load Factor', 'Average Daily Rate', 'Net Promoter Score']
  ),
  'energy-utilities': createIndustryDepartment(
    'energy-utilities',
    'Energy & Utilities',
    '#F59E0B',
    Zap,
    ['Chief Energy Officer', 'VP Generation', 'VP Transmission', 'VP Distribution', 'VP Renewable Energy', 'VP Regulatory Affairs', 'Generation Director', 'Transmission Director', 'Distribution Director', 'Renewable Energy Director'],
    ['Power Plant Operator', 'Grid Operator', 'Dispatch Operator', 'Maintenance Technician', 'Electrical Engineer', 'Mechanical Engineer', 'Civil Engineer', 'Chemical Engineer', 'Environmental Engineer', 'Safety Inspector', 'Compliance Officer', 'Regulatory Analyst', 'Policy Analyst', 'Renewable Energy Specialist', 'Solar Engineer', 'Wind Engineer', 'Hydroelectric Specialist', 'Battery Storage Specialist', 'Smart Grid Engineer', 'SCADA Technician', 'Meter Technician', 'Lineman', 'Pipeline Technician', 'Control Room Operator', 'Energy Trader', 'Risk Manager', 'Asset Manager', 'Project Manager', 'Construction Manager', 'Procurement Specialist', 'Supply Chain Coordinator', 'Financial Analyst', 'Business Analyst', 'Data Scientist', 'IT Specialist', 'Cybersecurity Specialist', 'Communication Specialist', 'Stakeholder Relations Manager', 'Regulatory Affairs Director', 'Operations Director', 'Engineering Director', 'Safety Director', 'Nuclear Engineer', 'Geothermal Specialist', 'Biomass Specialist', 'Wave Energy Specialist', 'Energy Storage Engineer', 'Demand Response Manager', 'Energy Efficiency Specialist', 'Water Treatment Specialist', 'Wastewater Engineer', 'Environmental Compliance Manager', 'Permitting Specialist', 'Land Rights Manager', 'Right-of-Way Agent', 'Public Affairs Manager', 'Government Relations Specialist', 'Community Outreach Coordinator', 'Workforce Development Manager', 'Training Coordinator', 'Health Physics Technician', 'Radiation Protection Specialist'],
    ['Power Generation', 'Transmission', 'Distribution', 'Renewable Energy', 'Regulatory Compliance', 'Grid Operations'],
    ['OSIsoft', 'GE Grid Solutions', 'Siemens Energy', 'Schneider Electric', 'ABB', 'Eaton'],
    ['SAIDI', 'SAIFI', 'Load Forecast Accuracy', 'Outage Restoration Time', 'Carbon Intensity', 'Field SLA']
  ),
  'executive-strategy': createIndustryDepartment(
    'executive-strategy',
    'Executive & Strategy',
    '#1F2937',
    Crown,
    ['Chief Executive Officer', 'Chief Strategy Officer', 'Chief Operating Officer', 'VP Corporate Strategy', 'VP Executive Operations', 'VP Corporate Development', 'VP Mergers & Acquisitions', 'VP Investor Relations', 'VP Board Relations', 'VP Risk Management'],
    ['OKR Alignment Agent', 'Board Pack Builder', 'Executive Briefing Writer', 'Competitive Strategy Analyst', 'Strategic Initiative Tracker', 'Scenario Planning Analyst', 'M&A Screen Assistant', 'Leadership Cadence Coordinator', 'Investor Narrative Drafter', 'Decision Log Curator', 'Risk Register Summarizer', 'Cross-functional Escalation Router', 'Market Signals Monitor', 'Transformation Roadmap Agent', 'Executive Follow-up Tracker', 'Strategic Planning Analyst', 'Market Intelligence Analyst', 'Financial Modeling Specialist', 'Valuation Analyst', 'M&A Analyst', 'Due Diligence Specialist', 'Integration Manager', 'Portfolio Manager', 'Investment Analyst', 'Capital Allocation Specialist', 'Performance Management Analyst', 'KPI Tracker', 'Dashboard Designer', 'Board Meeting Coordinator', 'Corporate Governance Specialist', 'Compliance Officer', 'Risk Analyst', 'Crisis Management Specialist', 'Communications Strategist', 'Media Relations Specialist', 'Investment Relations Specialist', 'Earnings Analyst', 'Shareholder Services Coordinator', 'Executive Assistant', 'Strategic Initiative Manager', 'Transformation Consultant', 'Change Management Specialist', 'Business Architect', 'Process Excellence Specialist', 'Corporate Development Analyst', 'Strategic Planning Manager', 'Market Research Analyst', 'Competitive Intelligence Analyst', 'Industry Analyst', 'Economic Analyst', 'Geopolitical Analyst', 'Trend Analyst', 'Innovation Strategist', 'Digital Transformation Specialist', 'Business Model Designer', 'Growth Strategist', 'M&A Integration Specialist', 'Divestiture Specialist', 'Joint Venture Manager', 'Partnership Development Manager', 'Strategic Alliance Manager', 'Ecosystem Strategist', 'Platform Strategy Manager', 'Corporate Ventures Manager'],
    ['Corporate Strategy', 'Executive Operations', 'Board Reporting', 'OKR Alignment', 'Scenario Planning', 'Strategic Initiatives'],
    ['Microsoft 365', 'Google Workspace', 'Notion', 'Airtable', 'Power BI', 'Slack'],
    ['Strategy Milestone Completion', 'OKR Attainment', 'Board Readiness', 'Decision Cycle Time', 'Initiative Health', 'Executive Follow-through']
  ),
  'event-management': createIndustryDepartment(
    'event-management',
    'Event Management',
    '#F97316',
    Calendar,
    ['Chief Events Officer', 'VP Event Strategy', 'VP Production', 'VP Sales', 'VP Marketing', 'Event Operations Director', 'Sponsorship Director', 'Venue Director', 'Production Director', 'Creative Director'],
    ['Venue Shortlist Agent', 'Run-of-show Builder', 'Vendor Coordinator', 'Budget Tracker', 'Registration Flow Agent', 'Speaker Liaison', 'Sponsor Benefits Tracker', 'Ticketing Analyst', 'Attendee Journey Planner', 'Onsite Staffing Planner', 'Risk & Safety Checklist Agent', 'Post-event Survey Analyst', 'Content Capture Planner', 'Travel Block Coordinator', 'Event ROI Reporter', 'Event Manager', 'Assistant Event Manager', 'Event Coordinator', 'Production Manager', 'Technical Director', 'Audio Engineer', 'Lighting Designer', 'Stage Manager', 'Rigging Specialist', 'Video Engineer', 'Camera Operator', 'Streaming Specialist', 'Vendor Manager', 'Venue Coordinator', 'Catering Manager', 'Transportation Coordinator', 'Housing Coordinator', 'Registration Manager', 'Check-in Staff', 'Usher', 'Security Supervisor', 'Security Officer', 'Medical Staff', 'Crowd Manager', 'Traffic Coordinator', 'Parking Manager', 'Janitorial Staff', 'Setup Crew', 'Teardown Crew', 'Warehouse Manager', 'Inventory Manager', 'Equipment Technician', 'Graphic Designer', 'Web Developer', 'Email Marketing Specialist', 'Social Media Manager', 'Content Creator', 'Copywriter', 'Photographer', 'Videographer', 'Technology Director', 'Finance Director', 'Human Resources Director', 'Client Services Director', 'Logistics Director', 'Sponsorship Sales Manager', 'Event Sales Manager', 'Account Manager', 'Business Development Manager', 'Marketing Director', 'Public Relations Manager', 'Brand Manager', 'Digital Marketing Manager', 'Experience Designer', 'Creative Producer', 'Show Director', 'Floor Manager', 'Room Manager', 'Attendee Experience Manager', 'Volunteer Coordinator', 'Sustainability Coordinator', 'Accessibility Coordinator', 'Permitting Specialist', 'Insurance Specialist'],
    ['Event Planning', 'Vendor Coordination', 'Budget Control', 'Sponsorship Management', 'Attendee Operations', 'Risk Planning'],
    ['Cvent', 'Eventbrite', 'Hopin', 'Airtable', 'Asana', 'Stripe'],
    ['Attendance Rate', 'Event ROI', 'Sponsor Satisfaction', 'Budget Variance', 'Registration Conversion', 'NPS']
  ),
  'agriculture': createIndustryDepartment(
    'agriculture',
    'Agriculture',
    '#65A30D',
    Sprout,
    ['Chief Agriculture Officer', 'VP Farming Operations', 'VP Processing', 'VP Supply Chain', 'VP Research & Development', 'VP Sustainability', 'Farming Operations Director', 'Processing Director', 'Supply Chain Director', 'Research Director'],
    ['Crop Specialist', 'Soil Scientist', 'Irrigation Specialist', 'Pest Management Specialist', 'Harvest Coordinator', 'Farm Equipment Operator', 'Maintenance Technician', 'Quality Control Inspector', 'Processing Technician', 'Packaging Specialist', 'Warehouse Manager', 'Logistics Coordinator', 'Procurement Specialist', 'Buyer', 'Commodities Trader', 'Risk Manager', 'Compliance Officer', 'Environmental Specialist', 'Sustainability Coordinator', 'Research Scientist', 'Lab Technician', 'Data Analyst', 'Agronomist', 'Horticulturist', 'Livestock Manager', 'Veterinary Technician', 'Breeding Specialist', 'Nutritionist', 'Farm Manager', 'Assistant Farm Manager', 'Field Supervisor', 'Equipment Manager', 'Safety Inspector', 'HR Manager', 'Finance Manager', 'IT Specialist', 'Sales Representative', 'Customer Service Representative', 'Marketing Specialist', 'Sustainability Director', 'Quality Director', 'Safety Director', 'Precision Agriculture Specialist', 'Drone Operator', 'Remote Sensing Analyst', 'Hydrologist', 'Meteorologist', 'Geneticist', 'Plant Pathologist', 'Entomologist', 'Microbiologist', 'Food Safety Specialist', 'Organic Certification Specialist', 'Regulatory Affairs Manager', 'Water Resources Manager', 'Conservation Specialist', 'Soil Conservationist', 'Waste Management Specialist', 'Bioenergy Specialist', 'Agroforestry Specialist', 'Aquaculture Specialist', 'Greenhouse Manager', 'Nursery Manager', 'Seed Specialist', 'Fertilizer Specialist', 'Crop Protection Specialist', 'Agricultural Engineer', 'Irrigation Engineer', 'Mechanical Engineer', 'Automation Specialist', 'Technology Integration Manager'],
    ['Crop Management', 'Livestock Management', 'Processing', 'Supply Chain', 'Research & Development', 'Sustainability'],
    ['John Deere Operations Center', 'Climate FieldView', 'Trimble Ag', 'AGCO', 'CNH Industrial', 'Granular'],
    ['Yield per Acre', 'Input Cost per Acre', 'Water Use Efficiency', 'Crop Loss Rate', 'Harvest Timeliness', 'Traceability Coverage']
  ),
  'fashion-luxury': createIndustryDepartment(
    'fashion-luxury',
    'Fashion & Luxury',
    '#C026D3',
    Bag,
    ['Chief Brand & Luxury Officer', 'VP Fashion Merchandising', 'VP Luxury Clienteling', 'VP Design', 'VP Retail', 'VP E-commerce', 'Design Operations Director', 'Collection Planning Director', 'Luxury Experience Director', 'Merchandising Director', 'Retail Director', 'E-commerce Director'],
    ['Trend Forecaster', 'Collection Assortment Planner', 'Runway Calendar Coordinator', 'VIP Clienteling Specialist', 'Personal Styling Advisor', 'Boutique Inventory Analyst', 'Luxury Pricing Analyst', 'Brand Partnership Coordinator', 'Visual Merchandising Auditor', 'Sustainable Materials Researcher', 'Product Drop Planner', 'Returns Quality Reviewer', 'Influencer Seeding Coordinator', 'Lookbook Content Planner', 'Wholesale Account Analyst', 'Counterfeit Risk Monitor', 'Size Curve Analyst', 'Seasonal Demand Forecaster', 'Fashion Designer', 'Textile Designer', 'Accessory Designer', 'Pattern Maker', 'Sample Maker', 'Fit Technician', 'Quality Control Inspector', 'Production Coordinator', 'Sourcing Specialist', 'Material Buyer', 'Trim Buyer', 'Production Manager', 'Factory Liaison', 'Boutique Manager', 'Assistant Store Manager', 'Sales Associate', 'Visual Merchandiser', 'Stock Room Supervisor', 'Client Advisor', 'Personal Shopper', 'Stylist', 'Makeup Artist', 'Photographer', 'Model Booker', 'Showroom Manager', 'PR Specialist', 'Social Media Manager', 'Content Creator', 'Copywriter', 'Graphic Designer', 'Email Marketing Specialist', 'CRM Manager', 'Customer Service Representative', 'Inventory Planner', 'Allocator', 'Distribution Coordinator', 'Marketing Director', 'Supply Chain Director', 'Finance Director', 'Human Resources Director', 'Creative Director', 'Art Director', 'Design Director', 'Merchandising Analyst', 'Retail Analyst', 'E-commerce Analyst', 'Digital Marketing Manager', 'Brand Manager', 'Social Media Director', 'Influencer Marketing Manager', 'Public Relations Director', 'Events Director', 'Fashion Show Producer', 'Digital Content Creator', 'Video Producer', 'Art Director', 'Copy Chief', 'Brand Strategist'],
    ['Collection Planning', 'Luxury Clienteling', 'Merchandising Analytics', 'Trend Forecasting', 'Brand Management', 'Inventory Optimization'],
    ['Shopify Plus', 'Farfetch', 'NetSuite', 'Klaviyo', 'Salesforce Commerce Cloud', 'Adobe Commerce'],
    ['Sell-through Rate', 'Average Order Value', 'Inventory Turnover', 'VIP Retention', 'Return Rate', 'Gross Margin']
  ),
  'restaurants': createIndustryDepartment(
    'restaurants',
    'Restaurants',
    '#EF4444',
    Store,
    ['Chief Restaurant Officer', 'VP Restaurant Operations', 'VP Culinary', 'VP Beverage', 'VP Marketing', 'VP Finance', 'Kitchen Operations Director', 'Front of House Director', 'Beverage Director', 'Marketing Director'],
    ['Menu Engineer', 'Recipe Developer', 'Cost Control Specialist', 'Inventory Manager', 'Purchasing Agent', 'Receiving Clerk', 'Storeroom Clerk', 'Executive Chef', 'Sous Chef', 'Line Cook', 'Prep Cook', 'Dishwasher', 'Pastry Chef', 'Baker', 'Sommelier', 'Bartender', 'Barback', 'Server', 'Server Assistant', 'Host', 'Hostess', 'Restaurant Manager', 'Assistant Manager', 'General Manager', 'Shift Leader', 'Marketing Coordinator', 'Social Media Manager', 'Event Coordinator', 'Catering Manager', 'Private Dining Manager', 'Banquet Manager', 'Quality Assurance Specialist', 'Health Inspector', 'Safety Officer', 'Maintenance Technician', 'Accounting Specialist', 'HR Manager', 'IT Support Specialist', 'Finance Director', 'Human Resources Director', 'Technology Director', 'Design Director', 'Chef de Cuisine', 'Chef de Partie', 'Commis Chef', 'Garde Manger', 'Poissonier', 'Rotisseur', 'Grillardin', 'Friturier', 'Entremetier', 'Boucher', 'Pâtissier', 'Confiseur', 'Boulanger', 'Executive Pastry Chef', 'Pastry Cook', 'Baker Assistant', 'Wine Director', 'Mixologist', 'Head Bartender', 'Bar Supervisor', 'Food Runner', 'Busser', 'Food Expeditor', 'Beverage Expeditor', 'Reservationist', 'Host Manager', 'Floor Manager', 'Guest Relations Manager', 'Loyalty Program Manager', 'Delivery Manager', 'Takeout Specialist', 'Catering Sales Manager', 'Private Events Manager', 'Corporate Sales Manager', 'Wedding Specialist', 'Brand Ambassador', 'Community Manager', 'Influencer Coordinator'],
    ['Culinary Operations', 'Beverage Program', 'Front of House', 'Marketing', 'Finance', 'Quality Assurance'],
    ['Toast', 'OpenTable', 'Square', 'DoorDash', 'Uber Eats', 'Resy'],
    ['Food Cost %', 'Labor Cost %', 'Table Turn Time', 'Guest Satisfaction', 'Average Check', 'Prime Cost']
  ),
});

// ============================================
// AGENT GENERATOR FUNCTIONS
// ============================================

/**
 * Generate a main agent with full capabilities
 */
function generateMainAgent(
  departmentId: string,
  role: string,
  index: number
): AIAgent {
  const config = DEPARTMENT_CONFIGS[departmentId];
  if (!config) {
    throw new Error(`Unknown department: ${departmentId}`);
  }

  const agentId = `${departmentId}-main-${index + 1}`;
  const route = `/ai-agent/${departmentId}/${role.toLowerCase().replace(/\s+/g, '-')}`;

  const baseAgent: AIAgent = {
    id: agentId,
    name: `AI ${role}`,
    title: role,
    description: `AI-powered ${role} with advanced automation, analytics, and decision-making capabilities for ${config.name} operations.`,
    icon: config.icon,
    color: config.color,
    category: departmentId,
    type: 'main_agent',
    route: route,
    capabilities: config.capabilities,
    integrations: config.integrations,
    kpis: config.kpis,
    hierarchy: {
      level: 1,
      parentId: null,
      departmentId: departmentId,
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      consultingDomains: config.capabilities.slice(0, 5),
      expertiseAreas: config.capabilities.slice(0, 3),
      consultationPriority: 'high',
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 10,
      averageResponseTime: 1,
      counselingModes: ['hierarchical', 'peer', 'cross-functional'],
      mentoringCapabilities: {
        canMentorSubagents: true,
        canMentorPeers: true,
        canBeMentoredByMain: false,
        canBeMentoredByPeers: true,
      },
      coordinationLevel: 'organization',
    },
    leadership: {
      directReports: [],
      teamSize: 0,
      decisionAuthority: 'full',
      budgetAuthority: 'shared',
      strategicInput: true,
    },
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: new Date().toISOString(),
      processingPower: 'enterprise',
      version: '3.0',
    },
    roiMetrics: {
      savingsPerMonth: '$15,000',
      tasksAutomatedDaily: 200,
      responseTime: '<1s',
      accuracyRate: '99.9%',
      customerSatisfaction: '98%',
      revenueGenerated: '$50,000',
    },
    options: {
      automationLevel: 'high',
      learningEnabled: true,
      selfImprovementEnabled: true,
      sensoryEnabled: true,
      insightsEnabled: true,
      memoryEnabled: true,
      collaborationEnabled: true,
      securityLevel: 'high',
      complianceLevel: 'strict',
    },
    features: {
      advancedAnalytics: true,
      predictiveCapabilities: true,
      realTimeMonitoring: true,
      automatedDecisionMaking: true,
      multiLanguageSupport: true,
      voiceInterface: true,
      chatInterface: true,
      emailInterface: true,
      apiAccess: true,
      webhookSupport: true,
      customIntegrations: true,
      workflowAutomation: true,
      reporting: true,
      dashboards: true,
      alerts: true,
      notifications: true,
    },
  };

  return enhanceAIAgent(baseAgent);
}

/**
 * Generate a sub-agent with full capabilities
 */
function generateSubAgent(
  departmentId: string,
  role: string,
  index: number,
  parentIndex: number
): AIAgent {
  const config = DEPARTMENT_CONFIGS[departmentId];
  if (!config) {
    throw new Error(`Unknown department: ${departmentId}`);
  }

  const agentId = `${departmentId}-sub-${index + 1}`;
  const parentId = `${departmentId}-main-${parentIndex + 1}`;
  const route = `/ai-agent/${departmentId}/${role.toLowerCase().replace(/\s+/g, '-')}`;

  const baseAgent: AIAgent = {
    id: agentId,
    name: `AI ${role}`,
    title: role,
    description: `Specialized AI ${role} focused on ${role.toLowerCase()} tasks within ${config.name} operations with advanced automation capabilities.`,
    icon: config.icon,
    color: config.color,
    category: departmentId,
    type: 'subagent',
    route: route,
    capabilities: config.capabilities.slice(0, 5),
    integrations: config.integrations.slice(0, 5),
    kpis: config.kpis.slice(0, 5),
    hierarchy: {
      level: 2,
      parentId: parentId,
      departmentId: departmentId,
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      consultingDomains: config.capabilities.slice(0, 3),
      expertiseAreas: config.capabilities.slice(0, 2),
      consultationPriority: 'medium',
      parentAgentId: parentId,
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: false,
      maxConcurrentConsultations: 5,
      averageResponseTime: 2,
      counselingModes: ['peer', 'cross-functional'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true,
      },
      coordinationLevel: 'department',
      canEscalateTo: [parentId],
    },
    leadership: {
      directReports: [],
      teamSize: 0,
      decisionAuthority: 'consultative',
      budgetAuthority: 'delegated',
      strategicInput: false,
    },
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.99%',
      lastActive: new Date().toISOString(),
      processingPower: 'high',
      version: '2.0',
    },
    roiMetrics: {
      savingsPerMonth: '$5,000',
      tasksAutomatedDaily: 100,
      responseTime: '<2s',
      accuracyRate: '98.5%',
    },
    options: {
      automationLevel: 'medium',
      learningEnabled: true,
      selfImprovementEnabled: true,
      sensoryEnabled: true,
      insightsEnabled: true,
      memoryEnabled: true,
      collaborationEnabled: true,
      securityLevel: 'medium',
      complianceLevel: 'standard',
    },
    features: {
      advancedAnalytics: true,
      predictiveCapabilities: true,
      realTimeMonitoring: true,
      automatedDecisionMaking: false,
      multiLanguageSupport: false,
      voiceInterface: false,
      chatInterface: true,
      emailInterface: true,
      apiAccess: true,
      webhookSupport: true,
      customIntegrations: false,
      workflowAutomation: true,
      reporting: true,
      dashboards: true,
      alerts: true,
      notifications: true,
    },
  };

  return enhanceAIAgent(baseAgent);
}

/**
 * Generate all main agents for a department
 */
export function generateDepartmentMainAgents(departmentId: string): AIAgent[] {
  const config = DEPARTMENT_CONFIGS[departmentId];
  if (!config) {
    throw new Error(`Unknown department: ${departmentId}`);
  }

  return config.mainAgentRoles.map((role, index) =>
    generateMainAgent(departmentId, role, index)
  );
}

/**
 * Generate all sub-agents for a department
 */
export function generateDepartmentSubAgents(departmentId: string): AIAgent[] {
  const config = DEPARTMENT_CONFIGS[departmentId];
  if (!config) {
    throw new Error(`Unknown department: ${departmentId}`);
  }

  const subAgents: AIAgent[] = [];
  const subAgentsPerMain = Math.ceil(config.subAgentCount / config.mainAgentCount);

  config.subAgentRoles.forEach((role, index) => {
    const parentIndex = Math.floor(index / subAgentsPerMain);
    const subAgent = generateSubAgent(departmentId, role, index, parentIndex);
    subAgents.push(subAgent);
  });

  return subAgents;
}

/**
 * Generate all agents for all departments
 */
export function generateAllAgents(): {
  mainAgents: Record<string, AIAgent[]>;
  subAgents: Record<string, AIAgent[]>;
  allMainAgents: AIAgent[];
  allSubAgents: AIAgent[];
  allAgents: AIAgent[];
} {
  const mainAgents: Record<string, AIAgent[]> = {};
  const subAgents: Record<string, AIAgent[]> = {};
  const allMainAgents: AIAgent[] = [];
  const allSubAgents: AIAgent[] = [];

  Object.keys(DEPARTMENT_CONFIGS).forEach(departmentId => {
    const deptMainAgents = generateDepartmentMainAgents(departmentId);
    const deptSubAgents = generateDepartmentSubAgents(departmentId);

    mainAgents[departmentId] = deptMainAgents;
    subAgents[departmentId] = deptSubAgents;

    allMainAgents.push(...deptMainAgents);
    allSubAgents.push(...deptSubAgents);
  });

  return {
    mainAgents,
    subAgents,
    allMainAgents,
    allSubAgents,
    allAgents: [...allMainAgents, ...allSubAgents],
  };
}

/**
 * Get department configuration
 */
export function getDepartmentConfig(departmentId: string): DepartmentConfig | undefined {
  return DEPARTMENT_CONFIGS[departmentId];
}

/**
 * Get all department configurations
 */
export function getAllDepartmentConfigs(): Record<string, DepartmentConfig> {
  return DEPARTMENT_CONFIGS;
}

// ============================================
// STATISTICS
// ============================================

export const AGENT_GENERATION_STATS = {
  totalDepartments: Object.keys(DEPARTMENT_CONFIGS).length,
  totalMainAgents: Object.values(DEPARTMENT_CONFIGS).reduce((sum, config) => sum + config.mainAgentCount, 0),
  totalSubAgents: Object.values(DEPARTMENT_CONFIGS).reduce((sum, config) => sum + config.subAgentCount, 0),
  totalAgents: Object.values(DEPARTMENT_CONFIGS).reduce((sum, config) => sum + config.mainAgentCount + config.subAgentCount, 0),
};

console.log('[Agent Generator] Statistics:', AGENT_GENERATION_STATS);
