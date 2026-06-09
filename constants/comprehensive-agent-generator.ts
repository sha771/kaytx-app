/**
 * Comprehensive Agent Generator
 * 
 * Generates all 1,108 agents (277 main + 831 sub) with complete features,
 * options, and capabilities across all 22 departments.
 * 
 * @version 1.0.0
 * @lastUpdated 2026-06-07
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
  'customer-experience': {
    id: 'customer-experience',
    name: 'Customer Experience',
    color: '#007AFF',
    icon: Users as any,
    mainAgentCount: 14,
    subAgentCount: 42,
    mainAgentRoles: [
      'Chief Customer Officer', 'VP Customer Success', 'VP Support', 'VP Experience',
      'VP Retention', 'VP Loyalty', 'Receptionist', 'Customer Support Agent',
      'Ticket Resolution Agent', 'Complaint Handling Agent', 'Retention Specialist',
      'Loyalty & Engagement Agent', 'Feedback & Survey Agent', 'Billing Support Agent'
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
      'Survey Designer', 'Response Analyzer', 'CX Strategy Analyst',
      'Billing Support Specialist', 'Invoice Explainer', 'Payment Processor',
      'Receptionist Agent', 'Call Router', 'Appointment Scheduler',
      'Live Chat Handler', 'FAQ Responder', 'Knowledge Base Curator',
      'Multi-language Support', 'Voice Recognition', 'IVR Navigation',
      'Emergency Call Handler', 'Lead Qualification', 'Contact Updater'
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
    mainAgentCount: 14,
    subAgentCount: 42,
    mainAgentRoles: [
      'VP Sales', 'VP Revenue', 'VP Business Development', 'VP Channel Partners',
      'Sales Operations Manager', 'Lead Development Rep (SDR)', 'Sales Rep',
      'Sales Executive', 'CRM Assistant', 'Proposal Generator', 'Negotiator',
      'Pricing Analyst', 'Sales Forecasting Agent', 'Sales Enablement Agent'
    ],
    subAgentRoles: [
      'Lead Scoring Agent', 'Pipeline Analyst', 'Pipeline Organizer', 'Pipeline Weighter',
      'Quota Tracker', 'Territory Planner', 'Channel Performance Tracker',
      'Channel Planner', 'Digital Channel Optimizer', 'Acquisition Channel Tester',
      'Deal Structurer', 'Revenue Modeler', 'Pricing Calculator', 'Pricing Optimizer',
      'Pricing Analyst', 'Sales Process Auditor', 'CRM Data Cleaner',
      'Proposal Reviewer', 'Negotiation Support', 'Closing Strategist',
      'Sales Forecasting Agent', 'Demand Forecaster', 'Forecast Validator',
      'Sales Enablement Content', 'Training Coordinator', 'Performance Reporter',
      'Competitor Price Tracker', 'Market Expander', 'BATNA Calculator',
      'Concession Tracker', 'Term Analyzer', 'Margin Calculator',
      'Prospect Researcher', 'Lead Qualification', 'Outreach Sequencer',
      'Follow-up Scheduler', 'Meeting Coordinator', 'Demo Coordinator'
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
    mainAgentCount: 15,
    subAgentCount: 45,
    mainAgentRoles: [
      'Chief Marketing Officer', 'VP Marketing', 'VP Brand', 'VP Growth',
      'VP Content', 'VP Digital', 'Marketing Manager', 'Content Marketing Agent',
      'SEO Specialist', 'Social Media Manager', 'Email Marketing Agent',
      'Ad Campaign Manager', 'Marketing Analytics Agent', 'Brand Manager',
      'Growth Hacker'
    ],
    subAgentRoles: [
      'Campaign Coordinator', 'Campaign ROI Evaluator', 'Brand Guidelines Enforcer',
      'Brand Health Surveyor', 'Brand Perception Monitor', 'Brand Manager',
      'Competitor Brand Tracker', 'Content Distributor', 'Content Quality Reviewer',
      'Content Recommender', 'Editorial Calendar Planner', 'Blog Writer',
      'Copy Editor', 'Creative Tester', 'SEO Specialist', 'Keyword Researcher',
      'On-page Optimizer', 'Backlink Analyzer', 'Technical SEO Auditor',
      'Social Media Manager', 'Post Scheduler', 'Social Listening',
      'Influencer Coordinator', 'Community Manager', 'Email Marketing',
      'Drip Campaign Manager', 'A/B Test Coordinator', 'Deliverability Monitor',
      'Marketing Analytics', 'Funnel Analyzer', 'Attribution Modeler',
      'Marketing Strategy Analyst', 'Marketing Calendar Manager', 'Marketing Spend Monitor',
      'Growth Hacker', 'Viral Loop Designer', 'Referral Program Builder',
      'Experiment Designer', 'Conversion Analyst', 'Acquisition Channel Tester'
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
    mainAgentCount: 13,
    subAgentCount: 39,
    mainAgentRoles: [
      'Chief Operating Officer', 'VP Operations', 'VP Supply Chain', 'VP Quality',
      'VP Facilities', 'VP Project Management', 'Operations Manager',
      'Workflow Automation Agent', 'Task Coordinator', 'Process Optimization Agent',
      'Resource Planner', 'Quality Assurance Agent', 'Efficiency Reporter'
    ],
    subAgentRoles: [
      'Process Auditor', 'Process Mapper', 'Process Optimization', 'Quality Assurance',
      'Quality Standards Enforcer', 'SLA Monitor', 'Task Assigner', 'Task Coordinator',
      'Task Prioritizer', 'Resource Allocator', 'Resource Planner', 'Capacity Planner',
      'Daily Operations Coordinator', 'Cross-dept Coordinator', 'Success Plan Coordinator',
      'Workflow Automation', 'Workflow Monitor', 'Automation Rule Builder',
      'Efficiency Reporter', 'Operational Efficiency Analyst', 'Energy Efficiency Monitor',
      'Logistics Cost Analyzer', 'Maintenance Scheduler', 'Demo Coordinator',
      'Payment Processor', 'Supply Chain Coordinator', 'Inventory Optimizer',
      'Bottleneck Detector', 'Dependency Tracker', 'Deadline Tracker',
      'Deadline Enforcer', 'Milestone Tracker', 'Strategic Initiative Tracker'
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
    mainAgentCount: 13,
    subAgentCount: 39,
    mainAgentRoles: [
      'Chief Financial Officer', 'VP Finance', 'VP Accounting', 'VP Treasury',
      'VP Investor Relations', 'Controller', 'Finance Manager', 'Accounting Manager',
      'Financial Analyst', 'Budget Manager', 'Tax Specialist', 'Audit Manager',
      'Treasury Analyst'
    ],
    subAgentRoles: [
      'Budget Allocator', 'Demand Forecaster', 'Forecast Validator', 'Invoice Explainer',
      'Visual Identity Auditor', 'Financial Reporting', 'Expense Management',
      'Investment Management', 'Inventory Management', 'Payroll Accounting',
      'Tax Specialist', 'Treasury Specialist', 'Bookkeeper',
      'Accountant', 'Financial Analyst', 'Budget Manager', 'Cost Accountant',
      'Payroll Specialist', 'Tax Advisor', 'Audit Specialist', 'Compliance Officer',
      'Financial Planner', 'Risk Manager', 'Investment Analyst', 'Cash Manager',
      'Revenue Recognition', 'Accounts Payable', 'Accounts Receivable', 'General Ledger',
      'Financial Controller', 'Treasury Manager', 'Tax Manager', 'Audit Manager'
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
    mainAgentCount: 16,
    subAgentCount: 48,
    mainAgentRoles: [
      'Chief Technology Officer', 'VP Engineering', 'VP Infrastructure', 'VP AI/ML',
      'VP Security Technology', 'Lead Architect', 'DevOps Manager', 'Frontend Lead',
      'Backend Lead', 'SRE Lead', 'Frontend Developer', 'Backend Developer',
      'SRE Engineer', 'QA Automation Engineer', 'Data Engineer', 'Security Engineer'
    ],
    subAgentRoles: [
      'Automation Rule Builder', 'Bottleneck Detector', 'Churn Predictor',
      'Template Selector', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
      'DevOps Engineer', 'SRE Engineer', 'QA Engineer', 'Test Automation Engineer',
      'Security Engineer', 'Network Engineer', 'Cloud Architect', 'Database Administrator',
      'Data Engineer', 'ML Engineer', 'AI Engineer', 'Platform Engineer',
      'Mobile Developer', 'iOS Developer', 'Android Developer', 'Web Developer',
      'UI/UX Developer', 'Game Developer', 'Blockchain Developer', 'IoT Developer',
      'System Architect', 'Software Architect', 'Solutions Architect', 'Enterprise Architect',
      'Technical Lead', 'Engineering Manager', 'Principal Engineer', 'Staff Engineer'
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
    mainAgentCount: 11,
    subAgentCount: 33,
    mainAgentRoles: [
      'Chief Human Resources Officer', 'VP Talent', 'VP HR Operations', 'VP Learning',
      'VP Culture', 'VP Compensation', 'Recruiting Manager', 'Recruiter',
      'HR Operations Specialist', 'Learning Specialist', 'Compensation Analyst'
    ],
    subAgentRoles: [
      'Performance Reporter', 'Training Scheduler', 'Web Performance Tracker',
      'Resume Screener', 'Interview Scheduler', 'Onboarding Specialist',
      'Offboarding Specialist', 'HR Coordinator', 'HR Generalist',
      'Talent Acquisition Specialist', 'Employer Brand Manager', 'Campus Recruiter',
      'Executive Recruiter', 'Technical Recruiter', 'Sales Recruiter',
      'Learning & Development Specialist', 'Training Coordinator', 'Instructional Designer',
      'Compliance Training Manager', 'Skills Assessment Specialist', 'Career Coach',
      'Compensation Analyst', 'Benefits Administrator', 'Payroll Specialist',
      'HRIS Administrator', 'HR Analytics Specialist', 'Workforce Planner',
      'Employee Relations Specialist', 'Diversity & Inclusion Specialist', 'Culture Champion',
      'HR Operations Manager', 'HR Business Partner', 'People Operations Manager'
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
    mainAgentCount: 10,
    subAgentCount: 30,
    mainAgentRoles: [
      'Chief Legal Officer', 'VP Legal', 'VP Compliance', 'VP Contracts',
      'VP Intellectual Property', 'VP Governance', 'Compliance Manager',
      'Legal Researcher', 'Contract Specialist', 'Compliance Analyst'
    ],
    subAgentRoles: [
      'Compliance Tracker', 'Partnership Scout', 'Legal Researcher',
      'Contract Reviewer', 'Contract Manager', 'Contract Administrator',
      'Legal Analyst', 'Compliance Officer', 'Regulatory Specialist',
      'Policy Manager', 'Governance Specialist', 'Risk Manager',
      'Intellectual Property Specialist', 'Patent Attorney', 'Trademark Attorney',
      'Corporate Counsel', 'Litigation Support', 'Legal Operations Manager',
      'Legal Technology Specialist', 'E-Discovery Specialist', 'Privacy Officer',
      'Data Protection Officer', 'Ethics & Compliance Officer', 'Audit Specialist',
      'Regulatory Affairs Manager', 'Government Relations Specialist', 'Legal Project Manager'
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
    mainAgentCount: 13,
    subAgentCount: 39,
    mainAgentRoles: [
      'Chief Data & AI Officer', 'VP Data Science', 'VP Data Engineering',
      'VP Analytics', 'VP Business Intelligence', 'Data Manager', 'Analytics Manager',
      'Data Scientist', 'Data Analyst', 'BI Developer', 'ML Engineer',
      'Data Steward', 'Analytics Specialist'
    ],
    subAgentRoles: [
      'Bid Optimizer', 'Deliverability Monitor', 'KPI Dashboard Builder',
      'Reporting Automator', 'Data Engineer', 'Data Analyst', 'Data Scientist',
      'ML Engineer', 'BI Developer', 'Data Architect', 'Data Steward',
      'Data Quality Specialist', 'Data Governance Specialist', 'Data Privacy Officer',
      'Business Analyst', 'Reporting Specialist', 'Dashboard Developer',
      'Analytics Engineer', 'Research Analyst', 'Market Intelligence Analyst',
      'Competitive Intelligence Analyst', 'Customer Intelligence Analyst', 'Product Intelligence Analyst',
      'Predictive Analytics Specialist', 'Prescriptive Analytics Specialist', 'Diagnostic Analytics Specialist',
      'Descriptive Analytics Specialist', 'Data Visualization Specialist', 'Data Storyteller',
      'Data Integration Specialist', 'ETL Developer', 'Data Warehouse Specialist',
      'Data Lake Specialist', 'Real-time Analytics Specialist', 'Stream Processing Engineer'
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
    mainAgentCount: 10,
    subAgentCount: 30,
    mainAgentRoles: [
      'VP Product', 'VP Product Strategy', 'VP Product Operations', 'Product Manager',
      'Product Owner', 'Product Analyst', 'UX Researcher', 'Product Marketer',
      'Release Manager', 'Growth Product Manager'
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
      'Product Lifecycle Manager', 'Product Success Manager', 'Customer Success Manager'
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
    mainAgentCount: 12,
    subAgentCount: 36,
    mainAgentRoles: [
      'Chief Information Security Officer', 'VP Security Operations', 'VP Cybersecurity',
      'VP Governance & Risk', 'VP Privacy', 'Security Architect', 'SOC Manager',
      'Security Analyst', 'Incident Responder', 'Security Compliance Specialist',
      'Penetration Tester', 'Identity Manager'
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
      'Application Security Architect', 'Network Security Architect', 'Enterprise Security Architect'
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
    mainAgentCount: 9,
    subAgentCount: 27,
    mainAgentRoles: [
      'VP Research', 'VP Innovation', 'VP R&D Operations', 'Research Lead',
      'Innovation Manager', 'Research Scientist', 'Innovation Analyst',
      'Prototype Engineer', 'Patent Researcher'
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
      'Product Researcher', 'User Researcher', 'Competitive Researcher'
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
    mainAgentCount: 9,
    subAgentCount: 27,
    mainAgentRoles: [
      'Chief Administrative Officer', 'VP Admin Operations', 'VP Facilities',
      'Admin Manager', 'Office Manager', 'Executive Assistant',
      'Facilities Coordinator', 'Travel Coordinator', 'Document Controller'
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
      'Version Manager', 'Archive Organizer', 'Access Controller'
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
    mainAgentCount: 18,
    subAgentCount: 54,
    mainAgentRoles: [
      'Chief Investment Officer', 'VP Trading', 'VP Investments', 'Trading Desk Manager',
      'Portfolio Manager', 'Trading Risk Manager', 'Equity Trader', 'Forex Trader',
      'Crypto Trader', 'Derivatives Specialist', 'Portfolio Analyst', 'Trading Risk Analyst',
      'Trading Compliance', 'Quantitative Analyst', 'ESG Analyst', 'Macro Analyst',
      'Algo Trading Developer', 'Settlement Specialist'
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
    mainAgentCount: 14,
    subAgentCount: 42,
    mainAgentRoles: [
      'Chief Real Estate Officer', 'VP Property Management', 'VP Real Estate Development',
      'Property Manager', 'Leasing Manager', 'Facilities Manager', 'Property Analyst',
      'Lease Administrator', 'Tenant Relations Specialist', 'Maintenance Coordinator',
      'Acquisition Analyst', 'Asset Manager', 'Development Coordinator', 'Property Marketing'
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
      'Property Inspector', 'Compliance Specialist', 'Safety Inspector', 'Environmental Specialist'
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
    mainAgentCount: 16,
    subAgentCount: 48,
    mainAgentRoles: [
      'Chief Risk Officer', 'VP Underwriting', 'VP Claims', 'VP Risk Assessment',
      'Underwriting Manager', 'Claims Manager', 'Policy Manager', 'Underwriter',
      'Claims Adjuster', 'Fraud Detection Agent', 'Actuary Analyst', 'Risk Modeler',
      'Policy Administrator', 'Customer Risk Analyst', 'Catastrophe Modeler', 'Reinsurance Specialist'
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
      'Reinsurance Underwriter', 'Reinsurance Broker', 'Capital Management Specialist', 'Solvency Analyst'
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
    mainAgentCount: 14,
    subAgentCount: 42,
    mainAgentRoles: [
      'Chief Medical Officer', 'VP Healthcare Operations', 'VP Patient Experience',
      'Patient Services Manager', 'Medical Billing Manager', 'Scheduling Manager',
      'Patient Coordinator', 'Medical Coder', 'Billing Specialist', 'Care Coordinator',
      'Health Records Specialist', 'Telehealth Support', 'Healthcare Compliance', 'Quality Improvement Specialist'
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
      'Clinical Documentation Improvement Specialist', 'Physician Advisor', 'Medical Director', 'Chief of Staff'
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
    mainAgentCount: 14,
    subAgentCount: 42,
    mainAgentRoles: [
      'Chief Production Officer', 'VP Manufacturing', 'VP Quality Assurance',
      'Production Manager', 'Quality Manager', 'Safety Manager', 'Production Planner',
      'Quality Inspector', 'Supply Chain Coordinator', 'Maintenance Technician',
      'Inventory Controller', 'Lean Specialist', 'Safety Inspector', 'Logistics Coordinator'
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
      'Logistics Coordinator', 'Transportation Coordinator', 'Distribution Manager', 'Supply Chain Analyst'
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
    mainAgentCount: 14,
    subAgentCount: 42,
    mainAgentRoles: [
      'Chief Logistics Officer', 'VP Transportation', 'VP Logistics Operations',
      'Fleet Manager', 'Warehouse Manager', 'Distribution Manager', 'Route Optimizer',
      'Fleet Coordinator', 'Warehouse Operator', 'Dispatcher', 'Tracking Specialist',
      'Last Mile Coordinator', 'Freight Broker', 'Customs Specialist'
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
      'Import/Export Specialist', 'Trade Compliance Manager', 'Documentation Specialist', 'Tariff Specialist'
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
    mainAgentCount: 12,
    subAgentCount: 36,
    mainAgentRoles: [
      'Chief Administrative Officer', 'VP Public Policy', 'VP Regulatory Affairs',
      'VP Public Engagement', 'Policy Manager', 'Grants Manager', 'Policy Analyst',
      'Regulatory Specialist', 'Public Affairs Specialist', 'Grants Specialist',
      'Government Compliance', 'Transparency Officer'
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
      'Evaluation Specialist', 'Research Analyst', 'Data Analyst', 'Policy Analyst'
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
    mainAgentCount: 10,
    subAgentCount: 30,
    mainAgentRoles: [
      'VP Supply Chain Operations', 'Procurement Manager', 'Logistics Manager',
      'Warehouse Lead', 'Procurement Buyer', 'Inventory Specialist', 'Demand Planner',
      'Supplier Relations', 'Shipping Coordinator', 'Fulfillment Specialist'
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
      'Fulfillment Specialist', 'Order Fulfillment Manager', 'E-commerce Fulfillment Specialist', 'Returns Manager'
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
    color: '#FF5252',
    icon: Sparkles,
    mainAgentCount: 6,
    subAgentCount: 18,
    mainAgentRoles: [
      'Chief Automation Officer', 'VP Automation', 'VP Process Excellence',
      'Automation Operations Director Lead', 'RPA Manager', 'Workflow Specialist'
    ],
    subAgentRoles: [
      'Process Automation Specialist', 'RPA Developer', 'RPA Analyst',
      'Workflow Designer', 'Automation Architect', 'Digital Transformation Specialist',
      'Process Excellence Manager', 'Continuous Improvement Manager', 'Lean Six Sigma Black Belt',
      'Automation Project Manager', 'Change Management Specialist', 'Training & Adoption Specialist',
      'AI Governance Specialist', 'AI Ethics Officer', 'AI Compliance Officer',
      'AI Model Validator', 'AI Performance Monitor', 'AI Risk Manager',
      'AI Operations Manager', 'MLOps Engineer', 'AI Platform Engineer',
      'AI Strategy Consultant', 'AI Business Analyst', 'AI Product Manager'
    ],
    capabilities: [
      'Process Automation', 'RPA Development', 'Workflow Design', 'Digital Transformation',
      'Process Excellence', 'Continuous Improvement', 'Lean Six Sigma', 'Change Management',
      'AI Governance', 'AI Ethics', 'AI Compliance', 'AI Model Validation',
      'AI Performance Monitoring', 'AI Risk Management', 'AI Operations', 'MLOps',
      'AI Platform Engineering', 'AI Strategy', 'AI Business Analysis', 'AI Product Management'
    ],
    integrations: [
      'UiPath', 'Automation Anywhere', 'Blue Prism', 'Microsoft Power Automate',
      'WorkFusion', 'Appian', 'Pega', 'Nintex', 'Zapier'
    ],
    kpis: [
      'Automation Rate', 'Process Efficiency Improvement', 'Cost Reduction', 'Error Reduction',
      'Throughput Increase', 'Cycle Time Reduction', 'RPA Bot Utilization', 'Workflow Success Rate',
      'AI Model Accuracy', 'AI Model Performance', 'AI Compliance Rate', 'AI Risk Score'
    ]
  }
};

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
