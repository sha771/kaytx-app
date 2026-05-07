
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {
  TrendingUp, TrendingDown, ChartBarBig, Shield, Globe,
  Zap, Brain, ArrowRight, Activity, DollarSign, Coins, Clock,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const subAgents = [
  { id: 'ai-market-prediction', name: 'Market Prediction', color: '#00E676', route: '/ai-agent/trading-investment/market-prediction' },
  { id: 'ai-algorithmic-trading', name: 'Algo Trading', color: '#69F0AE', route: '/ai-agent/trading-investment/algorithmic-trading' },
  { id: 'ai-portfolio-manager', name: 'Portfolio Manager', color: '#00C853', route: '/ai-agent/trading-investment/portfolio-manager' },
  { id: 'ai-market-sentiment', name: 'Sentiment Analyst', color: '#76FF03', route: '/ai-agent/trading-investment/market-sentiment' },
  { id: 'ai-technical-analysis', name: 'Technical Analysis', color: '#64FFDA', route: '/ai-agent/trading-investment/technical-analysis' },
  { id: 'ai-fundamental-analysis', name: 'Fundamental Analysis', color: '#18FFFF', route: '/ai-agent/trading-investment/fundamental-analysis' },
  { id: 'ai-trading-risk-manager', name: 'Risk Manager', color: '#FF5252', route: '/ai-agent/trading-investment/trading-risk-manager' },
  { id: 'ai-futures-options', name: 'Futures & Options', color: '#FF4081', route: '/ai-agent/trading-investment/futures-options' },
  { id: 'ai-crypto-defi', name: 'Crypto & DeFi', color: '#F50057', route: '/ai-agent/trading-investment/crypto-defi' },
  { id: 'ai-forex-trading', name: 'Forex Trading', color: '#D500F9', route: '/ai-agent/trading-investment/forex-trading' },
  { id: 'ai-commodities', name: 'Commodities', color: '#FF6D00', route: '/ai-agent/trading-investment/commodities' },
  { id: 'ai-quantitative-researcher', name: 'Quant Researcher', color: '#651FFF', route: '/ai-agent/trading-investment/quantitative-researcher' },
  { id: 'ai-futures-preview', name: 'Futures Preview', color: '#7C4DFF', route: '/ai-agent/trading-investment/futures-preview' },
  { id: 'ai-copy-trading', name: 'Copy Trading', color: '#B388FF', route: '/ai-agent/trading-investment/copy-trading' },
  { id: 'ai-macro-economy', name: 'Macro Economy', color: '#8C9EFF', route: '/ai-agent/trading-investment/macro-economy' },
];

const liveSignals = [
  { asset: 'S&P 500', signal: 'BUY', confidence: 94, change: '+1.24%', color: '#00C853' },
  { asset: 'BTC/USD', signal: 'HOLD', confidence: 78, change: '+0.83%', color: '#FF9500' },
  { asset: 'EUR/USD', signal: 'SELL', confidence: 87, change: '-0.42%', color: '#FF3B30' },
  { asset: 'Gold', signal: 'BUY', confidence: 91, change: '+0.65%', color: '#00C853' },
  { asset: 'Crude Oil', signal: 'SELL', confidence: 82, change: '-1.12%', color: '#FF3B30' },
];

export default function TradingInvestmentAIScreen() {
  const { theme } = useTheme();
  const agent = useMemo(() => aiEmployees.find(e => e.id === 'trading-investment-ai')!, []);

  const overviewTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Portfolio Metrics */}
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#00C853', '#009624']} style={styles.metricCard}>
          <TrendingUp size={20} color="#fff" />
          <Text style={styles.metricValue}>+18.4%</Text>
          <Text style={styles.metricLabel}>YTD Return</Text>
        </LinearGradient>
        <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}>
          <DollarSign size={20} color="#fff" />
          <Text style={styles.metricValue}>$2.4M</Text>
          <Text style={styles.metricLabel}>AUM Managed</Text>
        </LinearGradient>
        <LinearGradient colors={['#5856D6', '#4846b0']} style={styles.metricCard}>
          <Shield size={20} color="#fff" />
          <Text style={styles.metricValue}>1.87</Text>
          <Text style={styles.metricLabel}>Sharpe Ratio</Text>
        </LinearGradient>
        <LinearGradient colors={['#FF3B30', '#cc2f26']} style={styles.metricCard}>
          <TrendingDown size={20} color="#fff" />
          <Text style={styles.metricValue}>-4.2%</Text>
          <Text style={styles.metricLabel}>Max Drawdown</Text>
        </LinearGradient>
      </View>

      {/* Live Market Signals */}
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Live Trading Signals</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>
        {liveSignals.map((sig, i) => (
          <View key={i} style={[styles.signalRow, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.signalLeft}>
              <Text style={[styles.signalAsset, { color: theme.colors.text }]}>{sig.asset}</Text>
              <Text style={[styles.signalConf, { color: theme.colors.secondaryText }]}>Confidence: {sig.confidence}%</Text>
            </View>
            <Text style={[styles.signalChange, { color: sig.color }]}>{sig.change}</Text>
            <View style={[styles.signalBadge, { backgroundColor: sig.color + '20' }]}>
              <Text style={[styles.signalBadgeText, { color: sig.color }]}>{sig.signal}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Sub-Agent Roster */}
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Active Sub-Agents</Text>
        {subAgents.map((sa) => (
          <TouchableOpacity
            key={sa.id}
            style={[styles.subAgentRow, { borderBottomColor: theme.colors.border }]}
            onPress={() => router.push(sa.route)}
          >
            <View style={[styles.subAgentDot, { backgroundColor: sa.color }]} />
            <Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sa.name}</Text>
            <ArrowRight size={16} color={theme.colors.secondaryText} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const analyticsTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Asset Allocation</Text>
        {[
          { label: 'Equities', pct: 45, color: '#00C853' },
          { label: 'Fixed Income', pct: 20, color: '#007AFF' },
          { label: 'Crypto', pct: 15, color: '#F50057' },
          { label: 'Commodities', pct: 12, color: '#FF6D00' },
          { label: 'Forex', pct: 8, color: '#D500F9' },
        ].map((item, i) => (
          <View key={i} style={{ marginBottom: 14 }}>
            <View style={styles.barLabelRow}>
              <Text style={[styles.barLabel, { color: theme.colors.text }]}>{item.label}</Text>
              <Text style={[styles.barPct, { color: item.color }]}>{item.pct}%</Text>
            </View>
            <View style={[styles.barBg, { backgroundColor: theme.colors.border }]}>
              <View style={[styles.barFill, { width: `${item.pct}%` as any, backgroundColor: item.color }]} />
            </View>
          </View>
        ))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Monthly Performance</Text>
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => {
          const returns = [3.2, 1.8, -0.9, 4.1, 2.6, 2.7];
          const val = returns[i];
          return (
            <View key={i} style={styles.perfRow}>
              <Text style={[styles.perfMonth, { color: theme.colors.secondaryText }]}>{month}</Text>
              <View style={styles.perfBarContainer}>
                <View style={[
                  styles.perfBar,
                  { width: `${Math.abs(val) * 15}%` as any, backgroundColor: val >= 0 ? '#00C853' : '#FF3B30' }
                ]} />
              </View>
              <Text style={[styles.perfVal, { color: val >= 0 ? '#00C853' : '#FF3B30' }]}>
                {val >= 0 ? '+' : ''}{val}%
              </Text>
            </View>
          );
        })}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: Activity, component: overviewTab },
    { id: 'analytics', label: 'Analytics', icon: ChartBarBig, component: analyticsTab },
  ];

  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { padding: 20 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 6 },
  metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' },
  metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#FF3B3020', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#FF3B30' },
  liveText: { fontSize: 11, color: '#FF3B30', fontWeight: '700' },
  signalRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  signalLeft: { flex: 1 },
  signalAsset: { fontSize: 15, fontWeight: '600' },
  signalConf: { fontSize: 12, marginTop: 2 },
  signalChange: { fontSize: 14, fontWeight: '700', marginRight: 12 },
  signalBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  signalBadgeText: { fontSize: 12, fontWeight: '800' },
  subAgentRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, gap: 12 },
  subAgentDot: { width: 10, height: 10, borderRadius: 5 },
  subAgentName: { flex: 1, fontSize: 15, fontWeight: '500' },
  barLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  barLabel: { fontSize: 14, fontWeight: '500' },
  barPct: { fontSize: 14, fontWeight: '700' },
  barBg: { height: 8, borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4 },
  perfRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
  perfMonth: { width: 35, fontSize: 13 },
  perfBarContainer: { flex: 1, height: 8, backgroundColor: '#E5E5EA', borderRadius: 4, overflow: 'hidden' },
  perfBar: { height: '100%', borderRadius: 4 },
  perfVal: { width: 50, textAlign: 'right', fontSize: 13, fontWeight: '700' },
});
