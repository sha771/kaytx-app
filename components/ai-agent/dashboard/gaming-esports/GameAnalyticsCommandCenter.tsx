import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { 
  BarChart3, 
  Activity, 
  TrendingUp, 
  Clock, 
  Zap, 
  Target, 
  Gamepad2, 
  Shield, 
  PieChart, 
  LineChart,
  Users,
  Timer,
  Flame,
  Award,
  Play,
  Pause,
  RotateCcw,
  GitBranch,
  Layers,
  Database,
  Cpu,
  Server,
  Globe,
  Map,
  Crosshair,
  Sword,
  Shield as ShieldIcon,
  Heart,
  Star,
  Zap as Lightning,
  Gauge,
  Speed,
  ArrowUpRight,
  ArrowDownRight,
  Coins,
  AlertTriangle
} from 'lucide-react-native';

interface GameAnalyticsCommandCenterProps {
  data?: any;
}

export default function GameAnalyticsCommandCenter({ data }: GameAnalyticsCommandCenterProps) {
  // Match Activity Data
  const matchActivity = {
    totalMatches: '2.4M',
    dailyMatches: '847K',
    avgMatchDuration: '18m 32s',
    peakConcurrent: '1.2M',
    completionRate: '94.2%'
  };

  // Session Data
  const sessionMetrics = [
    { label: 'Avg Session Duration', value: '45m', change: '+8%', trend: 'up' as const, color: '#00D4FF' },
    { label: 'Sessions Per Day', value: '3.2', change: '+5%', trend: 'up' as const, color: '#10B981' },
    { label: 'Peak Hours', value: '7PM-11PM', change: '+12%', trend: 'up' as const, color: '#A855F7' },
    { label: 'Session Completion', value: '87%', change: '+3%', trend: 'up' as const, color: '#F59E0B' }
  ];

  // Economy Balance
  const economyMetrics = {
    totalCurrency: '847B',
    dailyInflow: '12.4B',
    dailyOutflow: '11.8B',
    inflationRate: '0.8%',
    playerBalance: '15.2K'
  };

  // Feature Usage
  const featureUsage = [
    { feature: 'Battle Pass', usage: 78, trend: 'up' as const, color: '#A855F7' },
    { feature: 'Cosmetics Store', usage: 65, trend: 'up' as const, color: '#00D4FF' },
    { feature: 'Guild System', usage: 52, trend: 'stable' as const, color: '#10B981' },
    { feature: 'Trading', usage: 41, trend: 'down' as const, color: '#F59E0B' },
    { feature: 'Crafting', usage: 38, trend: 'up' as const, color: '#EC4899' },
    { feature: 'Events', usage: 85, trend: 'up' as const, color: '#EF4444' }
  ];

  // Gameplay Performance
  const gameplayMetrics = [
    { metric: 'K/D Ratio', value: '1.24', change: '+0.05', trend: 'up' as const },
    { metric: 'Win Rate', value: '52.3%', change: '+1.2%', trend: 'up' as const },
    { metric: 'Avg Accuracy', value: '68.4%', change: '+2.1%', trend: 'up' as const },
    { metric: 'Team Coordination', value: '7.8/10', change: '+0.3', trend: 'up' as const }
  ];

  // Heatmap Data (Simplified)
  const mapHotspots = [
    { location: 'Central Plaza', intensity: 95, players: '45.2K' },
    { location: 'Industrial Zone', intensity: 82, players: '38.7K' },
    { location: 'Residential Area', intensity: 71, players: '32.1K' },
    { location: 'Commercial District', intensity: 68, players: '28.9K' },
    { location: 'Outskirts', intensity: 45, players: '18.4K' }
  ];

  // Balance Intelligence
  const balanceIssues = [
    { issue: 'Weapon A Overpowered', severity: 'high', impact: 23, fix: 'Damage reduction -8%' },
    { issue: 'Character B Weak', severity: 'medium', impact: 18, fix: 'Buff speed +12%' },
    { issue: 'Map C Imbalance', severity: 'low', impact: 12, fix: 'Cover adjustment' },
    { issue: 'Economy Inflation', severity: 'medium', impact: 15, fix: 'Sink mechanisms' }
  ];

  const renderSessionCard = (metric: any, index: number) => (
    <View key={index} style={[styles.sessionCard, { backgroundColor: `${metric.color}10`, borderColor: `${metric.color}30` }]}>
      <Text style={[styles.sessionLabel, { color: 'rgba(255, 255, 255, 0.7)' }]}>{metric.label}</Text>
      <Text style={[styles.sessionValue, { color: '#FFFFFF' }]}>{metric.value}</Text>
      <View style={styles.sessionTrend}>
        {metric.trend === 'up' ? <ArrowUpRight size={14} color="#10B981" /> : <ArrowDownRight size={14} color="#EF4444" />}
        <Text style={[styles.sessionChange, { color: metric.trend === 'up' ? '#10B981' : '#EF4444' }]}>{metric.change}</Text>
      </View>
    </View>
  );

  const renderFeatureCard = (feature: any, index: number) => (
    <View key={index} style={[styles.featureCard, { backgroundColor: `${feature.color}10`, borderColor: `${feature.color}30` }]}>
      <View style={styles.featureHeader}>
        <Text style={[styles.featureName, { color: '#FFFFFF' }]}>{feature.feature}</Text>
        <View style={[styles.featureTrend, { backgroundColor: feature.trend === 'up' ? 'rgba(16, 185, 129, 0.2)' : feature.trend === 'stable' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)' }]}>
          {feature.trend === 'up' && <ArrowUpRight size={12} color="#10B981" />}
          {feature.trend === 'stable' && <Activity size={12} color="#F59E0B" />}
          {feature.trend === 'down' && <ArrowDownRight size={12} color="#EF4444" />}
        </View>
      </View>
      <View style={styles.featureBar}>
        <View style={[styles.featureFill, { width: `${feature.usage}%`, backgroundColor: feature.color }]} />
      </View>
      <Text style={[styles.featureUsage, { color: feature.color }]}>{feature.usage}% usage</Text>
    </View>
  );

  const renderGameplayCard = (metric: any, index: number) => (
    <View key={index} style={[styles.gameplayCard, { backgroundColor: 'rgba(0, 212, 255, 0.05)', borderColor: 'rgba(0, 212, 255, 0.2)' }]}>
      <Text style={[styles.gameplayLabel, { color: 'rgba(255, 255, 255, 0.7)' }]}>{metric.metric}</Text>
      <Text style={[styles.gameplayValue, { color: '#00D4FF' }]}>{metric.value}</Text>
      <View style={styles.gameplayTrend}>
        {metric.trend === 'up' ? <ArrowUpRight size={12} color="#10B981" /> : <ArrowDownRight size={12} color="#EF4444" />}
        <Text style={[styles.gameplayChange, { color: metric.trend === 'up' ? '#10B981' : '#EF4444' }]}>{metric.change}</Text>
      </View>
    </View>
  );

  const renderHotspotCard = (hotspot: any, index: number) => (
    <View key={index} style={[styles.hotspotCard, { backgroundColor: `rgba(239, 68, 68, ${hotspot.intensity / 200})`, borderColor: `rgba(239, 68, 68, ${hotspot.intensity / 150})` }]}>
      <View style={styles.hotspotHeader}>
        <Map size={16} color="#EF4444" />
        <Text style={[styles.hotspotLocation, { color: '#FFFFFF' }]}>{hotspot.location}</Text>
      </View>
      <View style={styles.hotspotMetrics}>
        <View style={styles.hotspotMetric}>
          <Flame size={12} color="rgba(255, 255, 255, 0.5)" />
          <Text style={[styles.hotspotIntensity, { color: '#EF4444' }]}>{hotspot.intensity}%</Text>
        </View>
        <View style={styles.hotspotMetric}>
          <Users size={12} color="rgba(255, 255, 255, 0.5)" />
          <Text style={[styles.hotspotPlayers, { color: 'rgba(255, 255, 255, 0.7)' }]}>{hotspot.players}</Text>
        </View>
      </View>
    </View>
  );

  const renderBalanceIssue = (issue: any, index: number) => {
    const severityColors = {
      high: '#EF4444',
      medium: '#F59E0B',
      low: '#10B981'
    };
    const color = severityColors[issue.severity as keyof typeof severityColors];

    return (
      <View key={index} style={[styles.balanceCard, { backgroundColor: `${color}10`, borderColor: `${color}30` }]}>
        <View style={styles.balanceHeader}>
          <View style={[styles.severityBadge, { backgroundColor: `${color}20` }]}>
            <AlertTriangle size={14} color={color} />
            <Text style={[styles.severityText, { color }]}>{issue.severity}</Text>
          </View>
          <Text style={[styles.impactText, { color: 'rgba(255, 255, 255, 0.6)' }]}>{issue.impact}% impact</Text>
        </View>
        <Text style={[styles.issueName, { color: '#FFFFFF' }]}>{issue.issue}</Text>
        <View style={styles.fixSection}>
          <Target size={12} color="#00D4FF" />
          <Text style={[styles.fixText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{issue.fix}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: '#03050A' }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: 'rgba(0, 212, 255, 0.2)' }]}>
          <BarChart3 size={24} color="#00D4FF" />
        </View>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: '#FFFFFF' }]}>Game Analytics Command Center</Text>
          <Text style={[styles.headerSubtitle, { color: 'rgba(255, 255, 255, 0.6)' }]}>
            Match Activity • Session Data • Economy Balance • Feature Usage
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Match Activity */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Match Activity</Text>
          <View style={[styles.matchCard, { backgroundColor: 'rgba(0, 212, 255, 0.05)', borderColor: 'rgba(0, 212, 255, 0.2)' }]}>
            <View style={styles.matchGrid}>
              <View style={styles.matchMetric}>
                <Gamepad2 size={20} color="#00D4FF" />
                <Text style={[styles.matchMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Total Matches</Text>
                <Text style={[styles.matchMetricValue, { color: '#FFFFFF' }]}>{matchActivity.totalMatches}</Text>
              </View>
              <View style={styles.matchMetric}>
                <Activity size={20} color="#10B981" />
                <Text style={[styles.matchMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Daily Matches</Text>
                <Text style={[styles.matchMetricValue, { color: '#FFFFFF' }]}>{matchActivity.dailyMatches}</Text>
              </View>
              <View style={styles.matchMetric}>
                <Clock size={20} color="#A855F7" />
                <Text style={[styles.matchMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Avg Duration</Text>
                <Text style={[styles.matchMetricValue, { color: '#FFFFFF' }]}>{matchActivity.avgMatchDuration}</Text>
              </View>
              <View style={styles.matchMetric}>
                <Users size={20} color="#F59E0B" />
                <Text style={[styles.matchMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Peak Concurrent</Text>
                <Text style={[styles.matchMetricValue, { color: '#FFFFFF' }]}>{matchActivity.peakConcurrent}</Text>
              </View>
            </View>
            <View style={styles.completionSection}>
              <Text style={[styles.completionLabel, { color: 'rgba(255, 255, 255, 0.7)' }]}>Completion Rate</Text>
              <View style={styles.completionBar}>
                <View style={[styles.completionFill, { width: matchActivity.completionRate, backgroundColor: '#10B981' }]} />
              </View>
              <Text style={[styles.completionValue, { color: '#10B981' }]}>{matchActivity.completionRate}</Text>
            </View>
          </View>
        </View>

        {/* Session Metrics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Session Analytics</Text>
          <View style={styles.sessionGrid}>
            {sessionMetrics.map((metric, index) => renderSessionCard(metric, index))}
          </View>
        </View>

        {/* Economy Balance */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Economy Balance</Text>
          <View style={[styles.economyCard, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
            <View style={styles.economyGrid}>
              <View style={styles.economyMetric}>
                <Coins size={20} color="#10B981" />
                <Text style={[styles.economyMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Total Currency</Text>
                <Text style={[styles.economyMetricValue, { color: '#FFFFFF' }]}>{economyMetrics.totalCurrency}</Text>
              </View>
              <View style={styles.economyMetric}>
                <TrendingUp size={20} color="#00D4FF" />
                <Text style={[styles.economyMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Daily Inflow</Text>
                <Text style={[styles.economyMetricValue, { color: '#00D4FF' }]}>{economyMetrics.dailyInflow}</Text>
              </View>
              <View style={styles.economyMetric}>
                <ArrowDownRight size={20} color="#EF4444" />
                <Text style={[styles.economyMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Daily Outflow</Text>
                <Text style={[styles.economyMetricValue, { color: '#EF4444' }]}>{economyMetrics.dailyOutflow}</Text>
              </View>
              <View style={styles.economyMetric}>
                <Gauge size={20} color="#F59E0B" />
                <Text style={[styles.economyMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Inflation Rate</Text>
                <Text style={[styles.economyMetricValue, { color: '#F59E0B' }]}>{economyMetrics.inflationRate}</Text>
              </View>
            </View>
            <View style={styles.balanceSection}>
              <Text style={[styles.balanceLabel, { color: 'rgba(255, 255, 255, 0.7)' }]}>Avg Player Balance</Text>
              <Text style={[styles.balanceValue, { color: '#10B981' }]}>{economyMetrics.playerBalance}</Text>
            </View>
          </View>
        </View>

        {/* Feature Usage */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Feature Usage</Text>
          <View style={styles.featuresContainer}>
            {featureUsage.map((feature, index) => renderFeatureCard(feature, index))}
          </View>
        </View>

        {/* Gameplay Performance */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Gameplay Performance</Text>
          <View style={styles.gameplayGrid}>
            {gameplayMetrics.map((metric, index) => renderGameplayCard(metric, index))}
          </View>
        </View>

        {/* Map Hotspots */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Gameplay Heatmap</Text>
          <View style={styles.hotspotsContainer}>
            {mapHotspots.map((hotspot, index) => renderHotspotCard(hotspot, index))}
          </View>
        </View>

        {/* Balance Intelligence */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Balance Intelligence</Text>
          <View style={styles.balanceContainer}>
            {balanceIssues.map((issue, index) => renderBalanceIssue(issue, index))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  matchCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  matchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 20,
  },
  matchMetric: {
    width: '48%',
    alignItems: 'center',
  },
  matchMetricLabel: {
    fontSize: 11,
    marginTop: 8,
    marginBottom: 4,
  },
  matchMetricValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  completionSection: {
    alignItems: 'center',
  },
  completionLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  completionBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    marginBottom: 8,
  },
  completionFill: {
    height: '100%',
    borderRadius: 4,
  },
  completionValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  sessionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sessionCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  sessionLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  sessionValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  sessionTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sessionChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  economyCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  economyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 20,
  },
  economyMetric: {
    width: '48%',
    alignItems: 'center',
  },
  economyMetricLabel: {
    fontSize: 11,
    marginTop: 8,
    marginBottom: 4,
  },
  economyMetricValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  balanceSection: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  balanceLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  featuresContainer: {
    gap: 12,
  },
  featureCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureName: {
    fontSize: 14,
    fontWeight: '600',
  },
  featureTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featureBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    marginBottom: 8,
  },
  featureFill: {
    height: '100%',
    borderRadius: 3,
  },
  featureUsage: {
    fontSize: 12,
    fontWeight: '600',
  },
  gameplayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gameplayCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  gameplayLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  gameplayValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  gameplayTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  gameplayChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  hotspotsContainer: {
    gap: 12,
  },
  hotspotCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  hotspotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  hotspotLocation: {
    fontSize: 14,
    fontWeight: '600',
  },
  hotspotMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  hotspotMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  hotspotIntensity: {
    fontSize: 14,
    fontWeight: '700',
  },
  hotspotPlayers: {
    fontSize: 12,
  },
  balanceContainer: {
    gap: 12,
  },
  balanceCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  severityText: {
    fontSize: 11,
    fontWeight: '700',
  },
  impactText: {
    fontSize: 12,
  },
  issueName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  fixSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fixText: {
    fontSize: 12,
  },
});