/**
 * =============================================================================
 * ANTI-CHEAT & SECURITY COMMAND CENTER
 * =============================================================================
 *
 * A comprehensive security dashboard that tracks cheating incidents,
 * fraud attempts, toxicity detection, account security, and suspicious activity.
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
  Shield,
  AlertTriangle,
  Lock,
  Eye,
  Ban,
  UserX,
  Activity,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Fingerprint,
  FileWarning,
  Zap,
  BarChart3,
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

// Security Data
const SECURITY_DATA = {
  cheatingIncidents: {
    detected: 1247,
    banned: 1189,
    pending: 58,
    trend: 'down',
  },
  fraudAttempts: {
    total: 456,
    blocked: 448,
    pending: 8,
    valueProtected: 2400000,
  },
  toxicityDetection: {
    totalReports: 8470,
    actioned: 7892,
    pending: 578,
    autoMuted: 4567,
  },
  accountSecurity: {
    compromised: 89,
    recovered: 78,
    pending: 11,
    twoFactorEnabled: 8470000,
  },
  suspiciousActivity: {
    flagged: 234,
    investigated: 198,
    confirmed: 36,
    falsePositive: 0,
  },
};

// Recent Incidents
const RECENT_INCIDENTS = [
  { id: 1, type: 'Aimbot', player: 'Player_X99', status: 'banned', date: '2 hours ago', severity: 'High' },
  { id: 2, type: 'Wallhack', player: 'Cheater123', status: 'banned', date: '4 hours ago', severity: 'High' },
  { id: 3, type: 'Speed Hack', player: 'FastRunner', status: 'pending', date: '6 hours ago', severity: 'Medium' },
  { id: 4, type: 'ESP', player: 'GhostPlayer', status: 'banned', date: '8 hours ago', severity: 'High' },
  { id: 5, type: 'Macro', player: 'AutoClicker', status: 'pending', date: '12 hours ago', severity: 'Low' },
];

// Fraud Attempts
const FRAUD_ATTEMPTS = [
  { id: 1, type: 'Payment Fraud', account: 'User_8472', status: 'blocked', date: '1 hour ago', amount: '$450' },
  { id: 2, type: 'Account Takeover', account: 'User_9921', status: 'blocked', date: '3 hours ago', amount: '$0' },
  { id: 3, type: 'Refund Abuse', account: 'User_1123', status: 'blocked', date: '5 hours ago', amount: '$120' },
  { id: 4, type: 'Currency Exploit', account: 'User_5567', status: 'pending', date: '8 hours ago', amount: '$2,400' },
  { id: 5, type: 'Bot Farming', account: 'User_8891', status: 'blocked', date: '12 hours ago', amount: '$0' },
];

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'cheating',
    title: 'Cheat Detection',
    message: 'New aimbot variant detected. Update detection signatures immediately.',
    impact: 'Critical',
    action: 'Deploy updated anti-cheat signatures',
  },
  {
    type: 'fraud',
    title: 'Fraud Pattern',
    message: 'Payment fraud increased 23% in Asia Pacific region. Implement additional verification.',
    impact: 'High',
    action: 'Enable enhanced verification for APAC region',
  },
  {
    type: 'toxicity',
    title: 'Toxicity Spike',
    message: 'Toxicity reports increased after ranked season launch. Monitor closely.',
    impact: 'Medium',
    action: 'Increase moderation coverage during peak hours',
  },
];

export default function AntiCheatSecurityCommandCenter() {
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

  const renderTrendIndicator = (trend: string) => {
    if (trend === 'up') {
      return <ArrowUpRight size={16} color={THEME.red} />;
    } else if (trend === 'down') {
      return <ArrowDownRight size={16} color={THEME.neonGreen} />;
    }
    return <View style={styles.trendNeutral} />;
  };

  const renderIncidentCard = (incident: typeof RECENT_INCIDENTS[0]) => {
    const statusColors = {
      banned: THEME.red,
      pending: THEME.amber,
      cleared: THEME.neonGreen,
    };
    const severityColors = {
      High: THEME.red,
      Medium: THEME.amber,
      Low: THEME.neonGreen,
    };
    const statusColor = statusColors[incident.status as keyof typeof statusColors];
    const severityColor = severityColors[incident.severity as keyof typeof severityColors];

    return (
      <BlurView key={incident.id} intensity={20} tint="dark" style={styles.incidentCard}>
        <View style={styles.incidentHeader}>
          <Text style={styles.incidentType}>{incident.type}</Text>
          <View style={[styles.incidentStatus, { backgroundColor: statusColor + '30' }]}>
            <Text style={[styles.incidentStatusText, { color: statusColor }]}>{incident.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.incidentDetails}>
          <View style={styles.incidentDetail}>
            <Text style={styles.incidentDetailLabel}>Player</Text>
            <Text style={styles.incidentDetailValue}>{incident.player}</Text>
          </View>
          <View style={styles.incidentDetail}>
            <Text style={styles.incidentDetailLabel}>Severity</Text>
            <Text style={[styles.incidentDetailValue, { color: severityColor }]}>{incident.severity}</Text>
          </View>
          <View style={styles.incidentDetail}>
            <Text style={styles.incidentDetailLabel}>Date</Text>
            <Text style={styles.incidentDetailValue}>{incident.date}</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderFraudCard = (fraud: typeof FRAUD_ATTEMPTS[0]) => {
    const statusColors = {
      blocked: THEME.neonGreen,
      pending: THEME.amber,
      confirmed: THEME.red,
    };
    const statusColor = statusColors[fraud.status as keyof typeof statusColors];

    return (
      <BlurView key={fraud.id} intensity={20} tint="dark" style={styles.fraudCard}>
        <View style={styles.fraudHeader}>
          <Text style={styles.fraudType}>{fraud.type}</Text>
          <View style={[styles.fraudStatus, { backgroundColor: statusColor + '30' }]}>
            <Text style={[styles.fraudStatusText, { color: statusColor }]}>{fraud.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.fraudDetails}>
          <View style={styles.fraudDetail}>
            <Text style={styles.fraudDetailLabel}>Account</Text>
            <Text style={styles.fraudDetailValue}>{fraud.account}</Text>
          </View>
          <View style={styles.fraudDetail}>
            <Text style={styles.fraudDetailLabel}>Amount</Text>
            <Text style={[styles.fraudDetailValue, { color: THEME.amber }]}>{fraud.amount}</Text>
          </View>
          <View style={styles.fraudDetail}>
            <Text style={styles.fraudDetailLabel}>Date</Text>
            <Text style={styles.fraudDetailValue}>{fraud.date}</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      cheating: THEME.red,
      fraud: THEME.amber,
      toxicity: THEME.magenta,
    };
    const typeIcons = {
      cheating: Ban,
      fraud: Lock,
      toxicity: FileWarning,
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
            <Shield size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Anti-Cheat & Security Command Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Cheating Incidents */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ban size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Cheating Incidents</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.cheatingCard}>
            <View style={styles.cheatingGrid}>
              <View style={styles.cheatingMetric}>
                <Text style={styles.cheatingLabel}>Detected</Text>
                <Text style={[styles.cheatingValue, { color: THEME.red }]}>{SECURITY_DATA.cheatingIncidents.detected}</Text>
              </View>
              <View style={styles.cheatingMetric}>
                <Text style={styles.cheatingLabel}>Banned</Text>
                <Text style={[styles.cheatingValue, { color: THEME.neonGreen }]}>{SECURITY_DATA.cheatingIncidents.banned}</Text>
              </View>
              <View style={styles.cheatingMetric}>
                <Text style={styles.cheatingLabel}>Pending</Text>
                <Text style={[styles.cheatingValue, { color: THEME.amber }]}>{SECURITY_DATA.cheatingIncidents.pending}</Text>
              </View>
              <View style={styles.cheatingMetric}>
                <Text style={styles.cheatingLabel}>Trend</Text>
                <View style={styles.cheatingTrend}>
                  {renderTrendIndicator(SECURITY_DATA.cheatingIncidents.trend)}
                </View>
              </View>
            </View>
          </BlurView>
          <View style={styles.incidentsContainer}>
            {RECENT_INCIDENTS.map((incident) => renderIncidentCard(incident))}
          </View>
        </Animated.View>

        {/* Fraud Attempts */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Lock size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Fraud Attempts</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.fraudOverviewCard}>
            <View style={styles.fraudOverviewGrid}>
              <View style={styles.fraudOverviewMetric}>
                <Text style={styles.fraudOverviewLabel}>Total</Text>
                <Text style={[styles.fraudOverviewValue, { color: THEME.red }]}>{SECURITY_DATA.fraudAttempts.total}</Text>
              </View>
              <View style={styles.fraudOverviewMetric}>
                <Text style={styles.fraudOverviewLabel}>Blocked</Text>
                <Text style={[styles.fraudOverviewValue, { color: THEME.neonGreen }]}>{SECURITY_DATA.fraudAttempts.blocked}</Text>
              </View>
              <View style={styles.fraudOverviewMetric}>
                <Text style={styles.fraudOverviewLabel}>Protected</Text>
                <Text style={[styles.fraudOverviewValue, { color: THEME.amber }]}>${(SECURITY_DATA.fraudAttempts.valueProtected / 1000000).toFixed(1)}M</Text>
              </View>
            </View>
          </BlurView>
          <View style={styles.fraudContainer}>
            {FRAUD_ATTEMPTS.map((fraud) => renderFraudCard(fraud))}
          </View>
        </Animated.View>

        {/* Toxicity Detection */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileWarning size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Toxicity Detection</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.toxicityCard}>
            <View style={styles.toxicityGrid}>
              <View style={styles.toxicityMetric}>
                <Text style={styles.toxicityLabel}>Total Reports</Text>
                <Text style={[styles.toxicityValue, { color: THEME.neonCyan }]}>{SECURITY_DATA.toxicityDetection.totalReports}</Text>
              </View>
              <View style={styles.toxicityMetric}>
                <Text style={styles.toxicityLabel}>Actioned</Text>
                <Text style={[styles.toxicityValue, { color: THEME.neonGreen }]}>{SECURITY_DATA.toxicityDetection.actioned}</Text>
              </View>
              <View style={styles.toxicityMetric}>
                <Text style={styles.toxicityLabel}>Pending</Text>
                <Text style={[styles.toxicityValue, { color: THEME.amber }]}>{SECURITY_DATA.toxicityDetection.pending}</Text>
              </View>
              <View style={styles.toxicityMetric}>
                <Text style={styles.toxicityLabel}>Auto-Muted</Text>
                <Text style={[styles.toxicityValue, { color: THEME.electricPurple }]}>{SECURITY_DATA.toxicityDetection.autoMuted}</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Account Security */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Fingerprint size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Account Security</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.securityCard}>
            <View style={styles.securityGrid}>
              <View style={styles.securityMetric}>
                <Text style={styles.securityLabel}>Compromised</Text>
                <Text style={[styles.securityValue, { color: THEME.red }]}>{SECURITY_DATA.accountSecurity.compromised}</Text>
              </View>
              <View style={styles.securityMetric}>
                <Text style={styles.securityLabel}>Recovered</Text>
                <Text style={[styles.securityValue, { color: THEME.neonGreen }]}>{SECURITY_DATA.accountSecurity.recovered}</Text>
              </View>
              <View style={styles.securityMetric}>
                <Text style={styles.securityLabel}>Pending</Text>
                <Text style={[styles.securityValue, { color: THEME.amber }]}>{SECURITY_DATA.accountSecurity.pending}</Text>
              </View>
              <View style={styles.securityMetric}>
                <Text style={styles.securityLabel}>2FA Enabled</Text>
                <Text style={[styles.securityValue, { color: THEME.electricPurple }]}>{(SECURITY_DATA.accountSecurity.twoFactorEnabled / 1000000).toFixed(1)}M</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Suspicious Activity */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Eye size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Suspicious Activity</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.suspiciousCard}>
            <View style={styles.suspiciousGrid}>
              <View style={styles.suspiciousMetric}>
                <Text style={styles.suspiciousLabel}>Flagged</Text>
                <Text style={[styles.suspiciousValue, { color: THEME.amber }]}>{SECURITY_DATA.suspiciousActivity.flagged}</Text>
              </View>
              <View style={styles.suspiciousMetric}>
                <Text style={styles.suspiciousLabel}>Investigated</Text>
                <Text style={[styles.suspiciousValue, { color: THEME.neonCyan }]}>{SECURITY_DATA.suspiciousActivity.investigated}</Text>
              </View>
              <View style={styles.suspiciousMetric}>
                <Text style={styles.suspiciousLabel}>Confirmed</Text>
                <Text style={[styles.suspiciousValue, { color: THEME.red }]}>{SECURITY_DATA.suspiciousActivity.confirmed}</Text>
              </View>
              <View style={styles.suspiciousMetric}>
                <Text style={styles.suspiciousLabel}>False Positive</Text>
                <Text style={[styles.suspiciousValue, { color: THEME.neonGreen }]}>{SECURITY_DATA.suspiciousActivity.falsePositive}</Text>
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
  cheatingCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  cheatingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  cheatingMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  cheatingLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  cheatingValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  cheatingTrend: {
    marginTop: 4,
  },
  incidentsContainer: {
    gap: 12,
  },
  incidentCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  incidentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  incidentType: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  incidentStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  incidentStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  incidentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  incidentDetail: {
    flex: 1,
  },
  incidentDetailLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  incidentDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.text,
  },
  fraudOverviewCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  fraudOverviewGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  fraudOverviewMetric: {
    alignItems: 'center',
  },
  fraudOverviewLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  fraudOverviewValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  fraudContainer: {
    gap: 12,
  },
  fraudCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  fraudHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  fraudType: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  fraudStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  fraudStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  fraudDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fraudDetail: {
    flex: 1,
  },
  fraudDetailLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  fraudDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.text,
  },
  toxicityCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  toxicityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  toxicityMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  toxicityLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  toxicityValue: {
    fontSize: 20,
    fontWeight: '700',
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
  suspiciousCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  suspiciousGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  suspiciousMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  suspiciousLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  suspiciousValue: {
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
  trendNeutral: {
    width: 16,
    height: 16,
  },
});
