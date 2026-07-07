import React from 'react';

export interface DashboardMetrics {
  id: string;
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  icon?: React.ElementType;
  color?: string;
  subtitle?: string;
}

export interface PipelineStep {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'pending' | 'error';
  duration?: string;
  description?: string;
  lastUpdate?: string;
  latency?: string;
}

export interface ActivityItem {
  id: string;
  task: string;
  status: 'completed' | 'processing' | 'pending' | 'failed';
  time: string;
  impact?: 'critical' | 'high' | 'medium' | 'low';
  agent?: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color?: string;
    fill?: boolean;
  }[];
}

// Institutional-grade sections
export interface AIDecisionMatrixConfig {
  signals: Array<{
    id: string;
    type: 'buy' | 'sell' | 'hold';
    confidence: number;
    label: string;
  }>;
  marketSentiment: 'bullish' | 'bearish' | 'neutral';
  macroSentiment: 'bullish' | 'bearish' | 'neutral';
  volatilityPrediction: number;
}

export interface RiskEngineConfig {
  metrics: Array<{
    id: string;
    label: string;
    value: number;
    max: number;
    color: string;
    icon: React.ElementType;
  }>;
  overallRiskScore: number;
}

export interface ExecutionPipelineConfig {
  steps: PipelineStep[];
  totalLatency: string;
  fillRate: number;
  slippage: number;
}

export interface MarketIntelligenceConfig {
  news: Array<{
    id: string;
    title: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    time: string;
    source: string;
  }>;
  socialSentiment: Array<{
    platform: string;
    sentiment: number;
    mentions: number;
  }>;
  whaleAlerts: Array<{
    id: string;
    asset: string;
    amount: string;
    type: 'buy' | 'sell';
    time: string;
  }>;
  fearGreedIndex: number;
}

export interface AIPredictionCenterConfig {
  forecast24h: Array<{
    period: string;
    predicted: number;
    confidence: number;
    actual?: number;
  }>;
  forecast7d: Array<{
    period: string;
    predicted: number;
    confidence: number;
  }>;
  volatilityForecast: number;
  probabilityDistribution: {
    bullish: number;
    neutral: number;
    bearish: number;
  };
}

export interface SystemHealthConfig {
  metrics: Array<{
    id: string;
    label: string;
    value: number;
    max: number;
    unit: string;
    icon: React.ElementType;
    status: 'healthy' | 'warning' | 'critical';
  }>;
  modelLatency: number;
  apiHealth: 'operational' | 'degraded' | 'down';
  exchangeConnectivity: Array<{
    exchange: string;
    status: 'connected' | 'disconnected';
    latency: number;
  }>;
  dataFeedQuality: number;
}

// Professional Services specific configurations
export interface AIProfessionalServicesInsightsConfig {
  insights: Array<{
    id: number;
    type: 'risk' | 'opportunity' | 'recommendation';
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
    action: string;
  }>;
}

export interface RealTimeDeliveryOperationsFeedConfig {
  operations: Array<{
    id: number;
    event: string;
    project: string;
    impact: 'high' | 'medium' | 'low';
    time: string;
  }>;
}

// Sales & Revenue specific configurations
export interface SalesPipelineConfig {
  stages: Array<{
    name: string;
    value: number;
    conversionRate: number;
    revenue: number;
  }>;
  totalPipeline: number;
  conversionRate: number;
}

export interface LiveDealConfig {
  deals: Array<{
    id: string;
    company: string;
    value: number;
    stage: string;
    probability: number;
    owner: string;
    aiRecommendation: string;
    nextAction: string;
  }>;
}

export interface LeadIntelligenceConfig {
  leads: Array<{
    id: string;
    company: string;
    source: string;
    score: number;
    intent: 'high' | 'medium' | 'low';
    industry: string;
    companySize: string;
  }>;
  totalLeads: number;
  avgScore: number;
}

export interface RevenueForecastConfig {
  monthly: number;
  quarterly: number;
  annual: number;
  bestCase: number;
  expectedCase: number;
  worstCase: number;
  forecastAccuracy: number;
  months: Array<{
    month: string;
    forecast: number;
    actual?: number;
  }>;
}

export interface SalesPerformanceConfig {
  performers: Array<{
    name: string;
    role: string;
    revenueClosed: number;
    conversionRate: number;
    meetingsBooked: number;
    dealsWon: number;
    quotaAttainment: number;
  }>;
}

