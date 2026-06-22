import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const agents = [
  { id: 'ai-equity-trader', uid: 'ktx-ti-equity-trader', title: 'Equity Trader', route: '/ai-agent/trading-investments/equity-trader', color: '#FF9800', level: 'team_lead', efficiency: '91%' },
  { id: 'ai-forex-trader', uid: 'ktx-ti-forex-trader', title: 'Forex Trader', route: '/ai-agent/trading-investments/forex-trader', color: '#FF9800', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-commodity-trader', uid: 'ktx-ti-commodity-trader', title: 'Commodity Trader', route: '/ai-agent/trading-investments/commodity-trader', color: '#FF9800', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-derivatives-specialist', uid: 'ktx-ti-derivatives-specialist', title: 'Derivatives Specialist', route: '/ai-agent/trading-investments/derivatives-specialist', color: '#FF9800', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-options-trader', uid: 'ktx-ti-options-trader', title: 'Options Trader', route: '/ai-agent/trading-investments/options-trader', color: '#FF9800', level: 'team_lead', efficiency: '90%' },
  { id: 'ai-futures-trader', uid: 'ktx-ti-futures-trader', title: 'Futures Trader', route: '/ai-agent/trading-investments/futures-trader', color: '#FF9800', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-algorithmic-trading-specialist', uid: 'ktx-ti-algorithmic-trading-specialist', title: 'Algorithmic Trading Specialist', route: '/ai-agent/trading-investments/algorithmic-trading-specialist', color: '#FF9800', level: 'team_lead', efficiency: '92%' },
  { id: 'ai-high-frequency-trading-specialist', uid: 'ktx-ti-high-frequency-trading-specialist', title: 'High-Frequency Trading Specialist', route: '/ai-agent/trading-investments/high-frequency-trading-specialist', color: '#FF9800', level: 'team_lead', efficiency: '91%' },
  { id: 'ai-portfolio-manager', uid: 'ktx-ti-portfolio-manager', title: 'Portfolio Manager', route: '/ai-agent/trading-investments/portfolio-manager', color: '#FF9800', level: 'manager', efficiency: '89%' },
  { id: 'ai-investment-analyst', uid: 'ktx-ti-investment-analyst', title: 'Investment Analyst', route: '/ai-agent/trading-investments/investment-analyst', color: '#FF9800', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-risk-manager-trading', uid: 'ktx-ti-risk-manager-trading', title: 'Risk Manager (Trading)', route: '/ai-agent/trading-investments/risk-manager-trading', color: '#FF9800', level: 'manager', efficiency: '90%' },
  { id: 'ai-quantitative-analyst', uid: 'ktx-ti-quantitative-analyst', title: 'Quantitative Analyst', route: '/ai-agent/trading-investments/quantitative-analyst', color: '#FF9800', level: 'team_lead', efficiency: '91%' },
  { id: 'ai-trading-strategist', uid: 'ktx-ti-trading-strategist', title: 'Trading Strategist', route: '/ai-agent/trading-investments/trading-strategist', color: '#FF9800', level: 'manager', efficiency: '89%' },
  { id: 'ai-market-maker', uid: 'ktx-ti-market-maker', title: 'Market Maker', route: '/ai-agent/trading-investments/market-maker', color: '#FF9800', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-investment-banker', uid: 'ktx-ti-investment-banker', title: 'Investment Banker', route: '/ai-agent/trading-investments/investment-banker', color: '#FF9800', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-wealth-manager', uid: 'ktx-ti-wealth-manager', title: 'Wealth Manager', route: '/ai-agent/trading-investments/wealth-manager', color: '#FF9800', level: 'manager', efficiency: '86%' },
  { id: 'ai-financial-advisor', uid: 'ktx-ti-financial-advisor', title: 'Financial Advisor', route: '/ai-agent/trading-investments/financial-advisor', color: '#FF9800', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-asset-manager', uid: 'ktx-ti-asset-manager', title: 'Asset Manager', route: '/ai-agent/trading-investments/asset-manager', color: '#FF9800', level: 'manager', efficiency: '89%' },
  { id: 'ai-hedge-fund-specialist', uid: 'ktx-ti-hedge-fund-specialist', title: 'Hedge Fund Specialist', route: '/ai-agent/trading-investments/hedge-fund-specialist', color: '#FF9800', level: 'team_lead', efficiency: '90%' },
  { id: 'ai-private-equity-specialist', uid: 'ktx-ti-private-equity-specialist', title: 'Private Equity Specialist', route: '/ai-agent/trading-investments/private-equity-specialist', color: '#FF9800', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-venture-capital-specialist', uid: 'ktx-ti-venture-capital-specialist', title: 'Venture Capital Specialist', route: '/ai-agent/trading-investments/venture-capital-specialist', color: '#FF9800', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-trading-operations-specialist', uid: 'ktx-ti-trading-operations-specialist', title: 'Trading Operations Specialist', route: '/ai-agent/trading-investments/trading-operations-specialist', color: '#FF9800', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-compliance-officer-trading', uid: 'ktx-ti-compliance-officer-trading', title: 'Compliance Officer (Trading)', route: '/ai-agent/trading-investments/compliance-officer-trading', color: '#FF9800', level: 'manager', efficiency: '89%' },
  { id: 'ai-trading-analyst', uid: 'ktx-ti-trading-analyst', title: 'Trading Analyst', route: '/ai-agent/trading-investments/trading-analyst', color: '#FF9800', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-market-researcher', uid: 'ktx-ti-market-researcher', title: 'Market Researcher', route: '/ai-agent/trading-investments/market-researcher', color: '#FF9800', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-technical-analyst', uid: 'ktx-ti-technical-analyst', title: 'Technical Analyst', route: '/ai-agent/trading-investments/technical-analyst', color: '#FF9800', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-fundamental-analyst', uid: 'ktx-ti-fundamental-analyst', title: 'Fundamental Analyst', route: '/ai-agent/trading-investments/fundamental-analyst', color: '#FF9800', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-quantitative-researcher', uid: 'ktx-ti-quantitative-researcher', title: 'Quantitative Researcher', route: '/ai-agent/trading-investments/quantitative-researcher', color: '#FF9800', level: 'team_lead', efficiency: '90%' },
  { id: 'ai-risk-analyst', uid: 'ktx-ti-risk-analyst', title: 'Risk Analyst', route: '/ai-agent/trading-investments/risk-analyst', color: '#FF9800', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-credit-analyst', uid: 'ktx-ti-credit-analyst', title: 'Credit Analyst', route: '/ai-agent/trading-investments/credit-analyst', color: '#FF9800', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-fixed-income-specialist', uid: 'ktx-ti-fixed-income-specialist', title: 'Fixed Income Specialist', route: '/ai-agent/trading-investments/fixed-income-specialist', color: '#FF9800', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-municipal-bond-specialist', uid: 'ktx-ti-municipal-bond-specialist', title: 'Municipal Bond Specialist', route: '/ai-agent/trading-investments/municipal-bond-specialist', color: '#FF9800', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-corporate-bond-specialist', uid: 'ktx-ti-corporate-bond-specialist', title: 'Corporate Bond Specialist', route: '/ai-agent/trading-investments/corporate-bond-specialist', color: '#FF9800', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-government-securities-specialist', uid: 'ktx-ti-government-securities-specialist', title: 'Government Securities Specialist', route: '/ai-agent/trading-investments/government-securities-specialist', color: '#FF9800', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-emerging-market-specialist', uid: 'ktx-ti-emerging-market-specialist', title: 'Emerging Market Specialist', route: '/ai-agent/trading-investments/emerging-market-specialist', color: '#FF9800', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-developed-market-specialist', uid: 'ktx-ti-developed-market-specialist', title: 'Developed Market Specialist', route: '/ai-agent/trading-investments/developed-market-specialist', color: '#FF9800', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-sector-specialist', uid: 'ktx-ti-sector-specialist', title: 'Sector Specialist', route: '/ai-agent/trading-investments/sector-specialist', color: '#FF9800', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-industry-analyst', uid: 'ktx-ti-industry-analyst', title: 'Industry Analyst', route: '/ai-agent/trading-investments/industry-analyst', color: '#FF9800', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-geographic-specialist', uid: 'ktx-ti-geographic-specialist', title: 'Geographic Specialist', route: '/ai-agent/trading-investments/geographic-specialist', color: '#FF9800', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-currency-specialist', uid: 'ktx-ti-currency-specialist', title: 'Currency Specialist', route: '/ai-agent/trading-investments/currency-specialist', color: '#FF9800', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-commodity-specialist', uid: 'ktx-ti-commodity-specialist', title: 'Commodity Specialist', route: '/ai-agent/trading-investments/commodity-specialist', color: '#FF9800', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-energy-specialist', uid: 'ktx-ti-energy-specialist', title: 'Energy Specialist', route: '/ai-agent/trading-investments/energy-specialist', color: '#FF9800', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-metals-specialist', uid: 'ktx-ti-metals-specialist', title: 'Metals Specialist', route: '/ai-agent/trading-investments/metals-specialist', color: '#FF9800', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-agricultural-specialist', uid: 'ktx-ti-agricultural-specialist', title: 'Agricultural Specialist', route: '/ai-agent/trading-investments/agricultural-specialist', color: '#FF9800', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-crypto-specialist', uid: 'ktx-ti-crypto-specialist', title: 'Crypto Specialist', route: '/ai-agent/trading-investments/crypto-specialist', color: '#FF9800', level: 'team_lead', efficiency: '90%' },
  { id: 'ai-digital-asset-specialist', uid: 'ktx-ti-digital-asset-specialist', title: 'Digital Asset Specialist', route: '/ai-agent/trading-investments/digital-asset-specialist', color: '#FF9800', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-alternative-investment-specialist', uid: 'ktx-ti-alternative-investment-specialist', title: 'Alternative Investment Specialist', route: '/ai-agent/trading-investments/alternative-investment-specialist', color: '#FF9800', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-structured-product-specialist', uid: 'ktx-ti-structured-product-specialist', title: 'Structured Product Specialist', route: '/ai-agent/trading-investments/structured-product-specialist', color: '#FF9800', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-derivative-strategist', uid: 'ktx-ti-derivative-strategist', title: 'Derivative Strategist', route: '/ai-agent/trading-investments/derivative-strategist', color: '#FF9800', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-volatility-specialist', uid: 'ktx-ti-volatility-specialist', title: 'Volatility Specialist', route: '/ai-agent/trading-investments/volatility-specialist', color: '#FF9800', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-liquidity-specialist', uid: 'ktx-ti-liquidity-specialist', title: 'Liquidity Specialist', route: '/ai-agent/trading-investments/liquidity-specialist', color: '#FF9800', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-market-microstructure-specialist', uid: 'ktx-ti-market-microstructure-specialist', title: 'Market Microstructure Specialist', route: '/ai-agent/trading-investments/market-microstructure-specialist', color: '#FF9800', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-execution-specialist', uid: 'ktx-ti-execution-specialist', title: 'Execution Specialist', route: '/ai-agent/trading-investments/execution-specialist', color: '#FF9800', level: 'team_lead', efficiency: '90%' },
  { id: 'ai-clearing-specialist', uid: 'ktx-ti-clearing-specialist', title: 'Clearing Specialist', route: '/ai-agent/trading-investments/clearing-specialist', color: '#FF9800', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-settlement-specialist', uid: 'ktx-ti-settlement-specialist', title: 'Settlement Specialist', route: '/ai-agent/trading-investments/settlement-specialist', color: '#FF9800', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-custody-specialist', uid: 'ktx-ti-custody-specialist', title: 'Custody Specialist', route: '/ai-agent/trading-investments/custody-specialist', color: '#FF9800', level: 'team_lead', efficiency: '87%' },
];

export default function TradingInvestmentsDepartment() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Trading & Investments - AI Agents</Text>
      <Text style={s.sub}>{agents.length} AI Agents & Employees</Text>
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
  container:{flex:1,backgroundColor:'#0a0a0a',padding:16},
  title:{color:'#fff',fontSize:24,fontWeight:'bold',marginBottom:4},
  sub:{color:'#888',fontSize:14,marginBottom:16},
  grid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  card:{backgroundColor:'#1a1a2e',borderRadius:12,padding:16,width:'48%',borderLeftWidth:3},
  at:{color:'#fff',fontSize:14,fontWeight:'600',marginBottom:4},
  al:{color:'#888',fontSize:11,marginBottom:2},
  ae:{color:'#10B981',fontSize:12},
});
