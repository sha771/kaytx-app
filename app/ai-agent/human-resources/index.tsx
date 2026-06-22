import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-chief-human-resources-officer', uid: 'ktx-07-chief-human-resources-officer', title: 'AI Chief Human Resources Officer', route: '/ai-agent/human-resources/chief-human-resources-officer', color: '#9C27B0', level: 'c_level', efficiency: '79%' },
  { id: 'ai-vp-talent', uid: 'ktx-07-vp-talent', title: 'AI VP Talent', route: '/ai-agent/human-resources/vp-talent', color: '#9C27B0', level: 'vp_director', efficiency: '79%' },
  { id: 'ai-vp-hr-operations', uid: 'ktx-07-vp-hr-operations', title: 'AI VP HR Operations', route: '/ai-agent/human-resources/vp-hr-operations', color: '#9C27B0', level: 'vp_director', efficiency: '88%' },
  { id: 'ai-vp-learning', uid: 'ktx-07-vp-learning', title: 'AI VP Learning', route: '/ai-agent/human-resources/vp-learning', color: '#9C27B0', level: 'vp_director', efficiency: '93%' },
  { id: 'ai-vp-culture', uid: 'ktx-07-vp-culture', title: 'AI VP Culture', route: '/ai-agent/human-resources/vp-culture', color: '#9C27B0', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-compensation', uid: 'ktx-07-vp-compensation', title: 'AI VP Compensation', route: '/ai-agent/human-resources/vp-compensation', color: '#9C27B0', level: 'vp_director', efficiency: '81%' },
  { id: 'ai-vp-employee-relations', uid: 'ktx-07-vp-employee-relations', title: 'AI VP Employee Relations', route: '/ai-agent/human-resources/vp-employee-relations', color: '#9C27B0', level: 'vp_director', efficiency: '84%' },
  { id: 'ai-vp-hr-analytics', uid: 'ktx-07-vp-hr-analytics', title: 'AI VP HR Analytics', route: '/ai-agent/human-resources/vp-hr-analytics', color: '#9C27B0', level: 'vp_director', efficiency: '87%' },
  { id: 'ai-vp-diversity-inclusion', uid: 'ktx-07-vp-diversity-inclusion', title: 'AI VP Diversity & Inclusion', route: '/ai-agent/human-resources/vp-diversity-inclusion', color: '#9C27B0', level: 'vp_director', efficiency: '85%' },
  { id: 'ai-vp-talent-acquisition', uid: 'ktx-07-vp-talent-acquisition', title: 'AI VP Talent Acquisition', route: '/ai-agent/human-resources/vp-talent-acquisition', color: '#9C27B0', level: 'vp_director', efficiency: '82%' },
  { id: 'ai-vp-workforce-planning', uid: 'ktx-07-vp-workforce-planning', title: 'AI VP Workforce Planning', route: '/ai-agent/human-resources/vp-workforce-planning', color: '#9C27B0', level: 'vp_director', efficiency: '83%' },
  { id: 'ai-recruiting-manager', uid: 'ktx-07-recruiting-manager', title: 'AI Recruiting Manager', route: '/ai-agent/human-resources/recruiting-manager', color: '#9C27B0', level: 'manager', efficiency: '82%' },
  { id: 'ai-talent-acquisition-manager', uid: 'ktx-07-talent-acquisition-manager', title: 'AI Talent Acquisition Manager', route: '/ai-agent/human-resources/talent-acquisition-manager', color: '#9C27B0', level: 'manager', efficiency: '81%' },
  { id: 'ai-hr-operations-manager', uid: 'ktx-07-hr-operations-manager', title: 'AI HR Operations Manager', route: '/ai-agent/human-resources/hr-operations-manager', color: '#9C27B0', level: 'manager', efficiency: '85%' },
  { id: 'ai-learning-manager', uid: 'ktx-07-learning-manager', title: 'AI Learning Manager', route: '/ai-agent/human-resources/learning-manager', color: '#9C27B0', level: 'manager', efficiency: '88%' },
  { id: 'ai-compensation-manager', uid: 'ktx-07-compensation-manager', title: 'AI Compensation Manager', route: '/ai-agent/human-resources/compensation-manager', color: '#9C27B0', level: 'manager', efficiency: '80%' },
  { id: 'ai-employee-relations-manager', uid: 'ktx-07-employee-relations-manager', title: 'AI Employee Relations Manager', route: '/ai-agent/human-resources/employee-relations-manager', color: '#9C27B0', level: 'manager', efficiency: '83%' },
  { id: 'ai-hr-analytics-manager', uid: 'ktx-07-hr-analytics-manager', title: 'AI HR Analytics Manager', route: '/ai-agent/human-resources/hr-analytics-manager', color: '#9C27B0', level: 'manager', efficiency: '86%' },
  { id: 'ai-diversity-inclusion-manager', uid: 'ktx-07-diversity-inclusion-manager', title: 'AI Diversity & Inclusion Manager', route: '/ai-agent/human-resources/diversity-inclusion-manager', color: '#9C27B0', level: 'manager', efficiency: '84%' },
  { id: 'ai-workforce-planning-manager', uid: 'ktx-07-workforce-planning-manager', title: 'AI Workforce Planning Manager', route: '/ai-agent/human-resources/workforce-planning-manager', color: '#9C27B0', level: 'manager', efficiency: '82%' },
  { id: 'ai-hr-business-partner', uid: 'ktx-07-hr-business-partner', title: 'AI HR Business Partner', route: '/ai-agent/human-resources/hr-business-partner', color: '#9C27B0', level: 'manager', efficiency: '87%' },
  { id: 'ai-recruiter', uid: 'ktx-07-recruiter', title: 'AI Recruiter', route: '/ai-agent/human-resources/recruiter', color: '#9C27B0', level: 'team_lead', efficiency: '79%' },
  { id: 'ai-technical-recruiter', uid: 'ktx-07-technical-recruiter', title: 'AI Technical Recruiter', route: '/ai-agent/human-resources/technical-recruiter', color: '#9C27B0', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-executive-recruiter', uid: 'ktx-07-executive-recruiter', title: 'AI Executive Recruiter', route: '/ai-agent/human-resources/executive-recruiter', color: '#9C27B0', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-campus-recruiter', uid: 'ktx-07-campus-recruiter', title: 'AI Campus Recruiter', route: '/ai-agent/human-resources/campus-recruiter', color: '#9C27B0', level: 'team_lead', efficiency: '78%' },
  { id: 'ai-sourcer', uid: 'ktx-07-sourcer', title: 'AI Sourcer', route: '/ai-agent/human-resources/sourcer', color: '#9C27B0', level: 'team_lead', efficiency: '80%' },
  { id: 'ai-hr-operations-specialist', uid: 'ktx-07-hr-operations-specialist', title: 'AI HR Operations Specialist', route: '/ai-agent/human-resources/hr-operations-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-hr-coordinator', uid: 'ktx-07-hr-coordinator', title: 'AI HR Coordinator', route: '/ai-agent/human-resources/hr-coordinator', color: '#9C27B0', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-onboarding-specialist', uid: 'ktx-07-onboarding-specialist', title: 'AI Onboarding Specialist', route: '/ai-agent/human-resources/onboarding-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-offboarding-specialist', uid: 'ktx-07-offboarding-specialist', title: 'AI Offboarding Specialist', route: '/ai-agent/human-resources/offboarding-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-learning-specialist', uid: 'ktx-07-learning-specialist', title: 'AI Learning Specialist', route: '/ai-agent/human-resources/learning-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-instructional-designer', uid: 'ktx-07-instructional-designer', title: 'AI Instructional Designer', route: '/ai-agent/human-resources/instructional-designer', color: '#9C27B0', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-training-coordinator', uid: 'ktx-07-training-coordinator', title: 'AI Training Coordinator', route: '/ai-agent/human-resources/training-coordinator', color: '#9C27B0', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-compliance-training-specialist', uid: 'ktx-07-compliance-training-specialist', title: 'AI Compliance Training Specialist', route: '/ai-agent/human-resources/compliance-training-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-compensation-analyst', uid: 'ktx-07-compensation-analyst', title: 'AI Compensation Analyst', route: '/ai-agent/human-resources/compensation-analyst', color: '#9C27B0', level: 'team_lead', efficiency: '76%' },
  { id: 'ai-benefits-administrator', uid: 'ktx-07-benefits-administrator', title: 'AI Benefits Administrator', route: '/ai-agent/human-resources/benefits-administrator', color: '#9C27B0', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-payroll-specialist', uid: 'ktx-07-payroll-specialist', title: 'AI Payroll Specialist', route: '/ai-agent/human-resources/payroll-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-stock-administrator', uid: 'ktx-07-stock-administrator', title: 'AI Stock Administrator', route: '/ai-agent/human-resources/stock-administrator', color: '#9C27B0', level: 'team_lead', efficiency: '80%' },
  { id: 'ai-employee-relations-specialist', uid: 'ktx-07-employee-relations-specialist', title: 'AI Employee Relations Specialist', route: '/ai-agent/human-resources/employee-relations-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-hr-investigator', uid: 'ktx-07-hr-investigator', title: 'AI HR Investigator', route: '/ai-agent/human-resources/hr-investigator', color: '#9C27B0', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-conflict-resolution-specialist', uid: 'ktx-07-conflict-resolution-specialist', title: 'AI Conflict Resolution Specialist', route: '/ai-agent/human-resources/conflict-resolution-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-employee-engagement-specialist', uid: 'ktx-07-employee-engagement-specialist', title: 'AI Employee Engagement Specialist', route: '/ai-agent/human-resources/employee-engagement-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-hr-analytics-specialist', uid: 'ktx-07-hr-analytics-specialist', title: 'AI HR Analytics Specialist', route: '/ai-agent/human-resources/hr-analytics-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-workforce-analyst', uid: 'ktx-07-workforce-analyst', title: 'AI Workforce Analyst', route: '/ai-agent/human-resources/workforce-analyst', color: '#9C27B0', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-hr-reporting-specialist', uid: 'ktx-07-hr-reporting-specialist', title: 'AI HR Reporting Specialist', route: '/ai-agent/human-resources/hr-reporting-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-diversity-recruiting-specialist', uid: 'ktx-07-diversity-recruiting-specialist', title: 'AI Diversity Recruiting Specialist', route: '/ai-agent/human-resources/diversity-recruiting-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-inclusion-program-specialist', uid: 'ktx-07-inclusion-program-specialist', title: 'AI Inclusion Program Specialist', route: '/ai-agent/human-resources/inclusion-program-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-bias-training-specialist', uid: 'ktx-07-bias-training-specialist', title: 'AI Bias Training Specialist', route: '/ai-agent/human-resources/bias-training-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-employee-resource-group-coordinator', uid: 'ktx-07-employee-resource-group-coordinator', title: 'AI Employee Resource Group Coordinator', route: '/ai-agent/human-resources/employee-resource-group-coordinator', color: '#9C27B0', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-capacity-planning-specialist', uid: 'ktx-07-capacity-planning-specialist', title: 'AI Capacity Planning Specialist', route: '/ai-agent/human-resources/capacity-planning-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-succession-planning-specialist', uid: 'ktx-07-succession-planning-specialist', title: 'AI Succession Planning Specialist', route: '/ai-agent/human-resources/succession-planning-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-organization-development-specialist', uid: 'ktx-07-organization-development-specialist', title: 'AI Organization Development Specialist', route: '/ai-agent/human-resources/organization-development-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-performance-management-specialist', uid: 'ktx-07-performance-management-specialist', title: 'AI Performance Management Specialist', route: '/ai-agent/human-resources/performance-management-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-talent-development-specialist', uid: 'ktx-07-talent-development-specialist', title: 'AI Talent Development Specialist', route: '/ai-agent/human-resources/talent-development-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-career-pathing-specialist', uid: 'ktx-07-career-pathing-specialist', title: 'AI Career Pathing Specialist', route: '/ai-agent/human-resources/career-pathing-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-hr-compliance-specialist', uid: 'ktx-07-hr-compliance-specialist', title: 'AI HR Compliance Specialist', route: '/ai-agent/human-resources/hr-compliance-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-labor-relations-specialist', uid: 'ktx-07-labor-relations-specialist', title: 'AI Labor Relations Specialist', route: '/ai-agent/human-resources/labor-relations-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-hr-technology-specialist', uid: 'ktx-07-hr-technology-specialist', title: 'AI HR Technology Specialist', route: '/ai-agent/human-resources/hr-technology-specialist', color: '#9C27B0', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-hris-administrator', uid: 'ktx-07-hris-administrator', title: 'AI HRIS Administrator', route: '/ai-agent/human-resources/hris-administrator', color: '#9C27B0', level: 'team_lead', efficiency: '84%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Human Resources - AI Agents</Text>
      <Text style={s.sub}>60 AI Agents & Employees</Text>
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
  container:{flex:1,backgroundColor:'#0a0a0a',padding:16},title:{color:'#fff',fontSize:24,fontWeight:'bold',marginBottom:4},
  sub:{color:'#888',fontSize:14,marginBottom:16},grid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  card:{backgroundColor:'#1a1a2e',borderRadius:12,padding:16,width:'48%',borderLeftWidth:3},
  at:{color:'#fff',fontSize:14,fontWeight:'600',marginBottom:4},al:{color:'#888',fontSize:11,marginBottom:2},
  ae:{color:'#10B981',fontSize:12},
});