export interface CustomerIntelligenceConfig {
  expansionOpportunities: number;
  renewalRisks: number;
  upsellPotential: number;
  avgHealthScore: number;
  buyingSignals: number;
}

export interface AIInsightsConfig {
  insights: Array<{
    id: string;
    type: 'opportunity' | 'risk' | 'recommendation';
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
    action: string;
  }>;
}

// Banking & Finance specific configurations
export interface AIFinancialAgentsConfig {
  agents: Array<{
    id: string;
    name: string;
    role: string;
    tradesExecuted?: string;
    winRate?: string;
    pnlImpact?: string;
    exposureMonitored?: string;
    riskAlerts?: string;
    accuracy?: string;
    transactionsMonitored?: string;
    fraudPrevented?: string;
    detectionAccuracy?: string;
    icon?: React.ElementType;
    color?: string;
    riskLevel?: 'low' | 'medium' | 'high';
    confidenceScore?: number;
    marketContribution?: string;
  }>;
}

export interface CFOCommandCenterConfig {
  totalPortfolioValue: string;
  dailyPnL: string;
  activePositions: string;
  riskExposure: string;
  liquidityAvailable: string;
  portfolioHealth: number;
  marketExposureBreakdown: Array<{
    sector: string;
    allocation: number;
    value: string;
  }>;
}

export interface RealTimeTradingConfig {
  markets: Array<{
    id: string;
    name: string;
    type: 'equity' | 'forex' | 'crypto' | 'derivatives' | 'bonds';
    status: 'active' | 'closed';
    volume: string;
    change: string;
    trend: 'up' | 'down';
  }>;
  workflow: Array<{
    step: string;
    status: 'completed' | 'active' | 'pending';
    duration?: string;
  }>;
  heatmapData: Array<{
    region: string;
    intensity: number;
    volume: string;
  }>;
}

export interface PortfolioManagementConfig {
  assetAllocation: Array<{
    asset: string;
    allocation: number;
    value: string;
    performance: string;
  }>;
  sectorExposure: Array<{
    sector: string;
    exposure: number;
    risk: 'low' | 'medium' | 'high';
  }>;
  rebalancingSuggestions: Array<{
    id: string;
    asset: string;
    currentAllocation: number;
    targetAllocation: number;
    reason: string;
  }>;
}

export interface RiskComplianceConfig {
  riskCategories: Array<{
    category: string;
    score: number;
    max: number;
    trend: 'up' | 'down' | 'stable';
    alerts: number;
  }>;
  stressTestScenarios: Array<{
    scenario: string;
    impact: string;
    probability: number;
    mitigation: string;
  }>;
  varMetrics: {
    var95: string;
    var99: string;
    timeHorizon: string;
  };
}

export interface CreditIntelligenceConfig {
  loanApplications: {
    pending: number;
    approved: number;
    rejected: number;
  };
  creditScores: {
    average: number;
    distribution: Array<{
      range: string;
      count: number;
    }>;
  };
  defaultRisk: {
    probability: number;
    highRiskLoans: number;
    totalExposure: string;
  };
  exposureLimits: Array<{
    category: string;
    current: string;
    limit: string;
    utilization: number;
  }>;
}

export interface FraudDetectionConfig {
  suspiciousTransactions: number;
  amlFlags: number;
  identityVerificationRate: number;
  fraudNetwork: Array<{
    id: string;
    entity: string;
    connections: number;
    riskLevel: 'low' | 'medium' | 'high';
  }>;
  anomalyDetection: Array<{
    id: string;
    type: string;
    severity: 'low' | 'medium' | 'high';
    timestamp: string;
  }>;
}

export interface TreasuryLiquidityConfig {
  cashFlow: {
    inflow: string;
    outflow: string;
    net: string;
  };
  liquidityPosition: {
    available: string;
    required: string;
    buffer: string;
  };
  capitalReserves: {
    tier1: string;
    tier2: string;
    total: string;
  };
  fundingGap: Array<{
    period: string;
    requirement: string;
    available: string;
    gap: string;
  }>;
}

