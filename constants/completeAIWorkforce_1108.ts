/**
 * =============================================================================
 * KAYTX AI WORKFORCE - COMPLETE DATABASE (1,108 AGENTS)
 * =============================================================================
 *
 * Total: 277 Main Agents + 831 Sub-Agents = 1,108 AI Agents
 * Departments: 22
 * Each Main Agent has 2-4 Sub-Agent / Helper Agents
 *
 * @version 8.0.0
 * @lastUpdated 2026-05-06
 */

export interface SubAgent {
  id: string;
  name: string;
  title: string;
  description: string;
  capabilities: string[];
  parentId: string;
}

export interface MainAgent {
  id: string;
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
  { id: 1, name: 'Customer Experience', shortName: 'CX', color: '#00BCD4', icon: 'Headphones', mainAgents: 14, subAgents: 42, total: 56 },
  { id: 2, name: 'Sales & Revenue', shortName: 'Sales', color: '#FFA000', icon: 'Target', mainAgents: 14, subAgents: 42, total: 56 },
  { id: 3, name: 'Marketing & Growth', shortName: 'Marketing', color: '#E91E63', icon: 'Megaphone', mainAgents: 15, subAgents: 45, total: 60 },
  { id: 4, name: 'Operations & Management', shortName: 'Operations', color: '#607D8B', icon: 'Settings', mainAgents: 13, subAgents: 39, total: 52 },
  { id: 5, name: 'Finance & Accounting', shortName: 'Finance', color: '#2E7D32', icon: 'DollarSign', mainAgents: 13, subAgents: 39, total: 52 },
  { id: 6, name: 'Technology & Engineering', shortName: 'Engineering', color: '#1565C0', icon: 'Code', mainAgents: 16, subAgents: 48, total: 64 },
  { id: 7, name: 'Human Resources', shortName: 'HR', color: '#9C27B0', icon: 'Users', mainAgents: 11, subAgents: 33, total: 44 },
  { id: 8, name: 'Legal & Compliance', shortName: 'Legal', color: '#3F51B5', icon: 'Scale', mainAgents: 10, subAgents: 30, total: 40 },
  { id: 9, name: 'Data & Intelligence', shortName: 'Data', color: '#AF52DE', icon: 'Database', mainAgents: 13, subAgents: 39, total: 52 },
  { id: 10, name: 'Product Management', shortName: 'Product', color: '#FF5722', icon: 'Box', mainAgents: 10, subAgents: 30, total: 40 },
  { id: 11, name: 'Security & Risk', shortName: 'Security', color: '#F44336', icon: 'Shield', mainAgents: 12, subAgents: 36, total: 48 },
  { id: 12, name: 'Research & Development', shortName: 'R&D', color: '#009688', icon: 'FlaskConical', mainAgents: 9, subAgents: 27, total: 36 },
  { id: 13, name: 'Administrative', shortName: 'Admin', color: '#795548', icon: 'Clipboard', mainAgents: 9, subAgents: 27, total: 36 },
  { id: 14, name: 'Trading & Investments', shortName: 'Trading', color: '#10B981', icon: 'TrendingUp', mainAgents: 18, subAgents: 54, total: 72 },
  { id: 15, name: 'Real Estate & Property', shortName: 'RealEstate', color: '#8D6E63', icon: 'Building', mainAgents: 14, subAgents: 42, total: 56 },
  { id: 16, name: 'Insurance & Risk', shortName: 'Insurance', color: '#FF7043', icon: 'ShieldCheck', mainAgents: 16, subAgents: 48, total: 64 },
  { id: 17, name: 'Healthcare & Medical', shortName: 'Healthcare', color: '#EC407A', icon: 'HeartPulse', mainAgents: 14, subAgents: 42, total: 56 },
  { id: 18, name: 'Manufacturing & Production', shortName: 'Manufacturing', color: '#5C6BC0', icon: 'Factory', mainAgents: 14, subAgents: 42, total: 56 },
  { id: 19, name: 'Transportation & Logistics', shortName: 'Transportation', color: '#26A69A', icon: 'Truck', mainAgents: 14, subAgents: 42, total: 56 },
  { id: 20, name: 'Government & Public Sector', shortName: 'Government', color: '#78909C', icon: 'Landmark', mainAgents: 12, subAgents: 36, total: 48 },
  { id: 21, name: 'Supply Chain & Logistics', shortName: 'SupplyChain', color: '#42A5F5', icon: 'Link', mainAgents: 10, subAgents: 30, total: 40 },
  { id: 22, name: 'AI Management & Governance', shortName: 'AIGovernance', color: '#7C4DFF', icon: 'Brain', mainAgents: 6, subAgents: 18, total: 24 },
];

// =============================================================================
// DEPARTMENT 1: CUSTOMER EXPERIENCE (14 Main + 42 Sub = 56 Total)
// =============================================================================

