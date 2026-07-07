import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';

const agents = [
  // EXECUTIVE COMMAND CENTERS (15 agents)
  { id: 'edu-ai-agents-000', uid: 'ktx-edu-000', title: 'AI Education Agents', route: '/ai-agent/education/ai-education-agents', color: '#00F0FF', level: 'c_level', efficiency: '98%' },
  { id: 'edu-chief-officer-001', uid: 'ktx-edu-001', title: 'Chief Education Officer Command Center', route: '/ai-agent/education/chief-education-officer-command-center', color: '#00F0FF', level: 'c_level', efficiency: '98%' },
  { id: 'edu-student-intelligence-002', uid: 'ktx-edu-002', title: 'Student Intelligence Hub', route: '/ai-agent/education/student-intelligence-hub', color: '#3B82F6', level: 'vp_director', efficiency: '96%' },
  { id: 'edu-learning-analytics-003', uid: 'ktx-edu-003', title: 'Learning Analytics Command Center', route: '/ai-agent/education/learning-analytics-command-center', color: '#10B981', level: 'vp_director', efficiency: '95%' },
  { id: 'edu-ai-tutor-004', uid: 'ktx-edu-004', title: 'AI Tutor Center', route: '/ai-agent/education/ai-tutor-center', color: '#8B5CF6', level: 'vp_director', efficiency: '94%' },
  { id: 'edu-curriculum-course-005', uid: 'ktx-edu-005', title: 'Curriculum & Course Command Center', route: '/ai-agent/education/curriculum-course-command-center', color: '#F59E0B', level: 'vp_director', efficiency: '93%' },
  { id: 'edu-assessment-intelligence-006', uid: 'ktx-edu-006', title: 'Assessment Intelligence Hub', route: '/ai-agent/education/assessment-intelligence-hub', color: '#EF4444', level: 'vp_director', efficiency: '92%' },
  { id: 'edu-faculty-operations-007', uid: 'ktx-edu-007', title: 'Faculty Operations Center', route: '/ai-agent/education/faculty-operations-center', color: '#EC4899', level: 'vp_director', efficiency: '93%' },
  { id: 'edu-admissions-command-008', uid: 'ktx-edu-008', title: 'Admissions Command Center', route: '/ai-agent/education/admissions-command-center', color: '#00F0FF', level: 'vp_director', efficiency: '94%' },
  { id: 'edu-career-success-009', uid: 'ktx-edu-009', title: 'Career Success Hub', route: '/ai-agent/education/career-success-hub', color: '#10B981', level: 'vp_director', efficiency: '92%' },
  { id: 'edu-research-innovation-010', uid: 'ktx-edu-010', title: 'Research & Innovation Center', route: '/ai-agent/education/research-innovation-center', color: '#8B5CF6', level: 'vp_director', efficiency: '93%' },
  { id: 'edu-ai-insights-011', uid: 'ktx-edu-011', title: 'AI Insights Center', route: '/ai-agent/education/ai-insights-center', color: '#F59E0B', level: 'vp_director', efficiency: '91%' },
  { id: 'edu-activity-feed-012', uid: 'ktx-edu-012', title: 'Real-Time Education Activity Feed', route: '/ai-agent/education/real-time-education-activity-feed', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'edu-global-operations-013', uid: 'ktx-edu-013', title: 'Global Education Operations', route: '/ai-agent/education/global-education-operations', color: '#10B981', level: 'c_level', efficiency: '95%' },
  { id: 'edu-system-health-014', uid: 'ktx-edu-014', title: 'System Health & AI Infrastructure', route: '/ai-agent/education/system-health-ai-infrastructure', color: '#EF4444', level: 'vp_director', efficiency: '94%' },

  // CORE EDUCATION INTELLIGENCE (10 agents)
  { id: 'edu-neural-hub-015', uid: 'ktx-edu-015', title: 'AI Neural Education Intelligence Hub', route: '/ai-agent/education/edu-neural-hub-015', color: '#3B82F6', level: 'c_level', efficiency: '95%' },
  { id: 'edu-quantum-analytics-016', uid: 'ktx-edu-016', title: 'AI Quantum Learning Analytics Engine', route: '/ai-agent/education/edu-quantum-analytics-016', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
  { id: 'edu-predictive-success-017', uid: 'ktx-edu-017', title: 'AI Predictive Student Success Platform', route: '/ai-agent/education/edu-predictive-success-017', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'edu-realtime-monitor-018', uid: 'ktx-edu-018', title: 'AI Real-Time Academic Performance Monitor', route: '/ai-agent/education/edu-realtime-monitor-018', color: '#3B82F6', level: 'manager', efficiency: '92%' },
  { id: 'edu-cognitive-curriculum-019', uid: 'ktx-edu-019', title: 'AI Cognitive Curriculum Intelligence System', route: '/ai-agent/education/edu-cognitive-curriculum-019', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'edu-adaptive-pathways-020', uid: 'ktx-edu-020', title: 'AI Adaptive Learning Pathway Optimizer', route: '/ai-agent/education/edu-adaptive-pathways-020', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'edu-assessment-analytics-021', uid: 'ktx-edu-021', title: 'AI Intelligent Assessment Analytics Engine', route: '/ai-agent/education/edu-assessment-analytics-021', color: '#3B82F6', level: 'manager', efficiency: '92%' },
  { id: 'edu-neural-engagement-022', uid: 'ktx-edu-022', title: 'AI Neural Engagement Tracking System', route: '/ai-agent/education/edu-neural-engagement-022', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'edu-predictive-atrisk-023', uid: 'ktx-edu-023', title: 'AI Predictive At-Risk Student Identifier', route: '/ai-agent/education/edu-predictive-atrisk-023', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'edu-parent-comm-024', uid: 'ktx-edu-024', title: 'AI Real-Time Parent Communication Hub', route: '/ai-agent/education/edu-parent-comm-024', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  
  // LEARNING MANAGEMENT SYSTEMS (10 agents)
  { id: 'edu-cognitive-lms-025', uid: 'ktx-edu-025', title: 'AI Cognitive Learning Management System', route: '/ai-agent/education/edu-cognitive-lms-025', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'edu-auto-grading-026', uid: 'ktx-edu-026', title: 'AI Automated Intelligent Grading Platform', route: '/ai-agent/education/edu-auto-grading-026', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'edu-resource-optimizer-027', uid: 'ktx-edu-027', title: 'AI Neural Educational Resource Optimizer', route: '/ai-agent/education/edu-resource-optimizer-027', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'edu-accessibility-028', uid: 'ktx-edu-028', title: 'AI Adaptive Accessibility Compliance Manager', route: '/ai-agent/education/edu-accessibility-028', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  { id: 'edu-scholarship-alloc-029', uid: 'ktx-edu-029', title: 'AI Intelligent Scholarship Allocation System', route: '/ai-agent/education/edu-scholarship-alloc-029', color: '#3B82F6', level: 'manager', efficiency: '92%' },
  { id: 'edu-career-guidance-030', uid: 'ktx-edu-030', title: 'AI Predictive Career Guidance Engine', route: '/ai-agent/education/edu-career-guidance-030', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'edu-alumni-engagement-031', uid: 'ktx-edu-031', title: 'AI Real-Time Alumni Engagement Platform', route: '/ai-agent/education/edu-alumni-engagement-031', color: '#3B82F6', level: 'manager', efficiency: '88%' },
  { id: 'edu-research-collab-032', uid: 'ktx-edu-032', title: 'AI Cognitive Research Collaboration Hub', route: '/ai-agent/education/edu-research-collab-032', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'edu-compliance-monitor-033', uid: 'ktx-edu-033', title: 'AI Automated Academic Compliance Monitor', route: '/ai-agent/education/edu-compliance-monitor-033', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'edu-analytics-dashboard-034', uid: 'ktx-edu-034', title: 'AI Neural Education Analytics Dashboard', route: '/ai-agent/education/edu-analytics-dashboard-034', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
  
  // OPERATIONS AND MANAGEMENT (10 agents)
  { id: 'edu-budget-forecast-035', uid: 'ktx-edu-035', title: 'AI Adaptive Budget Forecasting System', route: '/ai-agent/education/edu-budget-forecast-035', color: '#3B82F6', level: 'vp_director', efficiency: '92%' },
  { id: 'edu-campus-ops-036', uid: 'ktx-edu-036', title: 'AI Intelligent Campus Operations Center', route: '/ai-agent/education/edu-campus-ops-036', color: '#3B82F6', level: 'vp_director', efficiency: '91%' },
  { id: 'edu-enrollment-analytics-037', uid: 'ktx-edu-037', title: 'AI Predictive Enrollment Analytics Engine', route: '/ai-agent/education/edu-enrollment-analytics-037', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'edu-course-design-038', uid: 'ktx-edu-038', title: 'AI Real-Time Course Design Platform', route: '/ai-agent/education/edu-course-design-038', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'edu-admission-processing-039', uid: 'ktx-edu-039', title: 'AI Cognitive Admission Processing System', route: '/ai-agent/education/edu-admission-processing-039', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
  
  // CUSTOMER SERVICE AND SUPPORT (10 agents)
  { id: 'edu-customer-support-040', uid: 'ktx-edu-040', title: 'AI Automated Customer Support Hub', route: '/ai-agent/education/edu-customer-support-040', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'edu-student-service-041', uid: 'ktx-edu-041', title: 'AI Neural Student Service Intelligence', route: '/ai-agent/education/edu-student-service-041', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'edu-survey-analyzer-042', uid: 'ktx-edu-042', title: 'AI Adaptive Survey Feedback Analyzer', route: '/ai-agent/education/edu-survey-analyzer-042', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  { id: 'edu-campaign-mgmt-043', uid: 'ktx-edu-043', title: 'AI Intelligent Campaign Management Platform', route: '/ai-agent/education/edu-campaign-mgmt-043', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'edu-enrollment-conversion-044', uid: 'ktx-edu-044', title: 'AI Predictive Enrollment Conversion Engine', route: '/ai-agent/education/edu-enrollment-conversion-044', color: '#3B82F6', level: 'manager', efficiency: '92%' },
  { id: 'edu-tech-support-045', uid: 'ktx-edu-045', title: 'AI Real-Time Technical Support Resolver', route: '/ai-agent/education/edu-tech-support-045', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  
  // ACADEMIC AFFAIRS MANAGEMENT (10 agents)
  { id: 'edu-academic-affairs-046', uid: 'ktx-edu-046', title: 'AI Cognitive Academic Affairs Orchestrator', route: '/ai-agent/education/edu-academic-affairs-046', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
  { id: 'edu-student-services-coord-047', uid: 'ktx-edu-047', title: 'AI Automated Student Services Coordinator', route: '/ai-agent/education/edu-student-services-coord-047', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'edu-online-learning-048', uid: 'ktx-edu-048', title: 'AI Neural Online Learning Optimizer', route: '/ai-agent/education/edu-online-learning-048', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'edu-edu-operations-049', uid: 'ktx-edu-049', title: 'AI Adaptive Education Operations Manager', route: '/ai-agent/education/edu-edu-operations-049', color: '#3B82F6', level: 'vp_director', efficiency: '92%' },
  { id: 'edu-edtech-integrator-050', uid: 'ktx-edu-050', title: 'AI Intelligent Education Technology Integrator', route: '/ai-agent/education/edu-edtech-integrator-050', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'edu-data-analyst-051', uid: 'ktx-edu-051', title: 'AI Predictive Education Data Analyst', route: '/ai-agent/education/edu-data-analyst-051', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'edu-product-manager-052', uid: 'ktx-edu-052', title: 'AI Real-Time Education Product Manager', route: '/ai-agent/education/edu-product-manager-052', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  { id: 'edu-marketing-strategist-053', uid: 'ktx-edu-053', title: 'AI Cognitive Education Marketing Strategist', route: '/ai-agent/education/edu-marketing-strategist-053', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'edu-sales-platform-054', uid: 'ktx-edu-054', title: 'AI Automated Education Sales Platform', route: '/ai-agent/education/edu-sales-platform-054', color: '#3B82F6', level: 'manager', efficiency: '88%' },
  
  // LEADERSHIP AND MANAGEMENT (15 agents)
  { id: 'edu-neural-hub-leadership-055', uid: 'ktx-edu-055', title: 'AI Neural Education Intelligence Hub', route: '/ai-agent/education/edu-neural-hub-leadership-055', color: '#3B82F6', level: 'c_level', efficiency: '96%' },
  { id: 'edu-quantum-ops-056', uid: 'ktx-edu-056', title: 'AI Quantum Academic Operations Center', route: '/ai-agent/education/edu-quantum-ops-056', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
  { id: 'dept-chair-assistant-057', uid: 'ktx-edu-057', title: 'AI Predictive Department Chair Assistant', route: '/ai-agent/education/dept-chair-assistant-057', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'professor-support-058', uid: 'ktx-edu-058', title: 'AI Real-Time Professor Support System', route: '/ai-agent/education/professor-support-058', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'research-collab-platform-059', uid: 'ktx-edu-059', title: 'AI Cognitive Research Collaboration Platform', route: '/ai-agent/education/research-collab-platform-059', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'advisor-intelligence-060', uid: 'ktx-edu-060', title: 'AI Adaptive Advisor Intelligence Engine', route: '/ai-agent/education/advisor-intelligence-060', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  { id: 'counselor-coord-hub-061', uid: 'ktx-edu-061', title: 'AI Intelligent Counselor Coordination Hub', route: '/ai-agent/education/counselor-coord-hub-061', color: '#3B82F6', level: 'manager', efficiency: '88%' },
  { id: 'support-specialist-062', uid: 'ktx-edu-062', title: 'AI Automated Support Specialist Platform', route: '/ai-agent/education/support-specialist-062', color: '#3B82F6', level: 'manager', efficiency: '87%' },
  
  // SCHOLARSHIP AND FINANCIAL AID (10 agents)
  { id: 'scholarship-mgmt-063', uid: 'ktx-edu-063', title: 'AI Neural Scholarship Management System', route: '/ai-agent/education/scholarship-mgmt-063', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
  { id: 'financial-aid-optimizer-064', uid: 'ktx-edu-064', title: 'AI Adaptive Financial Aid Optimizer', route: '/ai-agent/education/financial-aid-optimizer-064', color: '#3B82F6', level: 'manager', efficiency: '92%' },
  { id: 'student-success-coach-065', uid: 'ktx-edu-065', title: 'AI Intelligent Student Success Coach', route: '/ai-agent/education/student-success-coach-065', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'academic-performance-066', uid: 'ktx-edu-066', title: 'AI Predictive Academic Performance Analyzer', route: '/ai-agent/education/academic-performance-066', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'learning-engagement-067', uid: 'ktx-edu-067', title: 'AI Real-Time Learning Engagement Tracker', route: '/ai-agent/education/learning-engagement-067', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  
  // FACULTY AND RESEARCH SUPPORT (10 agents)
  { id: 'faculty-performance-068', uid: 'ktx-edu-068', title: 'AI Cognitive Faculty Performance Monitor', route: '/ai-agent/education/faculty-performance-068', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'course-quality-qa-069', uid: 'ktx-edu-069', title: 'AI Automated Course Quality Assurance', route: '/ai-agent/education/course-quality-qa-069', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  { id: 'institutional-research-070', uid: 'ktx-edu-070', title: 'AI Neural Institutional Research Platform', route: '/ai-agent/education/institutional-research-070', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'student-retention-071', uid: 'ktx-edu-071', title: 'AI Adaptive Student Retention Engine', route: '/ai-agent/education/student-retention-071', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'alumni-relations-072', uid: 'ktx-edu-072', title: 'AI Intelligent Alumni Relations Manager', route: '/ai-agent/education/alumni-relations-072', color: '#3B82F6', level: 'manager', efficiency: '88%' },
  { id: 'graduate-outcomes-073', uid: 'ktx-edu-073', title: 'AI Predictive Graduate Outcome Tracker', route: '/ai-agent/education/graduate-outcomes-073', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  
  // COMPLIANCE AND OPERATIONS (10 agents)
  { id: 'accreditation-compliance-074', uid: 'ktx-edu-074', title: 'AI Real-Time Accreditation Compliance System', route: '/ai-agent/education/accreditation-compliance-074', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'edtech-integrator-075', uid: 'ktx-edu-075', title: 'AI Cognitive Educational Technology Integrator', route: '/ai-agent/education/edtech-integrator-075', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'learning-analytics-076', uid: 'ktx-edu-076', title: 'AI Automated Learning Analytics Platform', route: '/ai-agent/education/learning-analytics-076', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
  { id: 'education-innovation-077', uid: 'ktx-edu-077', title: 'AI Neural Education Innovation Hub', route: '/ai-agent/education/education-innovation-077', color: '#3B82F6', level: 'vp_director', efficiency: '92%' },
  
  // SPECIALIZED EDUCATIONAL SERVICES (15 agents)
  { id: 'digital-learning-078', uid: 'ktx-edu-078', title: 'AI Adaptive Digital Learning Manager', route: '/ai-agent/education/digital-learning-078', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'content-creator-079', uid: 'ktx-edu-079', title: 'AI Intelligent Educational Content Creator', route: '/ai-agent/education/content-creator-079', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'learning-outcomes-080', uid: 'ktx-edu-080', title: 'AI Predictive Learning Outcome Analyzer', route: '/ai-agent/education/learning-outcomes-080', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  { id: 'student-wellness-081', uid: 'ktx-edu-081', title: 'AI Real-Time Student Wellness Monitor', route: '/ai-agent/education/student-wellness-081', color: '#3B82F6', level: 'manager', efficiency: '88%' },
  { id: 'crisis-response-082', uid: 'ktx-edu-082', title: 'AI Cognitive Crisis Response Coordinator', route: '/ai-agent/education/crisis-response-082', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'resource-allocation-083', uid: 'ktx-edu-083', title: 'AI Automated Educational Resource Allocation', route: '/ai-agent/education/resource-allocation-083', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'campus-safety-084', uid: 'ktx-edu-084', title: 'AI Neural Campus Safety Intelligence', route: '/ai-agent/education/campus-safety-084', color: '#3B82F6', level: 'vp_director', efficiency: '92%' },
  { id: 'diversity-inclusion-085', uid: 'ktx-edu-085', title: 'AI Adaptive Diversity Inclusion Manager', route: '/ai-agent/education/diversity-inclusion-085', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  { id: 'community-engagement-086', uid: 'ktx-edu-086', title: 'AI Intelligent Community Engagement Platform', route: '/ai-agent/education/community-engagement-086', color: '#3B82F6', level: 'manager', efficiency: '88%' },
  { id: 'institutional-performance-087', uid: 'ktx-edu-087', title: 'AI Predictive Institutional Performance Dashboard', route: '/ai-agent/education/institutional-performance-087', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
  { id: 'strategic-planning-088', uid: 'ktx-edu-088', title: 'AI Real-Time Strategic Planning Assistant', route: '/ai-agent/education/strategic-planning-088', color: '#3B82F6', level: 'c_level', efficiency: '95%' },
  { id: 'education-policy-089', uid: 'ktx-edu-089', title: 'AI Cognitive Education Policy Analyst', route: '/ai-agent/education/education-policy-089', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  
  // ADVANCED SPECIALIZED AGENTS (10 agents)
  { id: 'attendance-tracker-090', uid: 'ktx-edu-090', title: 'AI Neural Attendance Tracker', route: '/ai-agent/education/attendance-tracker-090', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'auto-grading-system-091', uid: 'ktx-edu-091', title: 'AI Automated Grading System', route: '/ai-agent/education/auto-grading-system-091', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'lms-manager-092', uid: 'ktx-edu-092', title: 'AI Cognitive LMS Manager', route: '/ai-agent/education/lms-manager-092', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  { id: 'adaptive-assessment-093', uid: 'ktx-edu-093', title: 'AI Adaptive Assessment Engine', route: '/ai-agent/education/adaptive-assessment-093', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'instructor-assistant-094', uid: 'ktx-edu-094', title: 'AI Intelligent Instructor Assistant', route: '/ai-agent/education/instructor-assistant-094', color: '#3B82F6', level: 'manager', efficiency: '88%' },
  { id: 'career-counselor-095', uid: 'ktx-edu-095', title: 'AI Predictive Career Counselor', route: '/ai-agent/education/career-counselor-095', color: '#3B82F6', level: 'manager', efficiency: '89%' },
  { id: 'alumni-tracker-096', uid: 'ktx-edu-096', title: 'AI Real-Time Alumni Tracker', route: '/ai-agent/education/alumni-tracker-096', color: '#3B82F6', level: 'manager', efficiency: '87%' },
  { id: 'research-platform-097', uid: 'ktx-edu-097', title: 'AI Cognitive Research Platform', route: '/ai-agent/education/research-platform-097', color: '#3B82F6', level: 'vp_director', efficiency: '92%' },
  { id: 'compliance-checker-098', uid: 'ktx-edu-098', title: 'AI Automated Compliance Checker', route: '/ai-agent/education/compliance-checker-098', color: '#3B82F6', level: 'manager', efficiency: '88%' },
  { id: 'analytics-dashboard-099', uid: 'ktx-edu-099', title: 'AI Neural Analytics Dashboard', route: '/ai-agent/education/analytics-dashboard-099', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="education-training"
      agents={agents}
    />
  );
}
