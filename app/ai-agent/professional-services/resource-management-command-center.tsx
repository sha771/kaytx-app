import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { professionalServicesDashboardConfig } from '@/constants/dashboardMetrics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  Users,
  ChevronLeft,
  Target,
  TrendingUp,
  DollarSign,
  Clock,
  AlertTriangle,
  BarChart3,
  Search,
  Filter,
  Plus,
  MoreVertical,
  MapPin,
  Building,
  Globe,
  Activity,
  Layers,
  Zap,
  Shield,
  Settings,
  RefreshCw,
  User,
  Briefcase,
  Star,
  GraduationCap,
  Award,
  Calendar,
  CheckCircle,
  XCircle,
  Brain,
  Cpu,
  Database,
  FileText,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function ResourceManagementCommandCenter() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedView, setSelectedView] = useState<'all' | 'available' | 'on-bench' | 'booked'>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');

  const colors = {
    background: '#050B14',
    card: 'rgba(10, 20, 40, 0.8)',
    cardBorder: 'rgba(30, 58, 95, 0.5)',
    text: '#FFFFFF',
    textSecondary: '#94A3B8',
    electricBlue: '#3B82F6',
    emeraldGreen: '#10B981',
    purple: '#8B5CF6',
    amber: '#F59E0B',
    red: '#EF4444',
    glass: 'rgba(255, 255, 255, 0.05)',
    glassBorder: 'rgba(255, 255, 255, 0.1)'
  };

  const resourceMetrics = {
    totalConsultants: 48000,
    available: 8420,
    onBench: 6720,
    booked: 32860,
    utilizationRate: 86,
    billableUtilization: 74,
    avgUtilization: 82,
    forecastAccuracy: 94
  };

  const skillsMatrix = [
    { skill: 'Cloud Migration', demand: 85, supply: 70, gap: 15 },
    { skill: 'AI/ML', demand: 92, supply: 65, gap: 27 },
    { skill: 'Data Analytics', demand: 78, supply: 80, gap: -2 },
    { skill: 'Cybersecurity', demand: 88, supply: 55, gap: 33 },
    { skill: 'DevOps', demand: 82, supply: 72, gap: 10 },
    { skill: 'Strategy', demand: 72, supply: 75, gap: -3 },
    { skill: 'Project Management', demand: 90, supply: 85, gap: 5 },
    { skill: 'Change Management', demand: 68, supply: 60, gap: 8 }
  ];

  const consultants = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior Consultant',
      level: 'Principal',
      skills: ['Cloud', 'AI/ML', 'Strategy'],
      utilization: 92,
      availability: 'Limited',
      location: 'San Francisco',
      practice: 'Cloud Services',
      billableRate: '$250/hr',
      projects: 2,
      rating: 4.8,
      certifications: ['AWS', 'Azure', 'GCP'],
      experience: '8 years'
    },
    {
      id: 2,
      name: 'Michael Roberts',
      role: 'Delivery Lead',
      level: 'Senior',
      skills: ['Project Management', 'Agile', 'Risk'],
      utilization: 88,
      availability: 'Available',
      location: 'New York',
      practice: 'Delivery',
      billableRate: '$200/hr',
      projects: 1,
      rating: 4.7,
      certifications: ['PMP', 'SAFe'],
      experience: '12 years'
    },
    {
      id: 3,
      name: 'Emily Watson',
      role: 'Data Scientist',
      level: 'Senior',
      skills: ['Python', 'ML', 'Statistics'],
      utilization: 95,
      availability: 'Booked',
      location: 'London',
      practice: 'Data & Analytics',
      billableRate: '$220/hr',
      projects: 3,
      rating: 4.9,
      certifications: ['TensorFlow', 'PyTorch'],
      experience: '6 years'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Cloud Architect',
      level: 'Principal',
      skills: ['AWS', 'Kubernetes', 'DevOps'],
      utilization: 78,
      availability: 'Available',
      location: 'Singapore',
      practice: 'Cloud Services',
      billableRate: '$280/hr',
      projects: 1,
      rating: 4.8,
      certifications: ['AWS Solutions Architect', 'CKA'],
      experience: '10 years'
    },
    {
      id: 5,
      name: 'Lisa Martinez',
      role: 'Security Consultant',
      level: 'Senior',
      skills: ['Cybersecurity', 'Compliance', 'Risk'],
      utilization: 85,
      availability: 'Limited',
      location: 'Madrid',
      practice: 'Security',
      billableRate: '$240/hr',
      projects: 2,
      rating: 4.6,
      certifications: ['CISSP', 'CISM'],
      experience: '7 years'
    }
  ];

  const capacityForecast = [
    { month: 'Jan', demand: 4200, supply: 4500, utilization: 93 },
    { month: 'Feb', demand: 4400, supply: 4600, utilization: 96 },
    { month: 'Mar', demand: 4800, supply: 4700, utilization: 102 },
    { month: 'Apr', demand: 5100, supply: 4800, utilization: 106 },
    { month: 'May', demand: 4900, supply: 4900, utilization: 100 },
    { month: 'Jun', demand: 5200, supply: 5100, utilization: 102 }
  ];

  const renderMetricCard = (label: string, value: string | number, icon: any, color: string, subtitle?: string) => (
    <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
      <View style={[styles.metricIcon, { backgroundColor: color + '20' }]}>
        {React.createElement(icon, { size: 20, color: color })}
      </View>
      <Text style={[styles.metricCardValue, { color: color }]}>{typeof value === 'number' ? value.toLocaleString() : value}</Text>
      <Text style={[styles.metricCardLabel, { color: colors.textSecondary }]}>{label}</Text>
      {subtitle && <Text style={[styles.metricCardSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>}
    </View>
  );

  const renderSkillRow = (skill: any, index: number) => (
    <View key={index} style={styles.skillRow}>
      <Text style={[styles.skillName, { color: colors.text }]}>{skill.skill}</Text>
      <View style={styles.skillBars}>
        <View style={styles.skillBar}>
          <Text style={[styles.skillBarLabel, { color: colors.textSecondary }]}>Demand</Text>
          <View style={[styles.skillBarTrack, { backgroundColor: colors.glass }]}>
            <View style={[styles.skillBarFill, { width: `${skill.demand}%`, backgroundColor: colors.electricBlue }]} />
          </View>
          <Text style={[styles.skillBarValue, { color: colors.text }]}>{skill.demand}%</Text>
        </View>
        <View style={styles.skillBar}>
          <Text style={[styles.skillBarLabel, { color: colors.textSecondary }]}>Supply</Text>
          <View style={[styles.skillBarTrack, { backgroundColor: colors.glass }]}>
            <View style={[styles.skillBarFill, { width: `${skill.supply}%`, backgroundColor: colors.emeraldGreen }]} />
          </View>
          <Text style={[styles.skillBarValue, { color: colors.text }]}>{skill.supply}%</Text>
        </View>
      </View>
      <View style={[styles.gapBadge, { backgroundColor: skill.gap > 0 ? colors.red + '20' : colors.emeraldGreen + '20' }]}>
        <Text style={[styles.gapText, { color: skill.gap > 0 ? colors.red : colors.emeraldGreen }]}>
          {skill.gap > 0 ? `+${skill.gap}` : skill.gap}
        </Text>
      </View>
    </View>
  );

  const renderConsultantCard = (consultant: any) => (
    <View key={consultant.id} style={[styles.consultantCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
      <View style={styles.consultantHeader}>
        <View style={[styles.consultantAvatar, { backgroundColor: colors.electricBlue + '20' }]}>
          <User size={32} color={colors.electricBlue} />
        </View>
        <View style={styles.consultantInfo}>
          <Text style={[styles.consultantName, { color: colors.text }]}>{consultant.name}</Text>
          <Text style={[styles.consultantRole, { color: colors.textSecondary }]}>{consultant.role}</Text>
          <View style={styles.consultantMeta}>
            <Briefcase size={12} color={colors.textSecondary} />
            <Text style={[styles.metaText, { color: colors.textSecondary }]}>{consultant.practice}</Text>
            <MapPin size={12} color={colors.textSecondary} />
            <Text style={[styles.metaText, { color: colors.textSecondary }]}>{consultant.location}</Text>
          </View>
        </View>
        <View style={[
          styles.availabilityBadge,
          { backgroundColor: consultant.availability === 'Available' ? colors.emeraldGreen + '20' : consultant.availability === 'Booked' ? colors.red + '20' : colors.amber + '20' }
        ]}>
          <View style={[
            styles.availabilityDot,
            { backgroundColor: consultant.availability === 'Available' ? colors.emeraldGreen : consultant.availability === 'Booked' ? colors.red : colors.amber }
          ]} />
          <Text style={[
            styles.availabilityText,
            { color: consultant.availability === 'Available' ? colors.emeraldGreen : consultant.availability === 'Booked' ? colors.red : colors.amber }
          ]}>{consultant.availability}</Text>
        </View>
      </View>

      <View style={styles.consultantSkills}>
        {consultant.skills.map((skill: string, idx: number) => (
          <View key={idx} style={[styles.skillBadge, { backgroundColor: colors.purple + '20' }]}>
            <Text style={[styles.skillBadgeText, { color: colors.purple }]}>{skill}</Text>
          </View>
        ))}
      </View>

      <View style={styles.consultantMetrics}>
        <View style={styles.consultantMetric}>
          <Activity size={14} color={colors.textSecondary} />
          <Text style={[styles.metricValue, { color: colors.text }]}>{consultant.utilization}%</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Utilization</Text>
        </View>
        <View style={styles.consultantMetric}>
          <DollarSign size={14} color={colors.textSecondary} />
          <Text style={[styles.metricValue, { color: colors.text }]}>{consultant.billableRate}</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Rate</Text>
        </View>
        <View style={styles.consultantMetric}>
          <Star size={14} color={colors.amber} />
          <Text style={[styles.metricValue, { color: colors.text }]}>{consultant.rating}</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Rating</Text>
        </View>
        <View style={styles.consultantMetric}>
          <Briefcase size={14} color={colors.textSecondary} />
          <Text style={[styles.metricValue, { color: colors.text }]}>{consultant.projects}</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Projects</Text>
        </View>
      </View>

      <View style={styles.consultantDetails}>
        <View style={styles.detailRow}>
          <GraduationCap size={12} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>{consultant.experience}</Text>
        </View>
        <View style={styles.detailRow}>
          <Award size={12} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>{consultant.certifications.join(', ')}</Text>
        </View>
      </View>

      <View style={styles.consultantActions}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
          <FileText size={16} color={colors.textSecondary} />
          <Text style={[styles.actionButtonText, { color: colors.textSecondary }]}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.electricBlue + '20', borderColor: colors.electricBlue + '40' }]}>
          <Briefcase size={16} color={colors.electricBlue} />
          <Text style={[styles.actionButtonText, { color: colors.electricBlue }]}>Assign</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCapacityRow = (forecast: any, index: number) => (
    <View key={index} style={[styles.capacityRow, { borderBottomColor: colors.cardBorder }]}>
      <Text style={[styles.capacityMonth, { color: colors.text }]}>{forecast.month}</Text>
      <View style={styles.capacityBars}>
        <View style={styles.capacityBar}>
          <Text style={[styles.capacityBarLabel, { color: colors.textSecondary }]}>Demand</Text>
          <View style={[styles.capacityBarTrack, { backgroundColor: colors.glass }]}>
            <View style={[styles.capacityBarFill, { width: `${(forecast.demand / 5200) * 100}%`, backgroundColor: colors.electricBlue }]} />
          </View>
          <Text style={[styles.capacityBarValue, { color: colors.text }]}>{forecast.demand}</Text>
        </View>
        <View style={styles.capacityBar}>
          <Text style={[styles.capacityBarLabel, { color: colors.textSecondary }]}>Supply</Text>
          <View style={[styles.capacityBarTrack, { backgroundColor: colors.glass }]}>
            <View style={[styles.capacityBarFill, { width: `${(forecast.supply / 5200) * 100}%`, backgroundColor: colors.emeraldGreen }]} />
          </View>
          <Text style={[styles.capacityBarValue, { color: colors.text }]}>{forecast.supply}</Text>
        </View>
      </View>
      <View style={[
        styles.utilizationBadge,
        { backgroundColor: forecast.utilization > 100 ? colors.red + '20' : forecast.utilization > 95 ? colors.amber + '20' : colors.emeraldGreen + '20' }
      ]}>
        <Text style={[
          styles.utilizationText,
          { color: forecast.utilization > 100 ? colors.red : forecast.utilization > 95 ? colors.amber : colors.emeraldGreen }
        ]}>{forecast.utilization}%</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <LinearGradient
        colors={['rgba(16, 185, 129, 0.1)', 'rgba(5, 11, 20, 0.9)']}
        style={[styles.header, { borderBottomColor: colors.cardBorder, borderBottomWidth: 1 }]}
      >
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.headerIcon}
          >
            <Users size={24} color="#FFFFFF" />
          </LinearGradient>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Resource Management Center</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Consultant Allocation & Capacity Planning</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <Search size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <Filter size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <RefreshCw size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Resource Metrics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Resource Overview</Text>
          <View style={styles.metricsGrid}>
            {renderMetricCard('Total Consultants', resourceMetrics.totalConsultants, Users, colors.electricBlue)}
            {renderMetricCard('Available', resourceMetrics.available, CheckCircle, colors.emeraldGreen)}
            {renderMetricCard('On Bench', resourceMetrics.onBench, Clock, colors.amber)}
            {renderMetricCard('Booked', resourceMetrics.booked, Briefcase, colors.purple)}
            {renderMetricCard('Utilization Rate', `${resourceMetrics.utilizationRate}%`, Activity, colors.electricBlue)}
            {renderMetricCard('Billable Utilization', `${resourceMetrics.billableUtilization}%`, DollarSign, colors.emeraldGreen)}
            {renderMetricCard('Avg Utilization', `${resourceMetrics.avgUtilization}%`, BarChart3, colors.purple)}
            {renderMetricCard('Forecast Accuracy', `${resourceMetrics.forecastAccuracy}%`, Target, colors.emeraldGreen)}
          </View>
        </View>

        {/* Skills Gap Analysis */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Skills Gap Analysis</Text>
            <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
              <Filter size={16} color={colors.textSecondary} />
              <Text style={[styles.filterButtonText, { color: colors.textSecondary }]}>Filter Skills</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.skillsMatrix, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            {skillsMatrix.map((skill, index) => renderSkillRow(skill, index))}
          </View>
        </View>

        {/* Capacity Forecast */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>6-Month Capacity Forecast</Text>
          <View style={[styles.capacityCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            {capacityForecast.map((forecast, index) => renderCapacityRow(forecast, index))}
          </View>
        </View>

        {/* View Filters */}
        <View style={styles.section}>
          <View style={styles.filterTabs}>
            {['all', 'available', 'on-bench', 'booked'].map((view) => (
              <TouchableOpacity
                key={view}
                style={[
                  styles.filterTab,
                  selectedView === view && styles.activeFilterTab,
                  { backgroundColor: selectedView === view ? colors.electricBlue : colors.glass }
                ]}
                onPress={() => setSelectedView(view as any)}
              >
                <Text style={[
                  styles.filterTabText,
                  { color: selectedView === view ? '#FFFFFF' : colors.textSecondary }
                ]}>
                  {view.charAt(0).toUpperCase() + view.slice(1).replace('-', ' ')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Consultants Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {selectedView === 'all' ? 'All Consultants' : selectedView === 'available' ? 'Available Consultants' : selectedView === 'on-bench' ? 'On Bench' : 'Booked Consultants'}
            </Text>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.emeraldGreen }]}>
              <Plus size={20} color="white" />
              <Text style={styles.addButtonText}>Add Consultant</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.consultantsGrid}>
            {consultants
              .filter(c => selectedView === 'all' || c.availability.toLowerCase() === selectedView.replace('-', ' '))
              .map((consultant) => renderConsultantCard(consultant))}
          </View>
        </View>

        {/* AI Resource Recommendations */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>AI Resource Recommendations</Text>
          <View style={[styles.recommendationsCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.recommendationItem}>
              <View style={[styles.recommendationIcon, { backgroundColor: colors.red + '20' }]}>
                <AlertTriangle size={20} color={colors.red} />
              </View>
              <View style={styles.recommendationContent}>
                <Text style={[styles.recommendationTitle, { color: colors.text }]}>AI/ML Skills Shortage</Text>
                <Text style={[styles.recommendationDescription, { color: colors.textSecondary }]}>
                  Demand exceeds supply by 27%. Recommend hiring 15 senior AI/ML consultants in Q2.
                </Text>
              </View>
              <TouchableOpacity style={[styles.recommendationAction, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40', borderWidth: 1 }]}>
                <Text style={[styles.recommendationActionText, { color: colors.emeraldGreen }]}>Initiate Hiring</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.recommendationItem}>
              <View style={[styles.recommendationIcon, { backgroundColor: colors.amber + '20' }]}>
                <Clock size={20} color={colors.amber} />
              </View>
              <View style={styles.recommendationContent}>
                <Text style={[styles.recommendationTitle, { color: colors.text }]}>Capacity Warning for March</Text>
                <Text style={[styles.recommendationDescription, { color: colors.textSecondary }]}>
                  Forecast shows 102% utilization. Consider cross-training or contractor support.
                </Text>
              </View>
              <TouchableOpacity style={[styles.recommendationAction, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40', borderWidth: 1 }]}>
                <Text style={[styles.recommendationActionText, { color: colors.emeraldGreen }]}>Plan Capacity</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.recommendationItem}>
              <View style={[styles.recommendationIcon, { backgroundColor: colors.emeraldGreen + '20' }]}>
                <TrendingUp size={20} color={colors.emeraldGreen} />
              </View>
              <View style={styles.recommendationContent}>
                <Text style={[styles.recommendationTitle, { color: colors.text }]}>Optimization Opportunity</Text>
                <Text style={[styles.recommendationDescription, { color: colors.textSecondary }]}>
                  12 consultants with Strategy skills underutilized. Recommend reassignment to strategic projects.
                </Text>
              </View>
              <TouchableOpacity style={[styles.recommendationAction, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40', borderWidth: 1 }]}>
                <Text style={[styles.recommendationActionText, { color: colors.emeraldGreen }]}>Reassign</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: (width - 64) / 4,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricCardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricCardLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  metricCardSubtitle: {
    fontSize: 10,
    marginTop: 2,
  },
  skillsMatrix: {
    padding: 16,
    borderRadius: 12,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  skillName: {
    fontSize: 13,
    fontWeight: '500',
    width: 120,
  },
  skillBars: {
    flex: 1,
    marginLeft: 12,
  },
  skillBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  skillBarLabel: {
    fontSize: 10,
    width: 50,
  },
  skillBarTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 8,
  },
  skillBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  skillBarValue: {
    fontSize: 11,
    width: 30,
  },
  gapBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 12,
  },
  gapText: {
    fontSize: 11,
    fontWeight: '600',
  },
  capacityCard: {
    padding: 16,
    borderRadius: 12,
  },
  capacityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  capacityMonth: {
    fontSize: 13,
    fontWeight: '500',
    width: 60,
  },
  capacityBars: {
    flex: 1,
    marginLeft: 12,
  },
  capacityBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  capacityBarLabel: {
    fontSize: 10,
    width: 50,
  },
  capacityBarTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 8,
  },
  capacityBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  capacityBarValue: {
    fontSize: 11,
    width: 40,
  },
  utilizationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 12,
  },
  utilizationText: {
    fontSize: 11,
    fontWeight: '600',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  filterButtonText: {
    fontSize: 14,
  },
  filterTabs: {
    flexDirection: 'row',
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeFilterTab: {
    backgroundColor: '#3B82F6',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  consultantsGrid: {
    gap: 12,
  },
  consultantCard: {
    padding: 16,
    borderRadius: 12,
  },
  consultantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  consultantAvatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  consultantInfo: {
    flex: 1,
  },
  consultantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  consultantRole: {
    fontSize: 14,
    marginBottom: 6,
  },
  consultantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 12,
  },
  availabilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  availabilityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  availabilityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  consultantSkills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  skillBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  skillBadgeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  consultantMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  consultantMetric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 10,
  },
  consultantDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
  },
  consultantActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '500',
  },
  recommendationsCard: {
    padding: 16,
    borderRadius: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  recommendationIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  recommendationDescription: {
    fontSize: 12,
    marginBottom: 8,
  },
  recommendationAction: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  recommendationActionText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
