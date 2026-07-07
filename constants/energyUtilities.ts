// Energy & Utilities AI Operating System - Constants & Data Structures

export const ENERGY_COLORS = {
  deepSpaceBlack: '#03050A',
  neonCyan: '#06B6D4',
  electricBlue: '#3B82F6',
  emeraldGreen: '#10B981',
  purple: '#8B5CF6',
  amber: '#F59E0B',
  red: '#EF4444',
  magenta: '#EC4899',
};

export const ENERGY_KPI_METRICS = {
  energy: {
    totalEnergyGenerated: { label: 'Total Energy Generated', value: '845 GW', trend: '+8.4%', trendUp: true, icon: 'Zap' },
    gridCapacity: { label: 'Grid Capacity', value: '1,200 GW', trend: '+12.6%', trendUp: true, icon: 'Bolt' },
    peakLoad: { label: 'Peak Load', value: '680 GW', trend: '+6.2%', trendUp: true, icon: 'Activity' },
    renewableShare: { label: 'Renewable Energy Share', value: '48%', trend: '+18.4%', trendUp: true, icon: 'Leaf' },
    carbonEmissions: { label: 'Carbon Emissions', value: '124 Mt', trend: '-12.4%', trendUp: false, icon: 'Cloud' },
  },
  operations: {
    activePowerPlants: { label: 'Active Power Plants', value: '6,800', trend: '+4.2%', trendUp: true, icon: 'Building2' },
    gridAvailability: { label: 'Grid Availability', value: '99.98%', trend: '+0.2%', trendUp: true, icon: 'CheckCircle' },
    systemUptime: { label: 'System Uptime', value: '99.95%', trend: '+0.1%', trendUp: true, icon: 'Clock' },
    outageCount: { label: 'Outage Count', value: '142', trend: '-28.6%', trendUp: true, icon: 'AlertTriangle' },
    maintenanceCompletion: { label: 'Maintenance Completion', value: '96.4%', trend: '+8.2%', trendUp: true, icon: 'Wrench' },
  },
  customer: {
    connectedCustomers: { label: 'Connected Customers', value: '95M', trend: '+12.4%', trendUp: true, icon: 'Users' },
    smartMeterCoverage: { label: 'Smart Meter Coverage', value: '87%', trend: '+14.2%', trendUp: true, icon: 'Gauge' },
    customerSatisfaction: { label: 'Customer Satisfaction', value: '94.2%', trend: '+4.8%', trendUp: true, icon: 'Smile' },
    serviceRequests: { label: 'Service Requests', value: '124K', trend: '-8.4%', trendUp: true, icon: 'MessageSquare' },
    avgRestorationTime: { label: 'Avg Restoration Time', value: '42 min', trend: '-18.6%', trendUp: true, icon: 'Timer' },
  },
  financial: {
    energyRevenue: { label: 'Energy Revenue', value: '$48.2B', trend: '+16.4%', trendUp: true, icon: 'DollarSign' },
    tradingRevenue: { label: 'Trading Revenue', value: '$12.4B', trend: '+24.6%', trendUp: true, icon: 'TrendingUp' },
    operationalCosts: { label: 'Operational Costs', value: '$28.6B', trend: '-8.2%', trendUp: true, icon: 'ArrowDown' },
    energyLosses: { label: 'Energy Losses', value: '4.2%', trend: '-12.4%', trendUp: true, icon: 'Minus' },
    roi: { label: 'ROI', value: '28.4%', trend: '+6.8%', trendUp: true, icon: 'Percent' },
  },
  ai: {
    demandForecastAccuracy: { label: 'Demand Forecast Accuracy', value: '96.8%', trend: '+4.2%', trendUp: true, icon: 'Brain' },
    predictiveMaintenanceAlerts: { label: 'Predictive Maintenance Alerts', value: '2,840', trend: '+34.6%', trendUp: true, icon: 'Bell' },
    gridOptimizations: { label: 'Grid Optimizations', value: '18,400', trend: '+42.8%', trendUp: true, icon: 'Settings' },
    aiAutomationRate: { label: 'AI Automation Rate', value: '78%', trend: '+12.4%', trendUp: true, icon: 'Bot' },
    energySavings: { label: 'Energy Savings', value: '+$2.3B', trend: '+28.6%', trendUp: true, icon: 'PiggyBank' },
  },
};

