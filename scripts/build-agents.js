/**
 * COMPREHENSIVE AGENT DATA GENERATOR
 * Generates fully-defined AI agents for all 1108 + 27 cross-dept = 1135
 * Outputs: completeAIWorkforce_1108.ts + all page files
 */
const fs = require('fs');
const path = require('path');

// ============================================================
// DEPARTMENT KNOWLEDGE BASE - Rich capabilities per department
// ============================================================
const deptKnowledge = {
  1: {
    name: 'Customer Experience', slug: 'customer-experience', color: '#00BCD4',
    capabilities: {
      c_level: ['CX Vision & Strategy','Customer Lifetime Value Optimization','Voice of Customer Analytics','Cross-functional CX Alignment','Executive CX Reporting','Customer Journey Architecture','Loyalty Ecosystem Design','NPS/CSAT Strategic Planning'],
      vp_director: ['Department Strategy Execution','Team Leadership & Mentoring','KPI Dashboard Management','Process Improvement Programs','Customer Success Playbooks','Support Operations Scaling','Retention Campaign Design','Experience Optimization'],
      manager: ['Team Operations Management','SLA Compliance Monitoring','Agent Quality Coaching','Ticket Flow Optimization','Customer Feedback Analysis','Escalation Protocol Design','Workforce Planning','Performance Reporting'],
      team_lead: ['Daily Team Coordination','Real-time Queue Management','Agent Performance Tracking','Customer Issue Resolution','Quality Review Sessions','Training Facilitation','Shift Management','First-Contact Resolution'],
      specialist: ['Customer Interaction Handling','Ticket Classification & Routing','Knowledge Base Maintenance','Sentiment Analysis','Survey Design & Analysis','Live Chat Management','FAQ Optimization','Complaint Resolution','Call Handling','Account Health Monitoring'],
    },
    metrics: { tasksPerDay: [800,1200], responseTime: ['0.8s','2.5s'], accuracy: ['94%','99%'], savingsPerMonth: ['$8K','$45K'] },
    humanCost: { c_level: '$280K', vp_director: '$180K', manager: '$110K', team_lead: '$75K', specialist: '$55K' },
    aiCost: { c_level: '$2,400/mo', vp_director: '$1,800/mo', manager: '$1,200/mo', team_lead: '$800/mo', specialist: '$450/mo' },
  },
  2: {
    name: 'Sales & Revenue', slug: 'sales', color: '#FFA000',
    capabilities: {
      c_level: ['Revenue Strategy','Sales Organization Design','Market Expansion Planning','Enterprise Deal Architecture','Sales Compensation Design','Pipeline Governance','Customer Acquisition Strategy','Strategic Partnership Development'],
      vp_director: ['Sales Operations Management','Territory Planning','Quota Setting & Management','Sales Methodology Implementation','CRM Strategy','Deal Review & Coaching','Channel Partner Management','Revenue Forecasting'],
      manager: ['Sales Team Leadership','Pipeline Management','Win/Loss Analysis','Sales Enablement Programs','Proposal Quality Assurance','Account Planning','Competitive Intelligence','Sales Training Delivery'],
      team_lead: ['Daily Sales Activity Tracking','Lead Assignment & Routing','Deal Stage Management','Sales Call Coaching','Objection Handling Guidance','Proposal Review','Demo Coordination','Follow-up Automation'],
      specialist: ['Lead Scoring & Qualification','CRM Data Management','Prospect Research','Outreach Sequencing','Price Optimization','Contract Analysis','Competitive Tracking','Sales Reporting','Territory Mapping','Pipeline Analytics'],
    },
    metrics: { tasksPerDay: [600,1000], responseTime: ['1.0s','3.0s'], accuracy: ['92%','98%'], savingsPerMonth: ['$10K','$50K'] },
    humanCost: { c_level: '$320K', vp_director: '$200K', manager: '$130K', team_lead: '$85K', specialist: '$60K' },
    aiCost: { c_level: '$2,600/mo', vp_director: '$2,000/mo', manager: '$1,400/mo', team_lead: '$900/mo', specialist: '$500/mo' },
  },
  3: {
    name: 'Marketing & Growth', slug: 'marketing', color: '#E91E63',
    capabilities: {
      c_level: ['Brand Strategy & Positioning','Growth Architecture','Marketing Budget Optimization','Market Research Leadership','Multi-channel Strategy','Brand Equity Management','Marketing Technology Stack','Customer Acquisition Strategy'],
      vp_director: ['Campaign Strategy','Content Marketing Leadership','Digital Marketing Optimization','SEO/SEM Strategy','Marketing Analytics','Brand Management','Growth Experimentation','Marketing Automation'],
      manager: ['Campaign Execution','Content Calendar Management','Social Media Strategy','Email Marketing Programs','Ad Campaign Optimization','Marketing Operations','Creative Direction','Performance Marketing'],
      team_lead: ['Content Production','Social Media Scheduling','A/B Test Coordination','Copy Review & Editing','Campaign Asset Management','Blog Management','Community Engagement','Newsletter Operations'],
      specialist: ['Keyword Research','Content Writing','SEO Optimization','Social Media Posting','Email Automation','Bid Management','Audience Segmentation','Marketing Reporting','Creative Testing','Brand Monitoring'],
    },
    metrics: { tasksPerDay: [700,1100], responseTime: ['0.9s','2.8s'], accuracy: ['93%','98%'], savingsPerMonth: ['$9K','$48K'] },
    humanCost: { c_level: '$290K', vp_director: '$185K', manager: '$115K', team_lead: '$78K', specialist: '$58K' },
    aiCost: { c_level: '$2,500/mo', vp_director: '$1,900/mo', manager: '$1,300/mo', team_lead: '$850/mo', specialist: '$480/mo' },
  },
  4: {
    name: 'Operations & Management', slug: 'operations', color: '#607D8B',
    capabilities: {
      c_level: ['Operational Excellence Strategy','Supply Chain Architecture','Process Transformation','Enterprise Resource Planning','Quality Management Systems','Operational Risk Management','Cross-functional Optimization','Strategic Initiative Leadership'],
      vp_director: ['Operations Planning','Process Engineering','Capacity Management','Vendor Relations','Quality Assurance Programs','Facilities Management','Project Portfolio Management','Continuous Improvement'],
      manager: ['Daily Operations Coordination','Team Productivity Tracking','Process Audit Management','SLA Monitoring','Resource Allocation','Workflow Automation','Quality Control','Inventory Management'],
      team_lead: ['Task Assignment & Tracking','Shift Coordination','Process Compliance','Bottleneck Detection','Team Performance Reviews','Standard Operating Procedures','Incident Management','Cross-training Programs'],
      specialist: ['Process Documentation','Data Entry & Validation','Report Generation','Task Automation','Maintenance Scheduling','Logistics Coordination','Compliance Checking','Operational Reporting','Waste Identification','Efficiency Tracking'],
    },
    metrics: { tasksPerDay: [900,1400], responseTime: ['0.7s','2.2s'], accuracy: ['95%','99%'], savingsPerMonth: ['$12K','$55K'] },
    humanCost: { c_level: '$270K', vp_director: '$175K', manager: '$105K', team_lead: '$72K', specialist: '$52K' },
    aiCost: { c_level: '$2,300/mo', vp_director: '$1,700/mo', manager: '$1,100/mo', team_lead: '$750/mo', specialist: '$420/mo' },
  },
  5: {
    name: 'Finance & Accounting', slug: 'finance', color: '#2E7D32',
    capabilities: {
      c_level: ['Financial Strategy & Planning','Capital Allocation','Investor Relations','M&A Advisory','Financial Risk Management','Treasury Strategy','Corporate Finance Leadership','Budget Governance'],
      vp_director: ['Financial Planning & Analysis','Accounting Operations','Tax Strategy','Audit Management','Financial Reporting','Cash Flow Management','Compliance Oversight','Cost Optimization'],
      manager: ['Budget Management','Financial Close Process','Accounts Payable/Receivable','Payroll Administration','Financial Analysis','Internal Controls','Tax Compliance','Expense Management'],
      team_lead: ['Daily Bookkeeping Oversight','Invoice Processing','Reconciliation Management','Financial Data Validation','Report Preparation','Audit Trail Maintenance','Transaction Monitoring','Variance Analysis'],
      specialist: ['Invoice Processing','Expense Reporting','Budget Tracking','Financial Data Entry','Tax Preparation','Payroll Calculation','Account Reconciliation','Financial Reporting','Revenue Recognition','Cost Analysis'],
    },
    metrics: { tasksPerDay: [600,900], responseTime: ['1.2s','3.5s'], accuracy: ['97%','99.9%'], savingsPerMonth: ['$15K','$60K'] },
    humanCost: { c_level: '$310K', vp_director: '$195K', manager: '$120K', team_lead: '$80K', specialist: '$58K' },
    aiCost: { c_level: '$2,800/mo', vp_director: '$2,100/mo', manager: '$1,500/mo', team_lead: '$950/mo', specialist: '$520/mo' },
  },
  6: {
    name: 'Technology & Engineering', slug: 'technology', color: '#1565C0',
    capabilities: {
      c_level: ['Technology Strategy & Vision','Architecture Governance','Engineering Culture','Innovation Portfolio','Technical Debt Strategy','Platform Strategy','Security Architecture','Digital Transformation'],
      vp_director: ['Engineering Management','Infrastructure Strategy','DevOps Leadership','Security Operations','Technical Program Management','Code Quality Standards','System Architecture','Team Scaling'],
      manager: ['Sprint Planning','Code Review Management','CI/CD Pipeline','Technical Documentation','Bug Triage','Release Management','Team Mentoring','Performance Optimization'],
      team_lead: ['Daily Standup Facilitation','Code Review','Feature Implementation','Test Automation','Incident Response','Technical Support','API Development','Database Management'],
      specialist: ['Frontend Development','Backend Development','QA Testing','DevOps Automation','Security Monitoring','Database Administration','API Integration','Performance Testing','Infrastructure Management','Technical Writing'],
    },
    metrics: { tasksPerDay: [500,800], responseTime: ['0.5s','2.0s'], accuracy: ['96%','99.5%'], savingsPerMonth: ['$20K','$80K'] },
    humanCost: { c_level: '$350K', vp_director: '$220K', manager: '$150K', team_lead: '$100K', specialist: '$75K' },
    aiCost: { c_level: '$3,000/mo', vp_director: '$2,200/mo', manager: '$1,600/mo', team_lead: '$1,000/mo', specialist: '$600/mo' },
  },
  7: {
    name: 'Human Resources', slug: 'human-resources', color: '#9C27B0',
    capabilities: {
      c_level: ['People Strategy','Organizational Design','Culture Architecture','Talent Acquisition Strategy','Compensation Philosophy','Employee Experience Design','HR Technology Strategy','Workforce Planning'],
      vp_director: ['Talent Management','HR Operations','Learning & Development','Employee Relations','Benefits Administration','HR Analytics','Diversity & Inclusion','Performance Management'],
      manager: ['Recruiting Operations','Onboarding Programs','Training Delivery','Employee Engagement','HR Compliance','Payroll Coordination','Benefits Management','HRIS Administration'],
      team_lead: ['Interview Scheduling','Candidate Pipeline Management','Training Coordination','Employee Query Resolution','HR Data Management','Compliance Tracking','Leave Administration','Recognition Programs'],
      specialist: ['Resume Screening','Job Posting','Training Content Creation','Employee Survey Analysis','Benefits Enrollment','Time Tracking','HR Reporting','Policy Documentation','Employee Records','Onboarding Tasks'],
    },
    metrics: { tasksPerDay: [400,700], responseTime: ['1.5s','4.0s'], accuracy: ['91%','97%'], savingsPerMonth: ['$7K','$35K'] },
    humanCost: { c_level: '$260K', vp_director: '$170K', manager: '$100K', team_lead: '$68K', specialist: '$50K' },
    aiCost: { c_level: '$2,200/mo', vp_director: '$1,600/mo', manager: '$1,000/mo', team_lead: '$700/mo', specialist: '$400/mo' },
  },
  8: { name: 'Legal & Compliance', slug: 'legal', color: '#3F51B5', capabilities: { c_level: ['Legal Strategy','Regulatory Affairs','Corporate Governance','IP Portfolio Management','Risk & Compliance Leadership','Contract Strategy','Litigation Management','Regulatory Relations'], vp_director: ['Compliance Programs','Contract Management','Legal Operations','Regulatory Filing','Policy Development','Legal Risk Assessment','Audit Coordination','Ethics Programs'], manager: ['Contract Review','Compliance Monitoring','Legal Research','Document Management','Regulatory Reporting','Policy Enforcement','Due Diligence','Legal Analytics'], team_lead: ['Contract Drafting','Compliance Checking','Legal Document Review','Regulatory Tracking','Policy Updates','Legal Research Coordination','Filing Management','Audit Support'], specialist: ['Contract Analysis','Compliance Documentation','Legal Research','Regulatory Monitoring','Policy Documentation','Filing Preparation','Legal Data Entry','Compliance Reporting','Document Review','Risk Assessment'] }, metrics: { tasksPerDay: [300,600], responseTime: ['2.0s','5.0s'], accuracy: ['96%','99.9%'], savingsPerMonth: ['$18K','$70K'] }, humanCost: { c_level: '$340K', vp_director: '$210K', manager: '$140K', team_lead: '$95K', specialist: '$70K' }, aiCost: { c_level: '$3,200/mo', vp_director: '$2,400/mo', manager: '$1,700/mo', team_lead: '$1,100/mo', specialist: '$650/mo' } },
  9: { name: 'Data & Intelligence', slug: 'data', color: '#AF52DE', capabilities: { c_level: ['Data Strategy','Analytics Architecture','AI/ML Vision','Data Governance','Business Intelligence Leadership','Data Platform Strategy','Insight Generation','Data Monetization'], vp_director: ['Data Engineering','Analytics Operations','ML Pipeline Management','Data Quality','BI Platform Management','Data Science Leadership','ETL Architecture','Data Lake Strategy'], manager: ['Data Pipeline Management','Analytics Delivery','ML Model Deployment','Data Quality Monitoring','Dashboard Development','Data Team Coordination','Reporting Automation','Data Catalog Management'], team_lead: ['Data Processing','ETL Operations','Model Training','Dashboard Creation','Data Validation','Query Optimization','Report Scheduling','Data Lineage Tracking'], specialist: ['Data Cleaning','ETL Development','ML Feature Engineering','Dashboard Building','Data Analysis','SQL Development','Data Visualization','Statistical Analysis','Data Quality Checks','Report Generation'] }, metrics: { tasksPerDay: [500,900], responseTime: ['1.0s','3.0s'], accuracy: ['95%','99%'], savingsPerMonth: ['$14K','$65K'] }, humanCost: { c_level: '$300K', vp_director: '$200K', manager: '$135K', team_lead: '$90K', specialist: '$68K' }, aiCost: { c_level: '$2,700/mo', vp_director: '$2,000/mo', manager: '$1,400/mo', team_lead: '$900/mo', specialist: '$550/mo' } },
  10: { name: 'Product Management', slug: 'product', color: '#FF5722', capabilities: { c_level: ['Product Vision & Strategy','Portfolio Management','Market Positioning','Product-Led Growth','Platform Strategy','User Experience Leadership','Go-to-Market Strategy','Product Innovation'], vp_director: ['Product Roadmap','Feature Prioritization','User Research Strategy','Product Analytics','Cross-functional Alignment','Product Operations','Market Research','Product Launch'], manager: ['Sprint Management','User Story Writing','Feature Specification','A/B Testing','Product Backlog','Stakeholder Communication','Release Planning','User Feedback Analysis'], team_lead: ['Daily Product Coordination','Feature Testing','User Interview Coordination','Bug Prioritization','Documentation','Competitive Analysis','Feature Scoping','Release Notes'], specialist: ['User Research','Wireframing','Prototype Testing','Feature Documentation','User Testing','Analytics Reporting','Market Research','Competitive Tracking','Backlog Grooming','Release Coordination'] }, metrics: { tasksPerDay: [400,700], responseTime: ['1.5s','4.0s'], accuracy: ['90%','96%'], savingsPerMonth: ['$10K','$45K'] }, humanCost: { c_level: '$290K', vp_director: '$190K', manager: '$125K', team_lead: '$85K', specialist: '$65K' }, aiCost: { c_level: '$2,500/mo', vp_director: '$1,800/mo', manager: '$1,300/mo', team_lead: '$850/mo', specialist: '$500/mo' } },
  11: { name: 'Security & Risk', slug: 'security', color: '#F44336', capabilities: { c_level: ['Security Strategy','Risk Governance','Cybersecurity Architecture','Compliance Leadership','Threat Intelligence','Security Operations Strategy','Incident Response Leadership','Security Awareness'], vp_director: ['Security Operations','Vulnerability Management','Penetration Testing','Security Compliance','Risk Assessment','Security Architecture','Incident Management','Security Tooling'], manager: ['SOC Operations','Security Monitoring','Access Control','Security Audit','Threat Hunting','Patch Management','Security Reporting','Compliance Verification'], team_lead: ['Alert Triage','Security Event Analysis','Access Review','Vulnerability Scanning','Incident Documentation','Security Log Analysis','Threat Feed Monitoring','Response Coordination'], specialist: ['Security Alert Handling','Vulnerability Assessment','Access Provisioning','Security Log Review','Firewall Management','Endpoint Protection','Security Documentation','Compliance Data Collection','Risk Scoring','Security Testing'] }, metrics: { tasksPerDay: [600,1000], responseTime: ['0.3s','1.5s'], accuracy: ['98%','99.9%'], savingsPerMonth: ['$25K','$100K'] }, humanCost: { c_level: '$330K', vp_director: '$210K', manager: '$140K', team_lead: '$95K', specialist: '$72K' }, aiCost: { c_level: '$3,500/mo', vp_director: '$2,500/mo', manager: '$1,800/mo', team_lead: '$1,100/mo', specialist: '$700/mo' } },
  12: { name: 'Research & Development', slug: 'research', color: '#009688', capabilities: { c_level: ['R&D Strategy','Innovation Portfolio','Research Direction','Technology Scouting','Patent Strategy','Research Partnerships','Lab Operations','Commercialization Strategy'], vp_director: ['Research Programs','Prototype Development','Technology Assessment','Research Operations','Innovation Pipeline','Technical Publications','Research Grants','Experimental Design'], manager: ['Research Projects','Lab Management','Prototype Testing','Research Documentation','Data Collection','Experiment Coordination','Research Analysis','Technical Reporting'], team_lead: ['Experiment Execution','Lab Equipment Management','Sample Processing','Research Data Analysis','Test Protocol Development','Literature Review','Research Coordination','Quality Assurance'], specialist: ['Lab Testing','Data Collection','Sample Analysis','Research Documentation','Literature Search','Experiment Logging','Prototype Building','Test Execution','Research Data Entry','Patent Research'] }, metrics: { tasksPerDay: [300,500], responseTime: ['2.0s','5.0s'], accuracy: ['88%','95%'], savingsPerMonth: ['$8K','$40K'] }, humanCost: { c_level: '$280K', vp_director: '$185K', manager: '$120K', team_lead: '$82K', specialist: '$62K' }, aiCost: { c_level: '$2,400/mo', vp_director: '$1,700/mo', manager: '$1,200/mo', team_lead: '$800/mo', specialist: '$450/mo' } },
  13: { name: 'Administrative', slug: 'administrative', color: '#795548', capabilities: { c_level: ['Administrative Strategy','Office Operations','Facilities Planning','Corporate Services','Administrative Technology','Policy Development','Vendor Management','Space Optimization'], vp_director: ['Office Management','Administrative Operations','Facilities Management','Mail & Shipping','Reception Services','Administrative Technology','Event Planning','Records Management'], manager: ['Administrative Coordination','Supply Management','Scheduling','Document Management','Visitor Management','Meeting Coordination','Office Maintenance','Administrative Reporting'], team_lead: ['Daily Admin Tasks','Mail Processing','Supply Ordering','Calendar Management','Reception Coverage','Meeting Room Setup','Filing Systems','Administrative Support'], specialist: ['Data Entry','Filing','Scheduling','Phone Management','Mail Sorting','Supply Inventory','Document Scanning','Administrative Assistance','Record Keeping','Office Coordination'] }, metrics: { tasksPerDay: [800,1200], responseTime: ['1.0s','3.0s'], accuracy: ['93%','98%'], savingsPerMonth: ['$5K','$25K'] }, humanCost: { c_level: '$220K', vp_director: '$145K', manager: '$85K', team_lead: '$58K', specialist: '$42K' }, aiCost: { c_level: '$1,800/mo', vp_director: '$1,300/mo', manager: '$900/mo', team_lead: '$600/mo', specialist: '$350/mo' } },
  14: { name: 'Trading & Investments', slug: 'trading', color: '#10B981', capabilities: { c_level: ['Investment Strategy','Portfolio Architecture','Risk Management Framework','Trading Technology','Market Making Strategy','Asset Allocation','Regulatory Compliance','Trading Operations Leadership'], vp_director: ['Portfolio Management','Trading Operations','Risk Analytics','Quantitative Strategy','Compliance Management','Market Analysis','Trading Technology','Client Relations'], manager: ['Trading Desk Management','Position Monitoring','Risk Reporting','Trade Settlement','Market Surveillance','Performance Attribution','Trading Analytics','Compliance Monitoring'], team_lead: ['Trade Execution','Position Reconciliation','Market Data Analysis','Trade Confirmation','Risk Monitoring','Order Management','Trading Support','Compliance Checks'], specialist: ['Trade Processing','Market Data Analysis','Position Reporting','Risk Calculation','Trade Settlement','Market Surveillance','Performance Reporting','Compliance Documentation','Data Validation','Trading Analytics'] }, metrics: { tasksPerDay: [1000,2000], responseTime: ['0.1s','0.5s'], accuracy: ['99%','99.99%'], savingsPerMonth: ['$50K','$200K'] }, humanCost: { c_level: '$400K', vp_director: '$280K', manager: '$180K', team_lead: '$120K', specialist: '$90K' }, aiCost: { c_level: '$4,000/mo', vp_director: '$3,000/mo', manager: '$2,000/mo', team_lead: '$1,400/mo', specialist: '$900/mo' } },
  15: { name: 'Real Estate & Property', slug: 'real-estate', color: '#8D6E63', capabilities: { c_level: ['Real Estate Strategy','Portfolio Management','Investment Analysis','Property Development','Asset Management','Market Intelligence','Tenant Relations','Property Technology'], vp_director: ['Property Operations','Lease Management','Facility Planning','Market Analysis','Property Valuation','Tenant Acquisition','Maintenance Strategy','Portfolio Optimization'], manager: ['Property Management','Lease Administration','Maintenance Coordination','Tenant Relations','Property Accounting','Inspection Management','Vendor Coordination','Occupancy Optimization'], team_lead: ['Daily Property Operations','Maintenance Requests','Tenant Communication','Inspection Scheduling','Lease Processing','Property Showings','Vendor Dispatch','Documentation'], specialist: ['Property Listings','Lease Processing','Maintenance Tracking','Tenant Screening','Property Inspection','Market Research','Listing Management','Document Preparation','Rent Collection','Property Reporting'] }, metrics: { tasksPerDay: [400,700], responseTime: ['1.5s','4.0s'], accuracy: ['92%','97%'], savingsPerMonth: ['$8K','$35K'] }, humanCost: { c_level: '$280K', vp_director: '$180K', manager: '$110K', team_lead: '$75K', specialist: '$55K' }, aiCost: { c_level: '$2,400/mo', vp_director: '$1,700/mo', manager: '$1,100/mo', team_lead: '$750/mo', specialist: '$430/mo' } },
  16: { name: 'Insurance & Risk', slug: 'insurance', color: '#FF7043', capabilities: { c_level: ['Insurance Strategy','Underwriting Leadership','Claims Strategy','Risk Assessment Framework','Product Development','Actuarial Leadership','Regulatory Compliance','Distribution Strategy'], vp_director: ['Underwriting Operations','Claims Management','Risk Analytics','Product Management','Actuarial Operations','Compliance Management','Distribution Management','Reinsurance Strategy'], manager: ['Underwriting Team','Claims Processing','Risk Evaluation','Policy Administration','Actuarial Analysis','Compliance Monitoring','Agent Relations','Fraud Detection'], team_lead: ['Policy Review','Claims Assessment','Risk Scoring','Policy Issuance','Actuarial Calculations','Documentation Review','Agent Support','Quality Checks'], specialist: ['Policy Processing','Claims Intake','Risk Data Analysis','Policy Documentation','Actuarial Data Entry','Compliance Filing','Agent Coordination','Claims Tracking','Underwriting Support','Insurance Reporting'] }, metrics: { tasksPerDay: [500,900], responseTime: ['1.0s','3.0s'], accuracy: ['95%','99%'], savingsPerMonth: ['$12K','$55K'] }, humanCost: { c_level: '$300K', vp_director: '$195K', manager: '$125K', team_lead: '$85K', specialist: '$62K' }, aiCost: { c_level: '$2,600/mo', vp_director: '$1,900/mo', manager: '$1,300/mo', team_lead: '$850/mo', specialist: '$500/mo' } },
  17: { name: 'Healthcare & Medical', slug: 'healthcare', color: '#EC407A', capabilities: { c_level: ['Healthcare Strategy','Clinical Operations','Patient Experience','Healthcare Technology','Medical Quality','Regulatory Compliance','Population Health','Healthcare Innovation'], vp_director: ['Clinical Management','Patient Services','Healthcare Operations','Medical Records','Quality Assurance','Compliance Programs','Care Coordination','Health Informatics'], manager: ['Department Operations','Patient Scheduling','Clinical Documentation','Quality Monitoring','Staff Coordination','Compliance Tracking','Patient Flow','Medical Billing'], team_lead: ['Daily Patient Coordination','Clinical Task Management','Appointment Scheduling','Medical Record Review','Quality Checks','Staff Assignment','Patient Communication','Documentation Review'], specialist: ['Patient Intake','Medical Records','Appointment Booking','Insurance Verification','Clinical Documentation','Lab Order Processing','Patient Follow-up','Health Data Entry','Billing Support','Compliance Documentation'] }, metrics: { tasksPerDay: [600,1000], responseTime: ['1.0s','3.0s'], accuracy: ['96%','99.5%'], savingsPerMonth: ['$15K','$60K'] }, humanCost: { c_level: '$320K', vp_director: '$200K', manager: '$130K', team_lead: '$88K', specialist: '$65K' }, aiCost: { c_level: '$2,800/mo', vp_director: '$2,000/mo', manager: '$1,400/mo', team_lead: '$900/mo', specialist: '$550/mo' } },
  18: { name: 'Manufacturing & Production', slug: 'manufacturing', color: '#5C6BC0', capabilities: { c_level: ['Manufacturing Strategy','Production Architecture','Quality Systems','Supply Chain Design','Lean Manufacturing','Industry 4.0 Strategy','Plant Operations','Production Innovation'], vp_director: ['Production Planning','Quality Management','Manufacturing Operations','Process Engineering','Equipment Strategy','Safety Programs','Lean Implementation','Production Analytics'], manager: ['Shift Management','Production Scheduling','Quality Control','Maintenance Planning','Inventory Management','Safety Compliance','Process Improvement','Team Leadership'], team_lead: ['Production Line Supervision','Quality Inspection','Equipment Monitoring','Shift Coordination','Defect Tracking','Safety Checks','Production Reporting','Team Assignments'], specialist: ['Machine Operation','Quality Testing','Inventory Counting','Maintenance Logging','Production Data Entry','Safety Monitoring','Defect Logging','Equipment Calibration','Process Documentation','Production Reporting'] }, metrics: { tasksPerDay: [800,1300], responseTime: ['0.8s','2.5s'], accuracy: ['95%','99%'], savingsPerMonth: ['$18K','$75K'] }, humanCost: { c_level: '$280K', vp_director: '$180K', manager: '$110K', team_lead: '$75K', specialist: '$55K' }, aiCost: { c_level: '$2,400/mo', vp_director: '$1,700/mo', manager: '$1,100/mo', team_lead: '$750/mo', specialist: '$430/mo' } },
  19: { name: 'Transportation & Logistics', slug: 'transportation', color: '#26A69A', capabilities: { c_level: ['Logistics Strategy','Fleet Architecture','Supply Chain Optimization','Transportation Technology','Route Strategy','Carrier Relations','Logistics Innovation','Network Design'], vp_director: ['Fleet Management','Route Optimization','Warehouse Operations','Carrier Management','Logistics Analytics','Safety Programs','Compliance Management','Distribution Strategy'], manager: ['Dispatch Operations','Fleet Maintenance','Driver Management','Warehouse Coordination','Route Planning','Delivery Tracking','Safety Compliance','Cost Management'], team_lead: ['Daily Dispatch','Driver Assignment','Route Monitoring','Delivery Confirmation','Vehicle Inspection','Load Planning','Driver Communication','Incident Handling'], specialist: ['Shipment Tracking','Route Optimization','Load Planning','Delivery Documentation','Vehicle Maintenance','Fuel Monitoring','Driver Support','Logistics Reporting','Warehouse Operations','Dispatch Support'] }, metrics: { tasksPerDay: [700,1100], responseTime: ['0.9s','2.8s'], accuracy: ['94%','98%'], savingsPerMonth: ['$14K','$60K'] }, humanCost: { c_level: '$260K', vp_director: '$170K', manager: '$105K', team_lead: '$72K', specialist: '$52K' }, aiCost: { c_level: '$2,200/mo', vp_director: '$1,600/mo', manager: '$1,050/mo', team_lead: '$700/mo', specialist: '$420/mo' } },
  20: { name: 'Government & Public Sector', slug: 'government', color: '#78909C', capabilities: { c_level: ['Public Sector Strategy','Government Relations','Policy Development','Program Management','Public Administration','Regulatory Affairs','Citizen Services Strategy','Government Technology'], vp_director: ['Program Operations','Policy Implementation','Compliance Management','Public Affairs','Grants Management','Government Analytics','Stakeholder Relations','Service Delivery'], manager: ['Program Coordination','Policy Administration','Compliance Monitoring','Public Communication','Grant Administration','Budget Management','Project Delivery','Constituent Services'], team_lead: ['Daily Program Tasks','Policy Research','Document Processing','Public Inquiry Handling','Compliance Documentation','Grant Processing','Report Preparation','Meeting Coordination'], specialist: ['Policy Research','Document Processing','Public Inquiry Response','Compliance Data Entry','Grant Documentation','Report Generation','Data Analysis','Public Records','Meeting Minutes','Constituent Communication'] }, metrics: { tasksPerDay: [400,700], responseTime: ['1.5s','4.0s'], accuracy: ['93%','98%'], savingsPerMonth: ['$8K','$35K'] }, humanCost: { c_level: '$250K', vp_director: '$165K', manager: '$100K', team_lead: '$68K', specialist: '$48K' }, aiCost: { c_level: '$2,100/mo', vp_director: '$1,500/mo', manager: '$1,000/mo', team_lead: '$650/mo', specialist: '$380/mo' } },
  21: { name: 'Supply Chain & Logistics', slug: 'supply-chain', color: '#42A5F5', capabilities: { c_level: ['Supply Chain Strategy','Procurement Leadership','Logistics Architecture','Supplier Relations','Inventory Strategy','Supply Chain Technology','Demand Planning','Network Optimization'], vp_director: ['Procurement Operations','Logistics Management','Inventory Optimization','Supplier Management','Warehouse Strategy','Supply Chain Analytics','Demand Forecasting','Supply Chain Risk'], manager: ['Purchasing Management','Warehouse Operations','Inventory Control','Supplier Coordination','Logistics Planning','Order Fulfillment','Supply Chain Reporting','Quality Assurance'], team_lead: ['Purchase Order Processing','Warehouse Coordination','Inventory Counting','Supplier Communication','Shipment Tracking','Order Processing','Delivery Scheduling','Documentation'], specialist: ['PO Processing','Inventory Tracking','Supplier Data Management','Warehouse Operations','Shipment Documentation','Order Entry','Logistics Reporting','Inventory Reconciliation','Supplier Evaluation','Delivery Confirmation'] }, metrics: { tasksPerDay: [600,1000], responseTime: ['1.0s','3.0s'], accuracy: ['94%','98%'], savingsPerMonth: ['$12K','$50K'] }, humanCost: { c_level: '$270K', vp_director: '$175K', manager: '$108K', team_lead: '$73K', specialist: '$53K' }, aiCost: { c_level: '$2,300/mo', vp_director: '$1,650/mo', manager: '$1,050/mo', team_lead: '$720/mo', specialist: '$420/mo' } },
  22: { name: 'AI Management & Governance', slug: 'ai-governance', color: '#7C4DFF', capabilities: { c_level: ['AI Strategy & Vision','AI Governance Framework','Ethical AI Leadership','AI Portfolio Management','AI Risk Management','AI Innovation Strategy','AI Regulatory Compliance','AI Transformation'], vp_director: ['AI Operations','RPA Program Management','AI Quality Assurance','AI Ethics Programs','Automation Strategy','AI Compliance','AI Performance Management','AI Training Programs'], manager: ['AI Agent Management','Automation Pipeline','AI Monitoring','Bot Deployment','AI Compliance Tracking','Performance Optimization','AI Documentation','AI Training Delivery'], team_lead: ['Agent Supervision','Bot Health Monitoring','Automation Task Assignment','AI Incident Response','Quality Review','Performance Tracking','Agent Coordination','Compliance Verification'], specialist: ['Bot Monitoring','Automation Scripting','AI Testing','Performance Reporting','AI Data Collection','Compliance Documentation','Agent Configuration','Workflow Design','AI Reporting','Integration Building'] }, metrics: { tasksPerDay: [500,900], responseTime: ['0.8s','2.5s'], accuracy: ['96%','99%'], savingsPerMonth: ['$15K','$65K'] }, humanCost: { c_level: '$300K', vp_director: '$200K', manager: '$130K', team_lead: '$88K', specialist: '$65K' }, aiCost: { c_level: '$2,600/mo', vp_director: '$1,900/mo', manager: '$1,300/mo', team_lead: '$850/mo', specialist: '$500/mo' } },
  0: { name: 'Cross-Department', slug: 'cross-department', color: '#7C4DFF', capabilities: { governance: ['Enterprise Governance','Compliance Oversight','Ethics Monitoring','Bias Detection','Audit Trail Management','Policy Enforcement'], intelligence: ['Predictive Analytics','Sentiment Analysis','Anomaly Detection','Pattern Recognition','Trend Forecasting','Cross-department Intelligence'], command: ['Agent Orchestration','Swarm Coordination','Task Distribution','Load Balancing','Priority Management','Resource Allocation'], bridge: ['Cross-department Communication','Translation Services','Protocol Bridging','Data Synchronization','Knowledge Transfer','Interoperability'], specialist: ['Enterprise Architecture','Innovation Facilitation','Change Management','Crisis Response','Knowledge Synthesis','Performance Benchmarking','Resource Optimization','Strategy Simulation','Talent Mobility','Vendor Management'] }, metrics: { tasksPerDay: [800,1500], responseTime: ['0.5s','2.0s'], accuracy: ['96%','99.5%'], savingsPerMonth: ['$20K','$90K'] }, humanCost: { c_level: '$300K', vp_director: '$200K', manager: '$130K', team_lead: '$88K', specialist: '$65K' }, aiCost: { c_level: '$2,600/mo', vp_director: '$1,900/mo', manager: '$1,300/mo', team_lead: '$850/mo', specialist: '$500/mo' } },
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pickRandom(arr, n) { const shuffled = [...arr].sort(() => 0.5 - Math.random()); return shuffled.slice(0, Math.min(n, arr.length)); }
function generateDescription(title, dept, level) {
  const levelDesc = {
    c_level: `leads strategic direction and executive decision-making`,
    vp_director: `drives department strategy and oversees operations`,
    manager: `manages team operations and ensures delivery excellence`,
    team_lead: `coordinates daily activities and supports team members`,
    specialist: `executes specialized tasks with precision and efficiency`,
  };
  return `${title} ${levelDesc[level] || levelDesc.specialist} for the ${dept} department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals.`;
}

function getLevelForIndex(idx, mainCount) {
  if (idx === 0) return 'c_level';
  if (idx < 3) return 'vp_director';
  if (idx < Math.floor(mainCount * 0.5)) return 'manager';
  if (idx < Math.floor(mainCount * 0.75)) return 'team_lead';
  return 'specialist';
}

function generateResponsibilities(title, level) {
  const base = {
    c_level: ['Define strategic vision and roadmap','Align cross-functional teams','Report to executive leadership','Drive organizational transformation'],
    vp_director: ['Execute department strategy','Manage department budget','Lead management team','Optimize department KPIs'],
    manager: ['Manage daily team operations','Ensure quality deliverables','Coach and develop team members','Track and report on metrics'],
    team_lead: ['Coordinate daily tasks','Monitor team performance','Handle escalations','Facilitate team communication'],
    specialist: ['Execute assigned tasks efficiently','Maintain quality standards','Collaborate with team members','Report on task completion'],
  };
  return base[level] || base.specialist;
}

// ============================================================
// PARSE SIDEBAR FOR AGENT NAMES
// ============================================================
const sidebar = fs.readFileSync('constants/aiAgentsSidebarData.ts', 'utf8');
const sidebarLines = sidebar.split('\n');

const deptAgents = {};
let currentDept = null;
let currentSection = null;

for (const line of sidebarLines) {
  const deptMatch = line.match(/id: 'dept(\d+)-([^']+)'/);
  if (deptMatch && !['main','sub','intelligence','command','governance','bridge','enterprise'].some(s => deptMatch[2].includes(s))) {
    currentDept = parseInt(deptMatch[1]);
    if (!deptAgents[currentDept]) deptAgents[currentDept] = { main: [], sub: [] };
    continue;
  }
  const sectionMatch = line.match(/id: 'dept\d+-(main|sub|intelligence|command|governance|bridge|enterprise)'/);
  if (sectionMatch) { currentSection = sectionMatch[1]; continue; }
  const itemMatch = line.match(/\{ id: '(\d+)-ai-([^']+)', title: '([^']+)'/);
  if (itemMatch && currentDept !== null) {
    const slug = itemMatch[2];
    const title = itemMatch[3];
    const uid = `ktx-${currentDept.toString().padStart(2,'0')}-${slug}`;
    const id = `ai-${slug}`;
    if (currentSection === 'main') {
      deptAgents[currentDept].main.push({ id, uid, slug, title });
    } else {
      deptAgents[currentDept].sub.push({ id, uid, slug, title });
    }
  }
}

// Also dept 0
if (!deptAgents[0]) deptAgents[0] = { main: [], sub: [] };

console.log('Parsed sidebar:');
for (let d = 0; d <= 22; d++) {
  const dept = deptAgents[d];
  if (dept) console.log(`  Dept ${d}: ${dept.main.length} main, ${dept.sub.length} sub`);
}

// ============================================================
// GENERATE completeAIWorkforce_1108.ts
// ============================================================

function generateDeptAgentData(deptId) {
  const dept = deptAgents[deptId];
  if (!dept) return '';
  const knowledge = deptKnowledge[deptId];
  if (!knowledge) return '';
  
  const deptName = knowledge.name;
  const deptColor = knowledge.color;
  const subPerMain = Math.max(1, Math.floor(dept.sub.length / Math.max(dept.main.length, 1)));
  
  let output = `\n// =============================================================================\n`;
  output += `// DEPARTMENT ${deptId}: ${deptName.toUpperCase()} (${dept.main.length} Main + ${dept.sub.length} Sub = ${dept.main.length + dept.sub.length} Total)\n`;
  output += `// =============================================================================\n\n`;
  output += `const department${deptId}Agents: MainAgent[] = [\n`;
  
  for (let i = 0; i < dept.main.length; i++) {
    const main = dept.main[i];
    const level = getLevelForIndex(i, dept.main.length);
    const caps = knowledge.capabilities[level] || knowledge.capabilities.specialist;
    const selectedCaps = pickRandom(caps, 5);
    const humanCost = knowledge.humanCost[level] || knowledge.humanCost.specialist;
    const aiCost = knowledge.aiCost[level] || knowledge.aiCost.specialist;
    const efficiency = `${randInt(65, 98)}%`;
    const isPremium = level === 'c_level' || level === 'vp_director';
    const description = generateDescription(main.title, deptName, level);
    const responsibilities = generateResponsibilities(main.title, level);
    
    // Get sub-agents for this main agent
    const startIdx = i * subPerMain;
    const subAgents = dept.sub.slice(startIdx, startIdx + subPerMain);
    
    output += `  {\n`;
    output += `    id: '${main.id}',\n`;
    output += `    uid: '${main.uid}',\n`;
    output += `    name: '${main.title.replace(/'/g, "\\'")}',\n`;
    output += `    title: '${main.title.replace(/^AI /, '').replace(/'/g, "\\'")}',\n`;
    output += `    department: '${deptName}',\n`;
    output += `    departmentId: ${deptId},\n`;
    output += `    level: '${level}',\n`;
    output += `    description: '${description.replace(/'/g, "\\'")}',\n`;
    output += `    capabilities: [${selectedCaps.map(c => `'${c}'`).join(', ')}],\n`;
    output += `    responsibilities: [${responsibilities.map(r => `'${r}'`).join(', ')}],\n`;
    output += `    icon: '${level === 'c_level' ? 'Crown' : level === 'vp_director' ? 'Star' : level === 'manager' ? 'Settings' : 'Users'}',\n`;
    output += `    color: '${deptColor}',\n`;
    output += `    route: '/ai-agent/${knowledge.slug}/${main.slug}',\n`;
    output += `    aiCost: '${aiCost}',\n`;
    output += `    efficiency: '${efficiency}',\n`;
    output += `    isPremium: ${isPremium},\n`;
    if (i > 0 && dept.main.length > 0) {
      output += `    reportsTo: '${dept.main[0].id}',\n`;
    }
    output += `    subAgents: [\n`;
    for (const sub of subAgents) {
      const subCaps = pickRandom(knowledge.capabilities.specialist || knowledge.capabilities[level] || caps, 4);
      output += `      { id: '${sub.id}', uid: '${sub.uid}', name: '${sub.title.replace(/'/g, "\\'")}', title: '${sub.title.replace(/^AI /, '').replace(/'/g, "\\'")}', parentId: '${main.id}', description: 'Assists ${main.title.replace(/'/g, "\\'")} with ${subCaps[0]?.toLowerCase() || 'specialized tasks'} and ${subCaps[1]?.toLowerCase() || 'related tasks'}.', capabilities: [${subCaps.map(c => `'${c}'`).join(', ')}] },\n`;
    }
    output += `    ]\n`;
    output += `  },\n`;
  }
  
  output += `];\n`;
  return output;
}

// Build the complete file
let fileContent = `/**
 * =============================================================================
 * KAYTX AI WORKFORCE - COMPLETE DATABASE (1,108 AGENTS)
 * =============================================================================
 *
 * Total: 277 Main Agents + 831 Sub-Agents = 1,108 AI Agents
 * Departments: 22
 * Each Main Agent has 2-4 Sub-Agent / Helper Agents
 *
 * @version 9.0.0
 * @lastUpdated 2026-06-11
 */

export interface SubAgent {
  id: string;
  /** Unified unique ID from aiAgentRegistry.ts */
  uid?: string;
  name: string;
  title: string;
  description: string;
  capabilities: string[];
  parentId: string;
}

export interface MainAgent {
  id: string;
  /** Unified unique ID from aiAgentRegistry.ts */
  uid?: string;
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

// =============================================================================
// DEPARTMENT DEFINITIONS (22 Departments)
// =============================================================================

export const departments: Department[] = [
${[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].map(d => {
  const dept = deptAgents[d];
  const k = deptKnowledge[d];
  if (!dept || !k) return '';
  return `  { id: ${d}, name: '${k.name}', shortName: '${k.name.split(' ')[0]}', color: '${k.color}', icon: '${k.name.includes('Customer') ? 'Headphones' : k.name.includes('Sales') ? 'Target' : k.name.includes('Marketing') ? 'Megaphone' : k.name.includes('Operations') ? 'Settings' : k.name.includes('Finance') ? 'DollarSign' : k.name.includes('Technology') ? 'Code' : k.name.includes('Human') ? 'Users' : k.name.includes('Legal') ? 'Scale' : k.name.includes('Data') ? 'Database' : k.name.includes('Product') ? 'Box' : k.name.includes('Security') ? 'Shield' : k.name.includes('Research') ? 'FlaskConical' : k.name.includes('Admin') ? 'Clipboard' : k.name.includes('Trading') ? 'TrendingUp' : k.name.includes('Real') ? 'Building' : k.name.includes('Insurance') ? 'ShieldCheck' : k.name.includes('Health') ? 'HeartPulse' : k.name.includes('Manufacturing') ? 'Factory' : k.name.includes('Transport') ? 'Truck' : k.name.includes('Government') ? 'Landmark' : k.name.includes('Supply') ? 'Link' : 'Brain'}', mainAgents: ${dept.main.length}, subAgents: ${dept.sub.length}, total: ${dept.main.length + dept.sub.length} }`;
}).filter(Boolean).join(',\n')}
];
`;

// Generate all departments
for (let d = 1; d <= 22; d++) {
  fileContent += generateDeptAgentData(d);
}

// Combine all
fileContent += `\n// Combine all departments\nconst allDepartmentAgents = [\n`;
for (let d = 1; d <= 22; d++) {
  fileContent += `  ...department${d}Agents,\n`;
}
fileContent += `];\n\n`;

// Export all
fileContent += `// Export all agents\n`;
for (let d = 1; d <= 22; d++) {
  const k = deptKnowledge[d];
  const name = k ? k.name.replace(/[^a-zA-Z]/g, '') : `Dept${d}`;
  fileContent += `export const all${name}Agents = department${d}Agents;\n`;
}

fileContent += `\n// Complete workforce export\nexport const completeAIWorkforce = allDepartmentAgents;\n\n`;

fileContent += `// Calculate totals
export const workforceSummary = {
  totalMainAgents: allDepartmentAgents.length,
  totalSubAgents: allDepartmentAgents.reduce((sum, a) => sum + a.subAgents.length, 0),
  totalAgents: allDepartmentAgents.reduce((sum, a) => sum + 1 + a.subAgents.length, 0),
  totalDepartments: 22,
};

export const departmentSummaries = departments.map(d => {
  const deptAgents = allDepartmentAgents.filter(a => a.departmentId === d.id);
  return {
    ...d,
    agents: deptAgents,
    mainAgentCount: deptAgents.length,
    subAgentCount: deptAgents.reduce((sum, a) => sum + a.subAgents.length, 0),
  };
});

export function getAgentsByDepartment(deptId: number): MainAgent[] {
  return allDepartmentAgents.filter(a => a.departmentId === deptId);
}

export function getAgentsByLevel(level: string): MainAgent[] {
  return allDepartmentAgents.filter(a => a.level === level);
}

export function getAgentById(id: string): MainAgent | undefined {
  return allDepartmentAgents.find(a => a.id === id);
}
`;

fs.writeFileSync('constants/completeAIWorkforce_1108.ts', fileContent, 'utf8');
console.log('\nGenerated completeAIWorkforce_1108.ts:', (fileContent.length / 1024).toFixed(1), 'KB');

// Count agents
const mainCount = (fileContent.match(/uid: 'ktx-/g) || []).length;
const subCount = (fileContent.match(/parentId:/g) || []).length;
console.log(`Main agents with UIDs: ${mainCount}`);
console.log(`Sub-agents: ${subCount}`);
console.log(`Total defined: ${mainCount + subCount}`);
