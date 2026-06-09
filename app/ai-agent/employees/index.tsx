import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Users, Search, Filter, Crown, UserCircle, UsersRound, User, ArrowRight, Activity, ChartBarBig, Briefcase, Plus, ChartLine } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const EMPLOYEES_DATA = [
  // C-Suite
  { id: 'ceo-001', name: 'AI CEO Advisor', level: 'c-suite', department: 'Executive', status: 'active', color: '#FFD700' },
  { id: 'cfo-001', name: 'AI CFO Analyst', level: 'c-suite', department: 'Finance', status: 'active', color: '#10B981' },
  { id: 'cto-001', name: 'AI CTO Advisor', level: 'c-suite', department: 'Technology', status: 'active', color: '#3B82F6' },
  { id: 'cmo-001', name: 'AI CMO Advisor', level: 'c-suite', department: 'Marketing', status: 'active', color: '#F43F5E' },
  { id: 'coo-001', name: 'AI COO Strategist', level: 'c-suite', department: 'Operations', status: 'active', color: '#8B5CF6' },
  // VP Level
  { id: 'vp-sales', name: 'VP Sales', level: 'vp-director', department: 'Sales', status: 'active', color: '#E65100' },
  { id: 'vp-marketing', name: 'VP Marketing', level: 'vp-director', department: 'Marketing', status: 'active', color: '#F43F5E' },
  { id: 'vp-engineering', name: 'VP Engineering', level: 'vp-director', department: 'Engineering', status: 'active', color: '#3B82F6' },
  { id: 'vp-product', name: 'VP Product', level: 'vp-director', department: 'Product', status: 'active', color: '#A855F7' },
  { id: 'vp-hr', name: 'VP HR', level: 'vp-director', department: 'HR', status: 'active', color: '#EC4899' },
  // Managers
  { id: 'mgr-sales', name: 'Sales Manager', level: 'manager', department: 'Sales', status: 'active', color: '#E65100' },
  { id: 'mgr-marketing', name: 'Marketing Manager', level: 'manager', department: 'Marketing', status: 'active', color: '#F43F5E' },
  { id: 'mgr-dev', name: 'Engineering Manager', level: 'manager', department: 'Engineering', status: 'active', color: '#3B82F6' },
  { id: 'mgr-product', name: 'Product Manager', level: 'manager', department: 'Product', status: 'active', color: '#A855F7' },
  { id: 'mgr-ops', name: 'Operations Manager', level: 'manager', department: 'Operations', status: 'active', color: '#8B5CF6' },
  // Team Leads
  { id: 'lead-sales', name: 'Sales Team Lead', level: 'team-lead', department: 'Sales', status: 'active', color: '#E65100' },
  { id: 'lead-dev', name: 'Engineering Lead', level: 'team-lead', department: 'Engineering', status: 'active', color: '#3B82F6' },
  { id: 'lead-qa', name: 'QA Lead', level: 'team-lead', department: 'Engineering', status: 'active', color: '#F59E0B' },
  { id: 'lead-design', name: 'Design Lead', level: 'team-lead', department: 'Product', status: 'active', color: '#A855F7' },
  // Specialists
  { id: 'spec-sales-1', name: 'Sales Representative', level: 'specialist', department: 'Sales', status: 'active', color: '#E65100' },
  { id: 'spec-dev-1', name: 'Frontend Developer', level: 'specialist', department: 'Engineering', status: 'active', color: '#3B82F6' },
  { id: 'spec-dev-2', name: 'Backend Developer', level: 'specialist', department: 'Engineering', status: 'active', color: '#3B82F6' },
  { id: 'spec-content', name: 'Content Writer', level: 'specialist', department: 'Marketing', status: 'active', color: '#F43F5E' },
  { id: 'spec-support', name: 'Support Agent', level: 'specialist', department: 'Customer', status: 'active', color: '#007AFF' },
];

const LEVEL_CONFIG = {
  'c-suite': { label: 'C-Suite', icon: Crown, color: '#FFD700', count: 15 },
  'vp-director': { label: 'VP/Directors', icon: Users, color: '#8B5CF6', count: 20 },
  'manager': { label: 'Managers', icon: UserCircle, color: '#3B82F6', count: 24 },
  'team-lead': { label: 'Team Leads', icon: UsersRound, color: '#10B981', count: 24 },
  'specialist': { label: 'Specialists', icon: User, color: '#F59E0B', count: 35 },
};

