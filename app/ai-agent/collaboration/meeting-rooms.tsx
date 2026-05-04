import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  ChevronLeft, Video, Mic, MicOff, VideoOff, PhoneOff, Users, MessageSquare,
  ScreenShare, MoreVertical, Plus, Calendar, Clock, CheckCircle, AlertCircle,
  Zap, Star, ArrowRight, Monitor, Hand, FileText, Share2, X
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

const ROOMS = [
  { id: '1', name: 'Strategy Room', status: 'available', capacity: 12, features: ['4K Display', 'Whiteboard', 'Recording'] },
  { id: '2', name: 'Product Lab', status: 'occupied', capacity: 8, features: ['Dual Screen', 'Prototyping Kit'], current: 'Q2 Planning' },
  { id: '3', name: 'Creative Space', status: 'available', capacity: 6, features: ['Interactive Wall', 'VR Ready'] },
  { id: '4', name: 'War Room', status: 'available', capacity: 20, features: ['Multi-screen', 'Live Dashboards'] },
  { id: '5', name: 'Focus Pod', status: 'occupied', capacity: 4, features: ['Soundproof'], current: 'Client Call' },
  { id: '6', name: 'Town Hall', status: 'available', capacity: 50, features: ['Stage', 'Live Streaming'] },
];

const UPCOMING_MEETINGS = [
  {
    id: '1',
    title: 'Weekly Team Standup',
    room: 'Strategy Room',
    time: '09:00 AM',
    duration: '30 min',
    attendees: 8,
    status: 'upcoming',
    aiReady: true
  },
  {
    id: '2',
    title: 'Product Review with Marketing',
    room: 'Product Lab',
    time: '10:30 AM',
    duration: '1 hour',
    attendees: 12,
    status: 'live',
    aiReady: true
  },
  {
    id: '3',
    title: 'Q2 Roadmap Planning',
    room: 'War Room',
    time: '02:00 PM',
    duration: '2 hours',
    attendees: 15,
    status: 'upcoming',
    aiReady: false
  },
  {
    id: '4',
    title: 'Client Presentation',
    room: 'Town Hall',
    time: '04:00 PM',
    duration: '1 hour',
    attendees: 25,
    status: 'upcoming',
    aiReady: true
  },
];

const AI_FEATURES = [
  { icon: FileText, title: 'Smart Notes', desc: 'Auto-transcribe meeting' },
  { icon: Zap, title: 'Action Items', desc: 'Extract tasks automatically' },
  { icon: Share2, title: 'Smart Share', desc: 'Context-aware sharing' },
];