export interface MarketIntelligenceCenterConfig {
  globalIndices: Array<{
    index: string;
    value: number;
    change: string;
    trend: 'up' | 'down';
  }>;
  macroIndicators: Array<{
    indicator: string;
    value: string;
    change: string;
    impact: 'positive' | 'negative' | 'neutral';
  }>;
  newsSentiment: Array<{
    title: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    time: string;
    source: string;
  }>;
  geopoliticalEvents: Array<{
    event: string;
    impact: string;
    probability: number;
    timeframe: string;
  }>;
}

export interface PaymentSettlementConfig {
  transactionsProcessed: string;
  settlementTime: string;
  crossBorderPayments: string;
  swiftMessages: number;
  paymentFailures: number;
  successRate: number;
  transactionFlow: Array<{
    source: string;
    destination: string;
    volume: string;
    status: 'processing' | 'completed' | 'failed';
  }>;
}

export interface FinancialOperationsFeedConfig {
  operations: Array<{
    id: string;
    type: 'trade' | 'position' | 'risk' | 'fraud' | 'portfolio' | 'market' | 'settlement';
    description: string;
    timestamp: string;
    impact: 'critical' | 'high' | 'medium' | 'low';
  }>;
}

export interface DepartmentDashboardConfig {
  departmentId: string;
  departmentName: string;
  primaryColor: string;
  metrics: DashboardMetrics[];
  pipeline?: PipelineStep[];
  activity?: ActivityItem[];
  charts?: {
    performance?: ChartData;
    trend?: ChartData;
    distribution?: ChartData;
  };
  // Institutional-grade sections (optional)
  aiDecisionMatrix?: AIDecisionMatrixConfig;
  riskEngine?: RiskEngineConfig;
  executionPipeline?: ExecutionPipelineConfig;
  marketIntelligence?: MarketIntelligenceConfig;
  aiPredictionCenter?: AIPredictionCenterConfig;
  systemHealth?: SystemHealthConfig;
  // Sales & Revenue specific sections (optional)
  salesPipeline?: SalesPipelineConfig;
  liveDeals?: LiveDealConfig;
  leadIntelligence?: LeadIntelligenceConfig;
  revenueForecast?: RevenueForecastConfig;
  salesPerformance?: SalesPerformanceConfig;
  customerIntelligence?: CustomerIntelligenceConfig;
  aiInsights?: AIInsightsConfig;
  // Banking & Finance specific sections (optional)
  aiFinancialAgents?: AIFinancialAgentsConfig;
  cfoCommandCenter?: CFOCommandCenterConfig;
  realTimeTrading?: RealTimeTradingConfig;
  portfolioManagement?: PortfolioManagementConfig;
  riskCompliance?: RiskComplianceConfig;
  creditIntelligence?: CreditIntelligenceConfig;
  fraudDetection?: FraudDetectionConfig;
  treasuryLiquidity?: TreasuryLiquidityConfig;
  marketIntelligenceCenter?: MarketIntelligenceCenterConfig;
  paymentSettlement?: PaymentSettlementConfig;
  financialOperationsFeed?: FinancialOperationsFeedConfig;
  // Professional Services specific sections (optional)
  aiProfessionalServicesAgents?: AIProfessionalServicesAgentsConfig;
  chiefDeliveryOfficerDashboard?: ChiefDeliveryOfficerDashboardConfig;
  projectDeliveryControlCenter?: ProjectDeliveryControlCenterConfig;
  resourceManagementCenter?: ResourceManagementCenterConfig;
  timeBillingIntelligence?: TimeBillingIntelligenceConfig;
  clientIntelligenceHub?: ClientIntelligenceHubConfig;
  proposalsSalesEngine?: ProposalsSalesEngineConfig;
  knowledgeManagementSystem?: KnowledgeManagementSystemConfig;
  deliveryRiskHealthCenter?: DeliveryRiskHealthCenterConfig;
  profitabilityFinancialIntelligence?: ProfitabilityFinancialIntelligenceConfig;
  aiProfessionalServicesInsights?: AIProfessionalServicesInsightsConfig;
  realTimeDeliveryOperationsFeed?: RealTimeDeliveryOperationsFeedConfig;
  platformHealthDeliverySystems?: PlatformHealthDeliverySystemsConfig;
  // Agriculture specific sections (optional)
  aiAgricultureAgents?: AIAgricultureAgentsConfig;
  agricultureCommandCenter?: AgricultureCommandCenterConfig;
  cropIntelligence?: CropIntelligenceConfig;
  livestockIntelligence?: LivestockIntelligenceConfig;
  precisionFarming?: PrecisionFarmingConfig;
  irrigationCommandCenter?: IrrigationCommandCenterConfig;
  machineryOperations?: MachineryOperationsConfig;
  supplyChain?: SupplyChainConfig;
  weatherEnvironment?: WeatherEnvironmentConfig;
  sustainability?: SustainabilityConfig;
  agricultureAIInsights?: AgricultureAIInsightsConfig;
  liveActivityFeed?: LiveActivityFeedConfig;
  globalOperations?: GlobalOperationsConfig;
  agricultureSystemHealth?: AgricultureSystemHealthConfig;
}

