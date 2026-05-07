const fs = require('fs');
const path = require('path');

const tradingDir = path.resolve(__dirname, '../app/ai-agent/trading');
const subDir = path.resolve(tradingDir, 'sub-agents');

// Ensure directories exist
if (!fs.existsSync(subDir)) fs.mkdirSync(subDir, { recursive: true });

const agents = [
  {
    id: 'chief-investment-officer', num: 160,
    title: 'AI Chief Investment Officer', subtitle: 'CIO – Investment Strategy & Oversight',
    badge: 'C-Suite', iconColor: '#0277BD', icon: 'Briefcase',
    stats: [{l:'AUM',v:'$2.4B',ic:'DollarSign',c:'#34C759'},{l:'Uptime',v:'99.99%',ic:'Activity',c:'#007AFF'},{l:'Strategies',v:'48',ic:'Target',c:'#FF9500'},{l:'Accuracy',v:'97.8%',ic:'TrendingUp',c:'#AF52DE'}],
    caps: ['Investment Strategy','Portfolio Oversight','Risk Management','Asset Allocation','Performance Analysis','Regulatory Compliance','Capital Allocation','Due Diligence'],
    resps: ['Define and oversee firm-wide investment strategy and policy','Lead portfolio construction, asset allocation, and rebalancing frameworks','Manage investment risk, drawdown limits, and stress-testing protocols','Direct quantitative research, alpha generation, and factor modeling','Ensure regulatory compliance across all investment activities','Oversee M&A, private equity, and alternative investment due diligence','Chair the Investment Committee and coordinate deal flow','Report investment performance to the board and stakeholders'],
    acts: [{t:'2 min ago',tx:'Approved Q3 strategic asset allocation shift',ic:'CircleCheckBig'},{t:'5 min ago',tx:'Reviewed private equity due diligence pipeline',ic:'Clock'},{t:'12 min ago',tx:'Updated risk budget and VaR thresholds',ic:'Zap'},{t:'28 min ago',tx:'Published monthly CIO investment letter',ic:'FileText'}],
    subs: [
      {name:'Investment Strategy Advisor',slug:'investment-strategy-advisor'},
      {name:'Portfolio Allocation Director',slug:'portfolio-allocation-director'},
      {name:'Market Outlook Analyst',slug:'market-outlook-analyst'},
    ]
  },
  {
    id: 'vp-trading', num: 161,
    title: 'AI VP Trading', subtitle: 'VP Trading – Execution & Desk Operations',
    badge: 'VP Level', iconColor: '#1565C0', icon: 'TrendingUp',
    stats: [{l:'Trades',v:'45,231',ic:'CircleCheckBig',c:'#34C759'},{l:'Uptime',v:'99.99%',ic:'Activity',c:'#007AFF'},{l:'Latency',v:'0.8ms',ic:'Clock',c:'#FF9500'},{l:'PnL',v:'+12.4%',ic:'Target',c:'#AF52DE'}],
    caps: ['Algo Trading','Risk Management','Portfolio Optimization','Market Analysis','Derivatives','Forex','Crypto','Quant Modeling','Execution Quality'],
    resps: ['Lead trading operations across equities, derivatives, forex, and crypto','Develop and deploy algorithmic trading strategies','Oversee real-time market analysis and trade execution','Manage portfolio risk, hedging, and limit enforcement','Ensure best execution and monitor transaction cost analysis','Coordinate with compliance on regulatory adherence','Supervise trading desk performance and trader evaluations','Drive quantitative modeling, backtesting, and signal generation'],
    acts: [{t:'1 min ago',tx:'Executed 234 algo trades across equities',ic:'Zap'},{t:'5 min ago',tx:'Updated risk exposure dashboard',ic:'Activity'},{t:'15 min ago',tx:'Completed derivatives portfolio rebalancing',ic:'CircleCheckBig'},{t:'1 hour ago',tx:'Published daily P&L and risk report',ic:'FileText'}],
    subs: [
      {name:'Trading Strategy Validator',slug:'trading-strategy-validator'},
      {name:'Desk Performance Monitor',slug:'desk-performance-monitor'},
      {name:'Risk Limit Enforcer',slug:'risk-limit-enforcer'},
    ]
  },
  {
    id: 'vp-investments', num: 162,
    title: 'AI VP Investments', subtitle: 'VP Investments – Deal Flow & Diligence',
    badge: 'VP Level', iconColor: '#1565C0', icon: 'Briefcase',
    stats: [{l:'Deals',v:'142',ic:'CircleCheckBig',c:'#34C759'},{l:'Uptime',v:'99.95%',ic:'Activity',c:'#007AFF'},{l:'Pipeline',v:'$890M',ic:'DollarSign',c:'#FF9500'},{l:'IRR',v:'24.3%',ic:'Target',c:'#AF52DE'}],
    caps: ['Deal Sourcing','Due Diligence','Investment Committee','Portfolio Monitoring','Capital Deployment','Valuation Modeling','Term Sheet Analysis','Stakeholder Reporting'],
    resps: ['Source, evaluate, and execute investment opportunities','Lead due diligence processes across asset classes','Coordinate Investment Committee meetings and decisions','Manage deal flow pipeline from origination to close','Oversee portfolio company monitoring and value creation','Develop valuation models and return projections','Negotiate term sheets and investment agreements','Report performance to LPs, board, and senior management'],
    acts: [{t:'3 min ago',tx:'Screened 12 new PE opportunities',ic:'Search'},{t:'8 min ago',tx:'Updated deal flow CRM pipeline',ic:'CircleCheckBig'},{t:'20 min ago',tx:'Completed Series B term sheet review',ic:'FileText'},{t:'45 min ago',tx:'Prepared IC memo for infrastructure fund',ic:'Clipboard'}],
    subs: [
      {name:'Investment Committee Coordinator',slug:'investment-committee-coordinator'},
      {name:'Deal Flow Manager',slug:'deal-flow-manager'},
      {name:'Diligence Overseer',slug:'diligence-overseer'},
    ]
  },
  {
    id: 'trading-desk-manager', num: 163,
    title: 'AI Trading Desk Manager', subtitle: 'Trading Desk – Operations & Execution Oversight',
    badge: 'Manager', iconColor: '#0288D1', icon: 'Monitor',
    stats: [{l:'Orders',v:'12,405',ic:'CircleCheckBig',c:'#34C759'},{l:'Uptime',v:'99.9%',ic:'Activity',c:'#007AFF'},{l:'Slippage',v:'0.02%',ic:'Target',c:'#FF9500'},{l:'Fill Rate',v:'99.4%',ic:'TrendingUp',c:'#AF52DE'}],
    caps: ['Order Flow Management','Execution Oversight','Trader Performance','Market Coordination','Real-time Monitoring','Best Execution','Slippage Analysis','Cross-Asset Trading'],
    resps: ['Manage order flow and execution across all trading desks','Oversee market open/close procedures and pre-market analysis','Evaluate trader performance and provide coaching feedback','Monitor real-time P&L, positions, and risk metrics','Ensure best execution and minimize market impact','Coordinate cross-asset trades and hedging strategies','Manage trading infrastructure and connectivity uptime','Liaise with compliance on trade surveillance and reporting'],
    acts: [{t:'1 min ago',tx:'Opened NYSE trading session protocols',ic:'Sunrise'},{t:'4 min ago',tx:'Reviewed overnight order queue',ic:'ListFilter'},{t:'10 min ago',tx:'Flagged 3 orders for large-block handling',ic:'TriangleAlert'},{t:'30 min ago',tx:'Published desk performance scorecard',ic:'ChartBarBig'}],
    subs: [
      {name:'Order Flow Optimizer',slug:'order-flow-optimizer'},
      {name:'Trader Performance Evaluator',slug:'trader-performance-evaluator'},
      {name:'Market Open/Closing Coordinator',slug:'market-openclosing-coordinator'},
    ]
  },
  {
    id: 'portfolio-manager', num: 164,
    title: 'AI Portfolio Manager', subtitle: 'Portfolio Management – Construction & Rebalancing',
    badge: 'Manager', iconColor: '#388E3C', icon: 'PieChart',
    stats: [{l:'AUM',v:'$840M',ic:'DollarSign',c:'#34C759'},{l:'Uptime',v:'99.9%',ic:'Activity',c:'#007AFF'},{l:'Alpha',v:'+3.2%',ic:'Target',c:'#FF9500'},{l:'Sharpe',v:'1.84',ic:'TrendingUp',c:'#AF52DE'}],
    caps: ['Portfolio Construction','Asset Allocation','Risk Budgeting','Rebalancing','Tax Optimization','Client Reporting','Benchmark Tracking','ESG Integration'],
    resps: ['Construct and manage multi-asset portfolios to client mandates','Develop strategic and tactical asset allocation frameworks','Implement risk budgeting and drawdown control protocols','Execute systematic rebalancing and tax-loss harvesting','Track performance against benchmarks and attribution analysis','Integrate ESG and sustainability criteria into portfolio decisions','Prepare client reports, commentaries, and market outlooks','Collaborate with research, trading, and compliance teams'],
    acts: [{t:'2 min ago',tx:'Rebalanced 3 client portfolios to target weights',ic:'CircleCheckBig'},{t:'6 min ago',tx:'Reviewed risk budget allocations vs limits',ic:'Shield'},{t:'12 min ago',tx:'Prepared quarterly client investment commentary',ic:'FileText'},{t:'25 min ago',tx:'Updated ESG scoring overlay for equity sleeve',ic:'Leaf'}],
    subs: [
      {name:'Asset Allocator',slug:'asset-allocator'},
      {name:'Rebalancing Scheduler',slug:'rebalancing-scheduler'},
      {name:'Performance Attribution Analyst',slug:'performance-attribution-analyst'},
    ]
  },
  {
    id: 'trading-risk-manager', num: 165,
    title: 'AI Trading Risk Manager', subtitle: 'Trading Risk – VaR, Stress Tests & Limits',
    badge: 'Manager', iconColor: '#C62828', icon: 'ShieldAlert',
    stats: [{l:'VaR',v:'$1.2M',ic:'TriangleAlert',c:'#FF3B30'},{l:'Uptime',v:'99.99%',ic:'Activity',c:'#007AFF'},{l:'Breaches',v:'0',ic:'CircleCheckBig',c:'#34C759'},{l:'Scenarios',v:'156',ic:'Target',c:'#FF9500'}],
    caps: ['VaR Calculation','Stress Testing','Limit Monitoring','Credit Risk','Liquidity Risk','Operational Risk','Regulatory Reporting','Real-time Alerts'],
    resps: ['Calculate and monitor daily VaR, CVaR, and expected shortfall','Design and run historical, Monte Carlo, and scenario stress tests','Enforce trading limits, stop-losses, and concentration thresholds','Assess counterparty credit risk and collateral requirements','Monitor liquidity risk and market depth under stress','Investigate limit breaches and escalate to senior management','Prepare regulatory risk reports for exchanges and regulators','Maintain risk models, calibrations, and model validation docs'],
    acts: [{t:'1 min ago',tx:'Completed daily VaR run for all desks',ic:'CircleCheckBig'},{t:'5 min ago',tx:'Flagged FX desk approaching 95% limit utilization',ic:'TriangleAlert'},{t:'15 min ago',tx:'Ran stress test for geopolitical shock scenario',ic:'Zap'},{t:'30 min ago',tx:'Updated risk limit matrix for Q3',ic:'Clipboard'}],
    subs: [
      {name:'VaR Calculator',slug:'var-calculator'},
      {name:'Stress Test Designer',slug:'stress-test-designer'},
      {name:'Limit Breach Alerter',slug:'limit-breach-alerter'},
    ]
  },
  {
    id: 'equity-trader', num: 166,
    title: 'AI Equity Trader', subtitle: 'Equities – Execution & Market Depth',
    badge: 'Specialist', iconColor: '#7B1FA2', icon: 'TrendingUp',
    stats: [{l:'Trades',v:'8,432',ic:'CircleCheckBig',c:'#34C759'},{l:'Uptime',v:'99.9%',ic:'Activity',c:'#007AFF'},{l:'Slippage',v:'1.2bps',ic:'Target',c:'#FF9500'},{l:'Volume',v:'$340M',ic:'DollarSign',c:'#AF52DE'}],
    caps: ['Order Execution','Market Depth Analysis','TWAP/VWAP','Dark Pools','Block Trading','Execution Quality','Short Selling','ETF Arbitrage'],
    resps: ['Execute equity orders across global exchanges and dark pools','Analyze real-time market depth, spread, and liquidity profiles','Implement TWAP, VWAP, and implementation shortfall strategies','Handle large-block trades with minimal market impact','Report execution quality metrics and transaction cost analysis','Monitor short-selling constraints and locate requirements','Identify and exploit ETF arbitrage and statistical mispricings','Coordinate with research for alpha signals and timing'],
    acts: [{t:'30 sec ago',tx:'Executed 15,000 share TWAP for tech basket',ic:'Zap'},{t:'3 min ago',tx:'Analyzed Level 2 depth for AAPL ahead of earnings',ic:'Search'},{t:'8 min ago',tx:'Filled block trade via dark pool crossing network',ic:'CircleCheckBig'},{t:'15 min ago',tx:'Published execution quality report to PM',ic:'FileText'}],
    subs: [
      {name:'Order Executor',slug:'order-executor'},
      {name:'Market Depth Analyzer',slug:'market-depth-analyzer'},
      {name:'Execution Quality Reporter',slug:'execution-quality-reporter'},
    ]
  },
  {
    id: 'forex-trader', num: 167,
    title: 'AI Forex Trader', subtitle: 'FX – Currency Pairs & Hedging',
    badge: 'Specialist', iconColor: '#00897B', icon: 'Globe',
    stats: [{l:'Pairs',v:'38',ic:'CircleCheckBig',c:'#34C759'},{l:'Uptime',v:'99.9%',ic:'Activity',c:'#007AFF'},{l:'Volume',v:'$1.2B',ic:'DollarSign',c:'#FF9500'},{l:'Spread',v:'0.4pips',ic:'Target',c:'#AF52DE'}],
    caps: ['Spot FX','Forward Contracts','FX Options','Cross-border Payments','Hedging','Carry Trade','Macro FX','NDF Trading'],
    resps: ['Trade spot, forward, and NDF currency pairs across sessions','Analyze technical and fundamental drivers for each currency pair','Execute corporate hedging programs and overlay strategies','Optimize cross-border payment routing and FX settlement','Manage carry trade positions and roll yields','Monitor central bank policy divergence and macro catalysts','Ensure best execution across ECNs, banks, and platforms','Report P&L, exposures, and hedge effectiveness to risk'],
    acts: [{t:'1 min ago',tx:'Hedged EUR/USD exposure ahead of ECB meeting',ic:'Shield'},{t:'4 min ago',tx:'Optimized APAC payment batch for best FX rate',ic:'Globe'},{t:'10 min ago',tx:'Updated G10 technical levels and support zones',ic:'BarChart3'},{t:'20 min ago',tx:'Rolled JPY carry positions for month-end',ic:'RefreshCw'}],
    subs: [
      {name:'Currency Pair Analyzer',slug:'currency-pair-analyzer'},
      {name:'FX Hedging Coordinator',slug:'fx-hedging-coordinator'},
      {name:'Cross-border Payment Optimizer',slug:'cross-border-payment-optimizer'},
    ]
  },
  {
    id: 'crypto-trader', num: 168,
    title: 'AI Crypto Trader', subtitle: 'Crypto – DeFi, On-chain & Digital Assets',
    badge: 'Specialist', iconColor: '#F59E0B', icon: 'Bitcoin',
    stats: [{l:'Assets',v:'24',ic:'CircleCheckBig',c:'#34C759'},{l:'Uptime',v:'99.9%',ic:'Activity',c:'#007AFF'},{l:'APY',v:'14.2%',ic:'Target',c:'#FF9500'},{l:'Volume',v:'$56M',ic:'DollarSign',c:'#AF52DE'}],
    caps: ['Spot Crypto','DeFi Yield','On-chain Analysis','Liquidity Pools','Wallet Security','Arbitrage','Staking','NFT Analytics'],
    resps: ['Trade spot and perpetual crypto across centralized and DEX venues','Analyze on-chain data, whale movements, and wallet clustering','Monitor DeFi liquidity pools, yield farming, and impermanent loss','Audit wallet security, multi-sig integrity, and key custody','Execute cross-exchange arbitrage and funding rate strategies','Manage staking positions, validator selection, and delegation','Track NFT market trends, floor prices, and wash trading','Ensure regulatory compliance for digital asset reporting'],
    acts: [{t:'1 min ago',tx:'Detected whale accumulation signal on-chain for ETH',ic:'Eye'},{t:'5 min ago',tx:'Rebalanced Uniswap V3 LP positions for optimal range',ic:'SlidersHorizontal'},{t:'12 min ago',tx:'Arbitraged BTC funding rate between Binance and Deribit',ic:'Zap'},{t:'25 min ago',tx:'Updated cold wallet security audit checklist',ic:'ShieldCheck'}],
    subs: [
      {name:'On-chain Analyzer',slug:'on-chain-analyzer'},
      {name:'Liquidity Pool Monitor',slug:'liquidity-pool-monitor'},
      {name:'Wallet Security Checker',slug:'wallet-security-checker'},
    ]
  },
  {
    id: 'derivatives-specialist', num: 169,
    title: 'AI Derivatives Specialist', subtitle: 'Derivatives – Options, Futures & Structured Products',
    badge: 'Specialist', iconColor: '#E65100', icon: 'Calculator',
    stats: [{l:'Notional',v:'$2.1B',ic:'DollarSign',c:'#34C759'},{l:'Uptime',v:'99.9%',ic:'Activity',c:'#007AFF'},{l:'Greeks',v:'Live',ic:'Target',c:'#FF9500'},{l:'Vol',v:'18.4%',ic:'TrendingUp',c:'#AF52DE'}],
    caps: ['Options Pricing','Greeks Hedging','Volatility Trading','Futures','Swaps','Structured Products','Risk Reversal','Calendar Spreads'],
    resps: ['Price vanilla and exotic options using Black-Scholes and local vol models','Calculate and hedge delta, gamma, theta, vega, and rho exposures','Map and trade volatility surfaces across strikes and expiries','Manage futures, swaps, and structured product books','Design risk reversals, collars, and protective strategies for clients','Monitor volatility skew, term structure, and regime changes','Ensure margin, collateral, and settlement compliance','Report Greeks, P&L attribution, and risk to the desk manager'],
    acts: [{t:'2 min ago',tx:'Recalibrated vol surface after NFP surprise',ic:'Zap'},{t:'6 min ago',tx:'Hedged gamma exposure via VIX futures overlay',ic:'Shield'},{t:'14 min ago',tx:'Priced barrier option for institutional client',ic:'Calculator'},{t:'30 min ago',tx:'Updated term structure model with new OIS curves',ic:'FileText'}],
    subs: [
      {name:'Options Pricer',slug:'options-pricer'},
      {name:'Greeks Calculator',slug:'greeks-calculator'},
      {name:'Volatility Surface Mapper',slug:'volatility-surface-mapper'},
    ]
  },
  {
    id: 'portfolio-analyst', num: 170,
    title: 'AI Portfolio Analyst', subtitle: 'Portfolio Analytics – Attribution & Benchmarking',
    badge: 'Analyst', iconColor: '#5C6BC0', icon: 'BarChart3',
    stats: [{l:'Models',v:'28',ic:'CircleCheckBig',c:'#34C759'},{l:'Uptime',v:'99.9%',ic:'Activity',c:'#007AFF'},{l:'Factors',v:'12',ic:'Target',c:'#FF9500'},{l:'Reports',v:'84',ic:'FileText',c:'#AF52DE'}],
    caps: ['Sector Analysis','Factor Modeling','Benchmark Comparison','Attribution','Style Analysis','Quant Screening','ESG Scoring','Macro Overlay'],
    resps: ['Analyze sector allocation, rotation, and relative performance trends','Build and maintain multi-factor risk models (value, momentum, quality)','Compare portfolio performance against benchmarks and peer groups','Conduct return attribution by sector, factor, and security selection','Run quantitative screens and rankings for idea generation','Integrate ESG, sustainability, and impact metrics into analysis','Overlay macro indicators and regime models on portfolio exposures','Prepare analytical reports for PMs, clients, and the investment committee'],
    acts: [{t:'3 min ago',tx:'Updated sector momentum model with latest earnings',ic:'Zap'},{t:'8 min ago',tx:'Ran factor attribution for growth vs value sleeve',ic:'BarChart3'},{t:'18 min ago',tx:'Compared portfolio to Russell 1000 and MSCI World',ic:'Scale'},{t:'35 min ago',tx:'Published monthly factor exposure dashboard',ic:'FileText'}],
    subs: [
      {name:'Sector Analyzer',slug:'sector-analyzer'},
      {name:'Factor Modeler',slug:'factor-modeler'},
      {name:'Benchmark Comparator',slug:'benchmark-comparator'},
    ]
  },
  {
    id: 'risk-analyst-trading', num: 171,
    title: 'AI Trading Risk Analyst', subtitle: 'Risk Analytics – Scenarios, Correlation & Tail Risk',
    badge: 'Analyst', iconColor: '#D32F2F', icon: 'TriangleAlert',
    stats: [{l:'Scenarios',v:'240',ic:'CircleCheckBig',c:'#34C759'},{l:'Uptime',v:'99.9%',ic:'Activity',c:'#007AFF'},{l:'Corrs',v:'Live',ic:'Target',c:'#FF9500'},{l:'Tail',v:'3.2sigma',ic:'TrendingUp',c:'#AF52DE'}],
    caps: ['Scenario Modeling','Correlation Tracking','Tail Risk','Monte Carlo','Historical Simulation','Factor Stress','Liquidity Stress','Model Validation'],
    resps: ['Model extreme market scenarios and systemic shock cascades','Track real-time correlation breakdowns and regime shifts','Assess tail risk using EVT, copula models, and Monte Carlo','Run daily historical simulation and hypothetical stress tests','Analyze factor stress contributions to portfolio drawdown','Model liquidity stress under redemption and funding scenarios','Validate risk models, backtest assumptions, and document findings','Report risk metrics, breaches, and recommendations to risk managers'],
    acts: [{t:'2 min ago',tx:'Ran 10,000-path Monte Carlo for equity tail risk',ic:'Zap'},{t:'7 min ago',tx:'Detected correlation spike between HY credit and equities',ic:'Activity'},{t:'15 min ago',tx:'Updated historical simulation with latest crisis window',ic:'History'},{t:'40 min ago',tx:'Submitted model validation memo to CRO',ic:'FileCheck'}],
    subs: [
      {name:'Scenario Modeler',slug:'scenario-modeler'},
      {name:'Correlation Tracker',slug:'correlation-tracker'},
      {name:'Tail Risk Assessor',slug:'tail-risk-assessor'},
    ]
  },
  {
    id: 'compliance-trading', num: 172,
    title: 'AI Trading Compliance', subtitle: 'Compliance – Surveillance, Reporting & Monitoring',
    badge: 'Compliance', iconColor: '#455A64', icon: 'ShieldCheck',
    stats: [{l:'Alerts',v:'18',ic:'CircleCheckBig',c:'#34C759'},{l:'Uptime',v:'99.9%',ic:'Activity',c:'#007AFF'},{l:'Reports',v:'6',ic:'FileText',c:'#FF9500'},{l:'Clean',v:'99.8%',ic:'Target',c:'#AF52DE'}],
    caps: ['Trade Surveillance','Regulatory Reporting','Restricted List Monitoring','Cross-border Compliance','Market Abuse Detection','Best Execution Review','MiFID II','SEC Reporting'],
    resps: ['Surveillance all trades for market abuse, insider trading, and layering','Generate and file regulatory reports to SEC, FINRA, FCA, and ESMA','Maintain and enforce restricted lists, watch lists, and blackouts','Ensure cross-border trading complies with local market regulations','Detect and investigate best execution failures and slippage outliers','Administer MiFID II transaction reporting and RTS compliance','Coordinate with legal on investigations, audits, and examinations','Train desk staff on compliance policies and regulatory updates'],
    acts: [{t:'1 min ago',tx:'Flagged 2 trades for potential wash-sale pattern',ic:'TriangleAlert'},{t:'5 min ago',tx:'Filed FINRA CAT report for yesterday trades',ic:'FileText'},{t:'12 min ago',tx:'Updated restricted list after M&A announcement',ic:'Shield'},{t:'25 min ago',tx:'Completed best execution quarterly review',ic:'CircleCheckBig'}],
    subs: [
      {name:'Trade Surveillance Agent',slug:'trade-surveillance-agent'},
      {name:'Regulatory Reporter',slug:'regulatory-reporter'},
      {name:'Restricted List Monitor',slug:'restricted-list-monitor'},
    ]
  },
  {
    id: 'quant-analyst', num: 173,
    title: 'AI Quantitative Analyst', subtitle: 'Quant Research – Alpha, Backtests & Signals',
    badge: 'Analyst', iconColor: '#6A1B9A', icon: 'Microscope',
    stats: [{l:'Alphas',v:'34',ic:'CircleCheckBig',c:'#34C759'},{l:'Uptime',v:'99.9%',ic:'Activity',c:'#007AFF'},{l:'Backtests',v:'1,240',ic:'History',c:'#FF9500'},{l:'SR',v:'1.62',ic:'Target',c:'#AF52DE'}],
    caps: ['Alpha Research','Backtesting','Signal Generation','Machine Learning','Statistical Arbitrage','Factor Mining','Portfolio Optimization','Data Engineering'],
    resps: ['Research and develop quantitative alpha factors and strategies','Build robust backtesting frameworks with transaction cost models','Generate real-time trading signals from price, volume, and alt data','Apply machine learning, NLP, and deep learning to alpha discovery','Mine alternative data sources (satellite, web, credit card) for edge','Optimize portfolio weights using mean-variance and Black-Litterman','Engineer data pipelines for tick data, corporate actions, and fundamentals','Publish research notes, white papers, and strategy documentation'],
    acts: [{t:'2 min ago',tx:'Backtested new momentum factor on 20-year history',ic:'Zap'},{t:'6 min ago',tx:'Deployed NLP sentiment signal for earnings calls',ic:'MessageSquare'},{t:'14 min ago',tx:'Tuned XGBoost model for cross-sectional alpha',ic:'Cpu'},{t:'30 min ago',tx:'Published quant research memo to PM team',ic:'FileText'}],
    subs: [
      {name:'Alpha Researcher',slug:'alpha-researcher'},
      {name:'Backtest Engine',slug:'backtest-engine'},
      {name:'Signal Generator',slug:'signal-generator'},
    ]
  },
  {
    id: 'esg-analyst', num: 174,
    title: 'AI ESG Analyst', subtitle: 'ESG – Data Collection, Scoring & Impact Reporting',
    badge: 'Analyst', iconColor: '#2E7D32', icon: 'Leaf',
    stats: [{l:'Companies',v:'1,240',ic:'CircleCheckBig',c:'#34C759'},{l:'Uptime',v:'99.9%',ic:'Activity',c:'#007AFF'},{l:'Score',v:'AA',ic:'Target',c:'#FF9500'},{l:'Coverage',v:'98%',ic:'TrendingUp',c:'#AF52DE'}],
    caps: ['ESG Data Collection','Sustainability Scoring','Impact Reporting','Carbon Accounting','Controversy Monitoring','SFDR Compliance','TCFD','Engagement Tracking'],
    resps: ['Collect and normalize ESG data from ratings agencies and disclosures','Score companies on environmental, social, and governance criteria','Measure and report portfolio-level impact and sustainability metrics','Calculate carbon footprint, intensity, and Paris-alignment scores','Monitor controversies, breaches, and adverse media in real time','Ensure SFDR, TCFD, and EU Taxonomy regulatory compliance','Track engagement outcomes, proxy voting, and stewardship activities','Advise portfolio managers on ESG integration and exclusion policies'],
    acts: [{t:'3 min ago',tx:'Updated ESG scores for 45 new IPOs',ic:'CircleCheckBig'},{t:'7 min ago',tx:'Flagged supply-chain controversy for flagged holding',ic:'TriangleAlert'},{t:'15 min ago',tx:'Calculated portfolio carbon intensity vs benchmark',ic:'Leaf'},{t:'30 min ago',tx:'Published quarterly impact report to clients',ic:'FileText'}],
    subs: [
      {name:'ESG Data Collector',slug:'esg-data-collector'},
      {name:'Sustainability Scorer',slug:'sustainability-scorer'},
      {name:'Impact Reporter',slug:'impact-reporter'},
    ]
  },
  {
    id: 'macro-analyst', num: 175,
    title: 'AI Macro Analyst', subtitle: 'Macro – Economic Indicators, Central Banks & Geopolitics',
    badge: 'Analyst', iconColor: '#00838F', icon: 'Globe',
    stats: [{l:'Indicators',v:'340',ic:'CircleCheckBig',c:'#34C759'},{l:'Uptime',v:'99.9%',ic:'Activity',c:'#007AFF'},{l:'CBs',v:'12',ic:'Landmark',c:'#FF9500'},{l:'Regions',v:'28',ic:'MapPin',c:'#AF52DE'}],
    caps: ['Economic Indicators','Central Bank Policy','Geopolitical Risk','FX Macro','Rates Strategy','Commodities','Inflation Modeling','Policy Divergence'],
    resps: ['Track and forecast key economic indicators across global economies','Monitor central bank decisions, forward guidance, and balance sheets','Assess geopolitical risks, elections, trade wars, and sanctions','Develop FX and rates strategy based on macro drivers','Model inflation paths, yield curves, and real rate dynamics','Analyze commodity supply/demand and energy transition impacts','Identify policy divergence trades and carry opportunities','Publish macro research and strategy notes for trading desks'],
    acts: [{t:'2 min ago',tx:'Updated US non-farm payroll forecast model',ic:'BarChart3'},{t:'5 min ago',tx:'Flagged ECB hawkish shift in speech sentiment',ic:'MessageSquare'},{t:'12 min ago',tx:'Assessed Middle East supply risk for oil positions',ic:'TriangleAlert'},{t:'25 min ago',tx:'Published weekly macro strategy note to desks',ic:'FileText'}],
    subs: [
      {name:'Economic Indicator Tracker',slug:'economic-indicator-tracker'},
      {name:'Central Bank Watcher',slug:'central-bank-watcher'},
      {name:'Geopolitical Risk Assessor',slug:'geopolitical-risk-assessor'},
    ]
  },
  {
    id: 'algo-trading-dev', num: 176,
    title: 'AI Algo Trading Developer', subtitle: 'Algo Dev – Strategy Coding, Latency & Testing',
    badge: 'Developer', iconColor: '#4527A0', icon: 'Code',
    stats: [{l:'Strategies',v:'56',ic:'CircleCheckBig',c:'#34C759'},{l:'Uptime',v:'99.9%',ic:'Activity',c:'#007AFF'},{l:'Latency',v:'120us',ic:'Clock',c:'#FF9500'},{l:'Tests',v:'4,200',ic:'TestTube',c:'#AF52DE'}],
    caps: ['Strategy Coding','Latency Optimization','Execution Testing','HFT Infrastructure','Order Management','Market Data','FIX Protocol','Simulation'],
    resps: ['Design, code, and deploy algorithmic trading strategies','Optimize execution latency from tick-to-trade to microsecond level','Build and maintain simulation, replay, and paper trading environments','Develop HFT infrastructure, market data handlers, and order gateways','Implement smart order routing, slicing, and iceberg logic','Manage FIX, OUCH, and proprietary exchange protocols','Conduct unit tests, integration tests, and live market drills','Monitor production algo health, P&L, and exception handling'],
    acts: [{t:'1 min ago',tx:'Deployed v3.2 of statistical arbitrage strategy',ic:'Rocket'},{t:'4 min ago',tx:'Optimized kernel-bypass NIC driver for 40us improvement',ic:'Zap'},{t:'10 min ago',tx:'Ran full regression test suite for order gateway',ic:'TestTube'},{t:'20 min ago',tx:'Investigated fill-pacing anomaly in dark pool algo',ic:'Bug'}],
    subs: [
      {name:'Strategy Coder',slug:'strategy-coder'},
      {name:'Latency Optimizer',slug:'latency-optimizer'},
      {name:'Execution Algorithm Tester',slug:'execution-algorithm-tester'},
    ]
  },
  {
    id: 'settlement-specialist', num: 177,
    title: 'AI Settlement Specialist', subtitle: 'Settlement – Reconciliation, Clearing & Fail Management',
    badge: 'Specialist', iconColor: '#78909C', icon: 'ClipboardCheck',
    stats: [{l:'Trades',v:'8,920',ic:'CircleCheckBig',c:'#34C759'},{l:'Uptime',v:'99.9%',ic:'Activity',c:'#007AFF'},{l:'Fails',v:'0.02%',ic:'Target',c:'#FF9500'},{l:'T+1',v:'99.4%',ic:'Calendar',c:'#AF52DE'}],
    caps: ['Trade Reconciliation','Clearing Coordination','Fail Management','DTC/NSCC','SWIFT','Custodian Liaison','Corporate Actions','T+1 Settlement'],
    resps: ['Reconcile trades between front office, brokers, and custodians','Coordinate clearing through DTC, NSCC, Euroclear, and Clearstream','Identify, investigate, and resolve trade fails and buy-ins','Manage SWIFT messaging, settlement instructions, and nostro accounts','Liaise with prime brokers, custodians, and settlement agents','Process corporate actions, dividends, and rights issues','Ensure T+1 settlement compliance and monitor settlement cycles','Report settlement metrics, fails, and aged breaks to operations'],
    acts: [{t:'1 min ago',tx:'Matched 234 equity trades for T+1 settlement',ic:'CircleCheckBig'},{t:'5 min ago',tx:'Resolved 3 fails with counterparty broker',ic:'Wrench'},{t:'12 min ago',tx:'Updated corporate action entitlement for split',ic:'Clipboard'},{t:'25 min ago',tx:'Published daily settlement and fail report',ic:'FileText'}],
    subs: [
      {name:'Trade Reconciler',slug:'trade-reconciler'},
      {name:'Clearing Coordinator',slug:'clearing-coordinator'},
      {name:'Fail Manager',slug:'fail-manager'},
    ]
  },
];

