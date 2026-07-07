import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Activity, Radio, Mic, Video, Monitor, CheckCircle, AlertTriangle,
  TrendingUp, ArrowRight, BarChart3, Users, Clock, Zap, Shield, Globe
} from 'lucide-react-native';

export default function LiveOperationsCenter() {
  const router = useRouter();

  const LIVE_STATS = [
    { label: 'Live Events', value: '47', icon: Radio, color: '#06B6D4', trend: '+8%' },
    { label: 'Active Streams', value: '124', icon: Video, color: '#8B5CF6', trend: '+12%' },
    { label: 'Live Attendees', value: '847K', icon: Users, color: '#10B981', trend: '+15%' },
    { label: 'System Health', value: '98%', icon: CheckCircle, color: '#F59E0B', trend: '+2%' },
  ];

  const LIVE_EVENTS = [
    {
      id: 1,
      name: 'Tech Summit 2026',
      location: 'Moscone Center, SF',
      status: 'live',
      attendees: 12400,
      streams: 8,
      sessions: 12,
      active: 8,
      health: 98,
      startTime: '09:00',
      duration: '8h'
    },
    {
      id: 2,
      name: 'Global Music Festival',
      location: 'Madison Square Garden, NYC',
      status: 'live',
      attendees: 28500,
      streams: 24,
      sessions: 6,
      active: 6,
      health: 96,
      startTime: '14:00',
      duration: '6h'
    },
    {
      id: 3,
      name: 'AI Innovation Conference',
      location: 'McCormick Place, Chicago',
      status: 'preparing',
      attendees: 0,
      streams: 0,
      sessions: 8,
      active: 0,
      health: 100,
      startTime: '08:00',
      duration: '10h'
    },
  ];

  const SESSION_STATUS = [
    { status: 'Live Now', count: 24, color: '#10B981' },
    { status: 'Up Next', count: 18, color: '#06B6D4' },
    { status: 'Completed', count: 47, color: '#8B5CF6' },
    { status: 'Delayed', count: 3, color: '#F59E0B' },
    { status: 'Issues', count: 1, color: '#EF4444' },
  ];

  const TECHNICAL_SYSTEMS = [
    { system: 'Audio Systems', status: 'operational', health: 98, color: '#10B981' },
    { system: 'Video Production', status: 'operational', health: 96, color: '#10B981' },
    { system: 'Live Streaming', status: 'operational', health: 94, color: '#10B981' },
    { system: 'Lighting Control', status: 'operational', health: 100, color: '#10B981' },
    { system: 'Stage Management', status: 'operational', health: 98, color: '#10B981' },
    { system: 'Broadcast Systems', status: 'attention', health: 87, color: '#F59E0B' },
  ];

  const LIVE_SESSIONS = [
    { event: 'Tech Summit 2026', session: 'AI & Innovation Keynote', speaker: 'Dr. Sarah Chen', status: 'live', viewers: 8470, started: '09:00', icon: Mic, color: '#10B981' },
    { event: 'Global Music Festival', session: 'Main Stage Performance', speaker: 'The Electric Band', status: 'live', viewers: 28400, started: '14:00', icon: Radio, color: '#10B981' },
    { event: 'Tech Summit 2026', session: 'Future of Tech Panel', speaker: 'Industry Experts', status: 'up-next', viewers: 0, started: '10:30', icon: Clock, color: '#06B6D4' },
    { event: 'Global Music Festival', session: 'Side Stage DJ Set', speaker: 'DJ Nova', status: 'live', viewers: 12400, started: '14:30', icon: Radio, color: '#10B981' },
    { event: 'Tech Summit 2026', session: 'Workshop: AI Implementation', speaker: 'Tech Team', status: 'delayed', viewers: 0, started: '11:00', icon: AlertTriangle, color: '#F59E0B' },
  ];

  const ALERTS = [
    { type: 'warning', message: 'Audio levels slightly elevated in Main Hall', time: '2s ago', icon: AlertTriangle, color: '#F59E0B' },
    { type: 'info', message: 'New stream request for VIP lounge', time: '5s ago', icon: Video, color: '#06B6D4' },
    { type: 'success', message: 'Session completed successfully', time: '12s ago', icon: CheckCircle, color: '#10B981' },
    { type: 'warning', message: 'Crowd density high near Entrance B', time: '24s ago', icon: Shield, color: '#F59E0B' },
    { type: 'info', message: 'Speaker check-in confirmed', time: '31s ago', icon: Users, color: '#06B6D4' },
  ];

  const SESSION_TIMELINE = [
    { time: '09:00', session: 'AI & Innovation Keynote', speaker: 'Dr. Sarah Chen', status: 'completed', duration: '60m', color: '#8B5CF6' },
    { time: '10:00', session: 'Coffee Break & Networking', speaker: 'N/A', status: 'completed', duration: '30m', color: '#10B981' },
    { time: '10:30', session: 'Future of Tech Panel', speaker: 'Industry Experts', status: 'live', duration: '90m', color: '#10B981' },
    { time: '12:00', session: 'Lunch Break', speaker: 'N/A', status: 'up-next', duration: '60m', color: '#06B6D4' },
    { time: '13:00', session: 'Workshop: AI Implementation', speaker: 'Tech Team', status: 'scheduled', duration: '120m', color: '#F59E0B' },
    { time: '15:00', session: 'Closing Ceremony', speaker: 'Event Team', status: 'scheduled', duration: '45m', color: '#EC4899' },
  ];

  const PRODUCTION_METRICS = [
    { metric: 'Active Cameras', value: '12/16', status: 'optimal', color: '#10B981' },
    { metric: 'Audio Quality', value: '98%', status: 'optimal', color: '#10B981' },
    { metric: 'Stream Bitrate', value: '8.4 Mbps', status: 'optimal', color: '#10B981' },
    { metric: 'Network Latency', value: '24ms', status: 'optimal', color: '#10B981' },
    { metric: 'Storage Used', value: '2.4TB', status: 'warning', color: '#F59E0B' },
    { metric: 'CPU Load', value: '67%', status: 'optimal', color: '#10B981' },
  ];

  const CAMERA_FEEDS = [
    { camera: 'Main Stage Cam 1', status: 'live', resolution: '4K', bitrate: '8.4 Mbps', color: '#10B981' },
    { camera: 'Main Stage Cam 2', status: 'live', resolution: '4K', bitrate: '8.2 Mbps', color: '#10B981' },
    { camera: 'Audience Cam', status: 'live', resolution: '1080p', bitrate: '4.2 Mbps', color: '#10B981' },
    { camera: 'Speaker Cam', status: 'standby', resolution: '4K', bitrate: '0 Mbps', color: '#F59E0B' },
    { camera: 'Wide Shot', status: 'live', resolution: '4K', bitrate: '7.8 Mbps', color: '#10B981' },
  ];

  const STREAM_QUALITY = [
    { platform: 'YouTube', viewers: '45.2K', quality: '1080p', bitrate: '6.2 Mbps', status: 'excellent', color: '#FF0000' },
    { platform: 'Twitch', viewers: '28.4K', quality: '1080p', bitrate: '6.0 Mbps', status: 'excellent', color: '#9146FF' },
    { platform: 'LinkedIn', viewers: '12.8K', quality: '720p', bitrate: '3.2 Mbps', status: 'good', color: '#0077B5' },
    { platform: 'Facebook', viewers: '18.6K', quality: '720p', bitrate: '3.0 Mbps', status: 'good', color: '#1877F2' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return '#10B981';
      case 'up-next': return '#06B6D4';
      case 'completed': return '#8B5CF6';
      case 'delayed': return '#F59E0B';
      case 'preparing': return '#6B7280';
      case 'operational': return '#10B981';
      case 'attention': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#06B6D4';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Activity size={48} color="#06B6D4" />
        </View>
        <View>
          <Text style={styles.headerTitle}>Live Operations Center</Text>
          <Text style={styles.headerSubtitle}>Real-Time Event Monitoring</Text>
        </View>
      </View>

      {/* Live Stats */}
      <View style={styles.statsContainer}>
        {LIVE_STATS.map((stat, index) => (
          <View key={index} style={[styles.statCard, { borderColor: stat.color + '40' }]}>
            <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
              <stat.icon size={24} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <View style={[styles.trendBadge, { backgroundColor: stat.color + '20' }]}>
              <TrendingUp size={10} color={stat.color} />
              <Text style={[styles.trendText, { color: stat.color }]}>{stat.trend}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Session Timeline */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Session Timeline</Text>
        <Text style={styles.sectionDescription}>Real-time session schedule and status</Text>
        {SESSION_TIMELINE.map((session, index) => (
          <View key={index} style={styles.timelineCard}>
            <View style={styles.timelineHeader}>
              <View style={styles.timelineTime}>
                <Clock size={16} color="#9CA3AF" />
                <Text style={styles.timelineTimeText}>{session.time}</Text>
              </View>
              <View style={[styles.timelineStatus, { backgroundColor: getStatusColor(session.status) + '20' }]}>
                <Activity size={12} color={getStatusColor(session.status)} />
                <Text style={[styles.timelineStatusText, { color: getStatusColor(session.status) }]}>{session.status}</Text>
              </View>
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineSession}>{session.session}</Text>
              <Text style={styles.timelineSpeaker}>{session.speaker}</Text>
            </View>
            <View style={styles.timelineFooter}>
              <View style={styles.timelineDuration}>
                <Text style={styles.timelineDurationLabel}>Duration</Text>
                <Text style={styles.timelineDurationValue}>{session.duration}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Production Dashboard */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Production Dashboard</Text>
        <Text style={styles.sectionDescription}>Real-time production metrics and quality</Text>
        <View style={styles.productionGrid}>
          {PRODUCTION_METRICS.map((metric, index) => (
            <View key={index} style={[styles.productionCard, { borderColor: metric.color + '40' }]}>
              <Text style={styles.productionValue}>{metric.value}</Text>
              <Text style={styles.productionMetric}>{metric.metric}</Text>
              <View style={[styles.productionStatus, { backgroundColor: metric.color + '20' }]}>
                <CheckCircle size={10} color={metric.color} />
                <Text style={[styles.productionStatusText, { color: metric.color }]}>{metric.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Camera Feeds */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Camera Feeds</Text>
        <Text style={styles.sectionDescription}>Live camera status and quality</Text>
        {CAMERA_FEEDS.map((camera, index) => (
          <View key={index} style={styles.cameraCard}>
            <View style={styles.cameraHeader}>
              <Text style={styles.cameraName}>{camera.camera}</Text>
              <View style={[styles.cameraStatus, { backgroundColor: getStatusColor(camera.status) + '20' }]}>
                <Video size={12} color={getStatusColor(camera.status)} />
                <Text style={[styles.cameraStatusText, { color: getStatusColor(camera.status) }]}>{camera.status}</Text>
              </View>
            </View>
            <View style={styles.cameraMetrics}>
              <View style={styles.cameraMetric}>
                <Text style={styles.cameraMetricLabel}>Resolution</Text>
                <Text style={styles.cameraMetricValue}>{camera.resolution}</Text>
              </View>
              <View style={styles.cameraMetric}>
                <Text style={styles.cameraMetricLabel}>Bitrate</Text>
                <Text style={styles.cameraMetricValue}>{camera.bitrate}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Stream Quality */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stream Quality</Text>
        <Text style={styles.sectionDescription}>Platform-wise streaming performance</Text>
        {STREAM_QUALITY.map((stream, index) => (
          <View key={index} style={styles.streamCard}>
            <View style={styles.streamHeader}>
              <Text style={styles.streamPlatform}>{stream.platform}</Text>
              <View style={styles.streamViewers}>
                <Globe size={12} color="#9CA3AF" />
                <Text style={styles.streamViewersText}>{stream.viewers}</Text>
              </View>
            </View>
            <View style={styles.streamMetrics}>
              <View style={styles.streamMetric}>
                <Text style={styles.streamMetricLabel}>Quality</Text>
                <Text style={styles.streamMetricValue}>{stream.quality}</Text>
              </View>
              <View style={styles.streamMetric}>
                <Text style={styles.streamMetricLabel}>Bitrate</Text>
                <Text style={styles.streamMetricValue}>{stream.bitrate}</Text>
              </View>
              <View style={styles.streamMetric}>
                <Text style={styles.streamMetricLabel}>Status</Text>
                <Text style={[styles.streamMetricValue, { color: stream.color }]}>{stream.status}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Session Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Session Status</Text>
        <View style={styles.statusGrid}>
          {SESSION_STATUS.map((status, index) => (
            <View key={index} style={[styles.statusCard, { borderColor: status.color + '40' }]}>
              <View style={[styles.statusDot, { backgroundColor: status.color }]} />
              <Text style={styles.statusCount}>{status.count}</Text>
              <Text style={styles.statusLabel}>{status.status}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Technical Systems */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technical Systems</Text>
        {TECHNICAL_SYSTEMS.map((system, index) => (
          <View key={index} style={styles.systemCard}>
            <View style={styles.systemHeader}>
              <Text style={styles.systemName}>{system.system}</Text>
              <View style={[styles.systemStatus, { backgroundColor: getStatusColor(system.status) + '20' }]}>
                <Activity size={12} color={getStatusColor(system.status)} />
                <Text style={[styles.systemStatusText, { color: getStatusColor(system.status) }]}>{system.status}</Text>
              </View>
            </View>
            <View style={styles.systemBar}>
              <View 
                style={[
                  styles.systemFill, 
                  { 
                    width: `${system.health}%`,
                    backgroundColor: system.health >= 95 ? '#10B981' : system.health >= 85 ? '#F59E0B' : '#EF4444'
                  } 
                ]} 
              />
            </View>
            <Text style={styles.systemHealth}>{system.health}% health</Text>
          </View>
        ))}
      </View>

      {/* Live Events */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Events</Text>
        {LIVE_EVENTS.map((event) => (
          <View key={event.id} style={[styles.eventCard, { borderColor: getStatusColor(event.status) + '40' }]}>
            {/* Event Header */}
            <View style={styles.eventHeader}>
              <View style={styles.eventHeaderLeft}>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventLocation}>{event.location}</Text>
              </View>
              <View style={[styles.eventStatus, { backgroundColor: getStatusColor(event.status) + '20' }]}>
                <Radio size={14} color={getStatusColor(event.status)} />
                <Text style={[styles.eventStatusText, { color: getStatusColor(event.status) }]}>{event.status}</Text>
              </View>
            </View>

            {/* Event Stats */}
            <View style={styles.eventStats}>
              <View style={styles.eventStat}>
                <Users size={16} color="#06B6D4" />
                <View>
                  <Text style={styles.eventStatLabel}>Attendees</Text>
                  <Text style={styles.eventStatValue}>{event.attendees.toLocaleString()}</Text>
                </View>
              </View>
              <View style={styles.eventStat}>
                <Video size={16} color="#8B5CF6" />
                <View>
                  <Text style={styles.eventStatLabel}>Streams</Text>
                  <Text style={styles.eventStatValue}>{event.streams}</Text>
                </View>
              </View>
              <View style={styles.eventStat}>
                <Monitor size={16} color="#10B981" />
                <View>
                  <Text style={styles.eventStatLabel}>Sessions</Text>
                  <Text style={styles.eventStatValue}>{event.active}/{event.sessions}</Text>
                </View>
              </View>
            </View>

            {/* Health */}
            <View style={styles.healthSection}>
              <View style={styles.healthHeader}>
                <Shield size={16} color="#9CA3AF" />
                <Text style={styles.healthLabel}>System Health</Text>
              </View>
              <View style={styles.healthBar}>
                <View 
                  style={[
                    styles.healthFill, 
                    { 
                      width: `${event.health}%`,
                      backgroundColor: event.health >= 95 ? '#10B981' : event.health >= 85 ? '#F59E0B' : '#EF4444'
                    } 
                  ]} 
                />
              </View>
              <Text style={styles.healthValue}>{event.health}%</Text>
            </View>

            {/* Time */}
            <View style={styles.timeSection}>
              <View style={styles.timeItem}>
                <Clock size={16} color="#9CA3AF" />
                <View>
                  <Text style={styles.timeLabel}>Started</Text>
                  <Text style={styles.timeValue}>{event.startTime}</Text>
                </View>
              </View>
              <View style={styles.timeItem}>
                <Activity size={16} color="#9CA3AF" />
                <View>
                  <Text style={styles.timeLabel}>Duration</Text>
                  <Text style={styles.timeValue}>{event.duration}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.eventButton, { backgroundColor: '#06B6D4' }]}
              onPress={() => router.push('/event-management/dashboard')}
            >
              <Text style={styles.eventButtonText}>View Event Control</Text>
              <ArrowRight size={20} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Live Sessions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Sessions</Text>
        <View style={styles.sessionsList}>
          {LIVE_SESSIONS.map((session, index) => (
            <View key={index} style={styles.sessionItem}>
              <View style={[styles.sessionIcon, { backgroundColor: session.color + '20' }]}>
                <session.icon size={18} color={session.color} />
              </View>
              <View style={styles.sessionContent}>
                <Text style={styles.sessionName}>{session.session}</Text>
                <Text style={styles.sessionSpeaker}>{session.speaker}</Text>
                <Text style={styles.sessionEvent}>{session.event}</Text>
              </View>
              <View style={styles.sessionRight}>
                <View style={[styles.sessionStatus, { backgroundColor: getStatusColor(session.status) + '20' }]}>
                  <Text style={[styles.sessionStatusText, { color: getStatusColor(session.status) }]}>{session.status}</Text>
                </View>
                {session.viewers > 0 && (
                  <View style={styles.sessionViewers}>
                    <Globe size={12} color="#9CA3AF" />
                    <Text style={styles.sessionViewersText}>{session.viewers.toLocaleString()}</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Alerts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Alerts</Text>
        <View style={styles.alertsList}>
          {ALERTS.map((alert, index) => (
            <View key={index} style={styles.alertItem}>
              <View style={[styles.alertIcon, { backgroundColor: alert.color + '20' }]}>
                <alert.icon size={16} color={alert.color} />
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertMessage}>{alert.message}</Text>
                <Text style={styles.alertTime}>{alert.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#06B6D415', borderColor: '#06B6D440' }]}
          >
            <Radio size={24} color="#06B6D4" />
            <Text style={[styles.actionText, { color: '#06B6D4' }]}>Go Live</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#8B5CF615', borderColor: '#8B5CF640' }]}
          >
            <Video size={24} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Add Stream</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#10B98115', borderColor: '#10B98140' }]}
          >
            <Mic size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>Session</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#F59E0B15', borderColor: '#F59E0B40' }]}
          >
            <Zap size={24} color="#F59E0B" />
            <Text style={[styles.actionText, { color: '#F59E0B' }]}>Emergency</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03050A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#06B6D440',
    gap: 16,
  },
  headerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#06B6D420',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
  },
  section: {
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statusCard: {
    flex: 1,
    minWidth: 120,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statusLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  systemCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  systemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  systemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  systemStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
  },
  systemStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  systemBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  systemFill: {
    height: '100%',
    borderRadius: 4,
  },
  systemHealth: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  eventCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  eventHeaderLeft: {
    flex: 1,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  eventStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  eventStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  eventStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  eventStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventStatLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  eventStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  healthSection: {
    marginBottom: 16,
  },
  healthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  healthLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  healthBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  healthFill: {
    height: '100%',
    borderRadius: 4,
  },
  healthValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  timeSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  timeValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  eventButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 12,
  },
  eventButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sessionsList: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    gap: 12,
  },
  sessionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sessionContent: {
    flex: 1,
  },
  sessionName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sessionSpeaker: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  sessionEvent: {
    fontSize: 12,
    color: '#6B7280',
  },
  sessionRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  sessionStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  sessionStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  sessionViewers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sessionViewersText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  alertsList: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    gap: 12,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContent: {
    flex: 1,
  },
  alertMessage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  alertTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  actionsSection: {
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: 140,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  timelineCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timelineTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timelineTimeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  timelineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  timelineStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  timelineContent: {
    marginBottom: 12,
  },
  timelineSession: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  timelineSpeaker: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  timelineFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  timelineDuration: {
    alignItems: 'center',
  },
  timelineDurationLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  timelineDurationValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  productionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  productionCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  productionValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  productionMetric: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  productionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  productionStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cameraCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cameraName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cameraStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  cameraStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cameraMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cameraMetric: {
    alignItems: 'center',
  },
  cameraMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  cameraMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  streamCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  streamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  streamPlatform: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  streamViewers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  streamViewersText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  streamMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  streamMetric: {
    alignItems: 'center',
  },
  streamMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  streamMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
