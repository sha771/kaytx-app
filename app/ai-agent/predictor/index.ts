// Predictor Department Organization System
// Advanced AI Prediction Structure with 8 Sub-Departments and 64+ Agents

export const PREDICTOR_DEPARTMENTS = {
  // Main Department
  main: {
    id: 'predictor',
    name: 'Predictor',
    title: 'AI Prediction Department',
    description: 'Advanced AI prediction department using machine learning and predictive analytics for enterprise-wide forecasting and strategic predictions.',
    director: 'ai-predictive-analytics-director',
    totalAgents: 64,
  },

  // Sub-Departments
  subDepartments: [
    {
      id: 'market-prediction',
      name: 'Market Prediction',
      title: 'Market Prediction Department',
      description: 'Market prediction systems using advanced AI and alternative data for strategic market forecasting, competitive intelligence, and market opportunity identification.',
      director: 'ai-market-prediction-director',
      icon: 'BarChart3',
      color: '#6366F1',
      agentCount: 8,
      agents: [
        'ai-market-prediction-director',
        'ai-market-trend-predictor',
        'ai-competitive-intelligence-predictor',
        'ai-price-optimization-predictor',
        'ai-market-sentiment-analyzer',
        'ai-alternative-data-processor',
        'ai-market-segmentation-predictor',
        'ai-geographic-market-predictor',
        'ai-competitor-strategy-predictor',
      ]
    },
    {
      id: 'sales-prediction',
      name: 'Sales Prediction',
      title: 'Sales Prediction Department',
      description: 'Sales prediction systems using advanced AI and pipeline analytics for strategic sales forecasting, revenue prediction, and sales performance optimization.',
      director: 'ai-sales-prediction-director',
      icon: 'TrendingUp',
      color: '#6366F1',
      agentCount: 8,
      agents: [
        'ai-sales-prediction-director',
        'ai-sales-forecasting-specialist',
        'ai-pipeline-conversion-predictor',
        'ai-quota-achievement-predictor',
        'ai-territory-revenue-predictor',
        'ai-customer-lifetime-value-predictor',
        'ai-sales-performance-predictor',
        'ai-deal-outcome-predictor',
      ]
    },
    {
      id: 'marketing-prediction',
      name: 'Marketing Prediction',
      title: 'Marketing Prediction Department',
      description: 'Marketing prediction systems using advanced AI and consumer analytics for strategic marketing forecasting, campaign outcome prediction, and marketing ROI optimization.',
      director: 'ai-marketing-prediction-director',
      icon: 'Megaphone',
      color: '#6366F1',
      agentCount: 8,
      agents: [
        'ai-marketing-prediction-director',
        'ai-campaign-performance-predictor',
        'ai-customer-acquisition-predictor',
        'ai-churn-prediction-specialist',
        'ai-lead-scoring-predictor',
        'ai-marketing-roi-predictor',
        'ai-content-performance-predictor',
        'ai-social-media-trend-predictor',
      ]
    },
    {
      id: 'financial-prediction',
      name: 'Financial Prediction',
      title: 'Financial Prediction Department',
      description: 'Financial prediction systems using advanced AI and financial analytics for strategic financial forecasting, revenue architecture, and financial risk optimization.',
      director: 'ai-financial-prediction-director',
      icon: 'PieChart',
      color: '#6366F1',
      agentCount: 8,
      agents: [
        'ai-financial-prediction-director',
        'ai-revenue-prediction-architect',
        'ai-cost-forecasting-specialist',
        'ai-cash-flow-predictor',
        'ai-investment-return-predictor',
        'ai-financial-risk-predictor',
        'ai-budget-variance-predictor',
        'ai-profit-margin-predictor',
      ]
    },
    {
      id: 'operations-prediction',
      name: 'Operations Prediction',
      title: 'Operations Prediction Department',
      description: 'Operations prediction systems using advanced AI and operational analytics for strategic operations forecasting, efficiency optimization, and resource planning.',
      director: 'ai-operations-prediction-director',
      icon: 'Settings',
      color: '#6366F1',
      agentCount: 9,
      agents: [
        'ai-operations-prediction-director',
        'ai-inventory-optimization-predictor',
        'ai-supply-chain-disruption-predictor',
        'ai-production-capacity-predictor',
        'ai-maintenance-schedule-predictor',
        'ai-quality-issue-predictor',
        'ai-resource-allocation-predictor',
        'ai-efficiency-trend-predictor',
        'ai-inventory-prediction-optimizer',
        'ai-supply-chain-advanced-predictor',
      ]
    },
    {
      id: 'customer-experience-prediction',
      name: 'Customer Experience Prediction',
      title: 'Customer Experience Prediction Department',
      description: 'Customer experience prediction systems using advanced AI and behavioral analytics for CX forecasting, satisfaction prediction, and experience optimization.',
      director: 'ai-cx-prediction-director',
      icon: 'Heart',
      color: '#6366F1',
      agentCount: 9,
      agents: [
        'ai-cx-prediction-director',
        'ai-customer-satisfaction-predictor',
        'ai-support-ticket-volume-predictor',
        'ai-net-promoter-score-predictor',
        'ai-customer-journey-predictor',
        'ai-service-recovery-predictor',
        'ai-engagement-trend-predictor',
        'ai-loyalty-program-predictor',
        'ai-customer-behavior-advanced-predictor',
      ]
    },
    {
      id: 'technology-prediction',
      name: 'Technology Prediction',
      title: 'Technology Prediction Department',
      description: 'Technology prediction systems using advanced AI and tech analytics for strategic technology forecasting, innovation prediction, and digital transformation optimization.',
      director: 'ai-technology-prediction-director',
      icon: 'Cpu',
      color: '#6366F1',
      agentCount: 8,
      agents: [
        'ai-technology-prediction-director',
        'ai-technology-trend-predictor',
        'ai-innovation-readiness-predictor',
        'ai-digital-transformation-predictor',
        'ai-system-performance-predictor',
        'ai-tech-adoption-predictor',
        'ai-architecture-scalability-predictor',
        'ai-legacy-system-migration-predictor',
      ]
    },
    {
      id: 'risk-prediction',
      name: 'Risk Prediction',
      title: 'Risk Prediction Department',
      description: 'Risk prediction systems using advanced AI and risk analytics for strategic risk forecasting, threat prediction, and risk mitigation optimization.',
      director: 'ai-risk-prediction-director',
      icon: 'ShieldAlert',
      color: '#6366F1',
      agentCount: 9,
      agents: [
        'ai-risk-prediction-director',
        'ai-operational-risk-predictor',
        'ai-market-risk-predictor',
        'ai-compliance-risk-predictor',
        'ai-strategic-risk-predictor',
        'ai-reputational-risk-predictor',
        'ai-cyber-risk-predictor',
        'ai-supply-chain-risk-predictor',
        'ai-cyber-threat-advanced-predictor',
      ]
    }
  ]
};