export const AI_ENERGY_AGENTS = [
  {
    id: 'agent-volt',
    name: 'Agent Volt',
    title: 'Grid Intelligence Agent',
    description: 'Autonomous AI agent for grid monitoring, load balancing, outage prediction, and voltage optimization',
    color: ENERGY_COLORS.neonCyan,
    icon: 'Zap',
    responsibilities: [
      'Grid monitoring',
      'Load balancing',
      'Outage prediction',
      'Voltage optimization',
    ],
    metrics: {
      gridStability: '99.98%',
      loadEfficiency: '94.2%',
      outagesPrevented: '1,240',
    },
  },
  {
    id: 'agent-solaris',
    name: 'Agent Solaris',
    title: 'Renewable Energy Agent',
    description: 'Autonomous AI agent for solar optimization, wind forecasting, battery storage, and renewable dispatch',
    color: ENERGY_COLORS.emeraldGreen,
    icon: 'Sun',
    responsibilities: [
      'Solar optimization',
      'Wind forecasting',
      'Battery storage',
      'Renewable dispatch',
    ],
    metrics: {
      renewableOutput: '406 GW',
      storageEfficiency: '92.4%',
      carbonReduction: '18.4%',
    },
  },
  {
    id: 'agent-titan',
    name: 'Agent Titan',
    title: 'Infrastructure Agent',
    description: 'Autonomous AI agent for asset monitoring, predictive maintenance, equipment diagnostics, and failure prevention',
    color: ENERGY_COLORS.purple,
    icon: 'Building2',
    responsibilities: [
      'Asset monitoring',
      'Predictive maintenance',
      'Equipment diagnostics',
      'Failure prevention',
    ],
    metrics: {
      assetsMonitored: '124,000',
      maintenanceAccuracy: '96.8%',
      downtimeReduction: '42%',
    },
  },
  {
    id: 'agent-hydro',
    name: 'Agent Hydro',
    title: 'Water Utility Agent',
    description: 'Autonomous AI agent for water distribution, leak detection, consumption forecasting, and water quality monitoring',
    color: ENERGY_COLORS.electricBlue,
    icon: 'Droplets',
    responsibilities: [
      'Water distribution',
      'Leak detection',
      'Consumption forecasting',
      'Water quality monitoring',
    ],
    metrics: {
      leaksPrevented: '840',
      waterEfficiency: '94.8%',
      serviceAvailability: '99.2%',
    },
  },
  {
    id: 'agent-mercury',
    name: 'Agent Mercury',
    title: 'Energy Trading Agent',
    description: 'Autonomous AI agent for market forecasting, price optimization, trading automation, and risk management',
    color: ENERGY_COLORS.amber,
    icon: 'TrendingUp',
    responsibilities: [
      'Market forecasting',
      'Price optimization',
      'Trading automation',
      'Risk management',
    ],
    metrics: {
      tradingVolume: '$12.4B',
      revenueGenerated: '$2.8B',
      forecastAccuracy: '94.6%',
    },
  },
  {
    id: 'agent-sentinel',
    name: 'Agent Sentinel',
    title: 'Security & Compliance Agent',
    description: 'Autonomous AI agent for cybersecurity, infrastructure protection, regulatory compliance, and threat detection',
    color: ENERGY_COLORS.red,
    icon: 'Shield',
    responsibilities: [
      'Cybersecurity',
      'Infrastructure protection',
      'Regulatory compliance',
      'Threat detection',
    ],
    metrics: {
      threatsBlocked: '12,400',
      complianceScore: '98.4%',
      securityIncidents: '8',
    },
  },
];

export const POWER_PLANT_DATA = [
  { type: 'Thermal Plants', count: '2,400', capacity: '320 GW', output: '284 GW', efficiency: '88.4%', availability: '92.4%' },
  { type: 'Nuclear Plants', count: '120', capacity: '98 GW', output: '94 GW', efficiency: '96.2%', availability: '96.8%' },
  { type: 'Hydroelectric', count: '680', capacity: '180 GW', output: '168 GW', efficiency: '93.4%', availability: '94.2%' },
  { type: 'Gas Turbines', count: '1,200', capacity: '240 GW', output: '212 GW', efficiency: '88.4%', availability: '91.8%' },
  { type: 'Solar Farms', count: '840', capacity: '120 GW', output: '98 GW', efficiency: '81.6%', availability: '82.4%' },
  { type: 'Wind Farms', count: '1,520', capacity: '180 GW', output: '142 GW', efficiency: '78.8%', availability: '79.2%' },
];