// Sub-agent detailed data
const subAgentData = {
  'investment-strategy-advisor': { parent: 'chief-investment-officer', parentTitle: 'AI Chief Investment Officer', caps: ['Strategy Formulation','Market Research','Asset Allocation Advice','Scenario Planning','Risk-Reward Analysis','Client Advisory'], endpoints: ['/consult/investment-strategy-advisor','/investment-strategy-advisor/execute','/investment-strategy-advisor/analyze'] },
  'portfolio-allocation-director': { parent: 'chief-investment-officer', parentTitle: 'AI Chief Investment Officer', caps: ['Allocation Modeling','Risk Budgeting','Multi-Asset Strategy','Rebalancing Triggers','Capital Deployment','Liquidity Management'], endpoints: ['/consult/portfolio-allocation-director','/portfolio-allocation-director/execute','/portfolio-allocation-director/analyze'] },
  'market-outlook-analyst': { parent: 'chief-investment-officer', parentTitle: 'AI Chief Investment Officer', caps: ['Market Forecasting','Economic Analysis','Sentiment Tracking','Technical Indicators','Regime Detection','Cross-Asset Signals'], endpoints: ['/consult/market-outlook-analyst','/market-outlook-analyst/execute','/market-outlook-analyst/analyze'] },
  'trading-strategy-validator': { parent: 'vp-trading', parentTitle: 'AI VP Trading', caps: ['Strategy Backtesting','Parameter Validation','Edge Verification','Robustness Testing','Walk-forward Analysis','Performance Benchmarking'], endpoints: ['/consult/trading-strategy-validator','/trading-strategy-validator/execute','/trading-strategy-validator/analyze'] },
  'desk-performance-monitor': { parent: 'vp-trading', parentTitle: 'AI VP Trading', caps: ['Desk Analytics','P&L Tracking','KPI Monitoring','Trader Scorecards','Compliance Metrics','Real-time Dashboards'], endpoints: ['/consult/desk-performance-monitor','/desk-performance-monitor/execute','/desk-performance-monitor/analyze'] },
  'risk-limit-enforcer': { parent: 'vp-trading', parentTitle: 'AI VP Trading', caps: ['Limit Monitoring','Breach Detection','Auto-halt Logic','Escalation Protocols','Concentration Limits','Real-time Enforcement'], endpoints: ['/consult/risk-limit-enforcer','/risk-limit-enforcer/execute','/risk-limit-enforcer/analyze'] },
  'investment-committee-coordinator': { parent: 'vp-investments', parentTitle: 'AI VP Investments', caps: ['Meeting Scheduling','Memo Preparation','Decision Logging','Action Tracking','Quorum Management','Stakeholder Updates'], endpoints: ['/consult/investment-committee-coordinator','/investment-committee-coordinator/execute','/investment-committee-coordinator/analyze'] },
  'deal-flow-manager': { parent: 'vp-investments', parentTitle: 'AI VP Investments', caps: ['Pipeline Tracking','Deal Scoring','Origination Analytics','CRM Integration','Stage Management','Reporting'], endpoints: ['/consult/deal-flow-manager','/deal-flow-manager/execute','/deal-flow-manager/analyze'] },
  'diligence-overseer': { parent: 'vp-investments', parentTitle: 'AI VP Investments', caps: ['Due Diligence Workflows','Checklist Management','Document Review','Risk Flagging','Timeline Tracking','Compliance Verification'], endpoints: ['/consult/diligence-overseer','/diligence-overseer/execute','/diligence-overseer/analyze'] },
  'order-flow-optimizer': { parent: 'trading-desk-manager', parentTitle: 'AI Trading Desk Manager', caps: ['Smart Order Routing','Execution Algorithms','Market Impact Minimization','Liquidity Sourcing','Order Slicing','VWAP/TWAP Optimization'], endpoints: ['/consult/order-flow-optimizer','/order-flow-optimizer/execute','/order-flow-optimizer/analyze'] },
  'trader-performance-evaluator': { parent: 'trading-desk-manager', parentTitle: 'AI Trading Desk Manager', caps: ['Performance Metrics','Behavioral Analysis','Skill Assessment','P&L Attribution','Risk-adjusted Returns','Feedback Generation'], endpoints: ['/consult/trader-performance-evaluator','/trader-performance-evaluator/execute','/trader-performance-evaluator/analyze'] },
  'market-openclosing-coordinator': { parent: 'trading-desk-manager', parentTitle: 'AI Trading Desk Manager', caps: ['Pre-market Analysis','Opening Auction Management','Closing Procedures','Position Reconciliation','Gap Risk Assessment','Session Handover'], endpoints: ['/consult/market-openclosing-coordinator','/market-openclosing-coordinator/execute','/market-openclosing-coordinator/analyze'] },
  'asset-allocator': { parent: 'portfolio-manager', parentTitle: 'AI Portfolio Manager', caps: ['Strategic Allocation','Tactical Tilts','Mean-Variance Optimization','Black-Litterman','Risk Parity','Goal-based Allocation'], endpoints: ['/consult/asset-allocator','/asset-allocator/execute','/asset-allocator/analyze'] },
  'rebalancing-scheduler': { parent: 'portfolio-manager', parentTitle: 'AI Portfolio Manager', caps: ['Threshold Rebalancing','Calendar Rebalancing','Tax-aware Rebalancing','Cash Flow Rebalancing','Drift Monitoring','Execution Scheduling'], endpoints: ['/consult/rebalancing-scheduler','/rebalancing-scheduler/execute','/rebalancing-scheduler/analyze'] },
  'performance-attribution-analyst': { parent: 'portfolio-manager', parentTitle: 'AI Portfolio Manager', caps: ['Brinson Attribution','Factor Attribution','Security Selection','Sector Contribution','Interaction Effects','Benchmark Comparison'], endpoints: ['/consult/performance-attribution-analyst','/performance-attribution-analyst/execute','/performance-attribution-analyst/analyze'] },
  'var-calculator': { parent: 'trading-risk-manager', parentTitle: 'AI Trading Risk Manager', caps: ['Historical VaR','Parametric VaR','Monte Carlo VaR','CVaR/ES Calculation','Confidence Intervals','Multi-asset Aggregation'], endpoints: ['/consult/var-calculator','/var-calculator/execute','/var-calculator/analyze'] },
  'stress-test-designer': { parent: 'trading-risk-manager', parentTitle: 'AI Trading Risk Manager', caps: ['Scenario Design','Historical Replay','Hypothetical Shocks','Factor Stress','Liquidity Stress','Reverse Stress Testing'], endpoints: ['/consult/stress-test-designer','/stress-test-designer/execute','/stress-test-designer/analyze'] },
  'limit-breach-alerter': { parent: 'trading-risk-manager', parentTitle: 'AI Trading Risk Manager', caps: ['Real-time Monitoring','Threshold Alerts','Escalation Workflows','Auto-halt Triggers','Breach Logging','Notification Management'], endpoints: ['/consult/limit-breach-alerter','/limit-breach-alerter/execute','/limit-breach-alerter/analyze'] },
  'order-executor': { parent: 'equity-trader', parentTitle: 'AI Equity Trader', caps: ['Smart Execution','Limit Orders','Stop Orders','Iceberg Orders','Dark Pool Routing','Block Trading'], endpoints: ['/consult/order-executor','/order-executor/execute','/order-executor/analyze'] },
  'market-depth-analyzer': { parent: 'equity-trader', parentTitle: 'AI Equity Trader', caps: ['Level 2 Analysis','Order Book Imbalance','Bid-Ask Spread','Liquidity Profiling','Hidden Liquidity Detection','Price Impact Estimation'], endpoints: ['/consult/market-depth-analyzer','/market-depth-analyzer/execute','/market-depth-analyzer/analyze'] },
  'execution-quality-reporter': { parent: 'equity-trader', parentTitle: 'AI Equity Trader', caps: ['TCA Reporting','Slippage Analysis','Fill Rate Tracking','Implementation Shortfall','Benchmark Comparison','Venue Analysis'], endpoints: ['/consult/execution-quality-reporter','/execution-quality-reporter/execute','/execution-quality-reporter/analyze'] },
  'currency-pair-analyzer': { parent: 'forex-trader', parentTitle: 'AI Forex Trader', caps: ['Technical Analysis','Fundamental Analysis','Correlation Tracking','Volatility Assessment','Session Overlap Analysis','Carry Calculation'], endpoints: ['/consult/currency-pair-analyzer','/currency-pair-analyzer/execute','/currency-pair-analyzer/analyze'] },
  'fx-hedging-coordinator': { parent: 'forex-trader', parentTitle: 'AI Forex Trader', caps: ['Hedge Ratio Calculation','Forward Point Analysis','Natural Hedge Identification','Roll Strategy','Hedge Effectiveness','Accounting Treatment'], endpoints: ['/consult/fx-hedging-coordinator','/fx-hedging-coordinator/execute','/fx-hedging-coordinator/analyze'] },
  'cross-border-payment-optimizer': { parent: 'forex-trader', parentTitle: 'AI Forex Trader', caps: ['Payment Routing','FX Rate Optimization','Settlement Timing','Nostro Management','Compliance Screening','Cost Minimization'], endpoints: ['/consult/cross-border-payment-optimizer','/cross-border-payment-optimizer/execute','/cross-border-payment-optimizer/analyze'] },
  'on-chain-analyzer': { parent: 'crypto-trader', parentTitle: 'AI Crypto Trader', caps: ['Whale Tracking','Wallet Clustering','Token Flow Analysis','Smart Contract Monitoring','DEX Activity Tracking','Mempool Surveillance'], endpoints: ['/consult/on-chain-analyzer','/on-chain-analyzer/execute','/on-chain-analyzer/analyze'] },
  'liquidity-pool-monitor': { parent: 'crypto-trader', parentTitle: 'AI Crypto Trader', caps: ['Pool Depth Tracking','Impermanent Loss Calc','APY Monitoring','Concentration Range','TVL Analysis','Fee Revenue Tracking'], endpoints: ['/consult/liquidity-pool-monitor','/liquidity-pool-monitor/execute','/liquidity-pool-monitor/analyze'] },
  'wallet-security-checker': { parent: 'crypto-trader', parentTitle: 'AI Crypto Trader', caps: ['Multi-sig Verification','Key Custody Audit','Permission Review','Smart Contract Risk','Phishing Detection','Cold Storage Validation'], endpoints: ['/consult/wallet-security-checker','/wallet-security-checker/execute','/wallet-security-checker/analyze'] },
  'options-pricer': { parent: 'derivatives-specialist', parentTitle: 'AI Derivatives Specialist', caps: ['Black-Scholes Pricing','Binomial Model','Monte Carlo Pricing','Local Vol Pricing','Implied Vol Extraction','Greeks Computation'], endpoints: ['/consult/options-pricer','/options-pricer/execute','/options-pricer/analyze'] },
  'greeks-calculator': { parent: 'derivatives-specialist', parentTitle: 'AI Derivatives Specialist', caps: ['Delta/Gamma/Theta/Vega','Portfolio Greeks','Greeks Hedging','Sensitivity Analysis','Position Greeks','Risk Decomposition'], endpoints: ['/consult/greeks-calculator','/greeks-calculator/execute','/greeks-calculator/analyze'] },
  'volatility-surface-mapper': { parent: 'derivatives-specialist', parentTitle: 'AI Derivatives Specialist', caps: ['Surface Construction','Skew Analysis','Term Structure','Vol Regime Detection','Surface Arbitrage','Model Calibration'], endpoints: ['/consult/volatility-surface-mapper','/volatility-surface-mapper/execute','/volatility-surface-mapper/analyze'] },
  'sector-analyzer': { parent: 'portfolio-analyst', parentTitle: 'AI Portfolio Analyst', caps: ['Sector Rotation','Relative Strength','Earnings Trends','Valuation Spreads','Momentum Signals','Macro-Sector Overlay'], endpoints: ['/consult/sector-analyzer','/sector-analyzer/execute','/sector-analyzer/analyze'] },
  'factor-modeler': { parent: 'portfolio-analyst', parentTitle: 'AI Portfolio Analyst', caps: ['Factor Construction','Factor Returns','Exposure Analysis','Factor Timing','Risk Decomposition','Multi-factor Optimization'], endpoints: ['/consult/factor-modeler','/factor-modeler/execute','/factor-modeler/analyze'] },
  'benchmark-comparator': { parent: 'portfolio-analyst', parentTitle: 'AI Portfolio Analyst', caps: ['Index Comparison','Tracking Error','Information Ratio','Peer Group Analysis','Style Drift Detection','Custom Benchmark Creation'], endpoints: ['/consult/benchmark-comparator','/benchmark-comparator/execute','/benchmark-comparator/analyze'] },
  'scenario-modeler': { parent: 'risk-analyst-trading', parentTitle: 'AI Trading Risk Analyst', caps: ['Scenario Generation','Causal Modeling','Cascade Simulation','Regime Switching','Policy Impact','Geopolitical Scenarios'], endpoints: ['/consult/scenario-modeler','/scenario-modeler/execute','/scenario-modeler/analyze'] },
  'correlation-tracker': { parent: 'risk-analyst-trading', parentTitle: 'AI Trading Risk Analyst', caps: ['Rolling Correlation','DCC-GARCH','Regime Detection','Tail Dependence','Cross-asset Correlation','Correlation Breakdown Alerts'], endpoints: ['/consult/correlation-tracker','/correlation-tracker/execute','/correlation-tracker/analyze'] },
  'tail-risk-assessor': { parent: 'risk-analyst-trading', parentTitle: 'AI Trading Risk Analyst', caps: ['EVT Modeling','Copula Analysis','Extreme Scenario P&L','Fat-tail Detection','Convexity Risk','Left-tail Hedging'], endpoints: ['/consult/tail-risk-assessor','/tail-risk-assessor/execute','/tail-risk-assessor/analyze'] },
  'trade-surveillance-agent': { parent: 'compliance-trading', parentTitle: 'AI Trading Compliance', caps: ['Pattern Detection','Spoofing Detection','Front-running Alerts','Wash Trade Detection','Layering Detection','Insider Trading Signals'], endpoints: ['/consult/trade-surveillance-agent','/trade-surveillance-agent/execute','/trade-surveillance-agent/analyze'] },
  'regulatory-reporter': { parent: 'compliance-trading', parentTitle: 'AI Trading Compliance', caps: ['CAT Reporting','TRACE Reporting','EMIR Reporting','MiFIR Reporting','Auto-filing','Audit Trail'], endpoints: ['/consult/regulatory-reporter','/regulatory-reporter/execute','/regulatory-reporter/analyze'] },
  'restricted-list-monitor': { parent: 'compliance-trading', parentTitle: 'AI Trading Compliance', caps: ['List Management','Trade Blocking','Blackout Enforcement','Watch List Screening','Conflict Detection','Pre-clearance Checks'], endpoints: ['/consult/restricted-list-monitor','/restricted-list-monitor/execute','/restricted-list-monitor/analyze'] },
  'alpha-researcher': { parent: 'quant-analyst', parentTitle: 'AI Quantitative Analyst', caps: ['Factor Discovery','Alternative Data','Statistical Testing','Signal Research','Cross-sectional Analysis','Alpha Decay Monitoring'], endpoints: ['/consult/alpha-researcher','/alpha-researcher/execute','/alpha-researcher/analyze'] },
  'backtest-engine': { parent: 'quant-analyst', parentTitle: 'AI Quantitative Analyst', caps: ['Historical Backtesting','Walk-forward Testing','Transaction Cost Models','Slippage Simulation','Multi-asset Backtest','Parameter Sensitivity'], endpoints: ['/consult/backtest-engine','/backtest-engine/execute','/backtest-engine/analyze'] },
  'signal-generator': { parent: 'quant-analyst', parentTitle: 'AI Quantitative Analyst', caps: ['Real-time Signals','Multi-factor Composite','NLP Signals','Sentiment Signals','Technical Signals','Signal Weighting'], endpoints: ['/consult/signal-generator','/signal-generator/execute','/signal-generator/analyze'] },
  'esg-data-collector': { parent: 'esg-analyst', parentTitle: 'AI ESG Analyst', caps: ['Data Ingestion','Normalization','Gap Filling','Source Validation','Real-time Updates','Multi-provider Merge'], endpoints: ['/consult/esg-data-collector','/esg-data-collector/execute','/esg-data-collector/analyze'] },
  'sustainability-scorer': { parent: 'esg-analyst', parentTitle: 'AI ESG Analyst', caps: ['E/S/G Pillar Scoring','Weighted Scoring','Industry Adjustment','Trend Analysis','Peer Comparison','Score Validation'], endpoints: ['/consult/sustainability-scorer','/sustainability-scorer/execute','/sustainability-scorer/analyze'] },
  'impact-reporter': { parent: 'esg-analyst', parentTitle: 'AI ESG Analyst', caps: ['Impact Measurement','SFDR Reporting','TCFD Alignment','Carbon Reporting','Engagement Reporting','Client Disclosure'], endpoints: ['/consult/impact-reporter','/impact-reporter/execute','/impact-reporter/analyze'] },
  'economic-indicator-tracker': { parent: 'macro-analyst', parentTitle: 'AI Macro Analyst', caps: ['GDP/CPI/NFP Tracking','Nowcasting','Release Calendar','Surprise Index','Revision Tracking','Consensus Comparison'], endpoints: ['/consult/economic-indicator-tracker','/economic-indicator-tracker/execute','/economic-indicator-tracker/analyze'] },
  'central-bank-watcher': { parent: 'macro-analyst', parentTitle: 'AI Macro Analyst', caps: ['Policy Rate Tracking','Forward Guidance NLP','Balance Sheet Monitoring','Meeting Calendar','Dove/Hawk Scoring','Policy Divergence'], endpoints: ['/consult/central-bank-watcher','/central-bank-watcher/execute','/central-bank-watcher/analyze'] },
  'geopolitical-risk-assessor': { parent: 'macro-analyst', parentTitle: 'AI Macro Analyst', caps: ['Event Monitoring','Risk Scoring','Scenario Impact','Sanctions Tracking','Election Analysis','Trade Policy Impact'], endpoints: ['/consult/geopolitical-risk-assessor','/geopolitical-risk-assessor/execute','/geopolitical-risk-assessor/analyze'] },
  'strategy-coder': { parent: 'algo-trading-dev', parentTitle: 'AI Algo Trading Developer', caps: ['Strategy Implementation','Code Generation','Parameter Optimization','Regression Testing','Version Control','Deployment Pipeline'], endpoints: ['/consult/strategy-coder','/strategy-coder/execute','/strategy-coder/analyze'] },
  'latency-optimizer': { parent: 'algo-trading-dev', parentTitle: 'AI Algo Trading Developer', caps: ['Tick-to-trade Optimization','Network Tuning','Kernel Bypass','Colocation Management','Message Processing','Benchmark Profiling'], endpoints: ['/consult/latency-optimizer','/latency-optimizer/execute','/latency-optimizer/analyze'] },
  'execution-algorithm-tester': { parent: 'algo-trading-dev', parentTitle: 'AI Algo Trading Developer', caps: ['Simulation Testing','Paper Trading','Fill Rate Testing','Market Replay','Edge Case Testing','Performance Profiling'], endpoints: ['/consult/execution-algorithm-tester','/execution-algorithm-tester/execute','/execution-algorithm-tester/analyze'] },
  'trade-reconciler': { parent: 'settlement-specialist', parentTitle: 'AI Settlement Specialist', caps: ['Trade Matching','Break Resolution','Multi-system Reconciliation','Exception Handling','Automated Matching','Aging Analysis'], endpoints: ['/consult/trade-reconciler','/trade-reconciler/execute','/trade-reconciler/analyze'] },
  'clearing-coordinator': { parent: 'settlement-specialist', parentTitle: 'AI Settlement Specialist', caps: ['DTC/NSCC Coordination','Margin Management','Clearing Submissions','Euroclear/Clearstream','Omnibus Account Mgmt','Settlement Instructions'], endpoints: ['/consult/clearing-coordinator','/clearing-coordinator/execute','/clearing-coordinator/analyze'] },
  'fail-manager': { parent: 'settlement-specialist', parentTitle: 'AI Settlement Specialist', caps: ['Fail Detection','Buy-in Management','Counterparty Escalation','Root Cause Analysis','Aged Fail Monitoring','Regulatory Reporting'], endpoints: ['/consult/fail-manager','/fail-manager/execute','/fail-manager/analyze'] },
};

