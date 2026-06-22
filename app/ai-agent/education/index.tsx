import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  // CORE EDUCATION INTELLIGENCE (10 agents)
  { id: 'edu-neural-hub-001', uid: 'ktx-edu-001', title: 'AI Neural Education Intelligence Hub', route: '/ai-agent/education/edu-neural-hub-001', color: '#3B82F6', level: 'c_level', efficiency: '95%' },
  { id: 'edu-quantum-analytics-002', uid: 'ktx-edu-002', title: 'AI Quantum Learning Analytics Engine', route: '/ai-agent/education/edu-quantum-analytics-002', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
  { id: 'edu-predictive-success-003', uid: 'ktx-edu-003', title: 'AI Predictive Student Success Platform', route: '/ai-agent/education/edu-predictive-success-003', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'edu-realtime-monitor-004', uid: 'ktx-edu-004', title: 'AI Real-Time Academic Performance Monitor', route: '/ai-agent/education/edu-realtime-monitor-004', color: '#3B82F6', level: 'manager', efficiency: '92%' },
  { id: 'edu-cognitive-curriculum-005', uid: 'ktx-edu-005', title: 'AI Cognitive Curriculum Intelligence System', route: '/ai-agent/education/edu-cognitive-curriculum-005', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'edu-adaptive-pathways-006', uid: 'ktx-edu-006', title: 'AI Adaptive Learning Pathway Optimizer', route: '/ai-agent/education/edu-adaptive-pathways-006', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'edu-assessment-analytics-007', uid: 'ktx-edu-007', title: 'AI Intelligent Assessment Analytics Engine', route: '/ai-agent/education/edu-assessment-analytics-007', color: '#3B82F6', level: 'manager', efficiency: '92%' },
  { id: 'edu-neural-engagement-008', uid: 'ktx-edu-008', title: 'AI Neural Engagement Tracking System', route: '/ai-agent/education/edu-neural-engagement-008', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'edu-predictive-atrisk-009', uid: 'ktx-edu-009', title: 'AI Predictive At-Risk Student Identifier', route: '/ai-agent/education/edu-predictive-atrisk-009', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'edu-parent-comm-010', uid: 'ktx-edu-010', title: 'AI Real-Time Parent Communication Hub', route: '/ai-agent/education/edu-parent-comm-010', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  
  // LEARNING MANAGEMENT SYSTEMS (10 agents)
  { id: 'edu-cognitive-lms-011', uid: 'ktx-edu-011', title: 'AI Cognitive Learning Management System', route: '/ai-agent/education/edu-cognitive-lms-011', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'edu-auto-grading-012', uid: 'ktx-edu-012', title: 'AI Automated Intelligent Grading Platform', route: '/ai-agent/education/edu-auto-grading-012', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'edu-resource-optimizer-013', uid: 'ktx-edu-013', title: 'AI Neural Educational Resource Optimizer', route: '/ai-agent/education/edu-resource-optimizer-013', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'edu-accessibility-014', uid: 'ktx-edu-014', title: 'AI Adaptive Accessibility Compliance Manager', route: '/ai-agent/education/edu-accessibility-014', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  { id: 'edu-scholarship-alloc-015', uid: 'ktx-edu-015', title: 'AI Intelligent Scholarship Allocation System', route: '/ai-agent/education/edu-scholarship-alloc-015', color: '#3B82F6', level: 'manager', efficiency: '92%' },
  { id: 'edu-career-guidance-016', uid: 'ktx-edu-016', title: 'AI Predictive Career Guidance Engine', route: '/ai-agent/education/edu-career-guidance-016', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'edu-alumni-engagement-017', uid: 'ktx-edu-017', title: 'AI Real-Time Alumni Engagement Platform', route: '/ai-agent/education/edu-alumni-engagement-017', color: '#3B82F6', level: 'manager', efficiency: '88%' },
  { id: 'edu-research-collab-018', uid: 'ktx-edu-018', title: 'AI Cognitive Research Collaboration Hub', route: '/ai-agent/education/edu-research-collab-018', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'edu-compliance-monitor-019', uid: 'ktx-edu-019', title: 'AI Automated Academic Compliance Monitor', route: '/ai-agent/education/edu-compliance-monitor-019', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'edu-analytics-dashboard-020', uid: 'ktx-edu-020', title: 'AI Neural Education Analytics Dashboard', route: '/ai-agent/education/edu-analytics-dashboard-020', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
  
  // OPERATIONS AND MANAGEMENT (10 agents)
  { id: 'edu-budget-forecast-021', uid: 'ktx-edu-021', title: 'AI Adaptive Budget Forecasting System', route: '/ai-agent/education/edu-budget-forecast-021', color: '#3B82F6', level: 'vp_director', efficiency: '92%' },
  { id: 'edu-campus-ops-022', uid: 'ktx-edu-022', title: 'AI Intelligent Campus Operations Center', route: '/ai-agent/education/edu-campus-ops-022', color: '#3B82F6', level: 'vp_director', efficiency: '91%' },
  { id: 'edu-enrollment-analytics-023', uid: 'ktx-edu-023', title: 'AI Predictive Enrollment Analytics Engine', route: '/ai-agent/education/edu-enrollment-analytics-023', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'edu-course-design-024', uid: 'ktx-edu-024', title: 'AI Real-Time Course Design Platform', route: '/ai-agent/education/edu-course-design-024', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'edu-admission-processing-025', uid: 'ktx-edu-025', title: 'AI Cognitive Admission Processing System', route: '/ai-agent/education/edu-admission-processing-025', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
  
  // CUSTOMER SERVICE AND SUPPORT (10 agents)
  { id: 'edu-customer-support-026', uid: 'ktx-edu-026', title: 'AI Automated Customer Support Hub', route: '/ai-agent/education/edu-customer-support-026', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'edu-student-service-027', uid: 'ktx-edu-027', title: 'AI Neural Student Service Intelligence', route: '/ai-agent/education/edu-student-service-027', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'edu-survey-analyzer-028', uid: 'ktx-edu-028', title: 'AI Adaptive Survey Feedback Analyzer', route: '/ai-agent/education/edu-survey-analyzer-028', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  { id: 'edu-campaign-mgmt-029', uid: 'ktx-edu-029', title: 'AI Intelligent Campaign Management Platform', route: '/ai-agent/education/edu-campaign-mgmt-029', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'edu-enrollment-conversion-030', uid: 'ktx-edu-030', title: 'AI Predictive Enrollment Conversion Engine', route: '/ai-agent/education/edu-enrollment-conversion-030', color: '#3B82F6', level: 'manager', efficiency: '92%' },
  { id: 'edu-tech-support-031', uid: 'ktx-edu-031', title: 'AI Real-Time Technical Support Resolver', route: '/ai-agent/education/edu-tech-support-031', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  
  // ACADEMIC AFFAIRS MANAGEMENT (10 agents)
  { id: 'edu-academic-affairs-032', uid: 'ktx-edu-032', title: 'AI Cognitive Academic Affairs Orchestrator', route: '/ai-agent/education/edu-academic-affairs-032', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
  { id: 'edu-student-services-coord-033', uid: 'ktx-edu-033', title: 'AI Automated Student Services Coordinator', route: '/ai-agent/education/edu-student-services-coord-033', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'edu-online-learning-034', uid: 'ktx-edu-034', title: 'AI Neural Online Learning Optimizer', route: '/ai-agent/education/edu-online-learning-034', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'edu-edu-operations-035', uid: 'ktx-edu-035', title: 'AI Adaptive Education Operations Manager', route: '/ai-agent/education/edu-edu-operations-035', color: '#3B82F6', level: 'vp_director', efficiency: '92%' },
  { id: 'edu-edtech-integrator-036', uid: 'ktx-edu-036', title: 'AI Intelligent Education Technology Integrator', route: '/ai-agent/education/edu-edtech-integrator-036', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'edu-data-analyst-037', uid: 'ktx-edu-037', title: 'AI Predictive Education Data Analyst', route: '/ai-agent/education/edu-data-analyst-037', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'edu-product-manager-038', uid: 'ktx-edu-038', title: 'AI Real-Time Education Product Manager', route: '/ai-agent/education/edu-product-manager-038', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  { id: 'edu-marketing-strategist-039', uid: 'ktx-edu-039', title: 'AI Cognitive Education Marketing Strategist', route: '/ai-agent/education/edu-marketing-strategist-039', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'edu-sales-platform-040', uid: 'ktx-edu-040', title: 'AI Automated Education Sales Platform', route: '/ai-agent/education/edu-sales-platform-040', color: '#3B82F6', level: 'manager', efficiency: '88%' },
  
  // LEADERSHIP AND MANAGEMENT (15 agents)
  { id: 'edu-neural-hub-leadership-041', uid: 'ktx-edu-041', title: 'AI Neural Education Intelligence Hub', route: '/ai-agent/education/edu-neural-hub-leadership-041', color: '#3B82F6', level: 'c_level', efficiency: '96%' },
  { id: 'edu-quantum-ops-042', uid: 'ktx-edu-042', title: 'AI Quantum Academic Operations Center', route: '/ai-agent/education/edu-quantum-ops-042', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
  { id: 'dept-chair-assistant-043', uid: 'ktx-edu-043', title: 'AI Predictive Department Chair Assistant', route: '/ai-agent/education/dept-chair-assistant-043', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'professor-support-044', uid: 'ktx-edu-044', title: 'AI Real-Time Professor Support System', route: '/ai-agent/education/professor-support-044', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'research-collab-platform-045', uid: 'ktx-edu-045', title: 'AI Cognitive Research Collaboration Platform', route: '/ai-agent/education/research-collab-platform-045', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'advisor-intelligence-046', uid: 'ktx-edu-046', title: 'AI Adaptive Advisor Intelligence Engine', route: '/ai-agent/education/advisor-intelligence-046', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  { id: 'counselor-coord-hub-047', uid: 'ktx-edu-047', title: 'AI Intelligent Counselor Coordination Hub', route: '/ai-agent/education/counselor-coord-hub-047', color: '#3B82F6', level: 'manager', efficiency: '88%' },
  { id: 'support-specialist-048', uid: 'ktx-edu-048', title: 'AI Automated Support Specialist Platform', route: '/ai-agent/education/support-specialist-048', color: '#3B82F6', level: 'manager', efficiency: '87%' },
  
  // SCHOLARSHIP AND FINANCIAL AID (10 agents)
  { id: 'scholarship-mgmt-049', uid: 'ktx-edu-049', title: 'AI Neural Scholarship Management System', route: '/ai-agent/education/scholarship-mgmt-049', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
  { id: 'financial-aid-optimizer-050', uid: 'ktx-edu-050', title: 'AI Adaptive Financial Aid Optimizer', route: '/ai-agent/education/financial-aid-optimizer-050', color: '#3B82F6', level: 'manager', efficiency: '92%' },
  { id: 'student-success-coach-051', uid: 'ktx-edu-051', title: 'AI Intelligent Student Success Coach', route: '/ai-agent/education/student-success-coach-051', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'academic-performance-052', uid: 'ktx-edu-052', title: 'AI Predictive Academic Performance Analyzer', route: '/ai-agent/education/academic-performance-052', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'learning-engagement-053', uid: 'ktx-edu-053', title: 'AI Real-Time Learning Engagement Tracker', route: '/ai-agent/education/learning-engagement-053', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  
  // FACULTY AND RESEARCH SUPPORT (10 agents)
  { id: 'faculty-performance-054', uid: 'ktx-edu-054', title: 'AI Cognitive Faculty Performance Monitor', route: '/ai-agent/education/faculty-performance-054', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'course-quality-qa-055', uid: 'ktx-edu-055', title: 'AI Automated Course Quality Assurance', route: '/ai-agent/education/course-quality-qa-055', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  { id: 'institutional-research-056', uid: 'ktx-edu-056', title: 'AI Neural Institutional Research Platform', route: '/ai-agent/education/institutional-research-056', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'student-retention-057', uid: 'ktx-edu-057', title: 'AI Adaptive Student Retention Engine', route: '/ai-agent/education/student-retention-057', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'alumni-relations-058', uid: 'ktx-edu-058', title: 'AI Intelligent Alumni Relations Manager', route: '/ai-agent/education/alumni-relations-058', color: '#3B82F6', level: 'manager', efficiency: '88%' },
  { id: 'graduate-outcomes-059', uid: 'ktx-edu-059', title: 'AI Predictive Graduate Outcome Tracker', route: '/ai-agent/education/graduate-outcomes-059', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  
  // COMPLIANCE AND OPERATIONS (10 agents)
  { id: 'accreditation-compliance-060', uid: 'ktx-edu-060', title: 'AI Real-Time Accreditation Compliance System', route: '/ai-agent/education/accreditation-compliance-060', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'edtech-integrator-061', uid: 'ktx-edu-061', title: 'AI Cognitive Educational Technology Integrator', route: '/ai-agent/education/edtech-integrator-061', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'learning-analytics-062', uid: 'ktx-edu-062', title: 'AI Automated Learning Analytics Platform', route: '/ai-agent/education/learning-analytics-062', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
  { id: 'education-innovation-063', uid: 'ktx-edu-063', title: 'AI Neural Education Innovation Hub', route: '/ai-agent/education/education-innovation-063', color: '#3B82F6', level: 'vp_director', efficiency: '92%' },
  
  // SPECIALIZED EDUCATIONAL SERVICES (15 agents)
  { id: 'digital-learning-064', uid: 'ktx-edu-064', title: 'AI Adaptive Digital Learning Manager', route: '/ai-agent/education/digital-learning-064', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'content-creator-065', uid: 'ktx-edu-065', title: 'AI Intelligent Educational Content Creator', route: '/ai-agent/education/content-creator-065', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'learning-outcomes-066', uid: 'ktx-edu-066', title: 'AI Predictive Learning Outcome Analyzer', route: '/ai-agent/education/learning-outcomes-066', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  { id: 'student-wellness-067', uid: 'ktx-edu-067', title: 'AI Real-Time Student Wellness Monitor', route: '/ai-agent/education/student-wellness-067', color: '#3B82F6', level: 'manager', efficiency: '88%' },
  { id: 'crisis-response-068', uid: 'ktx-edu-068', title: 'AI Cognitive Crisis Response Coordinator', route: '/ai-agent/education/crisis-response-068', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'resource-allocation-069', uid: 'ktx-edu-069', title: 'AI Automated Educational Resource Allocation', route: '/ai-agent/education/resource-allocation-069', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'campus-safety-070', uid: 'ktx-edu-070', title: 'AI Neural Campus Safety Intelligence', route: '/ai-agent/education/campus-safety-070', color: '#3B82F6', level: 'vp_director', efficiency: '92%' },
  { id: 'diversity-inclusion-071', uid: 'ktx-edu-071', title: 'AI Adaptive Diversity Inclusion Manager', route: '/ai-agent/education/diversity-inclusion-071', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  { id: 'community-engagement-072', uid: 'ktx-edu-072', title: 'AI Intelligent Community Engagement Platform', route: '/ai-agent/education/community-engagement-072', color: '#3B82F6', level: 'manager', efficiency: '88%' },
  { id: 'institutional-performance-073', uid: 'ktx-edu-073', title: 'AI Predictive Institutional Performance Dashboard', route: '/ai-agent/education/institutional-performance-073', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
  { id: 'strategic-planning-074', uid: 'ktx-edu-074', title: 'AI Real-Time Strategic Planning Assistant', route: '/ai-agent/education/strategic-planning-074', color: '#3B82F6', level: 'c_level', efficiency: '95%' },
  { id: 'education-policy-075', uid: 'ktx-edu-075', title: 'AI Cognitive Education Policy Analyst', route: '/ai-agent/education/education-policy-075', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  
  // ADVANCED SPECIALIZED AGENTS (10 agents)
  { id: 'attendance-tracker-076', uid: 'ktx-edu-076', title: 'AI Neural Attendance Tracker', route: '/ai-agent/education/attendance-tracker-076', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'auto-grading-system-077', uid: 'ktx-edu-077', title: 'AI Automated Grading System', route: '/ai-agent/education/auto-grading-system-077', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'lms-manager-078', uid: 'ktx-edu-078', title: 'AI Cognitive LMS Manager', route: '/ai-agent/education/lms-manager-078', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  { id: 'adaptive-assessment-079', uid: 'ktx-edu-079', title: 'AI Adaptive Assessment Engine', route: '/ai-agent/education/adaptive-assessment-079', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'instructor-assistant-080', uid: 'ktx-edu-080', title: 'AI Intelligent Instructor Assistant', route: '/ai-agent/education/instructor-assistant-080', color: '#3B82F6', level: 'manager', efficiency: '88%' },
  { id: 'career-counselor-081', uid: 'ktx-edu-081', title: 'AI Predictive Career Counselor', route: '/ai-agent/education/career-counselor-081', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  { id: 'alumni-tracker-082', uid: 'ktx-edu-082', title: 'AI Real-Time Alumni Tracker', route: '/ai-agent/education/alumni-tracker-082', color: '#3B82F6', level: 'manager', efficiency: '87%' },
  { id: 'research-platform-083', uid: 'ktx-edu-083', title: 'AI Cognitive Research Platform', route: '/ai-agent/education/research-platform-083', color: '#3B82F6', level: 'vp_director', efficiency: '92%' },
  { id: 'compliance-checker-084', uid: 'ktx-edu-084', title: 'AI Automated Compliance Checker', route: '/ai-agent/education/compliance-checker-084', color: '#3B82F6', level: 'manager', efficiency: '88%' },
  { id: 'analytics-dashboard-085', uid: 'ktx-edu-085', title: 'AI Neural Analytics Dashboard', route: '/ai-agent/education/analytics-dashboard-085', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Education - AI Agents</Text>
      <Text style={s.sub}>85 Upgraded AI Agents & Employees</Text>
      <View style={s.grid}>
        {agents.map((a) => (
          <Pressable key={a.id} style={[s.card, { borderLeftColor: a.color }]} onPress={() => router.push(a.route as any)}>
            <Text style={s.at}>{a.title}</Text>
            <Text style={s.al}>{a.level.replace('_',' ').toUpperCase()}</Text>
            <Text style={s.ae}>{a.efficiency}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  sub: { fontSize: 16, color: '#666', marginBottom: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  card: { width: '48%', padding: 16, borderRadius: 12, backgroundColor: '#F5F5F5', borderLeftWidth: 4 },
  at: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  al: { fontSize: 12, color: '#666', marginBottom: 2 },
  ae: { fontSize: 14, fontWeight: '500', color: '#333' }
});
