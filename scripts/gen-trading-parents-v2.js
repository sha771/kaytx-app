/**
 * Enterprise Parent Agent Page Generator v2
 * Generates 18 parent pages matching insurance CRO quality
 */
const fs = require('fs');
const path = require('path');
const BASE = path.join(__dirname, '..', 'app', 'ai-agent', 'trading');

const A = [
  {id:'chief-investment-officer',t:'AI Chief Investment Officer',sub:'CIO – Investment Strategy & Oversight',ic:'Briefcase',c:'#0277BD',lv:'C-Suite',
   st:[{l:'AUM',v:'$2.4B',i:'DollarSign',c:'#34C759'},{l:'Uptime',v:'99.99%',i:'Activity',c:'#007AFF'},{l:'Strategies',v:'48',i:'Target',c:'#FF9500'},{l:'Accuracy',v:'97.8%',i:'TrendingUp',c:'#AF52DE'}],
   cap:['Investment Strategy','Portfolio Oversight','Risk Management','Asset Allocation','Performance Analysis','Regulatory Compliance','Capital Allocation','Due Diligence','M&A Oversight','Alpha Generation','Factor Modeling','Board Reporting'],
   resp:['Define and oversee firm-wide investment strategy and policy','Lead portfolio construction, asset allocation, and rebalancing frameworks','Manage investment risk, drawdown limits, and stress-testing protocols','Direct quantitative research, alpha generation, and factor modeling','Ensure regulatory compliance across all investment activities','Oversee M&A, private equity, and alternative investment due diligence','Chair the Investment Committee and coordinate deal flow','Report investment performance to the board and stakeholders','Drive ESG integration across investment portfolios and mandates'],
   act:[{t:'2 min ago',x:'Approved Q3 strategic asset allocation shift',i:'CircleCheckBig'},{t:'5 min ago',x:'Reviewed private equity due diligence pipeline',i:'Clock'},{t:'12 min ago',x:'Updated risk budget and VaR thresholds',i:'Zap'},{t:'28 min ago',x:'Published monthly CIO investment letter',i:'FileText'},{t:'1 hr ago',x:'Chaired Investment Committee quarterly review',i:'Users'}],
   met:[{l:'Portfolio Returns',v:'+18.4%',ch:'+2.3%'},{l:'Risk-Adj Alpha',v:'2.14',ch:'+0.12'},{l:'AUM Growth',v:'+24%',ch:'+6%'},{l:'Sharpe Ratio',v:'1.87',ch:'+0.08'}],
   qa:[{l:'Investment Dashboard',i:'ChartBarBig'},{l:'Committee Chat',i:'MessageSquare'},{l:'Strategy Review',i:'Calendar'},{l:'Risk Settings',i:'Shield'}],
   subs:[{id:'investment-strategy-advisor',n:'Investment Strategy Advisor',i:'TrendingUp',d:'Strategic investment framework development and alpha signal research'},{id:'portfolio-allocation-director',n:'Portfolio Allocation Director',i:'PieChart',d:'Multi-asset allocation optimization and rebalancing execution'},{id:'market-outlook-analyst',n:'Market Outlook Analyst',i:'BarChart3',d:'Macro market forecasting and economic indicator analysis'}]},

  {id:'vp-trading',t:'AI VP Trading',sub:'VP Trading – Execution & Desk Operations',ic:'TrendingUp',c:'#1565C0',lv:'VP Level',
   st:[{l:'Trades',v:'45,231',i:'CircleCheckBig',c:'#34C759'},{l:'Uptime',v:'99.99%',i:'Activity',c:'#007AFF'},{l:'Latency',v:'0.8ms',i:'Clock',c:'#FF9500'},{l:'PnL',v:'+12.4%',i:'Target',c:'#AF52DE'}],
   cap:['Algo Trading','Risk Management','Portfolio Optimization','Market Analysis','Derivatives','Forex','Crypto','Quant Modeling','Execution Quality','Transaction Cost Analysis','Hedging Strategies','Real-time Monitoring'],
   resp:['Lead trading operations across equities, derivatives, forex, and crypto','Develop and deploy algorithmic trading strategies','Oversee real-time market analysis and trade execution','Manage portfolio risk, hedging, and limit enforcement','Ensure best execution and monitor transaction cost analysis','Coordinate with compliance on regulatory adherence','Supervise trading desk performance and trader evaluations','Drive quantitative modeling, backtesting, and signal generation','Manage latency optimization and infrastructure reliability'],
   act:[{t:'1 min ago',x:'Executed 234 algo trades across equities',i:'Zap'},{t:'5 min ago',x:'Updated risk exposure dashboard',i:'Activity'},{t:'15 min ago',x:'Completed derivatives portfolio rebalancing',i:'CircleCheckBig'},{t:'1 hr ago',x:'Published daily P&L and risk report',i:'FileText'},{t:'2 hr ago',x:'Reviewed forex hedging position adjustments',i:'Globe'}],
   met:[{l:'Daily Volume',v:'$1.8B',ch:'+12%'},{l:'Win Rate',v:'64.2%',ch:'+1.8%'},{l:'Slippage',v:'0.02%',ch:'-0.01%'},{l:'Sharpe Ratio',v:'2.14',ch:'+0.22'}],
   qa:[{l:'Trading Dashboard',i:'ChartBarBig'},{l:'Desk Chat',i:'MessageSquare'},{l:'Schedule Review',i:'Calendar'},{l:'Risk Limits',i:'Shield'}],
   subs:[{id:'trading-strategy-validator',n:'Trading Strategy Validator',i:'Target',d:'Strategy backtesting, validation, and performance benchmarking'},{id:'desk-performance-monitor',n:'Desk Performance Monitor',i:'Activity',d:'Real-time desk P&L tracking and trader performance analytics'},{id:'risk-limit-enforcer',n:'Risk Limit Enforcer',i:'Shield',d:'Automated risk limit monitoring and breach alert enforcement'}]},

  {id:'vp-investments',t:'AI VP Investments',sub:'VP Investments – Deal Flow & Diligence',ic:'Briefcase',c:'#1565C0',lv:'VP Level',
   st:[{l:'Deals',v:'312',i:'CircleCheckBig',c:'#34C759'},{l:'Uptime',v:'99.9%',i:'Activity',c:'#007AFF'},{l:'Pipeline',v:'$890M',i:'Target',c:'#FF9500'},{l:'IRR',v:'22.6%',i:'TrendingUp',c:'#AF52DE'}],
   cap:['Deal Sourcing','Due Diligence','Investment Committee','Portfolio Construction','Alternative Assets','Private Equity','Venture Capital','Fund Operations','LP Relations','Capital Deployment','Co-investment','Exit Strategy'],
   resp:['Manage investment deal pipeline and sourcing activities','Lead due diligence processes for new investment opportunities','Coordinate Investment Committee meetings and approvals','Oversee capital deployment and fund allocation','Build and maintain LP and co-investor relationships','Monitor portfolio company performance and value creation','Develop exit strategies and liquidity event planning','Ensure investment compliance and regulatory reporting','Drive alternative investment strategy and allocation'],
   act:[{t:'3 min ago',x:'Approved Series B co-investment allocation',i:'CircleCheckBig'},{t:'8 min ago',x:'Reviewed PE fund quarterly performance report',i:'FileText'},{t:'20 min ago',x:'Updated deal pipeline scoring and ranking',i:'Target'},{t:'45 min ago',x:'Scheduled Investment Committee session',i:'Calendar'},{t:'2 hr ago',x:'Completed venture capital diligence memo',i:'Search'}],
   met:[{l:'Deal Flow',v:'47',ch:'+8'},{l:'Avg IRR',v:'22.6%',ch:'+1.4%'},{l:'Capital Deployed',v:'$1.2B',ch:'+$180M'},{l:'MOIC',v:'2.4x',ch:'+0.2x'}],
   qa:[{l:'Deal Pipeline',i:'ChartBarBig'},{l:'Committee Chat',i:'MessageSquare'},{l:'Diligence Review',i:'Calendar'},{l:'LP Reports',i:'FileText'}],
   subs:[{id:'investment-committee-coordinator',n:'Investment Committee Coordinator',i:'Users',d:'Committee scheduling, agenda management, and approval tracking'},{id:'deal-flow-manager',n:'Deal Flow Manager',i:'TrendingUp',d:'Deal pipeline management, scoring, and prioritization'},{id:'diligence-overseer',n:'Diligence Overseer',i:'Search',d:'Due diligence process coordination and quality assurance'}]},

  {id:'trading-desk-manager',t:'AI Trading Desk Manager',sub:'Desk Manager – Operations & Execution',ic:'Monitor',c:'#0288D1',lv:'Manager',
   st:[{l:'Orders',v:'12,847',i:'CircleCheckBig',c:'#34C759'},{l:'Uptime',v:'99.98%',i:'Activity',c:'#007AFF'},{l:'Fill Rate',v:'99.4%',i:'Target',c:'#FF9500'},{l:'Efficiency',v:'96.2%',i:'TrendingUp',c:'#AF52DE'}],
   cap:['Order Management','Execution Quality','Market Making','Flow Analysis','Desk Operations','Trader Oversight','Open/Close Coordination','Liquidity Management','Benchmark Execution','Smart Order Routing','Dark Pool Access','TWAP/VWAP Algorithms'],
   resp:['Manage daily trading desk operations and order flow','Supervise trader performance and execution quality','Coordinate market open and close procedures','Optimize smart order routing and execution algorithms','Monitor liquidity conditions and adjust trading parameters','Ensure best execution compliance and audit trail','Manage relationship with brokers and dark pool access','Oversee TWAP/VWAP algorithm parameter tuning','Report desk performance metrics and attribution analysis'],
   act:[{t:'1 min ago',x:'Routed 847 orders through smart order router',i:'Zap'},{t:'4 min ago',x:'Adjusted VWAP parameters for large block trade',i:'Activity'},{t:'12 min ago',x:'Completed market open coordination sequence',i:'Clock'},{t:'30 min ago',x:'Reviewed trader execution quality scores',i:'BarChart3'},{t:'1 hr ago',x:'Updated dark pool access configuration',i:'Shield'}],
   met:[{l:'Order Volume',v:'12.8K',ch:'+842'},{l:'Fill Rate',v:'99.4%',ch:'+0.2%'},{l:'Avg Slippage',v:'0.3bps',ch:'-0.1bps'},{l:'Participation',v:'18.2%',ch:'+1.4%'}],
   qa:[{l:'Desk Dashboard',i:'ChartBarBig'},{l:'Trader Chat',i:'MessageSquare'},{l:'Open/Close Log',i:'Calendar'},{l:'Alerts',i:'AlertTriangle'}],
   subs:[{id:'order-flow-optimizer',n:'Order Flow Optimizer',i:'Zap',d:'Smart order routing and execution algorithm optimization'},{id:'trader-performance-evaluator',n:'Trader Performance Evaluator',i:'BarChart3',d:'Trader KPI tracking, benchmarking, and performance scoring'},{id:'market-openclosing-coordinator',n:'Market Open/Close Coordinator',i:'Clock',d:'Pre-market and post-market coordination and auction management'}]},

  {id:'portfolio-manager',t:'AI Portfolio Manager',sub:'Portfolio Manager – Construction & Rebalancing',ic:'PieChart',c:'#388E3C',lv:'Manager',
   st:[{l:'Portfolios',v:'156',i:'CircleCheckBig',c:'#34C759'},{l:'AUM',v:'$1.8B',i:'DollarSign',c:'#007AFF'},{l:'Return',v:'+16.2%',i:'TrendingUp',c:'#FF9500'},{l:'Beta',v:'0.94',i:'Target',c:'#AF52DE'}],
   cap:['Portfolio Construction','Asset Allocation','Rebalancing','Risk Budgeting','Factor Tilts','ESG Integration','Performance Attribution','Benchmark Management','Tax Optimization','Liquidity Management','Multi-Asset','Thematic Investing'],
   resp:['Construct and manage multi-asset investment portfolios','Execute systematic rebalancing based on drift triggers','Implement factor tilts and thematic overlays','Manage portfolio risk budgets and drawdown constraints','Integrate ESG criteria into portfolio construction process','Conduct performance attribution and benchmark analysis','Optimize tax efficiency through loss harvesting strategies','Ensure liquidity requirements across all managed portfolios','Report portfolio analytics and risk metrics to stakeholders'],
   act:[{t:'2 min ago',x:'Rebalanced 12 portfolios after market drift',i:'CircleCheckBig'},{t:'8 min ago',x:'Updated factor tilt from value to momentum',i:'Zap'},{t:'15 min ago',x:'Completed monthly performance attribution',i:'BarChart3'},{t:'35 min ago',x:'Adjusted ESG screening parameters',i:'Shield'},{t:'1 hr ago',x:'Published quarterly portfolio review report',i:'FileText'}],
   met:[{l:'Avg Return',v:'+16.2%',ch:'+1.8%'},{l:'Tracking Error',v:'1.4%',ch:'-0.2%'},{l:'Info Ratio',v:'1.24',ch:'+0.14'},{l:'Turnover',v:'32%',ch:'-4%'}],
   qa:[{l:'Portfolio Analytics',i:'ChartBarBig'},{l:'Rebalance Now',i:'Zap'},{l:'Attribution',i:'Calendar'},{l:'Risk Report',i:'Shield'}],
   subs:[{id:'asset-allocator',n:'Asset Allocator',i:'PieChart',d:'Strategic and tactical asset allocation optimization engine'},{id:'rebalancing-scheduler',n:'Rebalancing Scheduler',i:'Calendar',d:'Automated rebalancing trigger monitoring and execution scheduling'},{id:'performance-attribution-analyst',n:'Performance Attribution Analyst',i:'BarChart3',d:'Multi-factor performance attribution and contribution analysis'}]},

  {id:'trading-risk-manager',t:'AI Trading Risk Manager',sub:'Risk Manager – Limits, VaR & Stress Testing',ic:'ShieldAlert',c:'#C62828',lv:'Manager',
   st:[{l:'VaR',v:'$42M',i:'AlertTriangle',c:'#FF3B30'},{l:'Breaches',v:'0',i:'Shield',c:'#34C759'},{l:'Stress Tests',v:'847',i:'CircleCheckBig',c:'#007AFF'},{l:'Coverage',v:'99.8%',i:'Target',c:'#FF9500'}],
   cap:['VaR Calculation','Stress Testing','Limit Management','Breach Detection','Scenario Analysis','Correlation Monitoring','Tail Risk Assessment','Capital Adequacy','Liquidity Risk','Counterparty Risk','Model Validation','Risk Reporting'],
   resp:['Calculate and monitor Value-at-Risk across all trading books','Design and execute stress testing scenarios and report results','Set and enforce risk limits across desks, traders, and instruments','Detect and escalate risk limit breaches in real-time','Monitor correlation shifts and concentration risk','Assess tail risk and extreme scenario exposure','Validate risk models and ensure accuracy of calculations','Report risk metrics to senior management and regulators','Manage counterparty and liquidity risk frameworks'],
   act:[{t:'1 min ago',x:'VaR breach alert triggered for FX desk',i:'AlertTriangle'},{t:'6 min ago',x:'Completed daily stress test scenario suite',i:'Shield'},{t:'14 min ago',x:'Updated correlation matrix for equity book',i:'Activity'},{t:'30 min ago',x:'Published intraday risk report to CRO',i:'FileText'},{t:'1 hr ago',x:'Validated VaR model backtesting results',i:'CircleCheckBig'}],
   met:[{l:'Portfolio VaR',v:'$42M',ch:'-$3M'},{l:'Backtest Pass',v:'99.2%',ch:'+0.4%'},{l:'Limit Usage',v:'72%',ch:'-5%'},{l:'Stress Loss',v:'$128M',ch:'-$12M'}],
   qa:[{l:'Risk Dashboard',i:'ChartBarBig'},{l:'Stress Test',i:'AlertTriangle'},{l:'Limit Config',i:'Shield'},{l:'Breach Log',i:'FileText'}],
   subs:[{id:'var-calculator',n:'VaR Calculator',i:'Calculator',d:'Historical, parametric, and Monte Carlo VaR computation engine'},{id:'stress-test-designer',n:'Stress Test Designer',i:'AlertTriangle',d:'Custom stress scenario creation and historical replay analysis'},{id:'limit-breach-alerter',n:'Limit Breach Alerter',i:'Zap',d:'Real-time limit monitoring with automated escalation workflows'}]},

  {id:'equity-trader',t:'AI Equity Trader',sub:'Equity Trader – Execution & Alpha Capture',ic:'TrendingUp',c:'#7B1FA2',lv:'Specialist',
   st:[{l:'Trades',v:'8,421',i:'CircleCheckBig',c:'#34C759'},{l:'Win Rate',v:'62.8%',i:'Target',c:'#007AFF'},{l:'Alpha',v:'+3.2%',i:'TrendingUp',c:'#FF9500'},{l:'Slippage',v:'0.8bps',i:'Activity',c:'#AF52DE'}],
   cap:['Equity Execution','Alpha Capture','Market Making','Block Trading','Dark Pool Access','Pairs Trading','Stat Arb','Sector Rotation','IPO Allocation','Short Selling','Dividend Arbitrage','Volatility Trading'],
   resp:['Execute equity trades with optimal fill rates and minimal market impact','Capture alpha through systematic and discretionary strategies','Manage block trading and dark pool access for large orders','Implement pairs trading and statistical arbitrage strategies','Monitor sector rotation signals and adjust positioning','Handle IPO allocation and short selling operations','Optimize execution quality across venues and time horizons','Report trade analytics and execution cost analysis','Coordinate with risk management on position limits'],
   act:[{t:'1 min ago',x:'Filled 50K block trade via dark pool',i:'Zap'},{t:'4 min ago',x:'Triggered pairs trade signal on AAPL/MSFT',i:'TrendingUp'},{t:'10 min ago',x:'Adjusted sector rotation tilt to tech',i:'Activity'},{t:'25 min ago',x:'Completed IPO allocation for new listing',i:'CircleCheckBig'},{t:'1 hr ago',x:'Published execution quality report',i:'FileText'}],
   met:[{l:'Daily PnL',v:'+$2.4M',ch:'+$340K'},{l:'Implementation',v:'0.3bps',ch:'-0.2bps'},{l:'Fill Rate',v:'98.6%',ch:'+0.4%'},{l:'Alpha Gen',v:'+3.2%',ch:'+0.4%'}],
   qa:[{l:'Trade Blotter',i:'ChartBarBig'},{l:'Alpha Signals',i:'Zap'},{l:'Position View',i:'Target'},{l:'Execution Report',i:'FileText'}],
   subs:[{id:'order-executor',n:'Order Executor',i:'Zap',d:'Automated order slicing, routing, and execution management'},{id:'market-depth-analyzer',n:'Market Depth Analyzer',i:'Search',d:'Real-time order book analysis and liquidity mapping'},{id:'execution-quality-reporter',n:'Execution Quality Reporter',i:'FileText',d:'TCA reporting, slippage analysis, and venue performance scoring'}]},

  {id:'forex-trader',t:'AI Forex Trader',sub:'Forex Trader – Currency Markets & Hedging',ic:'Globe',c:'#00897B',lv:'Specialist',
   st:[{l:'Volume',v:'$4.2B',i:'DollarSign',c:'#34C759'},{l:'Pairs',v:'42',i:'Target',c:'#007AFF'},{l:'Carry PnL',v:'+8.4%',i:'TrendingUp',c:'#FF9500'},{l:'Hedged',v:'94%',i:'Shield',c:'#AF52DE'}],
   cap:['FX Spot Trading','Forward Contracts','Currency Hedging','Carry Trade','Cross-border Payments','Swap Execution','NDF Trading','Emerging Market FX','Options Hedging','Yield Curve Analysis','Central Bank Analysis','Geopolitical Assessment'],
   resp:['Execute FX spot, forward, and swap transactions across 42 currency pairs','Implement currency hedging strategies for portfolio protection','Manage carry trade positions and roll yield optimization','Coordinate cross-border payment processing and settlement','Trade non-deliverable forwards for emerging market exposure','Execute options-based hedging for tail risk protection','Analyze central bank policy signals and yield curve dynamics','Monitor geopolitical risks affecting currency markets','Report FX exposure, P&L, and hedge effectiveness metrics'],
   act:[{t:'2 min ago',x:'Hedged EUR/USD exposure for $200M portfolio',i:'Shield'},{t:'6 min ago',x:'Rolled JPY carry trade position forward',i:'DollarSign'},{t:'12 min ago',x:'Processed cross-border CNY payment',i:'Globe'},{t:'25 min ago',x:'Adjusted NDF position on TRY',i:'TrendingUp'},{t:'1 hr ago',x:'Published weekly FX exposure report',i:'FileText'}],
   met:[{l:'FX Volume',v:'$4.2B',ch:'+$600M'},{l:'Hedge Ratio',v:'94%',ch:'+2%'},{l:'Carry Yield',v:'+8.4%',ch:'+0.6%'},{l:'FX Slippage',v:'0.2bps',ch:'-0.1bps'}],
   qa:[{l:'FX Dashboard',i:'ChartBarBig'},{l:'Hedge Manager',i:'Shield'},{l:'CB Calendar',i:'Calendar'},{l:'Payment Queue',i:'DollarSign'}],
   subs:[{id:'currency-pair-analyzer',n:'Currency Pair Analyzer',i:'Globe',d:'Technical and fundamental analysis across FX pairs'},{id:'fx-hedging-coordinator',n:'FX Hedging Coordinator',i:'Shield',d:'Automated hedge ratio management and overlay execution'},{id:'cross-border-payment-optimizer',n:'Cross-border Payment Optimizer',i:'DollarSign',d:'Settlement route optimization and FX conversion management'}]},

  {id:'crypto-trader',t:'AI Crypto Trader',sub:'Crypto Trader – Digital Assets & DeFi',ic:'Bitcoin',c:'#F59E0B',lv:'Specialist',
   st:[{l:'AUM',v:'$340M',i:'DollarSign',c:'#34C759'},{l:'Tokens',v:'128',i:'Target',c:'#007AFF'},{l:'Yield',v:'+14.2%',i:'TrendingUp',c:'#FF9500'},{l:'Secured',v:'100%',i:'ShieldCheck',c:'#AF52DE'}],
   cap:['Spot Trading','DeFi Yield','On-chain Analysis','Liquidity Provision','Wallet Security','NFT Trading','Staking','MEV Protection','Bridge Monitoring','Token Analysis','Gas Optimization','Smart Contract Audit'],
   resp:['Execute spot and derivative trades across 128+ tokens','Manage DeFi yield farming and liquidity provision strategies','Perform on-chain analysis for whale tracking and flow signals','Ensure wallet security through multi-sig and cold storage protocols','Monitor and optimize gas costs for on-chain transactions','Evaluate smart contract risks before capital deployment','Manage staking operations and validator performance','Track cross-chain bridge activity and security alerts','Report crypto portfolio performance, yield, and risk metrics'],
   act:[{t:'1 min ago',x:'Detected large ETH transfer to exchange',i:'Eye'},{t:'5 min ago',x:'Rebalanced DeFi yield farming positions',i:'Activity'},{t:'12 min ago',x:'Completed wallet security audit check',i:'ShieldCheck'},{t:'30 min ago',x:'Optimized gas for batch token transfers',i:'Zap'},{t:'1 hr ago',x:'Published on-chain flow analysis report',i:'FileText'}],
   met:[{l:'Portfolio APY',v:'14.2%',ch:'+1.8%'},{l:'TVL Managed',v:'$89M',ch:'+$12M'},{l:'Security Score',v:'98/100',ch:'+2'},{l:'Gas Saved',v:'$47K',ch:'+$8K'}],
   qa:[{l:'Crypto Dashboard',i:'ChartBarBig'},{l:'On-chain Monitor',i:'Eye'},{l:'Yield Manager',i:'Activity'},{l:'Wallet Security',i:'ShieldCheck'}],
   subs:[{id:'on-chain-analyzer',n:'On-chain Analyzer',i:'Eye',d:'Blockchain transaction monitoring, whale tracking, and flow analysis'},{id:'liquidity-pool-monitor',n:'Liquidity Pool Monitor',i:'Activity',d:'DEX pool tracking, impermanent loss calculation, and TVL monitoring'},{id:'wallet-security-checker',n:'Wallet Security Checker',i:'ShieldCheck',d:'Multi-sig verification, cold storage audit, and vulnerability scanning'}]},

  {id:'derivatives-specialist',t:'AI Derivatives Specialist',sub:'Derivatives – Options, Swaps & Structured Products',ic:'Calculator',c:'#E65100',lv:'Specialist',
   st:[{l:'Notional',v:'$8.4B',i:'DollarSign',c:'#34C759'},{l:'Contracts',v:'2,847',i:'CircleCheckBig',c:'#007AFF'},{l:'Greeks',v:'Real-time',i:'Activity',c:'#FF9500'},{l:'Pricing',v:'0.1ms',i:'Clock',c:'#AF52DE'}],
   cap:['Options Pricing','Greeks Management','Volatility Trading','Swap Execution','Structured Products','Exotic Derivatives','Curve Modeling','Hedging Strategies','Margin Management','Counterparty Risk','Pricing Models','OTC Negotiation'],
   resp:['Price and manage options portfolios using Black-Scholes and local/stochastic vol models','Monitor and manage Greeks exposure across all derivatives positions','Execute volatility surface arbitrage and term structure strategies','Structure and price exotic derivatives and custom OTC products','Manage swap execution and interest rate curve modeling','Implement dynamic hedging strategies for portfolio protection','Monitor margin requirements and collateral management','Assess counterparty risk for OTC derivative positions','Report derivatives P&L, risk, and regulatory metrics'],
   act:[{t:'1 min ago',x:'Re-priced SPX options surface after vol shift',i:'Calculator'},{t:'4 min ago',x:'Rebalanced delta hedge for large options book',i:'Zap'},{t:'10 min ago',x:'Updated volatility surface parameters',i:'TrendingUp'},{t:'22 min ago',x:'Executed interest rate swap for duration mgmt',i:'Activity'},{t:'1 hr ago',x:'Published daily Greeks and margin report',i:'FileText'}],
   met:[{l:'Options Delta',v:'$12M',ch:'-$2M'},{l:'Vega Exposure',v:'$8.4M',ch:'-$1.2M'},{l:'Margin Usage',v:'68%',ch:'-4%'},{l:'Pricing Speed',v:'0.1ms',ch:'-0.02ms'}],
   qa:[{l:'Greeks Dashboard',i:'ChartBarBig'},{l:'Vol Surface',i:'TrendingUp'},{l:'Pricing Engine',i:'Calculator'},{l:'Margin Report',i:'FileText'}],
   subs:[{id:'options-pricer',n:'Options Pricer',i:'Calculator',d:'Real-time options pricing with multiple model support'},{id:'greeks-calculator',n:'Greeks Calculator',i:'BarChart3',d:'Portfolio-level Greeks aggregation and sensitivity analysis'},{id:'volatility-surface-mapper',n:'Volatility Surface Mapper',i:'TrendingUp',d:'Implied vol surface construction, fitting, and arbitrage detection'}]},

  {id:'portfolio-analyst',t:'AI Portfolio Analyst',sub:'Portfolio Analyst – Research & Attribution',ic:'BarChart3',c:'#5C6BC0',lv:'Analyst',
   st:[{l:'Reports',v:'1,247',i:'FileText',c:'#34C759'},{l:'Coverage',v:'340',i:'Target',c:'#007AFF'},{l:'Accuracy',v:'94.2%',i:'CircleCheckBig',c:'#FF9500'},{l:'Alpha',v:'+2.8%',i:'TrendingUp',c:'#AF52DE'}],
   cap:['Sector Analysis','Factor Modeling','Benchmark Comparison','Performance Attribution','Risk Decomposition','Style Analysis','Peer Comparison','Attribution Reporting','Scenario Modeling','Quantitative Research','Regression Analysis','Correlation Study'],
   resp:['Conduct deep sector and industry analysis for portfolio positioning','Build and maintain multi-factor risk models','Perform benchmark comparison and tracking error analysis','Generate performance attribution reports across multiple dimensions','Decompose portfolio risk into systematic and idiosyncratic factors','Analyze investment style drift and factor exposures','Compare portfolio metrics against peer group benchmarks','Produce scenario modeling and what-if analysis for strategy shifts','Support quantitative research initiatives and alpha signal validation'],
   act:[{t:'2 min ago',x:'Completed Q3 sector attribution analysis',i:'BarChart3'},{t:'8 min ago',x:'Updated Fama-French factor model parameters',i:'Activity'},{t:'15 min ago',x:'Published benchmark comparison report',i:'FileText'},{t:'30 min ago',x:'Ran scenario analysis for rate hike impact',i:'Target'},{t:'1 hr ago',x:'Completed style drift analysis for equity book',i:'Search'}],
   met:[{l:'Reports Gen',v:'1,247',ch:'+84'},{l:'Factor R²',v:'0.92',ch:'+0.03'},{l:'Attribution Acc',v:'94.2%',ch:'+1.4%'},{l:'Coverage',v:'340',ch:'+18'}],
   qa:[{l:'Attribution Report',i:'ChartBarBig'},{l:'Factor Model',i:'BarChart3'},{l:'Benchmark Tool',i:'Target'},{l:'Research Notes',i:'FileText'}],
   subs:[{id:'sector-analyzer',n:'Sector Analyzer',i:'Search',d:'Sector rotation signals, relative strength, and industry analysis'},{id:'factor-modeler',n:'Factor Modeler',i:'BarChart3',d:'Multi-factor model construction, calibration, and validation'},{id:'benchmark-comparator',n:'Benchmark Comparator',i:'Scale',d:'Benchmark selection, tracking error analysis, and peer comparison'}]},

  {id:'risk-analyst-trading',t:'AI Trading Risk Analyst',sub:'Risk Analyst – Scenario & Correlation Analysis',ic:'AlertTriangle',c:'#D32F2F',lv:'Analyst',
   st:[{l:'Scenarios',v:'2,400',i:'Target',c:'#34C759'},{l:'Correlations',v:'Real-time',i:'Activity',c:'#007AFF'},{l:'Tail Events',v:'12',i:'AlertTriangle',c:'#FF9500'},{l:'Coverage',v:'100%',i:'Shield',c:'#AF52DE'}],
   cap:['Scenario Modeling','Correlation Tracking','Tail Risk Assessment','Historical Simulation','Monte Carlo','Regime Detection','Stress Scenarios','Concentration Risk','Drawdown Analysis','Volatility Clustering','Copula Modeling','Extreme Value Theory'],
   resp:['Build and run scenario analysis models for portfolio stress testing','Track correlation shifts and detect regime changes in real-time','Assess tail risk using extreme value theory and copula models','Generate historical simulation and Monte Carlo risk projections','Detect volatility clustering and mean-reversion patterns','Monitor concentration risk and cross-asset dependencies','Design custom stress scenarios for emerging risk factors','Analyze drawdown patterns and recovery time distributions','Produce risk analytics reports for trading risk committee'],
   act:[{t:'2 min ago',x:'Detected correlation regime shift in credit',i:'Activity'},{t:'6 min ago',x:'Ran 10K Monte Carlo paths for tail risk',i:'Target'},{t:'14 min ago',x:'Flagged tail risk increase in EM exposure',i:'AlertTriangle'},{t:'28 min ago',x:'Updated copula model parameters',i:'Zap'},{t:'1 hr ago',x:'Published weekly scenario analysis report',i:'FileText'}],
   met:[{l:'Scenarios Run',v:'2,400',ch:'+180'},{l:'Regime Shifts',v:'3',ch:'+1'},{l:'Tail VaR',v:'$68M',ch:'+$4M'},{l:'Model Accuracy',v:'96.4%',ch:'+0.8%'}],
   qa:[{l:'Scenario Engine',i:'Target'},{l:'Correlation Map',i:'Activity'},{l:'Tail Risk',i:'AlertTriangle'},{l:'Model Config',i:'Zap'}],
   subs:[{id:'scenario-modeler',n:'Scenario Modeler',i:'Layers',d:'Custom scenario creation with macro and micro variable inputs'},{id:'correlation-tracker',n:'Correlation Tracker',i:'Activity',d:'Real-time correlation monitoring and regime shift detection'},{id:'tail-risk-assessor',n:'Tail Risk Assessor',i:'AlertTriangle',d:'Extreme value analysis and conditional tail expectation calculation'}]},

  {id:'compliance-trading',t:'AI Trading Compliance',sub:'Compliance – Surveillance & Regulatory Reporting',ic:'ShieldCheck',c:'#455A64',lv:'Analyst',
   st:[{l:'Alerts',v:'847',i:'Eye',c:'#34C759'},{l:'Reports',v:'312',i:'FileText',c:'#007AFF'},{l:'Violations',v:'0',i:'Shield',c:'#FF9500'},{l:'Coverage',v:'100%',i:'ShieldCheck',c:'#AF52DE'}],
   cap:['Trade Surveillance','Market Abuse Detection','Regulatory Reporting','Restricted List Mgmt','Best Execution','MiFID II','Dodd-Frank','KYC/AML','Transaction Reporting','Comms Monitoring','Insider Detection','Audit Trail'],
   resp:['Monitor all trading activity for market abuse and insider dealing patterns','Generate regulatory reports for MiFID II, Dodd-Frank, and local regulators','Manage restricted and watch lists for pre-trade compliance screening','Ensure best execution compliance and transaction cost analysis reporting','Conduct communications monitoring for potential misconduct','Process KYC/AML checks for counterparty and client onboarding','Maintain complete audit trails for all trade-related activities','Coordinate with legal and risk on enforcement actions','Produce compliance dashboards and regulatory status reports'],
   act:[{t:'1 min ago',x:'Flagged unusual options activity pattern',i:'Eye'},{t:'5 min ago',x:'Generated MiFID II transaction report',i:'FileText'},{t:'12 min ago',x:'Updated restricted list with new additions',i:'Shield'},{t:'25 min ago',x:'Cleared best execution compliance check',i:'ShieldCheck'},{t:'1 hr ago',x:'Published daily compliance dashboard',i:'ChartBarBig'}],
   met:[{l:'Alerts Processed',v:'847',ch:'+42'},{l:'False Positive',v:'2.1%',ch:'-0.4%'},{l:'Report On-time',v:'100%',ch:'0%'},{l:'Violations',v:'0',ch:'0'}],
   qa:[{l:'Surveillance',i:'Eye'},{l:'Reg Reports',i:'FileText'},{l:'Restricted List',i:'Shield'},{l:'Audit Trail',i:'ChartBarBig'}],
   subs:[{id:'trade-surveillance-agent',n:'Trade Surveillance Agent',i:'Eye',d:'Real-time trade pattern monitoring and market abuse detection'},{id:'regulatory-reporter',n:'Regulatory Reporter',i:'FileText',d:'Automated regulatory report generation and submission management'},{id:'restricted-list-monitor',n:'Restricted List Monitor',i:'Shield',d:'Pre-trade compliance screening and restricted list enforcement'}]},

  {id:'quant-analyst',t:'AI Quantitative Analyst',sub:'Quant Analyst – Alpha Research & Signal Generation',ic:'Microscope',c:'#6A1B9A',lv:'Specialist',
   st:[{l:'Signals',v:'847',i:'Zap',c:'#34C759'},{l:'Backtests',v:'12,400',i:'History',c:'#007AFF'},{l:'Sharpe',v:'2.14',i:'TrendingUp',c:'#FF9500'},{l:'Alpha',v:'+4.6%',i:'Target',c:'#AF52DE'}],
   cap:['Alpha Research','Backtesting','Signal Generation','Factor Investing','Machine Learning','Statistical Modeling','Time Series Analysis','Portfolio Optimization','Risk Premia','Alternative Data','NLP Processing','Deep Learning'],
   resp:['Research and develop new alpha signals and trading strategies','Build and maintain backtesting infrastructure and frameworks','Generate trading signals from quantitative models and alternative data','Implement factor investing strategies and risk premia harvesting','Apply machine learning techniques to financial prediction problems','Conduct statistical modeling and time series analysis','Optimize portfolio construction using advanced optimization techniques','Process alternative data sources including satellite, sentiment, and web data','Validate model performance with out-of-sample and walk-forward testing'],
   act:[{t:'1 min ago',x:'Generated new momentum signal with 2.4 Sharpe',i:'Zap'},{t:'5 min ago',x:'Completed 50K path backtest on new strategy',i:'History'},{t:'12 min ago',x:'Updated ML model with latest alt-data features',i:'Microscope'},{t:'28 min ago',x:'Validated factor model out-of-sample performance',i:'Target'},{t:'1 hr ago',x:'Published weekly alpha research digest',i:'FileText'}],
   met:[{l:'Active Signals',v:'847',ch:'+32'},{l:'Avg Signal Sharpe',v:'1.82',ch:'+0.14'},{l:'Backtest Speed',v:'12ms',ch:'-2ms'},{l:'Alpha Decay',v:'0.3%/day',ch:'-0.1%'}],
   qa:[{l:'Signal Dashboard',i:'Zap'},{l:'Backtest Engine',i:'History'},{l:'ML Lab',i:'Microscope'},{l:'Research Notes',i:'FileText'}],
   subs:[{id:'alpha-researcher',n:'Alpha Researcher',i:'Search',d:'Systematic alpha signal discovery and hypothesis testing'},{id:'backtest-engine',n:'Backtest Engine',i:'History',d:'High-speed backtesting with transaction cost and slippage modeling'},{id:'signal-generator',n:'Signal Generator',i:'Zap',d:'Real-time signal production, scoring, and portfolio construction'}]},

  {id:'esg-analyst',t:'AI ESG Analyst',sub:'ESG Analyst – Sustainability & Impact Assessment',ic:'Leaf',c:'#2E7D32',lv:'Analyst',
   st:[{l:'Scores',v:'4,200',i:'Star',c:'#34C759'},{l:'Reports',v:'847',i:'FileText',c:'#007AFF'},{l:'Coverage',v:'92%',i:'Target',c:'#FF9500'},{l:'Impact',v:'A+',i:'TrendingUp',c:'#AF52DE'}],
   cap:['ESG Scoring','Sustainability Reporting','Impact Assessment','Carbon Footprint','Climate Risk','Social Metrics','Governance Analysis','Regulatory Compliance','SFDR Classification','EU Taxonomy','TCFD Reporting','Green Bond Verification'],
   resp:['Calculate and maintain ESG scores for portfolio holdings and new investments','Produce sustainability reports aligned with TCFD, GRI, and SASB frameworks','Assess environmental and social impact of investment decisions','Monitor carbon footprint and set decarbonization trajectory targets','Evaluate climate risk using scenario analysis and physical/transition risk models','Analyze governance structures and board effectiveness metrics','Ensure SFDR classification and EU Taxonomy alignment','Verify green bond frameworks and use-of-proceeds compliance','Report ESG performance, controversies, and engagement outcomes'],
   act:[{t:'2 min ago',x:'Updated ESG score for 42 portfolio holdings',i:'Star'},{t:'6 min ago',x:'Flagged controversy alert on mining sector',i:'AlertTriangle'},{t:'14 min ago',x:'Completed TCFD scenario analysis',i:'FileText'},{t:'30 min ago',x:'Verified green bond use-of-proceeds',i:'ShieldCheck'},{t:'1 hr ago',x:'Published monthly ESG compliance dashboard',i:'ChartBarBig'}],
   met:[{l:'Avg ESG Score',v:'78.4',ch:'+2.1'},{l:'Carbon Intensity',v:'142',ch:'-18'},{l:'SFDR Art.8+',v:'84%',ch:'+6%'},{l:'Controversies',v:'3',ch:'-2'}],
   qa:[{l:'ESG Dashboard',i:'ChartBarBig'},{l:'Impact Report',i:'FileText'},{l:'Carbon Tracker',i:'Leaf'},{l:'Compliance',i:'ShieldCheck'}],
   subs:[{id:'esg-data-collector',n:'ESG Data Collector',i:'Database',d:'Multi-source ESG data aggregation, normalization, and quality scoring'},{id:'sustainability-scorer',n:'Sustainability Scorer',i:'Star',d:'Composite ESG scoring engine with custom weighting frameworks'},{id:'impact-reporter',n:'Impact Reporter',i:'FileText',d:'TCFD, SFDR, and EU Taxonomy aligned reporting automation'}]},

  {id:'macro-analyst',t:'AI Macro Analyst',sub:'Macro Analyst – Economics & Geopolitical Risk',ic:'Globe',c:'#00838F',lv:'Analyst',
   st:[{l:'Indicators',v:'847',i:'BarChart3',c:'#34C759'},{l:'Countries',v:'42',i:'Globe',c:'#007AFF'},{l:'Forecasts',v:'94.2%',i:'Target',c:'#FF9500'},{l:'Alerts',v:'12',i:'AlertTriangle',c:'#AF52DE'}],
   cap:['Economic Indicators','Central Bank Analysis','Geopolitical Risk','Yield Curve Analysis','Inflation Forecasting','Currency Analysis','Trade Flow Analysis','Fiscal Policy','Commodity Markets','Sovereign Risk','Emerging Markets','Recession Indicators'],
   resp:['Track and analyze 847+ economic indicators across 42 countries','Monitor central bank communications and policy shift signals','Assess geopolitical risks and their impact on financial markets','Analyze yield curve dynamics and recession probability models','Forecast inflation trends using Phillips curve and nowcasting models','Evaluate currency fair value and purchasing power parity deviations','Analyze trade flow data and supply chain disruption impacts','Assess sovereign risk and fiscal sustainability metrics','Produce macro research reports and investment committee briefings'],
   act:[{t:'2 min ago',x:'Updated US CPI nowcast to 3.2%',i:'BarChart3'},{t:'6 min ago',x:'Detected ECB policy shift signal in speech',i:'Landmark'},{t:'14 min ago',x:'Raised geopolitical risk score for MENA region',i:'Globe'},{t:'28 min ago',x:'Updated yield curve recession probability',i:'TrendingUp'},{t:'1 hr ago',x:'Published weekly macro research briefing',i:'FileText'}],
   met:[{l:'Forecast Acc',v:'94.2%',ch:'+1.4%'},{l:'Signal Lead',v:'3.2 days',ch:'+0.4d'},{l:'Geo Risk Index',v:'62',ch:'+8'},{l:'Recession Prob',v:'18%',ch:'+3%'}],
   qa:[{l:'Macro Dashboard',i:'ChartBarBig'},{l:'CB Watcher',i:'Landmark'},{l:'Geo Risk Map',i:'Globe'},{l:'Research Notes',i:'FileText'}],
   subs:[{id:'economic-indicator-tracker',n:'Economic Indicator Tracker',i:'BarChart3',d:'Real-time economic data tracking, nowcasting, and surprise index'},{id:'central-bank-watcher',n:'Central Bank Watcher',i:'Landmark',d:'Policy communication parsing, forward guidance tracking, and rate path modeling'},{id:'geopolitical-risk-assessor',n:'Geopolitical Risk Assessor',i:'Globe',d:'Geopolitical event monitoring, risk scoring, and scenario impact analysis'}]},

  {id:'algo-trading-dev',t:'AI Algo Trading Developer',sub:'Algo Developer – Strategy Code & Infrastructure',ic:'Code',c:'#4527A0',lv:'Developer',
   st:[{l:'Strategies',v:'128',i:'Code',c:'#34C759'},{l:'Latency',v:'0.3ms',i:'Clock',c:'#007AFF'},{l:'Tests',v:'24,000',i:'TestTube',c:'#FF9500'},{l:'Deploy',v:'99.9%',i:'Rocket',c:'#AF52DE'}],
   cap:['Strategy Coding','Latency Optimization','Execution Algorithms','Backtesting Framework','ML Pipeline','Data Pipeline','Risk Controls','Performance Testing','CI/CD','Monitoring','API Development','Cloud Infrastructure'],
   resp:['Develop and maintain algorithmic trading strategies in Python and C++','Optimize execution latency from signal to order submission','Build and maintain execution algorithm libraries (VWAP, TWAP, POV)','Design and operate backtesting frameworks with realistic market simulation','Implement ML pipelines for signal generation and model inference','Construct data pipelines for real-time and historical market data','Embed risk controls and kill switches in all trading algorithms','Conduct performance testing and regression analysis on deployments','Manage CI/CD pipelines for strategy deployment and rollback'],
   act:[{t:'1 min ago',x:'Deployed v3.2 of momentum strategy to prod',i:'Rocket'},{t:'4 min ago',x:'Reduced signal-to-order latency by 0.1ms',i:'Zap'},{t:'10 min ago',x:'Completed regression test suite (24K tests)',i:'TestTube'},{t:'22 min ago',x:'Updated ML feature pipeline with alt-data',i:'Code'},{t:'1 hr ago',x:'Published deployment report and changelog',i:'FileText'}],
   met:[{l:'Strategy Count',v:'128',ch:'+8'},{l:'Avg Latency',v:'0.3ms',ch:'-0.05ms'},{l:'Test Coverage',v:'98.4%',ch:'+0.6%'},{l:'Deploy Success',v:'99.9%',ch:'+0.1%'}],
   qa:[{l:'Strategy Lab',i:'Code'},{l:'Latency Monitor',i:'Zap'},{l:'Test Suite',i:'TestTube'},{l:'Deploy Queue',i:'Rocket'}],
   subs:[{id:'strategy-coder',n:'Strategy Coder',i:'Code',d:'Strategy development environment with template generation and validation'},{id:'latency-optimizer',n:'Latency Optimizer',i:'Zap',d:'End-to-end latency profiling, bottleneck detection, and optimization'},{id:'execution-algorithm-tester',n:'Execution Algorithm Tester',i:'TestTube',d:'Algorithm validation, regression testing, and performance benchmarking'}]},

  {id:'settlement-specialist',t:'AI Settlement Specialist',sub:'Settlement – Trade Reconciliation & Clearing',ic:'ClipboardCheck',c:'#78909C',lv:'Specialist',
   st:[{l:'Settlements',v:'18,400',i:'CircleCheckBig',c:'#34C759'},{l:'STP Rate',v:'98.6%',i:'Activity',c:'#007AFF'},{l:'Fails',v:'0.4%',i:'AlertTriangle',c:'#FF9500'},{l:'T+1 Compliant',v:'100%',i:'Shield',c:'#AF52DE'}],
   cap:['Trade Reconciliation','Clearing Coordination','Fail Management','Settlement Optimization','T+1 Processing','Corporate Actions','Margin Settlement','Collateral Management','CCP Interface','Custodian Coordination','Cash Management','Exception Handling'],
   resp:['Reconcile trade records across front-office, back-office, and custodian systems','Coordinate clearing and settlement with CCPs and clearing members','Manage settlement fails and exception resolution workflows','Optimize settlement processing for T+1 compliance','Process corporate actions including dividends, splits, and mergers','Manage margin settlement and collateral movements','Interface with central counterparties for trade registration','Coordinate with custodians for asset and cash movements','Produce settlement status reports and exception dashboards'],
   act:[{t:'1 min ago',x:'Reconciled 4,200 equity trades for T+1',i:'ClipboardCheck'},{t:'5 min ago',x:'Resolved 3 settlement fails from yesterday',i:'AlertTriangle'},{t:'12 min ago',x:'Processed corporate action for AAPL dividend',i:'DollarSign'},{t:'28 min ago',x:'Coordinated margin call settlement with CCP',i:'Shield'},{t:'1 hr ago',x:'Published daily settlement status report',i:'FileText'}],
   met:[{l:'STP Rate',v:'98.6%',ch:'+0.3%'},{l:'Settlement Rate',v:'99.6%',ch:'+0.1%'},{l:'Avg Settlement',v:'T+0.8',ch:'-0.1'},{l:'Fails Resolved',v:'100%',ch:'0%'}],
   qa:[{l:'Reconciliation',i:'ClipboardCheck'},{l:'Fail Queue',i:'AlertTriangle'},{l:'Clearing Status',i:'ArrowRightLeft'},{l:'Settlement Log',i:'FileText'}],
   subs:[{id:'trade-reconciler',n:'Trade Reconciler',i:'ClipboardCheck',d:'Multi-system trade matching and break resolution automation'},{id:'clearing-coordinator',n:'Clearing Coordinator',i:'ArrowRightLeft',d:'CCP registration, clearing member coordination, and margin management'},{id:'fail-manager',n:'Fail Manager',i:'AlertTriangle',d:'Settlement fail detection, escalation, and resolution workflow management'}]},
];