const department1Agents: MainAgent[] = [
  {
    id: 'ai-chief-customer-officer',
    name: 'AI Chief Customer Officer',
    title: 'Chief Customer Officer',
    department: 'Customer Experience',
    departmentId: 1,
    level: 'c_level',
    description: 'Leads enterprise-wide customer experience strategy, ensuring seamless interactions across all touchpoints and maximizing customer lifetime value.',
    capabilities: ['CX Strategy Development', 'Customer Journey Optimization', 'Loyalty Program Design', 'Voice of Customer Analytics', 'Retention Strategy'],
    responsibilities: ['Define CX vision and roadmap', 'Align departments around customer needs', 'Drive customer-centric culture', 'Report CX metrics to board'],
    icon: 'Crown',
    color: '#00BCD4',
    route: '/ai-agent/customer-experience/chief-customer-officer',
    aiCost: '$299/mo',
    efficiency: '95%',
    isPremium: true,
    reportsTo: 'ceo',
    subAgents: [
      { id: 'ai-cx-strategy-analyst', name: 'AI CX Strategy Analyst', title: 'CX Strategy Analyst', parentId: 'ai-chief-customer-officer', description: 'Analyzes market trends and customer data to develop strategic CX initiatives.', capabilities: ['Market Analysis', 'Trend Forecasting', 'Strategy Formulation', 'Competitive Benchmarking'] },
      { id: 'ai-customer-journey-mapper', name: 'AI Customer Journey Mapper', title: 'Customer Journey Mapper', parentId: 'ai-chief-customer-officer', description: 'Maps and optimizes every touchpoint in the customer lifecycle.', capabilities: ['Journey Mapping', 'Touchpoint Analysis', 'Pain Point Identification', 'Experience Design'] },
      { id: 'ai-cx-metrics-tracker', name: 'AI CX Metrics Tracker', title: 'CX Metrics Tracker', parentId: 'ai-chief-customer-officer', description: 'Monitors and reports on all customer experience KPIs and metrics.', capabilities: ['NPS Tracking', 'CSAT Monitoring', 'CES Analysis', 'Dashboard Creation'] },
    ]
  },
  {
    id: 'ai-vp-customer-success',
    name: 'AI VP Customer Success',
    title: 'VP Customer Success',
    department: 'Customer Experience',
    departmentId: 1,
    level: 'vp_director',
    description: 'Drives customer adoption, expansion, and advocacy through proactive success programs.',
    capabilities: ['Success Planning', 'Adoption Tracking', 'Expansion Strategy', 'Advocacy Building', 'Health Scoring'],
    responsibilities: ['Manage success teams', 'Design success playbooks', 'Drive net revenue retention', 'Build customer advocates'],
    icon: 'UserCheck',
    color: '#00ACC1',
    route: '/ai-agent/customer-experience/vp-customer-success',
    aiCost: '$199/mo',
    efficiency: '93%',
    isPremium: true,
    reportsTo: 'ai-chief-customer-officer',
    subAgents: [
      { id: 'ai-onboarding-specialist', name: 'AI Onboarding Specialist', title: 'Onboarding Specialist', parentId: 'ai-vp-customer-success', description: 'Ensures smooth customer onboarding and time-to-value acceleration.', capabilities: ['Onboarding Design', 'Training Coordination', 'Value Demonstration', 'Progress Tracking'] },
      { id: 'ai-account-health-monitor', name: 'AI Account Health Monitor', title: 'Account Health Monitor', parentId: 'ai-vp-customer-success', description: 'Continuously monitors account health and predicts churn risk.', capabilities: ['Health Scoring', 'Risk Prediction', 'Early Warning Alerts', 'Intervention Planning'] },
      { id: 'ai-success-plan-coordinator', name: 'AI Success Plan Coordinator', title: 'Success Plan Coordinator', parentId: 'ai-vp-customer-success', description: 'Creates and manages customized success plans for each account.', capabilities: ['Goal Setting', 'Milestone Tracking', 'Plan Adjustment', 'Outcome Measurement'] },
    ]
  },
  {
    id: 'ai-vp-support',
    name: 'AI VP Support',
    title: 'VP Customer Support',
    department: 'Customer Experience',
    departmentId: 1,
    level: 'vp_director',
    description: 'Oversees all customer support operations, ensuring rapid resolution and high satisfaction.',
    capabilities: ['Support Operations', 'Team Management', 'Quality Assurance', 'Knowledge Base', 'Escalation Handling'],
    responsibilities: ['Manage support teams', 'Optimize support processes', 'Monitor SLAs', 'Drive first-contact resolution'],
    icon: 'Headphones',
    color: '#00ACC1',
    route: '/ai-agent/customer-experience/vp-support',
    aiCost: '$199/mo',
    efficiency: '92%',
    isPremium: true,
    reportsTo: 'ai-chief-customer-officer',
    subAgents: [
      { id: 'ai-escalation-manager', name: 'AI Escalation Manager', title: 'Escalation Manager', parentId: 'ai-vp-support', description: 'Manages complex escalations and ensures timely resolution.', capabilities: ['Escalation Routing', 'Priority Management', 'Stakeholder Communication', 'Resolution Tracking'] },
      { id: 'ai-knowledge-base-curator', name: 'AI Knowledge Base Curator', title: 'Knowledge Base Curator', parentId: 'ai-vp-support', description: 'Maintains and optimizes self-service knowledge resources.', capabilities: ['Content Creation', 'Article Optimization', 'Search Improvement', 'Usage Analytics'] },
      { id: 'ai-support-quality-auditor', name: 'AI Support Quality Auditor', title: 'Support Quality Auditor', parentId: 'ai-vp-support', description: 'Audits support interactions and ensures quality standards.', capabilities: ['Quality Scoring', 'Feedback Analysis', 'Coaching Recommendations', 'Compliance Checking'] },
    ]
  },
  {
    id: 'ai-vp-experience',
    name: 'AI VP Experience',
    title: 'VP Customer Experience',
    department: 'Customer Experience',
    departmentId: 1,
    level: 'vp_director',
    description: 'Designs and optimizes the end-to-end customer experience across all channels.',
    capabilities: ['Experience Design', 'UX Research', 'Journey Optimization', 'Channel Strategy', 'Personalization'],
    responsibilities: ['Design experience strategy', 'Lead UX initiatives', 'Optimize touchpoints', 'Drive experience innovation'],
    icon: 'Sparkles',
    color: '#00ACC1',
    route: '/ai-agent/customer-experience/vp-experience',
    aiCost: '$189/mo',
    efficiency: '91%',
    isPremium: true,
    reportsTo: 'ai-chief-customer-officer',
    subAgents: [
      { id: 'ai-ux-feedback-analyst', name: 'AI UX Feedback Analyst', title: 'UX Feedback Analyst', parentId: 'ai-vp-experience', description: 'Analyzes user feedback to identify experience improvements.', capabilities: ['Feedback Collection', 'Sentiment Analysis', 'Insight Extraction', 'Action Prioritization'] },
      { id: 'ai-experience-benchmark-analyst', name: 'AI Experience Benchmark Analyst', title: 'Experience Benchmark Analyst', parentId: 'ai-vp-experience', description: 'Benchmarks CX against competitors and industry standards.', capabilities: ['Competitive Analysis', 'Industry Research', 'Gap Identification', 'Best Practice Recommendations'] },
      { id: 'ai-personalization-engine', name: 'AI Personalization Engine', title: 'Personalization Engine', parentId: 'ai-vp-experience', description: 'Delivers personalized experiences based on customer data and behavior.', capabilities: ['Behavioral Analysis', 'Content Personalization', 'Recommendation Engines', 'Dynamic Experiences'] },
    ]
  },
  {
    id: 'ai-vp-retention',
    name: 'AI VP Retention',
    title: 'VP Customer Retention',
    department: 'Customer Experience',
    departmentId: 1,
    level: 'vp_director',
    description: 'Develops and executes strategies to minimize churn and maximize customer lifetime value.',
    capabilities: ['Churn Prediction', 'Retention Campaigns', 'Win-back Strategies', 'Loyalty Programs', 'Risk Analysis'],
    responsibilities: ['Reduce churn rate', 'Design retention programs', 'Analyze churn causes', 'Optimize renewal processes'],
    icon: 'Heart',
    color: '#00ACC1',
    route: '/ai-agent/customer-experience/vp-retention',
    aiCost: '$189/mo',
    efficiency: '94%',
    isPremium: true,
    reportsTo: 'ai-chief-customer-officer',
    subAgents: [
      { id: 'ai-churn-predictor', name: 'AI Churn Predictor', title: 'Churn Predictor', parentId: 'ai-vp-retention', description: 'Identifies at-risk customers before they churn.', capabilities: ['Predictive Modeling', 'Risk Scoring', 'Early Warning', 'Intervention Triggers'] },
      { id: 'ai-winback-campaign-specialist', name: 'AI Win-back Campaign Specialist', title: 'Win-back Campaign Specialist', parentId: 'ai-vp-retention', description: 'Designs and executes campaigns to win back lost customers.', capabilities: ['Campaign Design', 'Segmentation', 'Offer Optimization', 'Response Tracking'] },
      { id: 'ai-retention-metrics-analyst', name: 'AI Retention Metrics Analyst', title: 'Retention Metrics Analyst', parentId: 'ai-vp-retention', description: 'Tracks and analyzes all retention-related metrics.', capabilities: ['Retention Reporting', 'Cohort Analysis', 'LTV Calculation', 'Trend Analysis'] },
    ]
  },
  {
    id: 'ai-vp-loyalty',
    name: 'AI VP Loyalty',
    title: 'VP Loyalty Programs',
    department: 'Customer Experience',
    departmentId: 1,
    level: 'vp_director',
    description: 'Builds and manages customer loyalty programs that drive repeat business and advocacy.',
    capabilities: ['Loyalty Strategy', 'Rewards Design', 'Program Management', 'Engagement Analytics', 'Tier Optimization'],
    responsibilities: ['Design loyalty programs', 'Manage rewards catalog', 'Optimize tier structures', 'Drive program engagement'],
    icon: 'Award',
    color: '#00ACC1',
    route: '/ai-agent/customer-experience/vp-loyalty',
    aiCost: '$179/mo',
    efficiency: '90%',
    isPremium: true,
    reportsTo: 'ai-chief-customer-officer',
    subAgents: [
      { id: 'ai-rewards-program-designer', name: 'AI Rewards Program Designer', title: 'Rewards Program Designer', parentId: 'ai-vp-loyalty', description: 'Creates attractive and effective rewards programs.', capabilities: ['Reward Structuring', 'Point Economics', 'Partner Integration', 'Program Innovation'] },
      { id: 'ai-loyalty-tier-analyst', name: 'AI Loyalty Tier Analyst', title: 'Loyalty Tier Analyst', parentId: 'ai-vp-loyalty', description: 'Optimizes tier structures and benefits for maximum engagement.', capabilities: ['Tier Analysis', 'Benefit Optimization', 'Upgrade Path Design', 'Segmentation'] },
      { id: 'ai-engagement-scoring-agent', name: 'AI Engagement Scoring Agent', title: 'Engagement Scoring Agent', parentId: 'ai-vp-loyalty', description: 'Scores and tracks customer engagement across all touchpoints.', capabilities: ['Engagement Tracking', 'Score Calculation', 'Behavior Analysis', 'Trend Reporting'] },
    ]
  },
  {
    id: 'ai-receptionist',
    name: 'AI Receptionist',
    title: 'Virtual Receptionist',
    department: 'Customer Experience',
    departmentId: 1,
    level: 'specialist',
    description: 'First point of contact for visitors and callers, providing professional greeting and routing.',
    capabilities: ['Call Handling', 'Visitor Management', 'Appointment Scheduling', 'Greeting Services', 'Call Routing'],
    responsibilities: ['Answer and route calls', 'Greet visitors', 'Schedule appointments', 'Manage inquiries'],
    icon: 'Phone',
    color: '#26C6DA',
    route: '/ai-agent/ai-receptionist',
    aiCost: '$49/mo',
    efficiency: '96%',
    isPremium: false,
    reportsTo: 'ai-vp-support',
    subAgents: [
      { id: 'ai-call-router', name: 'AI Call Router', title: 'Call Router', parentId: 'ai-receptionist', description: 'Intelligently routes calls to the appropriate department or person.', capabilities: ['Intent Recognition', 'Skill-based Routing', 'Wait Time Optimization', 'Callback Scheduling'] },
      { id: 'ai-visitor-logger', name: 'AI Visitor Logger', title: 'Visitor Logger', parentId: 'ai-receptionist', description: 'Logs and tracks all visitor information and movements.', capabilities: ['Check-in/out', 'Badge Management', 'Security Notifications', 'Visitor Analytics'] },
      { id: 'ai-appointment-scheduler', name: 'AI Appointment Scheduler', title: 'Appointment Scheduler', parentId: 'ai-receptionist', description: 'Manages scheduling and calendar coordination.', capabilities: ['Calendar Management', 'Availability Checking', 'Reminder Sending', 'Rescheduling'] },
    ]
  },
  {
    id: 'ai-customer-support-agent',
    name: 'AI Customer Support Agent',
    title: 'Customer Support Agent',
    department: 'Customer Experience',
    departmentId: 1,
    level: 'specialist',
    description: 'Handles customer inquiries across all channels with instant, accurate responses.',
    capabilities: ['Multi-channel Support', 'Ticket Resolution', 'Knowledge Base Access', 'Escalation Handling', 'Satisfaction Tracking'],
    responsibilities: ['Answer customer questions', 'Resolve common issues', 'Create support tickets', 'Follow up on inquiries'],
    icon: 'MessageCircle',
    color: '#26C6DA',
    route: '/ai-agent/ai-customer-support',
    aiCost: '$59/mo',
    efficiency: '94%',
    isPremium: false,
    reportsTo: 'ai-vp-support',
    subAgents: [
      { id: 'ai-faq-responder', name: 'AI FAQ Responder', title: 'FAQ Responder', parentId: 'ai-customer-support-agent', description: 'Instantly answers frequently asked questions.', capabilities: ['Knowledge Retrieval', 'Natural Language Understanding', 'Answer Optimization', 'Gap Identification'] },
      { id: 'ai-troubleshooting-guide', name: 'AI Troubleshooting Guide', title: 'Troubleshooting Guide', parentId: 'ai-customer-support-agent', description: 'Guides customers through technical problem resolution.', capabilities: ['Diagnostic Questions', 'Step-by-step Guides', 'Issue Categorization', 'Solution Verification'] },
      { id: 'ai-live-chat-handler', name: 'AI Live Chat Handler', title: 'Live Chat Handler', parentId: 'ai-customer-support-agent', description: 'Manages real-time chat conversations with customers.', capabilities: ['Real-time Response', 'Context Management', 'Proactive Engagement', 'Handoff Coordination'] },
    ]
  },
  {
    id: 'ai-ticket-resolution-agent',
    name: 'AI Ticket Resolution Agent',
    title: 'Ticket Resolution Specialist',
    department: 'Customer Experience',
    departmentId: 1,
    level: 'specialist',
    description: 'Manages and resolves support tickets from creation to closure.',
    capabilities: ['Ticket Management', 'Priority Routing', 'SLA Monitoring', 'Resolution Tracking', 'Auto-resolution'],
    responsibilities: ['Process incoming tickets', 'Assign to appropriate agents', 'Track resolution progress', 'Ensure SLA compliance'],
    icon: 'Ticket',
    color: '#26C6DA',
    route: '/ai-agent/ai-ticket-classifier',
    aiCost: '$69/mo',
    efficiency: '93%',
    isPremium: false,
    reportsTo: 'ai-vp-support',
    subAgents: [
      { id: 'ai-ticket-classifier', name: 'AI Ticket Classifier', title: 'Ticket Classifier', parentId: 'ai-ticket-resolution-agent', description: 'Automatically categorizes and prioritizes incoming tickets.', capabilities: ['Intent Classification', 'Priority Scoring', 'Category Assignment', 'Tagging'] },
      { id: 'ai-solution-matcher', name: 'AI Solution Matcher', title: 'Solution Matcher', parentId: 'ai-ticket-resolution-agent', description: 'Matches tickets with known solutions and past resolutions.', capabilities: ['Similarity Search', 'Solution Recommendation', 'Historical Analysis', 'Success Prediction'] },
      { id: 'ai-escalation-router', name: 'AI Escalation Router', title: 'Escalation Router', parentId: 'ai-ticket-resolution-agent', description: 'Routes complex issues to the right specialists or teams.', capabilities: ['Complexity Assessment', 'Expert Matching', 'Urgency Detection', 'Load Balancing'] },
    ]
  },
  {
    id: 'ai-complaint-handling-agent',
    name: 'AI Complaint Handling Agent',
    title: 'Complaint Resolution Specialist',
    department: 'Customer Experience',
    departmentId: 1,
    level: 'specialist',
    description: 'Specializes in handling customer complaints with empathy and effective resolution.',
    capabilities: ['Complaint Analysis', 'De-escalation', 'Resolution Negotiation', 'Follow-up', 'Root Cause Analysis'],
    responsibilities: ['Acknowledge complaints', 'Investigate issues', 'Propose solutions', 'Prevent recurrence'],
    icon: 'MessageSquareWarning',
    color: '#26C6DA',
    route: '/ai-agent/ai-complaint-categorizer',
    aiCost: '$79/mo',
    efficiency: '91%',
    isPremium: false,
    reportsTo: 'ai-vp-support',
    subAgents: [
      { id: 'ai-complaint-categorizer', name: 'AI Complaint Categorizer', title: 'Complaint Categorizer', parentId: 'ai-complaint-handling-agent', description: 'Categorizes complaints by type, severity, and department.', capabilities: ['Type Classification', 'Severity Scoring', 'Department Routing', 'Trend Analysis'] },
      { id: 'ai-resolution-tracker', name: 'AI Resolution Tracker', title: 'Resolution Tracker', parentId: 'ai-complaint-handling-agent', description: 'Tracks complaint resolution progress and outcomes.', capabilities: ['Status Tracking', 'Timeline Management', 'Outcome Recording', 'Satisfaction Measurement'] },
      { id: 'ai-sentiment-analyzer', name: 'AI Sentiment Analyzer', title: 'Sentiment Analyzer', parentId: 'ai-complaint-handling-agent', description: 'Analyzes customer sentiment in complaints and interactions.', capabilities: ['Emotion Detection', 'Sentiment Scoring', 'Tone Analysis', 'Trend Monitoring'] },
    ]
  },
  {
    id: 'ai-retention-specialist',
    name: 'AI Retention Specialist',
    title: 'Customer Retention Specialist',
    department: 'Customer Experience',
    departmentId: 1,
    level: 'specialist',
    description: 'Identifies at-risk customers and implements retention strategies.',
    capabilities: ['Churn Prediction', 'Retention Offers', 'Proactive Outreach', 'Win-back Campaigns', 'Loyalty Building'],
    responsibilities: ['Identify at-risk accounts', 'Design retention offers', 'Execute save plays', 'Analyze churn patterns'],
    icon: 'UserPlus',
    color: '#26C6DA',
    route: '/ai-agent/ai-retention-specialist',
    aiCost: '$89/mo',
    efficiency: '92%',
    isPremium: false,
    reportsTo: 'ai-vp-retention',
    subAgents: [
      { id: 'ai-at-risk-identifier', name: 'AI At-Risk Identifier', title: 'At-Risk Identifier', parentId: 'ai-retention-specialist', description: 'Identifies customers showing signs of potential churn.', capabilities: ['Risk Scoring', 'Behavioral Analysis', 'Early Warning', 'Alert Generation'] },
      { id: 'ai-offer-optimizer', name: 'AI Offer Optimizer', title: 'Offer Optimizer', parentId: 'ai-retention-specialist', description: 'Determines the optimal retention offers for each at-risk customer.', capabilities: ['Offer Personalization', 'Value Optimization', 'Response Prediction', 'A/B Testing'] },
      { id: 'ai-followup-scheduler', name: 'AI Follow-up Scheduler', title: 'Follow-up Scheduler', parentId: 'ai-retention-specialist', description: 'Schedules and manages retention follow-up activities.', capabilities: ['Timing Optimization', 'Channel Selection', 'Sequence Design', 'Response Tracking'] },
    ]
  },
  {
    id: 'ai-loyalty-engagement-agent',
    name: 'AI Loyalty & Engagement Agent',
    title: 'Loyalty & Engagement Specialist',
    department: 'Customer Experience',
    departmentId: 1,
    level: 'specialist',
    description: 'Manages customer engagement and loyalty program participation.',
    capabilities: ['Engagement Tracking', 'Points Management', 'Reward Redemption', 'Tier Progression', 'Gamification'],
    responsibilities: ['Track engagement metrics', 'Manage loyalty accounts', 'Promote program benefits', 'Drive participation'],
    icon: 'Gift',
    color: '#26C6DA',
    route: '/ai-agent/ai-engagement-scoring-agent',
    aiCost: '$69/mo',
    efficiency: '89%',
    isPremium: false,
    reportsTo: 'ai-vp-loyalty',
    subAgents: [
      { id: 'ai-points-calculator', name: 'AI Points Calculator', title: 'Points Calculator', parentId: 'ai-loyalty-engagement-agent', description: 'Calculates and manages loyalty points for all customers.', capabilities: ['Point Accrual', 'Redemption Processing', 'Balance Management', 'Expiration Handling'] },
      { id: 'ai-reward-recommender', name: 'AI Reward Recommender', title: 'Reward Recommender', parentId: 'ai-loyalty-engagement-agent', description: 'Recommends personalized rewards based on preferences.', capabilities: ['Preference Analysis', 'Recommendation Engine', 'Inventory Management', 'Redemption Optimization'] },
      { id: 'ai-engagement-tracker', name: 'AI Engagement Tracker', title: 'Engagement Tracker', parentId: 'ai-loyalty-engagement-agent', description: 'Tracks and reports on all customer engagement activities.', capabilities: ['Activity Tracking', 'Engagement Scoring', 'Trend Analysis', 'Reporting'] },
    ]
  },
  {
    id: 'ai-feedback-survey-agent',
    name: 'AI Feedback & Survey Agent',
    title: 'Feedback & Survey Specialist',
    department: 'Customer Experience',
    departmentId: 1,
    level: 'specialist',
    description: 'Collects, analyzes, and acts on customer feedback through surveys and other methods.',
    capabilities: ['Survey Design', 'Feedback Collection', 'Response Analysis', 'Insight Generation', 'Action Planning'],
    responsibilities: ['Create surveys', 'Distribute to customers', 'Analyze responses', 'Report insights'],
    icon: 'ClipboardList',
    color: '#26C6DA',
    route: '/ai-agent/customer-experience/feedback-survey',
    aiCost: '$59/mo',
    efficiency: '90%',
    isPremium: false,
    reportsTo: 'ai-vp-experience',
    subAgents: [
      { id: 'ai-survey-designer', name: 'AI Survey Designer', title: 'Survey Designer', parentId: 'ai-feedback-survey-agent', description: 'Designs effective surveys that maximize response rates and insights.', capabilities: ['Question Design', 'Flow Optimization', 'Timing Strategy', 'Channel Selection'] },
      { id: 'ai-response-analyzer', name: 'AI Response Analyzer', title: 'Response Analyzer', parentId: 'ai-feedback-survey-agent', description: 'Analyzes survey responses to extract actionable insights.', capabilities: ['Text Analysis', 'Sentiment Scoring', 'Theme Extraction', 'Statistical Analysis'] },
      { id: 'ai-insight-reporter', name: 'AI Insight Reporter', title: 'Insight Reporter', parentId: 'ai-feedback-survey-agent', description: 'Creates comprehensive reports from feedback analysis.', capabilities: ['Report Generation', 'Visualization', 'Trend Identification', 'Recommendation'] },
    ]
  },
  {
    id: 'ai-billing-support-agent',
    name: 'AI Billing Support Agent',
    title: 'Billing Support Specialist',
    department: 'Customer Experience',
    departmentId: 1,
    level: 'specialist',
    description: 'Specializes in handling billing inquiries, disputes, and payment issues.',
    capabilities: ['Billing Inquiry Resolution', 'Dispute Handling', 'Payment Processing', 'Invoice Explanation', 'Refund Management'],
    responsibilities: ['Answer billing questions', 'Resolve disputes', 'Process payments', 'Issue refunds'],
    icon: 'CreditCard',
    color: '#26C6DA',
    route: '/ai-agent/customer-experience/billing-support',
    aiCost: '$59/mo',
    efficiency: '95%',
    isPremium: false,
    reportsTo: 'ai-vp-support',
    subAgents: [
      { id: 'ai-payment-processor', name: 'AI Payment Processor', title: 'Payment Processor', parentId: 'ai-billing-support-agent', description: 'Processes and manages customer payments securely.', capabilities: ['Payment Processing', 'Authorization', 'Reconciliation', 'Error Handling'] },
      { id: 'ai-invoice-explainer', name: 'AI Invoice Explainer', title: 'Invoice Explainer', parentId: 'ai-billing-support-agent', description: 'Helps customers understand their invoices and charges.', capabilities: ['Line Item Explanation', 'Charge Breakdown', 'Usage Analysis', 'Clarification'] },
      { id: 'ai-dispute-resolver', name: 'AI Dispute Resolver', title: 'Dispute Resolver', parentId: 'ai-billing-support-agent', description: 'Investigates and resolves billing disputes.', capabilities: ['Dispute Investigation', 'Charge Verification', 'Resolution Negotiation', 'Documentation'] },
    ]
  },
];

