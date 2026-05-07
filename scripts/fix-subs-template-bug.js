const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'app', 'ai-agent', 'trading', 'sub-agents');

// Mapping of file IDs to title and subtitle
const MAP = {
  'investment-strategy-advisor': { t: 'AI Investment Strategy Advisor', sub: 'Strategy Framework & Alpha Signal Research' },
  'portfolio-allocation-director': { t: 'AI Portfolio Allocation Director', sub: 'Multi-Asset Allocation & Rebalancing Execution' },
  'market-outlook-analyst': { t: 'AI Market Outlook Analyst', sub: 'Macro Forecasting & Economic Indicator Analysis' },
  'trading-strategy-validator': { t: 'AI Trading Strategy Validator', sub: 'Strategy Backtesting & Performance Benchmarking' },
  'desk-performance-monitor': { t: 'AI Desk Performance Monitor', sub: 'Real-time P&L Tracking & Trader Analytics' },
  'risk-limit-enforcer': { t: 'AI Risk Limit Enforcer', sub: 'Automated Limit Monitoring & Breach Alerts' },
  'investment-committee-coordinator': { t: 'AI Investment Committee Coordinator', sub: 'Committee Scheduling & Approval Tracking' },
  'deal-flow-manager': { t: 'AI Deal Flow Manager', sub: 'Pipeline Management & Deal Scoring' },
  'diligence-overseer': { t: 'AI Diligence Overseer', sub: 'Due Diligence Process Coordination' },
  'order-flow-optimizer': { t: 'AI Order Flow Optimizer', sub: 'Smart Order Routing & Execution Optimization' },
  'trader-performance-evaluator': { t: 'AI Trader Performance Evaluator', sub: 'KPI Tracking & Performance Scoring' },
  'market-openclosing-coordinator': { t: 'AI Market Open/Close Coordinator', sub: 'Pre-market & Post-market Coordination' },
  'asset-allocator': { t: 'AI Asset Allocator', sub: 'Strategic & Tactical Allocation Optimization' },
  'rebalancing-scheduler': { t: 'AI Rebalancing Scheduler', sub: 'Automated Rebalancing Trigger & Execution' },
  'performance-attribution-analyst': { t: 'AI Performance Attribution Analyst', sub: 'Multi-factor Attribution & Contribution Analysis' },
  'var-calculator': { t: 'AI VaR Calculator', sub: 'Historical, Parametric & Monte Carlo VaR' },
  'stress-test-designer': { t: 'AI Stress Test Designer', sub: 'Custom Scenario Creation & Historical Replay' },
  'limit-breach-alerter': { t: 'AI Limit Breach Alerter', sub: 'Real-time Limit Monitoring & Escalation' },
  'order-executor': { t: 'AI Order Executor', sub: 'Automated Order Slicing & Routing' },
  'market-depth-analyzer': { t: 'AI Market Depth Analyzer', sub: 'Order Book Analysis & Liquidity Mapping' },
  'execution-quality-reporter': { t: 'AI Execution Quality Reporter', sub: 'TCA Reporting & Venue Performance Scoring' },
  'currency-pair-analyzer': { t: 'AI Currency Pair Analyzer', sub: 'Technical & Fundamental FX Analysis' },
  'fx-hedging-coordinator': { t: 'AI FX Hedging Coordinator', sub: 'Automated Hedge Ratio & Overlay Execution' },
  'cross-border-payment-optimizer': { t: 'AI Cross-border Payment Optimizer', sub: 'Settlement Route Optimization & FX Conversion' },
  'on-chain-analyzer': { t: 'AI On-chain Analyzer', sub: 'Blockchain Monitoring & Whale Tracking' },
  'liquidity-pool-monitor': { t: 'AI Liquidity Pool Monitor', sub: 'DEX Pool Tracking & Impermanent Loss' },
  'wallet-security-checker': { t: 'AI Wallet Security Checker', sub: 'Multi-sig Verification & Vulnerability Scan' },
  'options-pricer': { t: 'AI Options Pricer', sub: 'Real-time Options Pricing Engine' },
  'greeks-calculator': { t: 'AI Greeks Calculator', sub: 'Portfolio Greeks Aggregation & Sensitivity' },
  'volatility-surface-mapper': { t: 'AI Volatility Surface Mapper', sub: 'Implied Vol Surface Construction & Fitting' },
  'sector-analyzer': { t: 'AI Sector Analyzer', sub: 'Sector Rotation & Industry Analysis' },
  'factor-modeler': { t: 'AI Factor Modeler', sub: 'Multi-factor Model Construction & Calibration' },
  'benchmark-comparator': { t: 'AI Benchmark Comparator', sub: 'Benchmark Selection & Tracking Error Analysis' },
  'scenario-modeler': { t: 'AI Scenario Modeler', sub: 'Custom Scenario Creation & Impact Analysis' },
  'correlation-tracker': { t: 'AI Correlation Tracker', sub: 'Real-time Correlation & Regime Detection' },
  'tail-risk-assessor': { t: 'AI Tail Risk Assessor', sub: 'Extreme Value Analysis & Conditional Tail Expectation' },
  'trade-surveillance-agent': { t: 'AI Trade Surveillance Agent', sub: 'Real-time Pattern Monitoring & Abuse Detection' },
  'regulatory-reporter': { t: 'AI Regulatory Reporter', sub: 'Automated Report Generation & Submission' },
  'restricted-list-monitor': { t: 'AI Restricted List Monitor', sub: 'Pre-trade Screening & List Enforcement' },
  'alpha-researcher': { t: 'AI Alpha Researcher', sub: 'Systematic Alpha Discovery & Hypothesis Testing' },
  'backtest-engine': { t: 'AI Backtest Engine', sub: 'High-speed Backtesting with Cost Modeling' },
  'signal-generator': { t: 'AI Signal Generator', sub: 'Real-time Signal Production & Scoring' },
  'esg-data-collector': { t: 'AI ESG Data Collector', sub: 'Multi-source ESG Data Aggregation' },
  'sustainability-scorer': { t: 'AI Sustainability Scorer', sub: 'Composite ESG Scoring Engine' },
  'impact-reporter': { t: 'AI Impact Reporter', sub: 'TCFD, SFDR & EU Taxonomy Reporting' },
  'economic-indicator-tracker': { t: 'AI Economic Indicator Tracker', sub: 'Real-time Data Tracking & Nowcasting' },
  'central-bank-watcher': { t: 'AI Central Bank Watcher', sub: 'Policy Communication & Rate Path Modeling' },
  'geopolitical-risk-assessor': { t: 'AI Geopolitical Risk Assessor', sub: 'Event Monitoring & Scenario Impact Analysis' },
  'strategy-coder': { t: 'AI Strategy Coder', sub: 'Strategy Development & Template Generation' },
  'latency-optimizer': { t: 'AI Latency Optimizer', sub: 'End-to-end Latency Profiling & Optimization' },
  'execution-algorithm-tester': { t: 'AI Execution Algorithm Tester', sub: 'Algorithm Validation & Regression Testing' },
  'trade-reconciler': { t: 'AI Trade Reconciler', sub: 'Multi-system Trade Matching & Break Resolution' },
  'clearing-coordinator': { t: 'AI Clearing Coordinator', sub: 'CCP Registration & Margin Management' },
  'fail-manager': { t: 'AI Fail Manager', sub: 'Settlement Fail Detection & Resolution' },
};

let fixes = 0;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'index.tsx');
files.forEach(f => {
  const id = f.replace('.tsx', '');
  const map = MAP[id];
  if (!map) { console.log(f + ': NO MAP ENTRY'); return; }
  let c = fs.readFileSync(path.join(dir, f), 'utf8');
  let changed = false;
  
  // Fix {d.t} -> actual title string
  if (c.includes('{d.t}')) {
    c = c.replace(/\{d\.t\}/g, map.t);
    changed = true;
  }
  // Fix {d.sub} -> actual subtitle string
  if (c.includes('{d.sub}')) {
    c = c.replace(/\{d\.sub\}/g, map.sub);
    changed = true;
  }
  // Fix double semicolons
  if (c.includes(';;')) {
    c = c.replace(/;;/g, ';');
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(path.join(dir, f), c);
    fixes++;
    console.log(f + ': FIXED');
  }
});
console.log('Total files fixed:', fixes);
