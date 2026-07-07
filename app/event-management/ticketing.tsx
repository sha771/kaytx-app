import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Ticket, DollarSign, Users, CheckCircle, TrendingUp, ArrowRight,
  BarChart3, Activity, Clock, AlertTriangle, QrCode, CreditCard
} from 'lucide-react-native';

export default function TicketingCommandCenter() {
  const router = useRouter();

  const TICKETING_STATS = [
    { label: 'Tickets Sold', value: '9.4M', icon: Ticket, color: '#06B6D4', trend: '+15%' },
    { label: 'Revenue', value: '$5.8B', icon: DollarSign, color: '#10B981', trend: '+18%' },
    { label: 'Check-ins', value: '8.7M', icon: CheckCircle, color: '#8B5CF6', trend: '+12%' },
    { label: 'Attendance Rate', value: '93%', icon: Users, color: '#F59E0B', trend: '+2%' },
  ];

  const TICKET_TIERS = [
    { tier: 'VIP', sold: 124000, revenue: '$890M', avgPrice: '$7,200', color: '#FFD700' },
    { tier: 'Premium', sold: 890000, revenue: '$2.1B', avgPrice: '$2,400', color: '#8B5CF6' },
    { tier: 'General', sold: '5.2M', revenue: '$2.4B', avgPrice: '$460', color: '#06B6D4' },
    { tier: 'Early Bird', sold: '3.2M', revenue: '$410M', avgPrice: '$128', color: '#10B981' },
  ];

  const SALES_PERFORMANCE = [
    { period: 'Today', sales: '124K', revenue: '$8.9M', trend: '+12%', color: '#06B6D4' },
    { period: 'This Week', sales: '847K', revenue: '$62M', trend: '+15%', color: '#8B5CF6' },
    { period: 'This Month', sales: '3.2M', revenue: '$240M', trend: '+18%', color: '#10B981' },
    { period: 'This Quarter', sales: '8.9M', revenue: '$680M', trend: '+22%', color: '#F59E0B' },
  ];

  const LIVE_EVENTS = [
    {
      id: 1,
      name: 'Tech Summit 2026',
      date: '2026-08-15',
      totalTickets: 15000,
      sold: 14200,
      checkedIn: 12400,
      revenue: '$2.4M',
      status: 'selling-fast'
    },
    {
      id: 2,
      name: 'Global Music Festival',
      date: '2026-09-20',
      totalTickets: 50000,
      sold: 47800,
      checkedIn: 0,
      revenue: '$8.7M',
      status: 'on-sale'
    },
    {
      id: 3,
      name: 'AI Innovation Conference',
      date: '2026-10-10',
      totalTickets: 8000,
      sold: 6200,
      checkedIn: 0,
      revenue: '$1.8M',
      status: 'selling-steady'
    },
  ];

  const RECENT_TRANSACTIONS = [
    { type: 'purchase', event: 'Tech Summit 2026', tickets: 4, amount: '$2,400', time: '2s ago', icon: CreditCard, color: '#10B981' },
    { type: 'check-in', event: 'Global Music Festival', tickets: 2, amount: '-', time: '5s ago', icon: QrCode, color: '#06B6D4' },
    { type: 'purchase', event: 'AI Innovation Conference', tickets: 1, amount: '$480', time: '12s ago', icon: CreditCard, color: '#10B981' },
    { type: 'refund', event: 'Tech Summit 2026', tickets: 2, amount: '-$1,200', time: '24s ago', icon: AlertTriangle, color: '#EF4444' },
    { type: 'purchase', event: 'Global Music Festival', tickets: 6, amount: '$3,600', time: '31s ago', icon: CreditCard, color: '#10B981' },
    { type: 'check-in', event: 'Tech Summit 2026', tickets: 1, amount: '-', time: '45s ago', icon: QrCode, color: '#06B6D4' },
  ];

  const REGISTRATION_FUNNEL = [
    { stage: 'Page Views', value: '15.2M', conversion: 100, color: '#06B6D4' },
    { stage: 'Registration Started', value: '8.4M', conversion: 55, color: '#8B5CF6' },
    { stage: 'Profile Completed', value: '6.2M', conversion: 41, color: '#10B981' },
    { stage: 'Ticket Selection', value: '5.8M', conversion: 38, color: '#F59E0B' },
    { stage: 'Payment Initiated', value: '5.2M', conversion: 34, color: '#EC4899' },
    { stage: 'Tickets Purchased', value: '4.8M', conversion: 32, color: '#FFD700' },
  ];

  const REVENUE_ANALYTICS = [
    { category: 'VIP Tickets', current: '$890M', target: '$1.2B', progress: 74, color: '#FFD700' },
    { category: 'Premium Tickets', current: '$2.1B', target: '$2.5B', progress: 84, color: '#8B5CF6' },
    { category: 'General Admission', current: '$2.4B', target: '$3.0B', progress: 80, color: '#06B6D4' },
    { category: 'Early Bird', current: '$410M', target: '$500M', progress: 82, color: '#10B981' },
  ];

  const ATTENDANCE_HEATMAP = [
    { time: '8:00 AM', monday: 12, tuesday: 15, wednesday: 18, thursday: 22, friday: 28, saturday: 45, sunday: 35 },
    { time: '10:00 AM', monday: 25, tuesday: 32, wednesday: 38, thursday: 45, friday: 52, saturday: 68, sunday: 58 },
    { time: '12:00 PM', monday: 45, tuesday: 52, wednesday: 58, thursday: 65, friday: 72, saturday: 85, sunday: 78 },
    { time: '2:00 PM', monday: 52, tuesday: 58, wednesday: 65, thursday: 72, friday: 78, saturday: 92, sunday: 85 },
    { time: '4:00 PM', monday: 48, tuesday: 55, wednesday: 62, thursday: 68, friday: 75, saturday: 88, sunday: 82 },
    { time: '6:00 PM', monday: 65, tuesday: 72, wednesday: 78, thursday: 85, friday: 92, saturday: 95, sunday: 88 },
  ];

  const ENTRY_MONITORING = [
    { entrance: 'Main Entrance A', capacity: 5000, current: 4200, status: 'normal', color: '#10B981' },
    { entrance: 'Main Entrance B', capacity: 4000, current: 3800, status: 'busy', color: '#F59E0B' },
    { entrance: 'VIP Entrance', capacity: 1000, current: 850, status: 'normal', color: '#10B981' },
    { entrance: 'Staff Entrance', capacity: 500, current: 320, status: 'normal', color: '#10B981' },
    { entrance: 'Emergency Exit', capacity: 2000, current: 0, status: 'closed', color: '#6B7280' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'selling-fast': return '#10B981';
      case 'on-sale': return '#06B6D4';
      case 'selling-steady': return '#F59E0B';
      case 'sold-out': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Ticket size={48} color="#06B6D4" />
        </View>
        <View>
          <Text style={styles.headerTitle}>Ticketing Command Center</Text>
          <Text style={styles.headerSubtitle}>Sales & Registration Platform</Text>
        </View>
      </View>

      {/* Ticketing Stats */}
      <View style={styles.statsContainer}>
        {TICKETING_STATS.map((stat, index) => (
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

      {/* Ticket Tiers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ticket Tiers Performance</Text>
        {TICKET_TIERS.map((tier, index) => (
          <View key={index} style={[styles.tierCard, { borderColor: tier.color + '40' }]}>
            <View style={[styles.tierHeader, { backgroundColor: tier.color + '20' }]}>
              <Text style={[styles.tierName, { color: tier.color }]}>{tier.tier}</Text>
              <Text style={[styles.tierRevenue, { color: tier.color }]}>{tier.revenue}</Text>
            </View>
            <View style={styles.tierStats}>
              <View style={styles.tierStat}>
                <Text style={styles.tierStatValue}>{tier.sold}</Text>
                <Text style={styles.tierStatLabel}>Sold</Text>
              </View>
              <View style={styles.tierStat}>
                <Text style={styles.tierStatValue}>{tier.avgPrice}</Text>
                <Text style={styles.tierStatLabel}>Avg Price</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Sales Performance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sales Performance</Text>
        <View style={styles.performanceGrid}>
          {SALES_PERFORMANCE.map((perf, index) => (
            <View key={index} style={[styles.performanceCard, { borderColor: perf.color + '40' }]}>
              <Text style={styles.performancePeriod}>{perf.period}</Text>
              <Text style={styles.performanceSales}>{perf.sales} tickets</Text>
              <Text style={styles.performanceRevenue}>{perf.revenue}</Text>
              <View style={[styles.performanceTrend, { backgroundColor: perf.color + '20' }]}>
                <TrendingUp size={12} color={perf.color} />
                <Text style={[styles.performanceTrendText, { color: perf.color }]}>{perf.trend}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Live Events */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Events</Text>
        {LIVE_EVENTS.map((event) => (
          <View key={event.id} style={[styles.eventCard, { borderColor: getStatusColor(event.status) + '40' }]}>
            <View style={styles.eventHeader}>
              <View style={styles.eventHeaderLeft}>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
              </View>
              <View style={[styles.eventStatus, { backgroundColor: getStatusColor(event.status) + '20' }]}>
                <Activity size={14} color={getStatusColor(event.status)} />
                <Text style={[styles.eventStatusText, { color: getStatusColor(event.status) }]}>{event.status}</Text>
              </View>
            </View>

            {/* Sales Progress */}
            <View style={styles.salesProgress}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Tickets Sold</Text>
                <Text style={styles.progressValue}>{event.sold.toLocaleString()} / {event.totalTickets.toLocaleString()}</Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${(event.sold / event.totalTickets) * 100}%`,
                      backgroundColor: getStatusColor(event.status)
                    } 
                  ]} 
                />
              </View>
              <Text style={styles.progressPercent}>
                {Math.round((event.sold / event.totalTickets) * 100)}% sold
              </Text>
            </View>

            {/* Check-in Progress */}
            {event.checkedIn > 0 && (
              <View style={styles.checkinProgress}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Check-ins</Text>
                  <Text style={styles.progressValue}>{event.checkedIn.toLocaleString()} / {event.sold.toLocaleString()}</Text>
                </View>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${(event.checkedIn / event.sold) * 100}%`,
                        backgroundColor: '#10B981'
                      } 
                    ]} 
                  />
                </View>
                <Text style={styles.progressPercent}>
                  {Math.round((event.checkedIn / event.sold) * 100)}% checked in
                </Text>
              </View>
            )}

            {/* Revenue */}
            <View style={styles.eventRevenue}>
              <DollarSign size={20} color="#10B981" />
              <View>
                <Text style={styles.revenueLabel}>Total Revenue</Text>
                <Text style={styles.revenueValue}>{event.revenue}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.eventButton, { backgroundColor: '#06B6D4' }]}
              onPress={() => router.push('/event-management/dashboard')}
            >
              <Text style={styles.eventButtonText}>View Event Details</Text>
              <ArrowRight size={20} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Registration Funnel */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Registration Funnel</Text>
        <Text style={styles.sectionDescription}>Conversion rates from page views to ticket purchases</Text>
        <View style={styles.funnelContainer}>
          {REGISTRATION_FUNNEL.map((stage, index) => (
            <View key={index} style={styles.funnelStage}>
              <View style={styles.funnelHeader}>
                <Text style={styles.funnelStageName}>{stage.stage}</Text>
                <Text style={styles.funnelStageValue}>{stage.value}</Text>
              </View>
              <View style={styles.funnelBar}>
                <View 
                  style={[
                    styles.funnelFill, 
                    { width: `${stage.conversion}%`, backgroundColor: stage.color }
                  ]} 
                />
              </View>
              <Text style={[styles.funnelConversion, { color: stage.color }]}>{stage.conversion}% conversion</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Revenue Analytics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Revenue Analytics</Text>
        <Text style={styles.sectionDescription}>Real-time revenue tracking vs targets</Text>
        {REVENUE_ANALYTICS.map((revenue, index) => (
          <View key={index} style={styles.revenueCard}>
            <View style={styles.revenueHeader}>
              <Text style={styles.revenueCategory}>{revenue.category}</Text>
              <View style={styles.revenueValues}>
                <Text style={styles.revenueCurrent}>{revenue.current}</Text>
                <Text style={styles.revenueTarget}>/ {revenue.target}</Text>
              </View>
            </View>
            <View style={styles.revenueBar}>
              <View 
                style={[
                  styles.revenueFill, 
                  { width: `${revenue.progress}%`, backgroundColor: revenue.color }
                ]} 
              />
            </View>
            <Text style={[styles.revenueProgress, { color: revenue.color }]}>{revenue.progress}% of target</Text>
          </View>
        ))}
      </View>

      {/* Attendance Heatmap */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Attendance Heatmap</Text>
        <Text style={styles.sectionDescription}>Peak attendance patterns by time and day</Text>
        <View style={styles.heatmapContainer}>
          <View style={styles.heatmapHeader}>
            <Text style={styles.heatmapTime}>Time</Text>
            <Text style={styles.heatmapDay}>Mon</Text>
            <Text style={styles.heatmapDay}>Tue</Text>
            <Text style={styles.heatmapDay}>Wed</Text>
            <Text style={styles.heatmapDay}>Thu</Text>
            <Text style={styles.heatmapDay}>Fri</Text>
            <Text style={styles.heatmapDay}>Sat</Text>
            <Text style={styles.heatmapDay}>Sun</Text>
          </View>
          {ATTENDANCE_HEATMAP.map((row, index) => (
            <View key={index} style={styles.heatmapRow}>
              <Text style={styles.heatmapTimeCell}>{row.time}</Text>
              <View style={[styles.heatmapCell, { backgroundColor: `rgba(6, 182, 212, ${row.monday / 100})` }]}>
                <Text style={styles.heatmapCellValue}>{row.monday}%</Text>
              </View>
              <View style={[styles.heatmapCell, { backgroundColor: `rgba(139, 92, 246, ${row.tuesday / 100})` }]}>
                <Text style={styles.heatmapCellValue}>{row.tuesday}%</Text>
              </View>
              <View style={[styles.heatmapCell, { backgroundColor: `rgba(16, 185, 129, ${row.wednesday / 100})` }]}>
                <Text style={styles.heatmapCellValue}>{row.wednesday}%</Text>
              </View>
              <View style={[styles.heatmapCell, { backgroundColor: `rgba(245, 158, 11, ${row.thursday / 100})` }]}>
                <Text style={styles.heatmapCellValue}>{row.thursday}%</Text>
              </View>
              <View style={[styles.heatmapCell, { backgroundColor: `rgba(236, 72, 153, ${row.friday / 100})` }]}>
                <Text style={styles.heatmapCellValue}>{row.friday}%</Text>
              </View>
              <View style={[styles.heatmapCell, { backgroundColor: `rgba(255, 215, 0, ${row.saturday / 100})` }]}>
                <Text style={styles.heatmapCellValue}>{row.saturday}%</Text>
              </View>
              <View style={[styles.heatmapCell, { backgroundColor: `rgba(6, 182, 212, ${row.sunday / 100})` }]}>
                <Text style={styles.heatmapCellValue}>{row.sunday}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Entry Monitoring */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Entry Monitoring</Text>
        <Text style={styles.sectionDescription}>Real-time entrance capacity and flow</Text>
        {ENTRY_MONITORING.map((entrance, index) => (
          <View key={index} style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <Text style={styles.entranceName}>{entrance.entrance}</Text>
              <View style={[styles.entryStatus, { backgroundColor: entrance.color + '20' }]}>
                <CheckCircle size={12} color={entrance.color} />
                <Text style={[styles.entryStatusText, { color: entrance.color }]}>{entrance.status}</Text>
              </View>
            </View>
            <View style={styles.entryProgress}>
              <View style={styles.entryProgressHeader}>
                <Text style={styles.entryProgressLabel}>Capacity</Text>
                <Text style={styles.entryProgressValue}>{entrance.current} / {entrance.capacity}</Text>
              </View>
              <View style={styles.entryProgressBar}>
                <View 
                  style={[
                    styles.entryProgressFill, 
                    { width: `${(entrance.current / entrance.capacity) * 100}%`, backgroundColor: entrance.color }
                  ]} 
                />
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.transactionsList}>
          {RECENT_TRANSACTIONS.map((txn, index) => (
            <View key={index} style={styles.transactionItem}>
              <View style={[styles.transactionIcon, { backgroundColor: txn.color + '20' }]}>
                <txn.icon size={18} color={txn.color} />
              </View>
              <View style={styles.transactionContent}>
                <Text style={styles.transactionEvent}>{txn.event}</Text>
                <Text style={styles.transactionDetails}>{txn.tickets} tickets</Text>
              </View>
              <View style={styles.transactionRight}>
                <Text style={[styles.transactionAmount, { color: txn.color }]}>{txn.amount}</Text>
                <Text style={styles.transactionTime}>{txn.time}</Text>
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
            <Ticket size={24} color="#06B6D4" />
            <Text style={[styles.actionText, { color: '#06B6D4' }]}>Create Ticket</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#8B5CF615', borderColor: '#8B5CF640' }]}
          >
            <QrCode size={24} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Scan QR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#10B98115', borderColor: '#10B98140' }]}
          >
            <BarChart3 size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#F59E0B15', borderColor: '#F59E0B40' }]}
          >
            <AlertTriangle size={24} color="#F59E0B" />
            <Text style={[styles.actionText, { color: '#F59E0B' }]}>Refunds</Text>
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
  tierCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  tierName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tierRevenue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tierStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
  },
  tierStat: {
    alignItems: 'center',
  },
  tierStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tierStatLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  performanceCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  performancePeriod: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  performanceSales: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  performanceRevenue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  performanceTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  performanceTrendText: {
    fontSize: 11,
    fontWeight: '600',
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
  eventDate: {
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
  salesProgress: {
    marginBottom: 16,
  },
  checkinProgress: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressPercent: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  eventRevenue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  revenueLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  revenueValue: {
    fontSize: 18,
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
  transactionsList: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    gap: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionContent: {
    flex: 1,
  },
  transactionEvent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  transactionDetails: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  transactionTime: {
    fontSize: 11,
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
  funnelContainer: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
  },
  funnelStage: {
    marginBottom: 16,
  },
  funnelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  funnelStageName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  funnelStageValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  funnelBar: {
    height: 12,
    backgroundColor: '#1F2937',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 6,
  },
  funnelFill: {
    height: '100%',
    borderRadius: 6,
  },
  funnelConversion: {
    fontSize: 12,
    fontWeight: '600',
  },
  revenueCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  revenueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  revenueCategory: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  revenueValues: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  revenueCurrent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  revenueTarget: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  revenueBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  revenueFill: {
    height: '100%',
    borderRadius: 4,
  },
  revenueProgress: {
    fontSize: 12,
    fontWeight: '600',
  },
  heatmapContainer: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
  },
  heatmapHeader: {
    flexDirection: 'row',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    paddingBottom: 12,
  },
  heatmapTime: {
    width: 80,
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  heatmapDay: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  heatmapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  heatmapTimeCell: {
    width: 80,
    fontSize: 13,
    color: '#FFFFFF',
  },
  heatmapCell: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 4,
  },
  heatmapCellValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  entryCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  entranceName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  entryStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  entryStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  entryProgress: {
    marginBottom: 8,
  },
  entryProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  entryProgressLabel: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  entryProgressValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  entryProgressBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
  },
  entryProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
});