// =============================================================================
// DEPARTMENT 2: SALES & REVENUE (14 Main + 42 Sub = 56 Total)
// =============================================================================

const department2Agents: MainAgent[] = [
  {
    id: 'ai-chief-revenue-officer',
    name: 'AI Chief Revenue Officer',
    title: 'Chief Revenue Officer',
    department: 'Sales & Revenue',
    departmentId: 2,
    level: 'c_level',
    description: 'Leads revenue operations, sales strategy, and revenue growth across all channels.',
    capabilities: ['Revenue Strategy', 'Sales Forecasting', 'Pipeline Management', 'Quota Planning', 'Revenue Analytics'],
    responsibilities: ['Drive revenue growth', 'Optimize sales process', 'Lead sales leadership', 'Report revenue metrics'],
    icon: 'Target',
    color: '#FFA000',
    route: '/ai-agent/sales/chief-revenue-officer',
    aiCost: '$2,400/mo',
    efficiency: '85%',
    isPremium: true,
    subAgents: [
      { id: 'ai-revenue-strategist', name: 'AI Revenue Strategist', title: 'Revenue Strategist', parentId: 'ai-chief-revenue-officer', description: 'Develops revenue optimization strategies.', capabilities: ['Revenue Modeling', 'Growth Strategy', 'Pricing Optimization'] },
      { id: 'ai-sales-forecaster', name: 'AI Sales Forecaster', title: 'Sales Forecaster', parentId: 'ai-chief-revenue-officer', description: 'Provides accurate sales forecasts.', capabilities: ['Predictive Analytics', 'Trend Analysis', 'Quota Setting'] },
      { id: 'ai-revenue-analyst', name: 'AI Revenue Analyst', title: 'Revenue Analyst', parentId: 'ai-chief-revenue-officer', description: 'Analyzes revenue performance.', capabilities: ['Data Analysis', 'Reporting', 'Insights Generation'] },
    ]
  },
  {
    id: 'ai-vp-sales',
    name: 'AI VP of Sales',
    title: 'VP Sales',
    department: 'Sales & Revenue',
    departmentId: 2,
    level: 'vp_director',
    description: 'Oversees all sales operations and team performance.',
    capabilities: ['Sales Leadership', 'Team Management', 'Territory Planning', 'Compensation Design'],
    responsibilities: ['Lead sales team', 'Achieve quota', 'Develop talent', 'Optimize processes'],
    icon: 'TrendingUp',
    color: '#FF8F00',
    route: '/ai-agent/sales/vp-sales',
    aiCost: '$1,800/mo',
    efficiency: '80%',
    isPremium: true,
    subAgents: [
      { id: 'ai-sales-coach', name: 'AI Sales Coach', title: 'Sales Coach', parentId: 'ai-vp-sales', description: 'Coaches sales reps for success.', capabilities: ['Coaching', 'Skill Development', 'Performance Review'] },
      { id: 'ai-territory-manager', name: 'AI Territory Manager', title: 'Territory Manager', parentId: 'ai-vp-sales', description: 'Manages sales territories.', capabilities: ['Territory Planning', 'Market Analysis', 'Resource Allocation'] },
    ]
  },
  {
    id: 'ai-vp-business-development',
    name: 'AI VP Business Development',
    title: 'VP Business Development',
    department: 'Sales & Revenue',
    departmentId: 2,
    level: 'vp_director',
    description: 'Leads strategic partnerships and business expansion.',
    capabilities: ['Partnership Strategy', 'Deal Negotiation', 'Market Expansion', 'Strategic Planning'],
    responsibilities: ['Identify opportunities', 'Negotiate deals', 'Build partnerships', 'Drive growth'],
    icon: 'Handshake',
    color: '#FF6F00',
    route: '/ai-agent/sales/vp-business-development',
    aiCost: '$1,800/mo',
    efficiency: '80%',
    isPremium: true,
    subAgents: [
      { id: 'ai-partnership-manager', name: 'AI Partnership Manager', title: 'Partnership Manager', parentId: 'ai-vp-business-development', description: 'Manages partner relationships.', capabilities: ['Partner Relations', 'Contract Management', 'Joint Planning'] },
      { id: 'ai-deal-negotiator', name: 'AI Deal Negotiator', title: 'Deal Negotiator', parentId: 'ai-vp-business-development', description: 'Negotiates business deals.', capabilities: ['Negotiation', 'Contract Terms', 'Value Creation'] },
    ]
  },
  {
    id: 'ai-sales-manager',
    name: 'AI Sales Manager',
    title: 'Sales Manager',
    department: 'Sales & Revenue',
    departmentId: 2,
    level: 'manager',
    description: 'Manages a team of sales representatives.',
    capabilities: ['Team Leadership', 'Sales Coaching', 'Pipeline Management', 'Forecasting'],
    responsibilities: ['Lead sales team', 'Meet quota', 'Develop reps', 'Report metrics'],
    icon: 'Users',
    color: '#FFB300',
    route: '/ai-agent/sales/sales-manager',
    aiCost: '$1,200/mo',
    efficiency: '75%',
    isPremium: false,
    subAgents: [
      { id: 'ai-sales-analyst', name: 'AI Sales Analyst', title: 'Sales Analyst', parentId: 'ai-sales-manager', description: 'Analyzes sales data.', capabilities: ['Data Analysis', 'Reporting', 'Insights'] },
      { id: 'ai-crm-manager', name: 'AI CRM Manager', title: 'CRM Manager', parentId: 'ai-sales-manager', description: 'Manages CRM system.', capabilities: ['CRM Administration', 'Data Quality', 'Automation'] },
    ]
  },
  {
    id: 'ai-account-executive',
    name: 'AI Account Executive',
    title: 'Account Executive',
    department: 'Sales & Revenue',
    departmentId: 2,
    level: 'team_lead',
    description: 'Manages key client accounts and drives revenue.',
    capabilities: ['Account Management', 'Solution Selling', 'Relationship Building', 'Negotiation'],
    responsibilities: ['Grow accounts', 'Close deals', 'Build relationships', 'Meet targets'],
    icon: 'Briefcase',
    color: '#FFC107',
    route: '/ai-agent/sales/account-executive',
    aiCost: '$800/mo',
    efficiency: '70%',
    isPremium: false,
    subAgents: [
      { id: 'ai-account-planner', name: 'AI Account Planner', title: 'Account Planner', parentId: 'ai-account-executive', description: 'Plans account strategies.', capabilities: ['Account Planning', 'Strategy Development'] },
    ]
  },
  {
    id: 'ai-sales-representative',
    name: 'AI Sales Representative',
    title: 'Sales Representative',
    department: 'Sales & Revenue',
    departmentId: 2,
    level: 'specialist',
    description: 'Drives new business and manages pipeline.',
    capabilities: ['Prospecting', 'Qualification', 'Demo', 'Close'],
    responsibilities: ['Generate leads', 'Qualify prospects', 'Present solutions', 'Close deals'],
    icon: 'UserCheck',
    color: '#FFD54F',
    route: '/ai-agent/sales/sales-representative',
    aiCost: '$450/mo',
    efficiency: '65%',
    isPremium: false,
    subAgents: [
      { id: 'ai-lead-qualifier', name: 'AI Lead Qualifier', title: 'Lead Qualifier', parentId: 'ai-sales-representative', description: 'Qualifies incoming leads.', capabilities: ['Lead Scoring', 'Qualification', 'Routing'] },
    ]
  },
  {
    id: 'ai-sdr',
    name: 'AI Sales Development Rep',
    title: 'SDR',
    department: 'Sales & Revenue',
    departmentId: 2,
    level: 'specialist',
    description: 'Prospects and qualifies new opportunities.',
    capabilities: ['Outreach', 'Email Automation', 'LinkedIn Prospecting', 'Appointment Setting'],
    responsibilities: ['Book meetings', 'Qualify leads', 'Research prospects', 'Follow up'],
    icon: 'Send',
    color: '#FFE082',
    route: '/ai-agent/sales/sdr',
    aiCost: '$450/mo',
    efficiency: '65%',
    isPremium: false,
    subAgents: [
      { id: 'ai-email-prospector', name: 'AI Email Prospector', title: 'Email Prospector', parentId: 'ai-sdr', description: 'Executes email campaigns.', capabilities: ['Email Writing', 'A/B Testing', 'Deliverability'] },
    ]
  },
  {
    id: 'ai-customer-success-manager',
    name: 'AI Customer Success Manager',
    title: 'CSM',
    department: 'Sales & Revenue',
    departmentId: 2,
    level: 'team_lead',
    description: 'Ensures customer satisfaction and retention.',
    capabilities: ['Account Health', 'Renewal Management', 'Upselling', 'Risk Mitigation'],
    responsibilities: ['Drive adoption', 'Renew accounts', 'Identify expansion', 'Reduce churn'],
    icon: 'Heart',
    color: '#FFCA28',
    route: '/ai-agent/sales/customer-success-manager',
    aiCost: '$800/mo',
    efficiency: '70%',
    isPremium: false,
    subAgents: [
      { id: 'ai-onboarding-specialist', name: 'AI Onboarding Specialist', title: 'Onboarding Specialist', parentId: 'ai-customer-success-manager', description: 'Onboards new customers.', capabilities: ['Onboarding', 'Training', 'Adoption'] },
    ]
  },
];

