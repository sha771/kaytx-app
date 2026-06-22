import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-chief-investment-officer', uid: 'ktx-14-chief-investment-officer', title: 'AI Chief Investment Officer', route: '/ai-agent/trading/chief-investment-officer', color: '#10B981', level: 'c_level', efficiency: '84%' },
  { id: 'ai-vp-trading', uid: 'ktx-14-vp-trading', title: 'AI VP Trading', route: '/ai-agent/trading/vp-trading', color: '#10B981', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-investments', uid: 'ktx-14-vp-investments', title: 'AI VP Investments', route: '/ai-agent/trading/vp-investments', color: '#10B981', level: 'vp_director', efficiency: '94%' },
  { id: 'ai-vp-algorithmic-trading', uid: 'ktx-14-vp-algorithmic-trading', title: 'AI VP Algorithmic Trading', route: '/ai-agent/trading/vp-algorithmic-trading', color: '#10B981', level: 'vp_director', efficiency: '88%' },
  { id: 'ai-vp-quant-strategies', uid: 'ktx-14-vp-quant-strategies', title: 'AI VP Quant Strategies', route: '/ai-agent/trading/vp-quant-strategies', color: '#10B981', level: 'vp_director', efficiency: '87%' },
  { id: 'ai-vp-risk-management-trading', uid: 'ktx-14-vp-risk-management-trading', title: 'AI VP Risk Management (Trading)', route: '/ai-agent/trading/vp-risk-management-trading', color: '#10B981', level: 'vp_director', efficiency: '85%' },
  { id: 'ai-vp-settlements', uid: 'ktx-14-vp-settlements', title: 'AI VP Settlements', route: '/ai-agent/trading/vp-settlements', color: '#10B981', level: 'vp_director', efficiency: '84%' },
  { id: 'ai-vp-clearing', uid: 'ktx-14-vp-clearing', title: 'AI VP Clearing', route: '/ai-agent/trading/vp-clearing', color: '#10B981', level: 'vp_director', efficiency: '83%' },
  { id: 'ai-trading-desk-manager', uid: 'ktx-14-trading-desk-manager', title: 'AI Trading Desk Manager', route: '/ai-agent/trading/trading-desk-manager', color: '#10B981', level: 'manager', efficiency: '76%' },
  { id: 'ai-portfolio-manager', uid: 'ktx-14-portfolio-manager', title: 'AI Portfolio Manager', route: '/ai-agent/trading/portfolio-manager', color: '#10B981', level: 'manager', efficiency: '75%' },
  { id: 'ai-trading-risk-manager', uid: 'ktx-14-trading-risk-manager', title: 'AI Trading Risk Manager', route: '/ai-agent/trading/trading-risk-manager', color: '#10B981', level: 'manager', efficiency: '76%' },
  { id: 'ai-algo-trading-manager', uid: 'ktx-14-algo-trading-manager', title: 'AI Algo Trading Manager', route: '/ai-agent/trading/algo-trading-manager', color: '#10B981', level: 'manager', efficiency: '85%' },
  { id: 'ai-quant-manager', uid: 'ktx-14-quant-manager', title: 'AI Quant Manager', route: '/ai-agent/trading/quant-manager', color: '#10B981', level: 'manager', efficiency: '84%' },
  { id: 'ai-settlements-manager', uid: 'ktx-14-settlements-manager', title: 'AI Settlements Manager', route: '/ai-agent/trading/settlements-manager', color: '#10B981', level: 'manager', efficiency: '82%' },
  { id: 'ai-equity-trader', uid: 'ktx-14-equity-trader', title: 'AI Equity Trader', route: '/ai-agent/trading/equity-trader', color: '#10B981', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-forex-trader', uid: 'ktx-14-forex-trader', title: 'AI Forex Trader', route: '/ai-agent/trading/forex-trader', color: '#10B981', level: 'team_lead', efficiency: '80%' },
  { id: 'ai-crypto-trader', uid: 'ktx-14-crypto-trader', title: 'AI Crypto Trader', route: '/ai-agent/trading/crypto-trader', color: '#10B981', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-derivatives-specialist', uid: 'ktx-14-derivatives-specialist', title: 'AI Derivatives Specialist', route: '/ai-agent/trading/derivatives-specialist', color: '#10B981', level: 'team_lead', efficiency: '90%' },
  { id: 'ai-options-trader', uid: 'ktx-14-options-trader', title: 'AI Options Trader', route: '/ai-agent/trading/options-trader', color: '#10B981', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-futures-trader', uid: 'ktx-14-futures-trader', title: 'AI Futures Trader', route: '/ai-agent/trading/futures-trader', color: '#10B981', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-commodities-trader', uid: 'ktx-14-commodities-trader', title: 'AI Commodities Trader', route: '/ai-agent/trading/commodities-trader', color: '#10B981', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-bond-trader', uid: 'ktx-14-bond-trader', title: 'AI Bond Trader', route: '/ai-agent/trading/bond-trader', color: '#10B981', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-treasury-trader', uid: 'ktx-14-treasury-trader', title: 'AI Treasury Trader', route: '/ai-agent/trading/treasury-trader', color: '#10B981', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-high-frequency-trader', uid: 'ktx-14-high-frequency-trader', title: 'AI High Frequency Trader', route: '/ai-agent/trading/high-frequency-trader', color: '#10B981', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-day-trader', uid: 'ktx-14-day-trader', title: 'AI Day Trader', route: '/ai-agent/trading/day-trader', color: '#10B981', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-swing-trader', uid: 'ktx-14-swing-trader', title: 'AI Swing Trader', route: '/ai-agent/trading/swing-trader', color: '#10B981', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-portfolio-analyst', uid: 'ktx-14-portfolio-analyst', title: 'AI Portfolio Analyst', route: '/ai-agent/trading/portfolio-analyst', color: '#10B981', level: 'team_lead', efficiency: '75%' },
  { id: 'ai-trading-risk-analyst', uid: 'ktx-14-trading-risk-analyst', title: 'AI Trading Risk Analyst', route: '/ai-agent/trading/trading-risk-analyst', color: '#10B981', level: 'team_lead', efficiency: '76%' },
  { id: 'ai-trading-compliance', uid: 'ktx-14-trading-compliance', title: 'AI Trading Compliance', route: '/ai-agent/trading/trading-compliance', color: '#10B981', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-quantitative-analyst', uid: 'ktx-14-quantitative-analyst', title: 'AI Quantitative Analyst', route: '/ai-agent/trading/quantitative-analyst', color: '#10B981', level: 'team_lead', efficiency: '76%' },
  { id: 'ai-quant-developer', uid: 'ktx-14-quant-developer', title: 'AI Quant Developer', route: '/ai-agent/trading/quant-developer', color: '#10B981', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-data-scientist-trading', uid: 'ktx-14-data-scientist-trading', title: 'AI Data Scientist (Trading)', route: '/ai-agent/trading/data-scientist-trading', color: '#10B981', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-esg-analyst', uid: 'ktx-14-esg-analyst', title: 'AI ESG Analyst', route: '/ai-agent/trading/esg-analyst', color: '#10B981', level: 'team_lead', efficiency: '93%' },
  { id: 'ai-macro-analyst', uid: 'ktx-14-macro-analyst', title: 'AI Macro Analyst', route: '/ai-agent/trading/macro-analyst', color: '#10B981', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-technical-analyst', uid: 'ktx-14-technical-analyst', title: 'AI Technical Analyst', route: '/ai-agent/trading/technical-analyst', color: '#10B981', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-fundamental-analyst', uid: 'ktx-14-fundamental-analyst', title: 'AI Fundamental Analyst', route: '/ai-agent/trading/fundamental-analyst', color: '#10B981', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-algo-trading-developer', uid: 'ktx-14-algo-trading-developer', title: 'AI Algo Trading Developer', route: '/ai-agent/trading/algo-trading-developer', color: '#10B981', level: 'team_lead', efficiency: '90%' },
  { id: 'ai-algo-strategist', uid: 'ktx-14-algo-strategist', title: 'AI Algo Strategist', route: '/ai-agent/trading/algo-strategist', color: '#10B981', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-back-tester', uid: 'ktx-14-back-tester', title: 'AI Back Tester', route: '/ai-agent/trading/back-tester', color: '#10B981', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-settlement-specialist', uid: 'ktx-14-settlement-specialist', title: 'AI Settlement Specialist', route: '/ai-agent/trading/settlement-specialist', color: '#10B981', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-clearing-specialist', uid: 'ktx-14-clearing-specialist', title: 'AI Clearing Specialist', route: '/ai-agent/trading/clearing-specialist', color: '#10B981', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-trade-confirmation-specialist', uid: 'ktx-14-trade-confirmation-specialist', title: 'AI Trade Confirmation Specialist', route: '/ai-agent/trading/trade-confirmation-specialist', color: '#10B981', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-trade-surveillance', uid: 'ktx-14-trade-surveillance', title: 'AI Trade Surveillance', route: '/ai-agent/trading/trade-surveillance', color: '#10B981', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-market-surveillance', uid: 'ktx-14-market-surveillance', title: 'AI Market Surveillance', route: '/ai-agent/trading/market-surveillance', color: '#10B981', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-trade-execution-specialist', uid: 'ktx-14-trade-execution-specialist', title: 'AI Trade Execution Specialist', route: '/ai-agent/trading/trade-execution-specialist', color: '#10B981', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-order-management-specialist', uid: 'ktx-14-order-management-specialist', title: 'AI Order Management Specialist', route: '/ai-agent/trading/order-management-specialist', color: '#10B981', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-exchange-connectivity-specialist', uid: 'ktx-14-exchange-connectivity-specialist', title: 'AI Exchange Connectivity Specialist', route: '/ai-agent/trading/exchange-connectivity-specialist', color: '#10B981', level: 'team_lead', efficiency: '82%' },
  { id: 'api-trading-platform-specialist', uid: 'ktx-14-trading-platform-specialist', title: 'AI Trading Platform Specialist', route: '/ai-agent/trading/trading-platform-specialist', color: '#10B981', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-feed-handler-specialist', uid: 'ktx-14-feed-handler-specialist', title: 'AI Feed Handler Specialist', route: '/ai-agent/trading/feed-handler-specialist', color: '#10B981', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-latency-optimization-specialist', uid: 'ktx-14-latency-optimization-specialist', title: 'AI Latency Optimization Specialist', route: '/ai-agent/trading/latency-optimization-specialist', color: '#10B981', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-market-maker', uid: 'ktx-14-market-maker', title: 'AI Market Maker', route: '/ai-agent/trading/market-maker', color: '#10B981', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-proprietary-trader', uid: 'ktx-14-proprietary-trader', title: 'AI Proprietary Trader', route: '/ai-agent/trading/proprietary-trader', color: '#10B981', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-arbitrage-trader', uid: 'ktx-14-arbitrage-trader', title: 'AI Arbitrage Trader', route: '/ai-agent/trading/arbitrage-trader', color: '#10B981', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-risk-quant', uid: 'ktx-14-risk-quant', title: 'AI Risk Quant', route: '/ai-agent/trading/risk-quant', color: '#10B981', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-volatility-specialist', uid: 'ktx-14-volatility-specialist', title: 'AI Volatility Specialist', route: '/ai-agent/trading/volatility-specialist', color: '#10B981', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-correlation-specialist', uid: 'ktx-14-correlation-specialist', title: 'AI Correlation Specialist', route: '/ai-agent/trading/correlation-specialist', color: '#10B981', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-scenario-analyst', uid: 'ktx-14-scenario-analyst', title: 'AI Scenario Analyst', route: '/ai-agent/trading/scenario-analyst', color: '#10B981', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-stress-test-analyst', uid: 'ktx-14-stress-test-analyst', title: 'AI Stress Test Analyst', route: '/ai-agent/trading/stress-test-analyst', color: '#10B981', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-portfolio-construction-specialist', uid: 'ktx-14-portfolio-construction-specialist', title: 'AI Portfolio Construction Specialist', route: '/ai-agent/trading/portfolio-construction-specialist', color: '#10B981', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-asset-allocation-specialist', uid: 'ktx-14-asset-allocation-specialist', title: 'AI Asset Allocation Specialist', route: '/ai-agent/trading/asset-allocation-specialist', color: '#10B981', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-performance-attribution-specialist', uid: 'ktx-14-performance-attribution-specialist', title: 'AI Performance Attribution Specialist', route: '/ai-agent/trading/performance-attribution-specialist', color: '#10B981', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-trade-reporting-specialist', uid: 'ktx-14-trade-reporting-specialist', title: 'AI Trade Reporting Specialist', route: '/ai-agent/trading/trade-reporting-specialist', color: '#10B981', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-regulatory-reporting-trading', uid: 'ktx-14-regulatory-reporting-trading', title: 'AI Regulatory Reporting (Trading)', route: '/ai-agent/trading/regulatory-reporting-trading', color: '#10B981', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-trade-finance-specialist', uid: 'ktx-14-trade-finance-specialist', title: 'AI Trade Finance Specialist', route: '/ai-agent/trading/trade-finance-specialist', color: '#10B981', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-custody-specialist', uid: 'ktx-14-custody-specialist', title: 'AI Custody Specialist', route: '/ai-agent/trading/custody-specialist', color: '#10B981', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-collateral-management', uid: 'ktx-14-collateral-management', title: 'AI Collateral Management', route: '/ai-agent/trading/collateral-management', color: '#10B981', level: 'team_lead', efficiency: '82%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Trading & Investments - AI Agents</Text>
      <Text style={s.sub}>60 AI Agents & Employees</Text>
      <View style={s.grid}>
        {agents.map((a) => (
          <Pressable key={a.id} style={[s.card, { borderLeftColor: a.color }]} onPress={() => router.push(a.route as any)}>
            <Text style={s.at}>{a.title}</Text>
            <Text style={s.al}>{a.level.replace('_',' ').toUpperCase()}</Text>
            <Text style={s.ae}>{a.efficiency}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
const s = StyleSheet.create({
  container:{flex:1,backgroundColor:'#0a0a0a',padding:16},title:{color:'#fff',fontSize:24,fontWeight:'bold',marginBottom:4},
  sub:{color:'#888',fontSize:14,marginBottom:16},grid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  card:{backgroundColor:'#1a1a2e',borderRadius:12,padding:16,width:'48%',borderLeftWidth:3},
  at:{color:'#fff',fontSize:14,fontWeight:'600',marginBottom:4},al:{color:'#888',fontSize:11,marginBottom:2},
  ae:{color:'#10B981',fontSize:12},
});
