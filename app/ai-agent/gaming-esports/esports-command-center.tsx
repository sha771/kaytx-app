/**
 * =============================================================================
 * ESPORTS COMMAND CENTER
 * =============================================================================
 *
 * A comprehensive esports dashboard that displays active leagues,
 * live matches, tournament status, team rankings, and viewer metrics.
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
  Activity,
  TrendingUp,
  Globe,
  Clock,
  Play,
  Pause,
  Award,
  Target,
  Swords,
  Star,
  Crown,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Flame,
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

// Esports Data
const ESPORTS_DATA = {
  activeLeagues: 8,
  liveMatches: 24,
  tournamentStatus: 'Active',
  teamParticipation: 1847,
  viewerMetrics: 210000000,
  prizePool: 45000000,
  regions: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'],
};

// Active Leagues
const ACTIVE_LEAGUES = [
  { id: 1, name: 'World Championship', status: 'live', teams: 32, prizePool: '$15M', viewers: '18.5M', region: 'Global' },
  { id: 2, name: 'Pro League Season 7', status: 'live', teams: 16, prizePool: '$5M', viewers: '4.2M', region: 'North America' },
  { id: 3, name: 'European Masters', status: 'live', teams: 24, prizePool: '$3M', viewers: '2.8M', region: 'Europe' },
  { id: 4, name: 'Asia Pacific Cup', status: 'scheduled', teams: 20, prizePool: '$4M', viewers: '0', region: 'Asia Pacific' },
  { id: 5, name: 'LATAM Championship', status: 'scheduled', teams: 12, prizePool: '$1.5M', viewers: '0', region: 'Latin America' },
];

// Live Matches
const LIVE_MATCHES = [
  { id: 1, team1: 'Team Alpha', team2: 'Team Bravo', score: '2-1', status: 'live', viewers: '2.4M', game: 'Game 4' },
  { id: 2, team1: 'Phoenix Gaming', team2: 'Dragon Squad', score: '1-1', status: 'live', viewers: '1.8M', game: 'Game 3' },
  { id: 3, team1: 'Storm Riders', team2: 'Ice Warriors', score: '0-0', status: 'live', viewers: '1.2M', game: 'Game 1' },
  { id: 4, team1: 'Shadow Clan', team2: 'Light Force', score: '3-2', status: 'finished', viewers: '890K', game: 'Final' },
  { id: 5, team1: 'Fire Nation', team2: 'Water Tribe', score: '0-0', status: 'scheduled', viewers: '0', game: 'Game 1' },
];

// Team Rankings
const TEAM_RANKINGS = [
  { id: 1, rank: 1, name: 'Team Alpha', wins: 45, losses: 5, points: 1350, region: 'North America', trend: 'up' },
  { id: 2, rank: 2, name: 'Phoenix Gaming', wins: 42, losses: 8, points: 1260, region: 'Europe', trend: 'up' },
  { id: 3, rank: 3, name: 'Dragon Squad', wins: 40, losses: 10, points: 1200, region: 'Asia Pacific', trend: 'same' },
  { id: 4, rank: 4, name: 'Storm Riders', wins: 38, losses: 12, points: 1140, region: 'North America', trend: 'down' },
  { id: 5, rank: 5, name: 'Ice Warriors', wins: 36, losses: 14, points: 1080, region: 'Europe', trend: 'up' },
];

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'match',
    title: 'Match Prediction',
    message: 'Team Alpha has 78% probability of winning current series based on historical performance.',
    impact: 'High',
    action: 'Update betting odds and viewer engagement',
  },
  {
    type: 'viewer',
    title: 'Viewer Engagement',
    message: 'European finals projected to exceed 5M concurrent viewers - 45% above average.',
    impact: 'Positive',
    action: 'Prepare infrastructure scaling',
  },
  {
    type: 'team',
    title: 'Team Performance',
    message: 'Phoenix Gaming showing 67% improvement in recent matches. Monitor for potential upset.',
    impact: 'Medium',
    action: 'Increase coverage and analysis',
  },
];

export default function EsportsCommandCenter() {
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
      return <ArrowUpRight size={16} color={THEME.neonGreen} />;
    } else if (trend === 'down') {
      return <ArrowDownRight size={16} color={THEME.red} />;
    }
    return <View style={styles.trendNeutral} />;
  };

  const renderLeagueCard = (league: typeof ACTIVE_LEAGUES[0]) => {
    const statusColors = {
      live: THEME.neonGreen,
      scheduled: THEME.amber,
      ended: THEME.textMuted,
    };
    const statusColor = statusColors[league.status as keyof typeof statusColors];

    return (
      <BlurView key={league.id} intensity={20} tint="dark" style={styles.leagueCard}>
        <View style={styles.leagueHeader}>
          <Text style={styles.leagueName}>{league.name}</Text>
          <View style={[styles.leagueStatus, { backgroundColor: statusColor + '30' }]}>
            <View style={[styles.leagueStatusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.leagueStatusText, { color: statusColor }]}>{league.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.leagueMetrics}>
          <View style={styles.leagueMetric}>
            <Text style={styles.leagueMetricLabel}>Teams</Text>
            <Text style={[styles.leagueMetricValue, { color: THEME.neonCyan }]}>{league.teams}</Text>
          </View>
          <View style={styles.leagueMetric}>
            <Text style={styles.leagueMetricLabel}>Prize Pool</Text>
            <Text style={[styles.leagueMetricValue, { color: THEME.neonGreen }]}>{league.prizePool}</Text>
          </View>
          <View style={styles.leagueMetric}>
            <Text style={styles.leagueMetricLabel}>Viewers</Text>
            <Text style={[styles.leagueMetricValue, { color: THEME.electricPurple }]}>{league.viewers}</Text>
          </View>
          <View style={styles.leagueMetric}>
            <Text style={styles.leagueMetricLabel}>Region</Text>
            <Text style={[styles.leagueMetricValue, { color: THEME.amber }]}>{league.region}</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderMatchCard = (match: typeof LIVE_MATCHES[0]) => {
    const statusColors = {
      live: THEME.red,
      finished: THEME.neonGreen,
      scheduled: THEME.amber,
    };
    const statusColor = statusColors[match.status as keyof typeof statusColors];

    return (
      <BlurView key={match.id} intensity={20} tint="dark" style={styles.matchCard}>
        <View style={styles.matchHeader}>
          <View style={styles.matchTeams}>
            <Text style={styles.matchTeam}>{match.team1}</Text>
            <Text style={[styles.matchScore, { color: THEME.neonCyan }]}>{match.score}</Text>
            <Text style={styles.matchTeam}>{match.team2}</Text>
          </View>
          <View style={[styles.matchStatus, { backgroundColor: statusColor + '30' }]}>
            <Text style={[styles.matchStatusText, { color: statusColor }]}>{match.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.matchDetails}>
          <View style={styles.matchDetail}>
            <Text style={styles.matchDetailLabel}>Game</Text>
            <Text style={styles.matchDetailValue}>{match.game}</Text>
          </View>
          <View style={styles.matchDetail}>
            <Text style={styles.matchDetailLabel}>Viewers</Text>
            <Text style={[styles.matchDetailValue, { color: THEME.electricPurple }]}>{match.viewers}</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderRankingCard = (team: typeof TEAM_RANKINGS[0]) => (
    <BlurView key={team.id} intensity={20} tint="dark" style={styles.rankingCard}>
      <View style={styles.rankingHeader}>
        <View style={[styles.rankingRank, { backgroundColor: team.rank <= 3 ? THEME.amber + '30' : THEME.cardLight }]}>
          <Text style={[styles.rankingRankText, { color: team.rank <= 3 ? THEME.amber : THEME.text }]}>{team.rank}</Text>
        </View>
        <Text style={styles.rankingName}>{team.name}</Text>
        {renderTrendIndicator(team.trend)}
      </View>
      <View style={styles.rankingMetrics}>
        <View style={styles.rankingMetric}>
          <Text style={styles.rankingMetricLabel}>W-L</Text>
          <Text style={[styles.rankingMetricValue, { color: THEME.neonGreen }]}>{team.wins}-{team.losses}</Text>
        </View>
        <View style={styles.rankingMetric}>
          <Text style={styles.rankingMetricLabel}>Points</Text>
          <Text style={[styles.rankingMetricValue, { color: THEME.neonCyan }]}>{team.points}</Text>
        </View>
        <View style={styles.rankingMetric}>
          <Text style={styles.rankingMetricLabel}>Region</Text>
          <Text style={[styles.rankingMetricValue, { color: THEME.electricPurple }]}>{team.region}</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      match: THEME.neonCyan,
      viewer: THEME.neonGreen,
      team: THEME.amber,
    };
    const typeIcons = {
      match: Swords,
      viewer: Users,
      team: Crown,
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
            <Text style={styles.headerText}>Esports Command Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Overview Stats */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Overview</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.overviewCard}>
            <View style={styles.overviewGrid}>
              <View style={styles.overviewMetric}>
                <Text style={styles.overviewLabel}>Active Leagues</Text>
                <Text style={[styles.overviewValue, { color: THEME.neonCyan }]}>{ESPORTS_DATA.activeLeagues}</Text>
              </View>
              <View style={styles.overviewMetric}>
                <Text style={styles.overviewLabel}>Live Matches</Text>
                <Text style={[styles.overviewValue, { color: THEME.red }]}>{ESPORTS_DATA.liveMatches}</Text>
              </View>
              <View style={styles.overviewMetric}>
                <Text style={styles.overviewLabel}>Teams</Text>
                <Text style={[styles.overviewValue, { color: THEME.electricPurple }]}>{ESPORTS_DATA.teamParticipation}</Text>
              </View>
              <View style={styles.overviewMetric}>
                <Text style={styles.overviewLabel}>Monthly Viewers</Text>
                <Text style={[styles.overviewValue, { color: THEME.amber }]}>{(ESPORTS_DATA.viewerMetrics / 1000000).toFixed(0)}M</Text>
              </View>
              <View style={styles.overviewMetric}>
                <Text style={styles.overviewLabel}>Total Prize Pool</Text>
                <Text style={[styles.overviewValue, { color: THEME.neonGreen }]}>${(ESPORTS_DATA.prizePool / 1000000).toFixed(0)}M</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Active Leagues */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Globe size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Active Leagues</Text>
          </View>
          <View style={styles.leaguesContainer}>
            {ACTIVE_LEAGUES.map((league) => renderLeagueCard(league))}
          </View>
        </Animated.View>

        {/* Live Matches */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Play size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Live Matches</Text>
          </View>
          <View style={styles.matchesContainer}>
            {LIVE_MATCHES.map((match) => renderMatchCard(match))}
          </View>
        </Animated.View>

        {/* Team Rankings */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Star size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Team Rankings</Text>
          </View>
          <View style={styles.rankingsContainer}>
            {TEAM_RANKINGS.map((team) => renderRankingCard(team))}
          </View>
        </Animated.View>

        {/* AI Insights */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
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
  overviewCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  overviewMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  overviewLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  overviewValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  leaguesContainer: {
    gap: 12,
  },
  leagueCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  leagueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leagueName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  leagueStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  leagueStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  leagueStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  leagueMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leagueMetric: {
    alignItems: 'center',
  },
  leagueMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  leagueMetricValue: {
    fontSize: 13,
    fontWeight: '600',
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
  matchScore: {
    fontSize: 16,
    fontWeight: '700',
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
  rankingsContainer: {
    gap: 12,
  },
  rankingCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  rankingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rankingRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankingRankText: {
    fontSize: 14,
    fontWeight: '700',
  },
  rankingName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  rankingMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rankingMetric: {
    alignItems: 'center',
  },
  rankingMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  rankingMetricValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  trendNeutral: {
    width: 16,
    height: 16,
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
