import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  Activity, 
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Zap,
  TrendingUp,
  DollarSign,
  Target,
  Clock,
  Users,
  Globe,
  Brain,
  Shield
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface ActivityEvent {
  id: string;
  type: 'forecast' | 'contract' | 'initiative' | 'ma' | 'market' | 'financial' | 'ai' | 'milestone';
  title: string;
  description: string;
  timestamp: string;
  icon: any;
  color: string;
}

const activityEvents: ActivityEvent[] = [
  {
    id: '1',
    type: 'forecast',
    title: 'Quarterly Forecast Updated',
    description: 'Q4 revenue forecast updated to $8.2B with 94% confidence level',
    timestamp: '2 minutes ago',
    icon: TrendingUp,
    color: '#10B981'
  },
  {
    id: '2',
    type: 'contract',
    title: 'Major Contract Signed',
    description: '$480M strategic partnership agreement signed with Fortune 500 client',
    timestamp: '15 minutes ago',
    icon: DollarSign,
    color: '#3B82F6'
  },
  {
    id: '3',
    type: 'initiative',
    title: 'Strategic Initiative Approved',
    description: 'Board approved $1.2B digital transformation acceleration initiative',
    timestamp: '32 minutes ago',
    icon: Target,
    color: '#8B5CF6'
  },
  {
    id: '4',
    type: 'ma',
    title: 'M&A Opportunity Identified',
    description: 'AI agent identified high-synergy acquisition target in healthcare sector',
    timestamp: '1 hour ago',
    icon: Globe,
    color: '#EC4899'
  },
  {
    id: '5',
    type: 'market',
    title: 'Market Alert Generated',
    description: 'Competitor activity detected in APAC region - strategic response recommended',
    timestamp: '2 hours ago',
    icon: AlertTriangle,
    color: '#F59E0B'
  },
  {
    id: '6',
    type: 'financial',
    title: 'Financial Target Achieved',
    description: 'Q3 operating margin target exceeded by 2.3 percentage points',
    timestamp: '3 hours ago',
    icon: CheckCircle,
    color: '#10B981'
  },
  {
    id: '7',
    type: 'ai',
    title: 'AI Recommendation Accepted',
    description: 'CEO accepted AI recommendation for supply chain optimization',
    timestamp: '4 hours ago',
    icon: Brain,
    color: '#06B6D4'
  },
  {
    id: '8',
    type: 'milestone',
    title: 'Enterprise Milestone Reached',
    description: 'Company achieved 126,000 global employees milestone',
    timestamp: '6 hours ago',
    icon: Users,
    color: '#8B5CF6'
  },
  {
    id: '9',
    type: 'forecast',
    title: 'Revenue Forecast Revised',
    description: 'Annual revenue forecast increased by $1.4B based on Q3 performance',
    timestamp: '8 hours ago',
    icon: TrendingUp,
    color: '#10B981'
  },
  {
    id: '10',
    type: 'risk',
    title: 'Risk Assessment Updated',
    description: 'Enterprise risk score improved to Low level after mitigation actions',
    timestamp: '12 hours ago',
    icon: Shield,
    color: '#F59E0B'
  }
];

export default function ActivityFeed() {
  const { theme } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [liveEvents, setLiveEvents] = useState<ActivityEvent[]>(activityEvents);

  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'strategic', label: 'Strategic' },
    { id: 'financial', label: 'Financial' },
    { id: 'operational', label: 'Operational' },
    { id: 'ai', label: 'AI' }
  ];

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent: ActivityEvent = {
        id: Date.now().toString(),
        type: 'ai',
        title: 'New AI Insight Generated',
        description: 'AI agent identified cost optimization opportunity in procurement',
        timestamp: 'Just now',
        icon: Brain,
        color: '#06B6D4'
      };
      setLiveEvents([newEvent, ...liveEvents]);
    }, 30000); // Add new event every 30 seconds

    return () => clearInterval(interval);
  }, [liveEvents]);

  const filteredEvents = selectedFilter === 'all' 
    ? liveEvents 
    : liveEvents.filter(event => {
        if (selectedFilter === 'strategic') return ['forecast', 'initiative', 'ma', 'market'].includes(event.type);
        if (selectedFilter === 'financial') return ['contract', 'financial'].includes(event.type);
        if (selectedFilter === 'operational') return ['milestone', 'risk'].includes(event.type);
        if (selectedFilter === 'ai') return event.type === 'ai';
        return true;
      });

  const EventCard = ({ event }: { event: ActivityEvent }) => (
    <View style={[styles.eventCard, { backgroundColor: '#0A0F1A' }]}>
      <View style={styles.eventHeader}>
        <View style={[styles.eventIcon, { backgroundColor: `${event.color}20` }]}>
          <event.icon size={20} color={event.color} />
        </View>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDescription}>{event.description}</Text>
        </View>
      </View>
      <View style={styles.eventFooter}>
        <Clock size={14} color="#9CA3AF" />
        <Text style={styles.eventTimestamp}>{event.timestamp}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#03050A' }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.header, { backgroundColor: '#0A0F1A' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Executive Activity Feed</Text>
          <Text style={styles.headerSubtitle}>Real-time Operations Wall</Text>
        </View>
        <View style={styles.liveIndicator}>
          <View style={[styles.liveDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.id}
            style={[styles.filterChip, selectedFilter === filter.id && styles.filterChipActive]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text style={[styles.filterChipText, selectedFilter === filter.id && styles.filterChipTextActive]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        <View style={styles.statsSection}>
          <View style={[styles.statCard, { backgroundColor: '#0A0F1A' }]}>
            <Activity size={24} color="#10B981" />
            <View style={styles.statInfo}>
              <Text style={styles.statValue}>147</Text>
              <Text style={styles.statLabel}>Today's Events</Text>
            </View>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#0A0F1A' }]}>
            <Zap size={24} color="#F59E0B" />
            <View style={styles.statInfo}>
              <Text style={styles.statValue}>23</Text>
              <Text style={styles.statLabel}>Critical</Text>
            </View>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#0A0F1A' }]}>
            <Brain size={24} color="#06B6D4" />
            <View style={styles.statInfo}>
              <Text style={styles.statValue}>89</Text>
              <Text style={styles.statLabel}>AI Generated</Text>
            </View>
          </View>
        </View>

        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Live Activity Stream</Text>
          {filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
    letterSpacing: 0.5,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  filterChipActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  content: { flex: 1 },
  statsSection: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statInfo: { flex: 1 },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  eventsSection: { padding: 20, paddingTop: 0 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  eventCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  eventIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 18,
  },
  eventFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  eventTimestamp: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