export default function MeetingRoomsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'rooms' | 'meetings'>('rooms');
  const [isInMeeting, setIsInMeeting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'available': return '#10B981';
      case 'occupied': return '#EF4444';
      case 'reserved': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Meeting Rooms
          </Text>
          <TouchableOpacity style={[styles.newBtn, { backgroundColor: '#3B82F6' }]}>
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => setActiveTab('rooms')}
            style={[styles.tab, activeTab === 'rooms' && { backgroundColor: '#3B82F6' }]}
          >
            <Monitor size={16} color={activeTab === 'rooms' ? '#fff' : theme.colors.text} />
            <Text style={[styles.tabText, { color: activeTab === 'rooms' ? '#fff' : theme.colors.text }]}>
              Rooms
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('meetings')}
            style={[styles.tab, activeTab === 'meetings' && { backgroundColor: '#3B82F6' }]}
          >
            <Calendar size={16} color={activeTab === 'meetings' ? '#fff' : theme.colors.text} />
            <Text style={[styles.tabText, { color: activeTab === 'meetings' ? '#fff' : theme.colors.text }]}>
              Meetings
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'rooms' ? (
          <>
            {/* Room Status Summary */}
            <View style={styles.statusRow}>
              <View style={[styles.statusCard, { backgroundColor: '#10B98115' }]}>
                <Text style={[styles.statusCount, { color: '#10B981' }]}>4</Text>
                <Text style={[styles.statusLabel, { color: theme.colors.textSecondary }]}>Available</Text>
              </View>
              <View style={[styles.statusCard, { backgroundColor: '#EF444415' }]}>
                <Text style={[styles.statusCount, { color: '#EF4444' }]}>2</Text>
                <Text style={[styles.statusLabel, { color: theme.colors.textSecondary }]}>Occupied</Text>
              </View>
              <View style={[styles.statusCard, { backgroundColor: '#F59E0B15' }]}>
                <Text style={[styles.statusCount, { color: '#F59E0B' }]}>3</Text>
                <Text style={[styles.statusLabel, { color: theme.colors.textSecondary }]}>Upcoming</Text>
              </View>
            </View>

            {/* Rooms Grid */}
            <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Available Rooms
              </Text>
              <View style={styles.roomsGrid}>
                {ROOMS.map((room, i) => (
                  <Animated.View key={room.id} entering={FadeInUp.delay(i * 50)}>
                    <TouchableOpacity
                      style={[
                        styles.roomCard,
                        { backgroundColor: theme.colors.background, borderColor: room.status === 'available' ? '#10B981' : '#EF4444' },
                        selectedRoom === room.id && { borderWidth: 2 }
                      ]}
                      onPress={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
                    >
                      <View style={styles.roomHeader}>
                        <View style={[styles.statusDot, { backgroundColor: getStatusColor(room.status) }]} />
                        <Text style={[styles.statusText, { color: getStatusColor(room.status) }]}>
                          {room.status.toUpperCase()}
                        </Text>
                      </View>
                      <Text style={[styles.roomName, { color: theme.colors.text }]}>
                        {room.name}
                      </Text>
                      <View style={styles.roomFeatures}>
                        <Users size={14} color={theme.colors.textSecondary} />
                        <Text style={[styles.capacityText, { color: theme.colors.textSecondary }]}>
                          {room.capacity} people
                        </Text>
                      </View>
                      {room.status === 'occupied' && (
                        <Text style={[styles.currentMeeting, { color: '#EF4444' }]}>
                          In use: {room.current}
                        </Text>
                      )}
                      <View style={styles.featuresList}>
                        {room.features.map((feature, j) => (
                          <View key={j} style={[styles.featureChip, { backgroundColor: theme.colors.background }]}>
                            <Text style={[styles.featureText, { color: theme.colors.textSecondary }]}>
                              {feature}
                            </Text>
                          </View>
                        ))}
                      </View>
                      {room.status === 'available' && (
                        <TouchableOpacity style={[styles.bookBtn, { backgroundColor: '#3B82F6' }]}>
                          <Text style={styles.bookBtnText}>Book Now</Text>
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </View>
            </View>
          </>
        ) : (
          <>
            {/* Today's Schedule */}
            <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Today's Schedule
              </Text>
              {UPCOMING_MEETINGS.map((meeting, i) => (
                <Animated.View key={meeting.id} entering={FadeInUp.delay(i * 50)}>
                  <TouchableOpacity style={[styles.meetingCard, { backgroundColor: theme.colors.background }]}>
                    <View style={[styles.meetingIndicator, { 
                      backgroundColor: meeting.status === 'live' ? '#EF4444' : meeting.status === 'upcoming' ? '#3B82F6' : '#10B981' 
                    }]} />
                    <View style={styles.meetingContent}>
                      <View style={styles.meetingHeader}>
                        <Text style={[styles.meetingTitle, { color: theme.colors.text }]}>
                          {meeting.title}
                        </Text>
                        {meeting.aiReady && (
                          <View style={styles.aiBadge}>
                            <Zap size={12} color="#8B5CF6" />
                            <Text style={[styles.aiBadgeText, { color: '#8B5CF6' }]}>AI</Text>
                          </View>
                        )}
                      </View>
                      <View style={styles.meetingDetails}>
                        <View style={styles.detailRow}>
                          <Monitor size={14} color={theme.colors.textSecondary} />
                          <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>
                            {meeting.room}
                          </Text>
                        </View>
                        <View style={styles.detailRow}>
                          <Clock size={14} color={theme.colors.textSecondary} />
                          <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>
                            {meeting.time} • {meeting.duration}
                          </Text>
                        </View>
                        <View style={styles.detailRow}>
                          <Users size={14} color={theme.colors.textSecondary} />
                          <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>
                            {meeting.attendees} attendees
                          </Text>
                        </View>
                      </View>
                      <View style={styles.meetingActions}>
                        {meeting.status === 'live' && (
                          <TouchableOpacity style={[styles.joinBtn, { backgroundColor: '#10B981' }]}>
                            <Video size={16} color="#fff" />
                            <Text style={styles.joinBtnText}>Join Now</Text>
                          </TouchableOpacity>
                        )}
                        {meeting.status === 'upcoming' && (
                          <TouchableOpacity style={[styles.upcomingBtn, { backgroundColor: '#3B82F615' }]}>
                            <Text style={[styles.upcomingBtnText, { color: '#3B82F6' }]}>
                              Starting in {Math.floor(Math.random() * 3 + 1)}h
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </>
        )}

        {/* AI Meeting Features */}
        <View style={[styles.section, { backgroundColor: theme.colors.card, marginBottom: 30 }]}>
          <View style={styles.aiHeader}>
            <Zap size={20} color="#8B5CF6" />
            <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 0 }]}>
              AI Meeting Assistant
            </Text>
          </View>
          <View style={styles.aiFeatures}>
            {AI_FEATURES.map((feature, i) => (
              <Animated.View key={feature.title} entering={FadeInUp.delay(i * 50)}>
                <TouchableOpacity style={[styles.aiFeatureCard, { backgroundColor: theme.colors.background }]}>
                  <View style={[styles.aiFeatureIcon, { backgroundColor: '#8B5CF615' }]}>
                    <feature.icon size={20} color="#8B5CF6" />
                  </View>
                  <Text style={[styles.aiFeatureTitle, { color: theme.colors.text }]}>
                    {feature.title}
                  </Text>
                  <Text style={[styles.aiFeatureDesc, { color: theme.colors.textSecondary }]}>
                    {feature.desc}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Meeting Controls Overlay */}
      {isInMeeting && (
        <View style={styles.meetingOverlay}>
          <View style={[styles.meetingControls, { backgroundColor: theme.colors.card }]}>
            <TouchableOpacity style={styles.controlBtn} onPress={() => setIsMuted(!isMuted)}>
              {isMuted ? (
                <MicOff size={24} color="#EF4444" />
              ) : (
                <Mic size={24} color={theme.colors.text} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlBtn} onPress={() => setIsVideoOff(!isVideoOff)}>
              {isVideoOff ? (
                <VideoOff size={24} color="#EF4444" />
              ) : (
                <Video size={24} color={theme.colors.text} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlBtn}>
              <ScreenShare size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlBtn}>
              <MoreVertical size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.endCallBtn, { backgroundColor: '#EF4444' }]} 
              onPress={() => setIsInMeeting(false)}
            >
              <PhoneOff size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 60 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', flex: 1, marginLeft: 12 },
  newBtn: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tabs: { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 10, padding: 4 },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, borderRadius: 8 },
  tabText: { fontSize: 14, fontWeight: '600' },
  content: {},
  statusRow: { flexDirection: 'row', padding: 16, gap: 10 },
  statusCard: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 12 },
  statusCount: { fontSize: 24, fontWeight: '800', marginBottom: 4 },
  statusLabel: { fontSize: 12 },
  section: { marginHorizontal: 16, marginTop: 16, padding: 16, borderRadius: 16 },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 14 },
  roomsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  roomCard: { width: '47%', padding: 14, borderRadius: 12, borderWidth: 1 },
  roomHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 10, fontWeight: '700' },
  roomName: { fontSize: 15, fontWeight: '600', marginBottom: 6 },
  roomFeatures: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 },
  capacityText: { fontSize: 12 },
  currentMeeting: { fontSize: 11, marginBottom: 8 },
  featuresList: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginBottom: 10 },
  featureChip: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  featureText: { fontSize: 9 },
  bookBtn: { paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  bookBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  meetingCard: { flexDirection: 'row', padding: 14, borderRadius: 12, marginBottom: 10 },
  meetingIndicator: { width: 4, borderRadius: 2, marginRight: 12 },
  meetingContent: { flex: 1 },
  meetingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  meetingTitle: { fontSize: 15, fontWeight: '600', flex: 1 },
  aiBadge: { flexDirection: 'row', alignItems: 'center', gap: 2, paddingHorizontal: 6, paddingVertical: 2, backgroundColor: '#8B5CF615', borderRadius: 4 },
  aiBadgeText: { fontSize: 10, fontWeight: '700' },
  meetingDetails: { gap: 4, marginBottom: 10 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  detailText: { fontSize: 12 },
  meetingActions: {},
  joinBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  joinBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  upcomingBtn: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  upcomingBtnText: { fontSize: 12, fontWeight: '600' },
  aiHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  aiFeatures: { flexDirection: 'row', gap: 10 },
  aiFeatureCard: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 12 },
  aiFeatureIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  aiFeatureTitle: { fontSize: 13, fontWeight: '600', marginBottom: 4 },
  aiFeatureDesc: { fontSize: 10, textAlign: 'center' },
  meetingOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  meetingControls: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16, paddingHorizontal: 20 },
  controlBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(0,0,0,0.05)', alignItems: 'center', justifyContent: 'center' },
  endCallBtn: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
});