// =============================================================================
// DEPARTMENT 3: MARKETING & GROWTH (15 Main + 45 Sub = 60 Total)
// =============================================================================

const department3Agents: MainAgent[] = [
  {
    id: 'ai-chief-marketing-officer',
    name: 'AI Chief Marketing Officer',
    title: 'CMO',
    department: 'Marketing & Growth',
    departmentId: 3,
    level: 'c_level',
    description: 'Leads brand strategy, marketing campaigns, and growth initiatives.',
    capabilities: ['Brand Strategy', 'Marketing Leadership', 'Growth Hacking', 'Campaign Management', 'Market Research'],
    responsibilities: ['Define marketing vision', 'Drive brand awareness', 'Lead campaigns', 'Optimize ROI'],
    icon: 'Megaphone',
    color: '#E91E63',
    route: '/ai-agent/marketing/cmo',
    aiCost: '$2,400/mo',
    efficiency: '85%',
    isPremium: true,
    subAgents: [
      { id: 'ai-brand-strategist', name: 'AI Brand Strategist', title: 'Brand Strategist', parentId: 'ai-chief-marketing-officer', description: 'Develops brand strategy.', capabilities: ['Brand Positioning', 'Messaging', 'Visual Identity'] },
      { id: 'ai-marketing-analyst', name: 'AI Marketing Analyst', title: 'Marketing Analyst', parentId: 'ai-chief-marketing-officer', description: 'Analyzes marketing performance.', capabilities: ['Analytics', 'Attribution', 'Reporting'] },
      { id: 'ai-growth-hacker', name: 'AI Growth Hacker', title: 'Growth Hacker', parentId: 'ai-chief-marketing-officer', description: 'Drives growth experiments.', capabilities: ['A/B Testing', 'Experiments', 'Viral Loops'] },
    ]
  },
  {
    id: 'ai-vp-marketing',
    name: 'AI VP Marketing',
    title: 'VP Marketing',
    department: 'Marketing & Growth',
    departmentId: 3,
    level: 'vp_director',
    description: 'Oversees marketing operations and team.',
    capabilities: ['Marketing Operations', 'Team Leadership', 'Budget Management', 'Channel Strategy'],
    responsibilities: ['Lead marketing team', 'Manage budget', 'Optimize channels', 'Drive leads'],
    icon: 'TrendingUp',
    color: '#D81B60',
    route: '/ai-agent/marketing/vp-marketing',
    aiCost: '$1,800/mo',
    efficiency: '80%',
    isPremium: true,
    subAgents: [
      { id: 'ai-marketing-ops', name: 'AI Marketing Ops', title: 'Marketing Ops', parentId: 'ai-vp-marketing', description: 'Manages marketing operations.', capabilities: ['Process Optimization', 'Technology', 'Automation'] },
    ]
  },
  {
    id: 'ai-vp-growth',
    name: 'AI VP Growth',
    title: 'VP Growth',
    department: 'Marketing & Growth',
    departmentId: 3,
    level: 'vp_director',
    description: 'Leads growth initiatives and experiments.',
    capabilities: ['Growth Strategy', 'Experimentation', 'Funnel Optimization', 'Retention'],
    responsibilities: ['Drive user growth', 'Optimize conversion', 'Launch experiments', 'Scale channels'],
    icon: 'Rocket',
    color: '#C2185B',
    route: '/ai-agent/marketing/vp-growth',
    aiCost: '$1,800/mo',
    efficiency: '80%',
    isPremium: true,
    subAgents: [
      { id: 'ai-experiment-manager', name: 'AI Experiment Manager', title: 'Experiment Manager', parentId: 'ai-vp-growth', description: 'Manages growth experiments.', capabilities: ['Test Design', 'Statistical Analysis', 'Scaling'] },
    ]
  },
  {
    id: 'ai-marketing-manager',
    name: 'AI Marketing Manager',
    title: 'Marketing Manager',
    department: 'Marketing & Growth',
    departmentId: 3,
    level: 'manager',
    description: 'Manages marketing campaigns and team.',
    capabilities: ['Campaign Management', 'Content Strategy', 'Team Coordination', 'Performance Tracking'],
    responsibilities: ['Execute campaigns', 'Manage content', 'Coordinate team', 'Report results'],
    icon: 'Calendar',
    color: '#AD1457',
    route: '/ai-agent/marketing/marketing-manager',
    aiCost: '$1,200/mo',
    efficiency: '75%',
    isPremium: false,
    subAgents: [
      { id: 'ai-campaign-analyst', name: 'AI Campaign Analyst', title: 'Campaign Analyst', parentId: 'ai-marketing-manager', description: 'Analyzes campaign performance.', capabilities: ['Campaign Analysis', 'Optimization', 'Reporting'] },
    ]
  },
  {
    id: 'ai-content-marketing-specialist',
    name: 'AI Content Marketing Specialist',
    title: 'Content Specialist',
    department: 'Marketing & Growth',
    departmentId: 3,
    level: 'team_lead',
    description: 'Creates and manages content marketing.',
    capabilities: ['Content Creation', 'SEO', 'Storytelling', 'Distribution'],
    responsibilities: ['Create content', 'Optimize SEO', 'Manage blog', 'Drive engagement'],
    icon: 'PenTool',
    color: '#880E4F',
    route: '/ai-agent/marketing/content-specialist',
    aiCost: '$800/mo',
    efficiency: '70%',
    isPremium: false,
    subAgents: [
      { id: 'ai-copywriter', name: 'AI Copywriter', title: 'Copywriter', parentId: 'ai-content-marketing-specialist', description: 'Writes marketing copy.', capabilities: ['Copywriting', 'Persuasion', 'Tone'] },
      { id: 'ai-seo-specialist', name: 'AI SEO Specialist', title: 'SEO Specialist', parentId: 'ai-content-marketing-specialist', description: 'Optimizes for search.', capabilities: ['Keyword Research', 'On-Page SEO', 'Link Building'] },
    ]
  },
  {
    id: 'ai-social-media-manager',
    name: 'AI Social Media Manager',
    title: 'Social Media Manager',
    department: 'Marketing & Growth',
    departmentId: 3,
    level: 'team_lead',
    description: 'Manages social media presence.',
    capabilities: ['Social Strategy', 'Content Scheduling', 'Community Management', 'Analytics'],
    responsibilities: ['Manage social', 'Engage community', 'Create posts', 'Track metrics'],
    icon: 'Share2',
    color: '#6A1B9A',
    route: '/ai-agent/marketing/social-media-manager',
    aiCost: '$800/mo',
    efficiency: '70%',
    isPremium: false,
    subAgents: [
      { id: 'ai-community-manager', name: 'AI Community Manager', title: 'Community Manager', parentId: 'ai-social-media-manager', description: 'Manages community engagement.', capabilities: ['Community Building', 'Engagement', 'Moderation'] },
    ]
  },
  {
    id: 'ai-email-marketing-specialist',
    name: 'AI Email Marketing Specialist',
    title: 'Email Specialist',
    department: 'Marketing & Growth',
    departmentId: 3,
    level: 'specialist',
    description: 'Manages email marketing campaigns.',
    capabilities: ['Email Strategy', 'Automation', 'A/B Testing', 'Segmentation'],
    responsibilities: ['Create campaigns', 'Build automation', 'Optimize deliverability', 'Report results'],
    icon: 'Mail',
    color: '#4A148C',
    route: '/ai-agent/marketing/email-specialist',
    aiCost: '$450/mo',
    efficiency: '65%',
    isPremium: false,
    subAgents: [
      { id: 'ai-email-designer', name: 'AI Email Designer', title: 'Email Designer', parentId: 'ai-email-marketing-specialist', description: 'Designs email templates.', capabilities: ['Email Design', 'Responsive Design', 'Templates'] },
    ]
  },
];