export const PREDICTOR_HIERARCHY = {
  // C-Level
  cLevel: {
    'ai-predictive-analytics-director': {
      level: 'c_level',
      department: 'Predictor',
      manages: [
        'ai-market-prediction-director',
        'ai-sales-prediction-director',
        'ai-marketing-prediction-director',
        'ai-financial-prediction-director',
        'ai-operations-prediction-director',
        'ai-cx-prediction-director',
        'ai-technology-prediction-director',
        'ai-risk-prediction-director',
      ]
    }
  },
  
  // Department Directors
  directors: {
    'ai-market-prediction-director': {
      level: 'director',
      department: 'Predictor',
      subDepartment: 'Market Prediction',
      reportsTo: 'ai-predictive-analytics-director',
      manages: [
        'ai-market-trend-predictor',
        'ai-competitive-intelligence-predictor',
        'ai-price-optimization-predictor',
        'ai-market-sentiment-analyzer',
        'ai-alternative-data-processor',
        'ai-market-segmentation-predictor',
        'ai-geographic-market-predictor',
        'ai-competitor-strategy-predictor',
      ]
    },
    'ai-sales-prediction-director': {
      level: 'director',
      department: 'Predictor',
      subDepartment: 'Sales Prediction',
      reportsTo: 'ai-predictive-analytics-director',
      manages: [
        'ai-sales-forecasting-specialist',
        'ai-pipeline-conversion-predictor',
        'ai-quota-achievement-predictor',
        'ai-territory-revenue-predictor',
        'ai-customer-lifetime-value-predictor',
        'ai-sales-performance-predictor',
        'ai-deal-outcome-predictor',
      ]
    },
    'ai-marketing-prediction-director': {
      level: 'director',
      department: 'Predictor',
      subDepartment: 'Marketing Prediction',
      reportsTo: 'ai-predictive-analytics-director',
      manages: [
        'ai-campaign-performance-predictor',
        'ai-customer-acquisition-predictor',
        'ai-churn-prediction-specialist',
        'ai-lead-scoring-predictor',
        'ai-marketing-roi-predictor',
        'ai-content-performance-predictor',
        'ai-social-media-trend-predictor',
      ]
    },
    'ai-financial-prediction-director': {
      level: 'director',
      department: 'Predictor',
      subDepartment: 'Financial Prediction',
      reportsTo: 'ai-predictive-analytics-director',
      manages: [
        'ai-revenue-prediction-architect',
        'ai-cost-forecasting-specialist',
        'ai-cash-flow-predictor',
        'ai-investment-return-predictor',
        'ai-financial-risk-predictor',
        'ai-budget-variance-predictor',
        'ai-profit-margin-predictor',
      ]
    },
    'ai-operations-prediction-director': {
      level: 'director',
      department: 'Predictor',
      subDepartment: 'Operations Prediction',
      reportsTo: 'ai-predictive-analytics-director',
      manages: [
        'ai-inventory-optimization-predictor',
        'ai-supply-chain-disruption-predictor',
        'ai-production-capacity-predictor',
        'ai-maintenance-schedule-predictor',
        'ai-quality-issue-predictor',
        'ai-resource-allocation-predictor',
        'ai-efficiency-trend-predictor',
        'ai-inventory-prediction-optimizer',
        'ai-supply-chain-advanced-predictor',
      ]
    },
    'ai-cx-prediction-director': {
      level: 'director',
      department: 'Predictor',
      subDepartment: 'Customer Experience Prediction',
      reportsTo: 'ai-predictive-analytics-director',
      manages: [
        'ai-customer-satisfaction-predictor',
        'ai-support-ticket-volume-predictor',
        'ai-net-promoter-score-predictor',
        'ai-customer-journey-predictor',
        'ai-service-recovery-predictor',
        'ai-engagement-trend-predictor',
        'ai-loyalty-program-predictor',
        'ai-customer-behavior-advanced-predictor',
      ]
    },
    'ai-technology-prediction-director': {
      level: 'director',
      department: 'Predictor',
      subDepartment: 'Technology Prediction',
      reportsTo: 'ai-predictive-analytics-director',
      manages: [
        'ai-technology-trend-predictor',
        'ai-innovation-readiness-predictor',
        'ai-digital-transformation-predictor',
        'ai-system-performance-predictor',
        'ai-tech-adoption-predictor',
        'ai-architecture-scalability-predictor',
        'ai-legacy-system-migration-predictor',
      ]
    },
    'ai-risk-prediction-director': {
      level: 'director',
      department: 'Predictor',
      subDepartment: 'Risk Prediction',
      reportsTo: 'ai-predictive-analytics-director',
      manages: [
        'ai-operational-risk-predictor',
        'ai-market-risk-predictor',
        'ai-compliance-risk-predictor',
        'ai-strategic-risk-predictor',
        'ai-reputational-risk-predictor',
        'ai-cyber-risk-predictor',
        'ai-supply-chain-risk-predictor',
        'ai-cyber-threat-advanced-predictor',
      ]
    }
  }
};

export const PREDICTOR_STATS = {
  totalDepartments: 8,
  totalAgents: 64,
  totalDirectors: 8,
  totalSpecialists: 56,
  averageEfficiency: '92.6%',
  averageSavingsPerMonth: '$12,800',
  totalTasksAutomatedDaily: 5200,
};

export default PREDICTOR_DEPARTMENTS;