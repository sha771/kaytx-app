import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, useSafeAreaInsets } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Shield, UserPlus, UserMinus, Target, AlertTriangle, CheckCircle, Clock, Calendar, Bot, ArrowRight, BookOpen, Users } from 'lucide-react-native';

export default function KnowledgeContinuityScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const ONBOARDING_STATS = [
    { label: 'Active Onboardings', value: '8', icon: UserPlus, color: '#3B82F6' },
    { label: 'Avg. Completion', value: '12 days', icon: Calendar, color: '#10B981' },
    { label: 'Questions Answered', value: '1,247', icon: BookOpen, color: '#7C3AED' },
    { label: 'Knowledge Gaps', value: '3', icon: AlertTriangle, color: '#F59E0B' }
  ];

  const ACTIVE_ONBOARDINGS = [
    { name: 'Alex Rivera', role: 'Senior Engineer', startDate: 'May 20', progress: 65, mentor: 'Sarah Chen' },
    { name: 'Jordan Kim', role: 'Product Manager', startDate: 'May 22', progress: 45, mentor: 'Mike Johnson' },
    { name: 'Taylor Smith', role: 'Sales Rep', startDate: 'May 24', progress: 30, mentor: 'Emily Davis' }
  ];

  const AT_RISK_EMPLOYEES = [
    { name: 'James Wilson', role: 'Legal Counsel', tenure: '5 years', risk: 'high', knowledge_areas: ['Contracts', 'Compliance', 'IP'] },
    { name: 'Sarah Chen', role: 'VP Engineering', tenure: '4 years', risk: 'medium', knowledge_areas: ['Architecture', 'AWS', 'Microservices'] },
    { name: 'Mike Johnson', role: 'Sales Director', tenure: '6 years', risk: 'medium', knowledge_areas: ['Enterprise Deals', 'Negotiations', 'Key Accounts'] }
  ];

  const SUCCESSION_PLANS = [
    { role: 'VP Engineering', incumbent: 'Sarah Chen', backup: 'David Lee', status: 'Ready', coverage: '90%' },
    { role: 'Legal Counsel', incumbent: 'James Wilson', backup: 'Maria Garcia', status: 'In Progress', coverage: '75%' },
    { role: 'Sales Director', incumbent: 'Mike Johnson', backup: 'Anna Brown', status: 'Ready', coverage: '85%' }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Knowledge Continuity</Text>
          <Text style={styles.headerSubtitle}>Onboarding & departure protection</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Onboarding Stats */}
        <View style={styles.statsRow}>
          {ONBOARDING_STATS.map((stat, index) => (
            <View key={index} style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
              <stat.icon size={20} color={stat.color} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, { backgroundColor: '#3B82F6' }]}>
            <Text style={styles.tabText}>Onboarding</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, { backgroundColor: '#1E293B' }]}>
            <Text style={[styles.tabText, { color: '#9CA3AF' }]}>Departure Risk</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, { backgroundColor: '#1E293B' }]}>
            <Text style={[styles.tabText, { color: '#9CA3AF' }]}>Succession</Text>
          </TouchableOpacity>
        </View>

        {/* Active Onboardings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Onboardings</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {ACTIVE_ONBOARDINGS.map((person, index) => (
            <TouchableOpacity key={index} style={[styles.onboardingCard, { backgroundColor: '#1E293B' }]}>
              <View style={styles.onboardingHeader}>
                <View style={[styles.avatar, { backgroundColor: '#7C3AED' }]}>
                  <Text style={styles.avatarText}>{person.name[0]}</Text>
                </View>
                <View style={styles.onboardingInfo}>
                  <Text style={styles.onboardingName}>{person.name}</Text>
                  <Text style={styles.onboardingRole}>{person.role}</Text>
                </View>
                <View style={styles.onboardingDate}>
                  <Clock size={12} color="#6B7280" />
                  <Text style={styles.onboardingDateText}>{person.startDate}</Text>
                </View>
              </View>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${person.progress}%` }]} />
                </View>
                <Text style={styles.progressText}>{person.progress}%</Text>
              </View>
              <View style={styles.mentorRow}>
                <Users size={12} color="#6B7280" />
                <Text style={styles.mentorText}>Mentor: {person.mentor}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Onboarding Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Onboarding Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#1E293B' }]}>
              <UserPlus size={20} color="#3B82F6" />
              <Text style={styles.actionText}>Start New Onboarding</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#1E293B' }]}>
              <BookOpen size={20} color="#10B981" />
              <Text style={styles.actionText}>Create Learning Path</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#1E293B' }]}>
              <Target size={20} color="#7C3AED" />
              <Text style={styles.actionText}>Knowledge Assessment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#1E293B' }]}>
              <Calendar size={20} color="#F59E0B" />
              <Text style={styles.actionText}>Schedule Mentor Meet</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* At-Risk Employees */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>At-Risk Knowledge Holders</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {AT_RISK_EMPLOYEES.map((employee, index) => (
            <View key={index} style={[styles.riskCard, { backgroundColor: '#1E293B' }]}>
              <View style={styles.riskHeader}>
                <View style={[styles.avatar, { backgroundColor: employee.risk === 'high' ? '#EF4444' : '#F59E0B' }]}>
                  <Text style={styles.avatarText}>{employee.name[0]}</Text>
                </View>
                <View style={styles.riskInfo}>
                  <Text style={styles.riskName}>{employee.name}</Text>
                  <Text style={styles.riskRole}>{employee.role}</Text>
                </View>
                <View style={[styles.riskBadge, { backgroundColor: employee.risk === 'high' ? '#EF444420' : '#F59E0B20' }]}>
                  <AlertTriangle size={12} color={employee.risk === 'high' ? '#EF4444' : '#F59E0B'} />
                  <Text style={[styles.riskBadgeText, { color: employee.risk === 'high' ? '#EF4444' : '#F59E0B' }]}>
                    {employee.risk} risk
                  </Text>
                </View>
              </View>
              <View style={styles.riskDetails}>
                <Text style={styles.riskTenure}>{employee.tenure} tenure</Text>
                <View style={styles.knowledgeTags}>
                  {employee.knowledge_areas.map((area, i) => (
                    <View key={i} style={styles.knowledgeTag}>
                      <Text style={styles.knowledgeTagText}>{area}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Succession Plans */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Succession Plans</Text>
          {SUCCESSION_PLANS.map((plan, index) => (
            <View key={index} style={[styles.successionCard, { backgroundColor: '#1E293B' }]}>
              <View style={styles.successionHeader}>
                <Text style={styles.successionRole}>{plan.role}</Text>
                <View style={[styles.successionStatus, { backgroundColor: plan.status === 'Ready' ? '#10B98120' : '#F59E0B20' }]}>
                  <CheckCircle size={12} color={plan.status === 'Ready' ? '#10B981' : '#F59E0B'} />
                  <Text style={[styles.successionStatusText, { color: plan.status === 'Ready' ? '#10B981' : '#F59E0B' }]}>
                    {plan.status}
                  </Text>
                </View>
              </View>
              <View style={styles.successionDetails}>
                <View style={styles.successionPerson}>
                  <Text style={styles.successionLabel}>Current</Text>
                  <Text style={styles.successionName}>{plan.incumbent}</Text>
                </View>
                <ArrowRight size={16} color="#6B7280" />
                <View style={styles.successionPerson}>
                  <Text style={styles.successionLabel}>Backup</Text>
                  <Text style={styles.successionName}>{plan.backup}</Text>
                </View>
                <View style={styles.coverageBadge}>
                  <Text style={styles.coverageLabel}>Coverage</Text>
                  <Text style={styles.coverageValue}>{plan.coverage}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Continuity AI Agents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continuity AI Agents</Text>
          <View style={styles.agentsRow}>
            {[
              { name: 'Onboarding Assistant', color: '#3B82F6' },
              { name: 'Knowledge Transfer', color: '#7C3AED' },
              { name: 'Risk Detector', color: '#F59E0B' },
              { name: 'Succession Planner', color: '#10B981' }
            ].map((agent, index) => (
              <View key={index} style={[styles.agentChip, { backgroundColor: agent.color + '20' }]}>
                <Bot size={14} color={agent.color} />
                <Text style={[styles.agentChipText, { color: agent.color }]}>{agent.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0F172A',
    gap: 12
  },
  backButton: {
    padding: 4
  },
  headerTitle: {
    flex: 1
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#9CA3AF'
  },
  content: {
    flex: 1,
    paddingHorizontal: 16
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20
  },
  statCard: {
    width: '48%',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 6
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
    textAlign: 'center'
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  section: {
    marginBottom: 24
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  seeAll: {
    fontSize: 13,
    color: '#3B82F6'
  },
  onboardingCard: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 10
  },
  onboardingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  onboardingInfo: {
    flex: 1,
    marginLeft: 12
  },
  onboardingName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  onboardingRole: {
    fontSize: 12,
    color: '#9CA3AF'
  },
  onboardingDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  onboardingDateText: {
    fontSize: 12,
    color: '#6B7280'
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981'
  },
  mentorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  mentorText: {
    fontSize: 12,
    color: '#6B7280'
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  actionCard: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 10
  },
  actionText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500'
  },
  riskCard: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 10
  },
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  riskInfo: {
    flex: 1,
    marginLeft: 12
  },
  riskName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  riskRole: {
    fontSize: 12,
    color: '#9CA3AF'
  },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4
  },
  riskBadgeText: {
    fontSize: 11,
    fontWeight: '600'
  },
  riskDetails: {
    gap: 8
  },
  riskTenure: {
    fontSize: 12,
    color: '#6B7280'
  },
  knowledgeTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  knowledgeTag: {
    backgroundColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4
  },
  knowledgeTagText: {
    fontSize: 11,
    color: '#D1D5DB'
  },
  successionCard: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 10
  },
  successionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  successionRole: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  successionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4
  },
  successionStatusText: {
    fontSize: 11,
    fontWeight: '500'
  },
  successionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  successionPerson: {
    flex: 1
  },
  successionLabel: {
    fontSize: 10,
    color: '#6B7280'
  },
  successionName: {
    fontSize: 13,
    color: '#FFFFFF',
    marginTop: 2
  },
  coverageBadge: {
    alignItems: 'center'
  },
  coverageLabel: {
    fontSize: 10,
    color: '#6B7280'
  },
  coverageValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981'
  },
  agentsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  agentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6
  },
  agentChipText: {
    fontSize: 12,
    fontWeight: '500'
  }
};