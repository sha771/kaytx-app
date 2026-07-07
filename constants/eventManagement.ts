import { 
  Calendar, DollarSign, Users, CheckCircle, Ticket, MapPin, Building2,
  Activity, Radio, Megaphone, BarChart3, Settings, TrendingUp, Target, Shield
} from 'lucide-react-native';

// Event Management Department Configuration
export const eventManagementDepartment = {
  id: 'event-management',
  name: 'Event Management',
  primaryColor: '#06B6D4',
  description: 'AI-powered event planning, execution, and operations',
  icon: Calendar,
};

// Event Management Agents
export const eventManagementAgents = [
  {
    id: 'agent-planner',
    name: 'Agent Planner',
    role: 'Event Planning Agent',
    icon: Calendar,
    color: '#06B6D4',
    status: 'active',
    efficiency: '94%',
    responsibilities: [
      'Event scheduling',
      'Timeline management',
      'Resource allocation',
      'Planning automation'
    ],
    metrics: [
      { label: 'Events Planned', value: '847', trend: '+12%' },
      { label: 'Schedule Accuracy', value: '96%', trend: '+3%' },
      { label: 'Planning Efficiency', value: '89%', trend: '+5%' },
      { label: 'Tasks Completed', value: '12.4K', trend: '+18%' }
    ]
  },
  {
    id: 'agent-venue',
    name: 'Agent Venue',
    role: 'Venue Operations Agent',
    icon: MapPin,
    color: '#8B5CF6',
    status: 'active',
    efficiency: '92%',
    responsibilities: [
      'Venue selection',
      'Capacity management',
      'Facility coordination',
      'Logistics planning'
    ],
    metrics: [
      { label: 'Venues Managed', value: '2,450', trend: '+5%' },
      { label: 'Capacity Utilization', value: '87%', trend: '+4%' },
      { label: 'Ready for Events', value: '2,180', trend: '+2%' },
      { label: 'Maintenance Alerts', value: '47', trend: '-12%' }
    ]
  },
  {
    id: 'agent-ticket',
    name: 'Agent Ticket',
    role: 'Ticketing Agent',
    icon: Ticket,
    color: '#10B981',
    status: 'active',
    efficiency: '96%',
    responsibilities: [
      'Ticket sales',
      'Registration management',
      'Check-in processing',
      'Revenue tracking'
    ],
    metrics: [
      { label: 'Tickets Sold', value: '9.4M', trend: '+15%' },
      { label: 'Revenue', value: '$5.8B', trend: '+18%' },
      { label: 'Check-ins', value: '8.7M', trend: '+12%' },
      { label: 'Attendance Rate', value: '93%', trend: '+2%' }
    ]
  },
  {
    id: 'agent-connect',
    name: 'Agent Connect',
    role: 'Attendee Engagement Agent',
    icon: Users,
    color: '#F59E0B',
    status: 'active',
    efficiency: '91%',
    responsibilities: [
      'Attendee communication',
      'Engagement tracking',
      'Feedback collection',
      'Networking facilitation'
    ],
    metrics: [
      { label: 'Registrations', value: '12.4M', trend: '+14%' },
      { label: 'Engagement Score', value: '94%', trend: '+6%' },
      { label: 'Satisfaction Rate', value: '4.8/5', trend: '+5%' },
      { label: 'Connections Made', value: '1.2M', trend: '+14%' }
    ]
  },
  {
    id: 'agent-sponsor',
    name: 'Agent Sponsor',
    role: 'Sponsorship Agent',
    icon: DollarSign,
    color: '#FFD700',
    status: 'active',
    efficiency: '93%',
    responsibilities: [
      'Sponsor acquisition',
      'Contract management',
      'ROI tracking',
      'Activation coordination'
    ],
    metrics: [
      { label: 'Active Sponsors', value: '3,240', trend: '+10%' },
      { label: 'Sponsorship Revenue', value: '$920M', trend: '+22%' },
      { label: 'Avg ROI', value: '3.8x', trend: '+15%' },
      { label: 'Brand Exposure', value: '156M', trend: '+18%' }
    ]
  },
  {
    id: 'agent-guardian',
    name: 'Agent Guardian',
    role: 'Security & Safety Agent',
    icon: Shield,
    color: '#EC4899',
    status: 'active',
    efficiency: '97%',
    responsibilities: [
      'Security monitoring',
      'Risk assessment',
      'Emergency response',
      'Safety compliance'
    ],
    metrics: [
      { label: 'Security Incidents', value: '12', trend: '-45%' },
      { label: 'Risk Predictions', value: '3,240', trend: '+22%' },
      { label: 'Response Time', value: '2.3s', trend: '-15%' },
      { label: 'Compliance Rate', value: '99.8%', trend: '+0.5%' }
    ]
  }
];

