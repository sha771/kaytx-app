/**
 * =============================================================================
 * AI AGENT EMPLOYEES MANAGEMENT PAGE
 * =============================================================================
 *
 * Workforce management interface for managing employees across all departments
 *
 * @version 1.0.0
 * @lastUpdated 2026-04-22
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import {
  Users,
  ChevronLeft,
  Plus,
  Search,
  ListFilter,
  Building2,
  Briefcase,
  TrendingUp,
  UserCheck,
  EllipsisVertical,
  Pencil,
  Trash2,
  Mail,
  Phone,
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock employee data - in production this would come from your API/state management
const MOCK_EMPLOYEES = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'Senior Developer',
    department: 'Engineering',
    level: 'senior',
    status: 'active',
    email: 'sarah.j@company.com',
    aiWorkloadBalance: 40,
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    role: 'Marketing Manager',
    department: 'Marketing',
    level: 'lead',
    status: 'active',
    email: 'michael.c@company.com',
    aiWorkloadBalance: 60,
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    role: 'Sales Representative',
    department: 'Sales',
    level: 'mid',
    status: 'active',
    email: 'emily.r@company.com',
    aiWorkloadBalance: 50,
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Kim',
    role: 'HR Specialist',
    department: 'Human Resources',
    level: 'mid',
    status: 'on_leave',
    email: 'david.k@company.com',
    aiWorkloadBalance: 30,
  },
  {
    id: '5',
    firstName: 'Lisa',
    lastName: 'Thompson',
    role: 'Financial Analyst',
    department: 'Finance',
    level: 'senior',
    status: 'active',
    email: 'lisa.t@company.com',
    aiWorkloadBalance: 45,
  },
];

const DEPARTMENTS = [
  'All',
  'Engineering',
  'Marketing',
  'Sales',
  'Finance',
  'Human Resources',
  'Operations',
  'Legal',
];

export default function EmployeesPage() {
  const router = useRouter();
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = MOCK_EMPLOYEES.filter(emp => {
    const matchesDept = selectedDepartment === 'All' || emp.department === selectedDepartment;
    const matchesSearch = emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'on_leave': return '#F59E0B';
      case 'terminated': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'entry': return '#60A5FA';
      case 'mid': return '#34D399';
      case 'senior': return '#A78BFA';
      case 'lead': return '#FBBF24';
      case 'executive': return '#F87171';
      default: return '#9CA3AF';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={28} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Workforce</Text>
          <Text style={styles.headerSubtitle}>
            {MOCK_EMPLOYEES.length} Employees • {DEPARTMENTS.length - 1} Departments
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/ai-agents-employees-builder')}
        >
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Search size={20} color="#64748b" />
          <Text style={styles.searchPlaceholder}>Search employees...</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <ListFilter size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* Department Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.departmentScroll}
        contentContainerStyle={styles.departmentContent}
      >
        {DEPARTMENTS.map(dept => (
          <TouchableOpacity
            key={dept}
            style={[
              styles.departmentChip,
              selectedDepartment === dept && styles.departmentChipActive
            ]}
            onPress={() => setSelectedDepartment(dept)}
          >
            <Text style={[
              styles.departmentChipText,
              selectedDepartment === dept && styles.departmentChipTextActive
            ]}>
              {dept}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Stats Overview */}
      <Animated.View entering={FadeInUp.delay(100)} style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Users size={24} color="#3B82F6" />
          <Text style={styles.statValue}>{MOCK_EMPLOYEES.length}</Text>
          <Text style={styles.statLabel}>Total Employees</Text>
        </View>
        <View style={styles.statCard}>
          <UserCheck size={24} color="#10B981" />
          <Text style={styles.statValue}>
            {MOCK_EMPLOYEES.filter(e => e.status === 'active').length}
          </Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <TrendingUp size={24} color="#8B5CF6" />
          <Text style={styles.statValue}>
            {Math.round(MOCK_EMPLOYEES.reduce((acc, e) => acc + e.aiWorkloadBalance, 0) / MOCK_EMPLOYEES.length)}%
          </Text>
          <Text style={styles.statLabel}>Avg AI Balance</Text>
        </View>
      </Animated.View>

      {/* Employee List */}
      <ScrollView style={styles.employeeList} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Employees</Text>
        
        {filteredEmployees.map((employee, index) => (
          <Animated.View 
            key={employee.id}
            entering={FadeInUp.delay(200 + index * 50)}
            style={styles.employeeCard}
          >
            <View style={styles.employeeHeader}>
              <View style={styles.employeeInfo}>
                <View style={[styles.avatar, { backgroundColor: getLevelColor(employee.level) }]}>
                  <Text style={styles.avatarText}>
                    {employee.firstName[0]}{employee.lastName[0]}
                  </Text>
                </View>
                <View>
                  <Text style={styles.employeeName}>
                    {employee.firstName} {employee.lastName}
                  </Text>
                  <Text style={styles.employeeRole}>{employee.role}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(employee.status) + '20' }]}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(employee.status) }]} />
                <Text style={[styles.statusText, { color: getStatusColor(employee.status) }]}>
                  {employee.status.replace('_', ' ')}
                </Text>
              </View>
            </View>

            <View style={styles.employeeDetails}>
              <View style={styles.detailItem}>
                <Building2 size={16} color="#64748b" />
                <Text style={styles.detailText}>{employee.department}</Text>
              </View>
              <View style={styles.detailItem}>
                <Mail size={16} color="#64748b" />
                <Text style={styles.detailText}>{employee.email}</Text>
              </View>
              <View style={styles.detailItem}>
                <Briefcase size={16} color="#64748b" />
                <Text style={styles.detailText}>AI Workload: {employee.aiWorkloadBalance}%</Text>
              </View>
            </View>

            <View style={styles.employeeActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Pencil size={18} color="#3B82F6" />
                <Text style={[styles.actionText, { color: '#3B82F6' }]}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Trash2 size={18} color="#EF4444" />
                <Text style={[styles.actionText, { color: '#EF4444' }]}>Remove</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ))}

        {/* Add Employee Button */}
        <TouchableOpacity 
          style={styles.addEmployeeCard}
          onPress={() => router.push('/ai-agents-employees-builder')}
        >
          <Plus size={32} color="#3B82F6" />
          <Text style={styles.addEmployeeText}>Add New Employee</Text>
          <Text style={styles.addEmployeeSubtext}>Create and configure a new team member</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1e293b',
  },
  backButton: {
    padding: 8,
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: '#3b82f6',
    padding: 10,
    borderRadius: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchPlaceholder: {
    color: '#64748b',
    fontSize: 14,
  },
  filterButton: {
    backgroundColor: '#1e293b',
    padding: 10,
    borderRadius: 10,
  },
  departmentScroll: {
    maxHeight: 50,
  },
  departmentContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  departmentChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1e293b',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  departmentChipActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  departmentChipText: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '500',
  },
  departmentChipTextActive: {
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  employeeList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
    marginTop: 8,
  },
  employeeCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  employeeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  employeeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  employeeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  employeeRole: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  employeeDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    color: '#94a3b8',
  },
  employeeActions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#0f172a',
    borderRadius: 8,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '500',
  },
  addEmployeeCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#3b82f6',
    borderStyle: 'dashed',
  },
  addEmployeeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
    marginTop: 12,
  },
  addEmployeeSubtext: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
});