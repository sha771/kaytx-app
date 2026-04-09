
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TrendingUp, TrendingDown, Activity, BarChart3, Brain, Zap } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';

const predictions = [
  { asset: 'AAPL', direction: 'UP', target: '$215.40', horizon: '7 days', confidence: 94 },
  { asset: 'TSLA', direction: 'DOWN', target: '$168.20', horizon: '3 days', confidence: 81 },
  { asset: 'BTC/USD', direction: 'UP', target: '$72,500', horizon: '14 days', confidence: 88 },
  { asset: 'SPX', direction: 'UP', target: '5,450', horizon: '30 days', confidence: 76 },
  { asset: 'EUR/USD', direction: 'DOWN', target: '1.0720', horizon: '5 days', confidence: 83 },
];

const models = [
  { name: 'LSTM Neural Network', accuracy: '94.2%', status: 'Active' },
  { name: 'Transformer Model', accuracy: '91.8%', status: 'Active' },
  { name: 'Random Forest Ensemble', accuracy: '89.5%', status: 'Standby' },
  { name: 'XGBoost Regressor', accuracy: '87.3%', status: 'Active' },
];

export default function MarketPredictionScreen() {
  const { theme } = useTheme();
  const agent = useMemo(() => aiEmployees.find(e => e.id === 'ai-market-prediction')!, []);

  const predictionsTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#00E676', '#00b359']} style={styles.metricCard}>
          <Brain size={20} color="#fff" />
          <Text style={styles.metricValue}>96.8%</Text>
          <Text style={styles.metricLabel}>Accuracy</Text>
        </LinearGradient>
        <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}>
          <TrendingUp size={20} color="#fff" />
          <Text style={styles.metricValue}>142</Text>
          <Text style={styles.metricLabel}>Predictions Today</Text>
        </LinearGradient>
        <LinearGradient colors={['#5856D6', '#4846b0']} style={styles.metricCard}>
          <Activity size={20} color="#fff" />
          <Text style={styles.metricValue}>4</Text>
          <Text style={styles.metricLabel}>ML Models Live</Text>
        </LinearGradient>
        <LinearGradient colors={['#FF9500', '#e68a00']} style={styles.metricCard}>
          <Zap size={20} color="#fff" />
          <Text style={styles.metricValue}>0.5s</Text>
          <Text style={styles.metricLabel}>Prediction Speed</Text>
        </LinearGradient>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Predictions</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>
        {predictions.map((pred, i) => (
          <View key={i} style={[styles.predRow, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.predLeft}>
              <Text style={[styles.predAsset, { color: theme.colors.text }]}>{pred.asset}</Text>
              <Text style={[styles.predHorizon, { color: theme.colors.secondaryText }]}>Horizon: {pred.horizon}</Text>
            </View>
            <View style={styles.predCenter}>
              {pred.direction === 'UP'
                ? <TrendingUp size={18} color="#00C853" />
                : <TrendingDown size={18} color="#FF3B30" />}
              <Text style={[styles.predTarget, { color: pred.direction === 'UP' ? '#00C853' : '#FF3B30' }]}>
                {pred.target}
              </Text>
            </View>
            <View style={[styles.confBadge, { backgroundColor: '#007AFF20' }]}>
              <Text style={styles.confText}>{pred.confidence}%</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>ML Model Status</Text>
        {models.map((model, i) => (
          <View key={i} style={[styles.modelRow, { borderBottomColor: theme.colors.border }]}>
            <View style={[styles.modelStatus, {
              backgroundColor: model.status === 'Active' ? '#00C85320' : '#FF950020'
            }]}>
              <Text style={{ color: model.status === 'Active' ? '#00C853' : '#FF9500', fontSize: 11, fontWeight: '700' }}>
                {model.status}
              </Text>
            </View>
            <Text style={[styles.modelName, { color: theme.colors.text }]}>{model.name}</Text>
            <Text style={[styles.modelAccuracy, { color: '#00E676' }]}>{model.accuracy}</Text>
          </View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const customTabs = [
    { id: 'predictions', label: 'Predictions', icon: Brain, component: predictionsTab },
    { id: 'models', label: 'Models', icon: BarChart3, component: <View /> },
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
  predRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  predLeft: { flex: 1 },
  predAsset: { fontSize: 15, fontWeight: '700' },
  predHorizon: { fontSize: 12, marginTop: 2 },
  predCenter: { flexDirection: 'row', alignItems: 'center', gap: 6, marginRight: 12 },
  predTarget: { fontSize: 14, fontWeight: '700' },
  confBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  confText: { color: '#007AFF', fontWeight: '800', fontSize: 12 },
  modelRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, gap: 10 },
  modelStatus: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  modelName: { flex: 1, fontSize: 14, fontWeight: '500' },
  modelAccuracy: { fontSize: 14, fontWeight: '700' },
});
