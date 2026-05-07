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
  Users,
  LogIn,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Settings,
  Lock,
  ChartBarBig,
  BarChart3,
  Building,
  QrCode,
  Camera,
  FileText,
  Search,
  Filter,
  ChevronRight,
  MoreHorizontal,
  Calendar,
  Phone,
  Mail,
  User,
  Briefcase,
  MapPin,
  BadgeCheck,
  X,
  Printer,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIVisitorLoggerScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-visitor-logger')!;

  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

  const [activeTab, setActiveTab] = useState('today');
  const [searchQuery, setSearchQuery] = useState('');

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

  // Today's Stats
  const todayStats = {
    checkedIn: 47,
    checkedOut: 38,
    currentlyIn: 9,
    expected: 12,
  };

  // Current Visitors
  const currentVisitors = [
    {
      id: 'V-2847',
      name: 'John Smith',
      company: 'Acme Corp',
      host: 'Sarah Johnson',
      department: 'Sales',
      checkIn: '9:15 AM',
      status: 'checked-in',
      badge: 'B-1042',
    },
    {
      id: 'V-2848',
      name: 'Emily Chen',
      company: 'TechStart Inc',
      host: 'Michael Davis',
      department: 'Engineering',
      checkIn: '10:30 AM',
      status: 'in-meeting',
      badge: 'B-1043',
    },
    {
      id: 'V-2849',
      name: 'Robert Wilson',
      company: 'Global Solutions',
      host: 'Jennifer Lee',
      department: 'Marketing',
      checkIn: '11:00 AM',
      status: 'checked-in',
      badge: 'B-1044',
    },
    {
      id: 'V-2850',
      name: 'Maria Garcia',
      company: 'Consulting Pro',
      host: 'David Brown',
      department: 'Finance',
      checkIn: '1:45 PM',
      status: 'checked-in',
      badge: 'B-1045',
    },
  ];

  // Expected Visitors
  const expectedVisitors = [
    {
      id: 'E-1042',
      name: 'James Anderson',
      company: 'Enterprise Ltd',
      host: 'Lisa Taylor',
      department: 'Operations',
      scheduled: '3:00 PM',
      status: 'confirmed',
    },
    {
      id: 'E-1043',
      name: 'Sophie Martin',
      company: 'Creative Studio',
      host: 'Tom Wilson',
      department: 'Design',
      scheduled: '3:30 PM',
      status: 'confirmed',
    },
    {
      id: 'E-1044',
      name: 'Ahmed Hassan',
      company: 'DataTech',
      host: 'Alex Johnson',
      department: 'IT',
      scheduled: '4:00 PM',
      status: 'pending',
    },
  ];

  // Recent History
  const recentHistory = [
    {
      id: 'H-2840',
      name: 'Patricia Moore',
      company: 'Legal Advisors',
      host: 'Karen White',
      checkIn: '8:30 AM',
      checkOut: '10:15 AM',
      duration: '1h 45m',
    },
    {
      id: 'H-2841',
      name: 'Thomas Wright',
      company: 'BuildCorp',
      host: 'Chris Green',
      checkIn: '9:00 AM',
      checkOut: '11:30 AM',
      duration: '2h 30m',
    },
    {
      id: 'H-2842',
      name: 'Anna Johnson',
      company: 'Media Group',
      host: 'Mark Davis',
      checkIn: '10:00 AM',
      checkOut: '12:00 PM',
      duration: '2h 0m',
    },
  ];

  // Weekly Stats
  const weeklyStats = {
    totalVisitors: 342,
    avgDuration: '1h 24m',
    noShows: 12,
    satisfaction: '98.2%',
  };

  const renderTodayTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Today's Stats */}
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <LogIn size={20} color="#fff" />
            <Text style={styles.metricValue}>{todayStats.checkedIn}</Text>
            <Text style={styles.metricLabel}>Checked In</Text>
          </LinearGradient>

          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}>
            <Users size={20} color="#fff" />
            <Text style={styles.metricValue}>{todayStats.currentlyIn}</Text>
            <Text style={styles.metricLabel}>Currently In</Text>
          </LinearGradient>

          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <Calendar size={20} color="#fff" />
            <Text style={styles.metricValue}>{todayStats.expected}</Text>
            <Text style={styles.metricLabel}>Expected</Text>
          </LinearGradient>

          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <Clock size={20} color="#fff" />
            <Text style={styles.metricValue}>{todayStats.checkedOut}</Text>
            <Text style={styles.metricLabel}>Checked Out</Text>
          </LinearGradient>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={18} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search visitors..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Current Visitors */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Users size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Currently Checked In
              </Text>
            </View>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>

          <View style={styles.visitorsList}>
            {currentVisitors.map((visitor) => (
              <View key={visitor.id} style={styles.visitorCard}>
                <View style={styles.visitorHeader}>
                  <View style={styles.visitorInfo}>
                    <View
                      style={[
                        styles.visitorAvatar,
                        { backgroundColor: theme.colors.primary + '15' },
                      ]}
                    >
                      <User size={20} color={theme.colors.primary} />
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.visitorName,
                          { color: theme.colors.text },
                        ]}
                      >
                        {visitor.name}
                      </Text>
                      <Text
                        style={[
                          styles.visitorCompany,
                          { color: theme.colors.secondaryText },
                        ]}
                      >
                        {visitor.company}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          visitor.status === 'checked-in'
                            ? '#10B98120'
                            : '#3B82F620',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            visitor.status === 'checked-in'
                              ? '#10B981'
                              : '#3B82F6',
                        },
                      ]}
                    >
                      ●{' '}
                      {visitor.status === 'checked-in'
                        ? 'Checked In'
                        : 'In Meeting'}
                    </Text>
                  </View>
                </View>

                <View style={styles.visitorDetails}>
                  <View style={styles.visitorDetail}>
                    <Briefcase size={14} color={theme.colors.secondaryText} />
                    <Text
                      style={[
                        styles.visitorDetailText,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      Visiting: {visitor.host}
                    </Text>
                  </View>
                  <View style={styles.visitorDetail}>
                    <Building size={14} color={theme.colors.secondaryText} />
                    <Text
                      style={[
                        styles.visitorDetailText,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      Dept: {visitor.department}
                    </Text>
                  </View>
                  <View style={styles.visitorDetail}>
                    <Clock size={14} color={theme.colors.secondaryText} />
                    <Text
                      style={[
                        styles.visitorDetailText,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      Check-in: {visitor.checkIn}
                    </Text>
                  </View>
                  <View style={styles.visitorDetail}>
                    <BadgeCheck size={14} color={theme.colors.secondaryText} />
                    <Text
                      style={[
                        styles.visitorDetailText,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      Badge: {visitor.badge}
                    </Text>
                  </View>
                </View>

                <View style={styles.visitorActions}>
                  <TouchableOpacity
                    style={[
                      styles.actionBtn,
                      { backgroundColor: theme.colors.primary + '15' },
                    ]}
                  >
                    <Printer size={16} color={theme.colors.primary} />
                    <Text
                      style={[
                        styles.actionBtnText,
                        { color: theme.colors.primary },
                      ]}
                    >
                      Reprint Badge
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.actionBtn,
                      { backgroundColor: '#EF4444' + '15' },
                    ]}
                  >
                    <X size={16} color="#EF4444" />
                    <Text style={[styles.actionBtnText, { color: '#EF4444' }]}>
                      Check Out
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Expected Visitors */}
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
                Expected Today
              </Text>
            </View>
          </View>

          <View style={styles.expectedList}>
            {expectedVisitors.map((visitor) => (
              <View key={visitor.id} style={styles.expectedCard}>
                <View style={styles.expectedLeft}>
                  <View
                    style={[
                      styles.expectedAvatar,
                      { backgroundColor: theme.colors.background },
                    ]}
                  >
                    <User size={18} color={theme.colors.secondaryText} />
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.expectedName,
                        { color: theme.colors.text },
                      ]}
                    >
                      {visitor.name}
                    </Text>
                    <Text
                      style={[
                        styles.expectedCompany,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      {visitor.company}
                    </Text>
                  </View>
                </View>
                <View style={styles.expectedRight}>
                  <Text
                    style={[
                      styles.expectedTime,
                      { color: theme.colors.text },
                    ]}
                  >
                    {visitor.scheduled}
                  </Text>
                  <View
                    style={[
                      styles.expectedStatus,
                      {
                        backgroundColor:
                          visitor.status === 'confirmed'
                            ? '#10B98120'
                            : '#F59E0B20',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.expectedStatusText,
                        {
                          color:
                            visitor.status === 'confirmed'
                              ? '#10B981'
                              : '#F59E0B',
                        },
                      ]}
                    >
                      {visitor.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
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
              The AI Visitor Logger is part of our Enterprise suite. Upgrade
              your plan to activate this agent.
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

  const renderHistoryTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Weekly Stats */}
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <Users size={20} color="#fff" />
            <Text style={styles.metricValue}>{weeklyStats.totalVisitors}</Text>
            <Text style={styles.metricLabel}>This Week</Text>
          </LinearGradient>

          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}>
            <Clock size={20} color="#fff" />
            <Text style={styles.metricValue}>{weeklyStats.avgDuration}</Text>
            <Text style={styles.metricLabel}>Avg Duration</Text>
          </LinearGradient>

          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <X size={20} color="#fff" />
            <Text style={styles.metricValue}>{weeklyStats.noShows}</Text>
            <Text style={styles.metricLabel}>No Shows</Text>
          </LinearGradient>

          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <CheckCircle size={20} color="#fff" />
            <Text style={styles.metricValue}>{weeklyStats.satisfaction}</Text>
            <Text style={styles.metricLabel}>Satisfaction</Text>
          </LinearGradient>
        </View>

        {/* Recent History */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <BarChart3 size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Recent Check-outs
              </Text>
            </View>
          </View>

          <View style={styles.historyList}>
            {recentHistory.map((visitor) => (
              <View key={visitor.id} style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <View style={styles.historyInfo}>
                    <View
                      style={[
                        styles.historyAvatar,
                        { backgroundColor: theme.colors.background },
                      ]}
                    >
                      <User size={18} color={theme.colors.secondaryText} />
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.historyName,
                          { color: theme.colors.text },
                        ]}
                      >
                        {visitor.name}
                      </Text>
                      <Text
                        style={[
                          styles.historyCompany,
                          { color: theme.colors.secondaryText },
                        ]}
                      >
                        {visitor.company}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.historyDuration}>
                    <Clock size={14} color="#10B981" />
                    <Text style={styles.durationText}>{visitor.duration}</Text>
                  </View>
                </View>

                <View style={styles.historyDetails}>
                  <View style={styles.historyDetail}>
                    <Briefcase size={14} color={theme.colors.secondaryText} />
                    <Text
                      style={[
                        styles.historyDetailText,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      Host: {visitor.host}
                    </Text>
                  </View>
                  <View style={styles.historyTimes}>
                    <Text
                      style={[
                        styles.historyTime,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      In: {visitor.checkIn}
                    </Text>
                    <Text
                      style={[
                        styles.historyTime,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      Out: {visitor.checkOut}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const customTabs = [
    { id: 'today', label: 'Today', icon: Users, component: renderTodayTab() },
    { id: 'history', label: 'History', icon: BarChart3, component: renderHistoryTab() },
  ];

  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabContent: { padding: 20 },
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 20,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15 },
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
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EF444420',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  liveText: { fontSize: 11, color: '#EF4444', fontWeight: '700' },
  visitorsList: { gap: 16 },
  visitorCard: {
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 16,
    borderRadius: 16,
  },
  visitorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  visitorInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  visitorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visitorName: { fontSize: 16, fontWeight: '700' },
  visitorCompany: { fontSize: 13, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '600' },
  visitorDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  visitorDetail: { flexDirection: 'row', alignItems: 'center', gap: 6, width: '48%' },
  visitorDetailText: { fontSize: 12 },
  visitorActions: { flexDirection: 'row', gap: 10 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
  },
  actionBtnText: { fontSize: 13, fontWeight: '600' },
  expectedList: { gap: 12 },
  expectedCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 14,
    borderRadius: 14,
  },
  expectedLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  expectedAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expectedName: { fontSize: 15, fontWeight: '600' },
  expectedCompany: { fontSize: 12, marginTop: 2 },
  expectedRight: { alignItems: 'flex-end' },
  expectedTime: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  expectedStatus: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  expectedStatusText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  historyList: { gap: 16 },
  historyCard: {
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 16,
    borderRadius: 16,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  historyAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyName: { fontSize: 15, fontWeight: '600' },
  historyCompany: { fontSize: 12, marginTop: 2 },
  historyDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#10B98120',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  durationText: { fontSize: 12, color: '#10B981', fontWeight: '600' },
  historyDetails: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  historyDetail: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  historyDetailText: { fontSize: 13 },
  historyTimes: { flexDirection: 'row', gap: 16 },
  historyTime: { fontSize: 12 },
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
