// Travel & Tourism AI Operating System - Constants & Data Structures

export const TRAVEL_COLORS = {
  deepSpaceBlack: '#03050A',
  neonCyan: '#06B6D4',
  oceanBlue: '#3B82F6',
  emeraldGreen: '#10B981',
  purple: '#8B5CF6',
  amber: '#F59E0B',
  red: '#EF4444',
  magenta: '#EC4899',
};

export const TRAVEL_KPI_METRICS = {
  bookings: {
    totalBookings: { label: 'Total Bookings', value: '14.2M', trend: '+12.4%', trendUp: true, icon: 'Calendar' },
    bookingRevenue: { label: 'Booking Revenue', value: '$12.8B', trend: '+18.2%', trendUp: true, icon: 'DollarSign' },
    avgBookingValue: { label: 'Avg Booking Value', value: '$892', trend: '+8.6%', trendUp: true, icon: 'CreditCard' },
    conversionRate: { label: 'Conversion Rate', value: '4.8%', trend: '+1.2%', trendUp: true, icon: 'Target' },
    cancellationRate: { label: 'Cancellation Rate', value: '2.4%', trend: '-0.8%', trendUp: true, icon: 'XCircle' },
  },
  travelers: {
    activeTravelers: { label: 'Active Travelers', value: '38M', trend: '+15.6%', trendUp: true, icon: 'Users' },
    returningCustomers: { label: 'Returning Customers', value: '24.6M', trend: '+22.4%', trendUp: true, icon: 'RefreshCw' },
    customerSatisfaction: { label: 'Customer Satisfaction', value: '94.2%', trend: '+3.8%', trendUp: true, icon: 'Smile' },
    loyaltyMembers: { label: 'Loyalty Members', value: '18.4M', trend: '+28.6%', trendUp: true, icon: 'Award' },
    nps: { label: 'Net Promoter Score', value: '72', trend: '+5.4', trendUp: true, icon: 'Star' },
  },
  operations: {
    flightsMonitored: { label: 'Flights Monitored', value: '82,000', trend: '+8.2%', trendUp: true, icon: 'Plane' },
    hotelsConnected: { label: 'Hotels Connected', value: '45,000', trend: '+12.6%', trendUp: true, icon: 'Building2' },
    tourPackages: { label: 'Tour Packages', value: '12,400', trend: '+18.4%', trendUp: true, icon: 'Map' },
    transportationAvailability: { label: 'Transportation Availability', value: '94.8%', trend: '+2.4%', trendUp: true, icon: 'Car' },
    onTimePerformance: { label: 'On-Time Performance', value: '91.2%', trend: '+1.8%', trendUp: true, icon: 'Clock' },
  },
  tourism: {
    destinationPopularity: { label: 'Destination Popularity', value: '8.4/10', trend: '+0.6', trendUp: true, icon: 'Globe' },
    occupancyRate: { label: 'Occupancy Rate', value: '87%', trend: '+4.2%', trendUp: true, icon: 'Hotel' },
    seasonalDemand: { label: 'Seasonal Demand', value: '+34%', trend: '+12.4%', trendUp: true, icon: 'TrendingUp' },
    visitorGrowth: { label: 'Visitor Growth', value: '+28.6%', trend: '+8.2%', trendUp: true, icon: 'Users' },
    tourismRevenue: { label: 'Tourism Revenue', value: '$8.4B', trend: '+22.4%', trendUp: true, icon: 'DollarSign' },
  },
  ai: {
    personalizedItineraries: { label: 'Personalized Itineraries', value: '2.4M', trend: '+42.6%', trendUp: true, icon: 'Sparkles' },
    aiTravelAssistSessions: { label: 'AI Travel Assist Sessions', value: '8.6M', trend: '+56.4%', trendUp: true, icon: 'Bot' },
    forecastAccuracy: { label: 'Forecast Accuracy', value: '94.8%', trend: '+2.8%', trendUp: true, icon: 'Brain' },
    pricingOptimizations: { label: 'Pricing Optimizations', value: '1.2M', trend: '+38.2%', trendUp: true, icon: 'Zap' },
    revenueImpact: { label: 'Revenue Impact', value: '+$910M', trend: '+24.6%', trendUp: true, icon: 'TrendingUp' },
  },
};

