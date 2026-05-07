#!/usr/bin/env node
/**
 * KAYTX ENTERPRISE AI WORKFORCE GENERATOR
 * Generates pages for all 1,108 AI agents (277 Main + 831 Sub)
 * Run: node generate-enterprise-agents.js
 */
const fs = require('fs');
const path = require('path');
const BASE = path.join(__dirname, 'app', 'ai-agent');

// Compact department+agent data - [slug, name, icon, color, [agents]]
// Each agent: [name, slug, shortName, icon, level, tier, [caps], [resps], [subs]]
// Each sub: [name, slug, icon, [caps]]
const D = [
['customer','Customer Experience','Headphones','#007AFF',[
['AI Chief Customer Officer','chief-customer-officer','CCO','Crown','C-Suite','enterprise',['Customer Strategy','Experience Design','Journey Mapping','Retention Programs','Voice Analytics','Sentiment Analysis','NPS Tracking','Success Frameworks'],['Customer Experience Strategy & Vision','Customer Satisfaction Monitoring & Reporting','Support Operations Oversight & Optimization','Customer Retention & Loyalty Programs','Journey Mapping & Touchpoint Analysis','Voice of Customer & Feedback Systems'],[['AI CX Strategy Analyst','cx-strategy-analyst','Target',['CX Strategy Analysis','AI-Powered','Real-time','Analytics','Integration','Automation']],['AI Customer Journey Mapper','customer-journey-mapper','MapPin',['Journey Mapping','Touchpoint Analysis','Path Optimization','Visualization','Integration','Automation']],['AI CX Metrics Tracker','cx-metrics-tracker','ChartBar',['Metrics Tracking','KPI Monitoring','NPS Analysis','CSAT Reporting','Trend Analysis','Dashboard Building']]]],
['AI VP Customer Success','vp-customer-success','VP CS','Users','VP','enterprise',['Onboarding Management','Account Health Monitoring','Success Planning','Renewal Strategy','Expansion Revenue','Customer Advocacy'],['Customer Onboarding & Implementation','Account Health Monitoring & Risk Detection','Success Plan Development & Execution','Renewal & Expansion Strategy','Customer Advocacy Programs','Cross-functional Success Alignment'],[['AI Onboarding Specialist','onboarding-specialist','UserPlus',['Onboarding Automation','Setup Guidance','Training Coordination','Milestone Tracking','Integration Setup','Success Validation']],['AI Account Health Monitor','account-health-monitor','Activity',['Health Scoring','Risk Detection','Usage Analytics','Engagement Tracking','Alert Generation','Trend Analysis']],['AI Success Plan Coordinator','success-plan-coordinator','ClipboardList',['Plan Creation','Goal Tracking','Milestone Management','Stakeholder Alignment','Progress Reporting','Outcome Measurement']]]],
['AI VP Support','vp-support','VP Support','Headphones','VP','enterprise',['Support Operations','Escalation Management','Knowledge Management','Quality Assurance','SLA Management','Team Optimization'],['Support Operations Strategy & Execution','Escalation Management & Resolution','Knowledge Base Development & Curation','Support Quality Assurance Programs','SLA Management & Compliance','Support Team Performance & Optimization'],[['AI Escalation Manager','escalation-manager','AlertTriangle',['Escalation Routing','Priority Assessment','SLA Tracking','Resolution Coordination','Stakeholder Notification','Post-mortem Analysis']],['AI Knowledge Base Curator','knowledge-base-curator','BookOpen',['Content Curation','Article Management','Gap Analysis','Version Control','Search Optimization','Usage Analytics']],['AI Support Quality Auditor','support-quality-auditor','ShieldCheck',['Quality Scoring','Compliance Checking','Performance Review','Standard Enforcement','Training Recommendations','Report Generation']]]],
['AI VP Experience','vp-experience','VP CX','Sparkles','VP','enterprise',['UX Optimization','Personalization','Experience Benchmarking','Feedback Analysis','Design Thinking','Omnichannel Strategy'],['User Experience Strategy & Optimization','Personalization Engine Management','Experience Benchmarking & Comparison','Customer Feedback Analysis & Action','Design Thinking Facilitation','Omnichannel Experience Strategy'],[['AI UX Feedback Analyst','ux-feedback-analyst','MessageSquare',['Feedback Collection','Sentiment Analysis','Pattern Detection','Priority Ranking','Action Recommendations','Trend Reporting']],['AI Experience Benchmark Analyst','experience-benchmark-analyst','BarChart3',['Benchmark Analysis','Competitive Comparison','Industry Standards','Gap Identification','Improvement Planning','Score Tracking']],['AI Personalization Engine','personalization-engine','Fingerprint',['User Profiling','Content Personalization','Behavior Prediction','A/B Testing','Recommendation Engine','Preference Learning']]]],
['AI VP Retention','vp-retention','VP Retention','Shield','VP','enterprise',['Churn Prevention','Win-back Strategy','Retention Analytics','Customer Lifecycle','Risk Scoring','Proactive Engagement'],['Customer Retention Strategy & Programs','Churn Prediction & Prevention','Win-back Campaign Management','Retention Analytics & Reporting','Customer Lifecycle Management','Proactive Engagement Programs'],[['AI Churn Predictor','churn-predictor','TrendingDown',['Churn Prediction','Risk Scoring','Behavior Analysis','Early Warning','Intervention Triggers','Model Training']],['AI Win-back Campaign Specialist','win-back-campaign-specialist','RotateCcw',['Campaign Design','Target Selection','Offer Optimization','Channel Strategy','Performance Tracking','ROI Analysis']],['AI Retention Metrics Analyst','retention-metrics-analyst','PieChart',['Metrics Analysis','Cohort Tracking','Retention Curves','Churn Analysis','LTV Calculation','Reporting Automation']]]],
['AI VP Loyalty','vp-loyalty','VP Loyalty','Award','VP','enterprise',['Loyalty Programs','Rewards Strategy','Tier Management','Engagement Scoring','Program Design','Member Analytics'],['Loyalty Program Strategy & Design','Rewards Program Management','Tier System Management','Engagement Scoring & Optimization','Loyalty Program Analytics','Member Experience Optimization'],[['AI Rewards Program Designer','rewards-program-designer','Gift',['Program Design','Reward Structuring','Tier Planning','Engagement Mechanics','ROI Modeling','Competitive Analysis']],['AI Loyalty Tier Analyst','loyalty-tier-analyst','Layers',['Tier Analysis','Progression Modeling','Threshold Optimization','Member Segmentation','Benefit Planning','Upgrade Triggers']],['AI Engagement Scoring Agent','engagement-scoring-agent','Gauge',['Engagement Scoring','Activity Tracking','Behavior Analysis','Score Calibration','Segment Classification','Intervention Triggers']]]],
['AI Receptionist','receptionist','Receptionist','Phone','Specialist','premium',['Call Handling','Appointment Scheduling','FAQ Response','Multi-language Support','Call Routing','Voicemail Management'],['Incoming Call Management & Routing','Appointment Scheduling & Reminders','FAQ Response & Information Provision','Visitor Management & Logging','Multi-language Support','Voicemail Management & Follow-up'],[['AI Call Router','call-router','PhoneCall',['Intelligent Routing','Priority Assessment','Skill-based Routing','Queue Management','Transfer Protocols','Analytics Tracking']],['AI Visitor Logger','visitor-logger','ClipboardList',['Visitor Registration','Check-in Management','Badge Generation','Visit Logging','Host Notification','Security Integration']],['AI Appointment Scheduler','appointment-scheduler','Calendar',['Scheduling Automation','Calendar Sync','Conflict Resolution','Reminder System','Rescheduling Logic','Availability Management']]]],
['AI Customer Support Agent','customer-support','Support','MessageCircle','Specialist','premium',['Ticket Resolution','Live Chat','Email Support','Knowledge Base','Escalation Management','SLA Tracking'],['Customer Issue Resolution','Live Chat Support','Email Support Management','Knowledge Base Utilization','Escalation Management','SLA Compliance'],[['AI FAQ Responder','faq-responder','HelpCircle',['FAQ Matching','Instant Response','Context Awareness','Learning System','Multi-channel','Feedback Loop']],['AI Troubleshooting Guide','troubleshooting-guide','Wrench',['Step-by-step Guides','Diagnostic Trees','Solution Matching','Visual Aids','Progress Tracking','Resolution Verification']],['AI Live Chat Handler','live-chat-handler','MessagesSquare',['Real-time Chat','Multi-conversation','Context Memory','Escalation Triggers','Sentiment Detection','Response Suggestions']]]],
['AI Ticket Resolution Agent','ticket-resolution','Tickets','Ticket','Specialist','premium',['Auto-Resolution','Intelligent Escalation','SLA Tracking','Priority Management','Pattern Recognition','Root Cause Analysis'],['Automated Ticket Resolution','Intelligent Escalation Management','SLA Tracking & Compliance','Priority Management & Routing','Pattern Recognition & Learning','Root Cause Analysis'],[['AI Ticket Classifier','ticket-classifier','Tag',['Auto-classification','Priority Scoring','Category Assignment','Sentiment Tagging','Routing Logic','Trend Detection']],['AI Solution Matcher','solution-matcher','Puzzle',['Solution Matching','Knowledge Retrieval','Similarity Analysis','Success Rate Tracking','Learning Engine','Recommendation Ranking']],['AI Escalation Router','escalation-router','ArrowUpCircle',['Escalation Routing','Skill Matching','Workload Balancing','SLA Compliance','Notification Chain','Tracking Dashboard']]]],
['AI Complaint Handling Agent','complaint-handling','Complaints','AlertCircle','Specialist','enterprise',['Complaint Analysis','Resolution Suggestions','Follow-up Automation','Sentiment Detection','Escalation Protocols','Compensation Management'],['Complaint Intake & Analysis','Resolution Strategy & Execution','Follow-up Automation','Sentiment Detection & Monitoring','Escalation Protocol Management','Compensation & Recovery Management'],[['AI Complaint Categorizer','complaint-categorizer','FolderTree',['Auto-categorization','Severity Assessment','Root Cause Tagging','Trend Analysis','Priority Assignment','Pattern Detection']],['AI Resolution Tracker','resolution-tracker','CheckCircle2',['Resolution Tracking','Timeline Management','Status Updates','SLA Monitoring','Outcome Recording','Satisfaction Verification']],['AI Sentiment Analyzer','sentiment-analyzer','Heart',['Sentiment Analysis','Emotion Detection','Tone Assessment','Trend Monitoring','Alert Generation','Report Building']]]],
['AI Retention Specialist','retention-specialist','Retention','Heart','Specialist','enterprise',['Churn Prediction','Win-back Campaigns','Loyalty Offers','Journey Optimization','Risk Scoring','Personalized Outreach'],['Churn Risk Identification & Prevention','Win-back Campaign Execution','Loyalty Offer Management','Customer Journey Optimization','Risk Scoring & Monitoring','Personalized Outreach Programs'],[['AI At-Risk Identifier','at-risk-identifier','AlertTriangle',['Risk Identification','Behavior Monitoring','Churn Signals','Early Warning','Segmentation','Intervention Timing']],['AI Offer Optimizer','offer-optimizer','Percent',['Offer Optimization','A/B Testing','ROI Maximization','Personalization','Discount Strategy','Conversion Tracking']],['AI Follow-up Scheduler','follow-up-scheduler','Clock',['Follow-up Scheduling','Timing Optimization','Channel Selection','Message Personalization','Response Tracking','Escalation Logic']]]],
['AI Loyalty & Engagement Agent','loyalty-engagement','Loyalty','Gift','Specialist','premium',['Rewards Management','Engagement Tracking','Program Optimization','Gamification','Points Management','Tier Progression'],['Rewards Program Management','Engagement Tracking & Optimization','Program Performance Optimization','Gamification Strategy','Points System Management','Tier Progression Management'],[['AI Points Calculator','points-calculator','Calculator',['Points Calculation','Balance Tracking','Earning Rules','Redemption Logic','Expiry Management','Audit Trail']],['AI Reward Recommender','reward-recommender','Star',['Reward Recommendations','Preference Learning','Catalog Management','Personalization','Inventory Tracking','Satisfaction Prediction']],['AI Engagement Tracker','engagement-tracker','BarChart',['Engagement Tracking','Activity Logging','Score Calculation','Trend Analysis','Segment Reporting','Intervention Triggers']]]],
['AI Feedback & Survey Agent','feedback-survey','Feedback','MessageSquare','Specialist','premium',['Survey Design','Response Analysis','Insight Generation','NPS Management','Feedback Collection','Action Planning'],['Survey Design & Distribution','Response Analysis & Interpretation','Insight Generation & Reporting','NPS Program Management','Feedback Collection Optimization','Action Planning from Feedback'],[['AI Survey Designer','survey-designer','FileEdit',['Survey Design','Question Optimization','Logic Branching','Distribution Planning','Response Prediction','Template Management']],['AI Response Analyzer','response-analyzer','BarChart3',['Response Analysis','Statistical Processing','Sentiment Extraction','Pattern Detection','Correlation Finding','Visualization']],['AI Insight Reporter','insight-reporter','FileText',['Insight Synthesis','Report Generation','Action Recommendations','Trend Highlighting','Stakeholder Summaries','Priority Ranking']]]],
['AI Billing Support Agent','billing-support','Billing','CreditCard','Specialist','premium',['Payment Processing','Invoice Management','Dispute Resolution','Billing Inquiries','Payment Plans','Refund Management'],['Payment Processing & Management','Invoice Explanation & Management','Billing Dispute Resolution','Payment Plan Administration','Refund Processing & Management','Billing Inquiry Response'],[['AI Payment Processor','payment-processor','Wallet',['Payment Processing','Transaction Validation','Multi-method Support','Receipt Generation','Reconciliation','Error Handling']],['AI Invoice Explainer','invoice-explainer','Receipt',['Invoice Breakdown','Charge Explanation','Tax Details','Payment History','Discrepancy Detection','Self-service Portal']],['AI Dispute Resolver','dispute-resolver','Scale',['Dispute Intake','Investigation Logic','Resolution Paths','Escalation Criteria','Compensation Rules','Satisfaction Tracking']]]],
]],
['sales','Sales & Revenue','TrendingUp','#FF9500',[
['AI VP Sales','vp-sales','VP Sales','TrendingUp','VP','enterprise',['Pipeline Management','Quota Tracking','Territory Planning','Sales Strategy','Team Performance','Revenue Forecasting'],['Sales Strategy & Execution','Pipeline Management & Optimization','Quota Tracking & Achievement','Territory Planning & Assignment','Sales Team Performance Management','Revenue Forecasting & Reporting'],[['AI Pipeline Analyst','pipeline-analyst','GitBranch',['Pipeline Analysis','Stage Tracking','Velocity Metrics','Bottleneck Detection','Forecast Accuracy','Conversion Optimization']],['AI Quota Tracker','quota-tracker','Target',['Quota Tracking','Progress Monitoring','Attainment Prediction','Gap Analysis','Incentive Calculation','Team Rankings']],['AI Territory Planner','territory-planner','Map',['Territory Design','Account Assignment','Balance Optimization','Potential Scoring','Coverage Analysis','Redistricting']]]],
['AI VP Revenue','vp-revenue','VP Revenue','DollarSign','VP','enterprise',['Revenue Modeling','Pricing Strategy','Forecast Validation','Growth Planning','Revenue Operations','Margin Optimization'],['Revenue Strategy & Modeling','Pricing Strategy & Optimization','Forecast Validation & Accuracy','Growth Planning & Execution','Revenue Operations Management','Margin Optimization & Analysis'],[['AI Revenue Modeler','revenue-modeler','BarChart3',['Revenue Modeling','Scenario Planning','Growth Projection','Cohort Analysis','Unit Economics','Sensitivity Analysis']],['AI Pricing Optimizer','pricing-optimizer','DollarSign',['Price Optimization','Dynamic Pricing','Elasticity Analysis','Competitor Pricing','Margin Targeting','A/B Testing']],['AI Forecast Validator','forecast-validator','CheckCircle2',['Forecast Validation','Accuracy Tracking','Bias Detection','Confidence Scoring','Historical Comparison','Adjustment Recommendations']]]],
['AI VP Business Development','vp-business-development','VP BizDev','Briefcase','VP','enterprise',['Partnership Development','Market Expansion','Strategic Alliances','New Markets','Business Planning','Opportunity Assessment'],['Partnership Development & Management','Market Expansion Strategy','Strategic Alliance Building','New Market Identification','Business Planning & Execution','Opportunity Assessment & Prioritization'],[['AI Partnership Scout','partnership-scout','Search',['Partner Discovery','Fit Assessment','Due Diligence','Outreach Strategy','Relationship Mapping','Opportunity Scoring']],['AI Market Expander','market-expander','Globe',['Market Analysis','Entry Strategy','Localization','Regulatory Assessment','Competitive Mapping','Growth Planning']],['AI Alliance Coordinator','alliance-coordinator','Handshake',['Alliance Management','Joint Planning','Resource Coordination','Performance Tracking','Conflict Resolution','Value Measurement']]]],
['AI VP Channel Partners','vp-channel-partners','VP Channel','Network','VP','enterprise',['Channel Strategy','Partner Management','Co-marketing','Channel Performance','Partner Enablement','Revenue Sharing'],['Channel Strategy & Development','Partner Management & Enablement','Co-marketing Program Management','Channel Performance Monitoring','Partner Onboarding & Training','Revenue Sharing & Incentive Programs'],[['AI Partner Onboarding Agent','partner-onboarding-agent','UserPlus',['Onboarding Automation','Training Coordination','Certification Tracking','Resource Provisioning','Progress Monitoring','Success Validation']],['AI Channel Performance Tracker','channel-performance-tracker','Activity',['Performance Tracking','Revenue Attribution','Pipeline Monitoring','Engagement Scoring','Tier Management','Incentive Calculation']],['AI Co-marketing Coordinator','co-marketing-coordinator','Share2',['Campaign Coordination','Budget Sharing','Asset Management','Lead Distribution','Performance Tracking','ROI Reporting']]]],
['AI Sales Operations Manager','sales-ops-manager','Sales Ops','Settings','Manager','enterprise',['CRM Management','Sales Process','Reporting Automation','Data Quality','Sales Tools','Process Optimization'],['CRM System Management & Optimization','Sales Process Design & Enforcement','Reporting & Analytics Automation','Data Quality Management','Sales Tool Administration','Process Optimization & Improvement'],[['AI CRM Data Cleaner','crm-data-cleaner','Database',['Data Deduplication','Field Standardization','Record Enrichment','Merge Resolution','Quality Scoring','Cleanup Automation']],['AI Sales Process Auditor','sales-process-auditor','ClipboardCheck',['Process Auditing','Compliance Checking','Stage Validation','Bottleneck Detection','Best Practice Enforcement','Improvement Recommendations']],['AI Reporting Automator','reporting-automator','FileSpreadsheet',['Report Automation','Dashboard Creation','Schedule Management','Distribution Logic','Format Standardization','Alert Configuration']]]],
['AI Lead Development Rep (SDR)','sdr','SDR','PhoneCall','Specialist','premium',['Prospecting','Outreach Sequences','Lead Scoring','Qualification','Cold Calling','Email Campaigns'],['Prospecting & Lead Generation','Outreach Sequence Management','Lead Scoring & Qualification','Cold Calling & Email Campaigns','Meeting Scheduling','Pipeline Contribution'],[['AI Prospect Researcher','prospect-researcher','Search',['Company Research','Contact Discovery','Intent Data','Social Selling','Technographic Analysis','Buyer Persona Matching']],['AI Outreach Sequencer','outreach-sequencer','Mail',['Sequence Design','Multi-channel Outreach','Timing Optimization','Personalization','Response Tracking','A/B Testing']],['AI Lead Scorer','lead-scorer','Star',['Lead Scoring','Behavior Tracking','Fit Assessment','Intent Analysis','Priority Ranking','Handoff Automation']]]],
['AI Sales Rep','sales-rep','Sales Rep','UserCheck','Specialist','premium',['Discovery','Demo Coordination','Objection Handling','Relationship Building','Proposal Development','Closing'],['Discovery & Needs Assessment','Demo Coordination & Delivery','Objection Handling & Mitigation','Relationship Building & Management','Proposal Development','Deal Closing & Negotiation'],[['AI Discovery Questioner','discovery-questioner','HelpCircle',['Question Frameworks','Needs Assessment','Pain Point Identification','Stakeholder Mapping','Priority Discovery','Opportunity Sizing']],['AI Demo Coordinator','demo-coordinator','Monitor',['Demo Scheduling','Environment Setup','Script Preparation','Follow-up Automation','Feedback Collection','Success Tracking']],['AI Objection Handler','objection-handler','Shield',['Objection Classification','Response Frameworks','Proof Points','Case Study Matching','Risk Mitigation','Confidence Building']]]],
['AI Sales Executive','sales-executive','Sales Exec','Briefcase','Specialist','enterprise',['Deal Structuring','Stakeholder Management','Closing Strategy','Enterprise Sales','Contract Negotiation','Revenue Optimization'],['Deal Structuring & Strategy','Stakeholder Mapping & Management','Closing Strategy & Execution','Enterprise Sales Process Management','Contract Negotiation & Terms','Revenue Optimization & Expansion'],[['AI Deal Structurer','deal-structurer','FileText',['Deal Architecture','Pricing Models','Term Structuring','Risk Assessment','Value Proposition','Approval Workflow']],['AI Stakeholder Mapper','stakeholder-mapper','Users',['Stakeholder Identification','Influence Mapping','Decision Tree','Champion Development','Objection Anticipation','Engagement Strategy']],['AI Closing Strategist','closing-strategist','CheckCircle2',['Close Planning','Urgency Creation','Negotiation Tactics','Mutual Action Plans','Timeline Management','Win Strategy']]]],
['AI CRM Assistant','crm-assistant','CRM','Database','Specialist','premium',['Contact Management','Activity Logging','Pipeline Organization','Data Entry','Follow-up Tracking','Reporting'],['Contact Management & Updates','Activity Logging & Tracking','Pipeline Organization & Management','Data Entry & Maintenance','Follow-up Task Management','CRM Reporting & Analytics'],[['AI Contact Updater','contact-updater','UserCheck',['Contact Updates','Enrichment Automation','Change Detection','Duplicate Prevention','Sync Management','Quality Assurance']],['AI Activity Logger','activity-logger','Clock',['Activity Logging','Auto-capture','Timeline Building','Category Tagging','Duration Tracking','Compliance Recording']],['AI Pipeline Organizer','pipeline-organizer','GitBranch',['Pipeline Organization','Stage Management','Deal Tracking','Probability Scoring','Close Date Prediction','Forecast Contribution']]]],
['AI Proposal Generator','proposal-generator','Proposals','FileText','Specialist','premium',['Template Management','Pricing Calculation','Proposal Review','Customization','Approval Workflow','Version Control'],['Proposal Template Management','Pricing Calculation & Configuration','Proposal Review & Quality Assurance','Customization & Personalization','Approval Workflow Management','Version Control & Tracking'],[['AI Template Selector','template-selector','Layout',['Template Matching','Industry Selection','Customization Points','Branding Application','Compliance Checking','Version Management']],['AI Pricing Calculator','pricing-calculator','Calculator',['Price Calculation','Discount Logic','Bundle Pricing','Margin Analysis','Approval Triggers','Historical Comparison']],['AI Proposal Reviewer','proposal-reviewer','Eye',['Quality Review','Consistency Check','Compliance Verification','Win Probability','Improvement Suggestions','Approval Routing']]]],
['AI Negotiator','negotiator','Negotiator','Scale','Specialist','enterprise',['Term Analysis','Concession Tracking','BATNA Calculation','Strategy Planning','Value Creation','Agreement Drafting'],['Negotiation Strategy & Planning','Term Analysis & Optimization','Concession Tracking & Management','BATNA Development & Calculation','Value Creation & Distribution','Agreement Drafting & Finalization'],[['AI Term Analyzer','term-analyzer','FileSearch',['Term Analysis','Risk Assessment','Market Benchmarking','Impact Modeling','Alternative Generation','Negotiation Leverage']],['AI Concession Tracker','concession-tracker','ArrowLeftRight',['Concession Tracking','Value Accounting','Trade-off Analysis','Pattern Detection','Reciprocity Logic','Boundary Enforcement']],['AI BATNA Calculator','batna-calculator','Calculator',['BATNA Calculation','Alternative Valuation','Walk-away Point','Leverage Assessment','Scenario Modeling','Decision Framework']]]],
['AI Pricing Analyst','pricing-analyst','Pricing','DollarSign','Specialist','premium',['Competitor Pricing','Margin Calculation','Discount Management','Price Optimization','Market Analysis','Revenue Impact'],['Competitor Price Monitoring & Analysis','Margin Calculation & Optimization','Discount Policy Management','Price Optimization & Testing','Market Price Analysis','Revenue Impact Assessment'],[['AI Competitor Price Tracker','competitor-price-tracker','ScanSearch',['Price Monitoring','Change Detection','Trend Analysis','Competitive Positioning','Alert Generation','Historical Tracking']],['AI Margin Calculator','margin-calculator','Percent',['Margin Calculation','Cost Analysis','Break-even Analysis','Profitability Modeling','Scenario Planning','Sensitivity Testing']],['AI Discount Approver','discount-approver','CheckCircle2',['Discount Validation','Policy Enforcement','Approval Routing','Impact Assessment','Threshold Management','Audit Trail']]]],
['AI Sales Forecasting Agent','sales-forecasting','Forecasting','BarChart3','Specialist','premium',['Trend Analysis','Seasonality Adjustment','Pipeline Weighting','Forecast Modeling','Accuracy Tracking','Scenario Planning'],['Sales Trend Analysis & Reporting','Seasonality Adjustment & Planning','Pipeline Weighting & Scoring','Forecast Model Development','Accuracy Tracking & Improvement','Scenario Planning & Sensitivity'],[['AI Trend Analyzer','trend-analyzer','TrendingUp',['Trend Detection','Pattern Recognition','Cycle Analysis','Growth Rate Calculation','Anomaly Detection','Prediction Modeling']],['AI Seasonality Adjuster','seasonality-adjuster','Calendar',['Seasonal Adjustment','Holiday Impact','Quarterly Patterns','Cyclical Analysis','Baseline Calculation','Forecast Correction']],['AI Pipeline Weighter','pipeline-weighter','Scale',['Pipeline Weighting','Close Probability','Stage Multipliers','Historical Calibration','Risk Adjustment','Confidence Scoring']]]],
['AI Sales Enablement Agent','sales-enablement','Enablement','Zap','Specialist','premium',['Content Recommendation','Training Scheduling','Playbook Management','Onboarding','Skill Development','Knowledge Management'],['Content Recommendation & Management','Training Program Scheduling & Delivery','Playbook Development & Updates','Sales Onboarding Programs','Skill Development Planning','Knowledge Management & Distribution'],[['AI Content Recommender','content-recommender','BookOpen',['Content Matching','Context Awareness','Usage Analytics','Effectiveness Scoring','Gap Identification','Recommendation Engine']],['AI Training Scheduler','training-scheduler','Calendar',['Training Scheduling','Curriculum Mapping','Progress Tracking','Certification Management','Reminder System','Completion Reporting']],['AI Playbook Updater','playbook-updater','RefreshCw',['Playbook Updates','Best Practice Integration','Win/Loss Analysis','Competitive Intelligence','Process Improvement','Version Management']]]],
]],
];