export const RENEWABLE_ENERGY_DATA = [
  { source: 'Solar', capacity: '120 GW', output: '98 GW', growth: '+24.6%', efficiency: '81.6%', carbonOffset: '42 Mt' },
  { source: 'Wind', capacity: '180 GW', output: '142 GW', growth: '+28.4%', efficiency: '78.8%', carbonOffset: '58 Mt' },
  { source: 'Hydro', capacity: '180 GW', output: '168 GW', growth: '+4.2%', efficiency: '93.4%', carbonOffset: '68 Mt' },
  { source: 'Geothermal', capacity: '12 GW', output: '11 GW', growth: '+8.4%', efficiency: '91.6%', carbonOffset: '4 Mt' },
  { source: 'Biomass', capacity: '8 GW', output: '7 GW', growth: '+12.2%', efficiency: '87.4%', carbonOffset: '2 Mt' },
];

export const OIL_GAS_DATA = [
  { facility: 'Production Platforms', count: '240', output: '2.4M bpd', efficiency: '94.2%', uptime: '96.8%' },
  { facility: 'Refineries', count: '48', capacity: '8.4M bpd', utilization: '88.4%', throughput: '7.4M bpd' },
  { facility: 'Pipelines', length: '48,000 km', flow: '6.8M bpd', integrity: '99.2%', incidents: '2' },
  { facility: 'Storage Facilities', count: '320', capacity: '840M barrels', utilization: '78.4%', safety: '99.8%' },
  { facility: 'Distribution Networks', outlets: '12,400', delivery: '4.2M bpd', reliability: '98.6%', satisfaction: '94.4%' },
];

export const WATER_UTILITIES_DATA = [
  { metric: 'Water Production', value: '8.4B m³', trend: '+6.4%', efficiency: '92.4%', quality: '99.8%' },
  { metric: 'Distribution Networks', length: '480,000 km', leaks: '0.8%', pressure: '98.2%', reliability: '99.4%' },
  { metric: 'Reservoir Levels', capacity: '84%', volume: '12.4B m³', quality: '99.6%', sustainability: '94.8%' },
  { metric: 'Treatment Plants', count: '640', capacity: '12.8B m³', efficiency: '94.2%', compliance: '99.8%' },
  { metric: 'Smart Meters', deployment: '68%', readings: '84M/day', accuracy: '99.4%', savings: '$340M' },
];

export const ENERGY_TRADING_DATA = [
  { market: 'Day-Ahead Market', volume: '$4.2B', trades: '12,400', avgPrice: '$84/MWh', volatility: '12.4%' },
  { market: 'Real-Time Market', volume: '$1.8B', trades: '8,400', avgPrice: '$92/MWh', volatility: '18.6%' },
  { market: 'Futures Market', volume: '$3.4B', trades: '6,200', avgPrice: '$88/MWh', volatility: '8.4%' },
  { market: 'Capacity Market', volume: '$1.2B', trades: '2,400', avgPrice: '$42/kW-month', volatility: '6.2%' },
  { market: 'Ancillary Services', volume: '$840M', trades: '4,200', avgPrice: '$28/MWh', volatility: '14.8%' },
];

export const INFRASTRUCTURE_DATA = [
  { asset: 'Substations', count: '12,400', health: '96.8%', critical: '240', maintenance: '94.2%' },
  { asset: 'Transmission Lines', length: '480,000 km', condition: '94.4%', load: '78.6%', upgrades: '1,240' },
  { asset: 'Transformers', count: '48,000', health: '95.2%', failures: '12', replacement: '680' },
  { asset: 'Smart Meters', deployment: '87%', active: '82.6M', accuracy: '99.4%', savings: '$680M' },
  { asset: 'Distribution Assets', count: '2.4M', health: '93.8%', critical: '8,400', maintenance: '91.6%' },
];

