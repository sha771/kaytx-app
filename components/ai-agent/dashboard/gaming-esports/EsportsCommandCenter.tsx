import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { 
  Trophy, 
  Users, 
  Eye, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Award, 
  Target, 
  Activity, 
  Globe, 
  BarChart3, 
  Flame, 
  Crown, 
  Medal, 
  Star, 
  Flag, 
  Clock, 
  Play, 
  Pause, 
  Zap, 
  Shield, 
  Sword, 
  Radio, 
  Video, 
  MessageSquare, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Timer, 
  GitBranch, 
  Layers, 
  Settings, 
  Bell, 
  Crown as CrownIcon
} from 'lucide-react-native';

interface EsportsCommandCenterProps {
  data?: any;
}

export default function EsportsCommandCenter({ data }: EsportsCommandCenterProps) {
  // Active Leagues
  const activeLeagues = [
    { name: 'World Championship', status: 'live', teams: 24, prize: '$5M', viewers: '2.1M', region: 'Global' },
    { name: 'Regional League NA', status: 'active', teams: 16, prize: '$1.2M', viewers: '450K', region: 'North America' },
    { name: 'Regional League EU', status: 'active', teams: 18, prize: '$1.5M', viewers: '620K', region: 'Europe' },
    { name: 'Regional League APAC', status: 'active', teams: 20, prize: '$1.8M', viewers: '890K', region: 'Asia Pacific' }
  ];

  // Live Matches
  const liveMatches = [
    { 
      id: 1, 
      teamA: 'Team Alpha', 
      teamB: 'Team Beta', 
      score: '2-1', 
      viewers: '847K', 
      game: 'Game 4', 
      status: 'live',
      tournament: 'World Championship'
    },
    { 
      id: 2, 
      teamA: 'Gamma Gaming', 
      teamB: 'Delta Force', 
      score: '1-1', 
      viewers: '234K', 
      game: 'Game 3', 
      status: 'live',
      tournament: 'Regional League NA'
    },
    { 
      id: 3, 
      teamA: 'Epsilon Esports', 
      teamB: 'Zeta Squad', 
      score: '0-0', 
      viewers: '156K', 
      game: 'Game 1', 
      status: 'live',
      tournament: 'Regional League EU'
    }
  ];

  // Tournament Status
  const tournamentStatus = {
    totalTournaments: 24,
    activeTournaments: 8,
    completedToday: 12,
    upcoming: 4,
    totalPrizePool: '$12.4M',
    averageViewership: '1.2M'
  };

  // Team Rankings
  const teamRankings = [
    { rank: 1, name: 'Team Alpha', points: 2847, wins: 45, losses: 8, region: 'Global', change: 'up' },
    { rank: 2, name: 'Omega Gaming', points: 2654, wins: 42, losses: 11, region: 'Europe', change: 'up' },
    { rank: 3, name: 'Beta Squad', points: 2512, wins: 40, losses: 13, region: 'North America', change: 'stable' },
    { rank: 4, name: 'Gamma Esports', points: 2389, wins: 38, losses: 15, region: 'Asia Pacific', change: 'down' },
    { rank: 5, name: 'Delta Force', points: 2245, wins: 36, losses: 17, region: 'Europe', change: 'up' }
  ];

  // Viewer Metrics
  const viewerMetrics = [
    { label: 'Live Viewers', value: '2.1M', change: '+18%', trend: 'up' as const, color: '#EF4444' },
    { label: 'Peak Concurrent', value: '3.4M', change: '+22%', trend: 'up' as const, color: '#F59E0B' },
    { label: 'Avg Watch Time', value: '2h 15m', change: '+8%', trend: 'up' as const, color: '#10B981' },
    { label: 'Total Hours', value: '847M', change: '+15%', trend: 'up' as const, color: '#A855F7' }
  ];

  const renderLeagueCard = (league: any, index: number) => {
    const statusColors = {
      live: '#EF4444',
      active: '#10B981',
      upcoming: '#F59E0B'
    };
    const color = statusColors[league.status as keyof typeof statusColors];

    return (
      <View key={index} style={[styles.leagueCard, { backgroundColor: `${color}10`, borderColor: `${color}30` }]}>
        <View style={styles.leagueHeader}>
          <View style={[styles.leagueStatus, { backgroundColor: `${color}20` }]}>
            {league.status === 'live' && <Radio size={16} color={color} />}
            {league.status === 'active' && <Activity size={16} color={color} />}
            {league.status === 'upcoming' && <Clock size={16} color={color} />}
            <Text style={[styles.leagueStatusText, { color }]}>{league.status.toUpperCase()}</Text>
          </View>
          <MapPin size={16} color="rgba(255, 255, 255, 0.5)" />
          <Text style={[styles.leagueRegion, { color: 'rgba(255, 255, 255, 0.6)' }]}>{league.region}</Text>
        </View>

        <Text style={[styles.leagueName, { color: '#FFFFFF' }]}>{league.name}</Text>

        <View style={styles.leagueMetrics}>
          <View style={styles.leagueMetric}>
            <Users size={14} color="rgba(255, 255, 255, 0.5)" />
            <Text style={[styles.leagueMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{league.teams} teams</Text>
          </View>
          <View style={styles.leagueMetric}>
            <Trophy size={14} color="rgba(255, 255, 255, 0.5)" />
            <Text style={[styles.leagueMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{league.prize}</Text>
          </View>
          <View style={styles.leagueMetric}>
            <Eye size={14} color="rgba(255, 255, 255, 0.5)" />
            <Text style={[styles.leagueMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{league.viewers}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderMatchCard = (match: any) => (
    <View key={match.id} style={[styles.matchCard, { backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)' }]}>
      <View style={styles.matchHeader}>
        <View style={[styles.matchStatus, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
          <Radio size={14} color="#EF4444" />
          <Text style={[styles.matchStatusText, { color: '#EF4444' }]}>LIVE</Text>
        </View>
        <Text style={[styles.matchTournament, { color: 'rgba(255, 255, 255, 0.6)' }]}>{match.tournament}</Text>
      </View>

      <View style={styles.matchContent}>
        <View style={styles.matchTeam}>
          <Text style={[styles.matchTeamName, { color: '#FFFFFF' }]}>{match.teamA}</Text>
        </View>

        <View style={styles.matchScore}>
          <Text style={[styles.matchScoreText, { color: '#EF4444' }]}>{match.score}</Text>
          <Text style={[styles.matchGame, { color: 'rgba(255, 255, 255, 0.6)' }]}>{match.game}</Text>
        </View>

        <View style={styles.matchTeam}>
          <Text style={[styles.matchTeamName, { color: '#FFFFFF' }]}>{match.teamB}</Text>
        </View>
      </View>

      <View style={styles.matchFooter}>
        <View style={styles.matchMetric}>
          <Eye size={14} color="#EF4444" />
          <Text style={[styles.matchMetricText, { color: '#EF4444' }]}>{match.viewers}</Text>
        </View>
      </View>
    </View>
  );

  const renderRankingCard = (team: any, index: number) => (
    <View key={index} style={[styles.rankingCard, { backgroundColor: index < 3 ? 'rgba(234, 179, 8, 0.05)' : 'rgba(255, 255, 255, 0.03)', borderColor: index < 3 ? 'rgba(234, 179, 8, 0.2)' : 'rgba(255, 255, 255, 0.1)' }]}>
      <View style={styles.rankingHeader}>
        <View style={[styles.rankingRank, { backgroundColor: index < 3 ? '#EAB308' : 'rgba(255, 255, 255, 0.1)' }]}>
          <Text style={[styles.rankingRankText, { color: index < 3 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)' }]}>{team.rank}</Text>
        </View>
        <View style={styles.rankingInfo}>
          <Text style={[styles.rankingName, { color: '#FFFFFF' }]}>{team.name}</Text>
          <Text style={[styles.rankingRegion, { color: 'rgba(255, 255, 255, 0.5)' }]}>{team.region}</Text>
        </View>
        <View style={styles.rankingChange}>
          {team.change === 'up' && <ArrowUpRight size={16} color="#10B981" />}
          {team.change === 'down' && <ArrowDownRight size={16} color="#EF4444" />}
          {team.change === 'stable' && <Activity size={16} color="#F59E0B" />}
        </View>
      </View>

      <View style={styles.rankingMetrics}>
        <View style={styles.rankingMetric}>
          <Star size={12} color="rgba(255, 255, 255, 0.5)" />
          <Text style={[styles.rankingMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{team.points} pts</Text>
        </View>
        <View style={styles.rankingMetric}>
          <Trophy size={12} color="rgba(255, 255, 255, 0.5)" />
          <Text style={[styles.rankingMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{team.wins}W</Text>
        </View>
        <View style={styles.rankingMetric}>
          <Shield size={12} color="rgba(255, 255, 255, 0.5)" />
          <Text style={[styles.rankingMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{team.losses}L</Text>
        </View>
      </View>
    </View>
  );

  const renderViewerCard = (metric: any, index: number) => (
    <View key={index} style={[styles.viewerCard, { backgroundColor: `${metric.color}10`, borderColor: `${metric.color}30` }]}>
      <Text style={[styles.viewerLabel, { color: 'rgba(255, 255, 255, 0.7)' }]}>{metric.label}</Text>
      <Text style={[styles.viewerValue, { color: '#FFFFFF' }]}>{metric.value}</Text>
      <View style={styles.viewerTrend}>
        {metric.trend === 'up' ? <ArrowUpRight size={14} color="#10B981" /> : <ArrowDownRight size={14} color="#EF4444" />}
        <Text style={[styles.viewerChange, { color: metric.trend === 'up' ? '#10B981' : '#EF4444' }]}>{metric.change}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#03050A' }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: 'rgba(234, 179, 8, 0.2)' }]}>
          <Trophy size={24} color="#EAB308" />
        </View>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: '#FFFFFF' }]}>Esports Command Center</Text>
          <Text style={[styles.headerSubtitle, { color: 'rgba(255, 255, 255, 0.6)' }]}>
            Active Leagues • Live Matches • Tournament Status • Team Rankings
          </Text>
        </View>
        <View style={[styles.liveIndicator, { backgroundColor: 'rgba(239, 68, 68, 0.2)', borderColor: '#EF4444' }]}>
          <Radio size={12} color="#EF4444" />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tournament Status Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Tournament Status</Text>
          <View style={[styles.tournamentCard, { backgroundColor: 'rgba(234, 179, 8, 0.05)', borderColor: 'rgba(234, 179, 8, 0.2)' }]}>
            <View style={styles.tournamentGrid}>
              <View style={styles.tournamentMetric}>
                <Trophy size={20} color="#EAB308" />
                <Text style={[styles.tournamentMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Total Tournaments</Text>
                <Text style={[styles.tournamentMetricValue, { color: '#FFFFFF' }]}>{tournamentStatus.totalTournaments}</Text>
              </View>
              <View style={styles.tournamentMetric}>
                <Radio size={20} color="#EF4444" />
                <Text style={[styles.tournamentMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Active</Text>
                <Text style={[styles.tournamentMetricValue, { color: '#EF4444' }]}>{tournamentStatus.activeTournaments}</Text>
              </View>
              <View style={styles.tournamentMetric}>
                <CheckCircle2 size={20} color="#10B981" />
                <Text style={[styles.tournamentMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Completed Today</Text>
                <Text style={[styles.tournamentMetricValue, { color: '#10B981' }]}>{tournamentStatus.completedToday}</Text>
              </View>
              <View style={styles.tournamentMetric}>
                <Clock size={20} color="#F59E0B" />
                <Text style={[styles.tournamentMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Upcoming</Text>
                <Text style={[styles.tournamentMetricValue, { color: '#F59E0B' }]}>{tournamentStatus.upcoming}</Text>
              </View>
            </View>
            <View style={styles.tournamentHighlights}>
              <View style={styles.tournamentHighlight}>
                <DollarSign size={16} color="#A855F7" />
                <Text style={[styles.tournamentHighlightLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Total Prize Pool</Text>
                <Text style={[styles.tournamentHighlightValue, { color: '#A855F7' }]}>{tournamentStatus.totalPrizePool}</Text>
              </View>
              <View style={styles.tournamentHighlight}>
                <Eye size={16} color="#00D4FF" />
                <Text style={[styles.tournamentHighlightLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Avg Viewership</Text>
                <Text style={[styles.tournamentHighlightValue, { color: '#00D4FF' }]}>{tournamentStatus.averageViewership}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Active Leagues */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Active Leagues</Text>
          <View style={styles.leaguesContainer}>
            {activeLeagues.map((league, index) => renderLeagueCard(league, index))}
          </View>
        </View>

        {/* Live Matches */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Live Matches</Text>
          <View style={styles.matchesContainer}>
            {liveMatches.map((match) => renderMatchCard(match))}
          </View>
        </View>

        {/* Team Rankings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Team Rankings</Text>
          <View style={styles.rankingsContainer}>
            {teamRankings.map((team, index) => renderRankingCard(team, index))}
          </View>
        </View>

        {/* Viewer Metrics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Viewer Metrics</Text>
          <View style={styles.viewerGrid}>
            {viewerMetrics.map((metric, index) => renderViewerCard(metric, index))}
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
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  liveText: {
    color: '#EF4444',
    fontSize: 11,
    fontWeight: '700',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#FFFFFF',
  },
  tournamentCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  tournamentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 20,
  },
  tournamentMetric: {
    width: '48%',
    alignItems: 'center',
  },
  tournamentMetricLabel: {
    fontSize: 11,
    marginTop: 8,
    marginBottom: 4,
  },
  tournamentMetricValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  tournamentHighlights: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  tournamentHighlight: {
    alignItems: 'center',
  },
  tournamentHighlightLabel: {
    fontSize: 11,
    marginTop: 8,
    marginBottom: 4,
  },
  tournamentHighlightValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  leaguesContainer: {
    gap: 12,
  },
  leagueCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  leagueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  leagueStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  leagueStatusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  leagueRegion: {
    fontSize: 12,
    marginLeft: 8,
  },
  leagueName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  leagueMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  leagueMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  leagueMetricText: {
    fontSize: 12,
  },
  matchesContainer: {
    gap: 12,
  },
  matchCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  matchStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  matchStatusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  matchTournament: {
    fontSize: 12,
  },
  matchContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  matchTeam: {
    flex: 1,
  },
  matchTeamName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  matchScore: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  matchScoreText: {
    fontSize: 24,
    fontWeight: '700',
  },
  matchGame: {
    fontSize: 12,
    marginTop: 4,
  },
  matchFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  matchMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  matchMetricText: {
    fontSize: 12,
    fontWeight: '600',
  },
  rankingsContainer: {
    gap: 12,
  },
  rankingCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
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
  rankingInfo: {
    flex: 1,
  },
  rankingName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  rankingRegion: {
    fontSize: 11,
  },
  rankingChange: {
    marginLeft: 12,
  },
  rankingMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rankingMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rankingMetricText: {
    fontSize: 12,
  },
  viewerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  viewerCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  viewerLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  viewerValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  viewerTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewerChange: {
    fontSize: 12,
    fontWeight: '600',
  },
});