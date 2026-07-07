/**
 * =============================================================================
 * TOURNAMENT MANAGEMENT HUB
 * =============================================================================
 *
 * A comprehensive tournament management dashboard that handles registrations,
 * match scheduling, team participation, referee operations, and prize distribution.
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
  Trophy,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Shield,
  Target,
  Award,
  Plus,
  X,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Activity,
  BarChart3,
  FileText,
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

// Tournament Data
const TOURNAMENT_DATA = {
  registrations: {
    total: 2847,
    pending: 156,
    approved: 2691,
    rejected: 0,
  },
  matchScheduling: {
    scheduled: 847,
    inProgress: 24,
    completed: 512,
    pending: 311,
  },
  teamParticipation: {
    registered: 1847,
    active: 1567,
    disqualified: 12,
    withdrawn: 268,
  },
  refereeOperations: {
    active: 45,
    available: 23,
    onBreak: 8,
    total: 76,
  },
  prizeDistribution: {
    totalPool: 45000000,
    distributed: 12000000,
    pending: 33000000,
    teamsPaid: 127,
  },
};

// Tournament Registrations
const REGISTRATIONS = [
  { id: 1, team: 'Team Alpha', status: 'approved', date: '2024-01-15', region: 'North America', seed: 1 },
  { id: 2, team: 'Phoenix Gaming', status: 'approved', date: '2024-01-15', region: 'Europe', seed: 2 },
  { id: 3, team: 'Dragon Squad', status: 'approved', date: '2024-01-16', region: 'Asia Pacific', seed: 3 },
  { id: 4, team: 'Storm Riders', status: 'pending', date: '2024-01-17', region: 'North America', seed: 0 },
  { id: 5, team: 'Ice Warriors', status: 'pending', date: '2024-01-17', region: 'Europe', seed: 0 },
];

// Match Schedule
const MATCH_SCHEDULE = [
  { id: 1, team1: 'Team Alpha', team2: 'Phoenix Gaming', date: '2024-02-15', time: '14:00 UTC', status: 'scheduled', round: 'Quarter Finals' },
  { id: 2, team1: 'Dragon Squad', team2: 'Storm Riders', date: '2024-02-15', time: '16:00 UTC', status: 'scheduled', round: 'Quarter Finals' },
  { id: 3, team1: 'Ice Warriors', team2: 'Fire Nation', date: '2024-02-15', time: '18:00 UTC', status: 'inProgress', round: 'Quarter Finals' },
  { id: 4, team1: 'Shadow Clan', team2: 'Light Force', date: '2024-02-15', time: '20:00 UTC', status: 'completed', round: 'Quarter Finals' },
  { id: 5, team1: 'Water Tribe', team2: 'Earth Kingdom', date: '2024-02-16', time: '14:00 UTC', status: 'scheduled', round: 'Semi Finals' },
];

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'registration',
    title: 'Registration Trend',
    message: 'Registration rate 45% higher than previous tournament. Consider expanding capacity.',
    impact: 'High',
    action: 'Evaluate tournament bracket expansion',
  },
  {
    type: 'scheduling',
    title: 'Schedule Optimization',
    message: 'Peak viewer times identified: 18:00-22:00 UTC. Reschedule key matches accordingly.',
    impact: 'Medium',
    action: 'Adjust match schedule for maximum viewership',
  },
  {
    type: 'referee',
    title: 'Referee Allocation',
    message: 'Referee shortage expected during weekend peak. Recommend scheduling additional staff.',
    impact: 'Medium',
    action: 'Schedule backup referees for weekend matches',
  },
];

export default function TournamentManagementHub() {
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

  const renderRegistrationCard = (reg: typeof REGISTRATIONS[0]) => {
    const statusColors = {
      approved: THEME.neonGreen,
      pending: THEME.amber,
      rejected: THEME.red,
    };
    const statusColor = statusColors[reg.status as keyof typeof statusColors];

    return (
      <BlurView key={reg.id} intensity={20} tint="dark" style={styles.registrationCard}>
        <View style={styles.registrationHeader}>
          <Text style={styles.registrationTeam}>{reg.team}</Text>
          <View style={[styles.registrationStatus, { backgroundColor: statusColor + '30' }]}>
            <Text style={[styles.registrationStatusText, { color: statusColor }]}>{reg.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.registrationDetails}>
          <View style={styles.registrationDetail}>
            <Text style={styles.registrationDetailLabel}>Date</Text>
            <Text style={styles.registrationDetailValue}>{reg.date}</Text>
          </View>
          <View style={styles.registrationDetail}>
            <Text style={styles.registrationDetailLabel}>Region</Text>
            <Text style={[styles.registrationDetailValue, { color: THEME.electricPurple }]}>{reg.region}</Text>
          </View>
          <View style={styles.registrationDetail}>
            <Text style={styles.registrationDetailLabel}>Seed</Text>
            <Text style={[styles.registrationDetailValue, { color: reg.seed > 0 ? THEME.amber : THEME.textMuted }]}>{reg.seed > 0 ? `#${reg.seed}` : 'TBD'}</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderMatchCard = (match: typeof MATCH_SCHEDULE[0]) => {
    const statusColors = {
      scheduled: THEME.neonCyan,
      inProgress: THEME.red,
      completed: THEME.neonGreen,
      cancelled: THEME.red,
    };
    const statusColor = statusColors[match.status as keyof typeof statusColors];

    return (
      <BlurView key={match.id} intensity={20} tint="dark" style={styles.matchCard}>
        <View style={styles.matchHeader}>
          <View style={styles.matchTeams}>
            <Text style={styles.matchTeam}>{match.team1}</Text>
            <Text style={[styles.matchVs, { color: THEME.textMuted }]}>vs</Text>
            <Text style={styles.matchTeam}>{match.team2}</Text>
          </View>
          <View style={[styles.matchStatus, { backgroundColor: statusColor + '30' }]}>
            <Text style={[styles.matchStatusText, { color: statusColor }]}>{match.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.matchDetails}>
          <View style={styles.matchDetail}>
            <Text style={styles.matchDetailLabel}>Date</Text>
            <Text style={styles.matchDetailValue}>{match.date}</Text>
          </View>
          <View style={styles.matchDetail}>
            <Text style={styles.matchDetailLabel}>Time</Text>
            <Text style={[styles.matchDetailValue, { color: THEME.neonCyan }]}>{match.time}</Text>
          </View>
          <View style={styles.matchDetail}>
            <Text style={styles.matchDetailLabel}>Round</Text>
            <Text style={[styles.matchDetailValue, { color: THEME.amber }]}>{match.round}</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      registration: THEME.neonCyan,
      scheduling: THEME.amber,
      referee: THEME.electricPurple,
    };
    const typeIcons = {
      registration: Users,
      scheduling: Calendar,
      referee: Shield,
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
            <Trophy size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Tournament Management Hub</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Registrations */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Users size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Registrations</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.registrationsCard}>
            <View style={styles.registrationsGrid}>
              <View style={styles.registrationsMetric}>
                <Text style={styles.registrationsLabel}>Total</Text>
                <Text style={[styles.registrationsValue, { color: THEME.neonCyan }]}>{TOURNAMENT_DATA.registrations.total}</Text>
              </View>
              <View style={styles.registrationsMetric}>
                <Text style={styles.registrationsLabel}>Pending</Text>
                <Text style={[styles.registrationsValue, { color: THEME.amber }]}>{TOURNAMENT_DATA.registrations.pending}</Text>
              </View>
              <View style={styles.registrationsMetric}>
                <Text style={styles.registrationsLabel}>Approved</Text>
                <Text style={[styles.registrationsValue, { color: THEME.neonGreen }]}>{TOURNAMENT_DATA.registrations.approved}</Text>
              </View>
            </View>
          </BlurView>
          <View style={styles.registrationsContainer}>
            {REGISTRATIONS.map((reg) => renderRegistrationCard(reg))}
          </View>
        </Animated.View>

        {/* Match Scheduling */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calendar size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Match Scheduling</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.schedulingCard}>
            <View style={styles.schedulingGrid}>
              <View style={styles.schedulingMetric}>
                <Text style={styles.schedulingLabel}>Scheduled</Text>
                <Text style={[styles.schedulingValue, { color: THEME.neonCyan }]}>{TOURNAMENT_DATA.matchScheduling.scheduled}</Text>
              </View>
              <View style={styles.schedulingMetric}>
                <Text style={styles.schedulingLabel}>In Progress</Text>
                <Text style={[styles.schedulingValue, { color: THEME.red }]}>{TOURNAMENT_DATA.matchScheduling.inProgress}</Text>
              </View>
              <View style={styles.schedulingMetric}>
                <Text style={styles.schedulingLabel}>Completed</Text>
                <Text style={[styles.schedulingValue, { color: THEME.neonGreen }]}>{TOURNAMENT_DATA.matchScheduling.completed}</Text>
              </View>
              <View style={styles.schedulingMetric}>
                <Text style={styles.schedulingLabel}>Pending</Text>
                <Text style={[styles.schedulingValue, { color: THEME.amber }]}>{TOURNAMENT_DATA.matchScheduling.pending}</Text>
              </View>
            </View>
          </BlurView>
          <View style={styles.matchesContainer}>
            {MATCH_SCHEDULE.map((match) => renderMatchCard(match))}
          </View>
        </Animated.View>

        {/* Team Participation */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Team Participation</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.participationCard}>
            <View style={styles.participationGrid}>
              <View style={styles.participationMetric}>
                <Text style={styles.participationLabel}>Registered</Text>
                <Text style={[styles.participationValue, { color: THEME.neonCyan }]}>{TOURNAMENT_DATA.teamParticipation.registered}</Text>
              </View>
              <View style={styles.participationMetric}>
                <Text style={styles.participationLabel}>Active</Text>
                <Text style={[styles.participationValue, { color: THEME.neonGreen }]}>{TOURNAMENT_DATA.teamParticipation.active}</Text>
              </View>
              <View style={styles.participationMetric}>
                <Text style={styles.participationLabel}>Disqualified</Text>
                <Text style={[styles.participationValue, { color: THEME.red }]}>{TOURNAMENT_DATA.teamParticipation.disqualified}</Text>
              </View>
              <View style={styles.participationMetric}>
                <Text style={styles.participationLabel}>Withdrawn</Text>
                <Text style={[styles.participationValue, { color: THEME.amber }]}>{TOURNAMENT_DATA.teamParticipation.withdrawn}</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Referee Operations */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Referee Operations</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.refereeCard}>
            <View style={styles.refereeGrid}>
              <View style={styles.refereeMetric}>
                <Text style={styles.refereeLabel}>Active</Text>
                <Text style={[styles.refereeValue, { color: THEME.red }]}>{TOURNAMENT_DATA.refereeOperations.active}</Text>
              </View>.
              <View style={styles.refereeMetric}>
                <Text style={styles.refereeLabel}>Available</Text>
                <Text style={[styles.refereeValue, { color: THEME.neonGreen }]}>{TOURNAMENT_DATA.refereeOperations.available}</Text>
              </View>
              <View style={styles.refereeMetric}>
                <Text style={styles.refereeLabel}>On Break</Text>
                <Text style={[styles.refereeValue, { color: THEME.amber }]}>{TOURNAMENT_DATA.refereeOperations.onBreak}</Text>
              </View>
              <View style={styles.refereeMetric}>
                <Text style={styles.refereeLabel}>Total</Text>
                <Text style={[styles.refereeValue, { color: THEME.electricPurple }]}>{TOURNAMENT_DATA.refereeOperations.total}</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Prize Distribution */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <DollarSign size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Prize Distribution</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.prizeCard}>
            <View style={styles.prizeGrid}>
              <View style={styles.prizeMetric}>
                <Text style={styles.prizeLabel}>Total Pool</Text>
                <Text style={[styles.prizeValue, { color: THEME.neonCyan }]}>${(TOURNAMENT_DATA.prizeDistribution.totalPool / 1000000).toFixed(0)}M</Text>
              </View>
              <View style={styles.prizeMetric}>
                <Text style={styles.prizeLabel}>Distributed</Text>
                <Text style={[styles.prizeValue, { color: THEME.neonGreen }]}>${(TOURNAMENT_DATA.prizeDistribution.distributed / 1000000).toFixed(0)}M</Text>
              </View>
              <View style={styles.prizeMetric}>
                <Text style={styles.prizeLabel}>Pending</Text>
                <Text style={[styles.prizeValue, { color: THEME.amber }]}>${(TOURNAMENT_DATA.prizeDistribution.pending / 1000000).toFixed(0)}M</Text>
              </View>
              <View style={styles.prizeMetric}>
                <Text style={styles.prizeLabel}>Teams Paid</Text>
                <Text style={[styles.prizeValue, { color: THEME.electricPurple }]}>{TOURNAMENT_DATA.prizeDistribution.teamsPaid}</Text>
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
  registrationsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  registrationsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  registrationsMetric: {
    alignItems: 'center',
  },
  registrationsLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  registrationsValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  registrationsContainer: {
    gap: 12,
  },
  registrationCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  registrationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  registrationTeam: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  registrationStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  registrationStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  registrationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  registrationDetail: {
    flex: 1,
  },
  registrationDetailLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  registrationDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.text,
  },
  schedulingCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  schedulingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  schedulingMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  schedulingLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  schedulingValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  matchesContainer: {
    gap: 12,
  },
  matchCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  matchTeams: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  matchTeam: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.text,
    flex: 1,
    textAlign: 'center',
  },
  matchVs: {
    fontSize: 11,
    marginHorizontal: 8,
  },
  matchStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  matchDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  matchDetail: {
    flex: 1,
  },
  matchDetailLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  matchDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.text,
  },
  participationCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  participationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  participationMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  participationLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  participationValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  refereeCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  refereeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  refereeMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  refereeLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  refereeValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  prizeCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  prizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  prizeMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  prizeLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  prizeValue: {
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