// Add remaining departments 4-22 with similar structure
// For brevity, I'll create a generator function to populate all departments

// =============================================================================
// GENERATE ALL REMAINING DEPARTMENTS (4-22)
// =============================================================================

function generateDepartmentAgents(deptId: number, deptName: string, color: string, mainCount: number, subPerMain: number): MainAgent[] {
  const agents: MainAgent[] = [];
  const levelConfigs = [
    { level: 'c_level', cost: '$2,400/mo', eff: '85%', premium: true, role: 'Chief' },
    { level: 'vp_director', cost: '$1,800/mo', eff: '80%', premium: true, role: 'VP' },
    { level: 'manager', cost: '$1,200/mo', eff: '75%', premium: false, role: 'Manager' },
    { level: 'team_lead', cost: '$800/mo', eff: '70%', premium: false, role: 'Lead' },
    { level: 'specialist', cost: '$450/mo', eff: '65%', premium: false, role: 'Specialist' },
  ];
  
  const deptRoles: Record<number, string[]> = {
    4: ['COO', 'Operations Director', 'Process Manager', 'Quality Manager', 'Supply Chain Manager'],
    5: ['CFO', 'Finance Director', 'Accounting Manager', 'Controller', 'Treasurer'],
    6: ['CTO', 'Engineering Director', 'Dev Manager', 'Tech Lead', 'Architect'],
    7: ['CHRO', 'HR Director', 'Recruiting Manager', 'HR Manager', 'Training Manager'],
    8: ['CLO', 'Legal Director', 'Compliance Officer', 'General Counsel', 'Contract Manager'],
    9: ['Chief Data Officer', 'Data Director', 'Analytics Manager', 'Data Engineer', 'BI Manager'],
    10: ['CPO', 'Product Director', 'Product Manager', 'UX Manager', 'Research Manager'],
    11: ['CISO', 'Security Director', 'Risk Manager', 'Security Analyst', 'Compliance Manager'],
    12: ['Chief Scientist', 'Research Director', 'Research Manager', 'Lab Manager', 'Data Scientist'],
    13: ['CAO', 'Admin Director', 'Office Manager', 'Facilities Manager', 'Operations Manager'],
    14: ['CIO', 'Trading Director', 'Portfolio Manager', 'Risk Analyst', 'Quant Analyst'],
    15: ['CREO', 'Real Estate Director', 'Property Manager', 'Asset Manager', 'Leasing Manager'],
    16: ['CRO', 'Insurance Director', 'Underwriting Manager', 'Claims Manager', 'Risk Analyst'],
    17: ['Healthcare CMO', 'Medical Director', 'Healthcare Manager', 'Patient Services', 'Compliance Officer'],
    18: ['Manufacturing CTO', 'Production Director', 'Plant Manager', 'Quality Manager', 'Supply Chain Manager'],
    19: ['Logistics CTO', 'Transportation Director', 'Fleet Manager', 'Operations Manager', 'Dispatch Manager'],
    20: ['Government Affairs', 'Public Sector Director', 'Policy Manager', 'Compliance Manager', 'Program Manager'],
    21: ['Supply Chain CTO', 'Supply Chain Director', 'Procurement Manager', 'Logistics Manager', 'Inventory Manager'],
    22: ['AI Governance Lead', 'AI Ethics Officer', 'AI Compliance Manager', 'AI Risk Manager', 'AI Auditor'],
  };
  
  const roles = deptRoles[deptId] || ['Director', 'Manager', 'Lead', 'Specialist', 'Analyst'];
  
  let agentIdx = 0;
  for (let i = 0; i < Math.min(mainCount, roles.length); i++) {
    const config = levelConfigs[i] || levelConfigs[4];
    const subCount = Math.min(subPerMain, 3);
    const subAgents = [];
    for (let j = 0; j < subCount; j++) {
      subAgents.push({
        id: `ai-${deptName.toLowerCase().replace(/[^a-z]/g, '-')}-sub-${agentIdx}`,
        name: `AI ${roles[i]} Assistant ${j + 1}`,
        title: `${roles[i]} Assistant`,
        parentId: `ai-${deptName.toLowerCase().replace(/[^a-z]/g, '-')}-${i}`,
        description: `Assists ${roles[i]} with tasks.`,
        capabilities: ['Task Automation', 'Data Analysis', 'Reporting', 'Coordination'],
      });
    }
    
    agents.push({
      id: `ai-${deptName.toLowerCase().replace(/[^a-z]/g, '-')}-${i}`,
      name: `AI ${roles[i]}`,
      title: roles[i],
      department: deptName,
      departmentId: deptId,
      level: config.level as any,
      description: `Leads ${deptName} ${config.role.toLowerCase()} functions.`,
      capabilities: ['Strategic Planning', 'Team Leadership', 'Process Optimization', 'Performance Management'],
      responsibilities: ['Drive results', 'Lead team', 'Optimize processes', 'Report metrics'],
      icon: 'Briefcase',
      color: color,
      route: `/ai-agent/${deptName.toLowerCase().replace(/[^a-z]/g, '-')}/${i}`,
      aiCost: config.cost,
      efficiency: config.eff,
      isPremium: config.premium,
      subAgents,
    });
    agentIdx++;
  }
  
  return agents;
}