export const SUSTAINABILITY_DATA = [
  { metric: 'Carbon Emissions', current: '124 Mt', target: '100 Mt', reduction: '-12.4%', progress: '76%' },
  { metric: 'Renewable Energy', current: '48%', target: '60%', increase: '+18.4%', progress: '80%' },
  { metric: 'Energy Efficiency', current: '42%', target: '50%', improvement: '+8.4%', progress: '84%' },
  { metric: 'ESG Score', current: '88/100', target: '95/100', increase: '+6.4%', progress: '92%' },
  { metric: 'Green Investments', current: '$8.4B', target: '$12B', increase: '+28.6%', progress: '70%' },
];

export const AI_INSIGHTS = [
  {
    type: 'opportunity',
    message: 'Peak demand expected to increase by 16% between 5 PM and 8 PM today.',
    impact: 'High',
    action: 'Activate demand response protocols and optimize battery storage',
  },
  {
    type: 'alert',
    message: 'Predictive maintenance identified transformer failures with 97% confidence in the northeast corridor.',
    impact: 'Critical',
    action: 'Schedule immediate inspection and prepare backup capacity',
  },
  {
    type: 'trend',
    message: 'Renewable energy generation will exceed forecast by 12% tomorrow due to favorable weather conditions.',
    impact: 'High',
    action: 'Adjust dispatch schedules and maximize grid storage',
  },
  {
    type: 'revenue',
    message: 'Battery storage optimization could reduce operating costs by $24M annually.',
    impact: 'High',
    action: 'Implement AI-driven storage optimization algorithms',
  },
  {
    type: 'alert',
    message: 'Grid congestion detected in the northeast transmission corridor.',
    impact: 'Critical',
    action: 'Activate rerouting protocols and notify affected regions',
  },
];

export const REAL_TIME_ACTIVITIES = [
  { event: 'Power plant synchronized', time: '2s ago', plant: 'Solar Farm Alpha', output: '120 MW' },
  { event: 'Solar farm reached peak output', time: '15s ago', farm: 'Desert Sun Array', output: '480 MW' },
  { event: 'Wind generation increased', time: '32s ago', farm: 'Coastal Wind Park', increase: '+24%' },
  { event: 'Grid load balanced', time: '45s ago', region: 'Northeast', load: '680 GW' },
  { event: 'Equipment maintenance completed', time: '1m ago', asset: 'Transformer T-240', duration: '4h' },
  { event: 'Outage restored', time: '2m ago', region: 'Midwest', customers: '12,400', time: '38 min' },
  { event: 'Energy trade executed', time: '3m ago', market: 'Day-Ahead', volume: '$4.M', price: '$84/MWh' },
  { event: 'AI optimization deployed', time: '4m ago', system: 'Grid Controller', savings: '$12K' },
];

export const GRID_OPERATIONS_DATA = [
  { region: 'Northeast', load: '180 GW', capacity: '220 GW', frequency: '60.00 Hz', voltage: '138 kV', stability: '99.8%' },
  { region: 'Southeast', load: '160 GW', capacity: '200 GW', frequency: '60.01 Hz', voltage: '138 kV', stability: '99.6%' },
  { region: 'Midwest', load: '140 GW', capacity: '180 GW', frequency: '59.99 Hz', voltage: '138 kV', stability: '99.4%' },
  { region: 'West', load: '120 GW', capacity: '160 GW', frequency: '60.00 Hz', voltage: '138 kV', stability: '99.2%' },
  { region: 'Southwest', load: '80 GW', capacity: '120 GW', frequency: '60.01 Hz', voltage: '138 kV', stability: '99.0%' },
];

export const CUSTOMER_SERVICE_DATA = [
  { metric: 'Service Requests', total: '124K', resolved: '118K', avgTime: '42 min', satisfaction: '94.2%' },
  { metric: 'Billing Performance', accuracy: '99.4%', disputes: '0.6%', collection: '98.2%', automation: '84%' },
  { metric: 'Smart Meter Activity', readings: '82.6M/day', alerts: '2,400', accuracy: '99.4%', adoption: '87%' },
  { metric: 'Customer Satisfaction', score: '94.2%', nps: '72', retention: '96.4%', complaints: '-18.4%' },
  { metric: 'Restoration Performance', avgTime: '42 min', sla: '98.6%', critical: '99.2%', communication: '96.8%' },
];