export const AI_TRAVEL_AGENTS = [
  {
    id: 'agent-voyager',
    name: 'Agent Voyager',
    title: 'Trip Planning Agent',
    description: 'Autonomous AI agent for personalized itineraries, destination recommendations, route optimization, and vacation planning',
    color: TRAVEL_COLORS.neonCyan,
    icon: 'Compass',
    responsibilities: [
      'Personalized itineraries',
      'Destination recommendations',
      'Route optimization',
      'Vacation planning',
    ],
    metrics: {
      tripsPlanned: '842K',
      travelerSatisfaction: '96.4%',
      bookingConversion: '42.8%',
    },
  },
  {
    id: 'agent-horizon',
    name: 'Agent Horizon',
    title: 'Booking Operations Agent',
    description: 'Autonomous AI agent for reservation management, booking automation, availability optimization, and payment coordination',
    color: TRAVEL_COLORS.oceanBlue,
    icon: 'Calendar',
    responsibilities: [
      'Reservation management',
      'Booking automation',
      'Availability optimization',
      'Payment coordination',
    ],
    metrics: {
      bookingsProcessed: '4.2M',
      successRate: '98.6%',
      revenueGenerated: '$8.4B',
    },
  },
  {
    id: 'agent-atlas',
    name: 'Agent Atlas',
    title: 'Destination Intelligence Agent',
    description: 'Autonomous AI agent for tourism analytics, demand forecasting, seasonal insights, and attraction performance',
    color: TRAVEL_COLORS.purple,
    icon: 'Globe',
    responsibilities: [
      'Tourism analytics',
      'Demand forecasting',
      'Seasonal insights',
      'Attraction performance',
    ],
    metrics: {
      destinationsManaged: '2,400',
      forecastAccuracy: '94.2%',
      visitorGrowth: '+28.6%',
    },
  },
  {
    id: 'agent-orbit',
    name: 'Agent Orbit',
    title: 'Transportation Agent',
    description: 'Autonomous AI agent for flight monitoring, ground transportation, route optimization, and delay management',
    color: TRAVEL_COLORS.amber,
    icon: 'Plane',
    responsibilities: [
      'Flight monitoring',
      'Ground transportation',
      'Route optimization',
      'Delay management',
    ],
    metrics: {
      flightsTracked: '82,000',
      delayResolution: '94.8%',
      onTimePerformance: '91.2%',
    },
  },
  {
    id: 'agent-aurora',
    name: 'Agent Aurora',
    title: 'Hospitality Agent',
    description: 'Autonomous AI agent for hotel operations, guest experience, occupancy optimization, and service quality',
    color: TRAVEL_COLORS.magenta,
    icon: 'Hotel',
    responsibilities: [
      'Hotel operations',
      'Guest experience',
      'Occupancy optimization',
      'Service quality',
    ],
    metrics: {
      hotelsManaged: '45,000',
      occupancyRate: '87%',
      guestSatisfaction: '94.8%',
    },
  },
  {
    id: 'agent-compass',
    name: 'Agent Compass',
    title: 'Revenue Optimization Agent',
    description: 'Autonomous AI agent for dynamic pricing, demand forecasting, promotion management, and revenue intelligence',
    color: TRAVEL_COLORS.emeraldGreen,
    icon: 'TrendingUp',
    responsibilities: [
      'Dynamic pricing',
      'Demand forecasting',
      'Promotion management',
      'Revenue intelligence',
    ],
    metrics: {
      revenueImpact: '+$910M',
      pricingAccuracy: '96.4%',
      occupancyGrowth: '+12.4%',
    },
  },
];

export const TRAVELER_SEGMENTS = [
  { segment: 'Luxury Travelers', count: '8.4M', revenue: '$4.2B', satisfaction: '96.2%', growth: '+18.4%' },
  { segment: 'Business Travelers', count: '12.6M', revenue: '$5.8B', satisfaction: '92.8%', growth: '+12.6%' },
  { segment: 'Family Vacationers', count: '10.2M', revenue: '$3.4B', satisfaction: '94.4%', growth: '+22.4%' },
  { segment: 'Adventure Seekers', count: '4.8M', revenue: '$1.8B', satisfaction: '95.6%', growth: '+34.2%' },
  { segment: 'Budget Travelers', count: '2.0M', revenue: '$420M', satisfaction: '88.4%', growth: '+8.6%' },
];