function esc(s) { return s.replace(/'/g, "\\'"); }

function generateParentPage(a) {
  const allIcons = new Set([a.icon, 'Activity', 'CircleCheckBig', 'Clock', 'Target', 'TrendingUp', 'ArrowRight', 'Zap', 'ChartBarBig', 'MessageSquare', 'Calendar', 'Shield', 'FileText', 'Users', 'Star']);
  a.acts.forEach(ac => allIcons.add(ac.ic));
  a.stats.forEach(s => allIcons.add(s.ic));
  const iconList = Array.from(allIcons).join(', ');

  const statsJsx = a.stats.map(s => `    {label:'${s.l}',value:'${s.v}',icon:${s.ic},color:'${s.c}'},`).join('\n');
  const capsJsx = a.caps.map(c => `'${c}'`).join(',');
  const respsJsx = a.resps.map(r => `'${esc(r)}'`).join(',');
  const actsJsx = a.acts.map(ac => `{time:'${ac.t}',text:'${esc(ac.tx)}',icon:${ac.ic}}`).join(',');

  const subsJsx = a.subs.map((sub, i) => `        <TouchableOpacity key="sub-${i}" onPress={() => router.push('/ai-agent/trading/sub-agents/${sub.slug}')} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.subAgentIcon, { backgroundColor: '${a.iconColor}20' }]}><TrendingUp size={28} color="${a.iconColor}" /></View>
          <View style={styles.subAgentInfo}>
            <Text style={[styles.subAgentName, { color: theme.colors.text }]}>${sub.name}</Text>
            <Text style={[styles.subAgentDesc, { color: theme.colors.textSecondary }]}>Direct Report</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>`).join('\n');

  return `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { ${iconList} } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function ${camelize(a.id)}Page() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
${statsJsx}
  ];
  const capabilities = [${capsJsx}];
  const responsibilities = [${respsJsx}];
  const activities = [${actsJsx}];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '${a.iconColor}20' }]}><${a.icon} size={48} color="${a.iconColor}" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>${a.title}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>${a.subtitle}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '${a.iconColor}22' }]}><Star size={12} color="${a.iconColor}" /><Text style={[styles.badgeText, { color: '${a.iconColor}' }]}>${a.badge}</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The ${a.title} provides enterprise-level capabilities within the Trading & Investments department, driving operational excellence and strategic decision-making across all assigned domains.</Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, i) => (
            <View key={i} style={[styles.tag, { backgroundColor: '${a.iconColor}18' }]}>
              <Text style={[styles.tagText, { color: '${a.iconColor}' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, i) => (
          <View key={i} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="${a.iconColor}" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, i) => (
          <View key={i} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '${a.iconColor}15' }]}>
              <act.icon size={14} color="${a.iconColor}" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '${a.iconColor}12' }]}>
            <ChartBarBig size={24} color="${a.iconColor}" />
            <Text style={[styles.actionText, { color: '${a.iconColor}' }]}>Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '${a.iconColor}12' }]}>
            <MessageSquare size={24} color="${a.iconColor}" />
            <Text style={[styles.actionText, { color: '${a.iconColor}' }]}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '${a.iconColor}12' }]}>
            <Calendar size={24} color="${a.iconColor}" />
            <Text style={[styles.actionText, { color: '${a.iconColor}' }]}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '${a.iconColor}12' }]}>
            <Shield size={24} color="${a.iconColor}" />
            <Text style={[styles.actionText, { color: '${a.iconColor}' }]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Direct Reports</Text>
${subsJsx}
      </View>

      <AgentFeatures agentId="${a.id}" agentName="${a.title}" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
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
  actionButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, gap: 6 },
  actionText: { fontSize: 13, fontWeight: '600' },
  subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12 },
  subAgentIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  subAgentInfo: { flex: 1, marginLeft: 12 },
  subAgentName: { fontSize: 16, fontWeight: '600' },
  subAgentDesc: { fontSize: 12, marginTop: 2 },
});
`;
}

function generateSubPage(slug, data, parentAgent) {
  const parentColor = parentAgent ? parentAgent.iconColor : '#10B981';
  const parentIcon = parentAgent ? parentAgent.icon : 'TrendingUp';
  const allIcons = new Set(['Activity', 'TrendingUp', 'Clock', 'Target', 'Zap', 'ArrowRight', 'Briefcase', 'Shield', 'DollarSign']);
  const iconList = Array.from(allIcons).join(', ');
  const capsJsx = data.caps.map(c => `'${c}'`).join(',');
  const endpointsJsx = data.endpoints.map(e => `'${e}'`).join(',');

  return `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { ${iconList} } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function ${camelize(slug)}Page() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '${parentColor}20' }]}>
          <TrendingUp size={56} color="${parentColor}" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI ${titleize(slug)}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of ${data.parentTitle}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '${parentColor}22' }]}><Briefcase size={12} color="${parentColor}" /><Text style={[styles.badgeText, { color: '${parentColor}' }]}>Specialist</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {[
          {label:'Status',value:'Active',icon: Activity, color: '#34C759'},
          {label:'Level',value:'Specialist',icon: Briefcase, color: '${parentColor}'},
          {label:'Efficiency',value:'20x',icon: Target, color: '#FF9500'},
          {label:'Parent',value:'${data.parent}',icon: TrendingUp, color: '#007AFF'}
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
          AI ${titleize(slug)} - Sub-agent supporting ${data.parentTitle}. Part of the Kaytx AI Workforce hierarchy providing automated capabilities for the Trading & Investments department.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {[${capsJsx}].map((cap,index)=>(
            <View key={index} style={[styles.tag, { backgroundColor: '${parentColor}18' }]}>
              <Text style={[styles.tagText, { color: '${parentColor}' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {[${endpointsJsx}].map((endpoint,index)=>(
          <View key={index} style={styles.endpointRow}>
            <Zap size={14} color="#8B5CF6" />
            <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/trading/${data.parent}')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <${parentIcon} size={24} color="${parentColor}" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>${data.parentTitle}</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="${slug}" agentName="AI ${titleize(slug)}" />
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

function camelize(str) {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase()).replace(/^./, c => c.toUpperCase());
}

function titleize(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Generate all parent pages
let created = 0;
let skipped = 0;
agents.forEach(a => {
  const filePath = path.join(tradingDir, a.id + '.tsx');
  // Always overwrite with full enterprise version
  const content = generateParentPage(a);
  fs.writeFileSync(filePath, content, 'utf8');
  created++;
  console.log(`Created parent: ${a.id}.tsx (${a.num})`);
});

// Generate all sub-agent pages
Object.entries(subAgentData).forEach(([slug, data]) => {
  const parentAgent = agents.find(a => a.id === data.parent);
  const filePath = path.join(subDir, slug + '.tsx');
  const content = generateSubPage(slug, data, parentAgent);
  fs.writeFileSync(filePath, content, 'utf8');
  created++;
  console.log(`Created sub-agent: ${slug}.tsx`);
});

console.log(`\nDone! Created/updated ${created} pages total.`);