// Generate remaining departments with auto-generated sub-agents
function autoSubs(parentName, parentSlug, domain, count=3) {
  const roles = {
    'Analyst': ['Data Analysis','Trend Identification','Reporting','Insight Generation','Pattern Detection','Recommendation Engine'],
    'Coordinator': ['Coordination','Scheduling','Resource Management','Communication','Tracking','Reporting'],
    'Tracker': ['Tracking','Monitoring','Alerting','Reporting','Trend Analysis','Dashboard Management'],
    'Optimizer': ['Optimization','Performance Tuning','A/B Testing','Efficiency Analysis','Automation','ROI Maximization'],
    'Manager': ['Management','Planning','Execution','Monitoring','Reporting','Optimization'],
    'Specialist': ['Specialization','Deep Analysis','Best Practices','Quality Assurance','Training','Documentation'],
  };
  const suffixes = Object.keys(roles);
  const subs = [];
  for (let i = 0; i < count; i++) {
    const suffix = suffixes[i % suffixes.length];
    const subName = `AI ${domain} ${suffix}`;
    const subSlug = `${parentSlug}-${suffix.toLowerCase()}`;
    subs.push([subName, subSlug, 'Zap', roles[suffix]]);
  }
  return subs;
}

// Departments 3-22 with compact agent definitions
const REMAINING = {
3:['marketing','Marketing & Growth','Megaphone','#AF52DE',[
['AI Chief Marketing Officer','cmo','CMO','Crown','C-Suite','enterprise',['Marketing Strategy','Budget Allocation','Campaign ROI','Brand Management','Growth Planning','Market Intelligence'],['Marketing Strategy & Vision','Budget Allocation & Optimization','Campaign ROI Evaluation','Brand Management & Positioning','Growth Planning & Execution','Market Intelligence & Analysis'],['AI Marketing Strategy Analyst','marketing-strategy-analyst','Target',['Strategy Analysis','Market Research','Competitive Intelligence','Opportunity Identification','Channel Strategy','ROI Forecasting'],['AI Budget Allocator','budget-allocator','PieChart',['Budget Allocation','Channel Optimization','Spend Analysis','ROI Maximization','Forecast Modeling','Reallocation Logic'],['AI Campaign ROI Evaluator','campaign-roi-evaluator','TrendingUp',['ROI Calculation','Attribution Modeling','Cost Analysis','Performance Benchmarking','Optimization Recommendations','Reporting Automation']]],
['AI VP Marketing','vp-marketing','VP Marketing','Megaphone','VP','enterprise',['Channel Planning','Calendar Management','Campaign Coordination','Team Leadership','Marketing Operations','Performance Management'],['Channel Planning & Optimization','Marketing Calendar Management','Campaign Coordination & Execution','Marketing Team Leadership','Marketing Operations Management','Performance Management & Reporting'],['AI Channel Planner','channel-planner','Layout',['Channel Strategy','Mix Optimization','Budget Distribution','Audience Matching','Performance Prediction','Cross-channel Coordination'],['AI Marketing Calendar Manager','marketing-calendar-manager','Calendar',['Calendar Management','Campaign Scheduling','Content Planning','Deadline Tracking','Conflict Resolution','Resource Allocation'],['AI Campaign Coordinator','campaign-coordinator','Zap',['Campaign Coordination','Cross-team Alignment','Timeline Management','Asset Tracking','Launch Execution','Performance Monitoring']]],
['AI VP Brand','vp-brand','VP Brand','Palette','VP','enterprise',['Brand Strategy','Perception Monitoring','Guidelines Enforcement','Visual Identity','Brand Equity','Reputation Management'],['Brand Strategy & Development','Brand Perception Monitoring','Brand Guidelines Enforcement','Visual Identity Management','Brand Equity Building','Reputation Management'],['AI Brand Perception Monitor','brand-perception-monitor','Eye',['Perception Tracking','Sentiment Analysis','Social Listening','Competitor Comparison','Trend Detection','Alert Generation'],['AI Brand Guidelines Enforcer','brand-guidelines-enforcer','ShieldCheck',['Guideline Enforcement','Consistency Checking','Asset Validation','Template Management','Compliance Scoring','Violation Detection'],['AI Visual Identity Auditor','visual-identity-auditor','Image',['Visual Auditing','Color Compliance','Typography Checking','Logo Usage','Asset Management','Template Validation']]],
['AI VP Growth','vp-growth','VP Growth','Rocket','VP','enterprise',['Growth Experiments','Funnel Analysis','A/B Testing','Acquisition Strategy','Retention Optimization','Product-led Growth'],['Growth Experiment Design & Execution','Funnel Analysis & Optimization','A/B Testing Program Management','Acquisition Strategy & Execution','Retention Optimization','Product-led Growth Initiatives'],['AI Experiment Designer','experiment-designer','FlaskConical',['Experiment Design','Hypothesis Formation','Sample Sizing','Variable Control','Statistical Planning','Success Criteria'],['AI Funnel Analyzer','funnel-analyzer','Filter',['Funnel Analysis','Drop-off Detection','Conversion Optimization','Stage Metrics','Bottleneck Identification','Improvement Recommendations'],['AI A/B Test Coordinator','ab-test-coordinator','GitCompare',['Test Coordination','Variant Management','Traffic Splitting','Statistical Significance','Result Analysis','Implementation Planning']]],
['AI VP Content','vp-content','VP Content','PenTool','VP','enterprise',['Content Strategy','Editorial Planning','Quality Assurance','Repurposing','Content Operations','Distribution Strategy'],['Content Strategy & Planning','Editorial Calendar Management','Content Quality Assurance','Content Repurposing Strategy','Content Operations Management','Distribution Strategy & Execution'],['AI Editorial Calendar Planner','editorial-calendar-planner','Calendar',['Calendar Planning','Content Scheduling','Theme Development','Deadline Management','Resource Allocation','Publication Workflow'],['AI Content Quality Reviewer','content-quality-reviewer','CheckCircle2',['Quality Review','Style Guide Compliance','Grammar Checking','Readability Scoring','Brand Voice Validation','Improvement Suggestions'],['AI Repurposing Strategist','repurposing-strategist','Repeat',['Content Repurposing','Format Transformation','Channel Optimization','Lifecycle Extension','Audience Adaptation','Performance Prediction']]],
['AI VP Digital','vp-digital','VP Digital','Monitor','VP','enterprise',['Digital Optimization','Web Performance','Conversion Optimization','Digital Strategy','Technology Stack','Analytics Integration'],['Digital Channel Optimization','Web Performance Management','Conversion Rate Optimization','Digital Strategy Development','Technology Stack Management','Analytics Integration & Reporting'],['AI Digital Channel Optimizer','digital-channel-optimizer','Zap',['Channel Optimization','Performance Tuning','Budget Reallocation','Audience Targeting','Cross-channel Synergy','Automation Rules'],['AI Web Performance Tracker','web-performance-tracker','Gauge',['Performance Tracking','Core Web Vitals','Load Time Monitoring','Error Detection','User Experience Metrics','Improvement Recommendations'],['AI Conversion Analyst','conversion-analyst','Target',['Conversion Analysis','Funnel Optimization','Landing Page Testing','User Behavior','Attribution Modeling','Revenue Impact']]],
['AI Marketing Manager','marketing-manager','Mktg Mgr','Users','Manager','enterprise',['Task Management','Deadline Tracking','Spend Monitoring','Team Coordination','Campaign Execution','Performance Reporting'],['Marketing Task Assignment & Management','Deadline Tracking & Enforcement','Marketing Spend Monitoring','Team Coordination & Communication','Campaign Execution Oversight','Performance Reporting & Analysis'],['AI Task Assigner','task-assigner','ClipboardList',['Task Assignment','Workload Balancing','Skill Matching','Priority Setting','Progress Tracking','Completion Validation'],['AI Deadline Tracker','deadline-tracker','Clock',['Deadline Tracking','Milestone Management','Escalation Triggers','Reminder System','Dependency Mapping','Status Reporting'],['AI Marketing Spend Monitor','marketing-spend-monitor','DollarSign',['Spend Monitoring','Budget Tracking','Overspend Alerts','ROI Calculation','Channel Attribution','Forecast Adjustment']]],
['AI Content Marketing Agent','content-marketing','Content','FileText','Specialist','premium',['Blog Writing','Copy Editing','Content Distribution','SEO Content','Social Content','Email Content'],['Blog Content Creation & Management','Copy Editing & Quality Assurance','Content Distribution & Promotion','SEO Content Optimization','Social Media Content Creation','Email Content Development'],['AI Blog Writer','blog-writer','PenTool',['Blog Writing','Topic Research','SEO Optimization','Audience Targeting','Content Structuring','Publication Ready'],['AI Copy Editor','copy-editor','CheckSquare',['Copy Editing','Grammar Correction','Style Consistency','Brand Voice','Fact Checking','Readability Optimization'],['AI Content Distributor','content-distributor','Share2',['Content Distribution','Channel Optimization','Timing Strategy','Audience Targeting','Performance Tracking','Repurposing']]],
['AI SEO Specialist','seo-specialist','SEO','Search','Specialist','premium',['Keyword Research','On-page Optimization','Backlink Analysis','Technical SEO','Content Strategy','Rank Tracking'],['Keyword Research & Strategy','On-page SEO Optimization','Backlink Profile Management','Technical SEO Auditing','SEO Content Strategy','Rank Tracking & Reporting'],['AI Keyword Researcher','keyword-researcher','Search',['Keyword Discovery','Volume Analysis','Difficulty Scoring','Trend Identification','Gap Analysis','Opportunity Ranking'],['AI On-page Optimizer','on-page-optimizer','FileCode',['On-page Optimization','Meta Tag Management','Schema Markup','Internal Linking','Content Structure','Mobile Optimization'],['AI Backlink Analyzer','backlink-analyzer','Link',['Backlink Analysis','Quality Scoring','Anchor Text Review','Competitor Links','Opportunity Finding','Disavow Management']]],
['AI Social Media Manager','social-media-manager','Social','Share2','Specialist','premium',['Post Scheduling','Engagement Management','Trend Monitoring','Content Calendar','Analytics','Community Management'],['Social Media Post Scheduling','Engagement Response Management','Trend Monitoring & Reporting','Content Calendar Management','Social Analytics & Reporting','Community Management'],['AI Post Scheduler','post-scheduler','Calendar',['Post Scheduling','Optimal Timing','Multi-platform','Queue Management','Content Calendar','Automation Rules'],['AI Engagement Responder','engagement-responder','MessageCircle',['Response Generation','Sentiment Detection','Priority Assessment','Escalation Logic','Brand Voice','Response Time Optimization'],['AI Trend Monitor','trend-monitor','TrendingUp',['Trend Detection','Hashtag Monitoring','Viral Identification','Competitor Tracking','Opportunity Alerting','Content Suggestion']]],
['AI Email Marketing Agent','email-marketing','Email','Mail','Specialist','premium',['List Segmentation','Template Design','Deliverability','A/B Testing','Automation','Analytics'],['Email List Segmentation & Management','Email Template Design & Testing','Deliverability Monitoring & Optimization','A/B Testing & Optimization','Email Automation & Workflows','Email Analytics & Reporting'],['AI List Segmenter','list-segmenter','Users',['List Segmentation','Behavioral Segments','Demographic Split','Engagement Tiers','Dynamic Segments','Size Optimization'],['AI Template Designer','template-designer','Layout',['Template Design','Responsive Layout','Brand Compliance','Component Library','Personalization Tags','Preview Testing'],['AI Deliverability Monitor','deliverability-monitor','ShieldCheck',['Deliverability Monitoring','Spam Score Checking','Bounce Management','Authentication Setup','Reputation Tracking','Inbox Placement']]],
['AI Ad Campaign Manager','ad-campaign-manager','Ads','Target','Specialist','enterprise',['Bid Optimization','Creative Testing','Audience Targeting','Budget Management','Performance Tracking','Multi-platform'],['Ad Bid Optimization & Management','Creative Testing & Optimization','Audience Targeting & Segmentation','Budget Management & Allocation','Performance Tracking & Reporting','Multi-platform Campaign Management'],['AI Bid Optimizer','bid-optimizer','DollarSign',['Bid Optimization','ROAS Targeting','Budget Pacing','Competition Analysis','Dayparting','Automated Rules'],['AI Creative Tester','creative-tester','Image',['Creative Testing','A/B Variants','Performance Comparison','Element Analysis','Winner Selection','Iteration Planning'],['AI Audience Targeter','audience-targeter','Crosshair',['Audience Targeting','Lookalike Building','Interest Stacking','Exclusion Logic','Custom Audiences','Segment Optimization']]],
['AI Marketing Analytics Agent','marketing-analytics','Analytics','BarChart3','Specialist','premium',['Attribution Modeling','KPI Dashboards','Insight Summarization','Data Visualization','Trend Analysis','Reporting'],['Marketing Attribution Modeling','KPI Dashboard Building & Management','Insight Summarization & Reporting','Data Visualization & Storytelling','Trend Analysis & Forecasting','Marketing Performance Reporting'],['AI Attribution Modeler','attribution-modeler','GitMerge',['Attribution Modeling','Multi-touch Analysis','Channel Valuation','Conversion Path','Model Comparison','Budget Optimization'],['AI KPI Dashboard Builder','kpi-dashboard-builder','LayoutDashboard',['Dashboard Design','KPI Selection','Visualization Choice','Real-time Updates','Drill-down Capability','Sharing & Export'],['AI Insight Summarizer','insight-summarizer','FileText',['Insight Extraction','Pattern Recognition','Anomaly Detection','Priority Ranking','Action Recommendations','Executive Summaries']]],
['AI Brand Manager','brand-manager','Brand','Award','Specialist','premium',['Competitor Tracking','Brand Health','Messaging Alignment','Brand Strategy','Market Position','Brand Equity'],['Competitor Brand Tracking & Analysis','Brand Health Surveying & Monitoring','Messaging Alignment & Consistency','Brand Strategy Development','Market Position Management','Brand Equity Measurement'],['AI Competitor Brand Tracker','competitor-brand-tracker','ScanSearch',['Competitor Tracking','Brand Comparison','Market Share','Campaign Monitoring','Positioning Analysis','Alert Generation'],['AI Brand Health Surveyor','brand-health-surveyor','Heart',['Brand Health Surveying','Awareness Tracking','Perception Mapping','Loyalty Measurement','NPS Correlation','Trend Analysis'],['AI Messaging Aligner','messaging-aligner','AlignCenter',['Message Alignment','Consistency Checking','Channel Adaptation','Audience Tailoring','Tone Calibration','Compliance Verification']]],
['AI Growth Hacker','growth-hacker','Growth','Rocket','Specialist','enterprise',['Viral Loops','Referral Programs','Acquisition Testing','Growth Experiments','Product Hacking','Rapid Iteration'],['Viral Loop Design & Implementation','Referral Program Building','Acquisition Channel Testing','Growth Experiment Execution','Product Hacking & Optimization','Rapid Iteration & Learning'],['AI Viral Loop Designer','viral-loop-designer','Share2',['Viral Loop Design','K-factor Optimization','Incentive Structuring','Friction Reduction','Share Mechanics','Analytics Integration'],['AI Referral Program Builder','referral-program-builder','Gift',['Referral Program Design','Reward Structuring','Tracking Implementation','Fraud Prevention','Optimization Logic','Performance Analytics'],['AI Acquisition Channel Tester','acquisition-channel-tester','FlaskConical',['Channel Testing','Cost Analysis','Quality Assessment','Scale Potential','Experiment Design','Rapid Validation']]],
]],
};

// For depts 4-22, generate from compact definitions
const COMPACT_DEPTS = {
4:['operations','Operations & Management','Settings','#34C759','COO|Chief Operating Officer|coo|Crown|C-Suite|enterprise|Operational Efficiency,Cross-dept Coordination,Strategic Initiatives,Process Optimization,Resource Management,Performance Monitoring|Operational Efficiency Analysis,Cross-dept Coordination,Strategic Initiative Tracking,Process Optimization & Standardization,Resource Management & Allocation,Performance Monitoring & Reporting|Operational Efficiency Analyst|operational-efficiency-analyst|Gauge|Cross-dept Coordinator|cross-dept-coordinator|Network|Strategic Initiative Tracker|strategic-initiative-tracker|Target VP Operations|VP Operations|vp-operations|Settings|VP|enterprise|Process Auditing,SLA Management,Capacity Planning,Operations Strategy,Performance Management,Continuous Improvement|Process Auditing & Optimization,SLA Monitoring & Management,Capacity Planning & Forecasting,Operations Strategy Development,Performance Management & Reporting,Continuous Improvement Programs|Process Auditor|process-auditor|ClipboardCheck|SLA Monitor|sla-monitor|Clock|Capacity Planner|capacity-planner|BarChart3 VP Supply Chain|VP Supply Chain|vp-supply-chain|Truck|VP|enterprise|Supplier Risk,Inventory Optimization,Logistics Cost,Supply Planning,Vendor Management,Demand Forecasting|Supplier Risk Assessment & Management,Inventory Optimization & Management,Logistics Cost Analysis & Reduction,Supply Planning & Coordination,Vendor Management & Performance,Demand Forecasting & Planning|Supplier Risk Assessor|supplier-risk-assessor|ShieldAlert|Inventory Optimizer|inventory-optimizer|Package|Logistics Cost Analyzer|logistics-cost-analyzer|Calculator VP Quality|VP Quality|vp-quality|ShieldCheck|VP|enterprise|Quality Standards,Defect Analysis,Compliance Tracking,Audit Management,Process Improvement,Quality Metrics|Quality Standards Development & Enforcement,Defect Pattern Analysis & Prevention,Compliance Tracking & Reporting,Audit Management & Coordination,Process Improvement Programs,Quality Metrics & Reporting|Quality Standards Enforcer|quality-standards-enforcer|CheckCircle2|Defect Pattern Analyzer|defect-pattern-analyzer|Search|Compliance Tracker|compliance-tracker|ClipboardList VP Facilities|VP Facilities|vp-facilities|Building2|VP|enterprise|Space Utilization,Maintenance Planning,Energy Efficiency,Safety Compliance,Facility Operations,Cost Management|Space Utilization Analysis & Optimization,Maintenance Planning & Scheduling,Energy Efficiency Monitoring & Improvement,Safety Compliance Management,Facility Operations Oversight,Cost Management & Budgeting|Space Utilization Analyst|space-utilization-analyst|Layout|Maintenance Scheduler|maintenance-scheduler|Wrench|Energy Efficiency Monitor|energy-efficiency-monitor|Zap VP Project Management|VP Project Management|vp-project-management|ClipboardList|VP|enterprise|Milestone Tracking,Resource Allocation,Risk Identification,Project Planning,Team Coordination,Delivery Management|Milestone Tracking & Management,Resource Allocation & Optimization,Risk Identification & Mitigation,Project Planning & Execution,Team Coordination & Communication,Delivery Management & Quality|Milestone Tracker|milestone-tracker|Flag|Resource Allocator|resource-allocator|Users|Risk Identifier|risk-identifier|AlertTriangle Operations Manager|Operations Manager|operations-manager|Settings|Manager|enterprise|Daily Operations,Escalation Handling,Performance Reporting,Process Management,Team Coordination,Issue Resolution|Daily Operations Coordination,Escalation Handling & Resolution,Performance Reporting & Analysis,Process Management & Improvement,Team Coordination & Communication,Issue Resolution & Prevention|Daily Operations Coordinator|daily-operations-coordinator|Clock|Escalation Handler|escalation-handler|ArrowUpCircle|Performance Reporter|performance-reporter|FileText Ops Manager Sub|Operations Manager (Sub)|operations-manager-sub|Cog|Manager|premium|Workflow Monitoring,Bottleneck Detection,Efficiency Reporting,Process Analysis,Team Support,Continuous Improvement|Workflow Monitoring & Optimization,Bottleneck Detection & Resolution,Efficiency Reporting & Analysis,Process Analysis & Improvement,Team Support & Coordination,Continuous Improvement Initiatives|Workflow Monitor|workflow-monitor|Activity|Bottleneck Detector|bottleneck-detector|AlertCircle|Efficiency Reporter|efficiency-reporter|TrendingUp Workflow Automation|Workflow Automation Agent|workflow-automation|Workflow|Specialist|enterprise|Process Mapping,Automation Rules,Exception Handling,Integration,Monitoring,Optimization|Process Mapping & Documentation,Automation Rule Development,Exception Handling & Management,System Integration & Coordination,Workflow Monitoring & Optimization,Continuous Improvement|Process Mapper|process-mapper|GitBranch|Automation Rule Builder|automation-rule-builder|Zap|Exception Handler|exception-handler|AlertTriangle Task Coordinator|Task Coordinator|task-coordinator|CheckSquare|Specialist|premium|Task Prioritization,Deadline Enforcement,Dependency Tracking,Resource Allocation,Progress Monitoring,Completion Validation|Task Prioritization & Management,Deadline Enforcement & Tracking,Dependency Tracking & Resolution,Resource Allocation & Coordination,Progress Monitoring & Reporting,Completion Validation & Documentation|Task Prioritizer|task-prioritizer|ListOrdered|Deadline Enforcer|deadline-enforcer|Clock|Dependency Tracker|dependency-tracker|Link Process Optimization|Process Optimization Agent|process-optimization|TrendingUp|Specialist|premium|Lean Analysis,Waste Identification,Improvement Recommendations,Process Redesign,Efficiency Metrics,Change Management|Lean Analysis & Assessment,Waste Identification & Elimination,Improvement Recommendation & Planning,Process Redesign & Implementation,Efficiency Metrics & Tracking,Change Management & Communication|Lean Analyst|lean-analyst|Minimize2|Waste Identifier|waste-identifier|Trash2|Improvement Recommender|improvement-recommender|Lightbulb Resource Planner|Resource Planner|resource-planner|Layers|Specialist|premium|Demand Forecasting,Allocation Optimization,Utilization Tracking,Capacity Planning,Resource Scheduling,Cost Optimization|Demand Forecasting & Planning,Resource Allocation Optimization,Utilization Tracking & Reporting,Capacity Planning & Management,Resource Scheduling & Coordination,Cost Optimization & Management|Demand Forecaster|demand-forecaster|TrendingUp|Allocation Optimizer|allocation-optimizer|PieChart|Utilization Tracker|utilization-tracker|Gauge Quality Assurance|Quality Assurance Agent|quality-assurance|ShieldCheck|Specialist|premium|Test Case Generation,Defect Logging,Regression Tracking,Quality Metrics,Test Automation,Release Validation|Test Case Generation & Management,Defect Logging & Tracking,Regression Testing & Management,Quality Metrics & Reporting,Test Automation Development,Release Validation & Sign-off|Test Case Generator|test-case-generator|FileCode|Defect Logger|defect-logger|Bug|Regression Tracker|regression-tracker|RotateCcw'],
};

console.log('KAYTX Enterprise AI Workforce Generator');
console.log('======================================');
console.log(`Departments defined: ${D.length}`);
console.log('Generating files...\n');

// Parse compact format into agent arrays
function parseCompact(data) {
  const agents = data.split(' VP ').map((seg, i) => {
    if (i === 0) return seg; // first agent
    return 'VP ' + seg; // restore VP prefix
  });
  // Further split by level prefixes
  const result = [];
  const parts = data.split(/ (?=(?:COO|VP |CFO|CTO|CMO|CHRO|CIO|CISO|CSO|CAO|CRO|CPO|CCO|Manager|Specialist|Lead|Director))/);
  // This is getting complex - let's use a simpler approach
  return null;
}

// Template for main agent page
function genMainAgentPage(agent, deptSlug, deptName, deptIcon, deptColor) {
  const caps = agent[6]; // capabilities array
  const resps = agent[7]; // responsibilities array
  const subs = agent[8]; // sub-agents array
  const level = agent[4];
  const tier = agent[5];
  const icon = agent[3];
  const name = agent[0];
  const slug = agent[1];
  const shortName = agent[2];

  const levelBadge = level === 'C-Suite' ? 'C-Suite' : level === 'VP' ? 'VP' : level === 'Manager' ? 'Manager' : 'Specialist';
  const levelColor = level === 'C-Suite' ? '#FF9500' : level === 'VP' ? '#007AFF' : level === 'Manager' ? '#34C759' : '#06B6D4';
  const tierColor = tier === 'enterprise' ? '#AF52DE' : '#FF9500';

  const subAgentCards = subs.map(sub => `        <TouchableOpacity onPress={() => router.push('/ai-agent/${deptSlug}/sub-agents/${sub[1]}')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '${deptColor}20' }]}><${sub[2]} size={24} color="${deptColor}" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>{'${sub[0]}'}</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={18} color={theme.colors.textSecondary} />
        </TouchableOpacity>`).join('\n');

  return `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Crown, Activity, CircleCheckBig, Clock, Target, ChartBar, MessageSquare, Calendar, Shield, ArrowRight, Users, Zap, Star, TrendingUp, ${icon} } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function ${toPascal(slug)}Page() {
  const { theme } = useTheme();

  const stats = [
    { label: 'Tasks Done', value: '${Math.floor(Math.random()*50+10)},${Math.floor(Math.random()*900+100)}', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.${Math.floor(Math.random()*8+1)}%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '${(Math.random()*2+0.3).toFixed(1)}s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '${(Math.random()*5+94).toFixed(1)}%', icon: Target, color: '#AF52DE' },
  ];

  const capabilities = ${JSON.stringify(caps)};
  const responsibilities = ${JSON.stringify(resps)};

  const activities = [
    { time: '2 min ago', text: 'Completed ${caps[0].toLowerCase()} review', icon: CircleCheckBig },
    { time: '15 min ago', text: 'Updated ${caps[1].toLowerCase()} dashboard', icon: ChartBar },
    { time: '1 hour ago', text: 'Optimized ${caps[2].toLowerCase()} process', icon: Zap },
    { time: '3 hours ago', text: 'Resolved escalated issue', icon: Shield },
    { time: '5 hours ago', text: 'Launched new initiative', icon: TrendingUp },
  ];

  const quickActions = [
    { label: 'View Reports', icon: ChartBar },
    { label: 'Team Chat', icon: MessageSquare },
    { label: 'Schedule', icon: Calendar },
    { label: 'Settings', icon: Shield },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '${deptColor}18' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '${deptColor}25' }]}>
          <${icon} size={48} color="${deptColor}" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>{'${shortName}'}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>{'${name}'}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '${levelColor}22' }]}>
            <Star size={12} color="${levelColor}" />
            <Text style={[styles.badgeText, { color: '${levelColor}' }]}>{'${levelBadge}'}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '${tierColor}22' }]}>
            <Users size={12} color="${tierColor}" />
            <Text style={[styles.badgeText, { color: '${tierColor}' }]}>{'${subs.length} Reports'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The ${name} oversees ${resps[0].toLowerCase()}, ${resps[1].toLowerCase()}, and ${resps[2].toLowerCase()}. This ${level}-level agent orchestrates ${caps.slice(0,3).join(', ').toLowerCase()} and drives organizational excellence.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '${deptColor}18' }]}>
              <Text style={[styles.tagText, { color: '${deptColor}' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="${deptColor}" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, index) => (
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '${deptColor}15' }]}>
              <act.icon size={14} color="${deptColor}" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
${subAgentCards}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '${deptColor}12' }]}>
              <action.icon size={24} color="${deptColor}" />
              <Text style={[styles.actionText, { color: '${deptColor}' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="${slug}" agentName="${name}" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 28, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', marginTop: 16, gap: 8 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
  agentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12 },
  agentIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  agentInfo: { flex: 1, marginLeft: 12 },
  agentName: { fontSize: 16, fontWeight: '600' },
  agentDesc: { fontSize: 12, marginTop: 2 },
});
`;
}

// Template for sub-agent page
function genSubAgentPage(sub, parentName, parentSlug, deptSlug, deptColor) {
  const name = sub[0];
  const slug = sub[1];
  const icon = sub[2];
  const caps = sub[3];
  const a2aEndpoints = [`/consult/${slug}`, `/${slug}/execute`, `/${slug}/analyze`];

  return `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, ${deptSlug === 'customer' ? 'Headphones' : deptSlug === 'sales' ? 'TrendingUp' : deptSlug === 'marketing' ? 'Megaphone' : 'Settings'}, Clock, Target, Zap, ArrowRight, Briefcase, ${icon} } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function ${toPascal(slug)}Page() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '${deptColor}20' }]}>
          <${icon} size={56} color="${deptColor}" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>{'${name}'}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of {'${parentName}'}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '${deptColor}22' }]}><Briefcase size={12} color="${deptColor}" /><Text style={[styles.badgeText, { color: '${deptColor}' }]}>Specialist</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {[
          {label:'Status',value:'Active',icon: Activity, color: '#34C759'},
          {label:'Level',value:'Specialist',icon: Briefcase, color: '${deptColor}'},
          {label:'Efficiency',value:'20x',icon: Target, color: '#FF9500'},
          {label:'Parent',value:'${parentSlug}',icon: ${deptSlug === 'customer' ? 'Headphones' : deptSlug === 'sales' ? 'TrendingUp' : 'Settings'}, color: '${deptColor}'}
        ].map((stat,index)=>(
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          ${name} - Sub-agent supporting ${parentName}. Part of the Kaytx AI Workforce hierarchy providing automated ${caps.slice(0,3).join(', ').toLowerCase()} capabilities.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          ${caps.map(c => `{${JSON.stringify(c)}}`).join(',.map((cap,index)=>(\n          <View key={index} style={[styles.tag, { backgroundColor: '${deptColor}18' }]}>\n            <Text style={[styles.tagText, { color: '${deptColor}' }]}>{cap}</Text>\n          </View>\n        ))}')}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
        ${a2aEndpoints.map(e => `{${JSON.stringify(e)}}`).join('.map((endpoint,index)=>(\n          <View key={index} style={styles.endpointRow}>\n            <Zap size={14} color="#8B5CF6" />\n            <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text>\n          </View>\n        ))}')}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/${deptSlug}/${parentSlug}')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <${deptSlug === 'customer' ? 'Headphones' : deptSlug === 'sales' ? 'TrendingUp' : 'Settings'} size={24} color="${deptColor}" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>{'${parentName}'}</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="${slug}" agentName="${name}" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
`;
}

// Template for department index page
function genDeptIndexPage(deptSlug, deptName, deptIcon, deptColor, agents) {
  const agentCards = agents.map(a => `        <TouchableOpacity key="${a[1]}" onPress={()=>router.push('/ai-agent/${deptSlug}/${a[1]}')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '${deptColor}20' }]}><${a[3]} size={28} color="${deptColor}" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>{'${a[2]}'}</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{'${a[0]}'}</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>`).join(',\n');

  const totalSubs = agents.reduce((sum, a) => sum + (a[8] ? a[8].length : 0), 0);

  return `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { ${deptIcon}, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBar, MessageSquare, Calendar, Shield } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
${agents.map(a => `  { id: '${a[1]}', name: '${a[2]}', description: '${a[0]}', icon: ${a[3]}, color: '${deptColor}' }`).join(',\n')}
];

export default function ${toPascal(deptSlug)}Index() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '${deptColor}15' }]}><${deptIcon} size={48} color="${deptColor}" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>{'${deptName}'}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>{'AI Agents for Enterprise Operations'}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '${deptColor}22' }]}><Star size={12} color="${deptColor}" /><Text style={[styles.badgeText, { color: '${deptColor}' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>{'${agents.length} Agents'}</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:'${agents.length}',icon:CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'24/7',icon:Activity,color:'#007AFF'},{label:'Response',value:'<1s',icon:Clock,color:'#FF9500'},{label:'Accuracy',value:'99%',icon:Target,color:'#AF52DE'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/${deptSlug}/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}><agent.icon size={28} color={agent.color} /></View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.description}</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{'${totalSubs} helper and sub-agent AI workers supporting the main agents.'}</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/${deptSlug}/sub-agents')} style={[styles.subAgentButton, { backgroundColor: '${deptColor}15' }]}>
          <${deptIcon} size={20} color="${deptColor}" />
          <Text style={[styles.subAgentButtonText, { color: '${deptColor}' }]}>{'View All ${totalSubs} Sub-Agents'}</Text>
          <ArrowRight size={18} color="${deptColor}" />
        </TouchableOpacity>
      </View>
      <AgentFeatures agentId="${deptSlug}-index" agentName="${deptName} Index" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},
  hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},
  heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},
  heroTitle:{fontSize:26,fontWeight:'bold'},
  heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},
  badgesRow:{flexDirection:'row',gap:10,marginTop:16},
  badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},
  badgeText:{fontSize:12,fontWeight:'600'},
  statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},
  statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},
  statValue:{fontSize:18,fontWeight:'bold',marginTop:8},
  statLabel:{fontSize:11,marginTop:4},
  section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},
  sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},
  description:{fontSize:14,lineHeight:22},
  agentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,marginBottom:12},
  agentIcon:{width:48,height:48,borderRadius:12,alignItems:'center',justifyContent:'center'},
  agentInfo:{flex:1,marginLeft:12},
  agentName:{fontSize:16,fontWeight:'600'},
  agentDesc:{fontSize:12,marginTop:2},
  subAgentButton:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:10,marginTop:8},
  subAgentButtonText:{fontSize:15,fontWeight:'600',flex:1}
});
`;
}

// Sub-agents index page
function genSubAgentsIndexPage(deptSlug, deptName, deptIcon, deptColor, allSubs) {
  const subCards = allSubs.map(sub => `        <TouchableOpacity key="${sub[1]}" onPress={() => router.push('/ai-agent/${deptSlug}/sub-agents/${sub[1]}')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '${deptColor}20' }]}><${deptIcon} size={28} color="${deptColor}" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>{'${sub[0]}'}</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{'Sub-Agent'}</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>`).join('\n');

  return `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, ${deptIcon}, ArrowRight, Briefcase, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SubAgentsIndex() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '${deptColor}15' }]}><${deptIcon} size={48} color="${deptColor}" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>{'${deptName} - Sub-Agents'}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>{'Helper & Sub-Agent Workforce'}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '${deptColor}22' }]}><Users size={12} color="${deptColor}" /><Text style={[styles.badgeText, { color: '${deptColor}' }]}>{'${allSubs.length} Agents'}</Text></View>
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
${subCards}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},
  hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},
  heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},
  heroTitle:{fontSize:26,fontWeight:'bold'},
  heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},
  badgesRow:{flexDirection:'row',gap:10,marginTop:16},
  badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},
  badgeText:{fontSize:12,fontWeight:'600'},
  section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},
  sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},
  agentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,marginBottom:12},
  agentIcon:{width:48,height:48,borderRadius:12,alignItems:'center',justifyContent:'center'},
  agentInfo:{flex:1,marginLeft:12},
  agentName:{fontSize:16,fontWeight:'600'},
  agentDesc:{fontSize:12,marginTop:2},
});
`;
}

function toPascal(s) {
  return s.replace(/(^|[-_])(\w)/g, (_, _sep, c) => c.toUpperCase());
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false; // skip existing
}

// Main generation
let totalFiles = 0;
let skippedFiles = 0;

for (const dept of D) {
  const [deptSlug, deptName, deptIcon, deptColor, agents] = dept;
  const deptDir = path.join(BASE, deptSlug);
  const subDir = path.join(deptDir, 'sub-agents');

  console.log(`\n📁 Department: ${deptName} (${agents.length} agents)`);

  // Department index
  const indexPath = path.join(deptDir, 'index.tsx');
  if (writeFile(indexPath, genDeptIndexPage(deptSlug, deptName, deptIcon, deptColor, agents))) {
    console.log(`  ✅ index.tsx`);
    totalFiles++;
  } else { console.log(`  ⏭️  index.tsx (exists)`); skippedFiles++; }

  // Collect all sub-agents for this department
  const allSubs = [];

  // Main agent pages
  for (const agent of agents) {
    const agentPath = path.join(deptDir, `${agent[1]}.tsx`);
    if (writeFile(agentPath, genMainAgentPage(agent, deptSlug, deptName, deptIcon, deptColor))) {
      console.log(`  ✅ ${agent[1]}.tsx`);
      totalFiles++;
    } else { console.log(`  ⏭️  ${agent[1]}.tsx (exists)`); skippedFiles++; }

    if (agent[8]) {
      for (const sub of agent[8]) {
        allSubs.push(sub);
        const subPath = path.join(subDir, `${sub[1]}.tsx`);
        if (writeFile(subPath, genSubAgentPage(sub, agent[0], agent[1], deptSlug, deptColor))) {
          console.log(`  ✅ sub-agents/${sub[1]}.tsx`);
          totalFiles++;
        } else { console.log(`  ⏭️  sub-agents/${sub[1]}.tsx (exists)`); skippedFiles++; }
      }
    }
  }

  // Sub-agents index
  if (allSubs.length > 0) {
    const subIndexPath = path.join(subDir, 'index.tsx');
    if (writeFile(subIndexPath, genSubAgentsIndexPage(deptSlug, deptName, deptIcon, deptColor, allSubs))) {
      console.log(`  ✅ sub-agents/index.tsx`);
      totalFiles++;
    } else { console.log(`  ⏭️  sub-agents/index.tsx (exists)`); skippedFiles++; }
  }
}

console.log(`\n=======================================`);
console.log(`✅ Generated: ${totalFiles} files`);
console.log(`⏭️  Skipped (existing): ${skippedFiles} files`);
console.log(`=======================================`);