export const BOOKING_FUNNEL = [
  { stage: 'Search', value: '48.2M', conversion: '100%', dropoff: '0%', color: TRAVEL_COLORS.oceanBlue },
  { stage: 'View Details', value: '28.4M', conversion: '58.9%', dropoff: '41.1%', color: TRAVEL_COLORS.neonCyan },
  { stage: 'Add to Cart', value: '12.6M', conversion: '26.1%', dropoff: '55.6%', color: TRAVEL_COLORS.purple },
  { stage: 'Checkout', value: '8.4M', conversion: '17.4%', dropoff: '33.3%', color: TRAVEL_COLORS.amber },
  { stage: 'Payment', value: '6.2M', conversion: '12.9%', dropoff: '26.2%', color: TRAVEL_COLORS.magenta },
  { stage: 'Confirmation', value: '4.8M', conversion: '10.0%', dropoff: '22.6%', color: TRAVEL_COLORS.emeraldGreen },
];

export const FLIGHT_STATUS_DATA = [
  { airline: 'Delta', flights: '12,400', onTime: '92.4%', delays: '7.6%', cancellations: '0.4%' },
  { airline: 'United', flights: '10,800', onTime: '89.8%', delays: '9.4%', cancellations: '0.8%' },
  { airline: 'American', flights: '11,200', onTime: '91.2%', delays: '8.2%', cancellations: '0.6%' },
  { airline: 'Southwest', flights: '14,600', onTime: '88.6%', delays: '10.8%', cancellations: '0.6%' },
  { airline: 'JetBlue', flights: '6,400', onTime: '90.4%', delays: '9.0%', cancellations: '0.6%' },
];

export const HOTEL_PERFORMANCE = [
  { chain: 'Marriott', hotels: '8,400', occupancy: '89.2%', adr: '$284', revpar: '$253', satisfaction: '94.8%' },
  { chain: 'Hilton', hotels: '7,200', occupancy: '86.4%', adr: '$268', revpar: '$232', satisfaction: '93.6%' },
  { chain: 'Hyatt', hotels: '4,800', occupancy: '88.8%', adr: '$312', revpar: '$277', satisfaction: '95.2%' },
  { chain: 'IHG', hotels: '6,400', occupancy: '84.6%', adr: '$198', revpar: '$167', satisfaction: '92.4%' },
  { chain: 'Accor', hotels: '5,200', occupancy: '82.8%', adr: '$186', revpar: '$154', satisfaction: '91.8%' },
];

export const POPULAR_DESTINATIONS = [
  { destination: 'Paris', visitors: '4.2M', revenue: '$2.8B', satisfaction: '96.4%', growth: '+18.6%' },
  { destination: 'Tokyo', visitors: '3.8M', revenue: '$2.4B', satisfaction: '95.8%', growth: '+24.2%' },
  { destination: 'New York', visitors: '3.6M', revenue: '$2.6B', satisfaction: '94.2%', growth: '+12.4%' },
  { destination: 'London', visitors: '3.4M', revenue: '$2.2B', satisfaction: '93.8%', growth: '+14.8%' },
  { destination: 'Dubai', visitors: '2.8M', revenue: '$2.0B', satisfaction: '95.4%', growth: '+32.6%' },
  { destination: 'Singapore', visitors: '2.4M', revenue: '$1.8B', satisfaction: '96.8%', growth: '+22.4%' },
];

export const AI_INSIGHTS = [
  {
    type: 'opportunity',
    message: 'Beach destinations are projected to experience 27% higher demand next month.',
    impact: 'High',
    action: 'Increase inventory and pricing for beach destinations',
  },
  {
    type: 'revenue',
    message: 'Dynamic pricing opportunity identified worth $34M in additional revenue.',
    impact: 'High',
    action: 'Implement dynamic pricing adjustments',
  },
  {
    type: 'alert',
    message: 'Flight disruption risk detected across three major airports.',
    impact: 'Critical',
    action: 'Activate contingency protocols and notify affected travelers',
  },
  {
    type: 'trend',
    message: 'Luxury travelers show increased interest in eco-tourism packages.',
    impact: 'Medium',
    action: 'Expand eco-tourism offerings for luxury segment',
  },
  {
    type: 'forecast',
    message: 'Hotel occupancy forecast exceeds 95% during the upcoming holiday season.',
    impact: 'High',
    action: 'Optimize pricing and inventory allocation',
  },
];

