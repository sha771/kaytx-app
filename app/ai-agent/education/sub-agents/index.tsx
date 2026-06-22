import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, GraduationCap, ArrowRight, Users, Sparkles, Shield, Zap } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function EducationSubAgentsIndex() {
  const { theme } = useTheme();
  const router = useRouter();

  const enterpriseAgents = [
    'customer-support-hub', 'education-intelligence-hub', 'academic-affairs-orchestrator',
    'student-success-coach', 'learning-analytics-platform', 'enrollment-analytics-engine',
    'financial-aid-optimizer', 'scholarship-management-system'
  ];

  const agents = [
    { id: 'customer-support-hub', name: 'Customer Support Hub', icon: GraduationCap, enterprise: true },
    { id: 'student-service-intelligence', name: 'Student Service Intelligence', icon: GraduationCap, enterprise: false },
    { id: 'technical-support-resolver', name: 'Technical Support Resolver', icon: GraduationCap, enterprise: false },
    { id: 'support-specialist', name: 'Support Specialist', icon: GraduationCap, enterprise: false },
    { id: 'parent-communication-hub', name: 'Parent Communication Hub', icon: GraduationCap, enterprise: false },
    { id: 'admission-processing', name: 'Admission Processing', icon: GraduationCap, enterprise: false },
    { id: 'enrollment-conversion', name: 'Enrollment Conversion', icon: GraduationCap, enterprise: false },
    { id: 'education-intelligence-hub', name: 'Education Intelligence Hub', icon: GraduationCap, enterprise: true },
    { id: 'course-design-platform', name: 'Course Design Platform', icon: GraduationCap, enterprise: false },
    { id: 'academic-affairs-orchestrator', name: 'Academic Affairs Orchestrator', icon: GraduationCap, enterprise: true },
    { id: 'education-analytics-dashboard', name: 'Education Analytics Dashboard', icon: GraduationCap, enterprise: false },
    { id: 'academic-performance-analyzer', name: 'Academic Performance Analyzer', icon: GraduationCap, enterprise: false },
    { id: 'faculty-performance-monitor', name: 'Faculty Performance Monitor', icon: GraduationCap, enterprise: false },
    { id: 'course-quality-assurance', name: 'Course Quality Assurance', icon: GraduationCap, enterprise: false },
    { id: 'institutional-research-platform', name: 'Institutional Research Platform', icon: GraduationCap, enterprise: false },
    { id: 'department-chair-assistant', name: 'Department Chair Assistant', icon: GraduationCap, enterprise: false },
    { id: 'professor-support-system', name: 'Professor Support System', icon: GraduationCap, enterprise: false },
    { id: 'student-services-coordinator', name: 'Student Services Coordinator', icon: GraduationCap, enterprise: false },
    { id: 'student-success-coach', name: 'Student Success Coach', icon: GraduationCap, enterprise: true },
    { id: 'learning-engagement-tracker', name: 'Learning Engagement Tracker', icon: GraduationCap, enterprise: false },
    { id: 'student-retention-engine', name: 'Student Retention Engine', icon: GraduationCap, enterprise: false },
    { id: 'alumni-relations-manager', name: 'Alumni Relations Manager', icon: GraduationCap, enterprise: false },
    { id: 'student-wellness-monitor', name: 'Student Wellness Monitor', icon: GraduationCap, enterprise: false },
    { id: 'advisor-intelligence-engine', name: 'Advisor Intelligence Engine', icon: GraduationCap, enterprise: false },
    { id: 'survey-feedback-analyzer', name: 'Survey Feedback Analyzer', icon: GraduationCap, enterprise: false },
    { id: 'feedback-analyzer', name: 'Feedback Analyzer', icon: GraduationCap, enterprise: false },
    { id: 'survey-designer', name: 'Survey Designer', icon: GraduationCap, enterprise: false },
    { id: 'feedback-collector', name: 'Feedback Collector', icon: GraduationCap, enterprise: false },
    { id: 'campaign-management-platform', name: 'Campaign Management Platform', icon: GraduationCap, enterprise: false },
    { id: 'marketing-automation', name: 'Marketing Automation', icon: GraduationCap, enterprise: false },
    { id: 'outreach-coordinator', name: 'Outreach Coordinator', icon: GraduationCap, enterprise: false },
    { id: 'scholarship-management-system', name: 'Scholarship Management System', icon: GraduationCap, enterprise: true },
    { id: 'financial-aid-optimizer', name: 'Financial Aid Optimizer', icon: GraduationCap, enterprise: true },
    { id: 'scholarship-allocation-system', name: 'Scholarship Allocation System', icon: GraduationCap, enterprise: false },
    { id: 'learning-analytics-platform', name: 'Learning Analytics Platform', icon: GraduationCap, enterprise: true },
    { id: 'digital-learning-manager', name: 'Digital Learning Manager', icon: GraduationCap, enterprise: false },
    { id: 'educational-content-creator', name: 'Educational Content Creator', icon: GraduationCap, enterprise: false },
    { id: 'learning-outcome-analyzer', name: 'Learning Outcome Analyzer', icon: GraduationCap, enterprise: false },
    { id: 'crisis-response-coordinator', name: 'Crisis Response Coordinator', icon: GraduationCap, enterprise: false },
    { id: 'educational-resource-allocator', name: 'Educational Resource Allocator', icon: GraduationCap, enterprise: false },
    { id: 'campus-safety-intelligence', name: 'Campus Safety Intelligence', icon: GraduationCap, enterprise: false },
    { id: 'diversity-inclusion-manager', name: 'Diversity Inclusion Manager', icon: GraduationCap, enterprise: false },
    { id: 'community-engagement-platform', name: 'Community Engagement Platform', icon: GraduationCap, enterprise: false },
    { id: 'institutional-performance-dashboard', name: 'Institutional Performance Dashboard', icon: GraduationCap, enterprise: false },
    { id: 'strategic-planning-assistant', name: 'Strategic Planning Assistant', icon: GraduationCap, enterprise: false },
    { id: 'education-policy-analyst', name: 'Education Policy Analyst', icon: GraduationCap, enterprise: false },
    { id: 'online-learning-optimizer', name: 'Online Learning Optimizer', icon: GraduationCap, enterprise: false },
    { id: 'education-operations-manager', name: 'Education Operations Manager', icon: GraduationCap, enterprise: false },
    { id: 'education-technology-integrator', name: 'Education Technology Integrator', icon: GraduationCap, enterprise: false },
    { id: 'education-data-analyst', name: 'Education Data Analyst', icon: GraduationCap, enterprise: false },
    { id: 'education-product-manager', name: 'Education Product Manager', icon: GraduationCap, enterprise: false },
    { id: 'education-marketing-strategist', name: 'Education Marketing Strategist', icon: GraduationCap, enterprise: false },
    { id: 'education-sales-platform', name: 'Education Sales Platform', icon: GraduationCap, enterprise: false },
    { id: 'counselor-coordination-hub', name: 'Counselor Coordination Hub', icon: GraduationCap, enterprise: false },
    { id: 'graduate-outcome-tracker', name: 'Graduate Outcome Tracker', icon: GraduationCap, enterprise: false },
    { id: 'accreditation-compliance-system', name: 'Accreditation Compliance System', icon: GraduationCap, enterprise: false },
    { id: 'education-innovation-hub', name: 'Education Innovation Hub', icon: GraduationCap, enterprise: false },
    { id: 'accessibility-compliance-manager', name: 'Accessibility Compliance Manager', icon: GraduationCap, enterprise: false },
    { id: 'campus-operations-center', name: 'Campus Operations Center', icon: GraduationCap, enterprise: false },
    { id: 'budget-forecasting-system', name: 'Budget Forecasting System', icon: GraduationCap, enterprise: false },
    { id: 'enrollment-analytics-engine', name: 'Enrollment Analytics Engine', icon: GraduationCap, enterprise: true },
    { id: 'career-guidance-engine', name: 'Career Guidance Engine', icon: GraduationCap, enterprise: false },
    { id: 'alumni-engagement-platform', name: 'Alumni Engagement Platform', icon: GraduationCap, enterprise: false },
    { id: 'research-collaboration-platform', name: 'Research Collaboration Platform', icon: GraduationCap, enterprise: false },
    { id: 'academic-compliance-monitor', name: 'Academic Compliance Monitor', icon: GraduationCap, enterprise: false },
    { id: 'student-success-platform', name: 'Student Success Platform', icon: GraduationCap, enterprise: false },
    { id: 'curriculum-intelligence-system', name: 'Curriculum Intelligence System', icon: GraduationCap, enterprise: false },
    { id: 'learning-pathway-optimizer', name: 'Learning Pathway Optimizer', icon: GraduationCap, enterprise: false },
    { id: 'assessment-analytics-engine', name: 'Assessment Analytics Engine', icon: GraduationCap, enterprise: false },
    { id: 'engagement-tracking-system', name: 'Engagement Tracking System', icon: GraduationCap, enterprise: false },
    { id: 'at-risk-student-identifier', name: 'At-Risk Student Identifier', icon: GraduationCap, enterprise: false },
    { id: 'intelligent-grading-platform', name: 'Intelligent Grading Platform', icon: GraduationCap, enterprise: false },
    { id: 'educational-resource-optimizer', name: 'Educational Resource Optimizer', icon: GraduationCap, enterprise: false },
    { id: 'learning-management-system', name: 'Learning Management System', icon: GraduationCap, enterprise: false },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#8B5CF615' }]}><GraduationCap size={48} color="#8B5CF6" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Education - Enterprise Sub-Agents</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Enterprise-Grade Educational Institution AI Workforce</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#8B5CF622' }]}><Users size={12} color="#8B5CF6" /><Text style={[styles.badgeText, { color: '#8B5CF6' }]}>60 Agents</Text></View>
          <View style={[styles.badge, { backgroundColor: '#F59E0B22' }]}><Sparkles size={12} color="#F59E0B" /><Text style={[styles.badgeText, { color: '#F59E0B' }]}>8 Enterprise</Text></View>
        </View>
        <View style={styles.featuresRow}>
          <View style={styles.featureItem}><Shield size={14} color="#10B981" /><Text style={styles.featureText}>SOC2</Text></View>
          <View style={styles.featureItem}><Zap size={14} color="#6366F1" /><Text style={styles.featureText}>Quantum AI</Text></View>
          <View style={styles.featureItem}><Sparkles size={14} color="#EC4899" /><Text style={styles.featureText}>99.99% Uptime</Text></View>
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Education Sub-Agents</Text>
        {agents.map((agent) => (
          <TouchableOpacity
            key={agent.id}
            onPress={() => router.push(`/ai-agent/education/sub-agents/${agent.id}`)}
            style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
          >
            <View style={[styles.agentIcon, { backgroundColor: agent.enterprise ? '#F59E0B20' : '#8B5CF620' }]}>
              <GraduationCap size={28} color={agent.enterprise ? '#F59E0B' : '#8B5CF6'} />
            </View>
            <View style={styles.agentInfo}>
              <View style={styles.agentNameRow}>
                <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
                {agent.enterprise && <Sparkles size={16} color="#F59E0B" />}
              </View>
              <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.enterprise ? 'Enterprise Agent' : 'Sub-Agent'}</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    padding: 24,
    borderBottomWidth: 1,
  },
  heroIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  agentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  agentIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  agentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  agentDesc: {
    fontSize: 14,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featureText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});