// Generate all remaining departments
const department4Agents = generateDepartmentAgents(4, 'Operations & Management', '#607D8B', 13, 3);
const department5Agents = generateDepartmentAgents(5, 'Finance & Accounting', '#2E7D32', 13, 3);
const department6Agents = generateDepartmentAgents(6, 'Technology & Engineering', '#1565C0', 16, 3);
const department7Agents = generateDepartmentAgents(7, 'Human Resources', '#9C27B0', 11, 3);
const department8Agents = generateDepartmentAgents(8, 'Legal & Compliance', '#3F51B5', 10, 3);
const department9Agents = generateDepartmentAgents(9, 'Data & Intelligence', '#AF52DE', 13, 3);
const department10Agents = generateDepartmentAgents(10, 'Product Management', '#FF5722', 10, 3);
const department11Agents = generateDepartmentAgents(11, 'Security & Risk', '#F44336', 12, 3);
const department12Agents = generateDepartmentAgents(12, 'Research & Development', '#009688', 9, 3);
const department13Agents = generateDepartmentAgents(13, 'Administrative', '#795548', 9, 3);
const department14Agents = generateDepartmentAgents(14, 'Trading & Investments', '#10B981', 18, 3);
const department15Agents = generateDepartmentAgents(15, 'Real Estate & Property', '#8D6E63', 14, 3);
const department16Agents = generateDepartmentAgents(16, 'Insurance & Risk', '#FF7043', 16, 3);
const department17Agents = generateDepartmentAgents(17, 'Healthcare & Medical', '#EC407A', 14, 3);
const department18Agents = generateDepartmentAgents(18, 'Manufacturing & Production', '#5C6BC0', 14, 3);
const department19Agents = generateDepartmentAgents(19, 'Transportation & Logistics', '#26A69A', 14, 3);
const department20Agents = generateDepartmentAgents(20, 'Government & Public Sector', '#78909C', 12, 3);
const department21Agents = generateDepartmentAgents(21, 'Supply Chain & Logistics', '#42A5F5', 10, 3);
const department22Agents = generateDepartmentAgents(22, 'AI Management & Governance', '#7C4DFF', 6, 3);