export interface DashboardHeaderProps {
  departmentName: string;
  timestamp?: string;
  mode?: string;
  wallet?: string;
}

export interface MetricCardProps {
  metric: DashboardMetrics;
  onPress?: () => void;
}

export interface StatGridProps {
  metrics: DashboardMetrics[];
  columns?: number;
}

export interface PerformanceChartProps {
  data: ChartData;
  type?: 'line' | 'bar' | 'area';
  height?: number;
  showGrid?: boolean;
}

export interface PipelineViewProps {
  steps: PipelineStep[];
}

export interface ActivityFeedProps {
  activities: ActivityItem[];
  maxItems?: number;
}

export interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

// Professional Services specific configurations
export interface AIProfessionalServicesAgentsConfig {
  agents: Array<{
    id: string;
    name: string;
    role: string;
    projectsManaged?: number;
    deliveryEfficiency?: string;
    marginImprovement?: string;
    clientsAnalyzed?: number;
    satisfactionPrediction?: string;
    upsellOpportunities?: number;
    consultantsOptimized?: number;
    utilizationIncrease?: string;
    schedulingAccuracy?: string;
    hoursTracked?: string;
    billingAccuracy?: string;
    leakagePrevented?: string;
    knowledgeGraphNodes?: number;
    insightGeneration?: string;
    reuseEfficiency?: string;
    risksIdentified?: number;
    escalationsPrevented?: number;
    impactMitigated?: string;
    confidenceScore: number;
    status: 'online' | 'offline' | 'busy';
    revenueContribution: string;
    color: string;
  }>;
}

export interface ChiefDeliveryOfficerDashboardConfig {
  activeEngagements: number;
  utilizationRate: number;
  billableRevenue: string;
  projectMargin: number;
  clientSatisfaction: number;
  deliveryOnTimeRate: number;
  executiveSummary: {
    totalRevenue: string;
    revenueGrowth: string;
    marginExpansion: string;
    clientRetention: string;
    talentUtilization: string;
  };
  engagementPerformance: Array<{
    region: string;
    revenue: string;
    margin: number;
    satisfaction: number;
  }>;
}

export interface ProjectDeliveryControlCenterConfig {
  projects: Array<{
    id: string;
    name: string;
    client: string;
    status: 'on-track' | 'at-risk' | 'delayed' | 'completed';
    progress: number;
    margin: number;
    teamSize: number;
    nextMilestone: string;
    deadline: string;
    riskLevel: 'low' | 'medium' | 'high';
  }>;
  workflowStages: Array<{
    stage: string;
    count: number;
    value: string;
  }>;
}

export interface ResourceManagementCenterConfig {
  consultantAvailability: {
    total: number;
    available: number;
    onBench: number;
    utilization: number;
  };
  skillsMatrix: Array<{
    skill: string;
    demand: number;
    supply: number;
    gap: number;
  }>;
  utilizationRates: Array<{
    practice: string;
    utilization: number;
    target: number;
  }>;
  staffingGaps: Array<{
    role: string;
    gap: number;
    priority: 'high' | 'medium' | 'low';
  }>;
}

export interface TimeBillingIntelligenceConfig {
  billableHours: {
    currentMonth: string;
    target: string;
    achievement: number;
  };
  nonBillableTime: {
    percentage: number;
    target: number;
    breakdown: Array<{
      category: string;
      hours: string;
      percentage: number;
    }>;
  };
  billingAccuracy: {
    accuracy: number;
    disputes: number;
    disputedAmount: string;
    resolutionRate: number;
  };
  revenueLeakage: {
    identified: string;
    prevented: string;
    ongoing: string;
    sources: Array<{
      source: string;
      amount: string;
    }>;
  };
}

