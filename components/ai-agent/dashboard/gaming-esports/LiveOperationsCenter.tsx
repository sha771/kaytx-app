import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { 
  Zap, 
  Calendar, 
  Activity, 
  Clock, 
  Users, 
  TrendingUp, 
  Flame, 
  Award, 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  Pause, 
  RotateCcw,
  Globe,
  MapPin,
  Server,
  Cpu,
  Database,
  Radio,
  BarChart3,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Crown,
  Trophy,
  Flag,
  Timer,
  Settings,
  Layers,
  GitBranch,
  Shield,
  Lock,
  Unlock,
  Eye,
  MessageSquare,
  Bell,
  Notification
} from 'lucide-react-native';

interface LiveOperationsCenterProps {
  data?: any;
}

export default function LiveOperationsCenter({ data }: LiveOperationsCenterProps) {
  // Live Events Data
  const liveEvents = [
    { 
      id: 1, 
      name: 'World Championship Finals', 
      status: 'live' as const, 
      viewers: '2.1M', 
      participants: '128K', 
      duration: '2h 45m', 
      prize: '$2.5M',
      region: 'Global'
    },
    { 
      id: 2, 
      name: 'Summer Battle Pass', 
      status: 'active' as const, 
      participants: '45.2M', 
      completion: '67%', 
      revenue: '$847M',
      duration: '45 days'
    },
    { 
      id: 3, 
      name: 'Double XP Weekend', 
      status: 'scheduled' as const, 
      startTime: '2h 30m', 
      expectedParticipants: '85M',
      bonus: '2x XP'
    },
    { 
      id: 4, 
      name: 'New Season Launch', 
      status: 'scheduled' as const, 
      startTime: '5d 12h', 
      features: '12 new',
      expectedLoad: '+45%'
    }
  ];

  // Seasonal Content
  const seasonalMetrics = {
    currentSeason: 'Season 12',
    seasonProgress: 72,
    activePlayers: '42.8M',
    seasonPassOwners: '28.4M',
    completionRate: '68%',
    avgLevel: '47'
  };

  // Server Performance
  const serverMetrics = [
    { region: 'North America', status: 'healthy', latency: '24ms', uptime: '99.98%', load: '67%' },
    { region: 'Europe', status: 'healthy', latency: '32ms', uptime: '99.95%', load: '72%' },
    { region: 'Asia Pacific', status: 'healthy', latency: '45ms', uptime: '99.92%', load: '78%' },
    { region: 'South America', status: 'warning', latency: '68ms', uptime: '99.85%', load: '85%' }
  ];

  // Feature Releases
  const featureReleases = [
    { feature: 'New Character: Blaze', status: 'deployed', adoption: '34%', satisfaction: '4.6/5' },
    { feature: 'Ranked 2.0 Update', status: 'deployed', adoption: '89%', satisfaction: '4.8/5' },
    { feature: 'Guild Wars', status: 'testing', adoption: '12%', satisfaction: '4.2/5' },
    { feature: 'Cross-Platform Play', status: 'developing', adoption: '0%', satisfaction: '-' }
  ];

  // Engagement Campaigns
  const campaigns = [
    { name: 'Return Player Event', participants: '2.4M', conversion: '34%', revenue: '$156M' },
    { name: 'Social Media Challenge', participants: '8.7M', engagement: '89%', reach: '45M' },
    { name: 'Streamer Tournament', participants: '1.2K', viewership: '12M', impact: '+18%' },
    { name: 'Community Feedback', participants: '4.5M', response: '78%', implemented: '156' }
  ];

  const renderEventCard = (event: any) => {
    const statusColors = {
      live: '#EF4444',
      active: '#10B981',
      scheduled: '#F59E0B'
    };
    const color = statusColors[event.status];

    return (
      <View key={event.id} style={[styles.eventCard, { backgroundColor: `${color}10`, borderColor: `${color}30` }]}>
        <View style={styles.eventHeader}>
          <View style={[styles.eventStatus, { backgroundColor: `${color}20` }]}>
            {event.status === 'live' && <Radio size={16} color={color} />}
            {event.status === 'active' && <Activity size={16} color={color} />}
            {event.status === 'scheduled' && <Clock size={16} color={color} />}
            <Text style={[styles.eventStatusText, { color }]}>{event.status.toUpperCase()}</Text>
          </View>
          {event.status === 'live' && (
            <View style={[styles.liveBadge, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
              <Eye size={12} color="#EF4444" />
              <Text style={[styles.liveBadgeText, { color: '#EF4444' }]}>{event.viewers}</Text>
            </View>
          )}
        </View>

        <Text style={[styles.eventName, { color: '#FFFFFF' }]}>{event.name}</Text>

        <View style={styles.eventMetrics}>
          {event.participants && (
            <View style={styles.eventMetric}>
              <Users size={14} color="rgba(255, 255, 255, 0.5)" />
              <Text style={[styles.eventMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{event.participants}</Text>
            </View>
          )}
          {event.duration && (
            <View style={styles.eventMetric}>
              <Clock size={14} color="rgba(255, 255, 255, 0.5)" />
              <Text style={[styles.eventMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{event.duration}</Text>
            </View>
          )}
          {event.prize && (
            <View style={styles.eventMetric}>
              <Trophy size={14} color="rgba(255, 255, 255, 0.5)" />
              <Text style={[styles.eventMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{event.prize}</Text>
            </View>
          )}
          {event.completion && (
            <View style={styles.eventMetric}>
              <Target size={14} color="rgba(255, 255, 255, 0.5)" />
              <Text style={[styles.eventMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{event.completion}</Text>
            </View>
          )}
          {event.startTime && (
            <View style={styles.eventMetric}>
              <Timer size={14} color="rgba(255, 255, 255, 0.5)" />
              <Text style={[styles.eventMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{event.startTime}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderServerCard = (server: any, index: number) => {
    const statusColors = {
      healthy: '#10B981',
      warning: '#F59E0B',
      critical: '#EF4444'
    };
    const color = statusColors[server.status as keyof typeof statusColors];

    return (
      <View key={index} style={[styles.serverCard, { backgroundColor: `${color}10`, borderColor: `${color}30` }]}>
        <View style={styles.serverHeader}>
          <Globe size={20} color={color} />
          <Text style={[styles.serverRegion, { color: '#FFFFFF' }]}>{server.region}</Text>
          <View style={[styles.serverStatus, { backgroundColor: `${color}20` }]}>
            <View style={[styles.serverStatusDot, { backgroundColor: color }]} />
            <Text style={[styles.serverStatusText, { color }]}>{server.status}</Text>
          </View>
        </View>
        <View style={styles.serverMetrics}>
          <View style={styles.serverMetric}>
            <Activity size={12} color="rgba(255, 255, 255, 0.5)" />
            <Text style={[styles.serverMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{server.latency}</Text>
          </View>
          <View style={styles.serverMetric}>
            <Shield size={12} color="rgba(255, 255, 255, 0.5)" />
            <Text style={[styles.serverMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{server.uptime}</Text>
          </View>
          <View style={styles.serverMetric}>
            <Cpu size={12} color="rgba(255, 255, 255, 0.5)" />
            <Text style={[styles.serverMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{server.load}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderFeatureCard = (feature: any, index: number) => {
    const statusColors = {
      deployed: '#10B981',
      testing: '#F59E0B',
      developing: '#3B82F6'
    };
    const color = statusColors[feature.status as keyof typeof statusColors];

    return (
      <View key={index} style={[styles.featureCard, { backgroundColor: `${color}10`, borderColor: `${color}30` }]}>
        <View style={styles.featureHeader}>
          <Text style={[styles.featureName, { color: '#FFFFFF' }]}>{feature.feature}</Text>
          <View style={[styles.featureStatus, { backgroundColor: `${color}20` }]}>
            <Text style={[styles.featureStatusText, { color }]}>{feature.status}</Text>
          </View>
        </View>
        <View style={styles.featureMetrics}>
          <View style={styles.featureMetric}>
            <Users size={12} color="rgba(255, 255, 255, 0.5)" />
            <Text style={[styles.featureMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>Adoption: {feature.adoption}</Text>
          </View>
          <View style={styles.featureMetric}>
            <Star size={12} color="rgba(255, 255, 255, 0.5)" />
            <Text style={[styles.featureMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>Rating: {feature.satisfaction}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderCampaignCard = (campaign: any, index: number) => (
    <View key={index} style={[styles.campaignCard, { backgroundColor: 'rgba(0, 212, 255, 0.05)', borderColor: 'rgba(0, 212, 255, 0.2)' }]}>
      <Text style={[styles.campaignName, { color: '#FFFFFF' }]}>{campaign.name}</Text>
      <View style={styles.campaignMetrics}>
        {campaign.participants && (
          <View style={styles.campaignMetric}>
            <Users size={14} color="#00D4FF" />
            <Text style={[styles.campaignMetricText, { color: '#00D4FF' }]}>{campaign.participants}</Text>
          </View>
        )}
        {campaign.conversion && (
          <View style={styles.campaignMetric}>
            <Target size={14} color="#10B981" />
            <Text style={[styles.campaignMetricText, { color: '#10B981' }]}>{campaign.conversion}</Text>
          </View>
        )}
        {campaign.revenue && (
          <View style={styles.campaignMetric}>
            <DollarSign size={14} color="#A855F7" />
            <Text style={[styles.campaignMetricText, { color: '#A855F7' }]}>{campaign.revenue}</Text>
          </View>
        )}
        {campaign.engagement && (
          <View style={styles.campaignMetric}>
            <MessageSquare size={14} color="#F59E0B" />
            <Text style={[styles.campaignMetricText, { color: '#F59E0B' }]}>{campaign.engagement}</Text>
          </View>
        )}
        {campaign.viewership && (
          <View style={styles.campaignMetric}>
            <Eye size={14} color="#EC4899" />
            <Text style={[styles.campaignMetricText, { color: '#EC4899' }]}>{campaign.viewership}</Text>
          </View>
        )}
        {campaign.impact && (
          <View style={styles.campaignMetric}>
            <TrendingUp size={14} color="#10B981" />
            <Text style={[styles.campaignMetricText, { color: '#10B981' }]}>{campaign.impact}</Text>
          </View>
        )}
        {campaign.response && (
          <View style={styles.campaignMetric}>
            <MessageSquare size={14} color="#06B6D4" />
            <Text style={[styles.campaignMetricText, { color: '#06B6D4' }]}>{campaign.response}</Text>
          </View>
        )}
        {campaign.implemented && (
          <View style={styles.campaignMetric}>
            <CheckCircle2 size={14} color="#10B981" />
            <Text style={[styles.campaignMetricText, { color: '#10B981' }]}>{campaign.implemented}</Text>
          </View>
        )}
        {campaign.reach && (
          <View style={styles.campaignMetric}>
            <Globe size={14} color="#3B82F6" />
            <Text style={[styles.campaignMetricText, { color: '#3B82F6' }]}>{campaign.reach}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#03050A' }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
          <Zap size={24} color="#EF4444" />
        </View>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: '#FFFFFF' }]}>Live Operations Center</Text>
          <Text style={[styles.headerSubtitle, { color: 'rgba(255, 255, 255, 0.6)' }]}>
            Event Management • Seasonal Content • Server Performance • Feature Releases
          </Text>
        </View>
        <View style={[styles.liveIndicator, { backgroundColor: 'rgba(239, 68, 68, 0.2)', borderColor: '#EF4444' }]}>
          <Radio size={12} color="#EF4444" />
          <Text style={styles.liveText}>LIVE OPS</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Live Events */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Live Events</Text>
          <View style={styles.eventsContainer}>
            {liveEvents.map((event) => renderEventCard(event))}
          </View>
        </View>

        {/* Seasonal Content */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Seasonal Content</Text>
          <View style={[styles.seasonalCard, { backgroundColor: 'rgba(168, 85, 247, 0.05)', borderColor: 'rgba(168, 85, 247, 0.2)' }]}>
            <View style={styles.seasonalHeader}>
              <Crown size={24} color="#A855F7" />
              <View style={styles.seasonalInfo}>
                <Text style={[styles.seasonalName, { color: '#FFFFFF' }]}>{seasonalMetrics.currentSeason}</Text>
                <Text style={[styles.seasonalSubtitle, { color: 'rgba(255, 255, 255, 0.6)' }]}>Progress: {seasonalMetrics.seasonProgress}%</Text>
              </View>
            </View>
            <View style={styles.seasonalBar}>
              <View style={[styles.seasonalFill, { width: `${seasonalMetrics.seasonProgress}%`, backgroundColor: '#A855F7' }]} />
            </View>
            <View style={styles.seasonalMetrics}>
              <View style={styles.seasonalMetric}>
                <Users size={16} color="rgba(255, 255, 255, 0.5)" />
                <Text style={[styles.seasonalMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{seasonalMetrics.activePlayers}</Text>
                <Text style={[styles.seasonalMetricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Active Players</Text>
              </View>
              <View style={styles.seasonalMetric}>
                <Award size={16} color="rgba(255, 255, 255, 0.5)" />
                <Text style={[styles.seasonalMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{seasonalMetrics.seasonPassOwners}</Text>
                <Text style={[styles.seasonalMetricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Pass Owners</Text>
              </View>
              <View style={styles.seasonalMetric}>
                <Target size={16} color="rgba(255, 255, 255, 0.5)" />
                <Text style={[styles.seasonalMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{seasonalMetrics.completionRate}</Text>
                <Text style={[styles.seasonalMetricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Completion</Text>
              </View>
              <View style={styles.seasonalMetric}>
                <Flame size={16} color="rgba(255, 255, 255, 0.5)" />
                <Text style={[styles.seasonalMetricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{seasonalMetrics.avgLevel}</Text>
                <Text style={[styles.seasonalMetricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Avg Level</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Server Performance */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Server Performance</Text>
          <View style={styles.serversGrid}>
            {serverMetrics.map((server, index) => renderServerCard(server, index))}
          </View>
        </View>

        {/* Feature Releases */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Feature Releases</Text>
          <View style={styles.featuresContainer}>
            {featureReleases.map((feature, index) => renderFeatureCard(feature, index))}
          </View>
        </View>

        {/* Engagement Campaigns */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Engagement Campaigns</Text>
          <View style={styles.campaignsContainer}>
            {campaigns.map((campaign, index) => renderCampaignCard(campaign, index))}
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
  eventsContainer: {
    gap: 12,
  },
  eventCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  eventStatusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  liveBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  eventName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  eventMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  eventMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventMetricText: {
    fontSize: 12,
  },
  seasonalCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  seasonalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  seasonalInfo: {
    marginLeft: 16,
    flex: 1,
  },
  seasonalName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  seasonalSubtitle: {
    fontSize: 13,
  },
  seasonalBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    marginBottom: 16,
  },
  seasonalFill: {
    height: '100%',
    borderRadius: 4,
  },
  seasonalMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  seasonalMetric: {
    alignItems: 'center',
  },
  seasonalMetricText: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  seasonalMetricLabel: {
    fontSize: 11,
  },
  serversGrid: {
    gap: 12,
  },
  serverCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  serverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serverRegion: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
  },
  serverStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  serverStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  serverStatusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  serverMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  serverMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  serverMetricText: {
    fontSize: 12,
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
  featureStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featureStatusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  featureMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  featureMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featureMetricText: {
    fontSize: 12,
  },
  campaignsContainer: {
    gap: 12,
  },
  campaignCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  campaignName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  campaignMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  campaignMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  campaignMetricText: {
    fontSize: 12,
    fontWeight: '600',
  },
});