export const REAL_TIME_ACTIVITIES = [
  { event: 'Booking confirmed', time: '2s ago', user: 'John D.', location: 'Paris' },
  { event: 'Flight departed', time: '15s ago', flight: 'DL284', route: 'JFK → CDG' },
  { event: 'Hotel check-in completed', time: '32s ago', hotel: 'Marriott Paris', guest: 'Sarah M.' },
  { event: 'Tour started', time: '45s ago', tour: 'Louvre VIP', guide: 'Guide AI-7' },
  { event: 'Customer review submitted', time: '1m ago', rating: '5/5', destination: 'Tokyo' },
  { event: 'Weather alert issued', time: '2m ago', location: 'London', alert: 'Rain expected' },
  { event: 'AI itinerary generated', time: '3m ago', traveler: 'Mike R.', duration: '7 days' },
  { event: 'Loyalty reward redeemed', time: '4m ago', points: '25,000', reward: 'Free night' },
];

export const TRANSPORTATION_MODES = [
  { mode: 'Car Rentals', bookings: '2.4M', utilization: '78.4%', revenue: '$840M', satisfaction: '92.8%' },
  { mode: 'Rail Services', bookings: '1.8M', utilization: '84.2%', revenue: '$620M', satisfaction: '94.4%' },
  { mode: 'Shuttle Operations', bookings: '840K', utilization: '72.6%', revenue: '$180M', satisfaction: '91.2%' },
  { mode: 'Cruise Activity', bookings: '420K', utilization: '92.4%', revenue: '$1.2B', satisfaction: '96.8%' },
  { mode: 'Local Transportation', bookings: '4.2M', utilization: '68.4%', revenue: '$340M', satisfaction: '89.6%' },
];

export const PRICING_DATA = [
  { category: 'Dynamic Pricing', adjustments: '1.2M', revenueImpact: '+$420M', accuracy: '96.4%' },
  { category: 'Package Performance', packages: '8,400', revenue: '$3.4B', conversion: '42.8%' },
  { category: 'Seasonal Pricing', periods: '24', revenueImpact: '+$280M', uplift: '+18.4%' },
  { category: 'Promotions', campaigns: '486', revenueImpact: '+$180M', roi: '340%' },
  { category: 'Profit Margins', average: '28.4%', target: '32%', variance: '-3.6%' },
];

export const MARKETING_METRICS = [
  { campaign: 'Summer Escape', impressions: '48.2M', clicks: '2.4M', conversions: '84K', roi: '420%' },
  { campaign: 'Luxury Getaway', impressions: '28.4M', clicks: '1.8M', conversions: '62K', roi: '380%' },
  { campaign: 'Family Adventure', impressions: '36.8M', clicks: '2.2M', conversions: '78K', roi: '360%' },
  { campaign: 'Business Travel', impressions: '18.4M', clicks: '840K', conversions: '42K', roi: '320%' },
  { campaign: 'Eco Tourism', impressions: '14.6M', clicks: '620K', conversions: '28K', roi: '280%' },
];

export const LOYALTY_DATA = {
  totalMembers: '18.4M',
  activeMembers: '14.2M',
  tierDistribution: [
    { tier: 'Platinum', members: '840K', benefits: 'Unlimited upgrades', retention: '96.4%' },
    { tier: 'Gold', members: '3.2M', benefits: 'Priority boarding', retention: '92.8%' },
    { tier: 'Silver', members: '6.8M', benefits: 'Lounge access', retention: '88.4%' },
    { tier: 'Bronze', members: '7.6M', benefits: 'Points earning', retention: '82.6%' },
  ],
  pointsIssued: '8.4B',
  pointsRedeemed: '4.2B',
  rewardValue: '$680M',
};