const DEPARTMENTS = ['All', 'Executive', 'Sales', 'Marketing', 'Engineering', 'Product', 'Operations', 'HR', 'Customer', 'Finance'];

// Chart Data
const EMPLOYEE_GROWTH_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [45, 52, 58, 65, 72, 78],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const DEPARTMENT_DISTRIBUTION_DATA = [
  {
    name: 'Engineering',
    population: 25,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Sales',
    population: 18,
    color: '#E65100',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Marketing',
    population: 15,
    color: '#F43F5E',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Product',
    population: 12,
    color: '#A855F7',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Operations',
    population: 8,
    color: '#8B5CF6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

const PERFORMANCE_SCORES_DATA = {
  labels: ['C-Suite', 'VP', 'Manager', 'Team Lead', 'Specialist'],
  datasets: [
    {
      data: [95, 88, 82, 78, 75],
    },
  ],
};

const HIRING_TREND_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [8, 12, 15, 10, 18, 14],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const SATISFACTION_SCORE_DATA = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      data: [4.2, 4.5, 4.3, 4.7],
      color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const SKILL_DISTRIBUTION_DATA = [
  {
    name: 'Technical',
    population: 35,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Leadership',
    population: 25,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Communication',
    population: 20,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Creative',
    population: 20,
    color: '#8B5CF6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

const TRAINING_COMPLETION_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [65, 72, 78, 85, 88, 92],
      color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const PROJECT_ALLOCATION_DATA = [
  {
    name: 'Active',
    population: 45,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'On Hold',
    population: 25,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Completed',
    population: 20,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Available',
    population: 10,
    color: '#8B5CF6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

const WORK_HOURS_DATA = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [42, 45, 44, 46, 43, 8, 5],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const ABSENCE_RATE_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [3.2, 2.8, 3.5, 2.9, 2.5, 2.1],
      color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const PROMOTION_RATE_DATA = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      data: [8, 12, 10, 15],
      color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const TENURE_DISTRIBUTION_DATA = [
  {
    name: '< 1 year',
    population: 25,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: '1-3 years',
    population: 35,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: '3-5 years',
    population: 25,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: '> 5 years',
    population: 15,
    color: '#8B5CF6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

const SKILL_DEVELOPMENT_DATA = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      data: [65, 72, 78, 85],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const TEAM_COLLABORATION_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [72, 78, 82, 86, 90, 94],
      color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const WORK_LIFE_BALANCE_DATA = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      data: [68, 72, 75, 78],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const ROLE_DISTRIBUTION_DATA = [
  {
    name: 'Leadership',
    population: 15,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Senior',
    population: 30,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Mid',
    population: 35,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Junior',
    population: 20,
    color: '#8B5CF6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

export default function EmployeesIndexPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedDept, setSelectedDept] = useState('All');
  const screenWidth = Dimensions.get('window').width;

  const filteredEmployees = EMPLOYEES_DATA.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel ? emp.level === selectedLevel : true;
    const matchesDept = selectedDept === 'All' ? true : emp.department === selectedDept;
    return matchesSearch && matchesLevel && matchesDept;
  });

  const renderLineChart = (data: any, title: string, color: string) => (
    <View style={[styles.chartCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.chartHeader}>
        <Text style={[styles.chartTitle, { color: theme.colors.text }]}>{title}</Text>
        <TouchableOpacity>
          <ChartLine size={18} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <LineChart
        data={data}
        width={screenWidth - 64}
        height={200}
        chartConfig={{
          backgroundColor: theme.colors.card,
          backgroundGradientFrom: theme.colors.card,
          backgroundGradientTo: theme.colors.card,
          decimalPlaces: 0,
          color: (opacity = 1) => color,
          labelColor: theme.colors.textSecondary,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: color,
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );

  const renderBarChart = (data: any, title: string) => (
    <View style={[styles.chartCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.chartHeader}>
        <Text style={[styles.chartTitle, { color: theme.colors.text }]}>{title}</Text>
        <TouchableOpacity>
          <ChartBarBig size={18} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <BarChart
        data={data}
        width={screenWidth - 64}
        height={200}
        chartConfig={{
          backgroundColor: theme.colors.card,
          backgroundGradientFrom: theme.colors.card,
          backgroundGradientTo: theme.colors.card,
          decimalPlaces: 0,
          color: (opacity = 1) => theme.colors.primary,
          labelColor: theme.colors.textSecondary,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />
    </View>
  );

  const renderPieChart = (data: any, title: string) => (
    <View style={[styles.chartCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.chartHeader}>
        <Text style={[styles.chartTitle, { color: theme.colors.text }]}>{title}</Text>
        <TouchableOpacity>
          <ChartBarBig size={18} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <PieChart
        data={data}
        width={screenWidth - 64}
        height={200}
        chartConfig={{
          backgroundColor: theme.colors.card,
          backgroundGradientFrom: theme.colors.card,
          backgroundGradientTo: theme.colors.card,
          color: (opacity = 1) => theme.colors.primary,
          labelColor: theme.colors.textSecondary,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={styles.chart}
      />
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>AI Employees</Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              {EMPLOYEES_DATA.length} agents across 5 hierarchy levels
            </Text>
          </View>
          <TouchableOpacity style={[styles.addButton, { backgroundColor: '#3B82F6' }]}>
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={[styles.searchBar, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Search size={20} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search employees..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <Filter size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Department Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.deptFilter}>
          {DEPARTMENTS.map((dept) => (
            <TouchableOpacity
              key={dept}
              onPress={() => setSelectedDept(dept)}
              style={[
                styles.deptChip,
                { backgroundColor: selectedDept === dept ? '#3B82F6' : theme.colors.card || '#F2F2F7' }
              ]}
            >
              <Text style={[styles.deptText, { color: selectedDept === dept ? '#fff' : theme.colors.text }]}>
                {dept}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Level Filter */}
      <View style={[styles.levelSection, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.levelTitle, { color: theme.colors.text }]}>Filter by Level</Text>
        <View style={styles.levelGrid}>
          {Object.entries(LEVEL_CONFIG).map(([key, config]) => (
            <TouchableOpacity
              key={key}
              onPress={() => setSelectedLevel(selectedLevel === key ? null : key)}
              style={[
                styles.levelCard,
                { backgroundColor: selectedLevel === key ? config.color + '20' : theme.colors.background },
                selectedLevel === key && { borderColor: config.color, borderWidth: 2 }
              ]}
            >
              <View style={[styles.levelIcon, { backgroundColor: config.color + '20' }]}>
                <config.icon size={22} color={config.color} />
              </View>
              <Text style={[styles.levelLabel, { color: theme.colors.text }]}>{config.label}</Text>
              <Text style={[styles.levelCount, { color: config.color }]}>{config.count}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Employee Count */}
      <View style={styles.countBar}>
        <Text style={[styles.countText, { color: theme.colors.textSecondary }]}>
          Showing {filteredEmployees.length} employees
        </Text>
        {selectedLevel && (
          <TouchableOpacity onPress={() => setSelectedLevel(null)}>
            <Text style={[styles.clearFilter, { color: '#3B82F6' }]}>Clear Filter</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Employee List */}
      <View style={[styles.employeeList, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {filteredEmployees.map((employee) => {
          const levelConfig = LEVEL_CONFIG[employee.level as keyof typeof LEVEL_CONFIG];
          return (
            <TouchableOpacity
              key={employee.id}
              onPress={() => router.push(`/ai-agent/employees/detail?id=${employee.id}`)}
              style={[styles.employeeCard, { backgroundColor: theme.colors.background }]}
            >
              <View style={[styles.employeeIcon, { backgroundColor: employee.color + '20' }]}>
                {levelConfig && <levelConfig.icon size={24} color={employee.color} />}
              </View>
              <View style={styles.employeeInfo}>
                <Text style={[styles.employeeName, { color: theme.colors.text }]}>{employee.name}</Text>
                <View style={styles.employeeMeta}>
                  <View style={[styles.deptBadge, { backgroundColor: employee.color + '15' }]}>
                    <Briefcase size={10} color={employee.color} />
                    <Text style={[styles.deptText, { color: employee.color }]}>{employee.department}</Text>
                  </View>
                  <View style={[styles.levelBadge, { backgroundColor: levelConfig?.color + '15' }]}>
                    <Text style={[styles.levelText, { color: levelConfig?.color }]}>{levelConfig?.label}</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.statusIndicator, { backgroundColor: '#10B981' }]} />
              <ArrowRight size={18} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Quick Links */}
      <View style={[styles.quickLinks, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.quickTitle, { color: theme.colors.text }]}>Quick Navigation</Text>
        <View style={styles.quickGrid}>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/hierarchy')}
            style={[styles.quickCard, { backgroundColor: theme.colors.background }]}
          >
            <ChartBarBig size={24} color="#8B5CF6" />
            <Text style={[styles.quickCardText, { color: theme.colors.text }]}>Hierarchy View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/team-management')}
            style={[styles.quickCard, { backgroundColor: theme.colors.background }]}
          >
            <Users size={24} color="#3B82F6" />
            <Text style={[styles.quickCardText, { color: theme.colors.text }]}>Team Management</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/performance')}
            style={[styles.quickCard, { backgroundColor: theme.colors.background }]}
          >
            <Activity size={24} color="#10B981" />
            <Text style={[styles.quickCardText, { color: theme.colors.text }]}>Performance</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Analytics Charts */}
      <View style={styles.chartsSection}>
        <Text style={[styles.chartsTitle, { color: theme.colors.text }]}>Workforce Analytics</Text>
        {renderLineChart(EMPLOYEE_GROWTH_DATA, 'Employee Growth (6 Months)', '#3B82F6')}
        {renderPieChart(DEPARTMENT_DISTRIBUTION_DATA, 'Department Distribution')}
        {renderBarChart(PERFORMANCE_SCORES_DATA, 'Performance by Level')}
        {renderLineChart(HIRING_TREND_DATA, 'Hiring Trend (6 Months)', '#3B82F6')}
        {renderLineChart(SATISFACTION_SCORE_DATA, 'Satisfaction Score (Quarterly)', '#10B981')}
        {renderPieChart(SKILL_DISTRIBUTION_DATA, 'Skill Distribution')}
        {renderLineChart(TRAINING_COMPLETION_DATA, 'Training Completion (6 Months)', '#10B981')}
        {renderPieChart(PROJECT_ALLOCATION_DATA, 'Project Allocation')}
        {renderLineChart(WORK_HOURS_DATA, 'Work Hours (Weekly)', '#3B82F6')}
        {renderLineChart(ABSENCE_RATE_DATA, 'Absence Rate (6 Months)', '#EF4444')}
        {renderLineChart(PROMOTION_RATE_DATA, 'Promotion Rate (Quarterly)', '#10B981')}
        {renderPieChart(TENURE_DISTRIBUTION_DATA, 'Tenure Distribution')}
        {renderLineChart(SKILL_DEVELOPMENT_DATA, 'Skill Development (Quarterly)', '#3B82F6')}
        {renderLineChart(TEAM_COLLABORATION_DATA, 'Team Collaboration (6 Months)', '#10B981')}
        {renderLineChart(WORK_LIFE_BALANCE_DATA, 'Work Life Balance (Quarterly)', '#3B82F6')}
        {renderPieChart(ROLE_DISTRIBUTION_DATA, 'Role Distribution')}
      </View>

      <AgentFeatures agentId="employees-index" agentName="Employees Directory" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, borderBottomWidth: 1 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 26, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  addButton: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  searchBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, height: 48, borderRadius: 12, marginBottom: 12 },
  searchInput: { flex: 1, marginHorizontal: 10, fontSize: 15 },
  deptFilter: { marginHorizontal: -4 },
  deptChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginHorizontal: 4 },
  deptText: { fontSize: 13, fontWeight: '500' },
  levelSection: { margin: 16, padding: 16, borderRadius: 16 },
  levelTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  levelGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  levelCard: { width: '30%', alignItems: 'center', padding: 12, borderRadius: 12 },
  levelIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  levelLabel: { fontSize: 12, fontWeight: '500' },
  levelCount: { fontSize: 16, fontWeight: 'bold', marginTop: 2 },
  countBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 8 },
  countText: { fontSize: 13 },
  clearFilter: { fontSize: 13, fontWeight: '600' },
  employeeList: { marginHorizontal: 16, borderRadius: 16, padding: 12 },
  employeeCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 8 },
  employeeIcon: { width: 44, height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  employeeInfo: { flex: 1 },
  employeeName: { fontSize: 15, fontWeight: '600' },
  employeeMeta: { flexDirection: 'row', gap: 6, marginTop: 4 },
  deptBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 3 },
  levelBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  levelText: { fontSize: 10, fontWeight: '600' },
  statusIndicator: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  quickLinks: { margin: 16, padding: 16, borderRadius: 16 },
  quickTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  quickGrid: { flexDirection: 'row', gap: 10 },
  quickCard: { flex: 1, alignItems: 'center', padding: 16, borderRadius: 12 },
  quickCardText: { fontSize: 12, marginTop: 8, textAlign: 'center' },
  chartsSection: { padding: 16, paddingBottom: 20 },
  chartsTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  chartCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  chart: {
    borderRadius: 16,
  },
});
