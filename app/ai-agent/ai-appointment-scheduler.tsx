import React, { useMemo, useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
  Switch,
} from 'react-native';
import {
  Calendar,
  Clock,
  Users,
  Plus,
  Search,
  Filter,
  ChevronRight,
  MoreHorizontal,
  CheckCircle,
  X,
  AlertCircle,
  Phone,
  Mail,
  Video,
  MapPin,
  Settings,
  Lock,
  ChartBarBig,
  BarChart3,
  TrendingUp,
  Clock4,
  CalendarDays,
  Briefcase,
  User,
  Zap,
  Sparkles,
  CalendarCheck,
  CalendarX,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIAppointmentSchedulerScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-appointment-scheduler')!;

  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

  const [activeTab, setActiveTab] = useState('today');
  const [selectedDate, setSelectedDate] = useState('today');

  const isPremiumLocked = useMemo(() => {
    return (
      agent.isPremium &&
      (subscription?.plan === 'free' || subscription?.plan === 'starter')
    );
  }, [agent.isPremium, subscription]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isPremiumLocked) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [isPremiumLocked, fadeAnim]);

  // Stats
  const stats = {
    today: { scheduled: 24, completed: 18, upcoming: 6, cancelled: 2 },
    week: { scheduled: 156, completed: 124, upcoming: 28, cancelled: 4 },
    month: { scheduled: 682, completed: 548, upcoming: 98, cancelled: 36 },
  };

  // Today's Appointments
  const todayAppointments = [
    {
      id: 'APT-2847',
      title: 'Product Demo - Enterprise Client',
      client: 'TechCorp Industries',
      host: 'Sarah Johnson',
      time: '2:00 PM - 3:00 PM',
      type: 'video',
      status: 'confirmed',
      attendees: 4,
    },
    {
      id: 'APT-2848',
      title: 'Q4 Strategy Review',
      client: 'Internal Team',
      host: 'Michael Chen',
      time: '3:30 PM - 4:30 PM',
      type: 'in-person',
      status: 'confirmed',
      attendees: 8,
    },
    {
      id: 'APT-2849',
      title: 'Contract Negotiation',
      client: 'Global Solutions Ltd',
      host: 'Emily Davis',
      time: '5:00 PM - 6:00 PM',
      type: 'phone',
      status: 'pending',
      attendees: 3,
    },
  ];

  // Upcoming
  const upcomingAppointments = [
    {
      id: 'APT-2850',
      title: 'Board Meeting',
      client: 'Executive Team',
      host: 'David Wilson',
      date: 'Tomorrow',
      time: '9:00 AM - 11:00 AM',
      type: 'in-person',
      status: 'confirmed',
    },
    {
      id: 'APT-2851',
      title: 'Sales Training',
      client: 'Sales Dept',
      host: 'Jessica Brown',
      date: 'Tomorrow',
      time: '2:00 PM - 4:00 PM',
      type: 'video',
      status: 'confirmed',
    },
    {
      id: 'APT-2852',
      title: 'Vendor Discussion',
      client: 'Supply Chain Inc',
      host: 'Alex Thompson',
      date: 'Wed, Nov 8',
      time: '10:00 AM - 11:00 AM',
      type: 'phone',
      status: 'confirmed',
    },
  ];

  // Quick Actions
  const quickActions = [
    { icon: Plus, label: 'New Meeting', color: '#10B981' },
    { icon: Clock4, label: 'Find Slot', color: '#3B82F6' },
    { icon: Users, label: 'Group Schedule', color: '#8B5CF6' },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'phone':
        return Phone;
      case 'in-person':
        return MapPin;
      default:
        return Calendar;
    }
  };

  const renderTodayTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.label}
              style={[
                styles.quickActionBtn,
                { backgroundColor: action.color + '15' },
              ]}
            >
              <action.icon size={20} color={action.color} />
              <Text style={[styles.quickActionText, { color: action.color }]}>
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Today's Stats */}
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}>
            <CalendarCheck size={20} color="#fff" />
            <Text style={styles.metricValue}>{stats.today.scheduled}</Text>
            <Text style={styles.metricLabel}>Scheduled</Text>
          </LinearGradient>

          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <CheckCircle size={20} color="#fff" />
            <Text style={styles.metricValue}>{stats.today.completed}</Text>
            <Text style={styles.metricLabel}>Completed</Text>
          </LinearGradient>

          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <Clock size={20} color="#fff" />
            <Text style={styles.metricValue}>{stats.today.upcoming}</Text>
            <Text style={styles.metricLabel}>Upcoming</Text>
          </LinearGradient>

          <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}>
            <CalendarX size={20} color="#fff" />
            <Text style={styles.metricValue}>{stats.today.cancelled}</Text>
            <Text style={styles.metricLabel}>Cancelled</Text>
          </LinearGradient>
        </View>

        {/* Today's Schedule */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <CalendarDays size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Today's Schedule
              </Text>
            </View>
            <Text style={[styles.dateText, { color: theme.colors.secondaryText }]}>
              Monday, Nov 6
            </Text>
          </View>

          <View style={styles.appointmentsList}>
            {todayAppointments.map((apt, index) => {
              const TypeIcon = getTypeIcon(apt.type);
              return (
                <View key={apt.id} style={styles.appointmentCard}>
                  <View style={styles.timeline}>
                    <View
                      style={[
                        styles.timelineDot,
                        { backgroundColor: theme.colors.primary },
                      ]}
                    />
                    {index < todayAppointments.length - 1 && (
                      <View
                        style={[
                          styles.timelineLine,
                          { backgroundColor: theme.colors.border },
                        ]}
                      />
                    )}
                  </View>

                  <View style={styles.appointmentContent}>
                    <View style={styles.appointmentHeader}>
                      <View style={styles.appointmentTime}>
                        <Clock size={14} color={theme.colors.secondaryText} />
                        <Text
                          style={[
                            styles.timeText,
                            { color: theme.colors.text },
                          ]}
                        >
                          {apt.time}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.typeBadge,
                          { backgroundColor: theme.colors.background },
                        ]}
                      >
                        <TypeIcon size={14} color={theme.colors.primary} />
                        <Text
                          style={[
                            styles.typeText,
                            { color: theme.colors.text },
                          ]}
                        >
                          {apt.type}
                        </Text>
                      </View>
                    </View>

                    <Text
                      style={[
                        styles.appointmentTitle,
                        { color: theme.colors.text },
                      ]}
                    >
                      {apt.title}
                    </Text>

                    <View style={styles.appointmentDetails}>
                      <View style={styles.appointmentDetail}>
                        <Briefcase size={14} color={theme.colors.secondaryText} />
                        <Text
                          style={[
                            styles.detailText,
                            { color: theme.colors.secondaryText },
                          ]}
                        >
                          {apt.client}
                        </Text>
                      </View>
                      <View style={styles.appointmentDetail}>
                        <User size={14} color={theme.colors.secondaryText} />
                        <Text
                          style={[
                            styles.detailText,
                            { color: theme.colors.secondaryText },
                          ]}
                        >
                          Host: {apt.host}
                        </Text>
                      </View>
                      <View style={styles.appointmentDetail}>
                        <Users size={14} color={theme.colors.secondaryText} />
                        <Text
                          style={[
                            styles.detailText,
                            { color: theme.colors.secondaryText },
                          ]}
                        >
                          {apt.attendees} attendees
                        </Text>
                      </View>
                    </View>

                    <View style={styles.appointmentFooter}>
                      <View
                        style={[
                          styles.statusBadge,
                          {
                            backgroundColor:
                              apt.status === 'confirmed'
                                ? '#10B98120'
                                : '#F59E0B20',
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusText,
                            {
                              color:
                                apt.status === 'confirmed'
                                  ? '#10B981'
                                  : '#F59E0B',
                            },
                          ]}
                        >
                          ● {apt.status}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.actionBtn,
                          { backgroundColor: theme.colors.primary + '15' },
                        ]}
                      >
                        <Text
                          style={[
                            styles.actionBtnText,
                            { color: theme.colors.primary },
                          ]}
                        >
                          Join
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {isPremiumLocked && (
        <Animated.View
          style={[
            styles.lockOverlay,
            {
              opacity: fadeAnim,
              backgroundColor: theme.colors.background + 'CC',
            },
          ]}
        >
          <View
            style={[
              styles.lockCard,
              { backgroundColor: theme.colors.cardBackground },
            ]}
          >
            <View
              style={[
                styles.lockIconContainer,
                { backgroundColor: theme.colors.primary + '15' },
              ]}
            >
              <Lock size={32} color={theme.colors.primary} />
            </View>
            <Text
              style={[styles.lockTitle, { color: theme.colors.text }]}
            >
              Premium Agent
            </Text>
            <Text
              style={[styles.lockDesc, { color: theme.colors.secondaryText }]}
            >
              The AI Appointment Scheduler is part of our Enterprise suite.
              Upgrade your plan to activate this agent.
            </Text>
            <TouchableOpacity
              style={[
                styles.upgradeBtn,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => router.push('/enterprise/billing')}
            >
              <Text style={styles.upgradeBtnText}>Upgrade Plan</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const renderUpcomingTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Week/Month Selector */}
        <View
          style={[
            styles.periodSelector,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          {['Day', 'Week', 'Month'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodBtn,
                period === 'Week' && {
                  backgroundColor: theme.colors.primary + '15',
                },
              ]}
            >
              <Text
                style={[
                  styles.periodText,
                  {
                    color:
                      period === 'Week'
                        ? theme.colors.primary
                        : theme.colors.secondaryText,
                  },
                ]}
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Overview */}
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}>
            <Calendar size={20} color="#fff" />
            <Text style={styles.metricValue}>{stats.week.scheduled}</Text>
            <Text style={styles.metricLabel}>This Week</Text>
          </LinearGradient>

          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <CheckCircle size={20} color="#fff" />
            <Text style={styles.metricValue}>79%</Text>
            <Text style={styles.metricLabel}>Show Rate</Text>
          </LinearGradient>

          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <Users size={20} color="#fff" />
            <Text style={styles.metricValue}>4.2</Text>
            <Text style={styles.metricLabel}>Avg Attendees</Text>
          </LinearGradient>

          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <Clock size={20} color="#fff" />
            <Text style={styles.metricValue}>52m</Text>
            <Text style={styles.metricLabel}>Avg Duration</Text>
          </LinearGradient>
        </View>

        {/* Upcoming Appointments */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Calendar size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Upcoming This Week
              </Text>
            </View>
          </View>

          <View style={styles.upcomingList}>
            {upcomingAppointments.map((apt) => {
              const TypeIcon = getTypeIcon(apt.type);
              return (
                <View key={apt.id} style={styles.upcomingCard}>
                  <View
                    style={[
                      styles.upcomingDate,
                      { backgroundColor: theme.colors.primary + '15' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.upcomingDateText,
                        { color: theme.colors.primary },
                      ]}
                    >
                      {apt.date}
                    </Text>
                  </View>

                  <View style={styles.upcomingContent}>
                    <Text
                      style={[styles.upcomingTitle, { color: theme.colors.text }]}
                    >
                      {apt.title}
                    </Text>

                    <View style={styles.upcomingDetails}>
                      <View style={styles.upcomingDetail}>
                        <Clock size={14} color={theme.colors.secondaryText} />
                        <Text
                          style={[
                            styles.upcomingDetailText,
                            { color: theme.colors.secondaryText },
                          ]}
                        >
                          {apt.time}
                        </Text>
                      </View>
                      <View style={styles.upcomingDetail}>
                        <Briefcase size={14} color={theme.colors.secondaryText} />
                        <Text
                          style={[
                            styles.upcomingDetailText,
                            { color: theme.colors.secondaryText },
                          ]}
                        >
                          {apt.client}
                        </Text>
                      </View>
                      <View style={styles.upcomingDetail}>
                        <User size={14} color={theme.colors.secondaryText} />
                        <Text
                          style={[
                            styles.upcomingDetailText,
                            { color: theme.colors.secondaryText },
                          ]}
                        >
                          {apt.host}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.upcomingFooter}>
                      <View
                        style={[
                          styles.upcomingType,
                          { backgroundColor: theme.colors.background },
                        ]}
                      >
                        <TypeIcon size={14} color={theme.colors.primary} />
                        <Text
                          style={[
                            styles.upcomingTypeText,
                            { color: theme.colors.text },
                          ]}
                        >
                          {apt.type}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.upcomingStatus,
                          { backgroundColor: '#10B98120' },
                        ]}
                      >
                        <Text
                          style={[
                            styles.upcomingStatusText,
                            { color: '#10B981' },
                          ]}
                        >
                          ● confirmed
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const customTabs = [
    { id: 'today', label: 'Today', icon: Calendar, component: renderTodayTab() },
    { id: 'upcoming', label: 'Upcoming', icon: CalendarDays, component: renderUpcomingTab() },
  ];

  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabContent: { padding: 20 },
  quickActions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  quickActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
  },
  quickActionText: { fontSize: 13, fontWeight: '600' },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 25,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 20,
    gap: 8,
  },
  metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' },
  metricLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
  },
  section: {
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  dateText: { fontSize: 14 },
  appointmentsList: {},
  appointmentCard: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timeline: {
    width: 20,
    alignItems: 'center',
    marginRight: 12,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: 4,
  },
  appointmentContent: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 16,
    borderRadius: 16,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  appointmentTime: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  timeText: { fontSize: 13, fontWeight: '600' },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: { fontSize: 12, fontWeight: '600', textTransform: 'capitalize' },
  appointmentTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  appointmentDetails: { gap: 8, marginBottom: 16 },
  appointmentDetail: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  detailText: { fontSize: 13 },
  appointmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  actionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionBtnText: { fontSize: 13, fontWeight: '600' },
  periodSelector: {
    flexDirection: 'row',
    padding: 6,
    borderRadius: 12,
    marginBottom: 20,
  },
  periodBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodText: { fontSize: 14, fontWeight: '600' },
  upcomingList: { gap: 16 },
  upcomingCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 16,
    borderRadius: 16,
  },
  upcomingDate: {
    width: 80,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  upcomingDateText: { fontSize: 13, fontWeight: '700' },
  upcomingContent: { flex: 1 },
  upcomingTitle: { fontSize: 15, fontWeight: '700', marginBottom: 10 },
  upcomingDetails: { gap: 6, marginBottom: 12 },
  upcomingDetail: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  upcomingDetailText: { fontSize: 12 },
  upcomingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upcomingType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  upcomingTypeText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  upcomingStatus: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  upcomingStatusText: { fontSize: 11, fontWeight: '600' },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 100,
  },
  lockCard: {
    width: '100%',
    padding: 30,
    borderRadius: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  lockIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  upgradeBtn: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