// Event Management KPIs
export const eventManagementKPIs = {
  event: [
    { label: 'Active Events', value: '1,260', icon: Calendar, color: '#06B6D4', trend: '+12%', forecast: '1,420' },
    { label: 'Upcoming Events', value: '847', icon: Activity, color: '#8B5CF6', trend: '+8%', forecast: '915' },
    { label: 'Total Attendees', value: '9.4M', icon: Users, color: '#10B981', trend: '+15%', forecast: '10.8M' },
    { label: 'Completion Rate', value: '94%', icon: CheckCircle, color: '#F59E0B', trend: '+2%', forecast: '96%' },
    { label: 'Satisfaction', value: '4.8/5', icon: Target, color: '#EC4899', trend: '+5%', forecast: '4.9/5' },
  ],
  revenue: [
    { label: 'Total Revenue', value: '$7.2B', icon: DollarSign, color: '#10B981', trend: '+22%', forecast: '$8.4B' },
    { label: 'Ticket Sales', value: '$5.8B', icon: Ticket, color: '#06B6D4', trend: '+18%', forecast: '$6.8B' },
    { label: 'Sponsorship', value: '$920M', icon: DollarSign, color: '#FFD700', trend: '+22%', forecast: '$1.1B' },
    { label: 'Merchandise', value: '$340M', icon: DollarSign, color: '#8B5CF6', trend: '+15%', forecast: '$390M' },
    { label: 'Profit Margin', value: '33%', icon: TrendingUp, color: '#F59E0B', trend: '+12%', forecast: '35%' },
  ],
  operations: [
    { label: 'Venues Managed', value: '2,450', icon: Building2, color: '#06B6D4', trend: '+5%', forecast: '2,580' },
    { label: 'Vendors Active', value: '8,920', icon: Building2, color: '#8B5CF6', trend: '+10%', forecast: '9,800' },
    { label: 'Staff Deployed', value: '124K', icon: Users, color: '#10B981', trend: '+8%', forecast: '134K' },
    { label: 'System Health', value: '98%', icon: Activity, color: '#F59E0B', trend: '+2%', forecast: '99%' },
  ],
  marketing: [
    { label: 'Registrations', value: '12.4M', icon: Users, color: '#06B6D4', trend: '+14%', forecast: '14.1M' },
    { label: 'Conversion Rate', value: '24%', icon: Target, color: '#10B981', trend: '+4%', forecast: '26%' },
    { label: 'Social Reach', value: '156M', icon: Activity, color: '#8B5CF6', trend: '+18%', forecast: '184M' },
    { label: 'Brand Awareness', value: '87%', icon: TrendingUp, color: '#F59E0B', trend: '+6%', forecast: '91%' },
  ],
  ai: [
    { label: 'AI Tasks Completed', value: '847K', icon: Activity, color: '#06B6D4', trend: '+18%', forecast: '1.0M' },
    { label: 'Planning Efficiency', value: '94%', icon: Calendar, color: '#10B981', trend: '+5%', forecast: '96%' },
    { label: 'Risk Predictions', value: '3,240', icon: Activity, color: '#8B5CF6', trend: '+22%', forecast: '3,950' },
    { label: 'Cost Savings', value: '$410M', icon: DollarSign, color: '#F59E0B', trend: '+35%', forecast: '$550M' },
  ]
};

// Event Management Navigation
export const eventManagementNavigation = [
  { name: 'Dashboard', route: '/event-management/dashboard', icon: BarChart3 },
  { name: 'AI Agents', route: '/event-management/agents', icon: Activity },
  { name: 'Planning', route: '/event-management/planning', icon: Calendar },
  { name: 'Ticketing', route: '/event-management/ticketing', icon: Ticket },
  { name: 'Venues', route: '/event-management/venues', icon: MapPin },
  { name: 'Attendees', route: '/event-management/attendees', icon: Users },
  { name: 'Vendors', route: '/event-management/vendors', icon: Building2 },
  { name: 'Sponsors', route: '/event-management/sponsors', icon: DollarSign },
  { name: 'Marketing', route: '/event-management/marketing', icon: Megaphone },
  { name: 'Live Operations', route: '/event-management/live-operations', icon: Radio },
  { name: 'Financial', route: '/event-management/financial', icon: DollarSign },
  { name: 'Analytics', route: '/event-management/analytics', icon: BarChart3 },
  { name: 'Settings', route: '/event-management/settings', icon: Settings },
];

// Event Status Types
export const eventStatusTypes = {
  planning: { color: '#F59E0B', label: 'Planning' },
  onSale: { color: '#06B6D4', label: 'On Sale' },
  sellingFast: { color: '#10B981', label: 'Selling Fast' },
  soldOut: { color: '#EF4444', label: 'Sold Out' },
  live: { color: '#10B981', label: 'Live' },
  completed: { color: '#8B5CF6', label: 'Completed' },
  cancelled: { color: '#EF4444', label: 'Cancelled' },
};

// Ticket Tier Types
export const ticketTierTypes = {
  vip: { color: '#FFD700', label: 'VIP', multiplier: 5 },
  premium: { color: '#8B5CF6', label: 'Premium', multiplier: 3 },
  general: { color: '#06B6D4', label: 'General', multiplier: 1 },
  earlyBird: { color: '#10B981', label: 'Early Bird', multiplier: 0.7 },
  student: { color: '#F59E0B', label: 'Student', multiplier: 0.5 },
};

// Sponsorship Tier Types
export const sponsorshipTierTypes = {
  platinum: { color: '#FFD700', label: 'Platinum', minInvestment: 10000000 },
  gold: { color: '#8B5CF6', label: 'Gold', minInvestment: 5000000 },
  silver: { color: '#06B6D4', label: 'Silver', minInvestment: 2000000 },
  bronze: { color: '#CD7F32', label: 'Bronze', minInvestment: 500000 },
  community: { color: '#10B981', label: 'Community', minInvestment: 100000 },
};

// Venue Status Types
export const venueStatusTypes = {
  active: { color: '#10B981', label: 'Active' },
  preparing: { color: '#F59E0B', label: 'Preparing' },
  maintenance: { color: '#EF4444', label: 'Maintenance' },
  offline: { color: '#6B7280', label: 'Offline' },
};

// Facility Status Types
export const facilityStatusTypes = {
  optimal: { color: '#10B981', label: 'Optimal' },
  operational: { color: '#06B6D4', label: 'Operational' },
  maintenance: { color: '#F59E0B', label: 'Maintenance' },
  offline: { color: '#EF4444', label: 'Offline' },
};