export interface ClientIntelligenceHubConfig {
  clientHealthScore: {
    average: number;
    distribution: Array<{
      score: string;
      count: number;
      percentage: number;
    }>;
  };
  expansionOpportunities: Array<{
    client: string;
    potential: string;
    probability: number;
    timeline: string;
  }>;
  churnRisk: Array<{
    client: string;
    risk: 'high' | 'medium' | 'low';
    reason: string;
    value: string;
  }>;
  contractValue: {
    totalPortfolio: string;
    averageContract: string;
    largestContract: string;
    renewalPipeline: string;
  };
}

export interface ProposalsSalesEngineConfig {
  rfps: {
    active: number;
    submitted: number;
    won: number;
    lost: number;
    pending: number;
  };
  winRate: {
    overall: number;
    byPractice: Array<{
      practice: string;
      winRate: number;
    }>;
  };
  dealPipeline: {
    stages: Array<{
      stage: string;
      value: string;
      deals: number;
    }>;
    totalPipeline: string;
    weightedPipeline: string;
  };
  pricingModels: Array<{
    model: string;
    usage: number;
    avgMargin: number;
  }>;
}

export interface KnowledgeManagementSystemConfig {
  caseStudies: {
    total: number;
    accessed: string;
    avgRating: number;
    topCategories: Array<{
      category: string;
      count: number;
    }>;
  };
  bestPractices: {
    total: number;
    adoptionRate: number;
    impactScore: number;
    recentUpdates: number;
  };
  deliveryTemplates: {
    total: number;
    usageRate: number;
    timeSaved: string;
    qualityImprovement: number;
  };
  internalKnowledgeBase: {
    articles: number;
    searchSuccess: number;
    contributionRate: number;
    expertAvailability: number;
  };
  aiGeneratedInsights: {
    dailyInsights: number;
    accuracy: number;
    adoptionRate: number;
    impactOnDelivery: string;
  };
}

export interface DeliveryRiskHealthCenterConfig {
  projectDelays: {
    atRisk: number;
    delayed: number;
    critical: number;
    avgDelay: string;
  };
  scopeCreep: {
    projectsAffected: number;
    avgImpact: string;
    revenueImpact: string;
  };
  budgetOverruns: {
    overBudget: number;
    avgOverrun: string;
    totalImpact: string;
  };
  resourceShortages: {
    critical: number;
    moderate: number;
    openReqs: number;
    avgTimeToFill: string;
  };
  clientEscalations: {
    active: number;
    resolved: number;
    resolutionTime: string;
    satisfaction: number;
  };
}

export interface ProfitabilityFinancialIntelligenceConfig {
  revenuePerEngagement: {
    average: string;
    median: string;
    topQuartile: string;
    bottomQuartile: string;
  };
  costPerProject: {
    average: string;
    laborCost: number;
    travelCost: number;
    technologyCost: number;
    overhead: number;
  };
  marginByClient: {
    topTier: { clients: number; avgMargin: number; revenue: string };
    midTier: { clients: number; avgMargin: number; revenue: string };
    emerging: { clients: number; avgMargin: number; revenue: string };
  };
  resourceCostEfficiency: {
    utilizationImpact: string;
    schedulingEfficiency: string;
    skillMatching: string;
    overallImprovement: string;
  };
  profitLeakagePoints: Array<{
    point: string;
    impact: string;
    remediation: string;
  }>;
}

export interface AIProfessionalServicesInsightsConfig {
  insights: Array<{
    id: string;
    type: 'opportunity' | 'risk' | 'recommendation';
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
    action: string;
  }>;
}

export interface RealTimeDeliveryOperationsFeedConfig {
  operations: Array<{
    event: string;
    project: string;
    time: string;
    impact: 'high' | 'medium' | 'low';
  }>;
}

