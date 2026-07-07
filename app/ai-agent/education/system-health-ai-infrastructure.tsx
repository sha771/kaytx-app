/**
 * =============================================================================
 * SYSTEM HEALTH & AI INFRASTRUCTURE
 * =============================================================================
 *
 * A comprehensive system health dashboard that monitors AI infrastructure,
 * system performance, service availability, resource utilization, and operational
 * metrics with real-time alerts and optimization recommendations.
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
  TrendingUp,
  Activity,
  Zap,
  Clock,
  Target,
  Award,
  LineChart,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Flame,
  Shield,
  Cpu,
  HardDrive,
  Wifi,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Line, Rect } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Theme Colors
const THEME = {
  background: '#03050A',
  card: '#0A0F1E',
  cardLight: '#121829',
  neonCyan: '#00F0FF',
  electricBlue: '#3B82F6',
  emeraldGreen: '#10B981',
  purple: '#8B5CF6',
  amber: '#F59E0B',
  red: '#EF4444',
  magenta: '#EC4899',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  border: '#1E293B',
};

// System Health Data
const SYSTEM_HEALTH = {
  overallHealth: 98,
  uptime: '99.9%',
  responseTime: '45ms',
  errorRate: '0.01%',
  activeConnections: '24.7K',
  trend: [97, 97, 98, 98, 98, 98],
};

// AI Infrastructure Metrics
const AI_INFRASTRUCTURE = {
  modelAccuracy: 94,
  inferenceTime: '120ms',
  gpuUtilization: 78,
  memoryUsage: '64GB',
  apiRequests: '8.7M/day',
  modelVersions: 24,
};

// Service Status
const SERVICE_STATUS = [
  { name: 'AI Tutor Service', status: 'operational', uptime: '99.9%', latency: '45ms' },
  { name: 'Learning Analytics', status: 'operational', uptime: '99.8%', latency: '52ms' },
  { name: 'Assessment Engine', status: 'operational', uptime: '99.9%', latency: '38ms' },
  { name: 'Career Services', status: 'operational', uptime: '99.7%', latency: '67ms' },
  { name: 'Research Platform', status: 'degraded', uptime: '98.5%', latency: '120ms' },
  { name: 'Admissions System', status: 'operational', uptime: '99.9%', latency: '42ms' },
];

// Resource Utilization
const RESOURCE_UTILIZATION = {
  cpu: 67,
  memory: 72,
  storage: 45,
  network: 58,
  gpu: 78,
};

// Recent Alerts
const RECENT_ALERTS = [
  { id: 1, type: 'warning', message: 'High GPU utilization detected', time: '5 min ago', service: 'AI Tutor' },
  { id: 2, type: 'info', message: 'Scheduled maintenance completed', time: '15 min ago', service: 'System' },
  { id: 3, type: 'error', message: 'Research Platform experiencing latency', time: '30 min ago', service: 'Research' },
  { id: 4, type: 'success', message: 'Model deployment successful', time: '45 min ago', service: 'AI Infrastructure' },
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

  const renderTrendIndicator = (change: number, trend: string) => {
    if (trend === 'up') {
      return (
        <View style={styles.trendUp}>
          <ArrowUpRight size={12} color={THEME.emeraldGreen} />
          <Text style={[styles.trendText, { color: THEME.emeraldGreen }]}>{change}%</Text>
        </View>
      );
    } else if (trend === 'down') {
      return (
        <View style={styles.trendDown}>
          <ArrowDownRight size={12} color={THEME.red} />
          <Text style={[styles.trendText, { color: THEME.red }]}>{change}%</Text>
        </View>
      );
    }
    return null;
  };

  const renderSparkline = (data: number[], color: string) => {
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const range = maxVal - minVal || 1;
    const chartWidth = 100;
    const chartHeight = 40;

    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * chartWidth;
      const y = chartHeight - ((val - minVal) / range) * chartHeight;
      return `${x},${y}`;
    }).join(' ');

    return (
      <Svg width={chartWidth} height={chartHeight}>
        <Defs>
          <LinearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color} stopOpacity="0.3" />
            <Stop offset="1" stopColor={color} stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Path
          d={`M 0,${chartHeight} L ${points} L ${chartWidth},${chartHeight} Z`}
          fill={`url(#gradient-${color})`}
        />
        <Path
          d={`M ${points}`}
          stroke={color}
          strokeWidth={2}
          fill="none"
        />
      </Svg>
    );
  };

  const renderMetricCard = (title: string, value: string, color: string, subtitle?: string) => (
    <BlurView intensity={20} tint="dark" style={styles.metricCard}>
      <Text style={styles.metricLabel}>{title}</Text>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.metricSubtitle}>{subtitle}</Text>}
    </BlurView>
  );

  const renderServiceCard = (service: typeof SERVICE_STATUS[0]) => {
    const statusColors = {
      operational: THEME.emeraldGreen,
      degraded: THEME.amber,
      down: THEME.red,
    };
    const statusIcons = {
      operational: CheckCircle,
      degraded: AlertTriangle,
      down: XCircle,
    };
    const Icon = statusIcons[service.status as keyof typeof statusIcons];
    const color = statusColors[service.status as keyof typeof statusColors];

    return (
      <BlurView key={service.name} intensity={20} tint="dark" style={styles.serviceCard}>
        <View style={styles.serviceHeader}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Icon size={16} color={color} />
        </View>
        <View style={styles.serviceMetrics}>
          <View style={styles.serviceMetric}>
            <Text style={styles.serviceMetricLabel}>Uptime</Text>
            <Text style={[styles.serviceMetricValue, { color }]}>{service.uptime}</Text>
          </View>
          <View style={styles.serviceMetric}>
            <Text style={styles.serviceMetricLabel}>Latency</Text>
            <Text style={[styles.serviceMetricValue, { color: THEME.neonCyan }]}>{service.latency}</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderResourceCard = (label: string, value: number, icon: any, color: string) => (
    <BlurView key={label} intensity={20} tint="dark" style={styles.resourceCard}>
      <View style={[styles.resourceIcon, { backgroundColor: color + '20' }]}>
        <icon size={24} color={color} />
      </View>
      <Text style={styles.resourceLabel}>{label}</Text>
      <Text style={[styles.resourceValue, { color }]}>{value}%</Text>
      <View style={styles.resourceBar}>
        <View style={[styles.resourceBarFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
    </BlurView>
  );

  const renderAlertCard = (alert: typeof RECENT_ALERTS[0]) => {
    const typeColors = {
      warning: THEME.amber,
      info: THEME.neonCyan,
      error: THEME.red,
      success: THEME.emeraldGreen,
    };
    const typeIcons = {
      warning: AlertTriangle,
      info: Activity,
      error: XCircle,
      success: CheckCircle,
    };
    const Icon = typeIcons[alert.type as keyof typeof typeIcons];
    const color = typeColors[alert.type as keyof typeof typeColors];

    return (
      <Animated.View entering={FadeInUp.springify()} style={styles.alertCard}>
        <BlurView intensity={20} tint="dark" style={styles.alertCardBlur}>
          <View style={styles.alertHeader}>
            <View style={[styles.alertIcon, { backgroundColor: color + '20' }]}>
              <Icon size={20} color={color} />
            </View>
            <View style={styles.alertMeta}>
              <Text style={styles.alertMessage}>{alert.message}</Text>
              <View style={styles.alertDetails}>
                <Text style={styles.alertService}>{alert.service}</Text>
                <Text style={styles.alertTime}>{alert.time}</Text>
              </View>
            </View>
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
            <Server size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>System Health & AI Infrastructure</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* System Health Metrics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>System Health</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
            <View style={styles.metricsContainer}>
              {renderMetricCard('Overall Health', `${SYSTEM_HEALTH.overallHealth}%`, THEME.emeraldGreen, 'System status')}
              {renderMetricCard('Uptime', SYSTEM_HEALTH.uptime, THEME.neonCyan, 'Last 30 days')}
              {renderMetricCard('Response Time', SYSTEM_HEALTH.responseTime, THEME.electricBlue, 'Avg latency')}
              {renderMetricCard('Error Rate', SYSTEM_HEALTH.errorRate, THEME.purple, 'System errors')}
              {renderMetricCard('Connections', SYSTEM_HEALTH.activeConnections, THEME.amber, 'Active users')}
            </View>
          </ScrollView>
        </Animated.View>

        {/* AI Infrastructure */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Brain size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>AI Infrastructure</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.aiInfraCard}>
            <View style={styles.aiInfraGrid}>
              {renderMetricCard('Model Accuracy', `${AI_INFRASTRUCTURE.modelAccuracy}%`, THEME.emeraldGreen)}
              {renderMetricCard('Inference Time', AI_INFRASTRUCTURE.inferenceTime, THEME.neonCyan)}
              {renderMetricCard('GPU Utilization', `${AI_INFRASTRUCTURE.gpuUtilization}%`, THEME.electricBlue)}
              {renderMetricCard('Memory Usage', AI_INFRASTRUCTURE.memoryUsage, THEME.purple)}
              {renderMetricCard('API Requests', AI_INFRASTRUCTURE.apiRequests, THEME.amber)}
              {renderMetricCard('Model Versions', AI_INFRASTRUCTURE.modelVersions.toString(), THEME.magenta)}
            </View>
          </BlurView>
        </Animated.View>

        {/* Service Status */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Wifi size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Service Status</Text>
          </View>
          <View style={styles.servicesContainer}>
            {SERVICE_STATUS.map((service) => renderServiceCard(service))}
          </View>
        </Animated.View>

        {/* Resource Utilization */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Cpu size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Resource Utilization</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.resourcesCard}>
            <View style={styles.resourcesGrid}>
              {renderResourceCard('CPU', RESOURCE_UTILIZATION.cpu, Cpu, THEME.neonCyan)}
              {renderResourceCard('Memory', RESOURCE_UTILIZATION.memory, HardDrive, THEME.electricBlue)}
              {renderResourceCard('Storage', RESOURCE_UTILIZATION.storage, HardDrive, THEME.purple)}
              {renderResourceCard('Network', RESOURCE_UTILIZATION.network, Wifi, THEME.emeraldGreen)}
              {renderResourceCard('GPU', RESOURCE_UTILIZATION.gpu, Zap, THEME.amber)}
            </View>
          </BlurView>
        </Animated.View>

        {/* Recent Alerts */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Recent Alerts</Text>
          </View>
          <View style={styles.alertsContainer}>
            {RECENT_ALERTS.map((alert) => renderAlertCard(alert))}
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
  metricsScroll: {
    marginBottom: 0,
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  metricCard: {
    width: 140,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  metricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricSubtitle: {
    fontSize: 11,
    color: THEME.textMuted,
  },
  aiInfraCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  aiInfraGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  servicesContainer: {
    gap: 12,
  },
  serviceCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  serviceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceMetric: {
    alignItems: 'center',
  },
  serviceMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  serviceMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  resourcesCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  resourceCard: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
    alignItems: 'center',
  },
  resourceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  resourceLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  resourceValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  resourceBar: {
    width: '100%',
    height: 4,
    backgroundColor: THEME.cardLight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  resourceBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  alertsContainer: {
    gap: 12,
  },
  alertCard: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.border,
  },
  alertCardBlur: {
    padding: 16,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  alertMeta: {
    flex: 1,
  },
  alertMessage: {
    fontSize: 14,
    fontWeight: '500',
    color: THEME.text,
    marginBottom: 4,
  },
  alertDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alertService: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  alertTime: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  trendUp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendDown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