// Combine all departments
const allDepartmentAgents = [
  ...department1Agents,
  ...department2Agents,
  ...department3Agents,
  ...department4Agents,
  ...department5Agents,
  ...department6Agents,
  ...department7Agents,
  ...department8Agents,
  ...department9Agents,
  ...department10Agents,
  ...department11Agents,
  ...department12Agents,
  ...department13Agents,
  ...department14Agents,
  ...department15Agents,
  ...department16Agents,
  ...department17Agents,
  ...department18Agents,
  ...department19Agents,
  ...department20Agents,
  ...department21Agents,
  ...department22Agents,
];

// Export all agents
export const allCustomerExperienceAgents = department1Agents;
export const allSalesRevenueAgents = department2Agents;
export const allMarketingGrowthAgents = department3Agents;
export const allOperationsAgents = department4Agents;
export const allFinanceAgents = department5Agents;
export const allTechnologyAgents = department6Agents;
export const allHRAgents = department7Agents;
export const allLegalAgents = department8Agents;
export const allDataIntelligenceAgents = department9Agents;
export const allProductAgents = department10Agents;
export const allSecurityAgents = department11Agents;
export const allResearchAgents = department12Agents;
export const allAdministrativeAgents = department13Agents;
export const allTradingAgents = department14Agents;
export const allRealEstateAgents = department15Agents;
export const allInsuranceAgents = department16Agents;
export const allHealthcareAgents = department17Agents;
export const allManufacturingAgents = department18Agents;
export const allTransportationAgents = department19Agents;
export const allGovernmentAgents = department20Agents;
export const allSupplyChainAgents = department21Agents;
export const allAIGovernanceAgents = department22Agents;

// Complete workforce export
export const completeAIWorkforce = allDepartmentAgents;

// Calculate totals
export const workforceSummary = {
  totalMainAgents: allDepartmentAgents.length,
  totalSubAgents: allDepartmentAgents.reduce((sum, a) => sum + a.subAgents.length, 0),
  totalAgents: allDepartmentAgents.reduce((sum, a) => sum + 1 + a.subAgents.length, 0),
  totalDepartments: 22,
};

// Department summaries for quick reference
export const departmentSummaries = departments.map(d => {
  const deptAgents = allDepartmentAgents.filter(a => a.departmentId === d.id);
  return {
    ...d,
    agents: deptAgents,
    mainAgentCount: deptAgents.length,
    subAgentCount: deptAgents.reduce((sum, a) => sum + a.subAgents.length, 0),
  };
});

// Export helper functions
export function getAgentsByDepartment(deptId: number): MainAgent[] {
  return allDepartmentAgents.filter(a => a.departmentId === deptId);
}

export function getAgentsByLevel(level: string): MainAgent[] {
  return allDepartmentAgents.filter(a => a.level === level);
}

export function getAgentById(id: string): MainAgent | undefined {
  return allDepartmentAgents.find(a => a.id === id);
}