export interface PlatformHealthDeliverySystemsConfig {
  projectManagementTools: {
    system: string;
    uptime: number;
    latency: string;
    status: 'operational' | 'degraded' | 'down';
  };
  timeTrackingSystems: {
    system: string;
    uptime: number;
    latency: string;
    status: 'operational' | 'degraded' | 'down';
  };
  billingSystems: {
    system: string;
    uptime: number;
    latency: string;
    status: 'operational' | 'degraded' | 'down';
  };
  crmSystems: {
    system: string;
    uptime: number;
    latency: string;
    status: 'operational' | 'degraded' | 'down';
  };
  knowledgeSystems: {
    system: string;
    uptime: number;
    latency: string;
    status: 'operational' | 'degraded' | 'down';
  };
  aiAgents: {
    system: string;
    uptime: number;
    latency: string;
    status: 'operational' | 'degraded' | 'down';
  };
}

// Agriculture specific configurations
export interface AIAgricultureAgentsConfig {
  agents: Array<{
    id: string;
    name: string;
    role: string;
    fieldsMonitored?: string;
    cropAccuracy?: string;
    yieldImprovement?: string;
    waterSaved?: string;
    irrigationCycles?: string;
    efficiencyScore?: string;
    soilSamples?: string;
    nutrientAccuracy?: string;
    soilHealthScore?: string;
    diseasesDetected?: string;
    predictionAccuracy?: string;
    cropLossPrevented?: string;
    equipmentManaged?: string;
    fuelSaved?: string;
    machineUptime?: string;
    priceForecastAccuracy?: string;
    revenueImpact?: string;
    contractsManaged?: string;
    icon?: React.ElementType;
    color?: string;
    confidenceScore: number;
    status: 'online' | 'offline' | 'busy';
    efficiency: string;
  }>;
}

export interface AgricultureCommandCenterConfig {
  totalFarms: number;
  totalAcres: string;
  cropHealthIndex: number;
  harvestForecast: string;
  revenue: string;
  aiDecisionsToday: number;
  farmOperations: Array<{
    farm: string;
    acres: string;
    crop: string;
    status: 'growing' | 'harvesting' | 'fallow';
    health: number;
  }>;
  productionIntelligence: Array<{
    metric: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
  }>;
}

export interface CropIntelligenceConfig {
  cropGrowth: Array<{
    crop: string;
    growthStage: string;
    health: number;
    ndviIndex: number;
    harvestReadiness: number;
  }>;
  plantHealth: {
    overallHealth: number;
    stressLevel: number;
    diseaseRisk: number;
  };
  satelliteHeatmap: Array<{
    field: string;
    coordinates: { lat: number; lng: number };
    healthScore: number;
    cropType: string;
  }>;
  growthTimeline: Array<{
    stage: string;
    startDate: string;
    expectedDate: string;
    progress: number;
  }>;
}

export interface LivestockIntelligenceConfig {
  livestock: Array<{
    type: string;
    count: number;
    healthScore: number;
    location: string;
    feedingSchedule: string;
  }>;
  animalHealth: {
    overallHealth: number;
    sickAnimals: number;
    vaccinationsDue: number;
  };
  productionMetrics: {
    milkProduction: string;
    eggProduction: string;
    meatProduction: string;
  };
  gpsTracking: Array<{
    id: string;
    type: string;
    location: { lat: number; lng: number };
    lastUpdate: string;
  }>;
}

export interface PrecisionFarmingConfig {
  gpsEquipment: Array<{
    equipment: string;
    status: 'active' | 'idle' | 'maintenance';
    location: { lat: number; lng: number };
    battery: number;
  }>;
  droneMissions: Array<{
    missionId: string;
    type: string;
    status: 'planned' | 'active' | 'completed';
    coverage: string;
    duration: string;
  }>;
  satelliteMonitoring: {
    lastUpdate: string;
    coverage: string;
    resolution: string;
  };
  fieldMapping: Array<{
    field: string;
    area: string;
    soilType: string;
    crop: string;
  }>;
}

export interface IrrigationCommandCenterConfig {
  waterUsage: {
    today: string;
    thisWeek: string;
    thisMonth: string;
  };
  pumpStatus: Array<{
    pumpId: string;
    status: 'on' | 'off' | 'maintenance';
    flowRate: string;
    pressure: string;
  }>;
  moistureLevels: Array<{
    field: string;
    sensorId: string;
    moisture: number;
    threshold: number;
  }>;
  reservoirCapacity: {
    current: string;
    capacity: string;
    percentage: number;
  };
  rainForecast: {
    probability: number;
    expectedAmount: string;
    timeframe: string;
  };
}