// ─── Template ─────────────────────────────────────────────────────────────────
function genParent(a) {
  const allIcons = new Set([a.ic, 'Activity', 'Star', 'CircleCheckBig', 'Clock', 'Target', 'ArrowRight', 'Zap', 'Users', 'MessageSquare', 'Calendar', 'ChartBarBig', 'TrendingUp', 'AlertTriangle', 'FileText', 'ChevronRight', 'Shield']);
  a.st.forEach(s => allIcons.add(s.i));
  a.act.forEach(x => allIcons.add(x.i));
  a.qa.forEach(q => allIcons.add(q.i));
  a.subs.forEach(s => allIcons.add(s.i));
  const iconList = [...allIcons].join(', ');

  const subsJSX = a.subs.map(s => `        <TouchableOpacity
          key="${s.id}"
          onPress={() => router.push('/ai-agent/trading/sub-agents/${s.id}')}
          style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
        >
          <View style={[styles.agentIcon, { backgroundColor: '${a.c}20' }]}>
            <${s.i} size={28} color="${a.c}" />
          </View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>{s.n}</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{s.d}</Text>
          </View>
          <ChevronRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>`).join('\n');

  const metJSX = a.met.map(m => `          <View key="${m.l}" style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.v}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.l}</Text>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>${m.ch}</Text>
              </View>
            </View>`).join('\n');

  return `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { ${iconList} } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = ${JSON.stringify(a.subs.map(s => ({id:s.id,name:s.n,icon:s.i,desc:s.d})), null, 2)};

const QUICK_ACTIONS = ${JSON.stringify(a.qa.map(q => ({label:q.l,icon:q.i})), null, 2)};

const METRICS = ${JSON.stringify(a.met.map(m => ({label:m.l,value:m.v,change:m.ch,trend:'up'})), null, 2)};

export default function ${a.id.replace(/-([a-z])/g, (_,c) => c.toUpperCase()).replace(/^./,c=>c.toUpperCase())}Page() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = ${JSON.stringify(a.st, null, 4).replace(/"i":/g, 'icon:').replace(/"c":/g, 'color:').replace(/"l":/g, 'label:').replace(/"v":/g, 'value:').replace(/"/g, "'")};

  const capabilities = ${JSON.stringify(a.cap)};

  const responsibilities = ${JSON.stringify(a.resp)};

  const activities = ${JSON.stringify(a.act.map(x => ({time:x.t,text:x.x,icon:x.i})), null, 4).replace(/"icon":/g, 'icon:').replace(/"time":/g, 'time:').replace(/"text":/g, 'text:').replace(/"/g, "'")};

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '${a.c}20' }]}>
          <${a.ic} size={48} color="${a.c}" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>{a.t}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>{a.sub}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '${a.c}22' }]}>
            <Star size={12} color="${a.c}" />
            <Text style={[styles.badgeText, { color: '${a.c}' }]}>${a.lv}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Users size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}>
            <Shield size={12} color="#AF52DE" />
            <Text style={[styles.badgeText, { color: '#AF52DE' }]}>Trading Dept</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {stats.map((stat, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Overview */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The ${a.t} provides enterprise-level capabilities within the Trading & Investments department, driving operational excellence and strategic decision-making across all assigned domains. This agent orchestrates sub-agents for specialized execution and reporting.
        </Text>
      </View>

      {/* Capabilities */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, i) => (
            <View key={i} style={[styles.tag, { backgroundColor: '${a.c}18' }]}>
              <Text style={[styles.tagText, { color: '${a.c}' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Key Responsibilities */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, i) => (
          <View key={i} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="${a.c}" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Sub-Agents Hierarchy */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents Hierarchy</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary, marginBottom: 12 }]}>
          Direct reports and specialized sub-agents that execute functions under ${a.t.split(' ').slice(-2).join(' ')} direction.
        </Text>
${subsJSX}
      </View>

      {/* Performance Metrics */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Metrics</Text>
        <View style={styles.metricsGrid}>
${metJSX}
        </View>
      </View>

      {/* Recent Activity */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, i) => (
          <View key={i} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '${a.c}15' }]}>
              <act.icon size={14} color="${a.c}" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action, i) => (
            <TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '${a.c}12' }]}>
              <action.icon size={24} color="${a.c}" />
              <Text style={[styles.actionText, { color: '${a.c}' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="${a.id}" agentName="${a.t}" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
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
  agentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12 },
  agentIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  agentInfo: { flex: 1, marginLeft: 12 },
  agentName: { fontSize: 16, fontWeight: '600' },
  agentDesc: { fontSize: 12, marginTop: 2 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricCard: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  metricValue: { fontSize: 20, fontWeight: 'bold' },
  metricLabel: { fontSize: 12, marginTop: 4 },
  metricTrend: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});
`;
}

// ─── Run ──────────────────────────────────────────────────────────────────────
let count = 0;
A.forEach(a => {
  const fp = path.join(BASE, a.id + '.tsx');
  fs.writeFileSync(fp, genParent(a));
  count++;
});
console.log(`Generated ${count} parent pages`);
