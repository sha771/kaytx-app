import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Users, TrendingUp, ArrowUpRight, ArrowDownRight,
  BarChart3, Target, DollarSign, Activity, Clock,
  Award, Calendar, CheckCircle, AlertTriangle, GraduationCap,
  MoreHorizontal, Briefcase
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function WorkforceManagementPage() {
  const WORKFORCE_METRICS = [
    { label: 'Employee Performance', value: '87.3%', icon: Activity, color: '#10B981', trend: '+4.5%', trendUp: true },
    { label: 'Scheduling Efficiency', value: '94.2%', icon: Calendar, color: '#3B82F6', trend: '+3.2%', trendUp: true },
    { label: 'Labor Costs', value: '$124M', icon: DollarSign, color: '#8B5CF6', trend: '-2.4%', trendUp: true },
    { label: 'Training Progress', value: '92.8%', icon: GraduationCap, color: '#F59E0B', trend: '+5.8%', trendUp: true },
    { label: 'Productivity Index', value: '+19.2%', icon: TrendingUp, color: '#EC4899', trend: '+6.4%', trendUp: true },
    { label: 'Employee Satisfaction', value: '88.6%', icon: Award, color: '#06B6D4', trend: '+2.8%', trendUp: true },
  ];

  const STORE_PERFORMANCE = [
    { store: 'Flagship Manhattan', employees: 142, productivity: '94.2%', satisfaction: '92.8%', turnover: '8.4%', color: '#10B981' },
    { store: 'Downtown Chicago', employees: 98, productivity: '91.6%', satisfaction: '89.4%', turnover: '12.2%', color: '#3B82F6' },
    { store: 'Silicon Valley', employees: 86, productivity: '93.8%', satisfaction: '94.2%', turnover: '7.8%', color: '#8B5CF6' },
    { store: 'Union Square', employees: 124, productivity: '88.4%', satisfaction: '86.8%', turnover: '14.6%', color: '#F59E0B' },
    { store: 'Downtown LA', employees: 76, productivity: '89.2%', satisfaction: '87.4%', turnover: '13.8%', color: '#EC4899' },
  ];

  const SCHEDULING_INTELLIGENCE = [
    { store: 'Flagship Manhattan', scheduled: '94.2%', coverage: '98.6%', overtime: '2.4%', efficiency: '96.8%', color: '#10B981' },
    { store: 'Downtown Chicago', scheduled: '91.8%', coverage: '95.2%', overtime: '4.8%', efficiency: '92.4%', color: '#3B82F6' },
    { store: 'Silicon Valley', scheduled: '93.4%', coverage: '97.8%', overtime: '3.2%', efficiency: '94.6%', color: '#8B5CF6' },
    { store: 'Union Square', scheduled: '88.6%', coverage: '92.4%', overtime: '6.8%', efficiency: '89.2%', color: '#F59E0B' },
  ];

  const TRAINING_STATUS = [
    { program: 'Customer Service Excellence', enrolled: '2.4K', completed: '1.8K', progress: '75%', completion: '92%', color: '#10B981' },
    { program: 'Sales Techniques Advanced', enrolled: '1.8K', completed: '1.2K', progress: '67%', completion: '88%', color: '#3B82F6' },
    { program: 'Inventory Management', enrolled: '1.4K', completed: '980', progress: '70%', completion: '86%', color: '#8B5CF6' },
    { program: 'Leadership Development', enrolled: '420', completed: '280', progress: '67%', completion: '84%', color: '#F59E0B' },
  ];

  const WORKFORCE_ALERTS = [
    { type: 'warning', message: 'Store #1842 showing 15% below average productivity this week', impact: 'Medium', time: '2h ago' },
    { type: 'critical', message: 'High turnover rate detected at Union Square location', impact: 'High', time: '4h ago' },
    { type: 'info', message: 'Training opportunity identified for 24 employees', impact: 'Low', time: '6h ago' },
    { type: 'success', message: 'Flagship Manhattan achieve highest productivity score', impact: 'Positive', time: '8h ago' },
  ];

  const EMPLOYEE_ROLES = [
    { role: 'Store Manager', count: '3,850', avgSalary: '$65K', performance: '92.4%', satisfaction: '88.6%', color: '#8B5CF6' },
    { role: 'Assistant Manager', count: '7,700', avgSalary: '$48K', performance: '89.8%', satisfaction: '86.4%', color: '#3B82F6' },
    { role: 'Sales Associate', count: '46,200', avgSalary: '$32K', performance: '87.2%', satisfaction: '84.8%', color: '#10B981' },
    { role: 'Cashier', count: '23,100', avgSalary: '$28K', performance: '85.6%', satisfaction: '82.4%', color: '#F59E0B' },
    { role: 'Stock Associate', count: '15,400', avgSalary: '$30K', performance: '86.8%', satisfaction: '83.2%', color: '#EC4899' },
  ];

  const renderWorkforceMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Workforce Metrics</Text>
      <View style={styles.metricsGrid}>
        {WORKFORCE_METRICS.map((metric, index) => (
          <View key={index} style={[styles.metricCard, { backgroundColor: metric.color + '10', borderColor: metric.color }]}>
            <metric.icon size={24} color={metric.color} />
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <View style={styles.metricTrend}>
              {metric.trendUp ? <ArrowUpRight size={12} color="#10B981" /> : <ArrowDownRight size={12} color="#EF4444" />}
              <Text style={[styles.metricTrendText, { color: metric.trendUp ? '#10B981' : '#EF4444' }]}>{metric.trend}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderStorePerformance = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Store Workforce Performance</Text>
      <View style={styles.storeGrid}>
        {STORE_PERFORMANCE.map((store) => (
          <View key={store.store} style={[styles.storeCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: store.color }]}>
            <View style={styles.storeHeader}>
              <Briefcase size={20} color={store.color} />
              <Text style={styles.storeName}>{store.store}</Text>
            </View>
            <View style={styles.storeEmployees}>
              <Users size={14} color="#6B7280" />
              <Text style={styles.storeEmployeesText}>{store.employees} employees</Text>
            </View>
            <View style={styles.storeMetrics}>
              <View style={styles.storeMetric}>
                <Text style={styles.storeMetricValue}>{store.productivity}</Text>
                <Text style={styles.storeMetricLabel}>Productivity</Text>
              </View>
              <View style={styles.storeMetric}>
                <Text style={styles.storeMetricValue}>{store.satisfaction}</Text>
                <Text style={styles.storeMetricLabel}>Satisfaction</Text>
              </View>
              <View style={styles.storeMetric}>
                <Text style={[styles.storeMetricValue, { color: store.turnover.includes('1') ? '#F59E0B' : '#10B981' }]}>{store.turnover}</Text>
                <Text style={styles.storeMetricLabel}>Turnover</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSchedulingIntelligence = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Scheduling Intelligence</Text>
      {SCHEDULING_INTELLIGENCE.map((item) => (
        <View key={item.store} style={[styles.scheduleCard, { backgroundColor: '#0A0F1A' }]}>
          <View style={styles.scheduleHeader}>
            <Calendar size={20} color="#8B5CF6" />
            <Text style={styles.scheduleStore}>{item.store}</Text>
          </View>
          <View style={styles.scheduleMetrics}>
            <View style={styles.scheduleMetric}>
              <Text style={styles.scheduleMetricLabel}>Scheduled</Text>
              <Text style={styles.scheduleMetricValue}>{item.scheduled}</Text>
            </View>
            <View style={styles.scheduleMetric}>
              <Text style={styles.scheduleMetricLabel}>Coverage</Text>
              <Text style={styles.scheduleMetricValue}>{item.coverage}</Text>
            </View>
            <View style={styles.scheduleMetric}>
              <Text style={styles.scheduleMetricLabel}>Overtime</Text>
              <Text style={[styles.scheduleMetricValue, { color: parseFloat(item.overtime) > 5 ? '#F59E0B' : '#10B981' }]}>{item.overtime}</Text>
            </View>
            <View style={styles.scheduleMetric}>
              <Text style={styles.scheduleMetricLabel}>Efficiency</Text>
              <Text style={styles.scheduleMetricValue}>{item.efficiency}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderTrainingStatus = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Training Programs</Text>
      <View style={styles.trainingGrid}>
        {TRAINING_STATUS.map((program) => (
          <View key={program.program} style={[styles.trainingCard, { backgroundColor: program.color + '10', borderColor: program.color }]}>
            <GraduationCap size={24} color={program.color} />
            <Text style={styles.trainingName}>{program.program}</Text>
            <View style={styles.trainingEnrollment}>
              <Users size={12} color="#6B7280" />
              <Text style={styles.trainingEnrollmentText}>{program.enrolled} enrolled</Text>
            </View>
            <View style={styles.trainingProgress}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: program.progress, backgroundColor: program.color }]} />
              </View>
              <Text style={styles.progressText}>{program.progress}</Text>
            </View>
            <View style={styles.trainingCompletion}>
              <CheckCircle size={12} color="#10B981" />
              <Text style={styles.trainingCompletionText}>{program.completion} completion</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderEmployeeRoles = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Employee Roles Distribution</Text>
      <View style={styles.rolesList}>
        {EMPLOYEE_ROLES.map((role) => (
          <View key={role.role} style={[styles.roleCard, { backgroundColor: role.color + '10', borderColor: role.color }]}>
            <View style={styles.roleHeader}>
              <Briefcase size={20} color={role.color} />
              <Text style={styles.roleName}>{role.role}</Text>
              <Text style={styles.roleCount}>{role.count}</Text>
            </View>
            <View style={styles.roleMetrics}>
              <View style={styles.roleMetric}>
                <Text style={styles.roleMetricLabel}>Avg Salary</Text>
                <Text style={styles.roleMetricValue}>{role.avgSalary}</Text>
              </View>
              <View style={styles.roleMetric}>
                <Text style={styles.roleMetricLabel}>Performance</Text>
                <Text style={styles.roleMetricValue}>{role.performance}</Text>
              </View>
              <View style={styles.roleMetric}>
                <Text style={styles.roleMetricLabel}>Satisfaction</Text>
                <Text style={styles.roleMetricValue}>{role.satisfaction}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderWorkforceAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Workforce Alerts</Text>
      {WORKFORCE_ALERTS.map((alert, index) => (
        <View key={index} style={[styles.alertCard, { 
          backgroundColor: alert.type === 'critical' ? '#EF444410' : 
                       alert.type === 'warning' ? '#F59E0B10' : 
                       alert.type === 'success' ? '#10B98110' : '#3B82F610',
          borderLeftColor: alert.type === 'critical' ? '#EF4444' : 
                          alert.type === 'warning' ? '#F59E0B' : 
                          alert.type === 'success' ? '#10B981' : '#3B82F6',
          borderLeftWidth: 3
        }]}>
          <View style={styles.alertHeader}>
            {alert.type === 'critical' && <AlertTriangle size={20} color="#EF4444" />}
            {alert.type === 'warning' && <AlertTriangle size={20} color="#F59E0B" />}
            {alert.type === 'success' && <CheckCircle size={20} color="#10B981" />}
            {alert.type === 'info' && <Activity size={20} color="#3B82F6" />}
            <Text style={styles.alertMessage}>{alert.message}</Text>
          </View>
          <View style={styles.alertFooter}>
            <View style={[styles.impactBadge, { backgroundColor: alert.impact === 'High' ? '#EF444420' : alert.impact === 'Medium' ? '#F59E0B20' : '#3B82F620' }]}>
              <Text style={[styles.impactText, { color: alert.impact === 'High' ? '#EF4444' : alert.impact === 'Medium' ? '#F59E0B' : '#3B82F6' }]}>{alert.impact}</Text>
            </View>
            <Clock size={12} color="#6B7280" />
            <Text style={styles.alertTime}>{alert.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Users size={32} color="#8B5CF6" />
        <View>
          <Text style={styles.headerTitle}>Workforce Management Hub</Text>
          <Text style={styles.headerSubtitle}>Employee performance, scheduling, and training optimization</Text>
        </View>
      </View>

      {renderWorkforceMetrics()}
      {renderStorePerformance()}
      {renderSchedulingIntelligence()}
      {renderTrainingStatus()}
      {renderEmployeeRoles()}
      {renderWorkforceAlerts()}
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
    padding: 24,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: (width - 64) / 3 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  storeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  storeCard: {
    width: (width - 64) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  storeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  storeName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  storeEmployees: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  storeEmployeesText: {
    fontSize: 12,
    color: '#6B7280',
  },
  storeMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  storeMetric: {
    alignItems: 'center',
  },
  storeMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  storeMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  scheduleCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scheduleStore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scheduleMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scheduleMetric: {
    alignItems: 'center',
  },
  scheduleMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  scheduleMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  trainingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  trainingCard: {
    width: (width - 64) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    alignItems: 'center',
  },
  trainingName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  trainingEnrollment: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trainingEnrollmentText: {
    fontSize: 12,
    color: '#6B7280',
  },
  trainingProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#1E293B',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  trainingCompletion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trainingCompletionText: {
    fontSize: 12,
    color: '#10B981',
  },
  rolesList: {
    gap: 12,
  },
  roleCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roleName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  roleCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  roleMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  roleMetric: {
    alignItems: 'center',
  },
  roleMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  roleMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  alertCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alertMessage: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
  },
  alertFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  impactText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  alertTime: {
    fontSize: 12,
    color: '#6B7280',
  },
});