export interface MachineryOperationsConfig {
  fleet: Array<{
    equipment: string;
    type: string;
    status: 'operating' | 'idle' | 'maintenance';
    location: string;
    fuelLevel: number;
  }>;
  fuelUsage: {
    today: string;
    thisWeek: string;
    efficiency: string;
  };
  maintenance: Array<{
    equipment: string;
    dueDate: string;
    type: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  gpsRoutes: Array<{
    equipment: string;
    route: string;
    progress: number;
    eta: string;
  }>;
}

export interface SupplyChainConfig {
  warehouses: Array<{
    warehouse: string;
    location: string;
    capacity: string;
    utilization: number;
  }>;
  grainStorage: {
    totalCapacity: string;
    currentStorage: string;
    utilization: number;
  };
  logistics: Array<{
    shipment: string;
    origin: string;
    destination: string;
    status: 'in-transit' | 'delivered' | 'pending';
    eta: string;
  }>;
  deliveries: {
    today: number;
    thisWeek: number;
    onTimeRate: number;
  };
  distribution: Array<{
    region: string;
    volume: string;
    demand: string;
  }>;
}

export interface WeatherEnvironmentConfig {
  currentWeather: {
    temperature: string;
    humidity: string;
    windSpeed: string;
    rainfall: string;
  };
  rainfall: Array<{
    date: string;
    expected: string;
    actual?: string;
  }>;
  temperature: Array<{
    date: string;
    high: string;
    low: string;
  }>;
  wind: Array<{
    date: string;
    speed: string;
    direction: string;
  }>;
  climateForecast: Array<{
    period: string;
    temperature: string;
    rainfall: string;
    conditions: string;
  }>;
}

export interface SustainabilityConfig {
  carbonFootprint: {
    current: string;
    target: string;
    reduction: string;
  };
  waterConservation: {
    saved: string;
    efficiency: string;
    target: string;
  };
  renewableEnergy: {
    usage: string;
    percentage: number;
    source: string;
  };
  biodiversity: {
    score: number;
    speciesCount: number;
    protectedAreas: string;
  };
  esgMetrics: {
    overallScore: number;
    environmental: number;
    social: number;
    governance: number;
  };
}

export interface AgricultureAIInsightsConfig {
  insights: Array<{
    id: string;
    type: 'opportunity' | 'risk' | 'recommendation' | 'warning';
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
    action: string;
    field?: string;
  }>;
}

export interface LiveActivityFeedConfig {
  activities: Array<{
    id: string;
    event: string;
    type: 'drone' | 'disease' | 'tractor' | 'harvest' | 'irrigation' | 'livestock' | 'weather' | 'yield';
    location?: string;
    time: string;
    impact: 'high' | 'medium' | 'low';
  }>;
}

export interface GlobalOperationsConfig {
  farms: Array<{
    farm: string;
    location: { lat: number; lng: number };
    country: string;
    acres: string;
    primaryCrop: string;
  }>;
  weather: Array<{
    region: string;
    condition: string;
    temperature: string;
    impact: string;
  }>;
  satelliteImages: Array<{
    region: string;
    lastUpdate: string;
    resolution: string;
    coverage: string;
  }>;
  distributionCenters: Array<{
    center: string;
    location: { lat: number; lng: number };
    capacity: string;
  }>;
  cropPerformance: Array<{
    region: string;
    crop: string;
    yield: string;
    quality: number;
  }>;
}

export interface AgricultureSystemHealthConfig {
  iotSensors: {
    total: number;
    online: number;
    offline: number;
    health: number;
  };
  drones: {
    total: number;
    active: number;
    maintenance: number;
    health: number;
  };
  satellites: {
    connected: number;
    dataQuality: number;
    lastUpdate: string;
  };
  aiModels: {
    active: number;
    accuracy: number;
    latency: string;
  };
  gpsDevices: {
    total: number;
    online: number;
    accuracy: number;
  };
  farmEquipment: {
    total: number;
    operating: number;
    maintenance: number;
    health: number;
  };
  apis: {
    weatherApi: 'operational' | 'degraded' | 'down';
    satelliteApi: 'operational' | 'degraded' | 'down';
    marketApi: 'operational' | 'degraded' | 'down';
  };
}
