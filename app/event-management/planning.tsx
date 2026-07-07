import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Calendar, Clock, CheckCircle, AlertTriangle, Users, DollarSign,
  TrendingUp, ArrowRight, BarChart3, Target, Zap, MapPin, Activity
} from 'lucide-react-native';

export default function EventPlanningHub() {
  const router = useRouter();

  const PLANNING_STATS = [
    { label: 'Events in Planning', value: '847', icon: Calendar, color: '#06B6D4', trend: '+12%' },
    { label: 'Tasks Completed', value: '12.4K', icon: CheckCircle, color: '#10B981', trend: '+18%' },
    { label: 'Milestones Hit', value: '3,240', icon: Target, color: '#8B5CF6', trend: '+15%' },
    { label: 'Planning Efficiency', value: '94%', icon: Zap, color: '#F59E0B', trend: '+5%' },
  ];

  const EVENTS = [
    {
      id: 1,
      name: 'Tech Summit 2026',
      date: '2026-08-15',
      status: 'on-track',
      progress: 78,
      budget: '$2.4M',
      spent: '$1.8M',
      attendees: '15,000',
      tasks: { total: 124, completed: 97, inProgress: 24, pending: 3 },
      milestones: [
        { name: 'Venue Secured', status: 'completed', date: '2026-02-15' },
        { name: 'Speakers Confirmed', status: 'completed', date: '2026-04-01' },
        { name: 'Registration Open', status: 'completed', date: '2026-05-01' },
        { name: 'Marketing Campaign', status: 'in-progress', date: '2026-06-15' },
        { name: 'Final Logistics', status: 'pending', date: '2026-07-15' },
      ]
    },
    {
      id: 2,
      name: 'Global Music Festival',
      date: '2026-09-20',
      status: 'on-track',
      progress: 62,
      budget: '$8.7M',
      spent: '$5.4M',
      attendees: '50,000',
      tasks: { total: 287, completed: 178, inProgress: 89, pending: 20 },
      milestones: [
        { name: 'Venue Secured', status: 'completed', date: '2026-03-01' },
        { name: 'Artists Booked', status: 'completed', date: '2026-04-15' },
        { name: 'Ticket Sales Launch', status: 'completed', date: '2026-05-15' },
        { name: 'Stage Construction', status: 'in-progress', date: '2026-07-01' },
        { name: 'Final Production', status: 'pending', date: '2026-08-15' },
      ]
    },
    {
      id: 3,
      name: 'AI Innovation Conference',
      date: '2026-10-10',
      status: 'at-risk',
      progress: 45,
      budget: '$1.8M',
      spent: '$890K',
      attendees: '8,000',
      tasks: { total: 156, completed: 70, inProgress: 45, pending: 41 },
      milestones: [
        { name: 'Venue Secured', status: 'completed', date: '2026-04-01' },
        { name: 'Keynote Speakers', status: 'in-progress', date: '2026-06-01' },
        { name: 'Sponsorship Target', status: 'at-risk', date: '2026-06-15' },
        { name: 'Registration Open', status: 'pending', date: '2026-07-01' },
        { name: 'Final Logistics', status: 'pending', date: '2026-09-01' },
      ]
    },
  ];

  const TIMELINE_PHASES = [
    { phase: 'Planning', start: 'Week 1-4', status: 'completed', color: '#10B981' },
    { phase: 'Venue & Logistics', start: 'Week 5-8', status: 'completed', color: '#10B981' },
    { phase: 'Speaker/Artist Booking', start: 'Week 9-12', status: 'completed', color: '#10B981' },
    { phase: 'Marketing Campaign', start: 'Week 13-16', status: 'in-progress', color: '#F59E0B' },
    { phase: 'Registration', start: 'Week 17-20', status: 'in-progress', color: '#F59E0B' },
    { phase: 'Final Prep', start: 'Week 21-24', status: 'pending', color: '#6B7280' },
    { phase: 'Event Execution', start: 'Week 25', status: 'pending', color: '#6B7280' },
  ];

  const RESOURCE_ALLOCATION = [
    { resource: 'Venue Staff', allocated: 450, total: 500, color: '#06B6D4' },
    { resource: 'Security', allocated: 120, total: 150, color: '#8B5CF6' },
    { resource: 'Technical Crew', allocated: 85, total: 100, color: '#10B981' },
    { resource: 'Catering', allocated: 200, total: 250, color: '#F59E0B' },
    { resource: 'Volunteers', allocated: 320, total: 400, color: '#EC4899' },
  ];

  const GANTT_TASKS = [
    { task: 'Venue Booking', start: 'Week 1', duration: 4, progress: 100, color: '#10B981' },
    { task: 'Speaker Booking', start: 'Week 3', duration: 6, progress: 100, color: '#10B981' },
    { task: 'Sponsorship Sales', start: 'Week 4', duration: 8, progress: 85, color: '#F59E0B' },
    { task: 'Marketing Campaign', start: 'Week 8', duration: 10, progress: 65, color: '#F59E0B' },
    { task: 'Registration Setup', start: 'Week 12', duration: 4, progress: 45, color: '#06B6D4' },
    { task: 'Logistics Planning', start: 'Week 14', duration: 6, progress: 30, color: '#06B6D4' },
    { task: 'Final Prep', start: 'Week 20', duration: 4, progress: 0, color: '#6B7280' },
  ];

  const PLANNING_ANALYTICS = [
    { metric: 'On-Time Delivery', value: '94%', target: '95%', color: '#10B981' },
    { metric: 'Budget Adherence', value: '87%', target: '90%', color: '#F59E0B' },
    { metric: 'Resource Utilization', value: '82%', target: '85%', color: '#8B5CF6' },
    { metric: 'Stakeholder Satisfaction', value: '4.6/5', target: '4.8/5', color: '#06B6D4' },
  ];

  const RESOURCE_MATRIX = [
    { event: 'Tech Summit 2026', venueStaff: 120, security: 40, technical: 30, catering: 80, volunteers: 100 },
    { event: 'Global Music Festival', venueStaff: 200, security: 60, technical: 45, catering: 100, volunteers: 180 },
    { event: 'AI Innovation Conference', venueStaff: 130, security: 20, technical: 10, catering: 20, volunteers: 40 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'in-progress': return '#F59E0B';
      case 'at-risk': return '#EF4444';
      case 'pending': return '#6B7280';
      default: return '#06B6D4';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'at-risk': return AlertTriangle;
      case 'pending': return Clock;
      default: return Activity;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Calendar size={48} color="#06B6D4" />
        </View>
        <View>
          <Text style={styles.headerTitle}>Event Planning Hub</Text>
          <Text style={styles.headerSubtitle}>Timeline & Resource Management</Text>
        </View>
      </View>

      {/* Planning Stats */}
      <View style={styles.statsContainer}>
        {PLANNING_STATS.map((stat, index) => (
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

      {/* Timeline Phases */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Event Timeline Phases</Text>
        <View style={styles.timelineContainer}>
          {TIMELINE_PHASES.map((phase, index) => (
            <View key={index} style={styles.timelinePhase}>
              <View style={[styles.phaseDot, { backgroundColor: phase.color }]} />
              <View style={styles.phaseContent}>
                <Text style={styles.phaseName}>{phase.phase}</Text>
                <Text style={styles.phaseTiming}>{phase.start}</Text>
                <View style={[styles.phaseStatus, { backgroundColor: phase.color + '20' }]}>
                  <Text style={[styles.phaseStatusText, { color: phase.color }]}>{phase.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Resource Allocation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resource Allocation</Text>
        {RESOURCE_ALLOCATION.map((resource, index) => (
          <View key={index} style={styles.resourceCard}>
            <View style={styles.resourceHeader}>
              <Text style={styles.resourceName}>{resource.resource}</Text>
              <Text style={styles.resourceAllocation}>
                {resource.allocated} / {resource.total}
              </Text>
            </View>
            <View style={styles.resourceBar}>
              <View 
                style={[
                  styles.resourceFill, 
                  { 
                    backgroundColor: resource.color, 
                    width: `${(resource.allocated / resource.total) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={styles.resourcePercent}>
              {Math.round((resource.allocated / resource.total) * 100)}% allocated
            </Text>
          </View>
        ))}
      </View>

      {/* Gantt Timeline */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gantt Timeline</Text>
        <Text style={styles.sectionDescription}>Visual task scheduling and dependencies</Text>
        <View style={styles.ganttContainer}>
          <View style={styles.ganttHeader}>
            <Text style={styles.ganttHeaderTask}>Task</Text>
            <View style={styles.ganttWeeks}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map((week) => (
                <Text key={week} style={styles.ganttWeek}>{week}</Text>
              ))}
            </View>
          </View>
          {GANTT_TASKS.map((task, index) => (
            <View key={index} style={styles.ganttRow}>
              <Text style={styles.ganttTaskName}>{task.task}</Text>
              <View style={styles.ganttTimeline}>
                <View 
                  style={[
                    styles.ganttBar, 
                    { 
                      left: `${(parseInt(task.start.split(' ')[1]) - 1) * 4}%`,
                      width: `${task.duration * 4}%`,
                      backgroundColor: task.color
                    } 
                  ]} 
                />
              </View>
              <View style={styles.ganttProgress}>
                <Text style={[styles.ganttProgressText, { color: task.color }]}>{task.progress}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Planning Analytics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Planning Analytics</Text>
        <View style={styles.analyticsGrid}>
          {PLANNING_ANALYTICS.map((metric, index) => (
            <View key={index} style={[styles.analyticsCard, { borderColor: metric.color + '40' }]}>
              <Text style={styles.analyticsValue}>{metric.value}</Text>
              <Text style={styles.analyticsMetric}>{metric.metric}</Text>
              <Text style={styles.analyticsTarget}>Target: {metric.target}</Text>
              <View style={[styles.analyticsIndicator, { backgroundColor: metric.color + '20' }]}>
                <CheckCircle size={12} color={metric.color} />
                <Text style={[styles.analyticsIndicatorText, { color: metric.color }]}>
                  {parseFloat(metric.value) >= parseFloat(metric.target.replace('/5', '')) ? 'On Track' : 'Needs Attention'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Resource Matrix */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resource Allocation Matrix</Text>
        <Text style={styles.sectionDescription}>Cross-event resource distribution</Text>
        <View style={styles.matrixContainer}>
          <View style={styles.matrixHeader}>
            <Text style={styles.matrixHeaderCell}>Event</Text>
            <Text style={styles.matrixHeaderCell}>Venue Staff</Text>
            <Text style={styles.matrixHeaderCell}>Security</Text>
            <Text style={styles.matrixHeaderCell}>Technical</Text>
            <Text style={styles.matrixHeaderCell}>Catering</Text>
            <Text style={styles.matrixHeaderCell}>Volunteers</Text>
          </View>
          {RESOURCE_MATRIX.map((row, index) => (
            <View key={index} style={styles.matrixRow}>
              <Text style={styles.matrixEvent}>{row.event}</Text>
              <View style={styles.matrixCell}>
                <Text style={styles.matrixValue}>{row.venueStaff}</Text>
                <View style={styles.matrixBar}>
                  <View style={[styles.matrixFill, { width: `${(row.venueStaff / 200) * 100}%`, backgroundColor: '#06B6D4' }]} />
                </View>
              </View>
              <View style={styles.matrixCell}>
                <Text style={styles.matrixValue}>{row.security}</Text>
                <View style={styles.matrixBar}>
                  <View style={[styles.matrixFill, { width: `${(row.security / 60) * 100}%`, backgroundColor: '#8B5CF6' }]} />
                </View>
              </View>
              <View style={styles.matrixCell}>
                <Text style={styles.matrixValue}>{row.technical}</Text>
                <View style={styles.matrixBar}>
                  <View style={[styles.matrixFill, { width: `${(row.technical / 45) * 100}%`, backgroundColor: '#10B981' }]} />
                </View>
              </View>
              <View style={styles.matrixCell}>
                <Text style={styles.matrixValue}>{row.catering}</Text>
                <View style={styles.matrixBar}>
                  <View style={[styles.matrixFill, { width: `${(row.catering / 100) * 100}%`, backgroundColor: '#F59E0B' }]} />
                </View>
              </View>
              <View style={styles.matrixCell}>
                <Text style={styles.matrixValue}>{row.volunteers}</Text>
                <View style={styles.matrixBar}>
                  <View style={[styles.matrixFill, { width: `${(row.volunteers / 180) * 100}%`, backgroundColor: '#EC4899' }]} />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Events in Planning */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Events in Planning</Text>
        {EVENTS.map((event) => (
          <View key={event.id} style={[styles.eventCard, { borderColor: getStatusColor(event.status) + '40' }]}>
            {/* Event Header */}
            <View style={styles.eventHeader}>
              <View style={styles.eventHeaderLeft}>
                <Text style={styles.eventName}>{event.name}</Text>
                <View style={styles.eventMeta}>
                  <View style={styles.eventMetaItem}>
                    <Calendar size={14} color="#9CA3AF" />
                    <Text style={styles.eventMetaText}>{event.date}</Text>
                  </View>
                  <View style={styles.eventMetaItem}>
                    <Users size={14} color="#9CA3AF" />
                    <Text style={styles.eventMetaText}>{event.attendees}</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(event.status) + '20' }]}>
                {React.createElement(getStatusIcon(event.status), { size: 14, color: getStatusColor(event.status) })}
                <Text style={[styles.statusText, { color: getStatusColor(event.status) }]}>{event.status}</Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Overall Progress</Text>
                <Text style={styles.progressValue}>{event.progress}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${event.progress}%`, backgroundColor: getStatusColor(event.status) }]} />
              </View>
            </View>

            {/* Budget */}
            <View style={styles.budgetSection}>
              <View style={styles.budgetItem}>
                <DollarSign size={16} color="#10B981" />
                <View>
                  <Text style={styles.budgetLabel}>Budget</Text>
                  <Text style={styles.budgetValue}>{event.budget}</Text>
                </View>
              </View>
              <View style={styles.budgetItem}>
                <TrendingUp size={16} color="#F59E0B" />
                <View>
                  <Text style={styles.budgetLabel}>Spent</Text>
                  <Text style={styles.budgetValue}>{event.spent}</Text>
                </View>
              </View>
            </View>

            {/* Tasks */}
            <View style={styles.tasksSection}>
              <Text style={styles.tasksTitle}>Task Progress</Text>
              <View style={styles.tasksGrid}>
                <View style={styles.taskStat}>
                  <Text style={styles.taskStatValue}>{event.tasks.completed}</Text>
                  <Text style={styles.taskStatLabel}>Completed</Text>
                </View>
                <View style={styles.taskStat}>
                  <Text style={styles.taskStatValue}>{event.tasks.inProgress}</Text>
                  <Text style={styles.taskStatLabel}>In Progress</Text>
                </View>
                <View style={styles.taskStat}>
                  <Text style={styles.taskStatValue}>{event.tasks.pending}</Text>
                  <Text style={styles.taskStatLabel}>Pending</Text>
                </View>
                <View style={styles.taskStat}>
                  <Text style={styles.taskStatValue}>{event.tasks.total}</Text>
                  <Text style={styles.taskStatLabel}>Total</Text>
                </View>
              </View>
            </View>

            {/* Milestones */}
            <View style={styles.milestonesSection}>
              <Text style={styles.milestonesTitle}>Milestones</Text>
              {event.milestones.map((milestone, index) => {
                const StatusIcon = getStatusIcon(milestone.status);
                return (
                  <View key={index} style={styles.milestoneItem}>
                    <View style={[styles.milestoneIcon, { backgroundColor: getStatusColor(milestone.status) + '20' }]}>
                      <StatusIcon size={16} color={getStatusColor(milestone.status)} />
                    </View>
                    <View style={styles.milestoneContent}>
                      <Text style={styles.milestoneName}>{milestone.name}</Text>
                      <Text style={styles.milestoneDate}>{milestone.date}</Text>
                    </View>
                    <View style={[styles.milestoneStatus, { backgroundColor: getStatusColor(milestone.status) + '20' }]}>
                      <Text style={[styles.milestoneStatusText, { color: getStatusColor(milestone.status) }]}>{milestone.status}</Text>
                    </View>
                  </View>
                );
              })}
            </View>

            {/* Action Button */}
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
  timelineContainer: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
  },
  timelinePhase: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    gap: 16,
  },
  phaseDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  phaseContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  phaseName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  phaseTiming: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  phaseStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  phaseStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  resourceCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resourceName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  resourceAllocation: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  resourceBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  resourceFill: {
    height: '100%',
    borderRadius: 4,
  },
  resourcePercent: {
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
    gap: 8,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  eventMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  eventMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventMetaText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressSection: {
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
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  budgetSection: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  budgetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  budgetLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  budgetValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tasksSection: {
    marginBottom: 16,
  },
  tasksTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  tasksGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
  },
  taskStat: {
    alignItems: 'center',
  },
  taskStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  taskStatLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  milestonesSection: {
    marginBottom: 16,
  },
  milestonesTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    gap: 12,
  },
  milestoneIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  milestoneDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  milestoneStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  milestoneStatusText: {
    fontSize: 11,
    fontWeight: '600',
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
  ganttContainer: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
  },
  ganttHeader: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    paddingBottom: 12,
  },
  ganttHeaderTask: {
    width: 120,
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  ganttWeeks: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ganttWeek: {
    width: 16,
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
  },
  ganttRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    gap: 12,
  },
  ganttTaskName: {
    width: 120,
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ganttTimeline: {
    flex: 1,
    height: 24,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    position: 'relative',
  },
  ganttBar: {
    position: 'absolute',
    height: '100%',
    borderRadius: 4,
  },
  ganttProgress: {
    width: 50,
    alignItems: 'center',
  },
  ganttProgressText: {
    fontSize: 12,
    fontWeight: '600',
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  analyticsCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  analyticsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  analyticsMetric: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  analyticsTarget: {
    fontSize: 10,
    color: '#6B7280',
  },
  analyticsIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  analyticsIndicatorText: {
    fontSize: 11,
    fontWeight: '600',
  },
  matrixContainer: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
  },
  matrixHeader: {
    flexDirection: 'row',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    paddingBottom: 12,
  },
  matrixHeaderCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  matrixRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    gap: 8,
  },
  matrixEvent: {
    width: 140,
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  matrixCell: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  matrixValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  matrixBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#1F2937',
    borderRadius: 2,
    overflow: 'hidden',
  },
  matrixFill: {
    height: '100%',
    borderRadius: 2,
  },
});
