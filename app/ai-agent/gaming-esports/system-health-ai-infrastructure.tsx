/**
 * =============================================================================
 * SYSTEM HEALTH & AI INFRASTRUCTURE
 * =============================================================================
 *
 * A comprehensive system health dashboard that monitors game servers,
 * matchmaking systems, AI services, security platforms, and streaming infrastructure.
 *
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import {
  ChevronLeft,
  Server,
  Activity,
  Brain,
  Shield,
  Video,
  Zap,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Cpu,
  HardDrive,
  Wifi,
  BarChart3,
  Flame,
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Theme Colors
const THEME = {
  background: '#03050A',
  card: '#0A0F1E',
  cardLight: '#121829',
  neonCyan: '#00F0FF',
  electricPurple: '#8B5CF6',
  neonGreen: '#10B981',
  amber: '#F59E0B',
  red: '#EF4444',
  magenta: '#EC4899',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  border: '#1E293B',
};

// System Health Data
const SYSTEM_HEALTH_DATA = {
  gameServers: {
    total: 247,
    online: 245,
    offline: 2,
    avgUptime: 99.7,
    avgLatency: 24,
  },
  matchmakingSystems: {
    total: 12,
    healthy: 11,
    degraded: 1,
    avgMatchTime: 45,
    successRate: 98.5,
  },
  aiServices: {
    total: 8,
    healthy: 8,
    degraded: 0,
    down: 0,
    avgResponseTime: 120,
    requestsPerSecond: 45000,
  },
  securityPlatforms: {
    total: 15,
    healthy: 14,
    degraded: 1,
    threatsBlocked: 1247000,
    falsePositives: 0.02,
  },
  streamingInfrastructure: {
    total: 6,
    healthy: 6,
    degraded: 0,
    bandwidth: 45000,
    concurrentStreams: 2400000,
  },
};

// Server Status
const SERVER_STATUS = [
  { id: 1, region: 'North America East', status: 'healthy', uptime: '99.9%', latency: '18ms', load: '67%' },
  { id: 2, region: 'North America West', status: 'healthy', uptime: '99.8%', latency: '22ms', load: '72%' },
  { id: 3, region: 'Europe West', status: 'healthy', uptime: '99.7%', latency: '24ms', load: '68%' },
  { id: 4, region: 'Europe East', status: 'healthy', uptime: '99.6%', latency: '28ms', load: '65%' },
  { id: 5, region: 'Asia Pacific', status: 'degraded', uptime: '98.5%', latency: '45ms', load: '89%' },
];

// AI Services Status
const AI_SERVICES = [
  { id: 1, name: 'Player Intelligence', status: 'healthy', responseTime: '85ms', requests: '15K/s', accuracy: '98.7%' },
  { id: 2, name: 'Anti-Cheat Engine', status: 'healthy', responseTime: '120ms', requests: '12K/s', accuracy: '99.2%' },
  { id: 3, name: 'Matchmaking AI', status: 'healthy', responseTime: '95ms', requests: '8K/s', accuracy: '97.5%' },
  { id: 4, name: 'Revenue Prediction', status: 'healthy', responseTime: '150ms', requests: '5K/s', accuracy: '94.3%' },
  { id: 5, name: 'Content Moderation', status: 'healthy', responseTime: '110ms', requests: '10K/s', accuracy: '96.8%' },
];

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'server',
    title: 'Server Capacity',
    message: 'Asia Pacific servers at 89% capacity. Recommend immediate scaling.',
    impact: 'Critical',
    action: 'Scale APAC infrastructure immediately',
  },
  {
    type: 'ai',
    title: 'AI Performance',
    message: 'All AI services operating within optimal parameters. No action required.',
    impact: 'Positive',
    action: 'Continue monitoring',
  },
  {
    type: 'security',
    title: 'Security Alert',
    message: 'Security platform showing degraded performance in Europe region.',
    impact: 'Medium',
    action: 'Investigate Europe security platform',
  },
];

export default function SystemHealthAIInfrastructure() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderStatusIcon = (status: string) => {
    if (status === 'healthy') {
      return <CheckCircle size={16} color={THEME.neonGreen} />;
    } else if (status === 'degraded') {
      return <AlertTriangle size={16} color={THEME.amber} />;
    } else if (status === 'down') {
      return <XCircle size={16} color={THEME.red} />;
    }
    return null;
  };

  const renderServerCard = (server: typeof SERVER_STATUS[0]) => {
    const statusColors = {
      healthy: THEME.neonGreen,
      degraded: THEME.amber,
      down: THEME.red,
    };
    const statusColor = statusColors[server.status as keyof typeof statusColors];

    return (
      <BlurView key={server.id} intensity={20} tint="dark" style={styles.serverCard}>
        <View style={styles.serverHeader}>
          <Text style={styles.serverRegion}>{server.region}</Text>
          <View style={styles.serverStatus}>
            {renderStatusIcon(server.status)}
            <Text style={[styles.serverStatusText, { color: statusColor }]}>{server.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.serverDetails}>
          <View style={styles.serverDetail}>
            <Text style={styles.serverDetailLabel}>Uptime</Text>
            <Text style={[styles.serverDetailValue, { color: THEME.neonGreen }]}>{server.uptime}</Text>
          </View>
          <View style={styles.serverDetail}>
            <Text style={styles.serverDetailLabel}>Latency</Text>
            <Text style={[styles.serverDetailValue, { color: THEME.neonCyan }]}>{server.latency}</Text>
          </View>
          <View style={styles.serverDetail}>
            <Text style={styles.serverDetailLabel}>Load</Text>
            <Text style={[styles.serverDetailValue, { color: THEME.amber }]}>{server.load}</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderAIServiceCard = (service: typeof AI_SERVICES[0]) => {
    const statusColors = {
      healthy: THEME.neonGreen,
      degraded: THEME.amber,
      down: THEME.red,
    };
    const statusColor = statusColors[service.status as keyof typeof statusColors];

    return (
      <BlurView key={service.id} intensity={20} tint="dark" style={styles.aiServiceCard}>
        <View style={styles.aiServiceHeader}>
          <Text style={styles.aiServiceName}>{service.name}</Text>
          <View style={styles.aiServiceStatus}>
            {renderStatusIcon(service.status)}
            <Text style={[styles.aiServiceStatusText, { color: statusColor }]}>{service.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.aiServiceDetails}>
          <View style={styles.aiServiceDetail}>
            <Text style={styles.aiServiceDetailLabel}>Response Time</Text>
            <Text style={[styles.aiServiceDetailValue, { color: THEME.neonCyan }]}>{service.responseTime}</Text>
          </View>
          <View style={styles.aiServiceDetail}>
            <Text style={styles.aiServiceDetailLabel}>Requests</Text>
            <Text style={[styles.aiServiceDetailValue, { color: THEME.electricPurple }]}>{service.requests}</Text>
          </View>
          <View style={styles.aiServiceDetail}>
            <Text style={styles.aiServiceDetailLabel}>Accuracy</Text>
            <Text style={[styles.aiServiceDetailValue, { color: THEME.neonGreen }]}>{service.accuracy}</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      server: THEME.amber,
      ai: THEME.neonGreen,
      security: THEME.red,
    };
    const typeIcons = {
      server: Server,
      ai: Brain,
      security: Shield,
    };
    const Icon = typeIcons[insight.type as keyof typeof typeIcons];
    const color = typeColors[insight.type as keyof typeof typeColors];

    return (
      <Animated.View entering={FadeInUp.springify()} style={styles.insightCard}>
        <BlurView intensity={20} tint="dark" style={styles.insightCardBlur}>
          <View style={styles.insightHeader}>
            <View style={[styles.insightIcon, { backgroundColor: color + '20' }]}>
              <Icon size={20} color={color} />
            </View>
            <View style={styles.insightMeta}>
              <Text style={styles.insightTitle}>{insight.title}</Text>
              <View style={[styles.insightImpact, { backgroundColor: color + '30' }]}>
                <Text style={[styles.insightImpactText, { color }]}>{insight.impact}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.insightMessage}>{insight.message}</Text>
          <View style={styles.insightAction}>
            <Text style={styles.insightActionLabel}>Suggested Action:</Text>
            <Text style={styles.insightActionText}>{insight.action}</Text>
          </View>
        </BlurView>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={THEME.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerTitle}>
            <Activity size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>System Health & AI Infrastructure</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Game Servers */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Server size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Game Servers</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.gameServersCard}>
            <View style={styles.gameServersGrid}>
              <View style={styles.gameServersMetric}>
                <Text style={styles.gameServersLabel}>Total</Text>
                <Text style={[styles.gameServersValue, { color: THEME.neonCyan }]}>{SYSTEM_HEALTH_DATA.gameServers.total}</Text>
              </View>
              <View style={styles.gameServersMetric}>
                <Text style={styles.gameServersLabel}>Online</Text>
                <Text style={[styles.gameServersValue, { color: THEME.neonGreen }]}>{SYSTEM_HEALTH_DATA.gameServers.online}</Text>
              </View>
              <View style={styles.gameServersMetric}>
                <Text style={styles.gameServersLabel}>Avg Uptime</Text>
                <Text style={[styles.gameServersValue, { color: THEME.electricPurple }]}>{SYSTEM_HEALTH_DATA.gameServers.avgUptime}%</Text>
              </View>
              <View style={styles.gameServersMetric}>
                <Text style={styles.gameServersLabel}>Avg Latency</Text>
                <Text style={[styles.gameServersValue, { color: THEME.amber }]}>{SYSTEM_HEALTH_DATA.gameServers.avgLatency}ms</Text>
              </View>
            </View>
          </BlurView>
          <View style={styles.serversContainer}>
            {SERVER_STATUS.map((server) => renderServerCard(server))}
          </View>
        </Animated.View>

        {/* Matchmaking Systems */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Zap size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Matchmaking Systems</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.matchmakingCard}>
            <View style={styles.matchmakingGrid}>
              <View style={styles.matchmakingMetric}>
                <Text style={styles.matchmakingLabel}>Total</Text>
                <Text style={[styles.matchmakingValue, { color: THEME.neonCyan }]}>{SYSTEM_HEALTH_DATA.matchmakingSystems.total}</Text>
              </View>
              <View style={styles.matchmakingMetric}>
                <Text style={styles.matchmakingLabel}>Healthy</Text>
                <Text style={[styles.matchmakingValue, { color: THEME.neonGreen }]}>{SYSTEM_HEALTH_DATA.matchmakingSystems.healthy}</Text>
              </View>
              <View style={styles.matchmakingMetric}>
                <Text style={styles.matchmakingLabel}>Avg Match Time</Text>
                <Text style={[styles.matchmakingValue, { color: THEME.amber }]}>{SYSTEM_HEALTH_DATA.matchmakingSystems.avgMatchTime}s</Text>
              </View>
              <View style={styles.matchmakingMetric}>
                <Text style={styles.matchmakingLabel}>Success Rate</Text>
                <Text style={[styles.matchmakingValue, { color: THEME.electricPurple }]}>{SYSTEM_HEALTH_DATA.matchmakingSystems.successRate}%</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* AI Services */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Brain size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>AI Services</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.aiServicesCard}>
            <View style={styles.aiServicesGrid}>
              <View style={styles.aiServicesMetric}>
                <Text style={styles.aiServicesLabel}>Total</Text>
                <Text style={[styles.aiServicesValue, { color: THEME.neonCyan }]}>{SYSTEM_HEALTH_DATA.aiServices.total}</Text>
              </View>
              <View style={styles.aiServicesMetric}>
                <Text style={styles.aiServicesLabel}>Healthy</Text>
                <Text style={[styles.aiServicesValue, { color: THEME.neonGreen }]}>{SYSTEM_HEALTH_DATA.aiServices.healthy}</Text>
              </View>
              <View style={styles.aiServicesMetric}>
                <Text style={styles.aiServicesLabel}>Avg Response</Text>
                <Text style={[styles.aiServicesValue, { color: THEME.amber }]}>{SYSTEM_HEALTH_DATA.aiServices.avgResponseTime}ms</Text>
              </View>
              <View style={styles.aiServicesMetric}>
                <Text style={styles.aiServicesLabel}>Requests/s</Text>
                <Text style={[styles.aiServicesValue, { color: THEME.electricPurple }]}>{(SYSTEM_HEALTH_DATA.aiServices.requestsPerSecond / 1000).toFixed(0)}K</Text>
              </View>
            </View>
          </BlurView>
          <View style={styles.aiServicesContainer}>
            {AI_SERVICES.map((service) => renderAIServiceCard(service))}
          </View>
        </Animated.View>

        {/* Security Platforms */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Security Platforms</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.securityCard}>
            <View style={styles.securityGrid}>
              <View style={styles.securityMetric}>
                <Text style={styles.securityLabel}>Total</Text>
                <Text style={[styles.securityValue, { color: THEME.neonCyan }]}>{SYSTEM_HEALTH_DATA.securityPlatforms.total}</Text>
              </View>
              <View style={styles.securityMetric}>
                <Text style={styles.securityLabel}>Healthy</Text>
                <Text style={[styles.securityValue, { color: THEME.neonGreen }]}>{SYSTEM_HEALTH_DATA.securityPlatforms.healthy}</Text>
              </View>
              <View style={styles.securityMetric}>
                <Text style={styles.securityLabel}>Threats Blocked</Text>
                <Text style={[styles.securityValue, { color: THEME.red }]}>{(SYSTEM_HEALTH_DATA.securityPlatforms.threatsBlocked / 1000000).toFixed(1)}M</Text>
              </View>
              <View style={styles.securityMetric}>
                <Text style={styles.securityLabel}>False Positives</Text>
                <Text style={[styles.securityValue, { color: THEME.amber }]}>{SYSTEM_HEALTH_DATA.securityPlatforms.falsePositives}%</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Streaming Infrastructure */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Video size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Streaming Infrastructure</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.streamingCard}>
            <View style={styles.streamingGrid}>
              <View style={styles.streamingMetric}>
                <Text style={styles.streamingLabel}>Total</Text>
                <Text style={[styles.streamingValue, { color: THEME.neonCyan }]}>{SYSTEM_HEALTH_DATA.streamingInfrastructure.total}</Text>
              </View>
              <View style={styles.streamingMetric}>
                <Text style={styles.streamingLabel}>Healthy</Text>
                <Text style={[styles.streamingValue, { color: THEME.neonGreen }]}>{SYSTEM_HEALTH_DATA.streamingInfrastructure.healthy}</Text>
              </View>
              <View style={styles.streamingMetric}>
                <Text style={styles.streamingLabel}>Bandwidth</Text>
                <Text style={[styles.streamingValue, { color: THEME.electricPurple }]}>{(SYSTEM_HEALTH_DATA.streamingInfrastructure.bandwidth / 1000).toFixed(0)}Gbps</Text>
              </View>
              <View style={styles.streamingMetric}>
                <Text style={styles.streamingLabel}>Concurrent</Text>
                <Text style={[styles.streamingValue, { color: THEME.amber }]}>{(SYSTEM_HEALTH_DATA.streamingInfrastructure.concurrentStreams / 1000000).toFixed(1)}M</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* AI Insights */}
        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Brain size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>AI Insights</Text>
          </View>
          <View style={styles.insightsContainer}>
            {AI_INSIGHTS.map((insight) => renderInsightCard(insight))}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.text,
  },
  timeText: {
    fontSize: 12,
    color: THEME.textMuted,
    marginTop: 4,
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.text,
  },
  gameServersCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  gameServersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gameServersMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  gameServersLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  gameServersValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  serversContainer: {
    gap: 12,
  },
  serverCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  serverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serverRegion: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  serverStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  serverStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  serverDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serverDetail: {
    flex: 1,
  },
  serverDetailLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  serverDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.text,
  },
  matchmakingCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  matchmakingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  matchmakingMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  matchmakingLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  matchmakingValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  aiServicesCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  aiServicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  aiServicesMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  aiServicesLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  aiServicesValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  aiServicesContainer: {
    gap: 12,
  },
  aiServiceCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  aiServiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiServiceName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  aiServiceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  aiServiceStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  aiServiceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aiServiceDetail: {
    flex: 1,
  },
  aiServiceDetailLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  aiServiceDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.text,
  },
  securityCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  securityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  securityMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  securityLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  securityValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  streamingCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  streamingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  streamingMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  streamingLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  streamingValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.border,
  },
  insightCardBlur: {
    padding: 16,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightMeta: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 4,
  },
  insightImpact: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  insightImpactText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  insightMessage: {
    fontSize: 14,
    color: THEME.text,
    marginBottom: 12,
    lineHeight: 20,
  },
  insightAction: {
    backgroundColor: THEME.card,
    padding: 12,
    borderRadius: 8,
  },
  insightActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.textMuted,
    marginBottom: 4,
  },
  insightActionText: {
    fontSize: 13,
    color: THEME.text,
  },
});
